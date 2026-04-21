// MedDuel — Theorieboek

const THEORY_TOPICS = {

  dementie: {
    title: 'Dementiesyndromen',
    icon: '🧠',
    subtitle: 'Alzheimer · Vasculair · Lewy-body · FTD · NPH',
    body: `
      <div class="th-intro"><p>Dementie treft ~300.000 Nederlanders. De vijf hoofdvormen lijken op elkaar maar hebben elk een eigen patroon, biomarker en behandeling.</p></div>
      <div class="th-section-title">Vergelijking</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th></th><th>Alzheimer</th><th>Vasculair</th><th>Lewy-body</th><th>FTD</th><th>NPH</th></tr></thead>
        <tbody>
          <tr><td>Begin</td><td>Sluipend</td><td>Plotseling/trapsgewijs</td><td>Sluipend</td><td>Sluipend</td><td>Sluipend</td></tr>
          <tr><td>Eerste klacht</td><td>Geheugen</td><td>Afh. locatie infarct</td><td>Hallucinaties / parkinsonisme</td><td>Gedrag / taal</td><td>Loopstoornis</td></tr>
          <tr><td>MRI</td><td>Temporopariëtale atrofie</td><td>WS-laesies, infarcten</td><td>Weinig atrofie</td><td>Frontale atrofie</td><td>Grote ventrikels, geen corticale atrofie</td></tr>
          <tr><td>Behandeling</td><td>Cholinesteraseremmer</td><td>Vasculaire RF</td><td>Rivastigmine</td><td>Symptomatisch</td><td>LP-drainage / shunt</td></tr>
        </tbody>
      </table></div>
      <div class="th-section-title">Klinische parels</div>
      <div class="th-pearl"><strong>Lewy-body</strong> is extreem gevoelig voor klassieke antipsychotica (haloperidol) → ernstig parkinsonisme, soms fataal. Altijd documenteren!</div>
      <div class="th-pearl"><strong>NPH</strong> is de enige potentieel reversibele dementie. LP-test: 30-50 ml drainage → loopverbetering = bevestiging én behandeling.</div>
      <div class="th-pearl"><strong>FTD vs Alzheimer</strong>: FTD begint vaker onder de 65 jaar met gedragsverandering vóór geheugenproblemen.</div>
    `
  },

  ecg: {
    title: 'ECG Basisinterpretatie',
    icon: '📊',
    subtitle: 'Ritme · Intervallen · ST-afwijkingen · Aritmieën',
    body: `
      <div class="th-intro"><p>Lees elk ECG in dezelfde volgorde — dan mis je niets.</p></div>
      <div class="th-figure">
        <svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px">
          <line x1="0" y1="65" x2="320" y2="65" stroke="#ddd" stroke-width="1"/>
          <polyline points="10,65 35,65 43,55 51,50 59,65 73,65 80,70 91,10 102,73 113,65 128,65 139,57 151,38 163,57 176,65 310,65"
            stroke="#E8410A" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="51" y="45" font-size="12" font-weight="bold" fill="#555" text-anchor="middle">P</text>
          <text x="80" y="85" font-size="12" font-weight="bold" fill="#555" text-anchor="middle">Q</text>
          <text x="91" y="7" font-size="12" font-weight="bold" fill="#E8410A" text-anchor="middle">R</text>
          <text x="102" y="88" font-size="12" font-weight="bold" fill="#555" text-anchor="middle">S</text>
          <text x="151" y="34" font-size="12" font-weight="bold" fill="#555" text-anchor="middle">T</text>
          <line x1="35" y1="93" x2="113" y2="93" stroke="#bbb" stroke-width="0.8" stroke-dasharray="3,2"/>
          <text x="74" y="100" font-size="9" fill="#aaa" text-anchor="middle">PR-interval (&lt;200ms)</text>
        </svg>
        <div class="th-figure-caption">PQRST-complex — de bouwsteen van elk ECG</div>
      </div>
      <div class="th-section-title">7 stappen</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Kalibratie</strong> — 25mm/s, 10mm/mV standaard?</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Ritme</strong> — regelmatig? P voor elk QRS?</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>Frequentie</strong> — 300 ÷ grote hokjes tussen twee R-toppen</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>As</strong> — normaal −30° tot +90°</div></div>
        <div class="th-step"><span class="th-step-num">5</span><div><strong>Intervallen</strong> — PR &lt;200ms, QRS &lt;120ms, QTc &lt;440ms</div></div>
        <div class="th-step"><span class="th-step-num">6</span><div><strong>R-topprogressie</strong> — groeit van V1→V5</div></div>
        <div class="th-step"><span class="th-step-num">7</span><div><strong>ST-T veranderingen</strong> — elevatie, depressie, T-inversie</div></div>
      </div>
      <div class="th-section-title">ST-afwijkingen</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Patroon</th><th>Diagnose</th><th>Actie</th></tr></thead>
        <tbody>
          <tr><td>ST↑ gelokaliseerd + reciproke depressie</td><td>STEMI</td><td>Directe PCI</td></tr>
          <tr><td>ST↑ diffuus saddle-shape + PR↓</td><td>Pericarditis</td><td>NSAID + colchicine</td></tr>
          <tr><td>ST↓ + T-inversie</td><td>NSTEMI / ischemie</td><td>Troponine herhalen</td></tr>
          <tr><td>Puntige T-toppen + breed QRS</td><td>Hyperkaliëmie</td><td>Calcium gluconaat IV</td></tr>
        </tbody>
      </table></div>
      <div class="th-section-title">Aritmie-sneldiagnose</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>ECG-beeld</th><th>Diagnose</th></tr></thead>
        <tbody>
          <tr><td>Geen P, absoluut irregulier QRS</td><td>Atriumfibrilleren</td></tr>
          <tr><td>Zagtand F-golven, QRS regulier 150/min</td><td>Atriumflutter 2:1</td></tr>
          <tr><td>PR steeds langer → QRS uitvalt</td><td>Wenckebach (Mobitz I)</td></tr>
          <tr><td>Plotse QRS-uitval, constant PR</td><td>Mobitz II → pacemaker</td></tr>
          <tr><td>P en QRS volledig ontkoppeld</td><td>Derdegraads AV-blok</td></tr>
        </tbody>
      </table></div>
    `
  },

  anemie: {
    title: 'Anemie',
    icon: '🩸',
    subtitle: 'Microcytair · Normocytair · Macrocytair',
    body: `
      <div class="th-intro"><p>Eerste stap: MCV. Daarna reticulocyten en ijzerstatus. De tabel vat de vijf hoofdtypen samen.</p></div>
      <div class="th-section-title">Vergelijking</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Type</th><th>MCV</th><th>Ferritine</th><th>Retics</th><th>Kenmerk</th></tr></thead>
        <tbody>
          <tr><td>IJzergebrek</td><td><span class="dn">↓</span></td><td><span class="dn">↓↓</span></td><td><span class="dn">↓</span></td><td>Menstruatie, GI-bloeding, coeliakie</td></tr>
          <tr><td>Chronische ziekte</td><td>N/<span class="dn">↓</span></td><td>N/<span class="up">↑</span></td><td><span class="dn">↓</span></td><td>Ontsteking, maligniteit; ijzer opgesloten in macrofagen</td></tr>
          <tr><td>Thalassemie minor</td><td><span class="dn">↓↓</span></td><td>N</td><td><span class="up">↑</span></td><td>Hb-elektroforese afwijkend</td></tr>
          <tr><td>Megaloblastair</td><td><span class="up">↑↑</span></td><td>N</td><td><span class="dn">↓</span></td><td>Hypersegmenteerden; B12-gebrek ook neurologisch</td></tr>
          <tr><td>Hemolytisch</td><td>N/<span class="up">↑</span></td><td><span class="up">↑</span></td><td><span class="up">↑↑</span></td><td>LDH↑, haptoglobine↓, indirect bili↑, schistocyten bij MAHA</td></tr>
        </tbody>
      </table></div>
      <div class="th-section-title">Klinische parels</div>
      <div class="th-pearl"><strong>Ferritine</strong> is een acuut-fase-eiwit — bij infectie stijgt het ook zonder goede ijzervoorraden. Kijk bij twijfel naar transferrinesaturatie (&lt;16% = ijzergebrek).</div>
      <div class="th-pearl"><strong>B12 vs folaat:</strong> beide macrocytair, maar B12-gebrek geeft ook neurologische uitval. Geef nooit alleen folaat bij B12-deficiëntie — maskeert de neurologie!</div>
      <div class="th-pearl"><strong>Schistocyten + trombocytopenie</strong> = TTP of HUS tot bewijs van het tegendeel. Bij TTP: plasmaferese DIRECT.</div>
    `
  },

  meningitis: {
    title: 'Meningitis & LP',
    icon: '🔬',
    subtitle: 'Bacterieel · Viraal · TBC · LP-interpretatie',
    body: `
      <div class="th-intro"><p>Het klinische beeld alleen onderscheidt de vormen niet — liquoranalyse is essentieel. Maar antibiotica mogen nooit wachten op de LP.</p></div>
      <div class="th-section-title">LP-uitslag vergelijking</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th></th><th>Bacterieel</th><th>Viraal</th><th>TBC</th></tr></thead>
        <tbody>
          <tr><td>Uiterlijk</td><td>Troebel/purulent</td><td>Helder</td><td>Helder/opalescent</td></tr>
          <tr><td>Leukocyten</td><td>↑↑↑ PMN</td><td>↑ lymfocyten</td><td>↑↑ lymfocyten</td></tr>
          <tr><td>Glucose</td><td>↓↓ (&lt;2.5)</td><td>Normaal</td><td>↓</td></tr>
          <tr><td>Eiwit</td><td>↑↑↑</td><td>Licht ↑</td><td>↑↑</td></tr>
        </tbody>
      </table></div>
      <div class="th-section-title">Management bacteriële meningitis</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Bloedkweken</strong> — 2 sets, max 2-3 minuten</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Dexamethason</strong> — gelijktijdig of vóór antibiotica (vermindert gehoorschade)</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>Cefotaxim/ceftriaxon IV</strong> — bij &gt;50j voeg amoxicilline toe (Listeria)</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>CT dan LP</strong> — LP pas na CT bij tekenen van verhoogde hersendruk. CT mag AB NIET vertragen!</div></div>
        <div class="th-step"><span class="th-step-num">5</span><div><strong>Isolatie</strong> — eerste 24u. Rifampicine-profylaxe voor huisgenoten bij meningokokken.</div></div>
      </div>
      <div class="th-pearl"><strong>Kernig/Brudzinski</strong> hebben slechte sensitiviteit (~50%). Een negatief teken sluit meningitis NIET uit.</div>
    `
  },

  hartfalen: {
    title: 'Hartfalen',
    icon: '❤️',
    subtitle: 'HFrEF · HFpEF · Vierpijlertherapie',
    body: `
      <div class="th-intro"><p>Hartfalen treft 1-2% van de volwassen bevolking. Onderscheid HFrEF (slechte pompfunctie) van HFpEF (stijf hart) — de behandeling verschilt.</p></div>
      <div class="th-section-title">HFrEF vs HFpEF</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th></th><th>HFrEF</th><th>HFpEF</th></tr></thead>
        <tbody>
          <tr><td>EF</td><td>&lt;40%</td><td>≥50%</td></tr>
          <tr><td>Mechanisme</td><td>Systolische dysfunctie</td><td>Diastolische dysfunctie (stijf hart)</td></tr>
          <tr><td>Oorzaak</td><td>MI, cardiomyopathie</td><td>Hypertensie, DM, obesitas, ouderdom</td></tr>
          <tr><td>Bewezen medicatie</td><td>ACEi/ARNI + β-blokker + MRA + SGLT2i</td><td>SGLT2i (recent); diuretica symptomatisch</td></tr>
        </tbody>
      </table></div>
      <div class="th-section-title">Vierpijlertherapie HFrEF</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>ACE-remmer of ARNI</strong> (sacubitril/valsartan) — RAAS-remming, mortaliteit −25%</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Bèta-blokker</strong> (bisoprolol, carvedilol) — anti-aritmisch, mortaliteit −34%</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>MRA</strong> (spironolacton) — anti-fibrotisch + diuretisch</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>SGLT2-remmer</strong> (dapagliflozine) — cardio- en nefroprotectief</div></div>
      </div>
      <div class="th-pearl"><strong>RV-infarct valkuil:</strong> hypotensie + hoge CVD + heldere longen → GEEN nitraten/diuretica. Geef juist voluumbelasting.</div>
    `
  },

  antibiotica: {
    title: 'Antibiotica-klassen',
    icon: '💊',
    subtitle: 'Werkingsmechanisme · Spectrum · Resistentie',
    body: `
      <div class="th-intro"><p>Elk antibioticum heeft een eigen mechanisme en spectrum. Kennis hiervan voorkomt fout gebruik en resistentie.</p></div>
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
        <thead><tr><th>Mechanisme</th><th>Voorbeeld</th></tr></thead>
        <tbody>
          <tr><td>Enzym-inactivatie</td><td>Bètalactamase → amoxicilline-resistentie; ESBL → breed resistent</td></tr>
          <tr><td>Target-mutatie</td><td>PBP2a (mecA-gen) → MRSA resistent tegen alle bètalactams</td></tr>
          <tr><td>Effluxpomp</td><td>Chinolonen, tetracyclines uit cel gepompt</td></tr>
          <tr><td>Verminderde opname</td><td>Veranderde porines bij Pseudomonas</td></tr>
        </tbody>
      </table></div>
      <div class="th-section-title">Klinische parels</div>
      <div class="th-pearl"><strong>MRSA</strong>: resistent tegen alle bètalactams. Keuze: vancomycine of linezolid. Contactisolatie verplicht.</div>
      <div class="th-pearl"><strong>Aminoglycosiden once-daily</strong>: hoge piekconcentratie = maximaal bactericide effect én minder nefrotoxiciteit (tubuluscellen recupereren tussen doses).</div>
      <div class="th-pearl"><strong>Rifampicine</strong> is een krachtige CYP3A4-inductor → verlaagt effectiviteit anticonceptiepil, warfarine, en vele andere medicijnen.</div>
    `
  },

  stolling: {
    title: 'Stolling & Antistolling',
    icon: '🩹',
    subtitle: 'Cascade · Heparine · VKA · DOAC',
    body: `
      <div class="th-intro"><p>De bloedstolling verloopt via twee routes die samenkomen bij factor X. Elk antistollingsmiddel grijpt op een ander punt in.</p></div>
      <div class="th-section-title">Stollingsmiddelen vergelijking</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th></th><th>Heparine (UFH/LMWH)</th><th>VKA (warfarine)</th><th>DOAC</th></tr></thead>
        <tbody>
          <tr><td>Werkingsmechanisme</td><td>Versterkt antitrombine III → remt IIa + Xa</td><td>Remt vit. K-cyclus → ↓ II, VII, IX, X</td><td>Directe remming Xa (rivaroxaban) of IIa (dabigatran)</td></tr>
          <tr><td>Onset</td><td>Direct (IV) / 1-2u (SC)</td><td>3–5 dagen</td><td>1–3 uur</td></tr>
          <tr><td>Monitoring</td><td>APTT (UFH) / anti-Xa (LMWH)</td><td>INR (doel 2–3)</td><td>Niet nodig</td></tr>
          <tr><td>Antidotum</td><td>Protaminesulfaat</td><td>Vit. K + PCC</td><td>Andexanet alfa (Xa) / idarucizumab (dabigatran)</td></tr>
          <tr><td>Toediening</td><td>IV / SC</td><td>Oraal</td><td>Oraal</td></tr>
          <tr><td>Indicatie voorkeur</td><td>Acuut, zwangerschap, nierfalen</td><td>Kunstkleppen, mechanische hartkleppen</td><td>AF, VTE — meeste patiënten</td></tr>
        </tbody>
      </table></div>
      <div class="th-section-title">INR-gids bij VKA</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>INR 2–3</strong>: doel bij AF, VTE, mechanische mitralisklep</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>INR 2.5–3.5</strong>: mechanische aortaklep met extra risicofactoren</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>INR 3.5–5</strong> (te hoog, geen bloeding): stop VKA, herhaal over 1–2 dagen</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>Ernstige bloeding</strong>: PCC (4-factoren) + vitamine K IV — werkt in minuten</div></div>
      </div>
      <div class="th-pearl"><strong>Heparine-geïnduceerde trombocytopenie (HIT)</strong>: trombocyten dalen ná dag 5 → paradoxaal tromboserisico! Stop heparine direct, start argatroban of fondaparinux.</div>
      <div class="th-pearl"><strong>DOACs en nierfunctie</strong>: dabigatran is 80% renaal geklaard → bij eGFR &lt;30 gecontra-indiceerd. Rivaroxaban/apixaban minder niergevoelig.</div>
    `
  },

  diabetes: {
    title: 'Diabetes Mellitus',
    icon: '🍬',
    subtitle: 'DM1 · DM2 · Complicaties · Behandeling',
    body: `
      <div class="th-intro"><p>DM treft wereldwijd 500 miljoen mensen. DM2 (insulineresistentie) maakt 90% uit. DM1 (auto-immuun) vereist altijd insuline.</p></div>
      <div class="th-section-title">DM1 vs DM2</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th></th><th>DM type 1</th><th>DM type 2</th></tr></thead>
        <tbody>
          <tr><td>Mechanisme</td><td>Auto-immuun destructie bètacellen</td><td>Insulineresistentie + relatief insulinetekort</td></tr>
          <tr><td>Leeftijd begin</td><td>Vaak &lt;30j (maar kan op elke leeftijd)</td><td>Vaak &gt;40j (maar toename bij jongeren)</td></tr>
          <tr><td>Presentatie</td><td>Acuut: polyurie, polydipsie, gewichtsverlies, DKA</td><td>Sluipend: moeheid, vaak toevalsbevinding</td></tr>
          <tr><td>BMI</td><td>Normaal / laag</td><td>Vaak verhoogd</td></tr>
          <tr><td>C-peptide</td><td><span class="dn">↓↓</span> (geen insulineproductie)</td><td>Normaal / <span class="up">↑</span></td></tr>
          <tr><td>Insuline nodig?</td><td>Altijd</td><td>Later in ziekteverloop</td></tr>
        </tbody>
      </table></div>
      <div class="th-section-title">DM2 behandelstappen</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Leefstijl</strong> — afvallen, beweging; meest effectief</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Metformine</strong> — eerstekeus, goedkoop; stop bij eGFR &lt;30</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>SGLT2-remmer of GLP-1-agonist</strong> — bij cardiovasculair risico of obesitas</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>Insuline</strong> — basaal (nacht) → basaal-bolus bij onvoldoende controle</div></div>
      </div>
      <div class="th-section-title">Complicaties</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Type</th><th>Orgaan</th><th>Kenmerk</th></tr></thead>
        <tbody>
          <tr><td>Microangiopathie</td><td>Retina</td><td>Retinopathie → blindheid</td></tr>
          <tr><td>Microangiopathie</td><td>Nier</td><td>Nefropathie → CKD (microalbuminurie eerst)</td></tr>
          <tr><td>Neuropathie</td><td>Perifere zenuwen</td><td>Brandende voeten, verlies tastzin, ulcera</td></tr>
          <tr><td>Macroangiopathie</td><td>Hart, hersenen, benen</td><td>MI, CVA, PAV — leading cause of death</td></tr>
          <tr><td>Acuut</td><td>Metabolisme</td><td>DKA (DM1), HHS (DM2)</td></tr>
        </tbody>
      </table></div>
      <div class="th-pearl"><strong>DKA</strong>: trilogie — hyperglykemie + ketose + acidose. Behandel met IV vocht, insuline-infuus en kaliumsuppletie (kalium daalt snel bij insuline!).</div>
    `
  },

  schildklier: {
    title: 'Schildklierpathologie',
    icon: '🦋',
    subtitle: 'Hypo · Hyper · Thyroiditis · Diagnostiek',
    body: `
      <div class="th-intro"><p>De schildklier reguleert het metabolisme via T3 en T4. TSH is de gevoeligste screeningstest — kleine T4-verandering geeft grote TSH-respons.</p></div>
      <div class="th-section-title">Hypo vs Hyper</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th></th><th>Hypothyreoïdie</th><th>Hyperthyreoïdie</th></tr></thead>
        <tbody>
          <tr><td>TSH</td><td><span class="up">↑</span></td><td><span class="dn">↓</span></td></tr>
          <tr><td>Vrij T4</td><td><span class="dn">↓</span></td><td><span class="up">↑</span></td></tr>
          <tr><td>Klachten</td><td>Moeheid, kouwelijkheid, obstipatie, gewichtstoename, bradycardie, droge huid</td><td>Warmte-intolerantie, gewichtsverlies, tremor, tachycardie, diarree, exoftalmus (Graves)</td></tr>
          <tr><td>Oorzaak</td><td>Hashimoto (auto-immuun, meest voorkomend), jodiumtekort, thyroïdectomie</td><td>Graves (TSI-antilichamen), toxisch adenoom, thyroiditis</td></tr>
          <tr><td>Behandeling</td><td>Levothyroxine (T4 substitutie)</td><td>Thionamiden (PTU, carbimazol), jodium-131, thyroïdectomie</td></tr>
        </tbody>
      </table></div>
      <div class="th-section-title">Diagnostiek stap voor stap</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>TSH</strong> — eerste stap altijd. Normaal = euthyreoot.</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Vrij T4</strong> — bij afwijkend TSH voor ernst en richting.</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>Antilichamen</strong> — TPO-Ab (Hashimoto), TSI/TRAb (Graves).</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>Echo schildklier</strong> — bij palpabele struma of noduli.</div></div>
        <div class="th-step"><span class="th-step-num">5</span><div><strong>Scintigrafie</strong> — bij hyperthyreoïdie om oorzaak te bepalen.</div></div>
      </div>
      <div class="th-pearl"><strong>Subklinisch</strong>: TSH afwijkend maar vrij T4 normaal. Subklinische hypothyreoïdie (TSH &gt;4): behandel bij TSH &gt;10 of symptomen of zwangerschap.</div>
      <div class="th-pearl"><strong>Thyroïde storm</strong>: levensbedreigende hyperthyreoïdie. Behandeling: PTU + jodium + bèta-blokker + dexamethason. IC-opname.</div>
    `
  },

  copd: {
    title: 'COPD',
    icon: '🫁',
    subtitle: 'GOLD-stadiëring · Exacerbatie · Inhalatoren',
    body: `
      <div class="th-intro"><p>COPD is een chronische, grotendeels irreversibele luchtwegobstructie door langdurige blootstelling aan schadelijke stoffen, vooral tabaksrook. Spirometrie is de diagnosestandaard.</p></div>
      <div class="th-section-title">GOLD-stadiëring (FEV1 na bronchodilatatie)</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>GOLD</th><th>Omschrijving</th><th>FEV1 (% voorspeld)</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Mild</td><td>≥80%</td></tr>
          <tr><td>2</td><td>Matig</td><td>50–79%</td></tr>
          <tr><td>3</td><td>Ernstig</td><td>30–49%</td></tr>
          <tr><td>4</td><td>Zeer ernstig</td><td>&lt;30%</td></tr>
        </tbody>
      </table></div>
      <div class="th-section-title">Behandelladder stabiel COPD</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>SABA</strong> (salbutamol) — zo nodig voor dyspneu</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>LAMA</strong> (tiotropium) — onderhoud bij MRC ≥2; vermindert exacerbaties het meest</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>LAMA + LABA</strong> — bij aanhoudende dyspneu</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>LAMA + LABA + ICS</strong> — bij ≥2 exacerbaties/jaar of eosinofielen &gt;300 cellen/µL</div></div>
      </div>
      <div class="th-section-title">Exacerbatie COPD — management</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Stap</th><th>Behandeling</th></tr></thead>
        <tbody>
          <tr><td>Bronchodilatatie</td><td>SABA + SAMA vernevelaar (salbutamol + ipratropium)</td></tr>
          <tr><td>Corticosteroïden</td><td>Prednisolon 40 mg/dag oraal × 5 dagen</td></tr>
          <tr><td>Antibiotica</td><td>Bij purulent sputum of verhoogde CRP: amoxicilline-clavulaanzuur of doxycycline</td></tr>
          <tr><td>Zuurstof</td><td>Target SpO₂ <strong>88–92%</strong> (niet hoger — CO₂-retentie risico!)</td></tr>
          <tr><td>NIV</td><td>Bij pH &lt;7.35 + CO₂-retentie → CPAP/BiPAP, voorkomt intubatie</td></tr>
        </tbody>
      </table></div>
      <div class="th-pearl"><strong>Zuurstofvalkuil</strong>: COPD-patiënten met CO₂-retentie drijven hun ademhaling op hypoxie. Te hoog O₂ → ademdepressie. Target altijd 88–92%!</div>
      <div class="th-pearl"><strong>Roststopadvies</strong> is de meest effectieve interventie bij COPD — vertraagt FEV1-daling en verlengt overleving meer dan elk geneesmiddel.</div>
    `
  },

  longembolie: {
    title: 'Longembolie',
    icon: '🩺',
    subtitle: 'Wells · Diagnose · Behandeling · Massieve LE',
    body: `
      <div class="th-intro"><p>Longembolie (LE) is verstopping van een pulmonaalarterie door een trombus, meestal afkomstig uit de diepe beenvenen (DVT). Jaarlijkse incidentie ~1 per 1000. Behandel altijd in aansluiting op diagnostiek.</p></div>
      <div class="th-section-title">Wells-score (LE)</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Criterium</th><th>Punten</th></tr></thead>
        <tbody>
          <tr><td>Klinische tekenen DVT</td><td>3</td></tr>
          <tr><td>Alternatieve diagnose minder waarschijnlijk dan LE</td><td>3</td></tr>
          <tr><td>Hartfrequentie &gt;100/min</td><td>1.5</td></tr>
          <tr><td>Immobilisatie &gt;3 dagen / recente operatie</td><td>1.5</td></tr>
          <tr><td>Eerder DVT of LE</td><td>1.5</td></tr>
          <tr><td>Hemoptysis</td><td>1</td></tr>
          <tr><td>Maligniteit</td><td>1</td></tr>
        </tbody>
      </table></div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">≤4</span><div><strong>Laag risico</strong> — D-dimeer; als negatief: LE uitgesloten</div></div>
        <div class="th-step"><span class="th-step-num">&gt;4</span><div><strong>Hoog risico</strong> — direct CT-pulmonaalangiografie (CTPA)</div></div>
      </div>
      <div class="th-section-title">Diagnose stap voor stap</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Wells-score</strong> — risicostratificatie</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>D-dimeer</strong> — alleen bij lage Wells (&lt;/= 4); hoge sensitiviteit, lage specificiteit</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>CTPA</strong> — goudstandaard; bij hoge Wells of positieve D-dimeer</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>Echo hart</strong> — bij hemodynamische instabiliteit: RV-dilatatie = indirect bewijs LE</div></div>
      </div>
      <div class="th-section-title">Behandeling</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Type LE</th><th>Behandeling</th></tr></thead>
        <tbody>
          <tr><td>Stabiel (niet-massief)</td><td>DOAC (rivaroxaban of apixaban) 3–6 maanden; start direct</td></tr>
          <tr><td>Intermediair hoog risico</td><td>Anticoagulantia + monitoring IC; overweeg trombolyse bij verslechtering</td></tr>
          <tr><td>Massieve LE (hemodynamisch instabiel)</td><td>Systemische trombolyse (alteplase) + anticoagulantia; bij contra-indicatie: chirurgie of kathetertrombolyse</td></tr>
        </tbody>
      </table></div>
      <div class="th-pearl"><strong>Massieve LE</strong>: shock + RV-falen. Trombolyse (alteplase 100 mg IV over 2u) is levensreddend; groot bloedingsrisico → weeg af. Contra-indicaties: recente chirurgie, CVA &lt;3m, actieve bloeding.</div>
      <div class="th-pearl"><strong>D-dimeer</strong> stijgt bij zwangerschap, infectie, trauma, maligniteit → nutteloos bij hoge a-priori kans. Pas toe als uitsluiter bij lage kans!</div>
    `
  },

  sepsis: {
    title: 'Sepsis & Septische Shock',
    icon: '🚨',
    subtitle: 'Criteria · Sepsis-3 · Antibiotica · Bundels',
    body: `
      <div class="th-intro"><p>Sepsis is een levensbedreigende orgaandisfunctie door een dysreguleerde gastheerrespons op infectie. Mortaliteit 15–25%; bij septische shock tot 40%.</p></div>
      <div class="th-section-title">Sepsis-3 definitie</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Vermoeden van infectie</strong> + acute SOFA-stijging ≥2 punten = <strong>Sepsis</strong></div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Septische shock</strong> = sepsis + vasopressoren nodig (MAP &lt;65) + lactaat &gt;2 mmol/L ondanks adequate vulling</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>qSOFA screening</strong> (buiten IC): ≥2 van: AF &gt;22, GCS-daling, RR &lt;100 systolisch</div></div>
      </div>
      <div class="th-section-title">Sepsis-1u bundel (Surviving Sepsis)</div>
      <div class="th-steps">
        <div class="th-step"><span class="th-step-num">1</span><div><strong>Lactaat meten</strong> — &gt;2 = tissue hypoperfusie</div></div>
        <div class="th-step"><span class="th-step-num">2</span><div><strong>Bloedkweken × 2</strong> — vóór antibiotica (maar max 2-3 minuten)</div></div>
        <div class="th-step"><span class="th-step-num">3</span><div><strong>Breedspectrum antibiotica</strong> — binnen 1 uur bij shock</div></div>
        <div class="th-step"><span class="th-step-num">4</span><div><strong>30 ml/kg crystalloïd IV</strong> — bij hypotensie of lactaat &gt;4</div></div>
        <div class="th-step"><span class="th-step-num">5</span><div><strong>Vasopressoren</strong> — noradrenaline eerstekeus bij onvoldoende respons op vulling</div></div>
      </div>
      <div class="th-section-title">Antibioticakeuze bij sepsis</div>
      <div class="th-table-wrap"><table class="th-table">
        <thead><tr><th>Focus</th><th>Empirisch antibioticum</th></tr></thead>
        <tbody>
          <tr><td>Urosepsis</td><td>Cefuroxim IV of piperacilline/tazobactam bij risico op ESBL</td></tr>
          <tr><td>Pneumonie-sepsis</td><td>Amoxicilline-clavulaanzuur + macrolide; of ceftriaxon</td></tr>
          <tr><td>Abdominale sepsis</td><td>Piperacilline/tazobactam of meropenem + metronidazol</td></tr>
          <tr><td>Onbekende focus</td><td>Piperacilline/tazobactam of meropenem; voeg vancomycine toe bij MRSA-risico</td></tr>
          <tr><td>Meningitis-sepsis</td><td>Ceftriaxon + dexamethason; amoxicilline bij &gt;50j (Listeria)</td></tr>
        </tbody>
      </table></div>
      <div class="th-pearl"><strong>De-escalatie</strong>: na 48-72u kweekuitslagen beschikbaar → versmall het spectrum zo snel mogelijk. Voorkomt resistentie en bijwerkingen.</div>
      <div class="th-pearl"><strong>Lactaat herhalen</strong> na 2u. Bij daling &gt;10% → goede respons. Persisterende lactaatverhoging = slechte prognose, overweeg IC-opname.</div>
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
