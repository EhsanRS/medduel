// MedDuel — Router & Home screen

function showHome() {
  renderHomeScreen();
  showScreen('home');
  loadHomeStats();

  const p = new URLSearchParams(window.location.search);
  if (p.get('challenge') && p.get('score')) {
    setTimeout(() => {
      showToast(true,
        `You've been challenged! 🏆`,
        `Beat ${p.get('score')} points — use as few hints as possible.`
      );
      setTimeout(hideToast, 4500);
    }, 400);
  }
}

function renderHomeScreen() {
  document.getElementById('app').innerHTML = `
    <div id="home" class="screen active">
      <div id="htab" class="home-tab-wrap"></div>
      <nav class="bottom-nav" id="bottomNav">
        <button class="bn-tab active" onclick="switchHomeTab('spelen',this)">
          <span class="bn-icon">🎮</span>
          <span class="bn-label">${t('nav_play')}</span>
        </button>
        <button class="bn-tab" onclick="switchHomeTab('speurdokter',this)">
          <span class="bn-icon">🔍</span>
          <span class="bn-label">${t('nav_detective')}</span>
        </button>
        <button class="bn-tab" onclick="switchHomeTab('theorie',this)">
          <span class="bn-icon">📖</span>
          <span class="bn-label">${t('nav_theory')}</span>
        </button>
        <button class="bn-tab" onclick="switchHomeTab('profiel',this)">
          <span class="bn-icon">👤</span>
          <span class="bn-label">${t('nav_profile')}</span>
        </button>
      </nav>
    </div>`;
  renderSpelenTab();
}

function renderSRHomeCard() {
  const n = typeof srDueCount === 'function' ? srDueCount() : 0;
  if (n === 0) return '';
  return `
    <div class="sr-home-card fade-in-2" onclick="startSRMode()">
      <div class="sr-home-icon">📅</div>
      <div class="sr-home-info">
        <span class="sr-home-name">Due for review</span>
        <span class="sr-home-sub">${n} question${n === 1 ? '' : 's'} ready for review</span>
      </div>
      <span class="sr-home-badge">${n}</span>
    </div>`;
}

function renderSpelenTab() {
  document.getElementById('htab').innerHTML = `
    <div class="home-hero fade-in">
      <div class="hero-left">
        <div class="hero-eyebrow">${getGreeting() || 'medical trivia'}</div>
        <h1 class="logo">Med<em>Duel</em></h1>
      </div>
      <div class="hero-streak-badge" id="heroStreak">0🔥</div>
    </div>

    <div class="section-label fade-in-2">${t('home_today')}</div>
    ${renderDailyHomeCard()}
    ${renderSRHomeCard()}

    <div class="section-label fade-in-3">${t('home_choose')}</div>

    <div class="mode-hero-card fade-in-3" onclick="startGame('blitz')">
      <div class="mhc-tag">${t('mode_popular')}</div>
      <div class="mhc-name">${t('mode_blitz')}</div>
      <div class="mhc-sub">${t('mode_blitz_sub')}</div>
      <div class="mhc-cta">Start now →</div>
    </div>

    <div class="mode-grid fade-in-3">
      <div class="mode-card classic" onclick="startGame('classic')">
        <div class="mode-icon-wrap">🎯</div>
        <div class="mode-info">
          <span class="mode-name">Classic</span>
          <span class="mode-sub">10 questions</span>
        </div>
      </div>
      <div class="mode-card survival" onclick="startGame('survival')">
        <div class="mode-icon-wrap">❤️</div>
        <div class="mode-info">
          <span class="mode-name">Survival</span>
          <span class="mode-sub">3 lives</span>
        </div>
      </div>
      <div class="mode-card dossier" onclick="startDossier()">
        <div class="mode-icon-wrap">🗂️</div>
        <div class="mode-info">
          <span class="mode-name">Dossier</span>
          <span class="mode-sub">Challenge others</span>
        </div>
      </div>
      <div class="mode-card learn" onclick="showLearnSetup()">
        <div class="mode-icon-wrap">📖</div>
        <div class="mode-info">
          <span class="mode-name">Learn mode</span>
          <span class="mode-sub">No time pressure</span>
        </div>
      </div>
      <div class="mode-card spoedkamer" onclick="startSpoedkamer()">
        <div class="mode-icon-wrap">🚨</div>
        <div class="mode-info">
          <span class="mode-name">${t('mode_er')}</span>
          <span class="mode-sub">${t('mode_er_sub')}</span>
        </div>
      </div>
    </div>

    <div class="section-label fade-in-4">${t('mode_learn_sub')}</div>
    ${renderDomainGrid()}`;
}

