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
updated: 2026-10-29 05:27:10 UTC+00:00

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

### Prime acceptance — PACT-Selection-Fetch#2

```pact:acceptance
decision: "accepted"
candidate: "bf4855691c20c485dbd97591216087070a89bc59"
evidence: "Fresh exact-candidate results below; TASKS Done PACT-20261029-004; WORKFLOW/workflow.tpl.md 3.9 and tracked source/conformance/Git/migration checks."
```

Prime /root explicitly fetched remote gate/PACT-Selection-Fetch at
ec4cf989aaa8341be0c216e7bd5c9e3d494d23c1: its newest Gate Handoff #2 is ready,
unanswered and names the candidate above; only STATE changes after it. Task
candidate 35da8a8d8cb1c95faab9a22426062a7369427a3b is an ancestor and differs
from it only in TASKS/STATE records. The complete gate diff from
0d3b0a1f4ac2d704ef01a5f4d2a85746e8a8b9f7 touches only the selected allowed
area; remote main was still that revision.

Fresh checks ran sequentially in a clean detached checkout of exactly the
candidate (no tracked differences before or after), with Node v22.22.0 and Git
2.43.0 in a Linux cloud container with complete history. No shared heavy-work
registry exists in this container; no other heavy run competed.

| Command | Fresh result | Actual exit |
|---|---|---|
| node conformance/self-test.mjs | 24 invariant assertions | 0 |
| node conformance/reference.mjs | 371 of 371 semantic cases | 0 |
| node conformance/source-check.mjs | 222 checks, 170 links, no failures | 0 |
| node conformance/check-git.mjs | 15 real-Git assertions | 0 |
| node conformance/migration-check.mjs | 30 checks, 11 preservation items; three-file plan only, applied false | 0 |
| git diff --check 0d3b0a1f4ac2d704ef01a5f4d2a85746e8a8b9f7 bf4855691c20c485dbd97591216087070a89bc59 | complete gate diff clean | 0 |

The migration plan hash was
3613dfaaecda0640469bda28a85d6da2ae8a24095b6fb1c498cd9f72575bab32. The task's
red baseline (source 222/3 failed, exit 1 on task_base) precedes the edit.
workflow.tpl.md 3.9 RULES and full EXAMPLE match the WORKFLOW target; the
release table, release bullet and INSTALL sync step say 3.9. The gate itself
followed the rule: selection published before dispatch, re-check before
dispatch, task id after the highest observed one.

The rule closes the demonstrated concurrent-gate gap without a new role,
record type, lifecycle stage, runtime or service; PACT.md and other templates
are unchanged. The same agent performed selection, Lead execution and this
inspection sequentially; this is a separate pass, not an independent review.

Delivery is not authorized: main remains
0d3b0a1f4ac2d704ef01a5f4d2a85746e8a8b9f7 and this accepted answer stays a
pending delivery until the owner permits Prime's fast-forward.

## Next

None.

## History

PACT-Prose-Span selection, accepted answer #2 and the owner's delivery
authorization are preserved at
0d3b0a1f4ac2d704ef01a5f4d2a85746e8a8b9f7:ai/pact/context/state/LOGIC-DRAFT.md;
answer #2 is on main, so that gate is closed. Earlier selections remain
reachable through its History. Existing TASKS Done/STATE historical records
remain intact.
