# Training-program benchmark

This benchmark records the mechanics Waku borrows from established,
repository-backed training programs. It is a design input, not permission to
copy course prose, assets, tests, or implementation code.

## Decisions

| Program | Source | Adopt | Adapt for Waku | Reject |
|---|---|---|---|---|
| Killercoda | [Scenario examples](https://github.com/killercoda/scenario-examples) | Versioned scenarios, real environments, ordered steps, and explicit verification. | A manifest orchestrates Waku's existing Markdown, Git checkpoint, declared actions, and deterministic grader. | Hosted throwaway machines and scenario prose duplicated into the manifest. |
| GitHub Skills | [Author guide](https://skills.github.com/quickstart) | Short steps whose completion is grounded in a real repository event. | Local Git commits, tags, decision artifacts, and curated recaps become the durable learning record. | Bot-driven pull-request choreography as the normal local lab loop. |
| Exercism | [Python track](https://github.com/exercism/python) | Separate instructions, starter state, tests, and post-attempt analysis. | Chapter briefs remain instruction authorities; checkpoint refs, deterministic checks, and reflection fields remain separate contracts. | A solution catalogue available before the learner passes or abandons a lab. |
| The Odin Project | [Curriculum](https://github.com/TheOdinProject/curriculum) | A visible, cumulative, self-directed path with public learning artifacts. | One production-agent repository accumulates decisions, repairs, and optional redacted recaps. | Unverified reading completion or browser checkboxes as evidence of competence. |
| MLOps Zoomcamp | [Course repository](https://github.com/DataTalksClub/mlops-zoomcamp) | Cumulative operational projects and artifacts that resemble production work. | Six phase incidents combine already learned failure modes without blocking the next chapter. | A separate technology survey that loses Waku's one-system continuity. |
| freeCodeCamp | [Repository](https://github.com/freeCodeCamp/freeCodeCamp) | Review and capstone layers above individual exercises. | Phase incidents and a final transfer benchmark test integrated competence after chapter proofs. | Point totals, competitive ranking, certificates, and LMS administration in v1. |
| Hugging Face Agents Course | [Course repository](https://github.com/huggingface/agents-course) | Agent-specific benchmarks, reflection, and a capstone-shaped integration layer. | Deterministic agent failures, selected evidence, and a redacted recap make model behavior inspectable. | Provider-specific course content or benchmark claims that Waku cannot reproduce offline. |
| Kubernetes the Hard Way | [Repository](https://github.com/kelseyhightower/kubernetes-the-hard-way) | Require the learner to perform the real system work and understand the boundary being repaired. | Labs expose the actual repository, terminal, files, Git diff, and declared dependencies inside a container sandbox. | Opaque automation that completes the repair or hides the operational sequence. |

## Resulting Waku pattern

Every runnable chapter is a production incident with the same learning loop:

1. Observe the failure through a deterministic instrument.
2. Explain the evidence and the product boundary it threatens.
3. Commit an architecture decision.
4. Implement the repair in the real repository.
5. Prove the result, select evidence, and reflect.

Normal labs target 60–90 minutes. Future chapters stay visible as non-executable
previews until a valid cumulative start checkpoint and red instrument exist.
Passed chapters may be replayed only in isolated worktrees, so practice cannot
regress the learner's canonical workspace.

