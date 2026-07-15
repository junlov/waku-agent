"""Chapter 1: the honest baseline. This test measures; it does not judge.

Ramp 1 -> 2 -> 5 -> 10 concurrent tenants against today's single-lock Waku
and print the table the brief asks you to stare at. Expect p95 to grow
roughly linearly with tenants while throughput stays flat: the signature of
serialized work. Your deliverable is docs/scale/SLO.md; chapter 2 encodes
it and starts failing.
"""

from __future__ import annotations

from scale.loadgen import run

RAMP = [1, 2, 5, 10]


def test_baseline_ramp(sim_server):
    print("\ntenants  p50s   p95s   throughput/min  errors")
    rows = []
    for n in RAMP:
        report = run(sim_server, tenants=n, think_ms=100, timeout=90)
        s = report.summary()
        rows.append(s)
        print(f"{n:>7}  {s['p50_s']:>5}  {s['p95_s']:>5}  {s['throughput_turns_min']:>14}  {s['errors']:>6}")

    # measurement happened; judging it is your job (see the brief)
    assert all(r["ok"] > 0 for r in rows)
    # the smoking gun, asserted so the lesson is on the record: adding 10x
    # the users bought materially worse tail latency, not more throughput
    assert rows[-1]["p95_s"] > rows[0]["p95_s"] * 2, (
        "expected the global lock to serialize turns; did someone already fix chapter 2?")
