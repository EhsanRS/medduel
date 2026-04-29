# MedDuel — Instructies voor Claude Code

> **Werkwijze — ALTIJD in kleine batches.**
> Maximaal 2–3 bestanden of onderwerpen per keer. Na elke batch:
> syntaxis checken → SW-versie ophogen in `sw.js` → committen → pushen.
> Nooit 10 dingen tegelijk. Voor volledig projectoverzicht: lees **BRIEFING.md**.

> **Branch-beleid — ALTIJD direct op `main`.**
> Geen feature-branches. Commit en push rechtstreeks naar `main`.
> `git push -u origin main` na elke batch.

## Wat is dit project?

Een medische trivia web-app voor studenten, coassistenten en zorgprofessionals.
Doel: educatief, verslavend, en uiteindelijk winstgevend via freemium + iOS.

## Architectuur in één zin

Vanilla HTML/CSS/JS zonder framework. Elk scherm wordt dynamisch gerenderd via `innerHTML`.
Geen build step. Direct openen of via `npx serve .`.

## Alle bestanden

| Bestand | Wat het doet |
|---------|-------------- |
| `src/data/questions.js` | Vragenbank — 387 vragen, QUESTIONS array |
| `src/data/cases.js` | Dossier casussen — 18 casussen, DOSSIER_CASES array |
| `src/ui.js` | Gedeelde functies + lab-formatter + DOMAIN_META |
| `src/game.js` | Blitz, Classic, Survival spelmodi |
| `src/dossier.js` | Dossier modus logica |
| `src/daily.js` | Dagelijkse uitdaging + challenge via URL |
| `src/favourites.js` | Favorieten opslaan en spelen |
| `src/learn.js` | Leer-modus met domein-selectie |
| `src/weak.js` | Train je Zwaktes modus |
| `src/onboarding.js` | Eerste keer onboarding + naam instellen |
| `src/theory.js` | Theorieboek — 12 klinische onderwerpen |
| `src/admin.js` | Admin vragenbank-overzicht (via ?admin=1) |
| `src/router.js` | Home screen + bottom nav + app init |
| `src/styles.css` | Alle CSS — volg het bestaande designsysteem |
| `sw.js` | Service Worker — versie OPHOGEN na elke deploy |

## Designprincipes — NIET afwijken

- Fonts: **Fraunces** (serif, titels) + **DM Sans** (body) — geen andere fonts
- Achtergrond: `--cream: #F5F0E8` (warm crème, nooit wit of zwart)
- Accentkleur: `--pulse: #E8410A` (oranje-rood) — spaarzaam gebruiken
- Kaarten: witte achtergrond, `border-radius: 20-24px`, subtiele schaduw
- Animaties: slide-in, fade-up — nooit flashy of overdreven
- Mobiel first: max-width 480px gecentreerd

## Hoe een nieuwe vraag toevoegen

In `src/data/questions.js`, voeg toe aan de `QUESTIONS` array:

```js
{
  type: 'diagnose',        // 'diagnose' | 'truefalse' | 'pharma' | 'lab' | 'diff' | 'test' | 'ecg' | 'graph'
  domain: 'cardio',        // zie domein-lijst hieronder
  dl: 'Cardiologie',       // Display label
  q: 'De vraag...',
  a: ['Optie A', 'Optie B', 'Optie C', 'Optie D'],  // niet bij truefalse
  c: 0,                    // correct index, of true/false bij truefalse
  ex: 'Uitleg na antwoord...',
  wiki: 'Uitgebreide uitleg voor fact-modal...',  // optioneel maar sterk aanbevolen
  // Optioneel:
  fig: {
    type: 'ecg',           // 'ecg' | 'xray' | 'derm' | 'histo' | 'ct' | 'graph'
    src: null,             // null = placeholder; string = SVG of pad
    alt: 'Omschrijving',
    credit: null,
  },
}
```

**Domeinen:** `cardio · neuro · pharma · infectio · lab · pulmo · gastro · endo · nephro · psych · derm · rheum · repro`

