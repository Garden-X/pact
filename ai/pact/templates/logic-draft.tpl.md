# logic-draft.tpl.md

## META

name: logic-draft.tpl.md
type: pact maintenance template
for: LOGIC-DRAFT.md
updated: 2026-07-08 09:24:00 UTC+00:00
version: 1.3

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

When status is `none-selected`, `LOGIC-DRAFT.md` may use a compact `## CURRENT`
stub with empty values such as `selected_logic: none`. When status is
`selected`, use full content sections such as `## Selected Logic`,
`## Source / Evidence`, `## Decisions`, and `## Constraints`.

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

## META

name: LOGIC-DRAFT.md
canonical_location: /ai/pact/context/state/LOGIC-DRAFT.md
layer: PACT / context / state
status: selected
generated_from: /ai/pact/templates/logic-draft.tpl.md
generated_from_version: 1.3
content_status: current-state
updated: YYYY-MM-DD HH:mm:ss UTC+00:00


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
