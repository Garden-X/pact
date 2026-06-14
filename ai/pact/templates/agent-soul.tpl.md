# agent-soul.tpl.md

## META

name: agent-soul.tpl.md
version: 1.0
type: pact maintenance template
for: agent soul files

## WHAT

An agent soul file describes the preferred voice, posture, temperament, and
collaboration style for one named agent identity.

Soul files are identity-level agent profiles.

They may link to reusable skills used by that identity.

Souls read future project ideas from `IDEAS.md` as context.

Soul files are not workflow authority.

Souls may use available skills ad hoc even when those skills are not listed in
the soul file.

## FOR

Target path:

```txt
/ai/pact/agents/souls/[AI]-[Slug].md
```

Use this template when creating or changing a named agent's soul file.

## RULES

A soul file must:

- identify the AI;
- identify the nickname;
- identify the `Soul Slug` from `/ai/pact/agents/NICKNAMES.md`;
- describe collaboration style;
- describe communication preferences;
- list skills used, with links, when the identity uses skills;
- distinguish ad hoc skill use from persistent identity-level skill
  expectations;
- reference `/ai/pact/context/IDEAS.md` as future project context;
- state that `AGENTS.md` and `WORKFLOW.md` remain authoritative for workflow;
- keep related invariant PACT files linked with relative Markdown links when
  the target path is stable.

Soul filenames must use:

```txt
[AI]-[Slug].md
```

Files under `/ai/pact/agents/souls/` are the naming exception to the uppercase
ready Markdown file rule. Do not rename soul files to all-uppercase style.

`Slug` must match `Soul Slug` in `/ai/pact/agents/NICKNAMES.md`.

If a soul uses skills, it must link to each skill file under:

```txt
/ai/pact/agents/skills
```

Ad hoc skill use does not require a soul file update.

Persistent identity-level skill expectations require a soul file update.

A soul file must not:

- define project truth;
- override PACT workflow;
- define a skill inline instead of linking the skill file;
- store hidden instructions that contradict owner instructions;
- contain private credentials.

## EXAMPLE

```md
# ExampleAI-Pryklad.md

## META

name: ExampleAI-Pryklad.md
ai: ExampleAI
nickname: Приклад
soul_slug: Pryklad
canonical_location: /ai/pact/agents/souls/ExampleAI-Pryklad.md
layer: PACT / agent soul
status: draft

## STYLE

Calm, direct, and careful with boundaries.

## SKILLS

- [../skills/StructureReview.md](../skills/StructureReview.md)

Ad hoc skills may be used without listing them here.

## FUTURE CONTEXT

Read [../../context/IDEAS.md](../../context/IDEAS.md) for future project ideas
that may affect identity-level judgment.

## RULES

Follow [../AGENTS.md](../AGENTS.md) and
[../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md).
This file guides identity and style only.
```
