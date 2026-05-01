// MedDuel — Gedeelde UI utilities

let currentFact = null;

// ── Sound system (Web Audio API, geen bestanden) ──
const SFX = (() => {
  let ctx = null;
  let enabled = localStorage.getItem('md_sound') !== 'off';

  function ac() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(notes, wave = 'triangle') {
    if (!enabled) return;
    try {
      const c = ac();
      notes.forEach(([freq, t, dur, vol = 0.28]) => {
        const osc  = c.createOscillator();
        const gain = c.createGain();
        osc.connect(gain);
        gain.connect(c.destination);
        osc.type = wave;
        osc.frequency.setValueAtTime(freq, c.currentTime + t);
        gain.gain.setValueAtTime(0, c.currentTime + t);
        gain.gain.linearRampToValueAtTime(vol, c.currentTime + t + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + t + dur);
        osc.start(c.currentTime + t);
        osc.stop(c.currentTime + t + dur + 0.02);
      });
    } catch (_) {}
  }

  return {
    // Warm marimba-achtig akkoord — C5 + E5 tegelijk, licht en positief
    correct() {
      tone([[523, 0, 0.22, 0.26], [659, 0, 0.22, 0.18], [523, 0.18, 0.14, 0.08]]);
    },
    // Zachte afdalende "wuh" — barely audible, niet irritant
    wrong() {
      tone([[320, 0, 0.06, 0.14], [240, 0.05, 0.2, 0.10]], 'sine');
    },
    // Oplopend jingle — langer naarmate de streak hoger is
    combo(level) {
      if (level === 3)  tone([[523,0,.09,.22],[659,.09,.09,.22],[784,.18,.18,.28]]);
      if (level === 5)  tone([[523,0,.08,.22],[659,.08,.08,.22],[784,.16,.08,.22],[1047,.24,.22,.32]]);
      if (level >= 10)  tone([[523,0,.07,.20],[659,.07,.07,.20],[784,.14,.07,.20],[1047,.21,.07,.25],[1319,.28,.28,.35]]);
    },
    // Korte ta-da fanfare bij game-end
    fanfare() {
      tone([[523,0,.1,.20],[659,.13,.1,.20],[784,.26,.1,.20],[1047,.39,.35,.32]]);
    },
    // Zachte medische monitor-beep: twee pulsen, niet schrikachtig
    alert() {
      tone([[660,0,.07,.12],[660,.18,.07,.10]], 'sine');
    },
    toggle() {
      enabled = !enabled;
      localStorage.setItem('md_sound', enabled ? 'on' : 'off');
      return enabled;
    },
    isOn() { return enabled; },
  };
})();

// ── Confetti burst ──
function fireConfetti(perfect) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;width:100%;height:100%';
  document.body.appendChild(canvas);
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const ctx = canvas.getContext('2d');
  const colors = perfect
    ? ['#1A7A4A','#E8410A','#D4820A','#1B5FA8','#FFD700']
    : ['#1A7A4A','#E8410A','#D4820A'];
  const count = perfect ? 120 : 70;
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: -10 - Math.random() * 80,
    r: 4 + Math.random() * 5,
    d: 2 + Math.random() * 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10 - 5,
    tiltAngle: 0,
    tiltSpeed: 0.05 + Math.random() * 0.1,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.15,
    opacity: 1,
  }));
  let frame = 0;
  const MAX = 180;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.tiltAngle += p.tiltSpeed;
      p.angle += p.spin;
      p.y += p.d;
      p.x += Math.sin(p.angle) * 1.5;
      if (frame > MAX * 0.6) p.opacity = Math.max(0, p.opacity - 0.02);
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.r, p.r * 0.45, p.tiltAngle, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    if (++frame < MAX) requestAnimationFrame(draw);
    else canvas.remove();
  }
  requestAnimationFrame(draw);
}

// ── Antwoorden shufflen (werkt op een kopie, muteert niet QUESTIONS) ──
function shuffleAnswers(q) {
  if (!q.a || q.type === 'truefalse') return q;
  const indices = q.a.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return Object.assign({}, q, {
    a: indices.map(i => q.a[i]),
    c: indices.indexOf(q.c),
  });
}

// ── Toast ──
function showToast(ok, head, body, fact) {
  currentFact = fact || null;
  const t = document.getElementById('toast');
  document.getElementById('toastHead').textContent = ok ? '✓ ' + head : '✗ ' + head;
  document.getElementById('toastBody').textContent = body || '';
  t.className = 'toast show ' + (ok ? 'correct-toast' : 'wrong-toast');
}

function hideToast() {
  document.getElementById('toast').className = 'toast';
}

