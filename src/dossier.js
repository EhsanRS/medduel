// MedDuel — Dossier modus (patiëntencasussen onthullen)

let D = {};

function startDossier() {
  const params = new URLSearchParams(window.location.search);
  const seed = params.get('challenge');
  let cases = [...DOSSIER_CASES];

  // Herstel volgorde uit challenge-seed
  if (seed && /^[0-4]{5}$/.test(seed)) {
    const order = seed.split('').map(Number);
    if ([...new Set(order)].length === cases.length) {
      cases = order.map(i => DOSSIER_CASES[i]);
    }
  }

  D = {
    cases, seed,
    caseIdx: 0, currentHints: 0,
    totalHints: 0, score: 0,
    caseResults: [], locked: false,
    nextQTimer: null, waitingForModal: false,
  };

  renderDossierScreen();
  showScreen('dossier');
  loadDossierCase();
}

function renderDossierScreen() {
  document.getElementById('app').innerHTML = `
    <div id="dossier" class="screen active">
      <div style="max-width:480px;margin:0 auto;padding:0 1.25rem 3rem;">
        <div class="game-nav">
          <button class="quit-btn" onclick="quitDossier()">✕ Stop</button>
          <div style="font-family:'Fraunces',serif;font-size:13px;color:var(--ink-mid);">
            Zaak <span id="d-casenum">1</span> / <span id="d-casetotal">5</span>
          </div>
        </div>

        <div class="hud" style="margin-bottom:1rem;">
          <div class="hud-item">
            <span class="hud-val" id="d-score">0</span>
            <span class="hud-lbl">Punten</span>
          </div>
          <div class="hud-item" style="text-align:center;">
            <div style="display:flex;gap:4px;justify-content:center;" id="d-stars">
              <span style="font-size:20px;">⭐</span><span style="font-size:20px;">⭐</span><span style="font-size:20px;">⭐</span>
            </div>
            <span class="hud-lbl">Kwaliteit</span>
          </div>
          <div class="hud-item" style="text-align:right;">
            <span class="hud-val" id="d-hints">0</span>
            <span class="hud-lbl">Hints</span>
          </div>
        </div>

        <div class="q-card" style="margin-bottom:1rem;">
          <div class="q-type-tag lab" style="margin-bottom:0.75rem;">🗂️ Patiëntendossier</div>
          <div style="font-family:'Fraunces',serif;font-size:16px;font-weight:700;
            color:var(--ink);margin-bottom:1rem;" id="d-patient"></div>
          <div id="d-clues-list" style="display:flex;flex-direction:column;gap:0.6rem;"></div>
        </div>

        <button id="d-reveal-btn" onclick="revealNextClue()" style="
          width:100%;background:var(--cream-dark);border:2px dashed var(--ink-light);
          border-radius:16px;padding:1rem;font-family:'DM Sans',sans-serif;
          font-size:14px;font-weight:600;color:var(--ink-mid);cursor:pointer;
          transition:all 0.2s;margin-bottom:1rem;display:flex;align-items:center;
          justify-content:center;gap:8px;">
          <span id="d-reveal-icon">👁</span>
          <span id="d-reveal-txt">Volgende hint onthullen</span>
          <span id="d-pts-badge" style="font-size:11px;background:var(--amber);color:white;
            padding:2px 8px;border-radius:6px;font-weight:700;"></span>
        </button>

        <div class="q-card" id="d-answer-area">
          <div style="font-size:12px;color:var(--ink-light);font-weight:600;
            letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.75rem;">
            Wat is jouw diagnose?
          </div>
          <div id="d-choices" style="display:flex;flex-direction:column;gap:0.5rem;"></div>
        </div>
      </div>
    </div>`;
}

function loadDossierCase() {
  const c = D.cases[D.caseIdx];
  D.currentHints = 0;
  D.locked = false;

  document.getElementById('d-casenum').textContent  = D.caseIdx + 1;
  document.getElementById('d-casetotal').textContent = D.cases.length;
  document.getElementById('d-patient').textContent   = c.patient;
  document.getElementById('d-hints').textContent     = D.totalHints;
  document.getElementById('d-clues-list').innerHTML  = '';

  const btn = document.getElementById('d-reveal-btn');
  if (btn) { btn.style.display = 'flex'; btn.style.opacity = '1'; }

  updateStars(0);
  updateRevealBtn(0);
  revealClue(0); // Eerste hint altijd gratis

  document.getElementById('d-choices').innerHTML = c.options.map((opt, i) =>
    `<button class="ans-btn" onclick="dossierAnswer(${i}, this)" data-i="${i}">
      <span class="ans-key">${['A', 'B', 'C', 'D'][i]}</span>${opt}
    </button>`
  ).join('');
}

