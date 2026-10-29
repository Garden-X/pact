# LOGIC-DRAFT.md

## META

name: LOGIC-DRAFT.md
canonical_location: /ai/pact/context/state/LOGIC-DRAFT.md
layer: PACT / context / state
status: selected
owner_role: Prime
gate_id: PACT-Prose-Span
generated_from: /ai/pact/templates/logic-draft.tpl.md
generated_from_version: 1.7
content_status: current-state
updated: 2026-10-29 05:19:22 UTC+00:00

## Selected Logic

Prime selects the owner's instruction to fix the transfer regression found in
the review of delivered main ec5b591e43fe62cf2675a08c857dc1d7839b466e. Keep the
owning `pact:task` machine block out of every label-form prose span while
retaining the raw ordinary-fence comparison selected by PACT-Review-20261028.
One bounded task candidate, no normative PACT/WORKFLOW/template change,
runtime, dependency, role, lifecycle stage or canonical state file.

## Source / Evidence

- Owner instruction in this session: fix the reported regression, accepting
  the offered separate small gate from the new main. Consistent with the
  owner's previous choice for this session, task/gate branches are published
  and Prime answers; default-branch delivery is not authorized.
- Review basis: main ec5b591e43fe62cf2675a08c857dc1d7839b466e, where
  PACT-Review-20261028#3 and PACT-Conformance#2 are accepted and reachable.
- Counterexample on that revision: a Pending entry and its Active object carry
  identical prose labels before their `pact:task` block, and dispatch only adds
  `actor` and `task_base`. Transfer returns `invalid` (2602f79 returned
  `valid`): the last label span ends only at a structurally visible line, so it
  swallows the raw machine block. PACT lets absent pending coordinates resolve
  at dispatch, and the owning block is mechanical, never prose.
- Reuse conformance/reference.mjs proseSurface, cases.json and the
  [conformance README](../../../../conformance/README.md);
  [PACT](../../PACT.md) PACT-RECORD/PACT-TRANSFER and the
  [state](../../templates/state.tpl.md) / [tasks](../../templates/tasks.tpl.md)
  templates, under [AGENTS](../../agents/AGENTS.md) and
  [WORKFLOW](../../workflow/WORKFLOW.md).
- Before selection, remote gate/task branches were fetched; none is ahead of
  main, so no concurrent gate overlaps this one.

## Decisions

- Exclude only the record's owning `pact:task` block lines from a label span;
  ordinary fences and their contents remain raw prose, and span delimitation
  and authority's structural boundary-field presence check stay unchanged.
- A `pact:task` fence inside the owning Active Task section is always the
  machine block for parseRecord (a second one is invalid), so it never counts
  as prose.
- Add the counterexample and adjacent positive/negative cases before the fix;
  preserve every earlier input and expected result.

## Constraints

This cloud session performs Prime and Lead sequentially on one host; its review
is not independent. Allowed area: conformance/** and Lead-owned TASKS/STATE;
Prime owns this draft. Preserve the owner-configured session model/effort,
historical handoffs/answers and both merged histories. No services,
dependencies, host configuration, external installations, history rewrite,
force push or template/spec version bump. Task ID PACT-20261029-003 follows the
highest recorded ID, avoiding the earlier cross-session collision.

## Acceptance

- The counterexample and adjacent cases fail on the review basis, then pass;
  all 364 earlier expectations and inputs stay unchanged.
- Complete commands on the exact candidate: node conformance/self-test.mjs;
  reference.mjs; source-check.mjs; check-git.mjs; migration-check.mjs (plan
  only); git diff --check. Inspect every actual exit sequentially.
- Diff touches only conformance/** and PACT state records.

Acceptance is separate from delivery. Never claim closure or change main
under this selection without the owner's explicit delivery permission.

### Prime acceptance — PACT-Prose-Span#2

```pact:acceptance
decision: "accepted"
candidate: "65a90338b7b86eb28077105e7f409d5270ed498b"
evidence: "Fresh exact-candidate results below; TASKS Done PACT-20261029-003; tracked conformance corpus and source/Git/migration checks."
```

Prime /root explicitly fetched remote gate/PACT-Prose-Span at
115c3c016c91ce7ce7931f79c2915e9fa1e1b482: its newest Gate Handoff #2 is ready,
unanswered and names the candidate above; only STATE changes after it. Task
candidate 089a8fcadce06b749e3e165eb20988623e2fe8ee is an ancestor and differs
from it only in TASKS/STATE records. The complete gate diff from
ec5b591e43fe62cf2675a08c857dc1d7839b466e touches only conformance/** and PACT
state records; remote main was still that revision.

Fresh checks ran sequentially in a clean detached checkout of exactly the
candidate (no tracked differences before or after), with Node v22.22.0 and Git
2.43.0 in a Linux cloud container. No shared heavy-work registry exists in this
container; no other heavy run competed.

| Command | Fresh result | Actual exit |
|---|---|---|
| node conformance/self-test.mjs | 24 invariant assertions | 0 |
| node conformance/reference.mjs | 371 of 371 semantic cases | 0 |
| node conformance/source-check.mjs | 222 checks, 171 links, no failures | 0 |
| node conformance/check-git.mjs | 15 real-Git assertions | 0 |
| node conformance/migration-check.mjs | 30 checks, 11 preservation items; three-file plan only, applied false | 0 |
| git diff --check ec5b591e43fe62cf2675a08c857dc1d7839b466e 65a90338b7b86eb28077105e7f409d5270ed498b | complete gate diff clean | 0 |

The migration plan hash was
e9d5456a88cf7d32cb707a1f646dfc5d82bdf455fe73d6f404df6d7bef28a549. The task's
red baseline (corpus 371/4 failed, exit 1 on the task_base evaluator) precedes
the fix. All 364 earlier inputs and expectations are unchanged.

The reviewed regression is resolved under existing PACT semantics: the owning
`pact:task` block never enters a prose span, ordinary fences stay raw, and
authority's structural boundary-field check is unchanged. No template/spec
version, dependency, runtime mechanism, host installation or product/SPARC
truth changed. The same agent performed selection, Lead execution and this
inspection sequentially; this is a separate pass, not an independent review.

Delivery is not authorized: main remains
ec5b591e43fe62cf2675a08c857dc1d7839b466e and this accepted answer stays a
pending delivery until the owner permits Prime's fast-forward.

Owner delivery authorization, 2026-10-29 05:19:22 UTC+00:00: after answer
499da24172c4990bf757639fd20e4b91d3a035d3 the owner replied "так" (yes) in this
session to Prime's question whether to fast-forward main to it. This permits
only Prime's ordinary fast-forward of main to the verified delivery tip; no
force, squash, hook bypass or deployment. Closure remains derived from Git.

## Next

None.

## History

PACT-Review-20261028 selection, decisions and accepted answers #1 and #3 are
preserved at ec5b591e43fe62cf2675a08c857dc1d7839b466e:ai/pact/context/state/LOGIC-DRAFT.md;
answer #3 is on main, so that gate is closed. Its integration history
preserves PACT-Conformance (answer #2 at 2602f79) and the earlier
PACT-Semantics record at ac431f05c2f00836d7632244751d96f5daabf29d. Existing
TASKS Done/STATE historical records remain intact.
