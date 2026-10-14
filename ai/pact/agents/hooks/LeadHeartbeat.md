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
updated: 2026-10-14 19:16:25 UTC+00:00

## TRIGGER

An authorized host scheduler invokes the Lead heartbeat at WORKFLOW's
declared `heartbeat_lead` cadence in the Lead's harness. It is the fallback of
Lead's Watchdog function when native Worker completion events are missing or
unreliable. This file records a portable prompt; it installs no timer, agent,
or messaging permission. The host governs actual execution.

## INPUTS

- [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md) topology, cadence,
  and bindings
- [../../context/state/TASKS.md](../../context/state/TASKS.md) and
  [../../context/state/STATE.md](../../context/state/STATE.md), and new Prime
  decision commits (`PACT-Answers`) on the gate branch
- current slice, worker availability, validation, and record/delivery status

## SCRIPTS

None. Installation and deduplication belong to the authorized host scheduler.

## ACTION

Portable prompt for an installed binding:

> Resume the recorded Lead role for the current gate. As its Watchdog, check
> active reservations, returned and blocked Worker results, and the ready pool;
> continue only assigned work. Review covered results first. Keep independent
> light tasks moving, serialize heavy checks, and verify slice records before
> authorized delivery. Lead owns mutable execution state; Prime adds only
> narrow authority-decision entries. Fetch before every commit, push, or
> handoff publication;
> read and integrate new Prime decision commits without altering their entries,
> and act on a decision only from its durable record. Record progress in STATE;
> do not relay routine Worker or slice status to Prime. Wake Prime only by
> publishing a new immutable Gate Handoff revision with `escalation` or
> `ready`, committed first and pushed before notification in `multi`
> topology. Any material change to a published revision is the next `seq`.
> Push without force; on rejection, fetch, read, integrate, and re-check.
> Hold at ready for Prime acceptance; if Prime is unavailable, apply the
> declared StallCover policy.
> Stay quiet to the owner on unchanged ticks; notify only for a meaningful
> change, completion, failure, or required owner action.

## OUTPUT

Recorded task progress and, only for Prime-level events, a new Gate Handoff
`seq` with its notification; routine unchanged ticks produce no Prime or owner
notification.

## FAILURE

Keep incomplete checks or unavailable communication explicit in STATE. Apply
[StallCover](StallCover.md) within existing authorization. Do not repeatedly
dispatch tasks, manufacture status, or install a replacement timer silently.

## BOUNDARIES

The host owns runtime behavior and cadence. Notification requires the host's
and user's applicable messaging authorization; Markdown registration grants
none. A heartbeat does not permit default-branch delivery, gate acceptance,
scope changes, or service management.
