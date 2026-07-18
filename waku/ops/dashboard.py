"""Dashboard — every pillar on one local page. Zero new dependencies.

    make dashboard        # → http://localhost:7777

One stdlib HTTP server reading the files Waku already writes:
  loop + harness   traces/*.jsonl   (turns, gate decisions, tool calls, tokens)
  memory           state.db         (facts, episodes, chat log, consolidation)
  tools            state.db + calendar.ics + outbox/
  eval             eval_report.json (written by `make gate`)

The overview mirrors the architecture diagram — every box is clickable and
opens that section's live data. The chat dock is a real gateway: type (or speak)
a message and watch the same harness (gate, loop, tools, memory) that the CLI/
voice/telegram gateways drive light up in the browser as it runs.

The frontend is plain static files (static/index.html + style.css + app.js)
served as-is — no build step, no framework. This file is just the server + API.
Bound to 127.0.0.1 only. For deep trace waterfalls use Phoenix (`make trace`).
"""

from __future__ import annotations

import json
import os
import re
import threading
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from waku.config import load_settings
from waku.db import connect
from waku.ops.repository import repository_tags as _repository_tags
from waku.runtime.learning_context import LearningContext

PORT = 7777
# The frontend lives in its own files (static/index.html + style.css + app.js),
# served as-is by this stdlib server — no build step, no framework. Edit those
# to change the UI; edit this file to change the server/API.
STATIC = Path(__file__).resolve().parent / "static"
ROOT = Path(__file__).resolve().parents[2]

def _chapter_title(markdown: str, number: str) -> str:
    first = markdown.splitlines()[0].removeprefix("# ").strip()
    first = re.sub(r"\s*\(short brief; expanded when you start it\)\s*$", "", first)
    return re.sub(rf"^Chapter {int(number)}:\s*", "", first, flags=re.IGNORECASE)


def _chapter_summary(markdown: str) -> str:
    scar = re.search(r"\*\*The scar:\*\*\s*(.+?)(?:\n\n|$)", markdown, re.DOTALL)
    if scar:
        text = scar.group(1)
    else:
        paragraphs = [p.strip() for p in markdown.split("\n\n") if p.strip()]
        text = next((p for p in paragraphs[1:] if not p.startswith(("#", "```"))), "")
    return re.sub(r"\s+", " ", re.sub(r"[*`]", "", text)).strip()


def curriculum_catalog(root: Path = ROOT, tags: set[str] | None = None) -> dict:
    """Return the lesson catalog and git-backed learner state for the dashboard."""
    from waku.ops.lab_manifest import load_curriculum_contract

    if tags is None:
        tags = _repository_tags(root)

    docs = root / "docs/scale"
    contract, labs = load_curriculum_contract(root, known_tags=tags)
    metadata = {chapter["number"]: chapter for chapter in contract["chapters"]}
    chapters = []
    available = []
    passed = set()
    for number in (f"{n:02d}" for n in range(17)):
        brief_path = next(iter(sorted(docs.glob(f"{number}-*.md"))), None)
        if brief_path is None:
            continue
        if f"chapter-{number}-start" in tags:
            available.append(number)
        if f"learner/chapter-{number}-passed" in tags or (
            number == "00" and "chapter-00-solution" in tags
        ):
            passed.add(number)

    current = next((number for number in available if number not in passed), None)
    for number in (f"{n:02d}" for n in range(17)):
        brief_path = next(iter(sorted(docs.glob(f"{number}-*.md"))), None)
        if brief_path is None:
            continue
        brief = brief_path.read_text()
        architect_path = next(iter(sorted((docs / "tracks").glob(f"{number}-*-architect.md"))), None)
        engineer_path = next(iter(sorted((docs / "tracks").glob(f"{number}-*-ai-engineer.md"))), None)
        if number in passed:
            status = "passed"
        elif number == current:
            status = "current"
        elif number in available:
            status = "available"
        else:
            status = "roadmap"
        chapters.append({
            "number": number,
            "title": _chapter_title(brief, number),
            "summary": _chapter_summary(brief),
            "status": status,
            "runnable": number in available,
            "check": f"make check-{number}",
            "phase": metadata[number]["phase"],
            "competency": metadata[number]["competency"],
            "evidence_view": metadata[number]["evidence_view"],
            "knowledge_checks": metadata[number]["knowledge_checks"],
            "lab": labs[number],
            "brief": brief,
            "tracks": {
                "architect": architect_path.read_text() if architect_path else "",
                "engineer": engineer_path.read_text() if engineer_path else "",
            },
        })
    return {
        "chapters": chapters,
        "version": contract["version"],
        "mission": contract["mission"],
        "completion_authority": contract["completion_authority"],
        "phases": contract["phases"],
        "current": current,
        "available_through": available[-1] if available else None,
        "passed": len(passed),
        "total": len(chapters),
    }

# One shared agent for the browser gateway. Built lazily (first chat), reused
# across the threaded server's workers via a cross-thread connection + a lock
# so chats run one at a time — correct for a single-user local tool.
_agent = None
_agent_lock = threading.Lock()


def _get_agent():
    global _agent
    if _agent is None:
        from waku.app import Waku

        settings = load_settings()
        settings.ensure_home()
        conn = connect(settings.home, check_same_thread=False)
        _agent = Waku(settings=settings, conn=conn)
    return _agent


def chat(message: str, learning_context: LearningContext | None = None) -> dict:
    """Run one real turn through the harness and return the structured result —
    gate decision, tool calls, reply, latency — so the browser can render the
    pipeline as it happened. Writes traces + memory like any other gateway."""
    events: list[dict] = []
    with _agent_lock:
        agent = _get_agent()
        start = datetime.now(timezone.utc)
        result = agent.respond(message, observer=lambda kind, ev: events.append({"kind": kind, **ev}),
                               source="dashboard", learning_context=learning_context)
        latency_ms = int((datetime.now(timezone.utc) - start).total_seconds() * 1000)

    gate = next((e for e in events if e["kind"] == "gate"), None)
    cons = next((e for e in events if e["kind"] == "consolidation"), None)
    return {
        "reply": result.reply,
        "gate": {"decision": gate["decision"], "reason": gate.get("reason")} if gate else None,
        "tools": [
            {"tool": c["tool"], "args": c["args"], "output": c["output"],
             "status": _tool_status(c["output"]), "summary": (c["output"] or "").split(". ")[0][:120]}
            for c in result.tool_calls
        ],
        "consolidation": {"new_facts": cons["new_facts"]} if cons else None,
        "iterations": result.iterations,
        "latency_ms": latency_ms,
        "learning_context": learning_context.public_summary() if learning_context else None,
    }