// ── Favourites ──
function loadFavourites() {
  try { return JSON.parse(localStorage.getItem('md_fav') || '[]'); } catch { return []; }
}
function saveFavourites(favs) {
  try { localStorage.setItem('md_fav', JSON.stringify(favs)); } catch {}
}
function isFavourite(q) {
  return loadFavourites().some(f => f.q === q.q);
}
function toggleFavourite(e) {
  if (e) e.stopPropagation();
  if (!currentFact) return;
  const favs = loadFavourites();
  const idx = favs.findIndex(f => f.q === currentFact.q);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push({ q: currentFact.q, ex: currentFact.ex, dl: currentFact.dl, domain: currentFact.domain, saved: Date.now() });
  saveFavourites(favs);
  updateStarBtn();
  const btn = document.getElementById('factStarBtn');
  if (btn) { btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop'); }
}
function updateStarBtn() {
  const btn = document.getElementById('factStarBtn');
  if (!btn || !currentFact) return;
  const saved = isFavourite(currentFact);
  btn.textContent = saved ? '★' : '☆';
  btn.classList.toggle('starred', saved);
}

// ── Wiki Tabs ──
function renderWikiTabs(w) {
  const tabs = ['Kern', 'Mechanisme', 'Onderscheid', 'Behandeling'];

  const bigfactHTML = w.bigfact ? `
    <div class="wiki-bigfact">
      <div class="wiki-bigfact-num">${w.bigfact.num}</div>
      <div class="wiki-bigfact-body">
        <div class="wiki-bigfact-label">${w.bigfact.label}</div>
        <div class="wiki-bigfact-sub">${w.bigfact.sub}</div>
      </div>
    </div>` : '';

  const kernHTML = `
    <div class="wiki-panel active" id="wiki-panel-kern">
      <div class="wiki-kern-header">
        <span class="wiki-kern-badge">Kernbegrip</span>
        <div class="wiki-kern-divider"></div>
      </div>
      <div class="wiki-kern-lede">${w.kern}</div>
      ${bigfactHTML}
      ${w.redflag ? `<div class="wiki-redflag"><div class="wiki-redflag-label">Let op</div><div class="wiki-redflag-text">${w.redflag}</div></div>` : ''}
    </div>`;

  const mechArr = Array.isArray(w.mechanisme)
    ? w.mechanisme
    : (w.mechanisme ? [{ title: 'Mechanisme', desc: w.mechanisme }] : []);
  const diffArr = Array.isArray(w.onderscheid)
    ? w.onderscheid
    : (w.onderscheid ? [{ label: 'Onderscheid', desc: w.onderscheid, type: 'warn' }] : []);
  const therObj = w.therapie && typeof w.therapie === 'object' && !Array.isArray(w.therapie)
    ? w.therapie
    : (w.therapie ? { urgent: String(w.therapie), stappen: [] } : null);

  const mechSteps = mechArr.map((s, i, arr) => `
    <div class="wiki-mech-step">
      <div class="wiki-mech-left">
        <div class="wiki-mech-num">${i + 1}</div>
        ${i < arr.length - 1 ? '<div class="wiki-mech-line"></div>' : ''}
      </div>
      <div class="wiki-mech-body">
        <div class="wiki-mech-title">${s.title}</div>
        <div class="wiki-mech-desc">${s.desc}</div>
      </div>
    </div>`).join('');

  const mnemonicHTML = w.mnemonic ? `
    <div class="wiki-mnemonic">
      <div class="wiki-mnemonic-label">Geheugensteuntje</div>
      <div class="wiki-mnemonic-grid">
        ${w.mnemonic.items.map(item => `
          <div class="wiki-mnemonic-item">
            <div class="wiki-mnemonic-letter">${item[0]}</div>
            <div class="wiki-mnemonic-word">${item.slice(4)}</div>
          </div>`).join('')}
      </div>
    </div>` : '';

  const mechHTML = `
    <div class="wiki-panel" id="wiki-panel-mechanisme">
      ${mechSteps}
      ${mnemonicHTML}
    </div>`;

  const diffItems = diffArr.map(d => `
    <div class="wiki-diff-item">
      <div class="wiki-diff-stripe ${d.type || 'warn'}"></div>
      <div class="wiki-diff-body">
        <div class="wiki-diff-name ${d.type || ''}">${d.label}</div>
        <div class="wiki-diff-desc">${d.desc}</div>
      </div>
    </div>`).join('');

  const diffHTML = `
    <div class="wiki-panel" id="wiki-panel-onderscheid">
      ${diffItems}
    </div>`;

  const therapieStappen = therObj && therObj.stappen ? therObj.stappen.map(s => `
    <div class="wiki-treat-row">
      <div class="wiki-treat-dot"></div>
      <div class="wiki-treat-body">
        <div class="wiki-treat-name">${s.naam}</div>
        <div class="wiki-treat-detail">${s.detail}</div>
      </div>
    </div>`).join('') : '';

  const treatHTML = `
    <div class="wiki-panel" id="wiki-panel-therapie">
      ${therObj && therObj.urgent ? `
        <div class="wiki-treat-urgent">
          <div class="wiki-treat-urgent-label">Prioriteit</div>
          <div class="wiki-treat-urgent-text">${therObj.urgent}</div>
        </div>` : ''}
      ${therapieStappen}
    </div>`;

  const tabLabels = tabs.map((t, i) => `
    <div class="wiki-tab-label${i === 0 ? ' active' : ''}" data-tab="${t.toLowerCase()}">${t}</div>`
  ).join('');

  return `
    <div class="wiki-tab-nav">
      <div class="wiki-tab-labels">${tabLabels}</div>
      <div class="wiki-tab-underline-track">
        <div class="wiki-tab-underline-pill" id="wikiUnderlinePill"></div>
      </div>
    </div>
    <div class="wiki-panels-viewport">
      <div class="wiki-panels-track" id="wikiPanelsTrack">
        ${kernHTML}
        ${mechHTML}
        ${diffHTML}
        ${treatHTML}
      </div>
    </div>`;
}

function initWikiTabs() {
  const labels = document.querySelectorAll('.wiki-tab-label');
  const track = document.getElementById('wikiPanelsTrack');
  const pill = document.getElementById('wikiUnderlinePill');
  if (!labels.length || !track || !pill) return;

  let currentTab = 0;

  function goTab(idx) {
    labels.forEach((l, i) => l.classList.toggle('active', i === idx));
    track.style.transform = `translateX(-${idx * 100}%)`;
    const trackW = pill.parentElement.offsetWidth;
    pill.style.width = (trackW / 4) + 'px';
    pill.style.left = (idx * trackW / 4) + 'px';
    document.querySelectorAll('.wiki-panel')[idx].scrollTop = 0;
    currentTab = idx;
  }

  labels.forEach((label, i) => {
    label.onclick = () => goTab(i);
  });

  let startX = 0;
  const vp = track.parentElement;
  vp.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  vp.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      goTab(Math.max(0, Math.min(3, currentTab + (dx < 0 ? 1 : -1))));
    }
  });

  setTimeout(() => goTab(0), 50);
}