**Syntaxis checken na toevoegen:**
```bash
node -e "eval(require('fs').readFileSync('src/data/questions.js','utf8'))" && echo OK
```

## Hoe een nieuwe dossier casus toevoegen

In `src/data/cases.js`, voeg toe aan de `DOSSIER_CASES` array:

```js
{
  id: 'c19',
  patient: 'Patiënt X — Man, 45 jaar',
  diagnosis: 'Naam van de diagnose',
  clues: [
    { label: 'Reden van komst', text: '...' },
    { label: 'Voorgeschiedenis', text: '...' },
    { label: 'Vitale functies', text: '...' },
    { label: 'Lichamelijk onderzoek', text: '...' },
    { label: 'Lab', text: '...' },
    { label: 'Beeldvorming', text: '...' },
  ],
  options: ['Diagnose A', 'Diagnose B', 'Diagnose C', 'Diagnose D'],
  correct: 1,
}
```

## Hoe een nieuwe spelmodus toevoegen

1. Maak `src/mijnmodus.js`
2. Voeg `<script src="src/mijnmodus.js"></script>` toe in `index.html`
3. Voeg een mode-card toe in `renderSpelenTab()` in `router.js`
4. Exporteer een `startMijnModus()` functie

## Globale functies (beschikbaar overal)

```js
showToast(ok, head, body)   // Toast onderaan tonen
hideToast()                 // Toast verbergen
showCombo(num, label)       // Combo-burst animatie
showScreen(id)              // Scherm wisselen
showHome()                  // Terug naar home
shuffleArr(array)           // Array shufflen
gradeFromPct(pct)           // [minPct, label, kleur] teruggeven
loadStats() / saveStats()   // localStorage stats
openTheory(topicId)         // Theoriepagina openen
formatQ(txt)                // Lab-tekst → verticale tabel met ↑/↓/✓
```

## Veelgemaakte fouten

- **Schermen werken via `innerHTML`** — gebruik `document.getElementById` pas NA het renderen
- **`activeCats` en `currentMode`** zijn globale variabelen in `game.js` — niet opnieuw declareren
- **Challenge-link** werkt via URL params — test met `?challenge=01234&score=300&hints=5`
- **Geen `import`/`export`** — alles is globaal door script-volgorde in index.html
- **SW-cache** — versie in `sw.js` ophogen na elke betekenisvolle deploy, anders zien gebruikers de oude versie

## Backlog (prioriteit)

### Openstaand
- **wiki-veld** toevoegen aan de ~162 vragen die het nog missen
  (check: `node -e "const s=require('fs').readFileSync('src/data/questions.js','utf8');console.log('zonder wiki:',(s.match(/type:/g)||[]).length - (s.match(/wiki:/g)||[]).length)"`)
- **Vragenbank uitbreiden** — doel 100 per domein; kleinste nu: repro (12), derm (13)
- **Spoedkamer-modus** — spelmodus met urgentie-thema, roder/urgenter dan Blitz
- **GitHub Pages deployen**
- **Gebruikersaccounts** via Supabase
- **Live multiplayer** via Partykit

### Al gedaan (voor referentie)
- Duplicaten verwijderd (6 stuks)
- Subtype-badges (Differentiaal / Test-keuze) zichtbaar in UI
- `ex`-velden verbeterd batch 1+2 — 11 vragen
- `dl`-labels opgeschoond (suffix "— Waar of Niet?" verwijderd van alle truefalse)
- `wiki`-veld toegevoegd aan 14 hoge-prioriteit diagnose-vragen
- 8 nieuwe domeinen toegevoegd (pulmo, gastro, endo, nephro, psych, derm, rheum, repro)
- Lab-display redesign: verticale tabel met ↑/↓/✓ indicators
- Theorieboek overhaul: keynums, redflag, trap, mnemonic blokken voor alle 12 topics
- DOMAIN_META bugfix voor rheum/psych