function revealClue(idx) {
  const c = D.cases[D.caseIdx];
  const clue = c.clues[idx];
  const list = document.getElementById('d-clues-list');
  if (!list) return;

  const el = document.createElement('div');
  el.style.cssText = `
    background: var(--cream);
    border-radius: 12px;
    padding: 0.75rem 0.9rem;
    border-left: 3px solid var(--amber);
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.3s, transform 0.3s;`;
  el.innerHTML = `
    <div style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
      color:var(--amber);margin-bottom:3px;">${clue.label}</div>
    <div style="font-size:14px;color:var(--ink);line-height:1.5;">${clue.text}</div>`;
  list.appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(0)';
  });
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 120);
}

function revealNextClue() {
  if (D.locked) return;
  const c = D.cases[D.caseIdx];
  const nextIdx = D.currentHints + 1;

  if (nextIdx >= c.clues.length) {
    const btn = document.getElementById('d-reveal-btn');
    if (btn) btn.style.display = 'none';
    return;
  }

  D.currentHints++;
  D.totalHints++;
  document.getElementById('d-hints').textContent = D.totalHints;

  revealClue(nextIdx);
  updateStars(D.currentHints);
  updateRevealBtn(nextIdx);
}

function updateStars(n) {
  const count = n <= 1 ? 3 : n <= 3 ? 2 : 1;
  const el = document.getElementById('d-stars');
  if (el) el.innerHTML = Array(3).fill(0).map((_, i) =>
    `<span style="font-size:20px;opacity:${i < count ? 1 : 0.2};">⭐</span>`
  ).join('');
}

function updateRevealBtn(currentIdx) {
  const c = D.cases[D.caseIdx];
  const nextIdx = currentIdx + 1;
  const hasMore = nextIdx < c.clues.length;

  const icon  = document.getElementById('d-reveal-icon');
  const txt   = document.getElementById('d-reveal-txt');
  const badge = document.getElementById('d-pts-badge');
  const btn   = document.getElementById('d-reveal-btn');

  if (!hasMore) {
    if (btn)   btn.style.opacity = '0.4';
    if (icon)  icon.textContent  = '🔒';
    if (txt)   txt.textContent   = 'Alle hints onthuld';
    if (badge) badge.textContent = '';
  } else {
    if (icon)  icon.textContent  = '👁';
    if (txt)   txt.textContent   = `Hint: ${c.clues[nextIdx].label}`;
    if (badge) badge.textContent = '−punten';
  }
}

function dossierAnswer(idx, btn) {
  if (D.locked) return;
  D.locked = true;
  const c = D.cases[D.caseIdx];
  const ok = idx === c.correct;

  document.querySelectorAll('#d-choices .ans-btn').forEach(b => {
    b.disabled = true;
    if (parseInt(b.dataset.i) === c.correct) b.classList.add('correct');
  });
  if (!ok) btn.classList.add('wrong');

  const stars = D.currentHints <= 1 ? 3 : D.currentHints <= 3 ? 2 : 1;
  const pts   = ok ? (stars === 3 ? 150 : stars === 2 ? 100 : 50) : 0;
  D.score += pts;

  const scoreEl = document.getElementById('d-score');
  if (scoreEl) scoreEl.textContent = D.score;

  D.caseResults.push({
    patient: c.patient, diagnosis: c.diagnosis,
    hintsUsed: D.currentHints, stars: ok ? stars : 0, pts, ok,
  });

  const fact = {
    q: c.patient,
    ex: ok
      ? `Diagnose: ${c.diagnosis}. Je loste deze zaak op met ${D.currentHints + 1} hint${D.currentHints !== 0 ? 's' : ''}.`
      : `De juiste diagnose was: ${c.diagnosis}. Probeer de volgende kasus met minder hints!`,
    dl: 'Het Dossier',
    domain: 'dossier',
  };

  showToast(
    ok,
    ok ? `+${pts} punten ${'⭐'.repeat(stars)}` : `Helaas — ${c.diagnosis}`,
    ok
      ? `Correct! Je gebruikte ${D.currentHints + 1} hint${D.currentHints > 0 ? 's' : ''}.`
      : `De juiste diagnose: ${c.diagnosis}.`,
    fact
  );

  D.nextQTimer = setTimeout(() => {
    D.nextQTimer = null;
    hideToast();
    advanceDossier();
  }, 2800);
}

