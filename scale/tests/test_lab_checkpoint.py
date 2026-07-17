from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

import pytest

from waku.ops.lab_checkpoint import CheckpointError, GitCheckpointManager, sanitize_name


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
    root.mkdir()
    git(root, "init", "-b", "scale")
    git(root, "config", "user.name", "Learner")
    git(root, "config", "user.email", "learner@example.test")
    (root / ".gitignore").write_text(".env\n.waku/\n")
    (root / "app.py").write_text("baseline\n")
    git(root, "add", ".gitignore", "app.py")
    git(root, "commit", "-m", "baseline")
    return root


def test_checkpoint_uses_private_ref_and_temporary_index(tmp_path: Path) -> None:
    root = repository(tmp_path)
    (root / "staged.py").write_text("staged\n")
    git(root, "add", "staged.py")
    (root / "app.py").write_text("learner edit\n")
    (root / "notes.md").write_text("untracked evidence\n")
    (root / ".env").write_text("SECRET=one\n")
    cached_before = git(root, "diff", "--cached", "--binary")

    checkpoint = GitCheckpointManager(root).capture(
        chapter="01", session_id="Session / One", label="Before risky change",
    )

    assert checkpoint["ref"].startswith("refs/waku/checkpoints/01/session-one/")
    assert git(root, "show", f"{checkpoint['ref']}:app.py") == "learner edit"
    assert git(root, "show", f"{checkpoint['ref']}:notes.md") == "untracked evidence"
    assert git(root, "diff", "--cached", "--binary") == cached_before
    assert not list((root / ".git").glob("waku-index-*"))
    assert subprocess.run(
        ["git", "cat-file", "-e", f"{checkpoint['ref']}:.env"], cwd=root,
    ).returncode != 0


def test_restore_requires_current_token_and_preserves_secret_and_index(tmp_path: Path) -> None:
    root = repository(tmp_path)
    (root / "staged.py").write_text("staged\n")
    git(root, "add", "staged.py")
    (root / "app.py").write_text("checkpoint state\n")
    (root / "notes.md").write_text("checkpoint note\n")
    (root / ".env").write_text("SECRET=before\n")
    manager = GitCheckpointManager(root)
    saved = manager.capture(chapter="01", session_id="session-1", label="saved")
    cached_before = git(root, "diff", "--cached", "--binary")

    (root / "app.py").write_text("later state\n")
    (root / "notes.md").write_text("later note\n")
    (root / "remove-me.txt").write_text("temporary\n")
    (root / ".env").write_text("SECRET=keep-me\n")
    refs_before = git(root, "for-each-ref", "--format=%(refname)", "refs/waku/checkpoints")
    preview = manager.prepare_restore(saved["ref"])
    refs_after = git(root, "for-each-ref", "--format=%(refname)", "refs/waku/checkpoints")

    assert refs_after == refs_before
    assert "app.py" in preview["diff"]
    assert "Index replacement:" in preview["diff"]
    assert "Worktree replacement:" in preview["diff"]
    assert "remove-me.txt" in preview["untracked"]
    with pytest.raises(CheckpointError, match="confirmation expired"):
        manager.confirm_restore(
            ref=saved["ref"], token="wrong", chapter="01", session_id="session-1",
        )
    assert (root / "app.py").read_text() == "later state\n"

    result = manager.confirm_restore(
        ref=saved["ref"], token=preview["token"], chapter="01", session_id="session-1",
    )

    assert result["recovery"]["kind"] == "pre-restore"
    assert (root / "app.py").read_text() == "checkpoint state\n"
    assert (root / "notes.md").read_text() == "checkpoint note\n"
    assert not (root / "remove-me.txt").exists()
    assert (root / ".env").read_text() == "SECRET=keep-me\n"
    assert git(root, "diff", "--cached", "--binary") != cached_before
    assert git(root, "diff", "--cached", saved["ref"]) == ""
    assert git(root, "diff", saved["ref"]) == ""


def test_restore_rechecks_consent_after_recovery_capture(tmp_path: Path, monkeypatch) -> None:
    root = repository(tmp_path)
    manager = GitCheckpointManager(root)
    saved = manager.capture(chapter="01", session_id="session-1", label="saved")
    (root / "app.py").write_text("consented state\n")
    (root / "remove-me.txt").write_text("must remain\n")
    preview = manager.prepare_restore(saved["ref"])
    original_capture = manager.capture

    def capture_then_mutate(**kwargs):
        recovery = original_capture(**kwargs)
        (root / "app.py").write_text("mutation during recovery capture\n")
        return recovery

    monkeypatch.setattr(manager, "capture", capture_then_mutate)
    with pytest.raises(CheckpointError, match="confirmation expired"):
        manager.confirm_restore(
            ref=saved["ref"],
            token=preview["token"],
            chapter="01",
            session_id="session-1",
        )

    assert (root / "app.py").read_text() == "mutation during recovery capture\n"
    assert (root / "remove-me.txt").read_text() == "must remain\n"
    assert len(
        git(root, "for-each-ref", "--format=%(refname)", "refs/waku/checkpoints").splitlines()
    ) == 2


