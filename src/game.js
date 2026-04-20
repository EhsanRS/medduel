// MedDuel — Trivia spelmodi (Blitz, Classic, Survival)

let G = {};
let currentMode = 'classic';
let activeCats = 'all';

// ── Categorie filter ──
function toggleCat(cat, el) {
  const pills = document.querySelectorAll('.cat-pill');
  if (cat === 'all') {
    pills.forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    activeCats = 'all';
  } else {
    document.querySelector('[data-cat="all"]').classList.remove('active');
    el.classList.toggle('active');
    const active = [...pills]
      .filter(p => p.classList.contains('active'))
      .map(p => p.dataset.cat);
    if (active.length) {
      activeCats = active;
    } else {
      activeCats = 'all';
      document.querySelector('[data-cat="all"]').classList.add('active');
    }
  }
}

function getPool() {
  if (activeCats === 'all') return QUESTIONS;
  return QUESTIONS.filter(q => activeCats.includes(q.domain));
}

// ── Game starten ──
function startGame(mode) {
  currentMode = mode;
  let pool = shuffleArr(getPool());
  if (mode === 'classic')  pool = pool.slice(0, 10);
  if (mode === 'survival') pool = [...pool, ...pool, ...shuffleArr(pool)];

  G = {
    mode, queue: pool,
    score: 0, streak: 0, maxStreak: 0,
    correct: 0, wrong: 0, answered: 0,
    lives: 3, timeLeft: 60,
    timer: null, nextQTimer: null, locked: false, active: true,
    timerPaused: false, waitingForModal: false, pendingEndGame: false,
    domainStats: {}, domainStatsByKey: {}, wrongAnswers: [],
    dotStates: mode === 'classic' ? Array(10).fill('pending') : null,
  };

  renderGameScreen();
  showScreen('game');
  updateHUD();
  renderLives();

  if (mode === 'blitz') startTimer();
  else {
    document.getElementById('timerTxt').textContent = '—';
    document.getElementById('timerArc').style.stroke = 'transparent';
  }

  loadQ();
}

function renderGameScreen() {
  document.getElementById('app').innerHTML = `
    <div id="game" class="screen active">
      <div class="game-nav">
        <button class="quit-btn" onclick="quitGame()">✕ Stop</button>
        <div id="livesDisplay" class="lives-wrap"></div>
      </div>
      <div class="hud">
        <div class="hud-item">
          <span class="hud-val" id="scoreVal">0</span>
          <span class="hud-lbl">Punten</span>
        </div>
        <div class="timer-wrap">
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3.5"/>
            <circle id="timerArc" cx="28" cy="28" r="24" fill="none"
              stroke="#E8410A" stroke-width="3.5" stroke-linecap="round"
              stroke-dasharray="150.8" stroke-dashoffset="0"/>
          </svg>
          <div class="timer-center" id="timerTxt">—</div>
        </div>
        <div class="hud-item" style="text-align:right">
          <span class="hud-val" id="streakVal">×0</span>
          <span class="hud-lbl">Streak</span>
        </div>
      </div>
      <div class="progress-dots" id="progressDots"></div>
      <div class="q-card">
        <div id="qTypeTag" class="q-type-tag diagnose">Diagnose</div>
        <div class="q-domain" id="qDomain"></div>
        <div class="q-text" id="qText"></div>
      </div>
      <div class="answers-wrap" id="answersWrap"></div>
    </div>`;
  renderDots();
}

// ── Timer ──
function startTimer() {
  clearInterval(G.timer);
  G.timeLeft = 60;
  updateTimer();
  G.timer = setInterval(() => {
    G.timeLeft--;
    updateTimer();
    if (G.timeLeft <= 0) endGame();
  }, 1000);
}

function updateTimer() {
  const t = G.timeLeft;
  const arc = document.getElementById('timerArc');
  const txt = document.getElementById('timerTxt');
  if (!arc || !txt) return;
  arc.style.strokeDashoffset = 150.8 * (1 - t / 60);
  arc.style.stroke = t > 10 ? '#E8410A' : '#ff2200';
  txt.textContent = t;
  txt.style.color = t <= 10 ? '#E8410A' : 'white';
}

// ── Progress dots ──
function renderDots() {
  const el = document.getElementById('progressDots');
  if (!el || G.mode !== 'classic') { if (el) el.innerHTML = ''; return; }
  el.innerHTML = G.dotStates.map((s, i) =>
    `<div class="dot${s==='done'?' done':s==='wrong'?' wrong-dot':s==='current'?' current':''}" id="dot-${i}"></div>`
  ).join('');
}

function updateDot(idx, state) {
  if (G.mode !== 'classic') return;
  G.dotStates[idx] = state;
  const el = document.getElementById('dot-' + idx);
  if (el) el.className = 'dot' + (state==='done'?' done':state==='wrong'?' wrong-dot':'');
}

