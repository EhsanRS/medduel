// MedDuel — Spoedkamer modus

let SK = {};

function startSpoedkamer() {
  currentMode = 'spoedkamer';
  const pool = getStratifiedPool(10);

  SK = {
    queue: pool,
    score: 0, streak: 0, maxStreak: 0,
    correct: 0, wrong: 0, answered: 0,
    lives: 3, timeLeft: 15,
    timer: null, nextQTimer: null,
    locked: false, active: true,
    domainStats: {}, domainStatsByKey: {},
    sessionLog: [], wrongAnswers: [],
    currentQ: null,
  };

  renderSpoedkamerScreen();
  showScreen('spoedkamer');
  renderSKLives();
  updateSKHUD();
  loadSKQuestion();
}

function renderSpoedkamerScreen() {
  document.getElementById('app').innerHTML = `
    <div id="spoedkamer" class="screen active">
      <div class="game-nav sk-nav">
        <button class="quit-btn" onclick="quitSpoedkamer()">✕ Stop</button>
        <span class="sk-nav-badge">🚨 Spoedkamer</span>
        <div class="sk-lives" id="skLives"></div>
      </div>
      <div class="hud sk-hud">
        <div class="hud-item">
          <span class="hud-val" id="skScore">0</span>
          <span class="hud-lbl">Punten</span>
        </div>
        <div class="timer-wrap">
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="3.5"/>
            <circle id="skTimerArc" cx="28" cy="28" r="24" fill="none"
              stroke="#ff3a1a" stroke-width="3.5" stroke-linecap="round"
              stroke-dasharray="150.8" stroke-dashoffset="0"
              transform="rotate(-90 28 28)"/>
          </svg>
          <div class="timer-center sk-timer-num" id="skTimerNum">15</div>
        </div>
        <div class="hud-item" style="text-align:right">
          <span class="hud-val" id="skPatientNum">1</span>
          <span class="hud-lbl">/ 10</span>
        </div>
      </div>
      <div class="q-card sk-q-card" id="skQCard">
        <div class="q-card-header">
          <div id="skTypeTag" class="q-type-tag diagnose">Diagnose</div>
          <div id="skDifficulty" class="q-difficulty"></div>
        </div>
        <div class="q-domain" id="skDomain"></div>
        <div class="q-text"  id="skText"></div>
        <div class="q-figure" id="skFigure" style="display:none"></div>
      </div>
      <div class="answers-wrap" id="skAnswersWrap"></div>
    </div>`;
}

function renderSKLives() {
  const el = document.getElementById('skLives');
  if (!el) return;
  el.innerHTML = Array(3).fill(0).map((_, i) =>
    `<span class="sk-life${i < SK.lives ? '' : ' lost'}">❤️</span>`
  ).join('');
}

function updateSKHUD() {
  const sv = document.getElementById('skScore');
  const pn = document.getElementById('skPatientNum');
  if (sv) sv.textContent = SK.score;
  if (pn) pn.textContent = Math.min(SK.answered + 1, 10);
}

function startSKTimer() {
  clearInterval(SK.timer);
  SK.timeLeft = 15;
  updateSKTimer();
  SK.timer = setInterval(() => {
    SK.timeLeft--;
    updateSKTimer();
    if (SK.timeLeft <= 0) {
      clearInterval(SK.timer);
      if (SK.active && !SK.locked) timeoutSK();
    }
  }, 1000);
}

function updateSKTimer() {
  const arc = document.getElementById('skTimerArc');
  const num = document.getElementById('skTimerNum');
  const card = document.getElementById('skQCard');
  if (!arc || !num) return;
  arc.style.strokeDashoffset = 150.8 * (1 - SK.timeLeft / 15);
  const danger = SK.timeLeft <= 5;
  arc.style.stroke = danger ? '#ff0000' : '#ff3a1a';
  num.textContent = SK.timeLeft;
  num.style.color = danger ? '#ff4422' : 'white';
  if (card) card.classList.toggle('sk-danger', danger);
}

