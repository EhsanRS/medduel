// MedDuel — Speurdokter modus

let SD = {};

function getTodayDetectiveCase() {
  const today = getTodayStr();
  const exact = DETECTIVE_CASES.find(c => c.date === today);
  if (exact) return exact;
  const dayNum = getDailyNum();
  return DETECTIVE_CASES[(dayNum - 1) % DETECTIVE_CASES.length];
}

function loadDetectiveRecord() {
  try { return JSON.parse(localStorage.getItem('md_detective') || 'null'); } catch { return null; }
}

function saveDetectiveRecord(r) {
  try { localStorage.setItem('md_detective', JSON.stringify(r)); } catch {}
}

// ── Entry point ──────────────────────────────────────────────

function startSpeurdokter() {
  const c = getTodayDetectiveCase();
  if (!c) return;
  const today = getTodayStr();
  const rec = loadDetectiveRecord();

  if (rec && rec.date === today && rec.caseId === c.id && rec.phase === 'done') {
    SD = { case: c, chosenIdx: rec.chosenIdx };
    renderSpeurdokterReveal(rec);
    return;
  }

  SD = {
    case: c,
    phase: 'intro',
    stepsUsed: 0,
    maxSteps: 5,
    score: 0,
    clues: [],
    remaining: c.investigations.map(i => i.id),
    board: [],
    activeCategory: null,
    lastResult: null,
    date: today,
    chosenIdx: -1,
  };
  sdRefillBoard();

  renderSpeurdokterIntro();
}

// ── Intro ────────────────────────────────────────────────────

function renderSpeurdokterIntro() {
  const c = SD.case;
  const stars = sdStars(c.difficulty);

  document.getElementById('app').innerHTML = `
    <div id="speurdokter" class="screen active">
      <div class="sd-wrap">
        <div class="sd-nav">
          <button class="quit-btn" onclick="showHome()">✕ Sluiten</button>
          <span class="sd-nav-title">🔍 Speurdokter</span>
        </div>

        <div class="sd-intro-card fade-in">
          <div class="sd-intro-stamp">DIAGNOSE ONBEKEND</div>
          <div class="sd-patient-line">
            <span class="sd-patient-icon">🏥</span>
            <span class="sd-patient-label">${escHtml(c.patient)}</span>
          </div>
          <h2 class="sd-case-title">${escHtml(c.title)}</h2>
          <div class="sd-difficulty">${stars}</div>
          <p class="sd-intro-text">${escHtml(c.intro)}</p>
          <button class="btn-primary sd-start-btn" onclick="sdBeginInvestigation()">
            Begin onderzoek →
          </button>
        </div>

        <div class="sd-rules fade-in-2">
          <div class="sd-rule">🔬 Kies wat je wilt onderzoeken</div>
          <div class="sd-rule">⚡ Minder stappen = hogere score</div>
          <div class="sd-rule">🎯 Stel diagnose zodra je het weet</div>
        </div>
      </div>
    </div>`;
}

function sdBeginInvestigation() {
  SD.phase = 'investigate';
  renderSpeurdokterGame();
}

// ── Board helpers ─────────────────────────────────────────────

function sdRefillBoard() {
  const pool = SD.remaining.filter(id => {
    if (SD.board.includes(id)) return false;
    if (!SD.activeCategory) return true;
    const inv = SD.case.investigations.find(i => i.id === id);
    return inv && inv.category === SD.activeCategory;
  });
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  while (SD.board.length < 4 && shuffled.length > 0) {
    SD.board.push(shuffled.pop());
  }
}

function sdAdvanceBoard(pickedId) {
  SD.remaining = SD.remaining.filter(id => id !== pickedId);
  SD.board     = SD.board.filter(id => id !== pickedId);
  sdRefillBoard();
}

function sdSetCategory(key) {
  const newCat = key === 'all' ? null : key;
  SD.activeCategory = SD.activeCategory === newCat ? null : newCat;
  // Flush board items that don't match new category, refill
  if (SD.activeCategory) {
    SD.board = SD.board.filter(id => {
      const inv = SD.case.investigations.find(i => i.id === id);
      return inv && inv.category === SD.activeCategory;
    });
  }
  sdRefillBoard();
  renderSpeurdokterGame();
}

