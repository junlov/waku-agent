# Chapter 0: the harness

**Built for you, not by you.** Read it anyway: these three instruments are
what every later chapter points at Waku, and "how would I measure this" is
half of production engineering.

## Why load tests cannot use real models

A thousand simulated users would cost real money, hit provider rate limits
in seconds, and produce non-reproducible failures (the provider's bad day,
not your bug). Production load testing always stubs the expensive
dependency and keeps its SHAPE: latency, errors, and payload structure.

## Instrument 1: the `sim` provider

A new `PROVIDERS` entry whose client speaks the exact Anthropic message
shape the loop expects, with zero network. It is the same seam every real
provider plugs into, which is the lesson: if your architecture has clean
seams, chaos engineering is a config change.

Tunable (env vars, all prefixed `WAKU_SIM_`):

| Knob | Meaning | Default |
|------|---------|---------|
| `LATENCY_MS` | median response latency | 300 |
| `LATENCY_P95_MS` | tail latency (lognormal-ish) | 1200 |
| `ERROR_RATE` | fraction of calls returning a 5xx-style error | 0 |
| `RATE_429` | fraction returning a rate-limit error | 0 |
| `HANG_RATE` | fraction that never return (test the timeout path) | 0 |
| `SEED` | randomness seed, so failures reproduce | 42 |

Scripted behavior: prompts containing `[[tool:create_event]]`-style markers
make the sim "call" that tool, so conversation scripts can exercise the full
loop (gate, tool dispatch, memory write) deterministically.

## Instrument 2: the load generator

`scale/loadgen.py`: simulates N tenants. Each tenant runs a conversation
script (remember a fact, ask it back, schedule something) with think-time
jitter, hitting the dashboard HTTP API like a real browser would. Output:

- p50 / p95 / p99 turn latency
- throughput (turns/min) and error rate
- **correctness per tenant**: did MY fact come back to ME, was MY event on
  MY calendar. At scale, wrong answers are worse than slow ones.

## Instrument 3: SLO assertions

Each chapter's load test states its service-level objective in code and
fails until the fix meets it. SLOs are the contract between you and
"thousands of users": not "it feels fast" but "p95 under 2 seconds at 500
concurrent tenants with under 1% errors".

## Done when

`make scale-smoke` runs 5 simulated tenants through full conversations on
the `sim` provider and reports latency percentiles. No fix required; this
chapter is the instrument check.
