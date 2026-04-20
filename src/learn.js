// MedDuel — Leer-modus (studiekaarten, geen tijdsdruk)

let LM = {};

function startLearn(domain) {
  let pool = domain && domain !== 'all'
    ? QUESTIONS.filter(q => q.domain === domain)
    : [...QUESTIONS];
  pool = shuffleArr(pool);

  LM = {
    domain: domain || 'all',
    queue: pool,
    idx: 0,
    correct: 0, wrong: 0,
    domainStatsByKey: {},
    wrongQueue: [],
    phase: 'learn', // 'learn' | 'repeat' | 'done'
    answered: false,
    locked: false,
  };

  renderLearnScreen();
  showScreen('learn');
  lmLoadQ();
}

function renderLearnScreen() {
  const domainLabel = LM.domain === 'all' ? 'Alle domeinen' : {
    cardio: '🫀 Cardiologie', neuro: '🧠 Neurologie',
    pharma: '💊 Farmacologie', infectio: '🦠 Infectiologie', lab: '🧪 Lab',
  }[LM.domain] || LM.domain;

  document.getElementById('app').innerHTML = `
    <div id="learn" class="screen active">
      <div style="max-width:480px;margin:0 auto;padding:0 1.25rem 3rem;">
        <div class="game-nav">
          <button class="quit-btn" onclick="quitLearn()">✕ Stop</button>
          <div class="lm-mode-tag">📖 Leermodus · ${domainLabel}</div>
        </div>
        <div class="lm-progress-wrap">
          <div class="lm-progress-bar" id="lm-bar" style="width:0%"></div>
        </div>
        <div class="lm-counter" id="lm-counter"></div>
        <div id="lm-card-area"></div>
      </div>
    </div>`;
}

function lmLoadQ() {
  const queue = LM.phase === 'repeat' ? LM.wrongQueue : LM.queue;
  const total  = queue.length;
  const idx    = LM.idx;

  if (idx >= total) {
    if (LM.phase === 'learn' && LM.wrongQueue.length > 0) {
      LM.phase = 'repeat';
      LM.idx = 0;
      lmShowRepeatIntro();
      return;
    }
    lmEnd();
    return;
  }

  const q = queue[idx];
  LM.currentQ = q;
  LM.answered = false;
  LM.locked = false;

  const pct = Math.round(idx / total * 100);
  const bar = document.getElementById('lm-bar');
  const counter = document.getElementById('lm-counter');
  if (bar) bar.style.width = pct + '%';
  if (counter) counter.textContent = `${idx + 1} / ${total}${LM.phase === 'repeat' ? ' · Herhaling' : ''}`;

  const typeMap = { diagnose:'Diagnose', truefalse:'Waar of Niet?', pharma:'Welk Medicijn?', lab:'Lab' };
  const typeLabel = typeMap[q.type] || 'Vraag';
  const typeCls = q.type || 'diagnose';

  let answersHTML;
  if (q.type === 'truefalse') {
    answersHTML = `
      <div class="tf-wrap">
        <button class="tf-btn true-btn"  onclick="lmAnswerTF(true,this)">✓ Waar</button>
        <button class="tf-btn false-btn" onclick="lmAnswerTF(false,this)">✗ Niet Waar</button>
      </div>`;
  } else {
    const letters = ['A','B','C','D'];
    answersHTML = q.a.map((ans, i) =>
      `<button class="ans-btn" onclick="lmAnswerMC(${i},this)" data-i="${i}">
        <span class="ans-key">${letters[i]}</span>${ans}
      </button>`
    ).join('');
  }

  document.getElementById('lm-card-area').innerHTML = `
    <div class="q-card lm-q-card">
      <div class="q-type-tag ${typeCls}" style="margin-bottom:0.75rem;">${typeLabel}</div>
      <div class="q-domain">${q.dl}</div>
      <div class="q-text lm-q-text">${q.q}</div>
    </div>
    <div class="answers-wrap" id="lm-answers">${answersHTML}</div>
    <div class="lm-explanation-box" id="lm-expl" style="display:none;"></div>
    <button class="lm-next-btn" id="lm-next" style="display:none;" onclick="lmNext()">
      Volgende vraag →
    </button>`;
}

function lmAnswerMC(idx, btn) {
  if (LM.locked) return;
  LM.locked = true;
  const q = LM.currentQ;
  const ok = idx === q.c;
  document.querySelectorAll('#lm-answers .ans-btn').forEach(b => {
    b.disabled = true;
    if (parseInt(b.dataset.i) === q.c) b.classList.add('correct');
  });
  if (!ok) btn.classList.add('wrong');
  lmReveal(ok, q);
}

function lmAnswerTF(val, btn) {
  if (LM.locked) return;
  LM.locked = true;
  const q = LM.currentQ;
  const ok = val === q.c;
  document.querySelectorAll('.tf-btn').forEach(b => b.disabled = true);
  btn.classList.add(ok ? 'correct' : 'wrong');
  if (!ok) {
    document.querySelectorAll('.tf-btn').forEach(b => {
      if ((b.classList.contains('true-btn') && q.c) || (b.classList.contains('false-btn') && !q.c))
        b.classList.add('correct');
    });
  }
  lmReveal(ok, q);
}

