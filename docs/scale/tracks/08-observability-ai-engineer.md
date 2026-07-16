# Chapter 8 AI engineer track: observability

Companion to `docs/scale/08-observability.md`. Read that brief first, and
read the architect track's cardinality and privacy decisions before
building: what you log and at what granularity is a policy call, not an
implementation default.

## By the end of this chapter, you'll be able to

- Add structured logs carrying tenant id, session id, and turn id on
  every line.
- Instrument real OTel spans through a full turn (gate, retrieval, model
  call, each tool) exported to the repo's existing Phoenix setup.
- Implement RED metrics per endpoint, per model, and per tenant class,
  and wire two or three alerts to chapter 1's SLOs.

## Build this

1. Add tenant id, session id, and turn id to every structured log line
   emitted during a turn, so logs are grep-able by any of the three.
2. Extend `waku/ops/tracing.py`'s existing span machinery to cover the
   full turn: gate, retrieval, each tool call, and the model call itself,
   exported through the `make trace` Phoenix path that already exists.
3. Implement RED metrics (rate, errors, duration) per endpoint, per
   model, and per tenant class, at the cardinality level the architect
   track chose (per-tenant logs, per-class metrics, or your own line).
4. Instrument the chapter 5 queue first, per the brief's hint that
   that's where latency hides, before instrumenting every other layer.
5. Apply the privacy policy the architect track decided on to logging
   chat content, deliberately, not by default.
6. Wire two or three alert rules to chapter 1's SLOs so a regression
   pages before a human notices by vibes.
7. Run `make check-08`: locate three consecutive injected faults in
   under ten minutes each using only telemetry, with one alert firing
   before you started looking.

## Read before you start

- `waku/ops/tracing.py` (span machinery and the Phoenix OTel export
  path to extend).
- `waku/ops/dashboard.py:205` (`collect()`, the aggregation point RED
  metrics likely extend or replace).

## Further reading

- [Grafana Labs: The RED Method](https://grafana.com/blog/the-red-method-how-to-instrument-your-services/),
  the concrete rate/errors/duration instrumentation pattern to implement.
- [OpenTelemetry Python documentation](https://opentelemetry.io/docs/languages/python/),
  for the span/tracer API this chapter builds on.
