"""MCP connector — plug any Model Context Protocol server into Waku's tools.

Waku's loop is synchronous; the MCP SDK is async. The bridge below runs one
asyncio event loop on a daemon thread, holds every server's session on that loop
via a single AsyncExitStack (anyio requires the stack be entered/exited on the
same task), and lets the sync loop call tools via run_coroutine_threadsafe.

Config: WAKU_HOME/mcp.json
  {"servers": [{"name": "fs", "command": "npx",
                "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
                "env": {}}]}

Each server's tools register as `<server>_<tool>` on the ToolRegistry. A server
that fails to connect is skipped with a warning — Waku still starts.
"""

from __future__ import annotations

import asyncio
import json
import os
import site
import threading
from contextlib import AsyncExitStack
from datetime import datetime, timezone
from pathlib import Path
from time import monotonic
from urllib.parse import urlparse

from waku.ops.integrations import redact
from waku.tools.registry import Tool

_vendor = Path(os.getenv("WAKU_VENDOR", "/workspace/.vendor"))
if _vendor.is_dir():
    site.addsitedir(str(_vendor))


def resolve_secret_refs(values: dict | None) -> dict[str, str]:
    """Resolve config references without ever writing secret values to mcp.json."""
    resolved: dict[str, str] = {}
    for key, value in (values or {}).items():
        if isinstance(value, dict) and value.get("from_env"):
            env_name = str(value["from_env"])
            secret = os.getenv(env_name)
            if not secret:
                raise ValueError(f"missing required environment variable {env_name}")
            resolved[str(key)] = f"{value.get('prefix', '')}{secret}"
        elif isinstance(value, str) and value.startswith("${") and value.endswith("}"):
            env_name = value[2:-1]
            secret = os.getenv(env_name)
            if not secret:
                raise ValueError(f"missing required environment variable {env_name}")
            resolved[str(key)] = secret
        elif isinstance(value, str):
            resolved[str(key)] = value
        else:
            raise ValueError(f"invalid value for {key}: use a string or from_env reference")
    return resolved


def _configured_transport(spec: dict) -> str:
    return str(spec.get("transport") or ("streamable_http" if spec.get("url") else "stdio"))


def _transport(spec: dict) -> str:
    transport = _configured_transport(spec)
    if transport not in {"stdio", "streamable_http"}:
        raise ValueError(f"unsupported MCP transport '{transport}'")
    return transport