function sdCategoryCount(cat) {
  return SD.remaining.filter(id => {
    const inv = SD.case.investigations.find(i => i.id === id);
    return inv && inv.category === cat;
  }).length;
}

function sdBuildCatTabs() {
  const CATS = [
    { key: 'all',      icon: '⬡',  label: 'Alle',     filter: null },
    { key: 'history',  icon: '📋', label: 'Anamnese', filter: 'history' },
    { key: 'lab',      icon: '🔬', label: 'Lab',      filter: 'lab' },
    { key: 'imaging',  icon: '🖼️', label: 'Beeld',    filter: 'imaging' },
    { key: 'physical', icon: '🩺', label: 'LO',       filter: 'physical' },
  ];
  return CATS.map(cat => {
    const count = cat.filter ? sdCategoryCount(cat.filter) : SD.remaining.length;
    const isActive = SD.activeCategory === cat.filter;
    const isEmpty = cat.filter && count === 0;
    const countBadge = cat.filter ? ` <span class="sd-cat-count">${count}</span>` : '';
    return `<button class="sd-cat-tab${isActive ? ' active' : ''}${isEmpty ? ' empty' : ''}"
      onclick="sdSetCategory('${cat.key}')"${isEmpty ? ' disabled' : ''}>
      ${cat.icon} ${cat.label}${countBadge}
    </button>`;
  }).join('');
}

// ── Investigation screen ──────────────────────────────────────

function renderSpeurdokterGame() {
  const c = SD.case;
  const boardInvs = c.investigations.filter(i => SD.board.includes(i.id));
  const canDiagnose = SD.stepsUsed >= 2;
  const totalLeft = SD.remaining.length;

  const invCards = boardInvs.map(inv => `
    <div class="sd-inv-card sd-cat-${inv.category}" onclick="sdPickInvestigation('${inv.id}')">
      <span class="sd-inv-icon">${inv.icon}</span>
      <span class="sd-inv-label">${escHtml(inv.label)}</span>
    </div>`).join('');

  document.getElementById('app').innerHTML = `
    <div id="speurdokter" class="screen active">
      <div class="sd-wrap">
        <div class="sd-nav">
          <button class="quit-btn" onclick="sdQuit()">✕ Stop</button>
          <div class="sd-hud">
            <span class="sd-hud-item">
              <span class="sd-hud-val">${SD.score}</span>
              <span class="sd-hud-lbl">Punten</span>
            </span>
            <span class="sd-hud-sep">·</span>
            <span class="sd-hud-item">
              <span class="sd-hud-val">${SD.stepsUsed}/${SD.maxSteps}</span>
              <span class="sd-hud-lbl">Stappen</span>
            </span>
          </div>
        </div>

        ${sdClueStrip()}

        <div class="sd-board-header">
          <span class="sd-section-label">Welk onderzoek kiest u?</span>
          <span class="sd-board-pool">${totalLeft} beschikbaar</span>
        </div>
        <div class="sd-cat-tabs">${sdBuildCatTabs()}</div>
        <div class="sd-inv-grid">${invCards || `<div class="sd-cat-empty">Geen onderzoeken beschikbaar in deze categorie</div>`}</div>

        <div class="sd-diag-wrap">
          <button class="btn-primary sd-diag-btn"
            onclick="sdStartDiagnosis()"
            ${canDiagnose ? '' : 'disabled'}>
            Diagnose stellen →
          </button>
          ${!canDiagnose ? '<div class="sd-diag-hint">Doe eerst minimaal 2 onderzoeken</div>' : ''}
        </div>
      </div>
    </div>`;
}

function sdPickInvestigation(id) {
  const inv = SD.case.investigations.find(i => i.id === id);
  if (!inv) return;

  sdAdvanceBoard(id);
  SD.stepsUsed++;
  SD.score = Math.max(0, SD.score + inv.points);

  SD.clues.push({
    id: inv.id,
    summary: inv.result.summary,
    badge: inv.result.badge,
    category: inv.category,
    points: inv.points,
  });

  SD.lastResult = inv;
  SD.phase = 'result-shown';
  sdShowScorePop(inv.points);
  renderSpeurdokterResult(inv);
}