def chat_stream(message: str, emit, learning_context: LearningContext | None = None) -> None:
    """Run one turn, calling emit(kind, event) for every harness event AS it
    happens — gate decision, tool calls, and the reply text token by token —
    so the browser can show thinking stream in (like the CLI/voice do). Ends
    with a 'done' event carrying the final structured result."""
    events: list[dict] = []

    def observer(kind, ev):
        if kind in ("gate", "consolidation"):
            events.append({"kind": kind, **ev})
        emit(kind, ev)

    with _agent_lock:
        agent = _get_agent()
        start = datetime.now(timezone.utc)
        result = agent.respond(
            message,
            observer=observer,
            source="dashboard",
            stream=True,
            learning_context=learning_context,
        )
        latency_ms = int((datetime.now(timezone.utc) - start).total_seconds() * 1000)

    gate = next((e for e in events if e["kind"] == "gate"), None)
    cons = next((e for e in events if e["kind"] == "consolidation"), None)
    emit("done", {
        "reply": result.reply,
        "gate": {"decision": gate["decision"], "reason": gate.get("reason")} if gate else None,
        "tools": [{"tool": c["tool"], "args": c["args"], "output": c["output"],
                   "status": _tool_status(c["output"]),
                   "summary": (c["output"] or "").split(". ")[0][:120]} for c in result.tool_calls],
        "consolidation": {"new_facts": cons["new_facts"]} if cons else None,
        "iterations": result.iterations,
        "latency_ms": latency_ms,
        "learning_context": learning_context.public_summary() if learning_context else None,
    })


def test_mcp_connection(payload: dict) -> dict:
    """Re-run one configured MCP handshake and expose the result to Tools/Ops."""
    name = str(payload.get("name") or "").strip()
    if not name:
        return {"ok": False, "error": "server name is required"}
    with _agent_lock:
        bridge = getattr(_get_agent(), "mcp_bridge", None)
        if bridge is None:
            return {"ok": False, "error": "MCP runtime is unavailable or no servers are configured"}
        return bridge.test_connection(name)

# Rough $/million tokens (in, out) for a dollar ESTIMATE — the number humans
# actually feel. Keyed by provider; deliberately approximate and labelled "est".
PRICING = {
    "anthropic": (3.0, 15.0), "openai": (2.5, 15.0), "gemini": (0.3, 2.5),
    "kimi": (0.6, 2.5), "glm": (0.6, 2.2),
    # openrouter fallback for paid models when the live catalog is unreachable
    # (rough mid-catalog guess). ":free" ids and catalog-priced models never
    # hit this: see price_for().
    "openrouter": (1.0, 3.0),
    "sim": (0.0, 0.0),
}

# model id -> exact ($/M in, $/M out), filled from the live catalog fetch in
# list_models(). OpenRouter reports per-model pricing, so cost estimates can
# be exact per call instead of one number per provider.
_price_cache: dict[str, tuple[float, float]] = {}


def price_for(provider: str, model: str) -> tuple[float, float]:
    """$/M tokens (in, out) for one call: the catalog's per-model price when
    known, $0 for ":free" ids, else the provider-level PRICING estimate."""
    if model in _price_cache:
        return _price_cache[model]
    if model.endswith(":free"):
        return (0.0, 0.0)
    return PRICING.get(provider, (3.0, 15.0))


def usage_summary(home) -> dict:
    """Read the PERMANENT spend ledger (usage.jsonl) → all-time tokens + dollar
    cost, plus per-day and per-provider breakdowns. Cost is derived from tokens
    with PRICING (approximate, labelled 'est'). This survives demo resets, so the
    number is the real running total — trustworthy, not a per-session guess."""
    recs = []
    path = home / "usage.jsonl"
    if path.exists():
        for line in path.read_text().splitlines():
            try:
                recs.append(json.loads(line))
            except json.JSONDecodeError:
                pass

    def cost(r) -> float:
        # the ledger stores tokens + provider/model, so old rows reprice too
        pin, pout = price_for(r.get("provider", ""), r.get("model", ""))
        return r.get("in", 0) / 1e6 * pin + r.get("out", 0) / 1e6 * pout

    def add(bucket, key, extra):
        b = bucket.setdefault(key, {**extra, "calls": 0, "in": 0, "out": 0, "cost": 0.0})
        b["calls"] += 1
        b["in"] += r.get("in", 0)
        b["out"] += r.get("out", 0)
        b["cost"] += cost(r)

    by_day, by_provider = {}, {}
    for r in recs:
        day = (r.get("ts") or "")[:10]
        add(by_day, day, {"date": day})
        add(by_provider, r.get("provider", "?"), {"provider": r.get("provider", "?")})

    return {
        "calls": len(recs),
        "total_in": sum(r.get("in", 0) for r in recs),
        "total_out": sum(r.get("out", 0) for r in recs),
        "total_cost": round(sum(cost(r) for r in recs), 4),
        "by_day": sorted(by_day.values(), key=lambda x: x["date"], reverse=True)[:30],
        "by_provider": sorted(by_provider.values(), key=lambda x: -x["cost"]),
    }


def _parse_ts(ts: str):
    try:
        return datetime.fromisoformat(ts)
    except (ValueError, TypeError):
        return None


def _tool_status(output: str) -> str:
    """Classify a tool result for the UI: ok / warn / error — from the output
    string alone (tools already report honestly, so trust their words)."""
    from waku.ops.integrations import classify_result

    return classify_result(output)[0]


