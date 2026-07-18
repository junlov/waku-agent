from __future__ import annotations

import base64
import os
import pty
import re
import subprocess
import sys
import threading
import time
from pathlib import Path

import pytest

from waku.db import connect
from waku.ops.lab_terminal import (
    LabTerminalBusy,
    LabTerminalError,
    LabTerminalManager,
    TerminalCapacity,
)
from waku.ops.workspace_files import WorkspaceFileConflict, WorkspaceFileService


def git(repository: Path, *args: str) -> str:
    return subprocess.run(
        ["git", *args],
        cwd=repository,
        text=True,
        capture_output=True,
        check=True,
    ).stdout.strip()


def repository(tmp_path: Path) -> Path:
    root = tmp_path / "repository"
    (root / "docs").mkdir(parents=True)
    git(root, "init", "-b", "scale")
    (root / "docs/note.md").write_text("baseline\n")
    git(root, "add", "docs/note.md")
    git(
        root,
        "-c",
        "user.name=Learner",
        "-c",
        "user.email=learner@example.test",
        "commit",
        "-m",
        "baseline",
    )
    return root


def manager(tmp_path: Path, **limits) -> tuple[LabTerminalManager, object]:
    home = tmp_path / ".waku"
    home.mkdir(parents=True)
    connection = connect(home, check_same_thread=False)
    return LabTerminalManager(repository(tmp_path), connection, **limits), connection


def send(terminal: LabTerminalManager, terminal_id: str, value: bytes) -> None:
    terminal.input(terminal_id, base64.b64encode(value).decode("ascii"))


