# Architecture

Source of truth for product scope: `context/project-overview.md`. This file defines the technical architecture and must not introduce product requirements, hackathon rules, or event details that are not present there.

## Stack

| Layer | Tool | Purpose |
|---|---|---|
| Framework | Next.js (App Router) | Routing, server/client rendering, server actions |
| Language | TypeScript (strict mode) | Type safety across UI, server logic, and data layer |
| Styling | Tailwind CSS | Utility-first styling, implements design-system tokens |
| UI components | shadcn/ui | Base component primitives (buttons, forms, dialogs, etc.) |
| Backend/BaaS | Supabase | Database, auth, storage, in one managed platform |
| Database | PostgreSQL (via Supabase) | Persistent storage for all entities |
| Authentication | Supabase Auth | Identity, session management |
| File storage | Supabase Storage | CONDITIONAL — only if submission uploads are required |
| Email | Resend | CONDITIONAL — only if transactional email (confirmations, announcements) is required |
| Analytics | PostHog | CONDITIONAL — only if analytics is enabled |
| Hosting | Vercel | Deployment, preview environments |
| Version control | GitHub | Source control, CI |

---

## Folder Structure

```
tech4bharat-web/
├── app/
│   ├── layout.tsx                    → root layout: global providers, fonts, theme
│   ├── page.tsx                      → "/" landing page
│   ├── about/
│   │   └── page.tsx                  → "/about"
│   ├── challenges/
│   │   └── page.tsx                  → "/challenges" — page structure always exists; content pending confirmation
│   ├── timeline/
│   │   └── page.tsx                  → "/timeline"
│   ├── prizes/
│   │   └── page.tsx                  → "/prizes"
│   ├── rules/
│   │   └── page.tsx                  → "/rules" — page structure always exists; content pending confirmation
│   ├── faq/
│   │   └── page.tsx                  → "/faq"
│   ├── register/
│   │   └── page.tsx                  → "/register" — CONDITIONAL workflow, structure only until confirmed
│   ├── (participant)/                → CONDITIONAL route group, added only when a participant portal is required
│   │   ├── dashboard/page.tsx        → "/dashboard"
│   │   ├── team/page.tsx             → "/team" — CONDITIONAL, depends on team rules being confirmed
│   │   └── submission/page.tsx       → "/submission" — CONDITIONAL, depends on submission format being confirmed
│   ├── (admin)/                      → CONDITIONAL route group, admin-only
│   │   └── admin/
│   │       └── page.tsx              → "/admin"
│   └── api/                          → route handlers, used only for things server actions cannot do (e.g. webhooks)
├── components/
│   ├── ui/                           → shadcn/ui primitives only — no data fetching, no business logic
│   ├── public/                       → components used by public info pages (hero, timeline, prize cards, etc.)
│   ├── participant/                  → CONDITIONAL — components for dashboard/team/submission
│   └── admin/                        → CONDITIONAL — components for admin views
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 → browser Supabase client factory
│   │   └── server.ts                 → server Supabase client factory
│   ├── auth/
│   │   └── session.ts                → server-side session/user retrieval, role checks
│   ├── db/                           → typed data-access functions, one file per entity, called only from actions/ or server components
│   │   ├── config.ts                 → reads hackathon configuration (dates, prizes, feature flags)
│   │   ├── registrations.ts          → CONDITIONAL
│   │   ├── teams.ts                  → CONDITIONAL
│   │   └── submissions.ts            → CONDITIONAL
│   ├── validation/                   → zod schemas for every server input
│   └── utils.ts                      → generic, non-domain helper functions
├── actions/                          → server actions; each calls lib/validation → lib/auth → lib/db
│   ├── register.ts                   → CONDITIONAL
│   ├── team.ts                       → CONDITIONAL
│   ├── submission.ts                 → CONDITIONAL
│   └── admin.ts                      → CONDITIONAL
├── types/
│   └── database.ts                   → generated/shared Supabase + domain types
├── config/
│   └── site.ts                       → confirmed static values + feature flags for conditional sections
├── middleware.ts                     → route protection for (participant) and (admin) groups
└── public/
    └── ...                           → static assets (brand marks, favicon, poster-derived imagery)
```

Do not create `dashboard/`, `team/`, `submission/`, or `admin/` directories until the corresponding feature is confirmed as required — the route-group structure above is designed so they can be added without moving or restructuring existing public routes.

---

## System Boundaries

