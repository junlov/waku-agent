"""Seed, run, health-check, and recover the mutable Waku sandbox workspace."""

from __future__ import annotations

import hashlib
import json
import os
import shutil
import signal
import subprocess
import sys
import tempfile
import time
import urllib.request
import uuid
from datetime import datetime, timezone
from pathlib import Path

from waku.ops.workspace_policy import (
    PROTECTED_GITIGNORE_PATTERNS,
    is_protected_workspace_path,
    validate_isolated_paths,
)


COPY_IGNORED_NAMES = {
    ".beads",
    ".mypy_cache",
    ".pytest_cache",
    ".ruff_cache",
    ".venv",
    "__pycache__",
    "build",
    "dist",
    "node_modules",
}

CURRICULUM_REMOTE_REF = "refs/remotes/waku-seed/curriculum"
UPGRADE_REF_PREFIX = "refs/waku/upgrades/"


def _ignore(_directory: str, names: list[str]) -> set[str]:
    return {
        name
        for name in names
        if name in COPY_IGNORED_NAMES
        or name.endswith(".pyc")
        or is_protected_workspace_path(name)
    }


def copy_tree(source: Path, destination: Path) -> None:
    destination.mkdir(parents=True, exist_ok=True)
    shutil.copytree(
        source,
        destination,
        dirs_exist_ok=True,
        ignore=_ignore,
        symlinks=True,
    )


def clear_tree(directory: Path) -> None:
    directory.mkdir(parents=True, exist_ok=True)
    for child in directory.iterdir():
        if child.is_dir() and not child.is_symlink():
            shutil.rmtree(child)
        else:
            child.unlink()


def clear_unprotected_tree(directory: Path) -> None:
    """Remove source files while retaining Git metadata, secrets, and runtime state."""
    directory.mkdir(parents=True, exist_ok=True)
    for child in directory.iterdir():
        if is_protected_workspace_path(child.name):
            continue
        if child.is_dir() and not child.is_symlink():
            clear_unprotected_tree(child)
            if not any(child.iterdir()):
                child.rmdir()
        else:
            child.unlink()


def seed_workspace(seed: Path, workspace: Path) -> bool:
    marker = workspace / ".waku-sandbox-seed"
    if marker.exists():
        return False
    clear_tree(workspace)
    copy_tree(seed, workspace)
    marker.write_text(f"seed={seed}\ncreated={time.time()}\n")
    return True


def _git_env() -> dict[str, str]:
    env = os.environ.copy()
    env.update(
        GIT_AUTHOR_NAME="Waku Curriculum",
        GIT_AUTHOR_EMAIL="waku@localhost",
        GIT_COMMITTER_NAME="Waku Curriculum",
        GIT_COMMITTER_EMAIL="waku@localhost",
    )
    return env


def _git(
    workspace: Path,
    *args: str,
    check: bool = True,
) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", *args],
        cwd=workspace,
        env=_git_env(),
        text=True,
        capture_output=True,
        check=check,
    )


def _bundle_refs(bundle: Path) -> list[str]:
    result = subprocess.run(
        ["git", "bundle", "list-heads", str(bundle)],
        text=True,
        capture_output=True,
        check=True,
    )
    return [line.split(" ", 1)[1] for line in result.stdout.splitlines() if " " in line]


