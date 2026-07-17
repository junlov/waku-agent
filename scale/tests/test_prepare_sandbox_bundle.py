from __future__ import annotations

import hashlib
import importlib.util
import json
import subprocess
from pathlib import Path

import pytest


ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location(
    "prepare_sandbox_bundle", ROOT / "scripts/prepare_sandbox_bundle.py"
)
assert SPEC and SPEC.loader
prepare_sandbox_bundle = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(prepare_sandbox_bundle)


def _git(root: Path, *args: str) -> str:
    return subprocess.run(
        ["git", *args], cwd=root, check=True, text=True, capture_output=True
    ).stdout.strip()


def _repository(tmp_path: Path) -> Path:
    root = tmp_path / "repo"
    root.mkdir()
    _git(root, "init", "-b", "scale")
    _git(root, "config", "user.name", "Waku Test")
    _git(root, "config", "user.email", "waku@example.invalid")
    (root / ".gitignore").write_text(".env\n")
    (root / "README.md").write_text("# training seed\n")
    _git(root, "add", ".gitignore", "README.md")
    _git(root, "commit", "-m", "seed")
    _git(root, "tag", "chapter-00-start")
    _git(root, "tag", "chapter-00-solution")
    _git(root, "tag", "learner/chapter-00-passed")
    _git(root, "tag", "unrelated-release")
    return root


def test_prepares_verified_bundle_from_scale_and_curriculum_tags(tmp_path: Path) -> None:
    root = _repository(tmp_path)
    output = tmp_path / "published"
    (root / ".env").write_text("API_KEY=do-not-copy\n")

    metadata = prepare_sandbox_bundle.prepare_bundle(root, output)

    bundle = output / prepare_sandbox_bundle.BUNDLE_NAME
    metadata_path = output / prepare_sandbox_bundle.METADATA_NAME
    assert bundle.is_file()
    assert metadata_path.is_file()
    assert metadata == json.loads(metadata_path.read_text())
    assert metadata["head"] == _git(root, "rev-parse", "HEAD")
    assert metadata["sha256"] == hashlib.sha256(bundle.read_bytes()).hexdigest()
    assert "complete history" in _git(root, "bundle", "verify", str(bundle))
    heads = _git(root, "bundle", "list-heads", str(bundle))
    assert "refs/heads/scale" in heads
    assert "refs/tags/chapter-00-start" in heads
    assert "refs/tags/chapter-00-solution" in heads
    assert "refs/tags/learner/chapter-00-passed" not in heads
    assert "unrelated-release" not in heads
    assert "do-not-copy" not in metadata_path.read_text()


def test_refuses_dirty_or_non_scale_checkout(tmp_path: Path) -> None:
    root = _repository(tmp_path)
    output = tmp_path / "published"
    (root / "dirty.txt").write_text("not committed\n")

    with pytest.raises(prepare_sandbox_bundle.BundlePreparationError, match="dirty checkout"):
        prepare_sandbox_bundle.prepare_bundle(root, output)
    assert not output.exists()

    (root / "dirty.txt").unlink()
    _git(root, "switch", "-c", "other")
    with pytest.raises(prepare_sandbox_bundle.BundlePreparationError, match="check out scale"):
        prepare_sandbox_bundle.prepare_bundle(root, output)


def test_refuses_secret_committed_then_deleted_from_scale_history(tmp_path: Path) -> None:
    root = _repository(tmp_path)
    output = tmp_path / "published"
    (root / ".env.local").write_text("API_KEY=tracked-secret\n")
    _git(root, "add", "-f", ".env.local")
    _git(root, "commit", "-m", "unsafe secret")
    _git(root, "rm", ".env.local")
    _git(root, "commit", "-m", "delete unsafe secret")

    with pytest.raises(
        prepare_sandbox_bundle.BundlePreparationError,
        match="reachable from exported history",
    ):
        prepare_sandbox_bundle.prepare_bundle(root, output)
    assert not output.exists()


def test_refuses_secret_reachable_only_from_exported_chapter_tag(tmp_path: Path) -> None:
    root = _repository(tmp_path)
    output = tmp_path / "published"
    (root / "runtime").mkdir()
    (root / "runtime/state.db").write_text("private runtime state\n")
    _git(root, "add", "runtime/state.db")
    _git(root, "commit", "-m", "unsafe tagged state")
    _git(root, "tag", "chapter-01-start")
    _git(root, "rm", "runtime/state.db")
    _git(root, "commit", "-m", "delete tagged state")

    with pytest.raises(
        prepare_sandbox_bundle.BundlePreparationError,
        match="runtime/state.db",
    ):
        prepare_sandbox_bundle.prepare_bundle(root, output)