| Area | Owns | Must NOT do |
|---|---|---|
| `app/` | Route definitions, page composition, server component data loading | Direct database writes; business/validation logic |
| `components/` | Presentation and layout | Data fetching, database access, auth checks |
| `components/ui/` | Base UI primitives (shadcn/ui) | Any domain logic, any Supabase import |
| `lib/` | Server-side application logic: db access, auth helpers, validation | Being imported into client components for privileged operations |
| `actions/` | Orchestration: validate → authenticate → authorize → mutate via `lib/db` | Skipping validation or auth checks; containing UI |
| Database layer (`lib/db/`) | All SQL/Supabase query and mutation functions | Being called directly from `app/` pages or `components/` |
| Authentication (`lib/auth/`) | Identity resolution, session retrieval | Authorization decisions (see below) |
| Validation (`lib/validation/`) | Input schema definitions (zod) | Database access |
| Configuration (`config/`) | Confirmed static values, feature flags | Storing unconfirmed data as if final |
| Admin functionality | Organizer-only views and mutations under `(admin)` | Sharing route group or layout with public/participant code |
| Participant functionality | Authenticated participant views under `(participant)` | Accessing other participants'/teams' data without an authorization check |

This structure exists to prevent circular dependencies and to guarantee that no UI component can reach the database directly.

---

## Data Flow

### Public Content Flow
```
Visitor
→ Next.js page (app/*)
→ server-side data/config (lib/db/config.ts, config/site.ts)
→ rendered UI
```

### Registration Flow — CONDITIONAL (pending confirmed registration workflow)
```
Participant
→ registration form (client component)
→ client validation (zod schema, immediate feedback only)
→ server action (actions/register.ts)
→ authentication check (lib/auth/session.ts)
→ server validation (lib/validation, authoritative)
→ database (lib/db/registrations.ts)
→ confirmation response
```

### Team Management Flow — CONDITIONAL (pending confirmed team rules)
```
Participant
→ team UI (components/participant)
→ server action (actions/team.ts)
→ authorization check (is this participant a member/lead of this team?)
→ database (lib/db/teams.ts)
→ updated team state
```

### Submission Flow — CONDITIONAL (pending confirmed submission format)
```
Participant
→ submission UI (components/participant)
→ validation (lib/validation)
→ server action (actions/submission.ts)
→ authorization check (is this participant part of the owning team/registration?)
→ storage/database (Supabase Storage + lib/db/submissions.ts)
→ confirmation
```

### Admin Flow — CONDITIONAL (pending confirmation that a custom admin system is required)
```
Admin
→ admin UI (components/admin)
→ authentication (lib/auth/session.ts)
→ authorization (role === 'admin', checked server-side)
→ server action (actions/admin.ts)
→ database
→ updated admin view
```

---

## Database Schema

Conceptual schema. Only `profiles`, `registrations`, `announcements`, and `hackathon_config` are needed for the current confirmed scope (public info + basic registration entry point). All other tables are CONDITIONAL and should only be created when the corresponding feature is confirmed as required.

### `profiles`
Mirrors `auth.users`, extended with app-specific fields.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, references `auth.users.id` |
| full_name | text | |
| email | text | Synced from auth |
| phone | text | Nullable |
| role | text | `'visitor' \| 'participant' \| 'admin'`, default `'participant'` on signup |
| created_at | timestamptz | Default `now()` |

### `colleges` — CONDITIONAL
Only if college affiliation is confirmed as a required field.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| name | text | Not null |
| city | text | Nullable |

### `teams` — CONDITIONAL
Only if team-based participation is confirmed.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| name | text | Not null |
| lead_id | uuid | FK → `profiles.id`, the team lead |
| registration_id | uuid | FK → `registrations.id` |
| created_at | timestamptz | Default `now()` |

Team size limits are NOT enforced as a hardcoded constraint — they must be read from `hackathon_config` once confirmed, and enforced in `actions/team.ts`.

### `team_members` — CONDITIONAL

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| team_id | uuid | FK → `teams.id`, not null |
| profile_id | uuid | FK → `profiles.id`, not null |
| joined_at | timestamptz | Default `now()` |
| Constraint | unique (`team_id`, `profile_id`) | Prevents duplicate membership |

### `challenges` — CONDITIONAL
Only once problem statements/tracks are confirmed. Do not seed placeholder rows implying finalized content.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| title | text | Not null |
| description | text | Not null |
| track | text | Nullable |
| published | boolean | Default `false` — gates visibility until organizer confirms |

### `registrations`
The core confirmed entity — a participant's or team's intent to participate.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| profile_id | uuid | FK → `profiles.id`, not null — the registering participant |
| team_id | uuid | FK → `teams.id`, nullable (only if team registration is confirmed) |
| status | text | `'pending' \| 'confirmed' \| 'cancelled'`, default `'pending'` |
| created_at | timestamptz | Default `now()` |

