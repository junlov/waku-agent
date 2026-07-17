"""Idempotent starter scaffolds for agent-authored tools and MCP servers."""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

from waku.tools.registry import Tool


def _slug(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_")
    if not slug or not re.fullmatch(r"[a-z][a-z0-9_]{0,63}", slug):
        raise ValueError("name must produce a 1-64 character Python-safe identifier")
    return slug


def _local_template(name: str, description: str) -> str:
    return f'''"""Agent-authored tool: {description}"""

from waku.tools.registry import Tool


def make_tool() -> Tool:
    def run(message: str) -> str:
        return f"{name} received: {{message}}"

    return Tool(
        name="{name}",
        description={description!r},
        input_schema={{
            "type": "object",
            "properties": {{"message": {{"type": "string"}}}},
            "required": ["message"],
            "additionalProperties": False,
        }},
        fn=run,
        source="custom",
    )
'''


def _mcp_template(name: str, description: str) -> str:
    return f'''"""Agent-authored MCP server: {description}"""

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("{name}")


@mcp.tool()
def echo(message: str) -> str:
    """Starter tool. Replace it with the integration's real behavior."""
    return f"{name} received: {{message}}"


if __name__ == "__main__":
    mcp.run(transport="stdio")
'''


def make_tool(workspace: Path | None = None, home: Path | None = None) -> Tool:
    root = (workspace or Path(os.getenv("WAKU_WORKSPACE", "/workspace"))).resolve()
    state = (home or Path(os.getenv("WAKU_HOME", ".waku"))).resolve()

    def scaffold(kind: str, name: str, description: str, enable: bool = False) -> str:
        slug = _slug(name)
        if kind == "local_tool":
            path = root / "integrations" / "tools" / f"{slug}.py"
            if path.exists():
                return f"Refused: integration already exists at {path}. Inspect or edit it instead."
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(_local_template(slug, description))
            return (
                f"Created local tool scaffold at {path}. Edit and test it, then request a "
                "supervised restart; it loads only inside the Waku sandbox."
            )

        if kind != "mcp_server":
            return "Error: kind must be 'local_tool' or 'mcp_server'."
        directory = root / "integrations" / "mcp" / slug
        path = directory / "server.py"
        if directory.exists():
            return f"Refused: integration already exists at {directory}. Inspect or edit it instead."
        directory.mkdir(parents=True)
        path.write_text(_mcp_template(slug, description))
        (directory / "README.md").write_text(
            f"# {slug}\n\n{description}\n\nRun: `{sys.executable} {path}`\n"
        )
        suffix = " It is scaffolded but disabled."
        if enable:
            state.mkdir(parents=True, exist_ok=True)
            config_path = state / "mcp.json"
            config = json.loads(config_path.read_text()) if config_path.exists() else {"servers": []}
            if not any(server.get("name") == slug for server in config.get("servers", [])):
                config.setdefault("servers", []).append(
                    {"name": slug, "transport": "stdio", "command": sys.executable,
                     "args": [str(path)],
                     "env": {"PYTHONPATH": f"{root / '.vendor'}:{root}"}}
                )
                config_path.write_text(json.dumps(config, indent=2) + "\n")
            suffix = f" Enabled in {config_path}; request a supervised restart to connect it."
        return f"Created MCP server scaffold at {path}.{suffix}"

    return Tool(
        name="scaffold_integration",
        description=(
            "Create an idempotent starter for a custom local tool or stdio MCP server inside "
            "the persistent sandbox workspace. Use run_command to implement and test it. Enabling "
            "an MCP server is explicit; both kinds require a supervised restart before use."
        ),
        input_schema={
            "type": "object",
            "properties": {
                "kind": {"type": "string", "enum": ["local_tool", "mcp_server"]},
                "name": {"type": "string"},
                "description": {"type": "string"},
                "enable": {"type": "boolean", "default": False},
            },
            "required": ["kind", "name", "description"],
            "additionalProperties": False,
        },
        fn=scaffold,
        source="workbench",
    )


def make_configure_tool(home: Path | None = None) -> Tool:
    state = (home or Path(os.getenv("WAKU_HOME", ".waku"))).resolve()

    def configure(
        name: str,
        transport: str,
        url: str = "",
        command: str = "",
        args: list[str] | None = None,
        credential_env: str = "",
        credential_header: str = "Authorization",
        credential_prefix: str = "Bearer ",
    ) -> str:
        slug = _slug(name)
        if transport not in {"stdio", "streamable_http"}:
            return "Error: transport must be 'stdio' or 'streamable_http'."
        if transport == "streamable_http" and not url.startswith(("http://", "https://")):
            return "Error: streamable_http requires an http(s) URL."
        if transport == "stdio" and not command:
            return "Error: stdio requires a command."
        state.mkdir(parents=True, exist_ok=True)
        path = state / "mcp.json"
        config = json.loads(path.read_text()) if path.exists() else {"servers": []}
        if any(server.get("name") == slug for server in config.get("servers", [])):
            return f"Refused: MCP server '{slug}' already exists in {path}."

        server: dict = {"name": slug, "transport": transport}
        if transport == "streamable_http":
            server["url"] = url
            if credential_env:
                server["headers"] = {
                    credential_header: {"from_env": credential_env, "prefix": credential_prefix}
                }
        else:
            server.update(command=command, args=args or [])
            if credential_env:
                server["env"] = {credential_env: {"from_env": credential_env}}
        config.setdefault("servers", []).append(server)
        path.write_text(json.dumps(config, indent=2) + "\n")
        return (
            f"Configured {transport} MCP server '{slug}' in {path} using credential references "
            "only. Request a supervised restart, then use Tools > MCP to test the handshake."
        )

    return Tool(
        name="configure_mcp",
        description=(
            "Configure a stdio or Streamable HTTP MCP connection without storing credential "
            "values. Pass only the environment variable name in credential_env. Use HTTP URLs "
            "for hosted services or containers reachable on the waku-integrations network."
        ),
        input_schema={
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "transport": {"type": "string", "enum": ["stdio", "streamable_http"]},
                "url": {"type": "string"},
                "command": {"type": "string"},
                "args": {"type": "array", "items": {"type": "string"}},
                "credential_env": {"type": "string"},
                "credential_header": {"type": "string", "default": "Authorization"},
                "credential_prefix": {"type": "string", "default": "Bearer "},
            },
            "required": ["name", "transport"],
            "additionalProperties": False,
        },
        fn=configure,
        source="workbench",
    )
