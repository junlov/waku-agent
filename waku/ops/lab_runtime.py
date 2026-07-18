"""Manifest-bound guided-lab orchestration independent of HTTP routing.

This service deliberately keeps curriculum experience state in SQLite while
leaving source and completion authority in Git.  It never consumes terminal or
chat history: only manifest-declared attempts and explicitly selected learner
artifacts may cross into coaching or recap context.
"""

from __future__ import annotations

import hashlib
import hmac
import json
import os
import sqlite3
import subprocess
import tempfile
import uuid
from collections.abc import Callable, Mapping, Sequence
from pathlib import Path
from typing import Any

from waku.memory.learning_journal import LearningJournalStore
from waku.ops.lab_environment import redact_configured, redact_configured_output
from waku.ops.lab import run_lab_action
from waku.ops.lab_checkpoint import CheckpointError, GitCheckpointManager
from waku.ops.lab_manifest import LabManifestError, load_curriculum_contract
from waku.ops.lab_orchestrator import LabOrchestrationError, LabOrchestrator
from waku.ops.lab_sessions import LabSessionError
from waku.ops.lab_terminal import LabTerminalManager
from waku.ops.workspace_files import WorkspaceFileService
from waku.ops.workspace_policy import workspace_mutation_lock
from waku.runtime.learning_context import JOURNAL_FIELDS, LearningContext


CREATOR_MARKERS = frozenset({"failure", "surprise", "decision", "breakthrough", "next_step"})
MAX_RECAP_TEXT = 8_000
MAX_GIT_SUMMARY = 8_000
MAX_SNAPSHOT_ATTEMPTS = 200
MAX_SNAPSHOT_EVENTS = 500
MAX_RECAP_FILE_BYTES = 4 * 1024 * 1024
GIT_TIMEOUT_SECONDS = 60


class LabRuntimeError(RuntimeError):
    """A guided-lab request violated its manifest or evidence contract."""


