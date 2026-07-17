# Chapter 11 AI engineer track: typed agent contracts

Read the chapter brief and architect decisions first.

## By the end

- Enforce one versioned schema across ingress, tools, events, and results.
- Produce stable machine-readable validation failures.
- Test compatibility without calling a paid model.

## Build this

1. Inventory the structured boundaries and define their public envelopes.
2. Validate strictly at ingress and before every external side effect.
3. Generate or verify serialized schemas from the runtime source of truth.
4. Add fixtures for missing, extra, mistyped, old-version, and future-version data.
5. Make `make check-11` prove rejection location and compatibility behavior.

Do not encode authorization in a schema default; Chapter 12 owns authority.
