# Waku-agent harness progress

Last Updated: 2026-07-18

## Current State

- What works: scale curriculum instruments (sim + loadgen + check-00),
  offline deterministic evals, curriculum harness tests, session-init, and the
  root agent-harness kit (`AGENTS.md`, `feature_list.json`, `progress.md`,
  `session-handoff.md`, `init.sh`).
- What is active: `waku-ui-frontend-shell` is `in_progress` on external branch
  `fm/waku-ui-continue-k2` (do not edit `frontend/` or `waku/ops/static/`).
- Local harness feature `waku-agent-harness-kit` is `passing`.
- Curriculum position: chapter **01** (baseline & SLOs) is the current
  authored chapter; no learner pass tag for ch1 in this worktree.
- Current blocker: none for harness kit. UI landing is external.
- Next recommended step: leave UI work to the UI worker; for curriculum,
  coach chapter 1 (`python scripts/curriculum.py begin 01` on a clean learner
  tree) or wait for UI merge before touching frontend paths.

## Session Log

### 2026-07-18 - Root agent-harness kit

- Goal: Bootstrap durable harness state so autonomous coding loops can run
  against waku-agent on the `scale` base.
- Completed: Added/updated `AGENTS.md` (curriculum rules + four pillars +
  harness contract + Loops checker), `feature_list.json` seeded from real
  scale/UI state, `progress.md`, `session-handoff.md`, executable `init.sh`;
  `CLAUDE.md` points at `AGENTS.md`.
- Verification run:
  - `./scripts/session-init.sh` — lint clean, offline evals passing, curriculum
    harness passing, current chapter 01
  - `make lint` — All checks passed
  - `make eval` — 58 passed, 5 skipped (live tool-trigger needs API key)
  - `make harness-test` — 13 passed
  - `make check-00` — 1 passed (15 turns, 0 errors)
  - `./init.sh` — full idempotent initialization green, including Ruff
- Evidence captured: bare `origin/scale` has no `frontend/`; UI worktree
  carries guided-lab shell + ADRs 0005/0006. Methodology shape from autonomy
  harness + learn-harness-engineering + loop-engineering, sized down.
- Files updated: `AGENTS.md`, `CLAUDE.md`, `feature_list.json`, `progress.md`,
  `session-handoff.md`, `init.sh`
- Known risk: UI worker and harness kit may race on `AGENTS.md` when merging to
  `scale`; prefer merge with content from both (curriculum + harness sections).
- Next best step: commit on `fm/waku-harness-g1`; do not touch UI-owned paths.

### 2026-07-16 - Curriculum harness repair (prior, on scale)

- Goal: Repair scale curriculum harness after profile migration.
- Completed: learner vs reference tag separation; begin/complete; SLO artifact
  checks; portable skills; harness regression tests. Chapter 0 green again.
- Verification: see `docs/scale/PROGRESS.md` entry for the same date.
- Next (curriculum): chapter 1 baseline + `docs/scale/SLO.md`.

### 2026-07-15 - Chapter 0 instruments (prior, on scale)

- Goal: Ship sim provider, loadgen, check-00/check-01 targets.
- Completed: check-00 green; baseline ramp measured for ch1 brief.
- Tags: `chapter-00-start`, `chapter-00-solution` (= `chapter-01-start`).