function renderDomainGrid() {
  const domains = [
    { key: 'cardio',   icon: '🫀', name: 'Cardio',   color: '#FEECE8' },
    { key: 'neuro',    icon: '🧠', name: 'Neuro',    color: '#EDE9FE' },
    { key: 'pharma',   icon: '💊', name: 'Pharma',   color: '#E0F2FE' },
    { key: 'infectio', icon: '🦠', name: 'Infectio', color: '#DCFCE7' },
    { key: 'lab',      icon: '🧪', name: 'Lab',      color: '#F3E8FF' },
    { key: 'pulmo',    icon: '🫁', name: 'Pulmo',    color: '#E0F6FF' },
    { key: 'gastro',   icon: '🫃', name: 'Gastro',   color: '#FEF3C7' },
    { key: 'endo',     icon: '🔬', name: 'Endo',     color: '#CCFBF1' },
    { key: 'nephro',   icon: '🫘', name: 'Nephro',   color: '#DBEAFE' },
    { key: 'psych',    icon: '🧩', name: 'Psych',    color: '#FDF4FF' },
    { key: 'derm',     icon: '🩹', name: 'Derm',     color: '#FCE7F3' },
    { key: 'rheum',    icon: '🦴', name: 'Rheum',    color: '#FEF9C3' },
    { key: 'repro',    icon: '🤰', name: 'Repro',    color: '#FFE4E6' },
  ];

  const tiles = domains.map(d => {
    const n = typeof QUESTIONS !== 'undefined'
      ? QUESTIONS.filter(q => q.domain === d.key).length : 0;
    return `<div class="cat-pill domain-tile fade-in-4" data-cat="${d.key}"
        style="--dtc:${d.color}"
        onclick="toggleCat('${d.key}',this)">
      <span class="dt-icon">${d.icon}</span>
      <span class="dt-name">${d.name}</span>
      ${n ? `<span class="dt-count">${n}q</span>` : ''}
    </div>`;
  }).join('');

  return `<div class="cat-wrap fade-in-4" id="catPills">
    <div class="cat-pill cat-all active" data-cat="all" onclick="toggleCat('all',this)">
      ${t('mode_all_domains')}
    </div>
    <div class="domain-grid">${tiles}</div>
  </div>`;
}

const THEORY_PILLS = [
  { id: 'dementie',    emoji: '🧠', name: 'Dementia syndromes',        sub: 'Alzheimer Vascular Lewy-body FTD NPH' },
  { id: 'ecg',         emoji: '📊', name: 'ECG Basic interpretation',   sub: 'PQRST Intervals ST-patterns Arrhythmias' },
  { id: 'anemie',      emoji: '🩸', name: 'Anaemia',                    sub: 'Microcytic Normocytic Macrocytic iron B12 folate' },
  { id: 'meningitis',  emoji: '🔬', name: 'Meningitis & LP',            sub: 'Bacterial Viral TB CSF lumbar puncture' },
  { id: 'hartfalen',   emoji: '❤️', name: 'Heart failure',              sub: 'HFrEF HFpEF four-pillar therapy dyspnoea oedema' },
  { id: 'antibiotica', emoji: '💊', name: 'Antibiotic classes',         sub: 'Penicillin cephalosporin macrolide fluoroquinolone resistance' },
  { id: 'stolling',    emoji: '🩹', name: 'Coagulation & Anticoagulation', sub: 'Cascade heparin VKA DOAC thrombosis' },
  { id: 'diabetes',    emoji: '🍬', name: 'Diabetes Mellitus',          sub: 'DM1 DM2 DKA insulin metformin complications' },
  { id: 'schildklier', emoji: '🦋', name: 'Thyroid pathology',          sub: 'Hypothyroidism hyperthyroidism TSH T4 thyroiditis' },
  { id: 'sepsis',      emoji: '🚨', name: 'Sepsis & Septic Shock',      sub: 'Sepsis-3 qSOFA antibiotic bundles lactate' },
  { id: 'copd',        emoji: '🫁', name: 'COPD',                       sub: 'GOLD staging exacerbation inhalers spirometry' },
  { id: 'longembolie', emoji: '🩺', name: 'Pulmonary embolism',         sub: 'Wells diagnosis treatment massive PE anticoagulants' },
];

