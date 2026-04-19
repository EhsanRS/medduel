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
  if (typeof G !== 'undefined') {
    if (G.mode === 'blitz' && G.timer) { clearInterval(G.timer); G.timerPaused = true; }
    if (G.nextQTimer) { clearTimeout(G.nextQTimer); G.nextQTimer = null; G.waitingForModal = true; }
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

// ── Combo burst ──
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
