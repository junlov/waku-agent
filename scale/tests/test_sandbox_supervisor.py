from __future__ import annotations

import hashlib
import importlib.util
import json
import subprocess
from pathlib import Path

import pytest


ROOT = Path(__file__).parents[2]
SPEC = importlib.util.spec_from_file_location(
    "sandbox_supervisor", ROOT / "scripts/sandbox_supervisor.py",
)
assert SPEC and SPEC.loader
sandbox_supervisor = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(sandbox_supervisor)


def git(repository: Path, *args: str) -> str:
    return subprocess.run(
        ["git", *args], cwd=repository, text=True, capture_output=True, check=True,
    ).stdout.strip()


def curriculum_repository(tmp_path: Path) -> Path:
    source = tmp_path / "curriculum"
    source.mkdir()
    git(source, "init", "-b", "scale")
    git(source, "config", "user.name", "Curriculum")
    git(source, "config", "user.email", "curriculum@example.test")
    (source / "app.py").write_text("v1\n")
    (source / "docs").mkdir()
    (source / "docs/scale.md").write_text("chapter\n")
    git(source, "add", ".")
    git(source, "commit", "-m", "curriculum v1")
    git(source, "tag", "chapter-00-start")
    return source


def write_bundle(source: Path, bundle: Path) -> None:
    bundle.unlink(missing_ok=True)
    refs = ["refs/heads/scale", "refs/tags/chapter-00-start"]
    git(source, "bundle", "create", str(bundle), *refs)
    head = git(source, "rev-parse", "refs/heads/scale")
    metadata = {
        "schema": 1,
        "branch": "scale",
        "head": head,
        "refs": refs,
        "bundle": bundle.name,
        "sha256": hashlib.sha256(bundle.read_bytes()).hexdigest(),
    }
    bundle.with_name(bundle.name + ".json").write_text(json.dumps(metadata) + "\n")


def test_seed_is_persistent_and_does_not_copy_secrets(tmp_path):
    seed = tmp_path / "seed"
    workspace = tmp_path / "workspace"
    seed.mkdir()
    (seed / "waku.py").write_text("v1")
    (seed / ".env").write_text("SECRET=host")

    assert sandbox_supervisor.seed_workspace(seed, workspace) is True
    (workspace / "waku.py").write_text("self-healed")
    (seed / "waku.py").write_text("v2")

    assert sandbox_supervisor.seed_workspace(seed, workspace) is False
    assert (workspace / "waku.py").read_text() == "self-healed"
    assert not (workspace / ".env").exists()


def test_checkpoint_restores_last_known_good(tmp_path):
    workspace = tmp_path / "workspace"
    checkpoint = tmp_path / "last-good"
    workspace.mkdir()
    (workspace / "app.py").write_text("healthy")
    sandbox_supervisor.replace_checkpoint(workspace, checkpoint)

    (workspace / "app.py").write_text("broken")
    (workspace / "extra.py").write_text("remove me")
    sandbox_supervisor.restore_checkpoint(checkpoint, workspace)

    assert (workspace / "app.py").read_text() == "healthy"
    assert not (workspace / "extra.py").exists()


def test_checkpoint_publish_failure_rolls_back_verified_copy(tmp_path, monkeypatch):
    workspace = tmp_path / "workspace"
    checkpoint = tmp_path / "last-good"
    workspace.mkdir()
    (workspace / "app.py").write_text("verified\n")
    sandbox_supervisor.replace_checkpoint(workspace, checkpoint)
    (workspace / "app.py").write_text("candidate\n")
    original_replace = Path.replace

    def fail_publish(path: Path, target: Path):
        if path.name.endswith(".new"):
            raise OSError("simulated atomic publish failure")
        return original_replace(path, target)

    monkeypatch.setattr(Path, "replace", fail_publish)
    with pytest.raises(OSError, match="simulated atomic publish failure"):
        sandbox_supervisor.replace_checkpoint(workspace, checkpoint)

    assert (checkpoint / "app.py").read_text() == "verified\n"
    assert not checkpoint.with_name("last-good.previous").exists()
    assert not checkpoint.with_name("last-good.new").exists()


