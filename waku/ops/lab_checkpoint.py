"""Safe Git checkpoints, confirmed restores, and isolated chapter replay."""

from __future__ import annotations

import hashlib
import hmac
import os
import re
import shutil
import subprocess
import tempfile
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from waku.ops.workspace_policy import (
    is_protected_workspace_path,
    workspace_mutation_lock,
)

CHECKPOINT_PREFIX = "refs/waku/checkpoints/"


class CheckpointError(RuntimeError):
    """A checkpoint operation was unsafe or invalid."""


def sanitize_name(value: str) -> str:
    """Return one ref-safe, filesystem-safe component."""
    cleaned = re.sub(r"[^a-zA-Z0-9._-]+", "-", value.strip()).strip(".-").lower()
    if not cleaned:
        raise CheckpointError("checkpoint names must contain letters or numbers")
    return cleaned[:64]


class GitCheckpointManager:
    def __init__(self, repository: Path):
        self.repository = repository.resolve()
        if self._git("rev-parse", "--is-inside-work-tree").stdout.strip() != "true":
            raise CheckpointError(f"not a Git workspace: {self.repository}")

    def capture(
        self,
        *,
        chapter: str,
        session_id: str,
        label: str,
        kind: str = "manual",
    ) -> dict[str, str]:
        """Capture tracked and nonignored untracked files without touching the real index."""
        with workspace_mutation_lock(self.repository):
            return self._capture_locked(
                chapter=chapter, session_id=session_id, label=label, kind=kind,
            )

    def _capture_locked(
        self,
        *,
        chapter: str,
        session_id: str,
        label: str,
        kind: str,
    ) -> dict[str, str]:
        chapter_name = sanitize_name(chapter)
        session_name = sanitize_name(session_id)
        label_name = sanitize_name(label)
        stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
        ref = (
            f"{CHECKPOINT_PREFIX}{chapter_name}/{session_name}/"
            f"{stamp}-{label_name}-{uuid.uuid4().hex[:8]}"
        )
        head = self._git("rev-parse", "--verify", "HEAD").stdout.strip()
        git_dir = Path(self._git("rev-parse", "--git-dir").stdout.strip())
        if not git_dir.is_absolute():
            git_dir = self.repository / git_dir
        descriptor, index_name = tempfile.mkstemp(prefix="waku-index-", dir=git_dir)
        os.close(descriptor)
        Path(index_name).unlink()
        env = self._identity_env(GIT_INDEX_FILE=index_name)
        try:
            self._git("read-tree", head, env=env)
            self._git("add", "-A", "--", ".", env=env)
            indexed = self._git("ls-files", "-z", env=env).stdout.split("\0")
            protected = [path for path in indexed if path and self._is_protected(path)]
            if protected:
                self._git(
                    "rm", "-r", "--cached", "--ignore-unmatch", "--", *protected,
                    env=env,
                )
            tree = self._git("write-tree", env=env).stdout.strip()
            message = f"Waku {kind} checkpoint: chapter {chapter_name} / {label_name}"
            commit = self._git(
                "commit-tree", tree, "-p", head, "-m", message, env=env,
            ).stdout.strip()
            self._git("update-ref", ref, commit)
        finally:
            Path(index_name).unlink(missing_ok=True)
        return {
            "chapter": chapter_name,
            "session_id": session_name,
            "label": label_name,
            "kind": sanitize_name(kind),
            "ref": ref,
            "commit_oid": commit,
            "created_at": datetime.now(timezone.utc).isoformat(timespec="milliseconds"),
        }

    def prepare_restore(self, ref: str) -> dict[str, Any]:
        """Describe a restore and issue a state-bound token without creating refs."""
        with workspace_mutation_lock(self.repository):
            return self._prepare_restore_locked(ref)

    def _prepare_restore_locked(self, ref: str) -> dict[str, Any]:
        target = self._resolve_checkpoint(ref)
        restorable = self._restorable_paths(target)
        worktree_diff = self._git(
            "diff", "--binary", "--no-ext-diff", target, "--", *restorable,
        ).stdout if restorable else ""
        index_diff = self._git(
            "diff", "--cached", "--binary", "--no-ext-diff", target, "--", *restorable,
        ).stdout if restorable else ""
        diff = "Index replacement:\n" + index_diff + "\nWorktree replacement:\n" + worktree_diff
        untracked = self._untracked_paths()
        if untracked:
            diff += "\nNonignored untracked paths that restore would remove:\n"
            diff += "".join(f"?? {path}\n" for path in untracked)
        fingerprint = self._fingerprint()
        token = hashlib.sha256(f"{ref}\0{target}\0{fingerprint}".encode()).hexdigest()
        return {
            "ref": ref,
            "target_oid": target,
            "diff": diff,
            "index_diff": index_diff,
            "worktree_diff": worktree_diff,
            "token": token,
            "fingerprint": fingerprint,
            "untracked": untracked,
        }

    def confirm_restore(
        self,
        *,
        ref: str,
        token: str,
        chapter: str,
        session_id: str,
    ) -> dict[str, Any]:
        """Create recovery evidence, then restore only after exact-state confirmation."""
        with workspace_mutation_lock(self.repository):
            preview = self._prepare_restore_locked(ref)
            if not token or not hmac.compare_digest(token, preview["token"]):
                raise CheckpointError("restore confirmation expired because the workspace changed")
            recovery = self.capture(
                chapter=chapter,
                session_id=session_id,
                label="pre-restore",
                kind="pre-restore",
            )
            current_target = self._resolve_checkpoint(ref)
            current_fingerprint = self._fingerprint()
            if (
                current_target != preview["target_oid"]
                or current_fingerprint != preview["fingerprint"]
            ):
                raise CheckpointError("restore confirmation expired because the workspace changed")
            for relative in preview["untracked"]:
                target = self.repository / relative
                parent = target.parent.resolve()
                if not parent.is_relative_to(self.repository) or self._is_protected(relative):
                    continue
                try:
                    target.lstat()
                except FileNotFoundError:
                    continue
                if target.is_symlink():
                    target.unlink()
                elif target.is_dir():
                    shutil.rmtree(target)
                else:
                    target.unlink(missing_ok=True)
            restorable = self._restorable_paths(preview["target_oid"])
            if restorable:
                self._git(
                    "restore", f"--source={preview['target_oid']}", "--staged", "--worktree",
                    "--", *restorable,
                )
            return {
                "restored": True,
                "target_oid": preview["target_oid"],
                "recovery": recovery,
            }

    def replay_passed_chapter(
        self,
        chapter: str,
        command: list[str],
        *,
        worktrees_root: Path | None = None,
        timeout: int = 600,
    ) -> dict[str, Any]:
        """Run a passed chapter from its learner tag in a disposable external worktree."""
        chapter_name = sanitize_name(chapter)
        tag = f"learner/chapter-{chapter_name}-passed"
        commit = self._git("rev-parse", "--verify", f"refs/tags/{tag}^{{commit}}").stdout.strip()
        parent = (worktrees_root or Path(tempfile.gettempdir())).resolve()
        parent.mkdir(parents=True, exist_ok=True)
        worktree = Path(tempfile.mkdtemp(prefix=f"waku-replay-{chapter_name}-", dir=parent))
        worktree.rmdir()
        try:
            self._git("worktree", "add", "--detach", str(worktree), commit)
            result = subprocess.run(
                command,
                cwd=worktree,
                text=True,
                capture_output=True,
                timeout=timeout,
                check=False,
            )
            return {
                "chapter": chapter_name,
                "tag": tag,
                "commit_oid": commit,
                "exit_code": result.returncode,
                "stdout": result.stdout,
                "stderr": result.stderr,
                "workspace": str(worktree),
            }
        finally:
            self._git("worktree", "remove", "--force", str(worktree), check=False)
            shutil.rmtree(worktree, ignore_errors=True)

    def _resolve_checkpoint(self, ref: str) -> str:
        if not ref.startswith(CHECKPOINT_PREFIX):
            raise CheckpointError("restore refs must be private Waku checkpoints")
        return self._git("rev-parse", "--verify", f"{ref}^{{commit}}").stdout.strip()

    def _fingerprint(self) -> str:
        """Hash every repository input whose change must expire restore consent."""
        digest = hashlib.sha256()

        def feed(label: str, value: bytes) -> None:
            label_bytes = label.encode()
            digest.update(len(label_bytes).to_bytes(8, "big"))
            digest.update(label_bytes)
            digest.update(len(value).to_bytes(8, "big"))
            digest.update(value)

        feed("HEAD", self._git("rev-parse", "--verify", "HEAD").stdout.strip().encode())
        index_path = Path(self._git("rev-parse", "--git-path", "index").stdout.strip())
        if not index_path.is_absolute():
            index_path = self.repository / index_path
        feed("INDEX", index_path.read_bytes())
        tracked = self._git("ls-files", "-z").stdout.split("\0")
        for path in sorted(item for item in tracked if item and not self._is_protected(item)):
            self._hash_worktree_entry(digest, "TRACKED", path)
        for path in self._untracked_paths():
            self._hash_worktree_entry(digest, "UNTRACKED", path)
        return digest.hexdigest()

    def _hash_worktree_entry(self, digest: Any, category: str, relative: str) -> None:
        path = self.repository / relative
        encoded_path = os.fsencode(relative)
        digest.update(category.encode() + b"\0")
        digest.update(len(encoded_path).to_bytes(8, "big"))
        digest.update(encoded_path)
        try:
            metadata = path.lstat()
        except FileNotFoundError:
            digest.update(b"MISSING\0")
            return
        digest.update(str(metadata.st_mode).encode() + b"\0")
        if path.is_symlink():
            target = os.fsencode(os.readlink(path))
            digest.update(b"SYMLINK\0" + len(target).to_bytes(8, "big") + target)
            return
        if path.is_file():
            digest.update(b"FILE\0")
            with path.open("rb") as handle:
                for chunk in iter(lambda: handle.read(1024 * 1024), b""):
                    digest.update(chunk)
            return
        digest.update(b"OTHER\0")

    def _untracked_paths(self) -> list[str]:
        output = self._git("ls-files", "--others", "--exclude-standard", "-z").stdout
        return sorted(
            path for path in output.split("\0") if path and not self._is_protected(path)
        )

    @staticmethod
    def _is_protected(path: str) -> bool:
        return is_protected_workspace_path(path)

    def _restorable_paths(self, target: str) -> list[str]:
        target_paths = self._git("ls-tree", "-r", "--name-only", "-z", target).stdout.split("\0")
        index_paths = self._git("ls-files", "-z").stdout.split("\0")
        return sorted(
            path
            for path in set(target_paths + index_paths)
            if path and not self._is_protected(path)
        )

    @staticmethod
    def _identity_env(**overrides: str) -> dict[str, str]:
        env = os.environ.copy()
        env.update(
            GIT_AUTHOR_NAME="Waku Workbench",
            GIT_AUTHOR_EMAIL="waku@localhost",
            GIT_COMMITTER_NAME="Waku Workbench",
            GIT_COMMITTER_EMAIL="waku@localhost",
            **overrides,
        )
        return env

    def _git(
        self,
        *args: str,
        env: dict[str, str] | None = None,
        check: bool = True,
    ) -> subprocess.CompletedProcess[str]:
        try:
            return subprocess.run(
                ["git", *args],
                cwd=self.repository,
                env=env,
                text=True,
                capture_output=True,
                check=check,
            )
        except subprocess.CalledProcessError as error:
            message = error.stderr.strip() or error.stdout.strip() or "Git command failed"
            raise CheckpointError(message) from error
