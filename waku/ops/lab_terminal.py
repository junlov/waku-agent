"""Bounded interactive PTY sessions for the guided lab workbench."""

from __future__ import annotations

import argparse
import base64
import binascii
import errno
import os
import pty
import select
import signal
import sqlite3
import subprocess
import sys
import termios
import threading
import time
import uuid
from collections import deque
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable, Iterator

from waku.ops.lab_environment import build_lab_child_environment, redact_lab_output
from waku.ops.workspace_policy import WorkspaceMutationBusy, workspace_mutation_lock


TERMINAL_API_PATHS = (
    "/api/lab/terminal/stream",
    "/api/lab/terminal/input",
    "/api/lab/terminal/resize",
    "/api/lab/terminal/close",
)
MIN_ROWS = 2
MAX_ROWS = 200
MIN_COLUMNS = 10
MAX_COLUMNS = 500
MAX_INPUT_BYTES = 64 * 1024
MAX_PROCESS_TERMINALS = 4
DEFAULT_START_TIMEOUT_SECONDS = 15.0
MAX_RETAINED_FINISHED_SESSIONS = 16


class LabTerminalError(RuntimeError):
    """A terminal operation violates the bounded session contract."""


class LabTerminalBusy(LabTerminalError):
    """The session or workspace capacity is already occupied."""


class TerminalCapacity:
    """Process-wide terminal slots shared by workspace-specific managers."""

    def __init__(self, limit: int = MAX_PROCESS_TERMINALS) -> None:
        if limit < 1:
            raise LabTerminalError("global terminal capacity must be positive")
        self.limit = limit
        self._owners: set[str] = set()
        self._lock = threading.Lock()

    def acquire(self, terminal_id: str) -> None:
        with self._lock:
            if len(self._owners) >= self.limit:
                raise LabTerminalBusy("global terminal capacity reached")
            self._owners.add(terminal_id)

    def release(self, terminal_id: str) -> None:
        with self._lock:
            self._owners.discard(terminal_id)


_PROCESS_TERMINAL_CAPACITY = TerminalCapacity()


@dataclass
class _TerminalSession:
    terminal_id: str
    chapter: str
    session_id: str
    step_id: str
    shell: str
    rows: int
    columns: int
    started_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat(timespec="milliseconds")
    )
    started_monotonic: float = field(default_factory=time.monotonic)
    condition: threading.Condition = field(default_factory=threading.Condition)
    frames: deque[tuple[int, bytes]] = field(default_factory=deque)
    frame_bytes: int = 0
    next_sequence: int = 1
    transcript: bytearray = field(default_factory=bytearray)
    input_queue: deque[bytes] = field(default_factory=deque)
    input_bytes: int = 0
    stop_io: threading.Event = field(default_factory=threading.Event)
    abort: threading.Event = field(default_factory=threading.Event)
    terminated: threading.Event = field(default_factory=threading.Event)
    master_fd: int | None = None
    process: subprocess.Popen[bytes] | None = None
    exit_code: int | None = None
    start_error: BaseException | None = None
    ready: threading.Event = field(default_factory=threading.Event)
    finished: threading.Event = field(default_factory=threading.Event)
    persisted: bool = False
    attempt_id: int | None = None
    final_reason: str = "natural_exit"
    finalize_error: BaseException | None = None
    capacity_released: bool = False
    finalize_lock: threading.Lock = field(default_factory=threading.Lock)
    redaction_values: tuple[str, ...] = ()


