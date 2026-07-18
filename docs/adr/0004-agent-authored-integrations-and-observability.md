# ADR-0004: Make agent-authored integrations loadable and observable

- Status: accepted
- Date: 2026-07-16

## Context

The sandbox already gives Waku full authority inside its persistent workspace,
but authored Python files do not become tools automatically and MCP failures are
only partially visible. The curriculum needs the complete learning loop:
author, validate, enable, exercise, inspect, and repair.

## Decision

Use two deliberately small extension seams inside the existing sandbox:

- `/workspace/integrations/tools/*.py` contains local tools. Each module exports
  `make_tool() -> Tool` and is loaded only when `WAKU_SANDBOX=1`.
- `/workspace/integrations/mcp/<name>/server.py` contains custom stdio MCP
  servers. Enabled servers use the existing durable `WAKU_HOME/mcp.json`.

MCP connections support both local `stdio` processes and production-oriented
`streamable_http` endpoints. HTTP endpoints can be hosted services, host
processes, or sidecar containers on the shared `waku-integrations` network.
Credentials are stored only as `from_env` references and resolved when a
connection is opened. Waku never receives the Docker socket; starting a new
container remains an explicit host/orchestrator action.

An idempotent `scaffold_integration` tool creates either starter shape. Waku
uses its existing `run_command` tool to replace the starter behavior, run tests,
and request a supervised restart. The supervisor and last-known-good checkpoint
remain the recovery boundary.

Provider, native-tool, custom-tool, and MCP lifecycle/run telemetry is redacted
before a best-effort write to SQLite. Telemetry failure never changes the tool
result or blocks the agent loop. A malformed or unreachable MCP server records
its own error when possible and does not prevent other configured servers from
connecting. Chat shows the immediate result, Tools shows current MCP health plus
an explicit handshake test, and Ops shows the chronological event history.
JSONL traces remain the raw per-turn evidence.

## Constraints

- Custom code loads only inside the container sandbox.
- Secrets are redacted before persistence or frontend delivery.
- Scaffolding never overwrites an existing integration.
- Enabling an MCP server is explicit.
- This slice does not add automatic retries, remote installation, a marketplace,
  or production deployment orchestration.

## Recovery

Disable or remove the entry from `WAKU_HOME/mcp.json`, or remove the custom tool
module, then request a supervised restart. If authored code breaks the harness,
the immutable supervisor restores the last-known-good workspace as defined by
ADR-0003.
