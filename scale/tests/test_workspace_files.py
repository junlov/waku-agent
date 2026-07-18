from __future__ import annotations

import os
import stat
import subprocess
import threading
from contextlib import contextmanager
from pathlib import Path
from typing import Iterator

import pytest

from waku.ops.workspace_files import (
    MAX_TEXT_BYTES,
    WorkspaceFileBusy,
    WorkspaceFileConflict,
    WorkspaceFileError,
    WorkspaceFileService,
)
from waku.ops.workspace_policy import workspace_mutation_lock


def git(repository: Path, *args: str) -> str:
    return subprocess.run(
        ["git", *args],
        cwd=repository,
        text=True,
        capture_output=True,
        check=True,
    ).stdout.strip()


def repository(tmp_path: Path) -> Path:
    root = tmp_path / "repository"
    (root / "docs").mkdir(parents=True)
    git(root, "init", "-b", "scale")
    (root / "docs/note.md").write_text("baseline\n")
    git(root, "add", "docs/note.md")
    git(root, "-c", "user.name=Learner", "-c", "user.email=learner@example.test",
        "commit", "-m", "baseline")
    return root


def manifest(*editable_files: str) -> dict:
    return {
        "kind": "chapter",
        "chapter": "01",
        "environment": {"editable_files": list(editable_files)},
    }


def test_list_read_and_atomic_revision_checked_save(tmp_path: Path) -> None:
    root = repository(tmp_path)
    target = root / "docs/note.md"
    os.chmod(target, 0o640)
    service = WorkspaceFileService(root, manifest("docs/note.md"))

    listed = service.list()
    opened = service.read("docs/note.md")
    old_inode = target.stat().st_ino
    saved = service.save("docs/note.md", "learner edit\n", opened["revision"])

    assert listed == [{
        "path": "docs/note.md",
        "exists": True,
        "size": len("baseline\n"),
        "revision": opened["revision"],
    }]
    assert opened["content"] == "baseline\n"
    assert saved["revision"] != opened["revision"]
    assert target.read_text() == "learner edit\n"
    assert stat.S_IMODE(target.stat().st_mode) == 0o640
    assert target.stat().st_ino != old_inode
    with pytest.raises(WorkspaceFileConflict, match="stale revision"):
        service.save("docs/note.md", "overwrite\n", opened["revision"])


def test_missing_file_has_stable_creation_token(tmp_path: Path) -> None:
    root = repository(tmp_path)
    service = WorkspaceFileService(root, manifest("docs/new.md"))

    first = service.list()[0]
    second = WorkspaceFileService(root, manifest("docs/new.md")).list()[0]
    opened = service.read("docs/new.md")
    saved = service.save("docs/new.md", "created\n", first["revision"])

    assert not first["exists"]
    assert first["revision"] == second["revision"]
    assert opened == {**first, "content": ""}
    assert saved["exists"]
    assert service.read("docs/new.md")["content"] == "created\n"


@pytest.mark.parametrize(
    "path",
    (
        "/etc/passwd",
        "../docs/note.md",
        "docs/../docs/note.md",
        "docs//note.md",
        "./docs/note.md",
        "docs/other.md",
    ),
)
def test_requests_require_exact_normalized_declared_paths(tmp_path: Path, path: str) -> None:
    service = WorkspaceFileService(repository(tmp_path), manifest("docs/note.md"))

    with pytest.raises(WorkspaceFileError):
        service.read(path)


@pytest.mark.parametrize(
    "protected",
    (".git/config", ".env", "nested/.env.local", ".waku/state.db", "traces/log"),
)
def test_manifest_cannot_override_protected_workspace_policy(
    tmp_path: Path, protected: str,
) -> None:
    with pytest.raises(WorkspaceFileError, match="protected"):
        WorkspaceFileService(repository(tmp_path), manifest(protected))


def test_every_symlink_component_and_symlink_leaf_is_rejected(tmp_path: Path) -> None:
    root = repository(tmp_path)
    outside = tmp_path / "outside"
    outside.mkdir()
    (outside / "note.md").write_text("secret\n")
    (root / "linked").symlink_to(outside, target_is_directory=True)
    parent_service = WorkspaceFileService(root, manifest("linked/note.md"))
    (root / "docs/leaf.md").symlink_to(outside / "note.md")
    leaf_service = WorkspaceFileService(root, manifest("docs/leaf.md"))

    with pytest.raises(WorkspaceFileError, match="symbolic links"):
        parent_service.list()
    with pytest.raises(WorkspaceFileError, match="symbolic links"):
        leaf_service.read("docs/leaf.md")
    assert (outside / "note.md").read_text() == "secret\n"


