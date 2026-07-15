# Chapter 10: evals at scale (short brief; expanded when you start it)

**The scar:** you swap the model, tweak the prompt, ship, and quality
quietly drops for everyone at once. The repo's release gate already stops
the failures it can SEE (deterministic cases, two judge metrics), but your
real users generate failure modes your eval set never imagined. At scale,
your traffic IS the eval set; the discipline is using it before full
rollout, not after the complaints.

**You will reproduce:** `make scale-10` ships a deliberately worse config
(a weaker sim model profile with degraded answers) straight to 100% of
simulated traffic. The existing `make gate` passes it, the loadgen's
correctness checks mostly pass it, and quality craters anyway. Nothing
automatic objects. That silence is the failure.

**The fix, in shape:** three rings. Shadow traffic: replay a sample of
real (simulated-real) conversations against the candidate config offline,
judge both sides, diff the scores. Canary: route 5% of live traffic to the
candidate, compare SLOs and judge scores against the control ring, with
automatic rollback on regression. And a feedback loop: sample production
turns (with chapter 8's telemetry and a privacy filter) into the
deterministic eval set, so every incident becomes a regression test, which
is the same rule this fork already follows for code.

**Traps ahead:** judge-model noise at small sample sizes (you need enough
canary turns before the comparison means anything); shadow traffic must
not write to real memory (replay against a scratch tenant); "worse" needs
a definition before the experiment, or the experiment decides nothing.

**Done when:** the deliberately worse config is blocked automatically at
the canary ring with a report a human can read, a genuinely fine config
sails through, and one incident from an earlier chapter now lives in the
deterministic suite as a regression case.
