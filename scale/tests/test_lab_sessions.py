from __future__ import annotations

import sqlite3
from datetime import datetime, timedelta, timezone

import pytest

from waku.db import connect
from waku.ops.lab_sessions import LabSessionError, LabSessionStore, SESSION_STATUSES


OLD_SCHEMA = """
CREATE TABLE learning_journal (
    chapter TEXT PRIMARY KEY,
    track TEXT NOT NULL DEFAULT 'brief',
    goal TEXT NOT NULL DEFAULT '',
    hypothesis TEXT NOT NULL DEFAULT '',
    evidence TEXT NOT NULL DEFAULT '',
    decision TEXT NOT NULL DEFAULT '',
    correction TEXT NOT NULL DEFAULT '',
    next_step TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE lab_attempts (
    id INTEGER PRIMARY KEY,
    chapter TEXT NOT NULL,
    action TEXT NOT NULL,
    command TEXT NOT NULL,
    exit_code INTEGER NOT NULL,
    output TEXT NOT NULL DEFAULT '',
    started_at TEXT NOT NULL,
    duration_ms INTEGER NOT NULL DEFAULT 0,
    attached_to_journal INTEGER NOT NULL DEFAULT 0
);
"""


class Clock:
    def __init__(self) -> None:
        self.value = datetime(2026, 7, 17, 12, 0, tzinfo=timezone.utc)

    def __call__(self) -> datetime:
        return self.value

    def advance(self, seconds: int) -> None:
        self.value += timedelta(seconds=seconds)


def test_additive_migration_preserves_old_journal_and_attempt_rows(tmp_path) -> None:
    path = tmp_path / "state.db"
    old = sqlite3.connect(path)
    old.executescript(OLD_SCHEMA)
    old.execute(
        "INSERT INTO learning_journal (chapter, track, goal) VALUES ('01', 'architect', 'Keep')"
    )
    old.execute(
        """
        INSERT INTO lab_attempts (
            chapter, action, command, exit_code, output, started_at, duration_ms
        ) VALUES ('01', 'measure', 'make scale-01', 0, 'baseline', '2026-07-17', 12)
        """
    )
    old.commit()
    old.close()

    migrated = connect(tmp_path)
    attempt = migrated.execute("SELECT * FROM lab_attempts").fetchone()
    journal = migrated.execute("SELECT * FROM learning_journal").fetchone()
    tables = {
        row[0]
        for row in migrated.execute(
            "SELECT name FROM sqlite_master WHERE type='table'"
        ).fetchall()
    }

    assert journal["goal"] == "Keep"
    assert attempt["command"] == "make scale-01"
    assert attempt["session_id"] is None
    assert attempt["step_id"] is None
    assert attempt["action_id"] is None
    assert {"lab_sessions", "lab_checkpoints", "lab_events"} <= tables
    migrated.close()

    reopened = connect(tmp_path)
    assert reopened.execute("SELECT count(*) FROM lab_attempts").fetchone()[0] == 1
    assert reopened.execute("SELECT count(*) FROM learning_journal").fetchone()[0] == 1


def test_additive_migration_preserves_sessions_created_before_replay_identity(
    tmp_path,
) -> None:
    path = tmp_path / "state.db"
    old = sqlite3.connect(path)
    old.executescript(
        """
        CREATE TABLE lab_sessions (
            id TEXT PRIMARY KEY,
            chapter TEXT NOT NULL,
            workspace_mode TEXT NOT NULL DEFAULT 'canonical',
            current_step TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'in_progress',
            timer_seconds INTEGER NOT NULL DEFAULT 0,
            timer_started_at TEXT,
            base_commit TEXT,
            final_commit TEXT,
            completion_ref TEXT,
            started_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );
        INSERT INTO lab_sessions (
            id, chapter, current_step, started_at, updated_at
        ) VALUES ('old-session', '01', '01-observe', '2026-07-17', '2026-07-17');
        """
    )
    old.commit()
    old.close()

    migrated = connect(tmp_path)
    row = migrated.execute(
        "SELECT workspace_key, workspace_ref, current_step FROM lab_sessions "
        "WHERE id='old-session'"
    ).fetchone()

    assert tuple(row) == (None, None, "01-observe")
    assert {
        item[1] for item in migrated.execute("PRAGMA table_info(lab_sessions)")
    } >= {"workspace_key", "workspace_ref"}