function loadSKQuestion() {
  if (!SK.active) return;
  if (SK.queue.length === 0 || SK.answered >= 10) { endSpoedkamer(); return; }

  const q = SK.queue.shift();
  SK.currentQ = q;
  SK.locked = false;

  if (!SK.domainStats[q.dl]) SK.domainStats[q.dl] = { c: 0, t: 0 };
  SK.domainStats[q.dl].t++;
  if (!SK.domainStatsByKey[q.domain]) SK.domainStatsByKey[q.domain] = { c: 0, t: 0 };
  SK.domainStatsByKey[q.domain].t++;

  const typeMap = {
    diagnose: ['Diagnose', 'diagnose'], truefalse: ['Waar of Niet?', 'truefalse'],
    pharma: ['Welk Medicijn?', 'pharma'], lab: ['Lab', 'lab'],
  };
  const subtypeMap = { diff: ['Differentiaal', 'diff'], test: ['Test-keuze', 'test'] };
  const [label, cls] = (q.subtype && subtypeMap[q.subtype]) || typeMap[q.type] || typeMap.diagnose;
  const tag = document.getElementById('skTypeTag');
  if (tag) { tag.textContent = label; tag.className = 'q-type-tag ' + cls; }

  const domain = document.getElementById('skDomain');
  const qtext  = document.getElementById('skText');
  if (domain) domain.textContent = q.type === 'lab' ? '' : q.dl;
  if (qtext)  qtext.innerHTML = formatQ(q.q);

  const figEl = document.getElementById('skFigure');
  if (figEl) {
    if (q.fig && q.fig.src) {
      const isSvg = typeof q.fig.src === 'string' && q.fig.src.trim().startsWith('<svg');
      figEl.innerHTML = isSvg ? q.fig.src : `<img src="${q.fig.src}" alt="${q.fig.alt || ''}" class="q-fig-img">`;
      figEl.style.display = '';
    } else { figEl.innerHTML = ''; figEl.style.display = 'none'; }
  }

  const diff = document.getElementById('skDifficulty');
  if (diff) diff.innerHTML = diffStars(q.d);

  const wrap = document.getElementById('skAnswersWrap');
  if (!wrap) return;

  if (q.type === 'truefalse') {
    wrap.innerHTML = `
      <div class="tf-wrap">
        <button class="tf-btn true-btn"  onclick="answerSKTF(true, this)">✓ Waar</button>
        <button class="tf-btn false-btn" onclick="answerSKTF(false, this)">✗ Niet Waar</button>
      </div>`;
  } else {
    const letters = ['A', 'B', 'C', 'D'];
    wrap.innerHTML = q.a.map((ans, i) =>
      `<button class="ans-btn" onclick="answerSK(${i}, this)" data-i="${i}">
        <span class="ans-key">${letters[i]}</span>${ans}
       </button>`
    ).join('');
  }

  updateSKHUD();
  startSKTimer();
}

function answerSK(idx, btn) {
  if (SK.locked) return;
  SK.locked = true;
  clearInterval(SK.timer);
  const q = SK.currentQ;
  const ok = idx === q.c;
  document.querySelectorAll('#skAnswersWrap .ans-btn').forEach(b => {
    b.disabled = true;
    if (parseInt(b.dataset.i) === q.c) b.classList.add('correct');
  });
  if (!ok) btn.classList.add('wrong');
  processSKAnswer(ok, q, ok ? null : q.a[idx]);
}

function answerSKTF(val, btn) {
  if (SK.locked) return;
  SK.locked = true;
  clearInterval(SK.timer);
  const q = SK.currentQ;
  const ok = val === q.c;
  document.querySelectorAll('#skAnswersWrap .tf-btn').forEach(b => b.disabled = true);
  btn.classList.add(ok ? 'correct' : 'wrong');
  if (!ok) {
    document.querySelectorAll('#skAnswersWrap .tf-btn').forEach(b => {
      if ((b.classList.contains('true-btn') && q.c === true) || (b.classList.contains('false-btn') && q.c === false))
        b.classList.add('correct');
    });
  }
  processSKAnswer(ok, q, ok ? null : (val ? 'Waar' : 'Niet waar'));
}

function timeoutSK() {
  SK.locked = true;
  processSKAnswer(false, SK.currentQ, 'Geen antwoord');
}