function sdShowScorePop(pts) {
  const el = document.createElement('div');
  el.className = 'sd-score-pop ' + (pts > 0 ? 'pos' : 'neg');
  el.textContent = pts > 0 ? `+${pts}` : `${pts}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

// ── Result screen ─────────────────────────────────────────────

function renderSpeurdokterResult(inv) {
  const badgeCfg = {
    eureka: { cls: 'sd-badge-eureka', text: '⚡ Cruciale bevinding!', pts: `+${inv.points} punten` },
    key:    { cls: 'sd-badge-key',    text: '🔑 Sleutelbevinding',   pts: `+${inv.points} punten` },
    useful: { cls: 'sd-badge-useful', text: '✓ Nuttige bevinding',   pts: `+${inv.points} punten` },
    not:    { cls: 'sd-badge-not',    text: '— Niet relevant',       pts: `${inv.points} punten` },
  };
  const bc = badgeCfg[inv.result.badge] || badgeCfg.useful;

  const contentHtml = sdResultContent(inv);
  const canDiagnose = SD.stepsUsed >= 2;
  const forceDiagnose = (SD.remaining.length === 0 && SD.board.length === 0) || SD.stepsUsed >= SD.maxSteps;

  let actionHtml;
  if (forceDiagnose) {
    actionHtml = `<button class="btn-primary sd-diag-btn" onclick="sdStartDiagnosis()">Diagnose stellen →</button>`;
  } else if (canDiagnose) {
    actionHtml = `
      <div class="sd-action-row">
        <button class="btn-secondary" onclick="sdContinueInvestigation()">Meer onderzoek</button>
        <button class="btn-primary"   onclick="sdStartDiagnosis()">Diagnose stellen →</button>
      </div>`;
  } else {
    actionHtml = `<button class="btn-secondary" style="width:100%;" onclick="sdContinueInvestigation()">Volgende onderzoek →</button>`;
  }

  document.getElementById('app').innerHTML = `
    <div id="speurdokter" class="screen active">
      <div class="sd-wrap">
        <div class="sd-nav">
          <button class="quit-btn" onclick="sdQuit()">✕ Stop</button>
          <div class="sd-hud">
            <span class="sd-hud-item">
              <span class="sd-hud-val">${SD.score}</span>
              <span class="sd-hud-lbl">Punten</span>
            </span>
            <span class="sd-hud-sep">·</span>
            <span class="sd-hud-item">
              <span class="sd-hud-val">${SD.stepsUsed}/${SD.maxSteps}</span>
              <span class="sd-hud-lbl">Stappen</span>
            </span>
          </div>
        </div>

        ${sdClueStrip()}

        <div class="sd-result-card fade-in">
          <div class="sd-result-header">
            <span class="sd-result-icon">${inv.icon}</span>
            <span class="sd-result-label">${escHtml(inv.label)}</span>
          </div>
          ${contentHtml}
          <div class="${bc.cls}">${bc.text} <strong>${bc.pts}</strong></div>
          ${inv.result.note ? `<div class="sd-result-note">${escHtml(inv.result.note)}</div>` : ''}
        </div>

        <div class="sd-diag-wrap">${actionHtml}</div>
      </div>
    </div>`;
}

function sdResultContent(inv) {
  const r = inv.result;

  if (r.type === 'labs') {
    const rows = r.labs.map(l => {
      const arrow = l.status === 'high'
        ? '<span class="sd-arrow high">↑</span>'
        : l.status === 'low'
          ? '<span class="sd-arrow low">↓</span>'
          : '';
      return `<tr>
        <td class="sd-lab-name">${escHtml(l.name)}</td>
        <td class="sd-lab-val">${l.value} ${escHtml(l.unit)} ${arrow}</td>
        <td class="sd-lab-ref">${escHtml(l.ref)}</td>
      </tr>`;
    }).join('');
    return `<table class="sd-lab-table">
      <thead><tr><th>Parameter</th><th>Waarde</th><th>Referentie</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  }

  if (r.type === 'imaging') {
    const imgHtml = r.img
      ? `<img src="img/detective/${r.img}" alt="${escHtml(inv.label)}" class="sd-result-img"
           onerror="this.outerHTML='<div class=\\'sd-img-placeholder\\'>${inv.icon}<small>Afbeelding volgt</small></div>'">`
      : `<div class="sd-img-placeholder">${inv.icon}<small>Afbeelding volgt</small></div>`;
    return `<div class="sd-img-wrap">${imgHtml}</div>
            <p class="sd-result-text">${escHtml(r.text)}</p>`;
  }

  if (r.type === 'quote') {
    return `<blockquote class="sd-result-quote">${escHtml(r.text)}</blockquote>`;
  }

  if (r.type === 'eureka') {
    return `<div class="sd-result-eureka">${escHtml(r.text)}</div>`;
  }

  return `<p class="sd-result-text">${escHtml(r.text)}</p>`;
}

