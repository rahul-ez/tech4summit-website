# Library Documentation

## 1. Purpose

This file is a concise, project-specific reference for how the libraries and framework features already established in `architecture.md` and `code-standards.md` should be used on Tech4Bharat 2026. It is not a substitute for official documentation — **official documentation remains the authority for version-specific API details, method signatures, and behavior.** This file exists only to record the project-specific decisions, boundaries, and common mistakes that official docs can't know about. When this file and an official doc appear to conflict on a version-specific detail, the official doc wins; when they appear to conflict on a project boundary (e.g. where a client is allowed to run), this file and `architecture.md` win.

---

## 2. Library Status

| Library / Technology | Role | Status | Primary Location |
|---|---|---|---|
| Next.js (App Router) | Framework, routing, rendering | Required | `app/` |
| React | UI library | Required | `components/`, `app/` |
| TypeScript | Language, type safety | Required | Project-wide |
| Tailwind CSS | Styling | Required | Project-wide via `globals.css` tokens |
| shadcn/ui | UI primitive source | Required | `components/ui` |
| Supabase (platform) | Backend-as-a-service | Required | `lib/supabase`, `lib/db` |
| PostgreSQL (via Supabase) | Database | Required | Supabase project |
| Supabase Auth | Authentication | Required (method TBD) | `lib/auth` |
| Zod | Validation | Required | `lib/validation` |
| Supabase Storage | File storage | Conditional | `lib/db` (if enabled) |
| Resend | Transactional email | Conditional | `actions/*` (if enabled) |
| PostHog | Analytics | Conditional | Client + `actions/*` (if enabled) |
| Vercel | Hosting/deployment | Required | Deployment config |
| GitHub | Version control | Required | Repository |
| Testing framework | Automated testing | Not Yet Selected | N/A |

Zod is listed as Required, not Conditional — `architecture.md` explicitly names it as the validation approach for `lib/validation`, so this is a confirmed choice, not a pending one. The authentication *method* (email/password vs. OTP) is unresolved per `tbd.md`, but Supabase Auth as the *provider* is confirmed.

---

## 3. Next.js

- App Router only — no Pages Router files or conventions anywhere in this project.
- Server Components are the default; `"use client"` is added only where `code-standards.md` Section 5 calls for it.
- Route organization follows `architecture.md`'s folder tree exactly, including the `(participant)`/`(admin)` conditional route groups — this file does not restate that structure.
- Shared chrome lives in `layout.tsx` files.
- `loading.tsx`/`error.tsx`/`not-found.tsx` are added only at route segments that do meaningful server-side work or can meaningfully fail, per `code-standards.md`.
- Server Actions (`actions/*`) are the only path for mutations, per `architecture.md`'s Data Flow diagrams.
- `middleware.ts` is the single place route-level auth/role gating happens for `(participant)`/`(admin)`.
- Metadata is defined per route via the App Router metadata API.
- Environment variables: only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are exposed to the client (`NEXT_PUBLIC_` prefix); everything else is server-only.
- The exact Next.js version and any version-specific App Router API changes are not pinned in this context chain — consult the official documentation for current behavior before relying on a specific API's exact signature.

---

## 4. React

- Component responsibilities follow the Primitive → Composed Component → Page Pattern → Page layering defined in `ui-registry.md` and `code-standards.md` Section 6 — not restated here.
- The Server/Client Component boundary is drawn at the smallest interactive subtree, per `code-standards.md` Section 5.
- State management expectations: local `useState` for UI-only state; server-originated data is read via Server Components/Server Actions, not duplicated into client state unless it genuinely needs client-side mutation (e.g. inline form feedback).
- Composition patterns follow `ui-registry.md`'s Composition Rules — components compose the layer below them, never skip a layer.
- Avoid unnecessary client-side state: if a value can be derived or read server-side, it is — no client-side re-fetching of data already available at render time.
- Reusable component expectations (what gets registered, naming, etc.) are owned entirely by `ui-registry.md` — this file does not duplicate them.

---

## 5. TypeScript

