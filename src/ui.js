// MedDuel — Gedeelde UI utilities

let currentFact = null;

// ── Toast ──
function showToast(ok, head, body, fact) {
  currentFact = fact || null;
  const t = document.getElementById('toast');
  document.getElementById('toastHead').textContent = ok ? '✓ ' + head : '✗ ' + head;
  document.getElementById('toastBody').textContent = body || '';
  t.className = 'toast show ' + (ok ? 'correct-toast' : 'wrong-toast');
}

function hideToast() {
  document.getElementById('toast').className = 'toast';
}

// ── Favourites ──
function loadFavourites() {
  try { return JSON.parse(localStorage.getItem('md_fav') || '[]'); } catch { return []; }
}
function saveFavourites(favs) {
  try { localStorage.setItem('md_fav', JSON.stringify(favs)); } catch {}
}
function isFavourite(q) {
  return loadFavourites().some(f => f.q === q.q);
}
function toggleFavourite(e) {
  if (e) e.stopPropagation();
  if (!currentFact) return;
  const favs = loadFavourites();
  const idx = favs.findIndex(f => f.q === currentFact.q);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push({ q: currentFact.q, ex: currentFact.ex, dl: currentFact.dl, domain: currentFact.domain, saved: Date.now() });
  saveFavourites(favs);
  updateStarBtn();
  const btn = document.getElementById('factStarBtn');
  if (btn) { btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop'); }
}
function updateStarBtn() {
  const btn = document.getElementById('factStarBtn');
  if (!btn || !currentFact) return;
  const saved = isFavourite(currentFact);
  btn.textContent = saved ? '★' : '☆';
  btn.classList.toggle('starred', saved);
}

// ── Fact modal ──
function openFactModal() {
  if (!currentFact) return;
  // Pause trivia timer / cancel auto-advance
  if (typeof G !== 'undefined' && G.active) {
    if (G.mode === 'blitz' && G.timer) { clearInterval(G.timer); G.timerPaused = true; }
    if (G.nextQTimer) { clearTimeout(G.nextQTimer); G.nextQTimer = null; G.waitingForModal = true; }
  }
  // Cancel dossier auto-advance
  if (typeof D !== 'undefined' && D.nextQTimer) {
    clearTimeout(D.nextQTimer); D.nextQTimer = null; D.waitingForModal = true;
  }
  // Cancel daily auto-advance
  if (typeof DC !== 'undefined' && DC.nextQTimer) {
    clearTimeout(DC.nextQTimer); DC.nextQTimer = null; DC.waitingForModal = true;
  }
  document.getElementById('factModalDomain').textContent = currentFact.dl || '';
  document.getElementById('factModalQ').textContent = currentFact.q || '';
  const exEl = document.getElementById('factModalEx');
  if (currentFact.wiki) {
    const w = currentFact.wiki;
    exEl.innerHTML = [
      w.kern        && `<div class="wiki-block"><div class="wiki-label">Kern</div><p>${w.kern}</p></div>`,
      w.mechanisme  && `<div class="wiki-block"><div class="wiki-label">Hoe ontstaat het?</div><p>${w.mechanisme}</p></div>`,
      w.onderscheid && `<div class="wiki-block"><div class="wiki-label">Onderscheid</div><p>${w.onderscheid}</p></div>`,
      w.therapie    && `<div class="wiki-block"><div class="wiki-label">Behandeling</div><p>${w.therapie}</p></div>`,
    ].filter(Boolean).join('');
  } else {
    exEl.className = 'fact-explanation';
    exEl.textContent = currentFact.ex || '';
  }
  // Theory link
  const theoryId = typeof getRelatedTheory === 'function' ? getRelatedTheory(currentFact) : null;
  if (theoryId && THEORY_TOPICS[theoryId]) {
    const t = THEORY_TOPICS[theoryId];
    exEl.innerHTML += `<button class="fact-theory-btn" onclick="openTheory('${theoryId}')">📖 Bekijk theorie: ${t.title} →</button>`;
  }
  updateStarBtn();
  document.getElementById('factModal').classList.add('open');
}

function closeFactModal() {
  document.getElementById('factModal').classList.remove('open');
  hideToast();
  // Resume dossier
  if (typeof D !== 'undefined' && D.waitingForModal) {
    D.waitingForModal = false;
    advanceDossier();
    return;
  }
  // Resume daily
  if (typeof DC !== 'undefined' && DC.waitingForModal) {
    DC.waitingForModal = false;
    if (DC.answered >= 10) { dcEnd(); return; }
    dcLoadQ();
    return;
  }
  // Resume trivia
  if (typeof G === 'undefined' || !G.active) return;
  if (G.timerPaused && G.timeLeft > 0) {
    G.timerPaused = false;
    G.timer = setInterval(() => { G.timeLeft--; updateTimer(); if (G.timeLeft <= 0) endGame(); }, 1000);
  }
  if (G.waitingForModal) {
    G.waitingForModal = false;
    if (G.pendingEndGame) { G.pendingEndGame = false; endGame(); return; }
    if (G.mode === 'classic' && G.answered >= 10) { endGame(); return; }
    if (G.mode === 'blitz' && G.timeLeft <= 0) return;
    if (G.mode === 'survival' && G.queue.length === 0) G.queue = shuffleArr(getPool());
    loadQ();
  }
}

// ── Keyboard shortcuts: A/B/C/D en 1/2/3/4 = antwoord kiezen ──
document.addEventListener('keydown', function(e) {
  if (document.getElementById('factModal').classList.contains('open')) return;
  if (document.getElementById('toast').classList.contains('show')) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON') return;

  const key = e.key.toUpperCase();
  const idx = (key === 'A' || key === '1') ? 0
            : (key === 'B' || key === '2') ? 1
            : (key === 'C' || key === '3') ? 2
            : (key === 'D' || key === '4') ? 3
            : null;

  if (idx === null) return;

  // Trivia
  if (typeof G !== 'undefined' && G.active && !G.locked && G.currentQ) {
    e.preventDefault();
    const q = G.currentQ;
    if (q.type === 'truefalse') {
      if (idx === 0) { const btn = document.querySelector('.true-btn');  if (btn && !btn.disabled) answerTF(true,  btn); }
      if (idx === 1) { const btn = document.querySelector('.false-btn'); if (btn && !btn.disabled) answerTF(false, btn); }
    } else {
      const btn = document.querySelector(`.ans-btn[data-i="${idx}"]`);
      if (btn && !btn.disabled) answerMC(idx, btn);
    }
    return;
  }

  // Dossier
  if (typeof D !== 'undefined' && D.cases && !D.locked) {
    const btn = document.querySelector(`#d-choices .ans-btn[data-i="${idx}"]`);
    if (btn && !btn.disabled) { e.preventDefault(); dossierAnswer(idx, btn); }
    return;
  }

  // Daily Challenge
  if (typeof DC !== 'undefined' && DC.active && !DC.locked && DC.currentQ) {
    e.preventDefault();
    const q = DC.currentQ;
    if (q.type === 'truefalse') {
      if (idx === 0) { const btn = document.querySelector('#dc-answers .true-btn');  if (btn && !btn.disabled) dcAnswerTF(true,  btn); }
      if (idx === 1) { const btn = document.querySelector('#dc-answers .false-btn'); if (btn && !btn.disabled) dcAnswerTF(false, btn); }
    } else {
      const btn = document.querySelector(`#dc-answers .ans-btn[data-i="${idx}"]`);
      if (btn && !btn.disabled) dcAnswerMC(idx, btn);
    }
  }
});

// ── Keyboard shortcut: spatie = volgende vraag ──
document.addEventListener('keydown', function(e) {
  if (e.code !== 'Space') return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON') return;

  const modalOpen   = document.getElementById('factModal').classList.contains('open');
  const toastActive = document.getElementById('toast').classList.contains('show');

  if (modalOpen) { e.preventDefault(); closeFactModal(); return; }
  if (!toastActive) return;
  e.preventDefault();

  // Trivia
  if (typeof G !== 'undefined' && G.active && G.nextQTimer) {
    clearTimeout(G.nextQTimer); G.nextQTimer = null;
    hideToast();
    if (G.pendingEndGame) { G.pendingEndGame = false; endGame(); return; }
    if (G.mode === 'classic' && G.answered >= 10) { endGame(); return; }
    if (G.mode === 'blitz' && G.timeLeft <= 0) return;
    if (G.mode === 'survival' && G.queue.length === 0) G.queue = shuffleArr(getPool());
    loadQ();
    return;
  }
  // Dossier
  if (typeof D !== 'undefined' && D.nextQTimer) {
    clearTimeout(D.nextQTimer); D.nextQTimer = null;
    hideToast(); advanceDossier();
    return;
  }
  // Daily
  if (typeof DC !== 'undefined' && DC.nextQTimer) {
    clearTimeout(DC.nextQTimer); DC.nextQTimer = null;
    hideToast();
    if (DC.answered >= 10) { dcEnd(); return; }
    dcLoadQ();
  }
});


function showCombo(num, label) {
  const el = document.getElementById('comboBurst');
  document.getElementById('comboNum').textContent = num;
  document.getElementById('comboLabel').textContent = label;
  el.className = 'combo-burst show';
  setTimeout(() => { el.className = 'combo-burst'; }, 1000);
}

// ── Screen router ──
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  window.scrollTo(0, 0);
}