def test_last_good_preserves_symlinks_without_copying_external_targets(tmp_path):
    workspace = tmp_path / "workspace"
    checkpoint = tmp_path / "last-good"
    outside_file = tmp_path / "outside-secret.txt"
    outside_dir = tmp_path / "outside-dir"
    workspace.mkdir()
    outside_file.write_text("external file bytes\n")
    outside_dir.mkdir()
    (outside_dir / "secret.txt").write_text("external directory bytes\n")
    (workspace / "file-link").symlink_to(outside_file)
    (workspace / "dir-link").symlink_to(outside_dir, target_is_directory=True)

    sandbox_supervisor.replace_checkpoint(workspace, checkpoint)

    assert (checkpoint / "file-link").is_symlink()
    assert (checkpoint / "dir-link").is_symlink()
    assert (checkpoint / "file-link").readlink() == outside_file
    assert (checkpoint / "dir-link").readlink() == outside_dir
    assert not (checkpoint / "secret.txt").exists()
    (workspace / "file-link").unlink()
    (workspace / "dir-link").unlink()
    sandbox_supervisor.restore_checkpoint(checkpoint, workspace)
    assert (workspace / "file-link").is_symlink()
    assert (workspace / "dir-link").is_symlink()
    assert outside_file.read_text() == "external file bytes\n"
    assert (outside_dir / "secret.txt").read_text() == "external directory bytes\n"


def test_last_good_never_copies_or_restores_git_secrets_or_runtime(tmp_path):
    workspace = tmp_path / "workspace"
    checkpoint = tmp_path / "last-good"
    workspace.mkdir()
    git(workspace, "init", "-b", "scale")
    git(workspace, "config", "user.name", "Learner")
    git(workspace, "config", "user.email", "learner@example.test")
    (workspace / "app.py").write_text("healthy\n")
    git(workspace, "add", "app.py")
    git(workspace, "commit", "-m", "healthy")
    sandbox_supervisor.replace_checkpoint(workspace, checkpoint)

    git(workspace, "config", "waku.sentinel", "preserve")
    git(workspace, "update-ref", "refs/waku/test-preserve", "HEAD")
    (workspace / "app.py").write_text("broken\n")
    (workspace / "extra.py").write_text("remove\n")
    protected = {
        ".env.local": "SECRET=preserve\n",
        ".envrc": "ENVRC=preserve\n",
        ".waku/state.db": "journal\n",
        ".runtime/cache": "runtime\n",
        "state.db": "root db\n",
        "traces/events.jsonl": "trace\n",
        "nested/runtime.db": "nested db\n",
        "nested/runtime.db-journal": "nested journal\n",
    }
    for relative, value in protected.items():
        path = workspace / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(value)

    sandbox_supervisor.restore_checkpoint(checkpoint, workspace)

    assert not (checkpoint / ".git").exists()
    assert not (checkpoint / ".env.local").exists()
    assert not (checkpoint / "state.db").exists()
    assert (workspace / "app.py").read_text() == "healthy\n"
    assert not (workspace / "extra.py").exists()
    assert git(workspace, "config", "--get", "waku.sentinel") == "preserve"
    assert git(workspace, "rev-parse", "refs/waku/test-preserve") == git(
        workspace, "rev-parse", "HEAD",
    )
    for relative, value in protected.items():
        assert (workspace / relative).read_text() == value


def test_bundle_seeds_git_workspace_and_clean_upgrade(tmp_path):
    source = curriculum_repository(tmp_path)
    bundle = tmp_path / "waku-training.bundle"
    workspace = tmp_path / "workspace"
    runtime = tmp_path / "runtime"
    write_bundle(source, bundle)

    seeded = sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)

    assert seeded["status"] == "seeded"
    assert git(workspace, "rev-parse", "--is-inside-work-tree") == "true"
    assert (workspace / "app.py").read_text() == "v1\n"
    assert git(workspace, "tag", "--list", "chapter-00-start") == "chapter-00-start"

    (source / "app.py").write_text("v2\n")
    git(source, "add", "app.py")
    git(source, "commit", "-m", "curriculum v2")
    write_bundle(source, bundle)
    updated = sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)

    assert updated["status"] == "updated"
    assert updated["recovery_ref"].startswith("refs/waku/upgrades/")
    assert (workspace / "app.py").read_text() == "v2\n"
    assert not (runtime / "workspace-update-pending.json").exists()


