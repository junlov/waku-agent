# Chapter 1: baseline and SLOs, or: watching one lock ruin everything

**Your job this chapter:** run the test, read the numbers, and write down
the SLOs you will hold yourself to for the rest of the curriculum. You fix
nothing yet. Honest measurement before optimization, always.

Two tracks exist for the prep work below: `tracks/01-baseline-slos-ai-engineer.md`
(build and instrument the measurement correctly) and
`tracks/01-baseline-slos-architect.md` (commit to defensible numbers). Pick
the one that matches what you are practicing, or read both.

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

## Done when

`scale/tests/test_01_baseline.py` has produced its report, your `SLO.md` is
committed, and you can explain in one paragraph why throughput was flat.
The test "passes" by measuring, not by meeting the SLO: that is chapter 2's
problem.
