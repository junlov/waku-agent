"""Bounded text-file access for a guided lab workspace."""

from __future__ import annotations

import errno
import hashlib
import os
import secrets
import stat
from contextlib import contextmanager
from pathlib import Path, PurePosixPath
from typing import Any, Iterator

from waku.ops.lab_manifest import load_curriculum_contract
from waku.ops.workspace_policy import (
    WorkspaceMutationBusy,
    is_protected_workspace_path,
    workspace_mutation_lock,
)


FILE_API_PATHS = (
    "/api/lab/file/list",
    "/api/lab/file/read",
    "/api/lab/file/save",
)
MAX_TEXT_BYTES = 1024 * 1024
_MISSING_PREFIX = b"waku-guided-lab-missing\0"
_DIRECTORY_FLAGS = (
    os.O_RDONLY
    | getattr(os, "O_DIRECTORY", 0)
    | getattr(os, "O_NOFOLLOW", 0)
    | getattr(os, "O_CLOEXEC", 0)
)
_READ_FLAGS = (
    os.O_RDONLY
    | getattr(os, "O_NOFOLLOW", 0)
    | getattr(os, "O_CLOEXEC", 0)
    | getattr(os, "O_NONBLOCK", 0)
)
_WRITE_FLAGS = (
    os.O_WRONLY
    | os.O_CREAT
    | os.O_EXCL
    | getattr(os, "O_NOFOLLOW", 0)
    | getattr(os, "O_CLOEXEC", 0)
)
_UNSAFE_COMPONENT_ERRNOS = {errno.ELOOP, errno.ENOTDIR}


class WorkspaceFileError(ValueError):
    """A requested file is outside the lab's bounded text-file contract."""


class WorkspaceFileConflict(WorkspaceFileError):
    """The file changed after the client read it."""


class WorkspaceFileBusy(WorkspaceFileError):
    """Another guided-lab operation currently owns the workspace."""


