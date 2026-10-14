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
updated: 2026-10-14 23:22:03 UTC+00:00

## TRIGGER

In `harness_topology: multi`, an authorized host scheduler invokes this
Watchdog at WORKFLOW's `heartbeat_watch` cadence on the Prime side. With
`heartbeat_watch: none` or `single` topology it does not run. This file records
a portable prompt; it installs no timer, agent, or messaging permission.

The executor holds no PACT role: its host binding or dispatch records
`role: none`, `function: Watchdog`, the Prime it serves, and this file's
BOUNDARIES as its fixed boundary_contract. It inherits no Prime or Lead
authority. Capability is selected for the observation, not by this function:
a deterministic non-model script or a Light model for mechanical state checks,
Middle or High when ambiguous failures, stale evidence, or complex recovery
conditions must be interpreted. Any capability keeps the same contract.

## INPUTS

Read-only, and only what the current gate needs:

- `gate_id` from [../../context/state/LOGIC-DRAFT.md](../../context/state/LOGIC-DRAFT.md)
  and `gate_branch_pattern` from [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md)
- the newest published `## Gate Handoff` revision in
  [../../context/state/STATE.md](../../context/state/STATE.md) on the gate
  branch or the declared shared location, and whether a gate-branch commit
  carries `PACT-Answers: <gate_id>#<seq>` for it
- whether the newest `accepted` answer commit is reachable from remote
  `default_branch`
- host-owned delivered-key and open-incident memory, outside PACT records
- host-reported Lead/harness failure evidence, when the host exposes it

## SCRIPTS

None. Scheduling, delivery, and the dedup memory belong to the host.

## ACTION

Portable prompt for an installed binding:

> Act only as the role-less PrimeWatch observer for the recorded gate: observe,
> classify, and wake. Fetch read-only and read the newest published Gate
> Handoff revision. Wake Prime through the authorized channel only when its
> `signal` is `ready` or `escalation`, no commit carries `PACT-Answers` for its
> `gate_id#seq`, and that key differs from the last delivered key. Also wake
> Prime once per delivery key `gate_id#seq@candidate` when an `accepted`
> answer commit is not reachable from remote `default_branch`: an existing
> `PACT-Answers` does not mean the gate is closed. These wakes point Prime to GateClose's acceptance
> path or delivery-recovery path respectively; classify which one, nothing
> more. A published
> revision is immutable, so a changed request always has a new `seq`; never
> compare payload text to invent a wake. For Lead or harness unavailability
> while gate work remains, form the incident key from the gate, affected role
> and actor/harness/session identity, failure kind, and incident id (the host's
> error/session id, or the first observation that opened the incident). Wake
> once per incident; repeated observations with new timestamps or liveness
> details are the same incident until its kind or impact materially changes.
> Observed recovery closes it; a later failure is a new incident. Include only
> the key, signal, candidate or evidence, and record location. Otherwise stay
> silent. Never infer readiness from idle Workers, empty records, branch
> activity, or elapsed time, and never act on the gate.

## OUTPUT

At most one Prime wake per new handoff key, delivery key, or incident key,
naming the durable
record or exact evidence; no output on unchanged ticks. The host updates its
memory only after successful delivery, and shares one memory when a direct
event also delivers.

## FAILURE

If the record cannot be read, delivery fails, or evidence is ambiguous, report
the exact failure to Prime once when delivery is possible; otherwise leave the
key undelivered for the next tick. Missing this observer loses no truth: Prime's
fallback heartbeat, the owner, or a later run reconstructs attention from the
records. Lost host memory causes at most one repeated wake. Do not create a
replacement timer or message another session without authorization.

## BOUNDARIES

Observe, classify, and wake only. No Gate selection or scope change,
decomposition, task creation or dispatch, Worker review, integration, code or
record edits, boundary changes, slice or gate acceptance, branch or
default-branch writes, service management, or StallCover action. Higher
capability never widens this contract. Elapsed time is reportable only as
evidence; it never transfers authority. Duplicate deliveries are harmless
because Prime acts from the durable key. Register it in
[WORKFLOW](../../workflow/WORKFLOW.md) with its actual binding status.