class MCPBridge:
    def __init__(self, config_path: Path, timeout: float = 30.0, recorder=None):
        self.config_path = config_path
        self.timeout = timeout
        self.recorder = recorder
        self._loop = asyncio.new_event_loop()
        self._thread = threading.Thread(target=self._loop.run_forever, daemon=True)
        self._stack: AsyncExitStack | None = None
        self._sessions: dict = {}
        self._health: dict[str, dict] = {}
        self._specs: dict[str, dict] = {}

    def start(self) -> list[Tool]:
        """Connect every configured server and return their tools (as Tools)."""
        self._thread.start()
        servers = json.loads(self.config_path.read_text()).get("servers", [])
        self._specs = {spec.get("name", "?"): spec for spec in servers}
        self._health = {
            spec.get("name", "?"): {"name": spec.get("name", "?"), "status": "connecting",
                                     "transport": _configured_transport(spec), "tools": 0,
                                     "last_error": "", "connected_at": None}
            for spec in servers
        }
        fut = asyncio.run_coroutine_threadsafe(self._connect_all(servers), self._loop)
        listed = fut.result(self.timeout * 2)  # {server: [tool metas]}
        tools: list[Tool] = []
        for srv, metas in listed.items():
            for meta in metas:
                tools.append(Tool(
                    name=f"{srv}_{meta['name']}",
                    description=f"[MCP:{srv}] {meta.get('description','') or ''}",
                    input_schema=meta.get("inputSchema") or {"type": "object", "properties": {}},
                    fn=(lambda srv=srv, tname=meta["name"], **kw: self.call(srv, tname, kw)),
                    source=f"mcp:{srv}",
                ))
        return tools

    def health(self) -> list[dict]:
        return list(self._health.values())

    async def _open_transport(self, stack: AsyncExitStack, spec: dict):
        transport = _transport(spec)
        if transport == "stdio":
            from mcp import StdioServerParameters
            from mcp.client.stdio import stdio_client

            if not spec.get("command"):
                raise ValueError("stdio MCP server requires command")
            params = StdioServerParameters(
                command=spec["command"],
                args=spec.get("args", []),
                env=resolve_secret_refs(spec.get("env")) or None,
            )
            return await stack.enter_async_context(stdio_client(params))

        import httpx
        from mcp.client.streamable_http import streamable_http_client

        url = str(spec.get("url") or "")
        parsed = urlparse(url)
        if parsed.scheme not in {"http", "https"} or not parsed.netloc:
            raise ValueError("streamable_http MCP server requires an http(s) URL")
        client = await stack.enter_async_context(httpx.AsyncClient(
            headers=resolve_secret_refs(spec.get("headers")),
            follow_redirects=True,
            timeout=self.timeout,
        ))
        read, write, _session_id = await stack.enter_async_context(
            streamable_http_client(url, http_client=client)
        )
        return read, write

    async def _connect_all(self, servers) -> dict:
        from mcp import ClientSession

        self._stack = AsyncExitStack()
        listed: dict = {}
        for spec in servers:
            name = spec["name"]
            transport = _configured_transport(spec)
            try:
                transport = _transport(spec)
                read, write = await self._open_transport(self._stack, spec)
                session = await self._stack.enter_async_context(ClientSession(read, write))
                await session.initialize()
                self._sessions[name] = session
                tools = (await session.list_tools()).tools
                listed[name] = [{"name": t.name, "description": t.description, "inputSchema": t.inputSchema} for t in tools]
                self._health[name] = {
                    "name": name,
                    "status": "connected",
                    "transport": transport,
                    "tools": len(tools),
                    "last_error": "",
                    "connected_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
                }
                if self.recorder:
                    self.recorder.record(source="mcp", integration=name, operation="connect",
                                         status="ok", message=f"Discovered {len(tools)} tool(s)")
            except Exception as exc:  # one bad server shouldn't stop the rest
                self._health[name] = {"name": name, "status": "error",
                                      "transport": transport, "tools": 0,
                                      "last_error": str(redact(str(exc))), "connected_at": None}
                if self.recorder:
                    self.recorder.record(source="mcp", integration=name, operation="connect",
                                         status="error", category="transport", message=str(exc))
                print(f"MCP server '{name}' failed to connect: {exc}")
        return listed

    def test_connection(self, name: str) -> dict:
        spec = self._specs.get(name)
        if spec is None:
            return {"ok": False, "error": f"unknown MCP server '{name}'"}
        started = monotonic()
        try:
            fut = asyncio.run_coroutine_threadsafe(self._test_connection(name, spec), self._loop)
            count = fut.result(self.timeout * 2)
            latency = int((monotonic() - started) * 1000)
            self._health[name].update(status="connected", tools=count, last_error="",
                                      connected_at=datetime.now(timezone.utc).isoformat(timespec="seconds"))
            if self.recorder:
                self.recorder.record(source="mcp", integration=name, operation="test_connection",
                                     status="ok", latency_ms=latency,
                                     message=f"Handshake passed; discovered {count} tool(s)")
            return {"ok": True, "name": name, "tools": count, "latency_ms": latency}
        except Exception as exc:
            latency = int((monotonic() - started) * 1000)
            safe = str(redact(str(exc)))
            self._health[name].update(status="error", last_error=safe)
            if self.recorder:
                self.recorder.record(source="mcp", integration=name, operation="test_connection",
                                     status="error", category="transport", latency_ms=latency,
                                     message=safe)
            return {"ok": False, "name": name, "latency_ms": latency, "error": safe}

    async def _test_connection(self, name: str, spec: dict) -> int:
        session = self._sessions.get(name)
        if session is not None:
            return len((await session.list_tools()).tools)
        from mcp import ClientSession

        async with AsyncExitStack() as stack:
            read, write = await self._open_transport(stack, spec)
            probe = await stack.enter_async_context(ClientSession(read, write))
            await probe.initialize()
            return len((await probe.list_tools()).tools)

    def call(self, server: str, tool: str, args: dict) -> str:
        try:
            fut = asyncio.run_coroutine_threadsafe(self._acall(server, tool, args), self._loop)
            return fut.result(self.timeout)
        except Exception as exc:
            return f"MCP call {server}_{tool} failed: {exc}"

    async def _acall(self, server: str, tool: str, args: dict) -> str:
        session = self._sessions.get(server)
        if session is None:
            return f"MCP server '{server}' is not connected."
        result = await session.call_tool(tool, args)
        parts = []
        for block in result.content:
            parts.append(getattr(block, "text", None) or "[non-text content]")
        return "\n".join(parts) or "(no output)"

    def close(self) -> None:
        if self._stack is not None:
            try:
                asyncio.run_coroutine_threadsafe(self._stack.aclose(), self._loop).result(10)
            except Exception:
                pass
        self._loop.call_soon_threadsafe(self._loop.stop)
        self._thread.join(timeout=5)
