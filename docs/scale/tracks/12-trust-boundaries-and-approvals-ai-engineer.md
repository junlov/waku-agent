# Chapter 12 AI engineer track: trust boundaries and approvals

## By the end

- Keep trusted run context unreachable from prompt-controlled fields.
- Enforce scoped capabilities and digest-bound approvals.
- Prove denials and auditability with adversarial fixtures.

## Build this

1. Introduce trusted runtime context populated only by authenticated code.
2. Split tool proposal from side-effect execution.
3. Bind approval to actor, capability, canonical payload digest, scope, and expiry.
4. Reject forged identity, replayed approval, modified payload, and cross-tenant use.
5. Make `make check-12` verify both absence of effects and presence of audit evidence.

Keep policy deterministic and outside prompts.