// ── Stats (localStorage) ──
function loadStats() {
  try {
    return JSON.parse(localStorage.getItem('md_stats') || '{}');
  } catch { return {}; }
}

function saveStats(patch) {
  try {
    const s = loadStats();
    const updated = { ...s, ...patch };
    localStorage.setItem('md_stats', JSON.stringify(updated));
    return updated;
  } catch { return {}; }
}

function loadHomeStats() {
  const s = loadStats();

  function countUp(el, target, suffix) {
    if (!el) return;
    const n = parseInt(target, 10);
    const suf = suffix || '';
    if (isNaN(n) || n === 0) { el.textContent = (isNaN(n) ? target : 0) + suf; return; }
    const dur = 600, t0 = performance.now();
    const step = now => {
      const prog = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      el.textContent = Math.round(ease * n) + (prog >= 1 ? suf : '');
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  countUp(document.getElementById('home-played'), s.played || 0);
  const bestEl = document.getElementById('home-best');
  if (bestEl) bestEl.textContent = s.best || '—';
  countUp(document.getElementById('home-streak'), s.dayStreak || 0, '🔥');
  countUp(document.getElementById('heroStreak'),  s.dayStreak || 0, '🔥');

  const sub = document.getElementById('favHomeSub');
  if (sub) {
    const n = loadFavourites().length;
    sub.textContent = n === 0 ? 'Nog niets opgeslagen' : `${n} feit${n === 1 ? '' : 'en'} opgeslagen`;
  }
  renderXPHome();
  renderDomainStatsHome();
  renderWeakHome();
}

// ── Zwakke vragen ──
function loadWeak() {
  try { return JSON.parse(localStorage.getItem('md_weak') || '{}'); } catch { return {}; }
}
function saveWeak(w) {
  try { localStorage.setItem('md_weak', JSON.stringify(w)); } catch {}
}
function recordWeak(q) {
  const w = loadWeak();
  const key = q.q.slice(0, 80);
  w[key] = (w[key] || 0) + 2;
  saveWeak(w);
}
function resolveWeak(q) {
  const w = loadWeak();
  const key = q.q.slice(0, 80);
  if (!w[key]) return;
  w[key]--;
  if (w[key] <= 0) delete w[key];
  saveWeak(w);
}
function getWeakCount() {
  return Object.keys(loadWeak()).length;
}
function getWeakQuestions() {
  const w = loadWeak();
  return Object.entries(w)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => QUESTIONS.find(q => q.q.slice(0, 80) === key))
    .filter(Boolean)
    .slice(0, 20);
}
function renderWeakHome() {
  const card = document.getElementById('weakHomeCard');
  if (!card) return;
  const n = getWeakCount();
  if (n === 0) { card.style.display = 'none'; return; }
  card.style.display = 'flex';
  const sub = document.getElementById('weakHomeSub');
  if (sub) sub.textContent = `${n} vraag${n === 1 ? '' : 'en'} om te oefenen`;
}

// ── XP & Rangen ──
const RANKS = [
  { min: 0,    label: 'Pre-med',      icon: '📚', color: '#8B7355' },
  { min: 100,  label: 'Co-assistent', icon: '🩺', color: '#1B5FA8' },
  { min: 350,  label: 'ANIOS',        icon: '⚕️', color: '#1A7A4A' },
  { min: 800,  label: 'AIOS',         icon: '🔬', color: '#D4820A' },
  { min: 1800, label: 'Specialist',   icon: '🏥', color: '#E8410A' },
  { min: 4000, label: 'Professor',    icon: '🎓', color: '#6B21A8' },
];

function loadXP() { try { return parseInt(localStorage.getItem('md_xp') || '0', 10); } catch { return 0; } }
function saveXP(xp) { try { localStorage.setItem('md_xp', String(xp)); } catch {} }
function getRank(xp) { return [...RANKS].reverse().find(r => xp >= r.min) || RANKS[0]; }
function getNextRank(xp) { return RANKS.find(r => r.min > xp) || null; }

function awardXP(amount) {
  const prev = loadXP();
  const next = prev + amount;
  saveXP(next);
  if (getRank(next).label !== getRank(prev).label) {
    const rank = getRank(next);
    setTimeout(() => {
      const el = document.getElementById('rankupOverlay');
      if (el) {
        document.getElementById('rankupIcon').textContent = rank.icon;
        document.getElementById('rankupLabel').textContent = rank.label;
        el.classList.add('show');
        navigator.vibrate && navigator.vibrate([30, 60, 100]);
        setTimeout(() => el.classList.remove('show'), 2800);
      }
    }, 600);
  }
  return next;
}

function renderXPHome() {
  const wrap = document.getElementById('xpWrap');
  if (!wrap) return;
  const xp = loadXP();
  const rank = getRank(xp);
  const next = getNextRank(xp);
  const pct = next ? Math.round((xp - rank.min) / (next.min - rank.min) * 100) : 100;
  wrap.innerHTML = `
    <div class="xp-card">
      <div class="xp-rank-row">
        <span class="xp-icon">${rank.icon}</span>
        <div class="xp-rank-info">
          <div class="xp-rank-top">
            <span class="xp-rank-label" style="color:${rank.color}">${rank.label}</span>
            <span class="xp-total">${xp} XP</span>
          </div>
          <div class="xp-bar-bg">
            <div class="xp-bar-fill" style="width:${pct}%;background:${rank.color}"></div>
          </div>
          <div class="xp-next-label">${next ? `${next.min - xp} XP naar ${next.icon} ${next.label}` : 'Maximale rang bereikt! 🎓'}</div>
        </div>
      </div>
    </div>`;
}

// ── Domein statistieken ──
const DOMAIN_META = [
  { key: 'cardio',   label: 'Cardiologie',   icon: '🫀' },
  { key: 'neuro',    label: 'Neurologie',     icon: '🧠' },
  { key: 'pharma',   label: 'Farmacologie',   icon: '💊' },
  { key: 'infectio', label: 'Infectiologie',  icon: '🦠' },
  { key: 'lab',      label: 'Laboratorium',   icon: '🧪' },
];

function loadDomainStats() {
  try { return JSON.parse(localStorage.getItem('md_domain_stats') || '{}'); } catch { return {}; }
}

function mergeDomainStats(patch) {
  try {
    const s = loadDomainStats();
    for (const [domain, { c, t }] of Object.entries(patch)) {
      if (!s[domain]) s[domain] = { c: 0, t: 0 };
      s[domain].c += c;
      s[domain].t += t;
    }
    localStorage.setItem('md_domain_stats', JSON.stringify(s));
  } catch {}
}

function renderDomainStatsHome() {
  const wrap = document.getElementById('domainStatsWrap');
  if (!wrap) return;
  const s = loadDomainStats();
  const hasAny = Object.values(s).some(d => d.t > 0);
  if (!hasAny) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  const rows = DOMAIN_META
    .filter(({ key }) => s[key] && s[key].t > 0)
    .map(({ key, label, icon }) => {
      const d = s[key];
      const pct = Math.round(d.c / d.t * 100);
      const color = pct >= 80 ? 'var(--green)' : pct >= 60 ? 'var(--amber)' : 'var(--pulse)';
      return `
        <div class="domain-stat-row">
          <span class="domain-stat-icon">${icon}</span>
          <div class="domain-stat-info">
            <div class="domain-stat-top">
              <span class="domain-stat-label">${label}</span>
              <span class="domain-stat-pct" style="color:${color}">${pct}%</span>
            </div>
            <div class="domain-stat-bar-bg">
              <div class="domain-stat-bar-fill" style="width:${pct}%;background:${color}"></div>
            </div>
          </div>
        </div>`;
    });
  wrap.innerHTML = `<div class="section-label">Jouw score per domein</div>` + rows.join('');
}

// ── Helpers ──
function shuffleArr(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function gradeFromPct(pct) {
  const grades = [
    [90, '🏆 Expert niveau',       '#1A7A4A'],
    [70, '⭐ Uitstekend',          '#1B5FA8'],
    [50, '👍 Goed gedaan',         '#D4820A'],
    [30, '📚 Bijna!',              '#E8410A'],
    [0,  '💪 Volgende keer beter', '#4A3F35'],
  ];
  return grades.find(([min]) => pct >= min);
}
