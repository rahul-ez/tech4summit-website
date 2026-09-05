<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Tech4Bharat 2026 — Agent Instructions

## Context Authority

The `context/` directory is the authoritative source of project requirements and implementation guidance.

Use each file according to its responsibility:

* `project-overview.md` — product scope, goals, and confirmed requirements
* `tbd.md` — unresolved decisions; never invent answers
* `architecture.md` — technical architecture, structure, and boundaries
* `ui-tokens.md` — visual design tokens and styling foundations
* `ui-rules.md` — UI composition, layout, and interaction rules
* `ui-registry.md` — reusable component catalogue
* `code-standards.md` — implementation and coding standards
* `library-docs.md` — approved libraries and usage guidance
* `build-plan.md` — implementation phases and sequencing
* `progress-tracker.md` — current implementation status and progress

## Source Precedence

When documents overlap, use this order:

1. `project-overview.md`
2. `tbd.md`
3. `architecture.md`
4. `ui-tokens.md`
5. `ui-rules.md`
6. `ui-registry.md`
7. `code-standards.md`
8. `library-docs.md`
9. `build-plan.md`
10. `progress-tracker.md`

Do not invent requirements, design decisions, content, or technical behavior that is marked unresolved in `tbd.md`.

## Archive

`context/archive/` contains historical planning documents only.

Archived files must not be treated as authoritative and must not override the current files in `context/`.

## Implementation Rules

* Follow the architecture and coding standards defined in `context/`.
* Reuse existing components, tokens, utilities, and abstractions before creating new ones.
* Keep implementation aligned with the current build phase in `build-plan.md`.
* Update `progress-tracker.md` when completing meaningful implementation work.
* Do not introduce dependencies or architectural patterns without justification.
* Do not hardcode values that are explicitly marked configurable or unresolved.
* Preserve the established Tech4Bharat visual language and design tokens.
* If a requirement is ambiguous or conflicts with the context files, stop and surface the conflict rather than guessing.

## Before Making Changes

Read the relevant files in `context/` before implementing a feature. At minimum, understand:

* `project-overview.md`
* `tbd.md`
* `architecture.md`
* the relevant UI/design files
* `build-plan.md`
* `progress-tracker.md`

The repository code and the current `context/` files together define the implementation state. The archived documents do not.
