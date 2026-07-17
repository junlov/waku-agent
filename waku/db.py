"""One SQLite file (state.db) holds everything Waku remembers and does.

This mirrors the Hermes approach on the whiteboard: SQLite + FTS5, no server.
Open it yourself anytime:  sqlite3 .waku/state.db '.tables'
"""

from __future__ import annotations

import sqlite3
from pathlib import Path

SCHEMA = """
-- Flagship-task artifact: events the calendar tool creates. The deterministic
-- eval asserts directly on rows in this table ("did the meeting trigger?").
CREATE TABLE IF NOT EXISTS calendar_events (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    start TEXT NOT NULL,           -- ISO 8601
    "end" TEXT,
    attendees TEXT DEFAULT '',     -- comma-separated
    notes TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now'))
);

-- Semantic memory: durable facts about you, your people, your projects.
CREATE TABLE IF NOT EXISTS facts (
    id INTEGER PRIMARY KEY,
    subject TEXT NOT NULL,         -- who/what the fact is about, e.g. 'alex'
    content TEXT NOT NULL,         -- the fact itself
    source TEXT DEFAULT 'user',    -- 'user' (told directly) or 'consolidation'
    created_at TEXT DEFAULT (datetime('now'))
);
CREATE VIRTUAL TABLE IF NOT EXISTS facts_fts USING fts5(
    subject, content, content=facts, content_rowid=id
);
CREATE TRIGGER IF NOT EXISTS facts_ai AFTER INSERT ON facts BEGIN
    INSERT INTO facts_fts(rowid, subject, content) VALUES (new.id, new.subject, new.content);
END;
CREATE TRIGGER IF NOT EXISTS facts_ad AFTER DELETE ON facts BEGIN
    INSERT INTO facts_fts(facts_fts, rowid, subject, content) VALUES ('delete', old.id, old.subject, old.content);
END;
CREATE TRIGGER IF NOT EXISTS facts_au AFTER UPDATE ON facts BEGIN
    INSERT INTO facts_fts(facts_fts, rowid, subject, content) VALUES ('delete', old.id, old.subject, old.content);
    INSERT INTO facts_fts(rowid, subject, content) VALUES (new.id, new.subject, new.content);
END;

-- Episodic memory: dated things that happened (past chats, distilled).
CREATE TABLE IF NOT EXISTS episodes (
    id INTEGER PRIMARY KEY,
    happened_at TEXT NOT NULL,     -- ISO 8601 date of the episode
    summary TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
);
CREATE VIRTUAL TABLE IF NOT EXISTS episodes_fts USING fts5(
    summary, content=episodes, content_rowid=id
);
CREATE TRIGGER IF NOT EXISTS episodes_ai AFTER INSERT ON episodes BEGIN
    INSERT INTO episodes_fts(rowid, summary) VALUES (new.id, new.summary);
END;
CREATE TRIGGER IF NOT EXISTS episodes_ad AFTER DELETE ON episodes BEGIN
    INSERT INTO episodes_fts(episodes_fts, rowid, summary) VALUES ('delete', old.id, old.summary);
END;

-- Raw chat log ("save the messages" box). Consolidation reads from here.
-- session_id tags each row with which conversation it belongs to, so the
-- dashboard can offer "New chat" and switch between past sessions (like a
-- chat app). Everything shares this one table — sessions are just a label.
CREATE TABLE IF NOT EXISTS chat_log (
    id INTEGER PRIMARY KEY,
    role TEXT NOT NULL,            -- 'user' | 'assistant'
    content TEXT NOT NULL,
    consolidated INTEGER DEFAULT 0,
    session_id TEXT DEFAULT 'default',
    created_at TEXT DEFAULT (datetime('now'))
);

-- Curriculum memory: learner-authored working beliefs, kept separate from
-- semantic facts so an unfinished hypothesis is never promoted as truth.
CREATE TABLE IF NOT EXISTS learning_journal (
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

-- Structured integration telemetry. Raw turn order remains in traces/*.jsonl;
-- this table makes provider/tool/MCP health queryable by the learning UI.
CREATE TABLE IF NOT EXISTS integration_events (
    id INTEGER PRIMARY KEY,
    created_at TEXT NOT NULL,
    source TEXT NOT NULL,
    integration TEXT NOT NULL,
    operation TEXT NOT NULL,
    status TEXT NOT NULL,
    category TEXT,
    latency_ms INTEGER,
    retryable INTEGER NOT NULL DEFAULT 0,
    message TEXT NOT NULL DEFAULT '',
    details_json TEXT NOT NULL DEFAULT '{}'
);
CREATE INDEX IF NOT EXISTS integration_events_created_idx
    ON integration_events(created_at DESC);

-- Learning-lab attempts: commands and canonical checks executed by the human
-- inside the sandbox. These are evidence, never completion authority.
CREATE TABLE IF NOT EXISTS lab_attempts (
    id INTEGER PRIMARY KEY,
    chapter TEXT NOT NULL,
    session_id TEXT,
    step_id TEXT,
    action_id TEXT,
    action TEXT NOT NULL,
    command TEXT NOT NULL,
    exit_code INTEGER NOT NULL,
    output TEXT NOT NULL DEFAULT '',
    started_at TEXT NOT NULL,
    duration_ms INTEGER NOT NULL DEFAULT 0,
    attached_to_journal INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS lab_attempts_chapter_idx
    ON lab_attempts(chapter, id DESC);

-- Guided-lab experience state. Git commits and learner tags remain completion
-- authority; these rows only make the learner's active experience resumable.
CREATE TABLE IF NOT EXISTS lab_sessions (
    id TEXT PRIMARY KEY,
    chapter TEXT NOT NULL,
    workspace_mode TEXT NOT NULL DEFAULT 'canonical',
    current_step TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'in_progress'
        CHECK(status IN ('in_progress', 'paused', 'proof_ready', 'passed', 'abandoned')),
    timer_seconds INTEGER NOT NULL DEFAULT 0,
    timer_started_at TEXT,
    base_commit TEXT,
    final_commit TEXT,
    completion_ref TEXT,
    started_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS lab_sessions_chapter_idx
    ON lab_sessions(chapter, updated_at DESC);

CREATE TABLE IF NOT EXISTS lab_checkpoints (
    id INTEGER PRIMARY KEY,
    session_id TEXT NOT NULL,
    name TEXT NOT NULL,
    git_ref TEXT NOT NULL,
    checkpoint_type TEXT NOT NULL DEFAULT 'manual',
    commit_sha TEXT,
    metadata_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL,
    UNIQUE(session_id, name)
);
CREATE INDEX IF NOT EXISTS lab_checkpoints_session_idx
    ON lab_checkpoints(session_id, id DESC);

CREATE TABLE IF NOT EXISTS lab_events (
    id INTEGER PRIMARY KEY,
    session_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    step_id TEXT,
    details_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS lab_events_session_idx
    ON lab_events(session_id, id);
"""


