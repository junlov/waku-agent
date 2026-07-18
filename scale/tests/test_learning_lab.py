from __future__ import annotations

import json
import os
import socket
import subprocess
import sys
import time
import urllib.request
from contextlib import contextmanager

import pytest

from waku.db import connect
from waku.ops.lab import run_lab_action


def _free_port() -> int:
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


@contextmanager
def running_lab(tmp_path):
    port = _free_port()
    workspace = tmp_path / "workspace"
    workspace.mkdir()
    env = dict(
        os.environ,
        WAKU_PROVIDER="sim",
        WAKU_API_KEY="",
        WAKU_HOME=str(tmp_path / ".waku"),
        WAKU_WORKSPACE=str(workspace),
        WAKU_SANDBOX="1",
        WAKU_DASHBOARD_PORT=str(port),
    )
    env.pop("TELEGRAM_BOT_TOKEN", None)
    process = subprocess.Popen(
        [sys.executable, "-m", "waku.ops.dashboard"],
        env=env,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.STDOUT,
    )
    base = f"http://127.0.0.1:{port}"
    try:
        deadline = time.monotonic() + 10
        while True:
            try:
                urllib.request.urlopen(base + "/api/data", timeout=1).close()
                break
            except OSError:
                if time.monotonic() > deadline:
                    raise RuntimeError("lab dashboard did not start")
                time.sleep(0.1)
        yield base
    finally:
        process.terminate()
        process.wait(timeout=10)


def _json(url: str, payload: dict | None = None) -> dict:
    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode() if payload is not None else None,
        headers={"Content-Type": "application/json"},
        method="POST" if payload is not None else "GET",
    )
    with urllib.request.urlopen(request, timeout=10) as response:
        return json.loads(response.read())


def test_chapter_lab_runs_command_and_persists_attempt(tmp_path):
    with running_lab(tmp_path) as base:
        result = _json(
            base + "/api/lab/run",
            {
                "chapter": "01",
                "action": "command",
                "command": "printf lab-ready",
            },
        )
        lab = _json(base + "/api/lab?chapter=01")

    assert result["exit_code"] == 0
    assert result["output"] == "lab-ready"
    assert lab["chapter"] == "01"
    assert lab["attempts"][0]["output"] == "lab-ready"


def test_another_runnable_chapter_uses_the_same_lab_api(tmp_path):
    with running_lab(tmp_path) as base:
        result = _json(
            base + "/api/lab/run",
            {
                "chapter": "00",
                "action": "command",
                "command": "printf harness-ready",
            },
        )
        lab = _json(base + "/api/lab?chapter=00")

    assert result["exit_code"] == 0
    assert result["output"] == "harness-ready"
    assert lab["contract"]["state"] == "runnable"
    assert lab["attempts"][0]["chapter"] == "00"


def test_preview_lab_is_visible_but_cannot_execute_unpublished_instrument(tmp_path):
    with running_lab(tmp_path) as base:
        lab = _json(base + "/api/lab?chapter=16")
        result = _json(
            base + "/api/lab/run",
            {
                "chapter": "16",
                "action": "verify",
            },
        )

    assert lab["contract"]["state"] == "preview"
    assert lab["contract"]["verify"] == "make check-16"
    assert lab["attempts"] == []
    assert result == {
        "error": "Chapter 16 is a lab preview; its failure instrument is not published yet"
    }


def test_lab_attempt_can_be_attached_to_learning_journal(tmp_path):
    with running_lab(tmp_path) as base:
        attempt = _json(
            base + "/api/lab/run",
            {
                "chapter": "01",
                "action": "command",
                "command": "printf observed-latency",
            },
        )
        attached = _json(
            base + "/api/lab/attach",
            {
                "attempt_id": attempt["id"],
                "chapter": "01",
                "track": "architect",
            },
        )
        journal = _json(base + "/api/learning-journal?chapter=01")
        lab = _json(base + "/api/lab?chapter=01")

    assert attached["ok"] is True
    assert "observed-latency" in journal["journal"]["evidence"]
    assert "printf observed-latency" in journal["journal"]["evidence"]
    assert lab["attempts"][0]["attached_to_journal"] == 1