function sdContinueInvestigation() {
  SD.phase = 'investigate';
  renderSpeurdokterGame();
}

// ── Diagnosis screen ──────────────────────────────────────────

function sdStartDiagnosis() {
  SD.phase = 'diagnose';
  renderSpeurdokterDiagnosis();
}

function renderSpeurdokterDiagnosis() {
  const c = SD.case;
  const options = c.diagnosis.options.map((opt, i) =>
    `<button class="sd-diag-option" onclick="sdSubmitDiagnosis(${i})" data-i="${i}">${escHtml(opt)}</button>`
  ).join('');

  document.getElementById('app').innerHTML = `
    <div id="speurdokter" class="screen active">
      <div class="sd-wrap">
        <div class="sd-nav">
          <button class="quit-btn" onclick="sdQuit()">✕ Stop</button>
          <span class="sd-nav-title">Stel uw diagnose</span>
        </div>

        ${sdClueStrip()}

        <div class="sd-diag-card fade-in">
          <div class="sd-diag-prompt">${escHtml(c.diagnosis.prompt)}</div>
          <div class="sd-diag-options">${options}</div>
          <button class="btn-ghost sd-back-btn" onclick="sdContinueInvestigation()">← Terug naar onderzoek</button>
        </div>
      </div>
    </div>`;
}

function sdSubmitDiagnosis(idx) {
  const c = SD.case;
  const correct = idx === c.diagnosis.correct;

  document.querySelectorAll('.sd-diag-option').forEach(b => {
    b.disabled = true;
    if (parseInt(b.dataset.i) === c.diagnosis.correct) b.classList.add('correct');
  });
  if (!correct) {
    const wrongBtn = document.querySelector(`.sd-diag-option[data-i="${idx}"]`);
    if (wrongBtn) wrongBtn.classList.add('wrong');
  }

  // Final score
  let bonus = 0;
  if (correct) {
    bonus += 50;
    if (SD.stepsUsed <= 2) bonus += 80;
    else if (SD.stepsUsed <= 3) bonus += 50;
    else if (SD.stepsUsed <= 4) bonus += 25;
  } else {
    bonus = -50;
  }
  SD.score = Math.max(0, SD.score + bonus);
  SD.chosenIdx = idx;
  SD.phase = 'done';

  const rec = {
    date: SD.date,
    caseId: c.id,
    score: SD.score,
    correct,
    chosenIdx: idx,
    stepsUsed: SD.stepsUsed,
    clues: SD.clues,
    phase: 'done',
  };
  saveDetectiveRecord(rec);

  setTimeout(() => renderSpeurdokterReveal(rec), 700);
}

// ── Reveal screen ─────────────────────────────────────────────

