# LeadHeartbeat.md

## META

name: LeadHeartbeat
canonical_location: /ai/pact/agents/hooks/LeadHeartbeat.md
layer: PACT / host hook record
class: host_hook
status: canonical
generated_from: /ai/pact/templates/hook.tpl.md
generated_from_version: 1.3
content_status: current-data
updated: 2026-10-10 01:59:22 UTC+00:00

## TRIGGER

An authorized host scheduler invokes the Lead heartbeat at WORKFLOW's
declared cadence. This file records a portable prompt; it installs no timer,
agent, or messaging permission. The host governs actual execution.

## INPUTS

- [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md) cadence and bindings
- [../../context/state/TASKS.md](../../context/state/TASKS.md) and
  [../../context/state/STATE.md](../../context/state/STATE.md)
- current slice, worker availability, validation, and record/delivery status

## SCRIPTS

None. Installation and deduplication belong to the authorized host scheduler.

## ACTION

Portable prompt for an installed binding:

> Resume the recorded Lead role for the current gate. Check active
> reservations, returned worker diffs, and the ready pool; continue only assigned
> work. Review covered results first. Keep independent light tasks moving,
> serialize heavy checks, and verify slice records before authorized delivery.
> Report one line to the Prime through an authorized channel: gate/slice,
> workers running, latest delivered revision (or uncommitted), validation/blocker,
> and resource evidence when measured. Hold at ready for Prime acceptance;
> if it is unavailable, apply the declared StallCover policy. Stay quiet to the
> owner on unchanged ticks; notify only for a meaningful change, completion,
> failure, or required owner action.

## OUTPUT

A concise authorized status relay and recorded task progress; routine unchanged
ticks produce no owner notification.

## FAILURE

Keep incomplete checks or unavailable communication explicit in STATE. Apply
[StallCover](StallCover.md) within existing authorization. Do not repeatedly
dispatch tasks, manufacture status, or install a replacement timer silently.

## BOUNDARIES

The host owns runtime behavior and cadence. Relay requires the host's and
user's applicable messaging authorization; Markdown registration grants none.
A heartbeat does not permit default-branch delivery, gate acceptance, scope
changes, or service management.
