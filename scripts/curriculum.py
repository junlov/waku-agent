#!/usr/bin/env python3
"""Small, dependency-free state machine for the scale curriculum."""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

CHAPTERS = tuple(f"{number:02d}" for number in range(11))


def available_chapters(tags: set[str]) -> list[str]:
    """Return chapters whose reproducible start point has been published."""
    return [chapter for chapter in CHAPTERS if f"chapter-{chapter}-start" in tags]


def learner_passed(tags: set[str], chapter: str) -> bool:
    """Keep learner evidence separate from maintainer reference solutions."""
    if f"learner/chapter-{chapter}-passed" in tags:
        return True
    # Chapter 0 is an instructor-built calibration, not a learner solution.
    return chapter == "00" and "chapter-00-solution" in tags


def current_chapter(tags: set[str]) -> str | None:
    for chapter in available_chapters(tags):
        if not learner_passed(tags, chapter):
            return chapter
    return None


def artifact_errors(chapter: str, root: Path) -> list[str]:
    if chapter != "01":
        return []

    path = root / "docs/scale/SLO.md"
    if not path.is_file():
        return [
            "docs/scale/SLO.md is missing; write and commit the Chapter 1 service contract"
        ]

    text = path.read_text().casefold()
    required = [
        (
            "100-tenant p95 target",
            re.compile(r"(?:\b100\b[^\n]*\bp95\b|\bp95\b[^\n]*\b100\b)"),
        ),
        (
            "500-tenant p95 target",
            re.compile(r"(?:\b500\b[^\n]*\bp95\b|\bp95\b[^\n]*\b500\b)"),
        ),
        ("error-rate budget", re.compile(r"\berror[ -]rate\b")),
        ("tenant-isolation invariant", re.compile(r"\btenant[ -]isolation\b")),
        ("memory round-trip invariant", re.compile(r"\bmemory[ -]round[ -]trip\b")),
    ]
    return [f"docs/scale/SLO.md is missing the {label}" for label, pattern in required if not pattern.search(text)]


def git_output(root: Path, *args: str) -> str:
    return subprocess.run(
        ["git", *args], cwd=root, check=True, text=True, capture_output=True
    ).stdout.strip()


def repository_tags(root: Path) -> set[str]:
    output = git_output(root, "tag", "--list")
    return set(output.splitlines()) if output else set()


def validate_artifacts(chapter: str, root: Path) -> int:
    errors = artifact_errors(chapter, root)
    if errors:
        for error in errors:
            print(f"artifact: FAILING: {error}", file=sys.stderr)
        return 1
    print(f"chapter {chapter} artifacts: passing")
    return 0


def describe_current(root: Path, number_only: bool) -> int:
    tags = repository_tags(root)
    current = current_chapter(tags)
    if number_only:
        if current:
            print(current)
        return 0

    if current:
        print(f"current chapter: {current} (grade with: make check-{current})")
        briefs = sorted((root / "docs/scale").glob(f"{current}-*.md"))
        if briefs:
            print(f"brief: {briefs[0].relative_to(root)}")
        return 0

    available = available_chapters(tags)
    if available:
        print(
            f"all currently authored chapters passed (curriculum available through {available[-1]})"
        )
    else:
        print("no runnable curriculum chapters are tagged")
    return 0


def begin_chapter(chapter: str, root: Path) -> int:
    tags = repository_tags(root)
    current = current_chapter(tags)
    if chapter != current:
        detail = f"current chapter is {current}" if current else "no authored chapter is active"
        print(f"cannot begin chapter {chapter}: {detail}", file=sys.stderr)
        return 2

    learner_tag = f"learner/chapter-{chapter}-start"
    if learner_tag in tags:
        print(f"chapter {chapter} already began at {learner_tag}")
        return 0
    if git_output(root, "status", "--porcelain"):
        print("commit harness or handoff changes before beginning a chapter", file=sys.stderr)
        return 2

    subprocess.run(
        ["git", "tag", "-a", learner_tag, "-m", f"Learner began chapter {chapter}"],
        cwd=root,
        check=True,
    )
    print(f"chapter {chapter}: began at {learner_tag}")
    return 0


def complete_chapter(chapter: str, root: Path) -> int:
    if chapter not in CHAPTERS:
        print(f"unknown chapter: {chapter}", file=sys.stderr)
        return 2

    tags = repository_tags(root)
    if chapter not in available_chapters(tags):
        print(f"chapter {chapter} is not runnable yet: its start tag is absent", file=sys.stderr)
        return 2

    learner_tag = f"learner/chapter-{chapter}-passed"
    if learner_tag in tags:
        print(f"chapter {chapter} is already marked passed")
        return 0
    if f"learner/chapter-{chapter}-start" not in tags:
        print(
            f"chapter {chapter} has no learner start tag; run curriculum.py begin {chapter} first",
            file=sys.stderr,
        )
        return 2

    if git_output(root, "status", "--porcelain"):
        print(
            "commit the chapter solution and PROGRESS.md handoff before marking it passed",
            file=sys.stderr,
        )
        return 2

    result = subprocess.run(["make", f"check-{chapter}"], cwd=root, check=False)
    if result.returncode:
        print(f"chapter {chapter} remains active because its check failed", file=sys.stderr)
        return result.returncode

    subprocess.run(
        [
            "git",
            "tag",
            "-a",
            learner_tag,
            "-m",
            f"Learner passed chapter {chapter}",
        ],
        cwd=root,
        check=True,
    )
    print(f"chapter {chapter}: passed and tagged {learner_tag}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)

    current = subparsers.add_parser("current", help="show the active authored chapter")
    current.add_argument("--number", action="store_true", help="print only the chapter number")

    begin = subparsers.add_parser("begin", help="record a clean learner-owned diff baseline")
    begin.add_argument("chapter", choices=CHAPTERS)

    validate = subparsers.add_parser("validate", help="validate a chapter's written artifacts")
    validate.add_argument("chapter", choices=CHAPTERS)

    complete = subparsers.add_parser(
        "complete", help="run the chapter check and record learner-owned pass evidence"
    )
    complete.add_argument("chapter", choices=CHAPTERS)
    return parser


def main() -> int:
    args = build_parser().parse_args()
    root = Path(__file__).resolve().parent.parent
    if args.command == "current":
        return describe_current(root, args.number)
    if args.command == "validate":
        return validate_artifacts(args.chapter, root)
    if args.command == "begin":
        return begin_chapter(args.chapter, root)
    if args.command == "complete":
        return complete_chapter(args.chapter, root)
    raise AssertionError(f"unhandled command: {args.command}")


if __name__ == "__main__":
    raise SystemExit(main())
