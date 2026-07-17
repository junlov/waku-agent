#!/usr/bin/env bash
# Session init for the scale curriculum: verify the environment, run the
# fast checks, and print where you are. Run this at the start of every
# working session (human or agent). Read AGENTS.md for the full lifecycle.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "=== waku-at-scale session init ==="

# 1. environment
needs_install=0
if [[ ! -x .venv/bin/python ]]; then
  command -v uv >/dev/null 2>&1 || {
    echo "bootstrap: FAILING: install uv first (https://docs.astral.sh/uv/)" >&2
    exit 1
  }
  if [[ -d .venv ]]; then
    echo "unusable venv found (often copied from another machine); rebuilding it"
    uv venv --clear .venv
  else
    echo "no venv found; creating one"
    uv venv .venv
  fi
  needs_install=1
fi
PY=.venv/bin/python
if [[ "$needs_install" -eq 0 ]] \
  && { ! "$PY" -c 'import pytest' >/dev/null 2>&1 \
    || ! "$PY" -m ruff --version >/dev/null 2>&1; }; then
  echo "venv is missing harness dependencies; repairing it"
  needs_install=1
fi
if [[ "$needs_install" -eq 1 ]]; then
  uv pip install --python "$PY" -q -e '.[eval,dev]'
fi
echo "python: $($PY --version 2>&1) | branch: $(git branch --show-current)"
[[ -n "$(git status --porcelain)" ]] && echo "NOTE: working tree is dirty (see git status)"

# 2. fast checks (no network, no keys)
$PY -m ruff check waku evals scale scripts >/dev/null && echo "lint: clean" || { echo "lint: FAILING"; exit 1; }
WAKU_PROVIDER=sim WAKU_API_KEY= "$PY" -m pytest -q evals/deterministic >/dev/null 2>&1 && echo "offline evals: passing" \
  || { echo "offline evals: FAILING (run: make eval)"; exit 1; }
$PY -m pytest -q scale/tests/test_curriculum_harness.py >/dev/null 2>&1 \
  && echo "curriculum harness: passing" \
  || { echo "curriculum harness: FAILING (run: make harness-test)"; exit 1; }

# 3. where you are: authored reference tags and learner pass tags are separate
$PY scripts/curriculum.py current

# 4. last handoff
echo "--- last handoff (docs/scale/PROGRESS.md) ---"
awk '/^## 20/{n++} n==1' docs/scale/PROGRESS.md 2>/dev/null | head -12 || echo "(no progress log yet)"

# 5. optional maintainer state: beads, only if installed
if command -v br >/dev/null 2>&1 && [[ -d .beads ]]; then
  echo "--- beads (maintainer tracking) ---"
  br list 2>/dev/null | grep -iv closed | head -4 || true
fi

echo "=== ready. dashboard: make dashboard | full gate: make check ==="