// ── Lives ──
function renderLives() {
  const el = document.getElementById('livesDisplay');
  if (!el || G.mode !== 'survival') { if (el) el.innerHTML = ''; return; }
  el.innerHTML = Array(3).fill(0).map((_, i) =>
    `<svg class="life-heart${i >= G.lives ? ' lost' : ''}" viewBox="0 0 24 24" fill="${i < G.lives ? '#E8410A' : '#9A8F85'}">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
    </svg>`
  ).join('');
}

function updateHUD() {
  const sv = document.getElementById('scoreVal');
  const stv = document.getElementById('streakVal');
  if (sv)  sv.textContent  = G.score;
  if (stv) stv.textContent = '×' + G.streak;
}

// ── Vraag laden ──
function loadQ() {
  if (!G.active) return;
  if (G.queue.length === 0) { endGame(); return; }

  const q = G.queue.shift();
  G.currentQ = q;
  G.locked = false;

  if (!G.domainStats[q.dl]) G.domainStats[q.dl] = { c: 0, t: 0 };
  G.domainStats[q.dl].t++;
  if (!G.domainStatsByKey[q.domain]) G.domainStatsByKey[q.domain] = { c: 0, t: 0 };
  G.domainStatsByKey[q.domain].t++;

  if (G.mode === 'classic') updateDot(G.answered, 'current');

  // Type badge
  const tag = document.getElementById('qTypeTag');
  const typeMap = {
    diagnose:  ['Diagnose', 'diagnose'],
    truefalse: ['Waar of Niet?', 'truefalse'],
    pharma:    ['Welk Medicijn?', 'pharma'],
    lab:       ['Lab', 'lab'],
  };
  const [label, cls] = typeMap[q.type] || typeMap.diagnose;
  if (tag) { tag.textContent = label; tag.className = 'q-type-tag ' + cls; }

  const domain = document.getElementById('qDomain');
  const qtext  = document.getElementById('qText');
  if (domain) domain.textContent = q.dl;
  if (qtext)  qtext.textContent  = q.q;

  const wrap = document.getElementById('answersWrap');
  if (!wrap) return;

  if (q.type === 'truefalse') {
    wrap.innerHTML = `
      <div class="tf-wrap">
        <button class="tf-btn true-btn"  onclick="answerTF(true, this)">✓ Waar</button>
        <button class="tf-btn false-btn" onclick="answerTF(false, this)">✗ Niet Waar</button>
      </div>`;
  } else {
    const letters = ['A', 'B', 'C', 'D'];
    wrap.innerHTML = q.a.map((ans, i) =>
      `<button class="ans-btn" onclick="answerMC(${i}, this)" data-i="${i}">
        <span class="ans-key">${letters[i]}</span>${ans}
      </button>`
    ).join('');
  }
}

// ── Antwoorden ──
function answerMC(idx, btn) {
  if (G.locked) return;
  G.locked = true;
  const q = G.currentQ;
  const ok = idx === q.c;
  document.querySelectorAll('.ans-btn').forEach(b => {
    b.disabled = true;
    if (parseInt(b.dataset.i) === q.c) b.classList.add('correct');
  });
  if (!ok) btn.classList.add('wrong');
  processAnswer(ok, q);
}

function answerTF(val, btn) {
  if (G.locked) return;
  G.locked = true;
  const q = G.currentQ;
  const ok = val === q.c;
  document.querySelectorAll('.tf-btn').forEach(b => b.disabled = true);
  btn.classList.add(ok ? 'correct' : 'wrong');
  if (!ok) {
    document.querySelectorAll('.tf-btn').forEach(b => {
      if ((b.classList.contains('true-btn') && q.c) || (b.classList.contains('false-btn') && !q.c))
        b.classList.add('correct');
    });
  }
  processAnswer(ok, q);
}

function processAnswer(ok, q) {
  const dotIdx = G.answered;
  G.answered++;

  if (ok) {
    G.correct++;
    G.streak++;
    G.maxStreak = Math.max(G.maxStreak, G.streak);
    G.domainStats[q.dl].c++;
    G.domainStatsByKey[q.domain].c++;
    awardXP(G.streak >= 5 ? 15 : G.streak >= 3 ? 13 : 10);
    const bonus = G.streak >= 5 ? 30 : G.streak >= 3 ? 20 : 10;
    G.score += bonus;
    if (G.mode === 'classic') updateDot(dotIdx, 'done');
    if (G.streak === 3)  showCombo('3×',  'Streak!');
    if (G.streak === 5)  showCombo('5×',  'On fire!');
    if (G.streak === 10) showCombo('10×', 'Legendair!');
    showToast(true, `+${bonus} punten`, q.ex, q);
  } else {
    G.wrong++;
    G.streak = 0;
    if (G.mode === 'classic') {
      updateDot(dotIdx, 'wrong');
      G.wrongAnswers.push({ q: q.q, correct: q.type === 'truefalse' ? (q.c ? 'Waar' : 'Niet waar') : q.a[q.c], ex: q.ex, dl: q.dl });
    }
    if (G.mode === 'survival') {
      G.lives--;
      renderLives();
      if (G.lives <= 0) {
        G.pendingEndGame = true;
        showToast(false, 'Game over', q.ex, q);
        updateHUD();
        G.nextQTimer = setTimeout(() => { G.nextQTimer = null; hideToast(); endGame(); }, 2400);
        return;
      }
    }
    showToast(false, 'Niet correct', q.ex, q);
  }

  updateHUD();
  G.nextQTimer = setTimeout(() => {
    G.nextQTimer = null;
    hideToast();
    if (G.mode === 'classic' && G.answered >= 10) { endGame(); return; }
    if (G.mode === 'blitz' && G.timeLeft <= 0) return;
    if (G.mode === 'survival' && G.queue.length === 0) G.queue = shuffleArr(getPool());
    loadQ();
  }, 2400);
}

