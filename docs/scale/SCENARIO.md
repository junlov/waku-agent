# Product scenario

Picked per `docs/scale/PRODUCT-SCENARIO.md`, before drafting `SLO.md`.

## Archetype: consumer freemium assistant

Waku is a personal AI assistant product: individual people subscribe
directly, the same way they'd sign up for any consumer chat app. There is
no company procurement process, no contract, no account manager. A tenant
is one person.

## Who the tenants are

Individual subscribers, on a free tier and a paid tier. Free tier is the
top of the funnel: most users start there, and the product's growth
depends on that experience being good enough to convert some of them to
paid. Paid tier is the revenue the business actually runs on.

## What we're promising them

A conversational assistant that feels responsive the way ChatGPT or Siri
does, not one that feels like an old-school helpdesk ticket. Concretely:
a turn should come back fast enough that the user doesn't context-switch
away while waiting, for both tiers. We are not promising a contractual
uptime number to anyone, since there is no contract to write one into.
What we are promising, implicitly, is that using Waku regularly doesn't
feel like a gamble.

The real risk in this scenario isn't an angry ticket, it's silence: a
free user who has one bad experience just stops opening the app, and we
never hear why. That argues for treating the error budget as tighter than
it would look from ticket volume alone, since ticket volume undercounts
the actual damage.

## Which tier gets protected first

Paid tenants are protected first when something has to give: their
requests get priority admission under backpressure (chapter 5) and a
materially higher spend ceiling before hitting a budget cap (chapter 7).
Free tenants absorb degradation first, both because they haven't paid for
a guarantee and because losing a free user who was never going to convert
costs the business less than losing a paying one. This is a deliberate
choice to make revenue-tier the fairness axis, not usage recency or
account age; revisit if the business model changes (e.g., a usage-based
tier that doesn't map cleanly to free/paid).

## Consequences for later chapters

- **Chapter 3**: SOUL.md and skills are per-tenant, not shared. A
  consumer product's whole value is that it feels personal; a shared
  global personality contradicts the promise above.
- **Chapter 5**: free tier sheds first under burst load; paid tier gets
  priority admission.
- **Chapter 7**: paid tier gets a materially higher budget ceiling before
  an honest over-budget response; free tier's cap is tight enough to
  contain a single abusive script without needing to be tuned per
  incident.
- **Chapter 8**: logging chat content needs a real privacy policy even
  without a regulatory driver, since "personal assistant" implies
  intimate content (calendars, private notes) by default, not as an edge
  case.