- Strict mode is enabled project-wide; do not weaken it locally (`code-standards.md` Section 3).
- Shared domain types live in `types/`; component-local types stay colocated with the component until reused elsewhere.
- Database-generated types: once the schema in `architecture.md` is actually implemented in Supabase, generate TypeScript types from it via the Supabase CLI's type-generation command rather than hand-writing table types — consult the official Supabase CLI documentation for the exact command and output configuration for the installed version.
- Avoid `any`; use `unknown` for untrusted external data and narrow it through a `lib/validation` Zod schema before use.
- Component props are explicitly typed via `interface`, per `code-standards.md`.
- At server/action boundaries, the canonical type for validated input is the type inferred from its Zod schema (`z.infer<typeof schema>`) — not a hand-duplicated interface that can drift from the schema.
- Nullable/conditional data (e.g. `hackathon_config.value`, the dual-nullable ownership columns on `submissions`) is typed with explicit `| null`, matching the database's actual nullability rather than assuming a value is always present.

---

## 6. Tailwind CSS

- All styling consumes the CSS-variable-backed tokens defined in `ui-tokens.md` and mapped in `tailwind.config.ts` (e.g. `bg-surface`, `text-text-primary`, `border-border`) — this file does not restate those values.
- Responsive utilities must align with the breakpoints defined in `ui-tokens.md` (mobile <640px, tablet 640–1024px, desktop 1024–1440px, large desktop >1440px). Tailwind's default `sm`/`md`/`lg`/`xl` breakpoint values do not exactly match these — the `screens` key in `tailwind.config.ts` should be configured to reflect `ui-tokens.md`'s actual breakpoints rather than assuming Tailwind's defaults are correct out of the box.
- Spacing, typography, and radius scales come from the `space-*`/font/`radius-*` tokens already mapped into the Tailwind theme — never an arbitrary bracket value (`p-[13px]`, `text-[17px]`) where a scale value already covers the need.
- Colors are used only via the token-mapped utility classes — never a raw hex/rgb/hsl or an unmapped default Tailwind color (`bg-orange-500`).
- Dark mode: the project is dark-mode-only per `ui-tokens.md` (a decision `tbd.md` records as still awaiting stakeholder approval). Do not implement Tailwind's `dark:` variant system or build any light-mode styling — there is currently only one mode. If a light mode is ever approved, that starts as a `ui-tokens.md`/`tbd.md` update, not a Tailwind-level addition made independently.
- Interaction/focus states use the `focus-visible:` variant paired with the `border-focus`/`focus-ring` tokens, per `ui-rules.md` — never a custom one-off focus style.
- This file does not create a second design system — `ui-tokens.md` and `ui-rules.md` remain authoritative for every visual decision.

---

## 7. shadcn/ui

- shadcn/ui components are added via its CLI, which copies component source directly into `components/ui` (it is not a traditional npm runtime dependency) — only add a component when `ui-registry.md` lists a corresponding Planned primitive that needs implementing.
- Do not install the full shadcn/ui set speculatively — add components one at a time, matched to an actual registered need.
- Customization happens by editing the copied component source directly: replace its default Tailwind color/spacing classes with the project's token-mapped classes (per Section 6) as part of adding it — a freshly added shadcn component is never left with its out-of-the-box default palette.
- Accessibility behavior inherited from the underlying Radix primitives is a starting point, not a substitute for verifying the component against `ui-rules.md`'s accessibility requirements.
- Avoid creating a one-off custom component for something shadcn/ui already provides in a form that can be token-customized to fit.
- Whenever a shadcn/ui-based primitive is implemented, move its status in `ui-registry.md` from Planned to Active as part of the same change — do not let the registry drift out of sync with what's actually in `components/ui`.

---

## 8. Supabase

- Client/server usage follows `architecture.md`'s Client Pattern exactly: `lib/supabase/client.ts` (browser, anon key) for client components that genuinely need it, `lib/supabase/server.ts` (server, cookie-based session) for everything else — never mixed.
- Database access happens only through `lib/db/*` functions, never directly from a component or page.
- Authentication is Supabase Auth; the specific sign-in method remains unresolved per `tbd.md` — see Section 10.
- Storage is Conditional — see Section 11.
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are safe for client exposure per Supabase's own security model (the anon key is designed to be public and relies on Row Level Security); a service-role key, if the project ever needs one for a privileged server-only job, is never `NEXT_PUBLIC_`-prefixed and never imported into a client-importable file.
- Row Level Security is treated as defense-in-depth alongside application-layer authorization, per `code-standards.md` — but the actual RLS policies for this project's tables have not yet been written or confirmed anywhere in this context chain. Do not invent specific policy SQL here; policies are defined when the corresponding table is actually implemented, informed by `architecture.md`'s schema and this project's authorization model.
- `lib/supabase` provides the client factories; `lib/db` provides the typed query/mutation functions built on top of those clients — this separation, defined in `architecture.md`, is not to be collapsed for convenience.

