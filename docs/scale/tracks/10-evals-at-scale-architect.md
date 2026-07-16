# Chapter 10 architect track: evals at scale

Companion to `docs/scale/10-evals-at-scale.md`. Read that brief first for
the scar, the reproduction, the fix in shape, and the done-when criteria.

## By the end of this chapter, you'll be able to

- Explain why "the gate passes and quality craters anyway" is possible,
  and name the gap in what the gate currently measures.
- Define "worse" for a candidate config before an experiment runs, not
  after looking at results.
- Describe the difference between shadow traffic and a canary ring, and
  what each can and cannot tell you.

## Questions to settle before you draft the plan

A design review's opening questions, not a memorization test; a
defensible position is enough to start drafting.

- Shadow vs. canary: what sample size makes the canary comparison
  statistically meaningful given judge-model noise? Is that a number you
  can defend before the experiment runs, per the brief's "worse needs a
  definition before the experiment" warning?
- Rollback trigger: automatic on SLO regression, judge-score regression,
  or both? What threshold, and who or what owns un-blocking it afterward?
- Feedback loop: which production turns get sampled into the
  deterministic suite, and what privacy filter runs before they do?

## Orient yourself on

- `waku/ops/release_gate.py` (the existing gate: deterministic suite plus
  judge suite, and what "GATE CLOSED" already means here).
- `evals/judge/anthropic_judge.py` and `evals/dataset.jsonl` (how a judge
  score is produced today, before you add a canary comparison on top).
- Concepts: shadow traffic vs. canary releases; statistical significance
  at small sample sizes; automatic rollback triggers tied to SLOs.
