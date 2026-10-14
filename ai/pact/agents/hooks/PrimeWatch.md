# PrimeWatch.md

## META

name: PrimeWatch
canonical_location: /ai/pact/agents/hooks/PrimeWatch.md
layer: PACT / host hook record
class: host_hook
status: canonical
generated_from: /ai/pact/templates/hook.tpl.md
generated_from_version: 1.3
content_status: current-data
updated: 2026-10-14 18:27:22 UTC+00:00

## TRIGGER

In `harness_topology: multi`, an authorized host scheduler invokes this
Watchdog at WORKFLOW's `heartbeat_watch` cadence on the Prime side. With
`heartbeat_watch: none` or `single` topology it does not run. This file records
a portable prompt; it installs no timer, agent, or messaging permission.

The executor holds no PACT role: its host binding or dispatch records
`role: none`, `function: Watchdog`, the Prime it serves, and this file's
BOUNDARIES as its fixed boundary_contract. It inherits no Prime or Lead
authority. A cheap model or a non-model script may execute it.

## INPUTS

Read-only, and only what the current gate needs:

- `gate_id` from [../../context/state/LOGIC-DRAFT.md](../../context/state/LOGIC-DRAFT.md)
  and `gate_branch_pattern` from [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md)
- the `## Gate Handoff` block of
  [../../context/state/STATE.md](../../context/state/STATE.md) as published on
  the gate branch or the declared shared location
- the host-owned last-delivered key, outside PACT records
- host-reported Lead/harness failure evidence, when the host exposes it

## SCRIPTS

None. Scheduling, delivery, and the delivered-key memory belong to the host.

## ACTION

Portable prompt for an installed binding:

> Act only as the role-less PrimeWatch observer for the recorded gate. Fetch
> read-only and read the published Gate Handoff. Wake Prime through the
> authorized channel only when `signal` is `ready` or `escalation`, the key
> `gate_id` + `seq` differs from the last delivered key, and `prime_response`
> has not answered that `seq`. Also wake Prime once per distinct item of exact
> evidence that the Lead or its harness is unavailable while gate work remains.
> Include only the key, signal, candidate or evidence, and record location.
> Otherwise stay silent. Never infer readiness from idle Workers, empty
> records, branch activity, or elapsed time, and never act on the gate.

## OUTPUT

At most one Prime wake per new key or evidence item, naming the durable record;
no output on unchanged ticks. The host updates the delivered key only after
successful delivery.

## FAILURE

If the record cannot be read, delivery fails, or evidence is ambiguous, report
the exact failure to Prime once when delivery is possible; otherwise leave the
key undelivered for the next tick. Missing this observer loses no truth: Prime's
fallback heartbeat, the owner, or a later run reconstructs attention from the
records. Do not create a replacement timer or message another session without
authorization.

## BOUNDARIES

Observe and wake only. No Gate selection or scope change, decomposition, task
creation or dispatch, Worker review, integration, code or record edits,
boundary changes, slice or gate acceptance, branch or default-branch writes,
service management, or StallCover action. Elapsed time is reportable only as
evidence; it never transfers authority. Duplicate deliveries are harmless
because Prime acts from the durable key. Register it in
[WORKFLOW](../../workflow/WORKFLOW.md) with its actual binding status.
