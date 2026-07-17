"""Dependency-free loading and structural validation for guided lab manifests."""

from __future__ import annotations

import json
import re
from copy import deepcopy
from pathlib import Path
from typing import Any


MANIFEST_VERSION = 2
STEP_PHASES = ("observe", "explain", "decide", "repair", "prove")
PREVIEW_EXECUTABLE_FIELDS = (
    "setup",
    "checkpoint",
    "grader",
    "deterministic_check",
    "measure",
    "verify",
    "measure_exec",
    "verify_exec",
)
COMMAND_KEYS = ("command", "exec", "measure_exec", "verify_exec")


class LabManifestError(ValueError):
    """A curriculum or manifest contract is missing, unsafe, or inconsistent."""


def load_curriculum_contract(
    root: Path,
    *,
    known_tags: set[str] | None = None,
) -> tuple[dict[str, Any], dict[str, dict[str, Any]]]:
    """Load curriculum metadata and return validated, compatibility-shaped labs."""
    curriculum_path = root / "docs/scale/curriculum.json"
    raw_contract = _read_json(curriculum_path, "curriculum contract")
    # Resolution enriches phase incident references for dashboard consumers. Keep
    # the parsed source contract untouched so repeated loads never observe a
    # mixture of raw references and resolved summaries.
    contract = deepcopy(raw_contract)
    chapters = contract.get("chapters")
    if not isinstance(chapters, list) or not chapters:
        raise LabManifestError("docs/scale/curriculum.json: chapters must be a non-empty list")

    errors: list[str] = []
    resolved: dict[str, dict[str, Any]] = {}
    manifest_ids: dict[str, str] = {}
    chapter_numbers: set[str] = set()
    for index, chapter in enumerate(chapters):
        location = f"docs/scale/curriculum.json:chapters[{index}]"
        number = chapter.get("number") if isinstance(chapter, dict) else None
        if not isinstance(number, str) or not re.fullmatch(r"\d{2}", number):
            errors.append(f"{location}: number must be a two-digit string")
            continue
        if number in chapter_numbers:
            errors.append(f"{location}: duplicate chapter number {number}")
            continue
        chapter_numbers.add(number)
        try:
            manifest = load_manifest_reference(
                root,
                chapter.get("lab") if isinstance(chapter, dict) else None,
                expected_kind="chapter",
                expected_identity=number,
                known_tags=known_tags,
            )
            _claim_manifest_id(manifest, manifest_ids)
            resolved[number] = manifest_summary(manifest, number)
        except LabManifestError as error:
            errors.extend(str(error).splitlines())

    phases = contract.get("phases")
    if not isinstance(phases, list) or not phases:
        errors.append("docs/scale/curriculum.json: phases must be a non-empty list")
    else:
        for index, phase in enumerate(phases):
            if not isinstance(phase, dict):
                errors.append(f"docs/scale/curriculum.json:phases[{index}] must be an object")
                continue
            phase_id = phase.get("id")
            incident_ref = phase.get("incident")
            if not isinstance(phase_id, str) or not phase_id:
                errors.append(f"docs/scale/curriculum.json:phases[{index}].id must be text")
                continue
            try:
                incident = load_manifest_reference(
                    root,
                    incident_ref,
                    expected_kind="phase-incident",
                    expected_identity=phase_id,
                    known_tags=known_tags,
                )
                _claim_manifest_id(incident, manifest_ids)
                phase["incident"] = manifest_summary(incident)
            except LabManifestError as error:
                errors.extend(str(error).splitlines())

    if errors:
        raise LabManifestError("\n".join(errors))
    return contract, resolved


def load_manifest_reference(
    root: Path,
    reference: Any,
    *,
    expected_kind: str,
    expected_identity: str,
    known_tags: set[str] | None = None,
) -> dict[str, Any]:
    if not isinstance(reference, dict) or not isinstance(reference.get("manifest"), str):
        raise LabManifestError(
            f"{expected_kind} {expected_identity}: lab must contain a manifest reference"
        )
    relative = reference["manifest"]
    path = _resolve_repo_file(root, relative, f"{expected_kind} {expected_identity} manifest")
    manifest = _read_json(path, f"manifest {relative}")
    errors = validate_manifest(
        manifest,
        root=root,
        source=relative,
        expected_kind=expected_kind,
        expected_identity=expected_identity,
        known_tags=known_tags,
    )
    if errors:
        raise LabManifestError("\n".join(errors))
    manifest = dict(manifest)
    manifest["manifest"] = relative
    return manifest