def test_refuses_all_shared_secret_and_database_sidecar_paths_in_history(
    tmp_path: Path,
) -> None:
    root = _repository(tmp_path)
    output = tmp_path / "published"
    protected = (
        ".envrc",
        ".envrc.local",
        "production.env",
        "nested/.env.staging",
        "nested/.envrc",
        "nested/.env-secret",
        "nested/production.env",
        "nested/service.env",
        "runtime/state.db",
        "runtime/state.db-wal",
        "runtime/state.db-shm",
        "runtime/state.db-journal",
        "runtime/cache.sqlite",
        "runtime/cache.sqlite-wal",
        "runtime/cache.sqlite-shm",
        "runtime/cache.sqlite-journal",
        "runtime/cache.sqlite3",
        "runtime/cache.sqlite3-wal",
        "runtime/cache.sqlite3-shm",
        "runtime/cache.sqlite3-journal",
    )
    for relative in protected:
        path = root / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(f"protected: {relative}\n")
    _git(root, "add", "-f", *protected)
    _git(root, "commit", "-m", "unsafe secret and runtime history")
    _git(root, "rm", *protected)
    _git(root, "commit", "-m", "remove unsafe paths")

    with pytest.raises(prepare_sandbox_bundle.BundlePreparationError) as captured:
        prepare_sandbox_bundle.prepare_bundle(root, output)

    for relative in protected:
        assert relative in str(captured.value)
    assert not output.exists()


def test_allows_tracked_environment_templates_in_exported_history(tmp_path: Path) -> None:
    root = _repository(tmp_path)
    output = tmp_path / "published"
    templates = (
        ".env.example",
        "config/.env.sample",
        "nested/config/.env.template",
    )
    for relative in templates:
        path = root / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text("PLACEHOLDER=replace-me\n")
    _git(root, "add", *templates)
    _git(root, "commit", "-m", "document safe environment templates")

    metadata = prepare_sandbox_bundle.prepare_bundle(root, output)

    assert metadata["head"] == _git(root, "rev-parse", "HEAD")
    assert (output / prepare_sandbox_bundle.BUNDLE_NAME).is_file()


def test_learner_only_tag_is_not_exported_or_scanned(tmp_path: Path) -> None:
    root = _repository(tmp_path)
    output = tmp_path / "published"
    _git(root, "switch", "--orphan", "learner-secret")
    (root / ".env.production").write_text("API_KEY=learner-only\n")
    _git(root, "add", "-f", ".env.production")
    _git(root, "commit", "-m", "learner-only history")
    _git(root, "tag", "learner/chapter-99-passed")
    _git(root, "switch", "scale")

    metadata = prepare_sandbox_bundle.prepare_bundle(root, output)
    heads = _git(root, "bundle", "list-heads", str(output / prepare_sandbox_bundle.BUNDLE_NAME))

    assert all(not ref.startswith("refs/tags/learner/") for ref in metadata["refs"])
    assert "learner/chapter-99-passed" not in heads
    assert "refs/tags/chapter-00-start" in heads


def test_atomically_replaces_prior_published_bundle(tmp_path: Path) -> None:
    root = _repository(tmp_path)
    output = tmp_path / "published"
    first = prepare_sandbox_bundle.prepare_bundle(root, output)
    (root / "README.md").write_text("# updated training seed\n")
    _git(root, "add", "README.md")
    _git(root, "commit", "-m", "update")

    second = prepare_sandbox_bundle.prepare_bundle(root, output)

    assert second["head"] != first["head"]
    assert second["sha256"] != first["sha256"]
    assert not output.with_name(output.name + ".previous").exists()
    assert not list(tmp_path.glob(".published.staging-*"))


def test_container_build_uses_bundle_without_raw_git_metadata() -> None:
    dockerignore = {
        line.strip()
        for line in (ROOT / ".dockerignore").read_text().splitlines()
        if line.strip() and not line.lstrip().startswith("#")
    }
    dockerfile = (ROOT / "Dockerfile").read_text()
    makefile = (ROOT / "Makefile").read_text()

    assert ".git" in dockerignore
    assert ".waku-build" not in dockerignore
    assert "COPY .git" not in dockerfile
    assert "COPY . ." not in dockerfile
    assert "COPY .waku-build/waku-training.bundle /seed/waku-training.bundle" in dockerfile
    assert "sandbox-bundle:" in makefile
    assert "docker-dashboard: sandbox-bundle" in makefile