def test_session_timer_pause_resume_steps_and_git_backed_pass_mirror(tmp_path) -> None:
    clock = Clock()
    store = LabSessionStore(connect(tmp_path), now=clock)
    started = store.start(
        "01",
        session_id="session-01",
        current_step="01-observe",
        workspace_mode="canonical",
        base_commit="base123",
    )
    assert started["status"] == "in_progress"
    assert started["timer_seconds"] == 0
    assert tuple(SESSION_STATUSES) == (
        "in_progress",
        "paused",
        "proof_ready",
        "passed",
        "abandoned",
    )

    clock.advance(12)
    paused = store.pause("session-01")
    assert paused["status"] == "paused"
    assert paused["timer_seconds"] == 12
    assert paused["timer_started_at"] is None

    clock.advance(30)
    resumed = store.resume("session-01")
    assert resumed["status"] == "in_progress"
    clock.advance(8)
    ready = store.transition(
        "session-01", "proof_ready", current_step="01-prove"
    )
    assert ready["timer_seconds"] == 20
    assert ready["current_step"] == "01-prove"

    with pytest.raises(LabSessionError, match="SQLite is not completion authority"):
        store.transition("session-01", "passed")
    passed = store.transition(
        "session-01",
        "passed",
        final_commit="final456",
        completion_ref="learner/chapter-01-passed",
    )
    assert passed["status"] == "passed"
    assert passed["final_commit"] == "final456"
    assert passed["completion_ref"] == "learner/chapter-01-passed"
    with pytest.raises(LabSessionError, match="cannot transition"):
        store.transition("session-01", "in_progress")

    events = store.events("session-01")
    assert [event["event_type"] for event in events] == [
        "session_started",
        "status_transition",
        "status_transition",
        "status_transition",
        "step_transition",
        "status_transition",
    ]
    assert events[-1]["details"] == {"from": "proof_ready", "to": "passed"}


def test_events_and_checkpoint_metadata_are_queryable(tmp_path) -> None:
    clock = Clock()
    store = LabSessionStore(connect(tmp_path), now=clock)
    store.start("01", session_id="session-01", current_step="01-observe")

    event = store.record_event(
        "session-01",
        "hint_revealed",
        step_id="01-observe",
        details={"level": 1, "hint_id": "01-observe-hint-1"},
    )
    checkpoint = store.record_checkpoint(
        "session-01",
        name="before-slo-edit",
        git_ref="refs/waku/checkpoints/session-01/before-slo-edit",
        checkpoint_type="manual",
        commit_sha="abc123",
        metadata={"dirty_paths": ["docs/scale/SLO.md"]},
    )

    assert event["details"]["level"] == 1
    assert checkpoint["metadata"] == {"dirty_paths": ["docs/scale/SLO.md"]}
    assert store.checkpoints("session-01")[0]["git_ref"].startswith(
        "refs/waku/checkpoints/"
    )
    assert store.events("session-01")[-1]["event_type"] == "checkpoint_recorded"


def test_terminal_session_states_cannot_be_resumed(tmp_path) -> None:
    store = LabSessionStore(connect(tmp_path))
    store.start("01", session_id="abandoned", current_step="01-observe")
    store.transition("abandoned", "abandoned")

    with pytest.raises(LabSessionError, match="paused or proof-ready"):
        store.resume("abandoned")
    with pytest.raises(LabSessionError, match="only an in-progress"):
        store.pause("abandoned")


def test_canonical_chapter_allows_only_one_active_session(tmp_path) -> None:
    store = LabSessionStore(connect(tmp_path))
    store.start("01", current_step="01-observe", session_id="first")

    with pytest.raises(LabSessionError, match="already has an active canonical"):
        store.start("01", current_step="01-observe", session_id="second")

    other = store.start("02", current_step="02-observe", session_id="other-chapter")
    assert other["chapter"] == "02"
    replay = store.start(
        "01",
        current_step="01-observe",
        workspace_mode="replay",
        workspace_key="a" * 32,
        workspace_ref="chapter-01-start",
        session_id="replay-one",
    )
    assert replay["workspace_mode"] == "replay"

    store.pause("first")
    with pytest.raises(LabSessionError, match="already has an active canonical"):
        store.start("01", current_step="01-observe", session_id="third")

    store.transition("first", "abandoned")
    assert store.start("01", current_step="01-observe", session_id="fourth")["id"] == "fourth"