def validate_manifest(
    manifest: Any,
    *,
    root: Path,
    source: str,
    expected_kind: str | None = None,
    expected_identity: str | None = None,
    known_tags: set[str] | None = None,
) -> list[str]:
    """Return every structural error in one manifest instead of failing piecemeal."""
    if not isinstance(manifest, dict):
        return [f"{source}: manifest must be an object"]
    errors: list[str] = []

    if manifest.get("version") != MANIFEST_VERSION:
        errors.append(f"{source}: version must be {MANIFEST_VERSION}")
    kind = _required_text(manifest, "kind", source, errors)
    manifest_id = _required_text(manifest, "id", source, errors)
    state = _required_text(manifest, "state", source, errors)
    _required_text(manifest, "title", source, errors)
    _required_text(manifest, "scenario", source, errors)
    _required_text(manifest, "phase", source, errors)
    if expected_kind and kind and kind != expected_kind:
        errors.append(f"{source}: kind must be {expected_kind!r}, got {kind!r}")
    if kind not in {"chapter", "phase-incident"}:
        errors.append(f"{source}: kind must be 'chapter' or 'phase-incident'")
    if state not in {"runnable", "preview"}:
        errors.append(f"{source}: state must be 'runnable' or 'preview'")
    if manifest_id and not re.fullmatch(r"[a-z0-9][a-z0-9-]*", manifest_id):
        errors.append(f"{source}: id must be a lowercase kebab-case identifier")

    identity_key = "chapter" if kind == "chapter" else "phase"
    identity = manifest.get(identity_key)
    if kind == "chapter" and (not isinstance(identity, str) or not re.fullmatch(r"\d{2}", identity)):
        errors.append(f"{source}: chapter must be a two-digit string")
    if expected_identity is not None and identity != expected_identity:
        errors.append(
            f"{source}: {identity_key} must match {expected_identity!r}, got {identity!r}"
        )

    for field in ("prerequisites", "outcomes", "objectives"):
        _required_text_list(manifest, field, source, errors)
    environment = manifest.get("environment")
    _validate_environment(environment, state, kind, identity, known_tags, source, errors)

    actions = manifest.get("actions")
    action_contracts = _validate_actions(actions, state, source, errors)

    _validate_content_references(manifest, root, source, errors)
    _validate_steps(manifest.get("steps"), root, state, set(action_contracts), source, errors)
    if "hints" in manifest:
        errors.append(f"{source}: hints must be declared on steps, not at manifest level")
    grader = None
    if state == "runnable":
        grader = _required_text(manifest, "grader", source, errors)
    _validate_completion(
        manifest.get("completion"),
        manifest.get("recap"),
        state,
        action_contracts,
        grader,
        source,
        errors,
    )
    _validate_recap(manifest.get("recap"), root, source, errors)
    _validate_unique_ids(manifest, source, errors)

    if state == "preview":
        for path, field in _executable_fields(manifest):
            errors.append(
                f"{source}: preview manifest must omit executable field {field!r} at {path}"
            )
    return errors


def manifest_summary(manifest: dict[str, Any], chapter: str | None = None) -> dict[str, Any]:
    """Preserve the v1 lab card/API fields while exposing the full v2 contract."""
    summary = dict(manifest)
    environment = manifest.get("environment") or {}
    if manifest.get("state") == "runnable" and environment.get("checkpoint"):
        summary["checkpoint"] = environment["checkpoint"]
    actions = {
        action.get("id"): action
        for action in manifest.get("actions") or []
        if isinstance(action, dict) and isinstance(action.get("id"), str)
    }
    number = chapter or manifest.get("chapter")
    if number is None:
        return summary
    measure = actions.get("measure", {})
    verify = actions.get("verify", {})
    summary["measure"] = measure.get("display") or measure.get("command") or (
        "make scale-smoke" if number == "00" else f"make scale-{number}"
    )
    summary["verify"] = verify.get("display") or verify.get("command") or f"make check-{number}"
    if measure.get("exec") or measure.get("command"):
        summary["measure_exec"] = measure.get("exec") or measure["command"]
    if verify.get("exec") or verify.get("command"):
        summary["verify_exec"] = verify.get("exec") or verify["command"]
    return summary


