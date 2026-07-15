# Chapter 5: queueing and backpressure (short brief; expanded when you start it)

**The scar:** traffic is not smooth. A launch, a newsletter, a Monday 9am:
demand arrives in bursts that exceed capacity, and a system with no opinion
about excess load melts for EVERYONE instead of degrading for SOME.

**You will reproduce:** `make scale-05` sends a 10x burst over your chapter
2 worker pool. Unbounded queuing means every request is accepted and every
request is late; latency climbs without limit, clients time out and retry,
and the retries are new load. The classic death spiral.

**The fix, in shape:** a bounded queue with an admission decision at the
front door. When full, reject fast with an honest 429 and Retry-After
instead of accepting work you cannot do. Add an end-to-end timeout budget:
a turn that has already blown its deadline in the queue should never reach
the model. Load shedding by class if you want the extra credit: paying
tenants queue, free tenants shed first.

**Traps ahead:** where the queue lives matters (per worker? global?
per tenant, feeding chapter 3's fairness?); rejecting is a UX decision, so
the dashboard chat needs to render a 429 as "busy, retry in Ns" rather
than an error; sizing the queue is your SLO math inverted.

**Done when:** under the 10x burst, admitted requests still meet p95,
rejected requests fail in under 100ms with Retry-After, and nothing hangs.
Graceful degradation, on tape.

## Architect prep

**By the end of this chapter, you'll be able to:**
- Explain the retry-storm death spiral: why unbounded queuing under a
  burst makes everything late instead of some things failing fast.
- Name where a bounded queue should live (global, per-worker, per-tenant)
  and why that choice is the same "unit" question as chapter 2, one layer
  up.
- Describe what a good admission-rejection contract looks like from the
  caller's side, not just the server's.

**Questions to settle before you draft the plan** (a design review's
opening questions, not a memorization test; a defensible position is
enough to start drafting):
- Where does the bounded queue live: global, per-worker, or per-tenant
  (feeding chapter 3's fairness model)? Same "unit" question as chapter 2,
  one layer up the stack.
- Admission-rejection contract: reject-fast with 429 always, or load-shed
  by tenant class (paying vs. free)? Does chapter 3 give you the tenant
  class needed to shed by, or does that come later?
- How do you size queue depth: is it literally your chapter 1 SLO math
  inverted, or a separate empirical tuning pass against real burst shape?

**Read before you start:**
- `scale/loadgen.py` (how the 10x burst is generated) and the worker pool
  you built in chapter 2.
- `waku/ops/static/app.js` (how the dashboard chat currently renders
  responses, since a 429 needs to render as "busy, retry in Ns" rather
  than an error).
- Concepts: bounded queues and admission control; load shedding by
  priority class; the retry-storm/thundering-herd failure mode (this sets
  up why chapter 6 insists on jitter).

**Further reading:**
- [AWS Prescriptive Guidance: Retry with backoff pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html),
  directly relevant to the admission/rejection contract this chapter asks
  you to design.
