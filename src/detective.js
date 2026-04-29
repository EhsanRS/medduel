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
  if (c) startSpeurdokterCase(c.id);
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

// ── Category navigation ───────────────────────────────────────

// ── Phase system ──────────────────────────────────────────────

const SD_PHASES = [
  { num: 1, icon: '🩺', name: 'Eerste indruk',        desc: 'Vitalen en eerste observatie' },
  { num: 2, icon: '💬', name: 'Anamnese',              desc: 'De patiënt uithoren' },
  { num: 3, icon: '🔍', name: 'Lichamelijk onderzoek', desc: 'Gericht onderzoek van de patiënt' },
  { num: 4, icon: '🔬', name: 'Aanvullend onderzoek',  desc: 'Lab, beeldvorming, puncties...' },
];

// Penalty for using Phase 3/4 before Phase 1 is done
const SD_OOO_PENALTY = { 3: 20, 4: 50 };

function sdReqsMet(inv) {
  if (!inv.requires || inv.requires.length === 0) return true;
  return inv.requires.every(reqId => SD.clues.some(cl => cl.id === reqId));
}

function sdPhasePool(phaseNum) {
  return SD.remaining.filter(id => {
    const inv = SD.case.investigations.find(i => i.id === id);
    return inv && inv.phase === phaseNum && sdReqsMet(inv);
  });
}

function sdPhaseCompleted(phaseNum) {
  return SD.clues.some(cl => {
    const inv = SD.case.investigations.find(i => i.id === cl.id);
    return inv && inv.phase === phaseNum;
  });
}

function sdPickPhase(num) {
  const pool = sdPhasePool(num);
  SD.currentOptions = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
  SD.pickedPhase = num;
  renderSpeurdokterGame();
}

function sdBackToPhases() {
  SD.pickedPhase = null;
  renderSpeurdokterGame();
}

// ── Vitals helpers ───────────────────────────────────────────

function sdApplyDecay(inv) {
  const c = SD.case;
  if (!c.vitals_decay || !SD.currentVitals) return;
  SD.timeUsed += inv.time_cost || 5;
  const d = c.vitals_decay.per_action;
  const v = SD.currentVitals;
  v.hr     = Math.round(v.hr + (d.hr || 0));
  v.bp_sys = Math.round(v.bp_sys + (d.bp_sys || 0));
  v.temp   = Math.round((v.temp + (d.temp || 0)) * 10) / 10;
  v.gcs    = Math.max(3, Math.min(15, v.gcs + (d.gcs || 0)));
  for (const t of (c.vitals_decay.triggers || [])) {
    const val = v[t.field];
    const hit = t.above ? (val >= t.threshold) : (val <= t.threshold);
    const key = t.field + t.threshold;
    if (hit && !SD.triggeredAlerts.includes(key)) {
      SD.triggeredAlerts.push(key);
      SD.pendingAlert = t.message;
    }
  }
}

function sdVitalsBar() {
  if (!SD.currentVitals) return '';
  const v = SD.currentVitals;
  const hrWarn  = v.hr > 130;
  const gcsWarn = v.gcs < 12;
  return `<div class="sd-vitals-bar">
    <span class="sd-vital${hrWarn  ? ' warn' : ''}">❤ ${v.hr}<small>/min</small></span>
    <span class="sd-vital">🌡 ${v.temp.toFixed(1)}°</span>
    <span class="sd-vital${gcsWarn ? ' warn' : ''}">🧠 GCS ${v.gcs}</span>
    <span class="sd-vital-time">⏱ ${SD.timeUsed}min</span>
  </div>`;
}

// ── Investigation screen ──────────────────────────────────────