function renderSpeurdokterReveal(rec) {
  const c = SD.case;
  if (!c) { showHome(); return; }

  const correctLabel = c.diagnosis.options[c.diagnosis.correct];
  const isCorrect = rec.correct;

  const clueChips = (rec.clues || []).map(cl => {
    const cls = cl.badge === 'eureka' ? 'sd-chip eureka'
              : cl.badge === 'key'    ? 'sd-chip key'
              : cl.badge === 'not'    ? 'sd-chip not'
              : 'sd-chip';
    return `<span class="${cls}">${escHtml(cl.summary)}</span>`;
  }).join('');

  const invMax = c.investigations.filter(i => i.useful).reduce((s, i) => s + i.points, 0);
  const maxScore = invMax + 50 + 80;
  const pct = Math.min(100, Math.round(rec.score / maxScore * 100));
  const barColor = pct >= 70 ? 'var(--green)' : pct >= 45 ? 'var(--amber)' : 'var(--pulse)';
  const barLabel = pct >= 70 ? 'Uitstekend' : pct >= 45 ? 'Goed' : 'Kan beter';

  // Score breakdown
  const clueLines = (rec.clues || []).map(cl => {
    const sign = cl.points > 0 ? '+' : '';
    return `<div class="sd-score-line ${cl.points > 0 ? 'pos' : 'neg'}">
      <span>${escHtml(cl.summary)}</span><span>${sign}${cl.points}</span>
    </div>`;
  }).join('');
  let diagBonus = rec.correct ? 50 : -50;
  let stepBonus = 0;
  if (rec.correct) {
    if (rec.stepsUsed <= 2) stepBonus = 80;
    else if (rec.stepsUsed <= 3) stepBonus = 50;
    else if (rec.stepsUsed <= 4) stepBonus = 25;
  }
  const breakdownHtml = `
    <details class="sd-score-breakdown">
      <summary>Hoe is deze score opgebouwd?</summary>
      ${clueLines}
      <div class="sd-score-line divider"></div>
      <div class="sd-score-line ${rec.correct ? 'pos' : 'neg'}">
        <span>${rec.correct ? 'Juiste diagnose' : 'Foute diagnose'}</span>
        <span>${rec.correct ? '+50' : '−50'}</span>
      </div>
      ${stepBonus > 0 ? `<div class="sd-score-line pos"><span>Snelheidsbonus</span><span>+${stepBonus}</span></div>` : ''}
      <div class="sd-score-line total"><span>Totaal</span><span>${rec.score}</span></div>
    </details>`;

  const memoryHtml = (c.memory && c.memory.length)
    ? `<div class="sd-memory-card fade-in-2">
        <div class="sd-memory-head">🔑 Onthoud dit</div>
        <ul class="sd-memory-list">
          ${c.memory.map(m => `<li class="sd-memory-item">${escHtml(m)}</li>`).join('')}
        </ul>
      </div>`
    : '';

  const wikiHtml = c.diagnosis.wiki
    ? `<details class="sd-wiki">
        <summary>Meer over ${escHtml(correctLabel)}</summary>
        <p>${escHtml(c.diagnosis.wiki)}</p>
       </details>`
    : '';

  document.getElementById('app').innerHTML = `
    <div id="speurdokter-result" class="screen active">

      <div class="sd-reveal-hero ${isCorrect ? 'correct' : 'wrong'} fade-in">
        <div class="sd-reveal-stamp">${isCorrect ? 'DIAGNOSE VASTGESTELD' : 'DIAGNOSE GEMIST'}</div>
        <div class="sd-reveal-name">${escHtml(correctLabel)}</div>
        ${!isCorrect
          ? `<div class="sd-reveal-chosen">Uw keuze: ${escHtml(c.diagnosis.options[rec.chosenIdx] || '?')}</div>`
          : ''}
      </div>

      <div class="sd-wrap">

        <div class="sd-reveal-scorebox fade-in-1">
          <div class="sd-reveal-score-row">
            <div class="sd-reveal-score-num">${rec.score}<span>pt</span></div>
            <div class="sd-reveal-score-badge" style="color:${barColor}">${barLabel}</div>
          </div>
          <div class="sd-reveal-barwrap">
            <div class="sd-reveal-bar" style="width:${pct}%;background:${barColor}"></div>
          </div>
          <div class="sd-reveal-meta">${rec.stepsUsed} onderzoek${rec.stepsUsed === 1 ? '' : 'en'} · ${pct}% efficiency</div>
          ${breakdownHtml}
        </div>

        ${memoryHtml}

        ${clueChips ? `<div class="sd-clues-section fade-in-3">
          <div class="sd-section-label">Uw spoor</div>
          <div class="sd-chips">${clueChips}</div>
        </div>` : ''}

        <div class="sd-explain-card fade-in-4">
          <div class="sd-explain-head">Uitleg</div>
          <p class="sd-explain-text">${escHtml(c.diagnosis.explanation)}</p>
          ${wikiHtml}
        </div>

        <div class="sd-countdown-card fade-in-5">
          <div class="sd-countdown-label">Volgende zaak over</div>
          <div class="sd-countdown" id="sdCountdown">--:--:--</div>
        </div>

        <div class="action-row fade-in-5">
          <button class="btn-secondary" style="width:100%;" onclick="showHome()">← Terug naar home</button>
        </div>

      </div>
    </div>`;

  sdStartCountdown();
}