def collect() -> dict:
    """Everything the page shows, in one JSON blob."""
    settings = load_settings()
    settings.ensure_home()
    home = settings.home
    conn = connect(home)

    def rows(sql: str) -> list[dict]:
        return [dict(r) for r in conn.execute(sql).fetchall()]

    # --- traces → turns (group events between turn_start and turn_end)
    events = []
    trace_files = sorted((home / "traces").glob("*.jsonl"))
    for path in trace_files:
        for line in path.read_text().splitlines():
            try:
                events.append(json.loads(line))
            except json.JSONDecodeError:
                continue
    turns, current, wake_scans = [], None, []
    for ev in events:
        kind = ev.get("type")
        if kind == "turn_start":
            current = {"user_message": ev.get("user_message"), "ts": ev.get("ts"),
                       "gate": None, "llm_calls": [], "tools": [], "reply": None}
        elif kind == "wake_scan":
            wake_scans.append(ev)
        elif current is not None:
            if kind == "gate":
                current["gate"] = ev
            elif kind == "llm":
                current["llm_calls"].append(ev)
            elif kind == "tool":
                current["tools"].append(ev)
            elif kind == "consolidation":
                current["consolidation"] = ev
            elif kind == "turn_end":
                current["reply"] = ev.get("reply")
                current["iterations"] = ev.get("iterations")
                turns.append(current)
                current = None
    if current is not None:  # a turn that never ended = the smoking gun for hangs
        current["reply"] = "TURN NEVER FINISHED — check for a hang after this point"
        current["unfinished"] = True
        turns.append(current)

    # --- derive per-turn latency + dollar cost (the ops numbers humans feel)
    if settings.base_url or settings.provider == "openrouter":
        list_models()  # warm the per-model price cache (5-min cached fetch)
    price_in, price_out = price_for(settings.provider, settings.model or "")
    for t in turns:
        start, end = _parse_ts(t["ts"]), None
        last = t["llm_calls"][-1]["ts"] if t["llm_calls"] else None
        end = _parse_ts(last)
        t["latency_ms"] = int((end - start).total_seconds() * 1000) if start and end else None
        tin = sum(c.get("usage", {}).get("in", 0) for c in t["llm_calls"])
        tout = sum(c.get("usage", {}).get("out", 0) for c in t["llm_calls"])
        t["cost"] = tin / 1e6 * price_in + tout / 1e6 * price_out
        for x in t["tools"]:
            x["status"] = _tool_status(x.get("output", ""))
            x["summary"] = (x.get("output", "") or "").split(". ")[0][:120]

    latencies = sorted(t["latency_ms"] for t in turns if t["latency_ms"] is not None)
    total_cost = sum(t["cost"] for t in turns)

    def pct(p: float) -> int:
        return latencies[min(len(latencies) - 1, int(len(latencies) * p))] if latencies else 0

    from waku.memory.procedural.loader import SkillLoader
    from waku.memory import REPO_SKILLS

    skills = [{"name": s.name, "description": s.description, "body": s.body,
               "path": str(s.path),
               # relative path (for reveal) + whether it lives in the editable home dir
               "rel": _rel_to_home(s.path, home),
               "editable": str((home / "skills").resolve()) in str(s.path.resolve())}
              for s in SkillLoader([REPO_SKILLS, home / "skills"]).skills]

    eval_report = None
    report_path = home / "eval_report.json"
    if report_path.exists():
        eval_report = json.loads(report_path.read_text())

    eval_history = []
    hist_path = home / "eval_runs.jsonl"
    if hist_path.exists():
        for line in hist_path.read_text().splitlines()[-20:]:
            try:
                eval_history.append(json.loads(line))
            except json.JSONDecodeError:
                pass
    eval_history.reverse()

    outbox = [{"name": p.name, "text": p.read_text()[:400]}
              for p in sorted((home / "outbox").glob("*.txt"), reverse=True)[:20]]

    # --- state.db introspection: the actual SQLite tables, so the persistence
    # layer is visible (not just its contents). Table names are hard-coded, so
    # the f-string SQL is safe.
    def table_info(name):
        info = conn.execute(f"PRAGMA table_info({name})").fetchall()
        cols = [r["name"] for r in info]
        types = {r["name"]: r["type"] for r in info}
        count = conn.execute(f"SELECT COUNT(*) FROM {name}").fetchone()[0]
        # up to 200 newest rows so each table has its own scrollable tab
        sample = [dict(r) for r in conn.execute(f"SELECT * FROM {name} ORDER BY rowid DESC LIMIT 200").fetchall()]
        return {"name": name, "columns": cols, "types": types, "count": count, "sample": sample}

    db_path = home / "state.db"
    all_tables = [r["name"] for r in
                  conn.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").fetchall()]
    db_info = {
        "path": str(db_path.resolve()),
        "size": db_path.stat().st_size if db_path.exists() else 0,
        "tables": [table_info(n) for n in (
            "calendar_events", "facts", "episodes", "chat_log", "learning_journal",
            "lab_attempts", "integration_events",
        )],
        "fts": [t for t in all_tables if t.endswith("_fts")],
        "all_tables": all_tables,
    }

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "home": str(home.resolve()),
        "provider": settings.provider,
        "model": settings_info()["model"],
        "stats": {
            "turns": len(turns),
            "tool_calls": sum(len(t["tools"]) for t in turns),
            "tool_errors": sum(1 for t in turns for x in t["tools"] if x["status"] == "error"),
            "gate_skips": sum(1 for t in turns if t["gate"] and t["gate"].get("decision") == "skip"),
            "gate_retrieves": sum(1 for t in turns if t["gate"] and t["gate"].get("decision") == "retrieve"),
            "tokens_in": sum(c.get("usage", {}).get("in", 0) for t in turns for c in t["llm_calls"]),
            "tokens_out": sum(c.get("usage", {}).get("out", 0) for t in turns for c in t["llm_calls"]),
            "cost": round(total_cost, 4),
            "latency_avg": int(sum(latencies) / len(latencies)) if latencies else 0,
            "latency_p95": pct(0.95),
            "trace_files": len(trace_files),
        },
        "turns": turns[::-1][:50],
        "integration_events": rows(
            "SELECT * FROM integration_events ORDER BY created_at DESC, id DESC LIMIT 100"
        ),
        "wake_scans": wake_scans[::-1][:25],
        # last raw trace lines, so Ops shows traces inline (no folder needed)
        "trace_tail": [{"type": e.get("type"), "ts": e.get("ts"),
                        "detail": (e.get("user_message") or e.get("decision") or e.get("tool")
                                   or e.get("reply") or "")}
                       for e in events[-18:]][::-1],
        "trace_file": (trace_files[-1].name if trace_files else None),
        "facts": rows("SELECT id, subject, content, source, created_at FROM facts ORDER BY id DESC"),
        "episodes": rows("SELECT id, happened_at, summary FROM episodes ORDER BY happened_at DESC"),
        "learning_journal": rows("SELECT * FROM learning_journal ORDER BY chapter"),
        "soul": (home / "SOUL.md").read_text() if (home / "SOUL.md").exists() else "",
        "chat_pending": conn.execute("SELECT COUNT(*) FROM chat_log WHERE consolidated=0").fetchone()[0],
        "chat_log": rows("SELECT role, content, consolidated, source, session_id, created_at FROM chat_log ORDER BY id DESC LIMIT 80")[::-1],
        "sessions": session_list(conn),
        "current_session": (_agent.session.session_id if _agent is not None else "default"),
        "consolidate_every": settings.consolidate_every,
        "calendar": rows('SELECT title, start, "end", attendees, created_at FROM calendar_events ORDER BY start'),
        "outbox": outbox,
        "skills": skills,
        "eval_report": eval_report,
        "eval_history": eval_history,
        "db": db_info,
        "settings": settings_info(),
        "tools": tools_info(),
        "usage": usage_summary(home),
    }


