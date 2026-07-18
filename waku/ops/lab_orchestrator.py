"""Coordinate Git-backed lab authority with SQLite experience state."""

from __future__ import annotations

import subprocess
from typing import Any

from waku.ops.lab_checkpoint import CheckpointError, GitCheckpointManager
from waku.ops.lab_sessions import LabSessionError, LabSessionStore
from waku.ops.workspace_policy import workspace_mutation_lock

GIT_TIMEOUT_SECONDS = 60


class LabOrchestrationError(RuntimeError):
    """Git and SQLite lab state could not be reconciled safely."""


class LabOrchestrator:
    """Keep Git authority and resumable lab metadata linked explicitly."""

    def __init__(
        self,
        sessions: LabSessionStore,
        checkpoints: GitCheckpointManager,
    ) -> None:
        self.sessions = sessions
        self.checkpoints = checkpoints

    def create_checkpoint(
        self,
        *,
        session_id: str,
        chapter: str,
        label: str,
        checkpoint_type: str = "manual",
    ) -> dict[str, Any]:
        """Capture source state and record the exact resulting Git object."""
        session = self._session_for_chapter(session_id, chapter)
        try:
            captured = self.checkpoints.capture(
                chapter=chapter,
                session_id=session_id,
                label=label,
                kind=checkpoint_type,
            )
            recorded = self.sessions.record_checkpoint(
                session_id,
                name=captured["label"],
                git_ref=captured["ref"],
                checkpoint_type=captured["kind"],
                commit_sha=captured["commit_oid"],
                metadata={
                    "chapter": captured["chapter"],
                    "created_at": captured["created_at"],
                    "step_id": session["current_step"],
                },
            )
        except (CheckpointError, LabSessionError) as error:
            raise LabOrchestrationError(str(error)) from error
        return recorded

    def prepare_restore(self, *, session_id: str, checkpoint_ref: str) -> dict[str, Any]:
        """Preview a session-owned checkpoint restore without changing Git state."""
        session = self._session(session_id)
        recorded = self._recorded_checkpoint(session_id, checkpoint_ref)
        try:
            with workspace_mutation_lock(self.checkpoints.repository):
                preview = self.checkpoints.prepare_restore(checkpoint_ref)
                self._require_recorded_target(recorded, preview["target_oid"])
                self.sessions.record_event(
                    session_id,
                    "restore_prepared",
                    step_id=str(session["current_step"]),
                    details={
                        "checkpoint_name": recorded["name"],
                        "checkpoint_ref": checkpoint_ref,
                        "target_oid": preview["target_oid"],
                    },
                )
        except (CheckpointError, LabSessionError) as error:
            raise LabOrchestrationError(str(error)) from error
        return preview

    def confirm_restore(
        self,
        *,
        session_id: str,
        checkpoint_ref: str,
        token: str,
    ) -> dict[str, Any]:
        """Restore a recorded checkpoint and retain its pre-restore recovery ref."""
        session = self._session(session_id)
        recorded = self._recorded_checkpoint(session_id, checkpoint_ref)
        try:
            with workspace_mutation_lock(self.checkpoints.repository):
                preview = self.checkpoints.prepare_restore(checkpoint_ref)
                self._require_recorded_target(recorded, preview["target_oid"])
                restored = self.checkpoints.confirm_restore(
                    ref=checkpoint_ref,
                    token=token,
                    chapter=str(session["chapter"]),
                    session_id=session_id,
                )
                self._require_recorded_target(recorded, restored["target_oid"])
                recovery = restored["recovery"]
                recovery_record = self.sessions.record_checkpoint(
                    session_id,
                    name=f"pre-restore-{recovery['commit_oid'][:12]}",
                    git_ref=recovery["ref"],
                    checkpoint_type="pre-restore",
                    commit_sha=recovery["commit_oid"],
                    metadata={
                        "created_at": recovery["created_at"],
                        "restored_checkpoint_name": recorded["name"],
                        "restored_checkpoint_ref": checkpoint_ref,
                        "restored_target_oid": restored["target_oid"],
                    },
                )
                self.sessions.record_event(
                    session_id,
                    "restore_confirmed",
                    step_id=str(session["current_step"]),
                    details={
                        "checkpoint_name": recorded["name"],
                        "checkpoint_ref": checkpoint_ref,
                        "recovery_ref": recovery["ref"],
                        "target_oid": restored["target_oid"],
                    },
                )
        except (CheckpointError, LabSessionError) as error:
            raise LabOrchestrationError(str(error)) from error
        return {**restored, "recovery_checkpoint": recovery_record}

    def mark_passed(
        self,
        *,
        session_id: str,
        chapter: str,
        final_commit: str,
        completion_ref: str,
    ) -> dict[str, Any]:
        """Mirror a pass only after the exact learner tag proves clean Git state."""
        session = self._session_for_chapter(session_id, chapter)
        if session["status"] != "proof_ready":
            raise LabOrchestrationError("only a proof-ready lab session can be marked passed")

        expected_ref = f"learner/chapter-{chapter}-passed"
        if completion_ref != expected_ref:
            raise LabOrchestrationError(
                f"completion ref must be exactly {expected_ref} for chapter {chapter}"
            )
        tag_oid = self._resolve_commit(f"refs/tags/{completion_ref}^{{commit}}")
        if final_commit != tag_oid:
            raise LabOrchestrationError("final commit does not match the learner completion tag")
        head_oid = self._resolve_commit("HEAD^{commit}")
        if head_oid != final_commit:
            raise LabOrchestrationError("current HEAD does not match the final commit")
        if self._git("status", "--porcelain", "--untracked-files=all").stdout.strip():
            raise LabOrchestrationError("current workspace must be clean before passing")

        try:
            return self.sessions.transition(
                session_id,
                "passed",
                final_commit=tag_oid,
                completion_ref=completion_ref,
                details={"git_authority_verified": True},
            )
        except LabSessionError as error:
            raise LabOrchestrationError(str(error)) from error

    def _session_for_chapter(self, session_id: str, chapter: str) -> dict[str, Any]:
        session = self._session(session_id)
        if session["chapter"] != chapter:
            raise LabOrchestrationError(
                f"lab session {session_id} belongs to chapter {session['chapter']}, not {chapter}"
            )
        return session

    def _session(self, session_id: str) -> dict[str, Any]:
        try:
            return self.sessions.get(session_id)
        except LabSessionError as error:
            raise LabOrchestrationError(str(error)) from error

    def _recorded_checkpoint(self, session_id: str, checkpoint_ref: str) -> dict[str, Any]:
        try:
            recorded = next(
                (
                    checkpoint
                    for checkpoint in self.sessions.checkpoints(session_id)
                    if checkpoint["git_ref"] == checkpoint_ref
                ),
                None,
            )
        except LabSessionError as error:
            raise LabOrchestrationError(str(error)) from error
        if recorded is None:
            raise LabOrchestrationError(
                "restore checkpoint is not recorded for this lab session"
            )
        return recorded

    @staticmethod
    def _require_recorded_target(recorded: dict[str, Any], target_oid: str) -> None:
        recorded_oid = recorded.get("commit_sha")
        if not recorded_oid or recorded_oid != target_oid:
            raise LabOrchestrationError(
                "checkpoint ref no longer resolves to its session-recorded commit"
            )

    def _resolve_commit(self, ref: str) -> str:
        result = self._git("rev-parse", "--verify", "--quiet", ref, check=False)
        oid = result.stdout.strip()
        if result.returncode or not oid:
            raise LabOrchestrationError(f"required Git commit does not exist: {ref}")
        return oid

    def _git(
        self,
        *args: str,
        check: bool = True,
        timeout: float = GIT_TIMEOUT_SECONDS,
    ) -> subprocess.CompletedProcess[str]:
        try:
            return subprocess.run(
                ["git", *args],
                cwd=self.checkpoints.repository,
                text=True,
                capture_output=True,
                check=check,
                timeout=timeout,
            )
        except subprocess.TimeoutExpired as error:
            raise LabOrchestrationError(
                f"Git command timed out after {timeout:g}s: git {args[0]}"
            ) from error
        except subprocess.CalledProcessError as error:
            detail = error.stderr.strip() or error.stdout.strip() or "Git command failed"
            raise LabOrchestrationError(detail) from error