function renderSpeurdokterGame() {
  const c = SD.case;
  const canDiagnose = SD.stepsUsed >= 2;
  const phase1Done = sdPhaseCompleted(1);

  const sdNav = `
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
        ${SD.timeUsed > 0 ? `<span class="sd-hud-sep">·</span>
        <span class="sd-hud-item">
          <span class="sd-hud-val">${SD.timeUsed}m</span>
          <span class="sd-hud-lbl">Tijd</span>
        </span>` : ''}
      </div>
    </div>
    ${sdVitalsBar()}`;

  if (SD.pickedPhase === null) {
    // Level 1 — choose a phase
    const cards = SD_PHASES.map(ph => {
      const pool  = sdPhasePool(ph.num);
      const count = pool.length;
      const done  = count === 0 && sdPhaseCompleted(ph.num);
      const risky = !phase1Done && SD_OOO_PENALTY[ph.num] && count > 0;
      const onclick = count > 0 ? `onclick="sdPickPhase(${ph.num})"` : '';

      let badge, desc;
      if (done) {
        badge = `<span class="sd-phase-badge done">✓</span>`;
        desc  = 'Volledig afgerond';
      } else if (risky) {
        badge = `<span class="sd-phase-badge warn">⚠ −${SD_OOO_PENALTY[ph.num]}</span>`;
        desc  = 'Eerste indruk nog niet gedaan';
      } else if (count === 0) {
        badge = `<span class="sd-phase-badge done">✓</span>`;
        desc  = 'Niets meer beschikbaar';
      } else {
        badge = `<span class="sd-phase-badge">${count}</span>`;
        desc  = ph.desc;
      }

      return `<div class="sd-phase-card${done ? ' done' : ''}${risky ? ' risky' : ''}" ${onclick}>
        <div class="sd-phase-num">${ph.num}</div>
        <div class="sd-phase-info">
          <div class="sd-phase-name">${ph.icon} ${ph.name}</div>
          <div class="sd-phase-desc">${desc}</div>
        </div>
        ${badge}
      </div>`;
    }).join('');

    document.getElementById('app').innerHTML = `
      <div id="speurdokter" class="screen active">
        <div class="sd-wrap">
          ${sdNav}
          ${sdClueStrip()}
          <div class="sd-section-label" style="margin-bottom:0.6rem">Klinische aanpak</div>
          <div class="sd-phase-cards fade-in">${cards}</div>
          <div class="sd-diag-wrap">
            <button class="btn-primary sd-diag-btn" onclick="sdStartDiagnosis()" ${canDiagnose ? '' : 'disabled'}>
              Diagnose stellen →
            </button>
            ${!canDiagnose ? '<div class="sd-diag-hint">Doe eerst minimaal 2 onderzoeken</div>' : ''}
          </div>
        </div>
      </div>`;
  } else {
    // Level 2 — pick a specific investigation
    const ph   = SD_PHASES.find(p => p.num === SD.pickedPhase);
    const risky = !phase1Done && SD_OOO_PENALTY[ph.num];
    const rows  = SD.currentOptions.map(id => {
      const inv = c.investigations.find(i => i.id === id);
      if (!inv) return '';
      return `<div class="sd-inv-row" onclick="sdPickInvestigation('${inv.id}')">
        <span class="sd-inv-row-icon">${inv.icon}</span>
        <span class="sd-inv-row-label">${escHtml(inv.label)}</span>
        <span class="sd-inv-row-arrow">→</span>
      </div>`;
    }).join('');

    document.getElementById('app').innerHTML = `
      <div id="speurdokter" class="screen active">
        <div class="sd-wrap">
          ${sdNav}
          ${sdClueStrip()}
          <button class="sd-back-cat" onclick="sdBackToPhases()">← ${ph.icon} ${ph.name}</button>
          ${risky ? `<div class="sd-oo-banner">⚠ Zonder eerste indruk: extra −${SD_OOO_PENALTY[ph.num]} straf per onderzoek</div>` : ''}
          <div class="sd-inv-list fade-in">${rows}</div>
          <div class="sd-diag-wrap">
            <button class="btn-primary sd-diag-btn" onclick="sdStartDiagnosis()" ${canDiagnose ? '' : 'disabled'}>
              Diagnose stellen →
            </button>
          </div>
        </div>
      </div>`;
  }
}

