from __future__ import annotations

import shlex
import sys

from waku.config import Settings
from waku.db import connect
from waku.tools import build_registry, terminal


def test_terminal_runs_with_full_workspace_authority(tmp_path):
    tool = terminal.make_tool(workspace=tmp_path)

    output = tool.fn(command="printf healed > proof.txt && cat proof.txt")

    assert "exit=0" in output
    assert output.endswith("healed")
    assert (tmp_path / "proof.txt").read_text() == "healed"


def test_terminal_is_registered_only_inside_sandbox(monkeypatch, tmp_path):
    monkeypatch.delenv("WAKU_SANDBOX", raising=False)
    host_home = tmp_path / "host"
    host_home.mkdir()
    host = build_registry(connect(host_home), Settings(home=host_home))
    assert "run_command" not in {tool["name"] for tool in host.schemas()}

    workspace = tmp_path / "workspace"
    workspace.mkdir()
    monkeypatch.setenv("WAKU_SANDBOX", "1")
    monkeypatch.setenv("WAKU_WORKSPACE", str(workspace))
    sandbox_home = tmp_path / "sandbox"
    sandbox_home.mkdir()
    sandbox = build_registry(connect(sandbox_home), Settings(home=sandbox_home))
    assert "run_command" in {tool["name"] for tool in sandbox.schemas()}


def test_terminal_output_is_bounded(tmp_path):
    tool = terminal.make_tool(workspace=tmp_path)

    python = shlex.quote(sys.executable)
    output = tool.fn(command=f"{python} -c 'print(\"x\" * 20000)'")

    assert "truncated" in output
    assert len(output) < 17_000
