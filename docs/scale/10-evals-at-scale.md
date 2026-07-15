# Chapter 10: evals at scale (short brief; expanded when you start it)

**The scar:** you swap the model, tweak the prompt, ship, and quality
quietly drops for everyone at once. The repo's release gate already stops
the failures it can SEE (deterministic cases, two judge metrics), but your
real users generate failure modes your eval set never imagined. At scale,
your traffic IS the eval set; the discipline is using it before full
rollout, not after the complaints.

**You will reproduce:** `make scale-10` ships a deliberately worse config
(a weaker sim model profile with degraded answers) straight to 100% of
simulated traffic. The existing `make gate` passes it, the loadgen's
correctness checks mostly pass it, and quality craters anyway. Nothing
automatic objects. That silence is the failure.

**The fix, in shape:** three rings. Shadow traffic: replay a sample of
real (simulated-real) conversations against the candidate config offline,
judge both sides, diff the scores. Canary: route 5% of live traffic to the
candidate, compare SLOs and judge scores against the control ring, with
automatic rollback on regression. And a feedback loop: sample production
turns (with chapter 8's telemetry and a privacy filter) into the
deterministic eval set, so every incident becomes a regression test, which
is the same rule this fork already follows for code.

**Traps ahead:** judge-model noise at small sample sizes (you need enough
canary turns before the comparison means anything); shadow traffic must
not write to real memory (replay against a scratch tenant); "worse" needs
a definition before the experiment, or the experiment decides nothing.

**Done when:** the deliberately worse config is blocked automatically at
the canary ring with a report a human can read, a genuinely fine config
sails through, and one incident from an earlier chapter now lives in the
deterministic suite as a regression case.

## Architect prep

**By the end of this chapter, you'll be able to:**
- Explain why "the gate passes and quality craters anyway" is possible,
  and name the gap in what the gate currently measures.
- Define "worse" for a candidate config before an experiment runs, not
  after looking at results.
- Describe the difference between shadow traffic and a canary ring, and
  what each can and cannot tell you.

**Questions to settle before you draft the plan** (a design review's
opening questions, not a memorization test; a defensible position is
enough to start drafting):
- Shadow vs. canary: what sample size makes the canary comparison
  statistically meaningful given judge-model noise? Is that a number you
  can defend before the experiment runs, per the brief's "worse needs a
  definition before the experiment" warning?
- Rollback trigger: automatic on SLO regression, judge-score regression,
  or both? What threshold, and who or what owns un-blocking it afterward?
- Feedback loop: which production turns get sampled into the
  deterministic suite, and what privacy filter runs before they do?

**Read before you start:**
- `waku/ops/release_gate.py` (the existing gate: deterministic suite plus
  judge suite, and what "GATE CLOSED" already means here).
- `evals/judge/anthropic_judge.py` and `evals/dataset.jsonl` (how a judge
  score is produced today, before you add a canary comparison on top).
- Concepts: shadow traffic vs. canary releases; statistical significance
  at small sample sizes; automatic rollback triggers tied to SLOs.
