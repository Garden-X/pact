# sub-agent.tpl.md

## META

name: sub-agent.tpl.md
type: pact maintenance template
for: worker sub-agent files
updated: 2026-10-08 17:05:00 UTC+00:00
version: 1.2

## WHAT

A worker file defines a reusable sub-agent role for PACT maintenance work.

It describes scope, inputs, outputs, boundaries, and handoff expectations.

A worker file may realize a tier of the `## Execution Hierarchy` in
`WORKFLOW.md`: a `coordinator` role (decomposes, briefs, reviews, pushes slices)
or a `worker` role (executes one atomic task). The tier definitions live in
`WORKFLOW.md`; the worker file only narrows them.

A `worker` tier file also carries the test-first obligation: the coordinator
writes the failing tests that state the invariant before dispatch, and the
worker only makes them pass.

## FOR

Target path:

```txt
/ai/pact/agents/workers/[WorkerName].md
```

Use this template when creating or changing a PACT worker or sub-agent role.

## RULES

A worker file must contain:

- role name;
- `tier`: `coordinator` or `worker` when the role realizes an Execution
  Hierarchy tier, otherwise omitted;
- purpose;
- allowed scope;
- inputs;
- skills used, with links, when the worker uses skills;
- for a `worker` tier file, the test-first obligation from the Work
  optimization rules in `WORKFLOW.md`: the worker makes the coordinator's given
  tests pass and never edits, weakens, skips, or conditions them, and reports a
  doubtful test instead of changing it;
- outputs;
- handoff format;
- forbidden actions;
- relative Markdown links to invariant PACT files it depends on.

A worker file must not:

- define project truth;
- override `AGENTS.md`;
- override `WORKFLOW.md`, including the tier boundaries of the Execution
  Hierarchy (a `worker` tier file must not grant version-control writes or
  scope changes; a `coordinator` tier file must not grant default-branch
  writes or the full acceptance suite);
- claim files without recording state;
- write PACT material into `/ai/docs`.

Optional worker filenames must use CapitalCase:

```txt
WorkerName.md
```

If a worker uses skills, it must link to each skill file under:

```txt
/ai/pact/agents/skills
```

## EXAMPLE

```md
# StructureAuditor.md

## META

name: StructureAuditor
canonical_location: /ai/pact/agents/workers/StructureAuditor.md
layer: PACT / worker
tier: worker
status: draft
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

## PURPOSE

Check that PACT package structure matches the manifest.

## INPUTS

- `/ai/pact/PACT-MANIFEST.md`
- filesystem tree

## SKILLS

- [../skills/StructureReview.md](../skills/StructureReview.md)

## TEST FIRST

Make the coordinator's given tests pass. Never edit, weaken, skip, or condition
them; report a doubtful test instead of changing it.

## OUTPUTS

- findings
- validation summary

## HANDOFF

Return checked paths, issues found, and suggested next action.
```
