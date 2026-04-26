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

function getStratifiedPool(n) {
  const pool = getPool();
  const byDomain = {};
  pool.forEach(q => {
    if (!byDomain[q.domain]) byDomain[q.domain] = [];
    byDomain[q.domain].push(q);
  });
  // Shuffle within each domain
  Object.keys(byDomain).forEach(k => { byDomain[k] = shuffleArr(byDomain[k]); });
  // Round-robin pick from domains until we have n questions
  const domains = shuffleArr(Object.keys(byDomain));
  const result = [];
  const idx = {};
  domains.forEach(d => { idx[d] = 0; });
  while (result.length < n) {
    let added = false;
    for (const d of domains) {
      if (result.length >= n) break;
      if (idx[d] < byDomain[d].length) {
        result.push(byDomain[d][idx[d]++]);
        added = true;
      }
    }
    if (!added) break;
  }
  return shuffleArr(result);
}

// ── Game starten ──
function startGame(mode) {
  currentMode = mode;
  let pool;
  if (mode === 'classic')  pool = getStratifiedPool(10);
  else if (mode === 'blitz') { const base = getStratifiedPool(40); pool = [...base, ...shuffleArr(getPool())]; }
  else { pool = shuffleArr(getPool()); pool = [...pool, ...shuffleArr(pool), ...shuffleArr(pool)]; }

  G = {
    mode, queue: pool,
    score: 0, streak: 0, maxStreak: 0,
    correct: 0, wrong: 0, answered: 0,
    lives: 3, timeLeft: 60,
    timer: null, nextQTimer: null, locked: false, active: true,
    timerPaused: false, waitingForModal: false, pendingEndGame: false,
    domainStats: {}, domainStatsByKey: {}, wrongAnswers: [], sessionLog: [],
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
        <div class="q-card-header">
          <div id="qTypeTag" class="q-type-tag diagnose">Diagnose</div>
          <div id="qDifficulty" class="q-difficulty"></div>
        </div>
        <div class="q-domain" id="qDomain"></div>
        <div class="q-text" id="qText"></div>
        <div class="q-figure" id="qFigure" style="display:none"></div>
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
  const subtypeMap = {
    diff: ['Differentiaal', 'diff'],
    test: ['Test-keuze', 'test'],
  };
  const [label, cls] = (q.subtype && subtypeMap[q.subtype]) || typeMap[q.type] || typeMap.diagnose;
  if (tag) { tag.textContent = label; tag.className = 'q-type-tag ' + cls; }

  const domain = document.getElementById('qDomain');
  const qtext  = document.getElementById('qText');
  if (domain) domain.textContent = q.type === 'lab' ? '' : q.dl;
  if (qtext)  qtext.innerHTML = formatQ(q.q);
  const figEl = document.getElementById('qFigure');
  if (figEl) {
    if (q.fig && typeof q.fig === 'string') {
      const credit = q.figCredit ? `<div class="fig-credit">📷 ${q.figCredit.author} · ${q.figCredit.license}</div>` : '';
      figEl.innerHTML = q.fig + credit;
      figEl.style.display = '';
    } else if (q.fig && typeof q.fig === 'object') {
      if (q.fig.src) {
        const credit = q.fig.credit ? `<div class="fig-credit">📷 ${q.fig.credit}</div>` : '';
        const isSvg = typeof q.fig.src === 'string' && q.fig.src.trim().startsWith('<svg');
        figEl.innerHTML = isSvg
          ? q.fig.src + credit
          : `<img src="${q.fig.src}" alt="${q.fig.alt || ''}" class="q-fig-img">${credit}`;
        figEl.style.display = '';
      } else {
        figEl.innerHTML = `<div class="fig-placeholder">📷 Afbeelding volgt</div>`;
        figEl.style.display = '';
      }
    } else { figEl.innerHTML = ''; figEl.style.display = 'none'; }
  }
  const diff = document.getElementById('qDifficulty');
  if (diff) diff.innerHTML = diffStars(q.d);

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
  processAnswer(ok, q, ok ? null : q.a[idx]);
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
  processAnswer(ok, q, ok ? null : (val ? 'Waar' : 'Niet waar'));
}

function processAnswer(ok, q, wrongLabel) {
  const dotIdx = G.answered;
  G.answered++;
  G.sessionLog.push({ q, ok, wrongLabel: wrongLabel || null });

  if (ok) {
    navigator.vibrate && navigator.vibrate(40);
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
    navigator.vibrate && navigator.vibrate([20, 50, 20]);
    G.wrong++;
    G.streak = 0;
    recordWeak(q);
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
        G.nextQTimer = setTimeout(() => { G.nextQTimer = null; hideToast(); endGame(); }, 5000);
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
  }, 5000);
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
  saveSessionToHistory({ mode: G.mode, acc, correct: G.correct, wrong: G.wrong, domainStats: G.domainStatsByKey });

  if (!loadOpenPatient()) {
    const wrongOnes = G.sessionLog.filter(i => !i.ok);
    if (wrongOnes.length > 0) {
      const pick = wrongOnes.find(i => i.q.wiki) || wrongOnes[0];
      saveOpenPatient({ q: pick.q, wrongLabel: pick.wrongLabel, savedAt: Date.now() });
    }
  }

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

  // Smart post-game CTA: stuur naar theorie als zwak domein gevonden
  const sessionDomains = Object.entries(G.domainStatsByKey)
    .filter(([, s]) => s.t >= 3)
    .map(([key, s]) => ({ key, pct: Math.round(s.c / s.t * 100) }))
    .sort((a, b) => a.pct - b.pct);

  const worstDomain = sessionDomains.find(d => d.pct < 60);
  const theoryId = worstDomain && typeof DOMAIN_TO_THEORY !== 'undefined'
    ? DOMAIN_TO_THEORY[worstDomain.key] : null;
  const theoryTopic = theoryId && typeof THEORY_TOPICS !== 'undefined' && THEORY_TOPICS[theoryId]
    ? THEORY_TOPICS[theoryId] : null;

  const domainMeta = worstDomain
    ? DOMAIN_META.find(m => m.key === worstDomain.key) : null;

  const smartCTAHTML = G.wrong === 0 ? '' : theoryTopic && domainMeta
    ? `<div class="smart-cta fade-in-6" onclick="openTheory('${theoryId}')">
        <span class="smart-cta-icon">${domainMeta.icon}</span>
        <div class="smart-cta-text">
          <span class="smart-cta-title">${domainMeta.label}: ${worstDomain.pct}% — lees de theorie</span>
          <span class="smart-cta-sub">${theoryTopic.title} →</span>
        </div>
       </div>`
    : '';

  const totalWeak = getWeakCount();
  const weakCTAHTML = G.wrong > 0 && totalWeak > 0
    ? `<div class="weak-results-banner fade-in-6" onclick="startWeakMode()">
        <span class="wrb-icon">🎯</span>
        <div class="wrb-text">
          <span class="wrb-title">Train je Zwaktes</span>
          <span class="wrb-sub">Je hebt ${totalWeak} vraag${totalWeak === 1 ? '' : 'en'} die aandacht nodig</span>
        </div>
        <span class="wrb-arrow">→</span>
       </div>`
    : '';

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

  // XP progress to next rank
  const xpNow   = loadXP();
  const curRank = getRank(xpNow);
  const nxtRank = getNextRank(xpNow);
  const xpProgressHTML = nxtRank
    ? (() => {
        const needed = nxtRank.min - curRank.min;
        const done   = xpNow - curRank.min;
        const pct    = Math.min(100, Math.round(done / needed * 100));
        const left   = nxtRank.min - xpNow;
        return `
        <div class="xp-progress-card fade-in-3">
          <div class="xp-prog-row">
            <span class="xp-prog-rank">${curRank.icon} ${curRank.label}</span>
            <span class="xp-prog-next">Nog <strong>${left} XP</strong> → ${nxtRank.icon} ${nxtRank.label}</span>
          </div>
          <div class="xp-prog-bar-bg">
            <div class="xp-prog-bar-fill" style="width:${pct}%;background:${nxtRank.color}"></div>
          </div>
        </div>`;
      })()
    : `<div class="xp-progress-card fade-in-3" style="text-align:center">
        ${curRank.icon} <strong>${curRank.label}</strong> — maximaal rank bereikt!
       </div>`;

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
        ${xpProgressHTML}
        <div class="results-replay-card fade-in-4" onclick="startGame('${currentMode}')">
          <div class="rrc-label">Nog één ronde?</div>
          <div class="rrc-mode">${{ blitz:'⚡ Blitz', classic:'🎯 Classic', survival:'❤️ Survival' }[currentMode] || '🎮 Spelen'}</div>
          <div class="rrc-arrow">→</div>
        </div>
        <div class="breakdown-card fade-in-5">
          <div class="breakdown-title">📊 Per domein</div>
          ${breakdownHTML}
        </div>
        <div class="lb-card fade-in-5">
          <div class="lb-title">🏆 Leaderboard</div>
          ${lbHTML}
        </div>
        ${wrongHTML}
        ${smartCTAHTML}
        ${weakCTAHTML}
        <button class="btn-review-session fade-in-6" onclick="renderReviewScreen()">📋 Bespreek deze sessie</button>
        <div class="action-row fade-in-6" style="margin-top:0.75rem;">
          <button class="btn-secondary" onclick="showHome()">← Home</button>
          <button class="btn-share" onclick="shareScore()">📤 Deel score</button>
        </div>
    </div>`;
}

function shareScore() {
  const rank = getRank(loadXP());
  const mode = { blitz: 'Blitz', classic: 'Classic', survival: 'Survival' }[currentMode] || 'MedDuel';
  const txt = `🏥 ${mode}: ${G.score} punten als ${rank.icon} ${rank.label} in MedDuel!\nKan jij mij verslaan? → ${window.location.origin}`;
  if (navigator.share) {
    navigator.share({ title: 'MedDuel', text: txt });
  } else {
    navigator.clipboard?.writeText(txt).then(() => {
      showToast(true, 'Gekopieerd!', 'Plak de link in je favoriete app.');
      setTimeout(hideToast, 2500);
    });
  }
}

function renderReviewScreen() {
  const nOk   = G.sessionLog.filter(i => i.ok).length;
  const nWrong = G.sessionLog.filter(i => !i.ok).length;

  const items = G.sessionLog.map((item, i) => {
    const q = item.q;
    const correctLabel = q.type === 'truefalse'
      ? (q.c ? 'Waar' : 'Niet waar')
      : (q.a ? q.a[q.c] : '—');
    return `
      <div class="rv-card ${item.ok ? 'rv-ok' : 'rv-wrong'}" onclick="reviewOpenFact(${i})">
        <div class="rv-top">
          <span class="rv-domain">${(q.dl || '').replace(' — Waar of Niet?', '')}</span>
          <span class="rv-badge ${item.ok ? 'rv-badge-ok' : 'rv-badge-wrong'}">${item.ok ? '✓' : '✗'}</span>
        </div>
        <div class="rv-q">${q.q}</div>
        ${!item.ok ? `<div class="rv-answer">✓ ${correctLabel}</div>` : ''}
        ${q.wiki || q.ex ? '<div class="rv-tap-hint">Tik voor uitleg →</div>' : ''}
      </div>`;
  }).join('');

  document.getElementById('app').innerHTML = `
    <div id="review" class="screen active">
      <div class="rv-header">
        <button class="quit-btn" onclick="showHome()">← Home</button>
        <div class="rv-header-info">
          <span class="rv-title">Nabespreken</span>
          <span class="rv-subtitle">${nWrong} fout &nbsp;·&nbsp; ${nOk} goed</span>
        </div>
      </div>
      <div class="rv-list">${items}</div>
    </div>`;
}

function reviewOpenFact(idx) {
  currentFact = G.sessionLog[idx].q;
  openFactModal();
}

function quitGame() {
  G.active = false;
  clearInterval(G.timer);
  hideToast();
  showHome();
}
