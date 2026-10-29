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
updated: 2026-10-29 05:13:46 UTC+00:00

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

## Next

None.

## History

PACT-Review-20261028 selection, decisions and accepted answers #1 and #3 are
preserved at ec5b591e43fe62cf2675a08c857dc1d7839b466e:ai/pact/context/state/LOGIC-DRAFT.md;
answer #3 is on main, so that gate is closed. Its integration history
preserves PACT-Conformance (answer #2 at 2602f79) and the earlier
PACT-Semantics record at ac431f05c2f00836d7632244751d96f5daabf29d. Existing
TASKS Done/STATE historical records remain intact.
