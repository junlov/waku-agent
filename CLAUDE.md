# waku-agent (scale branch): working conventions

**Read `AGENTS.md` first.** It is the operating manual for this branch:
the reviewer-not-author rule, chapter scope, session lifecycle, and
verification. This file only adds the codebase map.

Note for agents that read upstream history: older revisions of this file
described the `jarvis/` layout and said to push `origin main`. Both are
stale here. Paths are `waku/`, and the working branch is `scale`; `main`
carries an upstream PR and is not pushed from this branch.

## Architecture map (file to whiteboard box)

- `waku/gateway/`: cli, voice (wake word), telegram. Gateways only move text.
- `waku/runtime/session.py`: working memory assembly (SOUL.md + memory + history)
- `waku/loop/agent.py`: THE loop; `loop/models.py`: providers, two wire formats
- `waku/loop/sim_client.py`: the fake model for load tests (scale branch)
- `waku/tools/`: create_event / save_note / send_message (flagship task only)
- `waku/memory/`: semantic (FTS5) / episodic / procedural (SKILL.md) +
  `retrieval_gate.py` + `consolidation.py`
- `waku/ops/`: tracing, dashboard (localhost:7777), release_gate
- `scale/`: load generator + per-chapter load tests; `docs/scale/`: the curriculum
- Runtime state lives in `.waku/` (gitignored)

## Commands

`make check` (lint + offline evals + current chapter) · `make check-NN`
(grade one chapter) · `make dashboard` · `make eval` · `make lint` ·
`./scripts/session-init.sh` (start of every session)

## Rules kept from upstream

- Commit at every working milestone; subject says what, body says why and
  what the change survived.
- When a live bug is found, fix it AND add a regression case to
  `evals/deterministic/`.
- No emojis in UI surfaces. No new dependencies without discussion
  (scale chapters may add them behind optional extras, per the spec).
