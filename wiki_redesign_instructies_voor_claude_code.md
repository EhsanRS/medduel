# MedDuel — Wiki Redesign: Instructies voor Claude Code

## Wat er moet veranderen

Het wiki-systeem heeft twee componenten die samen moeten worden bijgewerkt:
1. **Het dataschema** in `src/data/questions.js` — nieuwe veldnamen en structuur
2. **De renderlogica** in `src/ui.js` — tabbed HTML genereren vanuit het nieuwe schema

Doe deze twee stappen IN DEZE VOLGORDE. Begin pas met stap 2 als stap 1 werkt.

---

## STAP 1 — Nieuw wiki-schema in questions.js

### Oud schema (vervangen)
```js
wiki: {
  kern: 'lange alinea tekst...',
  mechanisme: 'lange alinea tekst...',
  onderscheid: 'lange alinea tekst...',
  therapie: 'lange alinea tekst...',
}
```

### Nieuw schema
```js
wiki: {
  kern: 'Één heldere zin die de essentie van de diagnose/het concept vat.',
  bigfact: { num: '90\'', label: 'Tijdsvenster', sub: 'Na dit venster stijgt mortaliteit significant.' },
  redflag: 'Klinische valkuil of gevaarlijk misverstand dat studenten vaak maken.',
  mechanisme: [
    { title: 'Stap 1 naam', desc: 'Korte beschrijving van wat er in deze stap gebeurt.' },
    { title: 'Stap 2 naam', desc: 'Korte beschrijving.' },
    { title: 'Stap 3 naam', desc: 'Korte beschrijving.' },
  ],
  mnemonic: { word: 'MONA', items: ['M — Morfine', 'O — Oxygen', 'N — Nitro', 'A — Aspirine'] },
  onderscheid: [
    { label: 'Correcte diagnose', desc: 'Kernkenmerk waarmee je deze herkent.', type: 'ok' },
    { label: 'Gevaarlijke verwisselaar', desc: 'Waarom dit gevaarlijk is om te missen.', type: 'danger' },
    { label: 'Andere optie', desc: 'Hoe je dit van de hoofddiagnose onderscheidt.', type: 'warn' },
  ],
  therapie: {
    urgent: 'De absolute prioriteit in één zin — wat als eerste moet gebeuren.',
    stappen: [
      { naam: 'Eerste actie', detail: 'Concreet: middel, dosis, tijdvenster.' },
      { naam: 'Tweede actie', detail: 'Concreet.' },
      { naam: 'Derde actie', detail: 'Concreet.' },
    ],
  },
}
```

### Veldregels

**kern** (verplicht): Maximaal 2 zinnen. Geen opsomming, gewoon proza.

**bigfact** (optioneel): Alleen invullen als er EEN getal of afkorting is dat de kern van de diagnose/behandeling symboliseert. Kies kritisch — niet elke vraag heeft een zinvol bigfact. Velden:
- `num`: het getal/symbool zelf (bijv. `'90\''`, `'<1u'`, `'3-5d'`, `'U=U'`)
- `label`: naam van het feit (bijv. `'Deur-tot-ballon tijd'`)
- `sub`: één zin context (bijv. `'Maximale tijd van aankomst tot PCI-opening coronairarterie'`)

**redflag** (verplicht): Één zin. Begin NIET met "Let op:" of "Cave:". Schrijf de valkuil direct als feit. Bijv: *"Vrouwen en diabetici presenteren atypisch — misselijkheid en moeheid zónder thoraxpijn."*

**mechanisme** (verplicht): Array van 3–5 stappen. Elke stap heeft `title` (max 3 woorden) en `desc` (max 1,5 zin). Schrijf als een keten van oorzaak en gevolg.

**mnemonic** (optioneel): Alleen invullen als er een klinisch gangbare mnemonic bestaat. Niet verzinnen. `word` = het acroniem, `items` = array van strings, één per letter.