// ── Fact modal ──
function openFactModal() {
  if (!currentFact) return;
  // Pause trivia timer / cancel auto-advance
  if (typeof G !== 'undefined' && G.active) {
    if (G.mode === 'blitz' && G.timer) { clearInterval(G.timer); G.timerPaused = true; }
    if (G.nextQTimer) { clearTimeout(G.nextQTimer); G.nextQTimer = null; G.waitingForModal = true; }
  }
  // Cancel dossier auto-advance
  if (typeof D !== 'undefined' && D.nextQTimer) {
    clearTimeout(D.nextQTimer); D.nextQTimer = null; D.waitingForModal = true;
  }
  // Cancel daily auto-advance
  if (typeof DC !== 'undefined' && DC.nextQTimer) {
    clearTimeout(DC.nextQTimer); DC.nextQTimer = null; DC.waitingForModal = true;
  }
  // Cancel spoedkamer auto-advance
  if (typeof SK !== 'undefined' && SK.active) {
    if (SK.nextQTimer) { clearTimeout(SK.nextQTimer); SK.nextQTimer = null; SK.waitingForModal = true; }
  }
  document.getElementById('factModalDomain').textContent = currentFact.dl || '';
  document.getElementById('factModalQ').textContent = currentFact.q || '';
  const exEl = document.getElementById('factModalEx');
  if (currentFact.wiki) {
    const w = currentFact.wiki;
    exEl.innerHTML = renderWikiTabs(w);
    setTimeout(() => initWikiTabs(), 0);
  } else {
    exEl.className = 'fact-explanation';
    exEl.textContent = currentFact.ex || '';
  }
  // Theory link
  const theoryId = typeof getRelatedTheory === 'function' ? getRelatedTheory(currentFact) : null;
  if (theoryId && THEORY_TOPICS[theoryId]) {
    const t = THEORY_TOPICS[theoryId];
    exEl.innerHTML += `<button class="fact-theory-btn" onclick="openTheory('${theoryId}')">📖 Bekijk theorie: ${t.title} →</button>`;
  }
  updateStarBtn();
  document.getElementById('factModal').classList.add('open');
}

function closeFactModal() {
  document.getElementById('factModal').classList.remove('open');
  hideToast();
  // Resume dossier
  if (typeof D !== 'undefined' && D.waitingForModal) {
    D.waitingForModal = false;
    advanceDossier();
    return;
  }
  // Resume daily
  if (typeof DC !== 'undefined' && DC.waitingForModal) {
    DC.waitingForModal = false;
    if (DC.answered >= 10) { dcEnd(); return; }
    dcLoadQ();
    return;
  }
  // Resume spoedkamer — toon "Volgende" knop zodat speler vraag nog kan bekijken
  if (typeof SK !== 'undefined' && SK.waitingForModal) {
    SK.waitingForModal = false;
    if (!SK.active || SK.answered >= 10) { endSpoedkamer(); return; }
    showNextButton(() => loadSKQuestion());
    return;
  }
  // Resume trivia
  if (typeof G === 'undefined' || !G.active) return;
  if (G.timerPaused && G.timeLeft > 0) {
    G.timerPaused = false;
    G.timer = setInterval(() => { G.timeLeft--; updateTimer(); if (G.timeLeft <= 0) endGame(); }, 1000);
  }
  if (G.waitingForModal) {
    G.waitingForModal = false;
    if (G.pendingEndGame) { G.pendingEndGame = false; endGame(); return; }
    if (G.mode === 'classic' && G.answered >= 10) { endGame(); return; }
    if (G.mode === 'blitz' && G.timeLeft <= 0) return;
    if (G.mode === 'blitz') {
      // Blitz: timer loopt al, laad direct volgende vraag
      loadQ();
    } else {
      // Classic / Survival: toon knop, speler kiest zelf wanneer door
      if (G.mode === 'survival' && G.queue.length === 0) G.queue = shuffleArr(getPool());
      showNextButton(() => loadQ());
    }
  }
}

function showNextButton(fn) {
  const wrap = document.getElementById('answersWrap') || document.getElementById('skAnswersWrap');
  if (!wrap) { fn(); return; }
  const btn = document.createElement('button');
  btn.className = 'btn-next-q fade-in';
  btn.textContent = 'Volgende vraag →';
  btn.onclick = fn;
  wrap.appendChild(btn);
}