def raw_frames(terminal: LabTerminalManager, terminal_id: str) -> bytes:
    return b"".join(
        base64.b64decode(frame["data"])
        for frame in terminal.iter_frames(terminal_id, heartbeat_seconds=0.05)
        if frame["kind"] == "output"
    )


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_terminal_streams_raw_frames_and_persists_only_redacted_attempt(tmp_path: Path) -> None:
    terminal, connection = manager(tmp_path)
    opened = terminal.open(chapter="01", session_id="session-1", step_id="01-observe")
    terminal_id = opened["terminal_id"]
    token = "sk-proj-abcdefghijklmnop"
    command = (
        f"printf 'hello\\n'; printf 'workspace=%s\\n' \"$WAKU_WORKSPACE\"; "
        f"printf '\\001\\377'; echo {token}; exit\n"
    ).encode()

    send(terminal, terminal_id, command)
    assert terminal.wait(terminal_id, timeout=4) == 0
    output = raw_frames(terminal, terminal_id)
    result = terminal.close(terminal_id)

    assert b"hello" in output
    assert f"workspace={terminal.workspace}".encode() in output
    assert b"\x01\xff" in output
    row = connection.execute(
        "SELECT * FROM lab_attempts WHERE id = ?", (result["attempt_id"],)
    ).fetchone()
    assert row["session_id"] == "session-1"
    assert row["step_id"] == "01-observe"
    assert row["action_id"] == "terminal"
    assert token not in row["output"]
    assert "[REDACTED]" in row["output"]
    assert connection.execute("SELECT count(*) FROM chat_log").fetchone()[0] == 0
    assert connection.execute("SELECT count(*) FROM learning_journal").fetchone()[0] == 0


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_terminal_excludes_and_dynamically_redacts_configured_secrets(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    secrets = {
        "SLACK_BOT_TOKEN": "opaque-slack-value-78431",
        "GOOGLE_APPLICATION_CREDENTIALS": "opaque-google-value-65029",
        "CUSTOM_RUNTIME_VALUE": "opaque-custom-value-91357",
    }
    for key, value in secrets.items():
        monkeypatch.setenv(key, value)
    terminal, connection = manager(tmp_path)
    opened = terminal.open(chapter="01", session_id="session-secrets", step_id="01-observe")
    terminal_id = opened["terminal_id"]
    command = (
        "printf 'env=%s|%s|%s\\n' "
        '"${SLACK_BOT_TOKEN-missing}" "${GOOGLE_APPLICATION_CREDENTIALS-missing}" '
        '"${CUSTOM_RUNTIME_VALUE-missing}"; '
        f"printf 'literal={secrets['SLACK_BOT_TOKEN']}|"
        f"{secrets['GOOGLE_APPLICATION_CREDENTIALS']}|"
        f"{secrets['CUSTOM_RUNTIME_VALUE']}\\n'; exit\n"
    ).encode()
    send(terminal, terminal_id, command)

    assert terminal.wait(terminal_id, timeout=4) == 0
    output = raw_frames(terminal, terminal_id)
    result = terminal.close(terminal_id)
    stored = connection.execute(
        "SELECT output FROM lab_attempts WHERE id = ?", (result["attempt_id"],)
    ).fetchone()["output"]

    assert b"env=missing|missing|missing" in output
    assert all(secret not in stored for secret in secrets.values())
    assert "[REDACTED]" in stored


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_terminal_allows_only_declared_simulator_knobs_and_redacts_lookalikes(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    secret = "opaque-simulator-lookalike-78431"
    monkeypatch.setenv("WAKU_SIM_LATENCY_MS", "17")
    monkeypatch.setenv("WAKU_SIM_API_KEY", secret)
    terminal, connection = manager(tmp_path)
    opened = terminal.open(chapter="01", session_id="session-sim-env", step_id="01-observe")
    terminal_id = opened["terminal_id"]
    command = (
        "printf 'latency=%s key=%s\\n' \"$WAKU_SIM_LATENCY_MS\" "
        "\"${WAKU_SIM_API_KEY-missing}\"; "
        f"printf 'literal={secret}\\n'; exit\n"
    ).encode()
    send(terminal, terminal_id, command)

    assert terminal.wait(terminal_id, timeout=4) == 0
    output = raw_frames(terminal, terminal_id)
    result = terminal.close(terminal_id)
    stored = connection.execute(
        "SELECT output FROM lab_attempts WHERE id = ?", (result["attempt_id"],)
    ).fetchone()["output"]

    assert b"latency=17 key=missing" in output
    assert secret not in stored
    assert "[REDACTED]" in stored


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_terminal_redacts_configured_secret_before_evidence_truncation(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    secret = "opaque-truncated-secret-" + "abcdefghijklmnopqrstuvwxyz" * 4
    monkeypatch.setenv("CUSTOM_TRUNCATED_VALUE", secret)
    terminal, connection = manager(tmp_path, max_transcript_bytes=48)
    opened = terminal.open(chapter="01", session_id="session-truncated", step_id="01-observe")
    terminal_id = opened["terminal_id"]
    send(terminal, terminal_id, f"printf '%s\\n' '{secret}'; exit\n".encode())

    assert terminal.wait(terminal_id, timeout=4) == 0
    result = terminal.close(terminal_id)
    stored = connection.execute(
        "SELECT output FROM lab_attempts WHERE id = ?", (result["attempt_id"],)
    ).fetchone()["output"]

    assert secret[-32:] not in stored
    assert "[REDACTED]" in stored
    assert len(stored) <= 48


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_resize_ctrl_c_and_capacity_are_bounded(tmp_path: Path) -> None:
    terminal, _connection = manager(tmp_path, max_sessions=1)
    opened = terminal.open(chapter="01", session_id="session-1", step_id="01-repair")
    terminal_id = opened["terminal_id"]

    with pytest.raises(LabTerminalBusy, match="capacity"):
        terminal.open(chapter="01", session_id="session-2", step_id="01-repair")
    with pytest.raises(LabTerminalError, match="rows"):
        terminal.resize(terminal_id, rows=1, columns=80)
    terminal.resize(terminal_id, rows=33, columns=101)
    send(terminal, terminal_id, b"stty size; sleep 10\n")
    time.sleep(0.2)
    terminal.interrupt(terminal_id)
    send(terminal, terminal_id, b"echo survived; exit\n")

    assert terminal.wait(terminal_id, timeout=4) == 0
    output = raw_frames(terminal, terminal_id)
    terminal.close(terminal_id)

    assert re.search(rb"33\s+101", output)
    assert b"survived" in output


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_terminal_capacity_is_shared_across_session_managers(tmp_path: Path) -> None:
    shared_capacity = TerminalCapacity(1)
    first, _connection = manager(tmp_path / "first", capacity=shared_capacity)
    second, _connection = manager(tmp_path / "second", capacity=shared_capacity)
    opened = first.open(chapter="01", session_id="session-1", step_id="01-repair")

    with pytest.raises(LabTerminalBusy, match="global terminal capacity"):
        second.open(chapter="01", session_id="session-2", step_id="01-repair")

    first.close(opened["terminal_id"])
    next_opened = second.open(chapter="01", session_id="session-2", step_id="01-repair")
    second.close(next_opened["terminal_id"])


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_owner_thread_start_failure_releases_session_and_shared_capacity_once(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    class RecordingCapacity(TerminalCapacity):
        def __init__(self) -> None:
            super().__init__(1)
            self.release_calls = 0

        def release(self, terminal_id: str) -> None:
            self.release_calls += 1
            super().release(terminal_id)

    capacity = RecordingCapacity()
    terminal, _connection = manager(tmp_path, max_sessions=1, capacity=capacity)
    original_start = threading.Thread.start
    fail_owner = True

    def start_with_one_owner_failure(thread: threading.Thread) -> None:
        nonlocal fail_owner
        if fail_owner and thread.name.startswith("waku-terminal-"):
            fail_owner = False
            raise RuntimeError("synthetic owner thread start failure")
        original_start(thread)

    monkeypatch.setattr(threading.Thread, "start", start_with_one_owner_failure)

    with pytest.raises(RuntimeError, match="synthetic owner thread start failure"):
        terminal.open(chapter="01", session_id="failed", step_id="01-observe")

    assert capacity.release_calls == 1
    started = time.monotonic()
    terminal.close_all()
    assert time.monotonic() - started < 0.2
    assert capacity.release_calls == 1

    opened = terminal.open(chapter="01", session_id="recovered", step_id="01-observe")
    terminal.close(opened["terminal_id"])
    assert capacity.release_calls == 2


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_natural_exit_persists_once_and_releases_shared_capacity(tmp_path: Path) -> None:
    shared_capacity = TerminalCapacity(1)
    terminal, connection = manager(tmp_path, capacity=shared_capacity)
    sibling = LabTerminalManager(
        terminal.workspace,
        connection,
        capacity=shared_capacity,
    )
    opened = terminal.open(chapter="01", session_id="session-1", step_id="01-prove")
    send(terminal, opened["terminal_id"], b"echo natural-exit; exit\n")

    assert terminal.wait(opened["terminal_id"], timeout=4) == 0
    rows = connection.execute(
        "SELECT id FROM lab_attempts WHERE session_id = 'session-1'"
    ).fetchall()
    assert len(rows) == 1
    next_opened = sibling.open(chapter="01", session_id="session-2", step_id="01-prove")

    frames = list(terminal.iter_frames(opened["terminal_id"], heartbeat_seconds=0.05))
    closed = terminal.close(opened["terminal_id"])
    assert frames[-1]["kind"] == "exit"
    assert closed["attempt_id"] == rows[0]["id"]
    assert (
        connection.execute(
            "SELECT count(*) FROM lab_attempts WHERE session_id = 'session-1'"
        ).fetchone()[0]
        == 1
    )
    sibling.close(next_opened["terminal_id"])


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_full_input_buffer_applies_backpressure_without_delaying_close(
    tmp_path: Path,
) -> None:
    terminal, _connection = manager(tmp_path, max_input_buffer_bytes=16 * 1024)
    opened = terminal.open(chapter="01", session_id="session-1", step_id="01-repair")
    terminal_id = opened["terminal_id"]
    send(terminal, terminal_id, b"sleep 30\n")
    time.sleep(0.1)
    result: dict[str, object] = {}

    def fill_input() -> None:
        try:
            for _ in range(100):
                send(terminal, terminal_id, b"x" * 8192)
        except LabTerminalBusy as error:
            result["busy"] = error
        finally:
            result["finished"] = True

    writer = threading.Thread(target=fill_input)
    writer.start()
    writer.join(timeout=0.75)
    started = time.monotonic()
    terminal.close(terminal_id)
    elapsed = time.monotonic() - started
    writer.join(timeout=1)

    assert result.get("finished") is True
    assert "capacity" in str(result.get("busy"))
    assert elapsed < 3


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_editor_save_coexists_with_idle_terminal_and_rejects_terminal_side_stale_write(
    tmp_path: Path,
) -> None:
    terminal, _connection = manager(tmp_path)
    workspace = terminal.workspace
    files = WorkspaceFileService(
        workspace,
        {
            "kind": "chapter",
            "chapter": "01",
            "environment": {"editable_files": ["docs/note.md"]},
        },
    )
    revision = files.read("docs/note.md")["revision"]
    opened = terminal.open(chapter="01", session_id="session-1", step_id="01-repair")
    terminal_id = opened["terminal_id"]

    saved = files.save("docs/note.md", "editor edit\n", revision)
    assert saved["content"] == "editor edit\n"
    send(terminal, terminal_id, b"printf 'terminal edit\\n' > docs/note.md\n")
    deadline = time.monotonic() + 3
    while files.read("docs/note.md")["content"] != "terminal edit\n":
        assert time.monotonic() < deadline
        time.sleep(0.02)

    with pytest.raises(WorkspaceFileConflict, match="stale revision"):
        files.save("docs/note.md", "overwrite terminal edit\n", saved["revision"])

    send(terminal, terminal_id, b"exit\n")
    assert terminal.wait(terminal_id, timeout=3) == 0
    terminal.close(terminal_id)


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_transcript_and_output_buffers_stay_bounded(
    tmp_path: Path,
) -> None:
    terminal, connection = manager(
        tmp_path,
        max_buffer_bytes=128,
        max_transcript_bytes=256,
    )
    opened = terminal.open(chapter="01", session_id="session-1", step_id="01-prove")
    terminal_id = opened["terminal_id"]
    command = f"{sys.executable} -c \"print('x' * 2000)\"; exit\n".encode()
    send(terminal, terminal_id, command)
    assert terminal.wait(terminal_id, timeout=4) == 0
    output = raw_frames(terminal, terminal_id)
    result = terminal.close(terminal_id)

    assert len(output) <= 128
    row = connection.execute(
        "SELECT output FROM lab_attempts WHERE id = ?", (result["attempt_id"],)
    ).fetchone()
    assert len(row["output"]) <= 256


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_disconnect_stops_active_process_group_and_removes_session(tmp_path: Path) -> None:
    terminal, _connection = manager(tmp_path)
    opened = terminal.open(chapter="01", session_id="session-1", step_id="01-prove")
    terminal_id = opened["terminal_id"]
    send(terminal, terminal_id, b"sleep 30 & wait\n")
    time.sleep(0.2)

    started = time.monotonic()
    result = terminal.disconnect(terminal_id)

    assert time.monotonic() - started < 3
    assert result["reason"] == "disconnect"
    with pytest.raises(LabTerminalError, match="unknown"):
        terminal.wait(terminal_id, timeout=0)


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_open_timeout_aborts_owner_before_spawn_without_phantom_attempt(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    terminal, connection = manager(tmp_path, max_sessions=1)
    original_openpty = pty.openpty

    def slow_openpty() -> tuple[int, int]:
        time.sleep(1.0)
        return original_openpty()

    monkeypatch.setattr(pty, "openpty", slow_openpty)
    with pytest.raises(LabTerminalError, match="did not start"):
        terminal.open(
            chapter="01",
            session_id="session-1",
            step_id="01-observe",
            start_timeout=0.1,
        )

    owner = next(
        thread for thread in threading.enumerate() if thread.name.startswith("waku-terminal-")
    )
    owner.join(timeout=5)
    assert not owner.is_alive()
    with terminal._lock:
        assert not terminal._sessions
    assert connection.execute("SELECT count(*) FROM lab_attempts").fetchone()[0] == 0

    reopened = terminal.open(chapter="01", session_id="session-2", step_id="01-observe")
    terminal.close(reopened["terminal_id"])


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_open_timeout_kills_spawned_child_and_skips_finalize(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    terminal, connection = manager(tmp_path, max_sessions=1)
    spawned: list[subprocess.Popen] = []
    original_popen = subprocess.Popen

    def recording_popen(*args, **kwargs):
        process = original_popen(*args, **kwargs)
        spawned.append(process)
        return process

    original_build = sys.modules["waku.ops.lab_terminal"].build_lab_child_environment

    def slow_build(workspace):
        time.sleep(1.0)
        return original_build(workspace)

    monkeypatch.setattr(subprocess, "Popen", recording_popen)
    monkeypatch.setattr(
        "waku.ops.lab_terminal.build_lab_child_environment", slow_build
    )
    with pytest.raises(LabTerminalError, match="did not start"):
        terminal.open(
            chapter="01",
            session_id="session-1",
            step_id="01-observe",
            start_timeout=0.1,
        )

    owner = next(
        thread for thread in threading.enumerate() if thread.name.startswith("waku-terminal-")
    )
    owner.join(timeout=5)
    assert spawned and spawned[0].poll() is not None
    assert connection.execute("SELECT count(*) FROM lab_attempts").fetchone()[0] == 0

    reopened = terminal.open(chapter="01", session_id="session-2", step_id="01-observe")
    terminal.close(reopened["terminal_id"])


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_open_fails_when_child_never_forms_a_process_group(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    terminal, _connection = manager(tmp_path, max_sessions=1)
    spawned: list[subprocess.Popen] = []
    original_popen = subprocess.Popen

    def recording_popen(*args, **kwargs):
        process = original_popen(*args, **kwargs)
        spawned.append(process)
        return process

    original_wait = LabTerminalManager._wait_for_process_group
    attempts = {"count": 0}

    def fail_group_once(process):
        attempts["count"] += 1
        if attempts["count"] == 1:
            return False
        return original_wait(process)

    monkeypatch.setattr(subprocess, "Popen", recording_popen)
    monkeypatch.setattr(
        LabTerminalManager, "_wait_for_process_group", staticmethod(fail_group_once)
    )
    with pytest.raises(LabTerminalError, match="process group"):
        terminal.open(chapter="01", session_id="session-1", step_id="01-observe")

    assert spawned and spawned[0].poll() is not None

    monkeypatch.setattr(
        LabTerminalManager, "_wait_for_process_group", staticmethod(original_wait)
    )
    reopened = terminal.open(chapter="01", session_id="session-2", step_id="01-observe")
    terminal.close(reopened["terminal_id"])


@pytest.mark.skipif(not hasattr(os, "login_tty"), reason="POSIX PTY contract")
def test_finished_sessions_are_evicted_beyond_the_retention_cap(tmp_path: Path) -> None:
    terminal, _connection = manager(tmp_path, max_sessions=2, max_retained_finished=1)
    first = terminal.open(chapter="01", session_id="session-1", step_id="01-prove")
    send(terminal, first["terminal_id"], b"exit\n")
    assert terminal.wait(first["terminal_id"], timeout=4) == 0
    second = terminal.open(chapter="01", session_id="session-1", step_id="01-prove")
    send(terminal, second["terminal_id"], b"exit\n")
    assert terminal.wait(second["terminal_id"], timeout=4) == 0

    evicted = False
    deadline = time.monotonic() + 3
    while time.monotonic() < deadline:
        with terminal._lock:
            evicted = first["terminal_id"] not in terminal._sessions
        if evicted:
            break
        time.sleep(0.02)
    assert evicted
    with pytest.raises(LabTerminalError, match="unknown"):
        terminal.wait(first["terminal_id"], timeout=0)
    terminal.close(second["terminal_id"])
