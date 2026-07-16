# Chapter 8 architect track: observability

Companion to `docs/scale/08-observability.md`. Read that brief first for
the scar, the reproduction, the fix in shape, and the done-when criteria.

## By the end of this chapter, you'll be able to

- Explain the cardinality tradeoff between per-tenant and per-class
  metrics, and where your own line falls.
- Justify a privacy policy for logging chat content before writing any
  logging code.
- Name the layer you would instrument first and defend why, rather than
  instrumenting everything at once.

## Questions to settle before you draft the plan

A design review's opening questions, not a memorization test; a
defensible position is enough to start drafting.

- Cardinality tradeoff: per-tenant logs but per-class metrics is the
  brief's suggested compromise. Where is your actual line, and what
  breaks it (100 tenants vs. 100k)?
- Logging chat content: what is the privacy policy, and does it differ
  between structured logs and OTel span attributes?
- Which layer gets instrumented first: the chapter 5 queue, since
  "that's where latency hides"? What is your evidence that is the right
  starting point versus, say, the model call itself?

## Orient yourself on

- `waku/ops/tracing.py` (existing span/trace machinery and the Phoenix
  OTel export path already wired behind `make trace`).
- `waku/ops/dashboard.py:205` (`collect()`, today's only aggregation
  point, and its likely successor for RED metrics).
- Concepts: RED metrics (rate, errors, duration); metric cardinality
  and its cost at scale; structured logging with correlation ids
  (tenant/session/turn) as the grep-able baseline.

## Further reading

- [Grafana Labs: The RED Method](https://grafana.com/blog/the-red-method-how-to-instrument-your-services/)
  by Tom Wilkie, the rate/errors/duration framing this brief uses
  directly.
- [Brendan Gregg: The USE Method](https://www.brendangregg.com/usemethod.html),
  the infrastructure-side complement (utilization/saturation/errors) for
  anything below the service layer.
