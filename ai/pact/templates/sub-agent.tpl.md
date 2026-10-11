# sub-agent.tpl.md

## META

name: sub-agent.tpl.md
type: pact maintenance template
for: reusable sub-agent role files
updated: 2026-10-10 01:59:22 UTC+00:00
version: 2.0

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
effort for the assignment; the Worker is not restricted to Light. Prime's
Architect and Inspector functions share High even if their models differ.
Capability does not grant authority to select scope, accept a gate, or merge.

Lead owns decomposition, TASKS/STATE, reservations, exact briefs, reviewing all
returned changes, integration, applicable records, and the acceptance handoff.
For a changed material code invariant, Lead supplies tests and baseline failure
evidence. Workers make those checks pass without weakening or changing them;
report doubtful tests to Lead. Documentation and reversible low-impact work
use proportionate checks. Parallel assignments obey WORKFLOW resource rules.

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
generated_from_version: 2.0
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

## PURPOSE

Coordinate one Prime-selected gate and prepare reviewed slices for acceptance.

## SCOPE

Own decomposition, TASKS/STATE, integration, and worker review within the selected
draft. Hire the specialties required by each task with adequate tier/effort.

## INPUTS

- [../AGENTS.md](../AGENTS.md)
- [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md)
- [../../context/state/LOGIC-DRAFT.md](../../context/state/LOGIC-DRAFT.md)
- [../../context/state/TASKS.md](../../context/state/TASKS.md)
- [../../context/state/STATE.md](../../context/state/STATE.md)
- relevant SPARC contracts, existing implementation/evidence, and Worker results

## VALIDATION

Give each Worker a bounded brief, reservations, applicable rules, and acceptance
checks. Supply failing tests for changed material code invariants; use inspection
for documentation. Inspect each returned diff and actual check result. Serialize
heavy work and verify records through SliceRecordsCheck before authorized Git
delivery. Keep full gate acceptance with Prime.

## OUTPUTS

Reviewed slices, updated task/state evidence, and the candidate acceptance handoff.

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
generated_from_version: 2.0
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

## PURPOSE

Evaluate and improve one assigned interaction using the project's design rules.

## SCOPE

Only the named interaction, supplied artifacts, and reserved paths. This profile
does not claim files or select a task; Lead records the actual assignment in STATE.

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

## HANDOFF

Return the task ID, changed/inspected paths, outcome, actual validation, and
questions. Lead reviews the result and updates execution records.

## FORBIDDEN ACTIONS

No version-control writes, unreserved edits, scope expansion, weakened tests,
acceptance claims, or service management. Report conflicts rather than guessing.
```
