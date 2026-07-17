# Chapter 15 architect track: production container contract

## By the end

- Specify a cloud-neutral process and container contract.
- Separate liveness, readiness, startup, draining, and durable state concerns.
- Derive concurrency and resource limits from measurements.

## Questions to settle

- What must be true before readiness, and what can degrade without failing it?
- What happens to admitted work when termination begins?
- Which state, secrets, migrations, and artifacts must live outside the image?
- Is concurrency limited by CPU, memory, provider quotas, or downstream pools?

## Orient yourself on

- Chapter 9's stateless horizontal worker and Chapter 1's SLOs.
- [Docker build best practices](https://docs.docker.com/build/building/best-practices/).
- [Dockerfile reference](https://docs.docker.com/reference/dockerfile/).

Pressure-test the plan against Chapter 16: graceful shutdown is insufficient if
work cannot be claimed, resumed, and made idempotent elsewhere.