def test_bundle_upgrade_never_imports_or_replaces_learner_tags(tmp_path):
    source = curriculum_repository(tmp_path)
    bundle = tmp_path / "waku-training.bundle"
    workspace = tmp_path / "workspace"
    runtime = tmp_path / "runtime"
    git(source, "tag", "learner/chapter-00-passed")
    write_bundle(source, bundle)
    sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)
    assert git(workspace, "tag", "--list", "learner/chapter-00-passed") == ""
    git(workspace, "tag", "learner/chapter-00-passed")
    learner_tag = git(workspace, "rev-parse", "refs/tags/learner/chapter-00-passed")

    (source / "app.py").write_text("v2\n")
    git(source, "add", "app.py")
    git(source, "commit", "-m", "curriculum v2")
    git(source, "tag", "-f", "learner/chapter-00-passed")
    write_bundle(source, bundle)
    sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)

    assert git(workspace, "rev-parse", "refs/tags/learner/chapter-00-passed") == learner_tag


@pytest.mark.parametrize("failure", ("missing", "corrupt", "mismatch"))
def test_bundle_metadata_is_verified_before_fetch(tmp_path, failure):
    source = curriculum_repository(tmp_path)
    bundle = tmp_path / "waku-training.bundle"
    workspace = tmp_path / "workspace"
    runtime = tmp_path / "runtime"
    write_bundle(source, bundle)
    metadata_path = bundle.with_name(bundle.name + ".json")
    if failure == "missing":
        metadata_path.unlink()
    elif failure == "corrupt":
        bundle.write_bytes(bundle.read_bytes() + b"corrupt")
    else:
        metadata = json.loads(metadata_path.read_text())
        metadata["head"] = "0" * 40
        metadata_path.write_text(json.dumps(metadata))

    with pytest.raises(RuntimeError, match="metadata|SHA256|declared head"):
        sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)

    if (workspace / ".git").exists():
        assert git(workspace, "for-each-ref") == ""


def test_dirty_or_conflicted_upgrade_is_pending_and_never_overwrites(tmp_path):
    source = curriculum_repository(tmp_path)
    bundle = tmp_path / "waku-training.bundle"
    workspace = tmp_path / "workspace"
    runtime = tmp_path / "runtime"
    write_bundle(source, bundle)
    sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)

    (source / "app.py").write_text("curriculum v2\n")
    git(source, "add", "app.py")
    git(source, "commit", "-m", "curriculum v2")
    write_bundle(source, bundle)
    (workspace / "learner.txt").write_text("do not overwrite\n")
    dirty = sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)

    assert dirty["status"] == "update-pending"
    assert dirty["reason"] == "learner workspace is dirty"
    assert (workspace / "app.py").read_text() == "v1\n"
    assert (workspace / "learner.txt").read_text() == "do not overwrite\n"

    (workspace / "learner.txt").unlink()
    (workspace / "app.py").write_text("learner branch\n")
    git(workspace, "add", "app.py")
    git(workspace, "commit", "-m", "learner change")
    conflicted = sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)

    assert conflicted["status"] == "update-pending"
    assert (workspace / "app.py").read_text() == "learner branch\n"
    assert not (workspace / ".git/MERGE_HEAD").exists()
    assert git(workspace, "status", "--porcelain") == ""


def test_dirty_current_workspace_remains_update_pending(tmp_path):
    source = curriculum_repository(tmp_path)
    bundle = tmp_path / "waku-training.bundle"
    workspace = tmp_path / "workspace"
    runtime = tmp_path / "runtime"
    write_bundle(source, bundle)
    sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)
    (workspace / "learner.txt").write_text("unfinished work\n")

    pending = sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)

    assert pending["status"] == "update-pending"
    assert pending["reason"] == "learner workspace is dirty"
    assert (runtime / "workspace-update-pending.json").is_file()
    assert (workspace / "learner.txt").read_text() == "unfinished work\n"


