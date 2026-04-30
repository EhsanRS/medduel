// MedDuel — Train je Zwaktes modus

let WK = {};

function startWeakMode() {
  const queue = getWeakQuestions();
  if (queue.length === 0) { alert('Geen zwakke vragen gevonden!'); return; }

  WK = {
    queue: [...queue],
    idx: 0,
    cleared: 0,
    wrong: 0,
    locked: false,
    currentQ: null,
  };

  renderWeakScreen();
  showScreen('weak');
  wkLoadQ();
}

function renderWeakScreen() {
  document.getElementById('app').innerHTML = `
    <div id="weak" class="screen active">
      <div style="max-width:480px;margin:0 auto;padding:0 1.25rem 3rem;">
        <div class="game-nav">
          <button class="quit-btn" onclick="quitWeak()">✕ Stop</button>
          <div style="font-family:'Fraunces',serif;font-size:13px;color:var(--ink-mid);">
            🎯 Vraag <span id="wk-num">1</span> / <span id="wk-total">${WK.queue.length}</span>
          </div>
        </div>

        <div class="wk-progress-bar-bg">
          <div class="wk-progress-bar-fill" id="wkProgress" style="width:0%"></div>
        </div>

        <div id="wk-card-area"></div>
        <div class="lm-explanation-box" id="wk-expl" style="display:none;"></div>
        <button class="lm-next-btn" id="wk-next" style="display:none;" onclick="wkNext()">
          Volgende vraag →
        </button>
      </div>
    </div>`;
}

function wkLoadQ() {
  if (WK.idx >= WK.queue.length) { wkEnd(); return; }

  WK.locked = false;
  WK.currentQ = shuffleAnswers(WK.queue[WK.idx]);
  const q = WK.currentQ;

  document.getElementById('wk-num').textContent = WK.idx + 1;
  document.getElementById('wk-total').textContent = WK.queue.length;
  document.getElementById('wkProgress').style.width = (WK.idx / WK.queue.length * 100) + '%';

  const expl = document.getElementById('wk-expl');
  const next = document.getElementById('wk-next');
  if (expl) expl.style.display = 'none';
  if (next) next.style.display = 'none';

  const typeCls   = q.type === 'truefalse' ? 'tf' : q.type === 'pharma' ? 'pharma' : q.type === 'lab' ? 'lab' : 'diagnose';
  const typeLabel = q.type === 'truefalse' ? '✓/✗ Waar of Niet?' : q.type === 'pharma' ? '💊 Farmacologie' : q.type === 'lab' ? '🧪 Lab' : '🔍 Diagnose';

  let answersHTML;
  if (q.type === 'truefalse') {
    answersHTML = `<div class="tf-wrap">
      <button class="tf-btn true-btn"  onclick="wkAnswerTF(true,this)">✓ Waar</button>
      <button class="tf-btn false-btn" onclick="wkAnswerTF(false,this)">✗ Niet Waar</button>
    </div>`;
  } else {
    answersHTML = q.a.map((ans, i) =>
      `<button class="ans-btn" onclick="wkAnswerMC(${i},this)" data-i="${i}">
        <span class="ans-key">${['A','B','C','D'][i]}</span>${ans}
      </button>`
    ).join('');
  }

  document.getElementById('wk-card-area').innerHTML = `
    <div class="q-card lm-q-card">
      <div class="wk-badge">🎯 Zwakke vraag</div>
      <div class="q-type-tag ${typeCls}" style="margin-bottom:0.75rem;">${typeLabel}</div>
      <div class="q-domain">${q.dl}</div>
      <div class="q-text lm-q-text">${q.q}</div>
    </div>
    <div class="answers-wrap" id="wk-answers">${answersHTML}</div>`;
}

function wkAnswerMC(idx, btn) {
  if (WK.locked) return;
  WK.locked = true;
  const q = WK.currentQ;
  const ok = idx === q.c;
  document.querySelectorAll('#wk-answers .ans-btn').forEach(b => {
    b.disabled = true;
    if (parseInt(b.dataset.i) === q.c) b.classList.add('correct');
  });
  if (!ok) btn.classList.add('wrong');
  wkReveal(ok, q);
}

function wkAnswerTF(val, btn) {
  if (WK.locked) return;
  WK.locked = true;
  const q = WK.currentQ;
  const ok = val === q.c;
  document.querySelectorAll('.tf-btn').forEach(b => b.disabled = true);
  btn.classList.add(ok ? 'correct' : 'wrong');
  if (!ok) {
    document.querySelectorAll('.tf-btn').forEach(b => {
      if ((b.classList.contains('true-btn') && q.c) || (b.classList.contains('false-btn') && !q.c))
        b.classList.add('correct');
    });
  }
  wkReveal(ok, q);
}

function wkReveal(ok, q) {
  if (ok) {
    WK.cleared++;
    resolveWeak(q);
    awardXP(12);
  } else {
    WK.wrong++;
    recordWeak(q);
  }

  const expl = document.getElementById('wk-expl');
  const next = document.getElementById('wk-next');
  if (expl) {
    expl.innerHTML = `
      <div class="lm-expl-result ${ok ? 'ok' : 'fail'}">${ok ? '✓ Verbeterd! +12 XP' : '✗ Nog even oefenen'}</div>
      <div class="lm-expl-text">${q.ex}</div>`;
    expl.style.display = 'block';
  }
  if (next) next.style.display = 'block';
  WK.idx++;
}

function wkNext() {
  wkLoadQ();
}

function wkEnd() {
  const remaining = getWeakCount();
  document.getElementById('app').innerHTML = `
    <div id="weak-done" class="screen active">
      <div style="max-width:480px;margin:0 auto;padding:2rem 1.25rem 3rem;text-align:center;">
        <div class="results-eyebrow fade-in">Sessie voltooid</div>
        <div class="score-big fade-in-1" style="font-size:56px;">🎯</div>
        <div class="grade-tag fade-in-2" style="background:var(--green);">${WK.cleared} verbeterd · ${WK.wrong} nog fout</div>

        <div class="stats-row fade-in-3" style="margin-top:1rem;">
          <div class="stat-card">
            <span class="stat-big green">${WK.cleared}</span>
            <span class="stat-small">Verbeterd</span>
          </div>
          <div class="stat-card">
            <span class="stat-big" style="color:var(--pulse)">${WK.wrong}</span>
            <span class="stat-small">Nog fout</span>
          </div>
          <div class="stat-card">
            <span class="stat-big">${remaining}</span>
            <span class="stat-small">Resterend</span>
          </div>
        </div>

        ${remaining > 0
          ? `<p style="font-size:14px;color:var(--ink-mid);margin-top:1rem;line-height:1.6;">
              Je hebt nog <strong>${remaining}</strong> zwakke vragen. Blijf oefenen!
             </p>`
          : `<p style="font-size:14px;color:var(--green);margin-top:1rem;font-weight:600;">
              🏆 Alle zwakke vragen gecleard!
             </p>`
        }

        <div class="action-row fade-in-4" style="margin-top:1.5rem;">
          ${remaining > 0 ? `<button class="btn-primary" onclick="startWeakMode()">🔁 Nog een ronde</button>` : ''}
          <button class="btn-secondary" onclick="showHome()">← Home</button>
        </div>
      </div>
    </div>`;
}

function quitWeak() {
  WK = {};
  showHome();
}
