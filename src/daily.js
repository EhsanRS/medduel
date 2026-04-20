// MedDuel — Daily Challenge

const DAILY_LAUNCH = new Date('2026-04-19');

function getDailyNum() {
  const today = new Date(); today.setHours(0,0,0,0);
  const launch = new Date(DAILY_LAUNCH); launch.setHours(0,0,0,0);
  return Math.max(1, Math.floor((today - launch) / 86400000) + 1);
}

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// Mulberry32 deterministic PRNG
function seededShuffle(arr, seed) {
  const rand = (() => {
    let s = seed >>> 0;
    return () => {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  })();
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDailyPool() {
  const seed = parseInt(getTodayStr().replace(/-/g, ''), 10);
  return seededShuffle(QUESTIONS, seed).slice(0, 10);
}

function loadDailyRecord() {
  try { return JSON.parse(localStorage.getItem('md_daily') || 'null'); } catch { return null; }
}

function saveDailyRecord(r) {
  try { localStorage.setItem('md_daily', JSON.stringify(r)); } catch {}
}

function getDailyStreak() {
  try { return JSON.parse(localStorage.getItem('md_dstreak') || '{"n":0,"last":""}'); } catch { return {n:0,last:''}; }
}

function tickDailyStreak(today) {
  const s = getDailyStreak();
  const yd = new Date(); yd.setDate(yd.getDate() - 1);
  const yStr = `${yd.getFullYear()}-${String(yd.getMonth()+1).padStart(2,'0')}-${String(yd.getDate()).padStart(2,'0')}`;
  const n = s.last === today ? s.n : (s.last === yStr ? s.n + 1 : 1);
  try { localStorage.setItem('md_dstreak', JSON.stringify({n, last: today})); } catch {}
  return n;
}

let DC = {};

function startDaily() {
  const today = getTodayStr();
  const rec = loadDailyRecord();
  if (rec && rec.date === today) { renderDailyDone(rec); showScreen('daily-done'); return; }

  DC = {
    today,
    queue: getDailyPool(),
    score: 0, streak: 0, maxStreak: 0,
    correct: 0, wrong: 0, answered: 0,
    locked: false, active: true,
    nextQTimer: null, waitingForModal: false,
    dotStates: Array(10).fill('pending'),
    answers: [], domainStatsByKey: {},
  };

  renderDailyGame();
  showScreen('daily');
  dcLoadQ();
}

function renderDailyGame() {
  const dateStr = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' });
  document.getElementById('app').innerHTML = `
    <div id="daily" class="screen active">
      <div style="max-width:480px;margin:0 auto;padding:0 1.25rem 3rem;">
        <div class="game-nav">
          <button class="quit-btn" onclick="quitDaily()">✕ Stop</button>
          <div class="daily-badge">📅 Dag #${getDailyNum()} · ${dateStr}</div>
        </div>
        <div class="hud">
          <div class="hud-item">
            <span class="hud-val" id="dc-score">0</span>
            <span class="hud-lbl">Punten</span>
          </div>
          <div class="hud-item" style="text-align:center;">
            <span class="hud-val" id="dc-qnum">1/10</span>
            <span class="hud-lbl">Vraag</span>
          </div>
          <div class="hud-item" style="text-align:right;">
            <span class="hud-val" id="dc-streak">×0</span>
            <span class="hud-lbl">Streak</span>
          </div>
        </div>
        <div class="progress-dots" id="dc-dots"></div>
        <div class="q-card">
          <div id="dc-type-tag" class="q-type-tag diagnose">Diagnose</div>
          <div class="q-domain" id="dc-domain"></div>
          <div class="q-text" id="dc-text"></div>
        </div>
        <div class="answers-wrap" id="dc-answers"></div>
      </div>
    </div>`;
  dcRenderDots();
}

function dcRenderDots() {
  const el = document.getElementById('dc-dots');
  if (!el) return;
  el.innerHTML = DC.dotStates.map((s, i) =>
    `<div class="dot${s==='done'?' done':s==='wrong'?' wrong-dot':s==='current'?' current':''}" id="dcd-${i}"></div>`
  ).join('');
}

function dcUpdateDot(idx, state) {
  DC.dotStates[idx] = state;
  const el = document.getElementById('dcd-' + idx);
  if (el) el.className = 'dot' + (state==='done'?' done':state==='wrong'?' wrong-dot':'');
}

function dcUpdateHUD() {
  const sv = document.getElementById('dc-score');
  const stv = document.getElementById('dc-streak');
  const qv = document.getElementById('dc-qnum');
  if (sv)  sv.textContent  = DC.score;
  if (stv) stv.textContent = '×' + DC.streak;
  if (qv)  qv.textContent  = Math.min(DC.answered + 1, 10) + '/10';
}

function dcLoadQ() {
  if (!DC.active || DC.answered >= 10) return;
  const q = DC.queue[DC.answered];
  DC.currentQ = q;
  DC.locked = false;

  dcUpdateDot(DC.answered, 'current');

  const typeMap = { diagnose:['Diagnose','diagnose'], truefalse:['Waar of Niet?','truefalse'], pharma:['Welk Medicijn?','pharma'], lab:['Lab','lab'] };
  const [label, cls] = typeMap[q.type] || typeMap.diagnose;
  const tag = document.getElementById('dc-type-tag');
  if (tag) { tag.textContent = label; tag.className = 'q-type-tag ' + cls; }

  const domain = document.getElementById('dc-domain');
  const qtext  = document.getElementById('dc-text');
  if (domain) domain.textContent = q.dl;
  if (qtext)  qtext.textContent  = q.q;

  const wrap = document.getElementById('dc-answers');
  if (!wrap) return;

  if (q.type === 'truefalse') {
    wrap.innerHTML = `
      <div class="tf-wrap">
        <button class="tf-btn true-btn"  onclick="dcAnswerTF(true,this)">✓ Waar</button>
        <button class="tf-btn false-btn" onclick="dcAnswerTF(false,this)">✗ Niet Waar</button>
      </div>`;
  } else {
    const letters = ['A','B','C','D'];
    wrap.innerHTML = q.a.map((ans, i) =>
      `<button class="ans-btn" onclick="dcAnswerMC(${i},this)" data-i="${i}">
        <span class="ans-key">${letters[i]}</span>${ans}
      </button>`
    ).join('');
  }
  dcUpdateHUD();
}

function dcAnswerMC(idx, btn) {
  if (DC.locked) return;
  DC.locked = true;
  const q = DC.currentQ;
  const ok = idx === q.c;
  document.querySelectorAll('#dc-answers .ans-btn').forEach(b => {
    b.disabled = true;
    if (parseInt(b.dataset.i) === q.c) b.classList.add('correct');
  });
  if (!ok) btn.classList.add('wrong');
  dcProcess(ok, q);
}

function dcAnswerTF(val, btn) {
  if (DC.locked) return;
  DC.locked = true;
  const q = DC.currentQ;
  const ok = val === q.c;
  document.querySelectorAll('.tf-btn').forEach(b => b.disabled = true);
  btn.classList.add(ok ? 'correct' : 'wrong');
  if (!ok) {
    document.querySelectorAll('.tf-btn').forEach(b => {
      if ((b.classList.contains('true-btn') && q.c) || (b.classList.contains('false-btn') && !q.c))
        b.classList.add('correct');
    });
  }
  dcProcess(ok, q);
}

function dcProcess(ok, q) {
  const dotIdx = DC.answered;
  DC.answers.push(ok);
  DC.answered++;

  if (!DC.domainStatsByKey[q.domain]) DC.domainStatsByKey[q.domain] = { c: 0, t: 0 };
  DC.domainStatsByKey[q.domain].t++;

  if (ok) {
    DC.correct++;
    DC.streak++;
    DC.maxStreak = Math.max(DC.maxStreak, DC.streak);
    DC.domainStatsByKey[q.domain].c++;
    awardXP(DC.streak >= 5 ? 15 : DC.streak >= 3 ? 13 : 10);
    const bonus = DC.streak >= 5 ? 30 : DC.streak >= 3 ? 20 : 10;
    DC.score += bonus;
    dcUpdateDot(dotIdx, 'done');
    if (DC.streak === 3)  showCombo('3×',  'Streak!');
    if (DC.streak === 5)  showCombo('5×',  'On fire!');
    if (DC.streak === 10) showCombo('10×', 'Legendair!');
    showToast(true, `+${bonus} punten`, q.ex, q);
  } else {
    DC.wrong++;
    DC.streak = 0;
    dcUpdateDot(dotIdx, 'wrong');
    showToast(false, 'Niet correct', q.ex, q);
  }

  dcUpdateHUD();

  DC.nextQTimer = setTimeout(() => {
    DC.nextQTimer = null;
    hideToast();
    if (DC.answered >= 10) { dcEnd(); return; }
    dcLoadQ();
  }, 2400);
}

function dcEnd() {
  DC.active = false;
  hideToast();

  const today = DC.today;
  const dayStreak = tickDailyStreak(today);
  const rec = { date: today, score: DC.score, correct: DC.correct, wrong: DC.wrong, answers: DC.answers, dayStreak };
  saveDailyRecord(rec);

  saveStats({
    played: (loadStats().played || 0) + 1,
    best: Math.max(loadStats().best || 0, DC.score),
    dayStreak,
  });
  mergeDomainStats(DC.domainStatsByKey || {});

  renderDailyDone(rec);
  showScreen('daily-done');
}

function renderDailyDone(rec) {
  const acc = rec.correct + rec.wrong > 0 ? Math.round(rec.correct / (rec.correct + rec.wrong) * 100) : 0;
  const [, gl, gc] = gradeFromPct(acc);
  const grid = rec.answers.map(a => a ? '🟢' : '🔴').join('');
  const isToday = rec.date === getTodayStr();
  const dateStr = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

  document.getElementById('app').innerHTML = `
    <div id="daily-done" class="screen active">
      <div style="max-width:480px;margin:0 auto;padding:2rem 1.25rem 3rem;text-align:center;">
        <div class="results-eyebrow fade-in">Daily Challenge #${getDailyNum()}</div>
        <div class="score-big fade-in-1"><span style="color:var(--pulse);">${rec.score}</span></div>
        <div class="grade-tag fade-in-2" style="background:${gc};">${acc}% · ${gl}</div>

        <div class="daily-result-grid fade-in-3">${grid}</div>

        <div class="stats-row fade-in-3" style="margin-top:0;">
          <div class="stat-card"><span class="stat-big green">${rec.correct}</span><span class="stat-small">Correct</span></div>
          <div class="stat-card"><span class="stat-big red">${rec.wrong}</span><span class="stat-small">Fout</span></div>
          <div class="stat-card"><span class="stat-big">${rec.dayStreak}🔥</span><span class="stat-small">Dag streak</span></div>
        </div>

        ${isToday ? `
        <div class="daily-countdown-card fade-in-4">
          <div class="daily-countdown-label">Volgende challenge over</div>
          <div class="daily-countdown" id="dc-countdown">--:--:--</div>
        </div>` : ''}

        <button id="dc-share-btn" onclick="dcShare()" class="btn-share fade-in-4">
          📤 Deel resultaat
        </button>

        <div class="action-row fade-in-5" style="margin-top:0.75rem;">
          <button class="btn-secondary" style="width:100%;" onclick="showHome()">← Home</button>
        </div>
      </div>
    </div>`;

  if (isToday) dcStartCountdown();
}

function dcStartCountdown() {
  const tick = () => {
    const el = document.getElementById('dc-countdown');
    if (!el) return;
    const now = new Date();
    const midnight = new Date(now); midnight.setHours(24,0,0,0);
    const diff = midnight - now;
    if (diff <= 0) { el.textContent = 'Nu beschikbaar! 🎉'; return; }
    const hh = String(Math.floor(diff / 3600000)).padStart(2,'0');
    const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
    const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
    el.textContent = `${hh}:${mm}:${ss}`;
    setTimeout(tick, 1000);
  };
  tick();
}

function dcShare() {
  const rec = loadDailyRecord();
  if (!rec) return;
  const grid = rec.answers.map(a => a ? '🟢' : '🔴').join('');
  const dateStr = new Date(rec.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  const text = `MedDuel Daily #${getDailyNum()} — ${dateStr}\n${grid}\n${rec.correct}/10 vragen · ${rec.score} punten · ${rec.dayStreak}🔥 streak`;

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('dc-share-btn');
    if (btn) {
      btn.textContent = '✓ Gekopieerd!';
      btn.style.background = 'var(--green)';
      setTimeout(() => { btn.textContent = '📤 Deel resultaat'; btn.style.background = ''; }, 2500);
    }
  }).catch(() => alert(text));
}

function quitDaily() {
  DC.active = false;
  if (DC.nextQTimer) { clearTimeout(DC.nextQTimer); DC.nextQTimer = null; }
  hideToast();
  showHome();
}

// ── Home card helper (called from router) ──
function renderDailyHomeCard() {
  const rec = loadDailyRecord();
  const today = getTodayStr();
  const played = rec && rec.date === today;
  const num = getDailyNum();
  const dateStr = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' });

  if (played) {
    const grid = rec.answers.map(a => a ? '🟢' : '🔴').join('');
    return `
      <div class="daily-home-card played" onclick="startDaily()">
        <div class="daily-home-meta">📅 DAG #${num} · GESPEELD</div>
        <div class="daily-home-grid-small">${grid}</div>
        <div class="daily-home-score">${rec.correct}/10 vragen · ${rec.score} pts · ${rec.dayStreak}🔥</div>
      </div>`;
  }

  return `
    <div class="daily-home-card" onclick="startDaily()">
      <div class="daily-home-left">
        <div class="daily-home-meta">📅 DAG #${num} · ${dateStr}</div>
        <div class="daily-home-title">Daily Challenge</div>
        <div class="daily-home-sub">10 vragen · Iedereen dezelfde</div>
      </div>
      <span class="daily-home-arrow">→</span>
    </div>`;
}
