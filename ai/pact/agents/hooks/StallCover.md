# StallCover.md

## META

name: StallCover
canonical_location: /ai/pact/agents/hooks/StallCover.md
layer: PACT / agent hook
class: pact_hook
status: canonical
generated_from: /ai/pact/templates/hook.tpl.md
generated_from_version: 1.3
content_status: current-data
updated: 2026-10-16 04:55:33 UTC+00:00

## TRIGGER

A role is unavailable through a reported session limit/error, a host-reported
harness failure, or the declared heartbeat's missed-reply condition while
assigned work remains. Evidence may arrive from the host or from
[PrimeWatch](PrimeWatch.md), which only reports it, once per stable incident
key (gate, affected role and actor/harness/session, failure kind, incident
id). Elapsed time is evidence of availability only; it is never approval or a
role transfer. Neither a Watchdog function nor a harness failure grants cover
or acceptance authority.

## INPUTS

- [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md), including
  `prime_stall_policy` (default `ready-only`)
- [../../context/state/LOGIC-DRAFT.md](../../context/state/LOGIC-DRAFT.md)
- [../../context/state/TASKS.md](../../context/state/TASKS.md) ready briefs
- [../../context/state/STATE.md](../../context/state/STATE.md) reservations
- availability evidence and existing dispatch/message/VCS authorization

## SCRIPTS

None.

## ACTION

### Lead unavailable

The Prime may dispatch only pre-briefed ready tasks from TASKS after checking
active reservations. Transfer each taken task to STATE with its actor and
lead; do not duplicate ownership. Parallel tasks require disjoint writes
and no task in the set that builds or runs tests. Record `covered by Prime`
in the required daily log or task evidence when the project has no daily log.
A covered Worker publishes a mutating result only on its assigned task
branch; results stay unintegrated and unreviewed until the Lead resumes and
reviews them first; the Prime does not expand scope, rewrite briefs, plan
new slices, or review product code. Wait when the ready pool is empty.
When Prime and Lead use different harnesses, cover only when the covered
results stay reachable for the returning Lead's review without a Git write this
cover does not authorize; otherwise record the evidence and wait.

### Prime unavailable

Under `ready-only`, the Lead holds the current gate ready. For a gate already
selected by Prime in LOGIC-DRAFT's `## Next`, it may inspect existing evidence
read-only and record planning/dependency notes in the existing cache. It must
not activate or decompose that gate, dispatch its Workers, replace the current
LOGIC-DRAFT/TASKS/STATE, or change the ready candidate, ownership, or reservations.
Execution waits until the current gate is accepted and Prime advances the
selected draft. An empty Next supplies no new gate to plan. Lead never merges
or pushes the default branch, selects another gate, or treats planning as
acceptance. No separate branch or operational state is created for these notes.

The alternative `close-gate` applies only after explicit owner authorization
transfers the acceptance role. Record the transfer and arrange independent
review of the candidate before [GateClose](GateClose.md); every required
acceptance step must pass. A timeout never promotes the Lead into that
role automatically. The returning Prime reviews any transferred close first.

## OUTPUT

For Lead cover, record availability evidence, exact covered task IDs,
reservations, review status, and pending handback in existing STATE/task evidence
or required daily history. For Next planning during Prime absence, observations
and dependencies remain only in existing cache; the current draft, task/state
records, and ready candidate stay unchanged.

## FAILURE

Without a complete brief, free reservation, or applicable authorization for
Lead cover, keep the pending work recorded and wait. If Next has no Prime-selected
gate, do not invent one or start execution. Report only actionable failures or
a required owner decision; do not repeatedly dispatch the same task.

## BOUNDARIES

Cover changes availability, not scope or ownership. It does not authorize
cross-thread messages, scheduler creation, Git writes, new gates, service
restarts, or bypasses of host controls. Preserve existing work and history.
