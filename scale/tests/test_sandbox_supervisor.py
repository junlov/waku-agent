from __future__ import annotations

import importlib.util
from pathlib import Path


ROOT = Path(__file__).parents[2]
SPEC = importlib.util.spec_from_file_location(
    "sandbox_supervisor", ROOT / "scripts/sandbox_supervisor.py",
)
assert SPEC and SPEC.loader
sandbox_supervisor = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(sandbox_supervisor)


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
