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
