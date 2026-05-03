-- MedDuel — initial schema
-- Phase 0 / batch 2: core tables for content + user progress.
-- RLS policies live in 20260503000002_rls.sql.

-- ─────────────────────────────────────────────────────────────────────────
-- Extensions
-- ─────────────────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────────────────────────
-- Enums
-- ─────────────────────────────────────────────────────────────────────────
create type question_type as enum (
  'diagnose', 'truefalse', 'pharma', 'lab', 'diff', 'test', 'ecg', 'graph'
);

create type question_status as enum ('draft', 'review', 'published', 'retired');

create type game_mode as enum (
  'blitz', 'classic', 'survival', 'dossier', 'daily',
  'learn', 'weak', 'spaced', 'detective', 'spoedkamer', 'favourites', 'challenge'
);

create type challenge_status as enum ('open', 'completed', 'expired', 'cancelled');

-- ─────────────────────────────────────────────────────────────────────────
-- Profiles — one row per auth.users entry.
-- ─────────────────────────────────────────────────────────────────────────
create table public.profiles (
  user_id        uuid primary key references auth.users(id) on delete cascade,
  display_name   text,
  username       citext unique,
  locale         text not null default 'en',
  avatar_url     text,
  xp             integer not null default 0,
  rank_label     text,
  day_streak     integer not null default 0,
  best_streak    integer not null default 0,
  last_played_at timestamptz,
  is_premium     boolean not null default false,
  premium_until  timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- citext for case-insensitive usernames
create extension if not exists "citext";

-- ─────────────────────────────────────────────────────────────────────────
-- Questions — the bank.
-- `correct` is the secret answer key; never expose via PostgREST without
-- going through an Edge Function or a security-definer function.
-- ─────────────────────────────────────────────────────────────────────────
create table public.questions (
  id           uuid primary key default gen_random_uuid(),
  legacy_idx   integer unique,                      -- index in original questions.js
  type         question_type not null,
  domain       text not null,
  display_label text not null,                       -- "dl"
  question_text text not null,                       -- "q"
  options       jsonb,                                -- "a" — array<string>; null for truefalse
  correct       jsonb not null,                       -- "c" — int index OR boolean
  explanation   text,                                 -- "ex"
  wiki          jsonb,
  fig           jsonb,
  difficulty    smallint check (difficulty between 1 and 5),
  subtype       text,
  tags          text[] not null default '{}',
  status        question_status not null default 'published',
  source_locale text not null default 'nl',
  version       integer not null default 1,
  created_by    uuid references auth.users(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index questions_domain_idx     on public.questions(domain);
create index questions_status_idx     on public.questions(status);
create index questions_difficulty_idx on public.questions(difficulty);
create index questions_type_idx       on public.questions(type);

-- Public-safe view: same columns as `questions` but without the answer key.
create or replace view public.questions_public as
  select id, legacy_idx, type, domain, display_label, question_text,
         options, explanation, wiki, fig, difficulty, subtype, tags,
         status, source_locale, version, created_at, updated_at
  from public.questions
  where status = 'published';

-- Per-locale translations.
create table public.question_translations (
  question_id   uuid not null references public.questions(id) on delete cascade,
  locale        text not null,
  question_text text not null,
  options       jsonb,
  explanation   text,
  wiki          jsonb,
  display_label text,
  updated_at    timestamptz not null default now(),
  primary key (question_id, locale)
);

-- ─────────────────────────────────────────────────────────────────────────
-- Dossier patient cases.
-- ─────────────────────────────────────────────────────────────────────────
create table public.dossier_cases (
  id          text primary key,                       -- legacy "c1", "c2"
  patient     text not null,
  diagnosis   text not null,
  clues       jsonb not null,                         -- [{label,text}]
  options     jsonb not null,
  correct     smallint not null,
  explanation text,
  status      question_status not null default 'published',
  source_locale text not null default 'nl',
  version     integer not null default 1,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table public.dossier_case_translations (
  case_id     text not null references public.dossier_cases(id) on delete cascade,
  locale      text not null,
  patient     text,
  diagnosis   text,
  clues       jsonb,
  options     jsonb,
  explanation text,
  updated_at  timestamptz not null default now(),
  primary key (case_id, locale)
);

-- ─────────────────────────────────────────────────────────────────────────
-- Detective cases (richer narrative cases).
-- ─────────────────────────────────────────────────────────────────────────
create table public.detective_cases (
  id          text primary key,
  payload     jsonb not null,                         -- whole case object
  status      question_status not null default 'published',
  source_locale text not null default 'nl',
  version     integer not null default 1,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- Attempts — single row per answered question.
-- This is the foundation for stats, leaderboards, weakness training, SR.
-- ─────────────────────────────────────────────────────────────────────────
create table public.attempts (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  question_id   uuid not null references public.questions(id) on delete cascade,
  session_id    uuid,
  mode          game_mode not null,
  chosen        jsonb,                                -- the user's choice
  is_correct    boolean not null,
  ms_to_answer  integer,
  hints_used    smallint not null default 0,
  played_at     timestamptz not null default now()
);

create index attempts_user_idx     on public.attempts(user_id, played_at desc);
create index attempts_question_idx on public.attempts(question_id);
create index attempts_session_idx  on public.attempts(session_id);

-- ─────────────────────────────────────────────────────────────────────────
-- Spaced-repetition state (SM-2).
-- ─────────────────────────────────────────────────────────────────────────
create table public.sr_state (
  user_id       uuid not null references auth.users(id) on delete cascade,
  question_id   uuid not null references public.questions(id) on delete cascade,
  ef            real not null default 2.5,
  interval_days integer not null default 1,
  reps          integer not null default 0,
  due_at        timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  primary key (user_id, question_id)
);

create index sr_state_due_idx on public.sr_state(user_id, due_at);

-- ─────────────────────────────────────────────────────────────────────────
-- Favourites.
-- ─────────────────────────────────────────────────────────────────────────
create table public.favourites (
  user_id     uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (user_id, question_id)
);

-- ─────────────────────────────────────────────────────────────────────────
-- Sessions — one row per finished game session.
-- ─────────────────────────────────────────────────────────────────────────
create table public.sessions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  mode          game_mode not null,
  score         integer not null default 0,
  correct       integer not null default 0,
  wrong         integer not null default 0,
  max_streak    integer not null default 0,
  domains       jsonb,                                -- per-domain c/t breakdown
  started_at    timestamptz not null default now(),
  ended_at      timestamptz
);

create index sessions_user_idx on public.sessions(user_id, ended_at desc);

-- ─────────────────────────────────────────────────────────────────────────
-- Daily challenge.
-- ─────────────────────────────────────────────────────────────────────────
create table public.daily_results (
  user_id     uuid not null references auth.users(id) on delete cascade,
  daily_num   integer not null,
  played_on   date not null,
  score       integer not null default 0,
  correct     integer not null default 0,
  wrong       integer not null default 0,
  hints_used  integer not null default 0,
  finished_at timestamptz not null default now(),
  primary key (user_id, daily_num)
);

create index daily_results_leaderboard_idx
  on public.daily_results(daily_num, score desc);

-- ─────────────────────────────────────────────────────────────────────────
-- Achievements.
-- ─────────────────────────────────────────────────────────────────────────
create table public.achievement_defs (
  id          text primary key,
  icon        text,
  label       text not null,
  description text,
  sort_order  integer not null default 0
);

create table public.achievements (
  user_id        uuid not null references auth.users(id) on delete cascade,
  achievement_id text not null references public.achievement_defs(id) on delete cascade,
  unlocked_at    timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

-- ─────────────────────────────────────────────────────────────────────────
-- Challenges (async user-vs-user).
-- ─────────────────────────────────────────────────────────────────────────
create table public.challenges (
  id            uuid primary key default gen_random_uuid(),
  from_user     uuid not null references auth.users(id) on delete cascade,
  to_user       uuid references auth.users(id) on delete set null,
  mode          game_mode not null default 'challenge',
  question_ids  uuid[] not null,
  seed          bigint,
  status        challenge_status not null default 'open',
  created_at    timestamptz not null default now(),
  expires_at    timestamptz not null default (now() + interval '7 days'),
  completed_at  timestamptz
);

create index challenges_to_user_idx on public.challenges(to_user, created_at desc);

create table public.challenge_results (
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  score        integer not null default 0,
  correct      integer not null default 0,
  wrong        integer not null default 0,
  hints_used   integer not null default 0,
  ms_total     integer,
  finished_at  timestamptz not null default now(),
  primary key (challenge_id, user_id)
);

-- ─────────────────────────────────────────────────────────────────────────
-- Friendships.
-- ─────────────────────────────────────────────────────────────────────────
create table public.friendships (
  user_id_a   uuid not null references auth.users(id) on delete cascade,
  user_id_b   uuid not null references auth.users(id) on delete cascade,
  status      text not null check (status in ('pending','accepted','blocked')),
  requested_by uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (user_id_a, user_id_b),
  check (user_id_a < user_id_b)                       -- canonical pair order
);

-- ─────────────────────────────────────────────────────────────────────────
-- updated_at triggers
-- ─────────────────────────────────────────────────────────────────────────
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.tg_set_updated_at();

create trigger questions_set_updated_at
  before update on public.questions
  for each row execute function public.tg_set_updated_at();

create trigger sr_state_set_updated_at
  before update on public.sr_state
  for each row execute function public.tg_set_updated_at();

create trigger friendships_set_updated_at
  before update on public.friendships
  for each row execute function public.tg_set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────
-- Auto-create a profile row when a new auth user signs up.
-- ─────────────────────────────────────────────────────────────────────────
create or replace function public.tg_handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, display_name, locale)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name',
             split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'locale', 'en')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.tg_handle_new_user();
