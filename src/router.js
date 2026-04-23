// MedDuel — Router & Home screen

function showHome() {
  renderHomeScreen();
  showScreen('home');
  loadHomeStats();

  // Check voor challenge-banner
  const p = new URLSearchParams(window.location.search);
  if (p.get('challenge') && p.get('score')) {
    setTimeout(() => {
      showToast(true,
        `Je bent uitgedaagd! 🏆`,
        `Versla ${p.get('score')} punten — gebruik zo min mogelijk hints.`
      );
      setTimeout(hideToast, 4500);
    }, 400);
  }
}

function renderHomeScreen() {
  document.getElementById('app').innerHTML = `
    <div id="home" class="screen active">
      <div id="htab" class="home-tab-wrap"></div>
      <nav class="bottom-nav" id="bottomNav">
        <button class="bn-tab active" onclick="switchHomeTab('spelen',this)">
          <span class="bn-icon">🎮</span>
          <span class="bn-label">Spelen</span>
        </button>
        <button class="bn-tab" onclick="switchHomeTab('theorie',this)">
          <span class="bn-icon">📖</span>
          <span class="bn-label">Theorie</span>
        </button>
        <button class="bn-tab" onclick="switchHomeTab('profiel',this)">
          <span class="bn-icon">👤</span>
          <span class="bn-label">Profiel</span>
        </button>
      </nav>
    </div>`;
  renderSpelenTab();
}

function renderSpelenTab() {
  document.getElementById('htab').innerHTML = `
    <div class="home-hero fade-in">
      <div class="hero-left">
        <div class="hero-eyebrow">${getGreeting() || 'medische trivia'}</div>
        <h1 class="logo">Med<em>Duel</em></h1>
      </div>
      <div class="hero-streak-badge" id="heroStreak">0🔥</div>
    </div>

    <div class="section-label fade-in-2">Vandaag</div>
    ${renderDailyHomeCard()}

    <div class="section-label fade-in-3">Kies modus</div>

    <div class="mode-hero-card fade-in-3" onclick="startGame('blitz')">
      <div class="mhc-tag">⚡ Populairste modus</div>
      <div class="mhc-name">Blitz</div>
      <div class="mhc-sub">60 seconden · Zo snel mogelijk</div>
      <div class="mhc-cta">Start nu →</div>
    </div>

    <div class="mode-grid fade-in-3">
      <div class="mode-card classic" onclick="startGame('classic')">
        <div class="mode-icon-wrap">🎯</div>
        <div class="mode-info">
          <span class="mode-name">Classic</span>
          <span class="mode-sub">10 vragen</span>
        </div>
      </div>
      <div class="mode-card survival" onclick="startGame('survival')">
        <div class="mode-icon-wrap">❤️</div>
        <div class="mode-info">
          <span class="mode-name">Survival</span>
          <span class="mode-sub">3 levens</span>
        </div>
      </div>
      <div class="mode-card dossier" onclick="startDossier()">
        <div class="mode-icon-wrap">🗂️</div>
        <div class="mode-info">
          <span class="mode-name">Dossier</span>
          <span class="mode-sub">Daag anderen uit</span>
        </div>
      </div>
      <div class="mode-card learn" onclick="showLearnSetup()">
        <div class="mode-icon-wrap">📖</div>
        <div class="mode-info">
          <span class="mode-name">Leer-modus</span>
          <span class="mode-sub">Geen tijdsdruk</span>
        </div>
      </div>
    </div>

    <div class="section-label fade-in-4">Domein</div>
    <div class="cat-wrap fade-in-4" id="catPills">
      <div class="cat-pill active" data-cat="all" onclick="toggleCat('all',this)">Alles</div>
      <div class="cat-pill" data-cat="cardio"   onclick="toggleCat('cardio',this)">🫀 Cardiologie</div>
      <div class="cat-pill" data-cat="neuro"    onclick="toggleCat('neuro',this)">🧠 Neurologie</div>
      <div class="cat-pill" data-cat="pharma"   onclick="toggleCat('pharma',this)">💊 Farmacologie</div>
      <div class="cat-pill" data-cat="infectio" onclick="toggleCat('infectio',this)">🦠 Infectiologie</div>
      <div class="cat-pill" data-cat="lab"      onclick="toggleCat('lab',this)">🧪 Lab</div>
      <div class="cat-pill" data-cat="pulmo"   onclick="toggleCat('pulmo',this)">🫁 Pulmonologie</div>
      <div class="cat-pill" data-cat="gastro"  onclick="toggleCat('gastro',this)">🫃 Gastro-enterologie</div>
      <div class="cat-pill" data-cat="endo"    onclick="toggleCat('endo',this)">🔬 Endocrinologie</div>
      <div class="cat-pill" data-cat="nephro"  onclick="toggleCat('nephro',this)">🫘 Nefrologie</div>
      <div class="cat-pill" data-cat="psych"   onclick="toggleCat('psych',this)">🧩 Psychiatrie</div>
    </div>`;
}

