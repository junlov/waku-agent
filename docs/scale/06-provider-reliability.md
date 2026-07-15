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
