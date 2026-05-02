// MedDuel — Spaced Repetition sessie (SM-2)

let SR = {};

function startSRMode() {
  const queue = srDueQuestions();
  if (queue.length === 0) {
    showToast(true, 'Nothing to review', 'All reviews are done for today.');
    setTimeout(hideToast, 3000);
    return;
  }
  SR = {
    queue: queue.map(q => shuffleAnswers(q)),
    originals: queue,
    idx: 0, correct: 0, wrong: 0,
    locked: false, currentQ: null,
  };
  renderSRScreen();
  showScreen('sr');
  srLoadQ();
}

function renderSRScreen() {
  document.getElementById('app').innerHTML = `
    <div id="sr" class="screen active">
      <div style="max-width:480px;margin:0 auto;padding:0 1.25rem 3rem;">
        <div class="game-nav">
          <button class="quit-btn" onclick="quitSR()">✕ Stop</button>
          <div style="font-family:'Fraunces',serif;font-size:13px;color:var(--ink-mid);">
            📅 Review <span id="sr-num">1</span> / <span id="sr-total">${SR.queue.length}</span>
          </div>
        </div>
        <div class="wk-progress-bar-bg">
          <div class="wk-progress-bar-fill" id="srProgress" style="width:0%"></div>
        </div>
        <div id="sr-card-area"></div>
        <div class="lm-explanation-box" id="sr-expl" style="display:none;"></div>
        <div class="sr-rating" id="sr-rating" style="display:none;">
          <div class="sr-rating-label">How did it go?</div>
          <div class="sr-rating-btns">
            <button class="sr-btn sr-btn-miss"  onclick="srRate(1)">😰<br><span>Missed</span></button>
            <button class="sr-btn sr-btn-doubt" onclick="srRate(3)">🤔<br><span>Unsure</span></button>
            <button class="sr-btn sr-btn-got"   onclick="srRate(5)">✓<br><span>Got it</span></button>
          </div>
        </div>
      </div>
    </div>`;
}

function srLoadQ() {
  if (SR.idx >= SR.queue.length) { srEnd(); return; }
  SR.locked = false;
  SR.currentQ = SR.queue[SR.idx];
  const q = SR.currentQ;

  document.getElementById('sr-num').textContent = SR.idx + 1;
  document.getElementById('srProgress').style.width = (SR.idx / SR.queue.length * 100) + '%';
  document.getElementById('sr-expl').style.display = 'none';
  document.getElementById('sr-rating').style.display = 'none';

  let answersHTML;
  if (q.type === 'truefalse') {
    answersHTML = `<div class="tf-wrap">
      <button class="tf-btn true-btn"  onclick="srAnswerTF(true,this)">✓ True</button>
      <button class="tf-btn false-btn" onclick="srAnswerTF(false,this)">✗ False</button>
    </div>`;
  } else {
    answersHTML = q.a.map((ans, i) =>
      `<button class="ans-btn" onclick="srAnswerMC(${i},this)" data-i="${i}">
        <span class="ans-key">${['A','B','C','D'][i]}</span>${ans}
      </button>`
    ).join('');
  }

  document.getElementById('sr-card-area').innerHTML = `
    <div class="q-card lm-q-card">
      <div class="sr-badge">📅 Review</div>
      <div class="q-domain">${q.dl}</div>
      <div class="q-text lm-q-text">${q.q}</div>
    </div>
    <div class="answers-wrap" id="sr-answers">${answersHTML}</div>`;
}

function srAnswerMC(idx, btn) {
  if (SR.locked) return;
  SR.locked = true;
  const q = SR.currentQ;
  const ok = idx === q.c;
  document.querySelectorAll('#sr-answers .ans-btn').forEach(b => {
    b.disabled = true;
    if (parseInt(b.dataset.i) === q.c) b.classList.add('correct');
  });
  if (!ok) btn.classList.add('wrong');
  srReveal(ok, q);
}

function srAnswerTF(val, btn) {
  if (SR.locked) return;
  SR.locked = true;
  const q = SR.currentQ;
  const ok = val === q.c;
  document.querySelectorAll('.tf-btn').forEach(b => b.disabled = true);
  btn.classList.add(ok ? 'correct' : 'wrong');
  if (!ok) {
    document.querySelectorAll('.tf-btn').forEach(b => {
      if ((b.classList.contains('true-btn') && q.c) || (b.classList.contains('false-btn') && !q.c))
        b.classList.add('correct');
    });
  }
  srReveal(ok, q);
}

function srReveal(ok, q) {
  if (ok) SR.correct++; else SR.wrong++;
  if (ok) SFX.correct(); else SFX.wrong();
  const expl = document.getElementById('sr-expl');
  if (expl) {
    expl.innerHTML = `
      <div class="lm-expl-result ${ok ? 'ok' : 'fail'}">${ok ? '✓ Correct!' : '✗ Wrong'}</div>
      <div class="lm-expl-text">${q.ex || ''}</div>`;
    expl.style.display = 'block';
  }
  document.getElementById('sr-rating').style.display = 'block';
}

function srRate(quality) {
  const q = SR.originals[SR.idx] || SR.currentQ;
  srUpdate(q, quality);
  if (quality < 3) {
    recordWeak(q);
  } else if (quality >= 5) {
    resolveWeak(q);
    awardXP(8);
  }
  SR.idx++;
  srLoadQ();
}

function srEnd() {
  const n = srDueCount();
  document.getElementById('app').innerHTML = `
    <div id="sr-done" class="screen active">
      <div style="max-width:480px;margin:0 auto;padding:2rem 1.25rem 3rem;text-align:center;">
        <div class="results-eyebrow fade-in">Review complete</div>
        <div class="score-big fade-in-1" style="font-size:56px;">📅</div>
        <div class="grade-tag fade-in-2" style="background:var(--blue);">
          ${SR.correct} remembered · ${SR.wrong} still practising
        </div>
        <div class="stats-row fade-in-3" style="margin-top:1rem;">
          <div class="stat-card">
            <span class="stat-big green">${SR.correct}</span>
            <span class="stat-small">Remembered</span>
          </div>
          <div class="stat-card">
            <span class="stat-big" style="color:var(--pulse)">${SR.wrong}</span>
            <span class="stat-small">Keep practising</span>
          </div>
          <div class="stat-card">
            <span class="stat-big" style="color:var(--blue)">${n}</span>
            <span class="stat-small">Remaining today</span>
          </div>
        </div>
        <p style="font-size:14px;color:var(--ink-mid);margin-top:1.25rem;line-height:1.6;">
          ${n > 0
            ? `Still <strong>${n}</strong> reviews ready for today.`
            : 'All reviews for today done. Well done! 🎉'}
        </p>
        <div class="action-row fade-in-4" style="margin-top:1.5rem;">
          ${n > 0 ? `<button class="btn-primary" onclick="startSRMode()">🔁 Another round</button>` : ''}
          <button class="btn-secondary" onclick="showHome()">← Home</button>
        </div>
      </div>
    </div>`;
}

function quitSR() {
  SR = {};
  showHome();
}
