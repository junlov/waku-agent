from __future__ import annotations

import base64
import json
import subprocess
import threading
import time
import urllib.request
from datetime import datetime, timezone
from http.server import ThreadingHTTPServer
from pathlib import Path

import pytest

from waku.db import connect
from waku.ops import dashboard
from waku.ops.lab_api import LabAPIError, build_lab_api, get_lab_api
from waku.ops.lab_terminal import LabTerminalBusy


ROOT = Path(__file__).resolve().parents[2]


def git(repository: Path, *args: str) -> str:
    return subprocess.run(
        ["git", *args],
        cwd=repository,
        text=True,
        capture_output=True,
        check=True,
    ).stdout.strip()


def workspace(tmp_path: Path) -> Path:
    root = tmp_path / "workspace"
    (root / "docs/scale").mkdir(parents=True)
    git(root, "init", "-b", "scale")
    git(root, "config", "user.name", "Learner")
    git(root, "config", "user.email", "learner@example.test")
    (root / ".gitignore").write_text(".env\n.waku/\n")
    (root / "docs/scale/SCENARIO.md").write_text("# Scenario\n")
    (root / "docs/scale/SLO.md").write_text("# SLO\n")
    (root / "docs/scale/PROGRESS.md").write_text("# Progress\n")
    git(root, "add", ".")
    git(root, "commit", "-m", "baseline")
    for tag in ("chapter-00-start", "chapter-00-solution", "chapter-01-start"):
        git(root, "tag", tag)
    return root


def fake_action_runner(api):
    def run(payload: dict, workspace: Path | None = None) -> dict:
        assert workspace is not None
        cursor = api.connection.execute(
            """INSERT INTO lab_attempts
               (chapter, session_id, step_id, action_id, action, command,
                exit_code, output, started_at, duration_ms)
               VALUES (?, ?, ?, ?, ?, ?, 0, 'api-proof', ?, 4)""",
            (
                payload["chapter"],
                payload["session_id"],
                payload["step_id"],
                payload["action_id"],
                payload["action_id"],
                payload["action_id"],
                datetime.now(timezone.utc).isoformat(),
            ),
        )
        api.connection.commit()
        return {
            "id": cursor.lastrowid,
            "chapter": payload["chapter"],
            "action": payload["action_id"],
            "exit_code": 0,
            "output": "api-proof",
        }

    return run


def reflections() -> dict[str, str]:
    return {
        "observed_failure": "The baseline missed its latency target.",
        "evidence_explanation": "Queue wait dominates the measurement.",
        "decision_and_tradeoff": "Keep correctness while setting the SLO.",
        "proof_and_remaining_risk": "The sim proof passed; provider risk remains.",
    }


