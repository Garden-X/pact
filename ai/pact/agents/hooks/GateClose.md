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
updated: 2026-10-14 19:39:23 UTC+00:00

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

Durable decision precedes delivery, and accepted is not delivered. Use this
order; never merge first and record the answer later.

1. Fetch the gate branch and confirm its newest published Gate Handoff
   revision is `ready`, unanswered, and names `candidate`. Verify scope, task
   evidence, and records. The handoff `candidate` is the implementation
   revision under acceptance; tests cannot be attributed to a commit when
   relevant working files differ from it, so record and resolve that first.
2. Coordinate a hold on competing heavy runs, check declared resource limits,
   and run every required acceptance command sequentially on exactly
   `candidate`. Record the command, exit status, candidate revision,
   environment, and evidence location.
3. Inspect every required step, or an aggregate result that proves all required
   steps exited zero. Missing, timed-out, interrupted, or nonzero steps prevent
   acceptance; a green final command does not erase earlier failures.
4. Decide only after reading the results, then make the decision durable on
   the gate branch: append to LOGIC-DRAFT `## Acceptance` an entry with
   `answers: <gate_id>#<seq>`, `decision`, `candidate`, the evidence pointer,
   and `delivery: pending` / `delivery_tip: none` for `accepted` or
   `delivery: not-applicable` for `not-accepted`, as a record-only commit with
   the trailer `PACT-Answers: <gate_id>#<seq>`, based on the fetched tip.
   This is Prime's narrow authority-decision write; it touches no Lead
   execution state.
5. Push the gate branch without force. If the push is rejected, fetch, read
   the new commits, and re-evaluate from step 1. Not accepted: stop here and
   notify Lead only after the answer is pushed; no default-branch merge. Lead
   recovers from the durable answer.
6. Accepted, when version-control actions are authorized: fetch again before
   delivery.
7. Verify that no Gate Handoff revision newer than the answered `seq` exists;
   that the delivery tip (the answer commit plus only later record commits)
   descends from `candidate`; that
   `git diff --name-only <candidate> <delivery-tip>` lists only PACT state and
   decision records under `/ai/pact/context/state/`; and that `default_branch`
   is fresh and an ancestor of the tip. A newer handoff, another path, or a
   moved branch means the earlier answer does not close the gate: reread and
   re-evaluate. Never merge an older answered revision past a newer handoff,
   force-push, or rebase or merge unseen cross-harness changes.
8. Merge in a separate later action: fast-forward `default_branch` exactly to
   that verified delivery tip and push it; do not combine result inspection
   with merge in one shell command.
9. Verify that the push succeeded: the fetched remote `default_branch` now
   contains the answer commit. Only this closes the gate.
10. Record `answers: <gate_id>#<seq>`, `delivery: complete`, and
    `delivery_tip: <delivered revision>` in LOGIC-DRAFT `## Acceptance` as a
    record-only commit on `default_branch`, pushed without force. With the
    step 4 entry, both the accepted candidate and the delivered tip are now
    recorded. It confirms a closure that the reachable answer commit already
    proves.
11. Then any required daily-log entry and Prime's advance of LOGIC-DRAFT to a
    preselected next gate may follow on `default_branch`.

### Delivery recovery

`decision: accepted` with `delivery: pending` and no `delivery: complete` for
that key on `default_branch` is open Prime-level work after any crash, end of
session, failed push, or missing authorization. On resume, do not rerun the
acceptance suite when the recorded candidate and evidence stand and nothing
relevant changed. Fetch gate and default branches. If the answer commit is
already reachable from remote `default_branch`, the gate is delivered: perform
only step 10. Otherwise verify the recorded candidate and evidence, step 7
in full, and then steps 8-10 when authorized. If anything changed materially
(a newer handoff, a non-record path, or `default_branch` no longer an ancestor),
do not deliver: re-evaluate from step 1 or return the gate to Lead with a
durable answer to the newest revision.

## OUTPUT

- `accepted`: all required checks passed on the identified candidate, the
  answer was committed before delivery, and the listed authorized merge, push,
  and record actions actually completed; closed only when the answer commit
  is reachable from remote `default_branch`;
- `not accepted`: failed, missing, stale, or incomplete evidence and next work,
  durably answered on the gate branch with `delivery: not-applicable`;
- `awaiting authorized delivery`: `accepted` + `delivery: pending` is recorded
  but a delivery action lacks authorization or failed; the gate stays open and
  recoverable.

## FAILURE

Do not merge or mark the gate closed. Keep the gate's pending acceptance or
delivery recorded. A failure the Lead must act on is answered durably as in
steps 4-5 before any notification. A failed delivery push leaves
`delivery: pending` for recovery. A killed run is reported, not silently
restarted.

## BOUNDARIES

Only the Prime acceptance role closes a gate. Silence never transfers it;
explicit owner transfer follows [StallCover](StallCover.md), including
independent review. Never skip hooks, force-push, deploy, invent test results,
or erase history. Project truth remains in the applicable SPARC contracts.
