# Chapter 6 architect track: provider reliability

Companion to `docs/scale/06-provider-reliability.md`. Read that brief
first for the scar, the reproduction, the fix in shape, and the done-when
criteria.

## By the end of this chapter, you'll be able to

- Classify an upstream failure as retryable, non-retryable, or a
  judgment call, and explain why "timeout" belongs in the judgment-call
  bucket.
- Explain why jitter, not just exponential backoff, is what prevents a
  retry storm.
- Describe what a circuit breaker's open state should mean to a user
  mid-conversation, versus one starting a fresh session.

## Questions to settle before you draft the plan

A design review's opening questions, not a memorization test; a
defensible position is enough to start drafting.

- Which errors are retryable, and by what rule (429 yes, invalid-request
  no, timeout is the judgment call)? Where does that rule live so chapter
  7's cost accounting can see it too?
- A turn that already wrote to memory before failing: does the retry need
  idempotency, and at what granularity (per-tool-call, per-turn)?
- Circuit breaker scope: per model, per provider, or per tenant? What does
  "fails fast" mean to a user mid-conversation versus one starting fresh?

## Orient yourself on

- `waku/loop/sim_client.py` (the fault-injection knobs: `WAKU_SIM_ERROR_RATE`,
  `WAKU_SIM_HANG_RATE`, and the 429 roll) and `waku/loop/models.py`'s
  `PROVIDERS` registry (the seam a fallback chain would hang off of).
- `waku/ops/tracing.py` (what a turn's span tree currently records, since
  the breaker's open/close state needs somewhere to show up).
- Concepts: exponential backoff with jitter (and why jitter, not just
  backoff, prevents self-inflicted retry storms); the circuit breaker
  pattern (closed/open/half-open); idempotency keys.

## Further reading

- [Amazon Builders' Library: Timeouts, retries, and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/),
  written by an Amazon principal engineer, the primary source the
  "jitter, not just backoff" framing in this brief comes from.
- [AWS Prescriptive Guidance: Circuit breaker pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html).