def test_clean_manual_integration_clears_stale_update_pending(tmp_path):
    source = curriculum_repository(tmp_path)
    bundle = tmp_path / "waku-training.bundle"
    workspace = tmp_path / "workspace"
    runtime = tmp_path / "runtime"
    write_bundle(source, bundle)
    sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)
    (source / "app.py").write_text("curriculum v2\n")
    git(source, "add", "app.py")
    git(source, "commit", "-m", "curriculum v2")
    write_bundle(source, bundle)
    target = sandbox_supervisor._fetch_bundle(bundle, workspace)
    git(workspace, "merge", "--ff-only", target)
    marker = runtime / "workspace-update-pending.json"
    marker.write_text('{"status":"update-pending"}\n')

    current = sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)

    assert current["status"] == "current"
    assert (workspace / "app.py").read_text() == "curriculum v2\n"
    assert not marker.exists()


def test_automatic_upgrade_requires_canonical_scale_branch(tmp_path):
    source = curriculum_repository(tmp_path)
    bundle = tmp_path / "waku-training.bundle"
    workspace = tmp_path / "workspace"
    runtime = tmp_path / "runtime"
    write_bundle(source, bundle)
    sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)
    git(workspace, "switch", "-c", "learner-work")

    (source / "app.py").write_text("curriculum v2\n")
    git(source, "add", "app.py")
    git(source, "commit", "-m", "curriculum v2")
    write_bundle(source, bundle)
    pending = sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)

    assert pending["status"] == "update-pending"
    assert "require scale" in pending["reason"]
    assert git(workspace, "branch", "--show-current") == "learner-work"
    assert (workspace / "app.py").read_text() == "v1\n"


def test_legacy_no_git_workspace_is_adopted_without_overwrite(tmp_path):
    source = curriculum_repository(tmp_path)
    bundle = tmp_path / "waku-training.bundle"
    workspace = tmp_path / "workspace"
    runtime = tmp_path / "runtime"
    write_bundle(source, bundle)
    workspace.mkdir()
    (workspace / "app.py").write_text("learner legacy copy\n")
    (workspace / "notes.md").write_text("preserve me\n")
    (workspace / ".env").write_text("SECRET=preserve\n")
    protected = {
        ".env.local": "LOCAL=preserve\n",
        ".envrc": "ENVRC=preserve\n",
        "production.env": "PROD=preserve\n",
        ".waku/state.db": "journal\n",
        ".runtime/cache": "runtime\n",
        "state.db": "root db\n",
        "traces/events.jsonl": "trace\n",
        "nested/runtime.db": "nested db\n",
        "nested/runtime.db-journal": "nested journal\n",
    }
    for relative, value in protected.items():
        path = workspace / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(value)

    result = sandbox_supervisor.seed_or_upgrade_workspace(bundle, workspace, runtime)

    assert result["status"] == "update-pending"
    assert (workspace / ".git").is_dir()
    assert (workspace / "app.py").read_text() == "learner legacy copy\n"
    assert (workspace / "notes.md").read_text() == "preserve me\n"
    assert (workspace / ".env").read_text() == "SECRET=preserve\n"
    tracked = set(git(workspace, "ls-tree", "-r", "--name-only", "HEAD").splitlines())
    assert not tracked.intersection({".env", *protected})
    for relative, value in protected.items():
        assert (workspace / relative).read_text() == value
    assert subprocess.run(
        ["git", "cat-file", "-e", "HEAD:.env"], cwd=workspace,
    ).returncode != 0


def test_update_pending_never_replaces_verified_last_good(tmp_path, monkeypatch):
    seed = tmp_path / "seed"
    bundle = seed / "waku-training.bundle"
    workspace = tmp_path / "workspace"
    runtime = tmp_path / "runtime"
    checkpoint = runtime / "checkpoints/last-good"
    seed.mkdir()
    bundle.write_text("fixture")
    workspace.mkdir()
    (workspace / "app.py").write_text("pending candidate\n")
    checkpoint.mkdir(parents=True)
    (checkpoint / "app.py").write_text("verified last good\n")
    monkeypatch.setenv("WAKU_SEED", str(seed))
    monkeypatch.setenv("WAKU_TRAINING_BUNDLE", str(bundle))
    monkeypatch.setenv("WAKU_WORKSPACE", str(workspace))
    monkeypatch.setenv("WAKU_RUNTIME", str(runtime))
    monkeypatch.setattr(
        sandbox_supervisor,
        "seed_or_upgrade_workspace",
        lambda *_args: {"status": "update-pending", "target": "fixture"},
    )
    monkeypatch.setattr(sandbox_supervisor, "verify_bundle_metadata", lambda _bundle: {})
    supervisor = sandbox_supervisor.Supervisor()
    supervisor.stopping = True
    monkeypatch.setattr(supervisor, "launch", lambda: None)
    monkeypatch.setattr(supervisor, "healthy", lambda: True)

    supervisor.run()

    assert (checkpoint / "app.py").read_text() == "verified last good\n"
    assert supervisor.preserve_workspace_on_failure is True


