# MedDuel — Volledig Projectbriefing voor nieuwe chat

> **Instructie voor Claude:** Werk ALTIJD in kleine stukjes. Maximaal 2–3 bestanden
> of onderwerpen per batch. Grote bewerkingen (zoals theory.js of questions.js)
> altijd in batches van 2–3 items tegelijk. Controleer syntaxis na elke batch met
> `node -e "..."`. Zet de SW-cache versie omhoog (`sw.js`) na elke betekenisvolle
> set wijzigingen en commit+push dan meteen. Nooit 10 dingen tegelijk proberen.

---

## 1. Wat is MedDuel?

MedDuel is een **medische trivia web-app** voor studenten, coassistenten en
zorgprofessionals. Het doel is educatief en verslavend tegelijk — zoals Duolingo
maar dan voor geneeskunde. Uiteindelijk moet het een freemium product worden met
een iOS app.

**Tagline:** *Test je medische kennis. Versla anderen. Word beter.*

**Tech stack:** Pure vanilla HTML/CSS/JS. Geen framework, geen build step.
Alles is globaal via script-volgorde in `index.html`. Geen `import`/`export`.
Lokaal draaien: `npx serve .` of `python3 -m http.server 8080`.

**Repository:** `iibbii2/medduel` op GitHub  
**Werkbranch:** `claude/medduel-trivia-app-0Rgj8`

---

## 2. Bestandsstructuur

```
medduel/
├── index.html              # Enige HTML-file. Laadt alles. Bevat toast, fact-modal, theory-overlay.
├── sw.js                   # Service Worker — cache versie ALTIJD ophogen bij deploy
├── manifest.json           # PWA manifest
├── src/
│   ├── styles.css          # ~2650 regels. Alle CSS. Volg het bestaande design system.
│   ├── ui.js               # Gedeelde utilities: showToast, showScreen, formatQ, LAB_REFS
│   ├── router.js           # Home screen, bottom nav (Spelen/Theorie/Profiel), app init
│   ├── game.js             # Trivia spelmodi: Blitz, Classic, Survival, Leer, Zwaktes
│   ├── dossier.js          # Dossier modus: patiëntencasussen stap voor stap
│   ├── daily.js            # Dagelijkse uitdaging + challenge via URL
│   ├── favourites.js       # Favorieten opslaan en spelen
│   ├── learn.js            # Leer-modus met domein-selectie
│   ├── weak.js             # Train je Zwaktes modus
│   ├── onboarding.js       # Eerste keer onboarding + naam instellen
│   ├── theory.js           # Theorieboek: 12 klinische onderwerpen
│   ├── admin.js            # Admin vragenbank-overzicht (via ?admin=1)
│   └── data/
│       ├── questions.js    # 387 vragen — de QUESTIONS array
│       └── cases.js        # 18 dossier casussen — de DOSSIER_CASES array
```

---

## 3. Design System — NOOIT afwijken

| Element | Waarde |
|---------|--------|
| Achtergrond | `--cream: #F5F0E8` (warm crème, nooit wit of zwart) |
| Accent | `--pulse: #E8410A` (oranje-rood, spaarzaam) |
| Tekst | `--ink: #1A1410` |
| Succes | `--green: #1A7A4A` |
| Waarschuwing | `--amber: #D4820A` |
| Blauw | `--blue: #1B5FA8` |
| Titelfont | **Fraunces** (serif) |
| Bodyfont | **DM Sans** |
| Kaarten | wit, `border-radius: 20–24px`, subtiele schaduw |
| Max breedte | 480px gecentreerd — mobiel first |

Animaties: slide-in, fade-up. Nooit flashy of overdreven.

---

## 4. Spelmodi

| Modus | Bestand | Beschrijving |
|-------|---------|--------------|
| **Blitz** | game.js | 60 seconden, zo snel mogelijk, combo-systeem |
| **Classic** | game.js | 10 vragen, geen tijdsdruk, eindscore |
| **Survival** | game.js | 3 levens, eindigt bij 3 fouten, eindeloos |
| **Dossier** | dossier.js | Patiëntencasus: 6 aanwijzingen één voor één onthullen |
| **Leer-modus** | learn.js | Geen tijdsdruk, uitleg direct na elke vraag |
| **Train je Zwaktes** | weak.js | Herhaalt vragen die je eerder fout had |
| **Dagelijkse uitdaging** | daily.js | Vaste set per dag, deelbare score via URL |
| **Favorieten** | favourites.js | Gespeelde vragen die je gesteund hebt |

