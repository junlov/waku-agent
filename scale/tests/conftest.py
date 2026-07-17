"""Shared plumbing for scale tests: boot a real dashboard server on the sim
provider, in a subprocess, with an isolated WAKU_HOME. The tests hit it over
HTTP exactly like the browser and the loadgen do."""

from __future__ import annotations

import json
import os
import socket
import subprocess
import sys
import time
import urllib.request

import pytest


def _free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


@pytest.fixture()
def sim_server(tmp_path):
    """Yield the base_url of a live dashboard running on the sim provider."""
    port = _free_port()
    env = dict(
        os.environ,
        WAKU_PROVIDER="sim", WAKU_MODEL="", WAKU_SMALL_MODEL="",
        WAKU_HOME=str(tmp_path / ".waku"),
        WAKU_ENV_FILE=str(tmp_path / ".env"),
        WAKU_DASHBOARD_PORT=str(port),
        WAKU_SIM_LATENCY_MS=os.getenv("WAKU_SIM_LATENCY_MS", "300"),
        WAKU_LLM_TIMEOUT="30",
    )
    env.pop("TELEGRAM_BOT_TOKEN", None)  # never start a real gateway from tests
    proc = subprocess.Popen(
        [sys.executable, "-m", "waku.ops.dashboard"],
        env=env, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT,
    )
    base_url = f"http://127.0.0.1:{port}"
    try:
        deadline = time.monotonic() + 15
        while True:
            try:
                with urllib.request.urlopen(base_url + "/api/data", timeout=2) as r:
                    if json.loads(r.read()).get("provider") == "sim":
                        break
            except OSError:
                pass
            if time.monotonic() > deadline:
                proc.terminate()
                raise RuntimeError("dashboard did not come up on the sim provider")
            time.sleep(0.25)
        yield base_url
    finally:
        proc.terminate()
        proc.wait(timeout=10)
