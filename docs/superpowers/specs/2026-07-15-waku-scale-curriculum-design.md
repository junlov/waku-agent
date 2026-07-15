# Waku at scale: a break-first curriculum for production agent harnesses

Date: 2026-07-15
Status: approved (designed collaboratively in-session)

## Purpose

Turn this fork into "part two" of the waku-agent teaching repo: a staged
curriculum that teaches the scale problems of running agent harnesses in
production for thousands of users. Upstream teaches the skeleton (harness,
loop, memory, eval). This branch teaches what breaks when real traffic hits
that skeleton, one reproducible failure at a time.

The learner (Junior) builds toward shipping multi-tenant SaaS agents
professionally. Success is understanding earned by fixing, not by reading.

## Decisions (locked)

- **End state:** teaching repo for scale. Keep the readable-in-an-afternoon
  ethos per chapter. Not a hosted product; not a separate repo.
- **Production shape simulated:** multi-tenant SaaS agent. Thousands of
  users, each with isolated memory and sessions, hitting a shared web API.
- **Learning mode:** break it, then the learner fixes it. Claude writes each
  chapter's brief and a load test that fails on current code; the learner
  implements the fix; Claude reviews like a senior engineer.
- **Dependencies:** real infrastructure allowed, gated behind per-chapter
  optional extras (for example `[scale-db]`, `[scale-queue]`) plus a docker
  compose file for local infra. `main` stays stdlib-only and clean for the
  upstream PR.
- **LLM traffic:** load tests never hit real model APIs. A `sim` provider in
  `PROVIDERS` fakes the model: configurable latency distributions, scripted
  tool calls, injected errors/429s/hangs, zero cost. Real models remain for
  functional spot-checks only.

## Repo mechanics

- Long-lived `scale` branch off `main`. `main` remains the clean upstream
  PR surface.
- Each chapter N ships as:
  1. `docs/scale/NN-<topic>.md`: a one-page brief (concept, the failure you
     are about to reproduce, hints, done-criteria). Written by Claude.
  2. `scale/tests/test_NN_*.py`: a load test that FAILS on the pre-chapter
     code. Written by Claude. Committed failing, with the failure output
     quoted in the brief.
  3. Fix commits by the learner (reviewed, iterated).
  4. Tag `chapter-NN-done` when the load test passes inside SLO, so any
     chapter can be diffed against the simple version.
- Progress tracked in beads (`.beads/` store on this branch): one epic,
  one issue per chapter.

## The harness (chapter 0, built by Claude)

Three pieces, all under `scale/` except the provider:

1. **`sim` provider** (`waku/loop/models.py` + `waku/loop/sim_client.py`):
   a PROVIDERS entry whose client speaks the same Anthropic message shape
   with no network. Tunable via env/args: latency distribution (p50/p95),
   error rate, 429 rate, hang rate, scripted tool-call sequences keyed by
   prompt patterns. This is the chaos-engineering seam.
2. **Load generator** (`scale/loadgen.py`): simulates N tenants, each an
   independent conversation script with think-time jitter, against the
   dashboard HTTP API. Reports p50/p95/p99 latency, throughput, error rate,
   and per-tenant correctness checks (did MY fact come back to ME).
3. **SLO assertions**: each chapter's load test states its SLO in code
   (example: 500 concurrent tenants, p95 < 2s with sim latency at 300ms,
   error rate < 1%, zero cross-tenant leaks) and fails until met.

Dashboard Ops tab grows percentile latency charts and per-tenant cost/token
breakdowns as chapters need them (the meltdown must be visible, not just a
test failure).

## Curriculum

Ordered; each chapter builds on the previous. 1-3 are the core of
"thousands of users"; 4-7 are the professional middle; 8-10 are deferrable.

| # | Chapter | The scar it teaches |
|---|---------|---------------------|
| 0 | Harness | sim provider, loadgen, SLOs (no fix: Claude builds this) |
| 1 | Baseline & SLOs | the global `_agent_lock` serializes everything at 2 concurrent users |
| 2 | Concurrency | per-session workers; SQLite under concurrent writers; the GIL |
| 3 | Multi-tenancy | tenant isolation, auth boundary, noisy neighbors, per-tenant limits; the leak test |
| 4 | Durable state | SQLite to Postgres, pooling, migrations, N+1s in `collect()` |
| 5 | Queueing & backpressure | admission control, load shedding, end-to-end timeout budgets |
| 6 | Provider reliability | retries with jittered backoff, circuit breakers, model fallback chains |
| 7 | Cost & abuse control | per-tenant token budgets, metering, caching, cheap-model routing |
| 8 | Observability | real OTel, structured logs, alerting, fault-injection debugging drills |
| 9 | Horizontal scale & deploy | stateless workers behind a proxy, shared session store, graceful shutdown, 3-worker compose cluster |
| 10 | Evals at scale | shadow traffic, canary gates, regression evals on sampled conversations |

## Per-chapter workflow

1. Claude commits brief + failing load test.
2. Learner reads brief, runs `make scale-NN`, watches the dashboard melt.
3. Learner implements the fix on `scale` (any number of commits).
4. Claude reviews: correctness, then whether the fix would survive the next
   chapter's traffic. Iterate.
5. Tag `chapter-NN-done`. Update the beads issue. Move on.

## Error handling and guardrails

- Load tests must be deterministic enough to gate on: sim provider seeds
  its randomness; SLO thresholds carry ~2x headroom over observed-fixed
  performance to absorb machine variance.
- No chapter may break `make eval` (the upstream deterministic suite keeps
  passing on `scale` at every tag).
- Secrets policy unchanged: sim provider needs no key; real-model spot
  checks read the existing `.env`.

## Success criteria

- `scale` branch runs 1,000 simulated tenants on a laptop inside SLO by
  chapter 9.
- Every chapter tag diffs cleanly against its predecessor and the learner
  can explain every line of the diff.
- Briefs are good enough that the branch works as a public "part two"
  (upstream-PR-able as a pointer, or a standalone learning resource).
