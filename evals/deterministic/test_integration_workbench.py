from __future__ import annotations

import json

from waku.config import Settings
from waku.db import connect
from waku.ops.integrations import IntegrationRecorder, redact
from waku.tools.registry import Tool, ToolRegistry
from waku.tools import build_registry
from waku.tools.integration_builder import make_configure_tool, make_tool
from waku.tools.mcp_client import resolve_secret_refs


def test_scaffold_local_tool_is_idempotent_and_loads_in_sandbox(monkeypatch, tmp_path):
    workspace = tmp_path / "workspace"
    home = tmp_path / "home"
    workspace.mkdir()
    home.mkdir()
    builder = make_tool(workspace=workspace, home=home)

    first = builder.fn(kind="local_tool", name="weather coach", description="Explain weather")
    second = builder.fn(kind="local_tool", name="weather coach", description="Explain weather")

    assert "Created local tool scaffold" in first
    assert "Refused" in second
    monkeypatch.setenv("WAKU_SANDBOX", "1")
    monkeypatch.setenv("WAKU_WORKSPACE", str(workspace))
    registry = build_registry(connect(home), Settings(home=home, provider="sim"))
    assert "weather_coach" in {schema["name"] for schema in registry.schemas()}


def test_scaffold_mcp_can_enable_durable_config(tmp_path):
    workspace = tmp_path / "workspace"
    home = tmp_path / "home"
    workspace.mkdir()
    home.mkdir()
    builder = make_tool(workspace=workspace, home=home)

    output = builder.fn(kind="mcp_server", name="Issue Desk", description="Manage issues", enable=True)

    config = json.loads((home / "mcp.json").read_text())
    assert "Created MCP server scaffold" in output
    assert config["servers"][0]["name"] == "issue_desk"
    assert config["servers"][0]["args"][-1].endswith("integrations/mcp/issue_desk/server.py")


def test_configure_remote_mcp_uses_secret_reference_not_value(tmp_path):
    home = tmp_path / "home"
    home.mkdir()
    tool = make_configure_tool(home=home)

    output = tool.fn(
        name="vendor memory",
        transport="streamable_http",
        url="http://memory:8000/mcp",
        credential_env="MEMORY_MCP_TOKEN",
        credential_header="Authorization",
        credential_prefix="Bearer ",
    )

    server = json.loads((home / "mcp.json").read_text())["servers"][0]
    assert "Configured" in output
    assert server["transport"] == "streamable_http"
    assert server["url"] == "http://memory:8000/mcp"
    assert server["headers"]["Authorization"] == {
        "from_env": "MEMORY_MCP_TOKEN", "prefix": "Bearer "
    }
    assert "secret" not in json.dumps(server).lower()


def test_secret_refs_resolve_at_connection_time(monkeypatch):
    monkeypatch.setenv("GITHUB_MCP_TOKEN", "live-token")
    resolved = resolve_secret_refs({
        "Authorization": {"from_env": "GITHUB_MCP_TOKEN", "prefix": "Bearer "},
        "X-Mode": "learning",
    })
    assert resolved == {"Authorization": "Bearer live-token", "X-Mode": "learning"}


def test_secret_refs_fail_honestly_when_env_is_missing(monkeypatch):
    monkeypatch.delenv("MISSING_MCP_TOKEN", raising=False)
    try:
        resolve_secret_refs({"Authorization": {"from_env": "MISSING_MCP_TOKEN"}})
    except ValueError as exc:
        assert "MISSING_MCP_TOKEN" in str(exc)
    else:
        raise AssertionError("missing secret reference should fail")


def test_integration_events_redact_secrets(tmp_path):
    conn = connect(tmp_path)
    recorder = IntegrationRecorder(tmp_path)

    recorder.record(
        source="mcp",
        integration="github",
        operation="create_issue",
        status="error",
        message="Authorization: Bearer super-secret-token",
        details={"api_key": "sk-live-secret", "safe": "visible"},
    )

    row = dict(conn.execute("SELECT * FROM integration_events").fetchone())
    assert "super-secret-token" not in row["message"]
    assert "sk-live-secret" not in row["details_json"]
    assert "visible" in row["details_json"]
    assert row["status"] == "error"


def test_registry_records_failed_custom_tool_with_redacted_arguments(tmp_path):
    conn = connect(tmp_path)
    recorder = IntegrationRecorder(tmp_path)
    registry = ToolRegistry(recorder=recorder)
    registry.register(Tool(
        name="vendor_lookup",
        description="test",
        input_schema={},
        fn=lambda **_kwargs: "MCP call failed: upstream timed out",
        source="mcp:vendor",
    ))

    output = registry.execute("vendor_lookup", {"api_key": "sk-proj-abcdefghijklmnop"})

    row = dict(conn.execute("SELECT * FROM integration_events").fetchone())
    assert "failed" in output
    assert row["source"] == "mcp"
    assert row["integration"] == "vendor"
    assert row["category"] == "timeout"
    assert "sk-proj-abcdefghijklmnop" not in row["details_json"]
    assert redact("token ghp_abcdefghijklmnopqrst") == "token [REDACTED]"


def test_tools_catalog_shows_workbench_before_first_chat(monkeypatch, tmp_path):
    from waku.ops import dashboard

    home = tmp_path / "home"
    workspace = tmp_path / "workspace"
    workspace.mkdir()
    monkeypatch.setenv("WAKU_HOME", str(home))
    monkeypatch.setenv("WAKU_WORKSPACE", str(workspace))
    monkeypatch.setenv("WAKU_SANDBOX", "1")
    monkeypatch.setattr(dashboard, "_agent", None)

    names = {tool["name"] for tool in dashboard.tools_info()["catalog"]}

    assert {"run_command", "scaffold_integration"} <= names
