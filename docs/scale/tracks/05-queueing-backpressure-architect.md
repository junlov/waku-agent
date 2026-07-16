# Chapter 5 architect track: queueing and backpressure

Companion to `docs/scale/05-queueing-backpressure.md`. Read that brief
first for the scar, the reproduction, the fix in shape, and the done-when
criteria.

## By the end of this chapter, you'll be able to

- Explain the retry-storm death spiral: why unbounded queuing under a
  burst makes everything late instead of some things failing fast.
- Name where a bounded queue should live (global, per-worker, per-tenant)
  and why that choice is the same "unit" question as chapter 2, one layer
  up.
- Describe what a good admission-rejection contract looks like from the
  caller's side, not just the server's.

## Questions to settle before you draft the plan

A design review's opening questions, not a memorization test; a
defensible position is enough to start drafting.

- Where does the bounded queue live: global, per-worker, or per-tenant
  (feeding chapter 3's fairness model)? Same "unit" question as chapter 2,
  one layer up the stack.
- Admission-rejection contract: reject-fast with 429 always, or load-shed
  by tenant class (paying vs. free)? Does chapter 3 give you the tenant
  class needed to shed by, or does that come later? `docs/scale/SCENARIO.md`
  should already say which tier gets protected first; this is where that
  promise gets tested under load.
- How do you size queue depth: is it literally your chapter 1 SLO math
  inverted, or a separate empirical tuning pass against real burst shape?

## Orient yourself on

- `scale/loadgen.py` (how the 10x burst is generated) and the worker pool
  you built in chapter 2.
- `waku/ops/static/app.js` (how the dashboard chat currently renders
  responses, since a 429 needs to render as "busy, retry in Ns" rather
  than an error).
- Concepts: bounded queues and admission control; load shedding by
  priority class; the retry-storm/thundering-herd failure mode (this sets
  up why chapter 6 insists on jitter).

## Further reading

- [AWS Prescriptive Guidance: Retry with backoff pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html),
  directly relevant to the admission/rejection contract this chapter asks
  you to design.