function lmReveal(ok, q) {
  LM.answered = true;
  if (!LM.domainStatsByKey[q.domain]) LM.domainStatsByKey[q.domain] = { c: 0, t: 0 };
  LM.domainStatsByKey[q.domain].t++;
  if (ok) { LM.correct++; LM.domainStatsByKey[q.domain].c++; awardXP(10); }
  else { LM.wrong++; if (LM.phase === 'learn') LM.wrongQueue.push(q); }

  const expl = document.getElementById('lm-expl');
  const next = document.getElementById('lm-next');
  if (expl) {
    expl.innerHTML = `
      <div class="lm-expl-result ${ok ? 'ok' : 'fail'}">${ok ? '✓ Correct!' : '✗ Niet correct'}</div>
      <div class="lm-expl-text">${q.ex}</div>`;
    expl.style.display = 'block';
    setTimeout(() => expl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
  }
  if (next) next.style.display = 'block';
}

function lmNext() {
  LM.idx++;
  lmLoadQ();
}

function lmShowRepeatIntro() {
  document.getElementById('lm-card-area').innerHTML = `
    <div class="lm-repeat-card fade-in">
      <div class="lm-repeat-icon">🔁</div>
      <div class="lm-repeat-title">Herhaling</div>
      <div class="lm-repeat-sub">Je had <strong>${LM.wrongQueue.length}</strong> vragen fout.
        Laten we die nog een keer oefenen.</div>
      <button class="btn-primary" onclick="lmLoadQ()" style="margin-top:1.5rem;width:100%;">
        Beginnen →
      </button>
    </div>`;
}

function lmEnd() {
  mergeDomainStats(LM.domainStatsByKey || {});
  const total = LM.correct + LM.wrong;
  const acc = total ? Math.round(LM.correct / total * 100) : 100;
  const [, gl, gc] = gradeFromPct(acc);

  document.getElementById('app').innerHTML = `
    <div id="learn-done" class="screen active">
      <div style="max-width:480px;margin:0 auto;padding:2rem 1.25rem 3rem;text-align:center;">
        <div class="results-eyebrow fade-in">Sessie voltooid</div>
        <div class="score-big fade-in-1" style="font-size:56px;">📖</div>
        <div class="grade-tag fade-in-2" style="background:${gc};">${acc}% · ${gl}</div>

        <div class="stats-row fade-in-3" style="margin-top:1rem;">
          <div class="stat-card"><span class="stat-big green">${LM.correct}</span><span class="stat-small">Correct</span></div>
          <div class="stat-card"><span class="stat-big red">${LM.wrong}</span><span class="stat-small">Fout</span></div>
          <div class="stat-card"><span class="stat-big">${LM.queue.length + (LM.wrongQueue.length > 0 ? LM.wrongQueue.length : 0)}</span><span class="stat-small">Kaarten</span></div>
        </div>

        <div class="action-row fade-in-4" style="margin-top:1.5rem;">
          <button class="btn-primary" onclick="showLearnSetup()">🔁 Opnieuw</button>
          <button class="btn-secondary" onclick="showHome()">← Home</button>
        </div>
      </div>
    </div>`;
}

function quitLearn() {
  LM = {};
  showHome();
}

// ── Setup scherm ──
function showLearnSetup() {
  document.getElementById('app').innerHTML = `
    <div id="learn-setup" class="screen active">
      <div style="max-width:480px;margin:0 auto;padding:2rem 1.25rem 3rem;">
        <div class="game-nav">
          <button class="quit-btn" onclick="showHome()">← Terug</button>
        </div>
        <div class="home-top" style="margin-bottom:1.5rem;">
          <div class="logo-eyebrow">Studeer</div>
          <h2 style="font-family:'Fraunces',serif;font-size:28px;font-weight:700;color:var(--ink);margin:0.25rem 0;">Leer-modus</h2>
          <p style="font-size:14px;color:var(--ink-mid);line-height:1.5;">Geen tijdsdruk. Volledige uitleg na elk antwoord. Foute vragen worden herhaald.</p>
        </div>

        <div class="section-label">Kies domein</div>
        <div class="lm-domain-grid">
          <div class="lm-domain-btn active" data-dom="all" onclick="lmSelectDomain('all',this)">
            <span class="lm-domain-icon">📚</span>
            <span>Alles</span>
          </div>
          <div class="lm-domain-btn" data-dom="cardio" onclick="lmSelectDomain('cardio',this)">
            <span class="lm-domain-icon">🫀</span>
            <span>Cardiologie</span>
          </div>
          <div class="lm-domain-btn" data-dom="neuro" onclick="lmSelectDomain('neuro',this)">
            <span class="lm-domain-icon">🧠</span>
            <span>Neurologie</span>
          </div>
          <div class="lm-domain-btn" data-dom="pharma" onclick="lmSelectDomain('pharma',this)">
            <span class="lm-domain-icon">💊</span>
            <span>Farmacologie</span>
          </div>
          <div class="lm-domain-btn" data-dom="infectio" onclick="lmSelectDomain('infectio',this)">
            <span class="lm-domain-icon">🦠</span>
            <span>Infectiologie</span>
          </div>
          <div class="lm-domain-btn" data-dom="lab" onclick="lmSelectDomain('lab',this)">
            <span class="lm-domain-icon">🧪</span>
            <span>Lab</span>
          </div>
        </div>

        <button id="lm-start-btn" class="btn-primary" style="width:100%;margin-top:2rem;"
          onclick="startLearn(document.querySelector('.lm-domain-btn.active').dataset.dom)">
          Beginnen →
        </button>
      </div>
    </div>`;
  showScreen('learn-setup');
}

function lmSelectDomain(dom, el) {
  document.querySelectorAll('.lm-domain-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  const pool = dom === 'all' ? QUESTIONS : QUESTIONS.filter(q => q.domain === dom);
  const btn = document.getElementById('lm-start-btn');
  if (btn) btn.textContent = `Beginnen · ${pool.length} kaarten →`;
}