def _validate_environment(
    environment: Any,
    state: str,
    kind: str,
    identity: Any,
    known_tags: set[str] | None,
    source: str,
    errors: list[str],
) -> None:
    if not isinstance(environment, dict) or not environment:
        errors.append(f"{source}: environment must be a non-empty object")
        return
    for field in ("editable_files", "service_profiles"):
        value = environment.get(field)
        if not isinstance(value, list) or any(
            not isinstance(item, str) or not item.strip() for item in value
        ):
            errors.append(f"{source}: environment.{field} must be a list of text values")
    if state == "runnable":
        checkpoint = _required_text(environment, "checkpoint", source + ":environment", errors)
        if kind == "chapter" and checkpoint and checkpoint != f"chapter-{identity}-start":
            errors.append(
                f"{source}: environment.checkpoint must be the chapter start ref "
                f"'chapter-{identity}-start'"
            )
        if known_tags is not None and checkpoint and checkpoint not in known_tags:
            errors.append(f"{source}: checkpoint ref {checkpoint!r} is not a repository tag")
    elif state == "preview":
        for field in ("checkpoint", "setup"):
            if field in environment:
                errors.append(
                    f"{source}: preview environment must omit executable field {field!r}"
                )


def _validate_actions(
    actions: Any, state: str, source: str, errors: list[str]
) -> dict[str, dict[str, Any]]:
    if state == "preview":
        if actions not in (None, []):
            errors.append(f"{source}: preview actions must be declared per step, not executable")
        return {}
    if not isinstance(actions, list) or not actions:
        errors.append(f"{source}: runnable manifest actions must be a non-empty list")
        return {}
    contracts: dict[str, dict[str, Any]] = {}
    for index, action in enumerate(actions):
        location = f"{source}:actions[{index}]"
        if not isinstance(action, dict):
            errors.append(f"{location} must be an object")
            continue
        identifier = _required_text(action, "id", location, errors)
        kind = _required_text(action, "kind", location, errors)
        _required_text(action, "label", location, errors)
        if kind == "command":
            _required_text(action, "command", location, errors)
        if identifier:
            contracts[identifier] = action
    return contracts


def _validate_steps(
    steps: Any,
    root: Path,
    state: str,
    action_ids: set[str],
    source: str,
    errors: list[str],
) -> None:
    if not isinstance(steps, list):
        errors.append(f"{source}: steps must be a list")
        return
    phases = [step.get("phase") if isinstance(step, dict) else None for step in steps]
    if phases != list(STEP_PHASES):
        errors.append(f"{source}: steps must be ordered exactly as {', '.join(STEP_PHASES)}")
    for index, step in enumerate(steps):
        location = f"{source}:steps[{index}]"
        if not isinstance(step, dict):
            errors.append(f"{location} must be an object")
            continue
        _required_text(step, "id", location, errors)
        _required_text(step, "title", location, errors)
        _required_text(step, "body", location, errors)
        _required_text(step, "success_criteria", location, errors)
        references = step.get("content")
        if not isinstance(references, list) or not references:
            errors.append(f"{location}.content must be a non-empty list")
        else:
            for ref in references:
                _validate_repo_reference(root, ref, f"{location}.content", errors)
        step_actions = step.get("actions")
        if not isinstance(step_actions, list) or not step_actions:
            errors.append(f"{location}.actions must be a non-empty list")
        elif state == "runnable":
            for action in step_actions:
                if not isinstance(action, str) or action not in action_ids:
                    errors.append(
                        f"{location}.actions must reference declared runnable action ids"
                    )
        else:
            for action_index, action in enumerate(step_actions):
                action_location = f"{location}.actions[{action_index}]"
                if not isinstance(action, dict):
                    errors.append(f"{action_location} must be a planned action object")
                    continue
                _required_text(action, "id", action_location, errors)
                _required_text(action, "description", action_location, errors)
        if state == "runnable":
            grader = step.get("grader")
            if not isinstance(grader, dict) or not grader:
                errors.append(f"{location}.grader must be a non-empty object")
            else:
                _required_text(grader, "kind", location + ":grader", errors)
                _required_text_list(grader, "requires", location + ":grader", errors)
        elif "grader" in step:
            errors.append(f"{location}: preview step must omit executable grader")
        _validate_hints(step.get("hints"), location + ":hints", errors)