function sdStartCountdown() {
  const tick = () => {
    const el = document.getElementById('sdCountdown');
    if (!el) return;
    const now = new Date();
    const midnight = new Date(now); midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;
    if (diff <= 0) { el.textContent = 'Nu beschikbaar! 🎉'; return; }
    const hh = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    el.textContent = `${hh}:${mm}:${ss}`;
    setTimeout(tick, 1000);
  };
  tick();
}

function sdQuit() {
  showHome();
}

// ── Shared helpers ────────────────────────────────────────────

function sdClueStrip() {
  if (!SD.clues || SD.clues.length === 0) return '';
  const chips = SD.clues.map(cl => {
    const cls = cl.badge === 'eureka' ? 'sd-chip eureka'
              : cl.badge === 'key'    ? 'sd-chip key'
              : cl.badge === 'not'    ? 'sd-chip not'
              : 'sd-chip';
    return `<span class="${cls}">${escHtml(cl.summary)}</span>`;
  }).join('');
  return `<div class="sd-clues-section">
    <div class="sd-section-label">Bewijs</div>
    <div class="sd-chips">${chips}</div>
  </div>`;
}

function sdStars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

// ── Home tab render ───────────────────────────────────────────

function renderSpeurdokterTab() {
  const c = getTodayDetectiveCase();
  const today = getTodayStr();
  const rec = loadDetectiveRecord();
  const done = rec && rec.date === today && c && rec.caseId === c.id && rec.phase === 'done';
  const stars = c ? sdStars(c.difficulty) : '';

  let heroHtml = '';
  if (!c) {
    heroHtml = `<div class="sd-tab-empty">Geen zaak beschikbaar vandaag.</div>`;
  } else if (done) {
    heroHtml = `
      <div class="sd-home-card played fade-in-1" onclick="startSpeurdokter()">
        <div class="sd-home-solved">✓ ZAAK OPGELOST</div>
        <div class="sd-home-title">${escHtml(c.title)}</div>
        <div class="sd-home-meta">${stars} · ${rec.score} punten · ${rec.stepsUsed} stap${rec.stepsUsed === 1 ? '' : 'pen'}</div>
        <div class="sd-home-cta">Bekijk uitleg →</div>
      </div>`;
  } else {
    heroHtml = `
      <div class="sd-home-card fade-in-1" onclick="startSpeurdokter()">
        <div class="sd-home-eyebrow">Nieuwe zaak beschikbaar</div>
        <div class="sd-home-title">${escHtml(c.title)}</div>
        <div class="sd-home-meta">${stars} · ${escHtml(c.patient)}</div>
        <div class="sd-home-cta">Begin onderzoek →</div>
      </div>`;
  }

  document.getElementById('htab').innerHTML = `
    <div class="htab-header fade-in">
      <h2 class="htab-title">🔍 Speurdokter</h2>
      <p class="htab-sub">Eén mysterieuze patiënt per dag. Jij stelt de diagnose.</p>
    </div>

    ${heroHtml}

    <div class="sd-how-card fade-in-2">
      <div class="sd-how-title">Hoe werkt het?</div>
      <div class="sd-how-step"><span class="sd-how-icon">🔬</span><span>Kies welke onderzoeken je wilt doen</span></div>
      <div class="sd-how-step"><span class="sd-how-icon">📋</span><span>Verzamel bewijs en bouw een beeld op</span></div>
      <div class="sd-how-step"><span class="sd-how-icon">🎯</span><span>Stel diagnose zodra je het weet</span></div>
      <div class="sd-how-step"><span class="sd-how-icon">⚡</span><span>Minder stappen = hogere score</span></div>
    </div>`;
}
