# Chapter 1: baseline and SLOs, or: watching one lock ruin everything

**Your job this chapter:** run the test, read the numbers, and write down
the SLOs you will hold yourself to for the rest of the curriculum. You fix
nothing yet. Honest measurement before optimization, always.

## The failure you are about to reproduce

You already lived it once. When a qwen model hung mid-turn earlier in this
fork's history, every later chat queued behind it and the app looked dead.
That was not bad luck; it is the architecture:

```python
# waku/ops/dashboard.py
_agent = None
_agent_lock = threading.Lock()   # <- chapter 1 is about this line
```

One agent object, one lock, one turn at a time, for every user of the
process. The dashboard server is threaded (`ThreadingHTTPServer`), so
requests ARRIVE concurrently, then serialize right here.

## What to run

```
make scale-01
```

The test ramps tenants: 1, 2, 5, 10 concurrent conversations on the `sim`
provider (median 300ms latency). Watch the Ops tab while it runs.

## What you should expect to see

With one tenant, turn latency is roughly sim latency times calls-per-turn:
fine. With N tenants, every turn waits for the turns ahead of it, so p95
approaches N times a full turn. At 10 tenants, users are waiting tens of
seconds for a 300ms model. Throughput stays flat no matter how many users
arrive: the definition of "does not scale".

Also watch for the second-order effect: the loadgen's correctness checks
still PASS. The system is slow, not wrong. Slow-but-correct versus
fast-but-wrong is a distinction you will trade along all curriculum long.

## Your deliverable

A short `docs/scale/SLO.md` you write yourself, stating:

- p95 turn-latency target at 100 and at 500 concurrent tenants
- error-rate budget
- correctness invariants that may never regress (tenant isolation, memory
  round-trip)

Pick numbers you can defend. Chapter 2's test will encode them, and every
later chapter is graded against your own contract. That is what an SLO is:
a promise you wrote before the incident, so the incident has a scoreboard.

## By the end of this chapter, you'll be able to

- State an SLO as a promise made before the incident, not a number picked
  to look good.
- Explain why p95 (not average) is the number that exposes a serialization
  bottleneck, and why throughput can stay flat while latency climbs.
- Name the unit of safe concurrency this system currently lacks, and why
  that gap is exactly what the lock is standing in for.

## Questions worth answering before chapter 2 (in your head, or to Claude)

These are the questions a design review would open with, not a
memorization test. A defensible position on each is enough to start
drafting `SLO.md`; you do not need a complete answer before you begin.

1. Why does the lock exist at all? What breaks if you just delete it?
   (Hint: `Waku.respond` mutates session history; SQLite has one writer.)
2. What is the UNIT of safe concurrency here: the process, the tenant, the
   session, or the turn?
3. The CLI, voice, and Telegram gateways share this same agent object.
   Which of them care about ordering?

## Read before you start

- `waku/ops/dashboard.py:43` (the module-level lock itself) and line 937
  (the `ThreadingHTTPServer` that makes requests arrive concurrently in
  the first place).
- `scale/tests/test_01_baseline.py` and `scale/loadgen.py`: how the ramp
  (1/2/5/10 tenants) is driven and what "turn latency" actually measures.
- Concepts worth having cold: the difference between an SLI, an SLO, and
  an SLA; why p95/p99 (not average) is the number that catches queuing
  effects; Little's Law as the intuition for why throughput stays flat
  while latency climbs behind a single serialization point.

**Further reading:**
- [Google SRE Book: Service Level Objectives](https://sre.google/sre-book/service-level-objectives/),
  the canonical SLI/SLO/error-budget definitions.
- [SRE Workbook: Implementing SLOs](https://sre.google/workbook/implementing-slos/)
  and [Error Budget Policy](https://sre.google/workbook/error-budget-policy/),
  the practical follow-through once you have picked numbers.

## Done when

`scale/tests/test_01_baseline.py` has produced its report, your `SLO.md` is
committed, and you can explain in one paragraph why throughput was flat.
The test "passes" by measuring, not by meeting the SLO: that is chapter 2's
problem.