**Challenge-link** werkt via URL params: `?challenge=01234&score=300&hints=5`

---

## 5. Vragenbank — huidige staat

**Totaal: 387 vragen** (april 2026)

| Domein | Aantal | Domein | Aantal |
|--------|--------|--------|--------|
| Cardiologie | 58 | Pulmonologie | 23 |
| Neurologie | 48 | Psychiatrie | 23 |
| Infectiologie | 48 | Gastro-enterologie | 23 |
| Lab | 46 | Reumatologie | 17 |
| Farmacologie | 43 | Endocrinologie | 17 |
| Dermatologie | 13 | Reproductieve geneeskunde | 12 |

**Vraagtypes:**

| Type | Aantal | Uitleg |
|------|--------|--------|
| `diagnose` | 213 | 4 opties, kies de juiste diagnose |
| `truefalse` | 102 | Waar of niet waar |
| `diff` | 37 | Differentiaaldiagnose (subtype badge: "Differentiaal") |
| `lab` | 39 | Lab-waarden interpreteren |
| `pharma` | 33 | Farmacologie |
| `test` | 17 | Welke test kies je? (subtype badge: "Test-keuze") |
| `ecg` | 5 | ECG herkenning met inline SVG |
| `graph` | 3 | Grafiek interpreteren (bijv. spirometrie) |

**Extra veldstatus:**
- `wiki:` veld aanwezig bij **225 van 387** vragen (uitgebreide uitleg)
- `fig:` afbeelding bij **15 vragen** (inline SVG voor ECG, spirometrie, troponine)

**Domein-pills in het home screen** (router.js):
`cardio · neuro · pharma · infectio · lab · pulmo · gastro · endo · nephro · psych · derm · rheum · repro`

