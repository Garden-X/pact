# sub-agent.tpl.md

## META

name: sub-agent.tpl.md
type: pact maintenance template
for: reusable sub-agent role files
updated: 2026-10-17 20:52:02 UTC+00:00
version: 2.3

## WHAT

A sub-agent file defines reusable instructions for a Lead or a Worker specialty.
It narrows scope, inputs, validation, outputs, boundaries, and handoff under
WORKFLOW. A role file is not an active hire or a model identity.

Lead hires Workers according to the task: a designer, coder, researcher,
reviewer, documentation specialist, or another needed specialty. There is no
mandatory fixed Worker roster. Create a reusable file only when it helps;
an exact task brief is sufficient for a one-time assignment.

## FOR

Target path:

```txt
/ai/pact/agents/workers/[WorkerName].md
```

Generate one file from the relevant example, adapting it to the real scope.
The examples are alternatives, not files every project must install.

## RULES

A sub-agent file must contain:

- name, purpose, scope, inputs, validation, outputs, handoff, and forbidden actions;
- `role: Lead` or `role: Worker`, distinct from `model_tier`;
- the Worker specialty when applicable;
- a model tier (High, Middle, or Light), effort percentage from 0% to 100%,
  and a local model-binding reference when the profile supplies defaults;
  the dispatch resolves concrete provider/model and effective native effort;
- relative links to invariant PACT files and any skills actually used.

WORKFLOW owns role authority, tier meanings, effort mapping, and acceptance.
The owner controls explicit bindings. Lead chooses an adequate Worker tier and
effort for the assignment; the Worker is not restricted to Light, and Prime
chooses the Lead assignment's tier the same way. A profile's `model_tier` is
only a default for its typical assignment: Lead, Worker, and Watchdog work may
use Light, Middle, or High as the actual assignment requires. Capability is
selected for the assignment; authority is selected by the role/function
contract. Neither determines the other. Prime's
Architect and Inspector functions share High even if their models differ.
Capability does not grant authority to select scope, accept a gate, or merge.

Lead owns decomposition, TASKS/STATE, reservations, exact briefs, reviewing all
returned changes, integration, applicable records, and the acceptance handoff.
For a changed material code invariant, Lead supplies tests and baseline failure
evidence. Workers make those checks pass without weakening or changing them;
report doubtful tests to Lead. Documentation and reversible low-impact work
use proportionate checks. Parallel assignments obey WORKFLOW resource rules.

Review residual work under WORKFLOW Correction And Capability Routing: prefer
a safe, bounded and economical parent correction; clarify missing context at
the same adequate tier; raise capability only for an evidenced gap or verified
complexity/risk. A mostly correct result or one failure never automatically
promotes a child. Preserve acceptance and boundaries; Prime does not execute
product corrections. Material Lead corrections publish their own task candidate.

Every actual spawn requires the parent-issued boundary contract and explicit
role, parent, task and model-tier context defined by WORKFLOW Spawn Boundaries.
A reusable profile is not a dispatch contract. A child inherits the effective
boundaries, may narrow them for descendants, and must obtain parent approval
before widening. Preserve method autonomy within those boundaries.

A profile names an authority role, never an operational function as a role.
A Lead profile includes the Watchdog function for its Workers in any harness
topology, at the Lead assignment's own capability: Workers report to Lead, and Lead wakes Prime only for Prime-level
events published durably in STATE's Gate Handoff. A Worker reports only to its
Lead. A role-less Watchdog follows its hook, not a sub-agent profile.

Active hires and their exact bindings belong in TASKS/STATE, not this package's
manifest or the project's MAP. Do not create a reusable file merely to record
a current session. Filenames use CapitalCase, for example DesignWorker.md.

A sub-agent file must not override AGENTS or WORKFLOW, grant Worker version-
control writes or unreserved scope, grant Lead default-branch writes or Prime
acceptance authority, or write maintenance state into /ai/docs. Relevant
project-truth changes still use SPARC and the task's explicit reservations.

## EXAMPLE

### Lead profile

