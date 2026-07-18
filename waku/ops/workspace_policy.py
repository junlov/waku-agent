"""Shared safety policy for source workspaces and persistent runtime paths."""

from __future__ import annotations

import re
import fcntl
import subprocess
import threading
from contextlib import contextmanager
from pathlib import Path, PurePath
from typing import Iterator


ENV_TEMPLATES = {".env.example", ".env.sample", ".env.template"}
PROTECTED_DIRECTORIES = {".git", ".waku", ".runtime", "traces"}
DATABASE_NAME = re.compile(
    r".*(?:\.db|\.sqlite|\.sqlite3)(?:-(?:wal|shm|journal))?$",
    re.IGNORECASE,
)
_THREAD_LOCKS: dict[Path, threading.RLock] = {}
_THREAD_LOCKS_GUARD = threading.Lock()
_LOCK_STATE = threading.local()


class WorkspaceMutationBusy(RuntimeError):
    """Raised when a caller requests the mutation lease without waiting."""

PROTECTED_GITIGNORE_PATTERNS = (
    ".git/",
    ".env",
    ".envrc",
    ".env.*",
    "!.env.example",
    "!.env.sample",
    "!.env.template",
    "*.env",
    ".waku/",
    ".runtime/",
    "traces/",
    "*.db",
    "*.db-wal",
    "*.db-shm",
    "*.db-journal",
    "*.sqlite",
    "*.sqlite-wal",
    "*.sqlite-shm",
    "*.sqlite-journal",
    "*.sqlite3",
    "*.sqlite3-wal",
    "*.sqlite3-shm",
    "*.sqlite3-journal",
)


def is_protected_workspace_path(path: str | PurePath) -> bool:
    """Return whether a relative workspace path is Git, secret, or runtime state."""
    parts = PurePath(path).parts
    for part in parts:
        if part in PROTECTED_DIRECTORIES:
            return True
        lowered = part.lower()
        if lowered in ENV_TEMPLATES:
            continue
        if lowered == "production.env":
            return True
        if lowered.startswith(".env") or lowered.endswith(".env"):
            return True
        if DATABASE_NAME.fullmatch(part):
            return True
    return False


def validate_isolated_paths(**paths: Path) -> dict[str, Path]:
    """Resolve and reject root, duplicate, or nested persistent control paths."""
    resolved = {name: path.expanduser().resolve() for name, path in paths.items()}
    for name, path in resolved.items():
        if path == Path(path.anchor):
            raise RuntimeError(f"{name} must not be a filesystem root: {path}")
    items = list(resolved.items())
    for index, (left_name, left) in enumerate(items):
        for right_name, right in items[index + 1:]:
            if left == right or left.is_relative_to(right) or right.is_relative_to(left):
                raise RuntimeError(
                    f"{left_name} and {right_name} must be distinct, non-overlapping paths"
                )
    return resolved


def _advisory_lock_path(repository: Path) -> Path:
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--git-path", "waku-workspace.lock"],
            cwd=repository,
            text=True,
            capture_output=True,
            check=False,
            timeout=30,
        )
    except subprocess.TimeoutExpired as error:
        raise RuntimeError(
            f"workspace mutation lock probe timed out: {repository}"
        ) from error
    if result.returncode:
        raise RuntimeError(f"workspace mutation lock requires a Git repository: {repository}")
    path = Path(result.stdout.strip())
    return path if path.is_absolute() else repository / path


@contextmanager
def workspace_mutation_lock(repository: Path, *, blocking: bool = True) -> Iterator[None]:
    """Serialize workspace writers across threads and cooperating processes."""
    root = repository.resolve()
    with _THREAD_LOCKS_GUARD:
        thread_lock = _THREAD_LOCKS.setdefault(root, threading.RLock())
    if not thread_lock.acquire(blocking=blocking):
        raise WorkspaceMutationBusy(f"workspace is busy: {root}")
    try:
        held = getattr(_LOCK_STATE, "held", {})
        depth, handle = held.get(root, (0, None))
        if depth == 0:
            lock_path = _advisory_lock_path(root)
            lock_path.parent.mkdir(parents=True, exist_ok=True)
            handle = lock_path.open("a+")
            lock_flags = fcntl.LOCK_EX | (0 if blocking else fcntl.LOCK_NB)
            try:
                fcntl.flock(handle.fileno(), lock_flags)
            except BlockingIOError as exc:
                handle.close()
                raise WorkspaceMutationBusy(f"workspace is busy: {root}") from exc
        held[root] = (depth + 1, handle)
        _LOCK_STATE.held = held
        try:
            yield
        finally:
            depth, handle = held[root]
            if depth == 1:
                fcntl.flock(handle.fileno(), fcntl.LOCK_UN)
                handle.close()
                del held[root]
            else:
                held[root] = (depth - 1, handle)
    finally:
        thread_lock.release()
