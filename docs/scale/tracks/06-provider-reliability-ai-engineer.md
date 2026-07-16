# Chapter 6 AI engineer track: provider reliability

Companion to `docs/scale/06-provider-reliability.md`. Read that brief
first, and read the architect track's retryable-error rule and breaker
scope decisions before building.

## By the end of this chapter, you'll be able to

- Implement exponential backoff with jitter, honoring `Retry-After` when
  a provider sends it, inside a retry budget.
- Implement a circuit breaker per model with closed/open/half-open
  states, visible on the Ops tab.
- Implement a fallback chain (primary, alternate, honest degraded
  answer) including separate chains for the gate/summary model slots.

## Build this

1. Add retry logic around provider calls in `waku/loop/models.py`:
   exponential backoff with jitter, respecting `Retry-After` when
   present, bounded by a retry budget so a bad hour cannot double total
   traffic.
2. Implement the retryable-error classification the architect track
   settled on (429 yes, invalid-request no, timeout per their judgment
   call) as an explicit, inspectable rule, not scattered `except` blocks.
3. Build a circuit breaker per model (closed/open/half-open) that trips
   on sustained failures and fails fast while open, at the scope (model,
   provider, or tenant) the architect track chose.
4. Wire the breaker's state transitions into `waku/ops/tracing.py`'s
   span data so the Ops tab can show it opening and closing.
5. Implement the fallback chain: primary model, then alternate, then an
   honest "degraded, try again" response, with the gate and summary model
   slots getting their own chains since fallback models answer
   differently.
6. Handle idempotency for turns that already wrote to memory before a
   retryable failure, at the granularity the architect track decided on.
7. Run `make check-06` against the sim provider's injection profile (5%
   errors, 3% rate limits, 1% hangs): user-visible error rate must stay
   under 1%, p95 must hold, retry volume must stay inside budget.

## Read before you start

- `waku/loop/sim_client.py` (fault-injection knobs to test against) and
  `waku/loop/models.py`'s `PROVIDERS` registry (where the fallback chain
  and retry logic hang).
- `waku/ops/tracing.py` (span structure to extend with breaker state).

## Further reading

- [Amazon Builders' Library: Timeouts, retries, and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/),
  the implementation-level source for the backoff-with-jitter algorithm
  itself.
