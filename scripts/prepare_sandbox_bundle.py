#!/usr/bin/env python3
"""Publish a sanitized Git bundle for the container training workspace."""

from __future__ import annotations

import hashlib
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from waku.ops.workspace_policy import is_protected_workspace_path


ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = ROOT / ".waku-build"
BUNDLE_NAME = "waku-training.bundle"
METADATA_NAME = "waku-training.bundle.json"
TAG_PREFIX = "refs/tags/chapter-"


class BundlePreparationError(RuntimeError):
    """The checkout cannot safely produce a committed curriculum seed."""


def _git(root: Path, *args: str) -> str:
    process = subprocess.run(
        ["git", *args],
        cwd=root,
        check=False,
        text=True,
        capture_output=True,
    )
    if process.returncode:
        detail = (process.stderr or process.stdout).strip()
        raise BundlePreparationError(f"git {' '.join(args)} failed: {detail}")
    return process.stdout.strip()


def _bundle_refs(root: Path) -> list[str]:
    branch = _git(root, "branch", "--show-current")
    if branch != "scale":
        raise BundlePreparationError(
            f"refusing to build the training bundle from branch {branch or '(detached)'}; "
            "check out scale first"
        )

    dirty = _git(root, "status", "--porcelain", "--untracked-files=all")
    if dirty:
        raise BundlePreparationError(
            "refusing to build the training bundle from a dirty checkout; commit or "
            "stash the listed work first. The sandbox seed contains committed scale HEAD only.\n"
            + dirty
        )

    tag_lines = _git(
        root,
        "for-each-ref",
        "--format=%(refname)",
        "refs/tags/chapter-*",
    )
    tags = sorted(
        line
        for line in tag_lines.splitlines()
        if line and line.startswith(TAG_PREFIX)
    )
    refs = ["refs/heads/scale", *tags]
    sensitive = _sensitive_history_paths(root, refs)
    if sensitive:
        raise BundlePreparationError(
            "refusing to bundle secrets or runtime state reachable from exported history; "
            "remove these paths from the scale/chapter-tag history before building the "
            "sandbox seed:\n" + "\n".join(sensitive)
        )
    return refs


def _sensitive_history_paths(root: Path, refs: list[str]) -> list[str]:
    """Return protected paths from every commit reachable by exported refs."""
    objects = _git(root, "rev-list", "--objects", *refs).splitlines()
    paths = (line.split(" ", 1)[1] for line in objects if " " in line)
    return sorted({path for path in paths if is_protected_workspace_path(path)})


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def _publish_directory(staging: Path, destination: Path) -> None:
    """Atomically publish a verified directory and retain rollback on failure."""
    backup = destination.with_name(destination.name + ".previous")
    if backup.exists():
        shutil.rmtree(backup)
    if destination.exists():
        os.replace(destination, backup)
    try:
        os.replace(staging, destination)
    except BaseException:
        if backup.exists() and not destination.exists():
            os.replace(backup, destination)
        raise
    if backup.exists():
        shutil.rmtree(backup)


def prepare_bundle(root: Path = ROOT, output_dir: Path = OUTPUT_DIR) -> dict[str, object]:
    """Create and verify a bundle containing only committed curriculum refs."""
    root = root.resolve()
    output_dir = output_dir.resolve()
    refs = _bundle_refs(root)
    head = _git(root, "rev-parse", "HEAD")
    output_dir.parent.mkdir(parents=True, exist_ok=True)
    staging = Path(
        tempfile.mkdtemp(prefix=f".{output_dir.name}.staging-", dir=output_dir.parent)
    )
    bundle = staging / BUNDLE_NAME
    try:
        _git(root, "bundle", "create", str(bundle), *refs)
        _git(root, "bundle", "verify", str(bundle))
        metadata: dict[str, object] = {
            "schema": 1,
            "branch": "scale",
            "head": head,
            "refs": refs,
            "bundle": BUNDLE_NAME,
            "sha256": _sha256(bundle),
        }
        (staging / METADATA_NAME).write_text(
            json.dumps(metadata, indent=2, sort_keys=True) + "\n"
        )
        _publish_directory(staging, output_dir)
        return metadata
    except BaseException:
        if staging.exists():
            shutil.rmtree(staging)
        raise


def main() -> int:
    try:
        metadata = prepare_bundle()
    except BundlePreparationError as error:
        print(f"sandbox bundle: FAILING: {error}", file=sys.stderr)
        return 2
    print(
        "sandbox bundle: prepared "
        f"{OUTPUT_DIR / BUNDLE_NAME} at {metadata['head']} ({metadata['sha256']})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
