# ideas.tpl.md

## META

name: ideas.tpl.md
type: pact maintenance template
for: IDEAS.md
updated: 2026-06-17 03:55:16 UTC+00:00
version: 1.0

## WHAT

`IDEAS.md` records future project ideas that should inform agents and souls.

Ideas explain planned features, planned functionality, future capabilities,
and architectural reasons that may matter later.

Ideas are not shapes.

Ideas are not selected implementation logic.

Ideas are not tasks.

## FOR

Target path:

```txt
/ai/pact/context/IDEAS.md
```

Use this template when creating or changing the future-ideas context file.

## RULES

`IDEAS.md` must:

- remain a concise context file, not a copy of this template;
- record future-facing project ideas;
- keep ideas separate from active work;
- explain why an idea may affect current decisions when known;
- contain project context entries rather than PACT lifecycle instructions.

`IDEAS.md` may inform:

- agent judgment;
- soul behavior;
- shapes;
- selected maintenance logic;
- workflow decisions.

`IDEAS.md` must not:

- copy this template's rules into the target file;
- become a rulebook, workflow file, or agent instruction file;
- create tasks directly;
- replace shape files;
- replace `LOGIC-DRAFT.md`;
- become accepted project truth;
- create `/ai/docs` content without SPARC-governed promotion;
- override current owner instruction.

When an idea becomes relevant to active work, cite it in the supporting shape
or in `LOGIC-DRAFT.md`.

When an idea becomes selected implementation logic, promote it through
`LOGIC-DRAFT.md`, then derive tasks from the draft.

## EXAMPLE

```md
# IDEAS.md

## META

name: IDEAS.md
canonical_location: /ai/pact/context/IDEAS.md
layer: PACT / context / future ideas
status: empty
purpose: Record future project ideas for agents and souls without turning them into shapes, selected logic, tasks, or active state.
updated: YYYY-MM-DD HH:mm:ss UTC+00:00


## Future Ideas

### Modular Hook Runtime

- Idea: Hooks may later be backed by executable scripts.
- Because: Future automation may need stable hook-to-script boundaries.
- Affects now: keep hook script references explicit.
```
