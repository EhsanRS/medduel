// MedDuel — Router & Home screen

function showHome() {
  renderHomeScreen();
  showScreen('home');
  loadHomeStats();

  // Check voor challenge-banner
  const p = new URLSearchParams(window.location.search);
  if (p.get('challenge') && p.get('score')) {
    setTimeout(() => {
      showToast(true,
        `Je bent uitgedaagd! 🏆`,
        `Versla ${p.get('score')} punten — gebruik zo min mogelijk hints.`
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
          <span class="bn-label">Spelen</span>
        </button>
        <button class="bn-tab" onclick="switchHomeTab('speurdokter',this)">
          <span class="bn-icon">🔍</span>
          <span class="bn-label">Speurder</span>
        </button>
        <button class="bn-tab" onclick="switchHomeTab('theorie',this)">
          <span class="bn-icon">📖</span>
          <span class="bn-label">Theorie</span>
        </button>
        <button class="bn-tab" onclick="switchHomeTab('profiel',this)">
          <span class="bn-icon">👤</span>
          <span class="bn-label">Profiel</span>
        </button>
      </nav>
    </div>`;
  renderSpelenTab();
}

function renderSpelenTab() {
  document.getElementById('htab').innerHTML = `
    <div class="home-hero fade-in">
      <div class="hero-left">
        <div class="hero-eyebrow">${getGreeting() || 'medische trivia'}</div>
        <h1 class="logo">Med<em>Duel</em></h1>
      </div>
      <div class="hero-streak-badge" id="heroStreak">0🔥</div>
    </div>

    <div class="section-label fade-in-2">Vandaag</div>
    ${renderDailyHomeCard()}
    ${renderOpenPatientCard()}

    <div class="section-label fade-in-3">Kies modus</div>

    <div class="mode-hero-card fade-in-3" onclick="startGame('blitz')">
      <div class="mhc-tag">⚡ Populairste modus</div>
      <div class="mhc-name">Blitz</div>
      <div class="mhc-sub">60 seconden · Zo snel mogelijk</div>
      <div class="mhc-cta">Start nu →</div>
    </div>

    <div class="mode-grid fade-in-3">
      <div class="mode-card classic" onclick="startGame('classic')">
        <div class="mode-icon-wrap">🎯</div>
        <div class="mode-info">
          <span class="mode-name">Classic</span>
          <span class="mode-sub">10 vragen</span>
        </div>
      </div>
      <div class="mode-card survival" onclick="startGame('survival')">
        <div class="mode-icon-wrap">❤️</div>
        <div class="mode-info">
          <span class="mode-name">Survival</span>
          <span class="mode-sub">3 levens</span>
        </div>
      </div>
      <div class="mode-card dossier" onclick="startDossier()">
        <div class="mode-icon-wrap">🗂️</div>
        <div class="mode-info">
          <span class="mode-name">Dossier</span>
          <span class="mode-sub">Daag anderen uit</span>
        </div>
      </div>
      <div class="mode-card learn" onclick="showLearnSetup()">
        <div class="mode-icon-wrap">📖</div>
        <div class="mode-info">
          <span class="mode-name">Leer-modus</span>
          <span class="mode-sub">Geen tijdsdruk</span>
        </div>
      </div>
      <div class="mode-card spoedkamer" onclick="startSpoedkamer()">
        <div class="mode-icon-wrap">🚨</div>
        <div class="mode-info">
          <span class="mode-name">Spoedkamer</span>
          <span class="mode-sub">10 patiënten · 15s per vraag</span>
        </div>
      </div>
    </div>

    <div class="section-label fade-in-4">Domein</div>
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
    { key: 'nephro',   icon: '🫘', name: 'Nefro',    color: '#DBEAFE' },
    { key: 'psych',    icon: '🧩', name: 'Psych',    color: '#FDF4FF' },
    { key: 'derm',     icon: '🩹', name: 'Derm',     color: '#FCE7F3' },
    { key: 'rheum',    icon: '🦴', name: 'Reuma',    color: '#FEF9C3' },
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
      ${n ? `<span class="dt-count">${n}v</span>` : ''}
    </div>`;
  }).join('');

  return `<div class="cat-wrap fade-in-4" id="catPills">
    <div class="cat-pill cat-all active" data-cat="all" onclick="toggleCat('all',this)">
      Alle domeinen
    </div>
    <div class="domain-grid">${tiles}</div>
  </div>`;
}

function renderTheorieTab() {
  document.getElementById('htab').innerHTML = `
    <div class="htab-header fade-in">
      <h2 class="htab-title">Theorieboek</h2>
      <p class="htab-sub">Klinische overzichten per thema</p>
    </div>
    <div class="th-home-grid fade-in-1">
      <div class="th-home-pill" onclick="openTheory('dementie')"><span class="th-home-emoji">🧠</span><span class="th-home-name">Dementie­syndromen</span></div>
      <div class="th-home-pill" onclick="openTheory('ecg')"><span class="th-home-emoji">📊</span><span class="th-home-name">ECG Basis</span></div>
      <div class="th-home-pill" onclick="openTheory('anemie')"><span class="th-home-emoji">🩸</span><span class="th-home-name">Anemie</span></div>
      <div class="th-home-pill" onclick="openTheory('meningitis')"><span class="th-home-emoji">🔬</span><span class="th-home-name">Meningitis & LP</span></div>
      <div class="th-home-pill" onclick="openTheory('hartfalen')"><span class="th-home-emoji">❤️</span><span class="th-home-name">Hartfalen</span></div>
      <div class="th-home-pill" onclick="openTheory('antibiotica')"><span class="th-home-emoji">💊</span><span class="th-home-name">Antibiotica</span></div>
      <div class="th-home-pill" onclick="openTheory('stolling')"><span class="th-home-emoji">🩹</span><span class="th-home-name">Stolling & Antistolling</span></div>
      <div class="th-home-pill" onclick="openTheory('diabetes')"><span class="th-home-emoji">🍬</span><span class="th-home-name">Diabetes Mellitus</span></div>
      <div class="th-home-pill" onclick="openTheory('schildklier')"><span class="th-home-emoji">🦋</span><span class="th-home-name">Schildklier</span></div>
      <div class="th-home-pill" onclick="openTheory('sepsis')"><span class="th-home-emoji">🚨</span><span class="th-home-name">Sepsis & Shock</span></div>
      <div class="th-home-pill" onclick="openTheory('copd')"><span class="th-home-emoji">🫁</span><span class="th-home-name">COPD</span></div>
      <div class="th-home-pill" onclick="openTheory('longembolie')"><span class="th-home-emoji">🩺</span><span class="th-home-name">Longembolie</span></div>
    </div>`;
}

function renderProfielTab() {
  const name = (typeof loadName === 'function' && loadName()) || '';
  document.getElementById('htab').innerHTML = `
    <div class="htab-header fade-in">
      <h2 class="htab-title">${name ? `Hey, ${name}` : 'Mijn profiel'}</h2>
      <p class="htab-sub">Jouw voortgang & statistieken</p>
    </div>
    <div id="xpWrap" class="fade-in-1"></div>
    <div class="fav-home-card fade-in-2" onclick="startFavourites()">
      <div class="fav-home-icon">★</div>
      <div class="fav-home-info">
        <span class="fav-home-name">Favorieten</span>
        <span class="fav-home-sub" id="favHomeSub">Nog niets opgeslagen</span>
      </div>
      <span style="font-size:18px;color:var(--amber);opacity:0.5;">→</span>
    </div>
    <div id="weakHomeCard" class="weak-home-card fade-in-2" onclick="startWeakMode()" style="display:none;">
      <div class="weak-home-icon">🎯</div>
      <div class="fav-home-info">
        <span class="fav-home-name">Train je Zwaktes</span>
        <span class="fav-home-sub" id="weakHomeSub">Laden...</span>
      </div>
      <span style="font-size:18px;color:var(--pulse);opacity:0.7;">→</span>
    </div>
    <div id="domainStatsWrap" class="fade-in-2" style="display:none;margin-top:1rem;margin-bottom:1rem;"></div>
    <div class="adm-home-card fade-in-3" onclick="showAdmin()">
      <span style="font-size:20px;">🗂️</span>
      <div class="fav-home-info">
        <span class="fav-home-name">Vragenbank</span>
        <span class="fav-home-sub">${QUESTIONS.length} vragen · beheer &amp; overzicht</span>
      </div>
      <span style="font-size:18px;color:var(--ink-light);opacity:0.5;">→</span>
    </div>`;
  renderXPHome();
  const sub = document.getElementById('favHomeSub');
  if (sub) {
    const n = loadFavourites().length;
    sub.textContent = n === 0 ? 'Nog niets opgeslagen' : `${n} feit${n === 1 ? '' : 'en'} opgeslagen`;
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
  const urgency = days === 0 ? 'Wacht op de IC...'
    : days === 1 ? 'Dag 1. Nog steeds geen diagnose.'
    : `Dag ${days}. De familie vraagt om nieuws.`;
  const qShort = p.q.q.length > 85 ? p.q.q.slice(0, 85) + '…' : p.q.q;
  return `
    <div class="open-patient-card fade-in-2" onclick="startPatientReplay()">
      <div class="opc-top">
        <span class="opc-icon">${icon}</span>
        <div class="opc-meta">
          <span class="opc-label">Jouw patiënt</span>
          <span class="opc-urgency">${urgency}</span>
        </div>
        <span class="opc-days${days >= 2 ? ' urgent' : ''}">${days === 0 ? 'vandaag' : days + 'd'}</span>
      </div>
      <div class="opc-q">${qShort}</div>
      ${p.wrongLabel ? `<div class="opc-wrong">Jij stelde: <strong>${p.wrongLabel}</strong></div>` : ''}
      <div class="opc-cta">Herstel de diagnose →</div>
    </div>`;
}

function startPatientReplay() {
  const p = loadOpenPatient();
  if (!p) return;
  const q = p.q;
  const letters = ['A', 'B', 'C', 'D'];
  const answersHTML = q.type === 'truefalse'
    ? `<div class="tf-wrap">
        <button class="tf-btn true-btn"  onclick="answerPatient(true)">✓ Waar</button>
        <button class="tf-btn false-btn" onclick="answerPatient(false)">✗ Niet Waar</button>
       </div>`
    : q.a.map((ans, i) =>
        `<button class="ans-btn" onclick="answerPatient(${i})" data-i="${i}">
          <span class="ans-key">${letters[i]}</span>${ans}
         </button>`
      ).join('');

  document.getElementById('app').innerHTML = `
    <div id="patient-replay" class="screen active">
      <div class="pr-header">
        <button class="quit-btn" onclick="showHome()">✕ Sluiten</button>
        <span class="pr-title">🏥 Herstel je patiënt</span>
      </div>
      ${p.wrongLabel ? `<div class="pr-context fade-in"><div class="pr-wrong-badge">Jij stelde eerder: <strong>${p.wrongLabel}</strong></div></div>` : ''}
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

  const correctLabel = q.type === 'truefalse' ? (q.c ? 'Waar' : 'Niet waar') : q.a[q.c];
  const screen = document.getElementById('patient-replay');
  if (!screen) return;

  const div = document.createElement('div');
  div.style.padding = '0 1rem 2rem';
  div.className = 'fade-in';

  if (ok) {
    clearOpenPatient();
    div.innerHTML = `
      <div class="pr-saved">✓ Patiënt gered! Diagnose correct.</div>
      <button class="btn-primary" style="margin-top:1rem;width:100%" onclick="showHome()">Terug naar huis →</button>`;
  } else {
    div.innerHTML = `
      <div class="pr-fail">
        <div class="pr-fail-head">Helaas. Correct: <strong>${correctLabel}</strong></div>
        ${q.ex ? `<div class="pr-fail-ex">${q.ex}</div>` : ''}
      </div>
      <button class="btn-secondary" style="margin-top:1rem;width:100%" onclick="showHome()">Terug →</button>`;
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
      <div class="section-label">Recente sessies</div>
      <div class="sh-bars">${bars}</div>
      ${trendRows ? `<div class="section-label" style="margin-top:1rem;">Trend per domein</div>${trendRows}` : ''}
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
if (new URLSearchParams(window.location.search).get('admin') === '1') {
  showAdmin();
} else if (isOnboarded()) {
  showHome();
} else {
  startOnboarding();
}
