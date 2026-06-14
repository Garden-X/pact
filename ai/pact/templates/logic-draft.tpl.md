# logic-draft.tpl.md

## META

name: logic-draft.tpl.md
version: 1.0
type: pact maintenance template
for: LOGIC-DRAFT.md

## WHAT

`LOGIC-DRAFT.md` records selected maintenance logic before it is split into
tasks.

It is the bridge between early reasoning and executable PACT tasks.

## FOR

Target path:

```txt
/ai/pact/context/state/LOGIC-DRAFT.md
```

Use this template when creating or resetting the PACT draft state file.

## RULES

`LOGIC-DRAFT.md` must:

- use one valid draft status;
- describe selected maintenance logic;
- cite source or owner instruction when known;
- link supporting ideas when an idea influenced the draft;
- link supporting shape files when a shape was used;
- record decisions and constraints;
- link related invariant PACT files with relative Markdown links;
- stay outside `/ai/docs`.

Valid `LOGIC-DRAFT.md` statuses:

```txt
none-selected
selected
superseded
```

Status meanings:

- `none-selected` means no maintenance logic has been selected.
- `selected` means selected maintenance logic may be split into tasks.
- `superseded` means the draft was replaced by a newer selected draft.

`LOGIC-DRAFT.md` must not:

- contain accepted project truth;
- replace SPARC docs;
- contain task lists;
- contain active execution state.

Tasks must derive from `LOGIC-DRAFT.md`, not directly from a shape.

Tasks must not derive directly from `IDEAS.md`.

## EXAMPLE

```md
# LOGIC-DRAFT.md

status: selected

## Selected Logic

Add a validation hook for PACT completion.

## Source / Evidence

Owner request.

Supporting idea:

- [../IDEAS.md](../IDEAS.md)

Supporting shape:

- `/ai/pact/context/shapes/2026-06-15-Example.shape.md`

## Decisions

The hook belongs in `/ai/pact/agents/hooks`.

## Constraints

Follow [../../agents/AGENTS.md](../../agents/AGENTS.md) and
[../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md).

Do not modify `/ai/docs`.
```
