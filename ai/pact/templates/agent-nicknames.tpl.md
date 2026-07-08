# agent-nicknames.tpl.md

## META

name: agent-nicknames.tpl.md
type: pact maintenance template
for: NICKNAMES.md
updated: 2026-07-08 09:24:00 UTC+00:00
version: 1.1

## WHAT

`NICKNAMES.md` records owner-preferred conversational names for agent systems
and the stable slugs used for soul-file names.

Nicknames are preferences, not project truth.

## FOR

Target path:

```txt
/ai/pact/agents/NICKNAMES.md
```

Use this template when creating or changing agent nicknames.

## RULES

`NICKNAMES.md` must:

- list the AI or agent/system name;
- list the nickname or nicknames;
- list the stable ASCII `Soul Slug`;
- list the resulting soul filename;
- say that nicknames are PACT preference material;
- keep related invariant PACT files linked with relative Markdown links.

`NICKNAMES.md` must not:

- define agent workflow;
- override `AGENTS.md`;
- create project truth;
- contain credentials or private contact data.

`Soul Slug` must be a Latin ASCII transliteration of the primary nickname when
the nickname is not already Latin ASCII.

When multiple nicknames exist, use the first nickname as the default source for
`Soul Slug` unless the owner selects another one.

Soul filenames must use:

```txt
[AI]-[Slug].md
```

Files under `/ai/pact/agents/souls/` are the naming exception to the uppercase
ready Markdown file rule.

## EXAMPLE

```md
# NICKNAMES.md

## META

name: NICKNAMES.md
canonical_location: /ai/pact/agents/NICKNAMES.md
layer: PACT / agent preferences
status: owner preference source
generated_from: /ai/pact/templates/agent-nicknames.tpl.md
generated_from_version: 1.1
content_status: current-data
purpose: Record conversational nicknames and stable soul-file slugs for agent systems without creating project truth.
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

## CURRENT

| AI | Nicknames | Soul Slug | Soul File |
|---|---|---|---|
| ExampleAI | Приклад | Pryklad | ExampleAI-Pryklad.md |

## RULES

Use these names conversationally. Use `Soul Slug` for soul filenames.
They are not SPARC project truth.

Related:

- [AGENTS.md](AGENTS.md)
```