---

## 9. PostgreSQL

- Schema ownership belongs entirely to `architecture.md`'s Database Schema section — this file does not redefine tables, columns, or relationships.
- Migrations: `architecture.md` does not yet specify a migration workflow. The natural fit given the Supabase-based stack is Supabase CLI migrations, but this has not been explicitly decided — consult the official Supabase CLI documentation when schema implementation actually begins, and record the chosen workflow in `architecture.md` once decided rather than assuming it here.
- Relationships and constraints (foreign keys, uniqueness) are as defined in `architecture.md` — enforce them at the database level as the source of truth for data integrity, with application-layer (Zod) validation providing user-facing feedback, not replacing the database constraint.
- Nullable/conditional fields follow the patterns already established in `architecture.md`: `hackathon_config.value` is `null` to represent "not yet confirmed," and `submissions`' dual-nullable ownership columns represent a genuinely undecided ownership model — don't add a `NOT NULL` constraint to either without the underlying product/architecture decision changing first.
- Indexes are not yet specified anywhere in this context chain. Add one only when an actual, observed query pattern justifies it — not speculatively.
- Avoid duplicating database-level rules (uniqueness, required fields) redundantly in multiple application-layer places — define them once in the Zod schema that matches the database constraint.

---

## 10. Supabase Auth

- The authentication boundary is `lib/auth/session.ts`, per `architecture.md` — session identity is always resolved there, never re-implemented per-feature.
- Session handling uses cookie-based sessions via `@supabase/ssr`'s server client, per `architecture.md`'s Client Pattern code samples.
- Protected routes: `middleware.ts` gates the `(participant)`/`(admin)` route groups by session presence and role.
- Authentication (identity) and authorization (permission) are distinct — see `code-standards.md` Section 10 and `architecture.md`'s Authentication section; this file does not restate that distinction's implementation detail.
- Participant vs. admin access is determined by the `role` field on `profiles`, checked server-side on every protected route and mutation.
- **The authentication method itself (email/password, OTP, or both) is explicitly Not Confirmed per `tbd.md`.** Do not implement a specific sign-in flow, do not add method-specific UI beyond the generic Input/Button primitives already in `ui-registry.md`, and do not assume Supabase Auth's default configuration without checking `tbd.md` first. When the method is confirmed, consult the official Supabase Auth documentation for the exact setup for that method, since configuration details are version- and method-specific.

---

## 11. Supabase Storage — Conditional

Only relevant if the Submission feature is confirmed per `tbd.md`'s "Submission" decision. Not implemented, and no bucket exists yet.

- **Intended purpose (once confirmed):** storing project submission files, per `architecture.md`'s Storage section.
- **Ownership/security:** access scoped to the owning team or participant's own path, with admin read-all — as sketched conceptually in `architecture.md`, not yet implemented as actual storage policies.
- **Server-side authorization:** uploads and downloads are processed through Server Actions (`actions/submission.ts`), not direct browser-to-bucket writes for privileged content, per `architecture.md`'s Key Integration Patterns.
- **Relationship to submissions:** the `submissions.storage_path` column references the stored object once that table exists.
- Do not create a Storage bucket, write storage-access code, or invent a path convention beyond what `architecture.md` already sketches until the Submission decision in `tbd.md` is actually confirmed.

---

## 12. Email / Resend — Conditional

Only relevant if transactional email is confirmed per `tbd.md`'s "Email / Notifications" decision, which currently only carries a recommendation, not a confirmation.