**onderscheid** (verplicht): Array van 3–5 items. Elk item heeft:
- `label`: naam van de diagnose/situatie
- `desc`: één zin met het onderscheidende kenmerk
- `type`: `'ok'` (de correcte diagnose), `'danger'` (gevaarlijk om te missen), `'warn'` (nuance/alternatief)

Precies één item heeft `type: 'ok'`. Meerdere `'danger'` en `'warn'` zijn toegestaan.

**therapie** (verplicht): Object met:
- `urgent`: één zin met de absolute prioriteit
- `stappen`: array van 3–5 stappen, elk met `naam` (max 4 woorden) en `detail` (1 zin, concreet met middel/dosis/tijdvenster waar relevant)

---

## STAP 1b — Bestaande wiki-velden migreren

Alle bestaande vragen in `questions.js` die al een `wiki:`-veld hebben moeten worden omgezet naar het nieuwe schema. Dit zijn er ~225.

**Werkwijze**: Doe dit in batches van 15-20 vragen tegelijk, per domein. Na elke batch: syntaxcheck.

```bash
node -e "eval(require('fs').readFileSync('src/data/questions.js','utf8'))" && echo OK
```

**Migratieregel voor bestaande wiki's**:
- Oud `kern` → nieuw `kern` (inkorten tot max 2 zinnen) + eventueel `bigfact` extraheren
- Oud `mechanisme` → opsplitsen in `mechanisme`-array van stappen + eventueel `mnemonic` extraheren
- Oud `onderscheid` → opsplitsen in `onderscheid`-array met `type`-labels
- Oud `therapie` → `therapie.urgent` (eerste zin) + `therapie.stappen` (rest)

---

## STAP 2 — Renderlogica in ui.js

Vervang de bestaande `openFactModal()` wiki-rendering. Zoek dit blok:

```js
  if (currentFact.wiki) {
    const w = currentFact.wiki;
    exEl.innerHTML = [
      w.kern        && `<div class="wiki-block"><div class="wiki-label">Kern</div><p>${w.kern}</p></div>`,
      w.mechanisme  && `<div class="wiki-block"><div class="wiki-label">Hoe ontstaat het?</div><p>${w.mechanisme}</p></div>`,
      w.onderscheid && `<div class="wiki-block"><div class="wiki-label">Onderscheid</div><p>${w.onderscheid}</p></div>`,
      w.therapie    && `<div class="wiki-block"><div class="wiki-label">Behandeling</div><p>${w.therapie}</p></div>`,
    ].filter(Boolean).join('');
  }
```

Vervang door:

```js
  if (currentFact.wiki) {
    const w = currentFact.wiki;
    exEl.innerHTML = renderWikiTabs(w);
    // Init tab switching na renderen
    setTimeout(() => initWikiTabs(), 0);
  }
```

Voeg daarna deze twee functies toe aan `ui.js` (vóór `openFactModal`):

