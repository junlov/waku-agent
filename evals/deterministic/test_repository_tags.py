"""_repository_tags must see tags from primary checkouts AND linked worktrees.

Regression: in a `git worktree` checkout, .git is a file pointing at
.git/worktrees/<name>, which holds no tag refs — tags live in the common
dir (the `commondir` file points there). The dashboard read only the
worktree gitdir, found zero tags, and /api/curriculum crashed with
"checkpoint ref ... is not a repository tag" for every lab manifest.
"""
from pathlib import Path

from waku.ops.dashboard import _repository_tags
from waku.ops.repository import repository_tags
from waku.tools import curriculum


def _make_primary(root: Path, name: str) -> None:
    git = root / ".git"
    (git / "refs/tags").mkdir(parents=True)
    (git / "refs/tags" / name).write_text("0" * 40 + "\n")


def test_reads_loose_and_packed_tags_from_primary_checkout(tmp_path):
    _make_primary(tmp_path, "chapter-00-start")
    (tmp_path / ".git" / "packed-refs").write_text(
        "# pack-refs with: peeled fully-peeled sorted \n"
        + "1" * 40 + " refs/tags/chapter-01-start\n"
    )

    assert _repository_tags(tmp_path) == {"chapter-00-start", "chapter-01-start"}


def test_reads_tags_from_linked_worktree_common_dir(tmp_path):
    # Primary checkout with packed and loose tags.
    primary = tmp_path / "primary"
    _make_primary(primary, "chapter-00-start")
    (primary / ".git" / "packed-refs").write_text(
        "1" * 40 + " refs/tags/chapter-01-start\n"
    )
    # Linked worktree layout: .git is a file -> .git/worktrees/<name>,
    # which has a commondir file pointing back at the primary .git.
    wt_gitdir = primary / ".git" / "worktrees" / "wt"
    wt_gitdir.mkdir(parents=True)
    (wt_gitdir / "commondir").write_text("../..\n")
    worktree = tmp_path / "wt"
    worktree.mkdir()
    (worktree / ".git").write_text(f"gitdir: {wt_gitdir}\n")

    assert _repository_tags(worktree) == {"chapter-00-start", "chapter-01-start"}
    assert repository_tags(worktree) == {"chapter-00-start", "chapter-01-start"}
    assert curriculum.repository_tags(worktree) == {"chapter-00-start", "chapter-01-start"}
