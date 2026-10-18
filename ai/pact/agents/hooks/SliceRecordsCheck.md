# SliceRecordsCheck.md

## META

name: SliceRecordsCheck
canonical_location: /ai/pact/agents/hooks/SliceRecordsCheck.md
layer: PACT / agent hook
class: pact_hook
status: canonical
generated_from: /ai/pact/templates/hook.tpl.md
generated_from_version: 1.4
content_status: current-data
updated: 2026-10-18 02:28:25 UTC+00:00

## TRIGGER

Before committing a slice, and again before pushing outgoing slices to the
gate branch (`gate_branch_pattern` in
[../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md)).

## INPUTS

- the proposed staged diff before commit; the actual committed diff of each
  outgoing slice before push, with its revision and base
- [../../context/state/TASKS.md](../../context/state/TASKS.md) and
  [../../context/state/STATE.md](../../context/state/STATE.md)
- the project's declared logging policy and SPARC live contracts, as routed by the Project
  Truth Updates table in [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md)
- [../skills/Time-Normalization.md](../skills/Time-Normalization.md) for stamps

## SCRIPTS

None.

## ACTION

Inspect the records carried by each slice, rather than unrelated index state
or a later commit's records. Classify paths by their declared purpose:

- record paths: `TASKS.md`, `STATE.md`, the daily log, `LOG.md`, and the SPARC
  live contracts (`LOGIC.md`, `MAP.md`, `SCHEMA.ts`, `DESIGN.md`,
  `PLATFORM-LOGIC.md`);
- implementation paths: product source, tests, build configuration, and data;
- maintenance paths: PACT specifications, templates, hooks, skills, and local
  operational configuration. These are not product-truth changes merely
  because their filenames differ from the record paths above.

Check that implementation and maintenance slices carry an outcome and
validation in `TASKS.md` or `STATE.md`. Require the daily log when the attached
SPARC binding or project logging policy requires it. For each affected live
contract, either update it when accepted truth changed, or record the contract
path, verification evidence, and why its existing truth remains valid. A fix
restoring an existing contract does not require editing that contract.

Meaningfully changed records carry verified-UTC stamps. Do not refresh an
unchanged contract's stamp or invent project-truth files or logs merely to
satisfy the check. Follow the actual attached binding and project logging
policy; source-repository maintenance does not supply a target project's truth.
Apply WORKFLOW Validation scope and evidence reuse to the actual effects of
the diff. Resolve every reused result and its original revision, unchanged
inputs and environment; missing equivalence requires the applicable check.
A changed live contract is not automatically a pure progress record.
Record-only slices still need truthful
validation; a changed filename alone is not evidence of completion. Stage
intended paths explicitly and exclude unrelated work and temporary cache.

## OUTPUT

One of:

- `pass`: the slice carries its records; the authorized commit or push may
  proceed after all other applicable checks;
- `add records`: the list of missing records; the Lead adds them to the
  same commit, then runs the check again.

## FAILURE

Do not push. Keep the slice local, add the missing records, and re-run the
check. If a record cannot be written because the target contract is missing,
record a SPARC gap instead of storing project truth in PACT state.

## BOUNDARIES

The hook verifies record presence, scope, and validation pointers; the Prime
reviews their adequacy at gate close. This Markdown hook is a manual check
until a host adapter is installed and verified. It never writes project truth,
never skips other hooks, and never pushes `default_branch`.