def _validate_hints(hints: Any, source: str, errors: list[str]) -> None:
    if not isinstance(hints, list) or len(hints) != 3:
        errors.append(f"{source}: hints must contain exactly three staged hints")
        return
    levels = [hint.get("level") if isinstance(hint, dict) else None for hint in hints]
    if levels != [1, 2, 3]:
        errors.append(f"{source}: hint levels must be ordered 1, 2, 3")
    for index, hint in enumerate(hints):
        location = f"{source}[{index}]"
        if not isinstance(hint, dict):
            errors.append(f"{location} must be an object")
            continue
        _required_text(hint, "id", location, errors)
        _required_text(hint, "prompt", location, errors)


def _validate_completion(
    completion: Any,
    recap: Any,
    state: str,
    actions: dict[str, dict[str, Any]],
    grader: str | None,
    source: str,
    errors: list[str],
) -> None:
    if not isinstance(completion, dict):
        errors.append(f"{source}: completion must be an object")
        return
    location = source + ":completion"
    recap_destination = _required_text(completion, "recap_destination", location, errors)
    if isinstance(recap, dict) and recap_destination and recap_destination != recap.get("destination"):
        errors.append(f"{location}: recap_destination must match recap.destination")
    if state == "runnable":
        check = completion.get("deterministic_check")
        if not isinstance(check, dict) or not check:
            errors.append(f"{location}: deterministic_check must be a non-empty object")
        else:
            check_location = location + ":deterministic_check"
            action_id = _required_text(check, "action", check_location, errors)
            command = _required_text(check, "command", check_location, errors)
            action = actions.get(action_id) if action_id else None
            if action_id and action is None:
                errors.append(
                    f"{check_location}.action must reference a declared runnable action id"
                )
            elif action is not None:
                if action.get("kind") != "command":
                    errors.append(f"{check_location}.action must reference a command action")
                action_command = action.get("command")
                if isinstance(action_command, str) and command and command != action_command:
                    errors.append(
                        f"{check_location}.command must match actions[{action_id!r}].command"
                    )
                if isinstance(action_command, str) and grader and grader != action_command:
                    errors.append(
                        f"{source}: grader must match actions[{action_id!r}].command"
                    )
        artifacts = _required_list(completion, "decision_artifacts", location, errors)
        for index, artifact in enumerate(artifacts):
            artifact_location = f"{location}:decision_artifacts[{index}]"
            if not isinstance(artifact, dict):
                errors.append(f"{artifact_location} must be an object")
                continue
            _required_text(artifact, "path", artifact_location, errors)
            _required_text(artifact, "type", artifact_location, errors)
        _required_text_list(completion, "reflection_fields", location, errors)
    else:
        _required_text(completion, "planned_proof", location, errors)
        _required_text_list(completion, "planned_decision_artifacts", location, errors)
        _required_text_list(completion, "planned_reflection_fields", location, errors)


def _executable_fields(value: Any, path: str = "$") -> list[tuple[str, str]]:
    """Find forbidden execution keys anywhere in a preview manifest."""
    found: list[tuple[str, str]] = []
    if isinstance(value, dict):
        for key, item in value.items():
            child = f"{path}.{key}"
            if key in PREVIEW_EXECUTABLE_FIELDS or key in COMMAND_KEYS:
                found.append((child, key))
            found.extend(_executable_fields(item, child))
    elif isinstance(value, list):
        for index, item in enumerate(value):
            found.extend(_executable_fields(item, f"{path}[{index}]"))
    return found


def _validate_recap(recap: Any, root: Path, source: str, errors: list[str]) -> None:
    if not isinstance(recap, dict):
        errors.append(f"{source}: recap must be an object")
        return
    template = _required_text(recap, "template", source + ":recap", errors)
    _required_text(recap, "destination", source + ":recap", errors)
    if template:
        _validate_repo_reference(root, template, source + ":recap.template", errors)