class LabRuntime:
    """Compose manifests, sessions, Git authority, actions, and journals."""

    def __init__(
        self,
        *,
        curriculum_root: Path,
        conn: sqlite3.Connection,
        orchestrator: LabOrchestrator,
        action_runner: Callable[[dict[str, Any], Path], dict[str, Any]] | None = None,
        replay_root: Path | None = None,
    ) -> None:
        self.curriculum_root = curriculum_root.resolve()
        self.conn = conn
        self.sessions = orchestrator.sessions
        self.orchestrator = orchestrator
        self.repository = orchestrator.checkpoints.repository.resolve()
        runtime_root = Path(os.getenv("WAKU_RUNTIME", "/var/lib/waku"))
        self.replay_root = Path(
            replay_root or os.getenv("WAKU_LAB_REPLAYS", "") or runtime_root / "lab-replays"
        ).expanduser()
        self.journal = LearningJournalStore(conn)
        self._action_runner = action_runner or (
            lambda payload, workspace: run_lab_action(payload, workspace=workspace)
        )
        self._terminals: dict[str, LabTerminalManager] = {}

    # Session lifecycle -------------------------------------------------

    def start(
        self,
        chapter: str,
        *,
        session_id: str | None = None,
        workspace_mode: str | None = None,
    ) -> dict[str, Any]:
        manifest, passed = self._startable_manifest(chapter)
        steps = self._steps(manifest)
        checkpoint = str((manifest.get("environment") or {}).get("checkpoint") or "")
        mode = workspace_mode or ("replay" if passed else "canonical")
        if mode not in {"canonical", "replay"}:
            raise LabRuntimeError("workspace mode must be canonical or replay")
        if passed and mode != "replay":
            raise LabRuntimeError("passed chapters must be replayed in an isolated workspace")
        if not passed and mode != "canonical":
            raise LabRuntimeError("the current chapter uses the canonical workspace")
        identifier = session_id or str(uuid.uuid4())
        replay: dict[str, str] | None = None
        base_commit = self._resolve_commit("HEAD^{commit}")
        if mode == "replay":
            try:
                replay = self.orchestrator.checkpoints.create_replay_checkout(
                    chapter=chapter,
                    session_id=identifier,
                    checkpoint_ref=checkpoint,
                    checkouts_root=self.replay_root,
                )
            except CheckpointError as error:
                raise LabRuntimeError(str(error)) from error
            base_commit = replay["commit_oid"]
        else:
            self._resolve_commit(f"refs/tags/{checkpoint}^{{commit}}")
        try:
            session = self.sessions.start(
                chapter,
                current_step=str(steps[0]["id"]),
                workspace_mode=mode,
                workspace_key=replay["workspace_key"] if replay else None,
                workspace_ref=replay["checkpoint_ref"] if replay else None,
                base_commit=base_commit,
                session_id=identifier,
            )
        except LabSessionError as error:
            if replay is not None:
                try:
                    self.orchestrator.checkpoints.remove_replay_checkout(
                        workspace_key=replay["workspace_key"],
                        checkpoint_ref=replay["checkpoint_ref"],
                        base_commit=replay["commit_oid"],
                        checkouts_root=self.replay_root,
                    )
                except CheckpointError:
                    pass
            raise LabRuntimeError(str(error)) from error
        if replay is not None:
            self.sessions.record_event(
                identifier,
                "replay_workspace_created",
                step_id=str(steps[0]["id"]),
                details={
                    "workspace_key": replay["workspace_key"],
                    "checkpoint_ref": replay["checkpoint_ref"],
                    "commit_oid": replay["commit_oid"],
                },
            )
        return session

    def get(self, session_id: str) -> dict[str, Any]:
        return self._session(session_id)

    def list(self, *, chapter: str | None = None) -> list[dict[str, Any]]:
        try:
            return self.sessions.list(chapter=chapter)
        except LabSessionError as error:
            raise LabRuntimeError(str(error)) from error

    def snapshot(self, session_id: str) -> dict[str, Any]:
        """Reconstruct one workbench from server-owned durable and Git state."""
        session = self._session(session_id)
        manifest = self._manifest(str(session["chapter"]))
        current_step = self._step(manifest, str(session["current_step"]))
        declared_steps = {
            str(action.get("id")): str(action.get("step") or "")
            for action in manifest.get("actions") or []
            if isinstance(action, dict) and action.get("id")
        }
        rows = self.conn.execute(
            """
            SELECT id, chapter, session_id, step_id, action_id, action, command,
                   exit_code, output, started_at, duration_ms, attached_to_journal
            FROM lab_attempts WHERE session_id=? ORDER BY id DESC LIMIT ?
            """,
            (session_id, MAX_SNAPSHOT_ATTEMPTS),
        ).fetchall()
        attempts: list[dict[str, Any]] = []
        for row in rows:
            attempt = dict(row)
            action_id = str(attempt.get("action_id") or "")
            declared_step = declared_steps.get(action_id)
            attempt["declared_evidence"] = declared_step is not None and (
                not declared_step or declared_step == attempt.get("step_id")
            )
            attempt["command"] = redact_configured_output(attempt.get("command") or "")[:2000]
            attempt["output"] = redact_configured_output(attempt.get("output") or "")[
                :MAX_RECAP_TEXT
            ]
            attempts.append(attempt)

        events = []
        for event in self.sessions.events(session_id)[-MAX_SNAPSHOT_EVENTS:]:
            safe_event = dict(event)
            safe_event["details"] = redact_configured(dict(event.get("details") or {}))
            events.append(safe_event)
        checkpoints = []
        for checkpoint in self.sessions.checkpoints(session_id):
            safe_checkpoint = dict(checkpoint)
            safe_checkpoint["metadata"] = redact_configured(dict(checkpoint.get("metadata") or {}))
            checkpoints.append(safe_checkpoint)

        manager = self._terminals.get(session_id)
        workspace: dict[str, Any] = {
            "mode": str(session["workspace_mode"]),
            "key": session.get("workspace_key"),
            "ref": session.get("workspace_ref"),
            "available": False,
            "terminal_active": bool(manager is not None and manager.has_active_session(session_id)),
        }
        try:
            workspace["git"] = self._git_summary(session)
            workspace["available"] = True
        except LabRuntimeError as error:
            workspace["error"] = redact_configured_output(error)[:2000]

        return {
            "schema": 1,
            "session": session,
            "manifest": manifest,
            "current_step": current_step,
            "attempts": attempts,
            "events": events,
            "checkpoints": checkpoints,
            "workspace": workspace,
        }

    def pause(self, session_id: str) -> dict[str, Any]:
        try:
            return self.sessions.pause(session_id)
        except LabSessionError as error:
            raise LabRuntimeError(str(error)) from error

    def resume(self, session_id: str) -> dict[str, Any]:
        self.workspace_for_session(session_id)
        try:
            return self.sessions.resume(session_id)
        except LabSessionError as error:
            raise LabRuntimeError(str(error)) from error

    def abandon(self, session_id: str) -> dict[str, Any]:
        session = self._session(session_id)
        if session["status"] not in {"in_progress", "paused", "proof_ready"}:
            raise LabRuntimeError("only an active lab session can be abandoned")
        manager = self._terminals.get(session_id)
        if manager is not None and manager.has_active_session(session_id):
            raise LabRuntimeError("close the active terminal before abandoning the replay")
        removed: Path | None = None
        if session["workspace_mode"] == "replay":
            try:
                removed = self.orchestrator.checkpoints.remove_replay_checkout(
                    workspace_key=str(session["workspace_key"] or ""),
                    checkpoint_ref=str(session["workspace_ref"] or ""),
                    base_commit=str(session["base_commit"] or ""),
                    checkouts_root=self.replay_root,
                )
            except CheckpointError as error:
                raise LabRuntimeError(str(error)) from error
        try:
            abandoned = self.sessions.transition(session_id, "abandoned")
        except LabSessionError as error:
            raise LabRuntimeError(str(error)) from error
        self._drop_terminal_manager(session_id)
        if removed is not None:
            self.sessions.record_event(
                session_id,
                "replay_workspace_removed",
                step_id=str(session["current_step"]),
                details={"workspace_key": session["workspace_key"]},
            )
        return abandoned

    def workspace_for_session(self, session_id: str) -> Path:
        """Resolve the active source root without accepting a browser path."""
        session = self._session(session_id)
        if session["workspace_mode"] == "canonical":
            if session.get("workspace_key") or session.get("workspace_ref"):
                raise LabRuntimeError("canonical session has invalid replay workspace metadata")
            return self.repository
        if session["workspace_mode"] != "replay":
            raise LabRuntimeError("lab session has an unknown workspace mode")
        expected_ref = f"chapter-{session['chapter']}-start"
        if session.get("workspace_ref") != expected_ref:
            raise LabRuntimeError("replay workspace ref does not match the session chapter")
        expected_key = self.orchestrator.checkpoints.replay_workspace_key(
            str(session["chapter"]), session_id
        )
        if session.get("workspace_key") != expected_key:
            raise LabRuntimeError("replay workspace identity does not match the lab session")
        try:
            return self.orchestrator.checkpoints.validate_replay_checkout(
                workspace_key=str(session.get("workspace_key") or ""),
                checkpoint_ref=str(session.get("workspace_ref") or ""),
                base_commit=str(session.get("base_commit") or ""),
                checkouts_root=self.replay_root,
            )
        except CheckpointError as error:
            raise LabRuntimeError(f"replay workspace validation failed: {error}") from error

    def file_service(self, session_id: str) -> WorkspaceFileService:
        session = self._session(session_id)
        return WorkspaceFileService(
            self.workspace_for_session(session_id),
            self._manifest(str(session["chapter"])),
        )

    def terminal_manager(self, session_id: str) -> LabTerminalManager:
        self._session(session_id)
        workspace = self.workspace_for_session(session_id)
        manager = self._terminals.get(session_id)
        if manager is None:
            manager = LabTerminalManager(workspace, self.conn)
            self._terminals[session_id] = manager
        elif manager.workspace != workspace:
            raise LabRuntimeError("terminal manager workspace no longer matches the lab session")
        return manager

    def _drop_terminal_manager(self, session_id: str) -> None:
        """Release a finished session's terminal manager so managers stay bounded."""
        self._terminals.pop(session_id, None)

    def advance_step(self, session_id: str, next_step: str) -> dict[str, Any]:
        session = self._active_session(session_id)
        steps = self._steps(self._manifest(str(session["chapter"])))
        identifiers = [str(step["id"]) for step in steps]
        try:
            current_index = identifiers.index(str(session["current_step"]))
        except ValueError as error:
            raise LabRuntimeError("session step is not declared by its manifest") from error
        expected = identifiers[current_index + 1] if current_index + 1 < len(identifiers) else None
        if next_step != expected:
            raise LabRuntimeError(
                f"step transition must use the next ordered step: {expected or 'none'}"
            )
        try:
            return self.sessions.transition(
                session_id,
                "in_progress",
                current_step=next_step,
                details={"manifest_order_verified": True},
            )
        except LabSessionError as error:
            raise LabRuntimeError(str(error)) from error

    # Declared actions, hints, and markers ------------------------------

    def begin_action(self, session_id: str, action_id: str) -> dict[str, Any]:
        """Validate a declared action and capture its execution plan.

        Split from :meth:`finish_action` so the caller can execute the command
        without holding the lock that serializes shared SQLite state.
        """
        session = self._active_session(session_id)
        manifest = self._manifest(str(session["chapter"]))
        current_step = self._step(manifest, str(session["current_step"]))
        action = next(
            (
                item
                for item in manifest.get("actions") or []
                if isinstance(item, dict) and item.get("id") == action_id
            ),
            None,
        )
        if action is None or action_id not in current_step.get("actions", []):
            raise LabRuntimeError(
                f"action {action_id!r} is not declared for the current step "
                f"{session['current_step']}"
            )
        declared_step = action.get("step")
        if declared_step is not None and declared_step != session["current_step"]:
            raise LabRuntimeError("manifest action step does not match the current step")

        if action.get("kind") != "command":
            event = self.sessions.record_event(
                session_id,
                "declared_action_opened",
                step_id=str(session["current_step"]),
                details={"action_id": action_id, "kind": str(action.get("kind") or "")},
            )
            return {
                "kind": str(action.get("kind") or ""),
                "session": session,
                "result": {
                    "action": dict(action),
                    "requires_learner_input": True,
                    "event": event,
                },
            }

        payload = {
            "chapter": str(session["chapter"]),
            "action": action_id,
            "action_id": action_id,
            "session_id": session_id,
            "step_id": str(session["current_step"]),
        }
        return {
            "kind": "command",
            "session": session,
            "payload": payload,
            "workspace": self.workspace_for_session(session_id),
        }

    def run_prepared_action(self, prepared: Mapping[str, Any]) -> dict[str, Any]:
        """Execute one validated action; touches no shared SQLite state."""
        return self._action_runner(prepared["payload"], workspace=prepared["workspace"])

    def finish_action(
        self, prepared: Mapping[str, Any], result: Mapping[str, Any]
    ) -> dict[str, Any]:
        """Attach one executed action's attempt to durable session evidence."""
        payload = prepared["payload"]
        if result.get("error"):
            raise LabRuntimeError(str(result["error"]))
        attempt_id = result.get("id")
        if not isinstance(attempt_id, int):
            raise LabRuntimeError("declared action did not persist a lab attempt")
        cursor = self.conn.execute(
            """
            UPDATE lab_attempts SET session_id=?, step_id=?, action_id=?
            WHERE id=? AND chapter=?
            """,
            (
                payload["session_id"],
                payload["step_id"],
                payload["action_id"],
                attempt_id,
                payload["chapter"],
            ),
        )
        if cursor.rowcount != 1:
            self.conn.rollback()
            raise LabRuntimeError("declared action attempt is missing from durable evidence")
        self.conn.commit()
        self.sessions.record_event(
            payload["session_id"],
            "action_completed",
            step_id=payload["step_id"],
            details={
                "action_id": payload["action_id"],
                "attempt_id": attempt_id,
                "exit_code": int(result.get("exit_code", -1)),
            },
        )
        return {
            **result,
            "session_id": payload["session_id"],
            "step_id": payload["step_id"],
            "action_id": payload["action_id"],
        }

    def run_action(self, session_id: str, action_id: str) -> dict[str, Any]:
        prepared = self.begin_action(session_id, action_id)
        if prepared["kind"] != "command":
            return prepared["result"]
        result = self.run_prepared_action(prepared)
        return self.finish_action(prepared, result)

    def reveal_hint(self, session_id: str) -> dict[str, Any]:
        session = self._active_session(session_id)
        step = self._step(self._manifest(str(session["chapter"])), str(session["current_step"]))
        hints = step.get("hints") or []
        prior = [
            event
            for event in self.sessions.events(session_id)
            if event["event_type"] == "hint_revealed"
            and event["step_id"] == session["current_step"]
        ]
        if len(prior) >= len(hints):
            raise LabRuntimeError("all three hints for this step are already revealed")
        hint = dict(hints[len(prior)])
        self.sessions.record_event(
            session_id,
            "hint_revealed",
            step_id=str(session["current_step"]),
            details={
                "hint_id": str(hint.get("id") or ""),
                "level": int(hint.get("level") or len(prior) + 1),
                "prompt": str(hint.get("prompt") or ""),
            },
        )
        return hint

    def add_creator_marker(
        self,
        session_id: str,
        kind: str,
        note: str = "",
    ) -> dict[str, Any]:
        session = self._session(session_id)
        if kind not in CREATOR_MARKERS:
            raise LabRuntimeError(
                "creator marker must be failure, surprise, decision, breakthrough, or next_step"
            )
        safe_note = redact_configured_output(note)[:MAX_RECAP_TEXT]
        return self.sessions.record_event(
            session_id,
            "creator_marker",
            step_id=str(session["current_step"]),
            details={"kind": kind, "note": safe_note},
        )

    # Git checkpoint delegation ----------------------------------------

    def create_checkpoint(self, session_id: str, label: str) -> dict[str, Any]:
        session = self._session(session_id)
        self._require_checkpointable_session(session)
        self._require_no_active_terminal(session_id, "create a checkpoint")
        try:
            return self._orchestrator_for_session(session).create_checkpoint(
                session_id=session_id,
                chapter=str(session["chapter"]),
                label=label,
            )
        except LabOrchestrationError as error:
            raise LabRuntimeError(str(error)) from error

    def prepare_restore(self, session_id: str, checkpoint_ref: str) -> dict[str, Any]:
        session = self._session(session_id)
        self._require_checkpointable_session(session)
        self._require_no_active_terminal(session_id, "prepare a restore")
        try:
            return self._orchestrator_for_session(session).prepare_restore(
                session_id=session_id, checkpoint_ref=checkpoint_ref
            )
        except LabOrchestrationError as error:
            raise LabRuntimeError(str(error)) from error

    def confirm_restore(self, session_id: str, checkpoint_ref: str, token: str) -> dict[str, Any]:
        session = self._session(session_id)
        self._require_checkpointable_session(session)
        self._require_no_active_terminal(session_id, "confirm a restore")
        try:
            return self._orchestrator_for_session(session).confirm_restore(
                session_id=session_id, checkpoint_ref=checkpoint_ref, token=token
            )
        except LabOrchestrationError as error:
            raise LabRuntimeError(str(error)) from error

    # Curated recap and completion authority ---------------------------

    def preview_recap(
        self,
        session_id: str,
        *,
        attempt_ids: Sequence[int],
        reflections: Mapping[str, str],
    ) -> dict[str, Any]:
        """Render only explicitly selected, redacted evidence.

        Terminal output, chat turns, traces, and semantic memory are not queried
        here.  The live journal is summarized separately and remains untrusted
        learner-authored context.
        """
        session = self._session(session_id)
        manifest = self._manifest(str(session["chapter"]))
        completion = manifest.get("completion") or {}
        selected = self._selected_attempts(session, manifest, attempt_ids)
        safe_reflections = self._safe_reflections(completion, reflections, required=False)
        journal = self.journal.get(str(session["chapter"])) or {}
        safe_journal = {
            field: redact_configured_output(journal.get(field) or "")[:MAX_RECAP_TEXT]
            for field in JOURNAL_FIELDS
            if str(journal.get(field) or "").strip()
        }
        markers = [
            redact_configured(event)
            for event in self.sessions.events(session_id)[-MAX_SNAPSHOT_EVENTS:]
            if event["event_type"] == "creator_marker"
        ]
        git_state = self._git_summary(session)
        destination = str(
            completion.get("recap_destination")
            or (manifest.get("recap") or {}).get("destination")
            or ""
        )
        lines = [
            f"# Chapter {session['chapter']} lab recap",
            "",
            f"Session: `{session_id}`",
            f"Commit: `{git_state['commit']}`",
            f"Completion tag: `{git_state['completion_tag'] or 'not created'}`",
            "",
            "## Selected evidence",
            "",
        ]
        if selected:
            for attempt in selected:
                lines.extend(
                    [
                        f"### Attempt {attempt['id']} - {attempt['action_id']}",
                        "",
                        f"- Step: `{attempt['step_id']}`",
                        f"- Exit: `{attempt['exit_code']}`",
                        f"- Duration: `{attempt['duration_ms']} ms`",
                        "",
                        "```text",
                        str(attempt["output"]),
                        "```",
                        "",
                    ]
                )
        else:
            lines.extend(["No attempts explicitly selected.", ""])
        lines.extend(["## Reflection", ""])
        for field in completion.get("reflection_fields") or []:
            lines.extend(
                [
                    f"### {str(field).replace('_', ' ').title()}",
                    "",
                    safe_reflections.get(field) or "Not provided.",
                    "",
                ]
            )
        lines.extend(["## Learning journal summary", "", "```json"])
        lines.append(json.dumps(safe_journal, ensure_ascii=False, indent=2, sort_keys=True))
        lines.extend(["```", "", "## Creator markers", ""])
        if markers:
            for marker in markers:
                detail = marker["details"]
                lines.append(f"- **{detail.get('kind')}**: {detail.get('note') or '(no note)'}")
        else:
            lines.append("No creator markers selected.")
        lines.extend(
            ["", "## Git diff summary", "", "```text", git_state["diff_summary"], "```", ""]
        )
        return {
            "session_id": session_id,
            "chapter": str(session["chapter"]),
            "destination": destination,
            "attempt_ids": [int(item["id"]) for item in selected],
            "reflections": safe_reflections,
            "journal": safe_journal,
            "markers": markers,
            "git": git_state,
            "content": "\n".join(lines),
        }

    def export_recap(
        self,
        session_id: str,
        *,
        attempt_ids: Sequence[int],
        reflections: Mapping[str, str],
    ) -> dict[str, Any]:
        session = self._session(session_id)
        manifest = self._manifest(str(session["chapter"]))
        completion = manifest.get("completion") or {}
        safe_reflections = self._safe_reflections(completion, reflections, required=True)
        recap = self.preview_recap(
            session_id, attempt_ids=attempt_ids, reflections=safe_reflections
        )
        destination = self._recap_path(session, str(recap["destination"]))
        content = str(recap["content"])
        workspace = self.workspace_for_session(str(session["id"]))
        with workspace_mutation_lock(workspace):
            destination.parent.mkdir(parents=True, exist_ok=True)
            handle = tempfile.NamedTemporaryFile(
                mode="w",
                encoding="utf-8",
                dir=destination.parent,
                prefix=f".{destination.name}.",
                suffix=".tmp",
                delete=False,
            )
            try:
                with handle:
                    handle.write(content)
                os.replace(handle.name, destination)
            except BaseException:
                Path(handle.name).unlink(missing_ok=True)
                raise
        content_sha256 = hashlib.sha256(content.encode("utf-8")).hexdigest()
        event = self.sessions.record_event(
            session_id,
            "recap_exported",
            step_id=str(session["current_step"]),
            details={
                "destination": str(recap["destination"]),
                "attempt_ids": recap["attempt_ids"],
                "reflection_fields": sorted(safe_reflections),
                "content_sha256": content_sha256,
            },
        )
        return {
            **recap,
            "exported": True,
            "content_sha256": content_sha256,
            "event": event,
        }

    def validate_completion(
        self,
        session_id: str,
        *,
        final_commit: str,
        completion_ref: str,
    ) -> dict[str, Any]:
        session = self._session(session_id)
        self._require_no_active_terminal(session_id, "validate completion")
        chapter = str(session["chapter"])
        self._assert_completion_evidence(session)
        if session["workspace_mode"] == "replay":
            raise LabRuntimeError(
                "replay sessions cannot move learner completion tags; use complete_replay"
            )
        if session["status"] == "in_progress":
            try:
                session = self.sessions.transition(
                    session_id,
                    "proof_ready",
                    details={"manifest_evidence_verified": True},
                )
            except LabSessionError as error:
                raise LabRuntimeError(str(error)) from error
        if session["status"] != "proof_ready":
            raise LabRuntimeError("completion requires an in-progress or proof-ready session")
        try:
            passed = self.orchestrator.mark_passed(
                session_id=session_id,
                chapter=chapter,
                final_commit=final_commit,
                completion_ref=completion_ref,
            )
        except LabOrchestrationError as error:
            raise LabRuntimeError(str(error)) from error
        self._drop_terminal_manager(session_id)
        return passed

    def complete_replay(self, session_id: str) -> dict[str, Any]:
        """Record replay proof without changing canonical learner completion tags."""
        session = self._session(session_id)
        if session["workspace_mode"] != "replay":
            raise LabRuntimeError("only an isolated replay session can complete as a replay")
        if session["status"] not in {"in_progress", "proof_ready"}:
            raise LabRuntimeError("replay completion requires an active proof-ready session")
        self._require_no_active_terminal(session_id, "complete the replay")
        self._assert_completion_evidence(session)
        workspace = self.workspace_for_session(session_id)
        status = self._git_at(workspace, "status", "--porcelain", "--untracked-files=all")
        if status.strip():
            raise LabRuntimeError("replay workspace must be clean and committed before completion")
        replay_commit = self._git_at(workspace, "rev-parse", "--verify", "HEAD^{commit}").strip()
        chapter = str(session["chapter"])
        authority_ref = f"learner/chapter-{chapter}-passed"
        if chapter == "00" and authority_ref not in self._tags():
            authority_ref = "chapter-00-solution"
        authority_commit = self._resolve_commit(f"refs/tags/{authority_ref}^{{commit}}")
        event = self.sessions.record_event(
            session_id,
            "replay_completed",
            step_id=str(session["current_step"]),
            details={
                "replay_commit": replay_commit,
                "existing_completion_ref": authority_ref,
                "existing_completion_commit": authority_commit,
                "learner_tag_moved": False,
            },
        )
        if session["status"] == "in_progress":
            try:
                session = self.sessions.transition(
                    session_id,
                    "proof_ready",
                    details={"replay_evidence_verified": True, "learner_tag_moved": False},
                )
            except LabSessionError as error:
                raise LabRuntimeError(str(error)) from error
        if session["status"] != "proof_ready":
            raise LabRuntimeError("replay completion requires an active proof-ready session")
        self._drop_terminal_manager(session_id)
        return {"session": session, "event": event, "replay_commit": replay_commit}

    def reference_solution_allowed(self, session_id: str) -> bool:
        session = self._session(session_id)
        return session["status"] in {"passed", "abandoned"} or (
            session["workspace_mode"] == "replay"
            and self._passed(str(session["chapter"]), self._tags())
        )

    # Trusted, transient coaching enrichment ---------------------------

    def enrich_learning_context(self, context: LearningContext, session_id: str) -> LearningContext:
        session = self._session(session_id)
        if context.chapter != session["chapter"]:
            raise LabRuntimeError("learning context chapter does not match the lab session")
        manifest = self._manifest(str(session["chapter"]))
        declared = {
            str(action.get("id")): str(action.get("step") or "")
            for action in manifest.get("actions") or []
            if isinstance(action, dict) and action.get("id")
        }
        rows = self.conn.execute(
            """
            SELECT id, step_id, action_id, exit_code, output, duration_ms, started_at
            FROM lab_attempts WHERE session_id=? ORDER BY id DESC LIMIT 12
            """,
            (session_id,),
        ).fetchall()
        attempts = []
        for row in rows:
            value = dict(row)
            action_id = str(value.get("action_id") or "")
            if action_id not in declared:
                continue
            declared_step = declared[action_id]
            if declared_step and value.get("step_id") != declared_step:
                continue
            value["output"] = redact_configured_output(value.get("output") or "")[:2000]
            attempts.append(value)
        hints = [
            redact_configured(
                {
                    "step_id": event["step_id"],
                    "hint_id": event["details"].get("hint_id"),
                    "level": event["details"].get("level"),
                    "prompt": event["details"].get("prompt"),
                }
            )
            for event in self.sessions.events(session_id)
            if event["event_type"] == "hint_revealed"
        ]
        journal = self.journal.get(str(session["chapter"])) or {}
        journal_summary = {
            field: redact_configured_output(journal.get(field) or "")[:2000]
            for field in JOURNAL_FIELDS
            if str(journal.get(field) or "").strip()
        }
        return context.with_lab_enrichment(
            current_step=str(session["current_step"]),
            recent_attempts=attempts,
            revealed_hints=hints,
            journal_summary=journal_summary,
            git_diff_summary=self._git_summary(session)["diff_summary"],
            reference_solution_allowed=self.reference_solution_allowed(session_id),
        )

    # Internal contract helpers ----------------------------------------

    def _assert_completion_evidence(self, session: Mapping[str, Any]) -> None:
        session_id = str(session["id"])
        chapter = str(session["chapter"])
        manifest = self._manifest(chapter)
        prove_step = str(self._steps(manifest)[-1]["id"])
        if session["current_step"] != prove_step:
            raise LabRuntimeError("completion requires the final prove step")
        completion = manifest.get("completion") or {}
        deterministic_action = str(
            (completion.get("deterministic_check") or {}).get("action") or ""
        )
        successes = self.conn.execute(
            """
            SELECT id FROM lab_attempts
            WHERE session_id=? AND chapter=? AND step_id=? AND action_id=? AND exit_code=0
            ORDER BY id DESC
            """,
            (session_id, chapter, prove_step, deterministic_action),
        ).fetchall()
        if not successes:
            raise LabRuntimeError(
                "completion requires a successful manifest-declared deterministic action"
            )
        missing = [
            str(item.get("path"))
            for item in completion.get("decision_artifacts") or []
            if not self._workspace_file(session, str(item.get("path") or "")).is_file()
        ]
        if missing:
            raise LabRuntimeError("completion requires decision artifacts: " + ", ".join(missing))
        export = next(
            (
                event
                for event in reversed(self.sessions.events(session_id))
                if event["event_type"] == "recap_exported"
            ),
            None,
        )
        required_reflections = set(completion.get("reflection_fields") or [])
        if (
            export is None
            or set(export["details"].get("reflection_fields") or []) != required_reflections
        ):
            raise LabRuntimeError(
                "completion requires an exported recap with every required reflection field"
            )
        selected_attempts = set(export["details"].get("attempt_ids") or [])
        if not any(int(success["id"]) in selected_attempts for success in successes):
            raise LabRuntimeError(
                "completion requires selected successful deterministic evidence in the recap"
            )
        recap_destination = str(completion.get("recap_destination") or "")
        recap_path = self._recap_path(session, recap_destination)
        exported_hash = str(export["details"].get("content_sha256") or "")
        current_hash = ""
        if recap_path.is_file():
            with recap_path.open("rb") as handle:
                blob = handle.read(MAX_RECAP_FILE_BYTES + 1)
            if len(blob) <= MAX_RECAP_FILE_BYTES:
                current_hash = hashlib.sha256(blob).hexdigest()
        if (
            export["details"].get("destination") != recap_destination
            or not exported_hash
            or not hmac.compare_digest(exported_hash, current_hash)
        ):
            raise LabRuntimeError("the curated recap changed since it was exported")

    def _startable_manifest(self, chapter: str) -> tuple[dict[str, Any], bool]:
        manifest = self._manifest(chapter)
        if manifest.get("state") != "runnable":
            raise LabRuntimeError(
                f"Chapter {chapter} is visible as a preview but is not executable yet"
            )
        tags = self._tags()
        passed = self._passed(chapter, tags)
        current = self._current_chapter(tags)
        if not passed and chapter != current:
            raise LabRuntimeError(
                f"Chapter {chapter} is neither the current chapter ({current or 'none'}) nor passed"
            )
        return manifest, passed

    def _selected_attempts(
        self,
        session: Mapping[str, Any],
        manifest: Mapping[str, Any],
        attempt_ids: Sequence[int],
    ) -> list[dict[str, Any]]:
        identifiers = []
        if len(attempt_ids) > MAX_SNAPSHOT_ATTEMPTS:
            raise LabRuntimeError(
                f"selected attempt IDs are limited to {MAX_SNAPSHOT_ATTEMPTS}"
            )
        for value in attempt_ids:
            if not isinstance(value, int) or value <= 0:
                raise LabRuntimeError("selected attempt IDs must be positive integers")
            if value not in identifiers:
                identifiers.append(value)
        declared: dict[str, set[str]] = {}
        for action in manifest.get("actions") or []:
            if not isinstance(action, dict) or not action.get("id"):
                continue
            action_id = str(action["id"])
            action_step = str(action.get("step") or "")
            declared[action_id] = (
                {action_step}
                if action_step
                else {
                    str(step.get("id"))
                    for step in manifest.get("steps") or []
                    if isinstance(step, dict) and action_id in (step.get("actions") or [])
                }
            )
        selected: list[dict[str, Any]] = []
        for identifier in identifiers:
            row = self.conn.execute(
                """
                SELECT id, chapter, session_id, step_id, action_id, action, command,
                       exit_code, output, started_at, duration_ms
                FROM lab_attempts WHERE id=? AND session_id=? AND chapter=?
                """,
                (identifier, session["id"], session["chapter"]),
            ).fetchone()
            if row is None:
                raise LabRuntimeError(
                    f"selected attempt {identifier} does not belong to this lab session"
                )
            attempt = dict(row)
            if attempt.get("action_id") not in declared:
                raise LabRuntimeError(
                    f"selected attempt {identifier} is not a manifest-declared action"
                )
            if attempt.get("step_id") not in declared[str(attempt["action_id"])]:
                raise LabRuntimeError(
                    f"selected attempt {identifier} does not match its manifest step"
                )
            attempt["command"] = redact_configured_output(attempt.get("command") or "")[:2000]
            attempt["output"] = redact_configured_output(attempt.get("output") or "")[
                :MAX_RECAP_TEXT
            ]
            selected.append(attempt)
        return selected

    @staticmethod
    def _safe_reflections(
        completion: Mapping[str, Any],
        reflections: Mapping[str, str],
        *,
        required: bool,
    ) -> dict[str, str]:
        if not isinstance(reflections, Mapping):
            raise LabRuntimeError("reflections must be a field-to-text mapping")
        result: dict[str, str] = {}
        missing: list[str] = []
        for field in completion.get("reflection_fields") or []:
            raw = reflections.get(str(field))
            value = redact_configured_output(raw or "").strip()[:MAX_RECAP_TEXT]
            if value:
                result[str(field)] = value
            elif required:
                missing.append(str(field))
        if missing:
            raise LabRuntimeError("required reflection fields are missing: " + ", ".join(missing))
        return result

    def _git_summary(self, session: Mapping[str, Any]) -> dict[str, Any]:
        workspace = self.workspace_for_session(str(session["id"]))
        chapter = str(session["chapter"])
        commit = self._git_at(workspace, "rev-parse", "--verify", "HEAD^{commit}").strip()
        expected_tag = f"learner/chapter-{chapter}-passed"
        tag_oid = self._git_at(
            workspace,
            "rev-parse",
            "--verify",
            "--quiet",
            f"refs/tags/{expected_tag}^{{commit}}",
            check=False,
        ).strip()
        status = self._git_at(workspace, "status", "--short", "--untracked-files=all")
        diff_stat = self._git_at(workspace, "diff", "--stat", "--no-ext-diff")
        summary = "\n".join(item for item in (status.strip(), diff_stat.strip()) if item)
        return {
            "commit": commit,
            "completion_tag": expected_tag if tag_oid == commit else None,
            "clean": not bool(status.strip()),
            "diff_summary": redact_configured_output(summary or "clean workspace")[
                :MAX_GIT_SUMMARY
            ],
        }

    def _recap_path(self, session: Mapping[str, Any], relative: str) -> Path:
        workspace = self.workspace_for_session(str(session["id"]))
        if not relative or Path(relative).is_absolute():
            raise LabRuntimeError("manifest recap destination must be a workspace-relative path")
        destination = (workspace / relative).resolve(strict=False)
        if destination == workspace or workspace not in destination.parents:
            raise LabRuntimeError("manifest recap destination escapes the active workspace")
        current = workspace
        for part in Path(relative).parts:
            current = current / part
            if current.is_symlink():
                raise LabRuntimeError("manifest recap destination must not traverse symlinks")
        if ".git" in Path(relative).parts:
            raise LabRuntimeError("manifest recap destination cannot write protected Git internals")
        return destination

    def _workspace_file(self, session: Mapping[str, Any], relative: str) -> Path:
        workspace = self.workspace_for_session(str(session["id"]))
        if not relative or Path(relative).is_absolute():
            return workspace / "__invalid_required_artifact__"
        path = (workspace / relative).resolve(strict=False)
        if path == workspace or workspace not in path.parents or ".git" in Path(relative).parts:
            return workspace / "__invalid_required_artifact__"
        return path

    def _orchestrator_for_session(self, session: Mapping[str, Any]) -> LabOrchestrator:
        if session["workspace_mode"] == "canonical":
            return self.orchestrator
        return LabOrchestrator(
            self.sessions,
            GitCheckpointManager(self.workspace_for_session(str(session["id"]))),
        )

    def _manifest(self, chapter: str) -> dict[str, Any]:
        try:
            _contract, labs = load_curriculum_contract(
                self.curriculum_root, known_tags=self._tags()
            )
        except LabManifestError as error:
            raise LabRuntimeError(str(error)) from error
        manifest = labs.get(chapter)
        if manifest is None:
            raise LabRuntimeError(f"unknown curriculum chapter: {chapter}")
        return manifest

    def _current_chapter(self, tags: set[str]) -> str | None:
        try:
            _contract, labs = load_curriculum_contract(self.curriculum_root)
        except LabManifestError as error:
            raise LabRuntimeError(str(error)) from error
        for chapter, manifest in sorted(labs.items()):
            if manifest.get("state") == "runnable" and not self._passed(chapter, tags):
                return chapter
        return None

    @staticmethod
    def _passed(chapter: str, tags: set[str]) -> bool:
        return f"learner/chapter-{chapter}-passed" in tags or (
            chapter == "00" and "chapter-00-solution" in tags
        )

    @staticmethod
    def _steps(manifest: Mapping[str, Any]) -> list[dict[str, Any]]:
        steps = manifest.get("steps") or []
        if not isinstance(steps, list) or not steps:
            raise LabRuntimeError("runnable lab has no ordered steps")
        return [dict(step) for step in steps]

    def _step(self, manifest: Mapping[str, Any], step_id: str) -> dict[str, Any]:
        step = next((item for item in self._steps(manifest) if item.get("id") == step_id), None)
        if step is None:
            raise LabRuntimeError(f"step {step_id!r} is not declared by the lab manifest")
        return step

    def _session(self, session_id: str) -> dict[str, Any]:
        try:
            return self.sessions.get(session_id)
        except LabSessionError as error:
            raise LabRuntimeError(str(error)) from error

    def _active_session(self, session_id: str) -> dict[str, Any]:
        session = self._session(session_id)
        if session["status"] != "in_progress":
            raise LabRuntimeError("declared actions require an in-progress lab session")
        return session

    def _require_no_active_terminal(self, session_id: str, operation: str) -> None:
        manager = self._terminals.get(session_id)
        if manager is not None and manager.has_active_session(session_id):
            raise LabRuntimeError(f"close the active terminal before you {operation}")

    @staticmethod
    def _require_checkpointable_session(session: Mapping[str, Any]) -> None:
        if session["status"] not in {"in_progress", "paused"}:
            raise LabRuntimeError(
                "checkpoint and restore require an in-progress or paused lab session"
            )

    def _tags(self) -> set[str]:
        output = self._git("tag", "--list")
        return {line for line in output.splitlines() if line}

    def _resolve_commit(self, ref: str) -> str:
        oid = self._git("rev-parse", "--verify", "--quiet", ref, check=False).strip()
        if not oid:
            raise LabRuntimeError(f"required Git checkpoint does not exist: {ref}")
        return oid

    def _git(self, *args: str, check: bool = True) -> str:
        return self._git_at(self.repository, *args, check=check)

    @staticmethod
    def _git_at(
        repository: Path,
        *args: str,
        check: bool = True,
        timeout: float = GIT_TIMEOUT_SECONDS,
    ) -> str:
        try:
            result = subprocess.run(
                ["git", *args],
                cwd=repository,
                text=True,
                capture_output=True,
                check=False,
                timeout=timeout,
            )
        except subprocess.TimeoutExpired as error:
            raise LabRuntimeError(
                f"Git command timed out after {timeout:g}s: git {args[0]}"
            ) from error
        if check and result.returncode:
            detail = result.stderr.strip() or result.stdout.strip() or "Git command failed"
            raise LabRuntimeError(detail)
        return result.stdout
