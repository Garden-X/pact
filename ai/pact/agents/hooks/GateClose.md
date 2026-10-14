# GateClose.md

## META

name: GateClose
canonical_location: /ai/pact/agents/hooks/GateClose.md
layer: PACT / agent hook
class: pact_hook
status: canonical
generated_from: /ai/pact/templates/hook.tpl.md
generated_from_version: 1.3
content_status: current-data
updated: 2026-10-14 18:27:22 UTC+00:00

## TRIGGER

The Lead's durable Gate Handoff in STATE records `signal: ready` with an
identified candidate under [WORKFLOW](../../workflow/WORKFLOW.md), and
`prime_response` has not answered that `seq`. A native wake,
[PrimeWatch](PrimeWatch.md), or the Prime fallback heartbeat only delivers
attention to that record; idle Workers, empty records, or elapsed time are not
a trigger. Registration is a workflow contract; this file does not itself
install a runtime hook.

## INPUTS

- [../../context/state/LOGIC-DRAFT.md](../../context/state/LOGIC-DRAFT.md)
- [../../context/state/TASKS.md](../../context/state/TASKS.md) and
  [../../context/state/STATE.md](../../context/state/STATE.md)
- the STATE Gate Handoff key (`gate_id` + `seq`), its exact candidate revision,
  acceptance commands, environment, and slice records
- [../skills/Time-Normalization.md](../skills/Time-Normalization.md)
- session authorization for any version-control action

## SCRIPTS

None. The installed project's WORKFLOW supplies its acceptance commands.

## ACTION

1. The Prime verifies scope, task evidence, records, and the candidate
   revision. The gate branch tip must equal the handoff `candidate` or differ
   from it only in STATE/TASKS records; otherwise the handoff is stale.
   Tests cannot be attributed to a commit when relevant working
   files differ from it; record and resolve that discrepancy first. Prime may
   record `prime_response: <seq> received` to mark a long inspection in progress.
2. Coordinate a hold on competing heavy runs, check declared resource limits,
   and run every required acceptance command sequentially. Record the command,
   exit status, candidate revision, environment, and evidence location.
3. Inspect every required step, or an aggregate result that proves all required
   steps exited zero. Missing, timed-out, interrupted, or nonzero steps prevent
   acceptance; a green final command does not erase earlier failures.
4. Decide acceptance only after reading the results. If version-control actions
   are authorized, fetch/check freshness and confirm the gate revision to merge
   is the tested revision. Confirm the default branch remains its ancestor;
   changes requiring a new candidate require relevant validation again.
5. Merge in a separate later action, using fast-forward only. Authorized push
   and completion-record writes follow; do not combine result inspection with
   merge in one shell command. Update TASKS/STATE and any required daily log,
   record `prime_response: <seq> accepted`, and have the Prime advance
   LOGIC-DRAFT to a preselected next gate if one exists.

## OUTPUT

- `accepted`: all required checks passed on the identified candidate; list
  which authorized merge, push, and record actions actually completed;
- `not accepted`: failed, missing, stale, or incomplete evidence and next work;
- `awaiting authorized delivery`: acceptance passed but a required delivery
  action lacks authorization; keep that outstanding action explicit.

## FAILURE

Do not merge or mark the gate closed. Keep the gate's pending acceptance or
delivery recorded and return exact failure evidence to the Lead as
`prime_response: <seq> not-accepted` with its evidence pointer, durably before
any notification through an authorized channel. A killed run is reported, not
silently restarted.

## BOUNDARIES

Only the Prime acceptance role closes a gate. Silence never transfers it;
explicit owner transfer follows [StallCover](StallCover.md), including
independent review. Never skip hooks, force-push, deploy, invent test results,
or erase history. Project truth remains in the applicable SPARC contracts.
