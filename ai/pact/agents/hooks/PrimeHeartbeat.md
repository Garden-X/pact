# PrimeHeartbeat.md

## META

name: PrimeHeartbeat
canonical_location: /ai/pact/agents/hooks/PrimeHeartbeat.md
layer: PACT / host hook record
class: host_hook
status: canonical
generated_from: /ai/pact/templates/hook.tpl.md
generated_from_version: 1.3
content_status: current-data
updated: 2026-10-10 01:59:22 UTC+00:00

## TRIGGER

An authorized host scheduler invokes the Prime heartbeat at WORKFLOW's
declared cadence. This file records a portable prompt; no scheduler or runtime
binding is installed by the Markdown file. Host behavior and availability
govern the binding.

## INPUTS

- [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md) cadence and bindings
- [../../context/state/LOGIC-DRAFT.md](../../context/state/LOGIC-DRAFT.md)
- [../../context/state/TASKS.md](../../context/state/TASKS.md) and
  [../../context/state/STATE.md](../../context/state/STATE.md)
- Lead status and gate record revisions through authorized channels

## SCRIPTS

None. Installation and deduplication belong to the authorized host scheduler.

## ACTION

Portable prompt for an installed binding:

> Resume the recorded Prime role for this project and current gate. Read
> WORKFLOW, the selected draft, active state, and new PACT/SPARC records. Keep
> periodic review to records; flag actionable gaps to the Lead only
> through an authorized channel. If the Lead is unavailable, apply
> StallCover to its ready pool. When the gate is ready, use GateClose to inspect
> every required acceptance result before a separate authorized delivery action.
> Coordinate resources before heavy work. Preserve existing work and services.
> Stay quiet on unchanged or non-actionable ticks; notify only for a meaningful
> change, completion, failure, or required owner action.

## OUTPUT

An actionable gate decision or recorded cover action; routine unchanged ticks
produce no owner notification.

## FAILURE

Record unavailable evidence/binding or a failed acceptance step. Use
[StallCover](StallCover.md) within existing authorization; do not create a
replacement timer or send another chat a message without authorization.

## BOUNDARIES

The host owns event execution and cadence. PACT records the proposed interaction
with its lifecycle. No automatic role promotion, service restart, scope change,
default-branch write, or acceptance claim follows merely from a timer firing.
See [GateClose](GateClose.md) for acceptance and delivery controls.