def _rel_to_home(path, home) -> str:
    """Path relative to WAKU_HOME if it lives there, else the repo-relative
    'skills/...' path — either way something reveal_path can open."""
    try:
        return str(path.resolve().relative_to(home.resolve()))
    except ValueError:
        return str(path)


def session_list(conn) -> list[dict]:
    """One row per conversation for the chat-history picker: id, its first user
    message (the title), message count, newest first. Sessions are just a
    session_id label on chat_log rows — the same table, no new storage."""
    groups = conn.execute(
        """SELECT session_id, COUNT(*) AS messages, MAX(created_at) AS last_at
           FROM chat_log GROUP BY session_id ORDER BY last_at DESC"""
    ).fetchall()
    out = []
    for g in groups:
        sid = g["session_id"]
        first = conn.execute(
            "SELECT content FROM chat_log WHERE session_id=? AND role='user' ORDER BY id LIMIT 1",
            (sid,),
        ).fetchone()
        last = conn.execute(
            "SELECT role, content FROM chat_log WHERE session_id=? ORDER BY id DESC LIMIT 1", (sid,)
        ).fetchone()
        sources = [r["source"] for r in conn.execute(
            "SELECT DISTINCT source FROM chat_log WHERE session_id=?", (sid,)).fetchall()]
        preview = ""
        if last:
            preview = ("you: " if last["role"] == "user" else "waku: ") + last["content"][:80]
        out.append({"id": sid,
                    "title": (first["content"][:60] if first else "(empty)"),
                    "last": preview,
                    "sources": sources,
                    "messages": g["messages"],
                    "last_at": g["last_at"]})
    return out


# A tool's origin, for grouping in the Tools tab (name → category).
_FLAGSHIP = {"create_event", "list_events", "save_note", "send_message"}
_SELFMGMT = {"manage_memory", "update_soul", "create_skill"}
_APPLE = {"read_apple_calendar", "read_apple_mail", "create_reminder", "create_note"}
_WEB = {"search_web"}


def _tool_source(name: str, mcp_servers: list[str]) -> str:
    if name in _FLAGSHIP:
        return "flagship"
    if name in _WEB:
        return "web"
    if name in _SELFMGMT:
        return "self-management"
    if name in _APPLE:
        return "apple"
    if any(name.startswith(f"{s}_") for s in mcp_servers):
        return "mcp"
    return "other"


def tools_info() -> dict:
    """The agent's available tools + any configured MCP servers — so the Tools
    tab shows CAPABILITIES, not just the artifacts tool calls produced. Reflects
    the live agent's registry when one exists (exact), else builds a display-only
    catalog (no MCP subprocess is spawned just to render the page)."""
    settings = load_settings()
    settings.ensure_home()
    mcp = {"configured": False, "servers": [], "live": False, "health": []}
    mcp_path = settings.home / "mcp.json"
    if mcp_path.exists():
        mcp["configured"] = True
        try:
            specs = json.loads(mcp_path.read_text()).get("servers", [])
            mcp["servers"] = [s.get("name", "?") for s in specs]
            mcp["health"] = [
                {"name": s.get("name", "?"), "status": "configured",
                 "transport": s.get("transport") or (
                     "streamable_http" if s.get("url") else "stdio"
                 ), "tools": 0, "last_error": "", "connected_at": None}
                for s in specs
            ]
        except (json.JSONDecodeError, OSError):
            pass

    catalog = []
    if _agent is not None:
        bridge = getattr(_agent, "mcp_bridge", None)
        if bridge is not None:
            mcp["health"] = bridge.health()
            mcp["live"] = any(s.get("status") == "connected" for s in mcp["health"])
        tools = list(_agent.tools._tools.values())
    else:
        # Display-only: same tools minus MCP (building the real registry would
        # start MCP servers, which we don't want on a 5-second poll).
        from waku.memory import Memory
        from waku.tools import calendar, curriculum, memory_admin, messages, notes, search

        conn = connect(settings.home)
        mem = Memory(conn, settings, None)
        tools = [calendar.make_tool(conn, settings.home, apple_calendar=settings.apple_calendar),
                 calendar.make_list_tool(conn),
                 notes.make_tool(conn), messages.make_tool(settings.home),
                 search.make_tool(), curriculum.make_tool(),
                 memory_admin.make_manage_memory_tool(mem),
                 memory_admin.make_update_soul_tool(settings),
                 memory_admin.make_create_skill_tool(settings, mem)]
        if os.getenv("WAKU_SANDBOX", "").lower() in ("1", "true", "yes"):
            from waku.tools import custom, integration_builder, terminal

            workspace = Path(os.getenv("WAKU_WORKSPACE", "/workspace"))
            tools += [terminal.make_tool(workspace=workspace),
                      integration_builder.make_tool(workspace=workspace, home=settings.home),
                      integration_builder.make_configure_tool(home=settings.home)]
            tools += custom.load_tools(workspace / "integrations" / "tools")
        if settings.apple_tools:
            from waku.tools import apple

            tools += apple.make_tools()
    for t in tools:
        source = "custom" if t.source in {"custom", "workbench"} else _tool_source(
            t.name, mcp["servers"]
        )
        catalog.append({"name": t.name, "description": t.description, "source": source})
    catalog.sort(key=lambda c: (c["source"], c["name"]))
    from waku.tools.experimental import PLANNED

    return {"catalog": catalog, "mcp": mcp, "apple_on": settings.apple_tools,
            "planned": PLANNED}   # whiteboard boxes not wired in yet (coming soon)


