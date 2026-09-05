<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# AGENTS.md

## Project

Tech4Bharat 2026 website.

All developers and AI agents use the same `context/` files. Treat them as the shared source of truth.

## Before Working

1. Read `context/progress-tracker.md`.
2. Check your task's phase in `context/build-plan.md`.
3. Check `context/tbd.md` for anything affecting your task.
4. Read the relevant context files.
5. Inspect existing code before making changes.

## Context Rules

Each file has a specific responsibility:

* `architecture.md` → architecture and boundaries
* `ui-tokens.md` → visual tokens
* `ui-rules.md` → UI composition
* `ui-registry.md` → reusable components
* `code-standards.md` → coding standards
* `library-docs.md` → libraries and dependencies
* `tbd.md` → unresolved requirements
* `build-plan.md` → implementation order
* `progress-tracker.md` → actual project status
* `decisions.md` → meaningful implementation decisions

Do not override or duplicate decisions already defined by these files.

## TBDs

* Confirmed → implement.
* Not relevant to your task → continue.
* Blocks your task → do not guess; defer it or use a pending/configurable approach.
* Never invent requirements or event information.
* When a TBD is resolved, update `tbd.md` and affected context files.

## Implementation Freedom

The context files define **requirements and boundaries, not every implementation detail**.

Within those boundaries, developers and AI agents may choose reasonable approaches, including:

* component implementation;
* libraries and dependencies;
* animations;
* Tailwind configuration;
* internal abstractions;
* responsive implementation.

Use engineering judgment when multiple approaches are valid.

A choice must not contradict the architecture, design system, security requirements, or TBDs.

Document meaningful implementation decisions in `decisions.md`.

For new dependencies, follow `library-docs.md`.

## Architecture & UI

Follow the relevant architecture and UI context files.

* Reuse existing components where appropriate.
* Keep server/client and data-access boundaries intact.
* Do not create conditional participant/admin functionality before it is confirmed.
* Do not invent content.
* Keep UI consistent with the established design system.

## Code Quality

Follow `code-standards.md`.

Keep code typed, focused, accessible, maintainable, and consistent with the existing project structure.

## Progress

Update `progress-tracker.md` when meaningful work is completed.

Only mark work complete after it has been implemented and verified.

## Core Rule

**Build what is confirmed. Defer what is blocked. Never guess. Use engineering judgment where the context leaves room for choice.**
