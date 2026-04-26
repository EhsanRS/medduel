// MedDuel — Theorieboek

const THEORY_TOPICS = {

  dementie: {
    title: 'Dementiesyndromen',
    icon: '🧠',
    subtitle: 'Alzheimer · Vasculair · Lewy-body · FTD · NPH',
    body: `
      <div class="th-intro"><p>Dementie treft ~300.000 Nederlanders. De vijf hoofdvormen lijken op elkaar maar hebben elk een eigen patroon, biomarker en behandeling — en één ervan is <em>potentieel reversibel</em>.</p></div>

      <div class="th-keynums">
        <div class="th-keynum"><span class="th-keynum-val">60–70%</span><span class="th-keynum-lbl">Alzheimer van alle dementie</span></div>
        <div class="th-keynum"><span class="th-keynum-val">&lt;65j</span><span class="th-keynum-lbl">Typisch begin FTD</span></div>
        <div class="th-keynum"><span class="th-keynum-val">1</span><span class="th-keynum-lbl">Reversibele vorm (NPH)</span></div>
      </div>

      <div class="th-section-title">Vergelijking hoofdvormen</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th></th><th>Alzheimer</th><th>Vasculair</th><th>Lewy-body</th><th>FTD</th><th>NPH</th></tr></thead>
        <tbody>
          <tr><td>Begin</td><td>Sluipend</td><td>Plotseling / trapsgewijs</td><td>Sluipend</td><td>Sluipend</td><td>Sluipend</td></tr>
          <tr><td>Eerste klacht</td><td>Geheugen</td><td>Afh. locatie infarct</td><td>Hallucinaties · parkinsonisme</td><td>Gedrag / taal</td><td>Loopstoornis</td></tr>
          <tr><td>MRI / biomarker</td><td>Temp-par. atrofie · amyloïd-PET</td><td>WS-laesies · lacunaire infarcten</td><td>DaTscan ↓ · weinig atrofie</td><td>Frontale atrofie</td><td>Grote ventrikels · brede sulci</td></tr>
          <tr><td>Behandeling</td><td>Donepezil / rivastigmine</td><td>Vasculaire RF behandelen</td><td>Rivastigmine (niet haloperidol!)</td><td>Symptomatisch</td><td>LP-drainage / shunt</td></tr>
        </tbody>
      </table></div>

      <div class="th-section-title">NPH — onthoud de 3 W's</div>
      <div class="th-mnemonic">
        <span class="th-mnemonic-label">Mnemonisch — Wet · Wobbly · Wacky</span>
        <div class="th-mnemonic-row"><b>W</b>et — urine-incontinentie (kan niet ophouden)</div>
        <div class="th-mnemonic-row"><b>W</b>obbly — loopstoornis (breed-gebaseerd, magnetisch looppatroon)</div>
        <div class="th-mnemonic-row"><b>W</b>acky — cognitieve stoornissen (relatief mild)</div>
      </div>

      <div class="th-redflag"><strong>Lewy-body + antipsychotica = levensgevaarlijk.</strong> Klassieke antipsychotica (haloperidol) veroorzaken ernstig rigiditeits-syndroom bij LBD — soms fataal. Altijd documenteren in het dossier!</div>
      <div class="th-safe"><strong>NPH is de enige behandelbare dementie.</strong> LP-test: aspireer 30–50 ml liquor → loopverbetering binnen uren = positief → shunt-kandidaat.</div>
      <div class="th-pearl"><strong>FTD vs Alzheimer:</strong> FTD begint vaker onder de 65 jaar met gedragsverandering of taalstoornis <em>vóór</em> geheugenproblemen. Familiegeschiedenis bij 30–40%.</div>
    `
  },

  ecg: {
    title: 'ECG Basisinterpretatie',
    icon: '📊',
    subtitle: 'PQRST · Intervallen · ST-patronen · Aritmieën',
    body: `
      <div class="th-intro"><p>Elk ECG is een tijdlijn van elektrische prikkels. Begrijp de fysiologie achter de golven — dan hoef je niets te stampen, je <em>leest</em> het verhaal van het hart.</p></div>

      <div class="th-keynums">
        <div class="th-keynum"><span class="th-keynum-val">300÷n</span><span class="th-keynum-lbl">Frequentie (n = R-R hokjes)</span></div>
        <div class="th-keynum"><span class="th-keynum-val">120–200</span><span class="th-keynum-lbl">Normaal PR (ms)</span></div>
        <div class="th-keynum"><span class="th-keynum-val">&lt;120</span><span class="th-keynum-lbl">Normaal QRS (ms)</span></div>
        <div class="th-keynum"><span class="th-keynum-val">&gt;500</span><span class="th-keynum-lbl">QTc ms = torsade-risico</span></div>
      </div>

      <div class="th-section-title">Het hart als elektrisch circuit</div>
      <div class="th-conduction">SA-knoop → <strong>P-golf</strong> (atria) → AV-knoop (vertraging) → <strong>PR-interval</strong> → His + bundeltakken → <strong>QRS</strong> (ventrikels) → ST-segment (plateau) → <strong>T-golf</strong> (herstel)</div>
      <p class="th-body-text">De <strong>AV-knoop vertraging</strong> is opzettelijk: die 120–200 ms geeft de atria tijd om de ventrikels vol te pompen vóórdat die samentrekken. Verdwijnt die vertraging (korte PR) → risico op re-entry aritmieën. Wordt die te lang (lang PR) → AV-blok.</p>

      <div class="th-section-title">Eén heartbeat — annotated</div>
      <div class="th-figure">
        <svg viewBox="0 0 340 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px">
          <!-- Grid -->
          <line x1="0" y1="82" x2="340" y2="82" stroke="#e0d8cc" stroke-width="1"/>
          <!-- Physiological labels (top) -->
          <text x="42" y="12" font-size="8.5" fill="#aaa" text-anchor="middle" font-family="DM Sans,sans-serif">Atriale</text>
          <text x="42" y="21" font-size="8.5" fill="#aaa" text-anchor="middle" font-family="DM Sans,sans-serif">depolarisatie</text>
          <text x="110" y="12" font-size="8.5" fill="#aaa" text-anchor="middle" font-family="DM Sans,sans-serif">Ventriculaire</text>
          <text x="110" y="21" font-size="8.5" fill="#aaa" text-anchor="middle" font-family="DM Sans,sans-serif">depolarisatie</text>
          <text x="210" y="12" font-size="8.5" fill="#aaa" text-anchor="middle" font-family="DM Sans,sans-serif">Ventriculaire</text>
          <text x="210" y="21" font-size="8.5" fill="#aaa" text-anchor="middle" font-family="DM Sans,sans-serif">repolarisatie</text>
          <!-- Connector lines to waves -->
          <line x1="42" y1="23" x2="42" y2="56" stroke="#ddd" stroke-width="0.8" stroke-dasharray="2,2"/>
          <line x1="110" y1="23" x2="110" y2="28" stroke="#ddd" stroke-width="0.8" stroke-dasharray="2,2"/>
          <line x1="210" y1="23" x2="210" y2="54" stroke="#ddd" stroke-width="0.8" stroke-dasharray="2,2"/>
          <!-- ECG trace -->
          <polyline points="10,82 28,82 34,72 42,66 50,82 64,82 70,86 78,20 90,88 100,82 118,82 128,70 142,52 156,70 170,82 310,82"
            stroke="#E8410A" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Wave labels -->
          <text x="42" y="60" font-size="13" font-weight="bold" fill="#555" text-anchor="middle">P</text>
          <text x="70" y="102" font-size="12" font-weight="bold" fill="#777" text-anchor="middle">Q</text>
          <text x="78" y="15" font-size="13" font-weight="bold" fill="#E8410A" text-anchor="middle">R</text>
          <text x="90" y="105" font-size="12" font-weight="bold" fill="#777" text-anchor="middle">S</text>
          <text x="142" y="46" font-size="13" font-weight="bold" fill="#555" text-anchor="middle">T</text>
          <!-- Interval brackets -->
          <line x1="28" y1="95" x2="100" y2="95" stroke="#b0b8c4" stroke-width="1"/>
          <line x1="28" y1="92" x2="28" y2="98" stroke="#b0b8c4" stroke-width="1"/>
          <line x1="100" y1="92" x2="100" y2="98" stroke="#b0b8c4" stroke-width="1"/>
          <text x="64" y="104" font-size="8" fill="#888" text-anchor="middle" font-family="DM Sans,sans-serif">PR 120–200ms</text>
          <line x1="64" y1="110" x2="170" y2="110" stroke="#b0b8c4" stroke-width="1"/>
          <line x1="64" y1="107" x2="64" y2="113" stroke="#b0b8c4" stroke-width="1"/>
          <line x1="170" y1="107" x2="170" y2="113" stroke="#b0b8c4" stroke-width="1"/>
          <text x="117" y="120" font-size="8" fill="#888" text-anchor="middle" font-family="DM Sans,sans-serif">QTc &lt;440ms</text>
          <!-- ST segment label -->
          <text x="110" y="78" font-size="8" fill="#aaa" text-anchor="middle" font-family="DM Sans,sans-serif">ST (isoelectrisch)</text>
        </svg>
        <div class="th-figure-caption">PQRST — één hartslag van SA-knoop tot herstel</div>
      </div>

      <div class="th-section-title">Golf voor golf</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Golf/interval</th><th>Fysiologie</th><th>Normaal</th><th>Afwijkend → denk aan</th></tr></thead>
        <tbody>
          <tr><td><strong>P</strong></td><td>Atriale depolarisatie (SA→AV)</td><td>Positief in II, smal</td><td>Geen P = AF; breed genotcheerd = linker atriumhypertrofie</td></tr>
          <tr><td><strong>PR</strong></td><td>AV-knoopgeleiding</td><td>120–200 ms</td><td>&gt;200 = AV-blok; &lt;120 = WPW (delta-golf!)</td></tr>
          <tr><td><strong>QRS</strong></td><td>Ventriculaire depolarisatie</td><td>&lt;120 ms</td><td>&gt;120 = bundeltakblok; breed + snel = VT</td></tr>
          <tr><td><strong>ST</strong></td><td>Plateau (isoelectrisch hoort)</td><td>Op de basislijn</td><td>↑ = STEMI of pericarditis; ↓ = NSTEMI/ischemie</td></tr>
          <tr><td><strong>T</strong></td><td>Ventriculaire repolarisatie</td><td>Positief, asymmetrisch</td><td>Spits/smal = hyperkaliëmie; inversie = ischemie of LVH</td></tr>
          <tr><td><strong>QTc</strong></td><td>Totale ventriculaire activiteit</td><td>&lt;440 ms (M) / &lt;460 ms (V)</td><td>&gt;500 ms = torsade de pointes risico!</td></tr>
        </tbody>
      </table></div>

      <div class="th-section-title">Frequentie & as in 10 seconden</div>
      <div class="th-pearl"><strong>Frequentie:</strong> tel het aantal grote hokjes (5mm) tussen twee R-toppen → 300 ÷ dat getal. Voorbeeldtabel: 1 hokje = 300/min · 2 = 150 · 3 = 100 · 4 = 75 · 5 = 60 · 6 = 50/min.</div>
      <div class="th-pearl"><strong>As:</strong> positief QRS in I én aVF = normale as. Negatief in I = rechts-as. Negatief in aVF = links-as. Klinisch relevant bij longembolie (rechts-as), LVH (links-as).</div>

      <div class="th-section-title">Leesalgoritme — 5 stappen</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Kalibratie</strong> — standaard 25mm/s, 10mm/mV? Zo niet: alles klopt niet.</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Ritme</strong> — regelmatig of niet? P-top vóór elk QRS? Zelfde P-morfologie?</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>Frequentie + as</strong> — 300 ÷ R-R hokjes. As via I en aVF.</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>Intervallen</strong> — PR (AV-blok?), QRS breed (BBB/VT?), QTc verlengd?</div></div>
        <div class="th-step"><span class="th-step-num">5</span><div><strong>ST-T</strong> — elevatie (welke leads?), depressie, T-inversie, piekende T?</div></div>
      </div>

      <div class="th-section-title">ST-patronen herkennen</div>

      <div class="th-strip-card">
        <div class="th-strip-mini">
          <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="35" x2="200" y2="35" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/>
            <polyline points="5,35 16,35 19,29 23,35 27,35 29,37 31,7 34,43 37,20 54,20 61,13 70,20 77,35 200,35"
              stroke="#E8410A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="37" y1="22" x2="54" y2="22" stroke="rgba(232,65,10,0.35)" stroke-width="1" stroke-dasharray="2,2"/>
            <text x="45" y="15" font-size="8" fill="#E8410A" font-family="DM Sans,sans-serif" font-weight="700">ST↑</text>
          </svg>
        </div>
        <div class="th-strip-info">
          <strong>ST-elevatie (STEMI)</strong>
          <p>Convex (bolrond) ST boven de basislijn, gelokaliseerd (bijv. II/III/aVF = inferieur). Reciproke depressie in tegenoverliggende leads. <span class="th-strip-action">Directe PCI &lt;90 min</span></p>
        </div>
      </div>

      <div class="th-strip-card">
        <div class="th-strip-mini">
          <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="35" x2="200" y2="35" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/>
            <polyline points="5,35 16,35 19,29 23,35 27,35 29,37 31,7 34,43 37,42 54,46 62,44 70,39 76,35 200,35"
              stroke="#E8410A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="52" y="33" font-size="8" fill="#E8410A" font-family="DM Sans,sans-serif" font-weight="700">ST↓</text>
          </svg>
        </div>
        <div class="th-strip-info">
          <strong>ST-depressie (NSTEMI / ischemie)</strong>
          <p>Dalende ST onder de basislijn, eventueel met T-inversie. Troponine bepalen en herhalen na 3 uur. <span class="th-strip-action">Troponine × 2 + cardiologie</span></p>
        </div>
      </div>

      <div class="th-strip-card">
        <div class="th-strip-mini">
          <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="35" x2="200" y2="35" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/>
            <polyline points="5,35 12,35 14,32 18,34 20,35 22,37 24,7 27,43 30,24 38,28 46,24 56,16 64,22 70,35 200,35"
              stroke="#E8410A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="46" y="12" font-size="8" fill="#888" font-family="DM Sans,sans-serif">zadelvorm</text>
          </svg>
        </div>
        <div class="th-strip-info">
          <strong>Saddle-shape ST (pericarditis)</strong>
          <p>Concaaf (zadelvormig) ST omhoog in <em>alle</em> afleidingen + PR-depressie. Na virale infectie. Geen reciproke afwijkingen. <span class="th-strip-safe">NSAID + colchicine</span></p>
        </div>
      </div>

      <div class="th-strip-card">
        <div class="th-strip-mini">
          <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="35" x2="200" y2="35" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/>
            <polyline points="5,35 16,35 19,29 23,35 27,35 29,37 31,7 34,43 37,35 48,35 52,10 56,35 110,35 113,29 117,35 121,35 123,37 125,7 128,43 131,35 142,35 146,10 150,35 200,35"
              stroke="#E8410A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="52" y="6" font-size="8" fill="#888" font-family="DM Sans,sans-serif">spitse T</text>
          </svg>
        </div>
        <div class="th-strip-info">
          <strong>Piekende T-golven (hyperkaliëmie)</strong>
          <p>Hoge, smalle, symmetrische T-toppen — "tentvorming". Bij K⁺ &gt;6,0 ook breed QRS. <span class="th-strip-action">Calcium gluconaat IV direct</span></p>
        </div>
      </div>

      <div class="th-section-title">Aritmieën herkennen</div>

      <div class="th-strip-card">
        <div class="th-strip-mini">
          <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="32" x2="200" y2="32" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/>
            <polyline points="5,32 8,29 12,35 16,30 20,34 24,29 28,32 30,4 33,46 36,32 40,29 44,35 48,30 52,34 56,29 60,33 64,30 68,34 70,4 73,46 76,32 80,29 84,35 88,30 90,32 91,4 94,46 97,32 101,30 105,35 109,29 113,33 117,30 121,34 125,30 129,4 132,46 135,32 139,29 143,35 147,30 151,34 155,29 159,33 163,30 165,4 168,46 171,32 175,30 179,34 183,29 187,33 191,30 195,32 197,4 200,32"
              stroke="#E8410A" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="th-strip-info">
          <strong>Atriumfibrilleren (AF)</strong>
          <p>Geen P-toppen, volledig onregelmatig QRS-ritme, chaotische fibrillatiebasisline. Risico: trombus → embolie. <span class="th-strip-action">Anticoagulatie + frequentiecontrole</span></p>
        </div>
      </div>

      <div class="th-strip-card">
        <div class="th-strip-mini">
          <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="32" x2="200" y2="32" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/>
            <polyline points="5,32 10,22 15,36 20,22 25,36 30,22 35,32 37,34 39,5 42,46 45,32 50,22 55,36 60,22 65,36 70,22 75,36 80,22 85,32 87,34 89,5 92,46 95,32 100,22 105,36 110,22 115,36 120,22 125,36 130,22 135,32 137,34 139,5 142,46 145,32 150,22 155,36 160,22 165,36 170,22 175,36 180,22 185,32 187,34 189,5 192,46 195,32 200,32"
              stroke="#E8410A" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="th-strip-info">
          <strong>Atriumflutter (2:1 blok)</strong>
          <p>Zaagvormige F-golven ~300/min, QRS <em>regulier</em> ~150/min (elke 2e F-golf geleid). Geen echte P-toppen. <span class="th-strip-safe">Frequentiecontrole of cardioversie</span></p>
        </div>
      </div>

      <div class="th-strip-card">
        <div class="th-strip-mini">
          <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="32" x2="200" y2="32" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/>
            <polyline points="5,32 12,32 14,26 16,32 24,32 26,28 28,5 31,44 34,32 40,32 44,26 46,32 58,32 60,26 62,5 65,44 68,32 74,32 78,26 80,32 98,32 100,26 102,5 105,44 108,32 114,32 200,32"
              stroke="#E8410A" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="14" y="48" font-size="7" fill="#888" font-family="DM Sans,sans-serif">PR kort</text>
            <text x="44" y="48" font-size="7" fill="#888" font-family="DM Sans,sans-serif">PR langer</text>
            <text x="78" y="48" font-size="7" fill="#888" font-family="DM Sans,sans-serif">PR lang</text>
            <text x="100" y="20" font-size="7" fill="#E8410A" font-family="DM Sans,sans-serif">P geen QRS</text>
          </svg>
        </div>
        <div class="th-strip-info">
          <strong>Wenckebach (Mobitz I)</strong>
          <p>PR steeds langer → één QRS uitvalt → reset. Benigne, vaak bij inferieur MI of hoge vagustonus. <span class="th-strip-safe">Observeer · behandel oorzaak</span></p>
        </div>
      </div>

      <div class="th-strip-card">
        <div class="th-strip-mini">
          <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="32" x2="200" y2="32" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/>
            <!-- P waves (blue) regular fast -->
            <polyline points="8,32 10,26 12,32 45,32 47,26 49,32 82,32 84,26 86,32 119,32 121,26 123,32 156,32 158,26 160,32 193,32 195,26 197,32"
              stroke="#4a8fd4" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- QRS (red) regular slow -->
            <polyline points="5,32 28,32 30,34 32,5 35,46 38,32 88,32 90,34 92,5 95,46 98,32 168,32 170,34 172,5 175,46 178,32 200,32"
              stroke="#E8410A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="5" y="10" font-size="7" fill="#4a8fd4" font-family="DM Sans,sans-serif">P (75/min)</text>
            <text x="5" y="48" font-size="7" fill="#E8410A" font-family="DM Sans,sans-serif">QRS (35/min)</text>
          </svg>
        </div>
        <div class="th-strip-info">
          <strong>Totaal AV-blok (3e graads)</strong>
          <p>P-toppen en QRS volledig ontkoppeld. Eigen ventrikelritme ~35/min. Presyncope of syncope. <span class="th-strip-action">Urgente pacemaker</span></p>
        </div>
      </div>

      <div class="th-redflag"><strong>Brede QRS + snel ritme = VT tot tegendeel bewezen.</strong> Regulier + breed + snel = ventriculaire tachycardie bij hemodynamisch instabiele patiënt. Nooit adenosine bij brede tachycardie zonder zekere P-toppen!</div>
      <div class="th-trap"><strong>WPW + AF = gevaarlijk.</strong> Bij AF met accessoire baan kan het ventrikelritme extreem snel worden → VF. Geen AV-blokkers (adenosine, verapamil). Kies procaïnamide of elektrocardioversie.</div>
    `
  },

  anemie: {
    title: 'Anemie',
    icon: '🩸',
    subtitle: 'Microcytair · Normocytair · Macrocytair',
    body: `
      <div class="th-intro"><p>Anemie is geen diagnose maar een symptoom. Eerste stap is altijd het MCV — daarna reticulocyten en ijzerstatus. De oorzaak bepaalt de behandeling.</p></div>

      <div class="th-keynums">
        <div class="th-keynum"><span class="th-keynum-val">&lt;80</span><span class="th-keynum-lbl">MCV = microcytair</span></div>
        <div class="th-keynum"><span class="th-keynum-val">80–100</span><span class="th-keynum-lbl">MCV = normocytair</span></div>
        <div class="th-keynum"><span class="th-keynum-val">&gt;100</span><span class="th-keynum-lbl">MCV = macrocytair</span></div>
        <div class="th-keynum"><span class="th-keynum-val">&lt;16%</span><span class="th-keynum-lbl">Transferrine-sat = ijzertekort</span></div>
      </div>

      <div class="th-section-title">Systematisch overzicht</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Type</th><th>MCV</th><th>Ferritine</th><th>Retics</th><th>Kenmerk</th></tr></thead>
        <tbody>
          <tr><td>IJzergebrek</td><td><span class="dn">↓</span></td><td><span class="dn">↓↓</span></td><td><span class="dn">↓</span></td><td>Menstruatie, GI-bloeding, coeliakie · pallor + koilonychie</td></tr>
          <tr><td>Chronische ziekte</td><td>N/<span class="dn">↓</span></td><td>N/<span class="up">↑</span></td><td><span class="dn">↓</span></td><td>Ontsteking, maligniteit; hepcidine verhindert ijzermobilisatie</td></tr>
          <tr><td>Thalassemie minor</td><td><span class="dn">↓↓</span></td><td>N</td><td><span class="up">↑</span></td><td>Hb-elektroforese afwijkend · micro maar nauwelijks anemisch</td></tr>
          <tr><td>Megaloblastair</td><td><span class="up">↑↑</span></td><td>N</td><td><span class="dn">↓</span></td><td>Hypersegmenteerden · B12-gebrek ook neurotoxisch</td></tr>
          <tr><td>Hemolytisch</td><td>N/<span class="up">↑</span></td><td><span class="up">↑</span></td><td><span class="up">↑↑</span></td><td>LDH↑ · haptoglobine↓ · indirect bili↑ · schistocyten bij MAHA</td></tr>
        </tbody>
      </table></div>

      <div class="th-section-title">IJzergebrek vs Chronische ziekte — hoe onderscheid je ze?</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th></th><th>IJzergebrek</th><th>Chronische ziekte</th></tr></thead>
        <tbody>
          <tr><td>Ferritine</td><td><span class="dn">↓ (&lt;12 µg/L)</span></td><td>N of <span class="up">↑</span></td></tr>
          <tr><td>Transferrinesaturatie</td><td><span class="dn">&lt;16%</span></td><td><span class="dn">&lt;20%</span></td></tr>
          <tr><td>TIBC</td><td><span class="up">↑</span></td><td>N / <span class="dn">↓</span></td></tr>
          <tr><td>Behandeling</td><td>Oorzaak vinden + ijzersuppletie</td><td>Onderliggende ziekte behandelen</td></tr>
        </tbody>
      </table></div>

      <div class="th-redflag"><strong>Schistocyten + trombocytopenie = TTP of HUS.</strong> Bij TTP: ADAMTS13 &lt;10%. Plasmaferese DIRECT — mortaliteit zonder behandeling &gt;90%.</div>
      <div class="th-trap"><strong>Ferritine is een acuut-fase-eiwit.</strong> Bij infectie stijgt ferritine ook bij een lege ijzerdepot. Kijk altijd naar transferrinesaturatie (&lt;16% = ijzergebrek, zelfs bij hoog ferritine).</div>
      <div class="th-trap"><strong>Nooit alleen folaat geven bij B12-deficiëntie.</strong> Folaat normaliseert het bloedbeeld maar de neurologische schade verslechtert onzichtbaar door. Altijd B12 meten vóór folaat starten.</div>
      <div class="th-pearl"><strong>Reticulocyten</strong> zijn de sleuteltest voor beenmergrespons. Hoog = actief aanmaken (hemolysis/bloeding). Laag = beenmergfalen of grondstoftekort (ijzer, B12).</div>
    `
  },

  meningitis: {
    title: 'Meningitis & LP',
    icon: '🔬',
    subtitle: 'Bacterieel · Viraal · TBC · LP-interpretatie',
    body: `
      <div class="th-intro"><p>Bacteriële meningitis is een medische spoedsituatie. Mortaliteit 15–25% zelfs mét behandeling. Elk uur vertraging in antibiotica verslechtert de prognose. LP bevestigt de diagnose — maar mag AB nooit vertragen.</p></div>

      <div class="th-keynums">
        <div class="th-keynum"><span class="th-keynum-val">15–25%</span><span class="th-keynum-lbl">Mortaliteit bacterieel</span></div>
        <div class="th-keynum"><span class="th-keynum-val">&lt;30 min</span><span class="th-keynum-lbl">Antibiotica na diagnose</span></div>
        <div class="th-keynum"><span class="th-keynum-val">~50%</span><span class="th-keynum-lbl">Kernig positief (laag!)</span></div>
      </div>

      <div class="th-section-title">LP-uitslag vergelijking</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th></th><th>Bacterieel</th><th>Viraal</th><th>TBC</th></tr></thead>
        <tbody>
          <tr><td>Uiterlijk</td><td>Troebel / purulent</td><td>Helder</td><td>Helder / opalescent</td></tr>
          <tr><td>Leukocyten</td><td><span class="up">↑↑↑</span> PMN (&gt;1000)</td><td><span class="up">↑</span> lymfocyten (&lt;500)</td><td><span class="up">↑↑</span> lymfocyten</td></tr>
          <tr><td>Glucose (liquor/serum)</td><td><span class="dn">↓↓ &lt;0,5 ratio</span></td><td>Normaal (&gt;0,6)</td><td><span class="dn">↓ (0,3–0,5)</span></td></tr>
          <tr><td>Eiwit</td><td><span class="up">↑↑↑ &gt;1 g/L</span></td><td>Licht <span class="up">↑</span></td><td><span class="up">↑↑</span></td></tr>
          <tr><td>Gram-kleuring</td><td>Positief in 60–80%</td><td>Negatief</td><td>Ziehl-Neelsen voor BK</td></tr>
        </tbody>
      </table></div>

      <div class="th-section-title">Management — volgorde is alles</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Bloedkweken × 2</strong> — max 2–3 minuten. Daarna direct verder.</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Dexamethason IV</strong> — gelijktijdig of vóór antibiotica. Vermindert gehoorschade en hersenoedeem.</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>Ceftriaxon 2g IV</strong> — bij &gt;50j + amoxicilline 2g IV (Listeria!). Nooit vertragen.</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>CT indien nodig</strong> — alleen bij focale uitval, papiloedeem of bewustzijnsdaling. CT mag AB NOOIT vertragen.</div></div>
        <div class="th-step"><span class="th-step-num">5</span><div><strong>LP</strong> — na CT of als CT niet nodig is. Bevestigt diagnose én verwekker.</div></div>
        <div class="th-step"><span class="th-step-num">6</span><div><strong>Isolatie</strong> — eerste 24u. Rifampicine-profylaxe huisgenoten bij meningokokken.</div></div>
      </div>

      <div class="th-redflag"><strong>Petechiae/purpura + meningisme = meningokokkensepsis.</strong> Geef antibiotica direct — ook voor CT of LP. Elke minuut telt bij purpura fulminans. Dit is de enige situatie waarbij je AB geeft zonder kweek.</div>
      <div class="th-trap"><strong>CT mag AB NIET vertragen.</strong> Geef antibiotica alvast als CT meer dan 20 minuten duurt. Onbehandelde meningitis vordert snel naar hersenabces en overlijden.</div>
      <div class="th-pearl"><strong>Kernig/Brudzinski</strong> hebben slechte sensitiviteit (~50%). Een negatief teken sluit meningitis NIET uit bij klinisch vermoeden.</div>
    `
  },

  hartfalen: {
    title: 'Hartfalen',
    icon: '❤️',
    subtitle: 'HFrEF · HFpEF · Vierpijlertherapie',
    body: `
      <div class="th-intro"><p>Hartfalen treft 1–2% van de volwassen bevolking en heeft een 5-jaarsmortaliteit van ~50% — vergelijkbaar met veel kankers. Vroeg herkennen en het vierpijler-regime instellen spaart jaren.</p></div>

      <div class="th-keynums">
        <div class="th-keynum"><span class="th-keynum-val">1–2%</span><span class="th-keynum-lbl">Prevalentie volwassenen</span></div>
        <div class="th-keynum"><span class="th-keynum-val">~50%</span><span class="th-keynum-lbl">5-jaarsmortaliteit HFrEF</span></div>
        <div class="th-keynum"><span class="th-keynum-val">&lt;40%</span><span class="th-keynum-lbl">EF bij HFrEF</span></div>
        <div class="th-keynum"><span class="th-keynum-val">4</span><span class="th-keynum-lbl">Pijlers bewezen therapie</span></div>
      </div>

      <div class="th-section-title">HFrEF vs HFpEF</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th></th><th>HFrEF (EF &lt;40%)</th><th>HFpEF (EF ≥50%)</th></tr></thead>
        <tbody>
          <tr><td>Mechanisme</td><td>Systolische dysfunctie (zwak hart)</td><td>Diastolische dysfunctie (stijf hart)</td></tr>
          <tr><td>Oorzaak</td><td>MI, dilaterende cardiomyopathie, alcohol</td><td>Hypertensie, DM, obesitas, ouderdom</td></tr>
          <tr><td>Echo</td><td>Verwijd, hypokinetisch LV</td><td>Normaal of klein LV, dikke wand</td></tr>
          <tr><td>NT-proBNP</td><td><span class="up">↑↑</span></td><td><span class="up">↑</span> (minder sterk)</td></tr>
          <tr><td>Bewezen therapie</td><td>BAMS vierpijler</td><td>SGLT2i; diuretica symptomatisch</td></tr>
        </tbody>
      </table></div>

      <div class="th-section-title">Vierpijlertherapie HFrEF — onthoud BAMS</div>
      <div class="th-mnemonic">
        <span class="th-mnemonic-label">Mnemonisch — BAMS</span>
        <div class="th-mnemonic-row"><b>B</b>èta-blokker (bisoprolol, carvedilol) — mortaliteit −34%</div>
        <div class="th-mnemonic-row"><b>A</b>CE-remmer of ARNI (sacubitril/valsartan) — mortaliteit −25%</div>
        <div class="th-mnemonic-row"><b>M</b>RA (spironolacton / eplerenon) — anti-fibrotisch + diuretisch</div>
        <div class="th-mnemonic-row"><b>S</b>GLT2-remmer (dapagliflozine) — cardio- en nefroprotectief</div>
      </div>

      <div class="th-section-title">Acuut hartfalen — aanpak</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Zuurstof / NIV</strong> — bij SpO₂ &lt;90% of ernstige dyspneu; CPAP verlaagt preload en ademarbeid</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Furosemide IV</strong> — 40 mg IV (of dubbel de thuisdosis); doelstelling &gt;200 ml/uur</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>Nitraten</strong> — bij hoge BP voor afterload-reductie (contra-indicatie: RV-falen!)</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>Oorzaak zoeken</strong> — ACS? Aritmie? Infectie? Medicatiecompliantie? Zoutgebruik?</div></div>
      </div>

      <div class="th-redflag"><strong>RV-infarct valkuil: GEEN nitraten of diuretica.</strong> Hypotensie + hoge CVD + heldere longen = RV-infarct (inferieur MI). Behandel met voluumbelasting — diuretica verlagen de preload en doden de patiënt.</div>
      <div class="th-trap"><strong>β-blokker stoppen bij acuut hartfalen?</strong> Alleen bij cardiogene shock. Bij gecompenseerd acuut hartfalen: continueer of halveer dosis. Stoppen verhoogt aritmierisico en mortaliteit.</div>
      <div class="th-pearl"><strong>NT-proBNP:</strong> &gt;300 pg/ml bij acuut hartfalen sterk suggestief; &lt;125 pg/ml vrijwel uitgesloten. Verhoogd ook bij PE, nierfalen, AF — altijd in context interpreteren.</div>
    `
  },

  antibiotica: {
    title: 'Antibiotica-klassen',
    icon: '💊',
    subtitle: 'Werkingsmechanisme · Spectrum · Resistentie',
    body: `
      <div class="th-intro"><p>Elk antibioticum heeft een eigen mechanisme en spectrum. Kennis hiervan voorkomt fout gebruik en resistentie. Kies altijd zo smal mogelijk na identificatie van de verwekker.</p></div>

      <div class="th-keynums">
        <div class="th-keynum"><span class="th-keynum-val">&gt;70%</span><span class="th-keynum-lbl">AB-gebruik is vermijdbaar</span></div>
        <div class="th-keynum"><span class="th-keynum-val">ESBL</span><span class="th-keynum-lbl">Snelst stijgende resistentie NL</span></div>
        <div class="th-keynum"><span class="th-keynum-val">48–72u</span><span class="th-keynum-lbl">De-escaleer na kweekuitslag</span></div>
      </div>

      <div class="th-section-title">Overzicht per klasse</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Klasse</th><th>Mechanisme</th><th>Spectrum</th><th>Voorbeelden</th></tr></thead>
        <tbody>
          <tr><td>Bètalactams</td><td>Remt celwandsynthese (PBP)</td><td>Breed (gram+ en gram−)</td><td>Amoxicilline, piperacilline, cefuroxim, meropenem</td></tr>
          <tr><td>Glycopeptiden</td><td>Remt celwand (ander ankerpunt)</td><td>Gram+ alleen</td><td>Vancomycine, teicoplanine</td></tr>
          <tr><td>Fluorochinolonen</td><td>Remt DNA-gyrase / topoisomerase IV</td><td>Breed, incl. atypisch</td><td>Ciprofloxacine, levofloxacine</td></tr>
          <tr><td>Macroliden</td><td>Remt ribosoom (50S)</td><td>Gram+, atypisch</td><td>Azithromycine, claritromycine</td></tr>
          <tr><td>Tetracyclines</td><td>Remt ribosoom (30S)</td><td>Breed, incl. atypisch</td><td>Doxycycline, minocycline</td></tr>
          <tr><td>Aminoglycosiden</td><td>Remt ribosoom (30S), bactericide</td><td>Gram− (aerobe)</td><td>Gentamicine, tobramycine</td></tr>
          <tr><td>Nitroimidazolen</td><td>DNA-schade (anaeroben)</td><td>Anaeroben, protozoa</td><td>Metronidazol, tinidazol</td></tr>
        </tbody>
      </table></div>

      <div class="th-section-title">Resistentiemechanismen</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Mechanisme</th><th>Voorbeeld</th><th>Klinisch gevolg</th></tr></thead>
        <tbody>
          <tr><td>Enzym-inactivatie</td><td>Bètalactamase → amox-resistentie · ESBL = breed resistent</td><td>Voeg clavulaanzuur toe of gebruik carbapenem</td></tr>
          <tr><td>Target-mutatie</td><td>PBP2a (mecA-gen) → MRSA vs alle bètalactams</td><td>Vancomycine of linezolid verplicht</td></tr>
          <tr><td>Effluxpomp</td><td>Chinolonen, tetracyclines uit cel gepompt</td><td>Dosisverhoging helpt niet</td></tr>
          <tr><td>Verminderde opname</td><td>Veranderde porines bij Pseudomonas</td><td>Piperacilline of carbapenem nodig</td></tr>
        </tbody>
      </table></div>

      <div class="th-redflag"><strong>MRSA: resistent tegen ALLE bètalactams.</strong> Keuze: vancomycine of linezolid. Contactisolatie verplicht. Screen bij opname risicogroepen (IC-patiënten, ziekenhuiscontacten uit buitenland).</div>
      <div class="th-trap"><strong>Amoxicilline bij EBV-mononucleosis = klassieke fout.</strong> Geeft exantheem bij ~90% van de patiënten. Test altijd monospot/EBV-antilichamen bij keelontsteking met lymfadenopathie bij jongeren.</div>
      <div class="th-pearl"><strong>Aminoglycosiden once-daily:</strong> hoge piekconcentratie = maximaal bactericide effect én minder nefrotoxiciteit. Tubuluscellen recupereren tussen doses. Monitor trough-spiegel voor toxiciteit.</div>
      <div class="th-pearl"><strong>Rifampicine</strong> is een krachtige CYP3A4-inductor → verlaagt effectiviteit anticonceptiepil, warfarine en vele andere middelen. Altijd medicatiecheck!</div>
    `
  },

  stolling: {
    title: 'Stolling & Antistolling',
    icon: '🩹',
    subtitle: 'Cascade · Heparine · VKA · DOAC',
    body: `
      <div class="th-intro"><p>De bloedstolling verloopt via twee routes die samenkomen bij factor X. Elk antistollingsmiddel grijpt op een ander punt in. Keuze hangt af van indicatie, nierfunctie en urgentie.</p></div>

      <div class="th-keynums">
        <div class="th-keynum"><span class="th-keynum-val">INR 2–3</span><span class="th-keynum-lbl">Therapeutisch doel VKA</span></div>
        <div class="th-keynum"><span class="th-keynum-val">dag 5–10</span><span class="th-keynum-lbl">HIT-venster (gevaarlijk!)</span></div>
        <div class="th-keynum"><span class="th-keynum-val">eGFR&lt;30</span><span class="th-keynum-lbl">Dabigatran gecontra-indiceerd</span></div>
      </div>

      <div class="th-section-title">Antistolling vergelijking</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th></th><th>Heparine (UFH/LMWH)</th><th>VKA (warfarine)</th><th>DOAC</th></tr></thead>
        <tbody>
          <tr><td>Werkingsmechanisme</td><td>Versterkt antitrombine III → remt IIa + Xa</td><td>Remt vit. K-cyclus → ↓ II, VII, IX, X</td><td>Directe remming Xa (rivaroxaban) of IIa (dabigatran)</td></tr>
          <tr><td>Onset</td><td>Direct (IV) / 1–2u (SC)</td><td>3–5 dagen</td><td>1–3 uur</td></tr>
          <tr><td>Monitoring</td><td>APTT (UFH) / anti-Xa (LMWH)</td><td>INR (doel 2–3)</td><td>Niet nodig (voordeel!)</td></tr>
          <tr><td>Antidotum</td><td>Protaminesulfaat</td><td>Vit. K + PCC</td><td>Andexanet alfa (Xa) / idarucizumab (dabigatran)</td></tr>
          <tr><td>Voorkeursindicatie</td><td>Acuut · zwangerschap · IC</td><td>Kunstkleppen</td><td>AF · VTE — meeste patiënten</td></tr>
        </tbody>
      </table></div>

      <div class="th-section-title">INR-gids bij VKA</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">2–3</span><div><strong>Therapeutisch</strong> — doel bij AF, VTE, mechanische mitralisklep</div></div>
        <div class="th-step"><span class="th-step-num">2,5–3,5</span><div><strong>Hoger doel</strong> — mechanische aortaklep met risicofactoren</div></div>
        <div class="th-step"><span class="th-step-num">3,5–5</span><div><strong>Te hoog, geen bloeding</strong> — stop VKA, herhaal INR over 1–2 dagen</div></div>
        <div class="th-step"><span class="th-step-num">!!</span><div><strong>Ernstige bloeding</strong> — PCC 4-factoren + vitamine K IV — effect binnen minuten</div></div>
      </div>

      <div class="th-redflag"><strong>HIT (Heparine-geïnduceerde Trombocytopenie):</strong> trombocyten dalen ná dag 5–10 → paradoxaal tromboserisico! Elke nieuwe trombose bij heparinetherapie is HIT tot bewijs van tegendeel. Stop heparine direct, start argatroban of fondaparinux.</div>
      <div class="th-trap"><strong>DOACs bij nierinsufficiëntie:</strong> dabigatran is 80% renaal geklaard → bij eGFR &lt;30 gecontra-indiceerd. Rivaroxaban/apixaban minder niergevoelig maar dosisaanpassing nodig bij ernstig nierfalen.</div>
      <div class="th-pearl"><strong>Zwangerschap:</strong> LMWH is de enige veilige antistolling — VKA en DOACs zijn teratogeen. Bij kunstklep in de zwangerschap: VKA is het enige bewezen effectieve middel; weeg risico's per trimester.</div>
    `
  },

  diabetes: {
    title: 'Diabetes Mellitus',
    icon: '🍬',
    subtitle: 'DM1 · DM2 · DKA · Complicaties',
    body: `
      <div class="th-intro"><p>DM treft wereldwijd 500 miljoen mensen. DM2 (insulineresistentie) maakt 90% uit. DM1 (auto-immuun bètacel-destructie) vereist levenslang insuline. De complicaties zijn de werkelijke killer.</p></div>

      <div class="th-keynums">
        <div class="th-keynum"><span class="th-keynum-val">500M</span><span class="th-keynum-lbl">Wereldwijd DM-patiënten</span></div>
        <div class="th-keynum"><span class="th-keynum-val">&lt;53</span><span class="th-keynum-lbl">HbA1c mmol/mol target DM2</span></div>
        <div class="th-keynum"><span class="th-keynum-val">3</span><span class="th-keynum-lbl">DKA-criteria (trilogie)</span></div>
      </div>

      <div class="th-section-title">DM1 vs DM2</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th></th><th>DM type 1</th><th>DM type 2</th></tr></thead>
        <tbody>
          <tr><td>Mechanisme</td><td>Auto-immuun destructie bètacellen</td><td>Insulineresistentie + relatief tekort</td></tr>
          <tr><td>Leeftijd</td><td>Vaak &lt;30j (maar elke leeftijd)</td><td>Vaak &gt;40j (maar ook jongeren met obesitas)</td></tr>
          <tr><td>Presentatie</td><td>Acuut: polyurie, polydipsie, gewichtsverlies, DKA</td><td>Sluipend: moeheid, toevalsbevinding bij screening</td></tr>
          <tr><td>C-peptide</td><td><span class="dn">↓↓</span> (geen insulineproductie)</td><td>Normaal of <span class="up">↑</span></td></tr>
          <tr><td>Auto-antilichamen</td><td>GAD, IA-2, ZnT8 positief</td><td>Negatief</td></tr>
          <tr><td>Insuline?</td><td>Altijd, vanaf diagnose</td><td>Pas in later stadium</td></tr>
        </tbody>
      </table></div>

      <div class="th-section-title">DKA — herken de trilogie</div>
      <div class="th-mnemonic">
        <span class="th-mnemonic-label">DKA diagnostiek (alle drie nodig)</span>
        <div class="th-mnemonic-row"><b>K</b>etose — ketonurie of ketonaemie &gt;3 mmol/L</div>
        <div class="th-mnemonic-row"><b>A</b>cidose — pH &lt;7,3 of bicarbonaat &lt;15 mmol/L</div>
        <div class="th-mnemonic-row"><b>D</b>iabetes — bloedglucose &gt;11 mmol/L of bekende DM</div>
      </div>

      <div class="th-section-title">DKA behandeling — stap voor stap</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Vocht IV</strong> — 0,9% NaCl 1L/uur eerste 2u, dan langzamer op geleide van kliniek</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Kalium controleren</strong> — start insuline NIET als K⁺ &lt;3,5 mmol/L (corrigeer eerst!)</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>Insuline-infuus</strong> — 0,1 E/kg/uur IV; glucose niet sneller dan 3–4 mmol/uur laten dalen</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>Kalium suppletie</strong> — altijd zodra insuline gestart is; K⁺ daalt snel door intracellulaire shift</div></div>
        <div class="th-step"><span class="th-step-num">5</span><div><strong>Uitlokkende factor behandelen</strong> — infectie? Vergeten insuline? Nieuw ontdekte DM1?</div></div>
      </div>

      <div class="th-section-title">DM2 behandelstappen</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Leefstijl</strong> — afvallen en beweging; meest effectieve interventie ooit gemeten</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Metformine</strong> — eerste keus; stop bij eGFR &lt;30, acuut ziek of jodiumcontrast</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>SGLT2i of GLP-1-agonist</strong> — bij cardiovasculair risico, nierfalen of obesitas</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>Insuline</strong> — basaal (nacht) → basaal-bolus schema bij onvoldoende controle</div></div>
      </div>

      <div class="th-redflag"><strong>DKA + insuline → K⁺ daalt snel.</strong> Hypokaliëmie tijdens DKA-behandeling is een frequent dodelijke complicatie. Altijd kalium-infuus starten zodra K⁺ &lt;5,5 en insuline gestart is.</div>
      <div class="th-trap"><strong>HHS bij DM2:</strong> extreem hoge glucose (&gt;30 mmol/L), weinig/geen ketosen, osmolariteit &gt;320 mOsm/kg. Behandeling: voorzichtiger hydraten (hyperosmolaire cel!) + lage-dosis insuline pas na vochtresuscitatie.</div>

      <div class="th-section-title">Complicaties overzicht</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Type</th><th>Orgaan</th><th>Kenmerk</th></tr></thead>
        <tbody>
          <tr><td>Microangiopathie</td><td>Retina</td><td>Retinopathie → blindheid (jaarlijkse screening)</td></tr>
          <tr><td>Microangiopathie</td><td>Nier</td><td>Nefropathie → CKD (microalbuminurie = vroeg signaal)</td></tr>
          <tr><td>Neuropathie</td><td>Perifere zenuwen</td><td>Brandende voeten, verlies tastzin, voetulcera</td></tr>
          <tr><td>Macroangiopathie</td><td>Hart · hersenen · benen</td><td>MI · CVA · PAV — leading cause of death</td></tr>
        </tbody>
      </table></div>
    `
  },

  schildklier: {
    title: 'Schildklierpathologie',
    icon: '🦋',
    subtitle: 'Hypo · Hyper · Thyroiditis · Diagnostiek',
    body: `
      <div class="th-intro"><p>De schildklier reguleert het metabolisme via T3 en T4. TSH is de gevoeligste screeningstest — een kleine T4-verandering geeft een grote TSH-respons. Altijd TSH als eerste stap.</p></div>

      <div class="th-keynums">
        <div class="th-keynum"><span class="th-keynum-val">TSH eerst</span><span class="th-keynum-lbl">Altijd eerste diagnostische stap</span></div>
        <div class="th-keynum"><span class="th-keynum-val">0,4–4,0</span><span class="th-keynum-lbl">Normaal TSH (mU/L)</span></div>
        <div class="th-keynum"><span class="th-keynum-val">&gt;10</span><span class="th-keynum-lbl">TSH mU/L → behandel subclinisch hypo</span></div>
      </div>

      <div class="th-section-title">Hypo vs Hyper — klinisch beeld</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th></th><th>Hypothyreoïdie</th><th>Hyperthyreoïdie</th></tr></thead>
        <tbody>
          <tr><td>TSH</td><td><span class="up">↑</span></td><td><span class="dn">↓</span></td></tr>
          <tr><td>Vrij T4</td><td><span class="dn">↓</span></td><td><span class="up">↑</span></td></tr>
          <tr><td>Symptomen</td><td>Moeheid · kouwelijkheid · obstipatie · gewichtstoename · bradycardie · droge huid · trage reflexen</td><td>Warmte-intolerantie · gewichtsverlies · tremor · tachycardie · diarree · exoftalmus (Graves)</td></tr>
          <tr><td>Oorzaak</td><td>Hashimoto (auto-immuun, meest voorkomend) · jodiumtekort · thyroïdectomie</td><td>Graves (TSI-antilichamen) · toxisch adenoom · thyroiditis-fase</td></tr>
          <tr><td>Behandeling</td><td>Levothyroxine (T4 substitutie)</td><td>Thionamiden (PTU, carbimazol) · jodium-131 · thyroïdectomie</td></tr>
        </tbody>
      </table></div>

      <div class="th-section-title">Diagnostiek — stap voor stap</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>TSH</strong> — eerste stap altijd. Normaal TSH = euthyreoot; geen verdere tests nodig.</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Vrij T4</strong> — bij afwijkend TSH voor ernst en richting (hoog TSH + laag T4 = primair hypo).</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>Antilichamen</strong> — TPO-Ab (Hashimoto), TSI/TRAb (Graves); bevestigen auto-immuunoorsprong.</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>Echo schildklier</strong> — bij palpabele struma of noduli (knobbel &gt;1cm → FNAC overwegen).</div></div>
        <div class="th-step"><span class="th-step-num">5</span><div><strong>Scintigrafie</strong> — bij hyperthyreoïdie om onderscheid Graves vs toxisch adenoom te maken.</div></div>
      </div>

      <div class="th-redflag"><strong>Thyroïde storm = IC-opname.</strong> Koorts &gt;40°C + hartfrequentie &gt;150 + bewustzijnsstoornissen na hyperthyreoïdie. Behandeling: PTU → jodium (1u na PTU) → propranolol → dexamethason.</div>
      <div class="th-trap"><strong>Hypothyreoïdie verergert statine-myopathie.</strong> Bij onverklaard hoog CK of spierklachten bij statinegebruiker: altijd TSH meten. Myopathie verbetert bij correctie — zonder statinestop!</div>
      <div class="th-pearl"><strong>Subklinisch hypothyreoïdie (hoog TSH, normaal T4):</strong> behandel bij TSH &gt;10, bij symptomen of bij zwangerschap. Bij TSH 4–10: watchful waiting en 6-maandelijks herhalen.</div>
      <div class="th-pearl"><strong>Zwangerschap:</strong> TSH-norm is lager in het eerste trimester (&lt;2,5 mU/L). Hypothyreoïdie onbehandeld geeft cognitieve schade bij het kind. Pas levothyroxine-dosis aan.</div>
    `
  },

  copd: {
    title: 'COPD',
    icon: '🫁',
    subtitle: 'GOLD-stadiëring · Exacerbatie · Inhalatoren',
    body: `
      <div class="th-intro"><p>COPD is een chronische, grotendeels irreversibele luchtwegobstructie door langdurige blootstelling aan schadelijke stoffen, voornamelijk tabaksrook. De diagnose stelt spirometrie, niet de klacht. Vroeg stoppen met roken is de meest effectieve behandeling.</p></div>

      <div class="th-keynums">
        <div class="th-keynum"><span class="th-keynum-val">FEV1/FVC &lt;0,70</span><span class="th-keynum-lbl">Definitie obstructie (na BD)</span></div>
        <div class="th-keynum"><span class="th-keynum-val">88–92%</span><span class="th-keynum-lbl">SpO₂ doelwaarde COPD (!)</span></div>
        <div class="th-keynum"><span class="th-keynum-val">#1</span><span class="th-keynum-lbl">Rookstop = meest effectief</span></div>
      </div>

      <div class="th-section-title">GOLD-stadiëring (FEV1 na bronchodilatatie)</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>GOLD</th><th>Omschrijving</th><th>FEV1 (% voorspeld)</th><th>Klinisch</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Mild</td><td>≥80%</td><td>Hoest, sputum; vaak niet herkend</td></tr>
          <tr><td>2</td><td>Matig</td><td>50–79%</td><td>Dyspneu bij inspanning (MRC ≥2)</td></tr>
          <tr><td>3</td><td>Ernstig</td><td>30–49%</td><td>Dyspneu bij lichte inspanning</td></tr>
          <tr><td>4</td><td>Zeer ernstig</td><td>&lt;30%</td><td>Dyspneu in rust · respiratoir falen</td></tr>
        </tbody>
      </table></div>

      <div class="th-section-title">Behandelladder stabiel COPD</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Rookstop + vaccinatie</strong> — griep + pneumokok; meest impactvol voor mortaliteit</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>SABA</strong> (salbutamol) — zo nodig voor acute dyspneu</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>LAMA</strong> (tiotropium) — onderhoud bij MRC ≥2; vermindert exacerbaties het meest</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>LAMA + LABA</strong> — bij aanhoudende dyspneu ondanks LAMA</div></div>
        <div class="th-step"><span class="th-step-num">5</span><div><strong>+ ICS</strong> — bij ≥2 exacerbaties/jaar of eosinofielen &gt;300/µL</div></div>
      </div>

      <div class="th-section-title">Exacerbatie — management</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Stap</th><th>Behandeling</th><th>Details</th></tr></thead>
        <tbody>
          <tr><td>Bronchodilatatie</td><td>SABA + SAMA vernevelaar</td><td>Salbutamol + ipratropium elke 20 min</td></tr>
          <tr><td>Corticosteroïden</td><td>Prednisolon 40 mg/dag oraal</td><td>5 dagen; niet langer</td></tr>
          <tr><td>Antibiotica</td><td>Bij purulent sputum of hoog CRP</td><td>Amoxicilline-clav of doxycycline</td></tr>
          <tr><td>Zuurstof</td><td>Target SpO₂ <strong>88–92%</strong></td><td>Niet hoger — CO₂-retentie risico!</td></tr>
          <tr><td>NIV</td><td>Bij pH &lt;7,35 + CO₂-retentie</td><td>BiPAP voorkomt intubatie</td></tr>
        </tbody>
      </table></div>

      <div class="th-redflag"><strong>Zuurstof &gt;92% bij COPD-patiënt = gevaarlijk.</strong> Patiënten met chronische CO₂-retentie drijven hun ademhaling op hypoxische prikkel. Te hoog O₂ → CO₂-accumulatie → ademdepressie → coma. Target altijd 88–92%!</div>
      <div class="th-trap"><strong>ICS-monotherapie bij COPD = fout.</strong> Inhalatiecorticosteroïden bij COPD alleen als toevoeging aan LAMA+LABA, nooit als enige behandeling. Verhoogt kans op pneumonie.</div>
      <div class="th-pearl"><strong>Rookstopadvies</strong> is de meest effectieve interventie bij COPD — vertraagt FEV1-daling en verlengt overleving meer dan elk geneesmiddel. Combineer met varenicline voor de hoogste slagingskans.</div>
    `
  },

  longembolie: {
    title: 'Longembolie',
    icon: '🩺',
    subtitle: 'Wells · Diagnose · Behandeling · Massieve LE',
    body: `
      <div class="th-intro"><p>Longembolie (LE) is een verstopping van de longslagader door trombus, meestal vanuit diepe beenvenen. ~1 per 1000/jaar. Presentatie varieert van asymptomatisch tot hartstilstand — vroeg risicostratificeren is cruciaal.</p></div>

      <div class="th-keynums">
        <div class="th-keynum"><span class="th-keynum-val">Wells ≤4</span><span class="th-keynum-lbl">Laag risico → D-dimeer</span></div>
        <div class="th-keynum"><span class="th-keynum-val">Wells &gt;4</span><span class="th-keynum-lbl">Hoog risico → direct CTPA</span></div>
        <div class="th-keynum"><span class="th-keynum-val">100 mg</span><span class="th-keynum-lbl">Alteplase bij massieve LE</span></div>
      </div>

      <div class="th-section-title">Wells-score — punten</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Criterium</th><th>Punten</th></tr></thead>
        <tbody>
          <tr><td>Klinische tekenen DVT (zwelling, roodheid been)</td><td>3</td></tr>
          <tr><td>Alternatieve diagnose minder waarschijnlijk dan LE</td><td>3</td></tr>
          <tr><td>Hartfrequentie &gt;100/min</td><td>1,5</td></tr>
          <tr><td>Immobilisatie &gt;3 dagen / recente chirurgie</td><td>1,5</td></tr>
          <tr><td>Eerder DVT of LE</td><td>1,5</td></tr>
          <tr><td>Hemoptysis</td><td>1</td></tr>
          <tr><td>Actieve maligniteit</td><td>1</td></tr>
        </tbody>
      </table></div>

      <div class="th-section-title">Diagnose stap voor stap</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Wells-score</strong> — pre-test kans bepalen (≤4 laag, &gt;4 hoog)</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>D-dimeer</strong> — <em>alleen</em> bij Wells ≤4. Negatief = LE uitgesloten. Positief → CTPA.</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>CTPA</strong> — bij Wells &gt;4 direct, of bij positieve D-dimeer. Goudstandaard.</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>Echo hart</strong> — bij hemodynamische instabiliteit: RV-dilatatie = bewijs massieve LE, direct handelen.</div></div>
      </div>

      <div class="th-section-title">Behandeling naar ernst</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Type</th><th>Hemodynamiek</th><th>Behandeling</th></tr></thead>
        <tbody>
          <tr><td>Laag risico</td><td>Stabiel · RV normaal</td><td>DOAC (rivaroxaban/apixaban) · thuisbehandeling mogelijk</td></tr>
          <tr><td>Intermediair hoog</td><td>Stabiel · RV-dilatatie of troponine↑</td><td>LMWH of DOAC · IC-monitoring · klaar voor trombolyse bij verslechtering</td></tr>
          <tr><td>Massief</td><td>Shock · RV-falen</td><td>Alteplase 100 mg IV over 2u + heparine daarna</td></tr>
        </tbody>
      </table></div>

      <div class="th-redflag"><strong>Massieve LE = shock + RV-falen → trombolyse direct.</strong> Alteplase 100 mg IV over 2 uur. Contra-indicaties: recente chirurgie &lt;3w, CVA &lt;3m, actieve bloeding, intracraniale tumor.</div>
      <div class="th-trap"><strong>D-dimeer is onbruikbaar bij hoge pre-test kans.</strong> Bij zwangerschap, infectie, trauma of maligniteit stijgt D-dimeer altijd. Gebruik direct CTPA bij deze groepen zonder D-dimeer te bepalen.</div>
      <div class="th-pearl"><strong>Leeftijdsaangepaste D-dimeer:</strong> bij patiënten &gt;50j gebruik afkapwaarde = leeftijd × 10 µg/L (bijv. 70j → &lt;700 µg/L = negatief). Verhoogt specificiteit zonder sensitiviteitsverlies.</div>
    `
  },

  sepsis: {
    title: 'Sepsis & Septische Shock',
    icon: '🚨',
    subtitle: 'Sepsis-3 · qSOFA · Antibiotica · Bundels',
    body: `
      <div class="th-intro"><p>Sepsis is een levensbedreigende orgaandisfunctie door een dysreguleerde gastheerrespons op infectie. Mortaliteit 15–25%; bij septische shock tot 40%. Elke uur vertraging in antibiotica verhoogt mortaliteit met ~7%.</p></div>

      <div class="th-keynums">
        <div class="th-keynum"><span class="th-keynum-val">15–25%</span><span class="th-keynum-lbl">Mortaliteit sepsis</span></div>
        <div class="th-keynum"><span class="th-keynum-val">~40%</span><span class="th-keynum-lbl">Mortaliteit septische shock</span></div>
        <div class="th-keynum"><span class="th-keynum-val">1u</span><span class="th-keynum-lbl">Antibiotica-doelstelling</span></div>
        <div class="th-keynum"><span class="th-keynum-val">+7%</span><span class="th-keynum-lbl">Mortaliteit per uur delay AB</span></div>
      </div>

      <div class="th-section-title">Sepsis-3 definitie</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Vermoeden van infectie</strong> + acute SOFA-stijging ≥2 punten = <strong>Sepsis</strong></div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Septische shock</strong> = sepsis + vasopressoren nodig (MAP &lt;65) + lactaat &gt;2 mmol/L ondanks adequate vulling</div></div>
      </div>

      <div class="th-section-title">qSOFA — snel screenen buiten de IC</div>
      <div class="th-mnemonic">
        <span class="th-mnemonic-label">qSOFA (≥2 punten = verdacht voor sepsis)</span>
        <div class="th-mnemonic-row"><b>R</b>espiratory rate ≥22/min</div>
        <div class="th-mnemonic-row"><b>A</b>ltered mental status (GCS &lt;15)</div>
        <div class="th-mnemonic-row"><b>B</b>loodpressure systolisch ≤100 mmHg</div>
      </div>

      <div class="th-section-title">Sepsis 1-uurs bundel (Surviving Sepsis)</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Lactaat meten</strong> — &gt;2 mmol/L = weefselhypoperfusie · &gt;4 = spoed-IC</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Bloedkweken × 2</strong> — vóór antibiotica (max 2–3 minuten!)</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>Breedspectrum antibiotica</strong> — binnen 1u bij shock; nooit vertragen op kweekuitslag</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>30 ml/kg crystalloïd IV</strong> — bij hypotensie of lactaat &gt;4 mmol/L</div></div>
        <div class="th-step"><span class="th-step-num">5</span><div><strong>Noradrenaline</strong> — eerstekeus vasopressor als vulling onvoldoende (MAP-target ≥65 mmHg)</div></div>
      </div>

      <div class="th-section-title">Empirisch antibioticakeuze</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Focus</th><th>Empirisch middel</th></tr></thead>
        <tbody>
          <tr><td>Urosepsis</td><td>Cefuroxim IV (bij ESBL-risico: pip/tazo)</td></tr>
          <tr><td>Pneumonie-sepsis</td><td>Amoxicilline-clav + macrolide; of ceftriaxon</td></tr>
          <tr><td>Abdominale sepsis</td><td>Pip/tazo of meropenem + metronidazol</td></tr>
          <tr><td>Onbekende focus</td><td>Pip/tazo of meropenem + vancomycine bij MRSA-risico</td></tr>
          <tr><td>Meningitis-sepsis</td><td>Ceftriaxon + dexamethason + amoxicilline &gt;50j</td></tr>
        </tbody>
      </table></div>

      <div class="th-redflag"><strong>Lactaat &gt;4 mmol/L = absolute spoed.</strong> Dit is het teken van ernstige weefselhypoperfusie, ook zonder hypotensie. Direct IC-opname, agressieve vulling en vasopressoren gereed zetten.</div>
      <div class="th-trap"><strong>Bloedkweken mogen AB NIET vertragen.</strong> Maximaal 2–3 minuten voor 2 sets kweken, dan direct AB. Nooit 30 minuten wachten bij hemodynamisch instabiele patiënt.</div>
      <div class="th-safe"><strong>De-escalatie na 48–72u:</strong> na kweekuitslagen → versmall naar meest gerichte AB. Voorkomt resistentie en bijwerkingen. Documenteer in dossier waarom de brede keuze gemaakt werd.</div>
    `
  },

};

