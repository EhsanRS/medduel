// MedDuel — Onboarding (eerste keer)

function loadName() {
  return localStorage.getItem('md_name') || '';
}
function saveName(name) {
  localStorage.setItem('md_name', name.trim());
}
function isOnboarded() {
  return !!localStorage.getItem('md_name');
}

function getGreeting() {
  const name = loadName();
  if (!name) return '';
  const h = new Date().getHours();
  const prefix = h < 12 ? 'Goedemorgen' : h < 18 ? 'Goedemiddag' : 'Goedenavond';
  return `${prefix}, ${name}! 👋`;
}

const OB_SLIDES = [
  {
    icon: '🩺',
    title: 'Welkom bij MedDuel',
    body: 'De snelste manier om je medische kennis te scherpen. Test jezelf, leer van fouten, en stijg in rang.',
    cta: 'Verder →',
  },
  {
    icon: '⚡',
    title: 'Meerdere modi',
    body: 'Blitz (60 seconden chaos), Classic (10 vragen), Survival (3 levens), Dossier (patiëntencasussen) en Leer-modus.',
    cta: 'Verder →',
  },
  {
    icon: '🎓',
    title: 'Groei zichtbaar',
    body: 'Verdien XP, stijg van Pre-med naar Professor. Train je zwakste onderwerpen. Bekijk je voortgang per domein.',
    cta: 'Bijna klaar →',
  },
];

let obSlide = 0;

function startOnboarding() {
  obSlide = 0;
  renderOnboardingSlide();
}

function renderOnboardingSlide() {
  const slide = OB_SLIDES[obSlide];
  const dots = OB_SLIDES.map((_, i) =>
    `<div class="ob-dot${i === obSlide ? ' active' : ''}"></div>`
  ).join('');

  document.getElementById('app').innerHTML = `
    <div id="onboarding" class="screen active ob-screen">
      <div class="ob-inner">
        <div class="ob-slide">
          <div class="ob-icon">${slide.icon}</div>
          <h2 class="ob-title">${slide.title}</h2>
          <p class="ob-body">${slide.body}</p>
        </div>
        <div class="ob-dots">${dots}</div>
        <button class="ob-cta" onclick="obNext()">${slide.cta}</button>
        <button class="ob-skip" onclick="showNameScreen()">Overslaan</button>
      </div>
    </div>`;
}

function obNext() {
  obSlide++;
  if (obSlide >= OB_SLIDES.length) {
    showNameScreen();
  } else {
    renderOnboardingSlide();
  }
}

function showNameScreen() {
  document.getElementById('app').innerHTML = `
    <div id="onboarding-name" class="screen active ob-screen">
      <div class="ob-inner">
        <div class="ob-icon">👤</div>
        <h2 class="ob-title">Hoe mogen we<br>je noemen?</h2>
        <p class="ob-body">Je naam verschijnt op het home-scherm en in je resultaten.</p>
        <input
          id="nameInput"
          class="ob-name-input"
          type="text"
          placeholder="Jouw naam of bijnaam"
          maxlength="24"
          autocomplete="off"
          oninput="obCheckName()"
          onkeydown="if(event.key==='Enter') obSaveName()"
        />
        <button class="ob-cta" id="obStartBtn" onclick="obSaveName()" disabled>
          Start MedDuel →
        </button>
      </div>
    </div>`;
  setTimeout(() => {
    const input = document.getElementById('nameInput');
    if (input) input.focus();
  }, 200);
}

function obCheckName() {
  const val = document.getElementById('nameInput').value.trim();
  const btn = document.getElementById('obStartBtn');
  if (btn) btn.disabled = val.length < 2;
}

function obSaveName() {
  const val = document.getElementById('nameInput').value.trim();
  if (val.length < 2) return;
  saveName(val);
  showHome();
}
