# Chapter 1 architect track: baseline and SLOs

Companion to `docs/scale/01-baseline-slos.md`. Read that brief first for
the failure, the run command, and the deliverable shape. Read
`docs/scale/PRODUCT-SCENARIO.md` and write `docs/scale/SCENARIO.md`
before drafting `SLO.md`: the questions below are easier to answer with a
concrete tenant in mind than in the abstract.

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

## Orient yourself on

- `waku/ops/dashboard.py:43` (the module-level lock itself) and line 937
  (the `ThreadingHTTPServer` that makes requests arrive concurrently in
  the first place). You do not need to modify this file this chapter;
  you need to understand what it is standing in for.
- What "turn latency" means in `scale/tests/test_01_baseline.py` and
  `scale/loadgen.py`, well enough to defend a target number against it.
- Concepts worth having cold: the difference between an SLI, an SLO, and
  an SLA; why p95/p99 (not average) is the number that catches queuing
  effects; Little's Law as the intuition for why throughput stays flat
  while latency climbs behind a single serialization point.

## Further reading

- [Google SRE Book: Service Level Objectives](https://sre.google/sre-book/service-level-objectives/),
  the canonical SLI/SLO/error-budget definitions.
- [SRE Workbook: Implementing SLOs](https://sre.google/workbook/implementing-slos/)
  and [Error Budget Policy](https://sre.google/workbook/error-budget-policy/),
  the practical follow-through once you have picked numbers.