**Dossier casussen: 18** (cases.js, ID's c1–c18)

---

## 6. UI-componenten — globale functies

Beschikbaar overal (via ui.js):

```js
showToast(ok, head, body)   // Toast onderaan tonen (groen/rood)
hideToast()                 // Toast verbergen
showCombo(num, label)       // Combo-burst animatie
showScreen(id)              // Scherm wisselen
showHome()                  // Terug naar home
shuffleArr(array)           // Array shufflen (in-place)
gradeFromPct(pct)           // [minPct, label, kleur]
loadStats() / saveStats()   // localStorage stats
openFactModal()             // Uitlegkaartje openen
closeFactModal()            // Uitlegkaartje sluiten
openTheory(topicId)         // Theoriepagina openen
formatQ(txt)                // Lab-tekst formatteren naar tabel (met ↑/↓/✓)
```

**Lab-waarden formatter (ui.js):**
`formatQ()` detecteert of een vraag lab-data bevat via `\n`-regels. Als een
regel numerieke waarden bevat wordt het gerenderd als een verticale tabel
(`.fq-table`) met drie kolommen: naam | waarde+eenheid | ↑/↓/✓ indicator.
Abnormale waarden krijgen een rode (↑) of blauwe (↓) achtergrondtint.
`LAB_REFS` array bevat 21 referentiewaarden.

---

## 7. Theorieboek — 12 onderwerpen

Bestand: `src/theory.js` (~784 regels)

Beschikbaar via de "Theorie" tab in het home screen én via de "📖 Verdiep je"
knop na een vraag (gebaseerd op `getRelatedTheory(q)` matching).

| Topic ID | Titel |
|----------|-------|
| `dementie` | Dementiesyndromen (Alzheimer · Vasculair · Lewy · FTD · NPH) |
| `ecg` | ECG Basisinterpretatie (met inline SVG hartslag + strips) |
| `anemie` | Anemie (MCV-ladder · ijzer vs chronische ziekte) |
| `meningitis` | Meningitis & LP (bacterieel · viraal · TBC) |
| `hartfalen` | Hartfalen (HFrEF · HFpEF · BAMS vierpijler) |
| `antibiotica` | Antibiotica-klassen (mechanismen · resistentie) |
| `stolling` | Stolling & Antistolling (heparine · VKA · DOAC) |
| `diabetes` | Diabetes Mellitus (DM1 · DM2 · DKA trilogie) |
| `schildklier` | Schildklierpathologie (hypo · hyper · thyroïde storm) |
| `copd` | COPD (GOLD · exacerbatie · O₂ valkuil) |
| `longembolie` | Longembolie (Wells · CTPA · massieve LE) |
| `sepsis` | Sepsis & Septische Shock (Sepsis-3 · qSOFA · bundel) |

**Theory CSS-componenten** (toegevoegd in huidige versie):

| Klasse | Doel | Prefix |
|--------|------|--------|
| `.th-keynums` + `.th-keynum` | Rij aansprekende getallen/waarden bovenaan | — |
| `.th-redflag` | Levensgevaarlijke situaties | 🚩 |
| `.th-trap` | Vaste klinische valkuilen | ⚠️ |
| `.th-mnemonic` | Geheugensteuntjes (BAMS, 3W, DKA) | — |
| `.th-safe` | Veilige/positieve uitkomsten | ✅ |
| `.th-pearl` | Klinische parels (bestaand) | 💡 |
| `.th-steps` + `.th-step` | Genummerde stappen | — |
| `.th-table-wrap` + `.th-table` | Vergelijkingstabellen | — |
| `.th-strip-card` + `.th-strip-mini` | ECG strip-kaartjes met SVG | — |

---

## 8. Versiegeschiedenis — wat is wanneer gebouwd

### v0.1 — Eerste upload (basis prototype)
- Blitz, Classic, Survival spelmodi
- ~90 vragen verspreid over 5 domeinen (cardio, neuro, pharma, infectio, lab)
- Basis toast + uitlegkaartje
- Dossier modus met 5 casussen

### v0.2 — UX verbeteringen
- Favorieten systeem
- Dagelijkse uitdaging + deelbare URL-link
- Leer-modus (geen tijdsdruk, directe uitleg)
- Eerste onboarding flow met naam instellen

### v0.3 — Inhoud & progressie
- XP + rang progressiesysteem (Coassistent → Fellow → Professor)
- Train je Zwaktes modus (herhaalt foute vragen)
- Domeinstatistieken op profielpagina
- PWA support (manifest + service worker)
- 18 labvragen, 17 farmaco, 18 neuro, 19 infectio, 18 cardio toegevoegd

### v0.4 — Theorieboek (eerste versie)
- 5 theorie-topics: dementie, ECG, anemie, meningitis, hartfalen
- Theoriepagina-knop na elke vraag op basis van vraag-topic matching
- ECG-pagina met inline SVG hartslag-diagram

### v0.5 — Figuurvragen + Wiki
- `fig:` veld in vraagschema voor afbeeldingen (SVG inline of src-pad)
- 15 vragen met inline SVG (ECG-strips, spirometrie, troponine-curve)
- `wiki:` veld voor uitgebreide uitleg in fact-modal
- Theorieboek uitgebreid naar 10 topics

### v0.6 — 8 nieuwe domeinen (grote uitbreiding)
- Pulmonologie, Gastro-enterologie, Endocrinologie, Nefrologie,
  Psychiatrie, Dermatologie, Reumatologie, Reproductieve geneeskunde
- 20 vragen per domein = +160 vragen in één keer
- Domein-pills in het home screen uitgebreid

### v0.7 — Kwaliteitsverbetering vragenbank
- Admin vragenbank-view via `?admin=1` (tabel met alle vragen + metadata)
- 5-sterren moeilijkheidsgraad per vraag
- Subtype-badges: "Differentiaal" (diff) en "Test-keuze" (test)
- 12 test-keuze vragen toegevoegd
- DOMAIN_META in ui.js voor kleuren + iconen per domein

### v0.8 — Hero redesign + Home overhaul
- Hero sectie met streak-badge en gepersonaliseerde begroeting
- Bottom navigation: Spelen / Theorie / Profiel tabs
- Theorieboek uitgebreid naar 12 topics (COPD + Longembolie)

### v0.9 — Inhoud & kwaliteitsverbetering (meerdere sessies)
- 6 duplicaten verwijderd
- `ex:` velden verbeterd voor 11 vragen (punchline + onderscheid + actie)
- `dl:` labels opgeschoond (suffix " — Waar of Niet?" verwijderd van alle 102 truefalse vragen)
- `wiki:` velden toegevoegd aan 14 hoge-prioriteit diagnose-vragen
- 9 nieuwe vragen: reumatologie (artritis psoriatica, GCA, anti-CCP, SLE complement)
  en psychiatrie (Lewy-body dementie, NMS, lithiumtoxiciteit, suïciderisico, SSRI bipolair)
- DOMAIN_META bugfix: rheum/psych entries misten

### v1.0 — Lab-display redesign
- `formatQ()` herschreven: verticale tabel i.p.v. horizontale pills
- `.fq-table`, `.fq-row`, `.fq-high` (rood ↑), `.fq-low` (blauw ↓)
- `LAB_REFS` array met 21 referentiewaarden
- `getLabStatus()` functie voor automatisch bepalen afwijking

### v1.1 — Theorieboek overhaul (huidige versie)
- Alle 12 theorie-onderwerpen volledig herschreven
- Nieuwe CSS-componenten: `.th-keynums`, `.th-redflag`, `.th-trap`,
  `.th-mnemonic`, `.th-safe`
- Elke pagina heeft: kerngetallen-rij, rode vlaggen, valkuilen, mnemonics
- Rijkere tabellen, klinische context, onderscheidende kleurcodering

---

## 9. Openstaande backlog

### Hoge prioriteit
- **Meer vragen** — doel: 100 per domein. Kleinste domeinen: repro (12), derm (13)
- **wiki-veld** toevoegen aan resterende ~162 vragen zonder wiki
  (run: `grep -c "wiki:" src/data/questions.js` om actuele stand te zien)
- **Spoedkamer-modus** — spelmodus met spoed/urgentie-thema en timer-druk,
  visueel roder/urgenter dan Blitz

### Middellange termijn
- **GitHub Pages deploy** — app publiek beschikbaar maken
- **Gebruikersaccounts** via Supabase (auth + cloud-stats)
- **Echte leaderboard** met andere spelers

### Lange termijn
- **Live multiplayer** via Partykit of Supabase Realtime
- **iOS app** — zelfde JS-logica hergebruiken via React Native
- **Partnerships** — medische faculteiten, ziekenhuizen

---

## 10. Technische valkuilen — onthoud dit altijd

1. **`innerHTML` eerst renderen, dan DOM-queries doen.** Alle schermen worden
   dynamisch gerenderd. `document.getElementById()` pas na `innerHTML =`.

2. **Geen `import`/`export`.** Alles is globaal. Volgorde in `index.html` bepaalt
   wat beschikbaar is.

3. **`activeCats` en `currentMode`** zijn globale variabelen in `game.js`.
   Niet opnieuw declareren in andere bestanden.

4. **Service Worker cache** — na elke deploy de versie in `sw.js` ophogen
   (`medduel-v29` is de huidige). Anders zien gebruikers oude versies.

5. **Syntaxis controleren** na elke batch vragen toevoegen:
   ```bash
   node -e "eval(require('fs').readFileSync('src/data/questions.js','utf8'))" && echo OK
   ```

6. **Werken in kleine batches.** Nooit meer dan 2–3 edits per keer zonder
   tussentijds te checken en committen.

---

## 11. Workflow voor nieuwe chat

1. Lees deze BRIEFING.md
2. Lees CLAUDE.md voor project-specifieke instructies
3. Run `git log --oneline -10` om te zien wat er recent is gedaan
4. Werk altijd op branch `claude/medduel-trivia-app-0Rgj8`
5. Na elke batch: syntaxis check → SW versie ophogen → commit → push
6. Gebruik `git push -u origin claude/medduel-trivia-app-0Rgj8`

