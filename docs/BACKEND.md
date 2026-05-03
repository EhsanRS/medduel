# MedDuel Backend

This document describes the backend architecture, data model, and local
development workflow. It is the source of truth — `BRIEFING.md` and `CLAUDE.md`
focus on the frontend.

---

## 1. Architecture

```
┌──────────────────────┐       ┌────────────────────────┐
│  Web app (Vite SPA)  │       │  iOS / Android         │
│  vanilla JS modules  │◀────▶ │  Capacitor wrap of SPA │
└──────────┬───────────┘       └─────────┬──────────────┘
           │                              │
           │            HTTPS              │
           ▼                              ▼
        ┌────────────────────────────────────┐
        │            Supabase                │
        │  ┌────────────────────────────┐    │
        │  │ Postgres (questions, users,│    │
        │  │ attempts, sr_state, …)     │    │
        │  └────────────────────────────┘    │
        │  ┌────────────────────────────┐    │
        │  │ Auth (email, Apple, Google)│    │
        │  └────────────────────────────┘    │
        │  ┌────────────────────────────┐    │
        │  │ Edge Functions (Deno):     │    │
        │  │   /questions, /attempt,    │    │
        │  │   /daily, /challenge       │    │
        │  └────────────────────────────┘    │
        │  ┌────────────────────────────┐    │
        │  │ Storage (figures: ECGs,    │    │
        │  │ X-rays, derm photos)       │    │
        │  └────────────────────────────┘    │
        └────────────────────────────────────┘
```

**Key principle:** answer keys (`correct` field) **never** ship to the client.
The client only learns the correct answer by `POST /attempt`, which records the
attempt server-side. This makes cheating in async challenges and leaderboards
much harder.

---

## 2. Tech stack

| Concern         | Choice                          | Notes                                     |
|-----------------|----------------------------------|-------------------------------------------|
| DB / Auth / API | Supabase (Postgres + GoTrue)    | RLS for per-user authorization            |
| Custom logic    | Supabase Edge Functions (Deno)  | TypeScript, ESM, deployed via CLI         |
| Frontend bundler| Vite                            | Minimal config, fast HMR, mobile-friendly |
| Mobile shell    | Capacitor 6                     | Wraps the SPA, native Apple/Google sign-in|
| Auth providers  | Email magic link, Apple, Google | Apple required by App Store if any social |
| Caching         | IndexedDB (web) / Preferences (native) | Question bank cached with version tag |

---

## 3. Local development

### Prerequisites

- Node 20+
- Docker (for `supabase start`)
- Supabase CLI (`brew install supabase/tap/supabase` or `npm i -D supabase`)

### First-time setup

```bash
npm install
cp .env.example .env.local
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (printed by supabase start)

npm run supabase:start         # boots local Postgres + Auth + Studio at :54323
npm run supabase:reset         # applies migrations + seed
npm run dev                    # vite at :5173
```

The local Supabase Studio is at <http://localhost:54323>. The local API URL is
<http://localhost:54321>.

### Daily workflow

```bash
npm run dev                    # runs Vite + uses local Supabase
```

If you change SQL migrations:

```bash
npm run supabase:reset         # drops & re-applies everything (local only)
```

If you add new tables, regenerate the TypeScript types:

```bash
npm run supabase:types
```

---

## 4. Data model (high level)

See `supabase/migrations/` for the canonical schema. Tables:

| Table                  | Purpose                                                |
|------------------------|--------------------------------------------------------|
| `profiles`             | One row per user. Display name, locale, XP, streaks.   |
| `questions`            | Question bank. `correct` is RLS-protected.             |
| `question_translations`| Per-locale `q`, `options`, `ex`, `wiki`.                |
| `dossier_cases`        | Patient-case mode content.                              |
| `attempts`             | One row per answered question. Powers stats + SR.      |
| `sr_state`             | SM-2 spaced repetition schedule (per user, per question)|
| `favourites`           | User-bookmarked questions.                              |
| `sessions`             | One row per finished game session.                      |
| `daily_results`        | Daily challenge leaderboard rows.                       |
| `achievements`         | Per-user achievement unlocks.                           |
| `challenges`           | Async user-vs-user challenges.                          |
| `challenge_results`    | Submissions to a challenge.                             |
| `friendships`          | User social graph (friends + pending).                  |

Row-Level Security:

- `profiles`, `attempts`, `sr_state`, `favourites`, `sessions`,
  `daily_results`, `achievements`: each user reads/writes only their own rows.
- `questions`, `dossier_cases`, `question_translations`: world-readable, but
  the `correct` / `c` column is excluded from public views.
- `challenges`, `challenge_results`: visible to participants only.
- `friendships`: visible to either side of the relationship.

---

## 5. Migrating existing localStorage progress

When a guest user first signs in we run a one-shot client-side import that
posts their localStorage state to a sync edge function. Conflict policy:
**max-merge per metric** so users never lose progress — see
`src/api/sync.js`.

LocalStorage keys imported:

- `md_name` → `profiles.display_name`
- `md_xp` → `profiles.xp`
- `md_stats` → `profiles.played` / `best_streak` / `day_streak`
- `md_fav` → `favourites`
- `md_weak` → `attempts` (synthetic rows w/ `correct=false`)
- `md_sr` → `sr_state`
- `md_ach` → `achievements`
- `md_domain_stats` → derived from `attempts` (no separate import)
- `md_session_hist` → `sessions`
- `md_daily`, `md_dstreak` → `daily_results`

---

## 6. Mobile (Capacitor)

The Capacitor config (`capacitor.config.ts`) wraps `dist/` (the Vite build
output) for iOS and Android. The native projects are generated locally on
the developer's machine — they are not stored in this repo until the
first `npx cap add` is run, after which they should be committed.

```bash
npm install
npm run build                  # vite build + postbuild copy → dist/
npx cap add ios                # creates ios/ project (macOS + Xcode required)
npx cap add android            # creates android/ project (Android Studio required)
npx cap sync                   # copies dist/ + plugins into native projects
npm run cap:ios                # opens Xcode
npm run cap:android            # opens Android Studio
```

iOS and Android builds use the same `dist/` output. Native plugins:

- `@capacitor/preferences` — replaces `localStorage` for guest mode.
- `@capacitor/push-notifications` — daily-challenge reminders, challenge invites.
- `@capacitor/app` — deep links for challenge URLs.

Auth on native:

- Apple Sign-In: native sheet via `@capacitor-community/apple-sign-in` →
  exchanges identity token with Supabase Auth.
- Google Sign-In: native sheet via `@codetrix-studio/capacitor-google-auth` →
  exchanges ID token with Supabase Auth.
- Email magic link: opens system browser, returns via universal link.

### Storage on native

`src/api/native.js` runs on every page load and detects `window.Capacitor`.
On iOS/Android it dynamically loads `@capacitor/preferences` and replaces
the `MDStorage` adapter with a native `PreferencesAdapter`. From the rest
of the app's perspective nothing changes — `MDState.getXP()` etc. still
work — but the underlying writes go to UserDefaults / SharedPreferences
instead of WebView localStorage (which iOS may purge under disk pressure).
