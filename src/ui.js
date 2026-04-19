// MedDuel — Gedeelde UI utilities

// ── Toast ──
function showToast(ok, head, body) {
  const t = document.getElementById('toast');
  document.getElementById('toastHead').textContent = ok ? '✓ ' + head : '✗ ' + head;
  document.getElementById('toastBody').textContent = body || '';
  t.className = 'toast show ' + (ok ? 'correct-toast' : 'wrong-toast');
}

function hideToast() {
  document.getElementById('toast').className = 'toast';
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