function sdPickInvestigation(id) {
  const inv = SD.case.investigations.find(i => i.id === id);
  if (!inv) return;

  SD.remaining = SD.remaining.filter(rid => rid !== id);
  SD.pickedPhase = null;
  SD.stepsUsed++;
  sdApplyDecay(inv);

  // Out-of-order penalty: Phase 3/4 before Phase 1 done
  const oooPenalty = (!sdPhaseCompleted(1) && SD_OOO_PENALTY[inv.phase]) || 0;
  const pts = Math.max(-100, inv.points - oooPenalty);
  SD.score = Math.max(0, SD.score + pts);

  SD.clues.push({
    id: inv.id,
    summary: inv.result.summary,
    badge: inv.result.badge,
    category: inv.category,
    points: pts,
    ooo: oooPenalty > 0,
  });

  SD.lastResult = inv;
  SD.phase = 'result-shown';
  sdShowScorePop(pts);
  renderSpeurdokterResult(inv, oooPenalty);
}

function sdShowScorePop(pts) {
  const el = document.createElement('div');
  el.className = 'sd-score-pop ' + (pts > 0 ? 'pos' : 'neg');
  el.textContent = pts > 0 ? `+${pts}` : `${pts}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

// ── Result screen ─────────────────────────────────────────────

function renderSpeurdokterResult(inv, oooPenalty) {
  const lastClue = SD.clues[SD.clues.length - 1];
  const effectivePts = lastClue ? lastClue.points : inv.points;
  const badgeCfg = {
    eureka: { cls: 'sd-badge-eureka', text: '⚡ Cruciale bevinding!', pts: effectivePts > 0 ? `+${effectivePts}` : `${effectivePts}` },
    key:    { cls: 'sd-badge-key',    text: '🔑 Sleutelbevinding',   pts: effectivePts > 0 ? `+${effectivePts}` : `${effectivePts}` },
    useful: { cls: 'sd-badge-useful', text: '✓ Nuttige bevinding',   pts: effectivePts > 0 ? `+${effectivePts}` : `${effectivePts}` },
    not:    { cls: 'sd-badge-not',    text: '— Niet relevant',       pts: `${effectivePts}` },
  };
  const bc = badgeCfg[inv.result.badge] || badgeCfg.useful;
  const oooWarning = oooPenalty > 0
    ? `<div class="sd-oo-warning">⚠ Eerste indruk overgeslagen: −${oooPenalty} extra straf</div>` : '';

  const contentHtml = sdResultContent(inv);
  const canDiagnose = SD.stepsUsed >= 2;
  const forceDiagnose = SD.remaining.length === 0 || SD.stepsUsed >= SD.maxSteps;

  let actionHtml;
  if (forceDiagnose) {
    actionHtml = `<button class="btn-primary sd-diag-btn" onclick="sdStartDiagnosis()">Diagnose stellen →</button>`;
  } else if (canDiagnose) {
    actionHtml = `
      <div class="sd-action-row">
        <button class="btn-secondary" onclick="sdContinueInvestigation()">← Terug naar overzicht</button>
        <button class="btn-primary"   onclick="sdStartDiagnosis()">Diagnose stellen →</button>
      </div>`;
  } else {
    actionHtml = `<button class="btn-secondary" style="width:100%;" onclick="sdContinueInvestigation()">← Terug naar overzicht</button>`;
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
            ${SD.timeUsed > 0 ? `<span class="sd-hud-sep">·</span>
            <span class="sd-hud-item">
              <span class="sd-hud-val">${SD.timeUsed}m</span>
              <span class="sd-hud-lbl">Tijd</span>
            </span>` : ''}
          </div>
        </div>
        ${sdVitalsBar()}

        ${sdClueStrip()}

        ${oooWarning}
        ${SD.pendingAlert ? `<div class="sd-alert-banner">${escHtml(SD.pendingAlert)}</div>` : ''}
        <div class="sd-result-card fade-in">
          <div class="sd-result-header">
            <span class="sd-result-icon">${inv.icon}</span>
            <span class="sd-result-label">${escHtml(inv.label)}</span>
          </div>
          ${contentHtml}
          ${inv.result.findings && inv.result.findings.length ? `
            <div class="sd-findings">
              <div class="sd-findings-label">Ook opgemerkt</div>
              ${inv.result.findings.map(f => `<span class="sd-finding-chip">${escHtml(f)}</span>`).join('')}
            </div>` : ''}
          <div class="${bc.cls}">${bc.text} <strong>${bc.pts} pt</strong></div>
          ${inv.result.note ? `<div class="sd-result-note">${escHtml(inv.result.note)}</div>` : ''}
        </div>

        <div class="sd-diag-wrap">${actionHtml}</div>
      </div>
    </div>`;
  SD.pendingAlert = null;
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
    timeUsed: SD.timeUsed,
    clues: SD.clues,
    outcome: correct ? null : 'wrong_diagnosis',
    phase: correct && c.treatment ? 'treatment' : 'done',
  };
  saveDetectiveRecord(rec);

  if (correct && c.treatment) {
    setTimeout(() => renderSpeurdokterTreatment(rec), 700);
  } else {
    rec.phase = 'done';
    saveDetectiveRecord(rec);
    setTimeout(() => renderSpeurdokterReveal(rec), 700);
  }
}