```js
function renderWikiTabs(w) {
  const tabs = ['Kern', 'Mechanisme', 'Onderscheid', 'Behandeling'];

  // ── Kern panel ──
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
      <div class="wiki-kern-lede">${w.kern}</div>
      ${bigfactHTML}
      ${w.redflag ? `<div class="wiki-redflag"><div class="wiki-redflag-dot"></div><div class="wiki-redflag-text">${w.redflag}</div></div>` : ''}
    </div>`;

  // ── Mechanisme panel ──
  const mechSteps = (w.mechanisme || []).map((s, i, arr) => `
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

  // ── Onderscheid panel ──
  const diffItems = (w.onderscheid || []).map(d => `
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

  // ── Behandeling panel ──
  const therapieStappen = w.therapie && w.therapie.stappen ? w.therapie.stappen.map(s => `
    <div class="wiki-treat-row">
      <div class="wiki-treat-dot"></div>
      <div class="wiki-treat-body">
        <div class="wiki-treat-name">${s.naam}</div>
        <div class="wiki-treat-detail">${s.detail}</div>
      </div>
    </div>`).join('') : '';

  const treatHTML = `
    <div class="wiki-panel" id="wiki-panel-therapie">
      ${w.therapie && w.therapie.urgent ? `
        <div class="wiki-treat-urgent">
          <div class="wiki-treat-urgent-label">Prioriteit</div>
          <div class="wiki-treat-urgent-text">${w.therapie.urgent}</div>
        </div>` : ''}
      ${therapieStappen}
    </div>`;

  // ── Tab navigatie ──
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

  const tabMap = ['kern', 'mechanisme', 'onderscheid', 'therapie'];

  function goTab(idx) {
    labels.forEach((l, i) => l.classList.toggle('active', i === idx));
    track.style.transform = `translateX(-${idx * 100}%)`;
    const trackW = pill.parentElement.offsetWidth;
    pill.style.width = (trackW / 4) + 'px';
    pill.style.left = (idx * trackW / 4) + 'px';
    document.querySelectorAll('.wiki-panel')[idx].scrollTop = 0;
  }

  labels.forEach((label, i) => {
    label.onclick = () => goTab(i);
  });

  // Swipe support
  let startX = 0;
  let currentTab = 0;
  const vp = track.parentElement;
  vp.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  vp.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      currentTab = Math.max(0, Math.min(3, currentTab + (dx < 0 ? 1 : -1)));
      goTab(currentTab);
    }
  });

  // Init underline positie
  setTimeout(() => goTab(0), 50);
}
```

---

## STAP 3 — CSS toevoegen aan styles.css

Voeg het volgende toe aan het einde van `src/styles.css`, na de bestaande `.wiki-block` regels (die mogen daarna worden verwijderd):

```css
/* ── Wiki Tabs — nieuw design ── */
.wiki-tab-nav {
  flex-shrink: 0;
  padding: 12px 0 0;
}
.wiki-tab-labels {
  display: flex;
}
.wiki-tab-label {
  flex: 1;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-light);
  cursor: pointer;
  padding-bottom: 10px;
  transition: color 0.2s;
  user-select: none;
  font-family: 'DM Sans', sans-serif;
}
.wiki-tab-label.active {
  color: var(--ink);
  font-weight: 600;
}
.wiki-tab-underline-track {
  height: 2px;
  background: var(--cream-dark);
  border-radius: 1px;
  position: relative;
  margin: 0 0 2px;
}
.wiki-tab-underline-pill {
  position: absolute;
  height: 2px;
  background: var(--pulse);
  border-radius: 1px;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  top: 0;
}
.wiki-panels-viewport {
  overflow: hidden;
  flex: 1;
  min-height: 200px;
}
.wiki-panels-track {
  display: flex;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}
.wiki-panel {
  min-width: 100%;
  overflow-y: auto;
  padding: 14px 0 60px;
  scrollbar-width: none;
}
.wiki-panel::-webkit-scrollbar { display: none; }