def _bundle_heads(bundle: Path) -> dict[str, str]:
    result = subprocess.run(
        ["git", "bundle", "list-heads", str(bundle)],
        text=True,
        capture_output=True,
        check=True,
    )
    return {
        ref: oid
        for line in result.stdout.splitlines()
        if " " in line
        for oid, ref in [line.split(" ", 1)]
    }


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def verify_bundle_metadata(bundle: Path) -> dict[str, object]:
    """Verify the sanitized bundle and exact ref allowlist before any fetch."""
    metadata_path = bundle.with_name(bundle.name + ".json")
    try:
        metadata = json.loads(metadata_path.read_text())
    except FileNotFoundError as error:
        raise RuntimeError(f"training bundle metadata missing at {metadata_path}") from error
    except (json.JSONDecodeError, OSError) as error:
        raise RuntimeError(f"training bundle metadata is invalid: {error}") from error
    if not isinstance(metadata, dict):
        raise RuntimeError("training bundle metadata must be an object")
    if metadata.get("schema") != 1 or metadata.get("branch") != "scale":
        raise RuntimeError("training bundle metadata must declare schema 1 and branch scale")
    if metadata.get("bundle") != bundle.name:
        raise RuntimeError("training bundle metadata names a different bundle")
    if metadata.get("sha256") != _sha256(bundle):
        raise RuntimeError("training bundle SHA256 does not match metadata")
    declared_refs = metadata.get("refs")
    if not isinstance(declared_refs, list) or any(not isinstance(ref, str) for ref in declared_refs):
        raise RuntimeError("training bundle metadata refs must be a list of strings")
    refs = set(declared_refs)
    if len(refs) != len(declared_refs):
        raise RuntimeError("training bundle metadata refs must be unique")
    if "refs/heads/scale" not in refs or any(
        ref != "refs/heads/scale" and not ref.startswith("refs/tags/chapter-") for ref in refs
    ):
        raise RuntimeError("training bundle refs may contain only scale and immutable chapter tags")
    heads = _bundle_heads(bundle)
    if refs != set(heads):
        raise RuntimeError("training bundle list-heads does not match declared refs")
    if metadata.get("head") != heads["refs/heads/scale"]:
        raise RuntimeError("training bundle declared head does not match refs/heads/scale")
    return metadata


def _bundle_source_ref(bundle: Path) -> str:
    refs = _bundle_refs(bundle)
    for candidate in ("refs/waku/curriculum", "refs/heads/scale"):
        if candidate in refs:
            return candidate
    raise RuntimeError("training bundle must contain refs/waku/curriculum or refs/heads/scale")


def _fetch_bundle(bundle: Path, workspace: Path) -> str:
    verify_bundle_metadata(bundle)
    source_ref = _bundle_source_ref(bundle)
    chapter_tags = sorted(
        ref for ref in _bundle_refs(bundle) if ref.startswith("refs/tags/chapter-")
    )
    _git(
        workspace,
        "fetch",
        "--no-tags",
        str(bundle),
        f"{source_ref}:{CURRICULUM_REMOTE_REF}",
        *(f"{ref}:{ref}" for ref in chapter_tags),
    )
    return _git(workspace, "rev-parse", CURRICULUM_REMOTE_REF).stdout.strip()