// ── Treatment screen ──────────────────────────────────────────

function renderSpeurdokterTreatment(rec) {
  const c = SD.case;
  const t = c.treatment;
  const correctLabel = c.diagnosis.options[c.diagnosis.correct];

  const verdict = `<div class="sd-mgmt-verdict correct">✓ Juiste diagnose: ${escHtml(correctLabel)}</div>`;

  const options = t.options.map((opt, i) =>
    `<button class="sd-diag-option" onclick="sdSubmitTreatment(${i})" data-i="${i}">${escHtml(opt.label)}</button>`
  ).join('');

  document.getElementById('app').innerHTML = `
    <div id="speurdokter" class="screen active">
      <div class="sd-wrap">
        <div class="sd-nav">
          <span></span>
          <span class="sd-nav-title">Behandeling</span>
        </div>
        <div class="sd-diag-card fade-in">
          ${verdict}
          <div class="sd-diag-prompt" style="margin-top:1rem">${escHtml(t.prompt)}</div>
          <div class="sd-diag-options">${options}</div>
        </div>
      </div>
    </div>`;
}

function sdSubmitTreatment(idx) {
  const c = SD.case;
  const t = c.treatment;
  const correct = idx === t.correct;

  document.querySelectorAll('.sd-diag-option').forEach(b => {
    b.disabled = true;
    if (parseInt(b.dataset.i) === t.correct) b.classList.add('correct');
  });
  if (!correct) {
    document.querySelector(`.sd-diag-option[data-i="${idx}"]`)?.classList.add('wrong');
  }

  // Determine outcome from option, then check too_late
  let outcome = t.options[idx].outcome || (correct ? 'saved' : 'wrong_treatment');
  const tooLateMin = c.vitals_decay?.too_late_after;
  if (outcome === 'saved' && tooLateMin && SD.timeUsed > tooLateMin) {
    outcome = 'too_late';
  }

  if (correct) SD.score = Math.max(0, SD.score + 20);

  const rec = loadDetectiveRecord();
  rec.score = SD.score;
  rec.treatmentIdx = idx;
  rec.treatmentCorrect = correct;
  rec.outcome = outcome;
  rec.phase = 'done';
  saveDetectiveRecord(rec);

  setTimeout(() => renderSpeurdokterReveal(rec), 700);
}

// ── Reveal screen ─────────────────────────────────────────────

