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
  return null;
}