// ── Keyboard shortcuts: A/B/C/D en 1/2/3/4 = antwoord kiezen ──
document.addEventListener('keydown', function(e) {
  if (document.getElementById('factModal').classList.contains('open')) return;
  if (document.getElementById('toast').classList.contains('show')) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON') return;

  const key = e.key.toUpperCase();
  const idx = (key === 'A' || key === '1') ? 0
            : (key === 'B' || key === '2') ? 1
            : (key === 'C' || key === '3') ? 2
            : (key === 'D' || key === '4') ? 3
            : null;

  if (idx === null) return;

  // Trivia
  if (typeof G !== 'undefined' && G.active && !G.locked && G.currentQ) {
    e.preventDefault();
    const q = G.currentQ;
    if (q.type === 'truefalse') {
      if (idx === 0) { const btn = document.querySelector('.true-btn');  if (btn && !btn.disabled) answerTF(true,  btn); }
      if (idx === 1) { const btn = document.querySelector('.false-btn'); if (btn && !btn.disabled) answerTF(false, btn); }
    } else {
      const btn = document.querySelector(`.ans-btn[data-i="${idx}"]`);
      if (btn && !btn.disabled) answerMC(idx, btn);
    }
    return;
  }

  // Dossier
  if (typeof D !== 'undefined' && D.cases && !D.locked) {
    const btn = document.querySelector(`#d-choices .ans-btn[data-i="${idx}"]`);
    if (btn && !btn.disabled) { e.preventDefault(); dossierAnswer(idx, btn); }
    return;
  }

  // Daily Challenge
  if (typeof DC !== 'undefined' && DC.active && !DC.locked && DC.currentQ) {
    e.preventDefault();
    const q = DC.currentQ;
    if (q.type === 'truefalse') {
      if (idx === 0) { const btn = document.querySelector('#dc-answers .true-btn');  if (btn && !btn.disabled) dcAnswerTF(true,  btn); }
      if (idx === 1) { const btn = document.querySelector('#dc-answers .false-btn'); if (btn && !btn.disabled) dcAnswerTF(false, btn); }
    } else {
      const btn = document.querySelector(`#dc-answers .ans-btn[data-i="${idx}"]`);
      if (btn && !btn.disabled) dcAnswerMC(idx, btn);
    }
  }
});

// ── Keyboard shortcut: spatie = volgende vraag ──
document.addEventListener('keydown', function(e) {
  if (e.code !== 'Space') return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON') return;

  const modalOpen   = document.getElementById('factModal').classList.contains('open');
  const toastActive = document.getElementById('toast').classList.contains('show');

  if (modalOpen) { e.preventDefault(); closeFactModal(); return; }
  if (!toastActive) return;
  e.preventDefault();

  // Trivia
  if (typeof G !== 'undefined' && G.active && G.nextQTimer) {
    clearTimeout(G.nextQTimer); G.nextQTimer = null;
    hideToast();
    if (G.pendingEndGame) { G.pendingEndGame = false; endGame(); return; }
    if (G.mode === 'classic' && G.answered >= 10) { endGame(); return; }
    if (G.mode === 'blitz' && G.timeLeft <= 0) return;
    if (G.mode === 'survival' && G.queue.length === 0) G.queue = shuffleArr(getPool());
    loadQ();
    return;
  }
  // Dossier
  if (typeof D !== 'undefined' && D.nextQTimer) {
    clearTimeout(D.nextQTimer); D.nextQTimer = null;
    hideToast(); advanceDossier();
    return;
  }
  // Daily
  if (typeof DC !== 'undefined' && DC.nextQTimer) {
    clearTimeout(DC.nextQTimer); DC.nextQTimer = null;
    hideToast();
    if (DC.answered >= 10) { dcEnd(); return; }
    dcLoadQ();
  }
});


function showCombo(num, label) {
  const el = document.getElementById('comboBurst');
  document.getElementById('comboNum').textContent = num;
  document.getElementById('comboLabel').textContent = label;
  el.className = 'combo-burst show';
  setTimeout(() => { el.className = 'combo-burst'; }, 1000);
}

// ── Screen router ──
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  window.scrollTo(0, 0);
}

// ── Stats (localStorage) ──
function loadStats() {
  try {
    return JSON.parse(localStorage.getItem('md_stats') || '{}');
  } catch { return {}; }
}

function saveStats(patch) {
  try {
    const s = loadStats();
    const updated = { ...s, ...patch };
    localStorage.setItem('md_stats', JSON.stringify(updated));
    return updated;
  } catch { return {}; }
}

