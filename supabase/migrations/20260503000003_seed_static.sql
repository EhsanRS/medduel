-- MedDuel — static seed data (achievement definitions).
-- Question / case content is loaded by scripts/seed-questions.mjs from the
-- legacy questions.js file.

insert into public.achievement_defs (id, icon, label, description, sort_order)
values
  ('first_correct', '🎯', 'First hit',     'Gave your first correct answer',      10),
  ('streak_3',      '🔥', 'On a roll',     '3 correct answers in a row',          20),
  ('streak_10',     '⚡', 'Unstoppable',   '10 in a row — impressive',            30),
  ('perfect',       '💯', 'Flawless',      'Classic: 10 out of 10 without a mistake', 40),
  ('games_10',      '🎮', 'Regular',       '10 games played',                      50),
  ('games_50',      '🏆', 'Veteran',       '50 games played',                      60),
  ('blitz_200',     '🚀', 'Blitz king',    '200+ points in one Blitz round',      70),
  ('survival_20',   '❤️', 'Survivor',      '20 questions survived in Survival',   80),
  ('all_domains',   '🌍', 'All-rounder',   'All 13 domains played at least once', 90),
  ('professor',     '🎓', 'Professor',     'Reached the highest rank',           100)
on conflict (id) do update set
  icon        = excluded.icon,
  label       = excluded.label,
  description = excluded.description,
  sort_order  = excluded.sort_order;