def test_journal_attachment_is_chapter_scoped_across_labs(tmp_path):
    with running_lab(tmp_path) as base:
        attempt = _json(
            base + "/api/lab/run",
            {
                "chapter": "00",
                "action": "command",
                "command": "printf public-path-proof",
            },
        )
        attached = _json(
            base + "/api/lab/attach",
            {
                "attempt_id": attempt["id"],
                "chapter": "00",
                "track": "lab",
            },
        )
        chapter_zero = _json(base + "/api/learning-journal?chapter=00")
        chapter_one = _json(base + "/api/learning-journal?chapter=01")

    assert attached["ok"] is True
    assert "public-path-proof" in chapter_zero["journal"]["evidence"]
    assert chapter_zero["journal"]["track"] == "lab"
    assert chapter_one["journal"] is None


def test_declared_action_excludes_and_dynamically_redacts_configured_secrets(
    tmp_path,
    monkeypatch: pytest.MonkeyPatch,
):
    workspace = tmp_path / "workspace"
    workspace.mkdir()
    home = tmp_path / ".waku"
    secrets = {
        "SLACK_BOT_TOKEN": "opaque-slack-action-78431",
        "GOOGLE_APPLICATION_CREDENTIALS": "opaque-google-action-65029",
        "CUSTOM_RUNTIME_VALUE": "opaque-custom-action-91357",
    }
    monkeypatch.setenv("WAKU_SANDBOX", "1")
    monkeypatch.setenv("WAKU_HOME", str(home))
    for key, value in secrets.items():
        monkeypatch.setenv(key, value)
    command = (
        "printf 'env=%s|%s|%s\\n' "
        '"${SLACK_BOT_TOKEN-missing}" "${GOOGLE_APPLICATION_CREDENTIALS-missing}" '
        '"${CUSTOM_RUNTIME_VALUE-missing}"; '
        f"printf 'literal={secrets['SLACK_BOT_TOKEN']}|"
        f"{secrets['GOOGLE_APPLICATION_CREDENTIALS']}|"
        f"{secrets['CUSTOM_RUNTIME_VALUE']}\\n'"
    )

    result = run_lab_action(
        {"chapter": "01", "action": "command", "command": command},
        workspace=workspace,
    )
    stored = (
        connect(home)
        .execute("SELECT command, output FROM lab_attempts WHERE id = ?", (result["id"],))
        .fetchone()
    )

    assert "env=missing|missing|missing" in result["output"]
    assert all(secret not in result["output"] for secret in secrets.values())
    assert all(secret not in stored["command"] for secret in secrets.values())
    assert all(secret not in stored["output"] for secret in secrets.values())
    assert "[REDACTED]" in result["output"]


def test_declared_action_allows_only_declared_simulator_knobs(
    tmp_path,
    monkeypatch: pytest.MonkeyPatch,
):
    workspace = tmp_path / "workspace"
    workspace.mkdir()
    home = tmp_path / ".waku"
    secret = "opaque-simulator-action-key-65029"
    monkeypatch.setenv("WAKU_SANDBOX", "1")
    monkeypatch.setenv("WAKU_HOME", str(home))
    monkeypatch.setenv("WAKU_SIM_ERROR_RATE", "0.25")
    monkeypatch.setenv("WAKU_SIM_API_KEY", secret)

    result = run_lab_action(
        {
            "chapter": "01",
            "action": "command",
            "command": (
                "printf 'rate=%s key=%s\\n' \"$WAKU_SIM_ERROR_RATE\" "
                "\"${WAKU_SIM_API_KEY-missing}\"; "
                f"printf 'literal={secret}\\n'"
            ),
        },
        workspace=workspace,
    )
    stored = (
        connect(home)
        .execute("SELECT command, output FROM lab_attempts WHERE id = ?", (result["id"],))
        .fetchone()
    )

    assert "rate=0.25 key=missing" in result["output"]
    assert secret not in result["output"]
    assert secret not in stored["command"]
    assert secret not in stored["output"]
    assert "[REDACTED]" in result["output"]
