# Chapter 3 AI engineer track: multi-tenancy

Companion to `docs/scale/03-multi-tenancy.md`. Read that brief first, and
read the architect track's decision on where tenant identity lives before
building: threading it through wrong or incompletely is the exact leak
this chapter's test catches.

## By the end of this chapter, you'll be able to

- Thread a tenant id through every store and service call without
  missing one, and prove it with the leak test at 100 tenants.
- Implement per-tenant rate limits and concurrency caps on top of the
  chapter 2 worker pool.
- Add a tenant filter (or admin notion) to the dashboard so it stops
  showing everything to everyone.

## Build this

1. Add tenant identity at the API boundary in `waku/gateway/` (a token,
   even a fake one for now, mapped to a tenant id) and pass it explicitly
   into every call that touches state, rather than relying on a global.
2. Add a `tenant_id` column (or equivalent scoping) to every table in
   `waku/db.py`'s `SCHEMA` that currently has none, and update
   `waku/memory/semantic/store.py` and any other store to filter by it
   on every read and write.
3. Update `waku/runtime/session.py` so the working-memory assembly
   (SOUL.md, memory, history) is scoped per tenant according to whatever
   the architect track decided about SOUL.md/skills being global or
   per-tenant.
4. Add per-tenant rate limits and concurrency caps that sit on top of
   the chapter 2 worker pool, so one hot tenant's flood cannot starve
   the pool for everyone else.
5. Add a tenant filter or admin view to the dashboard; today it shows
   every tenant's data to every viewer, which is its own version of this
   chapter's leak.
6. Run `make check-03`: zero leaks at 100 tenants, and a scripted
   abusive-tenant flood degrades only that tenant's own p95.

## Read before you start

- `waku/db.py` (the full `SCHEMA`, to find every table missing a tenant
  scope) and `waku/memory/semantic/store.py`.
- `waku/runtime/session.py` and `waku/gateway/` (where identity needs to
  enter the system and where it needs to be threaded through).
- `waku/ops/dashboard.py` (today's global, unscoped view).