function renderTheorieTab() {
  document.getElementById('htab').innerHTML = `
    <div class="htab-header fade-in">
      <h2 class="htab-title">${t('home_theory')}</h2>
      <p class="htab-sub">${t('home_theory_sub')}</p>
    </div>
    <div class="th-search-wrap fade-in-1">
      <input type="search" class="th-search" id="thSearch"
        placeholder="🔍 ${t('home_search')}" oninput="filterTheory(this.value)"
        autocomplete="off" autocorrect="off" spellcheck="false">
    </div>
    <div class="th-home-grid fade-in-2" id="thGrid">${buildTheoryGrid('')}</div>`;
}

function buildTheoryGrid(query) {
  const q = query.trim().toLowerCase();
  const list = q
    ? THEORY_PILLS.filter(t =>
        t.name.toLowerCase().includes(q) || t.sub.toLowerCase().includes(q)
      )
    : THEORY_PILLS;
  if (list.length === 0)
    return `<p style="color:var(--ink-light);text-align:center;padding:1.5rem 0;font-size:14px;">${t('home_no_results')} "<em>${escHtml(query)}</em>"</p>`;
  return list.map(t =>
    `<div class="th-home-pill" onclick="openTheory('${t.id}')">
      <span class="th-home-emoji">${t.emoji}</span>
      <span class="th-home-name">${t.name}</span>
    </div>`
  ).join('');
}

function filterTheory(query) {
  const grid = document.getElementById('thGrid');
  if (grid) grid.innerHTML = buildTheoryGrid(query);
}