function processSKAnswer(ok, q, wrongLabel) {
  SK.answered++;
  SK.sessionLog.push({ q, ok, wrongLabel: wrongLabel || null });

  const card = document.getElementById('skQCard');
  if (card) card.classList.remove('sk-danger');

  if (ok) {
    SK.correct++;
    SK.streak++;
    SK.maxStreak = Math.max(SK.maxStreak, SK.streak);
    SK.domainStats[q.dl].c++;
    SK.domainStatsByKey[q.domain].c++;
    const pts = SK.timeLeft > 10 ? 30 : SK.timeLeft > 5 ? 20 : 10;
    SK.score += pts;
    navigator.vibrate && navigator.vibrate(40);
    showToast(true, `+${pts} punten`, q.ex, q);
  } else {
    SK.wrong++;
    SK.streak = 0;
    SK.lives--;
    recordWeak(q);
    SK.wrongAnswers.push({
      q: q.q,
      correct: q.type === 'truefalse' ? (q.c ? 'Waar' : 'Niet waar') : q.a[q.c],
      ex: q.ex, dl: q.dl,
    });
    renderSKLives();
    navigator.vibrate && navigator.vibrate([20, 50, 20]);
    const head = wrongLabel === 'Geen antwoord' ? '⏱ Tijd verstreken!' : 'Niet correct';
    showToast(false, head, q.ex, q);
    if (SK.lives <= 0) {
      SK.active = false;
      SK.nextQTimer = setTimeout(() => { hideToast(); endSpoedkamer(); }, 4500);
      return;
    }
  }

  updateSKHUD();

  const delay = 4500;
  if (SK.answered >= 10) {
    SK.nextQTimer = setTimeout(() => { hideToast(); endSpoedkamer(); }, delay);
  } else {
    SK.nextQTimer = setTimeout(() => { hideToast(); loadSKQuestion(); }, delay);
  }
}

function endSpoedkamer() {
  SK.active = false;
  clearInterval(SK.timer);
  if (SK.nextQTimer) clearTimeout(SK.nextQTimer);
  hideToast();

  const total = SK.correct + SK.wrong;
  const acc = total ? Math.round(SK.correct / total * 100) : 0;

  mergeDomainStats(SK.domainStatsByKey || {});
  saveSessionToHistory({
    mode: 'spoedkamer', acc, correct: SK.correct, wrong: SK.wrong,
    domainStats: SK.domainStatsByKey,
  });

  if (!loadOpenPatient()) {
    const wrongOnes = SK.sessionLog.filter(i => !i.ok && i.wrongLabel !== 'Geen antwoord');
    if (wrongOnes.length > 0) {
      const pick = wrongOnes.find(i => i.q.wiki) || wrongOnes[0];
      saveOpenPatient({ q: pick.q, wrongLabel: pick.wrongLabel, savedAt: Date.now() });
    }
  }

  renderSKResults(acc);
}

function renderSKResults(acc) {
  const [, gl, gc] = gradeFromPct(acc);
  const survived = SK.lives > 0;
  document.getElementById('app').innerHTML = `
    <div id="sk-results" class="screen active">
      <div class="results-top">
        <div class="results-eyebrow fade-in">${survived ? 'Dienst afgerond 🚨' : 'Code blauw — dienst gestopt'}</div>
        <div class="score-big fade-in-1"><span style="color:var(--pulse)">${SK.score}</span></div>
        <div class="grade-tag fade-in-2" style="background:${gc}">${acc}% · ${gl}</div>
      </div>
      <div class="stats-row fade-in-3">
        <div class="stat-card"><span class="stat-big green">${SK.correct}</span><span class="stat-small">Correct</span></div>
        <div class="stat-card"><span class="stat-big red">${SK.wrong}</span><span class="stat-small">Fout/Timeout</span></div>
        <div class="stat-card">
          <span class="stat-big">${'❤️'.repeat(SK.lives) || '—'}</span>
          <span class="stat-small">Levens over</span>
        </div>
      </div>
      <div class="results-replay-card fade-in-4" onclick="startSpoedkamer()">
        <div class="rrc-label">Nog een dienst?</div>
        <div class="rrc-mode">🚨 Spoedkamer</div>
        <div class="rrc-arrow">→</div>
      </div>
      <div class="action-row fade-in-5" style="margin-top:1rem">
        <button class="btn-secondary" onclick="showHome()">← Home</button>
        <button class="btn-share" onclick="showHome()">🎯 Andere modus</button>
      </div>
    </div>`;
}

function quitSpoedkamer() {
  SK.active = false;
  clearInterval(SK.timer);
  if (SK.nextQTimer) clearTimeout(SK.nextQTimer);
  hideToast();
  showHome();
}
