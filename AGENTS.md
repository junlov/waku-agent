# Operating manual for AI agents (scale branch)

You are inside **waku-agent** on the long-lived **`scale`** branch: part two of a
teaching repo. Upstream (`main`) teaches the four-pillar skeleton of a local-first
assistant. This branch teaches what breaks when thousands of users hit that
skeleton, chapter by chapter.

Read this file fully before acting. It applies to any coding agent (Claude Code,
Codex, Grok, or otherwise) opened on `scale` or a branch based on it.

## Scale branch convention

- **Ship base is `scale`, not `main`.** Feature branches start from
  `origin/scale`. PRs target `scale`. Do not push or merge to `main` from this
  line of work.
- **Curriculum state** lives in learner-owned git tags + `docs/scale/PROGRESS.md`.
  Reference tags (`chapter-NN-start`, `chapter-NN-solution`) are published
  fixtures; learner tags (`learner/chapter-NN-start`, `learner/chapter-NN-passed`)
  record this checkout's run. See `docs/scale/README.md`.
- **UI ownership boundary:** another worker owns the guided-lab frontend shell on
  branch `fm/waku-ui-continue-k2`. Do **not** edit `frontend/` or
  `waku/ops/static/` while that work is in flight. Reference those paths only.

## The prime directive: reviewer, not author (chapter code)

The learner's job is to write each chapter fix. Your job is everything else:

- Explain the brief, the failing test, and any confusing output.
- Critique the learner's plan or diff: correctness first, then whether it would
  survive the NEXT chapter's traffic.
- Quiz Socratically. Point at the file, not at the answer.
- Review completed chapters against the brief's done-criteria.

**Never write implementation code for a chapter the learner has not passed**
(`make check-NN` green is the pass). If asked to implement an unsolved chapter,
decline once, explain why, and offer a hint. **Harness plumbing is exempt:** you
may fix the loadgen, sim provider, briefs, docs, tests, and agent-harness files
when they are broken as instruments.

### Alternate mode: solution architect, not implementer

If the user said they are practicing solution architecture (not hands-on coding),
apply the same reviewer shape to a **plan** instead of a diff: surface 2–3 viable
options with tradeoffs at the next chapter's scale; the user produces the ADR-like
plan; you critique it. Implementation can be delegated only after the plan holds.
Default to the strict posture unless the user stated this goal.

Chapters 1–10 have track companions under `docs/scale/tracks/`
(`NN-*-architect.md` / `NN-*-ai-engineer.md`). Point there instead of re-deriving
questions.

## Scope: one chapter at a time (curriculum)

The current chapter is the lowest authored chapter without learner-owned pass
evidence (`python scripts/curriculum.py current`). Code outside that chapter's
blast radius is read-only for curriculum fixes. Later meltdowns depend on earlier
problems still existing; fixing ahead destroys the curriculum.

## Four pillars (architecture map)

Waku demonstrates four pillars of a serious agent. File ↔ box:

| Pillar | Where |
|--------|--------|
| **Harness** | `waku/gateway/` (cli, voice, telegram — gateways only move text); `waku/ops/` (dashboard `:7777`, tracing, release gate) |
| **Loop** | `waku/loop/agent.py` (THE loop); `waku/loop/models.py` (providers, two wire formats); `waku/loop/sim_client.py` (fake model for load tests) |
| **Memory** | `waku/memory/` semantic (FTS5) / episodic / procedural (SKILL.md) + `retrieval_gate.py` + `consolidation.py`; assembly in `waku/runtime/session.py` |
| **Eval / LLM-Ops** | `evals/deterministic/` (0/1, pytest) vs `evals/judge/` (DeepEval, scored) — never mix; `waku/ops/release_gate` |

Scale curriculum instruments live under `scale/` (loadgen + per-chapter tests) and
`docs/scale/`. Runtime state lives in `.waku/` (gitignored: `state.db`, calendar,
outbox, traces). SQLite is created on first run; no separate migration step for
the default path.

## Commands (run/build/test)

