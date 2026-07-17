"""Chapter lab execution and durable attempt evidence inside the sandbox."""

from __future__ import annotations

import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from time import monotonic

from waku.config import load_settings
from waku.db import connect
from waku.ops.integrations import redact

ROOT = Path(__file__).resolve().parents[2]
MAX_OUTPUT = 24_000
MAX_TIMEOUT = 600


def _contract(chapter: str) -> dict:
    curriculum = json.loads((ROOT / "docs/scale/curriculum.json").read_text())
    row = next((item for item in curriculum["chapters"] if item["number"] == chapter), None)
    return (row or {}).get("lab") or {}


def lab_state(chapter: str) -> dict:
    settings = load_settings()
    settings.ensure_home()
    conn = connect(settings.home)
    attempts = [dict(row) for row in conn.execute(
        "SELECT * FROM lab_attempts WHERE chapter = ? ORDER BY id DESC LIMIT 30", (chapter,)
    ).fetchall()]
    return {"chapter": chapter, "contract": _contract(chapter), "attempts": attempts}


def run_lab_action(payload: dict) -> dict:
    if os.getenv("WAKU_SANDBOX", "").lower() not in {"1", "true", "yes"}:
        return {"error": "lab commands run only inside the Waku sandbox"}
    chapter = str(payload.get("chapter") or "")
    action = str(payload.get("action") or "command")
    contract = _contract(chapter)
    if not contract:
        return {"error": "unknown curriculum lab"}
    if contract.get("state") != "runnable":
        return {"error": f"Chapter {chapter} is a lab preview; its failure instrument is not published yet"}
    command = str(payload.get("command") or "").strip()
    execution_command = command
    if action in {"measure", "verify"}:
        command = str(contract.get(action) or "")
        execution_command = str(contract.get(f"{action}_exec") or command).replace(
            "{python}", sys.executable,
        )
    if action not in {"command", "measure", "verify"} or not command:
        return {"error": "choose command, measure, or verify and provide a command when required"}

    workspace = Path(os.getenv("WAKU_WORKSPACE", "/workspace")).resolve()
    if not workspace.is_dir():
        return {"error": f"sandbox workspace does not exist at {workspace}"}
    timeout = max(1, min(int(payload.get("timeout_seconds") or 180), MAX_TIMEOUT))
    env = os.environ.copy()
    lab_python = Path(env.get("WAKU_RUNTIME", "/var/lib/waku")) / "lab-python"
    if lab_python.is_dir():
        env["PYTHONPATH"] = os.pathsep.join(
            item for item in (str(lab_python), env.get("PYTHONPATH", "")) if item
        )
    started_at = datetime.now(timezone.utc).isoformat(timespec="milliseconds")
    started = monotonic()
    try:
        process = subprocess.run(
            ["/bin/sh", "-lc", execution_command], cwd=workspace, env=env,
            text=True, capture_output=True, timeout=timeout, check=False,
        )
        output = process.stdout
        if process.stderr:
            output += ("\n" if output else "") + "[stderr]\n" + process.stderr
        exit_code = process.returncode
    except subprocess.TimeoutExpired as exc:
        output = f"TIMEOUT after {timeout}s\n{exc.stdout or ''}{exc.stderr or ''}"
        exit_code = 124
    duration_ms = int((monotonic() - started) * 1000)
    output = str(redact(output))
    if len(output) > MAX_OUTPUT:
        output = output[:MAX_OUTPUT] + f"\n... truncated {len(output) - MAX_OUTPUT} characters"

    settings = load_settings()
    settings.ensure_home()
    conn = connect(settings.home)
    safe_command = str(redact(command))
    cursor = conn.execute(
        """INSERT INTO lab_attempts
           (chapter, action, command, exit_code, output, started_at, duration_ms)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (chapter, action, safe_command, exit_code, output, started_at, duration_ms),
    )
    conn.commit()
    return {"id": cursor.lastrowid, "chapter": chapter, "action": action,
            "command": safe_command, "exit_code": exit_code, "output": output,
            "started_at": started_at, "duration_ms": duration_ms,
            "attached_to_journal": 0}


def attach_lab_attempt(payload: dict) -> dict:
    """Append one explicitly selected lab result to the chapter journal."""
    from waku.memory.learning_journal import LearningJournalStore
    from waku.runtime.learning_context import JOURNAL_FIELDS

    chapter = str(payload.get("chapter") or "")
    track = str(payload.get("track") or "brief")
    contract = _contract(chapter)
    if not contract or contract.get("state") != "runnable":
        return {"error": "choose a runnable curriculum lab"}
    if track not in {"brief", "architect", "engineer", "lab"}:
        return {"error": "choose a valid curriculum track"}
    try:
        attempt_id = int(payload.get("attempt_id"))
    except (TypeError, ValueError):
        return {"error": "a valid lab attempt is required"}

    settings = load_settings()
    settings.ensure_home()
    conn = connect(settings.home)
    attempt = conn.execute(
        "SELECT * FROM lab_attempts WHERE id = ? AND chapter = ?",
        (attempt_id, chapter),
    ).fetchone()
    if attempt is None:
        return {"error": "lab attempt not found"}

    store = LearningJournalStore(conn)
    current = store.get(chapter) or {}
    journal = {field: str(current.get(field) or "") for field in JOURNAL_FIELDS}
    if not attempt["attached_to_journal"]:
        output = str(attempt["output"] or "(no output)")
        evidence = (
            f"Lab attempt #{attempt['id']} · {attempt['action']}\n"
            f"$ {attempt['command']}\n"
            f"exit={attempt['exit_code']} · duration={attempt['duration_ms']}ms\n"
            f"{output}"
        )
        journal["evidence"] = "\n\n".join(
            item for item in (journal["evidence"].strip(), evidence) if item
        )
        saved = store.upsert(chapter, track, journal)
        conn.execute(
            "UPDATE lab_attempts SET attached_to_journal = 1 WHERE id = ?",
            (attempt_id,),
        )
        conn.commit()
    else:
        saved = current
    return {"ok": True, "journal": saved, "attempt_id": attempt_id}