def _write_seed_metadata(workspace: Path, bundle: Path, commit: str) -> None:
    git_dir = Path(_git(workspace, "rev-parse", "--git-dir").stdout.strip())
    if not git_dir.is_absolute():
        git_dir = workspace / git_dir
    (git_dir / "waku-seed.json").write_text(
        json.dumps(
            {
                "bundle": bundle.name,
                "curriculum_commit": commit,
                "updated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            },
            indent=2,
        )
        + "\n"
    )


def _pending_path(runtime: Path) -> Path:
    return runtime / "workspace-update-pending.json"


def _mark_pending(runtime: Path, *, reason: str, target: str) -> dict[str, str]:
    runtime.mkdir(parents=True, exist_ok=True)
    payload = {
        "status": "update-pending",
        "reason": reason,
        "target": target,
        "created_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }
    _pending_path(runtime).write_text(json.dumps(payload, indent=2) + "\n")
    return payload


def _pre_upgrade_ref(workspace: Path, label: str) -> str:
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
    ref = f"{UPGRADE_REF_PREFIX}{stamp}-{label}-{uuid.uuid4().hex[:8]}"
    _git(workspace, "update-ref", ref, "HEAD")
    return ref


def _merge_candidate(workspace: Path, target: str, runtime: Path) -> tuple[str | None, str]:
    worktrees = runtime / "upgrade-worktrees"
    worktrees.mkdir(parents=True, exist_ok=True)
    candidate = Path(tempfile.mkdtemp(prefix="candidate-", dir=worktrees))
    candidate.rmdir()
    try:
        _git(workspace, "worktree", "add", "--detach", str(candidate), "HEAD")
        merge = _git(candidate, "merge", "--no-edit", target, check=False)
        if merge.returncode:
            detail = merge.stderr.strip() or merge.stdout.strip() or "curriculum merge conflicted"
            return None, detail
        return _git(candidate, "rev-parse", "HEAD").stdout.strip(), ""
    finally:
        _git(workspace, "worktree", "remove", "--force", str(candidate), check=False)
        shutil.rmtree(candidate, ignore_errors=True)


def _adopt_legacy_workspace(bundle: Path, workspace: Path, runtime: Path) -> dict[str, str]:
    """Put existing no-Git files under history without replacing any learner content."""
    _git(workspace, "init", "-b", "scale")
    exclude = workspace / ".git/info/exclude"
    with exclude.open("a") as handle:
        handle.write(
            "\n" + "\n".join((*PROTECTED_GITIGNORE_PATTERNS, ".waku-sandbox-seed")) + "\n"
        )
    _git(workspace, "add", "-A")
    _git(workspace, "commit", "--allow-empty", "-m", "Preserve pre-Git Waku workspace")
    legacy = _git(workspace, "rev-parse", "HEAD").stdout.strip()
    target = _fetch_bundle(bundle, workspace)
    recovery_ref = _pre_upgrade_ref(workspace, "pre-adopt")
    same_tree = _git(workspace, "diff", "--quiet", legacy, target, check=False).returncode == 0
    if same_tree:
        _git(workspace, "update-ref", "refs/heads/scale", target, legacy)
        _write_seed_metadata(workspace, bundle, target)
        _pending_path(runtime).unlink(missing_ok=True)
        return {"status": "adopted", "target": target, "recovery_ref": recovery_ref}
    pending = _mark_pending(runtime, reason="legacy workspace differs from curriculum", target=target)
    return {**pending, "recovery_ref": recovery_ref}


def seed_or_upgrade_workspace(bundle: Path, workspace: Path, runtime: Path) -> dict[str, str]:
    """Seed Git history once, then safely merge later curriculum bundle upgrades."""
    if not bundle.is_file():
        raise RuntimeError(f"sanitized training bundle missing at {bundle}")
    runtime.mkdir(parents=True, exist_ok=True)
    workspace.mkdir(parents=True, exist_ok=True)
    if not (workspace / ".git").exists():
        if any(workspace.iterdir()):
            return _adopt_legacy_workspace(bundle, workspace, runtime)
        _git(workspace, "init", "-b", "scale")
        target = _fetch_bundle(bundle, workspace)
        _git(workspace, "checkout", "-B", "scale", target)
        _write_seed_metadata(workspace, bundle, target)
        _pending_path(runtime).unlink(missing_ok=True)
        return {"status": "seeded", "target": target}

    inside = _git(workspace, "rev-parse", "--is-inside-work-tree", check=False)
    if inside.returncode or inside.stdout.strip() != "true":
        raise RuntimeError(f"persistent workspace has an invalid Git repository: {workspace}")
    previous_target = _git(
        workspace, "rev-parse", "--verify", CURRICULUM_REMOTE_REF, check=False,
    ).stdout.strip()
    target = _fetch_bundle(bundle, workspace)
    branch = _git(workspace, "symbolic-ref", "--quiet", "--short", "HEAD", check=False)
    if branch.returncode or branch.stdout.strip() != "scale":
        recovery_ref = _pre_upgrade_ref(workspace, "pre-upgrade")
        current = branch.stdout.strip() or "detached HEAD"
        pending = _mark_pending(
            runtime,
            reason=f"automatic curriculum upgrades require scale; current branch is {current}",
            target=target,
        )
        return {**pending, "recovery_ref": recovery_ref}
    if _git(workspace, "status", "--porcelain", "--untracked-files=all").stdout.strip():
        recovery_ref = _pre_upgrade_ref(workspace, "pre-upgrade")
        pending = _mark_pending(runtime, reason="learner workspace is dirty", target=target)
        return {**pending, "recovery_ref": recovery_ref}
    target_is_integrated = _git(
        workspace, "merge-base", "--is-ancestor", target, "HEAD", check=False,
    ).returncode == 0
    if previous_target == target and target_is_integrated:
        _write_seed_metadata(workspace, bundle, target)
        _pending_path(runtime).unlink(missing_ok=True)
        return {"status": "current", "target": target}
    recovery_ref = _pre_upgrade_ref(workspace, "pre-upgrade")

    merged, detail = _merge_candidate(workspace, target, runtime)
    if merged is None:
        pending = _mark_pending(runtime, reason=detail, target=target)
        return {**pending, "recovery_ref": recovery_ref}
    _git(workspace, "merge", "--ff-only", merged)
    _write_seed_metadata(workspace, bundle, target)
    _pending_path(runtime).unlink(missing_ok=True)
    return {
        "status": "updated",
        "target": target,
        "merged": merged,
        "recovery_ref": recovery_ref,
    }


def replace_checkpoint(workspace: Path, checkpoint: Path) -> None:
    temporary = checkpoint.with_name(checkpoint.name + ".new")
    backup = checkpoint.with_name(checkpoint.name + ".previous")
    if not checkpoint.exists() and backup.exists():
        backup.replace(checkpoint)
    if temporary.exists():
        shutil.rmtree(temporary)
    copy_tree(workspace, temporary)
    if checkpoint.exists() and backup.exists():
        shutil.rmtree(backup)
    try:
        if checkpoint.exists():
            checkpoint.replace(backup)
        temporary.replace(checkpoint)
    except BaseException:
        if not checkpoint.exists() and backup.exists():
            backup.replace(checkpoint)
        raise
    finally:
        if temporary.exists():
            shutil.rmtree(temporary)
    if backup.exists():
        shutil.rmtree(backup)


def restore_checkpoint(checkpoint: Path, workspace: Path) -> None:
    clear_unprotected_tree(workspace)
    copy_tree(checkpoint, workspace)


class Supervisor:
    def __init__(self) -> None:
        self.seed = Path(os.getenv("WAKU_SEED", "/seed"))
        self.bundle = Path(os.getenv("WAKU_TRAINING_BUNDLE", "/seed/waku-training.bundle"))
        self.workspace = Path(os.getenv("WAKU_WORKSPACE", "/workspace"))
        self.runtime = Path(os.getenv("WAKU_RUNTIME", "/var/lib/waku"))
        self.checkpoint = Path(
            os.getenv("WAKU_CHECKPOINT", str(self.runtime / "checkpoints" / "last-good"))
        )
        self.request = self.runtime / "restart.request"
        self.health_url = os.getenv("WAKU_HEALTH_URL", "http://127.0.0.1:7777/api/data")
        self.child: subprocess.Popen | None = None
        self.stopping = False
        self.preserve_workspace_on_failure = False

    def validate_paths(self) -> None:
        resolved = validate_isolated_paths(
            seed=self.seed,
            workspace=self.workspace,
            runtime=self.runtime,
        )
        checkpoint = self.checkpoint.expanduser().resolve()
        if checkpoint == Path(checkpoint.anchor):
            raise RuntimeError(f"checkpoint must not be a filesystem root: {checkpoint}")
        for name in ("seed", "workspace"):
            path = resolved[name]
            if checkpoint == path or checkpoint.is_relative_to(path) or path.is_relative_to(checkpoint):
                raise RuntimeError(
                    f"checkpoint and {name} must be distinct, non-overlapping paths"
                )
        if checkpoint == resolved["runtime"] or not checkpoint.is_relative_to(resolved["runtime"]):
            raise RuntimeError("checkpoint must be an isolated descendant of runtime")
        self.seed = resolved["seed"]
        self.workspace = resolved["workspace"]
        self.runtime = resolved["runtime"]
        self.checkpoint = checkpoint

    def launch(self) -> None:
        env = os.environ.copy()
        env["PYTHONPATH"] = str(self.workspace)
        self.child = subprocess.Popen(
            [sys.executable, "-m", "waku.ops.dashboard"],
            cwd=self.workspace,
            env=env,
        )

    def terminate(self) -> None:
        if self.child is None or self.child.poll() is not None:
            return
        self.child.terminate()
        try:
            self.child.wait(timeout=8)
        except subprocess.TimeoutExpired:
            self.child.kill()
            self.child.wait(timeout=3)

    def healthy(self, timeout: float = 25) -> bool:
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            if self.child is None or self.child.poll() is not None:
                return False
            try:
                with urllib.request.urlopen(self.health_url, timeout=1) as response:
                    if response.status == 200:
                        return True
            except OSError:
                pass
            time.sleep(0.4)
        return False

    def request_due(self) -> bool:
        if not self.request.exists():
            return False
        try:
            payload = json.loads(self.request.read_text())
            return time.time() >= float(payload.get("not_before", 0))
        except (OSError, ValueError, TypeError):
            return True

    def recover_or_exit(self) -> None:
        self.preserve_workspace_on_failure = (
            self.preserve_workspace_on_failure or self._workspace_requires_preservation()
        )
        if self.preserve_workspace_on_failure:
            print(
                "sandbox supervisor: learner workspace is dirty or update-pending; "
                "retrying without last-good restore",
                flush=True,
            )
            self.terminate()
            self.launch()
            if not self.healthy():
                raise RuntimeError(
                    "sandbox candidate remains unhealthy; learner workspace was preserved"
                )
            return
        print("sandbox supervisor: candidate unhealthy; restoring last-known-good", flush=True)
        self.terminate()
        restore_checkpoint(self.checkpoint, self.workspace)
        self.launch()
        if not self.healthy():
            raise RuntimeError("last-known-good sandbox checkpoint is unhealthy")

    def _workspace_requires_preservation(self) -> bool:
        if _pending_path(self.runtime).exists():
            return True
        if not (self.workspace / ".git").exists():
            return False
        status = _git(
            self.workspace, "status", "--porcelain", "--untracked-files=all", check=False,
        )
        return status.returncode != 0 or bool(status.stdout.strip())

    def stop(self, *_args) -> None:
        self.stopping = True
        self.terminate()

    def run(self) -> None:
        self.validate_paths()
        if not self.seed.is_dir():
            raise RuntimeError(f"immutable seed missing at {self.seed}")
        if not self.bundle.is_file():
            raise RuntimeError(f"sanitized training bundle missing at {self.bundle}")
        verify_bundle_metadata(self.bundle)
        self.runtime.mkdir(parents=True, exist_ok=True)
        workspace_result = seed_or_upgrade_workspace(
            self.bundle, self.workspace, self.runtime,
        )
        print(f"sandbox supervisor: workspace {workspace_result['status']}", flush=True)
        checkpoint_candidate = workspace_result["status"] in {"seeded", "adopted", "updated"}
        update_pending = workspace_result["status"] == "update-pending"
        self.preserve_workspace_on_failure = (
            update_pending or self._workspace_requires_preservation()
        )

        signal.signal(signal.SIGTERM, self.stop)
        signal.signal(signal.SIGINT, self.stop)
        self.launch()
        if self.healthy():
            if (
                not self.preserve_workspace_on_failure
                and (checkpoint_candidate or not self.checkpoint.exists())
            ):
                replace_checkpoint(self.workspace, self.checkpoint)
        elif self.checkpoint.exists():
            self.recover_or_exit()
        else:
            self.terminate()
            raise RuntimeError("sandbox candidate is unhealthy and no last-known-good exists")

        while not self.stopping:
            if self.child is not None and self.child.poll() is not None:
                self.recover_or_exit()
            if self.request_due():
                print("sandbox supervisor: validating requested restart", flush=True)
                self.preserve_workspace_on_failure = self._workspace_requires_preservation()
                self.terminate()
                self.launch()
                if self.healthy():
                    if self.preserve_workspace_on_failure:
                        print(
                            "sandbox supervisor: learner workspace healthy; "
                            "last-known-good unchanged",
                            flush=True,
                        )
                    else:
                        replace_checkpoint(self.workspace, self.checkpoint)
                        print("sandbox supervisor: candidate promoted to last-known-good", flush=True)
                else:
                    self.recover_or_exit()
                self.request.unlink(missing_ok=True)
            time.sleep(0.5)


if __name__ == "__main__":
    Supervisor().run()
