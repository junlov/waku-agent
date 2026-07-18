# Waku-agent session handoff

Last Updated: 2026-07-18

## Current Objective

- Harness kit for autonomous loops on the **`scale`** base is in place and
  marked `passing` (`waku-agent-harness-kit`).
- Only tracked `in_progress` feature: **`waku-ui-frontend-shell`**, owned
  externally on `fm/waku-ui-continue-k2`. Do not edit `frontend/` or
  `waku/ops/static/`.
- Curriculum current chapter: **01** (baseline & SLOs). Agents coach; learners
  author chapter fixes.

## Verified Now

- `./scripts/session-init.sh`: lint clean; offline evals passing; curriculum
  harness passing; prints `current chapter: 01`.
- `make lint`: All checks passed.
- `make eval`: 58 passed, 5 skipped (live cases need provider API key).
- `make harness-test`: 13 passed.
- `make check-00`: 1 passed (15 turns ok, 0 errors on sim).
- `./init.sh`: must be re-run after any harness edit; expected green with
  feature schema checks + offline suite.
- Git: branch `fm/waku-harness-g1` tracking setup from `origin/scale`
  (`1c6cecb` Repair scale curriculum harness after profile migration).

## Changed This Session

- Files:
  - `AGENTS.md` — full operating manual: scale convention, reviewer rule,
    four pillars, commands, harness contract, Loops checker, DoD
  - `CLAUDE.md` — symlink or pointer to `AGENTS.md` (architecture map merged)
  - `feature_list.json` — real features only (UI external in_progress + scale
    chapters + harness kit)
  - `progress.md` — this session log
  - `session-handoff.md` — this file
  - `init.sh` — idempotent setup + offline/harness verification

## Blockers

- None for the harness kit.
- UI shell is in flight elsewhere; bare scale lacks `frontend/`, `compose.yaml`,
  and `Dockerfile` until that branch lands.

## Broken Or Unverified

- `make check-01` / full chapter-1 learner path not completed in this worktree
  (expected: not_started feature `scale-ch01-baseline-slo`).
- `make gate` with judge evals not run (requires API key); deterministic path
  is covered by `make eval`.
- Live tool-trigger dataset cases remain skipped without a provider key.

## Dogfood Result

- Fresh clone path: `./init.sh` installs `.[eval,dev]`, ensures `.env` from
  `.env.example`, validates harness artifacts, runs lint + deterministic evals
  + curriculum harness tests, prints how to run `make check` / `make gate` /
  chapter checks.
- Restart-from-disk: a new agent can read `feature_list.json` + this handoff and
  know (1) UI is external in_progress, (2) harness kit is done, (3) curriculum
  chapter is 01, (4) stop condition commands are `make lint|eval|harness-test`
  and `./init.sh`.

## Next Session

- Recommended: ship/merge harness kit PR into `scale` (base **`scale`**, not
  `main`). Leave UI paths alone.
- After UI merges: mark `waku-ui-frontend-shell` passing only with frontend-check
  evidence from that branch.
- Curriculum path: `python scripts/curriculum.py begin 01` then coach toward
  `make check-01` + `docs/scale/SLO.md`.
- What must not change without deliberate design: reviewer-not-author for
  unsolved chapters; scale as ship base; offline sim load tests; no new CI as
  invented stop conditions.

## Commands

```bash
./init.sh
./scripts/session-init.sh
make lint && make eval && make harness-test
make check-00
make check            # includes current chapter when applicable
make gate             # before push when shipping code
python scripts/curriculum.py current
```
