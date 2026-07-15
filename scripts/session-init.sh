#!/usr/bin/env bash
# Session init for the scale curriculum: verify the environment, run the
# fast checks, and print where you are. Run this at the start of every
# working session (human or agent). Read AGENTS.md for the full lifecycle.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "=== waku-at-scale session init ==="

# 1. environment
if [[ ! -x .venv/bin/python ]]; then
  echo "no venv found; creating one (uv venv + install)"
  uv venv && uv pip install -q -e '.[eval]'
fi
PY=.venv/bin/python
echo "python: $($PY --version 2>&1) | branch: $(git branch --show-current)"
[[ -n "$(git status --porcelain)" ]] && echo "NOTE: working tree is dirty (see git status)"

# 2. fast checks (no network, no keys)
$PY -m ruff check waku evals scale >/dev/null && echo "lint: clean" || { echo "lint: FAILING"; exit 1; }
$PY -m pytest -q evals/deterministic >/dev/null 2>&1 && echo "offline evals: passing" \
  || { echo "offline evals: FAILING (run: make eval)"; exit 1; }

# 3. where you are: lowest chapter without a green check is the current one
current=""
for n in 00 01 02 03 04 05 06 07 08 09 10; do
  if ! git tag -l "chapter-$n-solution" | grep -q .; then current="$n"; break; fi
done
if [[ -n "$current" ]]; then
  echo "current chapter: $current (grade with: make check-$current)"
  brief=$(ls docs/scale/${current}-*.md 2>/dev/null | head -1 || true)
  [[ -n "$brief" ]] && echo "brief: $brief"
else
  echo "all tagged chapters complete"
fi

# 4. last handoff
echo "--- last handoff (docs/scale/PROGRESS.md) ---"
awk '/^## 20/{n++} n==1' docs/scale/PROGRESS.md 2>/dev/null | head -12 || echo "(no progress log yet)"

# 5. optional maintainer state: beads, only if installed
if command -v br >/dev/null 2>&1 && [[ -d .beads ]]; then
  echo "--- beads (maintainer tracking) ---"
  br list 2>/dev/null | grep -iv closed | head -4 || true
fi

echo "=== ready. dashboard: make dashboard | full gate: make check ==="