function renderProfielTab() {
  const name = (typeof loadName === 'function' && loadName()) || '';
  const st   = loadStats();
  const totalQ = (st.totalCorrect || 0) + (st.totalWrong || 0);
  const avgPct = totalQ > 0 ? Math.round((st.totalCorrect || 0) / totalQ * 100) : 0;

  document.getElementById('htab').innerHTML = `
    <div class="htab-header fade-in">
      <h2 class="htab-title">${name ? `Hey, ${name}` : t('profile_title')}</h2>
      <p class="htab-sub">Your progress & statistics</p>
    </div>
    <div id="xpWrap" class="fade-in-1"></div>

    <div class="stats-summary-card fade-in-2">
      <div class="ss-cell">
        <span class="ss-val">${st.played || 0}</span>
        <span class="ss-lbl">Games</span>
      </div>
      <div class="ss-div"></div>
      <div class="ss-cell">
        <span class="ss-val">${st.totalCorrect || 0}</span>
        <span class="ss-lbl">Correct</span>
      </div>
      <div class="ss-div"></div>
      <div class="ss-cell">
        <span class="ss-val" style="color:${avgPct>=80?'var(--green)':avgPct>=60?'var(--amber)':'var(--pulse)'}">${avgPct}%</span>
        <span class="ss-lbl">Average</span>
      </div>
      <div class="ss-div"></div>
      <div class="ss-cell">
        <span class="ss-val">${st.bestStreak || 0}🔥</span>
        <span class="ss-lbl">Best streak</span>
      </div>
    </div>

    <div id="achievementsWrap" class="fade-in-3"></div>

    <div class="fav-home-card fade-in-3" onclick="startFavourites()">
      <div class="fav-home-icon">★</div>
      <div class="fav-home-info">
        <span class="fav-home-name">Favourites</span>
        <span class="fav-home-sub" id="favHomeSub">Nothing saved yet</span>
      </div>
      <span style="font-size:18px;color:var(--amber);opacity:0.5;">→</span>
    </div>
    <div id="weakHomeCard" class="weak-home-card fade-in-3" onclick="startWeakMode()" style="display:none;">
      <div class="weak-home-icon">🎯</div>
      <div class="fav-home-info">
        <span class="fav-home-name">Train Your Weaknesses</span>
        <span class="fav-home-sub" id="weakHomeSub">Loading...</span>
      </div>
      <span style="font-size:18px;color:var(--pulse);opacity:0.7;">→</span>
    </div>
    <div id="domainStatsWrap" class="fade-in-3" style="display:none;margin-top:1rem;margin-bottom:1rem;"></div>
    <div class="adm-home-card fade-in-4" onclick="showAdmin()">
      <span style="font-size:20px;">🗂️</span>
      <div class="fav-home-info">
        <span class="fav-home-name">${t('profile_bank')}</span>
        <span class="fav-home-sub">${QUESTIONS.length} questions · manage &amp; overview</span>
      </div>
      <span style="font-size:18px;color:var(--ink-light);opacity:0.5;">→</span>
    </div>

    <div class="lang-card fade-in-4">
      <div class="lang-card-label">${t('profile_lang')}</div>
      <div class="lang-btns">
        ${LANGS.map(l => `
          <button class="lang-btn${getLang() === l.code ? ' active' : ''}"
            onclick="setLang('${l.code}')">
            ${l.flag} ${l.label}
          </button>`).join('')}
      </div>
    </div>`;
  renderXPHome();
  const achWrap = document.getElementById('achievementsWrap');
  if (achWrap) achWrap.innerHTML = renderAchievements();
  const sub = document.getElementById('favHomeSub');
  if (sub) {
    const n = loadFavourites().length;
    sub.textContent = n === 0 ? 'Nothing saved yet' : `${n} fact${n === 1 ? '' : 's'} saved`;
  }
  renderDomainStatsHome();
  const histHTML = renderSessionHistory();
  if (histHTML) {
    const wrap = document.getElementById('domainStatsWrap');
    if (wrap) wrap.insertAdjacentHTML('afterend', histHTML);
  }
  renderWeakHome();
}

function renderOpenPatientCard() {
  const p = loadOpenPatient();
  if (!p) return '';
  const days = Math.floor((Date.now() - p.savedAt) / 86400000);
  const meta = DOMAIN_META.find(m => m.key === p.q.domain);
  const icon = meta ? meta.icon : '🏥';
  const urgency = days === 0 ? 'Waiting in the ICU...'
    : days === 1 ? 'Day 1. Still no diagnosis.'
    : `Day ${days}. The family is asking for news.`;
  const qShort = p.q.q.length > 85 ? p.q.q.slice(0, 85) + '…' : p.q.q;
  return `
    <div class="open-patient-card fade-in-2" onclick="startPatientReplay()">
      <div class="opc-top">
        <span class="opc-icon">${icon}</span>
        <div class="opc-meta">
          <span class="opc-label">Your patient</span>
          <span class="opc-urgency">${urgency}</span>
        </div>
        <span class="opc-days${days >= 2 ? ' urgent' : ''}">${days === 0 ? 'today' : days + 'd'}</span>
      </div>
      <div class="opc-q">${qShort}</div>
      ${p.wrongLabel ? `<div class="opc-wrong">You diagnosed: <strong>${p.wrongLabel}</strong></div>` : ''}
      <div class="opc-cta">Restore the diagnosis →</div>
    </div>`;
}

