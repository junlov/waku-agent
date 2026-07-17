# Chapter 16 architect track: durable agent execution

## By the end

- Define the durable command, authoritative state machine, and worker protocol.
- Choose effect semantics and retry ownership per boundary.
- Explain cancellation, resumption, leases, fencing, and operator recovery.

## Questions to settle

- What is the smallest durable command, and where do large artifacts live?
- Which store authoritatively owns pending, claimed, cancelled, and terminal state?
- Which effects are naturally idempotent, deduplicated, compensatable, or manual?
- How do lease expiry and fencing prevent a stale worker from committing?

## Orient yourself on

- Chapters 5, 6, 8, 9, 11, and 15 as prerequisites.
- Queue visibility timeouts, transactional outbox, idempotency keys, and fencing tokens.
- A workflow engine as one implementation option, never as the architecture itself.

The final pressure test is portability: replace the queue, worker runtime, or
cloud without changing the command and effect contracts.
