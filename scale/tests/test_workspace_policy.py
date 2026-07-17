from __future__ import annotations

import subprocess
import threading
from pathlib import Path

from waku.ops.lab_checkpoint import GitCheckpointManager
from waku.ops.workspace_policy import (
    is_protected_workspace_path,
    workspace_mutation_lock,
)


def git(repository: Path, *args: str) -> str:
    return subprocess.run(
        ["git", *args], cwd=repository, text=True, capture_output=True, check=True,
    ).stdout.strip()


def test_shared_policy_protects_runtime_but_allows_safe_env_templates() -> None:
    protected = (
        ".git/config",
        ".env",
        ".envrc",
        ".envrc.local",
        ".env.production",
        "nested/.env-secret",
        "nested/production.env",
        ".waku/state.db",
        ".runtime/cache",
        "nested/traces/events.jsonl",
        "nested/state.db",
        "nested/state.db-wal",
        "nested/cache.sqlite3-journal",
    )
    for path in protected:
        assert is_protected_workspace_path(path), path
    for path in (".env.example", "nested/.env.sample", ".env.template", "src/database.py"):
        assert not is_protected_workspace_path(path), path


def test_workspace_mutation_lock_serializes_checkpoint_writers(tmp_path: Path) -> None:
    repository = tmp_path / "repository"
    repository.mkdir()
    git(repository, "init", "-b", "scale")
    git(repository, "config", "user.name", "Learner")
    git(repository, "config", "user.email", "learner@example.test")
    (repository / "app.py").write_text("baseline\n")
    git(repository, "add", "app.py")
    git(repository, "commit", "-m", "baseline")
    manager = GitCheckpointManager(repository)
    started = threading.Event()
    finished = threading.Event()

    def capture() -> None:
        started.set()
        manager.capture(chapter="01", session_id="thread", label="cooperative")
        finished.set()

    with workspace_mutation_lock(repository):
        worker = threading.Thread(target=capture)
        worker.start()
        assert started.wait(1)
        assert not finished.wait(0.2)
    worker.join(timeout=3)

    assert finished.is_set()
    assert len(git(repository, "for-each-ref", "refs/waku/checkpoints").splitlines()) == 1