def _validate_content_references(
    manifest: dict[str, Any], root: Path, source: str, errors: list[str]
) -> None:
    if manifest.get("kind") == "chapter":
        brief = _required_text(manifest, "brief", source, errors)
        if brief:
            _validate_repo_reference(root, brief, f"{source}:brief", errors)
    tracks = manifest.get("tracks")
    if manifest.get("kind") == "chapter" and manifest.get("chapter") != "00" and tracks is None:
        errors.append(f"{source}: chapter manifest must reference both learner tracks")
    if tracks is not None:
        if not isinstance(tracks, dict):
            errors.append(f"{source}: tracks must be an object")
        else:
            if manifest.get("kind") == "chapter" and manifest.get("chapter") != "00":
                missing = {"architect", "engineer"} - set(tracks)
                if missing:
                    errors.append(
                        f"{source}: tracks is missing {', '.join(sorted(missing))}"
                    )
            for name, reference in tracks.items():
                _validate_repo_reference(root, reference, f"{source}:tracks.{name}", errors)


def _validate_unique_ids(manifest: dict[str, Any], source: str, errors: list[str]) -> None:
    seen: dict[str, str] = {}
    for collection in ("steps", "actions"):
        for index, item in enumerate(manifest.get(collection) or []):
            if not isinstance(item, dict) or not isinstance(item.get("id"), str):
                continue
            identifier = item["id"]
            location = f"{collection}[{index}]"
            if identifier in seen:
                errors.append(
                    f"{source}: duplicate id {identifier!r} in {seen[identifier]} and {location}"
                )
            else:
                seen[identifier] = location
    for step_index, step in enumerate(manifest.get("steps") or []):
        if not isinstance(step, dict):
            continue
        for collection in ("hints", "actions"):
            for item_index, item in enumerate(step.get(collection) or []):
                if not isinstance(item, dict) or not isinstance(item.get("id"), str):
                    continue
                identifier = item["id"]
                location = f"steps[{step_index}].{collection}[{item_index}]"
                if identifier in seen:
                    errors.append(
                        f"{source}: duplicate id {identifier!r} in {seen[identifier]} and {location}"
                    )
                else:
                    seen[identifier] = location


def _claim_manifest_id(manifest: dict[str, Any], seen: dict[str, str]) -> None:
    manifest_id = manifest["id"]
    source = manifest["manifest"]
    if manifest_id in seen:
        raise LabManifestError(
            f"{source}: duplicate manifest id {manifest_id!r}; already declared by {seen[manifest_id]}"
        )
    seen[manifest_id] = source


def _required_text(value: dict[str, Any], field: str, source: str, errors: list[str]) -> str:
    item = value.get(field)
    if not isinstance(item, str) or not item.strip():
        errors.append(f"{source}: {field} must be non-empty text")
        return ""
    return item


def _required_list(value: dict[str, Any], field: str, source: str, errors: list[str]) -> list[Any]:
    item = value.get(field)
    if not isinstance(item, list) or not item:
        errors.append(f"{source}: {field} must be a non-empty list")
        return []
    return item


def _required_text_list(
    value: dict[str, Any], field: str, source: str, errors: list[str]
) -> list[str]:
    items = _required_list(value, field, source, errors)
    if items and any(not isinstance(item, str) or not item.strip() for item in items):
        errors.append(f"{source}: {field} entries must be non-empty text")
    return [item for item in items if isinstance(item, str)]


def _validate_repo_reference(root: Path, reference: Any, source: str, errors: list[str]) -> None:
    if not isinstance(reference, str) or not reference.strip():
        errors.append(f"{source}: reference must be non-empty text")
        return
    try:
        _resolve_repo_file(root, reference, source)
    except LabManifestError as error:
        errors.append(str(error))


def _resolve_repo_file(root: Path, reference: str, source: str) -> Path:
    file_part = reference.split("#", 1)[0]
    candidate = (root / file_part).resolve()
    resolved_root = root.resolve()
    if not candidate.is_relative_to(resolved_root):
        raise LabManifestError(f"{source}: reference escapes repository: {reference!r}")
    if not candidate.is_file():
        raise LabManifestError(f"{source}: referenced file is missing: {reference!r}")
    return candidate


def _read_json(path: Path, label: str) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text())
    except FileNotFoundError as error:
        raise LabManifestError(f"{label}: file is missing: {path}") from error
    except json.JSONDecodeError as error:
        raise LabManifestError(
            f"{label}: invalid JSON at line {error.lineno}, column {error.colno}: {error.msg}"
        ) from error
    if not isinstance(value, dict):
        raise LabManifestError(f"{label}: root must be an object")
    return value