function loadHomeStats() {
  const s = loadStats();

  function countUp(el, target, suffix) {
    if (!el) return;
    const n = parseInt(target, 10);
    const suf = suffix || '';
    if (isNaN(n) || n === 0) { el.textContent = (isNaN(n) ? target : 0) + suf; return; }
    const dur = 600, t0 = performance.now();
    const step = now => {
      const prog = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      el.textContent = Math.round(ease * n) + (prog >= 1 ? suf : '');
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  countUp(document.getElementById('home-played'), s.played || 0);
  const bestEl = document.getElementById('home-best');
  if (bestEl) bestEl.textContent = s.best || '—';
  countUp(document.getElementById('home-streak'), s.dayStreak || 0, '🔥');
  countUp(document.getElementById('heroStreak'),  s.dayStreak || 0, '🔥');

  const sub = document.getElementById('favHomeSub');
  if (sub) {
    const n = loadFavourites().length;
    sub.textContent = n === 0 ? 'Nog niets opgeslagen' : `${n} feit${n === 1 ? '' : 'en'} opgeslagen`;
  }
  renderXPHome();
  renderDomainStatsHome();
  renderWeakHome();
}

// ── Zwakke vragen ──
function loadWeak() {
  try { return JSON.parse(localStorage.getItem('md_weak') || '{}'); } catch { return {}; }
}
function saveWeak(w) {
  try { localStorage.setItem('md_weak', JSON.stringify(w)); } catch {}
}
function recordWeak(q) {
  const w = loadWeak();
  const key = q.q.slice(0, 80);
  w[key] = (w[key] || 0) + 2;
  saveWeak(w);
  srAddNew(q);
}
function resolveWeak(q) {
  const w = loadWeak();
  const key = q.q.slice(0, 80);
  if (!w[key]) return;
  w[key]--;
  if (w[key] <= 0) delete w[key];
  saveWeak(w);
}
function getWeakCount() {
  return Object.keys(loadWeak()).length;
}
function getWeakQuestions() {
  const w = loadWeak();
  return Object.entries(w)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => QUESTIONS.find(q => q.q.slice(0, 80) === key))
    .filter(Boolean)
    .slice(0, 20);
}
function renderWeakHome() {
  const card = document.getElementById('weakHomeCard');
  if (!card) return;
  const n = getWeakCount();
  if (n === 0) { card.style.display = 'none'; return; }
  card.style.display = 'flex';
  const sub = document.getElementById('weakHomeSub');
  if (sub) sub.textContent = `${n} vraag${n === 1 ? '' : 'en'} om te oefenen`;
}

// ── XP & Rangen ──
const RANKS = [
  { min: 0,    label: 'Pre-med',      icon: '📚', color: '#8B7355' },
  { min: 100,  label: 'Co-assistent', icon: '🩺', color: '#1B5FA8' },
  { min: 350,  label: 'ANIOS',        icon: '⚕️', color: '#1A7A4A' },
  { min: 800,  label: 'AIOS',         icon: '🔬', color: '#D4820A' },
  { min: 1800, label: 'Specialist',   icon: '🏥', color: '#E8410A' },
  { min: 4000, label: 'Professor',    icon: '🎓', color: '#6B21A8' },
];

function loadXP() { try { return parseInt(localStorage.getItem('md_xp') || '0', 10); } catch { return 0; } }
function saveXP(xp) { try { localStorage.setItem('md_xp', String(xp)); } catch {} }
function getRank(xp) { return [...RANKS].reverse().find(r => xp >= r.min) || RANKS[0]; }
function getNextRank(xp) { return RANKS.find(r => r.min > xp) || null; }

function awardXP(amount) {
  const prev = loadXP();
  const next = prev + amount;
  saveXP(next);
  if (getRank(next).label !== getRank(prev).label) {
    const rank = getRank(next);
    setTimeout(() => {
      const el = document.getElementById('rankupOverlay');
      if (el) {
        document.getElementById('rankupIcon').textContent = rank.icon;
        document.getElementById('rankupLabel').textContent = rank.label;
        el.classList.add('show');
        navigator.vibrate && navigator.vibrate([30, 60, 100]);
        setTimeout(() => el.classList.remove('show'), 2800);
      }
    }, 600);
  }
  return next;
}

// ── Spaced Repetition — SM-2 engine ──
function loadSR() {
  try { return JSON.parse(localStorage.getItem('md_sr') || '{}'); } catch { return {}; }
}
function saveSR(d) {
  try { localStorage.setItem('md_sr', JSON.stringify(d)); } catch {}
}

function srAddNew(q) {
  if (!q || !q.q) return;
  const d = loadSR();
  const k = q.q.slice(0, 80);
  if (d[k]) return; // al ingepland
  d[k] = { interval: 1, ef: 2.5, reps: 0, due: Date.now() + 86400000 };
  saveSR(d);
}

function srUpdate(q, quality) {
  const d = loadSR();
  const k = q.q.slice(0, 80);
  let c = d[k] || { interval: 1, ef: 2.5, reps: 0 };
  if (quality >= 3) {
    c.interval = c.reps === 0 ? 1 : c.reps === 1 ? 6 : Math.round(c.interval * c.ef);
    c.reps++;
  } else {
    c.reps = 0;
    c.interval = 1;
  }
  c.ef = Math.max(1.3, c.ef + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  c.due = Date.now() + c.interval * 86400000;
  if (c.reps >= 6 && quality >= 5) delete d[k]; // graduated
  else d[k] = c;
  saveSR(d);
}

function srDueCount() {
  const now = Date.now();
  return Object.values(loadSR()).filter(c => c.due <= now).length;
}

function srDueQuestions() {
  const d = loadSR();
  const now = Date.now();
  return Object.entries(d)
    .filter(([, c]) => c.due <= now)
    .sort((a, b) => a[1].due - b[1].due)
    .map(([k]) => QUESTIONS.find(q => q.q.slice(0, 80) === k))
    .filter(Boolean)
    .slice(0, 20);
}

// ── Achievements ──
const ACHIEVEMENTS = [
  { id: 'first_correct', icon: '🎯', label: 'Eerste treffer',  desc: 'Eerste juiste antwoord gegeven' },
  { id: 'streak_3',      icon: '🔥', label: 'Op stoom',        desc: '3 antwoorden op een rij goed' },
  { id: 'streak_10',     icon: '⚡', label: 'Onstopbaar',      desc: '10 op een rij — indrukwekkend' },
  { id: 'perfect',       icon: '💯', label: 'Makeloos',        desc: 'Classic: 10 van 10 zonder fout' },
  { id: 'games_10',      icon: '🎮', label: 'Vaste speler',    desc: '10 potjes gespeeld' },
  { id: 'games_50',      icon: '🏆', label: 'Veteraan',        desc: '50 potjes gespeeld' },
  { id: 'blitz_200',     icon: '🚀', label: 'Blitzkoning',     desc: '200+ punten in één Blitz-ronde' },
  { id: 'survival_20',   icon: '❤️', label: 'Overlever',       desc: '20 vragen overleefd in Survival' },
  { id: 'all_domains',   icon: '🌍', label: 'Allrounder',      desc: 'Alle 13 domeinen minstens één keer gespeeld' },
  { id: 'professor',     icon: '🎓', label: 'Professor',       desc: 'Hoogste rang bereikt' },
];

function loadAchievements() {
  try { return new Set(JSON.parse(localStorage.getItem('md_ach') || '[]')); } catch { return new Set(); }
}

function awardAchievement(id) {
  const set = loadAchievements();
  if (set.has(id)) return false;
  set.add(id);
  try { localStorage.setItem('md_ach', JSON.stringify([...set])); } catch {}
  const ach = ACHIEVEMENTS.find(a => a.id === id);
  if (ach) showAchievementBanner(ach);
  return true;
}

function showAchievementBanner(ach) {
  const el = document.getElementById('achBanner');
  if (!el) return;
  document.getElementById('achBannerIcon').textContent = ach.icon;
  document.getElementById('achBannerLabel').textContent = ach.label;
  el.classList.add('show');
  clearTimeout(el._hideTimer);
  el._hideTimer = setTimeout(() => el.classList.remove('show'), 3500);
}

function checkAchievements(ctx) {
  const { mode, correct, wrong, maxStreak, score } = ctx;
  const st = loadStats();
  const ALL_DOMAINS = ['cardio','neuro','pharma','infectio','lab','pulmo','gastro','endo','nephro','psych','derm','rheum','repro'];

  if (correct >= 1)   awardAchievement('first_correct');
  if (maxStreak >= 3) awardAchievement('streak_3');
  if (maxStreak >= 10) awardAchievement('streak_10');
  if (mode === 'classic' && wrong === 0 && correct >= 10) awardAchievement('perfect');
  if ((st.played || 0) >= 10) awardAchievement('games_10');
  if ((st.played || 0) >= 50) awardAchievement('games_50');
  if (mode === 'blitz' && score >= 200) awardAchievement('blitz_200');
  if (mode === 'survival' && correct >= 20) awardAchievement('survival_20');
  if (getRank(loadXP()).label === 'Professor') awardAchievement('professor');
  const ds = loadDomainStats();
  if (ALL_DOMAINS.every(k => ds[k] && ds[k].t > 0)) awardAchievement('all_domains');
}

function renderAchievements() {
  const set = loadAchievements();
  const items = ACHIEVEMENTS.map(a => {
    const on = set.has(a.id);
    return `<div class="ach-badge ${on ? 'unlocked' : 'locked'}">
      <div class="ach-icon">${on ? a.icon : '🔒'}</div>
      <div class="ach-label">${a.label}</div>
      <div class="ach-desc">${a.desc}</div>
    </div>`;
  }).join('');
  return `<div class="section-label" style="margin-top:1.5rem">Prestaties</div>
    <div class="ach-grid">${items}</div>`;
}

function renderXPHome() {
  const wrap = document.getElementById('xpWrap');
  if (!wrap) return;
  const xp = loadXP();
  const rank = getRank(xp);
  const next = getNextRank(xp);
  const pct = next ? Math.round((xp - rank.min) / (next.min - rank.min) * 100) : 100;
  wrap.innerHTML = `
    <div class="xp-card">
      <div class="xp-rank-row">
        <span class="xp-icon">${rank.icon}</span>
        <div class="xp-rank-info">
          <div class="xp-rank-top">
            <span class="xp-rank-label" style="color:${rank.color}">${rank.label}</span>
            <span class="xp-total">${xp} XP</span>
          </div>
          <div class="xp-bar-bg">
            <div class="xp-bar-fill" style="width:${pct}%;background:${rank.color}"></div>
          </div>
          <div class="xp-next-label">${next ? `${next.min - xp} XP naar ${next.icon} ${next.label}` : 'Maximale rang bereikt! 🎓'}</div>
        </div>
      </div>
    </div>`;
}

// ── Domein statistieken ──
const DOMAIN_META = [
  { key: 'cardio',   label: 'Cardiologie',   icon: '🫀' },
  { key: 'neuro',    label: 'Neurologie',     icon: '🧠' },
  { key: 'pharma',   label: 'Farmacologie',   icon: '💊' },
  { key: 'infectio', label: 'Infectiologie',  icon: '🦠' },
  { key: 'lab',      label: 'Laboratorium',   icon: '🧪' },
  { key: 'rheum',    label: 'Reumatologie',   icon: '🦴' },
  { key: 'psych',    label: 'Psychiatrie',    icon: '🧩' },
];

const DOMAIN_TO_THEORY = {
  cardio:   'hartfalen',
  neuro:    'dementie',
  infectio: 'antibiotica',
  lab:      'anemie',
  pulmo:    'copd',
  endo:     'diabetes',
  psych:    'dementie',
};

function loadDomainStats() {
  try { return JSON.parse(localStorage.getItem('md_domain_stats') || '{}'); } catch { return {}; }
}

function mergeDomainStats(patch) {
  try {
    const s = loadDomainStats();
    for (const [domain, { c, t }] of Object.entries(patch)) {
      if (!s[domain]) s[domain] = { c: 0, t: 0 };
      s[domain].c += c;
      s[domain].t += t;
    }
    localStorage.setItem('md_domain_stats', JSON.stringify(s));
  } catch {}
}

function loadOpenPatient() {
  try { return JSON.parse(localStorage.getItem('md_open_patient') || 'null'); } catch { return null; }
}
function saveOpenPatient(data) {
  try { localStorage.setItem('md_open_patient', JSON.stringify(data)); } catch {}
}
function clearOpenPatient() {
  localStorage.removeItem('md_open_patient');
}

function loadSessionHistory() {
  try { return JSON.parse(localStorage.getItem('md_session_hist') || '[]'); } catch { return []; }
}

function saveSessionToHistory({ mode, acc, correct, wrong, domainStats }) {
  const hist = loadSessionHistory();
  hist.push({
    date: new Date().toISOString().slice(0, 10),
    ts: Date.now(),
    mode,
    acc,
    correct,
    wrong,
    domains: domainStats,
  });
  if (hist.length > 30) hist.splice(0, hist.length - 30);
  try { localStorage.setItem('md_session_hist', JSON.stringify(hist)); } catch {}
}

function renderDomainStatsHome() {
  const wrap = document.getElementById('domainStatsWrap');
  if (!wrap) return;
  const s = loadDomainStats();
  const hasAny = Object.values(s).some(d => d.t > 0);
  if (!hasAny) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  const rows = DOMAIN_META
    .filter(({ key }) => s[key] && s[key].t > 0)
    .map(({ key, label, icon }) => {
      const d = s[key];
      const pct = Math.round(d.c / d.t * 100);
      const color = pct >= 80 ? 'var(--green)' : pct >= 60 ? 'var(--amber)' : 'var(--pulse)';
      return `
        <div class="domain-stat-row">
          <span class="domain-stat-icon">${icon}</span>
          <div class="domain-stat-info">
            <div class="domain-stat-top">
              <span class="domain-stat-label">${label}</span>
              <span class="domain-stat-pct" style="color:${color}">${pct}%</span>
            </div>
            <div class="domain-stat-bar-bg">
              <div class="domain-stat-bar-fill" style="width:${pct}%;background:${color}"></div>
            </div>
          </div>
        </div>`;
    });
  wrap.innerHTML = `<div class="section-label">Jouw score per domein</div>` + rows.join('');
}

// ── Helpers ──
function shuffleArr(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function diffStars(d) {
  const n = d || 3;
  const cls = n <= 2 ? 'easy' : n === 3 ? 'mid' : n === 4 ? 'hard' : 'expert';
  const stars = [1,2,3,4,5].map(i => `<span class="diff-star ${i <= n ? 'on' : 'off'}">★</span>`).join('');
  return `<span class="diff-wrap d-${cls}">${stars}</span>`;
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

const LAB_REFS = [
  ['ph',                    7.35, 7.45],
  ['pco',                   35,   45  ],
  ['hco',                   22,   26  ],
  ['po2',                   80,   100 ],
  ['ferritine',             12,   300 ],
  ['transferrinesaturatie', 20,   50  ],
  ['albumine',              35,   50  ],
  ['creatinine',            50,   110 ],
  ['kreatinine',            50,   110 ],
  ['bilirubine',            0,    17  ],
  ['fosfaat',               0.8,  1.5 ],
  ['calcium',               2.15, 2.55],
  ['uraat',                 0,    420 ],
  ['glucose',               4.0,  6.0 ],
  ['alat',                  0,    45  ],
  ['asat',                  0,    40  ],
  ['ldh',                   0,    250 ],
  ['aniongap',              8,    12  ],
  ['inr',                   0.9,  1.1 ],
  ['mcv',                   80,   100 ],
  ['egfr',                  60,   999 ],
  ['tsh',                   0.4,  4.0 ],
  ['leukocyten',            4.0,  10.0],
  ['wbc',                   4.0,  10.0],
  ['trombocyten',           150,  400 ],
  ['crp',                   0,    10  ],
  ['hba1c',                 0,    53  ],
  ['prolactine',            0,    500 ],
  ['fsh',                   1,    25  ],
  ['lh',                    1,    30  ],
  ['hb',                    7.5,  11.0],
  ['hemoglobine',           7.5,  11.0],
];

function getLabStatus(name, val) {
  const norm = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (norm.startsWith('urine') || norm.startsWith('fractie')) return null;
  if (norm === 'k' || norm === 'k+' || norm === 'kalium') return val > 5.0 ? 'high' : val < 3.5 ? 'low' : 'ok';
  if (norm === 'na' || norm === 'natrium') return val > 145 ? 'high' : val < 135 ? 'low' : 'ok';
  if (norm === 'cd4') return val < 200 ? 'low' : val < 500 ? 'low' : 'ok';
  for (const [key, lo, hi] of LAB_REFS) {
    if (norm.startsWith(key) || norm.includes(key)) return val > hi ? 'high' : val < lo ? 'low' : 'ok';
  }
  return null;
}

function annotateBullet(b) {
  const m = b.match(/^([\w\s\-\+\/µ]+?)\s+([\d]+(?:[,.]\d+)?)\s*(.{0,20})$/);
  if (!m) return escHtml(b);
  const [, name, valStr, unit] = m;
  const val = parseFloat(valStr.replace(',', '.'));
  if (isNaN(val)) return escHtml(b);
  const status = getLabStatus(name.trim(), val);
  if (!status || status === 'ok') return escHtml(b);
  const arrow = status === 'high' ? '↑' : '↓';
  const color = status === 'high' ? '#DC2626' : '#2563EB';
  return `${escHtml(b)} <span class="fq-bullet-ind" style="color:${color};font-weight:700">${arrow}</span>`;
}

function formatLabLine(line) {
  const m = line.match(/^([^\d(]+?)\s+([\d]+(?:[,.]\d+)?)\s*(.*)$/);
  if (!m) return `<div class="fq-row"><span class="fq-desc">${escHtml(line)}</span></div>`;
  const name = m[1].replace(/[<>≤≥=\-–:]+\s*$/, '').trim();
  const valStr = m[2];
  const unit = (m[3] || '').split(/[,(]/)[0].trim();
  const val = parseFloat(valStr.replace(',', '.'));
  const status = getLabStatus(name, val);
  const icon = { high: '↑', low: '↓', ok: '✓' }[status] || '';
  return `<div class="fq-row${status ? ' fq-' + status : ''}"><span class="fq-name">${escHtml(name)}</span><span class="fq-val">${escHtml(valStr)}<span class="fq-unit">${unit ? ' ' + escHtml(unit) : ''}</span></span>${icon ? `<span class="fq-ind">${icon}</span>` : ''}</div>`;
}

function formatQ(str) {
  // Explicit \n formatting (lab/data questions with predefined structure)
  if (str.includes('\n')) {
    const lines = str.split('\n').map(l => l.trim()).filter(Boolean);
    // If only 2 lines (context + question), fall through to clinical formatter
    if (lines.length > 2) {
      const last = lines.length - 1;
      const intro = `<span class="fq-intro">${escHtml(lines[0])}</span>`;
      const rows  = lines.slice(1, last).map(formatLabLine).join('');
      const data  = `<div class="fq-table">${rows}</div>`;
      const q     = `<span class="fq-q">${escHtml(lines[last])}</span>`;
      return intro + data + q;
    }
    // 2-line case: join as sentence and let tryFormatClinical handle it
    str = lines.join(' ');
  }

  // Auto-format clinical scenario questions
  const clinical = tryFormatClinical(str);
  if (clinical) return clinical;

  return escHtml(str);
}

function tryFormatClinical(str) {
  // Must start with a patient descriptor including age
  if (!/^(?:Man|Vrouw|Kind|Jongen|Meisje|Patiënt(?:e?)|Jonge man|Jonge vrouw|Jongeman|Soldaat)\b.{0,30}?\d+\s*(?:jaar|j)\b/i.test(str)) return null;

  // Separate the last sentence (= the actual question) from the clinical description
  const lastDotIdx = str.lastIndexOf('. ');
  if (lastDotIdx === -1 || !str.includes('?')) return null;
  const body     = str.slice(0, lastDotIdx).trim();
  const question = str.slice(lastDotIdx + 2).trim();
  if (!question.endsWith('?')) return null;

  // Patient header = everything up to first comma after the age
  const headerMatch = body.match(/^.*?\d+\s*(?:jaar|j)\b[^,]*/i);
  const header = headerMatch ? headerMatch[0].trim() : body.split(',')[0].trim();
  const rest   = body.slice(header.length).replace(/^[,.\s]+/, '');

  // Split remaining text into bullets on commas and sentence ends
  const bullets = rest
    .split(/(?:[.]\s+|,\s+)/)
    .map(s => s.trim().replace(/\.$/, ''))
    .filter(s => s.length > 4);

  if (bullets.length < 2) return null;

  const introHtml = `<span class="fq-intro">${escHtml(header)}</span>`;
  const itemsHtml = bullets.map(b => annotateBullet(b)).join('<span class="fq-sep"> · </span>');
  const dataHtml  = `<div class="fq-findings">${itemsHtml}</div>`;
  const qHtml     = `<span class="fq-q">${escHtml(question)}</span>`;
  return introHtml + dataHtml + qHtml;
}

function gradeFromPct(pct) {
  const grades = [
    [90, '🏆 Expert niveau',       '#1A7A4A'],
    [70, '⭐ Uitstekend',          '#1B5FA8'],
    [50, '👍 Goed gedaan',         '#D4820A'],
    [30, '📚 Bijna!',              '#E8410A'],
    [0,  '💪 Volgende keer beter', '#4A3F35'],
  ];
  return grades.find(([min]) => pct >= min);
}
