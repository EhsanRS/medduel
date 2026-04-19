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
      <div style="max-width:480px;margin:0 auto;padding:0 1.25rem 3rem;">

        <div class="home-top">
          <div class="logo-eyebrow fade-in">medische trivia</div>
          <h1 class="logo fade-in-1">Med<em>Duel</em></h1>
          <p class="tagline fade-in-2">Test je kennis. Versla anderen. Word beter.</p>
        </div>

        <div class="stats-strip fade-in-3">
          <div class="stat-item">
            <span class="stat-num" id="home-played">0</span>
            <span class="stat-lbl">Gespeeld</span>
          </div>
          <div class="stat-item">
            <span class="stat-num" id="home-best">—</span>
            <span class="stat-lbl">Record</span>
          </div>
          <div class="stat-item">
            <span class="stat-num" id="home-streak">0🔥</span>
            <span class="stat-lbl">Streak</span>
          </div>
        </div>

        <div class="section-label fade-in-3">Kies modus</div>
        <div class="mode-stack fade-in-4">
          <div class="mode-card blitz" onclick="startGame('blitz')">
            <div class="mode-icon-wrap">⚡</div>
            <div class="mode-info">
              <span class="mode-name">Blitz</span>
              <span class="mode-sub">60 sec · Zo snel mogelijk</span>
            </div>
            <span class="mode-arrow">→</span>
          </div>
          <div class="mode-card classic" onclick="startGame('classic')">
            <div class="mode-icon-wrap">🎯</div>
            <div class="mode-info">
              <span class="mode-name">Classic</span>
              <span class="mode-sub">10 vragen · Op je gemak</span>
            </div>
            <span class="mode-arrow">→</span>
          </div>
          <div class="mode-card survival" onclick="startGame('survival')">
            <div class="mode-icon-wrap">❤️</div>
            <div class="mode-info">
              <span class="mode-name">Survival</span>
              <span class="mode-sub">3 levens · Hoe ver kom je?</span>
            </div>
            <span class="mode-arrow">→</span>
          </div>
          <div class="mode-card dossier" onclick="startDossier()">
            <div class="mode-icon-wrap">🗂️</div>
            <div class="mode-info">
              <span class="mode-name">Het Dossier</span>
              <span class="mode-sub">Ontsluit hints · Daag anderen uit</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
              <span class="mode-arrow">→</span>
              <span style="font-size:10px;font-weight:600;letter-spacing:0.08em;
                background:var(--pulse);color:white;padding:2px 7px;border-radius:6px;">NIEUW</span>
            </div>
          </div>
        </div>

        <div class="section-label fade-in-5">Domein</div>
        <div class="cat-wrap fade-in-5" id="catPills">
          <div class="cat-pill active" data-cat="all" onclick="toggleCat('all',this)">Alles</div>
          <div class="cat-pill" data-cat="cardio"   onclick="toggleCat('cardio',this)">🫀 Cardiologie</div>
          <div class="cat-pill" data-cat="neuro"    onclick="toggleCat('neuro',this)">🧠 Neurologie</div>
          <div class="cat-pill" data-cat="pharma"   onclick="toggleCat('pharma',this)">💊 Farmacologie</div>
          <div class="cat-pill" data-cat="infectio" onclick="toggleCat('infectio',this)">🦠 Infectiologie</div>
          <div class="cat-pill" data-cat="lab"      onclick="toggleCat('lab',this)">🧪 Lab</div>
        </div>

      </div>
    </div>`;
}

// ── Init ──
showHome();
