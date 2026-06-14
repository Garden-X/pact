# skill.tpl.md

## META

name: skill.tpl.md
version: 1.0
type: pact maintenance template
for: agent skill files

## WHAT

A skill file describes one reusable capability that an agent orientation, soul
file, or worker may use during PACT maintenance work.

Skills are optional extension files. They are not required core PACT files.

## FOR

Target path:

```txt
/ai/pact/agents/skills/[Skill].md
```

Use this template when creating or changing a reusable agent skill.

Also use this template when the owner asks an agent to remember what or how to
do something and the remembered behavior is a reusable agent capability.

## RULES

A skill file must contain:

- skill name;
- purpose;
- when to use it;
- inputs;
- outputs;
- boundaries;
- relative Markdown links to any required PACT files.

Optional skill filenames must use CapitalCase:

```txt
[Skill].md
```

Agent orientation, soul files, and workers that use a skill must link to the
skill file.

If skill scope is unclear, ask whether the skill should be used by the current
soul, all souls, a worker, or a hook.

A skill file must not:

- define project truth;
- override `AGENTS.md`;
- override `WORKFLOW.md`;
- contain secrets;
- replace a worker, hook, or state file.

## EXAMPLE

```md
# StructureReview.md

## META

name: StructureReview
canonical_location: /ai/pact/agents/skills/StructureReview.md
layer: PACT / agent skill
status: draft

## PURPOSE

Review PACT folder and file structure against the manifest.

## WHEN TO USE

Use before completing changes that alter PACT package structure.

## INPUTS

- [../../PACT-MANIFEST.md](../../PACT-MANIFEST.md)
- filesystem tree

## OUTPUTS

- structure findings
- suggested corrections

## BOUNDARIES

This skill reviews PACT structure. It does not define project truth.
```
