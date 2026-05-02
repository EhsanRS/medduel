// MedDuel — i18n (add new language: copy 'en' block, translate values)

const STRINGS = {
  en: {
    // Nav
    nav_play:      'Play',
    nav_detective: 'Detective',
    nav_theory:    'Theory',
    nav_profile:   'Profile',
    // Home
    home_choose:   'Choose mode',
    home_today:    'Today',
    home_due:      'Due for review',
    home_domain:   'Your score by domain',
    home_theory:   'Theory book',
    home_theory_sub: 'Clinical overviews by topic',
    home_search:   'Search topic…',
    home_no_results: 'No results for',
    // Modes
    mode_blitz:    'Blitz',
    mode_blitz_sub:'60 seconds · As fast as possible',
    mode_er:       'Emergency Room',
    mode_er_sub:   '10 patients · 15s per question',
    mode_learn:    'Learn mode',
    mode_learn_sub:'Domain',
    mode_all_domains:'All domains',
    mode_popular:  '⚡ Most popular mode',
    // Profile
    profile_title: 'My profile',
    profile_games: 'Games',
    profile_avg:   'Average',
    profile_favs:  'Favourites',
    profile_weak:  'Train Your Weaknesses',
    profile_bank:  'Question bank',
    profile_sessions:'Recent sessions',
    profile_trend: 'Trend by domain',
    profile_lang:  'Language',
    // Common
    points:    'Points',
    correct:   'Correct',
    wrong:     'Wrong',
    accuracy:  'Accuracy',
    stop:      '✕ Stop',
    back_home: '← Home',
    next_q:    'Next question →',
    tap_explain:'Tap for explanation →',
    explanation:'Explanation',
    back_game:  '← Back to game',
    theory_book:'Theory book',
    // Toast / facts
    watch_out:  'Watch out',
    core:       'Core concept',
    mnemonic:   'Mnemonic',
    priority:   'Priority',
    view_theory:'View theory:',
    // Rankings
    rank_student: 'Medical Student',
    rank_junior:  'Junior Doctor',
    rank_resident:'Resident',
    rank_specialist:'Specialist',
    rank_professor:'Professor',
    // Challenges
    challenge_banner: "You've been challenged! 🏆",
    // Dossier
    dossier_title:  'The Dossier',
    dossier_closed: 'Dossier closed',
    dossier_case:   'Case',
    dossier_file:   '🗂️ Patient file',
    dossier_reveal: 'Reveal next hint',
    dossier_all:    'All hints revealed',
    dossier_diag:   'What is your diagnosis?',
    dossier_overview:'Cases overview',
    // Results
    grade_expert:  'Expert level',
    grade_excellent:'Excellent',
    grade_good:    'Well done',
    grade_almost:  'Almost!',
    grade_better:  'Better next time',
    // Daily
    daily_played:  'DAY #${n} · PLAYED',
    daily_questions:'10 questions · Same for everyone',
    daily_next:    'Next challenge in',
    daily_avail:   'Available now! 🎉',
    legendary:     'Legendary!',
  },

  nl: {
    nav_play:      'Spelen',
    nav_detective: 'Speurder',
    nav_theory:    'Theorie',
    nav_profile:   'Profiel',
    home_choose:   'Kies modus',
    home_today:    'Vandaag',
    home_due:      'Te herhalen',
    home_domain:   'Jouw score per domein',
    home_theory:   'Theorieboek',
    home_theory_sub:'Klinische overzichten per thema',
    home_search:   'Zoek onderwerp…',
    home_no_results:'Geen resultaten voor',
    mode_blitz:    'Blitz',
    mode_blitz_sub:'60 seconden · Zo snel mogelijk',
    mode_er:       'Spoedkamer',
    mode_er_sub:   '10 patiënten · 15s per vraag',
    mode_learn:    'Leer-modus',
    mode_learn_sub:'Domein',
    mode_all_domains:'Alle domeinen',
    mode_popular:  '⚡ Populairste modus',
    profile_title: 'Mijn profiel',
    profile_games: 'Potjes',
    profile_avg:   'Gemiddeld',
    profile_favs:  'Favorieten',
    profile_weak:  'Train je Zwaktes',
    profile_bank:  'Vragenbank',
    profile_sessions:'Recente sessies',
    profile_trend: 'Trend per domein',
    profile_lang:  'Taal',
    points:    'Punten',
    correct:   'Goed',
    wrong:     'Fout',
    accuracy:  'Accuraat',
    stop:      '✕ Stop',
    back_home: '← Home',
    next_q:    'Volgende vraag →',
    tap_explain:'Tik voor uitleg →',
    explanation:'Uitleg',
    back_game:  '← Terug naar spel',
    theory_book:'Theorieboek',
    watch_out:  'Let op',
    core:       'Kernbegrip',
    mnemonic:   'Geheugensteuntje',
    priority:   'Prioriteit',
    view_theory:'Bekijk theorie:',
    rank_student: 'Co-assistent',
    rank_junior:  'ANIOS',
    rank_resident:'AIOS',
    rank_specialist:'Specialist',
    rank_professor:'Professor',
    challenge_banner: 'Je bent uitgedaagd! 🏆',
    dossier_title:  'Het Dossier',
    dossier_closed: 'Dossier gesloten',
    dossier_case:   'Zaak',
    dossier_file:   '🗂️ Patiëntendossier',
    dossier_reveal: 'Volgende hint onthullen',
    dossier_all:    'Alle hints onthuld',
    dossier_diag:   'Wat is jouw diagnose?',
    dossier_overview:'Zaken overzicht',
    grade_expert:  'Expert niveau',
    grade_excellent:'Uitstekend',
    grade_good:    'Goed gedaan',
    grade_almost:  'Bijna!',
    grade_better:  'Volgende keer beter',
    daily_played:  'DAG #${n} · GESPEELD',
    daily_questions:'10 vragen · Iedereen dezelfde',
    daily_next:    'Volgende challenge over',
    daily_avail:   'Nu beschikbaar! 🎉',
    legendary:     'Legendarisch!',
  },
};

const LANGS = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
];

function getLang() {
  return localStorage.getItem('md_lang') || 'en';
}

function setLang(code) {
  localStorage.setItem('md_lang', code);
  location.reload();
}

function t(key) {
  const lang = getLang();
  return (STRINGS[lang] && STRINGS[lang][key]) ?? STRINGS.en[key] ?? key;
}