def test_json_adapter_exposes_complete_manifest_bounded_lab_lifecycle(tmp_path: Path) -> None:
    repository = workspace(tmp_path)
    api = build_lab_api(
        curriculum_root=ROOT,
        workspace=repository,
        home=tmp_path / "state",
    )
    api.runtime._action_runner = fake_action_runner(api)

    api.dispatch("/api/lab/session/start", {"chapter": "01", "session_id": "browser-01"})
    assert (
        api.dispatch("/api/lab/session/get", {"session_id": "browser-01"})["current_step"]
        == "01-observe"
    )
    assert api.dispatch("/api/lab/session/list", {})["sessions"][0]["id"] == "browser-01"
    assert (
        api.dispatch("/api/lab/session/pause", {"session_id": "browser-01"})["status"] == "paused"
    )
    assert (
        api.dispatch("/api/lab/session/resume", {"session_id": "browser-01"})["status"]
        == "in_progress"
    )
    assert api.dispatch("/api/lab/hint", {"session_id": "browser-01"})["level"] == 1
    marker = api.dispatch(
        "/api/lab/creator/marker",
        {"session_id": "browser-01", "kind": "surprise", "note": "queue wait"},
    )
    assert marker["details"]["kind"] == "surprise"

    measure = api.dispatch("/api/lab/action", {"session_id": "browser-01", "action_id": "measure"})
    files = api.dispatch("/api/lab/file/list", {"session_id": "browser-01"})["files"]
    slo = next(item for item in files if item["path"] == "docs/scale/SLO.md")
    api.dispatch(
        "/api/lab/file/save",
        {
            "session_id": "browser-01",
            "path": "docs/scale/SLO.md",
            "content": "# Browser SLO\n",
            "expected_revision": slo["revision"],
        },
    )
    assert (
        api.dispatch(
            "/api/lab/file/read",
            {"session_id": "browser-01", "path": "docs/scale/SLO.md"},
        )["content"]
        == "# Browser SLO\n"
    )

    checkpoint = api.dispatch(
        "/api/lab/checkpoint/create",
        {"session_id": "browser-01", "label": "browser checkpoint"},
    )
    (repository / "docs/scale/SLO.md").write_text("# Later edit\n")
    preview = api.dispatch(
        "/api/lab/checkpoint/prepare",
        {"session_id": "browser-01", "checkpoint_ref": checkpoint["git_ref"]},
    )
    api.dispatch(
        "/api/lab/checkpoint/confirm",
        {
            "session_id": "browser-01",
            "checkpoint_ref": checkpoint["git_ref"],
            "token": preview["token"],
        },
    )
    assert (repository / "docs/scale/SLO.md").read_text() == "# Browser SLO\n"

    with pytest.raises(LabAPIError, match="current_step"):
        api.dispatch(
            "/api/lab/terminal/open",
            {
                "session_id": "browser-01",
                "chapter": "01",
                "current_step": "01-prove",
            },
        )
    opened = api.dispatch(
        "/api/lab/terminal/open",
        {
            "session_id": "browser-01",
            "rows": 30,
            "columns": 90,
        },
    )
    terminal_id = opened["terminal_id"]
    current_slo = api.dispatch(
        "/api/lab/file/read",
        {"session_id": "browser-01", "path": "docs/scale/SLO.md"},
    )
    saved_while_terminal_open = api.dispatch(
        "/api/lab/file/save",
        {
            "session_id": "browser-01",
            "path": "docs/scale/SLO.md",
            "content": "# Edited beside the terminal\n",
            "expected_revision": current_slo["revision"],
        },
    )
    assert saved_while_terminal_open["content"] == "# Edited beside the terminal\n"
    api.dispatch(
        "/api/lab/terminal/input",
        {
            "terminal_id": terminal_id,
            "data": base64.b64encode(b"echo browser-terminal; exit\n").decode(),
        },
    )
    frames = []
    api.stream_terminal({"terminal_id": terminal_id}, frames.append)
    assert any(
        b"browser-terminal" in base64.b64decode(frame["data"])
        for frame in frames
        if frame["kind"] == "output"
    )
    natural_attempt = api.connection.execute(
        "SELECT id FROM lab_attempts WHERE session_id = 'browser-01' AND action_id = 'terminal'"
    ).fetchone()
    assert natural_attempt is not None
    closed = api.dispatch("/api/lab/terminal/close", {"terminal_id": terminal_id})
    assert closed["attempt_id"] == natural_attempt["id"]
    assert (
        api.connection.execute(
            "SELECT count(*) FROM lab_attempts WHERE session_id = 'browser-01' "
            "AND action_id = 'terminal'"
        ).fetchone()[0]
        == 1
    )

    for step in ("01-explain", "01-decide", "01-repair", "01-prove"):
        api.dispatch(
            "/api/lab/session/advance",
            {"session_id": "browser-01", "next_step": step},
        )
    verify = api.dispatch("/api/lab/action", {"session_id": "browser-01", "action_id": "verify"})
    preview = api.dispatch(
        "/api/lab/recap/preview",
        {
            "session_id": "browser-01",
            "attempt_ids": [measure["id"], verify["id"]],
            "reflections": reflections(),
        },
    )
    assert "api-proof" in preview["content"]
    exported = api.dispatch(
        "/api/lab/recap/export",
        {
            "session_id": "browser-01",
            "attempt_ids": [verify["id"]],
            "reflections": reflections(),
        },
    )
    assert exported["exported"] is True

    git(repository, "add", ".")
    git(repository, "commit", "-m", "complete browser lab")
    final_commit = git(repository, "rev-parse", "HEAD")
    git(repository, "tag", "learner/chapter-01-passed")
    passed = api.dispatch(
        "/api/lab/completion/validate",
        {
            "session_id": "browser-01",
            "final_commit": final_commit,
            "completion_ref": "learner/chapter-01-passed",
        },
    )
    assert passed["status"] == "passed"

    api.runtime.sessions.start(
        "01",
        current_step="01-observe",
        workspace_mode="canonical",
        base_commit=final_commit,
        session_id="abandon-me",
    )
    assert (
        api.dispatch("/api/lab/session/abandon", {"session_id": "abandon-me"})["status"]
        == "abandoned"
    )


