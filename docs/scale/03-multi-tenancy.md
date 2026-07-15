# Chapter 3: multi-tenancy (short brief; expanded when you start it)

**The scar:** today every gateway shares ONE brain: one `.waku` home, one
memory, one calendar. Two users of the same deployment are one user with
two faces. Tenant A asks "when is my dentist appointment" and gets tenant
B's answer. At scale, wrong beats slow for how fast it kills trust.

**You will reproduce:** the leak test. Loadgen tenants each save a private
fact, then every tenant asks for it back. On current code the facts pool in
one store and the test fails on cross-tenant leakage, the worst failure
class this curriculum has.

**The fix, in shape:** a tenant identity at the API boundary (a token, even
a fake one, mapped to a tenant id), and that id threaded through EVERYTHING
that touches state: memory stores, session history, calendar, traces, the
usage ledger. Then the noisy-neighbor half: per-tenant rate limits and
concurrency caps so one hot tenant cannot eat the worker pool you built in
chapter 2.

**Traps ahead:** SOUL.md and skills are currently global (product decision:
shared or per-tenant?); the dashboard shows everything to everyone (it must
grow a tenant filter or an admin notion); "tenant id in every query" is
exactly the kind of cross-cutting change that reveals whether chapter 2's
boundaries were clean.

**Done when:** zero leaks at 100 tenants, one abusive tenant (scripted
flood) degrades only their own p95, and you can say where tenant identity
lives and why.

## Architect prep

**By the end of this chapter, you'll be able to:**
- Explain why "wrong beats slow" for trust, and where in this codebase
  that risk currently lives (no `tenant_id` anywhere).
- Name the tenant isolation model (silo, pool, or bridge) you are
  choosing and why, not just that "tenants should be isolated."
- Describe the difference between a data leak and a noisy-neighbor
  problem, and why this chapter has to solve both.

**Questions to settle before you draft the plan** (a design review's
opening questions, not a memorization test; a defensible position is
enough to start drafting):
- Where does tenant identity live: a request-boundary auth token only, or
  an explicit parameter threaded through every store and service call?
  What is the cost of getting this wrong (a single missed thread-through
  is the leak the brief describes)?
- SOUL.md and skills are global today. Shared across tenants, or
  per-tenant? That is a product decision, not just an engineering one:
  what does each choice imply for chapter 8's dashboard and chapter 7's
  cost attribution?
- Per-tenant rate limits: enforced at admission (chapter 5's territory)
  or inside the chapter 2 worker pool? Does "degrades only their own p95"
  require active isolation, or does fair scheduling alone get you there?

**Read before you start:**
- `waku/db.py` (the `SCHEMA`: note there is no `tenant_id` column
  anywhere yet) and `waku/memory/semantic/store.py`.
- `waku/runtime/session.py` (how SOUL.md, memory, and history get
  assembled into one working-memory blob per turn).
- Concepts: multi-tenancy isolation models (silo vs. pool vs. bridge);
  row-level security as a pattern, even without a real RLS engine here;
  the "noisy neighbor" problem.

**Further reading:**
- [AWS SaaS Tenant Isolation Strategies](https://docs.aws.amazon.com/whitepapers/latest/saas-tenant-isolation-strategies/saas-tenant-isolation-strategies.html),
  the silo/pool/bridge vocabulary this chapter's brief is built on.
- [AWS SaaS Architecture Fundamentals: Tenant Isolation](https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/tenant-isolation.html).
