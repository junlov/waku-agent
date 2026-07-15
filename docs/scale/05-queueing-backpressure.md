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
