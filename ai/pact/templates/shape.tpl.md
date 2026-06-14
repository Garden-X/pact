# shape.tpl.md

## META

name: shape.tpl.md
version: 1.0
type: pact maintenance template
for: shape files

## WHAT

A shape file records pre-draft reasoning for a possible PACT maintenance change.

Shapes are for exploration before selected logic exists.

Shapes may contain questions, alternatives, constraints, rejected options,
implications, and a recommended direction.

Shapes may be informed by `IDEAS.md`.

Shapes are not executable tasks.

Shapes are not selected implementation logic.

Shapes do not replace `LOGIC-DRAFT.md`.

## FOR

Target path:

```txt
/ai/pact/context/shapes/YYYY-MM-DD-[Shape-Slug].shape.md
```

Use this template when exploring a possible PACT maintenance change before it is
promoted into `LOGIC-DRAFT.md`.

## RULES

A shape file must:

- use the dated shape filename pattern;
- describe the question or change being shaped;
- record relevant context and constraints;
- cite related ideas when an idea influenced the shape;
- list alternatives when alternatives exist;
- separate accepted direction from rejected options;
- identify whether the shape is ready for promotion into `LOGIC-DRAFT.md`;
- link related invariant PACT files with relative Markdown links when stable.

Shape filenames must use:

```txt
YYYY-MM-DD-[Shape-Slug].shape.md
```

Shape files are optional PACT artifacts.

`Shape-Slug` uses readable CapitalCase words separated by hyphens.

Shape files are a naming exception to the ordinary CapitalCase extension rule
because they keep a date prefix and `.shape.md` suffix.

A shape file must not:

- contain active execution state;
- replace `LOGIC-DRAFT.md`;
- create tasks directly;
- define project truth;
- write accepted project documentation into `/ai/docs`;
- store secrets.

Tasks must derive from `LOGIC-DRAFT.md`, not directly from a shape.

Tasks must not derive directly from `IDEAS.md`.

## EXAMPLE

```md
# 2026-06-15-State-Status-Model.shape.md

## META

name: State-Status-Model
canonical_location: /ai/pact/context/shapes/2026-06-15-State-Status-Model.shape.md
layer: PACT / shape
status: draft

## QUESTION

Which top-level statuses should `STATE.md` support?

## CONTEXT

`STATE.md` is the active execution cursor.

Related idea:

- [../IDEAS.md](../IDEAS.md)

## OPTIONS

- Keep only `clear` and `active`.
- Add explicit blocked and handoff modes.

## DECISION

Use `clear`, `active`, `blocked`, and `handoff`.

## PROMOTION

Ready to promote into [../state/LOGIC-DRAFT.md](../state/LOGIC-DRAFT.md).
```