- **Intended role (if enabled):** transactional email (e.g. registration confirmation), triggered from within `actions/*` after a successful mutation, per `architecture.md`.
- **Failure handling (if enabled):** an email failure does not roll back an already-successful mutation — it is logged and surfaced as a non-blocking warning, per `architecture.md`.
- Do not add the Resend dependency, write a template, choose a sending domain, or wire up a trigger point beyond what's described above until `tbd.md`'s Email/Notifications decision is actually confirmed.

---

## 13. Analytics / PostHog — Conditional

Only relevant if analytics is confirmed as needed; `tbd.md` currently recommends skipping it until a concrete need is identified.

- **Intended role (if enabled):** UI interaction events originate client-side; business events (e.g. registration completed) originate from Server Actions, per `architecture.md`.
- **Privacy constraint (if enabled):** participant PII (name, email, phone) is never sent as an event property — only internal IDs.
- Do not add or initialize the PostHog dependency anywhere in the codebase until this decision is confirmed — it is not a required launch dependency.

---

## 14. Library Selection Rules

- Prefer an existing dependency over adding a new one for an overlapping capability.
- Do not install a package without a concrete, stated requirement — "might be useful later" is not sufficient (per `architecture.md`'s and `code-standards.md`'s shared principle).
- Prefer framework-native functionality (Next.js metadata API, App Router conventions) over a third-party equivalent.
- Prefer an existing shadcn/ui component, customized with project tokens, before building an equivalent from scratch.
- Check official documentation for any version-specific behavior before relying on it — this file intentionally does not pin exact API signatures that can change between versions.
- Keep the dependency list minimal — every entry in `package.json` should map to a role in Section 2's table.
- Avoid two libraries covering the same responsibility (e.g. two form-state libraries, two date-formatting libraries).

---

## 15. Official Documentation Guidance

| Library | Official Documentation |
|---|---|
| Next.js | https://nextjs.org/docs |
| React | https://react.dev |
| TypeScript | https://www.typescriptlang.org/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| shadcn/ui | https://ui.shadcn.com/docs |
| Supabase (all products) | https://supabase.com/docs |
| Supabase Auth | https://supabase.com/docs/guides/auth |
| Supabase Storage | https://supabase.com/docs/guides/storage |
| PostgreSQL | https://www.postgresql.org/docs/ |
| Zod | https://zod.dev |
| Resend | https://resend.com/docs |
| PostHog | https://posthog.com/docs |
| Vercel | https://vercel.com/docs |

Where a specific page or version-locked detail isn't known with confidence, consult the official documentation for the installed version rather than relying on a guessed URL or a third-party tutorial.

---

## 16. Common Failure Modes

- Using browser-only APIs inside a Server Component.
- Converting a Server Component to a Client Component unnecessarily instead of narrowing the client boundary to the smallest subtree.
- Bypassing `lib/db`/`lib/supabase` and querying Supabase directly from a component or page.
- Querying the database directly from any UI component.
- Exposing a server-only environment variable (especially a future service-role key) to the client.
- Bypassing authorization by relying on UI visibility alone (see `code-standards.md` Section 10).
- Introducing an arbitrary Tailwind value where an existing token already covers the need.
- Duplicating a shadcn/ui component under a new name instead of customizing the existing one.
- Adding a dependency without a stated, concrete justification.
- Implementing a Conditional integration (Storage, Resend, PostHog) as though it were already confirmed, instead of checking `tbd.md` first.
- Inventing a HackCulture API or integration detail that hasn't been confirmed.
- Building custom functionality that duplicates what HackCulture may already provide, before its integration model is confirmed.
- Hand-writing a database type that can drift from the actual schema instead of generating it from Supabase once the schema exists.
- Assuming a specific Supabase Auth method's configuration before `tbd.md`'s Authentication decision is confirmed.

---

## 17. Maintenance Rules

Update this file when:

- A new major dependency is officially adopted into the project.
- An existing library is removed.
- A project-specific integration pattern changes (e.g. how Server Actions call Supabase, how email failures are handled).
- A Conditional integration (Storage, Resend, PostHog, or the auth method) becomes Confirmed in `tbd.md` — update `tbd.md` first, then this file's status/section.
- A major library usage convention changes (e.g. a new Next.js major version changes the recommended data-fetching pattern).

Do not update this file for minor API changes that are simply resolved by checking the official documentation for the installed version — this file tracks project-specific decisions and boundaries, not a changelog of every library's releases.
