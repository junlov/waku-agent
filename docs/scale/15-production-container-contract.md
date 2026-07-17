# Chapter 15: production container contract (short brief; expanded when you start it)

Use the architect or AI-engineer companion under `docs/scale/tracks/`.

**The scar:** the image boots on a laptop but fails when the platform assigns a
port, runs it non-root with a read-only filesystem, sends concurrent requests,
or terminates it during work. Local disk and baked credentials quietly became
production dependencies.

**You will reproduce:** `make scale-15` runs the image under those constraints,
sends health and readiness probes, applies concurrent load, and delivers
`SIGTERM` during an active run. The unsafe container loses work or hangs.

**The fix, in shape:** an immutable OCI image with fixed entrypoint, non-root
runtime, read-only root, bounded temporary storage, no baked secrets, explicit
health/readiness, structured stdout logs, graceful drain, and externally owned
durable state. Concurrency is configured from measured CPU, memory, and latency.

**Traps ahead:** a health check that only proves the process exists; mutable
startup migrations; shell entrypoints that swallow signals; and worker-local
files masquerading as a database.

**Done when:** the same image passes the constrained local contract, drains
within its termination budget, starts with no persistent disk, and its declared
concurrency survives the chapter load profile.

**Portable lesson:** deploy to a runtime contract, not to a cloud brand.
