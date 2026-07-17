# Chapter 16 AI engineer track: durable agent execution

## By the end

- Implement a durable state machine with claim, lease, fencing, and cancellation.
- Make side effects safe under crash and redelivery.
- Reconstruct every terminal result from durable evidence.

## Build this

1. Persist a versioned command and explicit run/stage state transitions.
2. Implement atomic claim, lease renewal, fencing token, and stale-claim recovery.
3. Give every external effect stable idempotency or deduplication semantics.
4. Checkpoint durable progress and propagate cancellation across retries.
5. Inject crashes at every boundary plus duplicate and reordered delivery.
6. Make `make check-16` prove convergence, effect counts, fencing, and replay.

Do not claim exactly-once execution; state the actual effect guarantee and prove it.
