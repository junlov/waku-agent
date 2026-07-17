# Chapter 15 AI engineer track: production container contract

## By the end

- Build one immutable image that behaves consistently under hosting constraints.
- Implement meaningful probes and bounded graceful shutdown.
- Prove state and secrets are external.

## Build this

1. Use a reproducible build, fixed entrypoint, non-root user, and minimal runtime.
2. Support assigned ports, read-only root, bounded temp space, and stdout logs.
3. Implement separate liveness and readiness plus admission stop and drain.
4. Remove baked credentials and worker-local durable state.
5. Make `make check-15` constrain the container, load it, terminate it, and restart it.

Record the concurrency evidence; a guessed worker count is not completion.
