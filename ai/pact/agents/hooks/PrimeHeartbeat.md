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
updated: 2026-10-14 18:27:22 UTC+00:00

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
- the `## Gate Handoff` block of
  [../../context/state/STATE.md](../../context/state/STATE.md), as published on
  the gate branch in `multi` topology
- Lead availability evidence through authorized channels

## SCRIPTS

None. Installation and deduplication belong to the authorized host scheduler.

## ACTION

Portable prompt for an installed binding:

> Resume the recorded Prime role for this project and current gate. Read the
> durable Gate Handoff. If `ready` or `escalation` has a `seq` that
> `prime_response` has not answered, handle it: use GateClose for `ready`, or
> decide the escalation in LOGIC-DRAFT, then record `prime_response`. If exact
> evidence shows the Lead unavailable while gate work remains, apply StallCover.
> Do not review slices or poll Workers between events, and never infer
> readiness from silence or empty records. Coordinate resources before heavy
> work. Preserve existing work and services. Stay quiet on unchanged or
> non-actionable ticks; notify only for a meaningful change, completion,
> failure, or required owner action.

## OUTPUT

An actionable gate decision or recorded cover action with its `prime_response`;
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
