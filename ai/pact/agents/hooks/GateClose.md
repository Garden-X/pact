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
updated: 2026-10-14 18:49:23 UTC+00:00

## TRIGGER

The newest published Gate Handoff revision in STATE records `signal: ready`
with an identified candidate under [WORKFLOW](../../workflow/WORKFLOW.md), and
no commit carries `PACT-Answers` for its `gate_id#seq`. A native wake,
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
   revision. The handoff `candidate` is the implementation revision under
   acceptance; run the checks on exactly that revision. Tests cannot be
   attributed to a commit when relevant working files differ from it; record
   and resolve that discrepancy first.
2. Coordinate a hold on competing heavy runs, check declared resource limits,
   and run every required acceptance command sequentially. Record the command,
   exit status, candidate revision, environment, and evidence location.
3. Inspect every required step, or an aggregate result that proves all required
   steps exited zero. Missing, timed-out, interrupted, or nonzero steps prevent
   acceptance; a green final command does not erase earlier failures.
4. Decide acceptance only after reading the results. If version-control actions
   are authorized, fetch/check freshness. The delivery tip must descend from
   `candidate`, and `git diff --name-only <candidate> <tip>` may list only
   PACT state records under `/ai/pact/context/state/`; any other path, or a
   newer handoff revision, makes this handoff stale and is not accepted.
   Record both the accepted candidate and the delivered tip. Confirm the
   default branch remains its ancestor; changes requiring a new candidate
   require relevant validation again.
5. Merge in a separate later action, using fast-forward only. Authorized push
   and completion-record writes follow; do not combine result inspection with
   merge in one shell command. Record the outcome in LOGIC-DRAFT
   `## Acceptance` naming `answers: <gate_id>#<seq>`, update completion
   records and any required daily log, and have the Prime advance LOGIC-DRAFT
   to a preselected next gate if one exists.

## OUTPUT

- `accepted`: all required checks passed on the identified candidate; list
  which authorized merge, push, and record actions actually completed;
- `not accepted`: failed, missing, stale, or incomplete evidence and next work;
- `awaiting authorized delivery`: acceptance passed but a required delivery
  action lacks authorization; keep that outstanding action explicit.

## FAILURE

Do not merge or mark the gate closed. Keep the gate's pending acceptance or
delivery recorded. Record `not accepted` with its evidence pointer in
LOGIC-DRAFT `## Acceptance` naming `answers: <gate_id>#<seq>`, as a
record-only, non-force commit with the `PACT-Answers` trailer based on the
fetched gate tip, before any notification to the Lead. A killed run is
reported, not silently restarted.

## BOUNDARIES

Only the Prime acceptance role closes a gate. Silence never transfers it;
explicit owner transfer follows [StallCover](StallCover.md), including
independent review. Never skip hooks, force-push, deploy, invent test results,
or erase history. Project truth remains in the applicable SPARC contracts.
