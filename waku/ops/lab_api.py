"""Thin browser API adapter for guided-lab runtime services."""

from __future__ import annotations

import os
import sqlite3
import threading
from collections.abc import Callable
from pathlib import Path
from typing import Any

from waku.db import connect
from waku.ops.lab_checkpoint import GitCheckpointManager
from waku.ops.lab_orchestrator import LabOrchestrator
from waku.ops.lab_runtime import LabRuntime
from waku.ops.lab_sessions import LabSessionStore
from waku.ops.lab_terminal import LabTerminalError, LabTerminalManager
from waku.ops.workspace_files import WorkspaceFileService
from waku.runtime.learning_context import LearningContext


SESSION_PATHS = {
    "/api/lab/session/start",
    "/api/lab/session/get",
    "/api/lab/session/snapshot",
    "/api/lab/session/list",
    "/api/lab/session/pause",
    "/api/lab/session/resume",
    "/api/lab/session/advance",
    "/api/lab/session/abandon",
    "/api/lab/session/complete-replay",
}
CHECKPOINT_PATHS = {
    "/api/lab/checkpoint/create",
    "/api/lab/checkpoint/prepare",
    "/api/lab/checkpoint/confirm",
}
RECAP_PATHS = {
    "/api/lab/recap/preview",
    "/api/lab/recap/export",
}
FILE_PATHS = {
    "/api/lab/file/list",
    "/api/lab/file/read",
    "/api/lab/file/save",
}
TERMINAL_PATHS = {
    "/api/lab/terminal/open",
    "/api/lab/terminal/stream",
    "/api/lab/terminal/input",
    "/api/lab/terminal/resize",
    "/api/lab/terminal/close",
}
JSON_PATHS = frozenset(
    SESSION_PATHS
    | CHECKPOINT_PATHS
    | RECAP_PATHS
    | FILE_PATHS
    | (TERMINAL_PATHS - {"/api/lab/terminal/stream"})
    | {
        "/api/lab/action",
        "/api/lab/hint",
        "/api/lab/creator/marker",
        "/api/lab/completion/validate",
    }
)
SSE_PATH = "/api/lab/terminal/stream"


class LabAPIError(ValueError):
    """A browser request is missing or contradicts server-owned lab state."""