def _migrate(conn: sqlite3.Connection) -> None:
    """Additive, idempotent column upgrades for databases created before a
    column existed. SQLite has no 'ADD COLUMN IF NOT EXISTS', so we check."""
    cols = {r[1] for r in conn.execute("PRAGMA table_info(chat_log)").fetchall()}
    if "session_id" not in cols:
        conn.execute("ALTER TABLE chat_log ADD COLUMN session_id TEXT DEFAULT 'default'")
        conn.commit()
    if "source" not in cols:
        # which gateway a message came in through (cli / voice / telegram / dashboard)
        conn.execute("ALTER TABLE chat_log ADD COLUMN source TEXT DEFAULT 'cli'")

    attempt_cols = {
        row[1] for row in conn.execute("PRAGMA table_info(lab_attempts)").fetchall()
    }
    for column in ("session_id", "step_id", "action_id"):
        if column not in attempt_cols:
            conn.execute(f"ALTER TABLE lab_attempts ADD COLUMN {column} TEXT DEFAULT NULL")
    conn.commit()


def connect(home: Path, check_same_thread: bool = True) -> sqlite3.Connection:
    # check_same_thread=False lets the dashboard's threaded HTTP server reuse
    # one agent connection across worker threads (guarded by a lock). busy_timeout
    # avoids "database is locked" when the dashboard reads while a chat writes.
    conn = sqlite3.connect(home / "state.db", check_same_thread=check_same_thread)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA busy_timeout=3000")
    conn.executescript(SCHEMA)
    _migrate(conn)
    return conn