def run_query(payload: dict) -> dict:
    """A tiny read-only SQL console (the Supabase-editor idea, scoped down).
    Opens state.db in read-only mode so a write can't slip through, and only
    accepts a single SELECT/WITH statement. Caps at 200 rows."""
    sql = (payload.get("sql") or "").strip().rstrip(";").strip()
    if not sql:
        return {"error": "Type a SELECT query."}
    low = sql.lower()
    if not (low.startswith("select") or low.startswith("with")):
        return {"error": "Only SELECT (or WITH … SELECT) queries are allowed."}
    if ";" in sql:
        return {"error": "One statement at a time (no semicolons)."}
    import sqlite3

    settings = load_settings()
    settings.ensure_home()
    db = (settings.home / "state.db").resolve()
    try:
        c = sqlite3.connect(f"file:{db}?mode=ro", uri=True)
        c.row_factory = sqlite3.Row
        cur = c.execute(sql)
        cols = [d[0] for d in cur.description] if cur.description else []
        data = [[str(r[i]) if r[i] is not None else "" for i in range(len(cols))]
                for r in cur.fetchmany(200)]
        c.close()
        return {"columns": cols, "rows": data}
    except sqlite3.Error as exc:
        return {"error": str(exc)}


_whisper = None
_whisper_lock = threading.Lock()


def transcribe_audio(raw: bytes) -> dict:
    """Server-side speech-to-text for the dashboard mic button — the SAME local
    Whisper (`make voice` uses it), so voice works in the browser without any
    cloud. Needs the [voice] extra. Returns {text} or a friendly {error}."""
    if not raw:
        return {"error": "no audio received"}
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        return {"error": "voice isn't installed — run: pip install -e '.[voice]'"}
    global _whisper
    import os as _os
    import tempfile

    with _whisper_lock:
        if _whisper is None:
            _whisper = WhisperModel(os.getenv("WAKU_WHISPER_MODEL", "base"), compute_type="int8")
    # the browser sends WAV (PCM) — Whisper/PyAV decode it reliably (WebM/Opus
    # from MediaRecorder often fails to decode).
    tmp = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    tmp.write(raw)
    tmp.close()
    try:
        segments, _ = _whisper.transcribe(tmp.name)
        return {"text": " ".join(s.text for s in segments).strip()}
    except Exception as exc:
        return {"error": f"transcription failed: {exc}"}
    finally:
        try:
            _os.unlink(tmp.name)
        except OSError:
            pass


def session_action(payload: dict) -> dict:
    """Chat history control: start a new conversation, switch to a past one, or
    read a conversation's history (read-only, for the live inbox). Sessions live
    in chat_log."""
    action = payload.get("action")
    if action == "history":
        # read-only view of a conversation — never touches the agent, so the
        # dashboard can poll it live (e.g. to show new Telegram messages arrive).
        settings = load_settings()
        settings.ensure_home()
        conn = connect(settings.home)
        rows = conn.execute(
            "SELECT role, content FROM chat_log WHERE session_id=? ORDER BY id",
            (payload.get("id") or "default",),
        ).fetchall()
        return {"ok": True, "session_id": payload.get("id") or "default",
                "history": [{"role": r["role"], "content": r["content"]} for r in rows]}
    with _agent_lock:
        agent = _get_agent()
        if action == "new":
            sid = datetime.now().strftime("s-%Y%m%d-%H%M%S")
            agent.session.start_new(sid)
            return {"ok": True, "session_id": sid, "history": []}
        if action == "switch":
            sid = payload.get("id") or "default"
            agent.session.switch(sid)
            hist = [{"role": r, "content": c}
                    for u, a in agent.memory.session_history(sid)
                    for r, c in (("user", u), ("assistant", a))]
            return {"ok": True, "session_id": sid, "history": hist}
    return {"error": f"unknown action {action}"}


def _editor_cmd() -> list[str] | None:
    """The user's code editor CLI: $WAKU_EDITOR, then cursor, then code."""
    import shutil

    custom = os.getenv("WAKU_EDITOR")
    if custom and shutil.which(custom):
        return [custom]
    for cli in ("cursor", "code"):
        if shutil.which(cli):
            return [cli]
    return None


def reveal_path(rel: str) -> dict:
    """Open a file/folder under WAKU_HOME — in the user's code editor if one
    is on PATH (cursor/code/$WAKU_EDITOR), otherwise reveal in Finder.
    Restricted to paths inside WAKU_HOME."""
    import subprocess
    import sys

    settings = load_settings()
    settings.ensure_home()
    home = settings.home.resolve()
    target = (home / (rel or ".")).resolve()
    if target != home and home not in target.parents:
        return {"error": "path is outside the .waku home"}
    if not target.exists():
        return {"error": f"not found: {target}"}

    editor = _editor_cmd()
    if editor and target.is_file() and target.suffix != ".db":  # editors choke on sqlite
        subprocess.run([*editor, str(target)], check=False)
        return {"ok": True, "opened_in": editor[0], "path": str(target)}
    if sys.platform != "darwin":
        return {"error": f"no editor found and reveal is macOS-only — the path is {target}"}
    subprocess.run(
        ["open", "-R", str(target)] if target.is_file() else ["open", str(target)],
        check=False,
    )
    return {"ok": True, "revealed": str(target)}


