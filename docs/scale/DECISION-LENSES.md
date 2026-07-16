# Decision lenses: knowing which hat a question actually requires

This curriculum's chapters look like engineering problems. Several of the
decisions inside them are not. This doc is a general framework for
noticing the difference: the same tradeoff can be answered with a
technically clean, wrong answer if you solve it with the wrong discipline's
mental model.

It applies across every chapter, so it lives here once rather than
repeated in each `tracks/NN-*-architect.md` file. Read it once, then
re-check it whenever a chapter's "Questions to settle before you draft the
plan" section feels easier than it should.

## The tells

A tell is the signal that you have left plain engineering-tradeoff
territory. Each one comes with a different mental model, and answering the
question with the wrong model produces an answer that is internally
consistent and still wrong for the system.

| The tell | You have entered... | Its mental model |
|---|---|---|
| The question is a tradeoff *among people*, not among systems ("who do we optimize for when we cannot have both") | **PM thinking** | Cost the tradeoff in user experience and business terms, not system elegance. There is no universally correct answer, only a chosen priority. |
| Something is broken right now, in front of a human, and every second compounds | **SRE/incident thinking** | Minimize blast radius and time-to-detect over correctness-of-design. Take the reversible action, not the elegant one. |
| Crossing a boundary causes harm or lost trust, not just a bug | **Security thinking** | Assume adversarial intent. Verify, do not trust. Fail closed by default. |
| Money is the actual constraint, and the "right" engineering answer costs real dollars | **FinOps thinking** | Cost attribution and unit economics (cost per tenant, per turn) as first-class variables, not an afterthought column in a spreadsheet. |
| The decision ripples across more than one workstream, or across time (this quarter vs. next) | **Tech lead / EM thinking** | Sequencing and dependency management. What the team learns or avoids redoing. Staffing and skill availability as a real constraint, not a footnote. |
| The result depends on a sample or a measurement, and you have to decide whether to trust it | **Eval/QA thinking** | Statistical significance, false-positive cost vs. false-negative cost, "how would I know if I am wrong." |
| A human needs an explanation, in the moment, in plain words | **Support / writer thinking** | Write for the reader's emotional state (frustrated, blocked), not for technical accuracy alone. |

## The practical use

Whenever a chapter's Architect prep question makes you want to reach for a
purely technical answer and it feels slightly too easy, that ease is often
the tell that you have missed which hat the question actually requires. A
technically clean answer to a PM-shaped question is still a wrong answer.

## Applied to decisions already in this curriculum

- **Ch 3, "SOUL.md shared or per-tenant"**: looks like a data-modeling
  question. It is PM thinking, because the answer depends on whether you
  are selling a personalized assistant or a shared-brand one, and no
  amount of schema design resolves that.
- **Ch 5, "which tenant class sheds first under load"**: looks like a
  queueing algorithm. It is PM thinking wearing an admission-control
  costume, since "free tier" vs. "paying tier" is a pricing/positioning
  decision, not a technical one.
- **Ch 6, "what does the breaker's open state mean to a user
  mid-conversation"**: looks like a state machine. It is SRE thinking
  (blast radius to a live user right now) plus support/writer thinking
  (what you actually say to them).
- **Ch 3 / Ch 7, tenant isolation and abuse budgets**: security thinking.
  The tell is the "wrong beats slow" framing in the chapter 3 brief:
  that is a trust-and-harm framing, not a performance framing.
- **Ch 7, cost and abuse control overall**: FinOps thinking. The tell is
  that the "correct" engineering answer (retry everything, always fall
  back) directly costs money, so the engineering fix and the budget
  policy have to be co-designed, not sequenced.
- **Ch 4, "sequence query discipline before the Postgres migration"**:
  tech lead thinking. The tell is that the question is not which fix is
  better, it is which order lets you isolate what moved the number, a
  project-management concern wearing a technical-order costume.
- **Ch 1 and Ch 10, "is this measurement trustworthy at this sample
  size"**: eval/QA thinking. The tell is that the question is not "what
  is the fix" at all, it is "do I believe my own instrument."

## Why this matters more than it looks like it should

In a large company these hats belong to different people, each with their
own team, backlog, and vocabulary. Working through this curriculum alone
means you are the one who has to notice the hat-switch moment yourself,
since nobody hands you a Slack thread from the PM or the security team to
tell you which lens applies. Most of the actual judgment in a solutions-
architecture role is exactly this: recognizing which discipline's
framework a given decision belongs to, before reaching for the one you
know best by default.