class WorkspaceFileService:
    """List, read, and atomically save files declared by one chapter manifest."""

    def __init__(self, workspace: Path, manifest: dict[str, Any]):
        if manifest.get("kind") != "chapter":
            raise WorkspaceFileError("file access requires a chapter manifest")
        environment = manifest.get("environment")
        editable = environment.get("editable_files") if isinstance(environment, dict) else None
        if not isinstance(editable, list):
            raise WorkspaceFileError("chapter manifest must declare environment.editable_files")

        self.workspace = Path(workspace).resolve()
        if not self.workspace.is_dir():
            raise WorkspaceFileError(f"workspace does not exist: {self.workspace}")
        if not getattr(os, "O_DIRECTORY", 0) or not getattr(os, "O_NOFOLLOW", 0):
            raise WorkspaceFileError("platform does not support secure workspace traversal")
        root_fd = self._open_directory_path(self.workspace, "workspace root")
        try:
            root_stat = os.fstat(root_fd)
            if not stat.S_ISDIR(root_stat.st_mode):
                raise WorkspaceFileError("workspace root is not a directory")
            self._workspace_identity = (root_stat.st_dev, root_stat.st_ino)
        finally:
            os.close(root_fd)
        self.chapter = str(manifest.get("chapter") or "")
        self._editable = tuple(self._normalize(item) for item in editable)
        if len(self._editable) != len(set(self._editable)):
            raise WorkspaceFileError("chapter manifest contains duplicate editable files")
        for relative in self._editable:
            if is_protected_workspace_path(relative):
                raise WorkspaceFileError(
                    f"chapter manifest declares protected editable file: {relative}"
                )

    @classmethod
    def from_chapter(
        cls,
        repository_root: Path,
        workspace: Path,
        chapter: str,
    ) -> WorkspaceFileService:
        """Build a service from the repository's validated curriculum contract."""
        _curriculum, manifests = load_curriculum_contract(Path(repository_root))
        manifest = manifests.get(chapter)
        if manifest is None:
            raise WorkspaceFileError(f"unknown chapter manifest: {chapter}")
        return cls(workspace, manifest)

    def list(self) -> list[dict[str, Any]]:
        """Return metadata only for the exact paths declared by the chapter."""
        files: list[dict[str, Any]] = []
        for relative in self._editable:
            with self._open_parent(relative) as (parent_fd, leaf):
                current = self._read_leaf(parent_fd, leaf, relative, allow_missing=True)
            if current is None:
                files.append(self._missing_payload(relative))
                continue
            content, _file_stat = current
            files.append(
                {
                    "path": relative,
                    "exists": True,
                    "size": len(content),
                    "revision": self._revision(content),
                }
            )
        return files

    def read(self, relative: str) -> dict[str, Any]:
        """Read one declared UTF-8 text file and return its content revision."""
        normalized = self._authorize(relative)
        with self._open_parent(normalized) as (parent_fd, leaf):
            current = self._read_leaf(parent_fd, leaf, normalized, allow_missing=True)
        if current is None:
            return {**self._missing_payload(normalized), "content": ""}
        content, _file_stat = current
        return {
            "path": normalized,
            "exists": True,
            "content": self._decode_text(content, normalized),
            "size": len(content),
            "revision": self._revision(content),
        }

    def save(self, relative: str, content: str, expected_revision: str) -> dict[str, Any]:
        """Save text iff the client's revision still matches the workspace."""
        normalized = self._authorize(relative)
        if not isinstance(content, str):
            raise WorkspaceFileError("file content must be text")
        encoded = content.encode("utf-8")
        self._validate_text(encoded, normalized)
        if not isinstance(expected_revision, str) or not expected_revision:
            raise WorkspaceFileConflict("an expected revision is required")

        try:
            with workspace_mutation_lock(self.workspace, blocking=False):
                with self._open_parent(normalized) as (parent_fd, leaf):
                    current = self._read_leaf(
                        parent_fd, leaf, normalized, allow_missing=True
                    )
                    if current is not None:
                        current_content, current_stat = current
                        current_revision = self._revision(current_content)
                        mode = stat.S_IMODE(current_stat.st_mode)
                        identity = (current_stat.st_dev, current_stat.st_ino)
                    else:
                        current_revision = self._missing_revision(normalized)
                        mode = 0o644
                        identity = None
                    if current_revision != expected_revision:
                        raise WorkspaceFileConflict(
                            f"stale revision for {normalized}; reload before saving"
                        )
                    self._atomic_write(
                        parent_fd,
                        leaf,
                        normalized,
                        encoded,
                        mode,
                        expected_identity=identity,
                    )
        except WorkspaceMutationBusy as exc:
            raise WorkspaceFileBusy("workspace is busy; retry after the active operation") from exc

        return {
            "path": normalized,
            "exists": True,
            "content": content,
            "size": len(encoded),
            "revision": self._revision(encoded),
        }

    def _authorize(self, relative: str) -> str:
        normalized = self._normalize(relative)
        if normalized not in self._editable:
            raise WorkspaceFileError(f"file is not editable in chapter {self.chapter}: {normalized}")
        if is_protected_workspace_path(normalized):
            raise WorkspaceFileError(f"protected workspace path: {normalized}")
        return normalized

    @staticmethod
    def _normalize(relative: Any) -> str:
        if not isinstance(relative, str) or not relative or "\0" in relative:
            raise WorkspaceFileError("file path must be non-empty relative text")
        path = PurePosixPath(relative)
        normalized = path.as_posix()
        if path.is_absolute() or normalized != relative:
            raise WorkspaceFileError(f"file path must already be normalized: {relative!r}")
        if any(part in {"", ".", ".."} for part in path.parts):
            raise WorkspaceFileError(f"unsafe relative file path: {relative!r}")
        return normalized

    @contextmanager
    def _open_parent(self, relative: str) -> Iterator[tuple[int, str]]:
        normalized = self._authorize(relative)
        parts = PurePosixPath(normalized).parts
        current_fd = self._open_root()
        try:
            for component in parts[:-1]:
                try:
                    next_fd = os.open(component, _DIRECTORY_FLAGS, dir_fd=current_fd)
                except OSError as exc:
                    self._raise_component_error(normalized, exc)
                os.close(current_fd)
                current_fd = next_fd
            yield current_fd, parts[-1]
        finally:
            os.close(current_fd)

    def _open_root(self) -> int:
        descriptor = self._open_directory_path(self.workspace, "workspace root")
        current = os.fstat(descriptor)
        if (current.st_dev, current.st_ino) != self._workspace_identity:
            os.close(descriptor)
            raise WorkspaceFileError("workspace root changed after file service creation")
        return descriptor

    @staticmethod
    def _open_directory_path(path: Path, label: str) -> int:
        try:
            return os.open(path, _DIRECTORY_FLAGS)
        except OSError as exc:
            if exc.errno in _UNSAFE_COMPONENT_ERRNOS:
                raise WorkspaceFileError(f"symbolic links are not editable: {label}") from exc
            raise WorkspaceFileError(f"cannot open {label}: {exc.strerror or exc}") from exc

    @staticmethod
    def _raise_component_error(relative: str, error: OSError) -> None:
        if error.errno in _UNSAFE_COMPONENT_ERRNOS:
            raise WorkspaceFileError(f"symbolic links are not editable: {relative}") from error
        if error.errno == errno.ENOENT:
            raise WorkspaceFileError(f"file parent does not exist: {relative}") from error
        raise WorkspaceFileError(
            f"cannot traverse editable file parent {relative}: {error.strerror or error}"
        ) from error

    @classmethod
    def _read_leaf(
        cls,
        parent_fd: int,
        leaf: str,
        relative: str,
        *,
        allow_missing: bool,
    ) -> tuple[bytes, os.stat_result] | None:
        try:
            descriptor = os.open(leaf, _READ_FLAGS, dir_fd=parent_fd)
        except OSError as exc:
            if exc.errno == errno.ENOENT and allow_missing:
                return None
            if exc.errno in _UNSAFE_COMPONENT_ERRNOS:
                raise WorkspaceFileError(
                    f"symbolic links are not editable: {relative}"
                ) from exc
            if exc.errno == errno.ENOENT:
                raise WorkspaceFileError(f"editable file does not exist: {relative}") from exc
            raise WorkspaceFileError(
                f"cannot open editable file {relative}: {exc.strerror or exc}"
            ) from exc
        try:
            file_stat = os.fstat(descriptor)
            if not stat.S_ISREG(file_stat.st_mode):
                raise WorkspaceFileError(f"editable path is not a regular file: {relative}")
            if file_stat.st_size > MAX_TEXT_BYTES:
                raise WorkspaceFileError(
                    f"editable file exceeds {MAX_TEXT_BYTES} bytes: {relative}"
                )
            chunks: list[bytes] = []
            remaining = MAX_TEXT_BYTES + 1
            while remaining:
                chunk = os.read(descriptor, min(64 * 1024, remaining))
                if not chunk:
                    break
                chunks.append(chunk)
                remaining -= len(chunk)
            content = b"".join(chunks)
            cls._validate_text(content, relative)
            return content, file_stat
        finally:
            os.close(descriptor)

    @staticmethod
    def _validate_text(content: bytes, label: str) -> None:
        if len(content) > MAX_TEXT_BYTES:
            raise WorkspaceFileError(f"editable file exceeds {MAX_TEXT_BYTES} bytes: {label}")
        WorkspaceFileService._decode_text(content, label)
        if any(byte < 32 and byte not in {9, 10, 13} for byte in content) or b"\x7f" in content:
            raise WorkspaceFileError(f"binary content is not editable: {label}")

    @staticmethod
    def _decode_text(content: bytes, label: str) -> str:
        try:
            return content.decode("utf-8", errors="strict")
        except UnicodeDecodeError as exc:
            raise WorkspaceFileError(f"file is not valid UTF-8 text: {label}") from exc

    @staticmethod
    def _revision(content: bytes) -> str:
        return hashlib.sha256(content).hexdigest()

    @staticmethod
    def _missing_revision(relative: str) -> str:
        return hashlib.sha256(_MISSING_PREFIX + relative.encode("utf-8")).hexdigest()

    @classmethod
    def _missing_payload(cls, relative: str) -> dict[str, Any]:
        return {
            "path": relative,
            "exists": False,
            "size": 0,
            "revision": cls._missing_revision(relative),
        }

    def _atomic_write(
        self,
        parent_fd: int,
        leaf: str,
        relative: str,
        content: bytes,
        mode: int,
        *,
        expected_identity: tuple[int, int] | None,
    ) -> None:
        temporary = f".waku-edit-{secrets.token_hex(12)}.tmp"
        recovery: str | None = None
        try:
            descriptor = os.open(temporary, _WRITE_FLAGS, 0o600, dir_fd=parent_fd)
        except OSError as exc:
            raise WorkspaceFileError(f"cannot create atomic save for {relative}") from exc
        try:
            temporary_stat = os.fstat(descriptor)
            temporary_identity = (temporary_stat.st_dev, temporary_stat.st_ino)
            view = memoryview(content)
            while view:
                written = os.write(descriptor, view)
                if written <= 0:
                    raise WorkspaceFileError(
                        f"atomic save stopped while writing {relative}"
                    )
                view = view[written:]
            os.fchmod(descriptor, mode)
            os.fsync(descriptor)
            self._require_same_entry(parent_fd, leaf, relative, expected_identity)
            recovery = self._create_recovery_link(
                parent_fd,
                leaf,
                relative,
                expected_identity,
            )
            self._require_regular_identity(
                parent_fd,
                temporary,
                temporary_identity,
                f"atomic save temporary file changed while saving: {relative}",
            )
            os.replace(
                temporary,
                leaf,
                src_dir_fd=parent_fd,
                dst_dir_fd=parent_fd,
            )
            try:
                self._require_regular_identity(
                    parent_fd,
                    leaf,
                    temporary_identity,
                    f"atomic save temporary file changed while saving: {relative}",
                )
            except WorkspaceFileConflict:
                self._restore_replaced_entry(
                    parent_fd,
                    leaf,
                    relative,
                    recovery,
                    expected_identity,
                )
                os.fsync(parent_fd)
                raise
            if recovery is not None:
                os.unlink(recovery, dir_fd=parent_fd)
                recovery = None
            os.fsync(parent_fd)
        finally:
            os.close(descriptor)
            try:
                os.unlink(temporary, dir_fd=parent_fd)
            except FileNotFoundError:
                pass
            if recovery is not None:
                try:
                    os.unlink(recovery, dir_fd=parent_fd)
                except FileNotFoundError:
                    pass

    @classmethod
    def _create_recovery_link(
        cls,
        parent_fd: int,
        leaf: str,
        relative: str,
        expected_identity: tuple[int, int] | None,
    ) -> str | None:
        if expected_identity is None:
            return None
        recovery = f".waku-recovery-{secrets.token_hex(12)}.tmp"
        try:
            os.link(
                leaf,
                recovery,
                src_dir_fd=parent_fd,
                dst_dir_fd=parent_fd,
                follow_symlinks=False,
            )
            cls._require_regular_identity(
                parent_fd,
                recovery,
                expected_identity,
                f"editable file changed while saving: {relative}; reload before saving",
            )
        except BaseException:
            try:
                os.unlink(recovery, dir_fd=parent_fd)
            except FileNotFoundError:
                pass
            raise
        return recovery

    @classmethod
    def _restore_replaced_entry(
        cls,
        parent_fd: int,
        leaf: str,
        relative: str,
        recovery: str | None,
        expected_identity: tuple[int, int] | None,
    ) -> None:
        if expected_identity is None:
            try:
                os.unlink(leaf, dir_fd=parent_fd)
            except FileNotFoundError:
                pass
            return
        if recovery is None:
            raise WorkspaceFileConflict(
                f"atomic save could not recover the prior file: {relative}"
            )
        cls._require_regular_identity(
            parent_fd,
            recovery,
            expected_identity,
            f"atomic save recovery file changed while saving: {relative}",
        )
        os.replace(
            recovery,
            leaf,
            src_dir_fd=parent_fd,
            dst_dir_fd=parent_fd,
        )
        cls._require_regular_identity(
            parent_fd,
            leaf,
            expected_identity,
            f"atomic save could not recover the prior file: {relative}",
        )

    @staticmethod
    def _require_regular_identity(
        parent_fd: int,
        name: str,
        expected_identity: tuple[int, int],
        message: str,
    ) -> None:
        try:
            current = os.stat(name, dir_fd=parent_fd, follow_symlinks=False)
        except FileNotFoundError as exc:
            raise WorkspaceFileConflict(message) from exc
        if (
            not stat.S_ISREG(current.st_mode)
            or (current.st_dev, current.st_ino) != expected_identity
        ):
            raise WorkspaceFileConflict(message)

    @staticmethod
    def _require_same_entry(
        parent_fd: int,
        leaf: str,
        relative: str,
        expected_identity: tuple[int, int] | None,
    ) -> None:
        try:
            current = os.stat(leaf, dir_fd=parent_fd, follow_symlinks=False)
        except FileNotFoundError:
            current_identity = None
        else:
            if not stat.S_ISREG(current.st_mode):
                raise WorkspaceFileConflict(
                    f"editable file changed type while saving: {relative}"
                )
            current_identity = (current.st_dev, current.st_ino)
        if current_identity != expected_identity:
            raise WorkspaceFileConflict(
                f"editable file changed while saving: {relative}; reload before saving"
            )