function startPatientReplay() {
  const p = loadOpenPatient();
  if (!p) return;
  const q = p.q;
  const letters = ['A', 'B', 'C', 'D'];
  const answersHTML = q.type === 'truefalse'
    ? `<div class="tf-wrap">
        <button class="tf-btn true-btn"  onclick="answerPatient(true)">✓ True</button>
        <button class="tf-btn false-btn" onclick="answerPatient(false)">✗ False</button>
       </div>`
    : q.a.map((ans, i) =>
        `<button class="ans-btn" onclick="answerPatient(${i})" data-i="${i}">
          <span class="ans-key">${letters[i]}</span>${ans}
         </button>`
      ).join('');

  document.getElementById('app').innerHTML = `
    <div id="patient-replay" class="screen active">
      <div class="pr-header">
        <button class="quit-btn" onclick="showHome()">✕ Close</button>
        <span class="pr-title">🏥 Restore your patient</span>
      </div>
      ${p.wrongLabel ? `<div class="pr-context fade-in"><div class="pr-wrong-badge">You previously diagnosed: <strong>${p.wrongLabel}</strong></div></div>` : ''}
      <div class="q-card fade-in-1">
        <div class="q-domain">${q.dl || ''}</div>
        <div class="q-text">${formatQ(q.q)}</div>
      </div>
      <div class="answers-wrap" id="prAnswersWrap">${answersHTML}</div>
    </div>`;
}

function answerPatient(choice) {
  const p = loadOpenPatient();
  if (!p) return;
  const q = p.q;
  const ok = (choice === q.c);

  if (q.type === 'truefalse') {
    document.querySelectorAll('.tf-btn').forEach(b => {
      b.disabled = true;
      if ((b.classList.contains('true-btn') && q.c === true) || (b.classList.contains('false-btn') && q.c === false))
        b.classList.add('correct');
    });
    if (!ok) {
      const wrongBtn = document.querySelector(choice ? '.true-btn' : '.false-btn');
      if (wrongBtn) wrongBtn.classList.add('wrong');
    }
  } else {
    document.querySelectorAll('.ans-btn').forEach(b => {
      b.disabled = true;
      if (parseInt(b.dataset.i) === q.c) b.classList.add('correct');
    });
    if (!ok) {
      const wrongBtn = document.querySelector(`.ans-btn[data-i="${choice}"]`);
      if (wrongBtn) wrongBtn.classList.add('wrong');
    }
  }

  const correctLabel = q.type === 'truefalse' ? (q.c ? 'True' : 'False') : q.a[q.c];
  const screen = document.getElementById('patient-replay');
  if (!screen) return;

  const div = document.createElement('div');
  div.style.padding = '0 1rem 2rem';
  div.className = 'fade-in';

  if (ok) {
    clearOpenPatient();
    div.innerHTML = `
      <div class="pr-saved">✓ Patient saved! Correct diagnosis.</div>
      <button class="btn-primary" style="margin-top:1rem;width:100%" onclick="showHome()">Back home →</button>`;
  } else {
    div.innerHTML = `
      <div class="pr-fail">
        <div class="pr-fail-head">Incorrect. Correct answer: <strong>${correctLabel}</strong></div>
        ${q.ex ? `<div class="pr-fail-ex">${q.ex}</div>` : ''}
      </div>
      <button class="btn-secondary" style="margin-top:1rem;width:100%" onclick="showHome()">Back →</button>`;
  }
  screen.appendChild(div);
}

