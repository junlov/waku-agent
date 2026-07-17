from __future__ import annotations

import json
from copy import deepcopy
from pathlib import Path
from typing import Any

import pytest
import waku.ops.lab_manifest as lab_manifest_module

from waku.ops.lab_manifest import (
    LabManifestError,
    STEP_PHASES,
    load_curriculum_contract,
    validate_manifest,
)


ROOT = Path(__file__).resolve().parents[2]
EXECUTABLE_PREVIEW_KEYS = {
    "setup",
    "checkpoint",
    "grader",
    "deterministic_check",
    "command",
    "exec",
    "measure",
    "verify",
    "measure_exec",
    "verify_exec",
}


def test_repository_curriculum_loads_exact_guided_step_contract() -> None:
    tags = {"chapter-00-start", "chapter-00-solution", "chapter-01-start"}

    contract, labs = load_curriculum_contract(ROOT, known_tags=tags)

    assert contract["version"] == 2
    assert set(labs) == {f"{number:02d}" for number in range(17)}
    assert [phase["incident"]["kind"] for phase in contract["phases"]] == [
        "phase-incident"
    ] * 6
    assert {number for number, lab in labs.items() if lab["state"] == "runnable"} == {
        "00",
        "01",
    }
    for lab in labs.values():
        assert [step["phase"] for step in lab["steps"]] == list(STEP_PHASES)
        assert set(lab["environment"]) >= {"editable_files", "service_profiles"}
        assert "hints" not in lab
        for step in lab["steps"]:
            assert step["body"].startswith("### ")
            assert "\n" in step["body"]
            assert "\\n" not in step["body"]
            assert "instructions" not in step
            assert step["actions"]
            assert step["success_criteria"]
            assert [hint["level"] for hint in step["hints"]] == [1, 2, 3]
            if lab["state"] == "runnable":
                assert step["grader"]["requires"]
            else:
                assert "grader" not in step


def test_runnable_environment_and_completion_are_enforceable() -> None:
    _contract, labs = load_curriculum_contract(
        ROOT,
        known_tags={"chapter-00-start", "chapter-00-solution", "chapter-01-start"},
    )

    for number in ("00", "01"):
        lab = labs[number]
        assert lab["environment"]["checkpoint"] == f"chapter-{number}-start"
        assert lab["checkpoint"] == f"chapter-{number}-start"  # v1 compatibility
        assert lab["completion"]["deterministic_check"]["action"] == "verify"
        assert lab["completion"]["decision_artifacts"]
        assert lab["completion"]["reflection_fields"]
        assert lab["completion"]["recap_destination"] == lab["recap"]["destination"]


def test_preview_manifests_are_descriptive_and_recursively_non_executable() -> None:
    for path in sorted((ROOT / "docs/scale/labs").rglob("*.json")):
        manifest = json.loads(path.read_text())
        if manifest["state"] != "preview":
            continue
        assert isinstance(manifest["environment"]["editable_files"], list)
        assert isinstance(manifest["environment"]["service_profiles"], list)
        assert manifest["completion"]["planned_proof"]
        assert manifest["completion"]["planned_decision_artifacts"]
        assert manifest["completion"]["planned_reflection_fields"]
        assert not _find_keys(manifest, EXECUTABLE_PREVIEW_KEYS)


def test_catalog_summary_preserves_existing_lab_api_fields() -> None:
    _contract, labs = load_curriculum_contract(
        ROOT,
        known_tags={"chapter-00-start", "chapter-00-solution", "chapter-01-start"},
    )

    assert labs["00"]["measure"] == "make scale-smoke"
    assert labs["00"]["verify"] == "make check-00"
    assert labs["01"]["measure"] == "make scale-01"
    assert labs["01"]["verify"] == "make check-01"
    assert labs["16"]["state"] == "preview"
    assert labs["16"]["verify"] == "make check-16"