def test_read_remains_bound_when_parent_is_replaced_by_symlink(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    root = repository(tmp_path)
    outside = tmp_path / "outside"
    outside.mkdir()
    outside_target = outside / "note.md"
    outside_target.write_text("outside sentinel\n")
    service = WorkspaceFileService(root, manifest("docs/note.md"))
    baseline = service.read("docs/note.md")
    parent_opened = threading.Event()
    continue_read = threading.Event()
    original_open_parent = service._open_parent

    @contextmanager
    def paused_open_parent(relative: str) -> Iterator[tuple[int, str]]:
        with original_open_parent(relative) as opened:
            parent_opened.set()
            if not continue_read.wait(timeout=3):
                raise AssertionError("read did not resume after the parent swap")
            yield opened

    monkeypatch.setattr(service, "_open_parent", paused_open_parent)
    result: dict[str, object] = {}

    def read_file() -> None:
        try:
            result["value"] = service.read("docs/note.md")
        except BaseException as exc:  # pragma: no cover - assertion reports the error
            result["error"] = exc

    reader = threading.Thread(target=read_file)
    reader.start()
    assert parent_opened.wait(timeout=1)
    (root / "docs").rename(root / "docs-bound")
    (root / "docs").symlink_to(outside, target_is_directory=True)
    continue_read.set()
    reader.join(timeout=3)

    assert not reader.is_alive()
    assert "error" not in result, result.get("error")
    assert result["value"] == baseline
    assert outside_target.read_text() == "outside sentinel\n"


def test_save_remains_bound_when_parent_is_replaced_by_symlink(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    root = repository(tmp_path)
    outside = tmp_path / "outside"
    outside.mkdir()
    outside_target = outside / "note.md"
    outside_target.write_text("outside sentinel\n")
    service = WorkspaceFileService(root, manifest("docs/note.md"))
    revision = service.read("docs/note.md")["revision"]
    parent_opened = threading.Event()
    continue_save = threading.Event()
    original_open_parent = service._open_parent

    @contextmanager
    def paused_open_parent(relative: str) -> Iterator[tuple[int, str]]:
        with original_open_parent(relative) as opened:
            parent_opened.set()
            if not continue_save.wait(timeout=3):
                raise AssertionError("save did not resume after the parent swap")
            yield opened

    monkeypatch.setattr(service, "_open_parent", paused_open_parent)
    result: dict[str, object] = {}

    def save_file() -> None:
        try:
            result["value"] = service.save("docs/note.md", "safe edit\n", revision)
        except BaseException as exc:  # pragma: no cover - assertion reports the error
            result["error"] = exc

    saver = threading.Thread(target=save_file)
    saver.start()
    assert parent_opened.wait(timeout=1)
    (root / "docs").rename(root / "docs-bound")
    (root / "docs").symlink_to(outside, target_is_directory=True)
    continue_save.set()
    saver.join(timeout=3)

    assert not saver.is_alive()
    assert "error" not in result, result.get("error")
    assert (root / "docs-bound/note.md").read_text() == "safe edit\n"
    assert outside_target.read_text() == "outside sentinel\n"


def test_read_remains_bound_when_leaf_is_replaced_by_symlink(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    root = repository(tmp_path)
    target = root / "docs/note.md"
    outside_target = tmp_path / "outside-sentinel.md"
    outside_target.write_text("outside sentinel\n")
    service = WorkspaceFileService(root, manifest("docs/note.md"))
    baseline = service.read("docs/note.md")
    leaf_opened = threading.Event()
    leaf_swapped = threading.Event()
    original_open = os.open

    def paused_open(
        path: str | bytes | os.PathLike[str] | os.PathLike[bytes],
        flags: int,
        mode: int = 0o777,
        *,
        dir_fd: int | None = None,
    ) -> int:
        descriptor = original_open(path, flags, mode, dir_fd=dir_fd)
        if path == "note.md" and dir_fd is not None:
            leaf_opened.set()
            if not leaf_swapped.wait(timeout=3):
                os.close(descriptor)
                raise AssertionError("leaf was not swapped after it was opened")
        return descriptor

    def swap_leaf() -> None:
        if not leaf_opened.wait(timeout=3):
            return
        target.unlink()
        target.symlink_to(outside_target)
        leaf_swapped.set()

    monkeypatch.setattr(os, "open", paused_open)
    attacker = threading.Thread(target=swap_leaf)
    attacker.start()
    opened = service.read("docs/note.md")
    attacker.join(timeout=3)

    assert not attacker.is_alive()
    assert leaf_swapped.is_set()
    assert opened == baseline
    assert outside_target.read_text() == "outside sentinel\n"


def test_atomic_save_replaces_swapped_leaf_not_symlink_target(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    root = repository(tmp_path)
    target = root / "docs/note.md"
    outside_target = tmp_path / "outside-sentinel.md"
    outside_target.write_text("outside sentinel\n")
    service = WorkspaceFileService(root, manifest("docs/note.md"))
    revision = service.read("docs/note.md")["revision"]
    replace_ready = threading.Event()
    leaf_swapped = threading.Event()
    original_replace = os.replace

    def swap_leaf() -> None:
        if not replace_ready.wait(timeout=3):
            return
        target.unlink()
        target.symlink_to(outside_target)
        leaf_swapped.set()

    def paused_replace(
        src: str,
        dst: str,
        *,
        src_dir_fd: int | None = None,
        dst_dir_fd: int | None = None,
    ) -> None:
        if dst == "note.md" and src_dir_fd is not None and dst_dir_fd is not None:
            replace_ready.set()
            if not leaf_swapped.wait(timeout=3):
                raise AssertionError("leaf was not swapped before replacement")
        original_replace(
            src,
            dst,
            src_dir_fd=src_dir_fd,
            dst_dir_fd=dst_dir_fd,
        )

    monkeypatch.setattr(os, "replace", paused_replace)
    attacker = threading.Thread(target=swap_leaf)
    attacker.start()
    service.save("docs/note.md", "safe edit\n", revision)
    attacker.join(timeout=3)

    assert not attacker.is_alive()
    assert leaf_swapped.is_set()
    assert not target.is_symlink()
    assert target.read_text() == "safe edit\n"
    assert outside_target.read_text() == "outside sentinel\n"


@pytest.mark.parametrize("replacement_kind", ("symlink", "regular"))
def test_atomic_save_rejects_swapped_source_temp_and_restores_target(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
    replacement_kind: str,
) -> None:
    root = repository(tmp_path)
    target = root / "docs/note.md"
    outside_target = tmp_path / "outside-sentinel.md"
    outside_target.write_text("outside sentinel\n")
    service = WorkspaceFileService(root, manifest("docs/note.md"))
    revision = service.read("docs/note.md")["revision"]
    source_swapped = threading.Event()
    original_replace = os.replace

    def adversarial_replace(
        src: str,
        dst: str,
        *,
        src_dir_fd: int | None = None,
        dst_dir_fd: int | None = None,
    ) -> None:
        if (
            src.startswith(".waku-edit-")
            and dst == "note.md"
            and src_dir_fd is not None
            and dst_dir_fd is not None
        ):
            os.unlink(src, dir_fd=src_dir_fd)
            if replacement_kind == "symlink":
                os.symlink(outside_target, src, dir_fd=src_dir_fd)
            else:
                attacker_fd = os.open(
                    src,
                    os.O_WRONLY | os.O_CREAT | os.O_EXCL,
                    0o600,
                    dir_fd=src_dir_fd,
                )
                try:
                    os.write(attacker_fd, b"attacker inode\n")
                finally:
                    os.close(attacker_fd)
            source_swapped.set()
        original_replace(
            src,
            dst,
            src_dir_fd=src_dir_fd,
            dst_dir_fd=dst_dir_fd,
        )

    monkeypatch.setattr(os, "replace", adversarial_replace)

    with pytest.raises(WorkspaceFileConflict, match="temporary file changed"):
        service.save("docs/note.md", "unsafe edit\n", revision)

    assert source_swapped.is_set()
    assert not target.is_symlink()
    assert target.read_text() == "baseline\n"
    assert outside_target.read_text() == "outside sentinel\n"


@pytest.mark.parametrize("kind", ("directory", "binary", "non-utf8", "large"))
def test_only_small_regular_utf8_text_files_are_exposed(tmp_path: Path, kind: str) -> None:
    root = repository(tmp_path)
    target = root / "docs/bad"
    if kind == "directory":
        target.mkdir()
    elif kind == "binary":
        target.write_bytes(b"text\x00binary")
    elif kind == "non-utf8":
        target.write_bytes(b"\xff\xfe")
    else:
        target.write_bytes(b"x" * (MAX_TEXT_BYTES + 1))
    service = WorkspaceFileService(root, manifest("docs/bad"))

    with pytest.raises(WorkspaceFileError):
        service.list()


def test_save_returns_busy_while_another_operation_owns_mutation_lock(tmp_path: Path) -> None:
    root = repository(tmp_path)
    service = WorkspaceFileService(root, manifest("docs/note.md"))
    revision = service.read("docs/note.md")["revision"]
    acquired = threading.Event()
    release = threading.Event()

    def hold_lock() -> None:
        with workspace_mutation_lock(root):
            acquired.set()
            release.wait(timeout=3)

    holder = threading.Thread(target=hold_lock)
    holder.start()
    assert acquired.wait(1)
    try:
        with pytest.raises(WorkspaceFileBusy, match="workspace is busy"):
            service.save("docs/note.md", "blocked\n", revision)
    finally:
        release.set()
        holder.join(timeout=3)

    assert (root / "docs/note.md").read_text() == "baseline\n"