class LabAPI:
    """Dispatch JSON requests without coupling domain services to HTTP."""

    def __init__(
        self,
        *,
        curriculum_root: Path,
        workspace: Path,
        connection: sqlite3.Connection,
        runtime: LabRuntime,
        terminals: LabTerminalManager,
    ) -> None:
        self.curriculum_root = Path(curriculum_root).resolve()
        self.workspace = Path(workspace).resolve()
        self.connection = connection
        self.runtime = runtime
        self.terminals = terminals
        self._lock = threading.RLock()
        self.terminals.set_persistence_lock(self._lock)
        self._owners_lock = threading.Lock()
        self._terminal_owners: dict[str, LabTerminalManager] = {}

    def dispatch(self, path: str, payload: object) -> Any:
        """Dispatch one declared JSON endpoint and return JSON-compatible data."""
        if path not in JSON_PATHS:
            raise LabAPIError(f"unknown guided-lab API path: {path}")
        body = self._payload(payload)
        if path == "/api/lab/terminal/open":
            return self._open_terminal(body)
        if path == "/api/lab/terminal/input":
            terminal_id = self._text(body, "terminal_id")
            self._terminal_owner(terminal_id).input(terminal_id, self._text(body, "data"))
            return {"ok": True}
        if path == "/api/lab/terminal/resize":
            terminal_id = self._text(body, "terminal_id")
            self._terminal_owner(terminal_id).resize(
                terminal_id,
                rows=self._integer(body, "rows"),
                columns=self._integer(body, "columns"),
            )
            return {"ok": True}
        if path == "/api/lab/terminal/close":
            terminal_id = self._text(body, "terminal_id")
            result = self._terminal_owner(terminal_id).close(terminal_id, reason="browser_close")
            with self._owners_lock:
                self._terminal_owners.pop(terminal_id, None)
            return result
        # Declared actions run subprocesses that can take minutes. Validate and
        # persist under the lock, but execute outside it so a long command does
        # not block terminal finalization or unrelated lab requests.
        if path == "/api/lab/action":
            with self._lock:
                prepared = self.runtime.begin_action(
                    self._text(body, "session_id"), self._text(body, "action_id")
                )
            if prepared["kind"] != "command":
                return prepared["result"]
            result = self.runtime.run_prepared_action(prepared)
            with self._lock:
                return self.runtime.finish_action(prepared, result)
        with self._lock:
            if path == "/api/lab/session/start":
                return self.runtime.start(
                    self._text(body, "chapter"),
                    session_id=self._optional_text(body, "session_id"),
                    workspace_mode=self._optional_text(body, "workspace_mode"),
                )
            if path == "/api/lab/session/get":
                return self.runtime.get(self._text(body, "session_id"))
            if path == "/api/lab/session/snapshot":
                return self.runtime.snapshot(self._text(body, "session_id"))
            if path == "/api/lab/session/list":
                return {"sessions": self.runtime.list(chapter=self._optional_text(body, "chapter"))}
            if path == "/api/lab/session/pause":
                return self.runtime.pause(self._text(body, "session_id"))
            if path == "/api/lab/session/resume":
                return self.runtime.resume(self._text(body, "session_id"))
            if path == "/api/lab/session/advance":
                return self.runtime.advance_step(
                    self._text(body, "session_id"), self._text(body, "next_step")
                )
            if path == "/api/lab/session/abandon":
                return self.runtime.abandon(self._text(body, "session_id"))
            if path == "/api/lab/session/complete-replay":
                return self.runtime.complete_replay(self._text(body, "session_id"))
            if path == "/api/lab/hint":
                return self.runtime.reveal_hint(self._text(body, "session_id"))
            if path == "/api/lab/checkpoint/create":
                return self.runtime.create_checkpoint(
                    self._text(body, "session_id"), self._text(body, "label")
                )
            if path == "/api/lab/checkpoint/prepare":
                return self.runtime.prepare_restore(
                    self._text(body, "session_id"), self._text(body, "checkpoint_ref")
                )
            if path == "/api/lab/checkpoint/confirm":
                return self.runtime.confirm_restore(
                    self._text(body, "session_id"),
                    self._text(body, "checkpoint_ref"),
                    self._text(body, "token"),
                )
            if path == "/api/lab/creator/marker":
                return self.runtime.add_creator_marker(
                    self._text(body, "session_id"),
                    self._text(body, "kind"),
                    str(body.get("note") or ""),
                )
            if path == "/api/lab/recap/preview":
                return self.runtime.preview_recap(
                    self._text(body, "session_id"),
                    attempt_ids=self._attempt_ids(body),
                    reflections=self._reflections(body),
                )
            if path == "/api/lab/recap/export":
                return self.runtime.export_recap(
                    self._text(body, "session_id"),
                    attempt_ids=self._attempt_ids(body),
                    reflections=self._reflections(body),
                )
            if path == "/api/lab/completion/validate":
                return self.runtime.validate_completion(
                    self._text(body, "session_id"),
                    final_commit=self._text(body, "final_commit"),
                    completion_ref=self._text(body, "completion_ref"),
                )
            if path in FILE_PATHS:
                return self._file(path, body)
        raise LabAPIError(f"unhandled guided-lab API path: {path}")

    def stream_terminal(
        self,
        payload: object,
        emit: Callable[[dict[str, Any]], None],
    ) -> None:
        """Stream POST-response terminal frames and clean up a disconnected client."""
        body = self._payload(payload)
        terminal_id = self._text(body, "terminal_id")
        after_sequence = body.get("after_sequence", 0)
        if type(after_sequence) is not int or after_sequence < 0:
            raise LabAPIError("after_sequence must be a non-negative integer")
        terminals = self._terminal_owner(terminal_id)
        try:
            for frame in terminals.iter_frames(terminal_id, after_sequence=after_sequence):
                emit(frame)
        except Exception as error:
            # Any emit failure means the browser is gone: stop the process
            # group rather than leaving a PTY running without a consumer.
            try:
                terminals.disconnect(terminal_id)
            except LabTerminalError:
                pass
            with self._owners_lock:
                self._terminal_owners.pop(terminal_id, None)
            if not isinstance(error, (BrokenPipeError, ConnectionResetError)):
                raise

    def enrich_learning_context(self, context: LearningContext, session_id: str) -> LearningContext:
        """Add server-derived lab evidence while preserving the user's message."""
        with self._lock:
            return self.runtime.enrich_learning_context(context, session_id)

    def _file(self, path: str, body: dict[str, Any]) -> Any:
        session = self._validated_session(body)
        if path == "/api/lab/file/save" and session["status"] != "in_progress":
            raise LabAPIError("file saves require an in-progress lab session")
        files = self._files_for_session(str(session["id"]), str(session["chapter"]))
        if path == "/api/lab/file/list":
            return {"files": files.list()}
        if path == "/api/lab/file/read":
            return files.read(self._text(body, "path"))
        return files.save(
            self._text(body, "path"),
            self._text(body, "content", allow_empty=True),
            self._text(body, "expected_revision"),
        )

    def _open_terminal(self, body: dict[str, Any]) -> dict[str, Any]:
        rows = body.get("rows", 24)
        columns = body.get("columns", 80)
        if type(rows) is not int or type(columns) is not int:
            raise LabAPIError("terminal rows and columns must be integers")
        with self._lock:
            session = self._validated_session(body)
            if session["status"] != "in_progress":
                raise LabAPIError("terminal open requires an in-progress lab session")
            terminals = self._terminals_for_session(str(session["id"]))
            terminals.set_persistence_lock(self._lock)
        opened = terminals.open(
            chapter=str(session["chapter"]),
            session_id=str(session["id"]),
            step_id=str(session["current_step"]),
            rows=rows,
            columns=columns,
        )
        with self._owners_lock:
            self._terminal_owners[str(opened["terminal_id"])] = terminals
        return opened

    def shutdown(self) -> None:
        """Close every adapter-owned terminal before dashboard service replacement."""
        with self._owners_lock:
            managers = {id(manager): manager for manager in self._terminal_owners.values()}
            self._terminal_owners.clear()
        managers[id(self.terminals)] = self.terminals
        for manager in managers.values():
            manager.close_all()

    def _workspace_for_session(self, session_id: str) -> Path:
        resolver = getattr(self.runtime, "workspace_for_session", None)
        if callable(resolver):
            return Path(resolver(session_id)).resolve()
        return self.workspace

    def _terminals_for_session(self, session_id: str) -> LabTerminalManager:
        resolver = getattr(self.runtime, "terminal_manager", None)
        if callable(resolver):
            return resolver(session_id)
        return self.terminals

    def _files_for_session(self, session_id: str, chapter: str) -> WorkspaceFileService:
        resolver = getattr(self.runtime, "file_service", None)
        if callable(resolver):
            return resolver(session_id)
        return WorkspaceFileService.from_chapter(
            self.curriculum_root,
            self._workspace_for_session(session_id),
            chapter,
        )

    def _terminal_owner(self, terminal_id: str) -> LabTerminalManager:
        with self._owners_lock:
            return self._terminal_owners.get(terminal_id, self.terminals)

    def _validated_session(self, body: dict[str, Any]) -> dict[str, Any]:
        session = self.runtime.get(self._text(body, "session_id"))
        for key, session_key in (("chapter", "chapter"), ("current_step", "current_step")):
            claimed = body.get(key)
            if claimed is not None and claimed != session[session_key]:
                raise LabAPIError(f"{key} does not match the server-owned lab session")
        return session

    @staticmethod
    def _payload(payload: object) -> dict[str, Any]:
        if not isinstance(payload, dict):
            raise LabAPIError("request body must be a JSON object")
        return payload

    @staticmethod
    def _text(payload: dict[str, Any], key: str, *, allow_empty: bool = False) -> str:
        value = payload.get(key)
        if not isinstance(value, str) or (not allow_empty and not value.strip()):
            raise LabAPIError(f"{key} must be {'text' if allow_empty else 'non-empty text'}")
        return value if allow_empty else value.strip()

    @staticmethod
    def _optional_text(payload: dict[str, Any], key: str) -> str | None:
        value = payload.get(key)
        if value is None:
            return None
        if not isinstance(value, str) or not value.strip():
            raise LabAPIError(f"{key} must be non-empty text when supplied")
        return value.strip()

    @staticmethod
    def _integer(payload: dict[str, Any], key: str) -> int:
        value = payload.get(key)
        if type(value) is not int:
            raise LabAPIError(f"{key} must be an integer")
        return value

    @staticmethod
    def _attempt_ids(payload: dict[str, Any]) -> list[int]:
        value = payload.get("attempt_ids", [])
        if not isinstance(value, list):
            raise LabAPIError("attempt_ids must be a list")
        return value

    @staticmethod
    def _reflections(payload: dict[str, Any]) -> dict[str, str]:
        value = payload.get("reflections", {})
        if not isinstance(value, dict):
            raise LabAPIError("reflections must be an object")
        return value


