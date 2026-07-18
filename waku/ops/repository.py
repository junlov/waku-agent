"""Dependency-free repository metadata discovery."""

from __future__ import annotations

from pathlib import Path


def repository_tags(root: Path) -> set[str]:
    """Read loose and packed tag refs without requiring Git."""
    git_dir = root / ".git"
    if git_dir.is_file():
        pointer = git_dir.read_text().strip()
        if pointer.startswith("gitdir:"):
            git_dir = (root / pointer.split(":", 1)[1].strip()).resolve()
    common_pointer = git_dir / "commondir"
    if common_pointer.is_file():
        git_dir = (git_dir / common_pointer.read_text().strip()).resolve()
    tags_dir = git_dir / "refs/tags"
    tags = {
        path.relative_to(tags_dir).as_posix()
        for path in tags_dir.rglob("*")
        if path.is_file()
    } if tags_dir.is_dir() else set()
    packed = git_dir / "packed-refs"
    if packed.is_file():
        for line in packed.read_text().splitlines():
            if line.startswith(("#", "^")) or " refs/tags/" not in line:
                continue
            tags.add(line.split(" refs/tags/", 1)[1])
    return tags
