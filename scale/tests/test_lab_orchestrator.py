from __future__ import annotations

import subprocess
import threading
from pathlib import Path

import pytest

from waku.db import connect
from waku.ops.lab_checkpoint import GitCheckpointManager
from waku.ops.lab_orchestrator import LabOrchestrationError, LabOrchestrator
from waku.ops.lab_sessions import LabSessionStore
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
    root.mkdir()
    git(root, "init", "-b", "scale")
    git(root, "config", "user.name", "Learner")
    git(root, "config", "user.email", "learner@example.test")
    (root / ".gitignore").write_text(".env\n.waku/\n")
    (root / "app.py").write_text("baseline\n")
    git(root, "add", ".gitignore", "app.py")
    git(root, "commit", "-m", "baseline")
    return root


def orchestrator(tmp_path: Path) -> tuple[Path, LabSessionStore, LabOrchestrator]:
    root = repository(tmp_path)
    state = tmp_path / "state"
    state.mkdir()
    sessions = LabSessionStore(connect(state))
    sessions.start("01", session_id="session-01", current_step="01-repair")
    return root, sessions, LabOrchestrator(sessions, GitCheckpointManager(root))


def test_checkpoint_restore_links_git_refs_and_sqlite_recovery(tmp_path: Path) -> None:
    root, sessions, labs = orchestrator(tmp_path)
    (root / "app.py").write_text("checkpoint state\n")
    (root / "notes.md").write_text("checkpoint evidence\n")

    checkpoint = labs.create_checkpoint(
        session_id="session-01",
        chapter="01",
        label="Before repair",
    )

    assert git(root, "rev-parse", checkpoint["git_ref"]) == checkpoint["commit_sha"]
    assert git(root, "show", f"{checkpoint['git_ref']}:app.py") == "checkpoint state"
    assert checkpoint["metadata"]["chapter"] == "01"
    assert sessions.events("session-01")[-1]["event_type"] == "checkpoint_recorded"

    (root / "app.py").write_text("broken later state\n")
    refs_before = git(root, "for-each-ref", "--format=%(refname)", "refs/waku/checkpoints")
    preview = labs.prepare_restore(
        session_id="session-01", checkpoint_ref=checkpoint["git_ref"]
    )
    refs_after = git(root, "for-each-ref", "--format=%(refname)", "refs/waku/checkpoints")

    assert refs_after == refs_before
    assert sessions.events("session-01")[-1]["event_type"] == "restore_prepared"

    restored = labs.confirm_restore(
        session_id="session-01",
        checkpoint_ref=checkpoint["git_ref"],
        token=preview["token"],
    )

    recovery = restored["recovery_checkpoint"]
    assert (root / "app.py").read_text() == "checkpoint state\n"
    assert recovery["checkpoint_type"] == "pre-restore"
    assert recovery["git_ref"] == restored["recovery"]["ref"]
    assert recovery["commit_sha"] == restored["recovery"]["commit_oid"]
    assert git(root, "rev-parse", recovery["git_ref"]) == recovery["commit_sha"]
    assert recovery["metadata"]["restored_checkpoint_ref"] == checkpoint["git_ref"]
    assert sessions.events("session-01")[-1]["event_type"] == "restore_confirmed"


def test_restore_rejects_checkpoint_not_recorded_for_session(tmp_path: Path) -> None:
    root, sessions, labs = orchestrator(tmp_path)
    # Captured straight on the checkpoint manager: git-valid, but never
    # recorded in the session store (a second canonical session per chapter
    # is rejected by LabSessionStore.start anyway).
    external = GitCheckpointManager(root).capture(
        chapter="01", session_id="other-session", label="external"
    )
    events_before = sessions.events("session-01")

    with pytest.raises(LabOrchestrationError, match="not recorded for this lab session"):
        labs.prepare_restore(
            session_id="session-01", checkpoint_ref=external["ref"]
        )

    assert sessions.events("session-01") == events_before


def test_restore_rejects_recorded_checkpoint_ref_retargeting_before_mutation(
    tmp_path: Path,
) -> None:
    root, sessions, labs = orchestrator(tmp_path)
    (root / "app.py").write_text("recorded checkpoint\n")
    checkpoint = labs.create_checkpoint(
        session_id="session-01", chapter="01", label="recorded"
    )
    (root / "app.py").write_text("retargeted commit\n")
    git(root, "add", "app.py")
    git(root, "commit", "-m", "retarget checkpoint ref")
    git(root, "update-ref", checkpoint["git_ref"], "HEAD")
    retargeted_preview = GitCheckpointManager(root).prepare_restore(checkpoint["git_ref"])
    events_before = sessions.events("session-01")

    with pytest.raises(LabOrchestrationError, match="session-recorded commit"):
        labs.prepare_restore(
            session_id="session-01", checkpoint_ref=checkpoint["git_ref"]
        )
    with pytest.raises(LabOrchestrationError, match="session-recorded commit"):
        labs.confirm_restore(
            session_id="session-01",
            checkpoint_ref=checkpoint["git_ref"],
            token=retargeted_preview["token"],
        )

    assert (root / "app.py").read_text() == "retargeted commit\n"
    assert sessions.events("session-01") == events_before
    assert len(sessions.checkpoints("session-01")) == 1