def test_api_derives_replay_workspace_from_session_instead_of_browser_claims(
    tmp_path: Path,
) -> None:
    repository = workspace(tmp_path)
    (repository / "docs/scale/SLO.md").write_text("# Canonical passed solution\n")
    git(repository, "add", ".")
    git(repository, "commit", "-m", "pass chapter 01")
    git(repository, "tag", "learner/chapter-01-passed")
    api = build_lab_api(
        curriculum_root=ROOT,
        workspace=repository,
        home=tmp_path / "replay-state",
    )

    session = api.dispatch("/api/lab/session/start", {"chapter": "01", "session_id": "replay-api"})
    replay = api.runtime.workspace_for_session("replay-api")
    opened_file = api.dispatch(
        "/api/lab/file/read",
        {"session_id": "replay-api", "path": "docs/scale/SLO.md"},
    )
    terminal = api.dispatch("/api/lab/terminal/open", {"session_id": "replay-api"})
    api.dispatch(
        "/api/lab/terminal/input",
        {
            "terminal_id": terminal["terminal_id"],
            "data": base64.b64encode(b"pwd; exit\n").decode(),
        },
    )
    frames: list[dict] = []
    api.stream_terminal({"terminal_id": terminal["terminal_id"]}, frames.append)
    api.dispatch("/api/lab/terminal/close", {"terminal_id": terminal["terminal_id"]})
    abandoned = api.dispatch("/api/lab/session/abandon", {"session_id": "replay-api"})

    assert session["workspace_mode"] == "replay"
    assert opened_file["content"] == "# SLO\n"
    assert any(
        str(replay).encode() in base64.b64decode(frame["data"])
        for frame in frames
        if frame["kind"] == "output"
    )
    assert abandoned["status"] == "abandoned"
    assert not replay.exists()
    assert (repository / "docs/scale/SLO.md").read_text() == "# Canonical passed solution\n"


def test_snapshot_reconstructs_refresh_state_from_manifest_sqlite_and_git(
    tmp_path: Path,
) -> None:
    repository = workspace(tmp_path)
    home = tmp_path / "snapshot-state"
    api = build_lab_api(curriculum_root=ROOT, workspace=repository, home=home)
    api.runtime._action_runner = fake_action_runner(api)
    api.dispatch("/api/lab/session/start", {"chapter": "01", "session_id": "refresh-me"})
    attempt = api.dispatch("/api/lab/action", {"session_id": "refresh-me", "action_id": "measure"})
    hint = api.dispatch("/api/lab/hint", {"session_id": "refresh-me"})
    marker = api.dispatch(
        "/api/lab/creator/marker",
        {"session_id": "refresh-me", "kind": "decision", "note": "keep correctness"},
    )
    checkpoint = api.dispatch(
        "/api/lab/checkpoint/create",
        {"session_id": "refresh-me", "label": "refresh checkpoint"},
    )
    (repository / "docs/scale/SLO.md").write_text("# Unsaved refresh edit\n")
    before = api.dispatch("/api/lab/session/snapshot", {"session_id": "refresh-me"})
    json.dumps(before)
    api.shutdown()
    api.connection.close()

    restarted = build_lab_api(curriculum_root=ROOT, workspace=repository, home=home)
    after = restarted.dispatch("/api/lab/session/snapshot", {"session_id": "refresh-me"})

    assert after["schema"] == 1
    assert after["session"]["id"] == "refresh-me"
    assert after["manifest"]["chapter"] == "01"
    assert after["current_step"]["id"] == "01-observe"
    assert after["attempts"][0]["id"] == attempt["id"]
    assert after["attempts"][0]["declared_evidence"] is True
    assert any(
        event["event_type"] == "hint_revealed" and event["details"]["hint_id"] == hint["id"]
        for event in after["events"]
    )
    assert any(
        event["event_type"] == "creator_marker" and event["id"] == marker["id"]
        for event in after["events"]
    )
    assert after["checkpoints"][0]["git_ref"] == checkpoint["git_ref"]
    assert after["workspace"]["available"] is True
    assert after["workspace"]["git"]["clean"] is False
    assert "SLO.md" in after["workspace"]["git"]["diff_summary"]