function renderSpeurdokterReveal(rec) {
  const c = SD.case;
  if (!c) { showHome(); return; }

  const correctLabel = c.diagnosis.options[c.diagnosis.correct];
  const isCorrect = rec.correct;
  const outcome = rec.outcome || (isCorrect ? 'saved' : 'wrong_diagnosis');
  const oc = c.outcomes?.[outcome];
  const heroClass = { saved: 'correct', wrong_diagnosis: 'wrong', wrong_treatment: 'warning', patient_harmed: 'critical', too_late: 'late' }[outcome] || (isCorrect ? 'correct' : 'wrong');

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

      <div class="sd-reveal-hero ${heroClass} fade-in">
        <div class="sd-reveal-stamp">${oc?.title || (isCorrect ? 'DIAGNOSE VASTGESTELD' : 'DIAGNOSE GEMIST')}</div>
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

        ${oc ? `<div class="sd-outcome-story fade-in-2">
          <p class="sd-outcome-text">${escHtml(oc.story)}</p>
          ${oc.lesson ? `<div class="sd-outcome-lesson">💡 ${escHtml(oc.lesson)}</div>` : ''}
        </div>` : ''}

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

function startSpeurdokterCase(caseId) {
  const c = DETECTIVE_CASES.find(x => x.id === caseId);
  if (!c) return;
  const today = getTodayStr();
  const rec = loadDetectiveRecord();

  if (rec && rec.caseId === c.id && rec.phase === 'done') {
    SD = { case: c, chosenIdx: rec.chosenIdx };
    renderSpeurdokterReveal(rec);
    return;
  }

  SD = {
    case: c, phase: 'intro', stepsUsed: 0, maxSteps: 5, score: 0,
    clues: [], remaining: c.investigations.map(i => i.id),
    pickedPhase: null, currentOptions: [], lastResult: null,
    date: today, chosenIdx: -1, timeUsed: 0,
    currentVitals: c.vitals_baseline ? { ...c.vitals_baseline } : null,
    triggeredAlerts: [], pendingAlert: null,
  };
  renderSpeurdokterIntro();
}

function renderSpeurdokterTab() {
  const today = getTodayStr();
  const rec = loadDetectiveRecord();

  const cards = DETECTIVE_CASES.map((c, idx) => {
    const isToday = c.date === today;
    const played = rec && rec.caseId === c.id && rec.phase === 'done';
    const stars = sdStars(c.difficulty);
    const animClass = `fade-in-${idx + 1}`;

    if (played) {
      return `<div class="sd-home-card played ${animClass}" onclick="startSpeurdokterCase('${c.id}')">
        <div class="sd-home-solved">✓ OPGELOST</div>
        <div class="sd-home-title">${escHtml(c.title)}</div>
        <div class="sd-home-meta">${stars} · ${rec.score} pt · ${rec.stepsUsed} stappen</div>
        <div class="sd-home-cta">Bekijk uitleg →</div>
      </div>`;
    }
    return `<div class="sd-home-card ${animClass}" onclick="startSpeurdokterCase('${c.id}')">
      <div class="sd-home-eyebrow">${isToday ? 'Vandaag' : escHtml(c.date)}</div>
      <div class="sd-home-title">${escHtml(c.title)}</div>
      <div class="sd-home-meta">${stars} · ${escHtml(c.patient)}</div>
      <div class="sd-home-cta">Begin onderzoek →</div>
    </div>`;
  }).join('');

  document.getElementById('htab').innerHTML = `
    <div class="htab-header fade-in">
      <h2 class="htab-title">🔍 Speurdokter</h2>
      <p class="htab-sub">Mysterieuze patiënten. Jij stelt de diagnose.</p>
    </div>
    ${cards}
    <div class="sd-how-card fade-in">
      <div class="sd-how-title">Hoe werkt het?</div>
      <div class="sd-how-step"><span class="sd-how-icon">🔬</span><span>Kies welke onderzoeken je wilt doen</span></div>
      <div class="sd-how-step"><span class="sd-how-icon">📋</span><span>Verzamel bewijs en bouw een beeld op</span></div>
      <div class="sd-how-step"><span class="sd-how-icon">🎯</span><span>Stel diagnose zodra je het weet</span></div>
      <div class="sd-how-step"><span class="sd-how-icon">⚡</span><span>Minder stappen = hogere score</span></div>
    </div>`;
}