def test_restore_unlinks_symlinks_without_following_targets(tmp_path: Path) -> None:
    root = repository(tmp_path)
    outside = tmp_path / "outside-secret.txt"
    outside.write_text("outside must survive\n")
    manager = GitCheckpointManager(root)
    saved = manager.capture(chapter="01", session_id="session-1", label="saved")
    (root / "internal-link").symlink_to("app.py")
    (root / "external-link").symlink_to(outside)
    preview = manager.prepare_restore(saved["ref"])

    manager.confirm_restore(
        ref=saved["ref"],
        token=preview["token"],
        chapter="01",
        session_id="session-1",
    )

    assert not (root / "internal-link").exists()
    assert not (root / "external-link").exists()
    assert (root / "app.py").read_text() == "baseline\n"
    assert outside.read_text() == "outside must survive\n"


def test_checkpoint_consistently_excludes_protected_runtime_paths(tmp_path: Path) -> None:
    root = repository(tmp_path)
    protected = {
        ".env.local": "root env\n",
        "nested/.env": "nested env\n",
        "nested/production.env": "nested suffix env\n",
        ".waku/state.db": "journal\n",
        ".runtime/cache": "runtime\n",
        "traces/events.jsonl": "trace\n",
        "nested/state.db": "state\n",
        "nested/runtime.db-wal": "wal\n",
        "nested/runtime.db-journal": "journal sidecar\n",
        "nested/cache.sqlite3-shm": "sqlite sidecar\n",
    }
    for relative, value in protected.items():
        path = root / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(value)
    manager = GitCheckpointManager(root)
    saved = manager.capture(chapter="01", session_id="session-1", label="saved")
    tree = set(git(root, "ls-tree", "-r", "--name-only", saved["ref"]).splitlines())
    assert not tree.intersection(protected)
    (root / "ordinary.txt").write_text("remove\n")
    preview = manager.prepare_restore(saved["ref"])
    assert not set(preview["untracked"]).intersection(protected)
    for relative in protected:
        (root / relative).write_text("preserved after preview\n")
    refreshed = manager.prepare_restore(saved["ref"])

    manager.confirm_restore(
        ref=saved["ref"],
        token=refreshed["token"],
        chapter="01",
        session_id="session-1",
    )

    assert not (root / "ordinary.txt").exists()
    for relative in protected:
        assert (root / relative).read_text() == "preserved after preview\n"


@pytest.mark.parametrize(
    "mutation",
    ("head", "index", "tracked", "untracked-content", "untracked-mode", "symlink"),
)
def test_restore_token_expires_after_any_repository_state_change(
    tmp_path: Path, mutation: str,
) -> None:
    root = repository(tmp_path)
    manager = GitCheckpointManager(root)
    saved = manager.capture(chapter="01", session_id="session-1", label="saved")
    (root / "untracked.txt").write_text("one\n")
    (root / "link").symlink_to("untracked.txt")
    preview = manager.prepare_restore(saved["ref"])
    refs_before = git(root, "for-each-ref", "--format=%(refname)", "refs/waku/checkpoints")

    if mutation == "head":
        (root / "head.txt").write_text("new head\n")
        git(root, "add", "head.txt")
        git(root, "commit", "-m", "move head")
    elif mutation == "index":
        (root / "index.txt").write_text("staged\n")
        git(root, "add", "index.txt")
    elif mutation == "tracked":
        (root / "app.py").write_text("changed tracked content\n")
    elif mutation == "untracked-content":
        (root / "untracked.txt").write_text("two\n")
    elif mutation == "untracked-mode":
        os.chmod(root / "untracked.txt", 0o755)
    else:
        (root / "link").unlink()
        (root / "link").symlink_to("app.py")

    with pytest.raises(CheckpointError, match="confirmation expired"):
        manager.confirm_restore(
            ref=saved["ref"], token=preview["token"], chapter="01", session_id="session-1",
        )
    assert git(root, "for-each-ref", "--format=%(refname)", "refs/waku/checkpoints") == refs_before


def test_passed_chapter_replay_is_disposable_and_external(tmp_path: Path) -> None:
    root = repository(tmp_path)
    git(root, "tag", "learner/chapter-01-passed")
    replay_root = tmp_path / "replays"

    result = GitCheckpointManager(root).replay_passed_chapter(
        "01",
        [sys.executable, "-c", "from pathlib import Path; print(Path.cwd()); print('replayed')"],
        worktrees_root=replay_root,
    )

    assert result["exit_code"] == 0
    assert "replayed" in result["stdout"]
    assert not Path(result["workspace"]).exists()
    assert not Path(result["workspace"]).is_relative_to(root)
    assert git(root, "worktree", "list", "--porcelain").count("worktree ") == 1


def test_checkpoint_names_are_sanitized() -> None:
    assert sanitize_name(" Chapter 01 / Before! ") == "chapter-01-before"
    with pytest.raises(CheckpointError):
        sanitize_name("///")
