# Product scenario: pick one before chapter 1

Every chapter's "Architect prep" questions look like engineering
tradeoffs, but several of them are actually decisions about who this
product is for (see `DECISION-LENSES.md`). The chapter briefs never
specify that, on purpose: in a real job nobody hands you a clean spec
either. This doc is where you fix that gap once, deliberately, before you
draft chapter 1's `SLO.md`.

## Why this has to come first

Your chapter 1 SLO numbers, chapter 3's tenant isolation model, chapter
5's "which tier sheds first," and chapter 7's budget policy all depend on
the answer to "who are these tenants and what did we promise them." Pick
the scenario after you've already written an SLO and you'll find yourself
quietly rationalizing a number you already committed to, instead of
deriving it from the product.

## Pick an archetype (or invent your own)

- **Consumer freemium assistant**: many individual users subscribe
  directly (a "personal Jarvis" app). Latency expectations track
  consumer chat apps (ChatGPT/Siri-like: users bail past a couple
  seconds). Free vs. paid tiers matter later (ch5, ch7). Error tolerance
  is moderate: annoying but not contractually penalized, though silent
  churn is the real cost since unhappy free users rarely complain, they
  just leave.
- **Embedded B2B tool**: a vendor's product, embedded into business
  customers' workflows under a contract. Stricter uptime/error budget
  (real SLA penalties, real invoices), but users may tolerate more
  latency if the tool is clearly valuable. Tenants are companies, not
  individuals, so "noisy neighbor" in chapter 3 means one company's usage
  spike, not one person's.
- **Internal company tool**: an assistant for a single company's own
  employees. Smaller expected scale, no external paying customers, more
  tolerance for rough edges, but real reputational cost internally
  (whoever champions this tool owns the fallout of it being flaky).
- **Vertical tool in a regulated industry** (healthcare, finance, legal):
  adds a compliance dimension the other three don't have. Chapter 3's
  tenant isolation and chapter 8's "logging chat content" privacy
  question stop being judgment calls and become closer to hard
  requirements. Error budget may need to distinguish "slow" from "wrong"
  even more sharply than the curriculum already does.
- Or write your own. The requirement isn't picking from this list, it's
  having an answer at all before you draft numbers.

## Your deliverable

Write `docs/scale/SCENARIO.md`, short:

- Which archetype (or your own), one paragraph.
- Who the tenants are, concretely (individuals, companies, employees).
- What you're promising them, in plain terms, before you translate it
  into an SLO number.
- Which tenant tier (if any) gets protected first when something has to
  give, since chapter 5 and chapter 7 will ask you this again under load.

Commit it alongside `SLO.md`. Every later chapter's architect track that
touches a product-shaped question should point back to this file rather
than re-litigating the scenario from scratch.

## Replaying the curriculum under a different scenario

This file is a judgment call, not code, so there's no `make check` for
it. That also means nothing stops you from running the curriculum twice
under two different scenarios to see how differently the same technical
fixes get justified: a consumer-freemium chapter 5 sheds free tenants
first and calls it done; a regulated-vertical chapter 5 might refuse to
shed anyone and instead admit fewer tenants up front. Overwrite
`SCENARIO.md` with a new archetype, then redraft `SLO.md` and any later
design docs against it. Consider a separate branch per scenario
(`my-chapter-1-freemium`, `my-chapter-1-regulated`, ...) if you want to
compare runs side by side instead of overwriting your first attempt.