```md
# Lead.md

## META

name: Lead
canonical_location: /ai/pact/agents/workers/Lead.md
layer: PACT / sub-agent role
role: Lead
model_tier: Middle
effort: 75%
model_binding: <owner-approved local binding>
status: draft
generated_from: /ai/pact/templates/sub-agent.tpl.md
generated_from_version: 2.3
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

## PURPOSE

Coordinate one Prime-selected gate and prepare reviewed slices for acceptance.

## SCOPE

Own decomposition, TASKS/STATE, integration, and worker review within the selected
draft. Hire the specialties required by each task with adequate tier/effort.
Perform the Watchdog function for active Workers: process completions and
blocks, keep the ready pool, and resolve what Lead authority allows without
waking Prime.

## BOUNDARIES

Receive Prime's actual boundary_contract and role/parent/tier context before
acting: selected gate scope; named read/write areas and task/STATE reservations;
protected product areas; unchanged SPARC/interfaces and acceptance checks;
authorized record/Git effects; and escalation conditions. Carry all effective
inherited limits into each Worker dispatch and specify only narrower scope or
approved changes. Missing limits or required expansion go to the parent.

## INPUTS

- [../AGENTS.md](../AGENTS.md)
- [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md)
- [../../context/state/LOGIC-DRAFT.md](../../context/state/LOGIC-DRAFT.md)
- [../../context/state/TASKS.md](../../context/state/TASKS.md)
- [../../context/state/STATE.md](../../context/state/STATE.md)
- relevant SPARC contracts, existing implementation/evidence, and Worker results

## VALIDATION

Assess returned work before changing tier. Finish a localized, understood
remainder when safe and economical within Lead authority; otherwise clarify
or route the evidenced capability gap. Keep the original acceptance checks,
and publish any material correction as its own task candidate.

Give each Worker a bounded brief, reservations, applicable rules, and acceptance
checks. Supply failing tests for changed material code invariants; use inspection
for documentation. Inspect each returned diff and actual check result. Serialize
heavy work and verify records through SliceRecordsCheck before authorized Git
delivery. Keep full gate acceptance with Prime.

## OUTPUTS

Reviewed slices, updated task/state evidence, and the candidate acceptance handoff
as a new immutable `ready` (or Prime-level `escalation`) revision in STATE's
Gate Handoff, committed and, across harnesses, pushed before any Prime
notification. Integrate Prime decision commits without altering them.

## HANDOFF

Report gate/task IDs, revision, inspected changes, each check and exit result,
unresolved items, and actual Worker correction counts. Use StallCover for recovery.

## FORBIDDEN ACTIONS

No scope expansion, default-branch writes, acceptance-role takeover, weakened
checks, force-push, deployment, or unauthorized Git/communication actions.
```

### Design Worker profile

```md
# DesignWorker.md

## META

name: DesignWorker
canonical_location: /ai/pact/agents/workers/DesignWorker.md
layer: PACT / sub-agent role
role: Worker
specialty: design
model_tier: Middle
effort: 75%
model_binding: <Lead-selected owner-approved local binding>
status: draft
generated_from: /ai/pact/templates/sub-agent.tpl.md
generated_from_version: 2.3
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

## PURPOSE

Evaluate and improve one assigned interaction using the project's design rules.

## SCOPE

Only the named interaction, supplied artifacts, and reserved paths. This profile
does not claim files or select a task; Lead records the actual assignment in STATE.

## BOUNDARIES

Receive the parent's actual boundary_contract and role/parent/tier context:
assigned interaction; named artifact paths/access; protected code/runtime areas;
unchanged design/behavior interfaces; allowed proposal or reserved-edit effects;
and escalation for conflicts, missing limits or needed expansion. For a
proposal-only assignment, side effects are none. Choose the design method inside
these limits. If descendant work is authorized, carry inherited limits forward,
narrow as needed, and seek parent approval before widening.

## INPUTS

- Lead's task ID, brief, reservations, relevant design/behavior contracts,
  existing UI evidence, and required acceptance checks
- [../AGENTS.md](../AGENTS.md)
- [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md)
- [../../context/state/STATE.md](../../context/state/STATE.md)

## VALIDATION

Compare the proposed interaction with the supplied acceptance and design rules.
Use visual/behavior inspection appropriate to the brief; no code-invariant test
is needed for a design-only proposal. When code changes are assigned, preserve
the supplied tests and report their actual results. Report doubtful checks to
Lead. Run builds/tests only when assigned and resource reservations permit.

## OUTPUTS

The bounded design proposal or reserved diff, inspected evidence, and open issues.
Identify any uncertain remainder and its concrete blockers; do not self-promote
or request a higher tier merely because the result needs a local correction.

## HANDOFF

Return the task ID, changed/inspected paths, outcome, actual validation, and
questions. Lead reviews the result and updates execution records.

## FORBIDDEN ACTIONS

No version-control writes, unreserved edits, scope expansion, weakened tests,
acceptance claims, or service management. Report conflicts rather than guessing.
```
