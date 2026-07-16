# Chapter 8: observability (short brief; expanded when you start it)

Two tracks exist for the prep work: `tracks/08-observability-ai-engineer.md`
(build the fix) and `tracks/08-observability-architect.md` (decide the
shape of the fix). Pick the one that matches what you are practicing, or
read both, in that order.

**The scar:** something is wrong for 2% of tenants and you cannot say
which two percent, or why, or since when. Debugging by vibes works at one
user because you ARE the user. At a thousand, telemetry is the only pair
of eyes you have.

**You will reproduce:** a drill, not a load test. `make scale-08` starts
load with a fault hidden somewhere (the sim provider degrades one model,
or one tenant's data hits a slow query; the test picks secretly and
randomly). Your job: find it using only the dashboards and logs, no
reading the test source, against the clock.

**The fix, in shape:** structured logs with tenant id, session id, and
turn id on every line (grep-able truth); real OTel spans through the whole
turn (gate, retrieval, model call, each tool) exported to the Phoenix
setup the repo already ships behind `make trace`; RED metrics (rate,
errors, duration) per endpoint, per model, per tenant class; and two or
three alert rules wired to your SLOs from chapter 1, because a dashboard
nobody is looking at is a diary, not an alarm.

**Traps ahead:** cardinality (per-tenant metrics at 100k tenants is a
bill of its own; per-tenant LOGS but per-CLASS metrics is the usual
compromise); logging chat content is a privacy decision, make it
deliberately; instrument the queue from chapter 5 first, it is where
latency hides.

**Done when:** you locate three consecutive injected faults in under ten
minutes each, from telemetry alone, and one alert fired before you
started looking.
