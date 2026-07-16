from __future__ import annotations

from pathlib import Path

import pytest

from scripts.curriculum import (
    artifact_errors,
    available_chapters,
    current_chapter,
)


def test_reference_solution_tags_do_not_count_as_learner_progress():
    tags = {
        "chapter-00-start",
        "chapter-00-solution",
        "chapter-01-start",
        "chapter-01-solution",
    }

    assert available_chapters(tags) == ["00", "01"]
    assert current_chapter(tags) == "01"


def test_learner_pass_tag_advances_past_the_last_authored_chapter():
    tags = {
        "chapter-00-start",
        "chapter-00-solution",
        "chapter-01-start",
        "learner/chapter-01-passed",
    }

    assert current_chapter(tags) is None


def test_progress_stops_before_an_unauthored_chapter():
    tags = {
        "chapter-00-start",
        "chapter-00-solution",
        "chapter-01-start",
        "learner/chapter-01-passed",
        "learner/chapter-02-passed",
    }

    assert available_chapters(tags) == ["00", "01"]
    assert current_chapter(tags) is None


def test_chapter_1_requires_a_written_slo(tmp_path: Path):
    assert artifact_errors("01", tmp_path) == [
        "docs/scale/SLO.md is missing; write and commit the Chapter 1 service contract"
    ]


@pytest.mark.parametrize("skill", ["chapter-review", "new-tool", "ship"])
def test_claude_and_cross_agent_skills_stay_in_sync(skill: str):
    root = Path(__file__).resolve().parents[2]
    claude = root / ".claude/skills" / skill / "SKILL.md"
    cross_agent = root / ".agents/skills" / skill / "SKILL.md"

    assert cross_agent.read_text() == claude.read_text()


def test_chapter_1_slo_contract_accepts_all_required_decisions(tmp_path: Path):
    slo = tmp_path / "docs/scale/SLO.md"
    slo.parent.mkdir(parents=True)
    slo.write_text(
        """# Service-level objectives

- At 100 concurrent tenants, p95 turn latency is under 2 seconds.
- At 500 concurrent tenants, p95 turn latency is under 4 seconds.
- Error rate budget: below 1%.
- Tenant isolation must never leak facts across users.
- Memory round-trip correctness must remain 100%.
"""
    )

    assert artifact_errors("01", tmp_path) == []


@pytest.mark.parametrize(
    ("missing_text", "expected_fragment"),
    [
        ("100 concurrent tenants", "100-tenant"),
        ("500 concurrent tenants", "500-tenant"),
        ("Error rate", "error-rate"),
        ("Tenant isolation", "tenant-isolation"),
        ("Memory round-trip", "memory round-trip"),
    ],
)
def test_chapter_1_slo_contract_names_missing_decisions(
    tmp_path: Path, missing_text: str, expected_fragment: str
):
    text = """# Service-level objectives

- At 100 concurrent tenants, p95 turn latency is under 2 seconds.
- At 500 concurrent tenants, p95 turn latency is under 4 seconds.
- Error rate budget: below 1%.
- Tenant isolation must never leak facts across users.
- Memory round-trip correctness must remain 100%.
"""
    slo = tmp_path / "docs/scale/SLO.md"
    slo.parent.mkdir(parents=True)
    slo.write_text(text.replace(missing_text, "omitted decision"))

    errors = artifact_errors("01", tmp_path)

    assert any(expected_fragment in error for error in errors)
