# LOGIC-DRAFT.md

## META

name: LOGIC-DRAFT.md
canonical_location: /ai/pact/context/state/LOGIC-DRAFT.md
layer: PACT / context / state
status: selected
owner_role: Prime
gate_id: PACT-Selection-Fetch
generated_from: /ai/pact/templates/logic-draft.tpl.md
generated_from_version: 1.7
content_status: current-state
updated: 2026-10-29 05:23:04 UTC+00:00

## Selected Logic

Prime selects the owner's request to add a rule for fetching before gate
selection. Add it to [WORKFLOW](../../workflow/WORKFLOW.md) Gate and slice and
its [template](../../templates/workflow.tpl.md) RULES and full EXAMPLE, bump
only workflow.tpl.md to 3.9 and synchronize the active target, release notes,
install sync step and source checks. No new role, record type, lifecycle
stage, runtime, service or dependency.

## Source / Evidence

- Owner instruction in this session: add the rule about fetching before gate
  selection, following the process remark reported after reviewing main
  ec5b591e43fe62cf2675a08c857dc1d7839b466e.
- Demonstrated gap: gate PACT-Conformance was selected at 2026-10-28 21:59 UTC
  and PACT-Review-20261028 at 22:03 UTC, both from
  ac431f05c2f00836d7632244751d96f5daabf29d. Neither could see the other: the
  first selection stayed on a session branch until the next day. Both
  allocated task id PACT-20261028-001, and a later material integration task
  had to merge the histories and qualify the duplicate id.
- A fetch alone would not have caught it, so the rule also needs prompt
  selection publication on the gate branch and a re-check before the first
  dispatch.
- Pre-selection check for this gate: every remote branch matching gate/<id>
  was explicitly fetched and is reachable from remote main
  0d3b0a1f4ac2d704ef01a5f4d2a85746e8a8b9f7 (complete history after unshallow);
  no gate is open.
- Reuse [PACT](../../PACT.md) PACT-GIT remote observation, the existing
  [AGENTS](../../agents/AGENTS.md) Execution Hierarchy pointer, Spawn
  Boundaries' owner approval for separate coordination scope and the
  [RELEASE-NOTES](../../RELEASE-NOTES.md) version table.

## Decisions

- An open gate is one whose remote gate branch tip is not reachable from
  remote default_branch; Prime reports it to the owner instead of starting a
  silent parallel gate. A concurrent gate needs recorded owner approval.
- Prime publishes the selection on its gate branch at once; Lead fetches
  again before the first dispatch; task ids are unique across observed
  default/open-gate records and published task branches.
- Unavailable remote access leaves the check unresolved under PACT-GIT unless
  the owner explicitly accepts proceeding.
- Keep the rule in WORKFLOW only; PACT.md, logic-draft and other templates are
  unchanged because they defer to WORKFLOW's Execution Hierarchy.

## Constraints

This cloud session performs Prime and Lead sequentially on one host; its review
is not independent. Allowed area: ai/pact/templates/workflow.tpl.md,
ai/pact/workflow/WORKFLOW.md, ai/pact/RELEASE-NOTES.md, ai/pact/INSTALL.md,
conformance/source-check.mjs and Lead-owned TASKS/STATE; Prime owns this
draft. Preserve owner bindings, historical records and package version 2.0.
No external installation edits, services, dependencies, history rewrite,
force push or main delivery without explicit owner permission.

## Acceptance

- A source-check assertion for the rule fails before the edit, then passes.
- workflow.tpl.md 3.9 full EXAMPLE equals WORKFLOW.md (stamp aside); RULES
  name the rule; RELEASE-NOTES table and INSTALL sync step say 3.9.
- Complete commands on the exact candidate: node conformance/self-test.mjs;
  reference.mjs; source-check.mjs; check-git.mjs; migration-check.mjs (plan
  only); git diff --check. Inspect every actual exit sequentially.
- Diff touches only the allowed area.

Acceptance is separate from delivery. Never claim closure or change main
under this selection without the owner's explicit delivery permission.

## Next

None.

## History

PACT-Prose-Span selection, accepted answer #2 and the owner's delivery
authorization are preserved at
0d3b0a1f4ac2d704ef01a5f4d2a85746e8a8b9f7:ai/pact/context/state/LOGIC-DRAFT.md;
answer #2 is on main, so that gate is closed. Earlier selections remain
reachable through its History. Existing TASKS Done/STATE historical records
remain intact.
