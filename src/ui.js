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
  document.getElementById('factModalEx').textContent = currentFact.ex || '';
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
  const played = document.getElementById('home-played');
  const best   = document.getElementById('home-best');
  const streak = document.getElementById('home-streak');
  if (played) played.textContent = s.played || 0;
  if (best)   best.textContent   = s.best   || '—';
  if (streak) streak.textContent = (s.dayStreak || 0) + '🔥';
  const sub = document.getElementById('favHomeSub');
  if (sub) {
    const n = loadFavourites().length;
    sub.textContent = n === 0 ? 'Nog niets opgeslagen' : `${n} feit${n === 1 ? '' : 'en'} opgeslagen`;
  }
  renderDomainStatsHome();
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
