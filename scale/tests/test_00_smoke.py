"""Chapter 0: the instrument check. Not a lesson, a calibration.

5 tenants, full conversations (fact save, gated retrieval, a tool call)
through the real HTTP API on the sim provider. Passing means the harness
itself works: sim answers in the right shape, loadgen measures, the SLO
assertion machinery can gate. Every later chapter trusts this.
"""

from __future__ import annotations

from scale.loadgen import run


def test_smoke_five_tenants(sim_server):
    report = run(sim_server, tenants=5, think_ms=100, timeout=60)
    report.print_summary("ch0 smoke")

    assert len(report.turns) == 15, "5 tenants x 3 scripted turns each"
    assert not report.errors, f"instrument check must be error-free: {report.errors[:3]}"
    # sanity, not SLO: latencies are real measurements, not zeros
    assert report.pct(0.50) > 0.05
