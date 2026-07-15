# Chapter 8: observability (short brief; expanded when you start it)

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

## Architect prep

**By the end of this chapter, you'll be able to:**
- Explain the cardinality tradeoff between per-tenant and per-class
  metrics, and where your own line falls.
- Justify a privacy policy for logging chat content before writing any
  logging code.
- Name the layer you would instrument first and defend why, rather than
  instrumenting everything at once.

**Questions to settle before you draft the plan** (a design review's
opening questions, not a memorization test; a defensible position is
enough to start drafting):
- Cardinality tradeoff: per-tenant logs but per-class metrics is the
  brief's suggested compromise. Where is your actual line, and what
  breaks it (100 tenants vs. 100k)?
- Logging chat content: what is the privacy policy, and does it differ
  between structured logs and OTel span attributes?
- Which layer gets instrumented first: the chapter 5 queue, since
  "that's where latency hides"? What is your evidence that is the right
  starting point versus, say, the model call itself?

**Read before you start:**
- `waku/ops/tracing.py` (existing span/trace machinery and the Phoenix
  OTel export path already wired behind `make trace`).
- `waku/ops/dashboard.py:205` (`collect()`, today's only aggregation
  point, and its likely successor for RED metrics).
- Concepts: RED metrics (rate, errors, duration); metric cardinality
  and its cost at scale; structured logging with correlation ids
  (tenant/session/turn) as the grep-able baseline.

**Further reading:**
- [Grafana Labs: The RED Method](https://grafana.com/blog/the-red-method-how-to-instrument-your-services/)
  by Tom Wilkie, the rate/errors/duration framing this brief uses
  directly.
- [Brendan Gregg: The USE Method](https://www.brendangregg.com/usemethod.html),
  the infrastructure-side complement (utilization/saturation/errors) for
  anything below the service layer.