def test_slow_terminal_close_does_not_hold_the_domain_adapter_lock(
    tmp_path: Path,
) -> None:
    repository = workspace(tmp_path)
    api = build_lab_api(
        curriculum_root=ROOT,
        workspace=repository,
        home=tmp_path / "lock-state",
    )
    api.dispatch("/api/lab/session/start", {"chapter": "01", "session_id": "lock-test"})
    opened = api.dispatch("/api/lab/terminal/open", {"session_id": "lock-test"})
    api.dispatch(
        "/api/lab/terminal/input",
        {
            "terminal_id": opened["terminal_id"],
            "data": base64.b64encode(
                b"trap '' HUP TERM; touch terminal-armed; sleep 30\n"
            ).decode(),
        },
    )
    deadline = time.monotonic() + 3
    while not (repository / "terminal-armed").exists():
        assert time.monotonic() < deadline
        time.sleep(0.02)
    close_result: dict = {}

    def close_terminal() -> None:
        close_result.update(
            api.dispatch(
                "/api/lab/terminal/close",
                {"terminal_id": opened["terminal_id"]},
            )
        )

    closer = threading.Thread(target=close_terminal)
    closer.start()
    time.sleep(0.1)
    started = time.monotonic()
    session = api.dispatch("/api/lab/session/get", {"session_id": "lock-test"})
    domain_elapsed = time.monotonic() - started
    closer.join(timeout=4)

    assert session["id"] == "lock-test"
    assert domain_elapsed < 0.5
    assert close_result["attempt_id"] > 0


def test_api_close_remains_responsive_with_saturated_terminal_input(
    tmp_path: Path,
) -> None:
    repository = workspace(tmp_path)
    api = build_lab_api(
        curriculum_root=ROOT,
        workspace=repository,
        home=tmp_path / "input-lock-state",
    )
    api.dispatch("/api/lab/session/start", {"chapter": "01", "session_id": "input-lock"})
    opened = api.dispatch("/api/lab/terminal/open", {"session_id": "input-lock"})
    terminal_id = opened["terminal_id"]
    api.dispatch(
        "/api/lab/terminal/input",
        {
            "terminal_id": terminal_id,
            "data": base64.b64encode(b"trap '' HUP TERM; touch input-armed; sleep 30\n").decode(),
        },
    )
    deadline = time.monotonic() + 3
    while not (repository / "input-armed").exists():
        assert time.monotonic() < deadline
        time.sleep(0.02)
    fill_result: dict[str, object] = {}

    def fill_input() -> None:
        try:
            for _ in range(100):
                api.dispatch(
                    "/api/lab/terminal/input",
                    {
                        "terminal_id": terminal_id,
                        "data": base64.b64encode(b"x" * 8192).decode(),
                    },
                )
        except LabTerminalBusy as error:
            fill_result["busy"] = error
        finally:
            fill_result["finished"] = True

    filler = threading.Thread(target=fill_input, daemon=True)
    filler.start()
    filler.join(timeout=0.75)
    close_result: dict[str, object] = {}
    close_done = threading.Event()

    def close_terminal() -> None:
        try:
            close_result.update(
                api.dispatch("/api/lab/terminal/close", {"terminal_id": terminal_id})
            )
        except Exception as error:  # pragma: no cover - retained for failure diagnosis
            close_result["error"] = error
        finally:
            close_done.set()

    started = time.monotonic()
    closer = threading.Thread(target=close_terminal, daemon=True)
    closer.start()
    completed = close_done.wait(timeout=3)
    elapsed = time.monotonic() - started
    if not completed:
        api.shutdown()
        close_done.wait(timeout=1)

    assert fill_result.get("finished") is True
    assert "capacity" in str(fill_result.get("busy"))
    assert completed is True
    assert elapsed < 3
    assert int(close_result["attempt_id"]) > 0