def test_validator_reports_content_ids_step_contract_and_nested_preview_execution(
    tmp_path: Path,
) -> None:
    template = tmp_path / "docs/scale/labs/templates/recap.md"
    template.parent.mkdir(parents=True)
    template.write_text("# Recap\n")
    brief = tmp_path / "docs/scale/brief.md"
    brief.write_text("# Brief\n")
    manifest = _preview_manifest()
    manifest["brief"] = "docs/scale/missing.md"
    manifest["steps"][1]["id"] = manifest["steps"][0]["id"]
    manifest["steps"][2]["hints"] = manifest["steps"][2]["hints"][:2]
    manifest["steps"][3]["actions"][0]["command"] = "make scale-02"
    manifest["completion"]["deterministic_check"] = {"command": "make check-02"}
    manifest["hints"] = [
        {"id": f"top-hint-{level}", "level": level, "prompt": f"Hint {level}"}
        for level in (1, 2, 3)
    ]

    errors = validate_manifest(
        manifest,
        root=tmp_path,
        source="fixture.json",
        expected_kind="chapter",
        expected_identity="02",
    )

    assert any("referenced file is missing" in error for error in errors)
    assert any("duplicate id" in error for error in errors)
    assert any("exactly three staged hints" in error for error in errors)
    assert any("steps[3].actions[0].command" in error for error in errors)
    assert any("completion.deterministic_check" in error for error in errors)
    assert any("hints must be declared on steps" in error for error in errors)


def test_preview_environment_allows_descriptive_planned_files_and_profiles(tmp_path: Path) -> None:
    template = tmp_path / "docs/scale/labs/templates/recap.md"
    template.parent.mkdir(parents=True)
    template.write_text("# Recap\n")
    brief = tmp_path / "docs/scale/brief.md"
    brief.write_text("# Brief\n")
    manifest = _preview_manifest()
    manifest["environment"]["editable_files"] = ["waku/runtime/session.py"]
    manifest["environment"]["service_profiles"] = ["planned-redis"]

    assert validate_manifest(
        manifest,
        root=tmp_path,
        source="fixture.json",
        expected_kind="chapter",
        expected_identity="02",
    ) == []


def test_validator_rejects_wrong_runnable_checkpoint_and_unknown_action(tmp_path: Path) -> None:
    template = tmp_path / "docs/scale/labs/templates/recap.md"
    template.parent.mkdir(parents=True)
    template.write_text("# Recap\n")
    brief = tmp_path / "docs/scale/brief.md"
    brief.write_text("# Brief\n")
    manifest = _runnable_manifest()
    manifest["environment"]["checkpoint"] = "chapter-99-start"
    manifest["steps"][0]["actions"] = ["undeclared"]

    errors = validate_manifest(
        manifest,
        root=tmp_path,
        source="fixture.json",
        expected_kind="chapter",
        expected_identity="00",
        known_tags={"chapter-00-start"},
    )

    assert any("environment.checkpoint must be the chapter start ref" in error for error in errors)
    assert any("not a repository tag" in error for error in errors)
    assert any("reference declared runnable action ids" in error for error in errors)


def test_deterministic_check_rejects_unknown_action_and_command_drift(tmp_path: Path) -> None:
    template = tmp_path / "docs/scale/labs/templates/recap.md"
    template.parent.mkdir(parents=True)
    template.write_text("# Recap\n")
    brief = tmp_path / "docs/scale/brief.md"
    brief.write_text("# Brief\n")

    unknown = _runnable_manifest()
    unknown["completion"]["deterministic_check"]["action"] = "missing"
    unknown_errors = validate_manifest(
        unknown,
        root=tmp_path,
        source="unknown.json",
        expected_kind="chapter",
        expected_identity="00",
        known_tags={"chapter-00-start"},
    )
    assert any("must reference a declared runnable action id" in error for error in unknown_errors)

    mismatch = deepcopy(_runnable_manifest())
    mismatch["completion"]["deterministic_check"]["command"] = "make check-wrong"
    mismatch["grader"] = "make check-also-wrong"
    mismatch_errors = validate_manifest(
        mismatch,
        root=tmp_path,
        source="mismatch.json",
        expected_kind="chapter",
        expected_identity="00",
        known_tags={"chapter-00-start"},
    )
    assert any("must match actions['verify'].command" in error for error in mismatch_errors)
    assert any("grader must match actions['verify'].command" in error for error in mismatch_errors)


def test_loader_names_a_missing_manifest_reference(tmp_path: Path) -> None:
    curriculum = {
        "version": 2,
        "phases": [{"id": "measure", "incident": {"manifest": "missing-incident.json"}}],
        "chapters": [{"number": "00", "lab": {"manifest": "missing-lab.json"}}],
    }
    path = tmp_path / "docs/scale/curriculum.json"
    path.parent.mkdir(parents=True)
    path.write_text(json.dumps(curriculum))

    with pytest.raises(LabManifestError) as raised:
        load_curriculum_contract(tmp_path)

    message = str(raised.value)
    assert "missing-lab.json" in message
    assert "missing-incident.json" in message