/* Kern */
.wiki-kern-lede {
  font-family: 'Fraunces', serif;
  font-size: 17px;
  font-weight: 300;
  color: var(--ink);
  line-height: 1.6;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--cream-dark);
  margin-bottom: 14px;
}
.wiki-bigfact {
  background: var(--cream);
  border-radius: 18px;
  padding: 16px 18px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
}
.wiki-bigfact-num {
  font-family: 'Fraunces', serif;
  font-size: 44px;
  font-weight: 900;
  color: var(--pulse);
  line-height: 1;
  flex-shrink: 0;
}
.wiki-bigfact-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 3px;
}
.wiki-bigfact-sub {
  font-size: 12px;
  color: var(--ink-light);
  line-height: 1.4;
}
.wiki-redflag {
  background: rgba(232, 74, 74, 0.06);
  border: 1px solid rgba(232, 74, 74, 0.2);
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.wiki-redflag-dot {
  width: 7px;
  height: 7px;
  background: #E84A4A;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 5px;
}
.wiki-redflag-text {
  font-size: 13px;
  color: var(--ink);
  line-height: 1.55;
}

/* Mechanisme */
.wiki-mech-step {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.wiki-mech-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}
.wiki-mech-num {
  width: 26px;
  height: 26px;
  background: var(--ink);
  color: white;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wiki-mech-line {
  width: 1.5px;
  flex: 1;
  background: var(--cream-dark);
  margin: 4px 0;
  min-height: 16px;
}
.wiki-mech-body {
  padding: 2px 0 18px;
  flex: 1;
}
.wiki-mech-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 2px;
}
.wiki-mech-desc {
  font-size: 13px;
  color: var(--ink-mid);
  line-height: 1.5;
}
.wiki-mnemonic {
  background: rgba(79, 70, 229, 0.07);
  border-radius: 16px;
  padding: 14px 16px;
  margin-top: 4px;
}
.wiki-mnemonic-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6D5FB5;
  margin-bottom: 10px;
}
.wiki-mnemonic-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.wiki-mnemonic-item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}
.wiki-mnemonic-letter {
  font-family: 'Fraunces', serif;
  font-size: 20px;
  font-weight: 900;
  color: #4F46E5;
  line-height: 1;
  min-width: 14px;
  flex-shrink: 0;
}
.wiki-mnemonic-word {
  font-size: 12.5px;
  color: #312E81;
  line-height: 1.4;
  padding-top: 3px;
}

