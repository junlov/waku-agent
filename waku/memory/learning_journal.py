"""Structured curriculum memory stored separately from learned facts."""

from __future__ import annotations

import sqlite3

from waku.runtime.learning_context import JOURNAL_FIELDS


class LearningJournalStore:
    """One learner-authored journal record per curriculum chapter."""

    def __init__(self, conn: sqlite3.Connection):
        self.conn = conn

    @staticmethod
    def _row(row: sqlite3.Row | None) -> dict | None:
        return dict(row) if row is not None else None

    def get(self, chapter: str) -> dict | None:
        row = self.conn.execute(
            "SELECT * FROM learning_journal WHERE chapter=?", (chapter,),
        ).fetchone()
        return self._row(row)

    def list(self) -> list[dict]:
        rows = self.conn.execute(
            "SELECT * FROM learning_journal ORDER BY chapter",
        ).fetchall()
        return [dict(row) for row in rows]

    def upsert(self, chapter: str, track: str, journal: dict[str, str]) -> dict:
        values = {field: str(journal.get(field) or "") for field in JOURNAL_FIELDS}
        self.conn.execute(
            """
            INSERT INTO learning_journal (
                chapter, track, goal, hypothesis, evidence, decision, correction, next_step
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(chapter) DO UPDATE SET
                track=excluded.track,
                goal=excluded.goal,
                hypothesis=excluded.hypothesis,
                evidence=excluded.evidence,
                decision=excluded.decision,
                correction=excluded.correction,
                next_step=excluded.next_step,
                updated_at=datetime('now')
            """,
            (chapter, track, *(values[field] for field in JOURNAL_FIELDS)),
        )
        self.conn.commit()
        row = self.get(chapter)
        assert row is not None
        return row
