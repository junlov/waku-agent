# Chapter 5 AI engineer track: queueing and backpressure

Companion to `docs/scale/05-queueing-backpressure.md`. Read that brief
first, and read the architect track's decision on where the queue lives
before building: a global queue and a per-tenant queue are different
implementations, not a parameter tweak on one design.

## By the end of this chapter, you'll be able to

- Implement a bounded queue with a fast-reject admission path (honest 429
  plus `Retry-After`) instead of unbounded queuing.
- Implement an end-to-end timeout budget so a turn that already blew its
  deadline in queue never reaches the model.
- Make the dashboard chat render a 429 as "busy, retry in Ns" instead of
  a generic error.

## Build this

1. Implement the bounded queue at the layer the architect track chose
   (global, per-worker, or per-tenant), sized against your chapter 1 SLO
   math, not an arbitrary constant.
2. At the front door, add an admission check: if the queue is full,
   reject immediately with a 429 and a `Retry-After` header, rather than
   accepting work the system cannot do in time.
3. Add an end-to-end timeout budget per turn, checked before the model
   call: if a turn has already exceeded its deadline while queued, fail
   it there instead of spending a model call on work nobody will see.
4. If pursuing load shedding by class: use chapter 3's tenant identity to
   route free-tier tenants to shed first under load, paying tenants to
   queue longer.
5. Update `waku/ops/static/app.js` (the dashboard chat rendering) so a
   429 response renders as "busy, retry in Ns," not as a failed turn.
6. Run `make check-05`: under the 10x burst, admitted requests must still
   meet chapter 1's p95, and rejected requests must fail in under 100ms
   with `Retry-After`, with nothing hanging.

## Read before you start

- `scale/loadgen.py` (how the 10x burst is generated, to test against).
- The chapter 2 worker pool implementation (what you're adding admission
  control in front of).
- `waku/ops/static/app.js` (current response rendering to update).