// ── Open / close ──

function openTheory(topicId) {
  const t = THEORY_TOPICS[topicId];
  if (!t) return;
  document.getElementById('theoryIcon').textContent = t.icon;
  document.getElementById('theoryTitle').textContent = t.title;
  document.getElementById('theorySubtitle').textContent = t.subtitle || '';
  document.getElementById('theoryBody').innerHTML = t.body;
  document.getElementById('theoryOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTheory() {
  document.getElementById('theoryOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Koppel vraag aan theorie-thema ──

function getRelatedTheory(q) {
  if (!q) return null;
  const txt = [(q.q||''), (q.ex||''), (q.dl||'')].join(' ').toLowerCase();
  if (/alzheimer|lewy|vasculaire dementie|frontotempora|normaaldruk|nph/.test(txt)) return 'dementie';
  if (/ecg|st.eleva|wenckebach|mobitz|qt.inter|pr.inter|flutter|atriumfibril|aritmie/.test(txt)) return 'ecg';
  if (/anemie|ferritine|ijzergebrek|megaloblast|schistocyt|hemolyti/.test(txt)) return 'anemie';
  if (/meningitis|liquor|pleiocytose|meningokok|kernig/.test(txt)) return 'meningitis';
  if (/hartfalen|hfref|hfpef|decompensatio|ejectiefract/.test(txt)) return 'hartfalen';
  if (/antibioticum|antibiotic|bètalactam|mrsa|resistenti|ciproflox|amoxicill|vancomycin|aminoglycosid/.test(txt)) return 'antibiotica';
  if (/antistoll|heparine|warfarine|acenocoumarol|rivaroxaban|apixaban|dabigatran|inr|aptt|trombus|stoll/.test(txt)) return 'stolling';
  if (/diabetes|hba1c|insuline|metformine|dka|hyperglykem|sglt2|glp.1/.test(txt)) return 'diabetes';
  if (/schildklier|tsh|hypothyreo|hyperthyreo|graves|hashimoto|thyrox/.test(txt)) return 'schildklier';
  if (/sepsis|septisch|sofa|lactaat|vasopressor|noradrenalin|bacteriem/.test(txt)) return 'sepsis';
  if (/copd|luchtwegobstructie|bronchodilatator|tiotropium|exacerbatie.*long|spirometrie|fev1|lama|laba/.test(txt)) return 'copd';
  if (/longembolie|embolie|pulmonaal|wells.*score|d.dimeer.*embol|ctpa|trombolyse.*long/.test(txt)) return 'longembolie';
  return null;
}
