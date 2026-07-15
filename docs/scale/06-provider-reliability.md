# Chapter 6: provider reliability (short brief; expanded when you start it)

**The scar:** your uptime is currently a function of one upstream API's
mood. You watched this live: a hung free-tier model wedged the whole app,
and OpenRouter returned rate limits as HTTP 200 with an error body. Model
providers fail weirdly, and at thousands of users, "weirdly" is hourly.

**You will reproduce:** `make scale-06` runs normal load while the sim
provider injects 5% errors, 3% rate limits, and 1% hangs. On current code
every injected failure is a user-visible failed turn, and hangs eat workers
until the timeout.

**The fix, in shape:** retries with exponential backoff AND jitter (retry
storms are self-inflicted bursts; chapter 5 taught why that matters),
honoring Retry-After when the provider sends it, a retry budget so a bad
hour cannot double your traffic, a circuit breaker per model that fails
fast while the upstream is down, and a fallback chain: primary model, then
alternate, then an honest "degraded, try again" answer. The sim provider
made this testable; the PROVIDERS seam makes it configurable.

**Traps ahead:** which errors are retryable is judgment (429 yes, invalid
request no, timeout maybe-once); retrying a turn that already wrote to
memory needs idempotency thinking; fallback models answer differently, so
the gate/summary slots need their own chains.

**Done when:** with the injection profile above, user-visible error rate
stays under 1%, p95 holds, retry volume stays inside its budget, and the
Ops tab shows the breaker opening and closing like a heartbeat.

## Architect prep

**By the end of this chapter, you'll be able to:**
- Classify an upstream failure as retryable, non-retryable, or a
  judgment call, and explain why "timeout" belongs in the judgment-call
  bucket.
- Explain why jitter, not just exponential backoff, is what prevents a
  retry storm.
- Describe what a circuit breaker's open state should mean to a user
  mid-conversation, versus one starting a fresh session.

**Questions to settle before you draft the plan** (a design review's
opening questions, not a memorization test; a defensible position is
enough to start drafting):
- Which errors are retryable, and by what rule (429 yes, invalid-request
  no, timeout is the judgment call)? Where does that rule live so chapter
  7's cost accounting can see it too?
- A turn that already wrote to memory before failing: does the retry need
  idempotency, and at what granularity (per-tool-call, per-turn)?
- Circuit breaker scope: per model, per provider, or per tenant? What does
  "fails fast" mean to a user mid-conversation versus one starting fresh?

**Read before you start:**
- `waku/loop/sim_client.py` (the fault-injection knobs: `WAKU_SIM_ERROR_RATE`,
  `WAKU_SIM_HANG_RATE`, and the 429 roll) and `waku/loop/models.py`'s
  `PROVIDERS` registry (the seam a fallback chain would hang off of).
- `waku/ops/tracing.py` (what a turn's span tree currently records, since
  the breaker's open/close state needs somewhere to show up).
- Concepts: exponential backoff with jitter (and why jitter, not just
  backoff, prevents self-inflicted retry storms); the circuit breaker
  pattern (closed/open/half-open); idempotency keys.

**Further reading:**
- [Amazon Builders' Library: Timeouts, retries, and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/),
  written by an Amazon principal engineer, the primary source the
  "jitter, not just backoff" framing in this brief comes from.
- [AWS Prescriptive Guidance: Circuit breaker pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html).
