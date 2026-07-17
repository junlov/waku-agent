# Chapter 12: trust boundaries and approvals (short brief; expanded when you start it)

Use `tracks/12-trust-boundaries-and-approvals-architect.md` or the matching
AI-engineer track after reading this brief.

**The scar:** a tenant ID, role, or approval phrase appears in prompt-visible
data and the runtime treats it as authority. Prompt injection can now cross a
security boundary and tools can execute a proposal that no human approved.

**You will reproduce:** `make scale-12` injects forged identity and approval
claims through user text, retrieved context, and tool arguments. The unsafe
runtime performs a side effect or reads another tenant's data.

**The fix, in shape:** trusted run context created outside model input;
capability-limited tools; proposal separated from execution; and an approval
record bound to the exact action digest, actor, scope, and expiry. Audit records,
not conversation prose, are the authority trail.

**Traps ahead:** validation is not authorization; a human clicking “approve”
without seeing the real payload is theater; and a broad tool credential defeats
fine-grained policy.

**Done when:** every forged path is denied, changing an approved payload
invalidates approval, least-privilege capabilities are enforced, and the audit
trail explains who authorized exactly what.

**Portable lesson:** the model may propose; trusted code decides and executes.