def build_lab_api(
    *,
    curriculum_root: Path,
    workspace: Path,
    home: Path,
) -> LabAPI:
    """Build the service graph once for a dashboard process."""
    home = Path(home).resolve()
    home.mkdir(parents=True, exist_ok=True)
    workspace = Path(workspace).resolve()
    connection = connect(home, check_same_thread=False)
    sessions = LabSessionStore(connection)
    orchestrator = LabOrchestrator(sessions, GitCheckpointManager(workspace))
    runtime = LabRuntime(
        curriculum_root=Path(curriculum_root),
        conn=connection,
        orchestrator=orchestrator,
        replay_root=_configured_replay_root(home),
    )
    terminals = LabTerminalManager(workspace, connection)
    return LabAPI(
        curriculum_root=curriculum_root,
        workspace=workspace,
        connection=connection,
        runtime=runtime,
        terminals=terminals,
    )


_LAB_API: LabAPI | None = None
_LAB_API_KEY: tuple[Path, Path, Path, Path] | None = None
_LAB_API_LOCK = threading.Lock()


def _configured_replay_root(home: Path) -> Path:
    configured = os.getenv("WAKU_LAB_REPLAYS", "").strip()
    return (
        Path(configured).expanduser().resolve() if configured else (home / "lab-replays").resolve()
    )


def get_lab_api(curriculum_root: Path) -> LabAPI:
    """Lazily build services from dashboard root, workspace, and Waku home."""
    from waku.config import load_settings

    settings = load_settings()
    settings.ensure_home()
    root = Path(curriculum_root).resolve()
    workspace = Path(os.getenv("WAKU_WORKSPACE", str(root))).expanduser().resolve()
    replay_root = _configured_replay_root(settings.home.resolve())
    key = (root, workspace, settings.home.resolve(), replay_root)
    global _LAB_API, _LAB_API_KEY
    with _LAB_API_LOCK:
        if _LAB_API is None or _LAB_API_KEY != key:
            if _LAB_API is not None:
                _LAB_API.shutdown()
                _LAB_API.connection.close()
            _LAB_API = build_lab_api(
                curriculum_root=root,
                workspace=workspace,
                home=settings.home,
            )
            _LAB_API_KEY = key
        return _LAB_API