function renderTheorieTab() {
  document.getElementById('htab').innerHTML = `
    <div class="htab-header fade-in">
      <h2 class="htab-title">Theorieboek</h2>
      <p class="htab-sub">Klinische overzichten per thema</p>
    </div>
    <div class="th-home-grid fade-in-1">
      <div class="th-home-pill" onclick="openTheory('dementie')"><span class="th-home-emoji">🧠</span><span class="th-home-name">Dementie­syndromen</span></div>
      <div class="th-home-pill" onclick="openTheory('ecg')"><span class="th-home-emoji">📊</span><span class="th-home-name">ECG Basis</span></div>
      <div class="th-home-pill" onclick="openTheory('anemie')"><span class="th-home-emoji">🩸</span><span class="th-home-name">Anemie</span></div>
      <div class="th-home-pill" onclick="openTheory('meningitis')"><span class="th-home-emoji">🔬</span><span class="th-home-name">Meningitis & LP</span></div>
      <div class="th-home-pill" onclick="openTheory('hartfalen')"><span class="th-home-emoji">❤️</span><span class="th-home-name">Hartfalen</span></div>
      <div class="th-home-pill" onclick="openTheory('antibiotica')"><span class="th-home-emoji">💊</span><span class="th-home-name">Antibiotica</span></div>
      <div class="th-home-pill" onclick="openTheory('stolling')"><span class="th-home-emoji">🩹</span><span class="th-home-name">Stolling & Antistolling</span></div>
      <div class="th-home-pill" onclick="openTheory('diabetes')"><span class="th-home-emoji">🍬</span><span class="th-home-name">Diabetes Mellitus</span></div>
      <div class="th-home-pill" onclick="openTheory('schildklier')"><span class="th-home-emoji">🦋</span><span class="th-home-name">Schildklier</span></div>
      <div class="th-home-pill" onclick="openTheory('sepsis')"><span class="th-home-emoji">🚨</span><span class="th-home-name">Sepsis & Shock</span></div>
      <div class="th-home-pill" onclick="openTheory('copd')"><span class="th-home-emoji">🫁</span><span class="th-home-name">COPD</span></div>
      <div class="th-home-pill" onclick="openTheory('longembolie')"><span class="th-home-emoji">🩺</span><span class="th-home-name">Longembolie</span></div>
    </div>`;
}

function renderProfielTab() {
  const name = (typeof loadName === 'function' && loadName()) || '';
  document.getElementById('htab').innerHTML = `
    <div class="htab-header fade-in">
      <h2 class="htab-title">${name ? `Hey, ${name}` : 'Mijn profiel'}</h2>
      <p class="htab-sub">Jouw voortgang & statistieken</p>
    </div>
    <div id="xpWrap" class="fade-in-1"></div>
    <div class="fav-home-card fade-in-2" onclick="startFavourites()">
      <div class="fav-home-icon">★</div>
      <div class="fav-home-info">
        <span class="fav-home-name">Favorieten</span>
        <span class="fav-home-sub" id="favHomeSub">Nog niets opgeslagen</span>
      </div>
      <span style="font-size:18px;color:var(--amber);opacity:0.5;">→</span>
    </div>
    <div id="weakHomeCard" class="weak-home-card fade-in-2" onclick="startWeakMode()" style="display:none;">
      <div class="weak-home-icon">🎯</div>
      <div class="fav-home-info">
        <span class="fav-home-name">Train je Zwaktes</span>
        <span class="fav-home-sub" id="weakHomeSub">Laden...</span>
      </div>
      <span style="font-size:18px;color:var(--pulse);opacity:0.7;">→</span>
    </div>
    <div id="domainStatsWrap" class="fade-in-2" style="display:none;margin-top:1rem;margin-bottom:1rem;"></div>
    <div class="adm-home-card fade-in-3" onclick="showAdmin()">
      <span style="font-size:20px;">🗂️</span>
      <div class="fav-home-info">
        <span class="fav-home-name">Vragenbank</span>
        <span class="fav-home-sub">${QUESTIONS.length} vragen · beheer &amp; overzicht</span>
      </div>
      <span style="font-size:18px;color:var(--ink-light);opacity:0.5;">→</span>
    </div>`;
  renderXPHome();
  const sub = document.getElementById('favHomeSub');
  if (sub) {
    const n = loadFavourites().length;
    sub.textContent = n === 0 ? 'Nog niets opgeslagen' : `${n} feit${n === 1 ? '' : 'en'} opgeslagen`;
  }
  renderDomainStatsHome();
  renderWeakHome();
}

function switchHomeTab(tab, btn) {
  document.querySelectorAll('#bottomNav .bn-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  window.scrollTo(0, 0);
  if (tab === 'spelen')  { renderSpelenTab(); loadHomeStats(); }
  else if (tab === 'theorie') renderTheorieTab();
  else if (tab === 'profiel') renderProfielTab();
}

// ── Init ──
if (new URLSearchParams(window.location.search).get('admin') === '1') {
  showAdmin();
} else if (isOnboarded()) {
  showHome();
} else {
  startOnboarding();
}