// ── Einde ──
function endGame() {
  G.active = false;
  clearInterval(G.timer);
  hideToast();

  const total = G.correct + G.wrong;
  const acc   = total ? Math.round(G.correct / total * 100) : 0;

  saveStats({
    played: (loadStats().played || 0) + 1,
    best:   Math.max(loadStats().best || 0, G.score),
  });
  mergeDomainStats(G.domainStatsByKey || {});

  renderResultsScreen(acc);
  showScreen('results');
}

function renderResultsScreen(acc) {
  const [, gl, gc] = gradeFromPct(acc);
  const fakes = [
    { n: 'DrVanDijk', s: 340 }, { n: 'MedStudent_K', s: 290 },
    { n: 'Coassistent92', s: 210 }, { n: 'NurseVanBeek', s: 180 },
  ];
  const lbAll = [...fakes, { n: 'Jij 👈', s: G.score, you: true }]
    .sort((a, b) => b.s - a.s).slice(0, 5);
  const rankCls = ['r1', 'r2', 'r3', '', ''];

  const breakdownHTML = Object.entries(G.domainStats).map(([name, s]) => {
    const pct = s.t ? Math.round(s.c / s.t * 100) : 0;
    return `<div class="breakdown-row">
      <span class="breakdown-name">${name.replace(' — Waar of Niet?', '')}</span>
      <div class="breakdown-bar-wrap">
        <div class="breakdown-bar-fill${pct < 60 ? ' bad' : ''}" style="width:${pct}%"></div>
      </div>
      <span class="breakdown-pct">${pct}%</span>
    </div>`;
  }).join('');

  const lbHTML = lbAll.map((e, i) => `
    <div class="lb-row${e.you ? ' you-row' : ''}">
      <span class="lb-rank-num ${rankCls[i]}">${i + 1}</span>
      <span class="lb-name-col">${e.n}</span>
      <span class="lb-pts-col">${e.s}</span>
    </div>`).join('');

  const wrongHTML = G.mode === 'classic' && G.wrongAnswers.length > 0
    ? `<div class="breakdown-card fade-in-6" style="margin-top:1rem;">
        <div class="breakdown-title">❌ Fout beantwoord (${G.wrongAnswers.length})</div>
        ${G.wrongAnswers.map(w => `
          <div class="wrong-review-item">
            <div class="wrong-review-domain">${(w.dl || '').replace(' — Waar of Niet?', '')}</div>
            <div class="wrong-review-q">${w.q}</div>
            <div class="wrong-review-correct">✓ ${w.correct}</div>
            <div class="wrong-review-ex">${w.ex}</div>
          </div>`).join('')}
      </div>`
    : '';

  document.getElementById('app').innerHTML = `
    <div id="results" class="screen active">
        <div class="results-top">
          <div class="results-eyebrow fade-in">Ronde afgelopen</div>
          <div class="score-big fade-in-1"><span style="color:var(--pulse)">${G.score}</span></div>
          <div class="grade-tag fade-in-2" style="background:${gc}">${acc}% · ${gl}</div>
        </div>
        <div class="stats-row fade-in-3">
          <div class="stat-card"><span class="stat-big green">${G.correct}</span><span class="stat-small">Correct</span></div>
          <div class="stat-card"><span class="stat-big red">${G.wrong}</span><span class="stat-small">Fout</span></div>
          <div class="stat-card"><span class="stat-big">${acc}%</span><span class="stat-small">Accuraat</span></div>
        </div>
        <div class="breakdown-card fade-in-4">
          <div class="breakdown-title">📊 Per domein</div>
          ${breakdownHTML}
        </div>
        <div class="lb-card fade-in-5">
          <div class="lb-title">🏆 Leaderboard</div>
          ${lbHTML}
        </div>
        ${wrongHTML}
        <div class="action-row fade-in-6" style="margin-top:1rem;">
          <button class="btn-primary" onclick="startGame('${currentMode}')">🔁 Opnieuw spelen</button>
          <button class="btn-secondary" onclick="showHome()">← Home</button>
        </div>
    </div>`;
}

function quitGame() {
  G.active = false;
  clearInterval(G.timer);
  hideToast();
  showHome();
}