def test_replay_completion_route_records_proof_without_moving_learner_tag(
    tmp_path: Path,
) -> None:
    repository = workspace(tmp_path)
    (repository / "docs/scale/SLO.md").write_text("# Canonical passed solution\n")
    git(repository, "add", ".")
    git(repository, "commit", "-m", "pass chapter 01")
    git(repository, "tag", "learner/chapter-01-passed")
    completion_commit = git(repository, "rev-parse", "learner/chapter-01-passed^{commit}")
    api = build_lab_api(
        curriculum_root=ROOT,
        workspace=repository,
        home=tmp_path / "replay-completion-state",
    )
    api.runtime._action_runner = fake_action_runner(api)
    api.dispatch("/api/lab/session/start", {"chapter": "01", "session_id": "complete-replay"})
    api.dispatch("/api/lab/action", {"session_id": "complete-replay", "action_id": "measure"})
    for step in ("01-explain", "01-decide", "01-repair", "01-prove"):
        api.dispatch(
            "/api/lab/session/advance",
            {"session_id": "complete-replay", "next_step": step},
        )
    proof = api.dispatch(
        "/api/lab/action", {"session_id": "complete-replay", "action_id": "verify"}
    )
    api.dispatch(
        "/api/lab/recap/export",
        {
            "session_id": "complete-replay",
            "attempt_ids": [proof["id"]],
            "reflections": reflections(),
        },
    )
    replay = api.runtime.workspace_for_session("complete-replay")
    git(replay, "add", ".")
    git(replay, "commit", "-m", "complete replay proof")

    result = api.dispatch("/api/lab/session/complete-replay", {"session_id": "complete-replay"})
    snapshot = api.dispatch("/api/lab/session/snapshot", {"session_id": "complete-replay"})

    assert result["session"]["status"] == "proof_ready"
    assert result["event"]["event_type"] == "replay_completed"
    assert result["event"]["details"]["learner_tag_moved"] is False
    assert git(repository, "rev-parse", "learner/chapter-01-passed^{commit}") == completion_commit
    assert any(event["event_type"] == "replay_completed" for event in snapshot["events"])
    api.dispatch("/api/lab/session/abandon", {"session_id": "complete-replay"})