def memory_action(payload: dict) -> dict:
    """Human CRUD on memory from the dashboard: update/delete facts & episodes,
    rewrite SOUL.md. Writes the same sqlite file the agent uses (busy_timeout
    covers contention); changes are live for the next agent turn."""
    from waku.memory.episodic.store import SqliteEpisodeStore
    from waku.memory.semantic.store import SqliteFactStore

    settings = load_settings()
    settings.ensure_home()
    action = payload.get("action")
    if action == "save_soul":
        text = (payload.get("content") or "").strip()
        if not text:
            return {"error": "SOUL cannot be empty"}
        (settings.home / "SOUL.md").write_text(text + "\n")
        return {"ok": True}
    if action == "save_skill":
        # Edit any loaded SKILL.md by hand (same file the agent's create_skill
        # writes) — repo skills and home skills alike. Sandboxed to the two
        # skills folders; validates the frontmatter before writing.
        from pathlib import Path

        from waku.memory import REPO_SKILLS
        from waku.memory.procedural.loader import _parse_text

        text = (payload.get("content") or "").strip()
        dest = Path(payload.get("path") or "").resolve()
        allowed = [REPO_SKILLS.resolve(), (settings.home / "skills").resolve()]
        if dest.name != "SKILL.md" or not any(a in dest.parents for a in allowed):
            return {"error": "can only edit SKILL.md files inside the skills folders"}
        if _parse_text(text, dest) is None:
            return {"error": "invalid SKILL.md — needs a name and description in the frontmatter"}
        dest.write_text(text.rstrip() + "\n")
        return {"ok": True}

    conn = connect(settings.home)
    facts, episodes = SqliteFactStore(conn), SqliteEpisodeStore(conn)
    try:
        rid = int(payload.get("id", 0))
    except (TypeError, ValueError):
        return {"error": "bad id"}
    if action == "update_fact":
        return {"ok": facts.update(rid, payload.get("content", ""), payload.get("subject") or None)}
    if action == "delete_fact":
        return {"ok": facts.delete(rid)}
    if action == "delete_episode":
        return {"ok": episodes.delete(rid)}
    return {"error": f"unknown action {action}"}


def learning_journal_action(payload: object) -> dict:
    """Validate curriculum claims, then persist learner-authored journal state."""
    from waku.memory.learning_journal import LearningJournalStore

    context = LearningContext.from_payload(payload, curriculum_catalog())
    if context is None:
        return {"error": "learning context is required"}
    settings = load_settings()
    settings.ensure_home()
    row = LearningJournalStore(connect(settings.home)).upsert(
        context.chapter, context.track, context.journal,
    )
    return {"ok": True, "journal": row}


def learning_context_for_turn(
    payload: object,
    session_id: object = None,
) -> LearningContext | None:
    """Persist the exact validated snapshot supplied to a curriculum chat turn."""
    if payload is None:
        if session_id is not None:
            raise ValueError("a lab session requires learning context for the coaching turn")
        return None
    result = learning_journal_action(payload)
    if result.get("error"):
        raise ValueError(result["error"])
    context = LearningContext.from_payload(payload, curriculum_catalog())
    if session_id is not None:
        if not isinstance(session_id, str) or not session_id.strip():
            raise ValueError("lab session_id must be non-empty text")
        from waku.ops.lab_api import get_lab_api

        context = get_lab_api(ROOT).enrich_learning_context(context, session_id.strip())
    return context


_models_cache: dict[str, tuple[float, list]] = {}


def list_models() -> dict:
    """Model ids available on the ACTIVE endpoint, for the settings model
    picker. OpenAI-compatible endpoints (OpenRouter, Gemini, any WAKU_BASE_URL)
    expose GET {base_url}/models; native-wire providers just offer their two
    defaults. OpenRouter entries carry free / tool-support / context metadata
    so the picker can surface the $0 tool-capable models. Cached 5 minutes."""
    import time
    import urllib.request

    from waku.loop.models import PROVIDERS

    s = load_settings()
    prov = PROVIDERS.get(s.provider)
    base = s.base_url or (prov.base_url if prov else None)
    out = {
        "model": s.model or (prov.model if prov else ""),
        "small_model": s.small_model or (prov.small_model if prov else ""),
        "endpoint": base or s.provider,
    }
    if prov is None or prov.kind != "openai" or not base:
        # no listing API on the anthropic wire: offer the known defaults
        known = dict.fromkeys([out["model"], out["small_model"]]
                              + ([prov.model, prov.small_model] if prov else []))
        return {**out, "listed": False, "models": [{"id": m} for m in known if m]}

    url = base.rstrip("/") + "/models"
    cached = _models_cache.get(url)
    if cached and time.time() - cached[0] < 300:
        return {**out, "listed": True, "models": cached[1]}
    key = s.api_key or os.getenv(prov.key_env, "")
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {key}"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
    except Exception as exc:
        # cache the failure for ~1 minute so an unreachable catalog doesn't
        # stall every 5-second dashboard poll for 10s
        _models_cache[url] = (time.time() - 240, [])
        return {**out, "listed": False, "models": [], "error": str(exc)}
    models = []
    for m in data.get("data", []):
        mid = m.get("id", "")
        if not mid:
            continue
        pricing = m.get("pricing") or {}
        params = m.get("supported_parameters")
        entry = {
            "id": mid,
            "free": mid.endswith(":free") or pricing.get("prompt") == "0",
            # None means the endpoint doesn't say (only OpenRouter reports this)
            "tools": ("tools" in params) if params is not None else None,
            # reasoning models spend tokens thinking out loud, which breaks the
            # gate's tiny budget: the UI steers them away from the gate slot
            "reasoning": ("reasoning" in params) if params is not None else None,
            "context": m.get("context_length"),
        }
        try:
            # OpenRouter prices are $/token strings; keep $/M for display + cost
            pin, pout = float(pricing["prompt"]) * 1e6, float(pricing["completion"]) * 1e6
            _price_cache[mid] = (pin, pout)
            entry["price_in"], entry["price_out"] = round(pin, 3), round(pout, 3)
        except (KeyError, TypeError, ValueError):
            pass
        models.append(entry)
    models.sort(key=lambda x: (not x["free"], x["tools"] is False, x["id"]))
    _models_cache[url] = (time.time(), models)
    return {**out, "listed": True, "models": models}