Exact required fields on this table depend on unconfirmed eligibility rules — add columns only as organizer requirements are confirmed, do not pre-build fields for unconfirmed criteria.

### `submissions` — CONDITIONAL
Only once submission format is confirmed.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| team_id | uuid | FK → `teams.id`, nullable depending on whether submissions are team- or participant-owned |
| profile_id | uuid | FK → `profiles.id`, nullable, mirrors ownership model above |
| status | text | `'draft' \| 'submitted' \| 'under_review' \| 'reviewed'` |
| storage_path | text | Nullable, references Supabase Storage object |
| submitted_at | timestamptz | Nullable |

Exactly one of `team_id` / `profile_id` should be non-null, enforced at the application layer, once ownership model is confirmed.

### `announcements`
Shared, not duplicated per participant.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| title | text | Not null |
| body | text | Not null |
| audience | text | `'all' \| 'participants' \| 'admins'`, default `'all'` |
| published_at | timestamptz | Nullable — null means draft/unpublished |

### `hackathon_config`
Single source of truth for confirmed and pending event details. Key-value structure so unconfirmed fields can exist as `null` without schema changes.

| Column | Type | Notes |
|---|---|---|
| key | text | PK, e.g. `'registration_open_date'`, `'registration_close_date'`, `'venue'`, `'team_size_max'` |
| value | jsonb | Nullable — null indicates "not yet confirmed" |
| updated_at | timestamptz | Default `now()` |

This table is how the application represents the distinction between confirmed and organizer-pending event information without hardcoding either.

---

## Storage

CONDITIONAL — only create if project submission uploads are confirmed as required. Do not create buckets for hypothetical features.

| Bucket | Path Pattern | Contents | Access Rules |
|---|---|---|---|
| `submissions` | `submissions/{team_id or profile_id}/{submission_id}/{filename}` | Project submission files (as confirmed by organizer — e.g. repo links, decks, demo videos) | Owning team/participant: read/write own path only. Admins: read all. No public access. |

---

## Authentication

- **Provider:** Supabase Auth
- **Methods:** Email/password and/or OTP, per Supabase Auth defaults — do not assume a specific method beyond what Supabase provides unless organizer specifies otherwise
- **Public routes:** `/`, `/about`, `/challenges`, `/timeline`, `/prizes`, `/rules`, `/faq`, `/register` (entry form itself is public; submission of the form requires no prior auth unless organizer requires account-first registration)
- **Protected participant routes:** everything under `(participant)/` — requires an authenticated session with `role = 'participant'` (or higher)
- **Protected admin routes:** everything under `(admin)/` — requires an authenticated session with `role = 'admin'`
- **Middleware location:** `middleware.ts`, checks session presence and role for `(participant)` and `(admin)` route groups before rendering
- **Post-login behavior:** redirect to `/dashboard` if participant routes exist, otherwise to `/`
- **Logout behavior:** clear Supabase session, redirect to `/`
- **Session handling:** Supabase session via cookies, read server-side in `lib/auth/session.ts`; never trust a client-supplied role

Authentication (who the user is) and authorization (what they may do) are handled separately. Every server action performs both: `lib/auth/session.ts` resolves identity, and the action itself checks whether that identity is authorized for the specific resource (e.g. "is this profile a member of this team") before any mutation. Participants must never be able to read or modify another participant's or team's private data. Admin functionality must always be authorized server-side, never inferred from client-side role display.

---

## Client Pattern

### 1. Supabase browser client
```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### 2. Supabase server client
```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

### 3. Server-side authenticated user retrieval
```typescript
// lib/auth/session.ts
import { createClient } from '@/lib/supabase/server'

export async function getAuthenticatedUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) return null
  return user
}
```

### 4. Server-side database access
```typescript
// lib/db/registrations.ts
import { createClient } from '@/lib/supabase/server'

export async function getRegistrationForProfile(profileId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('profile_id', profileId)
    .single()

  if (error) throw error
  return data
}
```

Never import `lib/supabase/server.ts` or any `lib/db/*` module into a client component. Never use the anon-key browser client for privileged mutations — those go through server actions using the server client. Service-role credentials (if ever needed for admin-only backend jobs) are never included in any file importable by the client bundle.

---

## Key Integration Patterns