def test_build_lab_api_uses_configured_replay_root_then_home_fallback(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    repository = workspace(tmp_path)
    custom = tmp_path / "persistent-runtime" / "replays"
    monkeypatch.setenv("WAKU_LAB_REPLAYS", str(custom))

    configured = build_lab_api(
        curriculum_root=ROOT,
        workspace=repository,
        home=tmp_path / "configured-home",
    )
    assert configured.runtime.replay_root == custom.resolve()
    configured.connection.close()

    monkeypatch.delenv("WAKU_LAB_REPLAYS")
    fallback_home = tmp_path / "fallback-home"
    fallback = build_lab_api(
        curriculum_root=ROOT,
        workspace=repository,
        home=fallback_home,
    )
    assert fallback.runtime.replay_root == (fallback_home / "lab-replays").resolve()
    fallback.connection.close()


def post(url: str, path: str, payload: dict) -> dict:
    request = urllib.request.Request(
        url + path,
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=8) as response:
        return json.loads(response.read())


def test_dashboard_routes_sessions_and_enriches_chat_without_rewriting_message(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    repository = workspace(tmp_path)
    home = tmp_path / "http-state"
    monkeypatch.setenv("WAKU_WORKSPACE", str(repository))
    monkeypatch.setenv("WAKU_HOME", str(home))
    captured: dict = {}

    def fake_chat(message: str, learning_context=None) -> dict:
        captured["message"] = message
        captured["context"] = learning_context
        return {"reply": message, "learning_context": learning_context.public_summary()}

    monkeypatch.setattr(dashboard, "chat", fake_chat)
    server = ThreadingHTTPServer(("127.0.0.1", 0), dashboard.Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    url = f"http://127.0.0.1:{server.server_port}"
    try:
        session = post(
            url,
            "/api/lab/session/start",
            {"chapter": "01", "session_id": "http-guided"},
        )
        listed = post(url, "/api/lab/session/list", {})
        response = post(
            url,
            "/api/chat",
            {
                "message": "exact browser message",
                "session_id": "http-guided",
                "learning_context": {"chapter": "01", "track": "lab", "journal": {}},
            },
        )
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=3)
        get_lab_api(ROOT).terminals.close_all()

    assert session["current_step"] == "01-observe"
    assert listed["sessions"][0]["id"] == "http-guided"
    assert response["reply"] == "exact browser message"
    assert captured["message"] == "exact browser message"
    assert captured["context"].current_step == "01-observe"


def test_completion_and_terminal_claim_errors_are_json_not_missing_routes(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    repository = workspace(tmp_path)
    monkeypatch.setenv("WAKU_WORKSPACE", str(repository))
    monkeypatch.setenv("WAKU_HOME", str(tmp_path / "error-state"))
    server = ThreadingHTTPServer(("127.0.0.1", 0), dashboard.Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    url = f"http://127.0.0.1:{server.server_port}"
    try:
        post(url, "/api/lab/session/start", {"chapter": "01", "session_id": "errors"})
        terminal_error = post(
            url,
            "/api/lab/terminal/open",
            {"session_id": "errors", "chapter": "02", "current_step": "01-observe"},
        )
        completion_error = post(
            url,
            "/api/lab/completion/validate",
            {"session_id": "errors", "final_commit": "bad", "completion_ref": "bad"},
        )
        opened = post(url, "/api/lab/terminal/open", {"session_id": "errors"})
        post(
            url,
            "/api/lab/terminal/input",
            {
                "terminal_id": opened["terminal_id"],
                "data": base64.b64encode(b"echo http-sse; exit\n").decode(),
            },
        )
        request = urllib.request.Request(
            url + "/api/lab/terminal/stream",
            data=json.dumps({"terminal_id": opened["terminal_id"]}).encode(),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(request, timeout=8) as response:
            assert response.headers.get_content_type() == "text/event-stream"
            events = [
                json.loads(line.removeprefix("data: "))
                for line in response.read().decode().splitlines()
                if line.startswith("data: ")
            ]
        post(url, "/api/lab/terminal/close", {"terminal_id": opened["terminal_id"]})
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=3)
        get_lab_api(ROOT).terminals.close_all()

    assert "does not match" in terminal_error["error"]
    assert "final prove step" in completion_error["error"]
    assert any(
        b"http-sse" in base64.b64decode(event["data"])
        for event in events
        if event["kind"] == "output"
    )


def test_terminal_close_and_session_reads_survive_a_slow_action(tmp_path: Path) -> None:
    repository = workspace(tmp_path)
    home = tmp_path / "slow-action-state"
    api = build_lab_api(curriculum_root=ROOT, workspace=repository, home=home)
    action_started = threading.Event()
    release_action = threading.Event()

    def slow_runner(payload: dict, workspace: Path | None = None) -> dict:
        action_started.set()
        assert release_action.wait(timeout=15)
        connection = connect(home, check_same_thread=False)
        try:
            cursor = connection.execute(
                """INSERT INTO lab_attempts
                   (chapter, session_id, step_id, action_id, action, command,
                    exit_code, output, started_at, duration_ms)
                   VALUES (?, ?, ?, ?, ?, ?, 0, 'slow-proof', ?, 4)""",
                (
                    payload["chapter"],
                    payload["session_id"],
                    payload["step_id"],
                    payload["action_id"],
                    payload["action_id"],
                    payload["action_id"],
                    datetime.now(timezone.utc).isoformat(),
                ),
            )
            connection.commit()
            return {
                "id": cursor.lastrowid,
                "chapter": payload["chapter"],
                "action": payload["action_id"],
                "exit_code": 0,
                "output": "slow-proof",
            }
        finally:
            connection.close()

    api.runtime._action_runner = slow_runner
    api.dispatch("/api/lab/session/start", {"chapter": "01", "session_id": "slow-action"})
    opened = api.dispatch("/api/lab/terminal/open", {"session_id": "slow-action"})
    terminal_id = opened["terminal_id"]

    action_result: dict = {}

    def run_action() -> None:
        try:
            action_result["value"] = api.dispatch(
                "/api/lab/action", {"session_id": "slow-action", "action_id": "measure"}
            )
        except Exception as error:  # pragma: no cover - retained for failure diagnosis
            action_result["error"] = error

    actor = threading.Thread(target=run_action)
    actor.start()
    assert action_started.wait(timeout=3)

    api.dispatch(
        "/api/lab/terminal/input",
        {"terminal_id": terminal_id, "data": base64.b64encode(b"sleep 30\n").decode()},
    )
    time.sleep(0.1)
    started = time.monotonic()
    closed = api.dispatch("/api/lab/terminal/close", {"terminal_id": terminal_id})
    close_elapsed = time.monotonic() - started
    session = api.dispatch("/api/lab/session/get", {"session_id": "slow-action"})

    release_action.set()
    actor.join(timeout=15)

    assert close_elapsed < 3
    assert closed["attempt_id"] > 0
    assert session["id"] == "slow-action"
    assert "error" not in action_result
    assert action_result["value"]["exit_code"] == 0
    manager = api.runtime._terminals.get("slow-action")
    assert manager is None or not manager._sessions
