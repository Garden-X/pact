# cache-run.tpl.md

## META

name: cache-run.tpl.md
type: pact maintenance template
for: CACHE.md
updated: 2026-06-17 03:55:16 UTC+00:00
version: 1.0

## WHAT

`CACHE.md` is the manifest, index, and pointer file for one PACT cache run.

It describes the session-scoped cache folder created from current task state,
input data, user prompts or owner instructions, internet lookup, and relevant
file or project references.

It points to cache-run artifacts such as `raw-data/`, `chunks/`, `retrieval/`,
`rag/`, `validation/`, `artifacts/`, `promote/`, and `tmp/`.

It also points to durable examples or datasets under `/ai/raw` when those
materials are needed to solve the task, and to file examples, datasets, or
project folders outside `/ai/raw` when they are part of the task context.

`CACHE.md` is not the whole cache and must not inline every cached artifact.

## FOR

Target path:

```txt
/ai/pact/cache/runs/YYYY-MM-DDTHH-MM-SSZ--slug/CACHE.md
```

Use this template when creating the manifest for a cache run.

Retained cache runs keep the same `CACHE.md` when moved to:

```txt
/ai/pact/cache/retained/YYYY-MM-DDTHH-MM-SSZ--slug/CACHE.md
```

## RULES

`CACHE.md` must:

- identify the cache-run id, creation time, owner, task reference, status,
  refresh interval, and cleanup policy;
- state the current task purpose;
- identify the input basis used to build the cache, including user prompts or
  owner instructions and source input data;
- record internet/web search queries and source pointers when web lookup
  informs the cache;
- point to `/ai/raw/...` examples or datasets when they are needed for the
  task;
- point to local file, dataset, or project examples outside `/ai/raw` when
  they inform the task;
- distinguish `/ai/raw` references and external file references from
  cache-local `raw-data/`;
- list cache-run folders that exist or may be created;
- list allowed cache contents;
- list forbidden cache contents;
- list promotion targets;
- record comparison and carry-forward notes when a new session is created from
  a previous cache run;
- record cleanup or retention decision.

`CACHE.md` must not:

- store accepted project truth;
- store secrets or credentials;
- replace `/ai/raw` with cache-local `raw-data/`;
- replace external source files, datasets, or project folders with
  cache-local `raw-data/`;
- replace `/ai/docs` project truth;
- replace PACT target files;
- inline full raw datasets when a pointer is enough;
- copy previous cache contents wholesale during session refresh.

## EXAMPLE

```md
# CACHE

## META

id: YYYY-MM-DDTHH-MM-SSZ--slug
created_at: YYYY-MM-DDTHH:MM:SSZ
owner: agent
task_ref: PACT-YYYYMMDD-NNN or owner-request
status: active
session_refresh_interval: 4h
cleanup: keep-until-next-session-review

## PURPOSE

Temporary working memory for one session of one task run.

## INPUT BASIS

- user_prompts:
  - short pointer or summary of the user prompt that created or redirected
    this cache run
- owner_instructions:
  - short pointer or summary, if separate from user prompts
- web_search:
  - query: search terms or lookup goal
  - sources: URLs, titles, or search result ids used for the run
- file_references:
  - `/absolute/or/project-relative/path/to/example-file`
  - `/absolute/or/project-relative/path/to/example-project-or-dataset`
- task_state:
  - `/ai/pact/context/state/STATE.md`
  - `/ai/pact/context/state/TASKS.md`
- input_data:
  - cache-local working copies or extracts in `raw-data/`

## /AI RAW REFERENCES

List durable examples or datasets under `/ai/raw` if needed:

- `/ai/raw/path/to/example-or-dataset`

`/ai/raw` may hold large raw inputs such as cloned Git projects, whole
projects selected for transformation, datasets for processing, or other source
material that must be available beyond one cache session.

## OTHER FILE REFERENCES

List task-relevant example files, datasets, project folders, or repository
paths outside `/ai/raw` if needed:

- `/absolute/or/project-relative/path/to/example-file`
- `/absolute/or/project-relative/path/to/example-project-or-dataset`

Use this section for pointers only. Put temporary extracts, transformed copies,
or run-specific working data in `raw-data/`.

## CACHE FOLDERS

- `raw-data/` for temporary working copies, extracts, or pointers;
- `chunks/` for split input pieces;
- `summaries/` for intermediate summaries and carry-forward notes;
- `retrieval/` for search hits, lookup notes, and source maps;
- `rag/` for RAG indexes, embedding maps, and chunk metadata;
- `rlm/` for recursive decomposition traces;
- `validation/` for temporary checks and test output;
- `artifacts/` for generated files not yet promoted;
- `promote/` for promotion candidates;
- `tmp/` for disposable scratch.

## MAY CONTAIN

- temporary summaries;
- raw-data pointers and temporary working copies;
- chunks;
- retrieval notes;
- RAG indexes or maps;
- validation artifacts;
- decomposition traces.

## MUST NOT CONTAIN

- accepted project truth;
- secrets or credentials;
- permanent decisions;
- durable raw evidence that belongs in `/ai/raw`;
- project documentation that belongs in `/ai/docs`;
- PACT rules that belong in generated PACT target files.

## PROMOTION TARGETS

- `/ai/pact/...` for PACT maintenance rules or state;
- `/ai/docs/...` through SPARC when accepted project truth changes;
- `/ai/raw/...` for durable source material and evidence;
- `/ai/pact/context/state/...` for task summaries and validation status.

## PREVIOUS CACHE COMPARISON

- previous_cache: none
- carry_forward_summary: none
- deleted_previous_cache: pending

## CLEANUP DECISION

pending
```
