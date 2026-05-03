-- MedDuel — Row-Level Security policies
-- Phase 0 / batch 3

-- ─────────────────────────────────────────────────────────────────────────
-- Enable RLS on every public table.
-- ─────────────────────────────────────────────────────────────────────────
alter table public.profiles                   enable row level security;
alter table public.questions                  enable row level security;
alter table public.question_translations      enable row level security;
alter table public.dossier_cases              enable row level security;
alter table public.dossier_case_translations  enable row level security;
alter table public.detective_cases            enable row level security;
alter table public.attempts                   enable row level security;
alter table public.sr_state                   enable row level security;
alter table public.favourites                 enable row level security;
alter table public.sessions                   enable row level security;
alter table public.daily_results              enable row level security;
alter table public.achievement_defs           enable row level security;
alter table public.achievements               enable row level security;
alter table public.challenges                 enable row level security;
alter table public.challenge_results          enable row level security;
alter table public.friendships                enable row level security;

-- ─────────────────────────────────────────────────────────────────────────
-- profiles
-- Anyone can read public profile fields. Users can only edit their own.
-- ─────────────────────────────────────────────────────────────────────────
create policy "profiles read public"
  on public.profiles for select
  using (true);

create policy "profiles update own"
  on public.profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "profiles insert own"
  on public.profiles for insert
  with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────
-- questions
-- Public: read via questions_public view (no `correct` column).
-- Direct table access is blocked; service-role and edge functions bypass RLS.
-- ─────────────────────────────────────────────────────────────────────────
revoke all on public.questions from anon, authenticated;
grant select on public.questions_public to anon, authenticated;

-- Translations are world-readable (no answer key in there).
create policy "translations read all"
  on public.question_translations for select
  using (true);

-- ─────────────────────────────────────────────────────────────────────────
-- dossier + detective cases
-- The "correct" field for dossier_cases is in the row, so we expose a view.
-- ─────────────────────────────────────────────────────────────────────────
revoke all on public.dossier_cases   from anon, authenticated;
revoke all on public.detective_cases from anon, authenticated;

create or replace view public.dossier_cases_public as
  select id, patient, clues, options, status, source_locale, version,
         created_at, updated_at
  from public.dossier_cases
  where status = 'published';

create or replace view public.detective_cases_public as
  select id,
         payload - 'solution' - 'answer' - 'correct' as payload,
         status, source_locale, version, created_at, updated_at
  from public.detective_cases
  where status = 'published';

grant select on public.dossier_cases_public   to anon, authenticated;
grant select on public.detective_cases_public to anon, authenticated;

create policy "dossier translations read all"
  on public.dossier_case_translations for select
  using (true);

-- ─────────────────────────────────────────────────────────────────────────
-- attempts
-- Users see/insert only their own.
-- ─────────────────────────────────────────────────────────────────────────
create policy "attempts read own"
  on public.attempts for select
  using (auth.uid() = user_id);

create policy "attempts insert own"
  on public.attempts for insert
  with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────
-- sr_state
-- ─────────────────────────────────────────────────────────────────────────
create policy "sr read own"
  on public.sr_state for select
  using (auth.uid() = user_id);

create policy "sr write own"
  on public.sr_state for insert
  with check (auth.uid() = user_id);

create policy "sr update own"
  on public.sr_state for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "sr delete own"
  on public.sr_state for delete
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────
-- favourites
-- ─────────────────────────────────────────────────────────────────────────
create policy "fav read own"
  on public.favourites for select
  using (auth.uid() = user_id);

create policy "fav write own"
  on public.favourites for insert
  with check (auth.uid() = user_id);

create policy "fav delete own"
  on public.favourites for delete
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────
-- sessions
-- ─────────────────────────────────────────────────────────────────────────
create policy "sessions read own"
  on public.sessions for select
  using (auth.uid() = user_id);

create policy "sessions insert own"
  on public.sessions for insert
  with check (auth.uid() = user_id);

create policy "sessions update own"
  on public.sessions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────
-- daily_results
-- Read: own row + public leaderboard view (granted below).
-- ─────────────────────────────────────────────────────────────────────────
create policy "daily read own"
  on public.daily_results for select
  using (auth.uid() = user_id);

create policy "daily insert own"
  on public.daily_results for insert
  with check (auth.uid() = user_id);

-- Public leaderboard: top scores per daily_num, joined with display_name.
create or replace view public.daily_leaderboard as
  select
    dr.daily_num,
    dr.score,
    dr.correct,
    dr.wrong,
    dr.hints_used,
    dr.finished_at,
    p.display_name,
    p.username,
    p.avatar_url
  from public.daily_results dr
  join public.profiles p on p.user_id = dr.user_id;

grant select on public.daily_leaderboard to anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────────
-- achievements
-- ─────────────────────────────────────────────────────────────────────────
create policy "ach defs read all"
  on public.achievement_defs for select
  using (true);

create policy "ach read own"
  on public.achievements for select
  using (auth.uid() = user_id);

create policy "ach insert own"
  on public.achievements for insert
  with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────
-- challenges + challenge_results
-- Visible to participants only.
-- ─────────────────────────────────────────────────────────────────────────
create policy "challenges read participants"
  on public.challenges for select
  using (auth.uid() = from_user or auth.uid() = to_user);

create policy "challenges insert as sender"
  on public.challenges for insert
  with check (auth.uid() = from_user);

create policy "challenges update participants"
  on public.challenges for update
  using (auth.uid() = from_user or auth.uid() = to_user)
  with check (auth.uid() = from_user or auth.uid() = to_user);

create policy "challenge_results read participants"
  on public.challenge_results for select
  using (
    auth.uid() = user_id
    or auth.uid() in (
      select from_user from public.challenges where id = challenge_id
      union
      select to_user   from public.challenges where id = challenge_id
    )
  );

create policy "challenge_results insert own"
  on public.challenge_results for insert
  with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────
-- friendships
-- Either side can read; only the requester can insert.
-- ─────────────────────────────────────────────────────────────────────────
create policy "friendships read participants"
  on public.friendships for select
  using (auth.uid() = user_id_a or auth.uid() = user_id_b);

create policy "friendships insert by requester"
  on public.friendships for insert
  with check (auth.uid() = requested_by
              and (auth.uid() = user_id_a or auth.uid() = user_id_b));

create policy "friendships update participants"
  on public.friendships for update
  using (auth.uid() = user_id_a or auth.uid() = user_id_b)
  with check (auth.uid() = user_id_a or auth.uid() = user_id_b);

create policy "friendships delete participants"
  on public.friendships for delete
  using (auth.uid() = user_id_a or auth.uid() = user_id_b);