def settings_info() -> dict:
    """Current provider/model + which keys are set — masked to last-4, never
    the full key."""
    from waku.loop.models import PROVIDERS

    s = load_settings()
    prov = PROVIDERS.get(s.provider)
    return {
        "provider": s.provider,
        "model": s.model or (prov.model if prov else ""),
        "small_model": s.small_model or (prov.small_model if prov else ""),
        # a custom endpoint (e.g. OpenRouter) set via WAKU_BASE_URL / WAKU_API_KEY
        "base_url": s.base_url or "",
        "custom_key_set": bool(s.api_key),
        "providers": [
            {"name": name, "key_env": p.key_env,
             "key_set": bool(os.getenv(p.key_env)),
             "key_last4": (os.getenv(p.key_env) or "")[-4:],
             "default_model": p.model, "default_small_model": p.small_model}
            for name, p in PROVIDERS.items()
        ],
        # optional web-search key (Tavily) — same BYOK treatment as provider keys
        "search_key_env": "TAVILY_API_KEY",
        "search_key_set": bool(os.getenv("TAVILY_API_KEY")),
        "search_key_last4": (os.getenv("TAVILY_API_KEY") or "")[-4:],
    }


def _settings_env_path() -> Path:
    """Return a writable settings file, honoring isolated container runtimes."""
    configured = os.getenv("WAKU_ENV_FILE", "").strip()
    if configured:
        path = Path(configured).expanduser()
        path.parent.mkdir(parents=True, exist_ok=True)
        return path

    from dotenv import find_dotenv

    return Path(find_dotenv(usecwd=True) or ".env")


def apply_settings(payload: dict) -> dict:
    """Write .env + os.environ, then rebuild the agent so the switch is live.
    Never logs keys; only whitelisted env names are writable."""
    global _agent
    from dotenv import set_key

    from waku.loop.models import PROVIDERS

    provider = payload.get("provider")
    if provider not in PROVIDERS:
        return {"error": f"unknown provider {provider}"}
    writable = ({"WAKU_PROVIDER", "WAKU_MODEL", "WAKU_SMALL_MODEL", "TAVILY_API_KEY"}
                | {p.key_env for p in PROVIDERS.values()})
    env_path = _settings_env_path()

    updates = {"WAKU_PROVIDER": provider,
               "WAKU_MODEL": payload.get("model", "") or "",
               "WAKU_SMALL_MODEL": payload.get("small_model", "") or ""}
    for k, v in (payload.get("keys") or {}).items():
        if k in writable and v:  # only non-empty keys overwrite
            updates[k] = v
    for k, v in updates.items():
        if k in writable:
            set_key(str(env_path), k, v)
            os.environ[k] = v

    with _agent_lock:
        old = _agent
        try:
            new_settings = load_settings()
            new_settings.ensure_home()
            conn = connect(new_settings.home, check_same_thread=False)
            from waku.app import Waku

            _agent = Waku(settings=new_settings, conn=conn)
        except (Exception, SystemExit) as exc:  # get_client raises SystemExit
            _agent = old
            return {"error": str(exc)}
    if old is not None:
        old.close()
    return {"ok": True, **settings_info()}


def events_since(cursor):
    """New trace events past `cursor` (a line count in today's trace file).
    Any gateway — browser, CLI, voice, Telegram — appends to this same file,
    so the live diagram lights up for all of them. cursor=None returns just
    the current tail so the browser starts fresh instead of replaying history."""
    settings = load_settings()
    settings.ensure_home()
    path = settings.home / "traces" / (datetime.now().strftime("%Y-%m-%d") + ".jsonl")
    if not path.exists():
        return {"events": [], "cursor": 0}
    lines = path.read_text().splitlines()
    if cursor is None or cursor < 0 or cursor > len(lines):
        return {"events": [], "cursor": len(lines)}
    out = []
    for ln in lines[cursor:]:
        try:
            out.append(json.loads(ln))
        except json.JSONDecodeError:
            pass
    return {"events": out, "cursor": len(lines)}


