#!/usr/bin/env bash
# One-command setup for waku-agent (scale): fresh clone -> runnable + offline-testable.
# Idempotent. Safe to re-run every session.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "=== waku-agent harness init ==="
echo "ROOT_DIR: $ROOT_DIR"

require_file() {
  local path="$1"
  if [[ ! -f "$path" ]]; then
    echo "Missing required file: $path" >&2
    exit 1
  fi
}

require_cmd() {
  local name="$1"
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "Missing required command: $name" >&2
    exit 1
  fi
}

# ---- required harness + project files ----
echo "=== Required docs and state ==="
require_file "$ROOT_DIR/AGENTS.md"
require_file "$ROOT_DIR/feature_list.json"
require_file "$ROOT_DIR/progress.md"
require_file "$ROOT_DIR/session-handoff.md"
require_file "$ROOT_DIR/pyproject.toml"
require_file "$ROOT_DIR/Makefile"
require_file "$ROOT_DIR/.env.example"
require_file "$ROOT_DIR/docs/scale/README.md"

# ---- environment ----
echo "=== Environment ==="
require_cmd uv
require_cmd git

if [[ ! -x .venv/bin/python ]]; then
  if [[ -d .venv ]]; then
    echo "unusable venv found; rebuilding"
    uv venv --clear .venv
  else
    echo "creating .venv"
    uv venv .venv
  fi
fi
PY=.venv/bin/python

needs_install=0
if ! "$PY" -c 'import pytest' >/dev/null 2>&1 \
  || ! "$PY" -m ruff --version >/dev/null 2>&1 \
  || ! "$PY" -c 'import waku' >/dev/null 2>&1; then
  needs_install=1
fi
if [[ "$needs_install" -eq 1 ]]; then
  echo "installing package + eval/dev extras"
  uv pip install --python "$PY" -q -e '.[eval,dev]'
fi

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "created .env from .env.example (no API key required for offline checks)"
else
  echo ".env already present"
fi

# SQLite runtime DB is created lazily under .waku/ on first app use; ensure home exists.
mkdir -p .waku
echo "python: $($PY --version 2>&1)"

# ---- git ----
echo "=== Git state ==="
git rev-parse --is-inside-work-tree >/dev/null
branch="$(git branch --show-current 2>/dev/null || true)"
echo "Branch: ${branch:-detached}"
if [[ -n "$branch" && "$branch" != "scale" && "$branch" != scale/* && "$branch" != fm/* ]]; then
  echo "NOTE: ship base for this project is 'scale'. Feature branches should be based on origin/scale."
fi
git status --short --branch || true

# ---- harness feature_list schema ----
echo "=== Parse harness feature state ==="
"$PY" - "$ROOT_DIR/feature_list.json" <<'PY'
import json
import pathlib
import sys

path = pathlib.Path(sys.argv[1])
data = json.loads(path.read_text())
features = data.get("features")
if not isinstance(features, list) or not features:
    raise SystemExit("feature_list.json must contain a non-empty features array")

required = {"id", "name", "description", "status", "dependencies", "verification", "evidence"}
for feature in features:
    missing = sorted(required - feature.keys())
    if missing:
        raise SystemExit(
            f"feature {feature.get('id', '<unknown>')} missing fields: {', '.join(missing)}"
        )

local_active = [
    f
    for f in features
    if f.get("status") == "in_progress" and f.get("owner") != "external"
]
external_active = [
    f
    for f in features
    if f.get("status") == "in_progress" and f.get("owner") == "external"
]
unfinished = [f for f in features if f.get("status") not in {"passing", "blocked"}]

if len(local_active) > 1:
    raise SystemExit(
        f"expected at most one local in_progress feature, found {len(local_active)}"
    )
if not local_active and not external_active and unfinished:
    ids = ", ".join(f.get("id", "<unknown>") for f in unfinished)
    raise SystemExit(
        "expected one in_progress feature (local or external) unless all tracked "
        f"features are passing or blocked; unfinished: {ids}"
    )
for feature in features:
    if feature.get("status") == "passing" and not feature.get("evidence"):
        raise SystemExit(f"passing feature {feature['id']} has no evidence")

if local_active:
    print(f"Local active feature: {local_active[0]['id']} - {local_active[0]['name']}")
else:
    print("Local active feature: none")
for feature in external_active:
    branch = feature.get("owner_branch", "?")
    print(
        f"External in_progress: {feature['id']} - {feature['name']} "
        f"(branch {branch}; do not edit owned paths)"
    )
if not local_active and not external_active:
    print("Active feature: none - all tracked features are passing or blocked")
PY

# ---- AGENTS routing ----
echo "=== Embedded harness routing ==="
for needle in feature_list.json progress.md session-handoff.md init.sh; do
  if ! grep -Fq "$needle" "$ROOT_DIR/AGENTS.md"; then
    echo "AGENTS.md must mention $needle" >&2
    exit 1
  fi
done
if ! grep -Eq '^## Loops' "$ROOT_DIR/AGENTS.md"; then
  echo "AGENTS.md must contain a ## Loops section" >&2
  exit 1
fi
if ! grep -Eq 'make (lint|eval|harness-test|gate|check)' "$ROOT_DIR/AGENTS.md"; then
  echo "AGENTS.md Loops/checker must document make lint/eval/harness-test/check/gate" >&2
  exit 1
fi

# ---- offline verification (no API key) ----
echo "=== Offline checks (checker) ==="
"$PY" -m ruff check waku evals scale scripts
echo "lint: clean"
"$PY" -m pytest -q evals/deterministic
echo "offline evals: done"
"$PY" -m pytest -q scale/tests/test_curriculum_harness.py
echo "curriculum harness: done"

if [[ -x "$ROOT_DIR/scripts/curriculum.py" ]] || [[ -f "$ROOT_DIR/scripts/curriculum.py" ]]; then
  echo "=== Curriculum position ==="
  "$PY" scripts/curriculum.py current || true
fi

echo "=== Initialization complete ==="
echo "Next steps:"
echo "  1. Read AGENTS.md, feature_list.json, progress.md, session-handoff.md"
echo "  2. Work only on the local active feature (or coach the current chapter)"
echo "  3. Checker / stop condition:"
echo "       make lint && make eval && make harness-test"
echo "       make check          # + current chapter"
echo "       make gate           # release gate before push"
echo "       make check-NN       # grade one curriculum chapter"
echo "  4. Dashboard (optional): make dashboard  -> http://localhost:7777"
echo "  5. Live model chat (optional key in .env): make run"
echo "Do not edit frontend/ or waku/ops/static/ while waku-ui-frontend-shell is external in_progress."