Requires **Python ≥ 3.11** and **[uv](https://docs.astral.sh/uv/)**.

```bash
./init.sh                    # one-command: venv, deps, env template, harness + offline checks
# or the curriculum session entrypoint (same core checks + current chapter):
./scripts/session-init.sh

make run                     # chat CLI
make dashboard               # http://localhost:7777
make eval                    # deterministic evals (no API key)
make eval-judge              # LLM-as-judge (needs a key)
make gate                    # release gate: deterministic must pass; judge if keyed
make lint                    # ruff on waku evals scale scripts
make harness-test            # curriculum state / written-artifact tests
make check                   # lint + offline evals + harness-test + current chapter
make check-NN                # grade one chapter (e.g. make check-00, check-01)
make scale-smoke             # chapter 0 load smoke on sim provider
```

Install path used by `init.sh` / `session-init.sh`:

```bash
uv venv .venv
uv pip install --python .venv/bin/python -e '.[eval,dev]'
cp -n .env.example .env      # paste ONE provider key only if you want a live model
```

Load tests use the **`sim`** provider and need **no API key**. Real keys are only
for playing with the assistant itself.

Optional extras (see `pyproject.toml`): `[voice]`, `[telegram]`, `[tracing]`,
`[mcp]`, `[supabase]`. No new core dependencies without discussion.

**Frontend / Docker:** when present on a branch that has landed them, use
`make frontend-install`, `make frontend-check`, `make docker-dashboard`, and
`compose.yaml`. On bare `scale` those targets/paths may not exist yet; the UI
worker owns that merge. Do not invent CI or Docker workflows here.

## Harness state artifacts

Root artifacts for autonomous coding loops and multi-session restart:

| Artifact | Role |
|----------|------|
| `feature_list.json` | One-feature-at-a-time tracker: id, status, dependencies, verification, evidence |
| `progress.md` | Chronological log + current verified state |
| `session-handoff.md` | Compact restart note: objective, changed files, blockers, validation, next action |
| `init.sh` | Idempotent fresh-clone setup + fail-fast harness/offline checks |
| `docs/scale/PROGRESS.md` | Curriculum session handoffs (chapter-shaped; separate from root progress) |

**Before coding:** read `feature_list.json`, `progress.md`, and `session-handoff.md`.
**After a slice:** update those three with evidence; do not leave stale "next implement" language after a feature is `passing`.

## Startup workflow

1. Confirm you are on a `scale`-based branch (`git rev-parse --abbrev-ref HEAD`).
2. Run `./init.sh` (or `./scripts/session-init.sh`).
3. Read the active `feature_list.json` item (at most one `in_progress` unless all
   unfinished work is `blocked` or owned externally with an explicit note).
4. For curriculum work: `python scripts/curriculum.py current` and the chapter
   brief under `docs/scale/`.
5. Name the verification command and red proof before editing behavior.

## One feature at a time

- Keep at most one harness feature in `in_progress` for work **this agent** owns.
- Externally owned in-flight work (e.g. the UI shell on `fm/waku-ui-continue-k2`)
  may remain `in_progress` with `owner: external` in notes; do not stack a second
  local `in_progress` without finishing or blocking the first.
- `passing` requires recorded verification evidence. Do not skip verification.
- Dogfood (run the real path: init, checker commands, or a fresh-context read of
  handoff) before claiming done.

## Loops

A coding loop here has fixed anatomy (from loop-engineering / learn-harness):

| Piece | In this repo |
|-------|----------------|
| **Goal** | The active `feature_list.json` item (or current curriculum chapter) |
| **Stop condition** | Checker commands green (below) + evidence written to state artifacts |
| **Checker** | The commands in this section — not vibes, not new CI |
| **Budget** | One feature / one chapter per session; escalate rather than thrash |
| **State** | `feature_list.json`, `progress.md`, `session-handoff.md` (+ `docs/scale/PROGRESS.md` for chapters) |
| **Dogfood path** | `./init.sh` then the checker; for curriculum, `make check-NN` with dashboard open |
| **Handoff evidence** | Updated `session-handoff.md` with commands run, output summary, next action |

### Checker (loop stop condition)

These are the authoritative green gates. A loop is done only when the applicable
subset is green **and** state artifacts match reality:

```bash
make lint                 # must pass
make eval                 # deterministic offline suite must pass
make harness-test         # curriculum harness tests must pass
make check                # full health: lint + eval + harness-test + current chapter
make gate                 # release gate before push (deterministic required; judge if keyed)
./init.sh                 # setup + harness schema + offline checks must pass
```

Chapter grade (curriculum only):

```bash
make check-NN             # e.g. make check-00, make check-01
```

Do not invent new CI workflows as stop conditions. If a command fails, fix or
record a blocker — do not claim done.

## Definition of done

Work is done only when current-session evidence shows:

1. Active feature verification commands were run and passed (or blocker recorded).
2. `feature_list.json` status/evidence updated; at most one local `in_progress`.
3. `progress.md` and `session-handoff.md` match the tree (no stale next-action).
4. For curriculum: handoff in `docs/scale/PROGRESS.md` if a chapter session moved.
5. Changes committed on a `scale`-based branch when the task requires a commit.

## Session lifecycle (curriculum)

- **Start:** `./scripts/session-init.sh` or `./init.sh`. Before changing a chapter,
  commit harness work and run `python scripts/curriculum.py begin NN`.
- **End:** append to `docs/scale/PROGRESS.md` (format at top of that file), commit
  clean, stay on `scale` (or a `scale`-based feature branch).
- **Complete a chapter:** after handoff + solution commit,
  `python scripts/curriculum.py complete NN` (re-runs `make check-NN`).

## Orientation (read on demand)

| To know | Read |
|---------|------|
| what this curriculum is | `docs/scale/README.md` |
| design decisions | `docs/superpowers/specs/2026-07-15-waku-scale-curriculum-design.md` |
| current assignment | `docs/scale/NN-*.md` + track companions |
| decision vs engineering questions | `docs/scale/DECISION-LENSES.md` |
| product scenario | `docs/scale/PRODUCT-SCENARIO.md`, learner's `docs/scale/SCENARIO.md` |
| last curriculum session | `docs/scale/PROGRESS.md` |
| last agent harness session | `session-handoff.md`, `progress.md` |
| architecture whiteboard | `docs/architecture.md` |

## Rules kept from upstream

- **Never wipe `.waku` runtime data without asking first, every time.**
  `scripts/demo_seed.py` requires `--yes` and explicit user approval immediately
  before each run; permission never carries over.
- When a live bug is found, fix it **and** add a regression under
  `evals/deterministic/`.
- No emojis in UI surfaces (dashboard, CLI, README prose).
- No new dependencies without discussion; scale chapters may add optional extras
  per the curriculum design.
- Providers are framed neutrally (Anthropic, OpenAI, Gemini, DeepSeek, Kimi, GLM,
  OpenRouter) — no ranking.
- Review a chapter with the `chapter-review` skill (`.claude/skills/` and
  `.agents/skills/` must stay identical when both exist).

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
