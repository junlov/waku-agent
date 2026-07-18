"""Non-blocking red proofs for the guided curriculum workbench.

These contracts describe the next workbench slice without pretending it already
exists.  ``strict=True`` turns an eventual unexpected pass into a prompt to
replace the red proof with ordinary acceptance coverage.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def test_curriculum_labs_reference_five_step_manifests() -> None:
    curriculum = json.loads((ROOT / "docs/scale/curriculum.json").read_text())
    expected_phases = ["observe", "explain", "decide", "repair", "prove"]
    manifests_root = (ROOT / "docs/scale/labs").resolve()

    for chapter in curriculum["chapters"]:
        lab = chapter["lab"]
        assert isinstance(lab.get("manifest"), str)
        manifest_path = (ROOT / lab["manifest"]).resolve()
        assert manifest_path.is_relative_to(manifests_root)
        manifest = json.loads(manifest_path.read_text())
        assert manifest["chapter"] == chapter["number"]
        assert [step["phase"] for step in manifest["steps"]] == expected_phases
        step_ids = [step["id"] for step in manifest["steps"]]
        assert len(step_ids) == len(set(step_ids))


def test_dashboard_declares_editor_and_pty_workbench_apis() -> None:
    backend = "\n".join(
        path.read_text() for path in sorted((ROOT / "waku/ops").glob("*.py"))
    )

    for operation in (
        "/api/lab/file/list",
        "/api/lab/file/read",
        "/api/lab/file/save",
        "/api/lab/terminal/stream",
        "/api/lab/terminal/input",
        "/api/lab/terminal/resize",
        "/api/lab/terminal/close",
    ):
        assert operation in backend


def test_workbench_declares_per_chapter_checkpoint_and_restore() -> None:
    checkpoint_modules = sorted((ROOT / "waku/ops").glob("*checkpoint*.py"))
    supervisor = (ROOT / "scripts/sandbox_supervisor.py").read_text()

    assert checkpoint_modules
    contract = "\n".join(path.read_text() for path in checkpoint_modules)
    assert "refs/waku/checkpoints/" in contract
    assert "GIT_INDEX_FILE" in contract
    assert "preview" in contract
    assert "confirm" in contract
    assert "refs/waku/checkpoints/" not in supervisor
    assert "GIT_INDEX_FILE" not in supervisor


def test_fresh_docker_seed_contains_git_history() -> None:
    ignored = {
        line.strip()
        for line in (ROOT / ".dockerignore").read_text().splitlines()
        if line.strip() and not line.lstrip().startswith("#")
    }
    dockerfile = (ROOT / "Dockerfile").read_text()
    supervisor = (ROOT / "scripts/sandbox_supervisor.py").read_text()
    prepare = (ROOT / "scripts/prepare_sandbox_bundle.py").read_text()

    assert ".git" in ignored
    assert "bundle" in dockerfile.lower()
    assert '"bundle", "create"' in prepare
    assert "seed_or_upgrade_workspace" in supervisor
    assert '"fetch"' in supervisor
    assert "rev-parse" in supervisor and "--is-inside-work-tree" in supervisor
