# PrimeHeartbeat.md

## META

name: PrimeHeartbeat
canonical_location: /ai/pact/agents/hooks/PrimeHeartbeat.md
layer: PACT / host hook record
class: host_hook
status: canonical
generated_from: /ai/pact/templates/hook.tpl.md
generated_from_version: 1.4
content_status: current-data
updated: 2026-10-14 19:55:32 UTC+00:00

## TRIGGER

An authorized host scheduler invokes the Prime heartbeat at WORKFLOW's
declared `heartbeat_prime` cadence. It is a rare recovery fallback: Prime is
normally woken by Lead's native event, a direct cross-harness event, or
[PrimeWatch](PrimeWatch.md). `none` disables it. This file records a portable
prompt; no scheduler or runtime binding is installed by the Markdown file. Host
behavior and availability govern the binding.

## INPUTS

- [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md) topology, cadence,
  and bindings
- [../../context/state/LOGIC-DRAFT.md](../../context/state/LOGIC-DRAFT.md)
- the newest published `## Gate Handoff` revision of
  [../../context/state/STATE.md](../../context/state/STATE.md) and any
  `PACT-Answers` commits on the gate branch
- Lead availability evidence through authorized channels

## SCRIPTS

None. Installation and deduplication belong to the authorized host scheduler.

## ACTION

Portable prompt for an installed binding:

> Resume the recorded Prime role for this project and current gate. Fetch and
> read the newest published Gate Handoff revision. If it is `ready` or
> `escalation` and no commit carries `PACT-Answers` for its `gate_id#seq`,
> handle it: an unanswered `ready` enters GateClose's acceptance path. An
> `accepted` answer whose commit is not reachable from remote
> `default_branch` enters GateClose's delivery-recovery path, which never
> reruns acceptance automatically. For an escalation, write only the minimum authority-decision entry
> in the artifact that owns the affected authority (a boundary widening appended
> to that task's `boundary_contract`, a gate scope or acceptance change in
> LOGIC-DRAFT), as a record-only, non-force commit with the `PACT-Answers`
> trailer, based on the
> fetched tip. Never perform Lead execution-state maintenance or write the Gate
> Handoff.
> If the push is rejected, fetch, read the new commits, and answer only the
> newest revision. If exact evidence shows a new Lead unavailability incident
> while gate work remains, apply StallCover.
> Do not review slices or poll Workers between events, and never infer
> readiness from silence or empty records. Coordinate resources before heavy
> work. Preserve existing work and services. Stay quiet on unchanged or
> non-actionable ticks; notify only for a meaningful change, completion,
> failure, or required owner action.

## OUTPUT

An actionable gate decision recorded in its owning artifact, or a recorded
cover action;
routine unchanged ticks produce no owner notification.

## FAILURE

Record unavailable evidence/binding or a failed acceptance step. Use
[StallCover](StallCover.md) within existing authorization; do not create a
replacement timer or send another chat a message without authorization.

## BOUNDARIES

The host owns event execution and cadence. PACT records the proposed interaction
with its lifecycle. No automatic role promotion, service restart, scope change,
default-branch write, or acceptance claim follows merely from a timer firing.
See [GateClose](GateClose.md) for acceptance and delivery controls.