@pytest.mark.parametrize("failure", ("bundle", "metadata"))
def test_supervisor_fails_closed_before_mutating_without_verified_seed(
    tmp_path, monkeypatch, failure,
):
    seed = tmp_path / "seed"
    workspace = tmp_path / "workspace"
    runtime = tmp_path / "runtime"
    bundle = seed / "waku-training.bundle"
    seed.mkdir()
    if failure == "metadata":
        bundle.write_text("bundle fixture")
    monkeypatch.setenv("WAKU_SEED", str(seed))
    monkeypatch.setenv("WAKU_TRAINING_BUNDLE", str(bundle))
    monkeypatch.setenv("WAKU_WORKSPACE", str(workspace))
    monkeypatch.setenv("WAKU_RUNTIME", str(runtime))

    with pytest.raises(RuntimeError, match="bundle|metadata"):
        sandbox_supervisor.Supervisor().run()

    assert not workspace.exists()
    assert not runtime.exists()


@pytest.mark.parametrize("layout", ("root", "same", "nested", "checkpoint-in-workspace"))
def test_supervisor_rejects_unsafe_path_layouts_before_mutation(tmp_path, monkeypatch, layout):
    seed = tmp_path / "seed"
    workspace = tmp_path / "workspace"
    runtime = tmp_path / "runtime"
    checkpoint = runtime / "checkpoints/last-good"
    if layout == "root":
        workspace = Path(workspace.anchor)
    elif layout == "same":
        workspace = seed
    elif layout == "nested":
        workspace = seed / "workspace"
    else:
        checkpoint = workspace / "last-good"
    monkeypatch.setenv("WAKU_SEED", str(seed))
    monkeypatch.setenv("WAKU_WORKSPACE", str(workspace))
    monkeypatch.setenv("WAKU_RUNTIME", str(runtime))
    monkeypatch.setenv("WAKU_CHECKPOINT", str(checkpoint))

    with pytest.raises(RuntimeError, match="root|distinct|overlapping|checkpoint"):
        sandbox_supervisor.Supervisor().validate_paths()

    assert not seed.exists()
    assert not runtime.exists()


@pytest.mark.parametrize("state", ("dirty", "update-pending"))
def test_child_failure_never_restores_over_learner_workspace(tmp_path, monkeypatch, state):
    workspace = tmp_path / "workspace"
    runtime = tmp_path / "runtime"
    checkpoint = runtime / "checkpoints/last-good"
    workspace.mkdir(parents=True)
    runtime.mkdir()
    checkpoint.mkdir(parents=True)
    git(workspace, "init", "-b", "scale")
    git(workspace, "config", "user.name", "Learner")
    git(workspace, "config", "user.email", "learner@example.test")
    (workspace / "app.py").write_text("learner source\n")
    git(workspace, "add", "app.py")
    git(workspace, "commit", "-m", "learner source")
    (checkpoint / "app.py").write_text("old last good\n")
    if state == "dirty":
        (workspace / "app.py").write_text("dirty learner source\n")
    else:
        (runtime / "workspace-update-pending.json").write_text("{}\n")
    monkeypatch.setenv("WAKU_WORKSPACE", str(workspace))
    monkeypatch.setenv("WAKU_RUNTIME", str(runtime))
    supervisor = sandbox_supervisor.Supervisor()
    monkeypatch.setattr(supervisor, "launch", lambda: None)
    monkeypatch.setattr(supervisor, "healthy", lambda: False)

    with pytest.raises(RuntimeError, match="learner workspace was preserved"):
        supervisor.recover_or_exit()

    expected = "dirty learner source\n" if state == "dirty" else "learner source\n"
    assert (workspace / "app.py").read_text() == expected
    assert (checkpoint / "app.py").read_text() == "old last good\n"