function renderSessionHistory() {
  const hist = loadSessionHistory().slice(-7);
  if (hist.length < 2) return '';

  const bars = hist.map(s => {
    const color = s.acc >= 80 ? 'var(--green)' : s.acc >= 60 ? 'var(--amber)' : 'var(--pulse)';
    const modeLabel = { blitz: '⚡', classic: '🎯', survival: '❤️' }[s.mode] || '🎮';
    return `
      <div class="sh-bar-col">
        <div class="sh-bar-wrap">
          <div class="sh-bar-fill" style="height:${s.acc}%;background:${color}"></div>
        </div>
        <span class="sh-bar-pct">${s.acc}%</span>
        <span class="sh-bar-mode">${modeLabel}</span>
      </div>`;
  }).join('');

  const allHist = loadSessionHistory();
  const recent = allHist.slice(-3);
  const older  = allHist.slice(-6, -3);

  const trendRows = DOMAIN_META
    .filter(({ key }) => recent.some(s => s.domains && s.domains[key] && s.domains[key].t > 0))
    .map(({ key, label, icon }) => {
      const recentSessions = recent.filter(s => s.domains && s.domains[key] && s.domains[key].t);
      const avgRecent = recentSessions.length
        ? recentSessions.reduce((sum, s) => sum + s.domains[key].c / s.domains[key].t, 0) / recentSessions.length
        : 0;

      const olderSessions = older.filter(s => s.domains && s.domains[key] && s.domains[key].t);
      const avgOlder = olderSessions.length
        ? olderSessions.reduce((sum, s) => sum + s.domains[key].c / s.domains[key].t, 0) / olderSessions.length
        : null;

      const trend = avgOlder === null ? '' :
        avgRecent > avgOlder + 0.05 ? '<span class="sh-trend up">↑</span>' :
        avgRecent < avgOlder - 0.05 ? '<span class="sh-trend down">↓</span>' :
        '<span class="sh-trend eq">=</span>';

      const pct = Math.round(avgRecent * 100);
      const color = pct >= 80 ? 'var(--green)' : pct >= 60 ? 'var(--amber)' : 'var(--pulse)';
      return `
        <div class="sh-trend-row">
          <span class="sh-trend-icon">${icon}</span>
          <span class="sh-trend-label">${label}</span>
          <span class="sh-trend-pct" style="color:${color}">${pct}%</span>
          ${trend}
        </div>`;
    }).join('');

  return `
    <div class="sh-card fade-in-3">
      <div class="section-label">Recent sessions</div>
      <div class="sh-bars">${bars}</div>
      ${trendRows ? `<div class="section-label" style="margin-top:1rem;">Trend by domain</div>${trendRows}` : ''}
    </div>`;
}

function switchHomeTab(tab, btn) {
  document.querySelectorAll('#bottomNav .bn-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  window.scrollTo(0, 0);
  if (tab === 'spelen')       { renderSpelenTab(); loadHomeStats(); }
  else if (tab === 'speurdokter') renderSpeurdokterTab();
  else if (tab === 'theorie')     renderTheorieTab();
  else if (tab === 'profiel')     renderProfielTab();
}

// ── Init ──
//
// Boot order:
//   1. Kick MDQuestions.load() to warm the IndexedDB cache. When the
//      backend is configured (window.MD_ENV.SUPABASE_URL set), this
//      fetches from /functions/v1/questions and mirrors into
//      window.QUESTIONS so the legacy gameplay code sees fresh content.
//      When offline / unconfigured the bundled QUESTIONS array (already
//      loaded by src/data/questions.js) is kept as-is.
//   2. Render the appropriate first screen.
//
// The UI never waits on the network — load() reads the IDB cache first
// and revalidates in the background, so first paint is instant.

function bootApp() {
  // Kick the question-bank load asynchronously. Right now the legacy
  // gameplay code (game.js, dossier.js, daily.js, …) still reads from
  // window.QUESTIONS, which the bundled src/data/questions.js has
  // already populated synchronously. We DO NOT swap window.QUESTIONS
  // to the server rows yet because the server strips the `correct`
  // field — local grading would break. The cache warmup makes the next
  // refactor batch (which will plumb grading through gradeAttempt())
  // a one-line swap.
  if (window.MDQuestions && typeof window.MDQuestions.load === 'function') {
    window.MDQuestions.load().catch(() => {});
  }

  if (new URLSearchParams(window.location.search).get('admin') === '1') {
    showAdmin();
  } else if (isOnboarded()) {
    showHome();
  } else {
    startOnboarding();
  }
}

bootApp();