class Handler(BaseHTTPRequestHandler):
    def _send(self, body: bytes, ctype: str, *, cache_control: str | None = None) -> None:
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        if cache_control:
            self.send_header("Cache-Control", cache_control)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        try:
            self.wfile.write(body)
        except (BrokenPipeError, ConnectionResetError):
            # The browser disconnected mid-poll; nothing to deliver and no
            # reason to dump a traceback for a routine client close.
            self.close_connection = True

    def do_GET(self):  # noqa: N802 — http.server API
        if self.path == "/api/data":
            self._send(json.dumps(collect(), default=str).encode(), "application/json")
        elif self.path == "/api/curriculum":
            self._send(json.dumps(curriculum_catalog()).encode(), "application/json")
        elif self.path.startswith("/api/learning-journal"):
            from urllib.parse import parse_qs, urlparse
            from waku.memory.learning_journal import LearningJournalStore

            chapter = parse_qs(urlparse(self.path).query).get("chapter", [""])[0]
            settings = load_settings()
            settings.ensure_home()
            row = LearningJournalStore(connect(settings.home)).get(chapter) if chapter else None
            self._send(json.dumps({"journal": row}).encode(), "application/json")
        elif self.path.startswith("/api/lab"):
            from urllib.parse import parse_qs, urlparse
            from waku.ops.lab import lab_state

            chapter = parse_qs(urlparse(self.path).query).get("chapter", [""])[0]
            self._send(json.dumps(lab_state(chapter), default=str).encode(), "application/json")
        elif self.path == "/api/models":
            self._send(json.dumps(list_models()).encode(), "application/json")
        elif self.path.startswith("/api/events"):
            from urllib.parse import parse_qs, urlparse

            raw = parse_qs(urlparse(self.path).query).get("cursor", [None])[0]
            cursor = int(raw) if raw and raw.lstrip("-").isdigit() else None
            self._send(json.dumps(events_since(cursor)).encode(), "application/json")
        elif self.path.startswith("/api/reveal"):
            from urllib.parse import parse_qs, unquote, urlparse

            rel = unquote(parse_qs(urlparse(self.path).query).get("path", [""])[0])
            self._send(json.dumps(reveal_path(rel)).encode(), "application/json")
        elif self.path.startswith("/static/"):
            self._serve_static(self.path)
        else:
            self._send((STATIC / "index.html").read_bytes(), "text/html; charset=utf-8")

    def _serve_static(self, path: str) -> None:  # the frontend files
        name = path.split("/static/", 1)[1].split("?")[0]
        target = (STATIC / name).resolve()
        if STATIC.resolve() not in target.parents or not target.is_file():
            self.send_response(404)
            self.end_headers()
            return
        ctype = {".css": "text/css", ".js": "text/javascript",
                 ".html": "text/html; charset=utf-8"}.get(target.suffix, "application/octet-stream")
        self._send(target.read_bytes(), ctype, cache_control="no-store")

    def do_POST(self):  # noqa: N802 — local write endpoints
        length = int(self.headers.get("Content-Length", 0))
        # /api/voice takes a raw audio blob, not JSON — handle it first.
        if self.path == "/api/voice":
            raw = self.rfile.read(length)
            self._send(json.dumps(transcribe_audio(raw)).encode(), "application/json")
            return
        # Terminal output is a POST-backed SSE stream. Raw PTY bytes stay
        # base64-encoded inside each JSON frame; a disconnected browser closes
        # the complete terminal process group through the service adapter.
        from waku.ops.lab_api import JSON_PATHS, SSE_PATH, get_lab_api

        if self.path == SSE_PATH:
            try:
                payload = json.loads(self.rfile.read(length) or "{}")
            except json.JSONDecodeError as exc:
                payload = {"__json_error__": str(exc)}
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Cache-Control", "no-cache")
            self.send_header("Connection", "close")
            self.end_headers()
            self.close_connection = True

            def emit_terminal(frame):
                self.wfile.write(f"data: {json.dumps(frame, default=str)}\n\n".encode())
                self.wfile.flush()

            try:
                if "__json_error__" in payload:
                    raise ValueError(f"invalid JSON: {payload['__json_error__']}")
                get_lab_api(ROOT).stream_terminal(payload, emit_terminal)
            except (BrokenPipeError, ConnectionResetError):
                pass
            except Exception as exc:
                try:
                    emit_terminal({"kind": "error", "error": f"{type(exc).__name__}: {exc}"})
                except (BrokenPipeError, ConnectionResetError):
                    pass
            return
        # /api/chat/stream streams harness events (SSE) as the turn runs.
        if self.path == "/api/chat/stream":
            payload = json.loads(self.rfile.read(length) or "{}")
            message = (payload.get("message") or "").strip()
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()

            def emit(kind, ev):
                try:
                    self.wfile.write(f"data: {json.dumps({'kind': kind, **ev}, default=str)}\n\n".encode())
                    self.wfile.flush()
                except (BrokenPipeError, ConnectionResetError):
                    pass  # the browser navigated away mid-stream — fine

            if not message:
                emit("done", {"error": "empty message"})
                return
            try:
                lab_session_id = payload.get("lab_session_id", payload.get("session_id"))
                learning_context = learning_context_for_turn(
                    payload.get("learning_context"), lab_session_id
                )
                chat_stream(message, emit, learning_context=learning_context)
            except Exception as exc:  # surface as a terminal event, don't 500
                emit("done", {"error": f"{type(exc).__name__}: {exc}"})
            return
        if self.path in JSON_PATHS:
            try:
                payload = json.loads(self.rfile.read(length) or "{}")
                out = get_lab_api(ROOT).dispatch(self.path, payload)
            except Exception as exc:
                out = {"error": f"{type(exc).__name__}: {exc}"}
            self._send(json.dumps(out, default=str).encode(), "application/json")
            return
        routes = {"/api/chat": None, "/api/memory": memory_action,
                  "/api/learning-journal": learning_journal_action,
                  "/api/lab/run": None, "/api/lab/attach": None,
                  "/api/settings": apply_settings,
                  "/api/integrations/test": test_mcp_connection,
                  "/api/query": run_query, "/api/session": session_action}
        if self.path not in routes:
            self.send_response(404)
            self.end_headers()
            return
        payload = json.loads(self.rfile.read(length) or "{}")
        try:
            if self.path == "/api/chat":
                message = (payload.get("message") or "").strip()
                lab_session_id = payload.get("lab_session_id", payload.get("session_id"))
                learning_context = learning_context_for_turn(
                    payload.get("learning_context"), lab_session_id
                )
                out = chat(message, learning_context=learning_context) if message else {"error": "empty message"}
            elif self.path == "/api/lab/run":
                from waku.ops.lab import run_lab_action

                out = run_lab_action(payload)
            elif self.path == "/api/lab/attach":
                from waku.ops.lab import attach_lab_attempt

                out = attach_lab_attempt(payload)
            else:
                out = routes[self.path](payload)
        except Exception as exc:  # surface, don't 500 — the browser shows it
            out = {"error": f"{type(exc).__name__}: {exc}"}
        self._send(json.dumps(out, default=str).encode(), "application/json")

    def log_message(self, *args):  # keep the terminal quiet
        pass


def main() -> None:
    # Port precedence: WAKU_DASHBOARD_PORT, then the conventional PORT (used by
    # deploy platforms and IDE preview panes), then 7777. If it's taken, walk on.
    base = int(os.getenv("WAKU_DASHBOARD_PORT") or os.getenv("PORT") or PORT)
    host = os.getenv("WAKU_DASHBOARD_HOST", "127.0.0.1")
    for port in range(base, base + 10):  # walk past a busy port instead of crashing
        try:
            server = ThreadingHTTPServer((host, port), Handler)
        except OSError:
            print(f"port {port} busy, trying {port + 1}…")
            continue
        # One command, many gateways: if a Telegram token is set, run the bot
        # too (background thread) so you don't need a separate `waku telegram`.
        try:
            from waku.gateway.telegram import start_in_background

            if start_in_background():
                print("Telegram gateway → listening in the background (phone messages land here too)")
        except Exception as exc:  # noqa: BLE001 — never let a gateway block the dashboard
            print(f"(telegram) not started: {exc}")
        print(f"Waku dashboard → http://localhost:{port}  (Ctrl-C to stop)")
        server.serve_forever()
        return
    raise SystemExit(f"no free port in {base}–{base + 9}")


if __name__ == "__main__":
    main()
