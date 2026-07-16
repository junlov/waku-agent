# Chapter 1 AI engineer track: baseline and SLOs

Companion to `docs/scale/01-baseline-slos.md`. Read that brief first for
the failure, the run command, and the deliverable shape. This chapter has
no fix to build; the engineering work is making sure the measurement
itself is correct and that you understand exactly what it's measuring
before you commit to numbers in `SLO.md`.

## By the end of this chapter, you'll be able to

- Read `scale/tests/test_01_baseline.py` and `scale/loadgen.py` well
  enough to say exactly what "p95 turn latency" and "throughput/min" mean
  in terms of wall-clock events, not just as labels in a table.
- Explain, from the actual `threading.Lock()` semantics in
  `waku/ops/dashboard.py`, why the serialization is total (every turn
  waits for every earlier turn) rather than partial.
- Reproduce the baseline numbers yourself and sanity-check them against
  the sim provider's configured latency.

## Build/verify this

1. Run `make scale-01` and confirm your own numbers are in the same shape
   as the ones already recorded in `docs/scale/PROGRESS.md` (p95 growing
   roughly linearly with tenant count, throughput flat). If they aren't,
   that's a signal to debug the harness before trusting any SLO drafted
   from it, not to shrug and move on.
2. Read `waku/ops/dashboard.py:43` and trace one full request through
   `_agent_lock.acquire()` to release, so you can point to the exact
   line where a second tenant's request starts waiting.
3. Read `scale/loadgen.py`'s percentile calculation. Confirm it's
   computing p50/p95 over completed-turn wall-clock time, not something
   subtly different (e.g., model-call time only, which would hide queuing
   delay entirely).
4. Cross-check the sim provider's configured latency (median 300ms per
   the brief) against what `waku/loop/sim_client.py` actually does, so
   you know how much of the measured latency is "the model" versus "the
   lock."

## Read before you start

- `scale/tests/test_01_baseline.py`: the exact ramp (1/2/5/10 tenants),
  and the assertion that p95 at 10 tenants must be more than 2x p95 at 1
  tenant (the test's built-in check that the lock's signature is real).
- `scale/loadgen.py`: how tenants are simulated and how the summary dict
  (`p50_s`, `p95_s`, `throughput_turns_min`, `errors`) is built.
- `waku/ops/dashboard.py:43` and `:937`: the lock and the threaded server
  that makes contention on it observable in the first place.
