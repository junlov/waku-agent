"""SQLite-backed guided-lab experience state, independent of HTTP routing."""

from __future__ import annotations

import json
import sqlite3
import uuid
from collections.abc import Callable
from datetime import datetime, timezone
from typing import Any


SESSION_STATUSES = ("in_progress", "paused", "proof_ready", "passed", "abandoned")
_TRANSITIONS = {
    "in_progress": {"in_progress", "paused", "proof_ready", "abandoned"},
    "paused": {"paused", "in_progress", "abandoned"},
    "proof_ready": {"proof_ready", "in_progress", "passed", "abandoned"},
    "passed": {"passed"},
    "abandoned": {"abandoned"},
}


class LabSessionError(ValueError):
    """A requested session transition would make experience state dishonest."""


class LabSessionStore:
    """Persist resumable lab UX state without claiming curriculum completion.

    A ``passed`` row is only a mirror of caller-supplied Git authority. The
    store requires both a final commit and learner completion ref, but it does
    not create or validate either one.
    """

    def __init__(
        self,
        conn: sqlite3.Connection,
        *,
        now: Callable[[], datetime] | None = None,
    ):
        self.conn = conn
        self._now = now or (lambda: datetime.now(timezone.utc))

    def start(
        self,
        chapter: str,
        *,
        current_step: str,
        workspace_mode: str = "canonical",
        base_commit: str | None = None,
        session_id: str | None = None,
    ) -> dict[str, Any]:
        _required("chapter", chapter)
        _required("current_step", current_step)
        _required("workspace_mode", workspace_mode)
        identifier = session_id or str(uuid.uuid4())
        timestamp = self._timestamp()
        try:
            self.conn.execute(
                """
                INSERT INTO lab_sessions (
                    id, chapter, workspace_mode, current_step, status,
                    timer_seconds, timer_started_at, base_commit, started_at, updated_at
                ) VALUES (?, ?, ?, ?, 'in_progress', 0, ?, ?, ?, ?)
                """,
                (
                    identifier,
                    chapter,
                    workspace_mode,
                    current_step,
                    timestamp,
                    base_commit,
                    timestamp,
                    timestamp,
                ),
            )
        except sqlite3.IntegrityError as error:
            raise LabSessionError(f"lab session already exists: {identifier}") from error
        self._insert_event(
            identifier,
            "session_started",
            current_step,
            {"chapter": chapter, "workspace_mode": workspace_mode, "base_commit": base_commit},
            timestamp,
        )
        self.conn.commit()
        return self.get(identifier)

    def get(self, session_id: str) -> dict[str, Any]:
        row = self._get_row(session_id)
        value = dict(row)
        if value["status"] == "in_progress" and value["timer_started_at"]:
            value["timer_seconds"] = int(value["timer_seconds"]) + self._seconds_since(
                value["timer_started_at"]
            )
        return value

    def list(self, *, chapter: str | None = None) -> list[dict[str, Any]]:
        if chapter is None:
            rows = self.conn.execute(
                "SELECT * FROM lab_sessions ORDER BY updated_at DESC, id"
            ).fetchall()
        else:
            rows = self.conn.execute(
                "SELECT * FROM lab_sessions WHERE chapter=? ORDER BY updated_at DESC, id",
                (chapter,),
            ).fetchall()
        return [self._effective_row(row) for row in rows]

    def pause(self, session_id: str) -> dict[str, Any]:
        row = self._get_row(session_id)
        if row["status"] != "in_progress":
            raise LabSessionError("only an in-progress lab session can be paused")
        return self.transition(session_id, "paused")

    def resume(self, session_id: str) -> dict[str, Any]:
        row = self._get_row(session_id)
        if row["status"] not in {"paused", "proof_ready"}:
            raise LabSessionError("only a paused or proof-ready lab session can be resumed")
        return self.transition(session_id, "in_progress")

    def transition(
        self,
        session_id: str,
        status: str,
        *,
        current_step: str | None = None,
        final_commit: str | None = None,
        completion_ref: str | None = None,
        details: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        if status not in SESSION_STATUSES:
            raise LabSessionError(f"unknown lab session status: {status}")
        row = self._get_row(session_id)
        prior_status = str(row["status"])
        if status not in _TRANSITIONS[prior_status]:
            raise LabSessionError(f"cannot transition lab session from {prior_status} to {status}")
        next_step = current_step if current_step is not None else str(row["current_step"])
        _required("current_step", next_step)
        next_final_commit = final_commit or row["final_commit"]
        next_completion_ref = completion_ref or row["completion_ref"]
        if status == "passed" and (not next_final_commit or not next_completion_ref):
            raise LabSessionError(
                "passed experience state requires a final commit and learner completion ref; "
                "SQLite is not completion authority"
            )

        timestamp = self._timestamp()
        timer_seconds = int(row["timer_seconds"])
        timer_started_at = row["timer_started_at"]
        if prior_status == "in_progress" and status != "in_progress":
            timer_seconds += self._seconds_since(str(timer_started_at))
            timer_started_at = None
        elif prior_status != "in_progress" and status == "in_progress":
            timer_started_at = timestamp

        self.conn.execute(
            """
            UPDATE lab_sessions SET
                status=?, current_step=?, timer_seconds=?, timer_started_at=?,
                final_commit=?, completion_ref=?, updated_at=?
            WHERE id=?
            """,
            (
                status,
                next_step,
                timer_seconds,
                timer_started_at,
                next_final_commit,
                next_completion_ref,
                timestamp,
                session_id,
            ),
        )
        event_details = {"from": prior_status, "to": status, **(details or {})}
        self._insert_event(
            session_id, "status_transition", next_step, event_details, timestamp
        )
        if next_step != row["current_step"]:
            self._insert_event(
                session_id,
                "step_transition",
                next_step,
                {"from": row["current_step"], "to": next_step},
                timestamp,
            )
        self.conn.commit()
        return self.get(session_id)

    def record_event(
        self,
        session_id: str,
        event_type: str,
        *,
        step_id: str | None = None,
        details: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        self._get_row(session_id)
        _required("event_type", event_type)
        timestamp = self._timestamp()
        cursor = self._insert_event(
            session_id, event_type, step_id, details or {}, timestamp
        )
        self.conn.commit()
        row = self.conn.execute("SELECT * FROM lab_events WHERE id=?", (cursor.lastrowid,)).fetchone()
        assert row is not None
        return _event_row(row)

    def events(self, session_id: str) -> list[dict[str, Any]]:
        self._get_row(session_id)
        rows = self.conn.execute(
            "SELECT * FROM lab_events WHERE session_id=? ORDER BY id", (session_id,)
        ).fetchall()
        return [_event_row(row) for row in rows]

    def record_checkpoint(
        self,
        session_id: str,
        *,
        name: str,
        git_ref: str,
        checkpoint_type: str = "manual",
        commit_sha: str | None = None,
        metadata: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        row = self._get_row(session_id)
        _required("checkpoint name", name)
        _required("checkpoint Git ref", git_ref)
        _required("checkpoint type", checkpoint_type)
        timestamp = self._timestamp()
        encoded = json.dumps(metadata or {}, sort_keys=True, separators=(",", ":"))
        self.conn.execute(
            """
            INSERT INTO lab_checkpoints (
                session_id, name, git_ref, checkpoint_type, commit_sha,
                metadata_json, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(session_id, name) DO UPDATE SET
                git_ref=excluded.git_ref,
                checkpoint_type=excluded.checkpoint_type,
                commit_sha=excluded.commit_sha,
                metadata_json=excluded.metadata_json,
                created_at=excluded.created_at
            """,
            (
                session_id,
                name,
                git_ref,
                checkpoint_type,
                commit_sha,
                encoded,
                timestamp,
            ),
        )
        self._insert_event(
            session_id,
            "checkpoint_recorded",
            str(row["current_step"]),
            {"name": name, "git_ref": git_ref, "checkpoint_type": checkpoint_type},
            timestamp,
        )
        self.conn.commit()
        checkpoint = self.conn.execute(
            "SELECT * FROM lab_checkpoints WHERE session_id=? AND name=?",
            (session_id, name),
        ).fetchone()
        assert checkpoint is not None
        return _checkpoint_row(checkpoint)

    def checkpoints(self, session_id: str) -> list[dict[str, Any]]:
        self._get_row(session_id)
        rows = self.conn.execute(
            "SELECT * FROM lab_checkpoints WHERE session_id=? ORDER BY id", (session_id,)
        ).fetchall()
        return [_checkpoint_row(row) for row in rows]

    def _get_row(self, session_id: str) -> sqlite3.Row:
        row = self.conn.execute("SELECT * FROM lab_sessions WHERE id=?", (session_id,)).fetchone()
        if row is None:
            raise LabSessionError(f"unknown lab session: {session_id}")
        return row

    def _effective_row(self, row: sqlite3.Row) -> dict[str, Any]:
        value = dict(row)
        if value["status"] == "in_progress" and value["timer_started_at"]:
            value["timer_seconds"] = int(value["timer_seconds"]) + self._seconds_since(
                value["timer_started_at"]
            )
        return value

    def _insert_event(
        self,
        session_id: str,
        event_type: str,
        step_id: str | None,
        details: dict[str, Any],
        created_at: str,
    ) -> sqlite3.Cursor:
        return self.conn.execute(
            """
            INSERT INTO lab_events (session_id, event_type, step_id, details_json, created_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                session_id,
                event_type,
                step_id,
                json.dumps(details, sort_keys=True, separators=(",", ":")),
                created_at,
            ),
        )

    def _timestamp(self) -> str:
        return self._now().astimezone(timezone.utc).isoformat(timespec="milliseconds")

    def _seconds_since(self, timestamp: str) -> int:
        started = datetime.fromisoformat(timestamp)
        return max(0, int((self._now().astimezone(timezone.utc) - started).total_seconds()))


def _event_row(row: sqlite3.Row) -> dict[str, Any]:
    value = dict(row)
    value["details"] = json.loads(value.pop("details_json"))
    return value


def _checkpoint_row(row: sqlite3.Row) -> dict[str, Any]:
    value = dict(row)
    value["metadata"] = json.loads(value.pop("metadata_json"))
    return value


def _required(name: str, value: str) -> None:
    if not isinstance(value, str) or not value.strip():
        raise LabSessionError(f"{name} must be non-empty text")
