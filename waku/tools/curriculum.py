"""Safe, curriculum-scoped repository checks for Waku's reviewer role."""

from __future__ import annotations

import os
from pathlib import Path
import re
import socket
import subprocess
import sys
import tempfile
import time
from typing import Callable
import urllib.request

from scripts.curriculum import artifact_errors, current_chapter
from scale.loadgen import run as run_load
from waku.ops.repository import repository_tags
from waku.tools.registry import Tool


ROOT = Path(__file__).resolve().parents[2]
MAX_OUTPUT_CHARS = 12_000
Runner = Callable[..., subprocess.CompletedProcess[str]]


def _free_port() -> int:
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


def _embedded_chapter_check(root: Path, chapter: str, mode: str, env: dict[str, str]):
    """Dependency-free equivalent of the current chapter's Make target."""
    if chapter != "01":
        return subprocess.CompletedProcess(
            ["embedded", chapter, mode], 2, "",
            f"No dependency-free instrument adapter exists for Chapter {chapter}. Rebuild the image.",
        )

    port = _free_port()
    temp_root = Path(env.get("WAKU_HOME", ".waku")).expanduser().resolve().parent
    temp_root.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="waku-scale-01-", dir=temp_root) as temp:
        child_env = dict(env)
        child_env.update({
            "WAKU_DASHBOARD_HOST": "127.0.0.1",
            "WAKU_DASHBOARD_PORT": str(port),
            "WAKU_HOME": str(Path(temp) / ".waku"),
            "WAKU_ENV_FILE": str(Path(temp) / ".env"),
            "WAKU_LLM_TIMEOUT": "30",
        })
        process = subprocess.Popen(
            [sys.executable, "-m", "waku.ops.dashboard"],
            cwd=root,
            env=child_env,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.STDOUT,
        )
        base_url = f"http://127.0.0.1:{port}"
        try:
            deadline = time.monotonic() + 15
            while True:
                try:
                    with urllib.request.urlopen(base_url + "/api/data", timeout=2):
                        break
                except OSError:
                    if time.monotonic() > deadline:
                        return subprocess.CompletedProcess(
                            ["embedded", chapter, mode], 1, "", "isolated sim dashboard did not start",
                        )
                    time.sleep(0.2)

            lines = ["tenants  p50s   p95s   throughput/min  errors"]
            rows = []
            for tenants in (1, 2, 5, 10):
                summary = run_load(base_url, tenants=tenants, think_ms=100, timeout=90).summary()
                rows.append(summary)
                lines.append(
                    f"{tenants:>7}  {summary['p50_s']:>5}  {summary['p95_s']:>5}  "
                    f"{summary['throughput_turns_min']:>14}  {summary['errors']:>6}"
                )
            failures = []
            if not all(row["ok"] > 0 for row in rows):
                failures.append("one or more ramp levels produced no successful turns")
            if rows[-1]["p95_s"] <= rows[0]["p95_s"] * 2:
                failures.append("10x tenants did not produce the expected serialized tail-latency growth")
            if mode == "grade":
                failures.extend(artifact_errors(chapter, root))
            return subprocess.CompletedProcess(
                ["embedded", chapter, mode],
                1 if failures else 0,
                "\n".join(lines),
                "\n".join(failures),
            )
        finally:
            process.terminate()
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait(timeout=5)


def _bounded_output(stdout: str, stderr: str) -> str:
    combined = "\n".join(part.strip() for part in (stdout, stderr) if part and part.strip())
    if len(combined) <= MAX_OUTPUT_CHARS:
        return combined or "(command produced no output)"
    return combined[:9_000] + "\n\n... output truncated by Waku ...\n\n" + combined[-3_000:]


def make_tool(repo_root: Path | None = None, runner: Runner = subprocess.run) -> Tool:
    root = (repo_root or ROOT).resolve()

    def run_curriculum_check(chapter: str, mode: str = "measure") -> str:
        chapter = str(chapter or "").strip()
        if mode not in {"measure", "grade"}:
            return "Refused: mode must be 'measure' or 'grade'. No command was run."
        if not re.fullmatch(r"\d{2}", chapter):
            return "Refused: chapter must be a two-digit curriculum number. No command was run."

        try:
            active = current_chapter(repository_tags(root))
        except (OSError, subprocess.SubprocessError) as exc:
            return f"Error: could not determine the current curriculum chapter: {exc}"
        if chapter != active:
            current = active or "none"
            return (
                f"Refused: the current curriculum chapter is {current}, not {chapter}. "
                "Waku will not run ahead or alter later-chapter failure conditions."
            )

        if mode == "measure":
            target = "scale-smoke" if chapter == "00" else f"scale-{chapter}"
        else:
            target = f"check-{chapter}"
        makefile = root / "Makefile"
        text = makefile.read_text() if makefile.is_file() else ""
        if not re.search(rf"(?m)^{re.escape(target)}\s*:", text):
            return (
                f"Chapter {chapter} is not instrumented for `{target}` in {makefile}. "
                "No command was run."
            )

        env = dict(os.environ)
        env.update({
            "WAKU_PROVIDER": "sim",
            "WAKU_MODEL": "sim-fast",
            "WAKU_SMALL_MODEL": "sim-fast",
        })
        command = ["make", target]
        try:
            result = runner(
                command,
                cwd=root,
                env=env,
                text=True,
                capture_output=True,
                timeout=240,
                check=False,
                shell=False,
            )
        except subprocess.TimeoutExpired as exc:
            observed = _bounded_output(exc.stdout or "", exc.stderr or "")
            return (
                f"TIMEOUT: `make {target}` exceeded 240 seconds and was stopped.\n"
                f"Repository: {root}\nOutput:\n{observed}"
            )
        except OSError as exc:
            result = _embedded_chapter_check(root, chapter, mode, env)
            execution_note = f"Make was unavailable ({exc}); ran the dependency-free instrument adapter."
        else:
            execution_note = "Ran the canonical Make target."

        state = "PASS" if result.returncode == 0 else "FAIL"
        purpose = "measurement" if mode == "measure" else "chapter grader"
        return (
            f"{state}: `make {target}` ({purpose}) exited {result.returncode}.\n"
            f"Repository: {root}\n"
            f"Execution: {execution_note}\n"
            "This output is evidence, not permission to mark the chapter complete.\n"
            f"Output:\n{_bounded_output(result.stdout, result.stderr)}"
        )

    return Tool(
        name="run_curriculum_check",
        description=(
            "Run the active Waku curriculum chapter's approved offline instrument inside the "
            "repository sandbox. Use mode='measure' to reproduce the failure with scale-NN, or "
            "mode='grade' to run check-NN after the learner has written their work. This is not "
            "arbitrary shell access and refuses later chapters."
        ),
        input_schema={
            "type": "object",
            "properties": {
                "chapter": {
                    "type": "string",
                    "pattern": "^[0-9]{2}$",
                    "description": "Two-digit active chapter number, for example 01.",
                },
                "mode": {
                    "type": "string",
                    "enum": ["measure", "grade"],
                    "description": "measure reproduces scale-NN; grade runs check-NN.",
                },
            },
            "required": ["chapter", "mode"],
            "additionalProperties": False,
        },
        fn=run_curriculum_check,
    )
