# Chapter 3 architect track: multi-tenancy

Companion to `docs/scale/03-multi-tenancy.md`. Read that brief first for
the scar, the reproduction, the fix in shape, and the done-when criteria.

## By the end of this chapter, you'll be able to

- Explain why "wrong beats slow" for trust, and where in this codebase
  that risk currently lives (no `tenant_id` anywhere).
- Name the tenant isolation model (silo, pool, or bridge) you are
  choosing and why, not just that "tenants should be isolated."
- Describe the difference between a data leak and a noisy-neighbor
  problem, and why this chapter has to solve both.

## Questions to settle before you draft the plan

A design review's opening questions, not a memorization test; a
defensible position is enough to start drafting.

- Where does tenant identity live: a request-boundary auth token only, or
  an explicit parameter threaded through every store and service call?
  What is the cost of getting this wrong (a single missed thread-through
  is the leak the brief describes)?
- SOUL.md and skills are global today. Shared across tenants, or
  per-tenant? That is a product decision, not just an engineering one:
  what does each choice imply for chapter 8's dashboard and chapter 7's
  cost attribution? Check `docs/scale/SCENARIO.md` before answering: a
  consumer-freemium assistant and an embedded B2B tool likely answer this
  differently.
- Per-tenant rate limits: enforced at admission (chapter 5's territory)
  or inside the chapter 2 worker pool? Does "degrades only their own p95"
  require active isolation, or does fair scheduling alone get you there?

## Orient yourself on

- `waku/db.py` (the `SCHEMA`: note there is no `tenant_id` column
  anywhere yet) and `waku/memory/semantic/store.py`.
- `waku/runtime/session.py` (how SOUL.md, memory, and history get
  assembled into one working-memory blob per turn).
- Concepts: multi-tenancy isolation models (silo vs. pool vs. bridge);
  row-level security as a pattern, even without a real RLS engine here;
  the "noisy neighbor" problem.

## Further reading

- [AWS SaaS Tenant Isolation Strategies](https://docs.aws.amazon.com/whitepapers/latest/saas-tenant-isolation-strategies/saas-tenant-isolation-strategies.html),
  the silo/pool/bridge vocabulary this chapter's brief is built on.
- [AWS SaaS Architecture Fundamentals: Tenant Isolation](https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/tenant-isolation.html).
