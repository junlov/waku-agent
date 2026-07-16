# Chapter 10 AI engineer track: evals at scale

Companion to `docs/scale/10-evals-at-scale.md`. Read that brief first, and
read the architect track's definition of "worse" and rollback trigger
before building: without those settled, the harness has nothing to check
against.

## By the end of this chapter, you'll be able to

- Build a shadow-traffic harness that replays sampled conversations
  against a candidate config offline, without writing to real memory.
- Build a canary ring that routes a percentage of live traffic to a
  candidate config and compares SLOs and judge scores against control.
- Wire an automatic rollback on regression, and a feedback loop that
  turns production incidents into deterministic regression tests.

## Build this

1. Build the shadow-traffic harness: sample real (simulated-real)
   conversations, replay them against the candidate config against a
   scratch tenant (never real memory), judge both sides with
   `evals/judge/anthropic_judge.py`, and diff the scores.
2. Build the canary ring: route the percentage of live traffic the
   architect track chose to the candidate config, and compare both SLOs
   (from chapter 1) and judge scores against the control ring in
   real time.
3. Wire automatic rollback: when the canary ring's comparison crosses
   the threshold the architect track defined, revert to the control
   config without a human in the loop.
4. Extend `waku/ops/release_gate.py` so canary results feed into the
   same "GATE CLOSED" mechanism the deterministic and judge suites
   already use.
5. Build the feedback loop: sample production turns (using chapter 8's
   telemetry, through the privacy filter the architect track defined)
   into `evals/dataset.jsonl` or a new deterministic case, so incidents
   become regression tests.
6. Run `make check-10`: the deliberately worse config must be blocked
   automatically at the canary ring with a human-readable report, a
   genuinely fine config must sail through, and one earlier incident
   must now live in the deterministic suite.

## Read before you start

- `waku/ops/release_gate.py` (the gate mechanism to extend).
- `evals/judge/anthropic_judge.py` and `evals/dataset.jsonl` (the judge
  scoring and dataset format to build the shadow/canary comparison on).
