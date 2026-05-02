// MedDuel — Onboarding (first time)

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
  const prefix = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  return `${prefix}, ${name}! 👋`;
}

const OB_SLIDES = [
  {
    icon: '🩺',
    title: 'Welcome to MedDuel',
    body: 'The fastest way to sharpen your medical knowledge. Test yourself, learn from mistakes, and rise in rank.',
    cta: 'Next →',
  },
  {
    icon: '⚡',
    title: 'Multiple modes',
    body: 'Blitz (60-second chaos), Classic (10 questions), Survival (3 lives), Dossier (patient cases) and Learn mode.',
    cta: 'Next →',
  },
  {
    icon: '🎓',
    title: 'Track your growth',
    body: 'Earn XP, rise from Pre-med to Professor. Train your weakest topics. View your progress per domain.',
    cta: 'Almost there →',
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
        <button class="ob-skip" onclick="showNameScreen()">Skip</button>
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
        <h2 class="ob-title">What should we<br>call you?</h2>
        <p class="ob-body">Your name appears on the home screen and in your results.</p>
        <input
          id="nameInput"
          class="ob-name-input"
          type="text"
          placeholder="Your name or nickname"
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
