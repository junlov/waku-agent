"""Full shell access inside the disposable Waku training sandbox.

The security boundary is the container, not a command allowlist.  This tool is
therefore registered only when ``WAKU_SANDBOX=1`` and always runs from the
persistent sandbox workspace.  The Docker contract keeps the host checkout
read-only and does not expose the Docker socket.
"""

from __future__ import annotations

import os
import subprocess
from pathlib import Path

from waku.tools.registry import Tool

MAX_OUTPUT_CHARS = 16_000
MAX_TIMEOUT_SECONDS = 600


def _bounded_output(stdout: str, stderr: str) -> str:
    combined = stdout
    if stderr:
        combined += ("\n" if combined else "") + "[stderr]\n" + stderr
    if len(combined) <= MAX_OUTPUT_CHARS:
        return combined
    omitted = len(combined) - MAX_OUTPUT_CHARS
    return combined[:MAX_OUTPUT_CHARS] + f"\n... truncated {omitted} characters"


def make_tool(workspace: Path | None = None, runner=subprocess.run) -> Tool:
    root = (workspace or Path(os.getenv("WAKU_WORKSPACE", "/workspace"))).resolve()

    def run_command(command: str, timeout_seconds: int = 120) -> str:
        if not command.strip():
            return "Refused: command must not be empty."
        if not root.is_dir():
            return f"Refused: sandbox workspace does not exist at {root}."

        timeout = max(1, min(int(timeout_seconds), MAX_TIMEOUT_SECONDS))
        try:
            result = runner(
                ["/bin/sh", "-lc", command],
                cwd=root,
                env=os.environ.copy(),
                text=True,
                capture_output=True,
                timeout=timeout,
                shell=False,
            )
        except subprocess.TimeoutExpired as exc:
            partial = _bounded_output(exc.stdout or "", exc.stderr or "")
            return (
                f"TIMEOUT after {timeout}s in sandbox workspace {root}."
                + (f"\n{partial}" if partial else "")
            )

        output = _bounded_output(result.stdout, result.stderr)
        header = f"exit={result.returncode} cwd={root}"
        return header + (f"\n{output}" if output else "")

    return Tool(
        name="run_command",
        description=(
            "Run any shell command with full authority inside the persistent Waku sandbox "
            "workspace. Use it to inspect, edit, test, and repair the harness. The host checkout "
            "is an immutable seed, not this workspace. Before risky edits inspect git diff; after "
            "tests pass, request a supervised restart with `python "
            "/seed/scripts/sandbox_control.py restart --delay 15`. Never use this capability to "
            "write an unpassed curriculum chapter solution for the learner."
        ),
        input_schema={
            "type": "object",
            "properties": {
                "command": {"type": "string", "description": "Shell command to execute."},
                "timeout_seconds": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": MAX_TIMEOUT_SECONDS,
                    "default": 120,
                },
            },
            "required": ["command"],
            "additionalProperties": False,
        },
        fn=run_command,
    )
