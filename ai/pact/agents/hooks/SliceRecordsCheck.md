# SliceRecordsCheck.md

## META

name: SliceRecordsCheck
canonical_location: /ai/pact/agents/hooks/SliceRecordsCheck.md
layer: PACT / agent hook
class: pact_hook
status: canonical
generated_from: /ai/pact/templates/hook.tpl.md
generated_from_version: 1.2
content_status: current-data
updated: 2026-10-08 17:05:00 UTC+00:00

## TRIGGER

Before the coordinator pushes a slice to the gate branch (`gate_branch_pattern`
in [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md)).

## INPUTS

- the staged file list of the slice commit
- [../../context/state/TASKS.md](../../context/state/TASKS.md) and
  [../../context/state/STATE.md](../../context/state/STATE.md)
- the project's daily log and SPARC live contracts, as routed by the Project
  Truth Updates table in [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md)
- [../skills/Time-Normalization.md](../skills/Time-Normalization.md) for stamps

## SCRIPTS

None.

## ACTION

Classify each staged path:

- record paths: `TASKS.md`, `STATE.md`, the daily log, `LOG.md`, and the SPARC
  live contracts (`LOGIC.md`, `MAP.md`, `SCHEMA.ts`, `DESIGN.md`,
  `PLATFORM-LOGIC.md`);
- code paths: every other staged path, such as product source, tests, build
  files, and data.

Check: if the slice changes any code path, it must also change `TASKS.md` or
`STATE.md`, the daily log, and each SPARC live contract the change touches,
and every changed record carries a verified-UTC stamp. A slice that changes
only record paths passes.

## OUTPUT

One of:

- `push`: the slice carries its records; the coordinator pushes it;
- `add records`: the list of missing records; the coordinator adds them to the
  same commit, then runs the check again.

## FAILURE

Do not push. Keep the slice local, add the missing records, and re-run the
check. If a record cannot be written because the target contract is missing,
record a SPARC gap instead of storing project truth in PACT state.

## BOUNDARIES

The hook checks presence and stamps of records; it does not judge their
content, which the primary reviews at gate close. It never writes project
truth, never skips other hooks, and never pushes `default_branch`.