/* Onderscheid */
.wiki-diff-item {
  padding: 11px 0;
  border-bottom: 1px solid var(--cream-dark);
  display: grid;
  grid-template-columns: 3px 1fr;
  gap: 12px;
  align-items: stretch;
}
.wiki-diff-item:last-child { border-bottom: none; }
.wiki-diff-stripe { border-radius: 2px; }
.wiki-diff-stripe.ok     { background: var(--green); }
.wiki-diff-stripe.warn   { background: var(--amber); }
.wiki-diff-stripe.danger { background: #E84A4A; }
.wiki-diff-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 2px;
}
.wiki-diff-name.ok     { color: #1A5C38; }
.wiki-diff-name.danger { color: #B83030; }
.wiki-diff-desc {
  font-size: 12.5px;
  color: var(--ink-mid);
  line-height: 1.5;
}

/* Behandeling */
.wiki-treat-urgent {
  background: var(--ink);
  border-radius: 18px;
  padding: 16px 18px;
  margin-bottom: 14px;
}
.wiki-treat-urgent-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 5px;
}
.wiki-treat-urgent-text {
  font-family: 'Fraunces', serif;
  font-size: 16px;
  font-weight: 700;
  color: white;
  line-height: 1.45;
}
.wiki-treat-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 9px 0;
  border-bottom: 1px solid var(--cream-dark);
}
.wiki-treat-row:last-child { border-bottom: none; }
.wiki-treat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--pulse);
  flex-shrink: 0;
  margin-top: 6px;
}
.wiki-treat-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 2px;
}
.wiki-treat-detail {
  font-size: 12.5px;
  color: var(--ink-mid);
  line-height: 1.4;
}
```

---

## STAP 4 — Voorbeeld nieuw wiki-schema (STEMI)

Dit is hoe de STEMI-vraag eruitziet in het nieuwe formaat. Gebruik dit als referentie bij het migreren van bestaande wiki's.

```js
{ type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
  q:'Man van 55 jaar: drukkende thoraxpijn uitstralend naar de linkerarm, zweten, misselijkheid. Meest waarschijnlijke diagnose?',
  a:['STEMI','Longembolie','Aortadissectie','Pancreatitis'], c:0,
  ex:'Klassieke STEMI-presentatie: drukkende pijn, uitstraling, vegetatieve verschijnselen. Directe PCI binnen 90 min.',
  wiki:{
    kern: 'Acuut hartinfarct door complete afsluiting van een coronairarterie. Elke minuut vertraging betekent meer irreversibel myocardverlies.',
    bigfact: { num: '90\'', label: 'Deur-tot-ballon tijd', sub: 'Maximale tijd van aankomst SEH tot opening coronairarterie via PCI.' },
    redflag: 'Vrouwen en diabetici presenteren atypisch — misselijkheid en moeheid zónder thoraxpijn.',
    mechanisme: [
      { title: 'Plaque ruptuur', desc: 'Atherosclerotische plaque scheurt open, subendotheliaal collageen wordt blootgesteld.' },
      { title: 'Trombusvorming', desc: 'Bloedplaatjes aggregeren op de ruptuurplek en sluiten de arterie volledig af.' },
      { title: 'Transmuraal infarct', desc: 'Volledige dikte hartspier wordt necrotisch — ST-elevatie op ECG, troponine stijgt na 3–6u.' },
      { title: 'Irreversibele schade', desc: 'Begint al na 20–40 minuten. Elke minuut ≈ 2g myocard verloren.' },
    ],
    mnemonic: { word: 'MONA', items: ['M — Morfine (pijn)', 'O — Oxygen (SpO₂ <94%)', 'N — Nitro (stabiele BD)', 'A — Aspirine 300 mg + P2Y12'] },
    onderscheid: [
      { label: 'STEMI', desc: 'ST-elevatie in ≥2 aangrenzende afleidingen, regionale verdeling. Directe PCI.', type: 'ok' },
      { label: 'Aortadissectie', desc: 'Trombolyse is hier fataal — altijd uitsluiten bij asymmetrie en scheurende pijn.', type: 'danger' },
      { label: 'NSTEMI', desc: 'Geen ST-elevatie maar troponine wél verhoogd. PCI binnen 24–72u.', type: 'warn' },
      { label: 'Pericarditis', desc: 'Diffuse saddle-shape ST-elevatie, pijn erger bij liggen, geen regionale verdeling.', type: 'warn' },
    ],
    therapie: {
      urgent: 'Directe PCI binnen 90 minuten — dit is de enige maatstaf die telt.',
      stappen: [
        { naam: 'Dubbele plaatjesremming', detail: 'Aspirine 300 mg + ticagrelor 180 mg direct bij aankomst.' },
        { naam: 'Heparine IV', detail: 'Bridging tot PCI — voorkomt verdere trombusgroei.' },
        { naam: 'Geen PCI beschikbaar?', detail: 'Trombolyse binnen 30 minuten na aankomst als alternatief.' },
        { naam: 'Secundaire preventie', detail: 'Statine + bètablokker + ACE-remmer — altijd na ontslag.' },
      ],
    },
  }
},
```

---

## STAP 5 — Werkwijze batches

Na het implementeren van stap 1-3 en -4 (renderlogica + CSS + voorbeeldvraag werkt): migreer de bestaande wiki's per domein in batches van 15-20. Volgorde:

1. Cardio (58 vragen, hoogste prioriteit — meest gespeeld)
2. Neuro
3. Infectiologie
4. Farmacologie
5. Lab
6. Overige domeinen

Syntaxcheck na elke batch:
```bash
node -e "eval(require('fs').readFileSync('src/data/questions.js','utf8'))" && echo OK
```

SW-versie ophogen in `sw.js` na elke deployment-klare set.

---

## Veelgemaakte fouten om te vermijden

- `bigfact.num` mag GEEN spaties bevatten die de layout breken. Test: `'90\''` niet `'90 minuten'`
- `onderscheid` array moet altijd precies één item met `type: 'ok'` bevatten
- `mnemonic.items` moet exact het aantal letters van `mnemonic.word` bevatten
- `therapie.stappen` zijn GEEN bullet points — elke stap heeft een naam én een detail
- Schrijf `therapie.urgent` zonder "Cave:" of "Let op:" — gewoon de actie direct
