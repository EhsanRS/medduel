# MedDuel 🏥

Medische trivia game voor studenten, coassistenten en zorgprofessionals.

## Projectstructuur

```
medduel/
├── index.html              # Entry point
├── src/
│   ├── styles.css          # Alle CSS (design system + componenten)
│   ├── ui.js               # Gedeelde UI utilities (toast, showScreen, stats)
│   ├── game.js             # Trivia spelmodi: Blitz, Classic, Survival
│   ├── dossier.js          # Dossier modus: patiëntencasussen onthullen
│   ├── router.js           # Home screen + app initialisatie
│   └── data/
│       ├── questions.js    # Trivia vragenbank (QUESTIONS array)
│       └── cases.js        # Dossier patiëntencasussen (DOSSIER_CASES array)
├── docs/                   # Documentatie & assets
└── README.md
```

## Lokaal draaien

Twee paden:

**Snelste — geen build:**
```bash
npx serve .                  # of: python3 -m http.server 8080
```
De app draait dan zonder backend (offline modus, gebundelde vragenbank).

**Met Vite (vereist voor backend / mobile build):**
```bash
npm install
npm run dev                  # http://localhost:5173, hot reload
npm run build                # → dist/  (Capacitor pakt deze map op)
npm run preview              # serveert dist/ op :4173 ter verificatie
```

## Backend (in ontwikkeling)

De backend wordt gebouwd op **Supabase** (Postgres + Auth + Edge Functions).
Mobiel komt via **Capacitor**. Volledige uitleg in
[`docs/BACKEND.md`](docs/BACKEND.md).

Snelle start zodra je een Supabase-project hebt:

```bash
npm install
cp .env.example .env.local              # vul VITE_SUPABASE_URL/ANON_KEY in
npm run supabase:start                  # lokaal Postgres + Auth + Studio
npm run supabase:reset                  # past migrations + seed.sql toe
npm run supabase:seed                   # genereert seed.sql opnieuw uit src/data/
```

**Status:**
- ✅ Schema (profiles, questions, attempts, sr_state, sessions, daily, ...)
- ✅ RLS policies + answer-key-vrije `questions_public` view
- ✅ Seed-script: 387 vragen, 15 dossier casussen, 3 detective casussen
- ✅ Edge Functions: `GET /questions`, `POST /attempt`
- ✅ Frontend storage-adapter laag (`MDStorage`, `MDState`, `MDIdb`, `MDApi`, `MDQuestions`)
- ✅ Vite build → `dist/`
- ✅ Capacitor config + native `PreferencesAdapter`
- 🚧 Refactor `game.js` / `dossier.js` om via `MDQuestions.gradeAttempt()` te scoren
- 🚧 Auth UI (Apple / Google / e-mail magic link)
- 🚧 LocalStorage → cloud-sync importer (one-shot import bij eerste sign-in)
- 🚧 `npx cap add ios/android` op een Mac met Xcode

## Spelmodi

| Modus    | Beschrijving                              | Verdienmodel later |
|----------|-------------------------------------------|--------------------|
| Blitz    | 60 seconden, zo snel mogelijk             | Gratis             |
| Classic  | 10 vragen, geen tijdsdruk                 | Gratis             |
| Survival | 3 levens, eindeloos                       | Gratis             |
| Dossier  | Patiëntencasussen stap voor stap onthullen | Premium / uitdagen |

## Vragenbank uitbreiden

Voeg vragen toe aan `src/data/questions.js`:

```js
{
  type: 'diagnose',      // 'diagnose' | 'truefalse' | 'pharma' | 'lab'
  domain: 'cardio',     // 'cardio' | 'neuro' | 'pharma' | 'infectio' | 'lab'
  dl: 'Cardiologie',    // Display label (zichtbaar in spel)
  q: 'Vraag tekst...',  // De vraag
  a: ['A', 'B', 'C', 'D'], // Antwoorden (alleen bij type != 'truefalse')
  c: 0,                 // Index van correct antwoord (of true/false)
  ex: 'Uitleg...',      // Uitleg na antwoord
}
```

## Dossier casussen uitbreiden

Voeg casussen toe aan `src/data/cases.js`:

```js
{
  id: 'c6',                    // Uniek ID
  patient: 'Patiënt F — ...',  // Patiëntomschrijving
  diagnosis: 'Diagnose naam',  // Correcte diagnose
  clues: [
    { label: 'Reden van komst', text: '...' },
    { label: 'Voorgeschiedenis', text: '...' },
    // Max 6 clues aanbevolen
  ],
  options: ['A', 'B', 'C', 'D'], // 4 keuzes
  correct: 0,                    // Index van correct antwoord
}
```

## Designsysteem

CSS variabelen in `src/styles.css`:

```css
--cream: #F5F0E8      /* Achtergrond */
--ink: #1A1410        /* Primaire tekst */
--pulse: #E8410A      /* Accent / correct / energie */
--green: #1A7A4A      /* Succes */
--amber: #D4820A      /* Dossier / waarschuwing */
--blue: #1B5FA8       /* Farmacologie */
```

Fonts: **Fraunces** (display/titels) + **DM Sans** (body)

## Roadmap

### v1 — Nu (web prototype)
- [x] Trivia modi (Blitz, Classic, Survival)
- [x] Dossier modus met hint-systeem
- [x] Async challenge via URL-link
- [x] Leaderboard (lokaal gesimuleerd)

### v2 — GitHub Pages + Gebruikersfeedback
- [ ] Vragenbank uitbreiden naar 100+ vragen
- [ ] Meer dossier casussen (10+)
- [ ] Gebruikersaccounts (Supabase auth)
- [ ] Echte leaderboard persistentie

### v3 — Live Multiplayer
- [ ] WebSocket-kamers (Partykit of Supabase Realtime)
- [ ] Matchmaking: random tegenstander zoeken
- [ ] Realtime scorevergelijking tijdens spel
- [ ] Seizoenscompetities

### v4 — Monetisatie
- [ ] Freemium: gratis basis, premium voor Dossier + statistieken
- [ ] iOS app via React Native (zelfde logica hergebruiken)
- [ ] Partnerships: medische faculteiten, ziekenhuizen

## Technische keuzes

- **Geen framework** — vanilla HTML/CSS/JS voor maximale snelheid en eenvoud
- **Geen build step** — direct te openen in browser, makkelijk voor GitHub Pages
- **Modulaire JS** — elke modus is een apart bestand, makkelijk uit te breiden
- **URL-based state** — challenge-links werken zonder server
- **localStorage** — lokale stats zonder account

## Naar iOS later

De businesslogica (`game.js`, `dossier.js`) is puur JavaScript zonder DOM-afhankelijkheden in de kern. Bij migratie naar React Native:
1. Data files (`questions.js`, `cases.js`) gaan 1:1 mee
2. UI-logica vervang je door React Native componenten
3. `localStorage` vervang je door `AsyncStorage`