def test_confirm_restore_pins_recorded_target_against_cooperative_retarget(
    tmp_path: Path,
    monkeypatch,
) -> None:
    root, sessions, labs = orchestrator(tmp_path)
    (root / "app.py").write_text("recorded checkpoint\n")
    checkpoint = labs.create_checkpoint(
        session_id="session-01", chapter="01", label="recorded"
    )
    (root / "app.py").write_text("alternate commit\n")
    git(root, "add", "app.py")
    git(root, "commit", "-m", "alternate target")
    alternate = git(root, "rev-parse", "HEAD")
    preview = labs.prepare_restore(
        session_id="session-01", checkpoint_ref=checkpoint["git_ref"]
    )
    original_confirm = labs.checkpoints.confirm_restore
    retarget_started = threading.Event()
    retarget_finished = threading.Event()
    workers: list[threading.Thread] = []

    def retarget() -> None:
        retarget_started.set()
        with workspace_mutation_lock(root):
            git(root, "update-ref", checkpoint["git_ref"], alternate)
        retarget_finished.set()

    def confirm_with_competing_retarget(**kwargs):
        worker = threading.Thread(target=retarget)
        workers.append(worker)
        worker.start()
        assert retarget_started.wait(1)
        assert not retarget_finished.wait(0.2)
        return original_confirm(**kwargs)

    monkeypatch.setattr(labs.checkpoints, "confirm_restore", confirm_with_competing_retarget)
    restored = labs.confirm_restore(
        session_id="session-01",
        checkpoint_ref=checkpoint["git_ref"],
        token=preview["token"],
    )
    for worker in workers:
        worker.join(timeout=3)

    assert restored["target_oid"] == checkpoint["commit_sha"]
    assert (root / "app.py").read_text() == "recorded checkpoint\n"
    assert retarget_finished.is_set()
    assert git(root, "rev-parse", checkpoint["git_ref"]) == alternate
    assert sessions.events("session-01")[-1]["event_type"] == "restore_confirmed"


def test_confirm_restore_rejects_returned_target_mismatch_before_sqlite_record(
    tmp_path: Path,
    monkeypatch,
) -> None:
    _root, sessions, labs = orchestrator(tmp_path)
    checkpoint = labs.create_checkpoint(
        session_id="session-01", chapter="01", label="recorded"
    )
    preview = labs.prepare_restore(
        session_id="session-01", checkpoint_ref=checkpoint["git_ref"]
    )
    events_before = sessions.events("session-01")
    checkpoints_before = sessions.checkpoints("session-01")

    monkeypatch.setattr(
        labs.checkpoints,
        "confirm_restore",
        lambda **_kwargs: {"restored": True, "target_oid": "0" * 40},
    )
    with pytest.raises(LabOrchestrationError, match="session-recorded commit"):
        labs.confirm_restore(
            session_id="session-01",
            checkpoint_ref=checkpoint["git_ref"],
            token=preview["token"],
        )

    assert sessions.events("session-01") == events_before
    assert sessions.checkpoints("session-01") == checkpoints_before


def test_chapter_mismatch_does_not_create_git_or_sqlite_checkpoint(tmp_path: Path) -> None:
    root, sessions, labs = orchestrator(tmp_path)
    refs_before = git(root, "for-each-ref", "--format=%(refname)", "refs/waku/checkpoints")

    with pytest.raises(LabOrchestrationError, match="belongs to chapter 01"):
        labs.create_checkpoint(
            session_id="session-01", chapter="02", label="dishonest"
        )

    assert git(root, "for-each-ref", "--format=%(refname)", "refs/waku/checkpoints") == refs_before
    assert sessions.checkpoints("session-01") == []


def test_mark_passed_requires_real_exact_tag_clean_head_and_matching_commit(
    tmp_path: Path,
) -> None:
    root, sessions, labs = orchestrator(tmp_path)
    sessions.transition("session-01", "proof_ready", current_step="01-prove")
    events_before = sessions.events("session-01")
    head = git(root, "rev-parse", "HEAD")

    with pytest.raises(LabOrchestrationError, match="must be exactly"):
        labs.mark_passed(
            session_id="session-01",
            chapter="01",
            final_commit=head,
            completion_ref="learner/chapter-02-passed",
        )
    with pytest.raises(LabOrchestrationError, match="does not exist"):
        labs.mark_passed(
            session_id="session-01",
            chapter="01",
            final_commit=head,
            completion_ref="learner/chapter-01-passed",
        )
    assert sessions.get("session-01")["status"] == "proof_ready"
    assert sessions.events("session-01") == events_before

    git(root, "tag", "learner/chapter-01-passed")
    with pytest.raises(LabOrchestrationError, match="final commit does not match"):
        labs.mark_passed(
            session_id="session-01",
            chapter="01",
            final_commit="0" * 40,
            completion_ref="learner/chapter-01-passed",
        )

    (root / "dirty.txt").write_text("not proof\n")
    with pytest.raises(LabOrchestrationError, match="workspace must be clean"):
        labs.mark_passed(
            session_id="session-01",
            chapter="01",
            final_commit=head,
            completion_ref="learner/chapter-01-passed",
        )
    assert sessions.get("session-01")["status"] == "proof_ready"
    assert sessions.events("session-01") == events_before

    (root / "dirty.txt").unlink()
    passed = labs.mark_passed(
        session_id="session-01",
        chapter="01",
        final_commit=head,
        completion_ref="learner/chapter-01-passed",
    )

    assert passed["status"] == "passed"
    assert passed["final_commit"] == head
    assert passed["completion_ref"] == "learner/chapter-01-passed"
    assert sessions.events("session-01")[-1]["details"]["git_authority_verified"] is True
