# MedDuel — Instructies voor Claude Code

## Wat is dit project?

Een medische trivia web-app voor studenten, coassistenten en zorgprofessionals.
Doel: educatief, verslavend, en uiteindelijk winstgevend via freemium + iOS.

## Architectuur in één zin

Vanilla HTML/CSS/JS zonder framework. Elke scherm wordt dynamisch gerenderd via `innerHTML`.
Geen build step. Direct openen of via `npx serve .`.

## Belangrijkste bestanden

| Bestand | Wat het doet |
|---------|--------------|
| `src/data/questions.js` | Vragenbank — hier voeg je vragen toe |
| `src/data/cases.js` | Dossier casussen — hier voeg je patiënten toe |
| `src/game.js` | Trivia spelmodi logica |
| `src/dossier.js` | Dossier modus logica |
| `src/ui.js` | Gedeelde functies: `showToast`, `showScreen`, `shuffleArr` |
| `src/router.js` | Home screen + app init |
| `src/styles.css` | Alle CSS — volg het bestaande designsysteem |

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
  type: 'diagnose',        // of 'truefalse', 'pharma', 'lab'
  domain: 'cardio',        // of 'neuro', 'pharma', 'infectio', 'lab'
  dl: 'Cardiologie',       // Display label
  q: 'De vraag...',
  a: ['Optie A', 'Optie B', 'Optie C', 'Optie D'],  // niet bij truefalse
  c: 0,                    // correct index, of true/false bij truefalse
  ex: 'Uitleg na antwoord...',
  // Optioneel — gebruik fig alleen waar het écht waarde toevoegt:
  fig: {
    type: 'ecg',           // 'ecg' | 'xray' | 'derm' | 'histo' | 'ct' | 'graph'
    src: null,             // null = placeholder; string = pad naar afbeelding of inline SVG
    alt: 'Omschrijving',   // altijd invullen voor toegankelijkheid
    credit: null,          // 'Auteur · Licentie' of null
  },
}
```

**fig-regels:**
- Gebruik `fig` alleen als de afbeelding de vraag zinvol verbetert (bijv. ECG lezen, dermatolgie spot-diagnose)
- Niet elke vraag heeft een fig nodig — variatie is het doel
- `src: null` → toont een "📷 Afbeelding volgt" badge; vraag is gewoon speelbaar
- Inline SVG (als string in `fig.src`) werkt ook — handig voor ECG-schemaatjes
- Legacy: `fig: '<svg>...</svg>'` (string) werkt nog steeds

## Hoe een nieuwe dossier casus toevoegen

In `src/data/cases.js`, voeg toe aan de `DOSSIER_CASES` array:

```js
{
  id: 'c6',
  patient: 'Patiënt F — Man, 45 jaar',
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
3. Voeg een mode-card toe in `renderHomeScreen()` in `router.js`
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
```

## Veelgemaakte fouten

- **Schermen werken via `innerHTML`** — gebruik `document.getElementById` pas NA het renderen
- **`activeCats` en `currentMode`** zijn globale variabelen in `game.js` — niet opnieuw declareren
- **Challenge-link** werkt via URL params — test met `?challenge=01234&score=300&hints=5`
- **Geen `import`/`export`** — alles is globaal door script-volgorde in index.html

## Volgende stappen (prioriteit)

1. Vragenbank uitbreiden (doel: 100 vragen per domein)
2. GitHub Pages deployen
3. Gebruikersaccounts via Supabase
4. Echte leaderboard
5. Live multiplayer via Partykit