### Supabase
- **Authentication:** `lib/supabase/*` clients + `lib/auth/session.ts`, session read via cookies server-side
- **Database queries:** read access via `lib/db/*` functions called from server components or server actions
- **Mutations:** write access only via `actions/*`, which call `lib/db/*` after validation and authorization
- **Storage:** upload/download only via server actions (`actions/submission.ts`), never direct browser-to-storage writes for privileged buckets

### Resend — CONDITIONAL
Only if transactional email (registration confirmation, announcements) is confirmed as required. Email sending belongs in `actions/*` (e.g. `actions/register.ts`), called after a successful database mutation, never before. Failures must not roll back the mutation that already succeeded — log the failure and surface a non-blocking warning; registration/team/submission state should not depend on email delivery succeeding.

### PostHog — CONDITIONAL
Only if analytics is enabled. Events originate from client components for UI interactions (page views, button clicks) and, where needed, from server actions for business events (registration completed). Do not send participant PII (email, phone, full name) as event properties — use the internal profile/registration ID only.

### HackCulture
Integration with HackCulture is pending organizer confirmation. The application must not invent an API, duplicate HackCulture functionality, or assume that HackCulture is the system of record until the organizer confirms the integration model.

---

## Configuration

**Confirmed currently** (safe to store as relatively stable configuration, e.g. in `config/site.ts` or seeded into `hackathon_config`):
- Event name: Tech4Bharat 2026
- Theme: Scalable Innovations for Next-Gen India
- Registration opening date: 7 September 2026
- Main event dates: 25–27 December 2026
- Location: Bengaluru, India
- Format: online preliminaries + on-site grand finale
- Platform partner: HackCulture (name only — see Integration Patterns above)
- Host institution: RV College of Engineering
- Prizes: ₹3,00,000 / ₹2,00,000 / ₹1,00,000 (₹6,00,000 total)

**Organizer-configurable / awaiting confirmation** (must be represented as nullable values in `hackathon_config`, never hardcoded or invented):
- Registration closing date
- Preliminary-round schedule details
- Exact grand-finale venue
- Team-size limits
- Eligibility criteria
- Challenges/problem statements
- Judging criteria
- Submission deadline and format
- HackCulture integration model

---

## Authorization Model

| Role | Read | Create | Update | Delete |
|---|---|---|---|---|
| Visitor | Public pages, published announcements, published challenges | Registration record (their own, if `/register` is public-facing) | — | — |
| Participant | Own profile, own registration, own team (if member), own submission (if owner) | Own submission (CONDITIONAL), request to join/create a team (CONDITIONAL) | Own profile, own submission before deadline | Own draft submission before it is marked `submitted` |
| Team member | Everything a Participant can, scoped to their team's shared data | — | Shared team fields, subject to lead-only restrictions if confirmed | — |
| Team lead — CONDITIONAL | Everything a Team member can | Team, invite members | Team details, remove members | Team (if empty/unsubmitted) |
| Admin | All records | Challenges, announcements, config values | Any record for moderation/config purposes | Any record, with audit consideration |

A participant's authorization is always scoped to resources they own or are a confirmed member of — never inferred from role alone without an ownership/membership check against the specific resource ID.

---

## Invariants

1. UI components (`components/`, including `components/ui/`) never directly access the database.
2. Server-only credentials (service-role keys, if ever used) are never exposed to the client bundle.
3. Every protected mutation performs both an authentication check and a resource-specific authorization check.
4. Participants cannot access another participant's or another team's private data.
5. Unconfirmed hackathon information (rules, eligibility, tracks, judging, deadlines, venue) is never invented or hard-coded — it is represented as `null`/pending in `hackathon_config` until confirmed.
6. HackCulture functionality is not duplicated until its integration model is confirmed.
7. Shared event data (dates, prizes, announcements, challenges) is stored centrally in `hackathon_config`/dedicated tables, never duplicated per participant.
8. All database mutations go through `actions/*`, which call `lib/db/*` — never directly from `app/` pages or `components/`.
9. Server-side validation (`lib/validation/*`) runs on every mutation regardless of whether client-side validation already ran.
10. Public pages (`/`, `/about`, `/challenges`, `/timeline`, `/prizes`, `/rules`, `/faq`) remain fully usable without authentication.
11. Admin functionality never relies solely on client-side role checks — every admin action is re-authorized server-side.
12. Architecture changes must preserve the separation between public, participant, and admin route groups and layouts.
13. Conditional features (team, submission, dashboard, admin) are only implemented once the corresponding requirement is confirmed in `project-overview.md` — do not pre-build their full logic speculatively.
14. New tables or config keys for unconfirmed data are added as nullable/pending, never seeded with invented values.
