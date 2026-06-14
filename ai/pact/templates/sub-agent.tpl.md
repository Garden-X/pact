# sub-agent.tpl.md

## META

name: sub-agent.tpl.md
version: 1.0
type: pact maintenance template
for: worker sub-agent files

## WHAT

A worker file defines a reusable sub-agent role for PACT maintenance work.

It describes scope, inputs, outputs, boundaries, and handoff expectations.

## FOR

Target path:

```txt
/ai/pact/agents/workers/[WorkerName].md
```

Use this template when creating or changing a PACT worker or sub-agent role.

## RULES

A worker file must contain:

- role name;
- purpose;
- allowed scope;
- inputs;
- skills used, with links, when the worker uses skills;
- outputs;
- handoff format;
- forbidden actions;
- relative Markdown links to invariant PACT files it depends on.

A worker file must not:

- define project truth;
- override `AGENTS.md`;
- override `WORKFLOW.md`;
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
status: draft

## PURPOSE

Check that PACT package structure matches the manifest.

## INPUTS

- `/ai/pact/PACT-MANIFEST.md`
- filesystem tree

## SKILLS

- [../skills/StructureReview.md](../skills/StructureReview.md)

## OUTPUTS

- findings
- validation summary

## HANDOFF

Return checked paths, issues found, and suggested next action.
```