def test_repeated_loads_do_not_mutate_raw_curriculum_references(monkeypatch: pytest.MonkeyPatch) -> None:
    raw_contract = json.loads((ROOT / "docs/scale/curriculum.json").read_text())
    expected_references = [deepcopy(phase["incident"]) for phase in raw_contract["phases"]]
    original_read_json = lab_manifest_module._read_json

    def read_json(path: Path, label: str) -> dict[str, Any]:
        if path == ROOT / "docs/scale/curriculum.json":
            return raw_contract
        return original_read_json(path, label)

    monkeypatch.setattr(lab_manifest_module, "_read_json", read_json)
    first, _labs = load_curriculum_contract(
        ROOT,
        known_tags={"chapter-00-start", "chapter-00-solution", "chapter-01-start"},
    )
    second, _labs = load_curriculum_contract(
        ROOT,
        known_tags={"chapter-00-start", "chapter-00-solution", "chapter-01-start"},
    )

    assert [phase["incident"] for phase in raw_contract["phases"]] == expected_references
    assert first == second
    assert all(phase["incident"]["kind"] == "phase-incident" for phase in first["phases"])


def _preview_manifest() -> dict[str, Any]:
    return {
        "version": 2,
        "kind": "chapter",
        "id": "chapter-02-concurrency",
        "chapter": "02",
        "phase": "isolate",
        "state": "preview",
        "title": "Concurrency",
        "scenario": "Expose cross-session blocking.",
        "brief": "docs/scale/brief.md",
        "tracks": {
            "architect": "docs/scale/brief.md",
            "engineer": "docs/scale/brief.md",
        },
        "prerequisites": ["Chapter 01 evidence"],
        "outcomes": ["A bounded concurrency decision"],
        "objectives": ["Observe", "Explain", "Prove"],
        "environment": {
            "workspace": "persistent-sandbox",
            "editable_files": [],
            "service_profiles": [],
        },
        "steps": [_step(phase, runnable=False) for phase in STEP_PHASES],
        "completion": {
            "planned_proof": "Prove the published deterministic incident.",
            "planned_decision_artifacts": ["A learner-authored decision."],
            "planned_reflection_fields": ["observed_failure"],
            "recap_destination": "docs/scale/recaps/02-concurrency.md",
        },
        "recap": {
            "template": "docs/scale/labs/templates/recap.md",
            "destination": "docs/scale/recaps/02-concurrency.md",
        },
    }


def _runnable_manifest() -> dict[str, Any]:
    manifest = _preview_manifest()
    manifest.update(
        id="chapter-00-harness",
        chapter="00",
        state="runnable",
        grader="make check-00",
        actions=[
            {"id": "measure", "kind": "command", "label": "Measure", "command": "make scale-smoke"},
            {"id": "verify", "kind": "command", "label": "Verify", "command": "make check-00"},
        ],
    )
    manifest["environment"]["checkpoint"] = "chapter-00-start"
    manifest["steps"] = [_step(phase, runnable=True) for phase in STEP_PHASES]
    manifest["completion"] = {
        "deterministic_check": {"action": "verify", "command": "make check-00"},
        "decision_artifacts": [{"path": "docs/scale/decision.md", "type": "decision"}],
        "reflection_fields": ["observed_failure"],
        "recap_destination": "docs/scale/recaps/02-concurrency.md",
    }
    return manifest


def _step(phase: str, *, runnable: bool) -> dict[str, Any]:
    step: dict[str, Any] = {
        "id": f"fixture-{phase}",
        "phase": phase,
        "title": phase.title(),
        "body": f"### {phase.title()}\n\nComplete the step.",
        "content": ["docs/scale/brief.md"],
        "success_criteria": "The learner records evidence.",
        "actions": ["measure" if phase != "prove" else "verify"] if runnable else [
            {"id": f"fixture-{phase}-planned", "description": "Planned learner action."}
        ],
        "hints": [
            {"id": f"fixture-{phase}-hint-{level}", "level": level, "prompt": f"Hint {level}"}
            for level in (1, 2, 3)
        ],
    }
    if runnable:
        step["grader"] = {"kind": "evidence", "requires": ["Selected evidence"]}
    return step


def _find_keys(value: Any, keys: set[str]) -> list[str]:
    found: list[str] = []
    if isinstance(value, dict):
        for key, item in value.items():
            if key in keys:
                found.append(key)
            found.extend(_find_keys(item, keys))
    elif isinstance(value, list):
        for item in value:
            found.extend(_find_keys(item, keys))
    return found