class LabTerminalManager:
    """Own PTY processes, raw output buffers, and redacted terminal evidence."""

    def __init__(
        self,
        workspace: Path,
        connection: sqlite3.Connection,
        *,
        max_sessions: int = 1,
        max_buffer_bytes: int = 64 * 1024,
        max_transcript_bytes: int = 24 * 1024,
        max_input_buffer_bytes: int = 64 * 1024,
        shell: str = "/bin/sh",
        capacity: TerminalCapacity | None = None,
        persistence_lock: threading.RLock | None = None,
        start_timeout: float = DEFAULT_START_TIMEOUT_SECONDS,
        max_retained_finished: int = MAX_RETAINED_FINISHED_SESSIONS,
    ):
        self.workspace = Path(workspace).resolve()
        if not self.workspace.is_dir():
            raise LabTerminalError(f"workspace does not exist: {self.workspace}")
        if (
            max_sessions < 1
            or max_buffer_bytes < 1
            or max_transcript_bytes < 1
            or max_input_buffer_bytes < 1
        ):
            raise LabTerminalError("terminal limits must be positive")
        if start_timeout <= 0 or max_retained_finished < 1:
            raise LabTerminalError("terminal start and retention limits must be positive")
        shell_path = Path(shell)
        if not shell_path.is_absolute() or not os.access(shell_path, os.X_OK):
            raise LabTerminalError(f"terminal shell is not executable: {shell}")
        self.connection = connection
        self.max_sessions = max_sessions
        self.max_buffer_bytes = max_buffer_bytes
        self.max_transcript_bytes = max_transcript_bytes
        self.max_input_buffer_bytes = max_input_buffer_bytes
        self.shell = str(shell_path)
        self.capacity = capacity or _PROCESS_TERMINAL_CAPACITY
        self.start_timeout = start_timeout
        self.max_retained_finished = max_retained_finished
        self._persistence_lock = persistence_lock or threading.RLock()
        self._sessions: dict[str, _TerminalSession] = {}
        self._lock = threading.Lock()

    def set_persistence_lock(self, lock: threading.RLock) -> None:
        """Serialize background finalization with the owning API's DB operations."""
        with self._lock:
            if self._persistence_lock is lock:
                return
            if any(not item.finished.is_set() for item in self._sessions.values()):
                raise LabTerminalBusy(
                    "cannot replace the terminal persistence lock while a session is active"
                )
            self._persistence_lock = lock

    def open(
        self,
        *,
        chapter: str,
        session_id: str,
        step_id: str,
        rows: int = 24,
        columns: int = 80,
        start_timeout: float | None = None,
    ) -> dict[str, Any]:
        """Start an interactive shell with bounded, serialized PTY setup."""
        self._validate_dimensions(rows, columns)
        for label, value in (
            ("chapter", chapter),
            ("session_id", session_id),
            ("step_id", step_id),
        ):
            if not isinstance(value, str) or not value or len(value) > 200:
                raise LabTerminalError(f"{label} must be non-empty bounded text")
        terminal_id = uuid.uuid4().hex
        session = _TerminalSession(
            terminal_id=terminal_id,
            chapter=chapter,
            session_id=session_id,
            step_id=step_id,
            shell=self.shell,
            rows=rows,
            columns=columns,
        )
        with self._lock:
            active = sum(not item.capacity_released for item in self._sessions.values())
            if active >= self.max_sessions:
                raise LabTerminalBusy("terminal session capacity reached")
            self.capacity.acquire(terminal_id)
            self._sessions[terminal_id] = session
        owner = threading.Thread(
            target=self._own_session,
            args=(session,),
            name=f"waku-terminal-{terminal_id[:8]}",
            daemon=True,
        )
        try:
            owner.start()
        except BaseException:
            self._discard(terminal_id)
            raise
        deadline = self.start_timeout if start_timeout is None else start_timeout
        if not session.ready.wait(timeout=deadline):
            session.abort.set()
            self._discard(terminal_id)
            raise LabTerminalError(f"terminal did not start within {deadline:g} seconds")
        if session.start_error is not None:
            self._discard(terminal_id)
            if isinstance(session.start_error, WorkspaceMutationBusy):
                raise LabTerminalBusy("workspace is busy; close the active operation first")
            raise LabTerminalError(f"terminal failed to start: {session.start_error}")
        return {
            "terminal_id": terminal_id,
            "chapter": chapter,
            "session_id": session_id,
            "step_id": step_id,
            "rows": rows,
            "columns": columns,
        }

    def input(self, terminal_id: str, data_base64: str) -> None:
        """Write one bounded base64-encoded raw input frame to the PTY."""
        session = self._get(terminal_id)
        try:
            data = base64.b64decode(data_base64, validate=True)
        except (binascii.Error, ValueError) as exc:
            raise LabTerminalError("terminal input must be valid base64") from exc
        if not data or len(data) > MAX_INPUT_BYTES:
            raise LabTerminalError(f"terminal input must be 1-{MAX_INPUT_BYTES} bytes")
        with session.condition:
            if (
                session.master_fd is None
                or session.exit_code is not None
                or session.stop_io.is_set()
            ):
                raise LabTerminalError("terminal is closed")
            if session.input_bytes + len(data) > self.max_input_buffer_bytes:
                raise LabTerminalBusy("terminal input buffer capacity reached")
            session.input_queue.append(data)
            session.input_bytes += len(data)
            session.condition.notify_all()

    def interrupt(self, terminal_id: str) -> None:
        """Send the terminal driver's interrupt character (Ctrl-C)."""
        self.input(terminal_id, base64.b64encode(b"\x03").decode("ascii"))

    def resize(self, terminal_id: str, *, rows: int, columns: int) -> None:
        """Resize the PTY within conservative browser-terminal bounds."""
        self._validate_dimensions(rows, columns)
        session = self._get(terminal_id)
        with session.condition:
            descriptor = session.master_fd
            if descriptor is None or session.exit_code is not None:
                raise LabTerminalError("terminal is closed")
            termios.tcsetwinsize(descriptor, (rows, columns))
            session.rows = rows
            session.columns = columns

    def iter_frames(
        self,
        terminal_id: str,
        *,
        after_sequence: int = 0,
        heartbeat_seconds: float = 10.0,
    ) -> Iterator[dict[str, Any]]:
        """Yield raw base64 output frames for a POST-backed SSE response."""
        session = self._get(terminal_id)
        cursor = max(0, int(after_sequence))
        while True:
            pending: list[tuple[int, bytes]] = []
            gap: int | None = None
            exit_code: int | None = None
            heartbeat = False
            with session.condition:
                first_sequence = session.frames[0][0] if session.frames else session.next_sequence
                if cursor < first_sequence - 1:
                    gap = first_sequence - 1
                    cursor = gap
                pending = [(seq, data) for seq, data in session.frames if seq > cursor]
                if not pending and gap is None and not session.finished.is_set():
                    notified = session.condition.wait(timeout=max(0.05, heartbeat_seconds))
                    if not notified:
                        heartbeat = True
                    else:
                        continue
                if session.finished.is_set():
                    exit_code = session.exit_code
            if heartbeat:
                yield {"kind": "heartbeat"}
                continue
            if gap is not None:
                yield {"kind": "gap", "through_sequence": gap}
            for sequence, data in pending:
                cursor = sequence
                yield {
                    "kind": "output",
                    "sequence": sequence,
                    "data": base64.b64encode(data).decode("ascii"),
                }
            if exit_code is not None:
                yield {"kind": "exit", "exit_code": exit_code, "sequence": cursor}
                return

    def stream_frames(
        self,
        terminal_id: str,
        emit: Callable[[dict[str, Any]], None],
        *,
        after_sequence: int = 0,
    ) -> None:
        """Push frames into an HTTP adapter without coupling this service to it."""
        for frame in self.iter_frames(terminal_id, after_sequence=after_sequence):
            emit(frame)

    def wait(self, terminal_id: str, timeout: float | None = None) -> int | None:
        """Wait for natural shell exit and exact-once evidence finalization."""
        session = self._get(terminal_id)
        session.finished.wait(timeout=timeout)
        return session.exit_code

    def close(self, terminal_id: str, *, reason: str = "close") -> dict[str, Any]:
        """Stop the complete process group, persist one attempt, and release state."""
        session = self._get(terminal_id)
        try:
            with session.condition:
                if not session.terminated.is_set():
                    session.final_reason = reason
            if not session.terminated.is_set():
                self._signal_process_group(session, signal.SIGHUP)
                if not session.terminated.wait(timeout=1.0):
                    self._signal_process_group(session, signal.SIGTERM)
                if not session.terminated.wait(timeout=1.0):
                    self._signal_process_group(session, signal.SIGKILL)
                    session.terminated.wait(timeout=1.0)
            if not session.terminated.is_set():
                raise LabTerminalError("terminal process group did not stop")
            try:
                attempt_id = self._finalize(session, reason)
            except BaseException as exc:
                raise LabTerminalError(
                    f"terminal evidence could not be persisted: {exc}"
                ) from exc
            return {
                "terminal_id": terminal_id,
                "exit_code": session.exit_code,
                "attempt_id": attempt_id,
                "reason": reason,
            }
        finally:
            self._discard(terminal_id)

    def disconnect(self, terminal_id: str) -> dict[str, Any]:
        """Apply the same cleanup contract when an SSE client disconnects."""
        return self.close(terminal_id, reason="disconnect")

    def close_all(self) -> None:
        """Best-effort manager shutdown for server teardown."""
        with self._lock:
            terminal_ids = list(self._sessions)
        for terminal_id in terminal_ids:
            try:
                self.close(terminal_id, reason="shutdown")
            except LabTerminalError:
                continue

    def has_active_session(self, session_id: str) -> bool:
        """Return whether this manager still owns a PTY for one lab session."""
        with self._lock:
            return any(
                item.session_id == session_id and not item.finished.is_set()
                for item in self._sessions.values()
            )

    def _own_session(self, session: _TerminalSession) -> None:
        slave_fd: int | None = None
        reader: threading.Thread | None = None
        writer: threading.Thread | None = None
        try:
            with workspace_mutation_lock(self.workspace, blocking=False):
                if session.abort.is_set():
                    return
                master_fd, slave_fd = pty.openpty()
                os.set_blocking(master_fd, False)
                termios.tcsetwinsize(slave_fd, (session.rows, session.columns))
                session.master_fd = master_fd
                command = [
                    sys.executable,
                    "-m",
                    "waku.ops.lab_terminal",
                    "--pty-child",
                    str(slave_fd),
                    session.shell,
                ]
                child_environment = build_lab_child_environment(self.workspace)
                session.redaction_values = child_environment.redaction_values
                session.process = subprocess.Popen(
                    command,
                    cwd=self.workspace,
                    env=child_environment.values,
                    pass_fds=(slave_fd,),
                    close_fds=True,
                )
                os.close(slave_fd)
                slave_fd = None
                if session.abort.is_set():
                    self._kill_process(session)
                    return
                if not self._wait_for_process_group(session.process):
                    self._kill_process(session)
                    raise LabTerminalError(
                        "terminal child did not establish its own process group"
                    )
            reader = threading.Thread(
                target=self._read_output,
                args=(session,),
                name=f"waku-terminal-reader-{session.terminal_id[:8]}",
                daemon=True,
            )
            reader.start()
            writer = threading.Thread(
                target=self._write_input,
                args=(session,),
                name=f"waku-terminal-writer-{session.terminal_id[:8]}",
                daemon=True,
            )
            writer.start()
            session.ready.set()
            exit_code = session.process.wait()
            session.stop_io.set()
            with session.condition:
                session.condition.notify_all()
            writer.join(timeout=1.0)
            reader.join(timeout=1.0)
            with session.condition:
                session.exit_code = exit_code
                session.condition.notify_all()
        except BaseException as exc:
            session.start_error = exc
            session.ready.set()
        finally:
            session.stop_io.set()
            with session.condition:
                session.input_queue.clear()
                session.input_bytes = 0
                session.condition.notify_all()
            if slave_fd is not None:
                os.close(slave_fd)
            if session.master_fd is not None:
                try:
                    os.close(session.master_fd)
                except OSError:
                    pass
                session.master_fd = None
            if (
                session.process is not None
                and session.process.poll() is None
                and (session.start_error is not None or session.abort.is_set())
            ):
                self._kill_process(session)
            if session.exit_code is None and session.process is not None:
                session.exit_code = session.process.poll()
            with session.condition:
                session.condition.notify_all()
            session.terminated.set()
            try:
                if (
                    session.process is not None
                    and session.start_error is None
                    and not session.abort.is_set()
                ):
                    self._finalize(session, session.final_reason)
                else:
                    self._release_capacity(session)
            except BaseException as exc:
                session.finalize_error = exc
            finally:
                session.finished.set()
                with session.condition:
                    session.condition.notify_all()
                self._evict_finished()

    def _read_output(self, session: _TerminalSession) -> None:
        descriptor = session.master_fd
        if descriptor is None:
            return
        read_size = min(4096, self.max_buffer_bytes)
        while True:
            try:
                data = os.read(descriptor, read_size)
            except BlockingIOError:
                if session.stop_io.is_set():
                    return
                try:
                    select.select([descriptor], [], [], 0.05)
                except (OSError, ValueError):
                    return
                continue
            except OSError as exc:
                if exc.errno in {errno.EBADF, errno.EIO}:
                    return
                raise
            if not data:
                return
            with session.condition:
                sequence = session.next_sequence
                session.next_sequence += 1
                session.frames.append((sequence, data))
                session.frame_bytes += len(data)
                while session.frame_bytes > self.max_buffer_bytes and session.frames:
                    _old_sequence, old_data = session.frames.popleft()
                    session.frame_bytes -= len(old_data)
                session.transcript.extend(data)
                redaction_overlap = max(
                    (len(secret.encode("utf-8")) for secret in session.redaction_values),
                    default=0,
                )
                overflow = len(session.transcript) - (self.max_transcript_bytes + redaction_overlap)
                if overflow > 0:
                    del session.transcript[:overflow]
                session.condition.notify_all()

    def _write_input(self, session: _TerminalSession) -> None:
        descriptor = session.master_fd
        if descriptor is None:
            return
        pending = memoryview(b"")
        while not session.stop_io.is_set():
            with session.condition:
                while not pending and not session.input_queue and not session.stop_io.is_set():
                    session.condition.wait(timeout=0.1)
                if session.stop_io.is_set():
                    return
                if not pending:
                    pending = memoryview(session.input_queue.popleft())
            try:
                written = os.write(descriptor, pending)
            except BlockingIOError:
                try:
                    select.select([], [descriptor], [], 0.05)
                except (OSError, ValueError):
                    return
                continue
            except OSError as exc:
                if exc.errno in {errno.EBADF, errno.EIO}:
                    return
                raise
            if written <= 0:
                continue
            pending = pending[written:]
            with session.condition:
                session.input_bytes = max(0, session.input_bytes - written)
                session.condition.notify_all()

    def _finalize(self, session: _TerminalSession, reason: str) -> int:
        """Persist and release one terminal exactly once across exit/close races."""
        with session.finalize_lock:
            try:
                if not session.persisted:
                    with self._persistence_lock:
                        session.attempt_id = self._persist(session, reason)
                    session.persisted = True
                session.finalize_error = None
                return int(session.attempt_id or 0)
            finally:
                self._release_capacity(session)

    def _persist(self, session: _TerminalSession, reason: str) -> int:
        transcript = bytes(session.transcript).decode("utf-8", errors="replace")
        output = redact_lab_output(transcript, session.redaction_values)[
            -self.max_transcript_bytes :
        ]
        duration_ms = int((time.monotonic() - session.started_monotonic) * 1000)
        exit_code = session.exit_code if session.exit_code is not None else 255
        cursor = self.connection.execute(
            """INSERT INTO lab_attempts
               (chapter, session_id, step_id, action_id, action, command, exit_code,
                output, started_at, duration_ms)
               VALUES (?, ?, ?, 'terminal', 'terminal', ?, ?, ?, ?, ?)""",
            (
                session.chapter,
                session.session_id,
                session.step_id,
                f"{session.shell} -i [{reason}]",
                exit_code,
                output,
                session.started_at,
                duration_ms,
            ),
        )
        self.connection.commit()
        return int(cursor.lastrowid)

    def _release_capacity(self, session: _TerminalSession) -> None:
        if not session.capacity_released:
            self.capacity.release(session.terminal_id)
            session.capacity_released = True

    def _get(self, terminal_id: str) -> _TerminalSession:
        with self._lock:
            session = self._sessions.get(terminal_id)
        if session is None:
            raise LabTerminalError("unknown terminal session")
        return session

    def _discard(self, terminal_id: str) -> None:
        with self._lock:
            session = self._sessions.pop(terminal_id, None)
        if session is not None:
            self._release_capacity(session)

    def _evict_finished(self) -> None:
        """Retain only the newest finalized sessions so dead entries stay bounded."""
        with self._lock:
            finished = sorted(
                (item for item in self._sessions.values() if item.finished.is_set()),
                key=lambda item: item.started_monotonic,
            )
            for item in finished[: max(0, len(finished) - self.max_retained_finished)]:
                self._sessions.pop(item.terminal_id, None)

    @staticmethod
    def _validate_dimensions(rows: int, columns: int) -> None:
        if type(rows) is not int or not MIN_ROWS <= rows <= MAX_ROWS:
            raise LabTerminalError(f"rows must be between {MIN_ROWS} and {MAX_ROWS}")
        if type(columns) is not int or not MIN_COLUMNS <= columns <= MAX_COLUMNS:
            raise LabTerminalError(f"columns must be between {MIN_COLUMNS} and {MAX_COLUMNS}")

    @staticmethod
    def _wait_for_process_group(process: subprocess.Popen[bytes]) -> bool:
        """Wait for the PTY helper to become a session leader; False on timeout."""
        deadline = time.monotonic() + 2.0
        while process.poll() is None and time.monotonic() < deadline:
            try:
                if os.getpgid(process.pid) == process.pid:
                    return True
            except ProcessLookupError:
                return True
            time.sleep(0.01)
        return process.poll() is not None

    @staticmethod
    def _signal_process_group(session: _TerminalSession, signum: signal.Signals) -> None:
        process = session.process
        if process is None or process.poll() is not None:
            return
        try:
            os.killpg(process.pid, signum)
        except ProcessLookupError:
            return
        except PermissionError:
            process.send_signal(signum)

    @staticmethod
    def _kill_process(session: _TerminalSession) -> None:
        """Kill and reap a started child when group signalling is impossible."""
        process = session.process
        if process is None or process.poll() is not None:
            return
        try:
            os.killpg(process.pid, signal.SIGKILL)
        except (ProcessLookupError, PermissionError, OSError):
            try:
                process.kill()
            except ProcessLookupError:
                pass
        try:
            process.wait(timeout=2)
        except subprocess.TimeoutExpired:
            pass


def _pty_child(slave_fd: int, shell: str) -> None:
    """Become the PTY session leader before replacing this helper with the shell."""
    os.login_tty(slave_fd)
    os.execvpe(shell, [shell, "-i"], os.environ.copy())


def _main() -> int:
    parser = argparse.ArgumentParser(add_help=False)
    parser.add_argument("--pty-child", type=int)
    parser.add_argument("shell")
    arguments = parser.parse_args()
    _pty_child(arguments.pty_child, arguments.shell)
    return 127


if __name__ == "__main__":
    raise SystemExit(_main())