function advanceDossier() {
  D.caseIdx++;
  if (D.caseIdx >= D.cases.length) {
    endDossier();
  } else {
    renderDossierScreen();
    showScreen('dossier');
    loadDossierCase();
  }
}

function endDossier() {
  const total    = D.cases.length;
  const avgHints = (D.totalHints / total).toFixed(1);
  const pct      = Math.round(D.score / (total * 150) * 100);
  const [, gl, gc] = gradeFromPct(pct);

  saveStats({
    played: (loadStats().played || 0) + 1,
    best:   Math.max(loadStats().best || 0, D.score),
  });

  const casesHTML = D.caseResults.map(r => `
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.6rem 0;
      border-bottom:1px solid var(--cream-dark);">
      <span style="font-size:16px;">${r.ok ? '✅' : '❌'}</span>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:600;color:var(--ink);">${r.diagnosis}</div>
        <div style="font-size:11px;color:var(--ink-light);">
          ${r.patient} · ${r.hintsUsed + 1} hint${r.hintsUsed > 0 ? 's' : ''}
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-family:'Fraunces',serif;font-size:16px;font-weight:700;
          color:${r.ok ? 'var(--green)' : 'var(--ink-light)'};">${r.pts} pts</div>
        <div style="font-size:13px;">${'⭐'.repeat(r.stars)}${'☆'.repeat(3 - r.stars)}</div>
      </div>
    </div>`).join('');

  document.getElementById('app').innerHTML = `
    <div id="dossier-results" class="screen active">
      <div style="max-width:480px;margin:0 auto;padding:2rem 1.25rem 3rem;text-align:center;">
        <div class="results-eyebrow fade-in">Dossier gesloten</div>
        <div class="score-big fade-in-1"><span style="color:var(--pulse);">${D.score}</span></div>
        <div class="grade-tag fade-in-2" style="background:${gc};">${pct}% · ${gl}</div>

        <div class="breakdown-card fade-in-3" style="text-align:left;margin-top:1.5rem;">
          <div class="breakdown-title">📁 Zaken overzicht</div>
          ${casesHTML}
        </div>

        <div style="background:var(--ink);border-radius:20px;padding:1.5rem;
          margin:1rem 0;text-align:left;" class="fade-in-4">
          <div style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;
            color:rgba(255,255,255,0.45);font-weight:600;margin-bottom:0.5rem;">🔗 Uitdagen</div>
          <div style="font-family:'Fraunces',serif;font-size:18px;font-weight:700;
            color:white;margin-bottom:0.4rem;">Kun jij het beter?</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:1rem;line-height:1.5;">
            Jij gebruikte gemiddeld <strong style="color:var(--pulse-mid);">${avgHints} hints</strong> per zaak.
            Stuur de link en kijk of een vriend het met minder hints oplost.
          </div>
          <button onclick="copyChallenge()" id="copy-challenge-btn" style="
            width:100%;background:var(--pulse);border:none;border-radius:12px;
            padding:0.85rem;font-family:'DM Sans',sans-serif;font-size:14px;
            font-weight:600;color:white;cursor:pointer;
            display:flex;align-items:center;justify-content:center;gap:8px;">
            📋 Kopieer uitdagingslink
          </button>
        </div>

        <div class="action-row fade-in-5" style="margin-top:0.5rem;">
          <button class="btn-primary" onclick="startDossier()">🔁 Nieuw dossier</button>
          <button class="btn-secondary" onclick="showHome()">← Home</button>
        </div>
      </div>
    </div>`;
}

function copyChallenge() {
  const order = D.cases.map(c => DOSSIER_CASES.findIndex(dc => dc.id === c.id)).join('');
  const url = `${window.location.origin}${window.location.pathname}?challenge=${order}&score=${D.score}&hints=${D.totalHints}`;
  const msg = `Ik scoorde ${D.score} punten op MedDuel — Dossier Modus!\nKun jij de 5 patiënten oplossen met minder hints?\n\n${url}`;

  navigator.clipboard.writeText(msg).then(() => {
    const btn = document.getElementById('copy-challenge-btn');
    if (btn) {
      btn.textContent = '✓ Gekopieerd!';
      btn.style.background = 'var(--green)';
      setTimeout(() => {
        btn.innerHTML = '📋 Kopieer uitdagingslink';
        btn.style.background = 'var(--pulse)';
      }, 2500);
    }
  }).catch(() => { alert(url); });
}

function quitDossier() {
  hideToast();
  showHome();
}
