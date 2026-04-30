// MedDuel — Trivia vragenbank
// Structuur: { type, domain, dl (display label), q, a (answers), c (correct index), ex (explanation) }
// Types: 'diagnose' | 'truefalse' | 'pharma' | 'lab'
// Domains: 'cardio' | 'neuro' | 'pharma' | 'infectio' | 'lab'

const QUESTIONS = [
  // ── CARDIOLOGIE ──
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
    },
  },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'ECG: geen P-toppen, irregulair ritme met "zagtand" baseline. Frequentie 150/min. Diagnose?',
    a:['Atriumfibrilleren','Atriumflutter','Ventriculaire tachycardie','WPW-syndroom'], c:1,
    ex:'Atriumflutter: F-golven (zagtand), typisch regulier 2:1-blok → 150/min. AF is juist irregulair zonder F-golven.',
    wiki:{
      kern: 'Atriumflutter is een georganiseerd re-entrycircuit in het rechteratrium (~300/min) met typisch 2:1 AV-blokkering → ventrikelfrequentie precies ~150/min, regelmatig.',
      bigfact: { num: '150', label: 'Ventrikelfrequentie', sub: 'Regelmatig 150/min door 2:1 AV-blokkering — het "magische getal" dat aan flutter doet denken.' },
      redflag: 'Een regelmatig ritme van precies 150/min is atriumflutter tot het tegendeel bewezen — niet sinustachycardie.',
      mechanisme: [
        { title: 'Re-entry circuit', desc: 'Elektrische impuls cirkelt in het rechteratrium via de cavotricuspidalisistmus (~300/min).' },
        { title: 'F-golven', desc: 'Zagtandpatroon zichtbaar in II, III, aVF en V1 — kenmerkend negatief in onderwand-afleidingen.' },
        { title: 'AV-blokkering', desc: 'AV-knoop geleidt niet elke impuls: typisch 2:1 → 150/min; bij medicatie 3:1 of 4:1.' },
        { title: 'Carotismassage', desc: 'Verhoogt vagustonus → vertraagt AV-geleiding tijdelijk → F-golven worden zichtbaar.' },
      ],
      onderscheid: [
        { label: 'Atriumflutter', desc: 'Regelmatig ~150/min, zagtand F-golven in II/III/aVF, onthult zich bij carotismassage.', type: 'ok' },
        { label: 'Atriumfibrilleren', desc: 'Absoluut irregulair, geen F-golven, grillige basislijn — nooit precies 150/min.', type: 'warn' },
        { label: 'Sinustachycardie', desc: 'Regelmatig maar P-toppen vóór elk QRS zichtbaar, frequentie varieert met ademhaling.', type: 'warn' },
        { label: 'AVNRT', desc: 'Smalcomplex tachycardie, plotse start/stop, P-toppen verstopt in of net ná QRS.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Frequentiecontrole met bètablokker of non-DHP calciumantagonist (verapamil/diltiazem).',
        stappen: [
          { naam: 'Cardioversie', detail: 'Elektrisch effectief met lage energie (50J); flutter is makkelijker te cardioverteren dan AF.' },
          { naam: 'Catheterablatie', detail: '>95% curatief succes door onderbreken cavotricuspidalisistmus — eerstekeus bij recidief.' },
          { naam: 'Anticoagulatie', detail: 'Zelfde indicaties als AF (CHA₂DS₂-VASc) — tromboserisico is vergelijkbaar.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Vrouw van 68j: kortademig bij inspanning, bilateraal enkelloedeem, verhoogde CVD, crepitaties basaal. Diagnose?',
    a:['Longembolie','Decompensatio cordis','COPD-exacerbatie','Nefrotisch syndroom'], c:1,
    ex:'Decompensatio cordis: stuwing links (crepitaties, orthopneu) én rechts (enkels, verhoogde CVD). Onderscheid van COPD: let op verhoogde CVD en S3-gallopritme. Behandeling: furosemide IV + rechtopzitten + O₂.',
    wiki:{
      kern: 'Decompensatio cordis is het onvermogen van het hart om voldoende cardiac output te leveren — vocht stapelt op in de longen (links) en/of systemische circulatie (rechts). Linksdecompensatie geeft orthopneu en crepitaties; rechtsdecompensatie geeft enkels en verhoogde CVD.',
      redflag: 'COPD-exacerbatie en hartfalen lijken op elkaar — verhoogde CVD, S3-gallopritme en crepitaties wijzen specifiek op hartfalen.',
      mechanisme: [
        { title: 'Verminderde cardiac output', desc: 'Hart pompt onvoldoende → RAAS en sympathicus activeren als compensatie.' },
        { title: 'RAAS-activatie', desc: 'Renine → angiotensine II → aldosteron → zout- en waterretentie → meer vulling, hogere vullingsdruk.' },
        { title: 'Longoedeem (links)', desc: 'Verhoogde linkeratrium-druk → stuwing in pulmonaalvenen → transudaat in alveoli → crepitaties.' },
        { title: 'Perifeer oedeem (rechts)', desc: 'Verhoogde rechteratrium-druk → stuwing halsvenen, lever, enkels.' },
      ],
      onderscheid: [
        { label: 'Decompensatio cordis', desc: 'Crepitaties bilateraal, verhoogde CVD, S3-gallopritme, orthopneu. BNP sterk verhoogd.', type: 'ok' },
        { label: 'Longembolie', desc: 'Plotse dyspneu maar geen crepitaties, pleuritische pijn, D-dimeer verhoogd.', type: 'danger' },
        { label: 'COPD-exacerbatie', desc: 'Verlengd expirium, piepen, geen verhoogde CVD. BNP normaal of licht verhoogd.', type: 'warn' },
        { label: 'Pneumonie', desc: 'Koorts, eenzijdige infiltraten, purulent sputum. Geen verhoogde CVD.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Rechtopzitten + zuurstof + furosemide IV 40–80 mg — binnen minuten handelen.',
        stappen: [
          { naam: 'Nitraten', detail: 'Bij systolische BD >100 mmHg: isosorbidedinitraat sublinguaal of IV — snelle afterloadreductie.' },
          { naam: 'Monitoring', detail: 'Diurese (doel >0,5 ml/kg/u), saturatie, BD om 15 min — titreer furosemide op respons.' },
          { naam: 'Onderhoudstherapie', detail: 'Start of optimaliseer HFrEF-medicatie na stabilisatie: ACE-remmer, bètablokker, MRA, SGLT2i.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 45j: plotse "scheurende" interscapulaire pijn, bloeddrukasymmetrie > 20 mmHg. Urgente diagnose?',
    a:['STEMI','Aortadissectie','Longembolie','Pericard­tamponade'], c:1,
    ex:'Aortadissectie: scheurend karakter, interscapulair, bloeddrukasymmetrie. CT-angio is diagnostisch. Levensbedreiging.',
    wiki:{
      kern: 'Aortadissectie is een scheur in de intima van de aortawand waarbij bloed een vals lumen creëert. Mortaliteit stijgt 1–2% per uur zonder behandeling — dit is het meest urgente cardiovasculaire spoedgeval.',
      bigfact: { num: '1-2%', label: 'Mortaliteit per uur', sub: 'Type A zonder chirurgie: 50% overlijdt binnen 48 uur.' },
      redflag: 'Sluit aortadissectie altijd uit vóór trombolyse — trombolyse bij dissectie is fataal door bloedingsrisico in het valse lumen.',
      mechanisme: [
        { title: 'Intima-scheur', desc: 'Hypertensie of bindweefselziekte (Marfan) verzwakt de aortawand → scheur onder systolische druk.' },
        { title: 'Vals lumen', desc: 'Bloed dringt tussen intima en media → vals lumen groeit en comprimeert het echte lumen.' },
        { title: 'Orgaanischemie', desc: 'Zijarteries (coronair, carotis, renaal, mesenteriaal) worden afgeklemd → MI, CVA, nierfalen.' },
        { title: 'Type A vs B', desc: 'Type A (60%): opstijgende aorta aangedaan → risico tamponade, AI, coronairischemie → chirurgie. Type B: dalend → medisch beleid.' },
      ],
      onderscheid: [
        { label: 'Aortadissectie', desc: 'Scheurende pijn, bloeddrukasymmetrie >20 mmHg tussen armen, breed mediastinum op X-thorax.', type: 'ok' },
        { label: 'STEMI', desc: 'Drukkende pijn, uitstraling naar kaak/arm, ST-elevaties op ECG, geen bloeddrukasymmetrie.', type: 'danger' },
        { label: 'Longembolie', desc: 'Pleuritische pijn, dyspneu, D-dimeer verhoogd, geen pijn in de rug.', type: 'warn' },
        { label: 'Aorta-aneurysma', desc: 'Chronische verwijding zonder acute scheur — pas pijn bij expansie of ruptuur.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Type A → spoedindicatie chirurgie. Type B → IV bètablokker labetalol/esmolol, doel-BD <120 mmHg systolisch.',
        stappen: [
          { naam: 'Diagnostiek', detail: 'CT-angiografie aorta is goudstandaard — bevestigt diagnose en onderscheidt type A vs B.' },
          { naam: 'Pijncontrole', detail: 'Morfine IV voor adequate pijnstilling — vermindert sympathicusactivatie en aortadruk.' },
          { naam: 'Type B complicaties', detail: 'TEVAR (endovasculaire stent) bij ischemie, expansie of ruptuur als medicamenteus falen.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Digoxine verhoogt de hartfrequentie en is geïndiceerd bij tachycardieën om het hart sneller te laten pompen.',
    c:false, ex:'NIET WAAR. Digoxine verlaagt de HF (negatief chronotroop) via vagale stimulatie. Gebruikt bij AF met snelle ventrikelrespons.',
    wiki:{
      kern: 'Digoxine remt Na⁺/K⁺-ATPase → intracellulair Na⁺ ↑ → Ca²⁺ ↑ → sterkere contractie (positief inotroop) én stimuleert de nervus vagus → tragere AV-knoopgeleiding (negatief chronotroop). Het verlaagt de hartfrequentie, het verhoogt die niet.',
      redflag: 'Hypokaliëmie vertienvoudigt het toxiciteitsrisico — altijd K⁺ >3,5 mmol/L houden bij digoxinegebruik.',
      mechanisme: [
        { title: 'Na⁺/K⁺-ATPase remming', desc: 'Digoxine blokkeert de natriumpomp → intracellulair Na⁺ stijgt → Na⁺/Ca²⁺-uitwisselaar werkt minder → Ca²⁺ stapelt op.' },
        { title: 'Positief inotroop', desc: 'Meer intracellulair Ca²⁺ → sterkere spiersamentrekking → hogere cardiac output bij hartfalen.' },
        { title: 'Negatief chronotroop', desc: 'Verhoogde vagustonus remt de AV-knoop → tragere ventrikelrespons bij AF.' },
        { title: 'Smal therapeutisch venster', desc: 'Therapeutisch: 0,5–2,0 ng/ml. Toxisch: >2 ng/ml. Tekens: misselijkheid, bradycardie, visuele halos.' },
      ],
      onderscheid: [
        { label: 'Digoxine', desc: 'Negatief chronotroop via vagus + positief inotroop. Voordeel bij AF mét hartfalen (lage EF).', type: 'ok' },
        { label: 'Bètablokkers', desc: 'Effectiever voor frequentiecontrole bij AF, geen inotroop effect. Eerstekeus bij AF zonder hartfalen.', type: 'warn' },
        { label: 'Verapamil/diltiazem', desc: 'Non-DHP calciumantagonisten: ook frequentiecontrole maar negatief inotroop — gecontraïndiceerd bij lage EF.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Stop digoxine bij tekens van toxiciteit — digoxine-specifieke antilichaamfragmenten (Fab) bij ernstige toxiciteit.',
        stappen: [
          { naam: 'Kalium corrigeren', detail: 'K⁺ altijd >3,5 houden — hypokaliëmie verhoogt toxiciteitsrisico dramatisch.' },
          { naam: 'Nierspiegel monitoren', detail: 'Digoxine wordt renaal geklaard — dosisreductie bij nierinsufficiëntie.' },
          { naam: 'Spiegelbepaling', detail: 'Meten minimaal 6u na inname; therapeutisch venster 0,5–2,0 ng/ml.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Een normaal ECG sluit een acuut myocardinfarct volledig uit.',
    c:false, ex:'NIET WAAR. Bij een NSTEMI of posterieur infarct kan het ECG initieel normaal zijn. Troponines zijn essentieel.',
    wiki: {
      kern: 'Een normaal ECG sluit een acuut myocardinfarct NIET uit. NSTEMI, posterieur MI en vroeg-stadium infarct kunnen een normaal of subtiel ECG tonen. Seriële hoogsensitief troponine is de hoeksteen van diagnose.',
      redflag: 'Posterior MI (afsluiting LCx): ST-depressie V1-V3 is het enige ECG-teken — aanvullend V7-V9 afleidingen zijn nodig voor de diagnose.',
      mechanisme: [
        { title: 'NSTEMI: geen ST-elevatie', desc: 'Bij NSTEMI is de coronaire occlusie subtotaal of intermitterend → geen transmuraal infarct → geen ST-elevatie. ST-depressie en T-inversie kunnen voorkomen, maar het ECG kan ook geheel normaal zijn.' },
        { title: 'Posterieur MI', desc: 'Linkscircumflexarterie (LCx) voedt het achterste myocardium — dit gebied is niet direct zichtbaar in standaard afleidingen. Enige teken: reciproke ST-depressie in V1-V3 en hoge R in V1.' },
        { title: 'Tijdsvenster', desc: 'ECG-veranderingen kunnen pas na 15-30 minuten optreden. Een eerste ECG bij binnenkomst kan normaal zijn terwijl het infarct net begint.' },
      ],
      onderscheid: [
        { label: 'Normaal ECG sluit MI NIET uit', desc: 'Bij hoge klinische verdenking altijd hs-troponine (0+1u of 0+3u protocol). Normaal ECG + lage troponine = MI onwaarschijnlijk.', type: 'ok' },
        { label: 'STEMI', desc: 'ST-elevatie ≥1mm in ≥2 aangrenzende afleidingen — transmuraal, directe PCI <90 min.', type: 'danger' },
        { label: 'NSTEMI', desc: 'Troponine verhoogd zonder ST-elevatie. ST-depressie of T-inversie mogelijk maar ECG ook normaal.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Altijd seriële troponine meten bij pijn op de borst, ongeacht het ECG.',
        stappen: [
          { naam: '0/1u-protocol', detail: 'Hs-troponine bij aankomst + na 1 uur: significante stijging (delta) = rule-in ACS.' },
          { naam: 'Posterior-afleidingen', detail: 'V7-V9 afnemen bij verdenking LCx-occlusie (ST-depressie V1-V3 + hoge R in V1).' },
        ],
      },
    } },

  // ── NEUROLOGIE ──
  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 72j: plotse uitval rechterarm/-been en spraak. Na 45 minuten volledig hersteld. Diagnose?',
    a:['Herseninfarct','TIA','Epileptisch insult','Migraine met aura'], c:1,
    ex:'TIA herstelt per definitie binnen 24u. Hoog recidiefrisico: ABCD2-score bepalen en direct behandelen.',
    wiki:{
      kern: 'Een TIA is een episode van focale neurologische uitval door tijdelijke ischemie, volledig herstellend binnen 24u (doorgaans <1u). Het is een ernstig waarschuwingssignaal: 10-15% krijgt binnen 3 maanden een CVA, risico is hoogst in de eerste 48u.',
      redflag: 'Na een TIA is het CVA-risico de eerste 48u het grootst — ABCD2-score ≥4 vereist onmiddellijke opname en onderzoek, niet uitgesteld poliklinisch.',
      mechanisme: [
        { title: 'Embolische oorzaak', desc: 'Cardiale embolieën (AF, kunstkleppen, LV-trombus), atherosclerose grote vaten (A. carotis interna) of lacunaire ischemie bij hypertensie.' },
        { title: 'Tijdelijke occlusie', desc: 'Bloedstolsel lost spontaan op → volledig herstel. MRI-DWI toont bij 30-50% toch een diffusie-positief infarctje: dit zijn eigenlijk kleine CVA\'s.' },
      ],
      onderscheid: [
        { label: 'TIA', desc: 'Focale uitval volledig herstellend binnen 24u. ABCD2-score bepaalt urgentie. Hoog recidiefrisico: eerste 48u meest gevaarlijk.', type: 'ok' },
        { label: 'Herseninfarct (CVA)', desc: 'Zelfde presentatie maar uitval persisteert na 24u, DWI-positief op MRI — directe trombolyse of trombectomie indien mogelijk.', type: 'danger' },
        { label: 'Epileptisch insult', desc: 'Tonisch-clonische of focale motorische uitval met postictale fase — EEG bevestigt, geen vaatgebonden distributie.', type: 'warn' },
        { label: 'Migraine met aura', desc: 'Uitval bouwt geleidelijk op (20-30 min, spreading), visuele fenomenen dominant, gevolgd door hoofdpijn. Nooit "negative" uitval exclusief.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Aspirine 300 mg direct + bloeddrukcontrole. Niet afwachten.',
        stappen: [
          { naam: 'ABCD2-score ≥4', detail: 'Opname: ECG + Holter (AF uitsluiten), echo carotis, echocardiografie hart.' },
          { naam: 'AF aangetoond', detail: 'Anticoagulatie (DOAC) i.p.v. plaatjesremmer — drastisch lagere recidief-kans.' },
          { naam: '>70% carotisstenose', detail: 'Carotisendarterectomie binnen 2 weken na TIA (evidence-based).' },
          { naam: 'Secundaire preventie', detail: 'Antihypertensivum + hoogintensieve statine + antidiabeticum optimaliseren.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 45j: nekstijfheid, fotofobie, koorts 39.5°C, positief teken van Kernig. Urgentie?',
    a:['Migraine','Subarachnoïdale bloeding','Bacteriële meningitis','Encefalitis'], c:2,
    ex:'Meningeale prikkeling + koorts = bacteriële meningitis tot tegendeel bewezen. Directe antibiotica, geen LP afwachten.',
    wiki:{
      kern: 'Bacteriële meningitis is een levensbedreigende ontsteking van de hersenvliezen. Het klassieke trio: koorts + nekstijfheid + fotofobie/fonofobie. Snelste behandeling redt levens — antibiotica direct, nóóit wachten.',
      bigfact: { num: '<30\'', label: 'Antibiotica vóór LP', sub: 'Uitstel van antibiotica verhoogt de mortaliteit significant — start vóór liquorpunctie als LP niet direct kan.' },
      mechanisme: [
        { title: 'Bacteriële invasie', desc: 'S. pneumoniae (volwassenen) en N. meningitidis (jongeren) bereiken de subarachnoïdale ruimte via hematogene route — het lokale immuunsysteem is zwak.' },
        { title: 'Ontsteking + oedeem', desc: 'Massieve inflammatoire respons → cerebrale vaatjes geïnflameerd → corticale ischemie + verhoogde intracraniële druk.' },
        { title: 'Hersenletsel', desc: 'Verhoogde ICP + vasculitis → infarct. Dexamethason vóór antibiotica remt TNF-α en vermindert dit letsel.' },
      ],
      onderscheid: [
        { label: 'Bacteriële meningitis', desc: 'Hoge koorts, nekstijfheid, PMN-pleocytose in liquor, laag glucose (<40% serum), hoog eiwit (>1 g/L). Sepsis-tekenen mogelijk.', type: 'ok' },
        { label: 'Virale meningitis', desc: 'Milder, lymfocytaire pleocytose, normaal glucose, eiwit licht verhoogd — zelfbeperkend, geen antibiotica nodig.', type: 'warn' },
        { label: 'HSV-encefalitis', desc: 'Bewustzijnsdaling + gedragsverandering (hersenparenchym aangedaan), temporale MRI-afwijkingen — aciclovir direct starten.', type: 'danger' },
        { label: 'SAB', desc: 'Donderslaghoofdpijn maar koorts ontbreekt, xanthochromie in liquor, geen pleocytose.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Ceftriaxon 2 g IV + dexamethason 10 mg IV — dexamethason vóór of gelijktijdig met antibiotica starten.',
        stappen: [
          { naam: 'Bloedkweken', detail: 'Afnemen vóór antibiotica, maar start antibiotica NIET uitstellen — bij hoge verdenking direct beginnen.' },
          { naam: 'CT en LP', detail: 'CT eerst bij bewustzijnsdaling/papiloedeem/focale uitval; anders LP direct voor liquordiagnostiek.' },
          { naam: 'Isolatie', detail: 'Druppelpreventie eerste 24u bij N. meningitidis — daarna niet meer besmettelijk.' },
          { naam: 'Contactprofylaxe', detail: 'Rifampicine of ciprofloxacine voor huisgenoten en directe contacten bij meningokokken.' },
        ],
      },
    } },


  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 28j: visuele stoornissen, daarna zwakte been, maanden later tintelingen arm. MRI: lesies verspreid in tijd en ruimte. Welke diagnose past het best?',
    a:['ALS','Multiple Sclerose','Guillain-Barré','Myasthenia Gravis'], c:1,
    ex:'MS: demyeliniserende aandoening, lesies verspreid in tijd én ruimte. Typisch bij jonge vrouwen (F:M = 3:1).',
    wiki:{
          kern: "Multiple sclerose (MS) is een chronische auto-immuun demyeliniserende aandoening van het centraal zenuwstelsel. Auto-reactieve T-cellen beschadigen myeline → vertraagde of geblokkeerde zenuwgeleiding.",
          mechanisme: [
            { title: "Myeline-aanval", desc: "Auto-reactieve T-cellen kruisen de bloed-hersenbarrière en vallen oligodendrocyten (myelineproducerende cellen) aan → vertraagde of geblokkeerde zenuwgeleiding." },
            { title: "Na demyelinisatie", desc: "gedeeltelijk herstel door remyelinisatie, maar ook axonale schade." },
            { title: "Bij schubs", desc: "actieve inflammatie." },
            { title: "Progressieve fase", desc: "chronische neurodestructie zonder actieve ontsteking." },
            { title: "Uitlokkers schub", desc: "infecties, koorts, stress." },
          ],
          onderscheid: [
            { label: 'Multiple Sclerose', desc: 'Laesies gescheiden in tijd én ruimte. McDonald-criteria: MRI periventriculair/juxtacorticaal + oligoklonale banden in liquor. Relapsing-remitting in 85%.', type: 'ok' },
            { label: 'NMO (neuromyelitis optica)', desc: 'Ernstigere aanvallen, longitudinale myelitis >3 wervels, opticus neuritis, AQP4-antilichamen positief. Reageert NIET op MS-DMTs.', type: 'danger' },
            { label: 'ADEM', desc: 'Eenmalige episode na infectie of vaccinatie, kinderen, multifocale MRI-laesies, behandeling met corticosteroïden.', type: 'warn' },
            { label: 'Vasculaire WS-afwijkingen', desc: 'Periventriculaire laesies bij ouderen met vasculaire risicofactoren — geen aanvallen, geen oligoklonale banden.', type: 'warn' },
          ],
          therapie: {
            urgent: "Schub: methylprednisolon IV 3-5 dagen (verkort duur, niet effect op lange termijn).",
            stappen: [
              { naam: "Ziektemodificerende therapie (DMT)", detail: "interferon-beta, glatirameracetat (milde MS) of natalizumab, ocrelizumab (actieve/ernstige MS)." },
              { naam: "Symptoombehandeling", detail: "baclofen (spasticiteit), amantadine (vermoeidheid), SSRI (depressie)." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie',
    q:'Bij een CVA moet altijd een CT-scan gemaakt worden vóór trombolyse om een bloeding uit te sluiten.',
    c:true, ex:'WAAR. Trombolyse bij hemorrhagisch CVA is fataal. Altijd CT eerst. "Time is brain" — maar veiligheid gaat voor.',
    wiki: {
      kern: 'Trombolyse bij een bloedend CVA is onmiddellijk fataal — het lost stolsels op en verergert de bloeding. CT vóór alteplase is een absolute vereiste, niet optioneel.',
      redflag: 'Trombolyse bij hemorrhagisch CVA verhoogt de mortaliteit sterk. Nooit beginnen zonder beeldvorming die bloeding uitsluit.',
      mechanisme: [
        { title: 'Ischemisch CVA', desc: 'Trombotische of embolische occlusie van een hersenarterie → ischemie → trombolyse lost stolsel op → reperfusie.' },
        { title: 'Hemorrhagisch CVA', desc: 'Bloedvat is al gebarsten → trombolyse verplaatst stolsel en vergroot bloeding → fatale herniatie.' },
        { title: 'CT vóór trombolyse', desc: 'Bloed is hyperdensiteit op CT (wit) bij vers hematoom — sluit bloeding uit vóór behandeling.' },
      ],
      onderscheid: [
        { label: 'Ischemisch CVA (85%)', desc: 'CT normaal in eerste 6u. Trombolyse ≤4,5u van start klachten. Embolisch: atriumfibrilleren.', type: 'ok' },
        { label: 'Hemorrhagisch CVA (15%)', desc: 'CT: hyperdense bloeding. Geen trombolyse. Bloeddrukbehandeling + neurochirurgie overwegen.', type: 'danger' },
        { label: 'TIA', desc: 'Volledig herstel <24u (meest <1u). Risico op CVA daarna hoog — start DAPT en statine direct.', type: 'warn' },
      ],
      therapie: {
        urgent: 'CT hersenen direct → bij ischemisch: alteplase 0,9 mg/kg IV ≤4,5u na start klachten.',
        stappen: [
          { naam: 'Trombolyse contra-indicaties', detail: 'Recente chirurgie, bloedingsdiathese, BD >185/110, glucose <2.7 of >22, orale anticoagulantia.' },
          { naam: 'Trombectomie', detail: 'Bij grote vaat-occlusie (M1/ICA): mechanische trombectomie tot 24u bij selecte patiënten.' },
          { naam: 'Secundaire preventie', detail: 'Aspirine + statine direct na uitsluiting bloeding. Anticoagulantia bij AF.' },
        ],
      },
    } },

  // ── NEUROLOGIE — moeilijker ──
  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 34j, 2 weken na gastro-enteritis:\nProgressieve ascending spierzwakte, areflexie\nLiquor: eiwit 2.8 g/L, cellen 3/µL\nDiagnose?',
    a:['Multiple Sclerose','ALS','Guillain-Barré syndroom','Myasthenia Gravis'], c:2,
    ex:'GBS: stijgende motorische uitval + areflexie na infectie + albuminocytologische dissociatie (hoog eiwit, nauwelijks cellen). Respiratoir monitoring essentieel — 30% heeft beademing nodig. Behandeling: IVIG of plasmaferese.',
    wiki:{
      kern: 'Guillain-Barré syndroom is een auto-immuun demyeliniserende aandoening van de perifere zenuwen, klassiek 2-4 weken na infectie (Campylobacter, CMV, EBV). Kenmerk: stijgende (ascending) verlamming — begint in de benen.',
      redflag: '30% van GBS-patiënten heeft beademing nodig. Monitor vitale capaciteit: bij FVC <20 ml/kg of snelle daling → intubatie. Ademhalingsfalen is de grootste doodsoorzaak.',
      mechanisme: [
        { title: 'Moleculaire mimicry', desc: 'Antilichamen gericht op bacteriële/virale structuren kruisreageren met gangliosiden op het myeline van perifere zenuwen.' },
        { title: 'Demyelinisatie', desc: 'Prikkelgeleiding vertraagt of blokkeert → stijgende zwakte + areflexie + sensibiliteitsstoornissen.' },
        { title: 'Albuminocytologische dissociatie', desc: 'Liquor: sterk verhoogd eiwit (>1 g/L) maar nauwelijks cellen (<10/µL) — kenmerkend voor GBS.' },
      ],
      onderscheid: [
        { label: 'Guillain-Barré (GBS)', desc: 'Ascending paralysis + areflexie + albuminocytologische dissociatie in liquor, 2-4 weken na infectie.', type: 'ok' },
        { label: 'Myasthenia gravis (MG)', desc: 'Ook spierzwakte maar vermoeibaarheidsspatroon (erger \'s avonds), areflexie afwezig, sensibiliteit intact.', type: 'warn' },
        { label: 'Botulisme', desc: 'Dalende verlamming (top naar beneden!), pupilreacties gestoord, geen koorts, besmet voedsel.', type: 'danger' },
        { label: 'Dwarsmyelitis', desc: 'Spinaal niveau aanwijsbaar, UMN-tekenen, blaas/darm vroeg aangedaan.', type: 'warn' },
      ],
      therapie: {
        urgent: 'IVIG 2 g/kg over 5 dagen OF plasmaferese — gelijkwaardig effectief.',
        stappen: [
          { naam: 'Geen corticosteroïden', detail: 'Corticosteroïden zijn NIET effectief bij GBS — ze verlengen zelfs de herstelperiode.' },
          { naam: 'Ademhaling bewaken', detail: 'FVC elke 4-6u. Bij FVC <20 ml/kg of snel dalend → elektieve intubatie.' },
          { naam: 'Prognose', detail: '80% volledig herstel na 6-12 maanden. 5% blijft ernstig gehandicapt.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 70j: geheugenverlies, urge-incontinentie, breed-based gang. CT: ventrikelvergroting zonder corticale atrofie. Diagnose?',
    a:['Alzheimer','Normaaldrukhydrocephalus (NPH)','Lewy body dementie','Vasculaire dementie'], c:1,
    ex:'NPH triade van Hakim: dementie + incontinentie + gangstoornis ("wacky, wet, wobbly"). CT: grote ventrikels, weinig corticale atrofie. Lumbaalpunctie als diagnostische/therapeutische test — verbetering na liquordrainage bevestigt diagnose.',
    wiki: {
      kern: 'Normaaldrukhydrocephalus (NPH) is een behandelbare dementie-oorzaak. De triade van Hakim: loopstoornis (breed-based, "magnetisch") + urge-incontinentie + cognitieve achteruitgang. CT: grote ventrikels zonder corticale atrofie.',
      redflag: 'NPH is behandelbaar — mis het niet! Verwisseling met Alzheimer is de meest gemaakte fout. Sleutelverschil: CT toont disproportionele ventrikelvergroting zonder corticale atrofie.',
      mechanisme: [
        { title: 'Gestoorde liquorresorptie', desc: 'Liquor wordt onvoldoende geresorbeerd (arachnoidale villi) → ventrikeldruk stijgt chronisch → witte stof periventiculair beschadigd.' },
        { title: 'Triade', desc: 'Frontale witte stof druk → gangstoornis (frontaal gangpatroon). Pericalleuze vezel druk → blaas-incontinentie. Frontale cortex druk → cognitieve traagheid.' },
        { title: 'Tap-test', desc: 'LP met drainage 30-50 ml liquor → tijdelijke verbetering van gang/cognitie bevestigt diagnose en voorspelt succes van ventrikelshunt.' },
      ],
      onderscheid: [
        { label: 'NPH', desc: 'Triade Hakim + CT grote ventrikels zonder atrofie + tap-test positief. Behandelbaar met ventrikelshunt.', type: 'ok' },
        { label: 'Alzheimer', desc: 'Geen gangstoornis vroeg, geen incontinentie vroeg. CT: temporopariëtale atrofie. Niet behandelbaar met shunt.', type: 'warn' },
        { label: 'Vasculaire dementie', desc: 'Trapsgewijs, cardiovasculaire risicofactoren, witte-stofafwijkingen op MRI.', type: 'warn' },
        { label: 'Parkinson', desc: 'Rusttremor + rigiditeit + bradykinesie. Gang is shufflend maar smal, niet breed-based.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Ventriculoperitoneale (VP) shunt bij tap-test-positieve NPH.',
        stappen: [
          { naam: 'Tap-test', detail: 'LP 30-50 ml liquordrainage → meet gangverbetering na 24-48u. Positief = sterk voorspeller shuntsucces.' },
          { naam: 'Shuntplaatsing', detail: 'VP-shunt draint overschot liquor van ventrikels naar buikholte — verbetert triade bij 70-80% van goede kandidaten.' },
          { naam: 'Herhaalbare LPs', detail: 'Bij patiënten met shuntrisico: seriële LPs als tijdelijke behandeling.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie',
    q:'Bij een epiduraal hematoom is er typisch een lucide interval van uren tussen het initiële trauma en bewustzijnsdaling.',
    c:true, ex:'WAAR. Epiduraal hematoom (arteria meningea media): kort bewustzijnsverlies → lucide interval (arteriële bloeding bouwt langzaam druk op) → snelle deterioratie. Neurochirurgische spoedinterventie levensreddend.',
    wiki:{
      kern: 'Epiduraal hematoom is een arteriële bloeding tussen schedel en dura (arteria meningea media bij temporale fractuur). Het lucide interval — patiënt lijkt te herstellen — is het klassieke kenmerk en geeft een vals gevoel van veiligheid.',
      redflag: 'Ipsilaterale pupildilatatie + contralaterale hemiparese = tentoriumherniatie. Neurochirurgische spoedevacuatie is dan de enige levensreddende interventie.',
      mechanisme: [
        { title: 'Schedeltrauma', desc: 'Temporale fractuur ruptureert de arteria meningea media — arteriële druk pompt bloed in de epidurale ruimte.' },
        { title: 'Lucide interval', desc: 'Patiënt herstelt schijnbaar terwijl de arteriële bloeding langzaam druk opbouwt — kenmerkend voor epiduraal.' },
        { title: 'Herniatie', desc: 'Na uren bereikt het hematoom kritische druk → tentoriumherniatie → ipsilaterale pupildilatatie, contralaterale hemiparese.' },
      ],
      onderscheid: [
        { label: 'Epiduraal hematoom', desc: 'Biconvex op CT, arterieel, lucide interval, jongeren na temporaal trauma. Neurochirurgische spoed.', type: 'ok' },
        { label: 'Subduraal hematoom', desc: 'Halvemaanvorm op CT, veneus (brugvenen), ouderen/antistolling, langzamer beloop.', type: 'warn' },
        { label: 'Subarachnoïdale bloeding', desc: 'Geen trauma vereist, donderslaghoofdpijn, geen lucide interval, xanthochromie in liquor.', type: 'warn' },
        { label: 'Diffuus axonaal letsel', desc: 'Coma direct na trauma, geen focale uitval, CT vaak normaal.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Neurochirurgische spoedcranioto­mie — evacueer hematoom zodra herniatie dreigt.',
        stappen: [
          { naam: 'CT hoofd direct', detail: 'Biconvexe hyperdensiteit temporaal — diagnostisch. Geen LP vereist.' },
          { naam: 'ICP bewaken', detail: 'Mannitol 20% 1 g/kg IV als overbrugging bij bewustzijnsdaling voor OK.' },
          { naam: 'Prognose', detail: 'Vroege evacuatie voor herniatie: >90% goed herstel. Na herniatie: mortaliteit 30-50%.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 38j: plotse "donderslag-hoofdpijn", maximale intensiteit bereikt in seconden, nekstijfheid, geen koorts. CT hersenen negatief. Volgende stap?',
    a:['MRI hersenen met gadolinium','Lumbaalpunctie na 6-12 uur','Geruststellen — waarschijnlijk migraine','Arteria temporalis biopsie'], c:1,
    ex:'Thunderclap + negatieve CT: subarachnoïdale bloeding uitsluiten! CT mist 5% van SAB in eerste uren. LP na ≥6u detecteert xanthochromie. "Worst headache of life" = SAB tot bewijs van het tegendeel. LP altijd verplicht.',
    wiki:{
          kern: "Subarachnoïdale bloeding (SAB) is bloeding in de ruimte tussen hersenvliezen, meestal door ruptuur van een cerebraal aneurysma. De \"donderslaghoofdpijn\" — maximale intensiteit in seconden — is het klassieke alarmteken.",
          mechanisme: [
            { title: "Aneurysma-ruptuur", desc: "80% veroorzaakt door ruptuur van een sacculair (bes-)aneurysma op bifurcaties van de circulus van Willis." },
            { title: "Gevolgen van bloeding", desc: "Bloed in de subarachnoïdale ruimte irriteert hersenvliezen (nekstijfheid), verhoogt intracraniële druk (hoofdpijn, bewustzijnsdaling) en veroorzaakt vasospasmen (ischemie dag 4-14)." },
          ],
          onderscheid: [
            { label: 'Subarachnoïdale bloeding (SAB)', desc: 'Donderslaghoofdpijn maximaal in seconden, nekstijfheid, negatieve CT sluit SAB NIET uit — altijd LP na 6-12u voor xanthochromie.', type: 'ok' },
            { label: 'Migraine', desc: 'Geleidelijke opbouw (20-60 min), eerder episoden, geen thunderclap, geen nekstijfheid. Nooit eerste aanval "ergste ooit" zonder LP-uitsluiting.', type: 'warn' },
            { label: 'Bacteriële meningitis', desc: 'Koorts prominenter, langzamer begin over uren, PMN-pleocytose in liquor.', type: 'warn' },
            { label: 'Epiduraal hematoom', desc: 'Trauma vooraf, lucide interval, CT diagnostisch.', type: 'danger' },
          ],
          therapie: {
            urgent: 'CT hersenen direct — sensitief eerste 6u (98%). Daarna LP bij negatieve CT.',
            stappen: [
              { naam: 'LP na 6-12u', detail: 'Xanthochromie (geel vocht door hemoglobineafbraak) bewijst SAB bij negatieve CT. Spectrofotometrie goudstandaard.' },
              { naam: 'Aneurysma-behandeling', detail: 'Endovasculair coilen (eerste keus) of neurochirurgisch clippen zo snel mogelijk.' },
              { naam: 'Nimodipine', detail: 'Calciumantagonist 60 mg 4-uurlijks gedurende 21 dagen — vermindert vasospasmen en cerebrale ischemie (dag 4-14).' },
              { naam: 'ICP-bewaking', detail: 'Hydrocefalie is een frequente complicatie — bij verslechtering ventrikeldrainage overwegen.' },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 55j: progressieve dysfagie, dysartrie, tongfasciculaties én spasticiteit met hyperreflexie benen, geen sensibiliteitsstoornissen. Diagnose?',
    a:['Myasthenia Gravis','ALS (amyotrofische lateraalsclerose)','Brainsteminfarct','Guillain-Barré syndroom'], c:1,
    ex:'ALS: gelijktijdig UMN (hyperreflexie, spasticiteit) ÉN LMN-uitval (atrofie, fasciculaties). Bulbaire variant: dysfagie/dysartrie als startpunt. Geen sensorische uitval — dat onderscheidt ALS van GBS en MS.',
    wiki:{
          kern: "Amyotrofische lateraalsclerose (ALS) is een progressieve neurodegeneratieve ziekte waarbij zowel bovenste (UMN) als onderste (LMN) motorische neuronen afsterven. Mediane overleving is 3-5 jaar.",
          mechanisme: [
            { title: 'Neuronenverlies', desc: 'UMN (motorcortex) + LMN (voorhoorn ruggemerg + hersenstam) sterven af. Combinatie geeft uniek beeld: hyperreflexie (UMN) + fasciculaties (LMN).' },
            { title: 'Oorzaak multifactorieel', desc: 'SOD1-mutaties (familiaire ALS), TDP-43-aggregaten, RNA-metabolisme-stoornissen, glutamaat-excitotoxiciteit. 90% sporadisch.' },
            { title: 'Geen herstel', desc: 'Motorische neuronen regenereren niet — progressie onstuitbaar. Sensibele neuronen gespaard (diagnostisch kenmerk).' },
          ],
          onderscheid: [
            { label: 'ALS', desc: 'Gelijktijdig UMN (hyperreflexie, spasticiteit) + LMN (fasciculaties, atrofie) zónder sensorische uitval. Bulbaire ALS: dysartrie + dysfagie als presentatie.', type: 'ok' },
            { label: 'GBS', desc: 'Perifeer, sensorische uitval aanwezig, reversibel na weken-maanden, areflexie, albuminocytologische dissociatie in liquor.', type: 'warn' },
            { label: 'Myasthenia gravis', desc: 'Vermoeibare zwakte, geen fasciculaties/atrofie, sensorisch intact, verbetert op pyridostigmine.', type: 'warn' },
            { label: 'MS', desc: 'Schubsgewijs beloop, sensibiliteit aangedaan, MRI demyelinisatielaesies. Geen fasciculaties.', type: 'danger' },
          ],
          therapie: {
            urgent: 'Riluzol 50 mg 2×/dag — glutamaat-remmer, verlengt overleving met ~3 maanden.',
            stappen: [
              { naam: 'Edaravone', detail: 'Vermindert functionele achteruitgang bij vroege ALS met goede longfunctie (ALSFRS-R selectiecriteria).' },
              { naam: 'Voeding', detail: 'PEG-sonde bij dysfagie — voorkómt aspiratiepneumonie en malnutritie.' },
              { naam: 'Ademhaling', detail: 'NIV (niet-invasieve beademing) bij FVC <50% of symptomatische hypercapnie — verlengt leven en verlaagt klachten.' },
              { naam: 'MDT-zorg', detail: 'Multidisciplinair: neuroloog, revalidatiearts, logopedist, diëtist, psycholoog — elk stadium andere behoeften.' },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie',
    q:'Carbamazepine is gecontraïndiceerd bij dragers van het HLA-B*1502-allel vanwege een sterk verhoogd risico op Stevens-Johnson syndroom.',
    c:true, ex:'WAAR. HLA-B*1502 (prevalent in Zuidoost-Aziatische populaties) is sterk geassocieerd met carbamazepine-geïnduceerd SJS/TEN. Genetische screening vóór start wordt aanbevolen. Alternatief: levetiracetam of lamotrigine.',
    wiki: {
      kern: 'HLA-B*1502 is een genetische variant die sterk verhoogd risico geeft op Stevens-Johnson syndroom (SJS) en toxische epidermale necrolyse (TEN) bij gebruik van aromatische anti-epileptica, vooral carbamazepine. Prevalentie: 5-15% in Zuidoost-Aziatische bevolkingen.',
      redflag: 'SJS/TEN is levensbedreigend — mortaliteit TEN tot 30%. Bij huiduitslag + mucosale laesies tijdens carbamazepine: direct staken en dermatologisch consult.',
      mechanisme: [
        { title: 'HLA-B*1502 en carbamazepine', desc: 'HLA-B*1502 presenteert carbamazepine-metabolieten als "vreemd" aan T-cellen → massale cytotoxische T-celrespons → keratineocytapoptose → huidblaasvorming.' },
        { title: 'Aromatische anti-epileptica', desc: 'Carbamazepine, fenytoïne, lamotrigine en oxcarbazepine hebben dit risico. Levetiracetam en valproaat zijn HLA-onafhankelijk.' },
        { title: 'Screening', desc: 'Vóór start carbamazepine bij patiënten van Aziatische origine: HLA-B*1502 genotypering. Bij positief resultaat: alternatief kiezen.' },
      ],
      onderscheid: [
        { label: 'Carbamazepine + HLA-B*1502', desc: 'Hoog SJS/TEN-risico. Screening vereist bij Zuidoost-Aziatische patiënten. Alternatief: levetiracetam.', type: 'danger' },
        { label: 'Lamotrigine', desc: 'Huiduitslag in 10% (dosisafhankelijk) maar SJS-risico lager. Langzame titratie verplicht.', type: 'warn' },
        { label: 'Levetiracetam', desc: 'Geen SJS-risico, geen HLA-interactie. Eerste keus bij patiënten met HLA-B*1502.', type: 'ok' },
      ],
      therapie: {
        urgent: 'Stop carbamazepine onmiddellijk bij huidreactie + mucosale laesies.',
        stappen: [
          { naam: 'Substituut', detail: 'Schakel over op levetiracetam of valproaat — geen aromatisch anti-epilepticum.' },
          { naam: 'SJS-behandeling', detail: 'ICU-opname, wondverzorging (brandwondencentrum), IVIG of ciclosporine overwegen.' },
          { naam: 'Screening', detail: 'HLA-B*1502 genotypering vóór start bij Aziatische patiënten — nu aanbevolen in richtlijn.' },
        ],
      },
    } },

  // ── FARMACOLOGIE ──
  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Dit middel blokkeert de H⁺/K⁺-ATPase op de pariëtaalcel en remt zuurproductie. Gebruikt bij GERD en peptische ulcera. Welk middel is dit?',
    a:['Omeprazol','Metoclopramide','Famotidine','Sucralfaat'], c:0,
    ex:'Omeprazol is een protonpompremmer (PPI). Famotidine is een H2-blokker — minder effectief, ander aanknopingspunt.',
    wiki:{
          kern: "Protonpompremmers (PPIs) zijn de krachtigste maagzuurremmers. Ze blokkeren irreversibel de H⁺/K⁺-ATPase (protonpomp) op de pariëtaalcel → zuurproductie daalt met >90%. Neem 30 min vóór ontbijt in — pariëtaalcellen moeten actief zijn voor activatie.",
          mechanisme: [
            { title: "Prodrug-activatie", desc: "PPIs zijn prodrugs die in het zure milieu van de pariëtaalcel omgezet worden naar de actieve sulfenamide." },
            { title: "Irreversibele binding", desc: "Sulfenamide bindt covalent aan de H⁺/K⁺-ATPase → effect duurt 24-48u ondanks korte halfwaardetijd in bloed." },
            { title: "Dagelijkse inname", desc: "Nieuwe protonpompen worden continu aangemaakt → PPI moet dagelijks ingenomen worden om effect te onderhouden." },
          ],
          onderscheid: [
            { label: "Protonpompremmers (PPI)", desc: "Irreversibele protonpompblokkade, >90% zuurdaling, voorkeursmiddel bij GERD/PU. Neem 30 min vóór ontbijt.", type: 'ok' },
            { label: "H2-blokkers (famotidine)", desc: "Minder effectief, snelle tachyfylaxie. Bruikbaar bij nachtelijke maagklachten of als PPI niet verdragen wordt.", type: 'warn' },
            { label: "Antacida (aluminiumhydroxide)", desc: "Directe maar kortdurende zuurverzadiging, geen genezing van ulcera — symptoombehandeling alleen.", type: 'warn' },
          ],
          therapie: {
            urgent: "Indicaties: GERD, peptisch ulcus, H. pylori-eradicatie (triple therapy), NSAID-bescherming bij hoog risico, Zollinger-Ellison.",
            stappen: [
              { naam: "Bijwerkingen langdurig gebruik", detail: "verhoogd risico op C. diff, fracturen (verminderde Ca-absorptie), magnesiumbrek, vitamine B12-deficiëntie, interstitiële nefritis." },
            ],
          },
        } },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Bèta-1-selectief middel, verlaagt HF en BD, gebruikt bij hypertensie en hartfalen. Bekende cave: astma. Welk middel is dit?',
    a:['Amlodipine','Metoprolol','Spironolacton','Hydralazine'], c:1,
    ex:'Metoprolol is een cardioselectieve bèta-1-blokker. Bèta-2-blokkade veroorzaakt bronchospasme — gevaarlijk bij astma.',
    wiki:{
          kern: "Bètablokkers blokkeren bèta-adrenerge receptoren. Bèta-1-selectieve middelen (metoprolol, bisoprolol) zijn cardiosaelectief: lagere hartfrequentie + contractiliteit + AV-geleiding, met minimale bèta-2-bijwerkingen.",
          mechanisme: [
            { title: "Bèta-1-blokkade", desc: "Negatief chronotroop (lagere HF) + negatief inotroop (minder contractiekracht) + negatief dromotroop (tragere AV-geleiding)." },
            { title: "Zuurstofverbruik ↓", desc: "Lagere hartfrequentie en contractiliteit verminderen myocardiaal zuurstofverbruik — effectief bij angina en post-MI." },
            { title: "Bij hartfalen", desc: "Paradoxaal effectief ondanks negatieve inotropie — neurohumerale remming verbetert lange-termijn remodelling. Start laag, titreer langzaam." },
          ],
          onderscheid: [
            { label: "Bètablokkers (metoprolol)", desc: "Bèta-1-selectief, negatief chronotroop/inotroop. Cave: astma, AV-blok, PAOD. Nooit abrupt stoppen.", type: 'ok' },
            { label: "Calciumantagonisten non-DHP (verapamil, diltiazem)", desc: "Ook negatief chronotroop maar via L-type Ca²⁺-kanaalremming — niet combineren met bètablokker.", type: 'warn' },
            { label: "Amlodipine (dihydropyridine)", desc: "Alleen vaatverwijdend, geen hartfrequentie-effect — geschikt bij hartfalen + angina.", type: 'warn' },
            { label: "Ivabradin", desc: "Remt alleen de sinusknoop (If-stroom) zonder negatieve inotropie — bruikbaar bij bètablokker-intolerantie of als aanvulling.", type: 'danger' },
          ],
          therapie: {
            urgent: "Indicaties: hypertensie, angina, HFrEF, AF-frequentiecontrole, post-MI.",
            stappen: [
              { naam: "Contra-indicaties", detail: "Ernstig astma, symptomatische bradycardie, AV-blok °II-III, acute decompensatio cordis." },
              { naam: "Afbouwen", detail: "Nooit abrupt stoppen — rebound: tachycardie, angina, hypertensie. Afbouwen over 2-4 weken." },
            ],
          },
        } },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Dit middel remt ACE, verlaagt angiotensine II en aldosteron. Bekende bijwerking: droge hoest. Welk middel is dit?',
    a:['Losartan','Lisinopril','Verapamil','Furosemide'], c:1,
    ex:'Lisinopril = ACE-remmer. Losartan is een ARB (angiotensine-II-receptorblokker) — géén hoest als bijwerking.',
    wiki:{
          kern: "ACE-remmers (lisinopril, enalapril, ramipril) blokkeren het angiotensine-converterend enzym → minder angiotensine II → vaatverwijding + minder aldosteron → bloeddrukdaling. Ze bieden nierbescherming bij diabetes en verminderen mortaliteit bij HFrEF.",
          mechanisme: [
            { title: "ACE-remming", desc: "ACE zet angiotensine I om in angiotensine II én breekt bradykinine af. Blokkade verlaagt angiotensine II (minder vasoconstrictie, minder aldosteron) en stapelt bradykinine op." },
            { title: "Bradykinine → hoest", desc: "Bradykinine-accumulatie stimuleert prostaglandinesynthese en prikkelt hoestrecept in de keel → droge hoest bij 10-15%. Dit is een klasse-bijwerking, geen allergie." },
            { title: "ARBs vs ACE-remmers", desc: "ARBs (losartan, valsartan) blokkeren de AT1-receptor direct — zelfde antihypertensief effect, zelfde nefroprotectie, zonder bradykinine-stapeling → geen hoest." },
          ],
          onderscheid: [
            { label: "ACE-remmers (lisinopril)", desc: "Verlagen angiotensine II + stapelen bradykinine. Cave hoest (10-15%), angio-oedeem, hyperkaliëmie, teratogeen.", type: 'ok' },
            { label: "ARB (losartan, valsartan)", desc: "Zelfde indicaties als ACE-remmer, géén hoest. Keuze bij ACE-remmer-intolerantie.", type: 'warn' },
            { label: "ARNI (sacubitril/valsartan)", desc: "ARB + neprilysineremmer — superieur aan ACE-remmer bij HFrEF (PARADIGM-HF). Vervangt ACE-remmer, nooit combineren.", type: 'danger' },
          ],
          therapie: {
            urgent: "Indicaties: hypertensie, HFrEF, nefroprotectie bij diabetische nefropathie, post-MI.",
            stappen: [
              { naam: "Contra-indicaties", detail: "Zwangerschap (teratogeen!), bilaterale nierarteriestenose, hyperkaliëmie, eerder angio-oedeem bij ACE-remmer." },
              { naam: "Dosisophoging", detail: "Start laag (bijv. lisinopril 2,5 mg), ophogen op geleide van bloeddruk en kreatinine/K⁺." },
            ],
          },
        } },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Antibioticum dat DNA-gyrase remt, werkzaam tegen gramnegatieve bacteriën. Cave: peesontstekingen. Welk antibioticum is dit?',
    a:['Amoxicilline','Doxycycline','Ciprofloxacine','Metronidazol'], c:2,
    ex:'Ciprofloxacine is een fluorochinolon. Bijwerkingen: tendinitis, QTc-verlenging. Cave bij ouderen + corticosteroïden.',
    wiki:{
          kern: "Fluorochinolonen (ciprofloxacine, levofloxacine) remmen DNA-gyrase en topoisomerase IV — enzymen die DNA ontspiraliseren voor replicatie. Breed gramnegatief spectrum. Bactericide. Drie klasse-bijwerkingen om te onthouden: pees, QTc, C. diff.",
          mechanisme: [
            { title: "Tendinitis & peesruptuur", desc: "Verstoring van collageensynthese in peesweefsel, m.n. achillespees. Risico verhoogd bij ouderen, corticosteroïden en nierinsufficiëntie." },
            { title: "QTc-verlenging", desc: "hERG-kanaalremming → verlengde repolarisatie → torsade de pointes risico bij combinatie met andere QTc-verlengende middelen (antipsychotica, antiarritmica)." },
            { title: "C. diff-risico", desc: "Breed spectrum verstoort de darmflora — fluorochinolonen zijn een belangrijke trigger voor Clostridioides difficile-infectie." },
          ],
          onderscheid: [
            { label: "Fluorochinolonen (ciprofloxacine)", desc: "DNA-gyrase-remmer. Breed gramnegatief + atypisch spectrum. Cave: pees, QTc, C. diff, groeiende resistentie.", type: 'ok' },
            { label: "Bètalactams (amoxicilline, cefalosporines)", desc: "Celwandremming via PBP. Geen tendinitis, geen DNA-schade. Eerste keus bij de meeste infecties.", type: 'warn' },
            { label: "Doxycycline", desc: "30S-ribosoomremmer. Ook effectief bij atypische verwekkers (Chlamydia, Mycoplasma). Geen fluorochinolon-bijwerkingen.", type: 'warn' },
          ],
        } },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welk antistollingsmiddel remt vitamine K-afhankelijke stollingsfactoren II, VII, IX en X?',
    a:['Heparine','Warfarine','Rivaroxaban','Dabigatran'], c:1,
    ex:'Warfarine/acenocoumarol remmen de vitamine K-cyclus → verminderde aanmaak stollingsfactoren. INR monitoren.',
    wiki:{
          kern: "VKA (warfarine, acenocoumarol) remmen vitamine K-afhankelijke stollingsfactoren II, VII, IX, X én anticoagulante eiwitten C en S. Werking treedt pas na 3-5 dagen op — bestaande factoren moeten eerst afgebroken worden. Smalle therapeutische marge: INR 2-3.",
          mechanisme: [
            { title: "VKOR-remming", desc: "Vitamine K is nodig voor gamma-carboxylering van stollingsfactoren. VKA blokkeren vitamine K-epoxide-reductase (VKOR) → geoxideerde vitamine K kan niet geregenereerd worden." },
            { title: "Inactieve stollingsfactoren", desc: "Zonder actief vitamine K worden de stollingseiwitten (II, VII, IX, X) aangemaakt als inactieve precursors. Factor VII heeft de kortste halfwaardetijd → INR stijgt het snelst." },
            { title: "INR-monitoring", desc: "INR meet de vertraging in de extrinsieke stollingsroute. Therapeutische INR: 2-3 (meeste indicaties), 2,5-3,5 bij mechanische hartklep." },
          ],
          onderscheid: [
            { label: "VKA (warfarine/acenocoumarol)", desc: "Indirect via VKOR-remming. INR-monitoring vereist. Keuze bij kunstkleppen, mitralisstenose. Talrijke interacties (CYP2C9).", type: 'ok' },
            { label: "Heparine (LMWH/UFH)", desc: "Direct via antitrombine III, parenteraal. Effect direct — voor bridging, acute situaties en tijdens zwangerschap.", type: 'warn' },
            { label: "DOACs (rivaroxaban, apixaban, dabigatran)", desc: "Direct werkend, geen INR-monitoring. Gecontraïndiceerd bij mechanische kunstkleppen en ernstige mitraalklepstenose.", type: 'danger' },
          ],
          therapie: {
            urgent: "Therapeutische INR: 2-3 (meeste indicaties), 2,5-3,5 (mechanische hartklep).",
            stappen: [
              { naam: "Te hoog INR (bloeding)", detail: "Vitamine K po/IV + 4-factoren PCC bij ernstige/levensbedreigende bloeding." },
              { naam: "Te laag INR", detail: "Dosis ophogen, altijd CYP2C9-interacties controleren bij nieuwe medicatie." },
              { naam: "CYP2C9-interacties", detail: "Vele middelen verhogen (antibiotica, azolen) of verlagen (rifampicine, sint-janskruid) de INR — altijd controleren bij nieuwe medicatie." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie',
    q:'Metformine is gecontraïndiceerd bij eGFR < 30 ml/min vanwege het risico op lactaatacidose.',
    c:true, ex:'WAAR. Metformine accumuleert bij nierinsufficiëntie. eGFR 30–45: halveer dosis. eGFR < 30: stop definitief.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie',
    q:'Heparine heeft een direct anticoagulerend effect en kan oraal worden toegediend.',
    c:false, ex:'NIET WAAR. Heparine werkt alleen iv of sc (te grote molecule voor orale absorptie). Effect is direct via antitrombine III.' },

  // ── FARMACOLOGIE — moeilijker ──
  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Patiënt met epilepsie én bipolaire stoornis. Welk antiepilepticum heeft ook een bewezen stemmingsstabiliserende indicatie?',
    a:['Levetiracetam','Valproaat (natriumvalproaat)','Gabapentine','Fenobarbital'], c:1,
    ex:'Valproaat: breed-spectrum antiepilepticum én stemmingsstabilisator bij bipolaire stoornis. CAVE: ernstige teratogeniciteit (neurale-buisdefecten, cognitieve effecten kind) — absoluut gecontraïndiceerd bij zwangerschapswens zonder adequate anticonceptie.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie',
    q:'Statines verlagen uitsluitend LDL-cholesterol en hebben geen effect op triglyceriden of HDL.',
    c:false, ex:'NIET WAAR. Statines verlagen ook matig de triglyceriden (10-30%) en verhogen licht HDL (5-10%). Primair effect is LDL-verlaging (20-60% afhankelijk van statin en dosis), maar het volledige lipidenprofiel verbetert.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'HIV-patiënt start tenofovir/emtricitabine + efavirenz. Na 3 weken: levendige dromen, depressieve stemming, concentratiestoornissen. Meest waarschijnlijke oorzaak?',
    a:['Tenofovir-nefrotoxiciteit','Efavirenz CNS-bijwerkingen','Immuunreconstitutiesyndroom (IRIS)','HIV-encefalopathie'], c:1,
    ex:'Efavirenz (NNRTI): bekende CNS-bijwerkingen eerste weken — levendige dromen, nachtmerries, depressie, duizeligheid. Innemen voor het slapengaan vermindert hinder. Spontane verbetering na 2-4 weken bij de meeste patiënten.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welk mechanisme verklaart de werkzaamheid van methotrexaat bij reumatoïde artritis?',
    a:['COX-2-remming','TNF-α blokkade','DHFR-inhibitie → anti-inflammatoir via adenosine','IL-6 receptorblokkade'], c:2,
    ex:'Methotrexaat remt DHFR (dihydrofolaatreductase) → verminderde purinesynthese → adenosine-accumulatie → anti-inflammatoir effect. Foliumzuursuppletie verlaagt bijwerkingen (mucositis, myelosuppressie) zonder werkzaamheidsverlies.',
    wiki:{
          kern: "Bij RA werkt methotrexaat NIET primair via de folaatroute (zoals bij kanker). Bij lage dosering accumuleert adenosine via AICAR → A2A-receptoractivatie → anti-inflammatoir. MTX is de hoeksteen van RA-behandeling; de meeste biologicals worden eraan toegevoegd.",
          mechanisme: [
            { title: "Hoge dosis (oncologie)", desc: "DHFR-remming → geen purinesynthese → geen DNA-replicatie → celgroei gestopt." },
            { title: "Lage dosis (RA)", desc: "AICAR-accumulatie → adenosine-opstapeling → A2A-receptoractivatie → remming T-celactivatie en pro-inflammatoire cytokineproductie." },
            { title: "Foliumzuur-interactie", desc: "Foliumzuursuppletie (5 mg/week) verlaagt bijwerkingen (mucositis, myelosuppressie, leverfibrose) zonder verlies van werkzaamheid." },
          ],
          onderscheid: [
            { label: "Methotrexaat (MTX)", desc: "Anker-DMARD bij RA. Werking na 6-12 weken. Cave: lever, myelosuppressie, longfibrose, teratogeen. Foliumzuur altijd erbij.", type: 'ok' },
            { label: "TNF-α-blokkers (adalimumab, etanercept)", desc: "Biologicals — sneller effectief, tweede lijn na MTX-falen of gecombineerd met MTX.", type: 'warn' },
            { label: "IL-6-remmer (tocilizumab)", desc: "Effectief bij MTX-falen of als MTX niet verdragen wordt. Geen TNF-α-pathway.", type: 'warn' },
            { label: "Hydroxychloroquine", desc: "Mild DMARD voor vroege of seronegatiefe RA. Minder toxisch maar ook minder krachtig dan MTX.", type: 'danger' },
          ],
        } },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Aminoglycosiden (bijv. gentamicine) werken concentratie-afhankelijk bactericide. Welk doseringsschema benut dit optimaal?',
    a:['Continu infuus voor stabiele spiegel','Eenmaal daags hoge dosis (once-daily)','Vier keer daags lage dosis','Oraal toedienen voor betere resorptie'], c:1,
    ex:'Once-daily aminoglycosiden: hoge Cmax/MIC-ratio → maximale bactericide activiteit + post-antibiotisch effect. Lagere nefroto­xiciteit door recuperatietijd (tubuluscellen). Orale resorptie van aminoglycosiden is verwaarloosbaar.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie',
    q:'Protonpompremmers (PPI\'s) verhogen significant het risico op Clostridioides difficile-infectie.',
    c:true, ex:'WAAR. PPI\'s verhogen de maag-pH → verminderde zuurbarrière → kolonisatie door C. difficile. Meta-analyses: OR ~1.7 voor CDI bij PPI-gebruik. Bijkomende risico\'s langdurig gebruik: hypomagnesemie, pneumonie, osteoporose.' },

  // ── INFECTIOLOGIE ──
  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Jongeman 22j: koorts, extreme vermoeidheid, pharyngitis, cervicale lymfadenopathie, splenomegalie. Monospot positief. Welke diagnose past het best?',
    a:['Streptokokken-angina','CMV-infectie','EBV-mononucleose','HIV primo-infectie'], c:2,
    ex:'EBV-mononucleose: koorts + keelpijn + extreme moeheid + splenomegalie. Cruciaal: geef GEEN amoxicilline — 80% krijgt een gegeneraliseerde huiduitslag (géén echte penicillineallergie!). Vermijd contactsporten 4 weken (miltruptuurrisico).',
    wiki:{
          kern: "EBV infecteert B-lymfocyten via de CD21-receptor. De klachten (koorts, extreme moeheid, pharyngitis, lymfadenopathie) worden NIET door het virus zelf veroorzaakt maar door de massieve CD8+ T-celrespons die de geïnfecteerde B-cellen probeert te elimineren.",
          mechanisme: [
            { title: "Immuunrespons", desc: "Klachten worden veroorzaakt door de massieve CD8+ T-celrespons die geïnfecteerde B-cellen elimineert — niet door het virus zelf." },
            { title: "Splenomegalie", desc: "Lymfocytaire infiltratie van de milt → splenomegalie bij 50-80% → miltruptuurrisico bij contactsporten of trauma (4 weken vermijden)." },
            { title: "Diagnostiek", desc: "Monospot detecteert heterofiele IgM-antistoffen (kruisreactie met schaapseritrocyten). Cave: false-negatief in eerste week en bij jonge kinderen." },
            { title: "Cave amoxicilline", desc: "Amoxicilline bij actieve EBV geeft bij ~80% een gegeneraliseerde huiduitslag — immuungemedieerd, geen echte penicilline-allergie!" },
          ],
          onderscheid: [
            { label: "EBV-mononucleose", desc: "Monospot positief, extreme vermoeidheid, pharyngitis, splenomegalie. Geef geen amoxicilline! Contactsporten 4 weken vermijden.", type: 'ok' },
            { label: "CMV-mononucleose", desc: "Monospot negatief, mildere keelklachten, meer leverstoornissen. CMV-PCR/antistoffen diagnostisch.", type: 'warn' },
            { label: "HIV primo-infectie", desc: "Ook mononucleose-achtig + huiduitslag, hoog viraal HIV RNA, monospot negatief — altijd overwegen.", type: 'warn' },
            { label: "Streptokokkenangina", desc: "Geen splenomegalie, monospot negatief, GABHS-kweek positief — antibiotica wél geïndiceerd.", type: 'danger' },
          ],
        } },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Terugkerende van Azië: cyclische koorts elke 48 uur, rillingen, zweetstuipen. Dik-druppelpreparaat positief. Welke diagnose past het best?',
    a:['Tyfus','Malaria','Dengue','Leishmaniasis'], c:1,
    ex:'Malaria: cyclische koorts na tropenreis → altijd uitsluiten, ook bij profylaxegebruik. P. falciparum mist de vaste cyclus maar is dodelijkst (hersenmalaria, ARDS). Dik-druppelpreparaat is goudstandaard. Behandeling: artemisinine-combinatietherapie.',
    wiki:{
          kern: "Malaria wordt veroorzaakt door Plasmodium-parasieten, overgebracht via de Anopheles-mug. Vijf species: P. falciparum (meest dodelijk), P. vivax, P. ovale, P. malariae, P. knowlesi.",
          mechanisme: [
            { title: "Mugbeet", desc: "Anopheles-mug injecteert sporozoïeten in de bloedbaan van de gastheer." },
            { title: "Leverfase", desc: "Sporozoïeten bereiken de lever → asymptomatische replicatie in hepatocyten (1-2 weken, exo-erythrocytaire fase)." },
            { title: "Bloedstroom", desc: "Merozieten vrijgekomen uit hepatocyten → infecteren rode bloedcellen (erythrocytaire fase → koorts en symptomen)." },
            { title: "Cyclische ruptuur", desc: "Gesynchroniseerde ruptuur van geïnfecteerde erytrocyten → koortspiek. P. falciparum: kleverige cellen → microangiopathie en hersenmalaria." },
          ],
          onderscheid: [
            { label: "Malaria", desc: "Cyclische koorts, rillingen, zweetstuipen na tropenreis. Dik-druppelpreparaat goudstandaard. P. falciparum meest dodelijk.", type: 'ok' },
            { label: "Dengue", desc: "Hevige spier/gewrichtspijn ('breakbone fever'), huiduitslag, lage trombocyten, geen cyclisch patroon. NS1-antigeen diagnostisch.", type: 'warn' },
            { label: "Typhoid", desc: "Aanhoudende koorts (geen cyclisch patroon), buikpijn, relatieve bradycardie. Bloedkweek diagnostisch.", type: 'warn' },
            { label: "Leptospirose", desc: "Watercontact, conjunctivale hyperemie, spierklachten — Weil-ziekte bij ernstige vorm.", type: 'danger' },
          ],
          therapie: {
            urgent: "P. falciparum: artemisinine-combinatietherapie (bijv. artemether-lumefantrine).",
            stappen: [
              { naam: "Ernstige malaria", detail: "IV artesunaat bij bewustzijnsdaling, ernstige anemie of orgaanfalen." },
              { naam: "P. vivax/ovale", detail: "Chloroquine + primaquine om levervormen te elimineren (cave G6PD-deficiëntie vóór start)." },
              { naam: "Profylaxe", detail: "Standaard profylaxe afhankelijk van bestemming en resistentiepatroon: atovaquon-proguanil, mefloquine of doxycycline." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'Amoxicilline is de eerste keuze bij een ongecompliceerde urineweginfectie bij een jonge vrouw in Nederland.',
    c:false, ex:'NIET WAAR. Nitrofurantoïne of fosfomycine zijn eerste keuze vanwege hoge resistentie tegen amoxicilline bij E. coli.' },

  // ── CARDIOLOGIE — moeilijker ──
  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 72j, 2u na succesvolle PCI voor inferieur STEMI: plots bradycardie 38/min, hypotensie 80/50, verhoogde CVD, heldere longen. Meest waarschijnlijke oorzaak?',
    a:['Cardiogene shock','Rechterventrikeli­nfarct','Papillairspierruptuur','Ventrikelseptumruptuur'], c:1,
    ex:'RV-infarct bij inferieur MI (RCA-occlusie): triade hypotensie + hoge CVD + heldere longen. CAVE: nitraten en diuretica zijn gecontraïndiceerd — preload is essentieel! Volumebelasting is eerste stap.',
    wiki:{
      kern: 'Rechterventrikelinfarct (RVI) treedt op bij 30–50% van inferieure MI\'s door proximale RCA-occlusie. Het RV faalt als pomp → hoge CVD maar heldere longen — de klassieke valkuil die nitraten en diuretica verbiedt.',
      redflag: 'Nitraten en diuretica zijn absoluut gecontraïndiceerd bij RVI — ze verminderen de preload en verergeren de shock onmiddellijk.',
      mechanisme: [
        { title: 'RCA-occlusie', desc: 'Proximale RCA verzorgt het RV-myocard — afsluiting geeft direct RV-dysfunctie.' },
        { title: 'RV-pompfalen', desc: 'RV contraheert onvoldoende → terugstuwing → hoge CVD, gestuwd halsvenen.' },
        { title: 'LV ondervulling', desc: 'RV pompt te weinig bloed naar LV (preload-afhankelijkheid) → lage cardiac output → hypotensie.' },
        { title: 'Heldere longen', desc: 'LV zelf is intact — geen longoedeem. Combinatie van hypotensie + hoge CVD + heldere longen = RVI tot bewijs van het tegendeel.' },
      ],
      onderscheid: [
        { label: 'RV-infarct', desc: 'Hypotensie + verhoogde CVD + heldere longen na inferieur STEMI. V4R: ST-elevatie.', type: 'ok' },
        { label: 'LV-infarct/cardiogene shock', desc: 'Hypotensie maar ook longoedeem en crepitaties — LV is het probleem.', type: 'warn' },
        { label: 'Harttamponade', desc: 'Ook hypotensie + hoge CVD maar gedempte harttonen, echo bewijzend. Geen MI-ECG.', type: 'danger' },
        { label: 'Longembolie', desc: 'Hoge CVD maar pleuritische pijn, geen ST-elevatie in V4R, D-dimeer verhoogd.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Volumebelasting: NaCl 0,9% IV 500 ml bolus — het RV heeft preload nodig om te pompen.',
        stappen: [
          { naam: 'Urgente PCI', detail: 'Recanalisatie van de RCA is de definitieve behandeling — hoe sneller, hoe beter RV-herstel.' },
          { naam: 'Noradrenaline', detail: 'Bij refractaire shock na volumebelasting — onderhoudt coronaire perfusiedruk.' },
          { naam: 'ECG-diagnostiek', detail: 'Altijd V4R afnemen bij inferieur MI — ST-elevatie ≥1 mm bevestigt RVI.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 55j, exertionele dyspneu, ECHO: EF 65%, verhoogde vullingsdrukken, geen klepafwijkingen. Diagnose?',
    a:['Hartfalen met gereduceerde EF (HFrEF)','Hartfalen met behouden EF (HFpEF)','Pulmonale hypertensie','Hypertrofische cardiomyopathie'], c:1,
    ex:'HFpEF: het hart pompt goed (EF ≥50%) maar vult slecht — diastolische dysfunctie. Onderscheid van HFrEF uitsluitend via echo. SGLT2-remmers (dapagliflozine) recent bewezen effectief; ACE-remmer/bètablokker verminderen mortaliteit hier niet.',
    wiki:{
      kern: 'HFpEF: het hart pompt normaal (EF ≥50%) maar vult slecht door een stijve, niet-ontspannende LV. Het probleem zit in de diastole, niet in de systole.',
      redflag: 'ACE-remmers en bètablokkers verminderen mortaliteit bij HFrEF maar NIET bij HFpEF — onderscheid is klinisch cruciaal.',
      mechanisme: [
        { title: 'Diastolische dysfunctie', desc: 'LV-relaxatie vertraagt → vulling kost meer druk → verhoogde E/e\' op echo (>14 = diagnostisch).' },
        { title: 'LV-hypertrofie', desc: 'Chronische hypertensie → conccentrische hypertrofie → stijvere ventrikelwand.' },
        { title: 'Verhoogde vullingsdruk', desc: 'Hoge LVEDP stuwt terug naar linkeratrium en longen → dyspneu bij inspanning, orthopneu.' },
        { title: 'EF bewaard', desc: 'Contractie intact — EF ≥50%. Onderscheid van HFrEF uitsluitend via echocardiografie.' },
      ],
      onderscheid: [
        { label: 'HFpEF (EF ≥50%)', desc: 'Diastolische dysfunctie, stijve LV, normale contractie. SGLT2-remmers tonen voordeel.', type: 'ok' },
        { label: 'HFrEF (EF <40%)', desc: 'Systolische dysfunctie — bewezen mortaliteitsreductie met ACE-i + bètablokker + MRA + SGLT2i.', type: 'warn' },
        { label: 'Pulmonale hypertensie', desc: 'RV-overbelasting, P pulmonale op ECG, geen LV-hypertrofie. Echo onderscheidt.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Diuretica voor symptoomverlichting (oedeem, dyspneu) — verlichten klachten maar verlengen leven niet.',
        stappen: [
          { naam: 'SGLT2-remmer', detail: 'Dapagliflozine of empagliflozine — als eerste bewezen middelen met mortaliteitsvoordeel bij HFpEF.' },
          { naam: 'Risicofactoren', detail: 'Hypertensie, DM en obesitas agressief behandelen — dit zijn de oorzaken van HFpEF.' },
          { naam: 'Geen bètablokker/ACE-i', detail: 'Geen bewezen mortaliteitsreductie bij HFpEF — niet standaard toevoegen.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 26j, atleet: syncope tijdens inspanning, positieve familiegeschiedenis plotse hartdood. ECHO: asymmetrische septumhypertrofie 22mm, SAM van mitraalklep. Diagnose?',
    a:['Aortaklepstenose','Hypertrofische obstructieve cardiomyopathie (HOCM)','Dilatatieve cardiomyopathie','Longembolie'], c:1,
    ex:'HOCM: septumhypertrofie + SAM (systolic anterior motion) mitraalklep → dynamische LVOT-obstructie. Belangrijkste oorzaak van plotse hartdood bij jonge atleten. ICD-indicatie bij hoog-risico profiel. Sportontheffing verplicht.',
    wiki:{
      kern: 'HOCM is een autosomaal-dominante sarcomeer-mutatie die asymmetrische septumhypertrofie veroorzaakt. Het is de meest voorkomende oorzaak van plotse hartdood bij jongeren en atleten.',
      redflag: 'Het geruis van HOCM neemt tóé bij Valsalva (minder vulling → meer obstructie) — dit is het tegenovergestelde van aortastenose.',
      mechanisme: [
        { title: 'Septumhypertrofie', desc: 'Verdikt IVS obstrueert de LVOT tijdens de systole → uitstromingsgradient.' },
        { title: 'SAM (systolic anterior motion)', desc: 'Mitraalklep beweegt mee naar voren door Venturi-effect → verergert LVOT-obstructie + mitralisinsufficiëntie.' },
        { title: 'Dynamische obstructie', desc: 'Toeneemt bij ↓ preload (staan, Valsalva, dehydratie) en ↓ afterload; vermindert bij ↑ preload (hurken).' },
        { title: 'Ritmestoornissen', desc: 'Hypertrofisch myocard is aritmogeen → VT/VF → syncope of plotse hartdood, ook bij jonge atleten.' },
      ],
      onderscheid: [
        { label: 'HOCM', desc: 'Geruis neemt toe bij Valsalva/staan; asyncmetrische septumhypertrofie op echo; familieanamnese.', type: 'ok' },
        { label: 'Aortastenose', desc: 'Geruis neemt áf bij Valsalva (vaste mechanische obstructie). Calcificatie op echo.', type: 'danger' },
        { label: 'WPW-syndroom', desc: 'Ook syncope bij jongeren maar delta-golf en korte PR op ECG — geen echo-afwijking.', type: 'warn' },
        { label: 'Dilatatieve CMP', desc: 'Verwijde LV met lage EF — tegenovergesteld van HOCM.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Bètablokker of verapamil — verlagen hartfrequentie → langere vultijd → minder LVOT-gradient.',
        stappen: [
          { naam: 'ICD-indicatie', detail: 'Bij ≥1 risicofactor: familielid met plotse hartdood, onverklaarde syncope, NSVT, septum ≥30mm, hypotensie bij inspanning.' },
          { naam: 'Sportontheffing', detail: 'Competitief sporten verboden — inspanning verhoogt LVOT-gradient en aritmierisico.' },
          { naam: 'Septumreductie', detail: 'Chirurgische myectomie of alcohol-ablatie bij refractaire LVOT-obstructie (gradient >50 mmHg).' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Hypokaliëmie (K⁺ < 3.5) is een onafhankelijke risicofactor voor ventrikelfibrilleren bij een acuut myocardinfarct.',
    c:true, ex:'WAAR. Hypokaliëmie verlaagt de drempelwaarde voor ventriculaire aritmieën, met name bij ischemie. Target K⁺ ≥ 4.0 mmol/L bij ACS is aanbevolen. Actieve suppletie is onderdeel van standaardzorg op de CCU.',
    wiki:{
      kern: 'Kalium is cruciaal voor de rustmembraanpotentiaal van cardiomyocyten. Hypokaliëmie verhoogt de automaticiteit en verlengt de repolarisatie → aritmiedrempel verlaagd, met name in ischemisch myocard.',
      redflag: 'Op de CCU geldt: K⁺ ≥4,0 mmol/L en Mg²⁺ ≥0,8 mmol/L als target — lager dan dit verdubbelt het aritmierisico bij ACS.',
      mechanisme: [
        { title: 'Rustmembraanpotentiaal', desc: 'Lager extracellulair K⁺ → grotere K⁺-gradiënt → membraanpotentiaal meer negatief → cel is hyperexcitabel.' },
        { title: 'Verlengde repolarisatie', desc: 'K⁺-kanalen werken minder effectief → langzamere repolarisatie → QTc-verlenging → risico torsades de pointes.' },
        { title: 'Ischemische synergisme', desc: 'Ischemisch myocard verliest al K⁺ via ATP-gevoelige K⁺-kanalen → combinatie met hypokaliëmie geeft gevaarlijk lage drempelwaarde voor VF.' },
      ],
      onderscheid: [
        { label: 'Hypokaliëmie (K⁺ <3,5)', desc: 'Afgeplatte T-golf, U-golf prominent, QTc verlengd → risico torsades. Oorzaken: diuretica, braken, diarree, hyperaldosteronisme.', type: 'ok' },
        { label: 'Hyperkaliëmie (K⁺ >5,5)', desc: 'Piekende T-golven, breed QRS, sinusgolfpatroon bij K⁺ >7 → VF-risico door andere route. Behandel met calcium, glucose+insuline, bicarbonaat.', type: 'danger' },
        { label: 'Hypomagnesiëmie', desc: 'Versterkt hypokaliëmie (Mg²⁺-tekort maakt K⁺-suppletie refractair) — altijd samen suppleren.', type: 'warn' },
      ],
      therapie: {
        urgent: 'K⁺ oraal/IV suppletie bij K⁺ <3,5. Op CCU: IV KCl als K⁺ <3,0 of ECG-afwijkingen.',
        stappen: [
          { naam: 'Target CCU', detail: 'K⁺ ≥4,0 mmol/L + Mg²⁺ ≥0,8 mmol/L — controleer 1-2× per dag bij ACS-patiënten.' },
          { naam: 'Maximale infusiesnelheid', detail: 'Perifeer: max 10-20 mmol/u. Centraal: max 40 mmol/u onder ECG-bewaking.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Patiënt met hartfalen EF 30%, intolerantie voor ACE-remmer wegens angiooedeem. Beste alternatief?',
    a:['Verapamil','ARB (bijv. valsartan)','Amlodipine hoge dosis','Diltiazem'], c:1,
    ex:'ARB veroorzaakt geen angiooedeem — bradykinine-pathway niet betrokken. Verapamil en diltiazem zijn negatief inotroop en gecontraïndiceerd bij lage EF. Hydralazine + nitraat is tweede keuze bij ARB-intolerantie.',
    wiki:{
      kern: 'Angiooedeem bij ACE-remmers is een klasse-effect via bradykinineaccumulatie — niet via allergisch mechanisme. ARBs blokkeren de AT1-receptor direct en beïnvloeden bradykinine niet → géén angiooedeem.',
      redflag: 'Verapamil en diltiazem zijn absoluut gecontraïndiceerd bij HFrEF — het negatief inotroop effect verlaagt de toch al lage EF verder en verergert hartfalen.',
      mechanisme: [
        { title: 'ACE-remmer angiooedeem', desc: 'ACE breekt bradykinine af. Remming → bradykinine stapelt op → activatie bradykinine B2-receptoren → vasodilatatie en oedeem van huid/mucosa. Niet IgE-gemedieerd — antihistaminica helpen niet.' },
        { title: 'ARB-mechanisme', desc: 'ARBs blokkeren de angiotensine II type-1 receptor (AT1) direct. ACE wordt niet geremd → bradykinine-spiegel normaal → geen angiooedeem (incidentie <0,1% vs 0,1-0,7% bij ACE-i).' },
        { title: 'Alternatief bij ARB-intolerantie', desc: 'Hydralazine (arterieel vasodilatans) + isosorbidedinitraat (veneus) — bewezen alternatief bij AfroAmerikanen en bij zowel ACE-i- als ARB-intolerantie (A-HeFT-trial).' },
      ],
      onderscheid: [
        { label: 'ARB (valsartan, candesartan)', desc: 'Zelfde RAAS-blokkade als ACE-remmer, zonder bradykinine-effect. Gelijke nefroprotectie en mortaliteitsreductie bij HFrEF. Eerstekeus bij ACE-remmer-intolerantie.', type: 'ok' },
        { label: 'ARNI (sacubitril/valsartan)', desc: 'Superieur aan ACE-remmer/ARB bij stabiel HFrEF (PARADIGM-HF) — maar bij angiooedeem-voorgeschiedenis: terughoudend (sacubitril verhoogt bradykinine).', type: 'warn' },
        { label: 'Verapamil/diltiazem', desc: 'Non-DHP calciumantagonisten: negatief inotroop én chronotroop → gecontraïndiceerd bij HFrEF. Enige uitzondering: amlodipine (DHP, geen negatief inotroop effect) is veilig.', type: 'danger' },
      ],
      therapie: {
        urgent: 'ACE-remmer direct stoppen bij angiooedeem. Vervang door ARB na herstel (wacht minimaal 4-6 weken).',
        stappen: [
          { naam: 'ARB dosering', detail: 'Start laag, titreer omhoog: valsartan 40 mg 2dd → doel 160 mg 2dd (CHARM-trial-dosis).' },
          { naam: 'ARNI overwegen', detail: 'Sacubitril/valsartan als volgende stap bij stabiele patiënt na minimaal 36u ACE-remmer-vrije periode.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Een eerstegraads AV-blok (PR-interval > 200ms) bij een asymptomatische patiënt vereist altijd een pacemaker.',
    c:false, ex:'NIET WAAR. Eerstegraads AV-blok bij asymptomatische patiënt: geen behandeling nodig, alleen observatie. Pacemaker is geïndiceerd bij symptomatisch tweedegraads Mobitz II of derdegraads AV-blok.',
    wiki:{
      kern: 'Eerstegraads AV-blok = PR >200 ms maar elke P-golf geleidt naar een QRS. Het is een vertraging in de AV-knoop, geen blokkade — alle atriale prikkels bereiken de ventrikels.',
      mechanisme: [
        { title: 'Vertraagde AV-knoopgeleiding', desc: 'Elke atriale prikkel bereikt de ventrikels maar trager. Oorzaken: vagale hypertonus (atleten), ischemie inferieure wand, digoxine, bètablokker, calcium-antagonist.' },
        { title: 'Geen hemodynamische consequentie', desc: 'Alle prikkels bereiken de ventrikels → normale hartfrequentie en cardiac output → asymptomatisch. Alleen observatie nodig.' },
      ],
      onderscheid: [
        { label: '1e graads AV-blok', desc: 'PR >200 ms, elke P→QRS. Asymptomatisch, geen behandeling. Kan progresseren naar 2e graads bij bepaalde oorzaken.', type: 'ok' },
        { label: '2e graads Mobitz II', desc: 'Constant PR maar plotse QRS-uitval — His-bundelschade → risico op totaal blok → urgente pacemaker-evaluatie.', type: 'danger' },
        { label: '3e graads (totaal) AV-blok', desc: 'P en QRS volledig ontkoppeld — altijd urgente pacemaker nodig, ongeacht symptomen.', type: 'danger' },
        { label: 'Wenckebach (Mobitz I)', desc: 'Progressief langer PR tot QRS-uitval → reset. Benigne, AV-knoop-niveau, geen pacemaker nodig tenzij symptomatisch.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Eerstegraads AV-blok: geen behandeling. Zoek onderliggende oorzaak (medicatie, ischemie).',
        stappen: [
          { naam: 'Stop culprit-medicatie', detail: 'Digoxine, bètablokker of non-DHP calciumantagonist als oorzaak → staken of dosisreductie.' },
          { naam: 'Follow-up', detail: 'Jaarlijkse controle bij persisterende 1e graads blok — progress naar hogere graad is zeldzaam maar mogelijk.' },
        ],
      },
    } },

  // ── INFECTIOLOGIE — moeilijker ──
  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'HIV-patiënt, CD4 45/µL:\nKoorts, droge hoest, dyspneu bij inspanning\nLDH 520 U/L\nBilaterale interstitiële infiltraten\nMeest waarschijnlijke verwekker?',
    a:['Mycobacterium tuberculosis','Pneumocystis jirovecii (PCP)','CMV-pneumonitis','Aspergillus fumigatus'], c:1,
    ex:'PCP bij CD4 <200/µL: insidieuze presentatie, droge hoest, hoog LDH, bilaterale "ground glass" infiltraten. Behandeling: TMP-SMX hoge dosis (3 weken). Profylaxe verplicht bij CD4 <200. Corticosteroïden toevoegen bij ernstige hypoxemie.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Patiënt: HBsAg positief, anti-HBc IgM positief, anti-HBs negatief, HBeAg positief. Interpretatie?',
    a:['Chronische HBV-infectie','Acuut hepatitis B, hoog infectieus','Herstel van HBV (immuniteit)','Vaccinatie-immuniteit'], c:1,
    ex:'Acuut HBV: HBsAg+ en anti-HBc IgM+ (verse infectie). HBeAg+ duidt op actieve virusreplicatie, hoog infectieus. Anti-HBs positief = herstel of vaccinatie. Chronisch HBV: HBsAg >6 maanden, IgM anti-HBc negatief.',
    wiki:{
          kern: "HBV-serologie lezen: HBsAg = virus aanwezig. Anti-HBc IgM = verse infectie.",
          mechanisme: [
            { title: "Vroege infectie", desc: "Na besmetting verschijnt HBsAg als eerste marker (na 2-10 weken). IgM anti-HBc volgt — bewijst een verse infectie." },
            { title: "Actieve replicatie", desc: "HBeAg-positiviteit duidt op hoge virale load en hoog infectiviteitsrisico. Klachten: icterus, vermoeidheid, anorexie." },
            { title: "Herstel & chroniciteit", desc: "Herstel: HBsAg verdwijnt → anti-HBs verschijnt (window-periode: beiden negatief). Chronisch: HBsAg >6 maanden, IgM anti-HBc verdwenen. Vaccinatie: alleen anti-HBs+, nooit anti-HBc." },
          ],
          onderscheid: [
            { label: "Acuut HBV (hoog infectieus)", desc: "HBsAg+ + anti-HBc IgM+ + HBeAg+ = verse infectie met actieve replicatie. Hoog besmettingsrisico.", type: 'ok' },
            { label: "Chronische HBV", desc: "HBsAg >6 maanden, anti-HBc IgG (geen IgM) — controleer ALAT + HBV-DNA om behandelnoodzaak te bepalen.", type: 'warn' },
            { label: "Immunotolerant", desc: "Hoog HBV-DNA, normaal ALAT — nog geen behandeling maar wel follow-up.", type: 'warn' },
            { label: "Actieve chronische hepatitis", desc: "Verhoogd ALAT + hoog HBV-DNA → antivirale therapie (tenofovir of entecavir).", type: 'danger' },
          ],
        } },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'MRSA-resistentie berust op het mecA-gen, dat codeert voor PBP2a — een transpeptidase met lage affiniteit voor alle bèta-lactam-antibiotica.',
    c:true, ex:'WAAR. PBP2a bindt bèta-lactams niet effectief → celwandsynthese gaat gewoon door → resistentie. Behandeling: vancomycine, linezolid of daptomycine. MRSA-diagnostiek via PCR (mecA) of fenotypische gevoeligheidstesten.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Man 40j, sub-Saharaans Afrika: malaria ondanks chloroquine-profylaxe. Meest resistente Plasmodium-species?',
    a:['P. vivax','P. falciparum','P. ovale','P. malariae'], c:1,
    ex:'P. falciparum: verantwoordelijk voor >90% van malaria-mortaliteit. Wijdverspreide chloroquineresistentie in sub-Saharaans Afrika. Correcte profylaxe: atovaquon-proguanil of mefloquine. Falciparum kan cerebrale malaria geven — snel behandelen.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Na 7 dagen amoxicilline-clavulaanzuur: waterige diarree 8×/dag, koorts, buikkrampen, leukocyten in feces. Toxinetest positief. Diagnose?',
    a:['Salmonella-enteritis','Clostridioides difficile-infectie (CDI)','Virale gastro-enteritis','Campylobacter jejuni'], c:1,
    ex:'CDI: typisch na (brede-spectrum) antibiotica. Toxine A/B diagnostisch. Eerste episode: orale vancomycine of fidaxomicine (niet meer metronidazol als eerste keuze). CAVE: geen loperamide — risico toxisch megacolon.',
    wiki:{
          kern: "Clostridioides difficile (C. diff) is een sporevormende bacterie die de dikke darm koloniseert wanneer de normale darmflora verstoord is — klassiek na antibiotica. Toxinen A en B beschadigen het colonepitheel → pseudomembraneuze colitis met waterige diarree, krampen, koorts.",
          mechanisme: [
            { title: "Flora-disruptie", desc: "Antibiotica (met name clindamycine, cefalosporines, fluorochinolonen) ruimen commensale flora op. C. diff-sporen overleven en kiemen uit." },
            { title: "Toxineproductie", desc: "Vegetatieve C. diff-vormen produceren toxinen A en B — beschadigen colonepitheel en induceren een inflammatoire respons." },
            { title: "Pseudomembraneuze colitis", desc: "Epitheel­beschadiging → waterige diarree, krampen, koorts, leukocytose. Ernstige gevallen: toxisch megacolon." },
            { title: "Infectiebeheersing", desc: "Sporen zijn resistent tegen alcohol-handenreiniger → zeep en water verplicht bij CDI-patiënten!" },
          ],
          onderscheid: [
            { label: "Clostridioides difficile-infectie (CDI)", desc: "Na antibiotica: waterige diarree + koorts + leukocyten in feces. Toxine A/B positief. Behandeling: vancomycine of fidaxomicine.", type: 'ok' },
            { label: "Non-CDI antibiotica-diarree", desc: "Geen toxinen aanwezig, minder ernstig, stopt bij stoppen antibioticum.", type: 'warn' },
            { label: "IBD-exacerbatie", desc: "Geen duidelijke AB-anamnese, chronisch beloop, colonoscopie diagnostisch.", type: 'warn' },
            { label: "Ischemische colitis", desc: "Ouderen, plots begin, bloed in feces, vasculaire risicofactoren — geen AB-anamnese.", type: 'danger' },
          ],
          therapie: {
            urgent: "Stop het triggerende antibioticum direct.",
            stappen: [
              { naam: "Eerste episode", detail: "Vancomycine 125 mg 4x/dag PO 10 dagen OF fidaxomicine — beide superieur aan metronidazol." },
              { naam: "Geen metronidazol", detail: "Niet meer als eerste keuze voor CDI — vancomycine of fidaxomicine zijn effectiever." },
              { naam: "Geen loperamide", detail: "Gecontraïndiceerd bij CDI — onderdrukt darmmotiliteit → risico op toxisch megacolon." },
              { naam: "Recidief", detail: "Verlengd fidaxomicine-schema of fecestransplantatie (FMT) bij multipele recidieven." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Tiener met mononucleose-achtig beeld krijgt amoxicilline. Volgende dag: uitgebreid maculopapuleus exantheem over het hele lichaam. Betekenis?',
    a:['Bewezen penicilline-allergie','Amoxicilline-exantheem bij EBV — geen echte allergie','Serum-ziekte','Stevens-Johnson syndroom'], c:1,
    ex:'Amoxicilline bij actieve EBV: ~80% kans op gegeneraliseerd exantheem — immuungemedieerd, GEEN IgE-allergie. Patiënt hoeft penicilline in de toekomst niet te vermijden. Documenteer correct zodat onterechte allergie-label vermeden wordt.' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'Rifampicine is een krachtige CYP3A4-inductor en kan de werkzaamheid van orale anticonceptiva significant verminderen.',
    c:true, ex:'WAAR. Rifampicine induceert sterk CYP3A4 → versneld metabolisme van ethinylestradiol → verminderde anticonceptieve bescherming. Extra anticonceptiemethode verplicht tijdens én minimaal 4 weken na het stoppen van rifampicine.' },

  // ── LABORATORIUM ──
  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'K⁺ 6.8, ECG: piekende T-toppen, verlengd PR. Eerste behandelstap?',
    a:['Furosemide iv','Calcium gluconaat iv','Kayexalaat oraal','Hemodialyse'], c:1,
    ex:'Bij ernstige hyperkaliëmie met ECG-veranderingen: eerst calcium gluconaat voor cardioprotectie. Daarna K⁺ actief verlagen.',
    wiki:{
          kern: "Hyperkaliëmie (K⁺ >5,5 mmol/L) verstoort de rustmembraanpotentiaal van hartcellen → verhoogd risico op levensbedreigende aritmieën. ECG-progressie: puntige T-toppen → verbreed PR → breed QRS → sinusgolf → ventrikelfibrilleren.",
          mechanisme: [
            { title: "Oorzaken", desc: "Nierinsufficiëntie (meest voorkomend), ACE-remmers/ARBs, kaliumsparende diuretica, bijnierinsufficiëntie, weefselafbraak (rabdomyolyse, TLS)." },
            { title: "Acidose-effect", desc: "Acidose verschuift K⁺ van intracellulaire naar extracellulaire ruimte (per 0,1 pH-daling: K⁺ stijgt ~0,5 mmol/L)." },
          ],
          onderscheid: [
            { label: "Echte hyperkaliëmie met ECG-veranderingen", desc: "K⁺ >6 + piekende T-toppen, breed QRS → onmiddellijk behandelen: calcium gluconaat + K⁺-verlaging.", type: 'ok' },
            { label: "Pseudohyperkaliëmie", desc: "Hemolyse in het bloedbuisje geeft foutief verhoogd K⁺ — ECG normaal. Altijd herhalen bij twijfel.", type: 'warn' },
            { label: "Asymptomatische hyperkaliëmie", desc: "K⁺ verhoogd zonder ECG-veranderingen — minder acuut maar vraagt monitoring en behandeling van de oorzaak.", type: 'warn' },
          ],
          therapie: {
            urgent: "Calcium gluconaat IV — membraanstabilisatie, werkt in 1-3 min.",
            stappen: [
              { naam: "Glucose + insuline", detail: "IV glucose + insuline → K⁺ verschuift naar intracellulaire ruimte (werkt in 15-30 min)." },
              { naam: "Salbutamol", detail: "Vernevelaar (bèta-2-stimulatie) → additionele K⁺-shift naar cellen." },
              { naam: "Bicarbonaat", detail: "Natriumbicarbonaat bij metabole acidose — correctie verschuift K⁺ intracellulair." },
              { naam: "Definitief", detail: "Resonium, kayexalaat of hemodialyse voor definitieve K⁺-verwijdering." },
            ],
          },
        } },

  // ── LABORATORIUM — moeilijker ──
  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'ABG:\npH 7.49\npCO₂ 30 mmHg\nHCO₃⁻ 22 mmol/L\npO₂ 98 mmHg\nJuiste interpretatie?',
    a:['Metabole alkalose met respiratoire compensatie','Respiratoire alkalose met renale compensatie','Gemengde alkalose','Metabole acidose met overcompensatie'], c:1,
    ex:'pH hoog + laag pCO₂ = respiratoire alkalose. HCO₃ licht gedaald = renale compensatie (verwacht: 24 − 0.5×ΔpCO₂ acuut). Oorzaken: hyperventilatie, sepsis (vroeg), zwangerschap, longembolie, salicylaatintoxicatie.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Microcytaire anemie:\nFerritine 6 µg/L\nTransferrinesaturatie 5%\nSerum-ijzer 5 µmol/L\nReticulocyten laag\nDiagnose?',
    a:['β-thalassemie minor','Anemie van chronische ziekte','IJzergebreksanemie','Sideroblastische anemie'], c:2,
    ex:'IJzergebreksanemie: ferritine laag (<12), transferrinesaturatie <16%, serum-ijzer laag. Ferritine is acuut-fase-eiwit — bij ontsteking kan het vals-normaal zijn. Onderscheid van chronische anemie: bij chronische anemie is ferritine normaal/hoog.',
    wiki:{
          kern: "IJzergebreksanemie is de meest voorkomende anemie wereldwijd. IJzer is nodig voor hemoglobiinesynthese.",
          mechanisme: [
            { title: "Stap 1", desc: "IJzer wordt opgenomen in de dunne darm (als Fe²⁺, bevorderd door vitamine C)." },
            { title: "Oorzaken tekort", desc: "te weinig inname (veganisten, ondervoeding), malabsorptie (coeliakie, IBD, gastrectomie), verhoogd verlies (menstruatie, GI-bloeding)." },
            { title: "Stap 3", desc: "Ferritine is de opslagvorm — als eerst uitgeput." },
          ],
          onderscheid: [
            { label: "Anemie van chronische ziekte (ACD)", desc: "ferritine normaal/hoog, serum-ijzer laag, transferrine laag — ijzer opgesloten in macrofagen door ontsteking.", type: 'ok' },
            { label: "Thalassemie", desc: "microcytair maar ferritine/serum-ijzer normaal, Hb-elektroforese afwijkend.", type: 'warn' },
            { label: "Sideroblastische anemie", desc: "ringed sideroblasts op beenmerg.", type: 'danger' },
          ],
          therapie: {
            urgent: "Oorzaak behandelen (GI-bloeding? coeliakie?).",
            stappen: [
              { naam: "Stap 1", detail: "Ferrosulfaat oraal 200 mg/dag (of ferrofumaraat) — 3-6 maanden voor vullen van ijzervoorraden." },
              { naam: "Stap 2", detail: "IV ijzer (ferric carboxymaltose) bij malabsorptie, onverdraagzaamheid of spoedsituatie." },
              { naam: "Stap 3", detail: "Reticulocyten stijgen na 5-7 dagen als eerste teken van respons." },
            ],
          },
        } },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Patient op acenocoumarol: INR 3.8, APTT normaal. Welke stollingsfactor is NIET aangetast?',
    a:['Factor II (protrombine)','Factor VII','Factor VIII','Factor X'], c:2,
    ex:'Vitamine K-antagonisten remmen factoren II, VII, IX en X (vitamine K-afhankelijk). Factor VIII is vitamine K-onafhankelijk. PT/INR reflecteert factor VII (kortste halfwaardetijd). APTT normaal bevestigt: intrinsieke route intact.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Na chemotherapie:\nK⁺ 6.4 mmol/L\nFosfaat 3.2 mmol/L\nUraat 870 µmol/L\nCalcium 1.6 mmol/L\nLDH 2900 U/L\nDiagnose?',
    a:['Tumorlysissyndroom (TLS)','Nefrotisch syndroom','Addison-crisis','Rhabdomyolyse'], c:0,
    ex:'TLS: massale celdood → vrijkomen celinhoud → hyperkaliëmie, hyperfosfatemie, hyperurikemie, hypocalciëmie (fosfaat bindt Ca²⁺). Risico: nierfalen en levensbedreigende aritmieën. Preventie: hyperhydratie + rasburicase/allopurinol.' },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium',
    q:'Een normaal serum-B12-spiegel sluit functioneel vitamine B12-tekort volledig uit.',
    c:false, ex:'NIET WAAR. Serum-B12 reflecteert totaal (actief + inactief transcobalamine). Methylmalonzuur en homocysteïne zijn functionele markers — verhoogd bij intracellulair B12-tekort ondanks normale serumspiegel. MMA is specifiek voor B12-deficiëntie.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Creatinine acuut gestegen: 188 µmol/L\nUrine-Na 9 mmol/L\nUrine-osmolaliteit 680 mosm/kg\nMeest waarschijnlijke oorzaak?',
    a:['Acute tubulusnecrose (ATN)','Prerenaal nierfalen','Post-renale obstructie','Acute glomerulonefritis'], c:1,
    ex:'Prerenaal: tubulus functioneert nog → maximale Na-terugresorptie (urine-Na <20) + water-terugresorptie (osmolaliteit >500). ATN: tubuli beschadigd → urine-Na >40, osmolaliteit <350. Behandeling prerenaal: vochtresuscitatie.',
    wiki:{
          kern: "Prerenaal nierfalen is functioneel: de tubuli werken normaal maar er is te weinig doorstroom. De nieren reageren correct: maximaal Na en water vasthouden.",
          mechanisme: [
            { title: "Stap 1", desc: "Prerenaal: lage renale perfusie." },
            { title: "Stap 2", desc: "RAAS + ADH." },
            { title: "Stap 3", desc: "urine-Na <20, osmolaliteit >500, FENa <1%. ATN: tubuli dood." },
            { title: "Stap 4", desc: "urine-Na >40, osmolaliteit <350, FENa >2%. FENa = (urine-Na × plasma-creatinine) / (plasma-Na × urine-creatinine) × 100 — corriger voor diureticagebruik!." },
          ],
          onderscheid: [
            { label: "Post-renale obstructie", desc: "echo toont hydronefrose.", type: 'ok' },
            { label: "Glomerulonefritis", desc: "proteïnurie, hematurie, rode-bloedcel-cylinders.", type: 'warn' },
            { label: "Contrast-nefropathie", desc: "stijging creatinine 24-48u na contrast, ATN-patroon.", type: 'danger' },
            { label: "Hepatorenaal syndroom", desc: "bij cirrose, functioneel (FENa laag) maar reageert NIET op vochtsuppletie.", type: 'warn' },
          ],
        } },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium',
    q:'Een verlengde APTT met normale PT zonder bloedingsklachten kan wijzen op een lupus anticoagulans.',
    c:true, ex:'WAAR. Lupus anticoagulans verlengde APTT in vitro (remt fosfolipide-afhankelijke reacties) — maar paradoxaal thrombotisch risico in vivo. Mengproef: geen correctie (= remmer aanwezig). Bevestiging: dRVVT-test. Behandeling: anticoagulatie.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Vrouw 28j: anemie, indirect bilirubine verhoogd, LDH 880, haptoglobine ondetecteerbaar, bloeduitstrijk: schistocyten. Diagnose?',
    a:['IJzergebreksanemie','Microangiopathische hemolytische anemie (MAHA)','Thalassemie','G6PD-deficiëntie'], c:1,
    ex:'MAHA: schistocyten (fragmenten van beschadigde rode bloedcellen) + hemolyseparameters (hoog LDH, indirect bili, laag haptoglobine). Oorzaken: TTP, HUS, DIC, HELLP. Urgente diagnose — TTP-behandeling is plasmaferese.',
    wiki:{
          kern: "Microangiopathische hemolytische anemie (MAHA) is een patroon waarbij rode bloedcellen mechanisch kapot worden gescheurd in kleine bloedvaten (trombotische microangiopathie). Schistocyten op de bloeduitstrijk zijn het pathognomonische teken — dit is altijd abnormaal.",
          mechanisme: [
            { title: "Stap 1", desc: "Trombotische occlusies in kleine vaten (TTP: ADAMTS13-deficiëntie." },
            { title: "Stap 2", desc: "von Willebrand-multimeren accumuleren; HUS: shiga-toxine beschadigt endotheel; DIC: systemische stollingsactivatie). RBC worden hierdoor letterlijk doorgesneden." },
            { title: "Stap 3", desc: "schistocyten, hemoglobine vrijgegeven." },
            { title: "Stap 4", desc: "hoog LDH, laag haptoglobine." },
          ],
          onderscheid: [
            { label: "TTP", desc: "pentade = MAHA + trombocytopenie + neurologische uitval + nierfalen + koorts.", type: 'ok' },
            { label: "HUS (typisch)", desc: "kind na Campylobacter/EHEC O157, overheersend nierfalen.", type: 'warn' },
            { label: "HELLP", desc: "zwangerschap, leverstoornissen, hypertensie.", type: 'danger' },
            { label: "DIC", desc: "onderliggende oorzaak (sepsis, maligniteit), stollingstesten afwijkend (PT/APTT verlengd).", type: 'warn' },
          ],
          therapie: {
            urgent: "TTP: plasmaferese SPOEDMATIG (verwijdert Von Willebrand-multimeren + suppleer ADAMTS13).",
            stappen: [
              { naam: "Stap 1", detail: "Caplacizumab als adjuvans." },
              { naam: "HUS atypisch", detail: "eculizumab." },
              { naam: "HELLP", detail: "bevalling is definitieve behandeling." },
              { naam: "DIC", detail: "onderliggende oorzaak behandelen + stollingsfactoren suppleren." },
            ],
          },
        } },

  // ── Cardiologie (nieuw) ──
  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Bij atriumfibrilleren met een CHA₂DS₂-VASc score van 0 bij een man is anticoagulatie geïndiceerd.',
    c:false, ex:'NIET WAAR. CHA₂DS₂-VASc 0 (man) = laag risico → geen anticoagulatie aanbevolen. Score telt: hartfalen, hypertensie, leeftijd ≥75 (2 punten), diabetes, beroerte/TIA (2 punten), vaatziekte, leeftijd 65-74, vrouwelijk geslacht.',
    wiki: {
      kern: 'CHA₂DS₂-VASc berekent het jaarlijkse CVA-risico bij atriumfibrilleren. Man met score 0 = risico <1%/jaar → anticoagulatie geeft meer schade dan voordeel. Anticoagulatie: mannen ≥2 punten, vrouwen ≥3 punten.',
      mnemonic: { word: 'CHA₂DS₂-VASc', items: ['C — Congestief hartfalen (1)', 'H — Hypertensie (1)', 'A₂ — Age ≥75 jaar (2)', 'D — Diabetes mellitus (1)', 'S₂ — Stroke/TIA voorheen (2)', 'V — Vaatziekte (1)', 'A — Age 65-74 jaar (1)', 'Sc — Sex category vrouw (1)'] },
      redflag: 'Vrouwen: het vrouwelijk geslacht is een risicoversterkend factor, geen onafhankelijke indicatie — een vrouw met alleen het vrouwelijk geslacht (score 1) krijgt GEEN anticoagulatie.',
      mechanisme: [
        { title: 'CVA-risico bij AF', desc: 'Stase in linker hartoor → trombus → embolie naar hersenvaten. CHA₂DS₂-VASc kwantificeert dit risico aan de hand van comorbiditeiten.' },
        { title: 'Bloedingsrisico (HAS-BLED)', desc: 'Tegenover anticoagulatievoordeel staat bloedingsrisico. HAS-BLED-score (Hypertensie, Abnormale nier/leverfunctie, CVA, Bloeding, Labiele INR, Elderly, Drugs/alcohol) helpt dit in kaart brengen.' },
      ],
      onderscheid: [
        { label: 'Score 0 (man): geen anticoagulatie', desc: 'Jaarlijks CVA-risico <1% — anticoagulatie-geïnduceerd bloedingsrisico > CVA-preventie-voordeel. Geen behandeling geïndiceerd.', type: 'ok' },
        { label: 'Score ≥2 (man) of ≥3 (vrouw)', desc: 'DOAC (apixaban, rivaroxaban, dabigatran of edoxaban) tenzij contra-indicatie. VKA alleen bij mechanische hartklep of mitralisstenose.', type: 'danger' },
        { label: 'Score 1 (man)', desc: 'Grijs gebied — anticoagulatie overwegen, individueel beslissen, voorkeur voor DOAC als klinisch voordeel aanwezig.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Acuut AF <48u: cardioversie mogelijk zonder anticoagulatie (of na TEE om trombus uit te sluiten).',
        stappen: [
          { naam: 'Rate control', detail: 'Bètablokker of non-DHP calciumantagonist voor frequentiebeheersing (<110/min in rust).' },
          { naam: 'Anticoagulatie', detail: 'DOAC op basis van CHA₂DS₂-VASc — start na bloedingsrisicobeoordeling (HAS-BLED).' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 55j met kortademigheid bij inspanning, orthopneu en dikke enkels. Echo: EF 35%, vergrote LV. Wat is de eersterangbehandeling?',
    a:['Alleen diuretica','ACE-remmer + bètablokker','Digoxine monotherapie','Calciumantagonist'], c:1,
    ex:'Hartfalen met verminderde EF (HFrEF): ACE-remmer (of ARB/ARNI) + bètablokker verminderen mortaliteit. Diuretica verlichten symptomen. Digoxine alleen bij symptoomcontrole. Spironolacton toevoegen bij aanhoudende klachten.',
    wiki: {
      kern: 'HFrEF (EF <40%) is systolisch hartfalen — het hart pompt onvoldoende. Vier medicijnklassen verminderen elk onafhankelijk de mortaliteit.',
      mnemonic: { word: 'ABMS', items: ['A — ACE-remmer of ARNI', 'B — Bètablokker', 'M — MRA (spironolacton)', 'S — SGLT2-remmer'] },
      redflag: 'Calciumantagonisten (verapamil, diltiazem) zijn gecontraïndiceerd bij HFrEF — negatief inotroop effect verslechtert de pompfunctie.',
      mechanisme: [
        { title: 'Verminderde contractie', desc: 'LV-myocard beschadigd (ischemie, viraal, idiopathisch) → EF daalt → RAAS/sympathicus geactiveerd.' },
        { title: 'Neurohormonale activatie', desc: 'Compensatoire RAAS en adrenaline → zout/waterretentie en hogere hartfrequentie — korte termijn nuttig.' },
        { title: 'Vicieuze cirkel', desc: 'Chronische RAAS-activatie → myocardiale fibrose, remodelling → EF daalt verder.' },
        { title: 'Medicatie doorbreekt cirkel', desc: 'ACE-i/bètablokker/MRA/SGLT2i blokkeren elk een arm van de neurohormonale activatie → reverse remodelling.' },
      ],
      onderscheid: [
        { label: 'HFrEF (EF <40%)', desc: 'Systolische dysfunctie. Vier-pijlertherapie geïndiceerd met bewezen mortaliteitsreductie.', type: 'ok' },
        { label: 'HFpEF (EF ≥50%)', desc: 'Diastolische dysfunctie. Alleen SGLT2-remmers tonen voordeel — ACE-i/bètablokker niet.', type: 'warn' },
        { label: 'Acuut longoedeem', desc: 'Levensbedreigende decompensatie van HFrEF — zuurstof + furosemide IV + nitraten spoedmatig.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Start vierpijlertherapie zo snel als hemodynamisch verdraagbaar na stabilisatie.',
        stappen: [
          { naam: 'ACE-remmer/ARNI', detail: 'Lisinopril of sacubitril-valsartan (ARNI superieur bij stabiel HFrEF) — verlaagt afterload en RAAS.' },
          { naam: 'Bètablokker', detail: 'Carvedilol, bisoprolol of metoprolol-succinaat — alleen starten bij stabiele patiënt, laag en opbouwen.' },
          { naam: 'MRA', detail: 'Spironolacton 25–50 mg — kaliumsparend diureticum met extra mortaliteitsreductie (RALES-trial).' },
          { naam: 'SGLT2-remmer', detail: 'Dapagliflozine of empagliflozine — meest recente pijler, werkt onafhankelijk van de andere drie.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Bij een STEMI moet PCI (dotterbehandeling) idealiter binnen 90 minuten na eerste medisch contact plaatsvinden.',
    c:true, ex:'WAAR. "Door-to-balloon time" <90 min is de richtlijn. Hoe sneller, hoe meer myocard gered. Alternatief: trombolyse binnen 30 min als PCI niet tijdig beschikbaar is (deur-tot-naald <30 min).',
    wiki: {
      kern: 'STEMI-tijdsdoelen: "Time is muscle." Primaire PCI is de gouden standaard — elke 30 minuten extra vertraging = ~7,5% meer myocardverlies. Door-to-balloon <90 minuten is de norm.',
      bigfact: { num: '90', label: 'minuten', sub: 'deur-tot-ballon tijdsdoel bij STEMI (primaire PCI)' },
      redflag: 'Trombolyse is gereserveerd als PCI niet binnen 120 minuten na het eerste medisch contact bereikbaar is — deur-tot-naald dan <30 minuten. Na lyse: transfer naar PCI-centrum binnen 2-24u voor coronairangiografie.',
      mechanisme: [
        { title: 'Myocardverlies per tijdseenheid', desc: 'Volledige coronaire afsluiting → 1 g myocard per minuut in de risiczone sterft af. Na 90 minuten is gemiddeld 30-40 g myocard necrotisch. PCI herstelt de doorbloeding en reddend myocard behoud is tijdskritisch.' },
        { title: 'PCI vs trombolyse', desc: 'Primaire PCI: hogere TIMI 3-flow, minder re-occlusie, minder bloedingen dan trombolyse. Trombolyse: sneller te starten maar beperkt tot eerste 12u, contra-indicaties bloeding.' },
      ],
      onderscheid: [
        { label: 'STEMI: PCI binnen 90 minuten', desc: 'Gouden standaard. Door-to-balloon <90 min na eerste medisch contact. Dubbele plaatjesremming (aspirine + ticagrelor/prasugrel) direct geven.', type: 'ok' },
        { label: 'Trombolyse als alternatief', desc: 'Alteplase als PCI niet beschikbaar binnen 120 min. Deur-tot-naald <30 min. Absolute CI: eerdere hersenbloeding, actieve bloeding, ernstige hypertensie.', type: 'warn' },
        { label: 'NSTEMI/instabiele angina', desc: 'Geen ST-elevatie — minder urgent, coronairangiografie binnen 24-72u afhankelijk van risicoscore (GRACE-score).', type: 'danger' },
      ],
      therapie: {
        urgent: 'Direct naar katheterslab — geen onnodige diagnostiek of vertragend overleg.',
        stappen: [
          { naam: 'Direct aspirine + ticagrelor', detail: 'Aspirine 300 mg + ticagrelor 180 mg (of prasugrel 60 mg bij PCI-plan) oraal bij aankomst.' },
          { naam: 'Heparine IV', detail: '70-100 IE/kg bolus voor PCI — anticogulatie periprocedureel.' },
          { naam: 'Secundaire preventie', detail: 'Na STEMI: statine hoog-intensief + bètablokker + ACE-remmer + SGLT2-remmer.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 35j na griep: scherpe precordiale pijn, erger liggend, beter voorovergebogen. ECG: saddle-shape ST-elevatie in meerdere afleidingen. Diagnose?',
    a:['STEMI','Pericarditis','Longembolie','Aortadissectie'], c:1,
    ex:'Pericarditis: pleuritische pijn (scherp, houdingsafhankelijk), pericardiaal wrijfgeruis, diffuse saddle-shape ST-elevatie. Oorzaak vaak viraal. Behandeling: ibuprofen + colchicine. Complicatie: pericarditamp.',
    wiki: {
      kern: 'Pericarditis is een ontsteking van het hartzakje. De pijn is scherp en pleuritisch — erger bij inademen en platliggen, beter voorovergebogen zitten. Oorzaak is in 80-90% viraal (Coxsackie, EBV, CMV).',
      redflag: 'Tamponnade: als vocht snel accumuleert kan 200 ml al fataal zijn — Beck\'s triade: hypotensie + gestuwd halsvenen + gedempte harttonen.',
      mechanisme: [
        { title: 'Perikardontsteking', desc: 'Ontsteking maakt de perikardiale lagen ruw → wrijfgeruis bij auscultatie (kenmerkend, "kraakachtig leer").' },
        { title: 'ECG-patroon', desc: 'Diffuse saddle-shape ST-elevatie (alle afleidingen) + PR-depressie — in tegenstelling tot STEMI geen regionale verdeling en geen reciproke ST-depressie.' },
        { title: 'Vochtaccumulatie', desc: 'Sterker ontstoken pericard produceert exsudaat → pericardeffusie → geruis verdwijnt maar tamponnade-risico neemt toe.' },
      ],
      onderscheid: [
        { label: 'Pericarditis', desc: 'Scherpe houdingsafhankelijke pijn, diffuse saddle-shape ST + PR-depressie, pijn beter voorovergebogen, wrijfgeruis.', type: 'ok' },
        { label: 'STEMI', desc: 'Gelokaliseerde ST-elevatie (regionale verdeling), reciproke depressies, drukkende pijn — geen houdingseffect.', type: 'danger' },
        { label: 'Myocarditis', desc: 'Ook post-viraal maar troponine sterk verhoogd, pijn minder uitgesproken, diffuse LV-dysfunctie op echo.', type: 'warn' },
        { label: 'Longembolie', desc: 'Pleuritische pijn + dyspneu, S1Q3T3 op ECG, D-dimeer verhoogd — geen saddle-shape ST.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Ibuprofen 600 mg 3×/dag + colchicine 0,5 mg 2×/dag — start direct, gedurende 3 maanden (recidief-preventie).',
        stappen: [
          { naam: 'Rust', detail: 'Geen inspanning tot 3 maanden klachtenvrij — sport verhoogt aritmierisico bij actieve perikardontsteking.' },
          { naam: 'Recidief', detail: 'Corticosteroïden als NSAID + colchicine falen — terughoudend inzetten (hogere recidiefkans bij afbouwen).' },
          { naam: 'Tamponnade', detail: 'Pericardiocentese spoedmatig bij hemodynamisch compromis (echo-geleid, subxifoidale toegang).' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Patiënt met bekende pericarditis: acuut in shock, halsvenen gestuwd, gedempte harttonen. Wat is de diagnose?',
    a:['Pneumothorax','Longembolie','Harttamponnade','Hartfalen'], c:2,
    ex:'Harttamponnade: Beck\'s triade = hypotensie + gestuwd halsvenen + gedempte harttonen. Vocht in pericardzak comprimeert het hart. Echo: echo-vrije ruimte + diastolische collaps rechterventrikels. Behandeling: pericardiocentese spoedmatig.',
    wiki:{
          kern: "Harttamponnade ontstaat wanneer vocht (bloed, exsudaat) in de pericardruimte snel genoeg ophoopt om de diastolische vulling van het hart te belemmeren. Al 200 ml snel ophopend vocht kan fataal zijn; 1 liter chronisch kan goed verdragen worden.",
          mechanisme: [
            { title: "Pericard-compressie", desc: "Ophopend vocht in de pericardruimte comprimeert het RV tijdens diastole — het RV kan niet meer uitzetten." },
            { title: "Verminderde vulling", desc: "Minder RV-filling → minder slagvolume → minder LV-vulling → cardiac output daalt snel." },
            { title: "Compensatoire reactie", desc: "Sympathicusactivatie → tachycardie + vasoconstrictie. Maar dit houdt de output slechts tijdelijk op peil." },
            { title: "Pulsus paradoxus", desc: "Bij inspiratie daalt de intrathoracale druk → RV vult beter maar comprimeert het LV → systolische BD daalt >10 mmHg. Kenmerkend voor tamponnade." },
          ],
          onderscheid: [
            { label: 'Harttamponnade', desc: 'Beck\'s triade: hypotensie + gestuwd halsvenen + gedempte harttonen. Pulsus paradoxus >10 mmHg. Echo: vrije vloeistof + RV-collaps diastole.', type: 'ok' },
            { label: 'RV-infarct', desc: 'Ook lage BD + hoge CVD maar géén gedempte harttonen, ST-elevatie in V4R, geen pericardeffusie op echo.', type: 'warn' },
            { label: 'Spanningspneumothorax', desc: 'Ook lage BD + gestuwd CVD maar eenzijdig afwezig ademgeruis, hypersonore percussie, trachea deviatie.', type: 'danger' },
            { label: 'Cardiogene shock', desc: 'Koude extremiteiten + longoedeem + lage BD maar geen gestuwd halsvenen of gedempte harttonen.', type: 'warn' },
          ],
          therapie: {
            urgent: "Pericardiocentese spoedmatig: naald subxifoidaal, echo-geleide drainage.",
            stappen: [
              { naam: "Bij hemopericard (trauma)", detail: "Chirurgische drainage (pericardiocentese soms onvoldoende bij actieve bloeding)." },
              { naam: "Oorzaak onderzoeken", detail: "Na stabilisatie: maligniteit, TBC, virale pericarditis, uraemie of auto-immuun als mogelijke etiologie." },
              { naam: "Klinisch herstel", detail: "Al een kleine drainage-hoeveelheid (50-100 ml) geeft snel hemodynamisch herstel — de effectiviteit is opmerkelijk snel." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'ACE-remmers zijn gecontra-indiceerd bij hartfalen met verminderde ejectiefractie (HFrEF).',
    c:false, ex:'NIET WAAR. ACE-remmers zijn juist eerstekeusmiddelen bij HFrEF — ze verminderen mortaliteit. Contra-indicaties zijn: bilaterale nierslagadervernauwing, zwangerschap, en overgevoeligheid (bijv. angio-oedeem).',
    wiki: {
      kern: 'ACE-remmers zijn niet gecontraïndiceerd maar juist geïndiceerd bij HFrEF. Ze verminderen RAAS-activatie en verbeteren de overleving met ~20%. Enige absolute contra-indicaties: bilaterale nierslagadervernauwing, zwangerschap, angio-oedeem in de voorgeschiedenis.',
      redflag: 'Echte contra-indicaties ACE-remmers: bilaterale nierslagadervernauwing (acute verslechtering nierfunctie), zwangerschap (fetotoxisch), eerder angio-oedeem door ACE-remmer (switch naar ARB). Droge hoest → switch naar ARB (ook bewezen bij HFrEF).',
      mechanisme: [
        { title: 'RAAS-blokkade', desc: 'ACE-remmers blokkeren de omzetting van angiotensine I naar II → minder aldosteron → minder natrium/waterretentie + minder vasoconstrictie → lagere preload en afterload.' },
        { title: 'Reverse remodelling', desc: 'Chronische RAAS-activatie bij HFrEF leidt tot myocardfibrose en verdere EF-daling. ACE-remmers doorbreken deze cyclus → reverse remodelling → EF stijgt gemiddeld 5-10% na 3-6 maanden.' },
        { title: 'Mortaliteitsreductie', desc: 'CONSENSUS- en SOLVD-studie: enalapril verlaagde mortaliteit bij HFrEF met 16-40%. Combinatie met bètablokker + MRA + SGLT2i geeft additieve reductie.' },
      ],
      onderscheid: [
        { label: 'ACE-remmers: eerstekeus bij HFrEF', desc: 'Geïndiceerd bij alle HFrEF-patiënten tenzij echte contra-indicatie. Mortaliteitsreductie 16-27% in gerandomiseerde studies.', type: 'ok' },
        { label: 'ARB: alternatief bij hoest/angio-oedeem', desc: 'Valsartan, candesartan of losartan als ACE-remmer niet verdraagbaar. Geen hoest (geen bradykinine-effect). CHARM-studie: bewezen bij HFrEF.', type: 'warn' },
        { label: 'ARNI (sacubitril/valsartan)', desc: 'Superieur aan ACE-remmer (PARADIGM-HF: 20% sterftereductie vs. enalapril). Wordt aanbevolen als volgende stap bij stabiele HFrEF-patiënten die al ACE-remmer/ARB gebruiken.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Start zo snel als hemodynamisch verdraagbaar na stabilisatie.',
        stappen: [
          { naam: 'Starten laag', detail: 'Begin met lage dosis (bijv. enalapril 2,5 mg 2dd), ophogen naar doeldosis (enalapril 10-20 mg 2dd) over 2-4 weken.' },
          { naam: 'Nierfunctie monitoren', detail: 'Creatinine + kalium na 1-2 weken — stijging creatinine <30% is acceptabel. Stijging K⁺ >5,5 mmol/L → dosis verlagen.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 72j: systolisch geruis graad 4/6 rechts parasternaal, uitstralend naar hals, syncope bij inspanning, kortademigheid. Echo: AV-oppervlak 0.7 cm². Diagnose?',
    a:['Mitralisinsufficiëntie','Hypertrofische cardiomyopathie','Ernstige aortastenose','Tricuspidalisinsufficiëntie'], c:2,
    ex:'Ernstige aortastenose: AV-oppervlak <1.0 cm², klassieke triade = angina + syncope + kortademigheid. Systolisch uitdrijvingsgeruis rechts parasternaal. Behandeling: TAVI of chirurgische klepvervanging.',
    wiki:{
          kern: "Aortaklepstenose is de meest voorkomende klepafwijking bij ouderen. De aortaklep wordt door calcificatie steeds stijver en nauwer → het hart moet steeds harder pompen → LV-hypertrofie → uiteindelijk hartfalen.",
          mechanisme: [
            { title: "Calcificatie van de aortaklep", desc: "Inflammatoire schade aan het klepblad (vergelijkbaar met atherosclerose) → progressieve calcificatie → klepoppervlak daalt <1,0 cm² (ernstig: <0,6 cm²). Risicofactoren: ouderdom, bicuspide aortaklep, nierinsufficiëntie." },
            { title: "LV-overbelasting", desc: "Verhoogde afterload → LV moet harder persen → drukpiek stijgt → concentrische LV-hypertrofie als compensatie." },
            { title: "Diastolische dysfunctie", desc: "Hypertrofische LV-wand is stijver → diastolische vulling gestoord → verhoogde vullingsdruk → dyspneu bij inspanning." },
            { title: "Klassieke triade", desc: "Angina (insufficient coronaire reserve), syncope (reflexbradycardie bij inspanning of lage output), dyspneu (verhoogde vullingsdruk). Gemiddelde overleving na triade: 2-3 jaar zonder klepvervanging." },
          ],
          onderscheid: [
            { label: 'Ernstige aortastenose', desc: 'AV-oppervlak <1,0 cm², klassieke triade syncope + angina + dyspneu, geruis rechts parasternaal, uitstralend naar hals.', type: 'ok' },
            { label: 'HOCM', desc: 'Ook syncope + geruis bij jongeren maar geruis neemt tóé bij Valsalva (verminderde vulling). Geruis aortastenose neemt áf bij Valsalva.', type: 'warn' },
            { label: 'Mitralisinsufficiëntie', desc: 'Holosystolisch geruis, uitstralend naar oksel, apex maximaal.', type: 'warn' },
            { label: 'Pulmonale hypertensie', desc: 'Dyspneu + syncope maar luide P2, geen uitdrijvingsgeruis rechts parasternaal.', type: 'danger' },
          ],
          therapie: {
            urgent: "Aortaklepvervanging (chirurgisch of TAVI) is de enige curatieve behandeling.",
            stappen: [
              { naam: "TAVI", detail: "Transcatheter aortaklepimplantatie voor ouderen en hoog-risicochirurgische patiënten — minder invasief dan chirurgie, vergelijkbare resultaten." },
              { naam: "Conservatief", detail: "Geen bewezen farmacologische therapie die de progressie remt — medicatie verlicht symptomen maar cureert niet." },
              { naam: "Cave nitraten/diuretica", detail: "Kunnen gevaarlijk hypotensie veroorzaken — het gecompenseerde hart is preload-afhankelijk." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'ECG: PR-interval steeds langer wordend tot een QRS uitvalt, daarna reset. Welk geleidingsstoornis?',
    a:['Eerstegraads AV-blok','Wenckebach (tweedegraads type I)','Mobitz type II AV-blok','Derdegraads AV-blok'], c:1,
    ex:'Wenckebach (Mobitz type I): PR progressief verlengd → QRS uitval → reset. Meestal benigne, vaak bij inferiorwandinfarct. Mobitz II: plotse QRS-uitval zonder PR-verlenging — gevaarlijker, kan leiden tot totaal blok.',
    wiki:{
          kern: "AV-blokken worden geclassificeerd naar ernst. Eerstegraads: verlengd PR, altijd geleiding.",
          mechanisme: [
            { title: "Wenckebach: AV-knoop vermoeidheid", desc: "Na elke geleide slag raakt de AV-knoop tijdelijk 'moe' → geleidingstijd verlengt → PR-interval wordt steeds langer per slag." },
            { title: "Wenckebach: QRS-uitval en reset", desc: "Na een prikkel die niet geleid wordt, herstelt de AV-knoop volledig → PR-interval begint opnieuw kort. Dit herhaalt zich cyclisch." },
            { title: "Mobitz II: His-bundelschade", desc: "Structurele schade onder de AV-knoop (His-bundel of bundeltakken) → plotse, onverwachte QRS-uitval zonder voorafgaande PR-verlenging — gevaarlijker dan Wenckebach." },
            { title: "Derdegraads: totaal blok", desc: "Geen enkele prikkel geleid van atria naar ventrikels → AV-dissociatie. Ventrikels slaan op eigen escape-ritme (30-40/min) → hemodynamisch instabiel." },
          ],
          onderscheid: [
            { label: 'Wenckebach (Mobitz I)', desc: 'Progressief verlengend PR → QRS-uitval → reset. Benigne, typisch bij inferieur MI (RCA-ischemie AV-knoop), ook bij verhoogde vagustonus.', type: 'ok' },
            { label: 'Eerstegraads AV-blok', desc: 'PR >200 ms maar elke P geleidt naar QRS. Asymptomatisch, geen behandeling bij atleten of vaguseffect.', type: 'warn' },
            { label: 'Mobitz II', desc: 'Constant PR tot plotse QRS-uitval — structurele His-bundelschade, kans op totaal blok → urgente pacemaker.', type: 'danger' },
            { label: 'Totaal (derdegraads) AV-blok', desc: 'P en QRS volledig ontkoppeld — urgente pacemaker altijd geïndiceerd.', type: 'warn' },
          ],
          therapie: {
            urgent: "Eerstegraads: geen.",
            stappen: [
              { naam: "Wenckebach", detail: "observatie, behandel onderliggende oorzaak (ischaemie, medicatie)." },
              { naam: "Mobitz II", detail: "tijdelijke pacemaker, daarna permanent." },
              { naam: "Derdegraads", detail: "transveneuze tijdelijke pacemaker spoedmatig, daarna permanent." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Statines verlagen LDL-cholesterol door HMG-CoA-reductase te remmen.',
    c:true, ex:'WAAR. HMG-CoA-reductase is het sleutelenzym in cholesterolsynthese in de lever. Remming → minder intracellulair cholesterol → meer LDL-receptoren → meer LDL-opname uit bloed. Bijwerking: myopathie (check CK bij spierpijn).',
    wiki:{
      kern: 'HMG-CoA-reductase is het snelheidsbeperkende enzym in de endogene cholesterolsynthese. Remming → lever maakt minder cholesterol → compenseert met meer LDL-receptoren → LDL-opname uit bloed verhoogd.',
      bigfact: { num: '50%', label: 'LDL-daling', sub: 'Met hoog-intensieve statine (atorvastatine 40-80 mg of rosuvastatine 20-40 mg).' },
      mechanisme: [
        { title: 'HMG-CoA remming', desc: 'Statines blokkeren de omzetting van HMG-CoA naar mevalonaat — de eerste stap in de cholesterolsynthese. Dit verlaagt het intracellulair cholesterolgehalte van de hepatocyt.' },
        { title: 'Upregulatie LDL-receptoren', desc: 'Lagere intracellulair cholesterol → SREBP-2 geactiveerd → meer LDL-receptorexpressie → meer LDL-opname uit plasma. Gevolg: LDL daalt 30-55%.' },
        { title: 'Pleiotrope effecten', desc: 'Naast LDL-verlaging: plaques stabiliseren, endothelfunctie verbeteren, CRP verlagen. Mede verantwoordelijk voor cardiovasculaire bescherming ook bij normaal LDL.' },
      ],
      onderscheid: [
        { label: 'Statines (HMG-CoA-remmers)', desc: 'Eerstekeus. Hoog-intensief (atorva 40-80 mg, rosuva 20-40 mg): >50% LDL-daling. Laag-intensief (prava 10-20 mg): 20-30%.', type: 'ok' },
        { label: 'Ezetimib', desc: 'Remt intestinale cholesterolabsorptie (NPC1L1). Combinatie met statine: additioneel 15-20% LDL-daling. Goed verdragen.', type: 'warn' },
        { label: 'PCSK9-remmers (evolocumab, alirocumab)', desc: 'Blokkeren PCSK9 → meer LDL-receptors → extreme LDL-daling (50-60% bovenop statine). Indicatie: FH of hoog risico met onvoldoende statine-effect.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Na MI: start direct hoog-intensieve statine (atorvastatine 80 mg of rosuvastatine 40 mg), ongeacht LDL-uitgangswaarde.',
        stappen: [
          { naam: 'Bijwerking myopathie', detail: 'Stop statine bij CK >10× normaal (rhabdomyolyse). Bij spierpijn zonder CK-stijging: schakel over op andere statine of lager doseer.' },
          { naam: 'Monitoring', detail: 'Lever-enzymes bij aanvang — routine monitoring niet meer aanbevolen tenzij symptomen.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Jongeman 22j valt flauw op het sportveld. Vader overleed plotseling op 38j. Systolisch geruis dat toeneemt bij Valsalva. Diagnose?',
    a:['Aortastenose','Hypertrofische cardiomyopathie (HCM)','Mitralisklepprolaps','Wolff-Parkinson-White'], c:1,
    ex:'HCM: asymmetrische septumhypertrofie, autosomaaldominant. Geruis neemt toe bij Valsalva (minder vulling → meer obstructie). Risico plotse hartdood bij jongeren. Behandeling: bètablokker, ICD bij hoog risico, sport verboden.',
    wiki:{
      kern: 'HCM (hypertrofische cardiomyopathie) is de meest voorkomende erfelijke hartziekte (1:500) en de meest voorkomende oorzaak van plotse hartdood bij jonge atleten. Autosomaal dominante mutatie in sarcomeer-eiwitten (MYH7, MYBPC3).',
      redflag: 'Het geruis van HCM neemt TÓÉ bij Valsalva en staan (minder vulling → meer obstructie) — dit is het tegenovergestelde van aortastenose, waarbij het geruis afneemt.',
      mechanisme: [
        { title: 'Asymmetrische septumhypertrofie', desc: 'Verdikt interventriculair septum (IVS) obstrueert de LVOT (uitstroomtract) tijdens systole → dynamische drukgradient.' },
        { title: 'SAM (systolic anterior motion)', desc: 'Venturi-effect trekt het anterieure mitraalblad naar het IVS → verergert LVOT-obstructie + mitralisinsufficiëntie. Zichtbaar op echo.' },
        { title: 'Dynamische obstructie', desc: 'Gradient neemt toe bij ↓ preload (staan, Valsalva, dehydratie) en ↓ afterload. Neemt af bij ↑ preload (hurken, handdruktest). Hierom zijn nitraten gevaarlijk.' },
        { title: 'Aritmierisico', desc: 'Gedesorganiseerde spiervezels + fibrose → re-entry circuits → VT/VF → syncope of plotse hartdood, ook bij jonge atleten zonder voorgeschiedenis.' },
      ],
      onderscheid: [
        { label: 'Hypertrofische cardiomyopathie (HCM)', desc: 'Geruis neemt tóé bij Valsalva/staan. Asymmetrisch IVS >15 mm op echo. SAM van mitraalklep. Familiaire anamnese plotse hartdood.', type: 'ok' },
        { label: 'Aortastenose', desc: 'Geruis neemt áf bij Valsalva (vaste mechanische obstructie). Oudere patiënt. Calcificatie op echo. Geen familiaire plotse hartdood.', type: 'danger' },
        { label: 'WPW', desc: 'Syncope door plotse tachyaritmie, delta-golf + kort PR op ECG. Geen septumhypertrofie op echo.', type: 'warn' },
        { label: 'Mitralisklepprolaps', desc: 'Midsystolische klik + laat-systolisch geruis. Goed-aardige aandoening, zelden plotse hartdood.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Bètablokker (eerstekeus) — verlaagt hartfrequentie → langere vultijd → minder obstructie.',
        stappen: [
          { naam: 'ICD-indicatie', detail: 'Bij ≥1 risicofactor: overleefde VT/VF, syncope, familiaire plotse hartdood, septum ≥30 mm, NSVT, hypotensiereactie bij inspanning.' },
          { naam: 'Sportontheffing', detail: 'Competitief sporten verboden — inspanning verhoogt LVOT-gradient en aritmierisico dramatisch.' },
          { naam: 'Septumreductie', detail: 'Chirurgische myectomie of alcohol-ablatie bij refractaire LVOT-gradient >50 mmHg ondanks medicatie.' },
        ],
      },
    } },

  { type:'lab', d:5, domain:'cardio', dl:'Cardiologie',
    q:'Man 52j: pijn op de borst 3 uur geleden. Eerste troponine normaal. Wat is het juiste beleid?',
    a:['Ontslaan: eerste troponine normaal','Herhaal troponine na 3-6 uur','Direct PCI starten','Alleen ECG herhalen'], c:1,
    ex:'Troponine stijgt pas 3-6 uur na infarct. Eén normale waarde sluit NSTEMI niet uit. Herhaal na 3-6 uur (of 1-2 uur met hoog-sensitief troponine). Combineer met ECG en kliniek. Laat de patiënt nooit te vroeg gaan.',
    wiki:{
      kern: 'Hs-troponine stijgt pas 1-3 uur na infarct en bereikt de piek bij 12-24 uur. Eén normaal troponine bij klachten <3u sluit NSTEMI NIET uit — seriële meting is verplicht.',
      bigfact: { num: '0+1h', label: 'ESC-protocol', sub: 'Meten op aankomst en na 1 uur — combinatie van absolute waarde + delta sluit ACS snel in of uit.' },
      mechanisme: [
        { title: 'Kinetiek troponine-vrijgave', desc: 'Troponine T en I lekken uit ischemische cardiomyocyten — detectie met hs-assay na 1-3u, piek 12-24u, normaliseert 5-14 dagen.' },
        { title: 'Serieel meten', desc: '0+1h ESC-protocol: hoog absoluut hs-troponine op t=0 = rule-in. Laag op t=0 én t=1h = rule-out (NPV >99%). Significante stijging (delta) = rule-in ACS.' },
        { title: 'Vals-negatief risico', desc: 'Bij klachten <3u: troponine kan nog normaal zijn ondanks lopend infarct. Vroegtijdig ontslaan op basis van één meting is gevaarlijk.' },
      ],
      onderscheid: [
        { label: 'Serieel hs-troponine (0+1h of 0+3h)', desc: 'Standaardprotocol bij verdenking ACS op de SEH. Combineer altijd met ECG en klinisch beeld.', type: 'ok' },
        { label: 'Verhoogd troponine zonder ACS', desc: 'LE, myocarditis, sepsis, nierfalen, cardiomyopathie — troponine is cardiospecifiek maar niet ACS-specifiek. Klinische context is bepalend.', type: 'warn' },
        { label: 'HEART-score', desc: 'History + ECG + Age + Risk + Troponin: risicostratificatie ≤3 = laag risico (0,9% MACE), ≥7 = hoog risico (50% MACE). Helpt ontslagindicatie bepalen.', type: 'warn' },
      ],
      therapie: {
        urgent: 'STEMI: directe PCI. NSTEMI: aspirine + ticagrelor, heparine, coronairangiografie binnen 2-72u afhankelijk van risico.',
        stappen: [
          { naam: 'Laag-risico NSTEMI', detail: 'GRACE-score <140 + stabiel: conservatief beleid met coronairangiografie binnen 72u.' },
          { naam: 'Hoog-risico NSTEMI', detail: 'GRACE-score ≥140 of refractaire klachten: urgente coronairangiografie binnen 2-24u.' },
        ],
      },
    } },

  { type:'lab', d:5, domain:'cardio', dl:'Cardiologie',
    q:'Welke biomarker is het meest specifiek verhoogd bij acuut myocardinfarct?',
    a:['CK-MB','Myoglobine','Troponine I of T','LDH'], c:2,
    ex:'Troponine I en T zijn hartspecifiek en de gouden standaard voor AMI. CK-MB is minder specifiek (ook in skeletspier). Myoglobine stijgt vroeg maar is niet cardiospecifiek. Hoog-sensitief troponine detecteert zelfs kleine infarcten.',
    wiki:{
      kern: 'Cardiaal troponine I (cTnI) en troponine T (cTnT) zijn de biomarkers van keuze bij verdenking AMI — ze zijn vrijwel exclusief aanwezig in cardiale spiercellen en niet in skeletspier.',
      mechanisme: [
        { title: 'Troponine: hartspecifiek', desc: 'cTnI en cTnT zijn isovormen die alleen in het myocard voorkomen (andere isovormen in skeletspier). Bij ischemische celschade lekken ze vrij → detecteerbaar na 1-3u.' },
        { title: 'Hoog-sensitieve assay', desc: 'Hs-troponine detecteert concentraties 10-100× lager dan conventionele assays → eerder positief, kleinere infarcten detecteerbaar, 0+1h protocol mogelijk.' },
        { title: 'CK-MB en myoglobine', desc: 'CK-MB: ook aanwezig in skeletspier (minder specifiek). Myoglobine: stijgt vroegst (1-2u) maar ook in skeletspier. Beide vervangen door hs-troponine in moderne diagnostiek.' },
      ],
      onderscheid: [
        { label: 'Hs-troponine I of T', desc: 'Hartspecifiek, stijgt 1-3u, piek 12-24u. Gouden standaard AMI-diagnose. NPV >99% bij 0+1h protocol.', type: 'ok' },
        { label: 'CK-MB', desc: 'Minder specifiek (skeletspiercontaminatie). Nuttig voor herinfarcering (normaliseert sneller dan troponine, dus nieuwe stijging detecteerbaar).', type: 'warn' },
        { label: 'Myoglobine', desc: 'Vroegste stijging (1-2u) maar niet hartspecifiek — verhoogd bij elke spiertrauma. Niet meer gebruikt als primaire AMI-marker.', type: 'danger' },
        { label: 'LDH', desc: 'Stijgt laat (48-72u), niet cardiospecifiek. Historisch gebruikt bij late presentatie — nu vervangen door troponine.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Troponine ≥URL + klachten = AMI tot bewijs van het tegendeel. Start ACS-protocol.',
        stappen: [
          { naam: 'Niet-cardiale oorzaken', detail: 'Altijd uitsluiten bij troponine-stijging: LE, myocarditis, sepsis, nierfalen, cardioversie — klinische context is doorslaggevend.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Een droge hoest is een bekende bijwerking van ACE-remmers.',
    c:true, ex:'WAAR. ACE-remmers remmen ook de afbraak van bradykinine → accumulatie → prikkeling van de hoestreflex. Komt voor bij 10-15% van patiënten. Oplossing: overstappen op ARB (bijv. valsartan), die bradykinine niet ophopen.',
    wiki: {
      kern: 'ACE-remmers blokkeren niet alleen angiotensine II-productie, maar ook de afbraak van bradykinine. Bradykinine-accumulatie stimuleert de C-vezel hoestreflex in de bronchiën → droge prikkelhoest bij 10-15% van patiënten (vaker bij Aziatische populaties >30%).',
      bigfact: { num: '10–15%', label: 'kans op droge hoest', sub: 'bij gebruik van ACE-remmers; vaker bij vrouwen en Aziatische patiënten' },
      mechanisme: [
        { title: 'Bradykinine-accumulatie', desc: 'ACE (angiotensin-converting enzyme) breekt normaal bradykinine af. ACE-remmer blokkeert dit → bradykinine stapelt op in bronchiaal epitheel → C-vezel stimulatie → droge, persisterende hoest.' },
        { title: 'Onderscheid van hartfalenhoest', desc: 'ACE-remmerhoest: droog, prikkelend, niet productief, continu aanwezig, geen dyspneu-correlatie. Hartfalenhoest: nachtelijke dyspneu, roze schuimend sputum, ortopneu.' },
        { title: 'ARB: geen hoest', desc: 'ARBs blokkeren angiotensine II-receptoren maar hebben geen effect op bradykinine-afbraak → ARBs geven geen bradykinine-accumulatie → geen hoest.' },
      ],
      onderscheid: [
        { label: 'ACE-remmerhoest', desc: 'Droog, prikkelend, aanwezig bij 10-15% — switch naar ARB (bewezen equivalente werkzaamheid bij HFrEF en hypertensie). Hoest verdwijnt na 1-4 weken na staken.', type: 'ok' },
        { label: 'Angio-oedeem', desc: 'Zeldzamere ernstige bijwerking: plotseling oedeem tong/lippen/keel — levensbedreiging. Stop ACE-remmer permanent, geen switch naar ARB (ook ARB-gerelateerd angio-oedeem mogelijk).', type: 'danger' },
        { label: 'ARNI (sacubitril/valsartan)', desc: 'Bij HFrEF: vervang ACE-remmer door ARNI voor extra mortaliteitsreductie. ARNI bevat valsartan (ARB) + neprilysine-remmer — verhoogt NP-peptiden, ook geen bradykinine-hoest.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Stop ACE-remmer bij invaliderende hoest of angio-oedeem.',
        stappen: [
          { naam: 'Switch naar ARB', detail: 'Valsartan, candesartan of losartan — vergelijkbare effectiviteit bij HFrEF/hypertensie, geen hoest.' },
          { naam: 'Overweeg ARNI', detail: 'Bij stabiele HFrEF: sacubitril/valsartan superieur aan ACE-remmer voor mortaliteitsreductie (PARADIGM-HF).' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 62j: pijn in de kuit bij lopen, verdwijnt in rust, rookt 30 jaar. ABI (enkel-arm-index) = 0.65. Diagnose?',
    a:['Diepe veneuze trombose','Perifeer arterieel vaatlijden','Spataderen','Diabetische neuropathie'], c:1,
    ex:'PAV: claudicatio intermittens. ABI <0.9 = PAV, <0.4 = kritisch. Oorzaak: atherosclerose. Risicofactoren: roken, diabetes, hypertensie. Behandeling: stoppen met roken, looptraining, plaatjesremmer, statine.',
    wiki:{
          kern: "Perifeer arterieel vaatlijden (PAV) is atherosclerose van de beenarteriën. Claudicatio intermittens (pijn bij lopen, rust geeft verlichting) is het klassieke symptoom.",
          mechanisme: [
            { title: "Atherosclerose beenarteriën", desc: "Plaques vernauwen de A. femoralis superficialis (meest frequent) → verminderde doorbloeding distaal van de obstructie." },
            { title: "Inspanning: vraag > aanbod", desc: "Spierarbeid verhoogt de O₂-vraag maar de vernauwde arterie kan de flow niet verhogen → anaerobe verbranding → melkzuurophoping → pijn (claudicatio)." },
            { title: "Rust: pijn verdwijnt", desc: "In rust daalt de O₂-vraag → melkzuur wordt geklaard → pijn verdwijnt na 2-5 minuten. Kenmerkend voor claudicatio (vs neurogeen: pijn verdwijnt langzamer, houding-afhankelijk)." },
            { title: "Kritische ischemie", desc: "Bij ABI <0,4 is de flow onvoldoende voor basale weefselperftusie → rustpijn, ulcera, dreigende gangreen. Dit is een vaatspoedsituatie." },
          ],
          onderscheid: [
            { label: 'PAV (claudicatio intermittens)', desc: 'Pijn bij lopen, verdwijnt snel in rust, ABI <0,9. Atherosclerose arteria femoralis superficialis (meest frequent).', type: 'ok' },
            { label: 'DVT', desc: 'Zwelling, roodheid, D-dimeer positief — pijn is constant, geen claudicatiepatroon. ABI normaal.', type: 'warn' },
            { label: 'Spinale stenose (neurogeen claudicatio)', desc: 'Pijn + uitstraling in rug en benen, verbetert bij vooroverbuigen en stoppen. ABI normaal — het grote onderscheid!', type: 'danger' },
            { label: 'Diabetische neuropathie', desc: 'Brandende pijn, \'s nachts erger, geen directe relatie met loopafstand. ABI normaal of licht verlaagd.', type: 'warn' },
          ],
          therapie: {
            urgent: "Leefstijl: stoppen met roken (risico ×4), looptraining (evidence-based, vergelijkbaar met PTA).",
            stappen: [
              { naam: "Farmacologisch", detail: "trombocytenremmer (clopidogrel of aspirine) + hooggedoseerde statine + bloeddrukcontrole." },
              { naam: "Kritische ischemie", detail: "PTA (percutane transluminale angioplastiek) of bypass-chirurgie — indicatie bij ABI <0,4 of rustpijn." },
              { naam: "Amputatie", detail: "Laatste redmiddel bij niet-vasculariseerbare ischemie of levensbedreigende infectie — altijd zo distaal mogelijk." },
            ],
          },
        } },

  { type:'pharma', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Wat is het werkingsmechanisme van aspirine als bloedplaatjesremmer?',
    a:['Blokkeert ADP-receptor P2Y12','Remt COX-1 irreversibel → minder tromboxaan A2','Blokkeert glycoproteïne IIb/IIIa','Activeert plasminogeen'], c:1,
    ex:'Aspirine acetyleert COX-1 irreversibel → geen TXA2-synthese → bloedplaatjes aggregeren minder. Effect duurt levenslang van het plaatje (7-10 dagen). Hoge dosis = anti-inflammatoir. Lage dosis (80-100mg) = antithrombotisch.',
    wiki:{
      kern: 'Aspirine acetyleert COX-1 irreversibel in bloedplaatjes → geen tromboxaan A2-synthese → verminderde plaatjesaggregatie. Omdat bloedplaatjes geen kern hebben, kunnen ze COX-1 niet herstellen → effect duurt de levensduur van het plaatje (7-10 dagen).',
      mnemonic: { word: 'DAPT', items: ['D — Dubbele plaatjesremming', 'A — Aspirine (COX-1 remmer)', 'P — P2Y12-remmer (clopidogrel/ticagrelor)', 'T — Tijd: 12 maanden na stentplaatsing'] },
      mechanisme: [
        { title: 'Irreversibele COX-1-acetylering', desc: 'Aspirine acetyleert serine-530 van COX-1 covalent. Bloedplaatjes missen een celkern → kunnen geen nieuw COX-1 maken → effect duurt 7-10 dagen (levensduur plaatje).' },
        { title: 'Geen tromboxaan A2', desc: 'COX-1 maakt prostaglandine H2 → tromboxaan A2 (TXA2). TXA2 stimuleert plaatjesaggregatie en vasoconstrictie. Zonder TXA2: plaatjes zijn minder kleverig.' },
        { title: 'Dosis-afhankelijk effect', desc: 'Lage dosis (80-100 mg): selectief COX-1 in plaatjes (COX-2 in vaatwand gespaard → prostacycline I2 behouden). Hoge dosis: ook COX-2 remming → anti-inflammatoir, maar meer bijwerkingen.' },
      ],
      onderscheid: [
        { label: 'Aspirine (COX-1 remmer)', desc: 'Irreversibeel, duur 7-10 dagen, lage dosis antithrombotisch. Standaard bij ACS en preventie cardiovasculaire events.', type: 'ok' },
        { label: 'Clopidogrel/ticagrelor (P2Y12-remmer)', desc: 'Blokkeert ADP-receptor P2Y12 op plaatjes. Ticagrelor reversibel en sneller dan clopidogrel (pro-drug). DAPT = aspirine + P2Y12-remmer na stent.', type: 'warn' },
        { label: 'Glycoproteïne IIb/IIIa-remmers', desc: 'Abciximab, eptifibatide — blokkeert eindgemeenschappelijke weg plaatjesaggregatie. Alleen IV, bij hoog-risico PCI.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Aspirine 300 mg direct bij verdenking ACS (oplaaddosis), daarna 80-100 mg/dag levenslang.',
        stappen: [
          { naam: 'DAPT na PCI', detail: 'Aspirine + ticagrelor/prasugrel 12 maanden. Ticagrelor superieur aan clopidogrel (PLATO-trial).' },
          { naam: 'Bijwerkingen', detail: 'Maagbloeding (PPI co-medicatie overwegen bij hoog GI-risico), aspirine-exacerbated respiratory disease bij astma.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 60j met hypertensie: plotse verscheurende pijn tussen schouderbladen, RR rechts 160/90, links 120/80. CT: dubbelloop aorta. Diagnose?',
    a:['STEMI','Longembolie','Aortadissectie','Aorta-aneurysma ruptuur'], c:2,
    ex:'Aortadissectie: intima scheurt → bloed in aortawand. Klassiek: plotse verscheurende pijn + bloeddruksverschil tussen armen. Type A (opstijgend): chirurgie spoedmatig. Type B (dalend): medisch met bètablokker + bloeddrukcontrole.',
    wiki:{
      kern: 'Aortadissectie: scheur in de intima → bloed scheidt intima van media → vals lumen. De "dubbelloop aorta" op CT is het pathognomonische beeld. Mortaliteit type A stijgt 1-2% per uur zonder chirurgie.',
      redflag: 'Sluit aortadissectie ALTIJD uit vóór trombolyse bij pijn op de borst — trombolyse bij dissectie is fataal (bloeding in het valse lumen).',
      mechanisme: [
        { title: 'Intima-ruptuur', desc: 'Hypertensie (meest voorkomend), bindweefselziekte (Marfan, Ehlers-Danlos), bicuspide aortaklep of trauma → cyclische drukstress scheurt de intima open.' },
        { title: 'Propagatie van het valse lumen', desc: 'Arteriële druk pompt bloed via de scheur → vals lumen groeit proximaal en distaal, kan zijarteries afsluiten → orgaanischemie.' },
        { title: 'Bloeddrukasymmetrie', desc: 'Valse lumen kan de arteria subclavia links of rechts afsluiten → bloeddrukasymmetrie >20 mmHg tussen armen. Kenmerkend teken.' },
        { title: 'Stanford-classificatie', desc: 'Type A (60%): opstijgende aorta betrokken → risico tamponade, aortaklep-insufficiëntie, coronaire ischemie → chirurgie. Type B (40%): alleen dalend → medisch tenzij complicaties.' },
      ],
      onderscheid: [
        { label: 'Aortadissectie', desc: 'Maximale pijn direct bij begin ("verscheurend"), bloeddrukasymmetrie >20 mmHg, breed mediastinum op X-thorax, CT: dubbelloop aorta.', type: 'ok' },
        { label: 'STEMI', desc: 'Drukkende/knijpende pijn, ST-elevaties ECG, troponine stijgt, geen bloeddrukasymmetrie. Trombolyse wél geïndiceerd.', type: 'danger' },
        { label: 'Longembolie', desc: 'Pleuritische pijn, dyspneu, D-dimeer verhoogd, geen bloeddrukasymmetrie, geen dubbelloop op CT.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Type A: directe chirurgie (mortaliteit 25-30% met chirurgie vs 50-80% zonder). Type B: IV labetalol of esmolol → BD <120 mmHg systolisch.',
        stappen: [
          { naam: 'Diagnostiek', detail: 'CT-angiografie aorta: snel, sensitief (>95%), onderscheidt type A vs B en toont orgaanischemie.' },
          { naam: 'Pijncontrole', detail: 'Morfine IV — vermindert sympathicusactivatie en aortale wandspanning.' },
          { naam: 'Type B complicaties', detail: 'TEVAR (endovasculaire stent) bij ischemie, expansie (>5 mm/jaar) of aortaruptuur.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Amiodaron kan zowel hypo- als hyperthyreoïdie veroorzaken.',
    c:true, ex:'WAAR. Amiodaron bevat 37% jodium. Kan hypothyreoïdie veroorzaken (jodium remt schildklierhormoonproductie, Wolff-Chaikoff-effect) maar ook hyperthyreoïdie (jodiumoverload triggert autonome productie). Monitor TSH regelmatig.',
    wiki: {
      kern: 'Amiodaron bevat 37% jodium — elke 200 mg tablet geeft ~75 mg vrij jodium (normale dagelijkse inname ~150 µg). Dit jodiumoverload kan via twee mechanismen de schildklier beschadigen: remming (hypothyreoïdie) of stimulatie (hyperthyreoïdie). TSH moet elke 6 maanden gemonitord worden.',
      bigfact: { num: '37%', label: 'jodium in amiodaron', sub: 'per 200 mg tablet ~75 mg vrij jodium — 500× de normale dagelijkse inname' },
      redflag: 'Amiodaron-geïnduceerde hyperthyreoïdie (AIH) type II (destructieve thyroïditis) kan plotseling ontstaan en hemodynamisch significant zijn — herken het vroegtijdig. Thiamazol werkt mogelijk niet — dan prednison (type II) of thyreoïdectomie.',
      mechanisme: [
        { title: 'Hypothyreoïdie (type 1)', desc: 'Wolff-Chaikoff-effect: jodiumoverload remt transiënt de schildklierhormoonproductie. Bij kwetsbare schildklier (bijv. autoimmuun) is dit onvoldoende reversibel → persistente hypothyreoïdie.' },
        { title: 'Hyperthyreoïdie type 1', desc: 'Jodium-geïnduceerde autonome hormoonproductie bij onderliggende nodulaire schildklier (Jod-Basedow). Behandeling: thiamazol + perchlorate (om jodiumopname te blokkeren).' },
        { title: 'Hyperthyreoïdie type 2', desc: 'Amiodaron beschadigt schildklierfollikels direct → destructieve thyroïditis → massale hormoonafgifte. Geen nodulair substraat. Behandeling: corticosteroïden, niet thiamazol.' },
        { title: 'Andere bijwerkingen amiodaron', desc: 'Pulmonale toxiciteit (pneumonitis), levertoxiciteit (transaminasen stijging), fotodermatose, cornea-microsafzettingen, perifere neuropathie. Bloedspiegels helpen bij dosering.' },
      ],
      onderscheid: [
        { label: 'Amiodaron-thyreotoxicose (hyper + hypo)', desc: 'Beide kunnen optreden — TSH 6-maandelijks monitoren. Bij klachten direct TSH/fT4/fT3 meten.', type: 'ok' },
        { label: 'Hypothyreoïdie', desc: 'TSH verhoogd, fT4 verlaagd — behandeling: levothyroxine, amiodaron niet per se staken.', type: 'warn' },
        { label: 'Hyperthyreoïdie type 1', desc: 'TSH verlaagd, fT4 verhoogd — thiamazol + perchlorate. Erwägen: amiodaron staken.', type: 'danger' },
        { label: 'Hyperthyreoïdie type 2', desc: 'TSH verlaagd, fT4 verhoogd + klinisch ziek — prednisolon 40-60 mg/dag. Echografie: geen hypervascularisatie (vs type 1).', type: 'danger' },
      ],
      therapie: {
        urgent: 'Amiodaron-thyreotoxicose: endocrinologisch consult + cardiologisch overleg over stoppen vs doorgaan.',
        stappen: [
          { naam: 'TSH-monitoring', detail: 'Elke 6 maanden TSH, fT4, leverenzymen, X-thorax en oogheelkundig onderzoek.' },
          { naam: 'Dosisreductie', detail: 'Minimaal effectieve amiodaron-dosis gebruiken (doorgaans 100-200 mg/dag onderhoud).' },
        ],
      },
    } },

  // ── Neurologie (nieuw) ──
  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 45j: ergste hoofdpijn van haar leven, plotseling ontstaan, nekstijfheid, lichtschuw. CT hoofd normaal. Wat nu?',
    a:['Toedienen paracetamol en afwachten','Lumbaalpunctie uitvoeren','MRI hersenen aanvragen','Direct antibiotica starten zonder verder onderzoek'], c:1,
    ex:'Thunderclap hoofdpijn + nekenrigiditeit → altijd subarachnoïdale bloeding uitsluiten. CT mist 2-5% SAB in eerste uren. Lumbaalpunctie: xanthochromie (geel vocht) of verhoogde erytrocyten na 12 uur bevestigt SAB. Oorzaak: aneurysmaruptuur.',
    wiki: {
      kern: 'Donderslaghoofdpijn + nekstijfheid + negatieve CT = subarachnoïdale bloeding tot het tegendeel bewezen is. CT mist 5% van SAB. Lumbaalpunctie na ≥6 uur aantonen xanthochromie is verplichte volgende stap.',
      redflag: '"Ergste hoofdpijn van mijn leven" is een absoluut alarmsignaal. Mis dit niet als migraine. Een negatieve CT sluit SAB NIET uit — altijd LP.',
      mechanisme: [
        { title: 'Aneurysmaruptuur', desc: '80% door ruptuur van een sacculair aneurysma op een bifurcatie van de circulus van Willis → bloed in subarachnoïdale ruimte.' },
        { title: 'Donderslaghoofdpijn', desc: 'Plotse intracraniële drukverhoging door bloeding irriteert durareceptoren → maximale pijn binnen seconden.' },
        { title: 'CT sensitiviteit daalt', desc: 'CT is 98% sensitief in eerste 6u, daalt naar 85% na 24u. Na 6-12u: LP voor xanthochromie (afbraakproduct van hemoglobine → gele verkleuring).' },
      ],
      onderscheid: [
        { label: 'SAB', desc: 'Thunderclap + nekstijfheid + CT negatief. LP: xanthochromie na 12u of verhoogde erytrocyten. Aneurysmaruptuur tot bewijs van tegendeel.', type: 'ok' },
        { label: 'Bacteriële meningitis', desc: 'Koorts prominenter, langzamer begin (uren), PMN-pleocytose in liquor, geen plotse thunderclap.', type: 'warn' },
        { label: 'Migraine', desc: 'Geleidelijke opbouw, eerder episoden, nooit thunderclap bij eerste aanval. Nooit zomaar als migraine afschrijven zonder SAB-uitsluiting.', type: 'danger' },
      ],
      therapie: {
        urgent: 'CT direct → bij negatieve CT: LP na ≥6-12u voor xanthochromie. Neurochirurgie/neuroradiologie bellen bij bevestiging.',
        stappen: [
          { naam: 'Aneurysmabehandeling', detail: 'Endovasculair coilen (voorkeur) of neurochirurgisch clippen van het aneurysma. Binnen 24-72u om reruptuur te voorkomen.' },
          { naam: 'Vasospasmen preventie', detail: 'Nimodipine 60 mg oraal 4x/dag 21 dagen — vermindert ischemisch risico door vasospasmen dag 4-14.' },
          { naam: 'Reruptuur', detail: '30% risico op reruptuur in eerste dagen zonder behandeling — mortaliteit bij reruptuur >70%.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie',
    q:'Bij een ischemisch CVA mag trombolyse met alteplase gegeven worden tot 4,5 uur na begin van de klachten.',
    c:true, ex:'WAAR. Alteplase trombolyse mag tot 4,5 uur na symptoomonset (mits geen contra-indicaties). Eerder = beter: "time is brain". Contra-indicaties: recent chirurgie, bloedingsdiathese, bloeddruk >185/110, bloedglucose <2.7 of >22.',
    wiki: {
      kern: 'Alteplase (tPA) lost het stolsel op dat een hersenarterie afsluit. Het tijdvenster is 4,5 uur — maar hoe eerder, hoe beter: elke minuut vertraging = ~1,9 miljoen neuronen minder.',
      bigfact: { num: '4,5u', label: 'Trombolyse tijdvenster', sub: 'Na 4,5u: benefit daalt, bloedingsrisico stijgt. Vroeger = altijd beter.' },
      redflag: 'Trombolyse bij bloedend CVA is fataal. Altijd CT eerst. Ongecontroleerde hypertensie (>185/110) moet eerst behandeld worden vóór toediening.',
      mechanisme: [
        { title: 'tPA-werking', desc: 'Alteplase activeert plasminogeen → plasmine → fibrinolyse van het stolsel → herstellte doorbloeding.' },
        { title: 'Tijdsvenster', desc: 'Na 4,5u: ischemisch weefsel deels al infarceren → reperfusieschade + bloedingstransformatie overwegen de benefit.' },
        { title: 'Contra-indicaties', desc: 'Recente chirurgie, bloedingsdiathese, BD >185/110, glucose <2.7 of >22, orale anticoagulantia actief.' },
      ],
      onderscheid: [
        { label: 'Alteplase ≤4,5u', desc: 'Aangewezen bij ischemisch CVA, mits geen contra-indicaties. Dosis 0,9 mg/kg IV.', type: 'ok' },
        { label: 'Tenecteplase', desc: 'Alternatief in trials — vergelijkbare effectiviteit, eenmalige bolus. Steeds vaker gebruikt.', type: 'warn' },
        { label: 'Trombectomie', desc: 'Bij grote vaat-occlusie (M1, ICA): mechanische trombectomie tot 24u — superieur bij proximale occlusie.', type: 'ok' },
      ],
      therapie: {
        urgent: 'CT direct (bloeding uitsluiten) → alteplase 0,9 mg/kg IV (10% bolus, rest over 60 min) ≤4,5u.',
        stappen: [
          { naam: 'BD behandelen', detail: 'BD >185/110: labetalol of nicardipine IV. Trombolyse pas veilig na BD-controle.' },
          { naam: 'Monitoring', detail: 'ICU 24u na trombolyse: neurostatus elk uur, BD controle, aspirine uitstellen 24u.' },
          { naam: 'Secundaire preventie', detail: 'Aspirine + hoge-dosis statine na 24u bij ischemisch CVA. Anticoagulantia bij AF na 2-14 dagen.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 25j: tonisch-clonische aanval 3 minuten, daarna verward en slaperig. Geen koorts. Eerste aanval. Meest waarschijnlijke diagnose?',
    a:['Meningitis','Epilepsie','Hypoglykemie','Psychogene aanval'], c:1,
    ex:'Epilepsie: tonisch-clonische aanval + postictale fase (verwardheid, vermoeidheid). Eerste aanval: EEG en MRI voor structurele oorzaak. Antiepilepticum bij twee aanvallen of verhoogd recidiefrisico. Rijverbod geldt tot 1 jaar aanvalsvrij.',
    wiki: {
      kern: 'Een gegeneraliseerde tonisch-clonische aanval met postictale fase (verwardheid, vermoeidheid, slaap) is het klassieke beeld van epilepsie. Na een eerste aanval: EEG + MRI om structurele oorzaak en aanvalstype te bepalen.',
      redflag: 'Aanhoudende aanval >5 minuten = status epilepticus. Eerste aanval bij volwassene: altijd MRI om tumor, absces, bloeding of dysplasie uit te sluiten.',
      mechanisme: [
        { title: 'Hyperexcitabiliteit', desc: 'Ongecontroleerde neuronale ontlading — te veel excitatie (glutamaat) of te weinig inhibitie (GABA) → verspreiding door beide hemisferen.' },
        { title: 'Tonische fase', desc: 'Massale motorische ontlading → spierstijfheid, apneu, cyanose (seconden tot 1 minuut).' },
        { title: 'Clonische fase', desc: 'Afwisselende inhibitie → rhythmische spierschokken. Daarna postictale uitputting (minuten tot uren).' },
      ],
      onderscheid: [
        { label: 'Epilepsie', desc: 'Tonisch-clonisch + postictale fase + EEG-afwijking. Oorzaak opsporen: MRI, bloedonderzoek (glucose, elektrolyten, Na).', type: 'ok' },
        { label: 'Syncope', desc: 'Kortdurend bewustzijnsverlies, enkele spierschokken mogelijk maar geen tong-beet of langdurig postictaal. EEG normaal.', type: 'warn' },
        { label: 'Hypoglykemie', desc: 'Glucose <2,8 → aanval. Altijd bloedsuiker bepalen bij aanval! Corrigeerbaar.', type: 'danger' },
        { label: 'Meningitis', desc: 'Koorts + nekstijfheid + fotofobie. Aanvallen mogelijk maar infectieus beeld staat op de voorgrond.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Aanval >5 min: diazepam 10 mg rectaal of midazolam 10 mg buccaal.',
        stappen: [
          { naam: 'Eerste aanval', detail: 'Niet altijd direct behandelen — kans op recidief na eerste aanval is 40-50%. Beslissing afhankelijk van EEG, MRI en risicoprofiel.' },
          { naam: 'Antiepilepticum', detail: 'Bij tweede aanval of hoog recidiefrisico: levetiracetam of lamotrigine (breed spectrum). Valproaat bij gegeneraliseerde epilepsie.' },
          { naam: 'Rijverbod', detail: 'Minimaal 1 jaar aanvalsvrij voor autorijden. Patiënt moet dit weten — meldingsplicht in NL.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 30j: episodisch dubbelzijdige armen en benen zwak, ooghangend (ptosis), erger aan einde van dag. Verbetering na ijs op oog. Diagnose?',
    a:['Multiple sclerose','Myasthenia gravis','Amyotrofische lateraalsclerose','Guillain-Barré'], c:1,
    ex:'MG: auto-antilichamen tegen acetylcholinereceptor → neuromusculaire transmissie gestoord. Klassiek: vermoeibare zwakte, ptosis, wisselend beloop. IJstest: kou verbetert transmissie tijdelijk. Behandeling: pyridostigmine, immunosuppressie, thymectomie.',
    wiki: {
      kern: 'Myasthenia gravis is een auto-immuunziekte waarbij antilichamen de neuromusculaire verbinding blokkeren. Kenmerk: vermoeibare spierzwakte — erger bij gebruik, beter na rust. Dit verklaart de "einde van de dag"-verslechtering en de ijstest.',
      redflag: 'Myasthene crisis: verslechtering van ademhalingsspieren → levensbedreigende respiratoire insufficiëntie. Monitor FVC — bij daling: ICU-opname en IVIG/plasmaferese.',
      mechanisme: [
        { title: 'AChR-antilichamen', desc: 'Auto-antilichamen binden acetylcholinereceptoren (AChR) op het motorische eindplaat → minder receptoren → spiervezels reageren steeds minder.' },
        { title: 'Ijstest', desc: 'Kou verbetert tijdelijk de acetylcholinerelease en remt antilichaamactiviteit → ptosis vermindert bij 2 min ijs op het oog — diagnostisch bruikbaar.' },
        { title: 'Thymuspathologie', desc: '70% heeft thymushyperplasie, 10-15% thymoom. Thymectomie geeft remissie bij jonge patiënten <60j.' },
      ],
      onderscheid: [
        { label: 'Myasthenia gravis', desc: 'Vermoeibare zwakte (slechter \'s avonds), ptosis, diplopie, dysartrie. AChR-antilichamen positief in 85%. Ijstest positief.', type: 'ok' },
        { label: 'Lambert-Eaton (LEMS)', desc: 'Ook neuromusculair maar zwakte verbetert juist bij herhaald gebruik (presynaptisch defect). Paraneoplastisch bij longkanker (VGCC-antilichamen).', type: 'danger' },
        { label: 'MS', desc: 'CNS-demyelinisatie, sensibiliteit aangedaan, MRI-laesies. Zwakte niet vermoeibaarheidsgerelateerd.', type: 'warn' },
        { label: 'ALS', desc: 'Motorisch maar onomkeerbaar, fasciculaties, atrofie, geen extraoculaire spieren.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Pyridostigmine (anticholinesterase) — vergroot hoeveelheid ACh op de synaps. Snel werkzaam, symptomatisch.',
        stappen: [
          { naam: 'Immunosuppressie', detail: 'Prednisolon + azathioprine voor langdurige ziekte-modificerende behandeling.' },
          { naam: 'Thymectomie', detail: 'Bij thymoom altijd; bij ≤60j zonder thymoom ook effectief (MGTX-trial).' },
          { naam: 'Crisis', detail: 'IVIG 2 g/kg of plasmaferese — snel werkzaam bij respiratoire dreiging.' },
          { naam: 'Verboden medicatie', detail: 'Aminoglycosiden, fluorchinolonen, chloroquine — verergeren neuromusculaire transmissie.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie',
    q:'Multiple sclerose tast zowel het centraal als het perifeer zenuwstelsel aan.',
    c:false, ex:'NIET WAAR. MS is een demyeliniserende ziekte van het centraal zenuwstelsel (hersenen + ruggenmerg). Het perifeer zenuwstelsel wordt gespaard. Kenmerk: laesies gescheiden in tijd en plaats. Diagnose: MRI + klinisch beeld + liquoronderzoek.',
    wiki: {
      kern: 'MS is een auto-immuun demyeliniserende ziekte die uitsluitend het centrale zenuwstelsel (hersenen, ruggenmerg, oogzenuw) aantast. Het perifere zenuwstelsel is gespaard — dit is een cruciaal onderscheidend kenmerk.',
      redflag: 'MS is geen perifere neuropathie! GBS, CIDP en polyneuropathie tasten het PZS aan. MS: laesies in de witte stof van het CZS, gescheiden in tijd én plaats.',
      mechanisme: [
        { title: 'Auto-immuun demyelinisatie CZS', desc: 'T-cellen infiltreren CNS, beschadigen myeline van axonen → geleidingsvertraging of blokkade → neurologische uitval.' },
        { title: 'Gescheiden in tijd en plaats', desc: 'McDonald-criteria vereisen ≥2 aanvallen op ≥2 CZS-locaties. MRI kan "disseminatie in ruimte en tijd" bevestigen zonder tweede aanval.' },
        { title: 'PZS gespaard', desc: 'Schwann-cellen (PZS-myeline) worden niet aangetast. Reflexen normaal of verhoogd (UMN-kenmerken).' },
      ],
      onderscheid: [
        { label: 'MS (CZS)', desc: 'Demyelinisatie CZS: periventriculaire MRI-laesies, oligoklonale banden, opticus neuritis. PZS intact.', type: 'ok' },
        { label: 'GBS (PZS)', desc: 'Ascending paralysis + areflexie — PZS-demyelinisatie. Liquor: albuminocytologische dissociatie.', type: 'warn' },
        { label: 'NMO (Devic)', desc: 'Ook CZS maar specifiek oogzenuw + ruggenmerg, AQP4-antilichamen, ernstiger aanvallen dan MS.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Acute relaps: methylprednisolon 1g IV 3-5 dagen (versnelt herstel, geen effect op langetermijnbeloop).',
        stappen: [
          { naam: 'Ziekte-modulerende therapie', detail: 'Interferon-bèta, glatirameracetat (milde MS) of natalizumab/ocrelizumab (actieve MS) — verminderen relapsfrequentie.' },
          { naam: 'Diagnose', detail: 'McDonald-criteria: MRI (periventriculair, juxtacorticaal, infratentorieel, spinaal) + liquor (oligoklonale banden) + kliniek.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 65j: progressief geheugenverlies, persoonlijkheidsverandering, 3 jaar klachten. MRI: diffuse corticale atrofie temporopariëtaal. Diagnose?',
    a:['Vasculaire dementie','Alzheimer','Lewy-body dementie','Frontotemporale dementie'], c:1,
    ex:'Alzheimer: meest voorkomende dementievorm (60-70%). Pathologie: amyloïd-plaques + tau-neurofibrillaire klitten. Temporopariëtale atrofie op MRI. Vroeg: geheugenproblemen. Later: apraxie, agnosie. Behandeling: cholinesteraseremmers (symptomatisch).',
    wiki: {
      kern: 'Alzheimer is de meest voorkomende dementievorm (60-70%). Begint sluipend met geheugenverlies voor recente gebeurtenissen, progressief over jaren tot volledige zorgafhankelijkheid. MRI: temporopariëtale atrofie.',
      bigfact: { num: '60-70%', label: 'Van alle dementie', sub: 'Alzheimer is verreweg de meest voorkomende oorzaak. Prevalentie verdubbelt elke 5 jaar na 65.' },
      mechanisme: [
        { title: 'Amyloïd-plaques', desc: 'Bèta-amyloïd accumuleert extracellullair tussen neuronen → inflammatie + synaptische dysfunctie.' },
        { title: 'Tau-neurofibrillaire klitten', desc: 'Gehyperfosforyleerd tau-eiwit klontert intracellullair → transport in axon verstoord → neuronsterfte.' },
        { title: 'Cholinerge tekort', desc: 'Nucleus basalis van Meynert (ACh-producerend) degenereert vroeg → geheugen en aandacht achteruit. Vandaar cholinesteraseremmers.' },
      ],
      onderscheid: [
        { label: 'Alzheimer', desc: 'Sluipend begin, episodisch geheugen eerst aangedaan, MRI temporopariëtale atrofie, amyloïd-PET of liquor biomarkers positief.', type: 'ok' },
        { label: 'Lewy-body dementie (DLB)', desc: 'Visuele hallucinaties + parkinsonisme + slaap-REM-stoornissen. CAVE: antipsychotica zijn gevaarlijk (ernstige overgevoeligheidsreacties).', type: 'danger' },
        { label: 'Vasculaire dementie', desc: 'Trapsgewijs verloop, cardiovasculaire risicofactoren, witte-stofafwijkingen op MRI, lacunaire infarcten.', type: 'warn' },
        { label: 'Frontotemporale dementie (FTD)', desc: 'Jong begin (<65j), persoonlijkheidsverandering of taaluitval vóór geheugenklachten. Frontale atrofie op MRI.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Geen curatieve behandeling — cholinesteraseremmers voor symptoomvertraging.',
        stappen: [
          { naam: 'Cholinesteraseremmers', detail: 'Donepezil of rivastigmine — verhogen acetylcholine, bescheiden symptoomverbetering bij milde-matige Alzheimer.' },
          { naam: 'Memantine', detail: 'NMDA-receptorantagonist — bij matige-ernstige Alzheimer, kan met cholinesteraseremmer gecombineerd worden.' },
          { naam: 'Anti-amyloïd antilichamen', detail: 'Lecanemab en donanemab: vertraagt klinische achteruitgang bij vroege Alzheimer (recent goedgekeurd).' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 35j: plotse eenzijdige visusdaling, pijn bij oogbewegingen, kleur ziet minder helder. MRI: witte stof afwijking in nervus opticus. Diagnose?',
    a:['Glaucoom','Retina-ablatio','Neuritis optica','Migraine met aura'], c:2,
    ex:'Neuritis optica: inflammatie van de oogzenuw, vaak eerste uiting van MS. Pijn bij oogbewegingen + unilateraal visusverliess + verminderde kleurwaarneming. Behandeling: IV methylprednisolon versnelt herstel. MRI-hersenen verplicht.',
    wiki: {
      kern: 'Neuritis optica is inflammatie van de nervus opticus, in 50% van de gevallen de eerste manifestatie van MS. De klassieke triade: acuut unilateraal visusverliess + pijn bij oogbewegingen + verminderde kleurwaarneming (rood ziet er grauw uit).',
      redflag: 'Na neuritis optica: 50% kans op MS-diagnose binnen 15 jaar. MRI-hersenen is verplicht — laesies aanwezig → hoog conversierisico → start ziekte-modulerende therapie overwegen.',
      mechanisme: [
        { title: 'Auto-immuun demyelinisatie', desc: 'Inflammatoire cellen beschadigen myeline van de oogzenuw → vertraagde of geblokkeerde prikkelgeleiding → visusverliess en pijn.' },
        { title: 'Pijnmechanisme', desc: 'De nervus opticus loopt door een beperkte ruimte → zwelling bij inflammatie irriteert de zenuwschede → pijn bij oogbewegingen (tractie).' },
        { title: 'Kleurzien', desc: 'Papillomaculaire bundel (kleurvisie, centraal zien) is het meest gevoelig voor demyelinisatie.' },
      ],
      onderscheid: [
        { label: 'Neuritis optica (MS)', desc: 'Jong, vrouw, pijn bij oogbewegingen, unilateraal, verlaagde kleurzien. MRI: laesie nervus opticus. VEP vertraagd.', type: 'ok' },
        { label: 'NMO (Devic)', desc: 'Ernstigere neuritis optica + longitudinale myelitis. AQP4-antilichamen positief. Slechte prognose, andere behandeling.', type: 'danger' },
        { label: 'Glaucoom', desc: 'Chronisch, pijnloos, verhoogde oogdruk, gezichtsvelduitval perifeer. Geen pijn bij oogbewegingen.', type: 'warn' },
        { label: 'Retina-ablatio', desc: 'Plotse pijnloze visusuitval + "gordijn" of flashes. Geen pijn bij bewegen. Oogheelkundige spoed.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Methylprednisolon 1g IV 3 dagen — versnelt herstel, geen effect op einduikomst.',
        stappen: [
          { naam: 'MRI hersenen', detail: 'Verplicht na elke neuritis optica — laesies aanwezig: verhoogd MS-conversierisico → bespreek preventieve behandeling.' },
          { naam: 'VEP', detail: 'Visueel evoked potential: vertraagde P100-golf bevestigt optische schade ook na herstel zichtacuïteit.' },
          { naam: 'Prognose', detail: '90% herstelt visueel na 3-6 maanden. Kleurwaarneming en contrastgevoeligheid kunnen blijvend gestoord zijn.' },
        ],
      },
    } },

  { type:'pharma', d:3, domain:'neuro', dl:'Neurologie',
    q:'Welk medicijn is eerstekeus bij gegeneraliseerde tonisch-clonische epilepsie?',
    a:['Carbamazepine','Natriumvalproaat','Fenytoïne','Gabapentine'], c:1,
    ex:'Valproaat is breed-spectrum antiepilepticum: werkt bij gegeneraliseerde én partiële aanvallen. Remt Na-kanalen en verhoogt GABA. Cave: teratogeen — absoluut vermijden bij vrouwen in vruchtbare leeftijd zonder adequate anticonceptie. Alternatief: levetiracetam.',
    wiki: {
      kern: 'Natriumvalproaat is het breed-spectrum anti-epilepticum van eerste keus bij gegeneraliseerde epilepsie. Het werkt via meerdere mechanismen (Na-kanaalremming, GABA-verhoging) maar is sterk teratogeen — veroorzaakt spina bifida en cognitieve schade bij het kind.',
      redflag: 'Valproaat is ABSOLUUT gecontraïndiceerd bij zwangere vrouwen en vrouwen in de vruchtbare leeftijd zonder effectieve anticonceptie. Alternatief: levetiracetam of lamotrigine.',
      mechanisme: [
        { title: 'Na-kanaalremming', desc: 'Remt snelle herhaalde ontlading van neuronen → verlaagt aanvalsdrempel.' },
        { title: 'GABA-verhoging', desc: 'Remt GABA-transaminase → meer remmende GABA-activiteit in CZS.' },
        { title: 'Teratogeniteit', desc: 'Valproaat remt folaatmetabolisme en epigenetische processen → neurale buisdefecten (spina bifida 2-3%), dysmorfieën, IQ-daling kind.' },
      ],
      onderscheid: [
        { label: 'Valproaat (breed-spectrum)', desc: 'Tonisch-clonisch + absence + myoclonus. Eerste keus bij mannen en vrouwen zonder zwangerschapswens.', type: 'ok' },
        { label: 'Levetiracetam', desc: 'Breed-spectrum, veiliger profiel, geen teratogeniteitsworry — alternatief bij vrouwen in vruchtbare leeftijd.', type: 'ok' },
        { label: 'Carbamazepine', desc: 'Smal spectrum — alleen focale epilepsie. Kan gegeneraliseerde epilepsie (absence, myoclonus) verergeren.', type: 'danger' },
        { label: 'Ethosuximide', desc: 'Alleen bij absence-epilepsie — geen effect op tonisch-clonische aanvallen.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Status epilepticus: benzodiazepine IV/rectaal → fenytoïne of levetiracetam IV.',
        stappen: [
          { naam: 'Valproaat start', detail: '500-1000 mg/dag, langzaam ophogen. Therapeutisch: serumspiegels 50-100 mg/L.' },
          { naam: 'Vrouwen in vruchtbare leeftijd', detail: 'Levetiracetam of lamotrigine als eerste keus — valproaat alleen als alternatieven falen + goede anticonceptie.' },
          { naam: 'Monitoring', detail: 'Leverenzymen, ammoniak (bij verwardheid), gewicht (valproaat → gewichtstoename).' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 55j: progressieve zwakte benen, later armen, fasciculaties, geen sensibiliteitsstoornissen, hyperreflexie. Diagnose?',
    a:['Guillain-Barré syndroom','Multiple sclerose','Amyotrofische lateraalsclerose (ALS)','Myasthenia gravis'], c:2,
    ex:'ALS: degeneratie van centrale én perifere motorische neuronen. Combinatie UMN (hyperreflexie, spasticiteit) + LMN (fasciculaties, atrofie) zónder sensibiliteitsverlies. Progressief, fataal gemiddeld 3-5 jaar. Riluzol verlengt overleving licht.',
    wiki: {
      kern: 'ALS (amyotrofische lateraalsclerose) is een progressieve degeneratie van zowel het bovenste (UMN) als het onderste (LMN) motorische neuron. Kenmerk: spierzwakte + fasciculaties + hyperreflexie — maar nooit sensibiliteitsverlies.',
      redflag: 'ALS spaart de sensibiliteit volledig. Sensibiliteitsverlies bij vergelijkbaar beeld: denk aan MS, compressie of GBS. Respiratoire insufficiëntie is de meest voorkomende doodsoorzaak.',
      mechanisme: [
        { title: 'UMN-degeneratie', desc: 'Motorische cortex → hyperreflexie, spasticiteit, teken van Babinski, pathologische reflexen.' },
        { title: 'LMN-degeneratie', desc: 'Voorhoorncel in ruggenmerg/hersenstam → spieratrofie, fasciculaties, hypotonie, krachtsverlies.' },
        { title: 'Sensibiliteit gespaard', desc: 'Sensibele banen in ruggenmerg blijven intact — cruciale onderscheidende eigenschap van ALS.' },
      ],
      onderscheid: [
        { label: 'ALS', desc: 'UMN + LMN tegelijk, geen sensibiliteitsverlies. Progressief fataal. EMG: denervatie + fasci­culaties.', type: 'ok' },
        { label: 'MS', desc: 'Demyelinisatie CZS, relaps-remitterend, sensibiliteitsstoornissen aanwezig, MRI-laesies.', type: 'warn' },
        { label: 'GBS', desc: 'Ascending paralysis + areflexie + sensorische uitval. Acuut begin, na infectie.', type: 'warn' },
        { label: 'Spinale musculaire atrofie (SMA)', desc: 'Alleen LMN, geen UMN-kenmerken. Genetisch (SMN1-mutatie). Langzamer beloop.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Geen curatieve behandeling — supportief en levensverlenging.',
        stappen: [
          { naam: 'Riluzol', detail: 'Glutamaatantagonist — verlengt overleving gemiddeld 3-6 maanden. Enige geregistreerde farmacologische therapie.' },
          { naam: 'Edaravone (Radicava)', detail: 'Vrije-radicalenscavenger — vertraagt functionele achteruitgang in vroege ALS bij selecte patiënten.' },
          { naam: 'Symptomatisch', detail: 'Sialorrhoea: glycopyrrolaat. Dysfagie: PEG-sonde. Respiratoire insufficiëntie: NIV (non-invasive ventilation).' },
          { naam: 'Prognose', detail: 'Mediane overleving 3-5 jaar na diagnose. 10% overleeft >10 jaar (o.a. Stephen Hawking als uitzondering).' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie',
    q:'Guillain-Barré syndroom begint typisch in de armen en verspreidt zich naar de benen.',
    c:false, ex:'NIET WAAR. GBS begint typisch in de benen (ascending paralysis) en verspreidt zich omhoog. Oorzaak: auto-immuun demyelinisatie perifere zenuwen, vaak na infectie (Campylobacter, CMV). Behandeling: IVIG of plasmaferese. Let op ademhaling.',
    wiki: {
      kern: 'GBS begint in de benen en stijgt omhoog (ascending paralysis) — het omgekeerde van de bewering in de vraag. Het gevaar zit in ademhalingsspieruitval wanneer de uitval de thorax bereikt.',
      redflag: '30% van GBS-patiënten heeft beademing nodig. Monitor vitale capaciteit (FVC) elke 4-6u. FVC <20 ml/kg of snel dalend → elektieve intubatie vóór crisis.',
      mechanisme: [
        { title: 'Moleculaire mimicry', desc: 'Antilichamen tegen Campylobacter, CMV of EBV kruisreageren met gangliosiden op perifeer myeline → ascending demyelinisatie.' },
        { title: 'Ascending patroon', desc: 'Distale benen eerst → proximale benen → romp → armen → craniale zenuwen (facialisparese, dysfagie).' },
        { title: 'Areflexie', desc: 'Verlies van myeline in sensorische bogen → areflexie is een kenmerkend vroeg teken, ook bij nog minimale zwakte.' },
      ],
      onderscheid: [
        { label: 'GBS', desc: 'Ascending paralysis + areflexie + albuminocytologische dissociatie in liquor. Acuut, na infectie.', type: 'ok' },
        { label: 'ALS', desc: 'Chronisch-progressief, UMN + LMN samen, geen sensibiliteitsverlies, fasciculaties.', type: 'warn' },
        { label: 'Botulisme', desc: 'Dalende (descending) paralysis van boven naar beneden. Pupilreacties gestoord. Geen koorts.', type: 'danger' },
        { label: 'Dwarsmyelitis', desc: 'Spinaal niveau, blaas/darm vroeg aangedaan, UMN-kenmerken (hyperreflexie).', type: 'warn' },
      ],
      therapie: {
        urgent: 'IVIG 2 g/kg over 5 dagen OF plasmaferese — gelijkwaardig effectief. Geen corticosteroïden.',
        stappen: [
          { naam: 'FVC-monitoring', detail: 'Vitale capaciteit elke 4-6u. FVC <20 ml/kg = intubatie-indicatie. De "20-30-40-regel": FVC <20, PaO2 <30 mmHg, PaCO2 >40 → IC.' },
          { naam: 'Pijnbehandeling', detail: 'Dysesthezie/zenuwpijn: gabapentine of amitriptyline. NSAID\'s weinig effectief.' },
          { naam: 'Prognose', detail: '80% volledig herstel na 6-12 maanden. 5% blijft ernstig gehandicapt.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 72j: rusttremor rechterhand, stijfheid, traagheid, kleine pasjes. Diagnose?',
    a:['Essentiële tremor','Parkinson','Multisystematrofie','Huntington'], c:1,
    ex:'Parkinson: verlies dopaminerge neuronen in substantia nigra. Klassieke triade: rusttremor (pil-draaibewegingen) + rigiditeit + bradykinesie. Asymmetrisch begin. Behandeling: levodopa (meest effectief). Niet-motorische sympt: depressie, reukstoornissen.',
    wiki: {
      kern: 'Parkinson ontstaat door progressief verlies van dopamine-producerende neuronen in de substantia nigra. Als 70-80% verloren is, verschijnt de klassieke triade: rusttremor + rigiditeit + bradykinesie — altijd asymmetrisch begin.',
      redflag: 'Parkinson-plus syndromen (MSA, PSP, CBS) reageren slecht op levodopa en hebben een ernstigere prognose. Vroeg vallen, symmetrisch begin en geringe levodopa-respons zijn alarmsignalen.',
      mechanisme: [
        { title: 'Alfa-synucleine', desc: 'Eiwit klontert samen in Lewy-bodies → accumuleert in neuronen van substantia nigra → versnelde celdood.' },
        { title: 'Prodromale fase', desc: 'Reukstoornis, REM-slaapgedragsstoornis en constipatie gaan jaren vooraf aan motorische klachten — de ziekte begint buiten de hersenen.' },
        { title: 'Dopaminetekort', desc: 'Striatum ontvangt te weinig dopamine → basale ganglia circuit verstoord → bewegingsinitiatie geremd → bradykinesie + rigiditeit + tremor.' },
      ],
      onderscheid: [
        { label: 'Parkinson', desc: 'Rusttremor (4-6 Hz, pill-rolling), asymmetrisch begin, bradykinesie, rigiditeit, goede levodopa-respons, geen vroeg vallen.', type: 'ok' },
        { label: 'Essentiële tremor', desc: 'Houdingstremor (niet in rust), bilateraal, verbetert met alcohol, geen bradykinesie/rigiditeit. Familiegeschiedennis.', type: 'warn' },
        { label: 'Parkinson-plus (MSA/PSP)', desc: 'Vroeg autonome dysfunctie (MSA) of vroeg vallen achterover (PSP). Slechte levodopa-respons. Ernstiger dan idiopathisch Parkinson.', type: 'danger' },
        { label: 'DLB (Lewy-body dementie)', desc: 'Parkinsonisme + dementie + visuele hallucinaties tegelijk. CAVE: antipsychotica zijn gevaarlijk.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Levodopa + carbidopa (dopa-decarboxylaseremmer) — meest effectief, goudstandaard.',
        stappen: [
          { naam: 'Dopamine-agonisten', detail: 'Pramipexol of ropinirol als alternatief bij jongere patiënten (<70j) — minder "wearing off", meer psychiatrische bijwerkingen.' },
          { naam: 'MAO-B-remmers', detail: 'Rasagiline of selegiline — lichte effectiviteit, neuroprotectief effect onbevestigd.' },
          { naam: 'Diepe hersenstimulatie (DBS)', detail: 'Bij invaliderende tremor of motorische fluctuaties na medicamenteuze optimalisatie — subthalame kern als target.' },
          { naam: 'Niet-motorisch', detail: 'Antidepressiva (depressie bij 40%), melatonine (slaapstoornis), laxantia, fysiotherapie.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 40j: migraine-aanvallen, nu ook zwakte linkerarm tijdens aanval. Wat is de term hiervoor?',
    a:['Aura zonder hoofdpijn','Hemiplegische migraine','Basilaire migraine','TIA'], c:1,
    ex:'Hemiplegische migraine: zeldzame vorm waarbij motorische uitval optreedt als aurasymptoom. Belangrijk: eerst TIA/CVA uitsluiten! Familiaire vorm: CACNA1A-genmutatie. Triptanen en ergotaminen gecontra-indiceerd bij hemiplegische migraine.',
    wiki: {
      kern: 'Hemiplegische migraine is een zeldzame migrainevariant waarbij motorische uitval (hemiparese) optreedt als aurasymptoom — volledig reversibel. Het is geen CVA, maar TIA/CVA MOET altijd worden uitgesloten bij een eerste episode.',
      redflag: 'Triptanen en ergotaminen zijn GECONTRAÏNDICEERD bij hemiplegische migraine — risico op vasospasmen en ischemisch CVA. Gebruik paracetamol/NSAID voor aanvalsbehandeling.',
      mechanisme: [
        { title: 'Cortical spreading depression', desc: 'Golven van neuronale hyperactiviteit gevolgd door depressie verspreiden zich over de cortex → motorische cortex → tijdelijke hemiparese als aura.' },
        { title: 'Familiaire vorm (FHM)', desc: 'Autosomaal dominant. Mutaties in ionkanalen (CACNA1A, ATP1A2, SCN1A) verstoren de ionhomeostase → verhoogde gevoeligheid voor spreading depression.' },
        { title: 'Reversibiliteit', desc: 'De uitval trekt volledig terug na minuten tot uren — dit is het kenmerkende verschil met een CVA.' },
      ],
      onderscheid: [
        { label: 'Hemiplegische migraine', desc: 'Motorische aura + hoofdpijn. Volledig reversibel. Eerder migraineepisoden. CACNA1A-mutatie mogelijk.', type: 'ok' },
        { label: 'TIA', desc: 'Geen hoofdpijn vooraf, leeftijd >50j, cardiovasculaire risicofactoren. Altijd uitsluiten bij eerste episode.', type: 'danger' },
        { label: 'Basilaire migraine', desc: 'Aura met hersenstamsymptomen (dysartrie, diplopia, ataxie, tintelingen bilateraal) — geen hemiparese.', type: 'warn' },
      ],
      therapie: {
        urgent: 'GEEN triptanen of ergotaminen. Paracetamol 1000 mg of NSAID voor aanvalsbehandeling.',
        stappen: [
          { naam: 'Aanvalsbehandeling', detail: 'Paracetamol, naproxen of ibuprofen. Domperidon bij misselijkheid. Geen triptanen.' },
          { naam: 'Profylaxe', detail: 'Valproaat of topiramaat — bij frequente of invaliderende aanvallen.' },
          { naam: 'Genetische counseling', detail: 'Bij familiaire hemiplegische migraine: CACNA1A-gentest overwegen. Familieleden informeren.' },
        ],
      },
    } },

  { type:'lab', d:5, domain:'neuro', dl:'Neurologie',
    q:'Liquor: verhoogd eiwit, normaal glucose, lymfocytose, oligoklonale banden aanwezig. Meest waarschijnlijke diagnose?',
    a:['Bacteriële meningitis','Multiple sclerose','Virale meningitis','Subarachnoïdale bloeding'], c:1,
    ex:'Oligoklonale banden in liquor (niet in serum) zijn kenmerkend voor MS — aanwezig bij >95%. Virale meningitis: lymfocytose + normaal eiwit + normaal/licht verlaagd glucose. Bacterieel: neutrofiele pleiocytose + sterk verhoogd eiwit + laag glucose.',
    wiki: {
      kern: 'Oligoklonale banden (OCB) in liquor maar niet in serum zijn het meest kenmerkend voor MS — aanwezig bij >95% van MS-patiënten. Ze weerspiegelen lokale immunoglobulineproductie in het CZS.',
      redflag: 'Oligoklonale banden zijn niet 100% specifiek voor MS — ook bij neuroborreliose, neurosyfilis en NMOSD. Altijd combineren met MRI en kliniek voor diagnose.',
      mechanisme: [
        { title: 'IgG-productie in CZS', desc: 'Bij MS produceren geactiveerde B-cellen in het CZS klonale IgG-antilichamen → zichtbaar als scherpe banden op iso-electrofocusing van liquor.' },
        { title: 'Liquor vs serum', desc: 'OCB alleen in liquor (niet serum) = intrathecale productie. OCB in beide: systemische infectie/inflammatie.' },
        { title: 'Glucose normaal', desc: 'Bij MS is glucose normaal — laag glucose wijst op bacteriële meningitis (bacteriën consumeren glucose).' },
      ],
      onderscheid: [
        { label: 'MS', desc: 'OCB in liquor (niet serum), lymfocytose mild, eiwit licht verhoogd, normaal glucose. >95% gevoeligheid.', type: 'ok' },
        { label: 'Bacteriële meningitis', desc: 'Neutrofiele pleiocytose (>1000 cellen), sterk verhoogd eiwit, laag glucose (<60% serumglucose), gram-kleuring positief.', type: 'danger' },
        { label: 'Virale meningitis', desc: 'Lymfocytose mild-matig, normaal eiwit of licht verhoogd, normaal glucose. Geen OCB.', type: 'warn' },
        { label: 'SAB', desc: 'Bloederige liquor, xanthochromie na centrifugeren. Geen OCB. Normaal celgetal (erytrocyten).', type: 'warn' },
      ],
      therapie: {
        urgent: 'Geen spoedindicatie bij MS-liquorprofiel — diagnose stellen en ziekte-modulerende therapie bespreken.',
        stappen: [
          { naam: 'McDonald-criteria', detail: 'OCB in liquor kan "disseminatie in tijd" vervangen in McDonald-criteria — versnelt MS-diagnose na eerste aanval.' },
          { naam: 'Ziekte-modulerende therapie', detail: 'Na MS-diagnose: interferon-bèta, glatirameracetat of natalizumab/ocrelizumab afhankelijk van activiteit.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie',
    q:'Bij bacteriële meningitis moet lumbaalpunctie altijd worden uitgesteld tot na CT-scan.',
    c:false, ex:'NIET WAAR. Antibiotica mogen NIET worden uitgesteld voor CT. Start direct antibiotica als er tekenen van verhoogde hersendruk zijn (papiloedeem, bewustzijnsdaling) en doe dan CT. Anders: LP eerst. Uitstel antibiotica verhoogt mortaliteit significant.',
    wiki: {
      kern: 'Bij bacteriële meningitis gaat antibioticastart altijd vóór CT. Uitstel van antibiotica voor CT verhoogt mortaliteit significant. LP kan wachten; antibiotica niet.',
      redflag: 'Elk uur uitstel van antibiotica bij bacteriële meningitis verhoogt de kans op dood of blijvende schade. Start ceftriaxon + dexamethason zodra de diagnose wordt overwogen.',
      mechanisme: [
        { title: 'Verhoogde hersendruk', desc: 'Meningitis → inflammatie → oedeem → verhoogde ICP. LP bij verhoogde ICP → risico op inklemming (transtentorieel of uncaal).' },
        { title: 'CT vóór LP indicaties', desc: 'Verhoogde ICP tekenen: papiloedeem, focale uitval, bewustzijnsdaling, immuungecompromitteerd. Dan: CT eerst, antibiotica direct zonder LP te wachten.' },
        { title: 'Antibiotica vóór LP', desc: 'Antibiotica starten verandert de liquorcultuur maar niet de meningitis-diagnose — klinische beeld en PCR blijven bruikbaar.' },
      ],
      onderscheid: [
        { label: 'Geen verhoogde druk tekenen', desc: 'LP direct → antibiotica na liquorafname. Geen CT vereist eerst.', type: 'ok' },
        { label: 'Verhoogde druk (papiloedeem/bewusteloosheid)', desc: 'Antibiotica + dexamethason direct → CT → LP als veilig. Geen uitstel antibiotica.', type: 'danger' },
        { label: 'Petechiën + septische shock', desc: 'Meningokokkensepsis: antibiotica in ambulance al. LP later als stabiel.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Ceftriaxon 2g IV + dexamethason 10mg IV — direct, nog vóór CT of LP als verhoogde druk vermoed.',
        stappen: [
          { naam: 'Dexamethason', detail: '10 mg IV 4x/dag 4 dagen — verlaagt mortaliteit bij pneumokokken-meningitis. Starten gelijktijdig met antibiotica.' },
          { naam: 'LP timing', detail: 'LP direct als geen verhoogde ICP-tekenen. CT eerst bij focale uitval, bewustzijnsdaling, papiloedeem of immuunsuppressie.' },
          { naam: 'Empirische dekking', detail: 'Ceftriaxon dekt S. pneumoniae + N. meningitidis. Voeg amoxicilline toe bij >50j (Listeria).' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Kind 8j: plotse bewusteloosheid, starende blik 10 seconden, daarna normaal. Geen tonisch-clonische bewegingen. EEG: 3Hz spike-wave. Diagnose?',
    a:['Grote aanval (tonisch-clonisch)','Absence-epilepsie','Focale epilepsie','Syncope'], c:1,
    ex:'Absence-epilepsie: korte bewustzijnsonderbreking, geen postictale fase, typisch 3Hz generalized spike-wave op EEG. Begint op kinderleeftijd, vaak spontane remissie. Behandeling: ethosuximide of valproaat. Geen rijverbod tot 1 jaar vrij.',
    wiki: {
      kern: 'Absence-epilepsie is een gegeneraliseerde epilepsievariant bij kinderen: korte (5-20 sec) bewustzijnsonderbreking met starende blik, geen postictale fase. EEG: 3Hz gegeneraliseerde spike-wave is pathognomonisch.',
      redflag: 'Absence-epilepsie kan worden verward met dagdromen of aandachtsproblemen — de diagnose wordt vaak gemist. Tientallen absences per dag = grote leerimpact. Hyperventilatie provoceert absences tijdens EEG.',
      mechanisme: [
        { title: '3Hz spike-wave', desc: 'Gegeneraliseerde oscillatie tussen thalamus en cortex op 3 Hz → bilaterale bewustzijnsonderbreking, geen motorische component.' },
        { title: 'Korte duur', desc: '5-20 seconden, daarna direct normaal — geen postictale fase (onderscheid van tonisch-clonisch!).' },
        { title: 'Hyperventilatieprovocatie', desc: 'Hyperventileren 3 minuten induceert absences tijdens EEG — diagnostisch nuttig.' },
      ],
      onderscheid: [
        { label: 'Absence-epilepsie', desc: 'Kind, starende blik, <20 sec, geen postictale fase, 3Hz spike-wave EEG. Soms lipsmacking of knipperen.', type: 'ok' },
        { label: 'Tonisch-clonische aanval', desc: 'Langer (>2 min), motorische componenten, postictale verwardheid/vermoeidheid. Ander EEG-patroon.', type: 'warn' },
        { label: 'Focale epilepsie', desc: 'Bewustzijn kan verminderd zijn maar met focaal motorisch component of automatismen. EEG: focale ontlading.', type: 'warn' },
        { label: 'Syncope', desc: 'Kortdurend, uitgelokt door staan/warmte/emotie. EEG normaal. Normale of vertraagde hartfrequentie.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Acute interventie niet nodig — absences zijn kortdurend en zelfbegrenzend.',
        stappen: [
          { naam: 'Ethosuximide', detail: 'Eerste keus bij puur absence-epilepsie — 80% effectief, alleen effect op absences (niet tonisch-clonisch).' },
          { naam: 'Valproaat', detail: 'Alternatief — breed-spectrum, effectief als ook tonisch-clonische aanvallen. Cave: teratogeen bij meisjes.' },
          { naam: 'Prognose', detail: '70% spontane remissie in adolescentie. Soms evolutie naar andere epilepsievormen.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 50j: acuut eenzijdige aangezichtsverlamming, ook voorhoofd aangedaan, geen andere uitval. Diagnose?',
    a:['Centraal CVA','Bells palsy (perifere facialisparese)','TIA','Hersentumor'], c:1,
    ex:'Bells palsy: perifere n.facialis-parese → ook voorhoofd aangedaan (centraal CVA: voorhoofd gespaard door bilaterale innervatie). Oorzaak: vaak HSV-reactivatie. Behandeling: prednisolon binnen 72 uur + aciclovir. Prognose: 80% volledig herstel.',
    wiki:{
          kern: "Bell\\'s palsy is een acute perifere parese van de n. facialis (n. VII), vermoedelijk door HSV-1-reactivatie in het ganglion geniculi.",
          mechanisme: [
            { title: "Stap 1", desc: "HSV-1-reactivatie." },
            { title: "Stap 2", desc: "ontsteking + oedeem in de benige canalis facialis." },
            { title: "Stap 3", desc: "compressie." },
            { title: "Stap 4", desc: "demyelinisatie. Triggerfactoren: stress, bovenste luchtweginfectie, koude. Zelden andere oorzaken: Lyme-ziekte (borrelia), sarcoidose, parotiscarcinoom." },
          ],
          onderscheid: [
            { label: 'Bell\'s palsy (perifere facialisparese)', desc: 'Voorhoofd ÓÓK aangedaan (n. VII-tak naar m. frontalis). Perifere motoneuronlaesie → alle gezichtsspieren ipsilateraal verlamd.', type: 'ok' },
            { label: 'Centraal CVA', desc: 'Voorhoofd GESPAARD door bilaterale corticale innervatie (frontale tak heeft corticale input van beide hemisferen). Centrale laesie = geen voorhoofdverlamming.', type: 'danger' },
            { label: 'Ramsay Hunt syndroom', desc: 'VZV-reactivatie: Bell\'s palsy + pijnlijke blaasjes in het oor (zona oticus) + gehoorverlies. Slechtere prognose, aciclovir essentieel.', type: 'warn' },
            { label: 'Parotistumor', desc: 'Langzame progressie over weken-maanden, pijnloze harde tumor, geen hersteltendens.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Prednisolon 1 mg/kg/dag (max 80 mg) 10 dagen — bewezen effectief, starten binnen 72u na begin klachten.',
            stappen: [
              { naam: 'Aciclovir', detail: 'Toevoegen bij ernstige parese of Ramsay Hunt — antiviraal effect op HSV/VZV-reactivatie.' },
              { naam: 'Oogbescherming', detail: 'Kunsttranen overdag + oogklepje \'s nachts — lagophthalmus kan corneabeschadiging veroorzaken.' },
              { naam: 'Prognose', detail: '80% volledig herstel binnen 3 maanden. Elektromyografie na 2 weken bij onvolledig herstel.' },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie',
    q:'Dopamine kan de bloed-hersenbarrière passeren en wordt daarom direct als medicijn gegeven bij Parkinson.',
    c:false, ex:'NIET WAAR. Dopamine passeert de bloed-hersenbarrière NIET. Daarom geeft men levodopa (precursor), dat wel passeert en in het brein omgezet wordt. Levodopa wordt gecombineerd met carbidopa/benserazide (perifere decarboxylaseremmer) om bijwerkingen te verminderen.',
    wiki: {
      kern: 'Dopamine passeert de bloed-hersenbarrière niet — het is een geladen molecule. Levodopa (L-DOPA) is de precursor die wél de BBB passeert via aminozuurtransporters, en in het brein omgezet wordt naar dopamine.',
      mechanisme: [
        { title: 'BBB-selectiviteit', desc: 'De bloed-hersenbarrière laat alleen lipofile of actief getransporteerde moleculen door. Dopamine is te polair/hydrofiel en wordt niet getransporteerd.' },
        { title: 'Levodopa-transport', desc: 'Levodopa lijkt structureel op aminozuren → transport via LAT1 (large neutral amino acid transporter) door de BBB.' },
        { title: 'Carbidopa/benserazide', desc: 'Perifere decarboxylaseremmer: voorkomt dat levodopa al in het bloed omgezet wordt naar dopamine (bijwerkingen: misselijkheid, hypotensie). Passeert zelf de BBB niet.' },
      ],
      onderscheid: [
        { label: 'Levodopa', desc: 'Passeert BBB. Omgezet naar dopamine in striatum. Meest effectieve Parkinson-therapie.', type: 'ok' },
        { label: 'Dopamine IV', desc: 'Passeert BBB niet. Gebruikt voor hartfalen/shock (perifeer effect op hart en vaten), NIET voor Parkinson.', type: 'danger' },
        { label: 'Dopamine-agonisten', desc: 'Pramipexol, ropinirol — stimuleren dopaminereceptoren direct in striatum, passeren BBB wel. Alternatief voor levodopa.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Geen acute indicatie — chronische Parkinson-behandeling.',
        stappen: [
          { naam: 'Levodopa + carbidopa', detail: 'Standaarddosis: 3x/dag. Carbidopa 25 mg + levodopa 100 mg (Sinemet). Titreer naar symptoomcontrole.' },
          { naam: 'Wearing off', detail: 'Na jaren: levodopa-effect duurt korter → "wearing off" verschijnselen. Oplossing: hogere frequentie, COMT-remmer (entacapone) of MAO-B-remmer toevoegen.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 28j: hoofdpijn, koorts 39°C, petechiën op armen en benen, nekstijfheid. Diagnose?',
    a:['Subarachnoïdale bloeding','Meningokokken meningitis/sepsis','Migraine','Herpesencefalitis'], c:1,
    ex:'Meningokokkenziekte: meningitis + sepsis door Neisseria meningitidis. Petechiën/purpura = vasculitis → dreigend sepsis. SPOED: IV benzylpenicilline of cefotaxim DIRECT. Elke minuut telt. Isolatie en profylaxe contactpersonen.',
    wiki: {
      kern: 'Meningokokkenziekte is een medische spoedsituatie. Neisseria meningitidis kan zowel meningitis als fulminante sepsis veroorzaken — soms allebei tegelijk. Het ziektebeloop kan binnen uren van koorts naar septische shock gaan. Petechiën zijn het alarmsignaal: tik op de huid — verbleken ze niet, dan is het purpura door vasculitis.',
      mechanisme: 'N. meningitidis koloniseert de nasofarynx (asymptomatisch bij 10% van de bevolking). Bij invasie in de bloedbaan: endotoxine-storm → activatie complementsysteem en stollingscascade → DIC → petechiën en purpura. In de hersenvliezen: ontsteking → drukverhoging → hersenletsel.',
      onderscheid: 'Virale meningitis: minder acuut, geen petechiën, liquor helder met lymfocyten, normaal glucose. SAB: thunderclap hoofdpijn, geen koorts/petechiën, CT of LP bewijzend. HSV-encefalitis: bewustzijnsdaling + temporale afwijkingen op MRI, behandel met aciclovir. Sepsis andere oorzaak: petechiën minder uitgesproken.',
      therapie: 'Geen minuut verliezen: benzylpenicilline IV of cefotaxim/ceftriaxon IV direct. Dexamethason 15-30 min voor of gelijktijdig met antibiotica (vermindert gehoorschade en neurologische schade). Isolatie (druppelvoorzorgen 24u na start AB). Rifampicine-profylaxe voor huisgenoten.',
    } },

  // ── Farmacologie (nieuw) ──
  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welk antibioticum werkt door de celwandsynthese van bacteriën te remmen?',
    a:['Amoxicilline','Ciprofloxacine','Doxycycline','Azithromycine'], c:0,
    ex:'Bètalactam-antibiotica (penicillines, cefalosporines) remmen de transpeptidases (PBPs) die peptidoglycaan crosslinks vormen in de bacteriële celwand. Bacteriën zwellen op en lyseren. Resistentie: bètalactamase-productie of PBP-mutaties.' },


  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welk medicijn geef je bij een opiaat-overdosis met bewusteloosheid en ademdepressie?',
    a:['Flumazenil','Naloxon','Atropine','Physostigmine'], c:1,
    ex:'Naloxon: competitieve opiaat-antagonist op μ-receptor. Keert ademdepressie snel om. Werkt korter dan opiaten → herhaling of infuus nodig. Flumazenil is antidotum voor benzodiazepinen. Cave: bij opiaat-afhankelijkheid → acute onttrekking.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Patiënt gebruikt warfarine en start met fluconazol (schimmelinfectie). Wat verwacht je?',
    a:['Warfarine-effect vermindert','Warfarine-effect neemt toe → bloedingsrisico','Geen interactie','Fluconazol werkt niet meer'], c:1,
    ex:'Fluconazol remt CYP2C9, het enzym dat warfarine afbreekt → warfarine stapelt op → INR stijgt → bloedingsrisico. Altijd INR controleren bij toevoegen of stoppen van CYP-remmers/-inductoren. Andere CYP2C9-remmers: amiodaron, metronidazol.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie',
    q:'Paracetamol-overdosis veroorzaakt leverschade door accumulatie van het toxisch metaboliet NAPQI.',
    c:true, ex:'WAAR. Normaal: NAPQI snel geneutraliseerd door glutathion. Overdosis: glutathion uitgeput → NAPQI bindt levercellen → necrose. Antidotum: N-acetylcysteïne (NAC) herstelt glutathion. Begin symptomen pas na 24-72u — geef NAC niet te laat.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welk diureticum remt het Na/K/2Cl-cotransporter in de lis van Henle?',
    a:['Hydrochloorthiazide','Furosemide','Spironolacton','Amiloride'], c:1,
    ex:'Lisdiuretica (furosemide): remmen NKCC2 in de opgaande lis → krachtige natriurese en diurese. Bijwerkingen: hypokaliëmie, hyponatriëmie, hypomagnesemie, ototoxiciteit (hoge dosis). Indicaties: acuut longoedeem, hartfalen, hypercalciëmie.' },

  { type:'diagnose', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Man neemt teveel van zijn slaapmiddel (benzodiazepine). Hij is slaperig maar ademt goed. Welk antidotum is beschikbaar?',
    a:['Naloxon','Flumazenil','N-acetylcysteïne','Atropine'], c:1,
    ex:'Flumazenil: competitieve GABA-A-antagonist → keert benzodiazepine-effecten om. Korte werking (30-60 min) → herhaling nodig. Cave: bij chronisch gebruik → onttrekkingsconvulsies. Naloxon is het antidotum voor opiaten, niet benzodiazepinen.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie',
    q:'Bèta-1-selectieve bètablokkers (bijv. metoprolol) zijn volledig veilig bij astma.',
    c:false, ex:'NIET WAAR. Bèta-1-selectiviteit is relatief en dosisafhankelijk. Bij hogere dosis ook bèta-2-blokkade → bronchospasme mogelijk. Bij ernstig astma: vermijd bètablokkers. Bij COPD of milde astma: voorzichtig gebruik kan wel, maar monitor nauwkeurig.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welk medicijn verhoogt het risico op rhabdomyolyse als het gecombineerd wordt met een statine?',
    a:['Amoxicilline','Omeprazol','Ciclosporine','Metformine'], c:2,
    ex:'Ciclosporine remt CYP3A4 en OATP1B1 transporters → statineconcentraties stijgen → spiercel-toxiciteit (rhabdomyolyse). Andere interacties: fibraten + statine = verhoogd rhabdomyolysericico. Symptomen: spierpijn, zwakte, bruine urine, hoog CK.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welk mechanisme heeft morfine bij pijnbestrijding?',
    a:['Remt COX-1 en COX-2','Bindt aan μ-opiaat receptor en vermindert pijnprikkelgeleiding','Blokkeert NMDA-receptor','Verhoogt serotonine in synaps'], c:1,
    ex:'Morfine bindt μ-(mu-)opiaatreceptoren in ruggenmerg en hersenen → verminderde pijnprikkelgeleiding + pijnbeleving. Bijwerkingen: obstipatie, misselijkheid, ademdepressie, sedatie. Tolerantie en afhankelijkheid bij langdurig gebruik.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie',
    q:'Tetracyclines (doxycycline) zijn veilig bij kinderen jonger dan 8 jaar.',
    c:false, ex:'NIET WAAR. Tetracyclines binden aan calciumionen in bot en tanden → verkleuring en tandglazuur-defecten bij kinderen <8 jaar. Uitzondering: ernstige indicaties zoals rickettsia-infecties. Vermijd ook in zwangerschap (nadelen voor foetale botvorming).' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welke protonpompremmer (PPI) heeft de meeste klinisch relevante CYP2C19-interacties?',
    a:['Pantoprazol','Rabeprazol','Omeprazol','Esomeprazol'], c:2,
    ex:'Omeprazol is de sterkste CYP2C19-remmer onder de PPIs → kan effect van clopidogrel verminderen (clopidogrel is prodrug die CYP2C19 nodig heeft voor activering). Pantoprazol heeft minimale CYP-interacties — voorkeur bij clopidogrel-gebruik.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie',
    q:'Heparine werkt direct als antistollingsmiddel; vitamine K-antagonisten (warfarine) hebben een vertraagd effect.',
    c:true, ex:'WAAR. Heparine activeert antitrombine III → onmiddellijke remming van trombine en factor Xa. Warfarine remt vitamine K-afhankelijke factoren (II, VII, IX, X) — maar bestaande factoren moeten eerst afgebroken worden → effect pas na 3-5 dagen volledig.' },

  { type:'diagnose', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Patiënt met jicht krijgt een acute aanval. Welk medicijn is eerstekeus voor de acute aanval?',
    a:['Allopurinol','Colchicine of NSAID','Probenecide','Furosemide'], c:1,
    ex:'Acute jicht: NSAID (naproxen/indomethacine) of colchicine voor pijnstilling en ontstekingsremming. Allopurinol (xanthine-oxidaseremmer) voor PREVENTIE van aanvallen — nooit starten tijdens acute aanval, verergert acute episode. Corticosteroïden als alternatief.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welk antibioticum mag NIET gecombineerd worden met alcohol vanwege een ernstige disulfiram-achtige reactie?',
    a:['Amoxicilline','Metronidazol','Doxycycline','Azithromycine'], c:1,
    ex:'Metronidazol remt aldehydedehydrogenase → bij alcoholgebruik: ophoping acetaldehyde → flushing, misselijkheid, tachycardie, hypotensie. Zelfde reactie met tinidazol. Waarschuw patiënt: geen alcohol tijdens en 48 uur na kuur.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie',
    q:'SSRIs (selectieve serotonineheropnameremmers) werken onmiddellijk: verbetering van depressie binnen 1-3 dagen.',
    c:false, ex:'NIET WAAR. SSRIs verbeteren depressieve klachten pas na 2-4 weken. De synaptische serotonineverhoging is direct, maar het therapeutische effect vereist neuroplastische aanpassingen. Bijwerkingen (misselijkheid, angst) kunnen eerder optreden. Doorzetten is belangrijk.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Een patiënt met een convulsie in de ambulance. Welk medicijn geef je IV als eerste stap?',
    a:['Fenytoïne','Valproaat','Lorazepam of diazepam','Levetiracetam'], c:2,
    ex:'Status epilepticus: benzodiazepinen (lorazepam IV, of diazepam rectaal) zijn eerste stap — snel werkend, versterken GABA-signaal. Als aanval niet stopt na 5 min: tweede middel (levetiracetam, valproaat, fenytoïne). Na 30 min: anesthesie overwegen.' },

  // ── Infectiologie (nieuw) ──
  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Vrouw 24j: pijn bij plassen, frequentie, geen koorts. Urine: leukocyturie, nitriet positief. Diagnose?',
    a:['Pyelonefritis','Ongecompliceerde urineweginfectie','Chlamydia-infectie','Interstitiële cystitis'], c:1,
    ex:'Ongecompliceerde UWI (cystitis): dysurie + frequentie + leukocyturie + nitriet (gramnegatieve bacteriën). Geen koorts/flankpijn → geen pyelonefritis. Behandeling: nitrofurantoïne 5d of fosfomycine 1d. Niet: onnodig ciprofloxacine (resistentie!). ' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'MRSA staat voor methicilline-resistente Staphylococcus aureus en is resistent tegen alle bètalactam-antibiotica.',
    c:true, ex:'WAAR. MRSA bezit het mecA-gen → gewijzigd PBP2a → bètalactams binden niet meer. Dus resistent tegen penicillines, cefalosporines én carbapenems. Behandeling: vancomycine of linezolid. Isolatiemaatregelen vereist in ziekenhuis.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Man 35j na tandartsbehandeling: koorts 39°C, nieuw hartgeruis, hematurie. Echo hart: vegetatie op mitralisklep. Diagnose?',
    a:['Reumatische koorts','Infectieuze endocarditis','Myocarditis','Pericard­itis'], c:1,
    ex:'Endocarditis: bacteriële vegetaties op hartkleppen. Duke-criteria: koorts + vegetatie op echo + bacteriëmie. Oorzaken: Streptococcus viridans (tandartsbehandeling), Staphylococcus aureus (IV-drugsgebruikers). Behandeling: langdurig IV antibiotica, soms chirurgie.',
    wiki:{
          kern: "Infectieuze endocarditis (IE) is een bacteriële (zelden schimmel-) infectie van hartkleppen of het endocardium. Vegetaties = kolonies bacteriën + fibrine + plaatjes op het klepoppervlak.",
          mechanisme: [
            { title: "Stap 1", desc: "Bacteriëmie (tandarts, IV-drugs, katheter)." },
            { title: "Stap 2", desc: "hechting aan beschadigd endocardium." },
            { title: "Stap 3", desc: "vegetatievorming. Fragmenten lossen los." },
            { title: "Stap 4", desc: "septische embolen." },
            { title: "Stap 5", desc: "abcessen hersenen, milt, nieren. Duke-criteria: 2 major (positieve kweken + echo-vegetatie), of 1 major + 3 minor, of 5 minor = definitief IE." },
          ],
          onderscheid: [
            { label: "Reumatische koorts", desc: "ook post-streptokokken maar geen vegetaties, wél migrerende polyarthritis + erythema marginatum.", type: 'ok' },
            { label: "Myocarditis", desc: "diffuse spierschade, troponine hoog, geen hartgeruis als hoofdbevinding.", type: 'warn' },
            { label: "Pericarditis", desc: "wrijfgeruis, saddle-shape ECG, géén bacteriëmie.", type: 'danger' },
          ],
          therapie: {
            urgent: "4-6 weken IV antibiotica: penicilline G/amoxicilline (viridans-streptokokken), flucloxacilline (S. aureus), vancomycine (MRSA).",
            stappen: [
              { naam: "Chirurgie bij", detail: "acuut hartfalen, persisterende bacteriëmie, vegetatie >10 mm, abces." },
              { naam: "Profylaxe bij tandheelkunde", detail: "amoxicilline 2g eenmalig bij hoog-risico patiënten (kunstklep, eerder IE)." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Kind 5j: keelpijn, koorts, rode keel met exsudaat, pijnlijke halslymfklieren. Snelle streptokokkentest positief. Behandeling?',
    a:['Afwachten, verdwijnt vanzelf','Amoxicilline 10 dagen','Ciprofloxacine 5 dagen','Azithromycine 1 dag'], c:1,
    ex:'Groep A Streptokokkenfaryngitis: amoxicilline 10 dagen (penicilline V alternatief). Doel: voorkomen reumatische koorts (hart/gewrichtscomplicatie). Bij penicillineallergie: erythromycine/azithromycine. Niet: antibiotica bij virale keelontsteking (50-80%).',
    wiki:{
          kern: "Groep A Streptokokkenfaryngitis (GABHS, S. pyogenes) is de enige bacteriële keelontsteking waarbij antibioticabehandeling zinvol is. Doel is niet symptoomverkorting (1-2 dagen) maar het voorkómen van reumatische koorts — een moleculair mimicry-complicatie die hartkleppen beschadigt.",
          mechanisme: [
            { title: "Stap 1", desc: "S. pyogenes." },
            { title: "Stap 2", desc: "post-infectieuze immuunrespons." },
            { title: "Stap 3", desc: "moleculaire mimicry (antilichamen kruisreageren met hartklep- en gewrichtsweefsel)." },
            { title: "Stap 4", desc: "reumatische koorts (3-4% zonder AB). Centor-score: exsudaat + koorts + lymfadenopathie + géén hoest = 4 punten." },
            { title: "Stap 5", desc: "hoge bacteriële kans." },
          ],
          onderscheid: [
            { label: "Virale faryngitis (50-80%!)", desc: "hoest, loopneus, heesheid aanwezig → geen AB.", type: 'ok' },
            { label: "EBV", desc: "splenomegalie, monospot positief → geen amoxicilline (uitslag!).", type: 'warn' },
            { label: "Peritonsillair abces", desc: "uvuladeviation, klosse stem, eenzijdige zwelling → spoedincisie.", type: 'danger' },
            { label: "Epiglottitis", desc: "ernstige dysfagie, speekselen, stridor → IC.", type: 'warn' },
          ],
          therapie: {
            urgent: "Amoxicilline 500 mg 2dd 10 dagen (kinderen: 40 mg/kg/dag).",
            stappen: [
              { naam: "Stap 1", detail: "Penicilline V is alternatief." },
              { naam: "Bij penicillineallergie", detail: "azithromycine 5 dagen of clindamycine." },
              { naam: "Stap 3", detail: "Snelle streptokokkentest of keelkweek vóór starten — behandel niet blind." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'Influenza wordt veroorzaakt door een DNA-virus.',
    c:false, ex:'NIET WAAR. Influenza is een RNA-virus (orthomyxovirus). Hoge mutatiegraad door RNA-polymerase zonder proofreading → antigene drift (kleine mutaties jaarlijks) en shift (hersortering segmenten → pandemie). Vaccin jaarlijks bijgewerkt.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Patiënt met HIV, CD4 50 cellen/μL: hoest, koorts, nachtelijk zweten. Röntgen thorax: bilaterale perihilaire infiltraten. Diagnose?',
    a:['Bacteriële pneumonie','Pneumocystis jirovecii pneumonie (PCP)','Tuberculose','Longkanker'], c:1,
    ex:'PCP: meest voorkomende opportunistische infectie bij HIV met CD4 <200. Kenmerk: bilaterale interstitiële infiltraten, hoge LDH, subacuut beloop. Behandeling: cotrimoxazol hoge dosis. Profylaxe bij CD4 <200. LDH-verhoging is kenmerkend.',
    wiki: {
      kern: 'Pneumocystis jirovecii is een schimmel die bij gezonde mensen geen enkel probleem geeft — het immuunsysteem ruimt het op. Maar bij ernstige immuunsuppressie (HIV met CD4 <200, transplantatiepatiënten, hoge-dosis steroïden) kan het een levensbedreigende longontsteking veroorzaken.',
      mechanisme: 'P. jirovecii hecht zich aan longblaasjes (alveoli) en veroorzaakt een interstitiële ontsteking — de ruimte tússen de cellen raakt ontstoken en vult zich met slijm. Dit geeft een diffuus patroon op CT (ground-glass opacities) en een hoog LDH (weefselschade). O₂-saturatie daalt ernstig bij inspanning.',
      onderscheid: 'Bacteriële pneumonie: acuut begin, productieve hoest, lobaire infiltraten. CMV-pneumonie: ook bij CD4 <50, maar andere CT-kenmerken en diagnose via BAL. TBC: apicale cavitaties, lymfadenopathie, langzamer beloop. KS-longbetrokkenheid: Kaposi — huidlaesies aanwezig.',
      therapie: 'Hoge-dosis cotrimoxazol (TMP-SMX) IV gedurende 21 dagen. Bij matige-ernstige PCP (pO₂ <70 mmHg): voeg prednison toe (vermindert inflammatie en mortaliteit). Profylaxe: cotrimoxazol laag-dosis als CD4 <200 — ook bij andere immuunsuppressie.',
    } },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Man 52j terugkomend uit Afrika: koorts met perioden van rillingen, milt vergroot. Bloeduitstrijk: intraerytrocytaire parasiet. Diagnose?',
    a:['Dengue','Malaria','Typhoid','Leptospirose'], c:1,
    ex:'Malaria: Plasmodium-infectie overgedragen door Anopheles-mug. Bloeduitstrijk is gouden standaard. P. falciparum = meest gevaarlijk (hersenmalaria). Behandeling: artemisinine-combinatietherapie. Profylaxe: afhankelijk van bestemming (atovaquon/proguanil, mefloquine).',
    wiki:{
          kern: "Malaria wordt veroorzaakt door vijf Plasmodium-species. P. falciparum: >90% van malaria-mortaliteit, geen typische cyclus, chloroquineresistent in sub-Saharaans Afrika, kan cerebrale malaria geven.",
          mechanisme: [
            { title: "Stap 1", desc: "Sporozoïten via muggenbeet." },
            { title: "Stap 2", desc: "leverfase (asymptomatisch)." },
            { title: "Stap 3", desc: "merozoïeten infecteren rode bloedcellen." },
            { title: "Stap 4", desc: "cyclische ruptuur." },
            { title: "Stap 5", desc: "koorts. P. falciparum: geïnfecteerde cellen kleverig." },
          ],
          onderscheid: [
            { label: "Dengue", desc: "ook tropisch + koorts maar geen parasiet, wél huiduitslag + lage trombocyten + spier-/gewrichtspijn.", type: 'ok' },
            { label: "Typhoid", desc: "aanhoudende niet-cyclische koorts, bradycardie, positieve bloed/ontlastingskweek.", type: 'warn' },
            { label: "Leptospirose", desc: "watercontact, conjunctivale hyperemie.", type: 'danger' },
            { label: "Rickettsiae", desc: "tekenbeet, huiduitslag.", type: 'warn' },
          ],
          therapie: {
            urgent: "P. falciparum: artemisinine-combinatietherapie (artemether-lumefantrine).",
            stappen: [
              { naam: "Ernstige malaria", detail: "IV artesunaat." },
              { naam: "P. vivax/ovale", detail: "chloroquine + primaquine (elimineer levervormen — cave G6PD-deficiëntie!)." },
              { naam: "Stap 3", detail: "Profylaxe keuze afhankelijk van land en resistentiepatroon." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'Vancomycine is het middel van keuze bij ernstige Clostridioides difficile-infectie.',
    c:false, ex:'NIET WAAR. Fidaxomicine is nu eerstekeus bij ernstige/recidiverende C. difficile. Orale vancomycine is een alternatief voor ernstige gevallen. Metronidazol alleen bij milde infectie als fidaxomicine/vancomycine niet beschikbaar. GEEN IV metronidazol meer als mono.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Verpleeghuis: 3 patiënten met plotse waterige diarree na antibioticakuur. Feces-toxinetest positief. Diagnose?',
    a:['Norovirus uitbraak','Clostridioides difficile infectie','Salmonellose','EHEC-infectie'], c:1,
    ex:'C. difficile: na antibiotica (clindamycine, cefalosporines, chinolonen) dysbiose → C.diff overgroei → toxinen A+B → colonschade. Diagnostiek: toxinetest of PCR. Isolatie, contactvoorzorgen, stopzetten triggerende antibiotica.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Vrouw 28j: koorts, nekstijfheid, fotofobie, positieve Kernig.\nLP: troebel vocht, PMN-pleocytose\nGlucose 1.8 mmol/L\nEiwit 3.5 g/L\nOorzaak?',
    a:['Virale meningitis','Bacteriële meningitis','Cryptococcus-meningitis','Tuberculeuze meningitis'], c:1,
    ex:'Bacteriële meningitis: PMN-pleocytose + laag glucose (<2.5 of glucose-ratio <0.5) + hoog eiwit + troebel vocht. Oorzaken: N.meningitidis (jongeren), S.pneumoniae (ouderen). SPOED: cefotaxim/ceftriaxon + dexamethason. Elk uur vertraging = meer schade.' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'Het humaan papillomavirus (HPV) vaccin beschermt ook al bestaande HPV-infecties.',
    c:false, ex:'NIET WAAR. HPV-vaccin is profylactisch — het voorkomt nieuwe infecties maar behandelt geen bestaande infecties of pre-cancereuze laesies. Daarom: zo vroeg mogelijk vaccineren (voor seksuele activiteit). Biedt bescherming tegen HPV 16, 18 (en 6, 11 bij 9-valent).' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Man 42j: aanhoudende hoest >3 weken, nachtzweten, gewichtsverlies, hemoptoe. Immuuncompetent. Röntgen: apicale cavitaties. Diagnose?',
    a:['Longkanker','Tuberculose','Sarcoidose','Longabces door aspiratie'], c:1,
    ex:'TBC: Mycobacterium tuberculosis. Klassiek: langdurige hoest, nachtzweten, gewichtsverlies, hemoptoe, apicale cavitaties. Diagnose: sputumkweek (Ziehl-Neelsen), GeneXpert. Isolatie vereist. Behandeling: RIPE (rifampicine + isoniazide + pyrazinamide + ethambutol) 6 maanden.',
    wiki: {
      kern: 'Tuberculose wordt veroorzaakt door Mycobacterium tuberculosis, overgedragen via druppelinfectie. Bij 90% van de besmettingen blijft de infectie latent (immuunsysteem houd het in bedwang). Actieve TBC ontstaat bij immuunsuppressie, ondervoeding of hoge bacteriële belasting.',
      mechanisme: 'De bacterie overleeft in macrofagen door de fagosoom-lysosoom-fusie te blokkeren. Het immuunsysteem vormt granulomen (kleine knobbeljes) om de bacteriën in te kapselen. Bij reactivatie breken granulomen open → longweefsel wordt vernietigd → cavitaties (holten) zichtbaar op röntgen.',
      onderscheid: 'Longkanker: ook gewichtsverlies/hemoptoe maar doorgaans geen koorts/nachtelijk zweten; ouder, roker. Sarcoidose: ook granulomen, maar geen infectie — bilaterale hilus-vergroting, jongere patiënten, positieve ACE. NTM (niet-tuberculeuze mycobacteriën): vergelijkbaar beeld bij immuungecompromitteerden, ander behandelprotocol.',
      therapie: 'RIPE-schema 6 maanden: Rifampicine + Isoniazide + Pyrazinamide + Ethambutol (2 maanden) → daarna alleen RI (4 maanden). Isolatie bij open TBC (aerosol-voorzorgsmaatregelen). Latente TBC: isoniazide profylaxe 6 maanden. Resistente TBC (MDR-TBC): tweede-lijns middelen, minstens 18 maanden.',
    } },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Vrouw na vaginale partus: koorts dag 2, baarmoeder drukpijnlijk, foetor. Diagnose?',
    a:['Urineweginfectie postpartum','Endometritis','Mastitis','Wondinfectie'], c:1,
    ex:'Endometritis: uterusinfectie na bevalling, C-sectie of ingreep. Koorts + drukpijnlijke uterus + foetiede lochia. Verwekkers: gemengd (E.coli, Streptococcen, anaeroben). Behandeling: breedspectrumantibiotica (amoxicilline-clavulaanzuur of clindamycine + gentamicine).' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'Lyme-borreliose wordt overgedragen door de Ixodes-teek en presenteert zich vaak met een erythema migrans.',
    c:true, ex:'WAAR. Borrelia burgdorferi overgedragen door Ixodes ricinus (schapenteek). Erythema migrans: ringvormige uitbreiding rond tekenbeet, >5cm, kenmerkend voor vroege Lyme. Behandeling: doxycycline 10-21d. Late Lyme: artritis, neuro-borreliose.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Soa-poli: man 25j, pijnloze ulcus op de glans penis, regionale lymfadenopathie. Geen pus. Diagnose?',
    a:['Herpes genitalis','Syfilis (primaire syfilis)','Gonorroe','Chlamydia'], c:1,
    ex:'Primaire syfilis: pijnloos hard ulcus (chancre) door Treponema pallidum. Secundaire syfilis: huiduitslag inclusief handpalmen/voetzolen. TPHA/VDRL voor diagnostiek. Behandeling: benzylpenicilline IM eenmalig. Partnerwaarschuwing verplicht.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Immuungecompromitteerde patiënt (post-transplantatie): koorts, droge hoest, CT: "halo-teken" rond noduli. Diagnose?',
    a:['PCP','Invasieve aspergillose','CMV-pneumonie','Nocardiose'], c:1,
    ex:'Invasieve aspergillose: Aspergillus fumigatus infecteert longen bij ernstig immuungecompromitteerde patiënten (neutropenie, steroïden). CT: halo-teken (bloeding rondom nodulus). Diagnostiek: galactomannan serum/BAL, CT, biopt. Behandeling: voriconazol.' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'Bij sepsis is het starten van antibiotica de hoogste prioriteit — dit mag nooit wachten op bloedkweken.',
    c:false, ex:'NIET WAAR. Bloedkweken moeten worden afgenomen VOOR antibioticastart (2 sets uit 2 plaatsen) — maar dit mag maximaal enkele minuten duren. Antibiotica moet binnen 1 uur bij septische shock. Prioriteit: bloedkweken snel afnemen, daarna DIRECT antibiotica.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Patiënt 70j, verpleeghuis: koorts, verwardheid, hematurie. Urine: pyurie, gramnegatieve staven op kweek. Diagnose?',
    a:['Ongecompliceerde cystitis','Urosepsis','Prostatitis','Vaginitis'], c:1,
    ex:'Urosepsis: UWI met systemische tekenen (koorts, tachycardie, hypotensie, verwardheid). Ouderen presenteren atypisch (verwardheid zonder koorts). Verwekker: E. coli (80%). Behandeling: IV breedspectrum antibiotica (cefuroxim, piperacilline-tazobactam), bloedkweken eerst.' },


  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'Antiretrovirale therapie (ART) bij HIV zorgt voor volledige genezing van de infectie.',
    c:false, ex:'NIET WAAR. ART onderdrukt het HIV-virus tot ondetecteerbaar niveau maar geneest de infectie niet — het virus blijft latent in reservoir-cellen. Voordelen: normale levensverwachting, draagt niet meer over bij virale suppressie (U=U). Levenslang gebruik nodig.' },

  // ── Laboratorium (nieuw) ──
  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Man 55j:\nNa 128 mmol/L, osmolaliteit laag\nUrine-Na >20 mmol/L\nGeen oedeem — TSH en cortisol normaal\nDiagnose?',
    a:['Psychogeen polydipsie','SIADH','Bijnierinsufficiëntie','Hypothyreoïdie'], c:1,
    ex:'SIADH: inadequate ADH-secretie → waterretentie → dilutie-hyponatriëmie. Kenmerk: euvoleem + lage osmolaliteit + urine-Na >20 + urine osmolaliteit >serum osmolaliteit. Oorzaken: maligniteit (kleincellig longcarcinoom!), SSRIs, carbamazepine. Behandeling: vochtbeperking.',
    wiki: {
      kern: 'SIADH betekent dat het lichaam te veel ADH aanmaakt (of ectopisch produceert), waardoor het te veel water vasthoudt. Het bloed wordt als het ware verdund → natrium daalt. Kenmerkend: de patiënt is niet oedemateus (euvoleem) — er is geen zout-tekort, alleen wateroverschot.',
      mechanisme: 'ADH (vasopressine) geeft normaal het signaal aan de nieren om water terug te nemen bij uitdroging. Bij SIADH gebeurt dit ongepast — ook zonder dat het lichaam uitgedroogd is. Oorzaken: longtumoren (kleincellig longcarcinoom produceert zelf ADH), hersenpathologie, SSRIs, carbamazepine.',
      onderscheid: 'Bijnierinsufficiëntie: ook hyponatriëmie maar met lage bloeddruk, hyperkaliëmie en laag cortisol. Hypothyreoïdie: ook hyponatriëmie, maar TSH hoog. Psychogeen polydipsie: zeer laag urine-natrium en urine-osmolaliteit (sterk verdunde urine) — urine-Na <20. Hartfalen/cirrose: hypovoleem of oedemateus, niet euvoleem.',
      therapie: 'Mild: vochtbeperking (800-1000 ml/dag). Acuut symptomatisch (convulsies, bewustzijnsdaling): hypertoon NaCl 3% voorzichtig — maximaal 8-10 mmol/dag stijging om osmotische demyelinisatie te voorkomen. Chronisch: tolvaptan (V2-receptorantagonist) bij refractaire SIADH.',
    } },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium',
    q:'Een verhoogd D-dimeer bewijst dat er een longembolie aanwezig is.',
    c:false, ex:'NIET WAAR. D-dimeer is gevoelig maar niet specifiek — verhoogd bij elke toestand met fibrineafbraak (infectie, trauma, zwangerschap, maligniteit). Een normaal D-dimeer bij lage klinische kans sluit LE uit. Positief D-dimeer: altijd CT-angiografie nodig.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Hyperkaliëmie:\nK+ 6.8 mmol/L\nECG: tenttoppen T-golven, verbreed QRS\nMeest urgente behandeling?',
    a:['Calciumgluconaat IV','Insuline + glucose IV','Natriumbicarbanaat IV','Furosemide IV'], c:0,
    ex:'Levensbedreigende hyperkaliëmie met ECG-veranderingen: EERST calciumgluconaat IV → stabiliseert myocardmembraan (werkt in 1-3 min). Daarna: insuline+glucose (K+ cellen in), salbutamol, bicarbonaat, kayexalaat/dialyse voor definitieve K+-verlaging.' },

  { type:'diagnose', d:3, domain:'lab', dl:'Laboratorium',
    q:'Vrouw 35j:\nCa 3.1 mmol/L\nPTH verhoogd\nFosfaat laag\nNierstenen\nDiagnose?',
    a:['Maligniteit-geassocieerde hypercalciëmie','Primaire hyperparathyreoïdie','Vitamine D-intoxicatie','Sarcoïdose'], c:1,
    ex:'Primaire hyperparathyreoïdie: autonome PTH-secretie (adenoom 80%). PTH ↑ + Ca ↑ = primaire HPT. Bij maligniteit: PTH laag of normaal. Symptomen: nierstenen, botpijn, obstipatie, depressie ("stones, bones, groans, psychic moans"). Behandeling: parathyroïdectomie.' },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium',
    q:'Een laag MCV (microcytair) bij anemie wijst altijd op ijzergebrek.',
    c:false, ex:'NIET WAAR. Microcytaire anemie: ijzergebrek (meest voorkomend), thalassemie, anemie bij chronische ziekte (soms), sideroblastische anemie. Onderscheid: ferritine (laag bij Fe-gebrek, hoog bij chronische ziekte), bloeduitstrijk, Hb-elektroforese bij thalassemie-vermoeden.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Man 48j: glucosewaarde nuchter 7.2 mmol/L twee keer gemeten. Diagnose?',
    a:['Normale bloedsuiker','Gestoorde nuchtere glykemie','Diabetes mellitus type 2','Pre-diabetes borderline'], c:2,
    ex:'DM2-diagnose: nuchter glucose ≥7.0 mmol/L op 2 aparte momenten, OF HbA1c ≥48 mmol/mol (6.5%), OF glucosetolerantietest 2u ≥11.1, OF willekeurig glucose ≥11.1 + symptomen. Hier: 7.2 ≥ 7.0 = diabetes.',
    wiki: {
      kern: 'Diabetes mellitus type 2 is een combinatie van insulineresistentie (cellen reageren minder op insuline) en relatief tekort aan insulineproductie. Het glucose blijft hoog in het bloed omdat het niet de cellen in kan. Begint sluipend, vaak jaren onopgemerkt.',
      mechanisme: 'Overgewicht → vetcellen produceren ontstekingsstoffen → insulinereceptoren worden minder gevoelig → alvleesklier compenseert met meer insuline → uitputting van bètacellen → insulinedeficiëntie. Chronisch hoog glucose beschadigt bloedvaten en zenuwen (microangiopathie).',
      onderscheid: 'DM1: auto-immuun, destrucctie bètacellen, jong begin, snel keton-acidose, altijd insuline nodig. MODY: monogene aandoening, familiair, jong begin zonder overgewicht. LADA: langzaam progressief auto-immuun (late-onset DM1), foutief gediagnosticeerd als DM2.',
      therapie: 'Stap 1: leefstijl (afvallen, beweging) + metformine. Stap 2: toevoegen SGLT2-remmer (cardiovasculair voordeel) of GLP-1 agonist. Stap 3: insuline. Streef HbA1c <53 mmol/mol (7%). Metformine stoppen bij eGFR <30 (lactaatacidoserisico).',
    } },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Welke bloedwaarde is de beste maat voor langdurige glucoseregulatie bij diabetes?',
    a:['Nuchter glucose','HbA1c','Postprandiale glucose','Fructosamine'], c:1,
    ex:'HbA1c: geglyceerd hemoglobine weerspiegelt gemiddelde glucoseconcentratie over afgelopen 2-3 maanden (levensduur erytrocyten). Streefwaarde DM: <53 mmol/mol (7%). Fructosamine reflecteert 2-3 weken (bruikbaar bij hemoglobinopathieën of zwangerschap).' },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium',
    q:'Troponine kan ook verhoogd zijn bij nierfalen zonder hartinfarct.',
    c:true, ex:'WAAR. Verhoogd troponine bij nierinsufficiëntie: verminderde klaring + chronische myocardstress. Maar: bij acute stijging (>20% over 3-6 uur) moet AMI actief worden uitgesloten. Context is alles: nierfunctie + klinisch beeld + ECG.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Man 30j: jarenlang alcoholmisbruik. Bloedbeeld: MCV 110 fL, Hb laag, normoblastair beenmerg. Diagnose?',
    a:['IJzergebreksanemie','Megaloblastaire anemie door foliumzuur-/B12-gebrek','Hemolytische anemie','Aplastische anemie'], c:1,
    ex:'Megaloblastaire anemie: macrocyten (MCV >100) door tekort aan B12 of foliumzuur → gestoorde DNA-synthese. Alcohol: malnutritie → foliumzuurgebrek. B12-gebrek: atrofische gastritis, veganisten, malabsorptie. Behandeling: foliumzuur/B12-suppletie.' },

  { type:'diagnose', d:3, domain:'lab', dl:'Laboratorium',
    q:'LP-uitslag:\nHeldere liquor\nLymfocytose 80 cellen\nEiwit 0.7 g/L (licht verhoogd)\nGlucose normaal\nMeest waarschijnlijk?',
    a:['Bacteriële meningitis','Virale meningitis','SAB','TBC-meningitis'], c:1,
    ex:'Virale (aseptische) meningitis: helder/opalescent vocht, lymfocytaire pleocytose, normaal glucose, licht verhoogd eiwit. Verwekkers: enterovirus, HSV, EBV. Meist self-limiting. HSV-encefalitis: liquor + MRI temporaalkwab afwijking → aciclovir direct.' },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium',
    q:'TSH is de meest gevoelige test om schildklierziekte op te sporen, ook bij subklinische gevallen.',
    c:true, ex:'WAAR. TSH heeft een logaritmische relatie met vrij T4 → kleine veranderingen in T4 → grote TSH-verandering. Subklinische hypothyreoïdie: TSH verhoogd, vrij T4 normaal. TSH is de eerste-lijntest; vrij T4 en T3 ter bevestiging/typering.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Welke combinatie past bij een intravasale hemolyse?',
    a:['Laag LDH, hoog haptoglobine','Hoog LDH, laag haptoglobine, hoog indirect bilirubine','Hoog ferritine, laag transferrine','Laag reticulocytenaantal'], c:1,
    ex:'Intravasale hemolyse: rode bloedcellen kapot in bloedbaan → Hb vrijgelaten → LDH hoog (uit erytrocyten), haptoglobine daalt (bindt vrij Hb), indirect bilirubine stijgt (afbraakproduct). Reticulocyten verhoogd (compensatoire aanmaak). Hemoglobinurie: bruine urine.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Vrouw 62j: alkalf fosfatase 3× verhoogd, GGT 4× verhoogd, ALAT normaal. Echo: galstenen, geen galwegdilatatie. Diagnose?',
    a:['Hepatitis','Cholestatisch patroon, waarschijnlijk primaire biliaire cholangitis','Spierziekte','Alcoholische hepatitis'], c:1,
    ex:'Cholestatisch patroon: ALP + GGT verhoogd (biliaire oorzaak), transaminasen relatief normaal. Bij vrouw >40j + positieve AMA (anti-mitocondriale antilichamen) = primaire biliaire cholangitis. Behandeling: ursodeoxycholzuur. Fibrose en cirrose mogelijk.' },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium',
    q:'Een internationale genormaliseerde ratio (INR) van 3.5 bij een patiënt op warfarine zonder bloeding vereist altijd directe ziekenhuisopname.',
    c:false, ex:'NIET WAAR. Asymptomatisch verhoogde INR: afhankelijk van hoogte en context. INR 3.5-4.9 zonder bloeding: tijdelijk stoppen warfarine, hercontrole. Bij INR >5 of bloedingssymptomen: vitamine K toedienen. Acuut: protrombinencomplex-concentraat. Opname bij actieve bloeding of zeer hoge INR.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Man 55j: kreatinine stijgt van 90 naar 280 μmol/L in 48 uur na contrast-CT. Urine: granulair cylinders. Diagnose?',
    a:['Prerenaal nierfalen','Contrast-geïnduceerde nefropathie (acute tubulaire necrose)','Postrenaal nierfalen','Glomerulonefritis'], c:1,
    ex:'Contrastnefropathie: acute tubuluscel-necrose door osmotische stress + vasoconstrictie. Granulair cylinders = tubulusschilfering. Preventie: IV hydratatie voor+na, minimale contrasthoeveelheid, stop metformine. Herstel treedt meestal op binnen 1-2 weken.' },

  { type:'diagnose', d:3, domain:'lab', dl:'Laboratorium',
    q:'Vrouw 25j: chronische vermoeidheid, gewichtsverlies, hyperpigmentatie, lage bloeddruk. Na 128, K 5.6, nuchter glucose 3.2. Diagnose?',
    a:['Hyperthyreoïdie','Primaire bijnierinsufficiëntie (ziekte van Addison)','SIADH','Anorexia nervosa'], c:1,
    ex:'Addison: destructie bijnierschors → tekort cortisol en aldosteron. Triade: hyponatriëmie + hyperkaliëmie + hypoglykemie. Hyperpigmentatie: hoge ACTH stimuleert melanocyten. Addison-crisis: hemodynamisch instabiel → direct hydrocortison IV + NaCl IV.' },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium',
    q:'Een verhoogd PSA (prostaat-specifiek antigeen) bewijst prostaatkanker.',
    c:false, ex:'NIET WAAR. PSA is orgaanspecifiek, niet kankerspecifiek. Verhoogd bij: prostaatkanker, benigne prostaathyperplasie, prostatitis, kathetrisatie. PSA is een screeningsmiddel — diagnose vereist weefselbiopsie. PSA-ratio (vrij/totaal) verbetert specificiteit.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Man 38j: gewrichtspijn, uraat 560 μmol/L, nierstenen. Wat is de eerste behandelstap om uraat te verlagen?',
    a:['NSAID voor de pijn','Allopurinol (xanthine-oxidaseremmer)','Probenecide','Colchicine'], c:1,
    ex:'Allopurinol remt xanthine-oxidase → minder uuraatproductie. Eerstekeus voor jichtprofylaxe en uraatnefropathie. Start pas na acute aanval is gezakt (anders risico op aanval triggeren). Febuxostat als alternatief. Hydrateer goed, beperk rood vlees en alcohol.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Bloedgas:\npH 7.28\nPaCO₂ 32 mmHg\nHCO₃⁻ 15 mmol/L\nAnion gap 22\nWelke stoornis?',
    a:['Respiratoire acidose','Metabole alkalose','Metabole acidose met verhoogd anion gap','Respiratoire alkalose'], c:2,
    ex:'Metabole acidose + hoog anion gap (normaal 8-12): AG = Na - (Cl + HCO3) = 22 → elevatie. Oorzaken MUDPILES: Methanol, Ureum, DKA, Propyleenglycol, INH/Ijzer, Lactaat, Ethanol/Ethyleenglycol, Salicylaten. PaCO2 laag = compensatoire respiratoire alkalose.' },

  // ── Laboratorium (nieuw batch 2) ──
  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Man 65j: eGFR 48 ml/min/1.73m², al 4 maanden stabiel. Diagnose?',
    a:['Acuut nierfalen','Chronische nierziekte (CKD) stadium G3a','Nefrotisch syndroom','Prerenaal nierfalen'], c:1,
    ex:'CKD: eGFR <60 ml/min gedurende >3 maanden = chronische nierziekte. G3a = eGFR 45-59. Oorzaken: DM, hypertensie, glomerulonefritis. Complicaties: anemie (EPO-tekort), hyperfosfatemie, hyperkaliëmie, metabole acidose. Geen curatieve behandeling, wel vertraging van progressie.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Bloeduitslag:\nALAT 580 U/L\nASAT 320 U/L\nBilirubine licht verhoogd\nAlkalisch fosfatase normaal\nMeest waarschijnlijk patroon?',
    a:['Cholestatisch patroon (galwegobstructie)','Hepatocellulair patroon (hepatitis)','Spierziekte','Hemolytische anemie'], c:1,
    ex:'Hepatocellulair patroon: ALAT en ASAT sterk verhoogd, ALP relatief normaal. ALAT is leverspecifieker dan ASAT. Oorzaken: virale hepatitis, alcoholische hepatitis, auto-immuunhepatitis, geneesmiddelenschade. ASAT/ALAT-ratio >2 → denk aan alcoholische hepatitis.' },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium',
    q:'Bij ernstige hyponatriëmie moet het natriumgehalte zo snel mogelijk gecorrigeerd worden om hersenschade te voorkomen.',
    c:false, ex:'NIET WAAR. Te snelle correctie van chronische hyponatriëmie (>8-10 mmol/L per dag) kan osmotische demyelinisatie veroorzaken (centrale pontiene myelinolyse) — onomkeerbare hersenschade. Uitzondering: acute symptomatische hyponatriëmie (convulsies, coma) → voorzichtig hypertoon NaCl 3%.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Patiënt na chemokuur: koorts, neutrofiele granulocyten 0.3 × 10⁹/L. Hoe noem je deze toestand en wat doe je?',
    a:['Leukopenie — afwachten','Febriele neutropenie — direct breedspectrum antibiotica','Agranulocytose — G-CSF geven','Lymfopenie — antivirale therapie'], c:1,
    ex:'Febriele neutropenie: koortsig + absoluut neutrofielen <0.5 × 10⁹/L bij chemopatiënt = medische urgentie. Direct bloedkweken afnemen en daarna breedspectrum antibiotica (piperacilline/tazobactam) starten. Geen uren wachten op kweekuitslagen — mortaliteit stijgt snel.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Nefrotisch syndroom:\nProteïnurie 4.5 g/dag\nAlbumine 21 g/L\nOedeem, hypercholesterolemie\nWat is GEEN kenmerk?',
    a:['Zware proteïnurie (>3.5 g/dag)','Hypoalbuminemie','Hypertensie en hematurie','Hypercholesterolemie'], c:2,
    ex:'Nefrotisch syndroom: grote eiwitverlies via nier → hypoalbuminemie → oedeem + hypercholesterolemie (lever compenseert). Hematurie en hypertensie zijn kenmerken van het nefritisch syndroom (ontsteking glomeruli). Onderscheid is klinisch belangrijk voor verdere diagnostiek.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Bloedgas:\npH 7.26\npCO₂ 68 mmHg\nHCO₃⁻ 29 mmol/L\nInterpretatie?',
    a:['Metabole acidose','Respiratoire alkalose','Respiratoire acidose met metabole compensatie','Gemengde stoornis'], c:2,
    ex:'Respiratoire acidose: pH laag + pCO2 hoog = hypoventilatie. HCO3 verhoogd = renale compensatie (chronisch). Oorzaken: COPD-exacerbatie, opiaat-overdosering, neuromusculaire ziekte, obesitas-hypoventilatie. Behandeling: onderliggende oorzaak + eventueel NIV-beademing.' },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium',
    q:'Procalcitonine (PCT) is een specifiekere marker voor bacteriële infectie dan CRP.',
    c:true, ex:'WAAR. CRP stijgt bij elke vorm van ontsteking (bacterieel, viraal, auto-immuun, trauma). PCT stijgt specifiek bij systemische bacteriële infecties en sepsis. PCT wordt ook gebruikt om antibiotica eerder te stoppen: dalende PCT = goede respons. Normaal PCT <0.25 µg/L.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Vrouw 55j met levercirrose: PT 22 seconden (verlengd), bloedingsklachten. Waarom is de PT verlengd?',
    a:['Vitamine K-tekort door malabsorptie','De lever maakt onvoldoende stollingsfactoren aan','Trombocytopenie door hypersplenisme','Heparine-effect'], c:1,
    ex:'De lever maakt bijna alle stollingsfactoren aan (I, II, V, VII, VIII, IX, X, XI). Bij cirrose: verminderde synthese → verlengde PT/INR. Factor VII heeft de kortste halfwaardetijd → daalt als eerst. INR bij leverpatiënten weerspiegelt de mate van leverfunctieverlies.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Man 70j met longkanker:\nCalcium 3.1 mmol/L\nPTH laag\nFosfaat normaal\nMeest waarschijnlijke oorzaak?',
    a:['Primaire hyperparathyreoïdie','Vitamine D-intoxicatie','Maligniteit-geassocieerde hypercalciëmie (PTHrP)','Sarcoïdose'], c:2,
    ex:'Hypercalciëmie bij maligniteit: tumor produceert PTH-gerelateerd peptide (PTHrP) dat PTH-receptoren activeert → calcium uit botten + verminderde renale klaring. PTH zelf is laag (negatieve feedback). Behandeling: IV vocht + bisfosfonaten, behandel de maligniteit.' },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium',
    q:'Een verhoogd CK (creatinekinase) is specifiek voor hartschade.',
    c:false, ex:'NIET WAAR. CK is aanwezig in skeletspier, hartspier en hersenen. CK stijgt bij elke spierziekte: rhabdomyolyse, myositis, trauma, intensief sporten, myocardinfarct. Voor hartschade is troponine I/T veel specifieker. CK-MB is iets specifieker voor hart maar ook minder dan troponine.' },

  // ── Infectiologie (nieuw batch 2) ──
  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Vrouw 22j: pijnloze vaginale afscheiding, pijn bij plassen. Kweek: gramnegatieve diplokok. Meest waarschijnlijke diagnose?',
    a:['Chlamydia','Gonorroe','Trichomonas','Bacteriële vaginose'], c:1,
    ex:'Gonorroe: gramnegatieve diplokok, bij vrouwen vaak asymptomatisch. Behandeling: ceftriaxon 500 mg IM eenmalig — NIET amoxicilline (>40% resistent in NL). Altijd co-testen op chlamydia (co-infectie 20-40%). Partnerwaarschuwing wettelijk verplicht.' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'Chlamydia trachomatis-infectie verloopt bij de meeste vrouwen zonder klachten (asymptomatisch).',
    c:true, ex:'WAAR. Chlamydia is de meest voorkomende seksueel overdraagbare infectie in Nederland. Tot 70% van de vrouwen heeft geen klachten. Onbehandeld risico op PID (bekkenontstekingsziekte), eileiderletsel en verminderde vruchtbaarheid. Behandeling: azithromycine 1g eenmalig of doxycycline 7 dagen.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Vrouw 28j: koorts 39°C, flankpijn rechts, pijn bij plassen, misselijkheid. Urinekweek: E. coli. Diagnose?',
    a:['Ongecompliceerde cystitis','Pyelonefritis','Appendicitis','Niersteen'], c:1,
    ex:'Pyelonefritis = bovenste UWI. Onderscheid van cystitis: koorts ≥38°C + flankpijn (slagpijn nierloges) wijst op nierparenchym. Cystitis: alleen dysurie/pollakisurie, géén koorts. Behandeling: fluoroquinolon 7 dagen; IV antibiotica bij braken of sepsis.' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'Norovirus (buikgriep) verspreidt zich voornamelijk via de lucht (aerogene transmissie).',
    c:false, ex:'NIET WAAR. Norovirus verspreidt zich primair fecaal-oraal: besmet voedsel/water of oppervlakken. Ook via braaksel­deeltjes (bij overgeven kunnen aerosoldeeltjes vrijkomen). Alcohol-handenreiniger is NIET effectief — zeep en water nodig. Besmettelijkheid al bij 18 virusdeeltjes.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Patiënt komt terug uit Zuidoost-Azië: hoge koorts, ernstige hoofd-/spierpijn, huiduitslag, trombocyten 68 × 10⁹/L. Geen malaria op bloeduitstrijk. Diagnose?',
    a:['Malaria','Dengue','Typhoid','Leptospirose'], c:1,
    ex:'Dengue: flavivirus overgedragen door Aedes-mug. Kenmerken: hoge koorts, hevige spier-/gewrichtspijn ("breakbone fever"), maculopapuleuze uitslag, lage trombocyten. Geen specifieke behandeling — symptomatisch. Geen aspirine of ibuprofen (bloedingsrisico bij lage trombocyten).',
    wiki:{
          kern: "Dengue is een flavivirusinfectie overgedragen door de Aedes aegypti-mug (dag­actief, ook in stedelijk gebied). Vier serotypen (DENV 1-4) — infectie met één type geeft na herstel verhoogd risico op ernstig dengue bij infectie met ander serotype (antilichaamversterking).",
          mechanisme: [
            { title: "Stap 1", desc: "Dengue-koorts verloopt in fasen: (1) febriele fase (2-7d): hoge koorts, hoofdpijn, spierpijn; (2) kritieke fase (dag 4-6): koorts daalt maar vasculaire lekkage." },
            { title: "Stap 2", desc: "trombocytopenie + hemoconcentratie." },
            { title: "Stap 3", desc: "risico dengue-shock; (3) herstelsfase: resorptie + polyurie. Geen malariaparasiet op bloedfilm." },
          ],
          onderscheid: [
            { label: "Malaria", desc: "ook tropisch + koorts, maar cyclisch patroon, parasiet op bloedfilm, geen typische huiduitslag.", type: 'ok' },
            { label: "Chikungunya", desc: "ook Aedes-overdracht + gewrichtspijn, maar chronische gewrichtsklachten maanden na infectie.", type: 'warn' },
            { label: "Zika", desc: "milde koorts + uitslag + conjunctivitis, gevaarlijk in zwangerschap (microcefalie).", type: 'danger' },
            { label: "Typhoid", desc: "contaminatie voedsel/water, buikpijn, bradycardie.", type: 'warn' },
          ],
          therapie: {
            urgent: "Geen antivirale therapie.",
            stappen: [
              { naam: "Symptomatisch", detail: "paracetamol (NIET aspirine of ibuprofen — verergert bloedingsrisico!)." },
              { naam: "Vochtbalans bewaken — bij dengue-shock", detail: "voorzichtige IV-vloeistof." },
              { naam: "Monitoring trombocyten", detail: "<20×10⁹/L of actieve bloeding → transfusie overwegen." },
              { naam: "Stap 4", detail: "Meldingsplichtig in NL." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Immuungecompromitteerde patiënt (na niertransplantatie): koorts, witte plekken in de mond die loslaten. Diagnose?',
    a:['Herpes simplex','Orofaryngeale candidiasis (spruw)','Aphteuze stomatitis','Streptokokkenfaryngitis'], c:1,
    ex:'Orofaryngeale candidiasis: Candida albicans overgroei bij immuun­suppressie, antibiotica­gebruik, corticosteroïden of droge mond. Witte beslag dat loskomt bij wrijven, pijnlijk. Behandeling: fluconazol oraal of nystatin suspensie lokaal.' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'Hepatitis B kan worden overgedragen via besmette bloedtransfusies, seksueel contact én van moeder op kind bij de bevalling.',
    c:true, ex:'WAAR. HBV is 50-100× besmettelijker dan HIV via bloed. Transmissieroutes: bloed (prikongeval, transfusie), seksueel, verticaal (moeder→kind). Preventie: vaccinatie + HBIG bij pasgeborenen van HBsAg-positieve moeders. HBV-vaccin is effectief en onderdeel van het rijksvaccinatieprogramma.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Patiënt na tandheelkundige ingreep: koorts, nieuwe hartgeruis, positieve bloedkweken met Streptococcus viridans. Diagnose?',
    a:['Reumatische koorts','Infectieuze endocarditis','Myocarditis','Pericarditis'], c:1,
    ex:'Infectieuze endocarditis (IE): vegetaties op hartkleppen. Duke-criteria: positieve bloedkweken + echocardiografisch bewijs van vegetatie. Streptococcus viridans: klassiek na tandheelkundige ingreep. Behandeling: langdurig IV antibiotica (4-6 weken). Cave embolieën.' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'Bij een tetanusvaccinatie-naïeve patiënt met een diepe wond moet alleen het vaccin gegeven worden.',
    c:false, ex:'NIET WAAR. Bij een niet-gevaccineerde patiënt met tetanusrisico: zowel het tetanus-toxoïdvaccin (actieve immunisatie) ALS tetanus-immuunglobuline (TIG, passieve immunisatie) geven. Het vaccin bouwt bescherming op voor de toekomst; TIG biedt directe bescherming nu.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Varicella (waterpokken) bij een volwassene van 35 jaar: welke ernstige complicatie moet actief worden uitgesloten?',
    a:['Otitis media','Varicella-pneumonie','Meningitis','Glomerulonefritis'], c:1,
    ex:'Varicella-pneumonie: bij volwassenen en immuungecompromitteerden veel ernstiger dan bij kinderen. Presenteert met hoest, dyspneu en koorts tijdens of vlak na de huiduitslag. Behandeling: aciclovir IV. Zwangere vrouwen extra kwetsbaar → directe behandeling.',
    wiki:{
          kern: "Varicella (waterpokken, VZV) verloopt bij kinderen doorgaans mild, maar bij volwassenen is pneumonie de gevaarlijkste complicatie (1-5% van volwassen waterpokken). Bij zwangere vrouwen en immuungecompromitteerden is het risico nog groter.",
          mechanisme: [
            { title: "Stap 1", desc: "VZV verspreidt zich hematogeen naar de longen → virale pneumonie + interstitiële ontsteking." },
            { title: "Stap 2", desc: "Presenteert dag 3-5 na het uitbreken van de huiduitslag: dyspneu, droge hoest, koorts, soms hemoptoe." },
            { title: "X-thorax", desc: "bilaterale nodulaire infiltraten." },
            { title: "Stap 4", desc: "Onderscheid van bacteriële superinfectie (S. aureus, S. pyogenes) soms moeilijk." },
          ],
          onderscheid: [
            { label: "Bacteriële pneumonie", desc: "purulent sputum, lobar infiltraat, hoge CRP/leukocyten.", type: 'ok' },
            { label: "Mycoplasma", desc: "atypische pneumonie, droge hoest, geen uitslag.", type: 'warn' },
            { label: "Influenzapneumonie", desc: "influenza-seizoen, negatieve VZV-anamnese.", type: 'danger' },
            { label: "Herpes-zosterreactivatie", desc: "dermatomaal, geen diffuse huiduitslag, ouder individu.", type: 'warn' },
          ],
          therapie: {
            urgent: "Aciclovir IV 10 mg/kg 3×/dag 7-10 dagen bij varicella-pneumonie of ernstige ziekte.",
            stappen: [
              { naam: "Stap 1", detail: "Orale aciclovir (800 mg 5×/dag) bij milde volwassen varicella zonder pneumonie." },
              { naam: "Zwangere vrouwen", detail: "altijd behandelen + neonatoloog waarschuwen." },
              { naam: "Stap 3", detail: "VZV-profylaxe (VZIg) beschikbaar voor seronegatieven na blootstelling." },
            ],
          },
        } },

  // ── Farmacologie (nieuw batch 2) ──
  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie',
    q:'NSAIDs (zoals ibuprofen) kunnen de bloeddruk verhogen en de werking van bloeddruk­verlagende medicijnen verminderen.',
    c:true, ex:'WAAR. NSAIDs remmen prostaglandine-aanmaak → vochtretentie + vaatvernauwing → bloeddrukstijging. Dit verzwakt het effect van ACE-remmers, diuretica en bètablokkers. Gebruik ook geassocieerd met nierfunctie­verslechtering, maagbloeding en cardiovasculair risico.' },

  { type:'diagnose', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Patiënt gebruikt langdurig prednisolon (corticosteroïd). Welke complicatie moet je NIET verwachten?',
    a:['Osteoporose','Hyperglykemie','Hypotensie','Verhoogd infectierisico'], c:2,
    ex:'Langdurige corticosteroïden geven juist hypertensie (niet hypotensie) door natrium- en waterretentie. Andere bijwerkingen: osteoporose, DM, gewichtstoename, Cushing-uiterlijk, staar, maagulcus en immuunonderdrukking.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Patiënt gebruikt lithium voor bipolaire stoornis. Welke twee organen moeten regelmatig gecontroleerd worden?',
    a:['Hart en lever','Nieren en schildklier','Longen en bijnieren','Lever en alvleesklier'], c:1,
    ex:'Lithium is nefrotoxisch bij chronisch gebruik (tubulusschade) en kan hypothyreoïdie veroorzaken. Controleer creatinine en TSH elke 6 maanden. Lithiumspiegel zelf ook monitoren: smal therapeutisch venster (0.6-1.0 mmol/L). Cave dehydratie — verhoogt lithiumspiegel snel.' },

  { type:'diagnose', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Oudere man op digoxine: misselijkheid, gele-groene kleurvisie, bradycardie 44/min. Diagnose?',
    a:['Digoxine-toxiciteit','Bètablokker overdosering','Hyperkaliëmie','Hypothyreoïdie'], c:0,
    ex:'Digoxinetoxiciteit: smal therapeutisch venster. Symptomen: misselijkheid, gele/groene visie, bradycardie, AV-blokken. Risicofactoren: nierfalen (verminderde klaring), hypokaliëmie (sensitiseert hart), hoge leeftijd. Behandeling: stop digoxine, digoxine-Fab-fragmenten bij ernstige toxiciteit.',
    wiki:{
          kern: "Digoxine heeft een therapeutische breedte van 0.5–0.9 ng/mL (smal!). Toxiciteit treedt op bij serumspiegels >2.0 ng/mL.",
          mechanisme: [
            { title: "Na⁺/K⁺-ATPase-remming", desc: "Digoxine blokkeert de Na⁺/K⁺-ATPase-pomp → verhoogd intracellulair Na⁺ in hartcellen." },
            { title: "Ca²⁺-stapeling", desc: "Hoog intracellulair Na⁺ → versnelde Na⁺/Ca²⁺-wisselaar → verhoogd intracellulair Ca²⁺ → positief inotroop effect." },
            { title: "Toxiciteitsdrempel", desc: "Bij toxische spiegels (>2,0 ng/mL): overmatig Ca²⁺ → afterdepolarisaties → triggered activity → ventrikulaire aritmieën." },
            { title: "Risicofactoren", desc: "Nierfalen (verminderde klaring), hypokaliëmie (sensitiseert hart voor aritmieën), ouderen. Smal therapeutisch venster: 0,5–0,9 ng/mL." },
          ],
          onderscheid: [
            { label: "Digoxine-toxiciteit", desc: "Bradycardie + AV-blok + xanthopsie (gele/groene kleurvisie) + GI-klachten. Smal therapeutisch venster. Risico bij nierfalen + hypokaliëmie.", type: 'ok' },
            { label: "Bètablokkertoxiciteit", desc: "Bradycardie + AV-blok maar geen xanthopsie of prominente GI-klachten. Glucagon als antidotum.", type: 'warn' },
            { label: "Calciumantagonist-overdosering", desc: "Bradycardie + hypotensie + hyperglykemie. Calcium IV + insuline als antidotum.", type: 'warn' },
            { label: "Hyperkaliëmie", desc: "Breed QRS + sinusgolf-ECG — kan ook ECG-veranderingen veroorzaken, maar geen xanthopsie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Stop digoxine direct.",
            stappen: [
              { naam: "Elektrolytcorrectie", detail: "Correctie hypokaliëmie — K⁺ >4,0 mmol/L nastreven om aritmiedrempel te verhogen." },
              { naam: "Bradycardie", detail: "Atropine IV bij symptomatische bradycardie — tijdelijke maatregel." },
              { naam: "Digibind/DigiFab", detail: "Digoxine-specifieke Fab-antilichaamfragmenten bij levensbedreigende aritmie of ernstige hyperkaliëmie — neutraliseren circulerend digoxine snel." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie',
    q:'Patiënten met een penicilline-allergie mogen nooit cefalosporines krijgen vanwege een hoge kans op kruisreactie.',
    c:false, ex:'NIET WAAR. De kruisreactierate tussen penicillines en cefalosporines is slechts 1-2%, veel lager dan vroeger gedacht. Bij een lichte penicilline-reactie (huiduitslag, geen anafylaxie) kunnen cefalosporines veilig worden gebruikt. Alleen bij anafylaxie is extra voorzichtigheid geboden.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Waarom worden benzodiazepinen als slaapmiddel afgeraden bij ouderen boven de 65 jaar?',
    a:['Ze werken niet bij ouderen','Verhoogd risico op vallen, verwardheid en cognitieve achteruitgang','Ze veroorzaken afhankelijkheid alleen bij jongeren','Ze zijn te duur voor ouderen'], c:1,
    ex:'Benzodiazepinen bij ouderen: tragere afbraak → ophoping → overdag nog sederend → valrisico + heupfractuur + verwarring + cognitieve achteruitgang. Alternatief: slaaphygiëne, melatonine of kortdurende lage-dosis Z-drug. Staat op de Beers-lijst (vermijden bij ouderen).' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie',
    q:'De combinatie van een SSRI en een NSAID verhoogt het risico op een maagbloeding.',
    c:true, ex:'WAAR. SSRIs remmen trombocytaire serotonine-opname → verminderde plaatjesaggregatie. NSAIDs beschadigen de maagwand én remmen ook plaatjes via COX-1. Gecombineerd gebruik geeft 3-15x hogere kans op GI-bloeding. Overweeg maagsapbescherming (PPI) bij deze combinatie.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welk antiaritmicum heeft bekende bijwerkingen op de longen, schildklier én lever bij langdurig gebruik?',
    a:['Metoprolol','Digoxine','Amiodaron','Verapamil'], c:2,
    ex:'Amiodaron: effectief breed-spectrum antiaritmicum maar met veel bijwerkingen bij langdurig gebruik: longfibrose, hypo- én hyperthyreoïdie (bevat 37% jodium), levertoxiciteit, fotosensitiviteit, blauw-grijze huidverkleuring, cornea-deposities. Regelmatige controle van TSH, leverenzymen en longfunctie nodig.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welk diureticum spaart kalium en wordt ook gebruikt bij hartfalen om de prognose te verbeteren?',
    a:['Furosemide','Hydrochloorthiazide','Spironolacton','Mannitol'], c:2,
    ex:'Spironolacton (aldosteronantagonist): blokkeert aldosteron → kaliumsparend + natriumuitscheiding. Bij hartfalen (HFrEF): vermindert fibrose en mortaliteit. Cave: hyperkaliëmie bij combinatie met ACE-remmer/ARB. Bijwerking bij mannen: gynaecomastie (aldosteron-receptor heeft ook androgene affiniteit).' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie',
    q:'Paracetamol is veilig in elke dosis en heeft geen leverschadelijk effect.',
    c:false, ex:'NIET WAAR. Paracetamol is veilig binnen de aanbevolen dosis (max 4g/dag, max 3g/dag bij leverziekte/alcoholmisbruik). Bij overdosis: toxisch metaboliet NAPQI ophoping → levernecrose. Antidotum: N-acetylcysteïne (NAC). Paracetamol-overdosis is een van de meest voorkomende oorzaken van acuut leverfalen.' },

  // ── Neurologie (nieuw batch 2) ──
  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 45j na auto-ongeluk: rugpijn, zwakte in beide benen, verlies van blaascontrole. Urgente diagnose?',
    a:['Lumbale hernia','Cauda equina syndroom','Perifere neuropathie','Wervelmetastase'], c:1,
    ex:'Cauda equina syndroom: ALARMSYMPTOOM is urineretentie (of -incontinentie) + zadelanesthesie. Zwakte benen is variabel. Neurochirurgische spoedurgentie: MRI binnen uren, decompressie binnen 24u — elke vertraging = permanent verlies van blaasfunctie.',
    wiki:{
          kern: "Cauda equina syndroom (CES) is compressie van de zenuwbundel onder L1 (sacrale wortels = perifere zenuwen). Klassieke triade: urineretentie + perianale gevoelsstoornis (zadelanesthesie) + zwakte benen.",
          mechanisme: [
            { title: "Oorzaak & anatomie", desc: "Meest voorkomende oorzaak: grote centrale lumbale hernia (L4-L5 of L5-S1). Ook: trauma, epiduraal abces, tumor, hematoom. Druk op S2-S4 wortels." },
            { title: "Blaasinnervatie", desc: "Compressie van S2-S4 → verlies parasympathische blaasinnervatie → urineretentie (of -incontinentie bij overloopblaas)." },
            { title: "Diagnostiek", desc: "MRI lumbaal is de enige betrouwbare goudstandaard — binnen uren uitvoeren. Zadelanesthesie (perianaal gebied) is pathognomonisch." },
          ],
          onderscheid: [
            { label: "Cauda equina syndroom", desc: "Urineretentie + zadelanesthesie + zwakte benen. Perifeer letsel (LMN). MRI lumbaal direct. Decompressie binnen 24u.", type: 'ok' },
            { label: "Conus medullaris-syndroom", desc: "Hoger niveau (T12-L1), gemengde UMN/LMN-uitval, minder retentie, eerder bilaterale zwakte.", type: 'warn' },
            { label: "Lumbale hernia zonder CES", desc: "Eenzijdig uitstralend, geen blaasdysfunctie — elektief beleid.", type: 'warn' },
            { label: "Wervelmetastase", desc: "Maligniteitsanamnese, botpijn, myelumtekenen — ook oncologische urgentie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Spoedopname + MRI lumbaal direct — uren tellen!",
            stappen: [
              { naam: "Decompressie", detail: "Chirurgische decompressie binnen 24u bij locomotore patiënt → 80% kans op loopbehoud." },
              { naam: "Katheterisatie", detail: "Urethrale katheter ter overbrugging van de urineretentie." },
              { naam: "Na decompressie", detail: "Blaas-/darmrevalidatie, neurofysiologische follow-up en multidisciplinaire revalidatie." },
              { naam: "Prognose", detail: "Uitstel van decompressie = permanent blaasverlies — elke vertraging telt!" },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 68j: draaiduizeligheid die seconden duurt, uitgelokt door omdraaien in bed, geen gehoorverlies. Diagnose?',
    a:['Cerebellair CVA','Ziekte van Ménière','BPPV (goedaardige paroxysmale positieveranderingsduizeligheid)','Vestibulair neuritis'], c:2,
    ex:'BPPV: kortdurende duizeligheid uitgelokt door hoofdbewegingen, veroorzaakt door losgeraakt otolietje in halfcirkelvormig kanaal. Diagnose: Dix-Hallpike-manoeuvre. Behandeling: Epley-manoeuvre. Geen medicatie nodig.',
    wiki: {
      kern: 'BPPV is de meest voorkomende oorzaak van draaiduizeligheid. Een losgeraakt otoliet (calciumcarbonaat-kristal) in het posterieure halfcirkelvormige kanaal verstoort de vloeistofbeweging bij hoofdbewegingen → korte hevige draaiduizeligheid.',
      redflag: 'Duizeligheid die niet uitgelokt wordt door positieverandering, of gepaard gaat met hoofdpijn, dubbelzien, ataxie of focale uitval → denk aan cerebellair CVA. HINTS-test gebruiken.',
      mechanisme: [
        { title: 'Kanaallithiasis', desc: 'Losgeraakt otoliet zit in het posterieure halfcirkelvormige kanaal → bij omdraaien schuift het door → abnormale endolymfbeweging → draaiduizeligheid seconden.' },
        { title: 'Dix-Hallpike-manoeuvre', desc: 'Hoofd 45° draaien + plotse achterover leggen → uitlokken van torsionele nystagmus + duizeligheid bij BPPV. Nystagmus treedt op na 5-10 sec latentie.' },
        { title: 'Epley-manoeuvre', desc: 'Serie van hoofdbewegingen die het otoliet uit het kanaal "rollen" → 90% success na 1-2 behandelingen. Geen medicatie nodig.' },
      ],
      onderscheid: [
        { label: 'BPPV', desc: 'Seconden durende duizeligheid, uitgelokt door positie, geen gehoorverlies. Dix-Hallpike positief. Epley genezend.', type: 'ok' },
        { label: 'Ziekte van Ménière', desc: 'Aanvallen 20 min - uren, gehoorverlies + tinnitus + volheidsgevoel oor. Langer dan BPPV.', type: 'warn' },
        { label: 'Vestibulair neuritis', desc: 'Aanhoudende (dagen) continue duizeligheid, geen gehoorverlies. Na virale infectie. Niet positie-afhankelijk.', type: 'warn' },
        { label: 'Cerebellair CVA', desc: 'HINTS-test: nystagmus wisselt richting of geen head-impulse-correctie → alarmerend! CT/MRI direct.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Epley-manoeuvre direct uitvoeren — 90% genezing na 1-2 sessies.',
        stappen: [
          { naam: 'Dix-Hallpike eerst', detail: 'Bevestig de diagnose: torsionele nystagmus naar het aangedane oor, latentie 5-10 sec, duurt <60 sec, fatigability.' },
          { naam: 'Epley-manoeuvre', detail: '4-staps repositie-manoeuvre, elk 30 sec aanhouden. Daarna 48u rechtop slapen (theoretisch maar bewijs beperkt).' },
          { naam: 'Geen medicatie', detail: 'Meclizine/betahistine hebben geen bewezen voordeel boven Epley bij BPPV. Gebruik ze niet routinematig.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie',
    q:'Een epileptische aanval die langer dan 5 minuten duurt, wordt beschouwd als status epilepticus en vereist directe behandeling.',
    c:true, ex:'WAAR. Status epilepticus: aanval >5 minuten of twee aanvallen zonder bewustzijnsherstel tussendoor. Behandeling: lorazepam of diazepam IV/rectaal direct. Bij uitblijven reactie: levetiracetam of valproaat IV. Na 30 min zonder respons: anesthesie.',
    wiki: {
      kern: 'Status epilepticus (SE) = aanval ≥5 minuten of twee aanvallen zonder herstel van bewustzijn. Elke minuut langer = meer neuronschade. Strakke tijdlijn: benzodiazepine direct, daarna anti-epilepticum IV, daarna anesthesie.',
      redflag: 'Refractaire SE (>30 min zonder respons) vereist anesthesie-inductie en mechanische beademing. Mortaliteit 10-20% — vertraging van behandeling verhoogt risico op blijvende hersenschade.',
      mechanisme: [
        { title: 'Zelfperpetuerend mechanisme', desc: 'Langdurige aanval → internalisatie van GABA-receptoren → verminderde remmende activiteit → benzodiazepinen worden minder effectief naarmate de aanval langer duurt.' },
        { title: 'Neuronschade', desc: 'Excessieve glutamaat-activatie → calciuminstroom → excitotoxiciteit → irreversibele neuronsterfte bij aanhoudende SE.' },
        { title: 'Tijdslijn', desc: '0-5 min: normale aanval. 5-30 min: early SE → behandel direct. 30-60 min: established SE. >60 min: refractaire SE.' },
      ],
      onderscheid: [
        { label: 'Convulsieve SE', desc: 'Klinisch zichtbaar: tonisch-clonische bewegingen aanhoudend. Behandel direct. Risico rhabdomyolyse, hyperthermie, hypoxie.', type: 'ok' },
        { label: 'Non-convulsieve SE', desc: 'Geen externe spierbewegingen maar continu EEG-activiteit. Verwardheid/coma. Diagnose alleen met EEG. Even ernstig!', type: 'danger' },
        { label: 'Psychogene aanval', desc: 'Geen EEG-correlaat. Niet-epileptische aanval. Reageert niet op anti-epileptica. Diagnose met video-EEG.', type: 'warn' },
      ],
      therapie: {
        urgent: '0-5 min: benzodiazepine — lorazepam 4 mg IV of diazepam 10 mg rectaal.',
        stappen: [
          { naam: '5-30 min (geen respons)', detail: 'Levetiracetam 60 mg/kg IV OF valproaat 40 mg/kg IV OF fenytoïne 20 mg/kg IV. Kies levetiracetam als eerste keus (minste bijwerkingen).' },
          { naam: '>30 min (refractair)', detail: 'Anesthesie-inductie: propofol of midazolam IV, intubatie, continue EEG-monitoring op IC.' },
          { naam: 'Oorzaak zoeken', detail: 'Bloedglucose (hypoglykemie), natrium (hyponatriëmie), koorts (meningitis), anti-epilepticum-spiegels, toxicologie.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 40j: progressieve choreiforme (kronkelende) bewegingen, gedragsverandering, familielid ook aangedaan. Diagnose?',
    a:['Parkinson','Huntington','Wilson','Tardieve dyskinesie'], c:1,
    ex:'Huntington: autosomaal dominante aandoening door CAG-herhaling in het HTT-gen. Triade: chorea + gedragsverandering + dementie. Begint typisch 35-50 jaar. Genetische test bevestigt diagnose. Geen curatieve behandeling.',
    wiki:{
          kern: "Huntington is een autosomaal dominante neurodegeneratieve aandoening door een CAG-trinucleotide-herhaling (>36 kopieën) in het HTT-gen op chromosoom 4. Anticipatie: grotere herhaling in volgende generatie → eerder begin.",
          mechanisme: [
            { title: 'Mutant huntingtin', desc: 'CAG-herhaling >36 kopieën → mutant huntingtin-eiwit is toxisch voor het striatum (nucleus caudatus + putamen).' },
            { title: 'GABA-neuronenverlies', desc: 'Verlies van GABA-erge neuronen in het striatum → verminderde remming van thalamus → ongecontroleerde bewegingen.' },
            { title: 'Frontale atrofie', desc: 'Gedragsverandering en executieve stoornissen treden vaak VOOR de motorische klachten op door atrofie frontale kwab.' },
            { title: 'Anticipatie', desc: 'Bij overdracht via vader: CAG-herhaling groeit → ernstiger ziekte en eerder begin in volgende generatie.' },
          ],
          onderscheid: [
            { label: "Huntington", desc: "Autosomaal dominant, CAG-herhaling >36 op chromosoom 4. Triade: chorea + gedragsverandering + dementie. Anticipatie. Positieve familiegeschiedeni.", type: 'ok' },
            { label: "Sydenham-chorea", desc: "Post-streptokokken (kinderen), tijdelijk beloop, anti-ASL verhoogd, geen familiegeschiedeni.", type: 'warn' },
            { label: "Wilson", desc: "Ook chorea maar combinatie met levercirrose + Kayser-Fleischer-ring + kopermetabolisme gestoord.", type: 'warn' },
            { label: "Tardieve dyskinesie", desc: "Na antipsychotica, orolinguaal dominant, geen familiegeschiedeni — anamnese cruciaal.", type: 'danger' },
          ],
          therapie: {
            urgent: "Geen curatieve behandeling.",
            stappen: [
              { naam: "Chorea", detail: "tetrabenazine of deutetrabenazine (depletie presynaptisch dopamine)." },
              { naam: "Psychiatrische comorbiditeit", detail: "antidepressiva, antipsychotica laaggedoseerd." },
              { naam: "Multidisciplinair", detail: "fysiotherapie, logopedisch, psychologisch." },
              { naam: "Genetische counseling", detail: "Essentieel — kinderen hebben 50% kans; presymptomatisch testen mogelijk na diepgaand consult en ethische afweging." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 32j: koorts, verwardheid, temporaalkwab-afwijkingen op MRI, afwijkende liquor. Meest waarschijnlijke verwekker?',
    a:['Neisseria meningitidis','Herpes simplex virus type 1 (HSV-1)','Cryptococcus','Listeria'], c:1,
    ex:'HSV-encefalitis: temporale lokalisatie op MRI is kenmerkend. Presenteert met koorts, verwardheid en soms epilepsie. Behandeling: aciclovir IV zo snel mogelijk starten — zelfs vóór bevestiging via LP-PCR.',
    wiki:{
          kern: "HSV-encefalitis is de meest voorkomende sporadische virale encefalitis. Oorzaak: HSV-1-reactivatie in ganglion trigeminale → retrograde verspreiding naar temporaalkwabben.",
          mechanisme: [
            { title: "Virale reactivatie", desc: "HSV-1 reaktiveert in het ganglion trigeminale en verspreidt zich retrograde naar de temporaalkwab — primaire lokus van beschadiging." },
            { title: "Necrotiserende ontsteking", desc: "Hemorrhagische, necrotiserende encefalitis in de temporaalkwab en insulaire cortex → oedeem, epilepsie en herniatierisico." },
            { title: "Diagnostiek", desc: "LP: lymfocytaire pleocytose, licht verhoogd eiwit, normaal glucose. PCR HSV-DNA is de goudstandaard. MRI: T2-FLAIR-hyperintensiteit temporaalkwab (soms bilateraal)." },
          ],
          onderscheid: [
            { label: 'HSV-encefalitis', desc: 'Koorts + verwardheid + temporale MRI-afwijkingen. LP: lymfocytaire pleocytose, licht verhoogd eiwit, PCR HSV-DNA positief. Aciclovir direct!', type: 'ok' },
            { label: 'Bacteriële meningitis', desc: 'PMN-pleocytose, sterk laag glucose, geen temporale MRI-afwijkingen — antibiotica urgent.', type: 'warn' },
            { label: 'Auto-immuunencefalitis (anti-NMDAR)', desc: 'Traag begin over weken, jongere vrouwen, ovarium-teratoom, psychiatrisch voorop (hallucinaties, gedragsverandering). PCR HSV negatief.', type: 'danger' },
            { label: 'Cryptococcus-meningitis', desc: 'Immuungecompromitteerd (HIV, immunosuppressie), India-inkt LP positief, laag glucose.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Aciclovir IV 10 mg/kg 3×/dag — direct bij verdenking, NIET wachten op PCR.',
            stappen: [
              { naam: 'Duur behandeling', detail: '14 dagen bij normale immuniteit, 21 dagen bij immunosuppressie. PCR na behandeling om einde te bevestigen.' },
              { naam: 'Anti-epileptica', detail: 'Bij insulten — levetiracetam of valproaat, temporale origine geeft hoog recidiefrisico.' },
              { naam: 'Restverschijnselen', detail: 'Geheugenklachten, gedragsverandering, epilepsie — multidisciplinaire revalidatie na acute fase.' },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 35j: aanvallen van kloppende eenzijdige hoofdpijn met misselijkheid, lichtschuwheid, duren 4-72 uur. Diagnose?',
    a:['Spanningshoofdpijn','Clusterhoofdpijn','Migraine','Sinusitis'], c:2,
    ex:'Migraine: eenzijdige, kloppende hoofdpijn 4-72u + misselijkheid/braken + licht- en geluidsschuwheid. Aura bij 30%. Acute behandeling: triptan + NSAID. Profylaxe bij ≥4 aanvallen/maand: propranolol, topiramaat of amitriptyline.',
    wiki: {
      kern: 'Migraine is een neurobiologische aandoening gekenmerkt door terugkerende aanvallen van eenzijdige, kloppende hoofdpijn (4-72u) met misselijkheid en foto-/fonofobie. Aura (visueel/sensorisch) bij 30% van patiënten.',
      mechanisme: [
        { title: 'Cortical spreading depression', desc: 'Golf van neuronale depolarisatie verspreidt zich over de cortex → aura. Activeert trigeminuszenuw → pijnmediatoren vrijkomen → vasodilatatie → kloppende hoofdpijn.' },
        { title: 'Trigeminovasculaire route', desc: 'Trigeminuszenuweindjes rond dura mater en hersenarterieën → neuropeptiden (CGRP) vrijkomen → neurogeneinflammatie → kloppende pijn.' },
        { title: 'Prodroom', desc: 'Uren voor de aanval: geeuwen, vermoeidheid, concentratieverlies, prikkelbaarheid — neuronale hyperexcitabiliteit in hypothalamus.' },
      ],
      onderscheid: [
        { label: 'Migraine', desc: 'Eenzijdig kloppend, 4-72u, misselijkheid, foto/fonofobie. Verergering bij beweging. Triptan effectief.', type: 'ok' },
        { label: 'Spanningshoofdpijn', desc: 'Bilateraal drukkend (band om hoofd), milde-matige intensiteit, geen misselijkheid, geen fono/fotofobie.', type: 'warn' },
        { label: 'Clusterhoofdpijn', desc: 'Extreem hevig, periorbital, 15-180 min, autonome verschijnselen (traanvloed, ptosis). Man, nachtelijk.', type: 'danger' },
        { label: 'SAB', desc: 'Thunderclap (maximaal in seconden), nekstijfheid. Nooit als migraine afschrijven bij eerste aanval.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Triptan (sumatriptan 50-100 mg) + NSAID (naproxen 500 mg) samen — meer effectief dan apart.',
        stappen: [
          { naam: 'Aanvalsbehandeling', detail: 'Triptan effectief bij 60-70%. Domperidon/metoclopramide bij misselijkheid. Vroeg in de aanval innemen.' },
          { naam: 'Profylaxe', detail: 'Bij ≥4 aanvallen/maand: propranolol 80-160 mg/dag, topiramaat 25-100 mg/dag, of amitriptyline 10-75 mg/nacht.' },
          { naam: 'CGRP-antilichamen', detail: 'Erenumab, fremanezumab — nieuw, effectief bij refractaire migraine. Maandelijkse subcutane injectie.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie',
    q:'Een subduraal hematoom ontstaat door ruptuur van de arteria meningea media en presenteert zich met een lucide interval.',
    c:false, ex:'NIET WAAR. Dat is een epiduraal hematoom (arterieel). Een subduraal hematoom ontstaat door ruptuur van brugvenen (veneus) en heeft een langzamer beloop — soms pas dagen tot weken na trauma. Komt vaker voor bij ouderen en mensen die bloedverdunners gebruiken.',
    wiki: {
      kern: 'Subduraal hematoom (SDH) ontstaat door ruptuur van brugvenen (veneus) — niet de arteria meningea media (dat is epiduraal). SDH heeft een langzamer beloop: acuut (<24u), subacuut (1-14 dagen) of chronisch (>14 dagen).',
      redflag: 'Chronisch SDH bij ouderen: kan zich presenteren als dementie of progressieve verwsarring weken na een licht trauma. Bloedverdunners en hersenatrofie verhogen het risico sterk.',
      mechanisme: [
        { title: 'Brugveenruptuur', desc: 'Bij (licht) trauma of acceleratie-deceleratie: brugvenen die over de dura lopen worden uitgerekt en scheuren → veneuze bloeding in subdurale ruimte.' },
        { title: 'Risicogroepen', desc: 'Ouderen (hersenatrofie → meer ruimte → meer spanning op brugvenen), antistolling, alcoholisme, shunts.' },
        { title: 'Chronisch SDH', desc: 'Oud bloed lost op, trekt osmotisch vocht aan → hematoom groeit → verhoogde ICP met vertraagde symptomen weken later.' },
      ],
      onderscheid: [
        { label: 'Subduraal hematoom', desc: 'Halvemaanvorm op CT (volgt hersencontour), veneus, ouderen/antistolling, geen of langzaam lucide interval.', type: 'ok' },
        { label: 'Epiduraal hematoom', desc: 'Biconvex op CT, arterieel (a. meningea media), temporale schedelfractuur, jongeren, klassiek lucide interval.', type: 'warn' },
        { label: 'SAB', desc: 'Bloed in sulci en cisternae, geen trauma nodig, donderslaghoofdpijn, xanthochromie in liquor.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Acuut SDH met neurologische uitval: neurochirurgische evacuatie.',
        stappen: [
          { naam: 'Antistolling staken', detail: 'Direct staken en antagoneren: vitamine K + PCC bij VKA. Andexanet bij factor Xa-remmers.' },
          { naam: 'Chronisch SDH', detail: 'Boorgat-trepanatie (boor-hole drainage) onder lokale anesthesie — minder invasief dan craniotomie, effectief bij chronisch.' },
          { naam: 'Conservatief', detail: 'Kleine asymptomatische SDH bij stabiele patiënt: CT-controle, antistolling staken, observatie.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 60j met prostaatkanker: acute rugpijn, zwakte benen, gestoord gevoel onder de knieën. MRI: massa op hoogte T8. Diagnose?',
    a:['Lumbale hernia','Metastatische ruggenmergcompressie','Aortadissectie','Perifere neuropathie'], c:1,
    ex:'Metastatische ruggenmergcompressie: UREN tellen — bij nieuw loopverlies kans op permanent letsel. Direct dexamethason 16 mg IV (antioedeem). Spoedradiotherapie of chirurgische decompressie. Kan lopen bij behandeling → grote kans op loopbehoud; al paraplegie → slechte prognose.',
    wiki:{
          kern: "Metastatische epidurale ruggenmergcompressie (MESCC) is een oncologische urgentie. Meest voorkomende primaire tumoren: borst, prostaat, long, myeloom, niercel.",
          mechanisme: [
            { title: "Hematogene metastase", desc: "Tumorcellen bereiken wervellichamen via de bloedbaan — borst, prostaat en long zijn de meest voorkomende primaire tumoren." },
            { title: "Epidurale uitbreiding", desc: "Tumor breidt zich uit van wervellichaam naar de epidurale ruimte en comprimeert het myelum direct." },
            { title: "Vasculaire schade", desc: "Veneuze stuwing en arteriële ischemie van het myelum → oedeem en axonale beschadiging." },
            { title: "Tijdkritisch letsel", desc: "Hoe langer de compressie duurt, hoe meer axonen onherstelbaar beschadigen — loopfunctie bij aanvang is de kritische prognostische maatstaf." },
          ],
          onderscheid: [
            { label: "Metastatische ruggenmergcompressie (MESCC)", desc: "Maligniteitsanamnese + acute myelopathie. MRI: epidurale massa. Dexamethason + spoedradiotherapie of chirurgie.", type: 'ok' },
            { label: "Lumbale hernia", desc: "Jonger, geen maligniteit, eenzijdig radiculair, geen myelumtekenen.", type: 'warn' },
            { label: "Cauda equina syndroom", desc: "Lager niveau, LMN-uitval, blaasretentie vroeg — ook een spoedurgentie.", type: 'warn' },
            { label: "Epiduraal hematoom", desc: "Acuut, bloedingsdiathese, geen tumoranamnese — CT/MRI onderscheidt snel.", type: 'danger' },
          ],
          therapie: {
            urgent: "Direct dexamethason 16 mg IV bolus — antioedeem, werkt in uren.",
            stappen: [
              { naam: "Radiotherapie", detail: "Spoedradiotherapie binnen 24u bij niet-chirurgische tumoren — effectief bij de meeste solide metastasen." },
              { naam: "Chirurgie-indicaties", detail: "Mechanische instabiliteit, onbekende primaire tumor, radioresistente tumor of progressie ná radiotherapie." },
              { naam: "Prognose ambulant", detail: "Ambulant bij start behandeling → 80% behoud loopfunctie." },
              { naam: "Prognose paraplegie", detail: "Reeds paraplegie bij aanvang → slechts 15% kans op herstel." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 55j met DM2: branderig gevoel en tintelingen in beide voeten, symmetrisch, erger \'s nachts. Diagnose?',
    a:['Perifeer arterieel vaatlijden','Distale symmetrische polyneuropathie','Ruggenmergcompressie','Restless legs syndroom'], c:1,
    ex:'Diabetische polyneuropathie: meest voorkomende complicatie van DM, begint distaal symmetrisch (kousen-/handschoenpatroon). Oorzaak: chronisch hoge glucose beschadigt kleine bloedvaten van zenuwen. Behandeling: glucosecontrole, amitriptyline of duloxetine voor pijn.',
    wiki:{
          kern: "Distale symmetrische polyneuropathie (DSPN) is de meest voorkomende chronische complicatie van DM — aanwezig bij 50% na 25 jaar. Kousen/handschoenpatroon: begint in de voeten, stijgt op.",
          mechanisme: [
            { title: "Chronische hyperglykemie", desc: "Langdurig verhoogd glucose activeert schadelijke metabole routes: aldosereductase (sorbitol), AGE-vorming en oxidatieve stress." },
            { title: "Vasa nervorum-schade", desc: "Microangiopathie van de kleine bloedvaten die zenuwen voeden → ischemie en axonale degeneratie, beginnend bij de langste vezels (voeten)." },
            { title: "Autonome neuropathie", desc: "Autonome vezels ook aangedaan: gastroparese, orthostatische hypotensie, seksuele disfunctie, stille MI (geen pijnwaarneming!)." },
          ],
          onderscheid: [
            { label: 'Diabetische polyneuropathie (DSPN)', desc: 'Kousen/handschoenpatroon, brandend \'s nachts, symmetrisch distaal, langzaam progressief bij DM-duur >10 jaar.', type: 'ok' },
            { label: 'PAV', desc: 'Pijn bij lopen (claudicatio), verdwijnt in rust, ABI <0,9. Geen branderig karakter, niet \'s nachts erger.', type: 'warn' },
            { label: 'B12-deficiëntie', desc: 'Identiek beeld van neuropathie — ALTIJD uitsluiten, volledig reversibel bij vroege behandeling. Metformine vermindert B12-opname.', type: 'danger' },
            { label: 'Restless legs', desc: '\'s Avonds/nachts onaangenaam gevoel met drang te bewegen, verbetert bij bewegen — geen echte neuropathie.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Strikte glucoseregulatie vertraagt progressie — HbA1c <53 mmol/mol als doel.',
            stappen: [
              { naam: 'Pijnbehandeling', detail: 'Duloxetine (SNRI) of pregabaline/gabapentine als eerste keus; amitriptyline als alternatief.' },
              { naam: 'Capsaïcine', detail: 'Topisch capsaïcine bij lokale pijn — uitgeputte TRPV1-vezels produceren minder pijnsignalen.' },
              { naam: 'Valpreventie', detail: 'Balanstraining + krachttraining — neuropathie verhoogt valrisico significant.' },
              { naam: 'Voetcontrole', detail: 'Jaarlijkse monofilamenttest + inspectie — neuropathisch ulcus is een voorloper van amputatie.' },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie',
    q:'Clusterhoofdpijn komt vaker voor bij vrouwen dan bij mannen.',
    c:false, ex:'NIET WAAR. Clusterhoofdpijn is juist een van de weinige hoofdpijnsoorten die vaker bij mannen voorkomt (M:V ≈ 3:1). Presentatie: extreem hevige eenzijdige pijn rond het oog, met traan- en neusloop, conjunctivale injectie, duur 15-180 minuten.',
    wiki: {
      kern: 'Clusterhoofdpijn is de hevigste primaire hoofdpijn — de pijn rond het oog wordt omschreven als "heet pook in het oog". Kenmerkend: autonome verschijnselen ipsilateraal (traanvloed, ptosis, neusloop) + perioden van dagelijkse aanvallen (clusters).',
      redflag: 'De intensiteit van clusterhoofdpijn kan leiden tot suïcidaliteit ("suicide headache"). Patiënten zijn typisch agiteerd en kunnen niet stilliggen — anders dan bij migraine.',
      mechanisme: [
        { title: 'Hypothalamische activatie', desc: 'Hypothalamus activeert trigeminale pijnbanen en parasympathische zenuwen → periorbital pijn + autonome verschijnselen.' },
        { title: 'Autonome verschijnselen', desc: 'Parasympathische activatie: traanvloed, rhinorrhoea, conjunctivale injectie. Sympathische inhibitie: ptosis, miosis (Horner).' },
        { title: 'Clusterperiode', desc: 'Aanvallen dagelijks 1-8x per dag gedurende weken tot maanden, gevolgd door maanden remissie (episodisch type).' },
      ],
      onderscheid: [
        { label: 'Clusterhoofdpijn', desc: 'Periorbital, extreem hevig, 15-180 min, autonome verschijnselen ipsilateraal, man, nachtelijk, agitatie.', type: 'ok' },
        { label: 'Migraine', desc: 'Langer (4-72u), kloppend, misselijkheid, patiënt legt zich stilletjes neer, vrouwen vaker.', type: 'warn' },
        { label: 'Trigeminus neuralgie', desc: 'Elektrische schok-pijn in aangezicht, seconden, uitgelokt door eten/praten/aanraken. Geen autonome verschijnselen.', type: 'warn' },
        { label: 'SAB', desc: 'Thunderclap, nekstijfheid. Nooit clusterhoofdpijn diagnostiseren zonder SAB uit te sluiten bij eerste aanval.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Zuurstof 100% 15 L/min via non-rebreather masker 15 min — effectief bij 60-70% van de aanvallen.',
        stappen: [
          { naam: 'Sumatriptan SC', detail: '6 mg subcutaan — snelste en meest effectieve aanvalsbehandeling. Werkt binnen 15 minuten.' },
          { naam: 'Profylaxe tijdens cluster', detail: 'Verapamil 240-960 mg/dag — meest effectief. Lithium bij chronisch type. Corticosteroïden voor snelle overbrugging.' },
          { naam: 'Preventie', detail: 'Vermijd alcohol en nicotine tijdens clusterperiode — bewezen uitlokkers.' },
        ],
      },
    } },

  // ── Cardiologie (nieuw batch 2) ──
  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 42j: plotse kortademigheid, pleuritische pijn, been gezwollen na lange vlucht. Meest waarschijnlijke diagnose?',
    a:['Pneumonie','Longembolie','Pleuritis','Pneumothorax'], c:1,
    ex:'Longembolie: plotse pleuritische pijn + dyspneu + risicofactor (vlucht, DVT) = hoge klinische verdenking. Wells-score laag + negatief D-dimeer: LE uitgesloten. Wells hoog of D-dimeer positief: direct CT-PA. Behandeling: DOAC (apixaban of rivaroxaban).',
    wiki: {
      kern: 'Longembolie (LE): occlusie van een pulmonaalarterie door een (meest veneuze) trombus. Risicofactoren: immobilisatie, chirurgie, maligniteit, zwangerschap, eerdere DVT. Diagnose via Wells-score + D-dimeer of CT-pulmonalisangiografie.',
      redflag: 'Massieve LE: hemodynamische instabiliteit (BP <90 mmHg of daling >40 mmHg) = levensbedreiging. Directe trombolyse of chirurgische embolectomie — anticoagulatie alleen onvoldoende.',
      mechanisme: [
        { title: 'DVT → LE', desc: 'Diep veneuze trombus (meestal iliofemoraal) losraakt → stroomt via rechterhart naar pulmonaalarteriën → obstructie pulmonaalcirculatie.' },
        { title: 'RV-falen', desc: 'Plotse verhoogde pulmonaalweerstand → RV-drukoverbelasting → RV-dilatatie → septumdissociatie → LV-vulling daalt → cardiac output daalt → hemodynamische collaps bij massieve LE.' },
        { title: 'Pleuritische pijn', desc: 'Perifere LE-occlusie → infarct pleuravlies → pleuritische pijn (scherp, inademen verergert). Centrale LE: meer dyspneu en hemodynamische instabiliteit, minder pleurapijn.' },
      ],
      onderscheid: [
        { label: 'Longembolie', desc: 'Plotse dyspneu + pleuritische pijn + tachycardie + risicofactor (immobilisatie, DVT, chirurgie). D-dimeer + CT-PA of V/Q-scan.', type: 'ok' },
        { label: 'Pneumonie', desc: 'Koorts, productieve hoest, infiltraat op X-thorax, CRP hoog, geleidelijk ontstaan — geen typische risicofactoren voor trombose.', type: 'warn' },
        { label: 'Pneumothorax', desc: 'Plotse dyspneu + eenzijdig verminderd ademgeruis, tympanisch percussiegeluid, geen been-oedeem. X-thorax toont luchtband zonder longpatroon.', type: 'danger' },
        { label: 'Pleuritis', desc: 'Pleuritische pijn met pleurawrijfgeruis, doorgaans na virale infectie — geen DVT-teken.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Zuurstof + veneuze toegang + anticoagulatie onmiddellijk starten (LMWH of UFH).',
        stappen: [
          { naam: 'DOAC eerste keus', detail: 'Rivaroxaban 15 mg 2dd (21 dagen) dan 20 mg 1dd, of apixaban 10 mg 2dd (7 dagen) dan 5 mg 2dd.' },
          { naam: 'Duur antistolling', detail: 'Uitgelokt (tijdelijke risicofactor, bijv. vlucht): 3 maanden. Idiopatisch of recidief: 6 maanden tot levenslang.' },
          { naam: 'Massieve LE', detail: 'Trombolyse (alteplase 100 mg/2u) bij hemodynamische instabiliteit — absolute bloedingscontra-indicaties uitsluiten.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Een normaal D-dimeer bij een patiënt met hoge klinische kans op longembolie sluit longembolie uit.',
    c:false, ex:'NIET WAAR. D-dimeer is alleen bruikbaar bij lage klinische kans (Wells ≤4). Bij hoge klinische kans altijd CT-angiografie, ongeacht D-dimeer. Een negatief D-dimeer bij hoge kans kan vals-negatief zijn.',
    wiki: {
      kern: 'D-dimeer is een uitsluitingstest, geen bevestigingstest. Waarde alleen bij lage pre-testkans (Wells ≤4). Sensitiviteit >99% maar specificiteit slechts ~40% — bij hoge klinische kans zijn de meeste positieve D-dimeren ook écht longembolieën, en een negatief D-dimeer is niet betrouwbaar genoeg.',
      redflag: 'Fout: "D-dimeer is normaal dus geen LE." Bij hoge klinische waarschijnlijkheid kan een normaal D-dimeer een vals-negatief resultaat geven — altijd CT-PA bij hoge klinische kans, ongeacht D-dimeer.',
      mechanisme: [
        { title: 'D-dimeer: wat het is', desc: 'Afbraakproduct van gekruislinkt fibrine. Verhoogd bij actieve trombose maar ook bij infectie, trauma, zwangerschap, postoperatief, maligniteit, hoge leeftijd → lage specificiteit.' },
        { title: 'Sensitiviteit vs specificiteit', desc: 'Sens >99%: vrijwel alle LE-patiënten hebben verhoogd D-dimeer. Spec ~40%: veel vals-positieven, dus alleen bruikbaar voor uitsluiting bij laag risico (NPV hoog, PPV laag).' },
        { title: 'Bayesiaanse redenering', desc: 'Bij hoge pre-testkans is de post-test kans op LE na negatief D-dimeer nog steeds te hoog om LE uit te sluiten — directe beeldvorming is de enige veilige optie.' },
      ],
      onderscheid: [
        { label: 'D-dimeer bij hoge klinische kans: NIET bruikbaar', desc: 'Wells >4 of hoge klinische verdenking → direct CT-PA, D-dimeer testen voegt niets toe en kan misleiden.', type: 'ok' },
        { label: 'D-dimeer bij lage klinische kans (Wells ≤4)', desc: 'Negatief D-dimeer (<500 µg/L ELISA) + lage klinische kans = LE veilig uitgesloten. Geen beeldvorming nodig.', type: 'warn' },
        { label: 'Leeftijdsafhankelijke afkap', desc: 'YEARS-algoritme: bij patiënten >50 jaar hogere afkap (leeftijd × 10 µg/L) → minder onnodige CT-scans.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Bij hoge klinische kans: anticoagulatie starten terwijl CT-PA wordt aangevraagd.',
        stappen: [
          { naam: 'CT-PA', detail: 'Gouden standaard voor LE-diagnose — sensitiviteit 95-98% voor subsegmentale en grotere emboli.' },
          { naam: 'V/Q-scan', detail: 'Alternatief bij contrastallergie of nierfalen — normaal V/Q-scan sluit LE uit.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Patiënt na grote operatie: bloeddruk 75/50, hartfrequentie 120, koude extremiteiten, oligurie. Diagnose?',
    a:['Septische shock','Cardiogene shock','Hypovolemische shock','Neurogene shock'], c:1,
    ex:'Cardiogene shock: lage cardiac output → koude, klamme extremiteiten + oligurie + lage RR. Onderscheid van septische shock: septisch heeft wárme extremiteiten (vasodilatatie), cardiogeen heeft kóude (vasoconstrictie). Behandeling: dobutamine (inotroop) + noradrenaline, overweeg IABP/Impella.',
    wiki: {
      kern: 'Cardiogene shock: inadequate cardiac output door primair hartfalen (STEMI, acute MR, myocarditis) → lage perfusie perifeer + longoedeem. Kenmerk: koude, klamme extremiteiten (vasoconstrictie) + verhoogde CVD/longoedeem — dit onderscheidt het van septische shock.',
      redflag: 'Cardiogene shock mortaliteit 40-60% zonder behandeling. Herkennen = overlevingskans: STEMI + cardiogene shock → directe PCI. Mechanische complicaties (VSD, papillairruptuur) → spoedingreep chirurgie.',
      mechanisme: [
        { title: 'Primair pompfalen', desc: 'LV-contractiliteit daalt (infarct, myocarditis, decompensatio cordis) → lage slagvolumen → cardiac output daalt → systemische perfusie verminderd.' },
        { title: 'Compensatoire vasoconstrictie', desc: 'Sympathicusactivatie → perifere vasoconstrictie → koude, klamme extremiteiten. In tegenstelling tot septische shock (vasodilatatie → warme extremiteiten).' },
        { title: 'Longoedeem', desc: 'Lage cardiac output → backup van bloed in de pulmonaalcirculatie → verhoogde pulmonaalwiggedruk → longoedeem. Combinatie van lage output + longoedeem = cardiogene shock.' },
      ],
      onderscheid: [
        { label: 'Cardiogene shock', desc: 'Koude, klamme extremiteiten + longoedeem + crepitaties + verhoogde CVD. Lage cardiac output. Troponine hoog bij STEMI-oorzaak.', type: 'ok' },
        { label: 'Septische shock', desc: 'Warme, rode extremiteiten (distributieve shock), koorts, infectiebron, lage SVR. Hoog cardiac output vroeg in sepsis.', type: 'warn' },
        { label: 'Hypovolemische shock', desc: 'Koude extremiteiten maar lage CVD (niet verhoogd), geen longoedeem — bloedverlies/dehydratie als oorzaak.', type: 'danger' },
        { label: 'Obstructieve shock (tamponnade/massieve LE)', desc: 'Gelijkend op cardiogeen maar oorzaak mechanisch — pericardiocentese/trombolyse, niet inotropica.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Zuurstof + IV-toegang + oorzaak behandelen (PCI bij STEMI).',
        stappen: [
          { naam: 'Noradrenaline', detail: 'Vasopressor als eerstekeus bij cardiogene shock — target MAP ≥65 mmHg.' },
          { naam: 'Dobutamine', detail: 'Inotropicum toevoegen bij persisterende lage cardiac output ondanks vasopressor.' },
          { naam: 'Mechanische circulatiebewegingsondersteuning', detail: 'IABP (intra-aortale ballonpomp) of Impella bij refractaire cardiogene shock als bridge-to-recovery of bridge-to-transplant.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 65j na inferieur MI: holosystolisch geruis aan de apex, uitstralend naar de oksel, nieuw ontstaan. Diagnose?',
    a:['Aortastenose','Mitralisinsufficiëntie door papillairspierruptuur','Ventrikel­septumruptuur','Pericardwrijfgeruis'], c:1,
    ex:'Acuute mitralisinsufficiëntie na MI: papillairspier­ruptuur → holosystolisch geruis → acute pulmonale stuwing. Medische noodtoestand. Onderscheid van VSD: bij VSD is het geruis ook holosystolisch maar parasternaal, met een thrill.',
    wiki: {
      kern: 'Acute mitralisinsufficiëntie door papillairspierruptuur is een mechanische complicatie van MI (met name inferieur MI = RCA-occlusie voedt de posteromediaal papillairspier). Plotse regurgitatie van bloed naar het LA → acute pulmonale stuwing → longoedeem. Medische spoed: chirurgische klepvervanging.',
      redflag: 'Nieuwe holosystolisch geruis na MI = mechanische complicatie tot bewezen tegendeel. Echo is de sleuteldiagnostiek. Cardiochirurgie diezelfde dag — mortaliteit zonder chirurgie >70% binnen 24u.',
      mechanisme: [
        { title: 'Papillairspierruptuur', desc: 'Inferieur MI → ischemie/necrose posteromediaal papillairspier (slechts één bloedtoevoer: RCA) → ruptuur (dag 1-5) → mitraalblad valt weg → acute regurgitatie groot volume naar LA.' },
        { title: 'Acuut longoedeem', desc: 'LA is niet vergroot en niet aangepast aan plotse volume-overload → LA-druk stijgt snel → backward failure → pulmonale oedeem. Geen compensatoir dilatatie (anders dan chronische MR).' },
        { title: 'Onderscheid VSD', desc: 'VSD is ook een mechanische complicatie na MI — geruis holosystolisch maar aan de linker sternumrand (niet apex) + thrill + rechts-naar-links shunting (rechter catheter: stap-up O₂-saturatie in RV).' },
      ],
      onderscheid: [
        { label: 'Acuute MR (papillairruptuur)', desc: 'Holosystolisch geruis apex, uitstraling oksel, plotse pulmonale stuwing na MI. Echo: flail mitral leaflet, eccentrische regurgitatiestroom.', type: 'ok' },
        { label: 'Ventrikelseptumruptuur (VSD)', desc: 'Holosystolisch geruis links parasteernaal + thrill, links-rechts shunting — PA-catheter: O₂-stap-up in RV. Meestal anterieur MI (LAD-occlusie).', type: 'warn' },
        { label: 'Pericardwrijfgeruis', desc: 'Kratend geruis, trifasisch (systolisch + diastolisch), in meerdere houdingen hoorbaar — geen regurgitatiestroom op echo.', type: 'danger' },
      ],
      therapie: {
        urgent: 'IABP als bridge + spoed echocardiografie + cardiochirurgie consult.',
        stappen: [
          { naam: 'Nitroprusside', detail: 'Afterloadreductie — verlaagt regurgitatiefrActie, verbetering forward output terwijl spoed-chirurgie geregeld wordt.' },
          { naam: 'Chirurgische klepvervanging', detail: 'Gouden standaard: klepvervanging (doorgaans mechanische klep) of klepreparatie. Mortaliteit spoed-chirurgie 20-30%, maar overleving zonder chirurgie bijna 0%.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Nitraten (bijv. nitroglycerine) zijn absoluut gecontraïndiceerd bij gebruik van sildenafil (Viagra).',
    c:true, ex:'WAAR. Beide middelen verwijden bloedvaten via cGMP. Combinatie → ernstige, levensbedreigende bloeddrukdaling. Wacht minimaal 24 uur na sildenafil (48u na tadalafil) voor nitraten. Vraag hier altijd naar bij een patiënt met pijn op de borst.',
    wiki: {
      kern: 'Nitraten (NO-donors) en PDE5-remmers (sildenafil, tadalafil, vardenafil) werken beide via het cGMP-systeem om glad spierweefsel te ontspannen → gecombineerd gebruik veroorzaakt een synergistische, ernstige bloeddrukdaling → cardiovasculaire collaps. Absolute contra-indicatie.',
      redflag: 'Vraag ALTIJD naar gebruik van PDE5-remmers bij pijn op de borst. Sildenafil 24u vóór nitraten is een contra-indicatie. Tadalafil (langere halfwaardetijd): 48u wachttijd. Combinatie kan fataal zijn.',
      mechanisme: [
        { title: 'Nitraten: NO → cGMP', desc: 'Nitroglycerine wordt omgezet naar NO → activeert guanylaat cyclase → cGMP stijgt → proteïnekinase G activeert → myosine depHosforylatase → gladde spier relaxatie → vasodilatatie (vnl. veneus).' },
        { title: 'Sildenafil: PDE5-remming', desc: 'PDE5 breekt normaal cGMP af. Sildenafil remt PDE5 → cGMP stapelt op → verlengde gladde spierrelaxatie. Gecombineerd met nitraten: dubbele cGMP-verhoging → massieve vasodilatatie → ernstige hypotensie.' },
        { title: 'Halfwaardetijden', desc: 'Sildenafil: ~4u (klinisch 24u aanhouden). Vardenafil: ~5u (24u aanhouden). Tadalafil: ~18u (48u aanhouden vanwege langere werkingsduur).' },
      ],
      onderscheid: [
        { label: 'Nitraten + PDE5-remmer: absolute contra-indicatie', desc: 'Ernstige levensbedreigende hypotensie. Geen uitzonderingen. Wachttijden: sildenafil 24u, tadalafil 48u na laatste dosis.', type: 'ok' },
        { label: 'Nitraten + alcohol', desc: 'Relatieve contra-indicatie — ook verhoogd hypotensierisico, maar niet absoluut.', type: 'warn' },
        { label: 'Nitraten bij RV-infarct', desc: 'Absolute contra-indicatie — afhankelijk van preload voor cardiac output. Nitraten → preloadreductie → ernstige hypotensie bij RV-infarct.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Nitroglycerine alleen geven als PDE5-gebruik in laatste 24-48u is uitgesloten.',
        stappen: [
          { naam: 'Anamnese bij SEH', detail: 'Bij pijn op de borst altijd vragen naar sildenafil/tadalafil. Geen nitraten geven zonder zekerheid over PDE5-remmer-gebruik.' },
          { naam: 'Nitraat-indicaties', detail: 'Angina pectoris (spray sublinguaal), acuut coronair syndroom (IV), longoedeem/hartfalen (verlagend afterload/preload). Contra-indicaties: PDE5-remmers, RV-infarct, ernstige hypotensie.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 58j na doorgemaakte longembolie: wordt behandeld met apixaban. Na hoeveel maanden mag je stoppen bij een eerste uitgelokte embolie (bijv. na operatie)?',
    a:['1 maand','3 maanden','6 maanden','Levenslang'], c:1,
    ex:'Eerste uitgelokte longembolie (tijdelijke risicofactor zoals operatie of gips): 3 maanden antistolling volstaat. Bij idiopatische embolie of recidief: 6 maanden tot levenslang afhankelijk van risicoprofiel.',
    wiki: {
      kern: 'Duur anticoagulatie na longembolie hangt af van of de LE uitgelokt of idiopatisch was. Uitgelokt door tijdelijke factor (operatie, immobilisatie, gips): 3 maanden. Idiopatisch/onuitgelokt of recidief: verlengde behandeling (6 maanden tot levenslang).',
      mechanisme: [
        { title: 'Uitgelokte LE', desc: 'Tijdelijke risicofactor (chirurgie, lange vlucht, gips, zwangerschap) → risico verdwijnt na eliminatie van de trigger → 3 maanden antistolling voldoende om het vroege recidiefrisico te overbruggen.' },
        { title: 'Idiopatische LE', desc: 'Geen duidelijke tijdelijke trigger → onderliggend hypercoagulabiliteitsprobleem (trombofilie, maligniteit, antifosfolipiden syndroom) → jaarlijks recidiefrisico 5-10% → verlengde of levenslange anticoagulatie.' },
        { title: 'Maligniteit-geassocieerde LE', desc: 'Kanker verhoogt LE-risico ~4-7×. LMWH of DOAC (rivaroxaban, apixaban) — duur: zolang maligniteit actief is of behandeld wordt.' },
      ],
      onderscheid: [
        { label: 'Uitgelokte LE (eerste): 3 maanden', desc: 'Tijdelijke risicofactor is verdwenen (operatie genezen, gips af). Recidiefrisico na stoppen laag. 3 maanden DOAC.', type: 'ok' },
        { label: 'Idiopatische/unprovoked LE: ≥6 maanden', desc: 'Geen tijdelijke trigger → verhoogd recidiefrisico → verlengde anticoagulatie overwegen. Bloedingsrisico vs tromboserisico afwegen.', type: 'warn' },
        { label: 'Recidief LE of DVT: levenslang', desc: 'Recidief trombose ondanks anticoagulatie of na stoppen → levenslange anticoagulatie (DOAC).', type: 'danger' },
      ],
      therapie: {
        urgent: 'DOAC (apixaban of rivaroxaban) als eerstekeus bij hemodynamisch stabiele LE.',
        stappen: [
          { naam: 'Apixaban schema', detail: '10 mg 2dd × 7 dagen, daarna 5 mg 2dd voor de resterende periode.' },
          { naam: 'Stopcriteria', detail: 'Na 3 maanden bij uitgelokte LE: herstel voltooid + risicofactor verdwenen. Controleer op maligniteit bij onverklaarde recidive LE.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Na een hartinfarct verlaagt een statine het risico op een nieuw cardiovasculair event, ook als het LDL al normaal is.',
    c:true, ex:'WAAR. Statines hebben naast LDL-verlaging ook ontstekingsremmende (pleiotrope) effecten op de vaatwand. Richtlijn: elke patiënt na MI krijgt een hoogintensieve statine, ongeacht de uitgangswaarde van LDL.',
    wiki: {
      kern: 'Na een hartinfarct wordt hoogintensieve statinetherapie voor iedereen aanbevolen, ongeacht het uitgangs-LDL. Dit komt door LDL-verlaging (streefwaarde <1,4 mmol/L) én door pleiotrope effecten: plaques stabiliseren, endothelfunctie verbeteren, ontstekingsremming.',
      bigfact: { num: '<1.4', label: 'mmol/L LDL-streefwaarde', sub: 'na myocardinfarct (zeer hoog cardiovasculair risico) — ESC 2021' },
      mechanisme: [
        { title: 'LDL-verlaging', desc: 'Statine blokkeert HMG-CoA-reductase → minder intracellulair cholesterol in lever → meer LDL-receptoren → LDL-opname uit bloed verhoogd → LDL-daling 30-55%.' },
        { title: 'Pleiotrope effecten', desc: 'Naast LDL-verlaging: stabilisatie van de atherosclerotische plaque (dikkere fibreuze cap, minder lipide), ontstekingsremming (CRP ↓), verbetering endotheelfunctie (NO-productie ↑).' },
        { title: 'Klinische evidence', desc: 'HPS, 4S, LIPID-studie: statines verlagen MACE (MI, CVA, cardiovasculair overlijden) na MI met 25-35%. Dit voordeel bestaat ongeacht uitgangs-LDL.' },
      ],
      onderscheid: [
        { label: 'Statine na MI: altijd, ongeacht LDL', desc: 'Hoog-intensief statine (atorvastatine 40-80 mg of rosuvastatine 20-40 mg) bij iedereen na MI. Streefwaarde LDL <1,4 mmol/L en ≥50% reductie.', type: 'ok' },
        { label: 'Toevoegen ezetimib', detail: 'Bij onvoldoende LDL-verlaging op maximale statinedosis — extra 15-20% reductie.' },
        { label: 'PCSK9-remmers', desc: 'Bij LDL >1,4 mmol/L ondanks maximale statine + ezetimib — alirocumab of evolocumab (50-60% extra LDL-verlaging).', type: 'warn' },
      ],
      therapie: {
        urgent: 'Start hoogintensieve statine nog tijdens ziekenhuisopname na MI.',
        stappen: [
          { naam: 'Atorvastatine 40-80 mg', detail: 'Of rosuvastatine 20-40 mg — >50% LDL-verlaging.' },
          { naam: 'Controle LDL na 4-6 weken', detail: 'Target: LDL <1,4 mmol/L. Toevoegen ezetimib 10 mg als doel niet bereikt.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 70j: ECG toont een brede QRS-tachycardie (130/min) zonder duidelijke P-toppen. Meest gevaarlijke diagnose om als eerste uit te sluiten?',
    a:['AVNRT','Sinustachycardie met bundeltakblok','Ventriculaire tachycardie','Atriumflutter met aberrante geleiding'], c:2,
    ex:'Brede QRS-tachycardie = ventriculaire tachycardie (VT) tot het tegendeel bewezen. VT is levensbedreigend. Nooit zomaar adenosine geven bij brede QRS — kan VT verergeren. Bij instabiliteit: directe cardioversie.',
    wiki:{
          kern: "Brede QRS-tachycardie (QRS >120 ms, frequentie >100/min) moet altijd als VT worden behandeld totdat het tegendeel bewezen is. VT = aritmie die uit het ventrikel zelf ontstaat, zonder AV-knoop als pacemaker.",
          mechanisme: [
            { title: "Origine en triggers", desc: "VT ontstaat door re-entry in littekenweefsel (meest bij ischemische HFrEF), triggered activity of abnormale automaticiteit. Electrolytstoornissen (hypokaliëmie, hypomagnesiëmie), ischemie en medicatie (QT-verlenging) zijn uitlokkende factoren." },
            { title: "ECG-criteria voor VT", desc: "Brugada-criteria of Vereckei-criteria helpen VT van SVT-met-aberrantie te onderscheiden: AV-dissociatie (P-golven onafhankelijk van QRS) is pathognomonisch voor VT. Fusion beats en capture beats bevestigen VT." },
            { title: "Gevaar van adenosine bij brede QRS", desc: "Adenosine kan VT omzetten in VF — nooit geven bij brede QRS-tachycardie zonder zekerheid over SVT. Bij WPW + AF kan adenosine ook levensgevaarlijk zijn." },
          ],
          onderscheid: [
            { label: 'Ventriculaire tachycardie (VT)', desc: 'Brede QRS >120 ms, frequentie 100-250/min, AV-dissociatie (pathognomonisch), fusion beats, Brugada-criteria positief. ALTIJD VT aannemen tot tegendeel bewezen.', type: 'ok' },
            { label: 'SVT met bundeltakblok', desc: 'Ook breed QRS maar P-toppen gekoppeld aan QRS, herstelt met adenosine. Adenosine NIET geven als VT niet uitgesloten!', type: 'warn' },
            { label: 'Pre-excitatie (WPW)', desc: 'Delta-golf + kort PR in sinusritme. AF bij WPW kan razendsnel worden — geen adenosine of verapamil.', type: 'danger' },
            { label: 'Artifakt', desc: 'Geen hemodynamische gevolgen, chaotische baseline buiten het "QRS"-gebied, patiënt voelt niks.', type: 'warn' },
          ],
          therapie: {
            urgent: "Hemodynamisch instabiel: onmiddellijke gesynchroniseerde DC-cardioversie.",
            stappen: [
              { naam: "Stabiel", detail: "amiodaron IV (300 mg bolus) als eerste keuze." },
              { naam: "Sotalol of procainamide", detail: "Alternatieve antiaritmica bij VT — sotalol ook als ICD-profylaxe bij structureel hartlijden." },
              { naam: "ICD-implantatie", detail: "Na overleefde VT/VF (sekundaire preventie): altijd ICD. Primaire preventie: ICD bij HFrEF EF <35% na ≥3 maanden optimale medicamenteuze therapie." },
              { naam: "Behandel onderliggende oorzaak", detail: "ischemie, elektrolytstoornissen (K⁺/Mg²⁺), medicatie." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 50j: ECG toont ST-elevatie in II, III en aVF. Welke coronairarterie is waarschijnlijk afgesloten?',
    a:['Linker voorste dalende tak (LAD)','Rechter coronairarterie (RCA)','Linker circumflexarterie (LCx)','Hoofdstam (LMCA)'], c:1,
    ex:'Inferieur MI (II, III, aVF) = RCA-occlusie in 80% van de gevallen. De RCA voedt ook het rechterventrikel → altijd rechter ECG-afleidingen (V3R/V4R) maken om RV-infarct uit te sluiten.',
    wiki: {
      kern: 'ECG-lokalisatie van STEMI: de aangedane afleidingen vertellen welke coronairarterie afgesloten is. Inferieur (II, III, aVF) = RCA in 80% of LCx in 20%. Anterieur (V1-V4) = LAD. Lateraal (I, aVL, V5-V6) = LCx of diagonaaltak.',
      mnemonic: { word: 'ECG-lokalisatie', items: ['II/III/aVF = Inferieur = RCA (80%) of LCx (20%)', 'V1-V4 = Anterieur = LAD', 'I/aVL/V5-V6 = Lateraal = LCx of diagonaaltak', 'V1-V6 + I/aVL = Extensief anterieur = LAD proximaal of LMCA'] },
      redflag: 'Inferieur STEMI + rechts ECG (V4R): ST-elevatie ≥1 mm = RV-infarct. Belangrijk: geen nitraten of diuretica — RV is preload-afhankelijk. Vloeistofresuscitatie en dobutamine bij RV-shock.',
      mechanisme: [
        { title: 'RCA-voedstoebrenging', desc: 'RCA voedt: inferieure wand LV, onderwand septum, RV-vrije wand, SA-knoop (55%), AV-knoop (90%) → RCA-occlusie kan ook ritmestoornissen (sinusbradycardie, AV-blok) geven.' },
        { title: 'Reciproke depressie', desc: 'ST-elevatie inferieur (II/III/aVF) geeft spiegelbeeldige ST-depressie in I en aVL — dit bevestigt de inferiorlokalisatie en sluit pericarditis uit (diffuse elevatie, geen reciproke depressie).' },
        { title: 'LCx-occlusie', desc: 'Linker circumflexarterie voedt de posterolaterale wand. Occlusie geeft ST-elevatie in V5-V6 + I/aVL (lateraal), soms ook inferieur. ST-depressie V1-V3 kan posterieur MI zijn (mirror image).' },
      ],
      onderscheid: [
        { label: 'Inferieur STEMI (RCA-occlusie)', desc: 'ST-elevatie in II, III, aVF. Reciproke depressie in I en aVL. V4R voor RV-infarct uitsluiten. AV-blok mogelijk (AV-knoop RCA-gevoed).', type: 'ok' },
        { label: 'Anterieur STEMI (LAD)', desc: 'ST-elevatie V1-V4 — grootste risicogebied (laterale wand + septum). Reciproke depressie in II/III/aVF. LV-functie ernstig aangedaan.', type: 'warn' },
        { label: 'Lateraal STEMI (LCx)', desc: 'ST-elevatie I/aVL/V5-V6. ECG soms subtiel — LCx-occlusie is de meest "gemiste" STEMI.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Directe PCI + rechter-ECG (V3R/V4R) afnemen bij alle inferieure STEMI\'s.',
        stappen: [
          { naam: 'RV-infarct protocol', detail: 'Geen nitraten/diuretica. Vloeistofbolus (500 ml NaCl) bij lage bloeddruk. Dobutamine bij persisterende hemodynamische instabiliteit.' },
          { naam: 'AV-blok bewaking', detail: 'Inferieur MI: tijdelijke AV-blok verwacht (reversibel na PCI). Transcutane pacemaker standby bij totaal blok.' },
        ],
      },
    } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Bij een longembolie met hemodynamische instabiliteit is systemische trombolyse de behandeling van keuze.',
    c:true, ex:'WAAR. Massieve longembolie met shock of hartstilstand: trombolyse (alteplase) of chirurgische embolectomie. Bij stabiele patiënten: anticoagulatie (LMWH of DOAC). Trombolyse bij stabiele patiënten geeft te veel bloedingsrisico.',
    wiki: {
      kern: 'Massieve longembolie (hemodynamische instabiliteit: systolische BP <90 mmHg of shock) vereist reperfusietherapie: systemische trombolyse (alteplase) of chirurgische embolectomie. Antistolling alleen is onvoldoende bij massieve LE.',
      redflag: 'Absolute contra-indicaties trombolyse bij LE: eerdere intracraniale bloeding, recente hersenchirurgie (<3 maanden), recent CVA (<3 maanden), actieve ernstige bloeding. Bij LE + hartstilstand: trombolyse geven ondanks CPR (geen contra-indicatie).',
      mechanisme: [
        { title: 'Massieve LE → RV-falen', desc: 'Grote trombus occludeert centrale pulmonaalarterie → plotse RV-afterloadstijging → RV-dilatatie → septumdevie naar LV → LV-output daalt → cardiogene shock → overlijden zonder behandeling.' },
        { title: 'Trombolyse-mechanisme', desc: 'Alteplase (rt-PA) activeert plasminogeen → plasmine → fibrinedegradatie → snelle vermindering pulmonaalweerstand → RV-druk daalt → hemodynamisch herstel binnen minuten tot uren.' },
        { title: 'Submassieve LE', desc: 'Hemodynamisch stabiel maar RV-dysfunctie op echo of verhoogd BNP/troponine — de rol van trombolyse is controversieel (PEITHO-studie: minder hemodynamische decompensatie maar meer intracraniale bloedingen).' },
      ],
      onderscheid: [
        { label: 'Massieve LE: trombolyse', desc: 'Hemodynamische instabiliteit (BP <90 mmHg) of hartstilstand. Alteplase 100 mg/2u (of 0,6 mg/kg bolus bij CPR). Direct na diagnose.', type: 'ok' },
        { label: 'Submassieve LE (RV-dysfunctie, hemodynamisch stabiel)', desc: 'Anticoagulatie + bewaking IC. Trombolyse overwegen alleen bij klinische verslechtering ondanks anticoagulatie.', type: 'warn' },
        { label: 'Stabiele LE', desc: 'DOAC (apixaban of rivaroxaban) als eerstekeus — ambulant behandelen mogelijk bij laag-risico patiënten (HESTIA/PESI-score).', type: 'danger' },
      ],
      therapie: {
        urgent: 'Alteplase 100 mg IV over 2 uur bij massieve LE — anticoagulatie pauzeren tijdens en 24u na trombolyse.',
        stappen: [
          { naam: 'Chirurgische embolectomie', detail: 'Alternatief bij absolute contra-indicatie trombolyse of refractaire shock na lyse.' },
          { naam: 'Percutane katheter-gerichte therapie', detail: 'Katheter-gerichte lokale trombolyse of aspiratietechniek bij submassieve LE — minder systemisch bloedingsrisico.' },
        ],
      },
    } },

  // ── DIFFERENTIAALDIAGNOSTIEK ──

  { type:'diagnose', d:5, domain:'cardio', dl:'Cardiologie', subtype:'diff',
    q:'Man 60j: hevige thoraxpijn bij binnenkomst.\nUitstraling naar rug/interscapulair\nBloeddrukasymmetrie 28 mmHg\nECG normaal, troponine borderline\nACS of aortadissectie — wat pleit voor dissectie?',
    a:['ST-elevatie met reciproke afwijkingen','Scheurende pijn + bloeddrukasymmetrie + normaal ECG','Troponine sterk verhoogd','Uitstraling naar linkerarm + zweten'],
    c:1, ex:'Aortadissectie: plotse maximale pijn, scheurend karakter, uitstraling interscapulair, bloeddrukasymmetrie >20 mmHg, normaal ECG en troponine. ACS: drukkende pijn, uitstraling arm/kaak, ST-veranderingen, troponine verhoogd. Bloeddrukasymmetrie + normaal ECG = dissectie tot tegendeel bewezen.',
    wiki: {
      kern: 'Aortadissectie vs ACS: twee levensbedreigende oorzaken van acute thoraxpijn. Het onderscheid is cruciaal — trombolyse bij ACS kan fataal zijn bij niet-gediagnosticeerde aortadissectie. Scheurend karakter + maximale pijn bij aanvang + bloeddrukasymmetrie = dissectie tot bewezen anders.',
      redflag: 'Trombolyse bij niet-gediagnosticeerde aortadissectie = fataal. Altijd bewust van de mogelijkheid van dissectie vóór het starten van antistolling of lyse. ADD-RS (Aortic Dissection Detection Risk Score) helpt de klinische verdenking te kwantificeren.',
      mechanisme: [
        { title: 'Aortadissectie: intima-scheur', desc: 'Scheur in de intima van de aortawand → bloed baant zich een vals lumen → propagatie proximaal en/of distaal → afsluiting van aftakkende arteriën → ischemie (coronair, renaal, mesenterisch, spinaal).' },
        { title: 'Bloeddrukasymmetrie', desc: 'Dissectievlap dicht de A. subclavia of A. axillaris af aan één zijde → bloeddruk arm-asymmetrie >20 mmHg. Tegelijk: neurologische uitval (spinale ischemie), nierinsufficientie (renale ischemie).' },
        { title: 'ACS: plaque-ruptuur', desc: 'Atherosclerotische plaque scheurt → trombus → myocardischemie → troponine stijgt → ST-veranderingen. Pijn drukkend, uitstraling arm/kaak/schouder, beter op nitraten.' },
      ],
      onderscheid: [
        { label: 'Aortadissectie (type A of B)', desc: 'Scheurende/scheurende maximale pijn bij aanvang, uitstraling interscapulair, bloeddrukasymmetrie >20 mmHg, normaal/minimaal afwijkend ECG en troponine.', type: 'ok' },
        { label: 'ACS (STEMI/NSTEMI)', desc: 'Drukkende, samenknijpende pijn, uitstraling arm/kaak, zweten, troponine verhoogd, ST-veranderingen op ECG, symptomen beter op nitraten.', type: 'warn' },
        { label: 'Longembolie', desc: 'Pleuritische pijn, tachycardie, dyspneu, risicofactor DVT — D-dimeer verhoogd. Normaal troponine tenzij RV-overbelasting.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Type A-dissectie: spoedingreep chirurgie (binnen uren). Type B: bloeddrukcontrole (labetalol IV, target SBP <120 mmHg).',
        stappen: [
          { naam: 'CT-angiografie aorta', detail: 'Gouden standaard voor aortadissectie — met contrast, borst-buik-bekken.' },
          { naam: 'Geen antistolling', detail: 'Bij verdenking dissectie: geen aspirine/heparine tot dissectie uitgesloten — dit kan het vals lumen vergroten.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie', subtype:'diff',
    q:'Vrouw 72j: acuut dyspneu, orthopneu, bilateraal crepitaties basaal, enkelloedeem. Hartfalen of COPD-exacerbatie — welk kenmerk is het meest specifiek voor hartfalen?',
    a:['Verlengd expirium met diffuus piepen','Verhoogde CVD + S3-gallopritme','Hyperinflatie op X-thorax','Piekstroom verminderd'],
    c:1, ex:'Hartfalen: verhoogde CVD (jugulaire stuwing), S3-gallopritme, basale crepitaties, orthopneu, snel verbeterend op diuretica. COPD: verlengd expirium, piepen, hyperinflatie, lage piekstroom. S3 + verhoogde CVD is vrijwel pathognomonisch voor decompensatio cordis.',
    wiki: {
      kern: 'Hartfalen vs COPD: beide geven dyspneu maar via totaal andere mechanismen. Veneuze stuwing (verhoogde CVD, hepatomegalie, oedeem) en gallopritme (S3) zijn vrijwel pathognomonisch voor decompensatio cordis. BNP is een krachtige biomarker om het onderscheid te maken.',
      mechanisme: [
        { title: 'Hartfalen: backward failure', desc: 'Verminderde LV-output → backward failure → pulmonaalstuwing → crepitaties, orthopneu, en bij RV-falen: verhoogde CVD, hepatomegalie, perifeer oedeem.' },
        { title: 'S3-gallopritme', desc: 'Vroeg-diastolisch geluid door plotse deceleratie van bloed bij de snel-gevulde, stijve LV-wand. Vrijwel pathognomonisch voor verhoogde LV-vullingsdruk (HFrEF of HFpEF).' },
        { title: 'COPD: obstructief mechanisme', desc: 'Luchtwegobstructie → verlengde expiratie, luchtval → hyperinflatie (barrel chest, hyperinflatie X-thorax). Geen veneuze stuwing (tenzij cor pulmonale bij eindstadium COPD).' },
      ],
      onderscheid: [
        { label: 'Decompensatio cordis', desc: 'Verhoogde CVD + S3-gallopritme + orthopneu + snel verbeterend op furosemide. BNP/NT-proBNP verhoogd. Echo: verlaagde EF of verhoogde vullingsdrukken.', type: 'ok' },
        { label: 'COPD-exacerbatie', desc: 'Verlengd expirium + diffuus piepen + hyperinflatie op X-thorax + piekstroom verlaagd. Verhoogde CRP. Verbeterend op bronchodilatatie.', type: 'warn' },
        { label: 'Overlap (cor pulmonale bij COPD)', desc: 'Chronisch obstructief longlijden + rechterhartfalen → verhoogde CVD + oedeem. BNP matig verhoogd. Echo: RV-dilatatie, normale LV-functie.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Decompensatio cordis: furosemide IV 40-80 mg + zuurstof + semi-zittende houding.',
        stappen: [
          { naam: 'BNP/NT-proBNP', detail: 'Bij twijfel: normaal BNP (<35 pg/mL of NT-proBNP <125 pg/mL) maakt hartfalen onwaarschijnlijk — overweeg COPD als diagnose.' },
          { naam: 'Echocardiografie', detail: 'Bepaalt EF, vullingsdrukken, klepgebrek — essentieel voor diagnose en behandelgeleiding.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie', subtype:'diff',
    q:'Jongeman 25j: pleuritische precordiale pijn, erger bij liggen, beter bij vooroverbuigen. ECG: diffuse concave ST-elevatie, PR-depressie. Pericarditis of ACS?',
    a:['ACS: focale ST-elevatie in twee afleidingen, troponine sterk verhoogd','Pericarditis: diffuse concave ST-elevatie + PR-depressie + houdingsafhankelijke pijn','Myocarditis: diffuus + jonge patient','Aortadissectie: scheurende pijn naar rug'],
    c:1, ex:'Pericarditis: diffuse concave ST-elevatie, PR-depressie (pathognomonisch), pijn beter bij vooroverbuigen/erger bij liggen, vaak na virale infectie. ACS: focale ST-elevatie (twee aangrenzende afleidingen), geen PR-depressie, troponine verhoogd, geen houdingseffect op pijn.',
    wiki: {
      kern: 'Pericarditis vs ACS: het ECG-onderscheid is cruciaal. Pericarditis: diffuse concave ("saddle-shape") ST-elevatie in alle afleidingen + PR-depressie (meest specifieke teken). ACS: focale ST-elevatie (regionale verdeling, aangrenzende afleidingen) + reciproke depressie.',
      redflag: 'Tamponade als complicatie: als pericarditis vocht accumuleert — Beck\'s triade (hypotensie + gestuwd halsvenen + gedempte harttonen). Pericardiocentese noodzakelijk. Constrictieve pericarditis = late complicatie (Kussmaul-teken, pericardknop op echo).',
      mechanisme: [
        { title: 'PR-depressie: pathognomonisch', desc: 'Ontsteking van het pericard treft ook de atriale wand → abnormale atriale repolarisatie → PR-depressie (vrijwel alleen bij pericarditis gezien). Beter zichtbaar in II en aVF.' },
        { title: 'Diffuse ST-elevatie', desc: 'In tegenstelling tot ACS (regionale verdeling): pericardontsteking is diffuus → ST-elevatie in vrijwel alle afleidingen behalve aVR (ST-depressie in aVR). Concaaf (spelvormig) vs convex (koepelvormig) bij STEMI.' },
        { title: 'Houdingsafhankelijke pijn', desc: 'Ontsteking maakt pericard ruw → wrijfgeruis. Vooroverbuigen: hart beweegt van het pericard af → minder wrijving → minder pijn. Platliggen: meer druk pericard → meer pijn.' },
      ],
      onderscheid: [
        { label: 'Pericarditis', desc: 'Diffuse concave ST-elevatie + PR-depressie + houdingsafhankelijke pijn (beter voorovergebogen) + pericardiaal wrijfgeruis. Troponine licht verhoogd (myopericarditis) mogelijk.', type: 'ok' },
        { label: 'STEMI', desc: 'Focale ST-elevatie (regionale afleidingen) + reciproke depressies + troponine sterk verhoogd. Pijn drukkend, uitstraling arm, niet houdingsafhankelijk.', type: 'warn' },
        { label: 'Myocarditis', desc: 'Diffuus + jonge patiënt + post-viraal. Troponine significant verhoogd. ST-elevaties mogelijk maar irregulairder patroon. MRI hart = gouden standaard.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Ibuprofen 600 mg 3dd + colchicine 0,5 mg 2dd — 3 maanden voor recidiefpreventie.',
        stappen: [
          { naam: 'Rust', detail: 'Geen sport tot klachtenvrij + normalisatie CRP + troponine — bij myopericarditis minimaal 3-6 maanden.' },
          { naam: 'Corticosteroïden', detail: 'Alleen bij recidiverende pericarditis of specifieke oorzaken (auto-immuun) — niet bij eerste episode (verhoogt recidiefrisico).' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie', subtype:'diff',
    q:'Man 68j: tremor van rechterhand in rust, verbetert bij bewegen, kleine handschrift. Parkinson of essentiële tremor — wat past bij Parkinson?',
    a:['Bilaterale houdingstremor, verbetert met alcohol','Rusttremor + bradykinesie + hypomimie + micrografie','Intentietremor + dysartrie + nystagmus','Tremor alleen bij emotionele stress'],
    c:1, ex:'Parkinson: rusttremor (pill-rolling, 4-6 Hz), bradykinesie, rigiditeit, houdingsinstabiliteit, hypomimie, micrografie. Essentiële tremor: houdingstremor/actietremor, bilateraal, verbetert met alcohol, geen bradykinesie/rigiditeit. Rusttremor die verbetert bij bewegen is kenmerkend voor Parkinson.',
    wiki: {
      kern: 'Het centrale onderscheid: Parkinson heeft rusttremor die verbetert bij beweging. Essentiële tremor is een houdingstremor die juist verschijnt bij beweging/houden. Bradykinesie + rigiditeit zijn exclusief voor Parkinson.',
      redflag: 'Parkinson-plus (MSA, PSP): symmetrisch begin + vroeg vallen + slechte levodopa-respons = slecht prognostisch teken. Vraag altijd naar autonome klachten en vroeg vallen.',
      mechanisme: [
        { title: 'Parkinson: rusttremor', desc: 'Dopaminetekort in basale ganglia → abnormale oscillaties in thalamus → tremor zichtbaar in rust (4-6 Hz, "pill-rolling"), verdwijnt bij intentionele beweging.' },
        { title: 'Essentiële tremor: actietremor', desc: 'Abnormale oscillaties in olivo-cerebellaire circuits → tremor bij houden (posturaal) en bewegen, niet in rust. Bilateraal, handen en hoofd.' },
        { title: 'Bradykinesie', desc: 'Kenmerkend voor Parkinson: vertraging van bewegingsinitiatief en -snelheid. Micrografie (klein schrift) is vroeg teken.' },
      ],
      onderscheid: [
        { label: 'Parkinson', desc: 'Rusttremor, asymmetrisch, bradykinesie, rigiditeit, hypomimie, micrografie. Geen intentietremor.', type: 'ok' },
        { label: 'Essentiële tremor', desc: 'Houdingstremor/actietremor, bilateraal, verbetert met alcohol, geen bradykinesie/rigiditeit. Familiair.', type: 'warn' },
        { label: 'Cerebellaire tremor', desc: 'Intentietremor (erger bij doel benaderen), dysartrie, nystagmus, ataxie. Hersenstam-/cerebellum-laesie.', type: 'warn' },
        { label: 'Parkinson-plus (MSA/PSP)', desc: 'Parkinsonisme + autonome uitval (MSA) of vroeg vallen achterover/oogbewegingsstoornissen (PSP). Slechte levodopa-respons.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Geen acute interventie — levodopa als diagnostische/therapeutische test bij verdenking Parkinson.',
        stappen: [
          { naam: 'Levodopa-test', detail: 'Goede respons op levodopa bevestigt Parkinson. Parkinson-plus: meestal matige of geen respons.' },
          { naam: 'Essentiële tremor', detail: 'Propranolol 40-320 mg/dag of primidon 50-750 mg/dag. Alcohol verbetering diagnostisch maar geen behandeling.' },
          { naam: 'DBS', detail: 'Diepe hersenstimulatie subthalame kern bij invaliderende Parkinson-tremor na medicamenteuze optimalisatie.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie', subtype:'diff',
    q:'Vrouw 34j: 30 min visueel flikkerend scotoom, daarna bonzende hemikranie en misselijkheid. TIA of migraine met aura — wat pleit voor migraine?',
    a:['Plotse maximale pijn gelijktijdig met aura','Geleidelijk uitbreidende aura >5 min, gevolgd door typische hoofdpijn','Motorische uitval, leeftijd >60j, hypertensie','Aura duurt >60 min zonder naderende hoofdpijn'],
    c:1, ex:'Migraine met aura: aura breidt geleidelijk uit (cortical spreading depression), duurt 20-60 min, gevolgd door ipsilaterale hoofdpijn. TIA: plotse uitval zonder verspreiding, geen nakomende hoofdpijn, risicofactoren voor vaatlijden. Gradual march + volgende hoofdpijn = migraine.',
    wiki: {
      kern: 'Migraine-aura breidt geleidelijk uit (de "march") over 20-60 minuten door cortical spreading depression — TIA geeft plotse, maximale uitval zonder progressie. De nakomende hoofdpijn na aura is kenmerkend voor migraine.',
      redflag: 'TIA uitsluiten is verplicht bij: aura >60 min, motorische uitval, leeftijd >50j, cardiovasculaire risicofactoren, of atypisch patroon. Bij twijfel: behandel als TIA.',
      mechanisme: [
        { title: 'Cortical spreading depression (migraine)', desc: 'Golf van depolarisatie verspreidt zich langzaam (3 mm/min) over occipitale cortex → "marcherende" scotomen die zich geleidelijk uitbreiden.' },
        { title: 'TIA: plotse embolie/trombus', desc: 'Plotse occlusie → maximale uitval direct vanaf het begin, geen graduele march. Resolveert volledig <24u.' },
        { title: 'Tijdsduur aura', desc: 'Migraine-aura: typisch 20-60 min. Korter (<5 min) of langer (>60 min) = atypisch, TIA overwegen.' },
      ],
      onderscheid: [
        { label: 'Migraine met aura', desc: 'Aura breidt geleidelijk uit, 20-60 min, gevolgd door hoofdpijn. Jong, vrouw, geen vaatrisicofactoren. Eerder identieke episodes.', type: 'ok' },
        { label: 'TIA', desc: 'Plotse maximale uitval (seconden), geen march, geen nakomende hoofdpijn, ouder, vaatrisicofactoren. Altijd uitsluiten.', type: 'danger' },
        { label: 'Retinale migraine', desc: 'Monoculaire visusdaling (tijdelijk), niet binocilair. Verhoogd CVA-risico — triptanen gecontraïndiceerd.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Bij TIA-verdenking: direct naar SEH, aspirine 300 mg, beeldvorming.',
        stappen: [
          { naam: 'Migraine met aura', detail: 'Aanvalsbehandeling: triptan + NSAID. Profylaxe bij frequent: propranolol of topiramaat.' },
          { naam: 'Anticonceptiepil + aura', detail: 'Migraine met aura + oestrogeen-anticonceptie = verhoogd CVA-risico. Overstap naar progesteron-only of niet-hormonale methode.' },
        ],
      },
    } },

  { type:'diagnose', d:5, domain:'neuro', dl:'Neurologie', subtype:'diff',
    q:'Vrouw 30j: twee episodes neurologische uitval (1x arm, 1x visus), MRI witte-stof periventriculair. MS of NMO — wat onderscheidt MS van NMO?',
    a:['MS: longitudinaal extensieve myelitis >3 wervels','NMO: AQP4-antilichamen negatief','MS: korte MRI-laesies periventriculair, AQP4-negatief','NMO: hetzelfde patroon als MS maar ernstiger'],
    c:2, ex:'MS: periventriculaire/juxtacorticale laesies (kort, <3 wervels myelitis), AQP4-antilichamen negatief, relapsing-remitting. NMO: longitudinale myelitis >3 wervels, area postrema-laesies, AQP4-positief (80%), ernstiger dan MS. Onderscheid is cruciaal: NMO reageert slecht op MS-DMTs.',
    wiki: {
      kern: 'MS en NMO (neuromyelitis optica) lijken klinisch op elkaar maar zijn verschillende ziekten met andere behandeling. Het onderscheid is cruciaal: NMO reageert slecht (of verslechtert) bij MS-medicatie.',
      redflag: 'MS-specifieke medicatie (natalizumab, interferon-bèta, fingolimod) kan NMO verergeren. Altijd AQP4-antilichamen testen vóór ziekte-modulerende therapie te starten.',
      mechanisme: [
        { title: 'MS', desc: 'T-cel gemedieerde demyelinisatie van CZS. Periventriculaire, juxtacorticale en infratentoriële laesies. Myelitis <3 wervellichamen.', },
        { title: 'NMO', desc: 'AQP4-antilichamen (aquaporin-4) beschadigen astrocyten in oogzenuwen en ruggenmerg. Longitudinale myelitis >3 wervels, area postrema-laesies (hikken/braken = pathognomonisch).' },
        { title: 'Behandelconsequentie', desc: 'NMO: rituximab, eculizumab of inebilizumab. Sommige MS-medicijnen zijn gecontraïndiceerd bij NMO.' },
      ],
      onderscheid: [
        { label: 'MS', desc: 'Korte myelitislaesies (<3 wervels), periventriculaire MRI-laesies, AQP4-negatief, relapsing-remitting. Goede respons op MS-DMTs.', type: 'ok' },
        { label: 'NMO (NMOSD)', desc: 'Longitudinale myelitis >3 wervels, AQP4-positief (80%), ernstigere aanvallen, slechte/gevaarlijke respons op MS-DMTs.', type: 'danger' },
        { label: 'MOG-antilichaam-ziekte', desc: 'MOG-IgG positief, AQP4-negatief. Minder ernstig dan NMO. Onderscheid via serologisch panel.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Acute NMO-relaps: hoge-dosis methylprednisolon → plasma-uitwisseling bij onvoldoende respons.',
        stappen: [
          { naam: 'Preventie NMO', detail: 'Rituximab (anti-CD20), eculizumab of inebilizumab — bewezen effectief bij NMO.' },
          { naam: 'Nooit bij NMO', detail: 'Natalizumab, fingolimod, alemtuzumab — gecontraïndiceerd of kunnen NMO verergeren.' },
          { naam: 'Serologisch panel', detail: 'AQP4-IgG + MOG-IgG testen bij elke CZS-demyelinisatieziekte vóór start behandeling.' },
        ],
      },
    } },

  { type:'diagnose', d:5, domain:'infectio', dl:'Infectiologie', subtype:'diff',
    q:'LP-uitslag bij man 45j met koorts en nekstijfheid:\nGlucose 1.8 mmol/L (serum 5.2)\nEiwit 3.8 g/L\n1400 cellen/µL — 85% PMN\nBacterieel of viraal meningitis?',
    a:['Viraal: lymfocytose, glucose normaal, eiwit laag','Bacterieel: PMN-pleocytose + glucose <40% serum + hoog eiwit','TBC: identiek beeld maar chronischer','Schimmel: glucose laag maar lymfocytose'],
    c:1, ex:'Bacterieel: PMN-pleocytose, glucose <40% serum (hier 1.8/5.2=35%), eiwit >1 g/L, troebel vocht. Viraal: lymfocytose, glucose normaal, eiwit licht verhoogd (<1 g/L), helder. TBC: lymfocytose, laag glucose, maar langzamer. Deze uitslag = bacterieel → direct empirische antibiotica (ceftriaxon + dexamethason).' },

  { type:'diagnose', d:5, domain:'infectio', dl:'Infectiologie', subtype:'diff',
    q:'Man 52j: acuut dyspneu + pleuritische pijn, geen koorts, geen sputum. D-dimeer 4.1, HR 118/min. Pneumonie of longembolie — wat wijst op longembolie?',
    a:['Koorts >38.5°C + purulent sputum + unilateraal infiltraat','Pleuritische pijn + tachycardie + hoog D-dimeer + geen infectietekens','Progressieve klachten over 3-5 dagen','Bilaterale infiltraten + verhoogd CRP'],
    c:1, ex:'Longembolie: plotse dyspneu, pleuritische pijn, tachycardie, verhoogd D-dimeer, afwezigheid infectietekens (koorts/sputum). Pneumonie: koorts, productieve hoest, infiltraat, CRP hoog, meer geleidelijk. Geen infectietekens + hoog D-dimeer = hoge Wells-score → CT-PA aangewezen.' },

  { type:'diagnose', d:3, domain:'pharma', dl:'Farmacologie', subtype:'diff',
    q:'T2DM-patient, BMI 31, GFR 72, geen hartfalen. Metformine of sulfonylureum als eerste keus — wat pleit voor metformine?',
    a:['Stimuleert insulinesecretie, snellere glucosedaling','Geen hypoglykemierisico, gewichtsneutraal, aangetoond cardiovasculair voordeel','Werkzaam ook bij GFR <15','Geen gastro-intestinale bijwerkingen'],
    c:1, ex:'Metformine: vermindert hepatische glucoseproductie, geen hypoglykemierisico, gewichtsneutraal/verlagend, UKPDS-cardiovasculair voordeel. Sulfonylureum: insulinesecretiebevorderend → hypoglykemierisico + gewichtstoename. Cave metformine bij GFR <30 (lactaatacidoserisico). NHG: metformine = eerste keus T2DM.' },

  { type:'diagnose', d:3, domain:'pharma', dl:'Farmacologie', subtype:'diff',
    q:'HFrEF-patient krijgt droge hoest van lisinopril (ACE-remmer). Staken en vervangen — ARB of ARNI als eerste stap?',
    a:['ARNI (sacubitril/valsartan) direct als vervanging','ARB (bijv. valsartan) als ACE-remmervervanger — geen hoest, bewezen effectiviteit','Bètablokker verhogen en ACE-remmer stoppen','Digoxine toevoegen bij persisterende klachten'],
    c:1, ex:'ACE-remmerhoest = bradykinine-effect. ARB blokkeert AT1-receptor zonder bradykinine-verhoging → geen hoest. Bewezen als ACE-remmervervanger bij HFrEF (CHARM-Alternative: candesartan). ARNI (sacubitril/valsartan) is volgende stap voor verdere mortaliteitsreductie bij nog optimaliseerbare patient.' },

  { type:'diagnose', d:5, domain:'lab', dl:'Laboratorium', subtype:'diff',
    q:'Acuut nierfalen, creatinine gestegen:\nUrine-Na 7 mmol/L\nUrine-osmolaliteit 680 mosm/kg\nFractionele Na-excretie 0.6%\nPrerenaal of renaal (ATN)?',
    a:['Renaal (ATN): tubulus kan Na niet reabsorberen, FeNa >2%','Prerenaal: intact tubulus, maximale Na-reabsorptie en urineconcentratie','Postrenaal: hydronefrose + verhoogde blaasdruk','ATN: Urine-Na >40, isostenurie (osmolaliteit ~300)'],
    c:1, ex:'Prerenaal: intact tubulus → maximale Na-reabsorptie (Urine-Na <20, FeNa <1%) en urineconcentratie (osmolaliteit >500). ATN (renaal): tubulaire schade → Urine-Na >40, FeNa >2%, osmolaliteit ~300, granulaircilinders. FeNa 0.6% + osmolaliteit 680 = prerenaal → vochtresuscitatie.' },

  { type:'diagnose', d:5, domain:'lab', dl:'Laboratorium', subtype:'diff',
    q:'Microcytaire anemie, MCV 70 fL:\nFerritine 165 µg/L\nTransferrinesaturatie 9%\nTIBC laag\nIJzergebreksanemie of anemie van chronische ziekte (ACD)?',
    a:['IJzergebrek: ferritine altijd laag, TIBC hoog','ACD: ferritine normaal/hoog (acutefase-eiwit), lage saturatie, laag TIBC','Thalassemie: normaal ferritine en saturatie, geen anemie van ziekte','Sideroblastaire anemie: ringed sideroblasts op beenmergbiopt'],
    c:1, ex:'IJzergebrek: ferritine LAAG (<30), transferrinesaturatie laag, TIBC HOOG. ACD: ferritine NORMAAL/HOOG (is acutefase-eiwit bij infectie/maligniteit/RA), saturatie laag, TIBC LAAG. Ferritine 165 + lage saturatie + laag TIBC = ACD. Zoek onderliggende oorzaak (maligniteit, chronische infectie, inflammatoire ziekte).' },


  // ── DIAGNOSTISCHE TEST-KEUZE ──

  { type:'diagnose', d:5, domain:'neuro', dl:'Neurologie', subtype:'test',
    q:'Vrouw 42j: plotse "donderslag-hoofdpijn", maximale intensiteit in seconden, nekstijfheid, CT hersenen negatief. Welke test is nu essentieel?',
    a:['MRI hersenen met gadolinium','Lumbaalpunctie (LP) — bloedige/xanthochrome liquor bij SAB','EEG bij verdenking epileptische aanval','Doppler a. carotis'],
    c:1, ex:'CT mist 2-5% van SAB, met name vroeg (<6u) of kleine bloedingen. Bij negatieve CT + sterke verdenking SAB (donderslag-hoofdpijn) is LP verplicht: xanthochromie (geel verkleurd door afbraak hemoglobine) bewijst SAB. MRI is minder sensitief voor acuut bloed dan CT.',
    wiki: {
      kern: 'Thunderclap + negatieve CT = LP verplicht. CT heeft 98% sensitiviteit in eerste 6u maar daalt tot 85% na 24u. LP na ≥6-12u detecteert xanthochromie (geel vocht door afbraak hemoglobine) — bewijzend voor SAB.',
      redflag: 'Negatieve CT sluit SAB NIET uit. 5% van SAB wordt gemist op CT. Geen LP = gemist SAB = kans op fatale reruptuur.',
      mechanisme: [
        { title: 'CT-sensitiviteit daalt', desc: 'Bloed wordt progressief afgebroken → na 12-24u neemt CT-signaal af. CT-positief in eerste 6u bij 98%, na 24u slechts 85%.' },
        { title: 'Xanthochromie', desc: 'Hemoglobine breekt af tot bilirubine in liquor → gele verkleuring zichtbaar na 6-12u, blijft 2 weken aanwezig. Spectrofotometrie is gevoeliger dan visuele inspectie.' },
        { title: 'LP-timing', desc: 'LP te vroeg (<6u): alleen vers bloed, kan traumatische punctie zijn. Wacht minimaal 6-12u na symptoomonset.' },
      ],
      onderscheid: [
        { label: 'SAB — LP positief', desc: 'Xanthochromie bij spectrofotometrie. Bewijst bloeding. Spoed-neurochirurgie/neuroradiologie.', type: 'ok' },
        { label: 'SAB — LP negatief', desc: 'Xanthochromie afwezig ≥12u na start klachten = SAB uitgesloten. Overweeg andere thunderclap-oorzaken (RCVS, CVT).', type: 'warn' },
        { label: 'Traumatische LP', desc: 'Vers bloed in eerste buisje, opklarend in volgende buisjes. Geen xanthochromie. Artefact.', type: 'warn' },
      ],
      therapie: {
        urgent: 'LP na ≥6-12u → xanthochromie spectrofotometrie → bij positief: angiografie (CTA of DSA) → aneurysmabehandeling.',
        stappen: [
          { naam: 'CTA hersenvaten', detail: 'Na bevestiging SAB: CTA voor lokalisatie aneurysma (98% sensitief). DSA bij negatieve CTA bij sterke klinische verdenking.' },
          { naam: 'Nimodipine', detail: '60 mg oraal 4x/dag 21 dagen — reduceert vasospasmen en ischemisch risico dag 4-14.' },
          { naam: 'Reruptuur preventie', detail: 'Coiling of clipping binnen 24-72u. 30% reruptuur-risico zonder behandeling, mortaliteit 70%.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie', subtype:'test',
    q:'Man 28j: twee aparte demyeliniserende episodes, klachten >24u, MRI witte-stof periventriculair. Verdenking MS — welke test voegt diagnostisch het meest toe?',
    a:['EEG: slow-wave activiteit bij MS','LP: oligoklonale banden in liquor bevestigen intrathecale immunoglobulineproductie','PET-scan: metabolisme witte stof','EMG: neurogene patronen bij demyelinisatie'],
    c:1, ex:'MRI is eerste keus bij MS (McDonald-criteria). LP met oligoklonale banden (aanwezig in >95% MS, niet in serum) bevestigt intrathecale ontsteking als MRI niet volledig diagnostisch is. Visueel-evoked potentials (VEP) kunnen ook bijdragen bij opticus-betrokkenheid. EEG heeft geen rol bij MS.',
    wiki: {
      kern: 'Na MRI is LP met oligoklonale banden (OCB) de meest waardevolle aanvullende test bij MS. OCB in liquor (niet serum) zijn aanwezig bij >95% van MS-patiënten en kunnen "disseminatie in tijd" bevestigen — waarmee diagnose eerder gesteld kan worden.',
      redflag: 'OCB zijn niet MS-specifiek — ook bij neuroborreliose, neurosyfilis, NMO en andere neuroinflammatie. Altijd AQP4-antilichamen bepalen om NMO uit te sluiten.',
      mechanisme: [
        { title: 'McDonald-criteria', desc: 'MS-diagnose vereist disseminatie in ruimte (≥2 CZS-locaties) én tijd (≥2 episodes of nieuwe MRI-laesies). LP-OCB kan "disseminatie in tijd" vervangen.' },
        { title: 'OCB als "disseminatie in tijd"', desc: 'Aanwezigheid van OCB bij eerste klinische aanval + MRI-laesies voldoende voor MS-diagnose (McDonald 2017) — zonder een tweede aanval te hoeven afwachten.' },
        { title: 'EEG: geen rol', desc: 'EEG heeft geen diagnostische waarde bij MS. Relevant voor epilepsie-diagnostiek, niet voor demyeliniserende ziekten.' },
      ],
      onderscheid: [
        { label: 'LP-OCB bij MS', desc: 'Gevoeligheid >95%. Specificiteit matig — combineer altijd met MRI en kliniek. Geen OCB = MS onwaarschijnlijk.', type: 'ok' },
        { label: 'VEP (visueel evoked potential)', desc: 'Vertraagde P100-golf bewijst subklinische opticus-betrokkenheid — nuttig bij mono-symptomatisch begin.', type: 'warn' },
        { label: 'AQP4-antilichamen', desc: 'Negatief bij MS, positief bij NMO (80%). Altijd bepalen bij atypisch beeld of longitudinale myelitis.', type: 'warn' },
      ],
      therapie: {
        urgent: 'Diagnose MS bevestigen → direct bespreken ziekte-modificerende therapie (DMT) om relapsen te verminderen.',
        stappen: [
          { naam: 'Eerstelaijn DMT', detail: 'Interferon-bèta, glatirameracetat, dimethylfumaraat — voor milde-matige MS.' },
          { naam: 'Tweedelijns DMT', detail: 'Natalizumab, ocrelizumab — voor actieve of snel progressieve MS.' },
          { naam: 'Relaps', detail: 'Methylprednisolon 1g IV 3-5 dagen bij acute relaps met functieverlies.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie', subtype:'test',
    q:'Jongeman 22j: aanval met bewustzijnsverlies, tongbeet, incontinentie, 2 minuten. Epilepsie of syncope — welke test onderscheidt het best?',
    a:['CT hersenen: altijd eerste stap','EEG na aanval voor interictale afwijkingen + tilttest/Holter voor syncope','Bloedsuiker tijdens aanval','Slaaponderzoek: slaapapneu als oorzaak'],
    c:1, ex:'Epilepsie vs syncope: EEG (interictale epileptiforme activiteit, sensitief 50-60%) + anamnese (tongbeet/incontinentie wijst naar epilepsie). Syncope: tilttest (orthostatisch/vasovagaal), Holter (cardiaal). Tongbeet + incontinentie + postictale verwardheid = epilepsie waarschijnlijk. MRI daarna voor structurele oorzaak.',
    wiki: {
      kern: 'Tongbeet (zijkant!) + incontinentie + postictale verwardheid = epilepsie. EEG detecteert interictale activiteit (sensitiviteit 50-60% bij eerste EEG, hogere bij slaap-EEG). Syncope: Holter + tilttest.',
      redflag: 'Niet elke "stuip" is epilepsie. Syncope met spierschokken (convulsief syncope) wordt vaak verward met epilepsie. Belangrijkste onderscheid: bij syncope geen postictale verwardheid.',
      mechanisme: [
        { title: 'Epilepsie-kenmerken', desc: 'Tongbeet lateraal (zijkant — mediaan wijst op ander trauma), urine-incontinentie, tonisch-clonisch >1-2 min, postictale verwardheid/slaap.' },
        { title: 'Syncope-kenmerken', desc: 'Kortdurend (<30 sec), uitgelokt (staan, emotie, pijn), korte spierschokken mogelijk maar geen tongbeet, snel herstel zonder verwardheid.' },
        { title: 'EEG-waarde', desc: 'Interictale epileptiforme activiteit bij eerste EEG: sensitiviteit 50-60%. Slaap-EEG of herhaal-EEG: hogere sensitiviteit. Normaal EEG sluit epilepsie NIET uit.' },
      ],
      onderscheid: [
        { label: 'Epilepsie', desc: 'Tongbeet zijkant + incontinentie + postictale verwardheid/slaap + EEG-afwijking. MRI voor structurele oorzaak.', type: 'ok' },
        { label: 'Convulsief syncope', desc: 'Spierschokken bij bewustzijnsverlies maar kortdurend, geen tongbeet, snel herstel, ECG/tilttest positief.', type: 'warn' },
        { label: 'Non-epileptische aanval (PNES)', desc: 'Psychogene aanval. Geen EEG-correlaat. Diagnose via video-EEG. Behandeling: psychotherapie.', type: 'warn' },
        { label: 'Cardiaal syncope', desc: 'Plotse bewusteloosheid zonder aura, ECG-afwijking, familiaire plotse dood. Holter/ILR verplicht.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Eerste aanval: bloedsuiker meten, EEG + MRI aanvragen. Rijverbod melden.',
        stappen: [
          { naam: 'EEG', detail: 'Zo snel mogelijk na de aanval (binnen 24u sensitiever). Slaap-EEG bij negatief wakker-EEG. Video-EEG bij twijfel PNES vs epilepsie.' },
          { naam: 'MRI', detail: 'MRI hersenen (protocol epilepsie) na eerste aanval bij volwassene — altijd structurele oorzaak uitsluiten.' },
          { naam: 'Antiepilepticum', detail: 'Bij tweede aanval of hoog recidiefrisico: levetiracetam of lamotrigine. Rijverbod tot 1 jaar aanvalsvrij.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie', subtype:'test',
    q:'Man 58j: drukkende thoraxpijn 20 min, uitstraling linkerarm, zweten. Verdenking ACS — wat doe je als eerste diagnostische stap?',
    a:['CT-coronair angiografie: anatomie coronairen','ECG binnen 10 minuten + hoogsensitief troponine (0u en 1u/3u)','Stress-echo: ischemie provoceren','Holter: ritmestoornis uitsluiten'],
    c:1, ex:'Richtlijn: ECG binnen 10 minuten na binnenkomst (STEMI = direct katheterslab). Hoogsensitief troponine bij aankomst + 1u of 3u later (0/1h-protocol of 0/3h). Dit algoritme sluit >99% van NSTEMI/ACS uit of bevestigt het. CT-coronair bij stabiele patiënt met lagere verdenking.',
    wiki: {
      kern: 'ACS-diagnostiek volgt een strikt tijdprotocol. ECG binnen 10 minuten identificeert STEMI voor directe PCI. Hs-troponine op 0u en 1-3u later sluit NSTEMI uit of bevestigt het. Dit algoritme heeft een negatief voorspellende waarde van >99,5%.',
      bigfact: { num: '10', label: 'minuten', sub: 'ECG-tijdsdoel na aankomst bij verdenking ACS — bij STEMI direct katheterslab activeren' },
      mechanisme: [
        { title: 'ECG: onmiddellijke beslissing', desc: 'STEMI (ST-elevatie ≥1mm in ≥2 aangrenzende afleidingen) = directe PCI, geen verdere diagnostiek nodig. Geen STEMI maar klachten: NSTEMI-protokol starten.' },
        { title: 'Hs-troponine tijdsvenster', desc: 'Troponine lekt na myocardschade uit → meetbaar in bloed na 1-3 uur. Eén meting is onvoldoende. Serieel (delta-troponine) meten: stijging of daling van ≥52% over 1u = rule-in ACS.' },
        { title: '0/1u vs 0/3u protocol', desc: '0/1u-algoritme (ESC 2020): snellere triage. Meetbare stijging in 1 uur = rule-in. Geen stijging + laag absoluut niveau = rule-out. 0/3u bij onduidelijk hs-TnT-baseline.' },
      ],
      onderscheid: [
        { label: 'ECG + hs-troponine 0/1h protocol', desc: 'Eerste keus bij verdenking ACS: ECG <10 min, troponine bij aankomst + 1u. Sensitiever en sneller dan conventioneel troponine-protocol.', type: 'ok' },
        { label: 'CT-coronair angiografie', desc: 'Voor stabiele patiënten met lage-tot-matige pre-testkans op coronairlijden (buiten de acute fase). Niet geschikt als eerste stap bij acuut ACS.', type: 'warn' },
        { label: 'Inspanningstest/stress-echo', desc: 'Alleen bij stabiele patiënten met twijfelachtig klachtenpatroon na uitsluiten acuut MI. Nooit in de acute presentatiefase.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Bij STEMI: activeer katheterslab terwijl ECG nog wordt gemaakt — geen minuut verliezen.',
        stappen: [
          { naam: 'NSTEMI/onzeker', detail: 'Aspirine + heparine + GRACE-score bepalen → invasieve strategie (coronairangiografie) binnen 24-72u afhankelijk van risicoscore.' },
          { naam: 'Rule-out na 0/1u-protocol', detail: 'Negatief hs-troponine op 0u EN 1u + geen ECG-afwijkingen + lage HEART-score → ontslag veilig mogelijk.' },
        ],
      },
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie', subtype:'test',
    q:'Vrouw 68j: dyspneu, enkelloedeem, verhoogde CVD. Verdenking hartfalen — BNP/NT-proBNP of echocardiografie als eerste test?',
    a:['Echocardiografie altijd eerst: definitieve diagnose','BNP/NT-proBNP eerst: snel, hoge negatieve predictieve waarde — normaal sluit hartfalen vrijwel uit','X-thorax: vochtige longen = bewijs hartfalen','24u urinecortisol: bijnierinsufficiëntie uitsluiten'],
    c:1, ex:'BNP/NT-proBNP: hoge negatieve predictieve waarde. Normaal BNP (<35 pg/mL) maakt hartfalen onwaarschijnlijk → geen echo nodig. Verhoogd BNP → echo voor bevestiging (systolisch/diastolisch) en behandelgeleiding. Hartfalen + normaal BNP = denk aan andere oorzaak dyspneu.',
    wiki: {
      kern: 'BNP (brain natriuretic peptide) en NT-proBNP worden vrijgegeven door cardiomyocyten bij verhoogde wandspanning (volume- of drukoverload). Negatief BNP (<35 pg/mL voor BNP, <125 pg/mL voor NT-proBNP) sluit hartfalen vrijwel uit als oorzaak van dyspneu.',
      bigfact: { num: '>99%', label: 'negatief voorspellende waarde', sub: 'normaal BNP (<35 pg/mL) bij verdenking hartfalen in de acute setting' },
      mechanisme: [
        { title: 'Synthese en vrijgave', desc: 'Ventrikelwand gerekt door verhoogde vullingsdruk of verhoogd volume → pro-BNP gesplitst → actief BNP + inactief NT-proBNP. BNP: actieve natriurese en vasodilatatie. NT-proBNP: langere halfwaardetijd (~70u vs ~20 min BNP) → stabielere spiegel.' },
        { title: 'Specificiteit BNP', desc: 'BNP/NT-proBNP verhoogd bij hartfalen, maar ook bij: nierfalen, sepsis, PE, COPD-exacerbatie, ouderen. Specificiteit ~70% → verhoogd BNP = verdenking hartfalen, maar bevestiging via echo nodig.' },
        { title: 'Echo na verhoogd BNP', desc: 'Echocardiografie bepaalt type hartfalen (HFrEF EF <40% vs HFpEF EF ≥50%), onderliggende oorzaak (klepgebrek, wandbewegingsstoornissen) en behandelgeleiding.' },
      ],
      onderscheid: [
        { label: 'BNP/NT-proBNP eerst: uitsluiting hartfalen', desc: 'Normaal BNP maakt hartfalen onwaarschijnlijk — goedkoop, snel. Verhoogd BNP → echo voor bevestiging en specificatie.', type: 'ok' },
        { label: 'Echocardiografie: definitieve diagnose', desc: 'Bevestigt hartfalen, bepaalt EF, vullingsdrukken, klepgebrek. Indicatie na verhoogd BNP of bij sterke klinische verdenking ondanks normaal BNP.', type: 'warn' },
        { label: 'X-thorax bij hartfalen', desc: 'Pulmonaalstuwing, Kerley-B-lijnen, cardiomegalie — ondersteunend maar niet diagnostisch. Specifiek bij acuut longoedeem maar minder gevoelig.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Acuut hartfalen met verhoogd BNP + klinische kenmerken: furosemide IV + zuurstof.',
        stappen: [
          { naam: 'BNP als behandeldoel', detail: 'BNP-geleid dosisaanpassing van diuretica verlaagt recidief-ziekenhuisopnames (PRIMA-studie). Target: BNP-daling >30% na behandeling.' },
          { naam: 'Echo voor therapiekeuze', detail: 'HFrEF vs HFpEF bepaalt de medicamenteuze strategie — echo is hiervoor onmisbaar.' },
        ],
      },
    } },

  { type:'diagnose', d:5, domain:'cardio', dl:'Cardiologie', subtype:'test',
    q:'Patient met koorts, nieuw hartgeruis en positieve bloedkweken (S. aureus). Verdenking endocarditis — TTE of TEE?',
    a:['TTE altijd voldoende: goede beeldkwaliteit bij alle patiënten','TEE: hogere sensitiviteit (>90%) voor vegetaties en complicaties, altijd bij hoog-risico of negatieve TTE','CT-thorax: perifere embolieën opsporen','Alleen bloedkweken voldoende voor diagnose'],
    c:1, ex:'TTE (transthoracaal): eerste keus, non-invasief, sensitiviteit 60-75%. TEE (transoesofageaal): sensitiviteit >90%, indicatie bij: negatieve TTE maar hoge klinische verdenking, prostetische kleppen, S. aureus-bacteriemie, aortaklep-betrokkenheid, complicaties zoeken. Duke-criteria: twee major (bloedkweken + echo) = definitief.',
    wiki: {
      kern: 'Endocarditis-diagnostiek: TTE is de eerste stap (niet-invasief, snel), maar TEE is essentieel bij hoog-risico patiënten (S. aureus, kunstklep, negatieve TTE bij hoge klinische verdenking). TEE heeft sensitiviteit >90% vs 60-75% voor TTE.',
      redflag: 'S. aureus-bacteriemie = TEE altijd verplicht, ook bij negatieve TTE. S. aureus hecht ook aan intacte kleppen en veroorzaakt snel klepdestructie — missen van endocarditis is fataal. Chirurgie-indicaties vroegtijdig overwegen.',
      mechanisme: [
        { title: 'Duke-criteria', desc: 'Major: ≥2 positieve bloedkweken van typische verwekker + echocardiografisch bewijs (vegetatie/abces/perforatie). Minor: predispositie, koorts, vasculaire fenomenen, immunologische tekenen. Definitief: 2 major, of 1 major + 3 minor.' },
        { title: 'TEE vs TTE', desc: 'TTE: sonde extern, longweefsel/ribben/vet attenueren het beeld. TEE: sonde in oesofagus direct achter het hart → geen attentuatie → hogere resolutie, detectie vegetaties <3 mm, abcessen in aortawortel/ringgebied.' },
        { title: 'Indicaties TEE', desc: 'Negatieve TTE bij hoge klinische verdenking, kunstkleppen (TTE bijna altijd onvoldoende), S. aureus-bacteriemie, intracardiaal apparaat (ICD/pacemaker), klinische verslechtering.' },
      ],
      onderscheid: [
        { label: 'TEE bij hoog-risico endocarditis', desc: 'S. aureus-bacteriemie, negatieve TTE bij hoge verdenking, kunstklep, aortaklep-betrokkenheid. Sensitiviteit >90% voor vegetaties en complicaties (abces, fistel).', type: 'ok' },
        { label: 'TTE als eerste stap', desc: 'Non-invasief, breed beschikbaar. Voldoende bij: lage verdenking endocarditis, goede beeldkwaliteit, natieve mitris-/aortaklep zonder complicaties. Gevolgd door TEE indien positief of bij twijfel.', type: 'warn' },
        { label: 'CT-thorax/abdomen', desc: 'Aanvullend voor perifere septische embolieën, aortabetrokkenheid, chirurgische planning. Niet voor diagnose endocarditis.', type: 'danger' },
      ],
      therapie: {
        urgent: 'Start empirische antibiotica na het afnemen van ten minste 2 sets bloedkweken — nooit uitstellen voor echocardiografie.',
        stappen: [
          { naam: 'Antibiotica (S. aureus MSSA)', detail: 'Flucloxacilline 12g/dag IV gedurende 6 weken.' },
          { naam: 'Chirurgie-indicaties', detail: 'Hartfalen, ongecontroleerde infectie, embolieprophylaxe (vegetatie >10 mm + hoog-risico verwekker). Endocarditis-team beslist multidisciplinair.' },
        ],
      },
    } },

  { type:'diagnose', d:2, domain:'lab', dl:'Laboratorium', subtype:'test',
    q:'Patient met moeheid, gewichtstoename, kouwelijkheid. Schildklierfunctie evalueren — welke test is de beste eerste stap?',
    a:['Vrij T4 (fT4): direct spiegelmeting schildklier','TSH: meest sensitieve marker voor schildklierfunctie, verhoogd bij hypothyreoïdie','Anti-TPO antilichamen: auto-immuun oorzaak','T3: alleen verhoogd bij T3-toxicose'],
    c:1, ex:'TSH is de beste screeningstest: de hypofyse is extreem gevoelig voor kleine veranderingen in schildklierhormoonstatus. Verhoogd TSH = hypothyreoïdie (ook subklinisch). Normaal TSH = schildklier vrijwel zeker intact. Alleen bij afwijkend TSH dan vrij T4 en evt. vrij T3 meten.' },

  { type:'diagnose', d:3, domain:'lab', dl:'Laboratorium', subtype:'test',
    q:'Patient met geelzucht, donkere urine, clay-coloured ontlasting, ALAT 420 U/L. Cholestatisch vs. hepatocellulair — welke test maakt het onderscheid het best?',
    a:['Leverbiopsie: altijd eerste stap bij geelzucht','Echo abdomen: biliaire obstructie vs. parenchymale leverziekte','PET-scan: maligniteit uitsluiten','Galzuurmeting: primaire biliaire cholangitis'],
    c:1, ex:'Echo abdomen is eerste stap bij geelzucht: verwijde galwegen = extrahepatische obstructie (steen, maligniteit) → ERCP. Geen verwijding = intrahepatische oorzaak (hepatitis, cirrose). Leverbiopsie pas na uitsluiten obstructie. Bloedonderzoek (ALAT/AF-ratio) geeft richting maar echo is anatomisch beslissend.' },

  { type:'diagnose', d:5, domain:'lab', dl:'Laboratorium', subtype:'test',
    q:'Patient met bloedingsneiging: makkelijk blauwe plekken, tandvleesbloeding. PT verhoogd, APTT normaal, trombocyten normaal. Welk stollingsprobleem past hier?',
    a:['Trombocytopenie: laag trombocyten','Extrinsieke cascadestoornis — vitamine K-gebrek of leverfunctiestoorniss (PT verhoogd, APTT normaal)','Von Willebrand ziekte: APTT verhoogd','Hemofilie A: factor VIII-gebrek, APTT verhoogd'],
    c:1, ex:'PT meet de extrinsieke cascade (factor VII, X, V, II, I). APTT meet de intrinsieke cascade (VIII, IX, XI). PT verhoogd + APTT normaal = stoornis in extrinsieke route → vitamine K-gebrek (factor VII kortste halfwaardetijd), VKA-gebruik, of vroeg leverfalen. Hemofilie en vWD geven APTT-verhoging.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie', subtype:'test',
    q:'Man 65j: koorts, hoest, infiltraat rechter onderkwab. CAP (community-acquired pneumonie) — welke test geeft het snelst de verwekker?',
    a:['Sputumkweek: altijd betrouwbaar en snel','Urine-antigeen (pneumokok + legionella): snel resultaat, ook bij antibiotica reeds gestart','Bronchoscopie met BAL: goudstandaard altijd','Bloedkweek alleen bij ernstige sepsis'],
    c:1, ex:'Urine-antigeen (pneumokokken en legionella): resultaat binnen uren, niet beïnvloed door antibioticagebruik — bij twijfel of ernstige pneumonie altijd afnemen. Sputumkweek: betrouwbaar maar traag (48-72u), bij ziekenhuisopname afnemen. Bloedkweek: lage sensitiviteit (5-14%) maar altijd bij ernstige CAP (CURB-65 ≥3).' },

  { type:'diagnose', d:5, domain:'infectio', dl:'Infectiologie', subtype:'test',
    q:'Patient met koorts, nekstijfheid, fotofobie. Verdenking bacteriële meningitis — LP direct of eerst CT hersenen?',
    a:['Altijd eerst CT, dan LP — CT is veiliger','LP direct als geen tekenen verhoogde intracraniële druk (focal neurologisch, bewustzijnsdaling, papiloedeem) — antibiotica niet uitstellen','Wacht op PCR-resultaat voor LP','MRI is beter dan CT voor LP-indicatiestelling'],
    c:1, ex:'LP mag direct als geen tekenen verhoogde ICP (bewustzijn normaal, geen papilloedeem, geen focale uitval). CT eerst bij: focale uitval, bewustzijnsdaling, epilepsie, immuno-gecompromitteerd. CRUCIAAL: antibiotica nooit uitstellen voor LP of CT. Start ceftriaxon + dexamethason direct, doe LP zo snel mogelijk daarna.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie', subtype:'test',
    q:'Patient met koorts en klinische sepsis, verdenking bacteriemie. Wanneer bloedkweken afnemen voor optimale opbrengst?',
    a:['Altijd na start antibiotica: bacteriën dan beter aantoonbaar','Voor start antibiotica, bij voorkeur tijdens of vlak voor koortspiek — twee sets van verschillende locaties','Alleen bij temperatuur >39°C: anders te weinig bacteriemie','Eén set voldoende: dubbel is verspilling'],
    c:1, ex:'Bloedkweken VOOR antibiotica: antibiotica verlagen sensitiviteit drastisch. Timing bij of vlak voor koortspiek (tijdens bacteriemische fase). Twee sets (aerob + anaeroob) van twee verschillende locaties: verhoogt sensitiviteit van 80% naar >90% en onderscheidt contaminant van echte bacteriemie. Niet uitstellen voor behandeling bij ernstige sepsis.' },

  // ── ECG & FIGUUR-VRAGEN ──

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man van 68 jaar met plotse hartkloppingen en lichte duizeligheid. Welk ritme is te zien op dit ECG?',
    fig:'<svg viewBox="0 0 280 62" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="38" x2="280" y2="38" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/><polyline points="5,38 9,35 13,41 17,36 21,40 25,35 29,38 33,38 35,6 38,56 41,38 45,35 49,41 53,36 57,41 61,36 65,39 69,36 73,38 75,6 78,56 81,38 85,35 89,41 93,36 97,41 101,36 105,40 109,36 113,40 117,36 121,39 125,38 127,6 130,56 133,38 137,35 141,40 145,37 149,38 153,38 155,6 158,56 161,38 165,35 169,41 173,36 177,41 181,36 185,40 189,36 193,40 197,36 201,40 205,36 209,38 213,38 215,6 218,56 221,38 225,35 229,41 233,37 237,40 241,37 245,38 249,38 251,6 254,56 257,38 261,35 265,40 269,37 273,40 277,36 280,38" stroke="#E8410A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="6" y="59" font-size="9" fill="#aaa" font-family="DM Sans,sans-serif">Lead II — 25mm/s</text></svg>',
    a:['Sinustachycardie','Atriumfibrilleren','Atriumflutter 2:1','Ventriculaire tachycardie'], c:1,
    ex:'Absoluut irregulair QRS-ritme zonder P-toppen = atriumfibrilleren. Let op de onregelmatige RR-intervallen en de chaotische fibrillatiebasisline. Bij atriumflutter zijn er zaagvormige F-golven met een regulier ritme (~150/min). Risico op trombus in linker hartoor → anticoagulatie.',
    wiki:{
          kern: "Atriumfibrilleren (AF) is het meest voorkomende hartritmestoornis. Meerdere chaotische re-entry circuits in de atria (400-600/min) maken gecoördineerde contractie onmogelijk.",
          mechanisme: [
            { title: "Chaotische atriale activiteit", desc: "Meerdere re-entry circuits in de atria (400-600/min) — gecoördineerde atriale contractie is onmogelijk. Linker hartoor contraheert nauwelijks." },
            { title: "Trombusvorming", desc: "Stase van bloed in het linker hartoor → trombusvorming → embolisatie naar hersenen of andere organen. Dit is de reden waarom anticoagulatie de hoeksteen is van behandeling." },
            { title: "Onregelmatig ventrikelritme", desc: "AV-knoop geleidt willekeurig van de chaotische atriale prikkels → absoluut irregulair RR-ritme. Geen P-toppen op het ECG — alleen fibrillatiebasisline." },
            { title: "CHA₂DS₂-VASc risicostratificatie", desc: "Indicatie anticoagulatie: mannen ≥2 punten, vrouwen ≥3 punten. Punten voor: hartfalen, hypertensie, leeftijd ≥75 (2pt), DM, beroerte/TIA (2pt), vaatlijden, leeftijd 65-74, vrouwelijk geslacht." },
          ],
          onderscheid: [
            { label: 'Atriumfibrilleren', desc: 'Absoluut irregulair RR-ritme, geen P-toppen, chaotische fibrillatiebasisline. Anticoagulatie op basis van CHA₂DS₂-VASc-score.', type: 'ok' },
            { label: 'Atriumflutter', desc: 'Regelmatig ~150/min, zaagvormige F-golven in II/III/aVF, carotismassage maakt F-golven zichtbaar.', type: 'warn' },
            { label: 'Sinustachycardie', desc: 'Regelmatig, duidelijke P-top vóór elk QRS, frequentie varieert met ademhaling.', type: 'warn' },
            { label: 'AVNRT', desc: 'Paroxysmaal, regelmatig smalcomplex, plotse start/stop, P verborgen in of net achter QRS.', type: 'danger' },
          ],
          therapie: {
            urgent: 'Acuut hemodynamisch instabiel: directe elektrische cardioversie.',
            stappen: [
              { naam: 'Rate control', detail: 'Bètablokker (metoprolol) of non-DHP calciumantagonist (diltiazem) — eerstekeus bij permanente AF.' },
              { naam: 'Rhythm control', detail: 'Flecaïnide (geen structureel hartlijden) of amiodaron — cardioversie na ≥3 weken anticoagulatie of TEE om trombus uit te sluiten.' },
              { naam: 'Anticoagulatie', detail: 'DOAC (apixaban, rivaroxaban, dabigatran) op basis van CHA₂DS₂-VASc. VKA bij mechanische klep of mitralisstenose.' },
              { naam: 'Pulmonaalvene-ablatie', detail: 'Curatief bij symptomatische paroxismale AF — isolatie van de ectopische foci in longvenen.' },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Patiënt van 58 jaar met 40 minuten drukkende retrosternale pijn. Welke diagnose toont dit ECG-fragment?',
    fig:'<svg viewBox="0 0 220 70" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="50" x2="220" y2="50" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/><line x1="43" y1="35" x2="85" y2="35" stroke="rgba(232,65,10,0.3)" stroke-width="1" stroke-dasharray="2,3"/><polyline points="5,50 20,50 23,44 27,50 31,50 33,52 36,8 39,57 43,35 63,35 72,27 83,35 91,50 108,50 111,44 115,50 119,50 121,52 124,8 127,57 131,35 151,35 160,27 170,35 178,50 205,50" stroke="#E8410A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="188" y="37" font-size="9" fill="#E8410A" font-family="DM Sans,sans-serif" font-weight="600">ST↑</text><text x="5" y="67" font-size="9" fill="#aaa" font-family="DM Sans,sans-serif">Lead II (inferieur) — 25mm/s</text></svg>',
    a:['Pericarditis','Inferieur STEMI','NSTEMI','Normaal ECG'], c:1,
    ex:'Gelokaliseerde ST-elevatie in de inferieure afleidingen (II, III, aVF) past bij een inferieur STEMI door RCA-occlusie. Direct PCI binnen 90 minuten! De dashed lijn toont de basislijn — het ST-segment ligt er duidelijk boven. Pericarditis geeft diffuse saddle-shape ST-elevatie in ALLE afleidingen.',
    wiki:{
          kern: "Inferieur STEMI (leads II, III, aVF) wordt veroorzaakt door afsluiting van de rechter coronairarterie (RCA). ST-elevatie toont transmuraal infarct — elke minuut vertraging = meer myocardschade.",
          mechanisme: [
            { title: "Plaque ruptuur", desc: "Atherosclerotische plaque in de RCA scheurt open → subendotheliaal collageen blootgesteld → plaatjesaggregatie." },
            { title: "Trombusvorming", desc: "Volledige afsluiting van de RCA door een trombus → transmuraal inferieur myocard ischemisch." },
            { title: "ST-elevatie mechanisme", desc: "Ischemische cellen depolariseren abnormaal → stroomlus naar aangrenzend gezond weefsel → ST-elevatie in inferieure afleidingen (II, III, aVF)." },
            { title: "Reciproke depressie", desc: "Tegenoverlegen afleidingen (I, aVL) tonen spiegelbeeldige ST-depressie — bevestigt de lokalisatie en is typisch voor STEMI (ontbreekt bij pericarditis)." },
            { title: "RV-infarct risico", desc: "Proximale RCA voedt ook het RV → altijd V4R afnemen. ST-elevatie ≥1 mm in V4R = RV-infarct → geen nitraten of diuretica geven!" },
          ],
          onderscheid: [
            { label: 'Inferieur STEMI (RCA-occlusie)', desc: 'ST-elevatie in II, III en aVF. Reciproke depressie in I en aVL. Altijd rechter-ECG (V4R) afnemen om RV-infarct uit te sluiten.', type: 'ok' },
            { label: 'Pericarditis', desc: 'Diffuse saddle-shape ST-elevatie in álle afleidingen, PR-depressie, geen reciproke depressies, houdingsafhankelijke pijn.', type: 'warn' },
            { label: 'NSTEMI', desc: 'Geen ST-elevatie, wél troponine verhoogd. ST-depressie en T-inversie mogelijk.', type: 'warn' },
            { label: 'Vroege repolarisatie', desc: 'Concave (schaalvormige) ST-elevatie bij jonge patiënten zonder klachten — benigne variant.', type: 'danger' },
          ],
          therapie: {
            urgent: 'Directe PCI binnen 90 minuten — elke minuut vertraging = meer myocardverlies.',
            stappen: [
              { naam: 'Dubbele plaatjesremming', detail: 'Aspirine 300 mg + ticagrelor 180 mg direct bij binnenkomst.' },
              { naam: 'Heparine IV', detail: 'Bridging tot PCI — voorkomt verdere trombosgroei in de RCA.' },
              { naam: 'V4R altijd', detail: 'Bij inferieur STEMI: rechter ECG-afleidingen om RV-infarct uit te sluiten — dit verandert het beleid (geen nitraten).' },
              { naam: 'Secundaire preventie', detail: 'Statine + bètablokker + ACE-remmer + SGLT2-remmer na ontslag.' },
            ],
          },
        } },

  { type:'diagnose', d:5, domain:'cardio', dl:'Cardiologie',
    q:'Welk geleidingsstoornispatroon toont dit ECG (let op de PR-intervallen)?',
    fig:'<svg viewBox="0 0 280 72" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="45" x2="280" y2="45" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/><polyline points="5,45 13,45 15,39 17,45 25,45 26,47 28,13 31,55 34,45 40,45 44,38 51,45 62,45 82,45 84,39 86,45 98,45 99,47 101,13 104,55 107,45 113,45 117,38 124,45 133,45 148,45 150,39 152,45 172,45 173,47 175,13 178,55 181,45 187,45 191,38 198,45 207,45 225,45 227,39 229,45 280,45" stroke="#E8410A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="10" y="70" font-size="8" fill="#888" font-family="DM Sans,sans-serif">PR kort</text><text x="78" y="70" font-size="8" fill="#888" font-family="DM Sans,sans-serif">PR langer</text><text x="143" y="70" font-size="8" fill="#888" font-family="DM Sans,sans-serif">PR lang</text><text x="218" y="36" font-size="8" fill="#E8410A" font-family="DM Sans,sans-serif">P↑ geen QRS</text></svg>',
    a:['Eerstegraads AV-blok','Wenckebach (Mobitz type I)','Mobitz type II AV-blok','Derdegraads AV-blok'], c:1,
    ex:'Wenckebach (Mobitz I): PR-interval wordt iedere slag langer totdat één QRS uitvalt — dan reset. Herkenbaar door de progressieve PR-verlenging en de periodiek uitvallende QRS. Benigne, typisch bij inferiorwandinfarct of verhoogde vagustonus. Mobitz II: plotse QRS-uitval zónder PR-verlenging — gevaarlijker.',
    wiki:{
          kern: "Wenckebach is een tweedegraads AV-blok waarbij de AV-knoop na elke geleide slag \"vermoeid\" raakt → steeds langere PR → uiteindelijk een prikkel die niet geleid wordt. Daarna recupereert de AV-knoop en begint de cyclus opnieuw.",
          mechanisme: [
            { title: "Oorzaken", desc: "AV-knooppathologie door ischemie inferieure wand (RCA), verhoogde vagustonus (atleten, slaap) of digoxine-toxiciteit." },
            { title: "Het Wenckebach-patroon", desc: "Cyclische perioden: eerste slag kort PR, elke volgende slag langer PR, tot de prikkel niet door de AV-knoop komt (QRS uitvalt) → dan reset naar kort PR. Voorbeeld: 3:2 blok = 2 QRS op 3 P-golven." },
            { title: "Benigne karakter", desc: "Wenckebach is AV-knoop-niveau — het escape-ritme bij blokkade is junctionaal (~50/min), voldoende hemodynamisch. Mobitz II (His-bundelniveau) is gevaarlijker (ventriculair escape ~30/min)." },
          ],
          onderscheid: [
            { label: 'Wenckebach (Mobitz I)', desc: 'Progressief langer PR → QRS-uitval → reset. Benigne, AV-knoodfenomeen, typisch bij inferieur MI of digoxine-toxiciteit.', type: 'ok' },
            { label: 'Mobitz II', desc: 'Constant PR-interval tot plotse QRS-uitval — His-bundelschade, ernstiger, kan snel totaal blok geven → pacemaker indicatie.', type: 'danger' },
            { label: 'Eerstegraads AV-blok', desc: 'PR >200 ms maar elke P geleidt → asymptomatisch, geen behandeling nodig.', type: 'warn' },
            { label: 'Derdegraads AV-blok', desc: 'P en QRS volledig ontkoppeld, ventriculair escape-ritme ~35/min — urgente pacemaker altijd.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Wenckebach bij inferieur MI: observatie, reversibel. Wenckebach bij digoxine: stop digoxine.',
            stappen: [
              { naam: 'Symptomatisch', detail: 'Atropine 0,5 mg IV bij symptomatische bradycardie — verhoogt AV-knoopgeleiding.' },
              { naam: 'Onderliggende oorzaak', detail: 'Behandel inferieur MI (PCI), stop culprit-medicatie (digoxine, bètablokker, calciumantagonist).' },
              { naam: 'Pacemaker zelden nodig', detail: 'Wenckebach is doorgaans benigne en reversibel — permanent blok is zeldzaam bij Wenckebach.' },
            ],
          },
        } },

  { type:'diagnose', d:5, domain:'cardio', dl:'Cardiologie',
    q:'Patiënt van 72 jaar met presyncope en een polsfrequentie van 35/min. Welk ritme toont deze ritmestrook?',
    fig:'<svg viewBox="0 0 280 70" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="44" x2="280" y2="44" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/><polyline points="5,44 8,44 10,37 12,44 30,44 32,47 34,11 37,57 40,44 44,44 46,34 47,29 49,38 52,44 82,44 84,37 86,44 115,44 117,47 119,11 122,57 125,44 129,44 131,34 133,39 136,44 156,44 158,37 160,44 193,44 195,37 197,44 202,47 204,11 207,57 210,44 214,44 216,34 218,39 221,44 230,44 232,37 234,44 280,44" stroke="#E8410A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="31" r="2.5" fill="#4a8fd4"/><circle cx="47" cy="23" r="2.5" fill="#4a8fd4"/><circle cx="84" cy="31" r="2.5" fill="#4a8fd4"/><circle cx="158" cy="31" r="2.5" fill="#4a8fd4"/><circle cx="195" cy="31" r="2.5" fill="#4a8fd4"/><circle cx="232" cy="31" r="2.5" fill="#4a8fd4"/><text x="5" y="10" font-size="8" fill="#4a8fd4" font-family="DM Sans,sans-serif">● P-golf (75/min)</text><text x="5" y="67" font-size="8" fill="#E8410A" font-family="DM Sans,sans-serif">QRS (35/min) — geen relatie met P</text></svg>',
    a:['Wenckebach (Mobitz I)','Mobitz type II AV-blok','Totaal (derdegraads) AV-blok','Sick Sinus Syndroom'], c:2,
    ex:'Totaal AV-blok: P-toppen (blauw, 75/min) en QRS-complexen (35/min) zijn volledig ontkoppeld — geen enkel signaal uit de atria bereikt de ventrikels. De ventrikels slaan op eigen ritme via een escape-pacemaker in het His-Purkinje systeem. Levensbedreiging — urgente tijdelijke pacemaker.',
    wiki:{
          kern: "Bij een derdegraads (totaal) AV-blok geleidt geen enkele atriale prikkel naar de ventrikels. De atria en ventrikels slaan onafhankelijk van elkaar: atria ~75/min, ventrikels ~35/min via junctionaal of ventriculair escape-ritme.",
          mechanisme: [
            { title: "Oorzaken", desc: "Inferieur MI (tijdelijk, junctionaal escape ~50/min, reversibel na PCI), anterieur MI (His-bundelschade, ventriculair escape ~30/min, slechte prognose), degeneratieve fibrose (Lenegre, bij ouderen), aortaklepchirurgie, digitalis-toxiciteit." },
            { title: "Escape-ritme", desc: "Ventrikels slaan op eigen pace via een laag escape-centrum: junctionaal ~50/min (smal QRS, hemodynamisch beter) of ventriculair ~30/min (breed QRS, hemodynamisch instabiel). Onbetrouwbaar → syncope, hemodynamische collaps." },
            { title: "Hemodynamische gevolgen", desc: "Lage cardiac output door trage ventrikelfrequentie → hypotensie, presyncope/syncope, angina. Atria en ventrikels slaan volledig onafhankelijk — AV-dissociatie is pathognomonisch." },
          ],
          onderscheid: [
            { label: 'Totaal (derdegraads) AV-blok', desc: 'P-toppen (~75/min) en QRS-escape-ritme (~35/min) volledig ontkoppeld — geen enkele atriale prikkel bereikt de ventrikels. Urgente pacemaker.', type: 'ok' },
            { label: 'Wenckebach (Mobitz I)', desc: 'Sommige P-golven geleid, PR progressief verlengd → QRS-uitval → reset. Benigne.', type: 'warn' },
            { label: 'Mobitz II', desc: 'Constant PR tot plotse QRS-uitval — ook ernstig maar P-QRS-relatie bestaat nog.', type: 'warn' },
            { label: 'Sinusbradycardie', desc: 'Traag maar P en QRS altijd gecorreleerd met normaal PR-interval.', type: 'danger' },
          ],
          therapie: {
            urgent: 'Transcutane pacemaker als overbrugging bij hemodynamische instabiliteit — isoprenaline infuus als alternatief.',
            stappen: [
              { naam: 'Permanente pacemaker', detail: 'Definitieve behandeling bij symptomatisch of irreversibel totaal AV-blok.' },
              { naam: 'Reversibele oorzaak', detail: 'Inferieur STEMI: tijdelijk blok, herstel na PCI. Digitalis-toxiciteit: stop medicatie, Fab-antilichamen bij ernstige toxiciteit.' },
            ],
          },
        } },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'De oranje curve toont het spirogram van een 65-jarige roker. Welke interpretatie past het best?',
    fig:'<svg viewBox="0 0 256 140" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="10" x2="22" y2="125" stroke="#ccc" stroke-width="1"/><line x1="22" y1="70" x2="245" y2="70" stroke="#ccc" stroke-width="1"/><text x="130" y="138" font-size="9" fill="#aaa" text-anchor="middle" font-family="DM Sans,sans-serif">Volume (L) →</text><text x="5" y="22" font-size="8" fill="#aaa" font-family="DM Sans,sans-serif">Exp</text><text x="5" y="118" font-size="8" fill="#aaa" font-family="DM Sans,sans-serif">Insp</text><path d="M 22,70 C 30,20 68,14 90,28 C 140,52 185,66 228,70 C 205,108 158,116 110,114 C 68,112 30,98 22,70" stroke="#bbb" stroke-width="2" fill="rgba(180,180,180,0.08)" stroke-linecap="round"/><path d="M 22,70 C 28,42 60,36 76,50 C 115,63 148,69 176,70 C 156,100 122,108 92,107 C 60,105 28,94 22,70" stroke="#E8410A" stroke-width="2.5" fill="rgba(232,65,10,0.06)" stroke-linecap="round"/><line x1="26" y1="128" x2="42" y2="128" stroke="#bbb" stroke-width="2"/><text x="46" y="131" font-size="8" fill="#aaa" font-family="DM Sans,sans-serif">Normaal</text><line x1="110" y1="128" x2="126" y2="128" stroke="#E8410A" stroke-width="2.5"/><text x="130" y="131" font-size="8" fill="#E8410A" font-family="DM Sans,sans-serif">Obstructief</text></svg>',
    a:['Normaal spirogram','Restrictief patroon (FVC verlaagd, FEV1/FVC normaal)','Obstructief patroon (FEV1/FVC verlaagd)','Gemengd patroon'], c:2,
    ex:'Obstructief patroon: de oranje curve heeft een lagere piekstroom en een concave (naar binnen gebogen) expiratoire limb — kenmerk van flow-limitatie bij COPD of astma. FEV1/FVC-ratio <0.70 bevestigt obstructie. Restrictief patroon: smaller loop, lagere FVC, maar normaal gevormde curve.',
    wiki:{
          kern: "De stroom-volumecurve toont de expiratoire flow (Y-as) uitgezet tegen het volume (X-as). Bij COPD: dynamische luchtwegcompressie tijdens expiratie → lagere piekstroom, concave curve.",
          mechanisme: [
            { title: "Stap 1", desc: "COPD: alveolaire destructie (emfyseem) + luchtwegontsteking." },
            { title: "Stap 2", desc: "elastische terugkeer ↓ + luchtwegweerstand ↑." },
            { title: "Stap 3", desc: "air trapping (RV vergroot) + flow-limitatie. De concave curve ontstaat doordat de flow vroeg afneemt omdat de kleine luchtwegen al instorten." },
          ],
          onderscheid: [
            { label: "Obstructief patroon (COPD)", desc: "FEV1/FVC <0,70 na bronchodilatatie, concave expiratoire curve. Bij roker: COPD. FEV1-daling bepaalt ernst (GOLD-stadia I-IV).", type: 'ok' },
            { label: "Obstructief patroon (Astma)", desc: "Ook FEV1/FVC verlaagd, maar reversibel: FEV1 stijgt ≥12% én ≥200 ml na bronchodilatator — onderscheidt astma van COPD.", type: 'warn' },
            { label: "Restrictief patroon (fibrose, obesitas)", desc: "FVC laag, FEV1/FVC normaal of verhoogd, curve kleiner maar normaal van vorm. TLC <80% bevestigt restrictie.", type: 'warn' },
            { label: "Gemengd patroon", desc: "Verlaagd FEV1/FVC én verlaagd TLC — obstructie én restrictie tegelijk (bijv. COPD + obesitas).", type: 'danger' },
          ],
          therapie: {
            urgent: 'COPD-exacerbatie: SABA (salbutamol) + ipratropium vernevelaar + prednisolon 30 mg oraal + antibiotica bij infectieus.',
            stappen: [
              { naam: 'Stabiele COPD', detail: 'Stoppen met roken (meest effectief), SABA/LABA, LAMA (tiotropium), ICS bij recidiverende exacerbaties.' },
              { naam: 'Zuurstof', detail: 'Bij SpO₂ <92%: doseer op target 88-92% bij COPD — te veel O₂ kan hypercapnie verergeren.' },
              { naam: 'Longrevalidatie', detail: 'Bewezen effectief voor kwaliteit van leven en inspanningstolerantie.' },
            ],
          },
        } },


  // ── PULMONOLOGIE ──
  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Man van 65 jaar, 40 pakjaren roken. Progressieve dyspneu bij inspanning, hoest met sputum. Spirometrie na bronchodilatator: FEV1/FVC 0.62, FEV1 58% predicted. Meest waarschijnlijke diagnose?',
    a:['COPD','Astma','Idiopathische pulmonale fibrose','Bronchiëctasieën'], c:0,
    ex:'COPD: postbronchodilatator FEV1/FVC <0.70 bij een roker met passende klachten. Bij astma is er significante reversibiliteit (>12% FEV1-stijging). IPF geeft een restrictief patroon (FVC laag, FEV1/FVC normaal of verhoogd).',
    wiki:{
          kern: "COPD is een chronische, progressieve luchtwegziekte met niet-volledig reversibele obstructie. Twee pathomechanismen: chronische bronchitis (hypersecretie) en emfyseem (alveolaire destructie).",
          mechanisme: [
            { title: "Stap 1", desc: "Tabaksrook." },
            { title: "Stap 2", desc: "ontsteking in kleine luchtwegen." },
            { title: "Stap 3", desc: "fibrose en vernauwing + alveolaire destructie." },
            { title: "Stap 4", desc: "verminderde elastische terugkeer." },
            { title: "Stap 5", desc: "air trapping. FEV1/FVC-ratio daalt. GOLD-stadium I-IV op basis van FEV1% predicted." },
          ],
          onderscheid: [
            { label: "Astma", desc: "jongere leeftijd, atopie, variabiliteit, reversibel.", type: 'ok' },
            { label: "IPF", desc: "restrictief patroon, bibasale crepitaties, trommelstokvingers, honingraatpatroon op HRCT.", type: 'warn' },
            { label: "Bronchiëctasieën", desc: "dagelijkse purulente sputumproductie, recidiverende infecties.", type: 'danger' },
          ],
          therapie: {
            urgent: "Stap 1: SABA (salbutamol) bij klachten.",
            stappen: [
              { naam: "Stap 2", detail: "LAMA (tiotropium)." },
              { naam: "Stap 3", detail: "LAMA+LABA of LABA+ICS." },
              { naam: "Bij exacerbaties", detail: "prednisolon + antibiotica." },
              { naam: "Stap 4", detail: "Stoppen met roken vertraagt het FEV1-verval." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Vrouw van 34 jaar, plotse dyspneu en pleuritische thoraxpijn rechts, polsslag 108/min. D-dimeer 2.1 mg/L, Wells-score 5 punten. Welk onderzoek is nu als eerste geïndiceerd?',
    a:['CT-pulmonalisangiografie','Thoraxfoto','V/Q-scintigrafie','Echo hart'], c:0,
    ex:'Bij hoge klinische verdenking (Wells ≥5) is directe CT-PA geïndiceerd. D-dimeer heeft bij hoge pre-test kans geen meerwaarde als uitsluitingstest. CT-PA is de gouden standaard voor de diagnose longembolie.',
    wiki:{
          kern: "Longembolie (LE): trombus in de pulmonale circulatie, doorgaans afkomstig uit diepe veneuze trombose. De Wells-score schat de klinische verdenking in.",
          mechanisme: [
            { title: "Stap 1", desc: "Trombus." },
            { title: "Stap 2", desc: "verhoogde pulmonale vaatweerstand." },
            { title: "Stap 3", desc: "acuut rechtsventrikeloverbelasting. Kleine emboli: pleuritische pijn door perifeer infarct. Grote emboli: hypotensie, syncope, cardiogene shock." },
          ],
          onderscheid: [
            { label: "Pneumothorax", desc: "ook plotse dyspneu maar hypersonore percussie en afwezig ademgeruis.", type: 'ok' },
            { label: "Pneumonie", desc: "koorts, productief hoesten, infiltraat op X-thorax.", type: 'warn' },
            { label: "Pericarditis", desc: "houdingsafhankelijke pijn, wrijfgeruis.", type: 'danger' },
          ],
          therapie: {
            urgent: "Anticoagulatie direct: LMWH, daarna DOAC (rivaroxaban of apixaban).",
            stappen: [
              { naam: "Massieve LE met shock", detail: "overweeg trombolyse." },
              { naam: "Stap 2", detail: "Minimaal 3 maanden anticoagulatie." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Man van 22 jaar, acuut ontstane dyspneu en pleuritische pijn links. Percussie: hypersonoor links. Ademgeruis links afwezig. Meest waarschijnlijke diagnose?',
    a:['Spontane pneumothorax','Longembolie','Pleuravochtstapeling','Pneumonie'], c:0,
    ex:'Spontane pneumothorax: hypersonore percussie + afwezig ademgeruis ipsilateraal = lucht in de pleurale ruimte. Typisch bij lange, magere jongemannen door ruptuur van subpleurale bullae. Pleuravocht geeft juist demping bij percussie.',
    wiki:{
          kern: "Primaire spontane pneumothorax bij jonge magere mannen door ruptuur van subpleurale bullae aan de longapex. Risico op recidief: 30-50% na eerste episode.",
          mechanisme: [
            { title: "Stap 1", desc: "Ruptuur bulla." },
            { title: "Stap 2", desc: "lucht in pleurale ruimte." },
            { title: "Stap 3", desc: "long collabiert. Gespannen pneumothorax: ventielwerking." },
            { title: "Stap 4", desc: "mediastinum verschuift contralateraal." },
            { title: "Stap 5", desc: "compressie grote vaten." },
          ],
          onderscheid: [
            { label: "Pleuravocht", desc: "demping bij percussie, verminderd ademgeruis.", type: 'ok' },
            { label: "Atelectase", desc: "demping, trachea devieert ipsilateraal.", type: 'warn' },
            { label: "Pneumonie", desc: "koorts, bronchiaal ademen, crepitaties.", type: 'danger' },
          ],
          therapie: {
            urgent: "Klein en stabiel: observatie + zuurstof (versnelt resorptie).",
            stappen: [
              { naam: "Symptomatisch", detail: "aspiratie of drainslang." },
              { naam: "Gespannen pneumothorax", detail: "directe naalddécompressie 2e ICS midclaviculaire lijn zonder wachten op X-thorax." },
            ],
          },
        } },

  { type:'pharma', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Welk mechanisme verklaart de bronchodilaterende werking van tiotropium bij COPD?',
    a:['Blokkade van de M3-muscarinereceptor in de bronchiaalwand','Beta-2-receptoragonisme in gladde bronchiaalspiercellen','Remming van fosfodiësterase-4 → cAMP-stijging','Remming van leukotrieensynthese via 5-lipoxygenase'], c:0,
    ex:'Tiotropium is een LAMA (Long-Acting Muscarinic Antagonist). Het blokkeert de M3-receptor → relaxatie gladde bronchiaalspiercellen → bronchodilatatie. Eenmalige dosering per dag, werking 24 uur.',
    wiki:{
          kern: "Acetylcholine via de M3-receptor veroorzaakt bronchoconstrictie en mucusproductie. LAMA's blokkeren dit → bronchodilatatie en minder secretie.",
          mechanisme: [
            { title: 'LAMA-werking', desc: 'Blokkeert M3-receptor in bronchiaalspiercellen → relaxatie → bronchodilatatie. Verbetert FEV1, vermindert hyperinflatie en exacerbatiefrequentie.' },
            { title: 'Bijwerkingen', desc: 'Droge mond, urineretentie (cave: prostaatproblematiek), constipatie, smalle-kamerhoekglaucoom.' },
          ],
          onderscheid: [
            { label: 'SABA (salbutamol)', desc: 'Beta-2 agonist, snel werkend (5-15 min), rescue-gebruik bij acute dyspneu.', type: 'ok' },
            { label: 'LABA (salmeterol/formoterol)', desc: 'Beta-2 agonist, langwerkend (12u), onderhoudsmedicatie — combineer met LAMA bij ernstige COPD.', type: 'warn' },
            { label: 'ICS', desc: 'Remt luchtwegontsteking, geen directe bronchodilatatie. Toevoegen bij frequente exacerbaties.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Acute COPD-exacerbatie: SABA + ipratropium vernevelaars, zuurstof O2-sat 88-92%, corticosteroïden oraal.',
            stappen: [
              { naam: 'Onderhoudstherapie COPD', detail: 'LAMA (tiotropium) als eerste keus monotherapie bij stabiele COPD. Bij aanhoudende dyspneu: LAMA + LABA combinatie.' },
              { naam: 'Ernstige COPD (FEV1<50%)', detail: 'Drievoudige therapie: LAMA + LABA + ICS — vermindert exacerbatiefrequentie significant.' },
              { naam: 'Stoppen met roken', detail: 'Enige interventie die FEV1-daling vertraagt. Altijd combineren met farmacologische behandeling.' },
            ],
          },
        } },

  { type:'pharma', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Welk antibioticum is eerste keus bij een ambulante community-acquired pneumonie (CAP) zonder comorbiditeiten bij een volwassene?',
    a:['Amoxicilline oraal','Ciprofloxacine oraal','Azitromycine monotherapie','Ceftriaxon intraveneus'], c:0,
    ex:'Ambulante CAP zonder comorbiditeiten: amoxicilline 500 mg 3×/dag. Streptococcus pneumoniae is de meest frequente verwekker en is goed gevoelig voor amoxicilline. Ciprofloxacine dekt S. pneumoniae slecht en is geen standaard keus voor CAP.',
    wiki:{
          kern: 'S. pneumoniae veroorzaakt 30-40% van alle CAP-gevallen. Amoxicilline heeft uitstekende pneumokokkendekking en is eerste keus bij ambulante CAP zonder comorbiditeiten.',
          mechanisme: [
            { title: 'CURB-65', desc: 'Bepaalt ernst en opnamebeleid: Confusion, Ureum >7 mmol/L, Respiratory rate ≥30, Blood pressure <90 mmHg systolisch, leeftijd ≥65.' },
            { title: 'Score 0-1', desc: 'Ambulant behandelen — amoxicilline 500 mg 3×/dag 5 dagen.' },
            { title: 'Score ≥3', desc: 'Ziekenhuisopname + IV antibiotica (amoxicilline/clavulaanzuur of ceftriaxon + macrolide).' },
          ],
          onderscheid: [
            { label: 'Amoxicilline (eerste keus)', desc: 'Uitstekende pneumokokkendekking, oraal, goedkoop. Ambulante CAP zonder comorbiditeiten.', type: 'ok' },
            { label: 'Ciprofloxacine', desc: 'Slecht werkzaam tegen S. pneumoniae — NIET als monotherapie voor CAP.', type: 'danger' },
            { label: 'Levofloxacine', desc: 'Effectief, maar hogere bijwerkingendrempel (peesruptuur, QT-verlenging). Reserveren voor complicaties.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Start antibiotica binnen 4 uur na diagnose — vertraagde start verhoogt mortaliteit.',
            stappen: [
              { naam: 'Ambulant CURB-65 0-1', detail: 'Amoxicilline 500 mg 3×/dag 5 dagen.' },
              { naam: 'Opname CURB-65 2', detail: 'Amoxicilline 4×/dag IV of co-amoxiclav oraal, overweeg macrolide toevoegen bij verdenking atypische verwekker.' },
              { naam: 'IC CURB-65 ≥3', detail: 'Piperacilline/tazobactam IV + macrolide of levofloxacine. Laat Legionella-urine-antigeen testen.' },
            ],
          },
        } },


  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Vrouw van 58 jaar, nooit gerookt. Maandenlange droge hoest en progressieve dyspneu. Bibasale eind-inspiratoire crepitaties en trommelstokvingers. HRCT: honingraatpatroon bibasaal. Diagnose?',
    a:['Idiopathische pulmonale fibrose','COPD','Sarcoidose','Extrinsische allergische alveolitis'], c:0,
    ex:'IPF: progressieve fibrosering bij ouderen (nooit gerookt), bibasale crepitaties, trommelstokvingers en honingraatpatroon (UIP-patroon) op HRCT. Sarcoidose geeft eerder hilaire lymfadenopathie bij jongere patiënten.',
    wiki:{
          kern: "IPF is een chronisch fibroserende interstitiële longziekte met slechte prognose (mediane overleving 3-5 jaar). UIP-patroon op HRCT (honingraat + traktionsbronchiëctasieën bibasaal) is bewijzend zonder biopt bij klassieke presentatie.",
          mechanisme: [
            { title: "Stap 1", desc: "Herhaald micro-trauma aan het alveolair epitheel." },
            { title: "Stap 2", desc: "abnormale wondheling." },
            { title: "Stap 3", desc: "fibroblasten activatie." },
            { title: "Stap 4", desc: "collageen depositie." },
            { title: "Stap 5", desc: "verlies van gaswisselend oppervlak. Restrictief longfunctiepatroon: FVC verlaagd, FEV1/FVC normaal, DLCO verlaagd." },
          ],
          onderscheid: [
            { label: "EAA (extrinsische allergische alveolitis)", desc: "anamnese antigene blootstelling (vogels, schimmels), jonger, deels reversibel.", type: 'ok' },
            { label: "Sarcoidose", desc: "bilaterale hilaire lymfadenopathie, granulomen.", type: 'warn' },
            { label: "NSIP", desc: "jongere vrouwen, minder honingraat, betere prognose.", type: 'danger' },
          ],
          therapie: {
            urgent: "Pirfenidon en nintedanib vertragen FVC-achteruitgang.",
            stappen: [
              { naam: "Stap 1", detail: "Geen corticosteroïden bij IPF." },
              { naam: "Stap 2", detail: "Longtransplantatie bij geschikte patiënten." },
              { naam: "Stap 3", detail: "Vroegtijdige palliatieve zorg en zuurstof bij hypoxemie." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Jonge man van 28 jaar. Bilaterale hilaire lymfadenopathie op thoraxfoto, erythema nodosum aan de benen, gewrichtspijn. Geen koorts. Diagnose?',
    a:['Sarcoidose (Löfgren-syndroom)','Tuberculose','Non-Hodgkin lymfoom','Mycoplasma-pneumonie'], c:0,
    ex:'Löfgren-syndroom: de klassieke triade van bilaterale hilaire lymfadenopathie + erythema nodosum + gewrichtspijnen is pathognomonisch voor acute sarcoidose. Prognose uitstekend: >80% spontane remissie.',
    wiki:{
          kern: "Sarcoidose is een multisysteemziekte met niet-verkazende granulomen. Löfgren-syndroom is de acute presentatievorm, typisch bij vrouwen in de vruchtbare leeftijd en Noord-Europese mannen.",
          mechanisme: [
            { title: "Stap 1", desc: "Onbekende trigger." },
            { title: "Stap 2", desc: "CD4+ T-helper cel activatie." },
            { title: "Stap 3", desc: "granulooomvorming. Verhoogd serum-ACE en hypercalciëmie (door 1,25-OH-vitamine D-productie in granulomen) zijn suggestief maar niet specifiek." },
          ],
          onderscheid: [
            { label: "Tuberculose", desc: "ook hilaire klieren maar asymmetrisch, koorts, nachtzweten, gewichtsverlies, positieve Quantiferon.", type: 'ok' },
            { label: "Lymfoom", desc: "asymmetrisch, B-symptomen.", type: 'warn' },
            { label: "Berylliose", desc: "beroepsblootstelling beryllium.", type: 'danger' },
          ],
          therapie: {
            urgent: "Löfgren: NSAID voor gewrichtsklachten, expectatief beleid gezien goede prognose.",
            stappen: [
              { naam: "Ernstige of persisterende sarcoidose", detail: "prednison." },
              { naam: "Chronisch", detail: "methotrexaat of hydroxychloroquine als steroïdsparend middel." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Patiënt met HIV (CD4+ 55 cellen/μL), koorts, droge hoest en progressieve dyspneu over 2 weken. Saturatie 88%. X-thorax: bilaterale vlindervormige infiltraten. Meest waarschijnlijke diagnose?',
    a:['Pneumocystis jirovecii pneumonie (PCP)','Bacteriële pneumonie','Tuberculose','CMV-pneumonitis'], c:0,
    ex:'PCP treedt op bij ernstige immunosuppressie (CD4+ <200/μL). Klassiek: subacuut beloop, droge hoest, progressieve dyspneu, lage saturatie, bilaterale vlindervormige infiltraten. LDH verhoogd. Behandeling: cotrimoxazol (TMP-SMX).',
    wiki:{
          kern: "Pneumocystis jirovecii is een schimmel die bij immuuncompetente personen latent aanwezig is. Bij CD4+ <200/μL: risico op ernstige pneumonie.",
          mechanisme: [
            { title: "Stap 1", desc: "P. jirovecii infecteert alveoli." },
            { title: "Stap 2", desc: "trofozoïten vullen alveolaire ruimte." },
            { title: "Stap 3", desc: "belemmerde gaswisseling." },
            { title: "Stap 4", desc: "hypoxemie. Verhoogd LDH is een marker van longparenchymschade." },
          ],
          onderscheid: [
            { label: "TB bij HIV", desc: "koorts, nachtelijk zweten, gewichtsverlies, cavernes of miliaire afwijkingen.", type: 'ok' },
            { label: "CMV-pneumonitis", desc: "ook bij ernstige HIV.", type: 'warn' },
            { label: "Bacteriële pneumonie", desc: "acuter, lobair, productief hoesten.", type: 'danger' },
          ],
          therapie: {
            urgent: "TMP-SMX (cotrimoxazol) 21 dagen.",
            stappen: [
              { naam: "Bij matige/ernstige PCP (PaO2 <70 mmHg)", detail: "prednisolon toevoegen vermindert mortaliteit." },
              { naam: "Stap 2", detail: "ART starten na stabilisatie." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Man van 62 jaar, ernstige pneumonie die niet reageert op amoxicilline. Bilaterale infiltraten op X-thorax. Legionella-urine-antigeen positief. Welk antibioticum is nu eerste keus?',
    a:['Levofloxacine intraveneus','Amoxicilline intraveneus','Benzylpenicilline intraveneus','Cotrimoxazol intraveneus'], c:0,
    ex:'Legionella pneumophila is een intracellulaire bacterie. Bètalactam-antibiotica (amoxicilline, penicilline) zijn ineffectief omdat zij de cel niet binnendringen. Eerste keus: fluoroquinolon (levofloxacine) of macrolide (azitromycine), bij voorkeur fluoroquinolon bij ernstige presentatie.',
    wiki:{
          kern: 'Legionella overleeft in alveolaire macrofagen — standaard bètalactams bereiken de intracellulaire locatie niet. Klassieke trias: hoge koorts + relatieve bradycardie + hyponatriëmie. Bron: besmet water (koeltorens, douchesystemen).',
          mechanisme: [
            { title: 'Intracellulaire bacterie', desc: 'Legionella vermenigvuldigt zich in macrofagen → bètalactams (amoxicilline, penicilline) die niet in cellen doordringen zijn ineffectief.' },
            { title: 'Atypisch beeld', desc: 'Verhoogd LDH, leverenzymafwijkingen, nierinsufficiëntie, hyponatriëmie. Bilaterale pneumonie, soms snel progressief.' },
            { title: 'Urine-antigeen', desc: 'Serogroep 1 (80% van gevallen) detecteerbaar in urine — snel en gevoelig. Bij negatief antigeen maar sterke verdenking: kweken op BCYE-agar.' },
          ],
          onderscheid: [
            { label: 'Legionella', desc: 'Hoge koorts, hyponatriëmie, verhoogd LDH, bilateraal. Urine-antigeen positief. Levofloxacine/azitromycine.', type: 'ok' },
            { label: 'Mycoplasma', desc: 'Jongere patiënt, mildere loop, koude agglutininen, macrolide gevoelig. Loopt soms op school/kazerne.', type: 'warn' },
            { label: 'S. pneumoniae', desc: 'Meest frequent, penicillinegevoelig, geen hyponatriëmie, geen LDH-stijging.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Levofloxacine 500 mg 2×/dag IV — eerste keus bij ernstige Legionella-pneumonie.',
            stappen: [
              { naam: 'Duur', detail: '10-14 dagen (langer dan standaard CAP — om recidief te voorkomen).' },
              { naam: 'Alternatief', detail: 'Azitromycine 500 mg 1×/dag IV bij mildere presentatie.' },
              { naam: 'Meldingsplicht', detail: 'Legionella is meldingsplichtig — bron-onderzoek verplicht om verspreiding te stoppen.' },
            ],
          },
        } },

  { type:'lab', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Arterieel bloedgas bij COPD-exacerbatie: pH 7.28, pCO2 72 mmHg, pO2 50 mmHg, HCO3- 32 mmol/L. Welke interpretatie is correct?',
    a:['Respiratoire acidose met metabole compensatie','Respiratoire alkalose met metabole compensatie','Gemengde metabole en respiratoire acidose','Metabole alkalose met respiratoire compensatie'], c:0,
    ex:'pH verlaagd (7.28) + pCO2 verhoogd (72) = respiratoire acidose als primaire stoornis. HCO3- verhoogd (32) = chronische renale compensatie. Dit is het klassieke acuut-op-chronisch CO2-retentiepatroon bij COPD.',
    wiki:{
          kern: 'Zuur-base stappenplan: (1) pH laag = acidose. (2) pCO2 hoog = respiratoire oorzaak. (3) HCO3- hoog = chronische renale compensatie. Verwacht HCO3 bij chronische respiratoire acidose: +3,5 mmol per 10 mmHg pCO2-stijging.',
          mechanisme: [
            { title: 'Alveolaire hypoventilatie', desc: 'CO2 accumuleert → carboonzuur → pH daalt (respiratoire acidose).' },
            { title: 'Chronische compensatie', desc: 'Nieren retineren HCO3- om pH te bufferen (dagen). HCO3- +3,5 mmol/10 mmHg pCO2-stijging.' },
            { title: 'Acuut-op-chronisch', desc: 'Patiënt had al verhoogd HCO3- door chronische CO2-retentie. Acute exacerbatie = pH daalt verder terwijl HCO3- al hoog is.' },
          ],
          onderscheid: [
            { label: 'Respiratoire acidose', desc: 'pH laag, pCO2 hoog, HCO3- hoog (compensatoir). Oorzaak: hypoventilatie (COPD, sedatie, neuromusculair).', type: 'ok' },
            { label: 'Metabole acidose', desc: 'pH laag, HCO3- laag, pCO2 laag (compensatoir). Oorzaak: DKA, nierfalen, melkzuuracidose.', type: 'warn' },
            { label: 'Respiratoire alkalose', desc: 'pH hoog, pCO2 laag. Oorzaak: hyperventilatie, sepsis, leverinsufficiëntie.', type: 'warn' },
          ],
          therapie: {
            urgent: 'NIV (non-invasieve beademing) bij pH <7.35 en pCO2 >45 — vermindert intubatiebehoefte en mortaliteit bij COPD-exacerbatie.',
            stappen: [
              { naam: 'Zuurstof gecontroleerd', detail: 'O2-saturatie doel 88-92% bij COPD met CO2-retentie. Venturi-masker 24-28% FiO2.' },
              { naam: 'Bronchodilatoren', detail: 'SABA + SAMA vernevelaars. Systemische corticosteroïden (prednisolon 40 mg/dag 5 dagen).' },
              { naam: 'Antibiotica', detail: 'Bij purulent sputum of koorts: amoxicilline of doxycycline 5 dagen.' },
            ],
          },
        } },


  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Vrouw van 45 jaar, recidiverende luchtweginfecties, dagelijks purulente sputumproductie, chronische hoest. CT-thorax: cilindrisch verwijde luchtwegen bibasaal. Diagnose?',
    a:['Bronchiëctasieën','COPD','Astma','Longfibrose'], c:0,
    ex:'Bronchiëctasieën: irreversibele verwijding van de luchtwegen zichtbaar op CT als "signet ring sign" (luchtweg groter dan begeleidend vat) en tram-track lijnen. Kenmerk: dagelijkse purulente sputumproductie en recidiverende infecties.',
    wiki:{
          kern: "Bronchiëctasieën ontstaan door destructie van de luchtwegwand door chronische infectie en ontsteking → irreversibele verwijding → secretiestase → verdere infectie (vicieuze cirkel). Meest frequente verwekkers: H. influenzae, P. aeruginosa (gevorderd stadium).",
          mechanisme: [
            { title: "Stap 1", desc: "HRCT is de gouden standaard." },
            { title: "Oorzaken zoeken", desc: "CF (sweat chloride test), primaire ciliaire dyskinesie (PCD), immunodeficiëntie (Ig-spiegels), post-tuberculose, post-infectieus." },
            { title: "Stap 3", desc: "In 50% idiopathisch." },
          ],
          onderscheid: [
            { label: "COPD", desc: "emfyseem + obstructie maar geen cilindrische verwijding op CT.", type: 'ok' },
            { label: "Astma", desc: "reversibel, geen structurele CT-afwijkingen.", type: 'warn' },
            { label: "CF", desc: "ook bronchiëctasieën maar met pancreasinsufficiëntie en verhoogd zweet-chloride.", type: 'danger' },
          ],
          therapie: {
            urgent: "Airway clearance (PEP, autogene drainage).",
            stappen: [
              { naam: "Exacerbaties", detail: "amoxicilline/co-amoxiclav; P. aeruginosa: ciprofloxacine." },
              { naam: "Stap 2", detail: "Chronisch macrolide (azitromycine 3×/week) bij frequente exacerbaties." },
            ],
          },
        } },

  { type:'diagnose', d:5, domain:'pulmo', dl:'Pulmonologie', subtype:'diff',
    q:'Welk klinisch kenmerk onderscheidt astma het meest betrouwbaar van COPD bij een patiënt met luchtwegobstructie?',
    a:['Significante reversibiliteit na bronchodilatator (FEV1-stijging >12% én >200 mL)','Piepende ademhaling bij auscultatie','Leeftijd onder de 40 jaar','Nachtelijke symptomen en hoest'], c:0,
    ex:'Reversibiliteit is het fysiologische sleutelcriterium: bij astma normaliseert of verbetert de FEV1 significant na salbutamol (>12% én >200 mL). Bij COPD is de obstructie per definitie niet volledig reversibel. Piepende ademhaling en nachtelijke klachten kunnen bij beide voorkomen.',
    wiki:{
          kern: 'Het centrale onderscheid tussen astma en COPD is reversibiliteit. Astma: FEV1 stijgt >12% én >200 mL na bronchodilatator. COPD: persistente obstructie (FEV1/FVC <0,70 postbronchodilatator).',
          mechanisme: [
            { title: 'Astma', desc: 'Eosinofiele ontsteking, IgE-gemedieerd of niet-atopisch, intermitterend. Luchtwegoverreactiviteit. Reversibel.' },
            { title: 'COPD', desc: 'Neutrofiele ontsteking, tabaksrook, emfyseem + chronische bronchitis. Persistent progressief. Irreversibel.' },
            { title: 'ACOS', desc: 'Overlap bij rokers met atopie — kenmerken van beide. Behandel beide componenten.' },
          ],
          onderscheid: [
            { label: 'Astma', desc: 'Jong, atopie, reversibiliteit na salbutamol, FeNO verhoogd, nachtelijke klachten, geen rookgeschiedenis.', type: 'ok' },
            { label: 'COPD', desc: 'Roker >10 pakjaar, >40j, persistente obstructie, emfyseem op CT, geen significante reversibiliteit.', type: 'warn' },
            { label: 'ACOS', desc: 'Roker mét atopie, deels reversibel. Beide behandelen: ICS + LABA + LAMA.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Acute astma-aanval: SABA (salbutamol) herhaald + O2 + systemisch prednisolon.',
            stappen: [
              { naam: 'Astma stappenschema', detail: 'Stap 1: SABA rescue. Stap 2: laagdosis ICS. Stap 3: ICS + LABA. Stap 4: hoge ICS + LABA ± LAMA. Stap 5: add-on biologicals (omalizumab, mepolizumab).' },
              { naam: 'COPD GOLD-stadia', detail: 'GOLD A: LAMA of LABA. GOLD B: LAMA + LABA. Frequent exacerbaties: +ICS of macrolide.' },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Wat is de meest frequente oorzaak van chronisch hoesten (>8 weken) bij een niet-rokende volwassene zonder afwijkingen op X-thorax?',
    a:['Postnasal drip (upper airway cough syndrome)','COPD','Longcarcinoom','Bronchiëctasieën'], c:0,
    ex:'De "big three" oorzaken van chronisch hoesten: (1) postnasal drip/UACS (~40%), (2) cough-variant astma (~25%), (3) GERD (~20%). Postnasal drip is de meest frequente oorzaak. Altijd ook ACE-remmer als iatrogene oorzaak uitsluiten.',
    wiki:{
          kern: 'De "big three" oorzaken van chronisch hoesten bij niet-rokers: (1) postnasal drip/UACS (~40%), (2) cough-variant astma (~25%), (3) GERD (~20%). Altijd ACE-remmers uitsluiten als iatrogene oorzaak.',
          mechanisme: [
            { title: 'Postnasal drip (UACS)', desc: 'Neussecretie druppelt naar keelholte → prikkeling hoestreflex. Behandel rhinitis/sinusitis.' },
            { title: 'Cough-variant astma', desc: 'Hoest als enige symptoom, geen dyspneu. Bevestig met bronchoprovocatietest (methacholine).' },
            { title: 'ACE-remmerhoest', desc: 'Bradykinine-accumulatie → hoestreflex bij 5-20% gebruikers. Stop ACE-remmer → hoest verdwijnt 4-8 weken.' },
          ],
          onderscheid: [
            { label: 'Postnasal drip', desc: 'Gevoel van druppelen achter keel, snuiten, allergiegeschiedenis. Behandel met antihistaminica + nasale steroïden.', type: 'ok' },
            { label: 'ACE-remmerhoest', desc: 'Droge hoest, begon na start ACE-remmer. Stop medicatie → hoest verdwijnt. Vervang door ARB.', type: 'warn' },
            { label: 'Longcarcinoom', desc: 'Roker, ouder, haemoptoë, gewichtsverlies — altijd uitsluiten! X-thorax/CT verplicht.', type: 'danger' },
            { label: 'GERD', desc: 'Hoest erger na maaltijd of liggend. Geen brandend maagzuur noodzakelijk ("silent reflux").', type: 'warn' },
          ],
          therapie: {
            urgent: 'ACE-remmer stoppen als medicamenteuze oorzaak — vervanging door ARB (geen bradykinine-effect).',
            stappen: [
              { naam: 'Postnasal drip', detail: 'Nasale steroïden (mometason) + non-sederende antihistaminica. Ophogen bij persisterend.' },
              { naam: 'Cough-variant astma', detail: 'ICS proefbehandeling 4-6 weken. Positief antwoord bevestigt diagnose.' },
              { naam: 'GERD', detail: 'PPI 2×/dag 8 weken proefbehandeling. Geen maaltijden laat, hoofdeinde bed omhoog.' },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'pulmo', dl:'Pulmonologie',
    q:'Bij een COPD-patiënt met chronische CO2-retentie moet bij een exacerbatie altijd 100% zuurstof worden gegeven om de saturatie zo snel mogelijk te normaliseren.',
    c:false,
    ex:'NIET WAAR. COPD-patiënten met chronische hypercapnie rijden deels op hypoxische ademhalingsaandrijving. Hoge zuurstofconcentraties kunnen de ademprikkel verminderen → CO2-retentie verergert. Target SpO2: 88-92% (Venturi-masker 24-28%).',
    wiki:{
          kern: 'Bij chronische hypercapnie raken centrale chemoceptoren gedesensibiliseerd voor CO2. 100% zuurstof bij COPD met CO2-retentie vermindert hypoxische ademprikkel → hypoventilatie → pCO2 stijgt verder. Doel: SpO2 88-92%.',
          mechanisme: [
            { title: 'Hypoxische drive', desc: 'Perifere (carotis)chemoceptoren reageren op O2 — bij hoog FiO2 vermindert dit signaal → verminderde ademprikkel → hypoventilatie.' },
            { title: 'Haldane-effect', desc: 'Zuurstof verdringt CO2 van hemoglobine → vrij CO2 stijgt in bloed. Bijdragend aan CO2-retentie bij hoge FiO2.' },
            { title: 'Venturi-masker', desc: 'Levert nauwkeurig 24-28% O2 onafhankelijk van ademfrequentie — geschikt voor gecontroleerde zuurstoftherapie.' },
          ],
          onderscheid: [
            { label: 'COPD met chronische hypercapnie', desc: 'Doel SpO2 88-92%. Venturi-masker 24-28%. Monitor pCO2 via bloedgas.', type: 'ok' },
            { label: 'Andere patiënten (geen CO2-retentie)', desc: 'Normaliseer saturatie >94%. Geen gevaar van CO2-retentie bij acuut zuurstofgebruik.', type: 'warn' },
            { label: 'NIV', detail: 'Bij respiratoire acidose pH <7.35: niet-invasieve beademing bovenop gecontroleerde O2.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Gecontroleerde O2 via Venturi-masker 24-28% — SpO2-doel 88-92%. Bloedgas na 30-60 min herhalen.',
            stappen: [
              { naam: 'NIV bij acidose', detail: 'pH <7.35 + pCO2 >45: non-invasieve beademing (BIPAP) — vermindert intubatiebehoefte bij COPD-exacerbatie.' },
              { naam: 'Vermijd hoge O2', detail: 'Geen non-rebreather masker bij chronische CO2-retentie — risico op hypoventilatiespiraal.' },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'pulmo', dl:'Pulmonologie',
    q:'Een negatieve D-dimeer sluit een longembolie uit bij een patiënt met een hoge klinische verdenking (Wells-score ≥7).',
    c:false,
    ex:'NIET WAAR. D-dimeer is een uitsluitingstest die alleen bruikbaar is bij lage of intermediaire klinische verdenking. Bij hoge verdenking (Wells ≥7) is de prevalentie van LE hoog — direct CT-pulmonalisangiografie uitvoeren, D-dimeer niet afnemen.',
    wiki:{
          kern: 'D-dimeer heeft een hoge sensitiviteit maar lage specificiteit — bruikbaar alleen bij lage of intermediaire klinische verdenking. Wells ≥7 = directe CT-PA, D-dimeer weglaten. Negatieve D-dimeer bij lage verdenking heeft NPV >99%.',
          mechanisme: [
            { title: 'Bayesiaanse redenering', desc: 'Bij hoge pre-test kans (Wells ≥7) is prevalentie van LE hoog. Een matig sensitieve test zoals D-dimeer kan de diagnose dan NIET uitsluiten.' },
            { title: 'Wells-score algoritme', desc: 'Score <2: PERC-regel toepassen of D-dimeer. Score 2-6: D-dimeer. Score ≥7: direct CT-PA.' },
            { title: 'D-dimeer verhoogd bij', desc: 'Infectie, trauma, kanker, zwangerschap, hoge leeftijd, postoperatief — lage specificiteit maakt het onbruikbaar als bevestigingstest.' },
          ],
          onderscheid: [
            { label: 'CT-PA', desc: 'Gouden standaard bij hoge of intermediaire Wells-score — toont lokalisatie, uitgebreidheid en alternatieven (pneumonie, pericard).', type: 'ok' },
            { label: 'V/Q-scintigrafie', desc: 'Alternatief bij contrastovergevoeligheid (allergie), nierfalen of zwangerschap (minder straling).', type: 'warn' },
            { label: 'Echo onderste extremiteiten', desc: 'Aanvullend bij DVT-vermoeden. Positieve DVT + klinische verdenking LE = behandel zonder CT.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Hoge Wells + hemodynamisch instabiel: systemische trombolyse (alteplase) of katheter-embolectomie.',
            stappen: [
              { naam: 'Anticoagulantia', detail: 'LMWH (enoxaparine) SC als overbrugging. Start DOAC (apixaban 10 mg 2×/dag 7 dagen, daarna 5 mg 2×/dag) — eenvoudiger dan VKA.' },
              { naam: 'Duur behandeling', detail: '3 maanden bij uitgelokte LE (chirurgie). 6 maanden bij idiopathisch. Levenslang bij recidief of maligniteit.' },
            ],
          },
        } },


  { type:'truefalse', d:2, domain:'pulmo', dl:'Pulmonologie',
    q:'Astma wordt gekenmerkt door irreversibele luchtwegobstructie die niet reageert op bronchodilatatoren.',
    c:false,
    ex:'NIET WAAR. Astma is per definitie een reversibele luchtwegobstructie. Een FEV1-stijging >12% én >200 mL na bronchodilatator is kenmerkend. Irreversibele obstructie is het onderscheidende kenmerk van COPD.',
    wiki:{
          kern: 'Astma is per definitie reversibele luchtwegobstructie. Reversibiliteitstesting: FEV1 stijgt >12% én >200 mL na salbutamol. COPD: persistente obstructie ook na bronchodilatator (FEV1/FVC <0,70).',
          mechanisme: [
            { title: 'Reversibiliteitstest', desc: 'FEV1 meten vóór en 15 min na salbutamol 400 mcg. Stijging >12% én >200 mL = significante reversibiliteit → astma.' },
            { title: 'Remodelling', desc: 'Langdurig niet-behandeld astma kan door structurele luchtwegverandering gedeeltelijk irreversibel worden. Vroeg behandelen voorkomt dit.' },
            { title: 'PEF-variabiliteit', desc: 'Dagelijkse PEF-meting >20% variatie over 2 weken bevestigt astma — eenvoudig diagnostisch hulpmiddel.' },
          ],
          onderscheid: [
            { label: 'Astma', desc: 'Reversibel, FEV1 normaal tussen aanvallen, atopie, jong, FeNO verhoogd.', type: 'ok' },
            { label: 'COPD', desc: 'FEV1/FVC <0,70 persistent ondanks bronchodilatator. Progressief, roker, ouder.', type: 'warn' },
            { label: 'Vocal cord dysfunction (VCD)', desc: 'Inspiratoire stridor, variabel, normale spirometrie buiten aanval. Behandeling: spraaktherapie.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Ernstige astma-aanval: salbutamol vernevelaar elke 20 min + ipratropium + prednisolon 40 mg + O2.',
            stappen: [
              { naam: 'Intermitterend (stap 1)', detail: 'SABA on demand. Geen onderhoudstherapie nodig.' },
              { naam: 'Mild persistent (stap 2)', detail: 'Laagdosis ICS dagelijks + SABA rescue.' },
              { naam: 'Matig-ernstig (stap 3-4)', detail: 'ICS + LABA combinatie. Bij onvoldoende controle: hoge ICS + LAMA toevoegen.' },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'pulmo', dl:'Pulmonologie',
    q:'Pleuravocht bij een patiënt met hartfalen voldoet aan de Light-criteria voor een exsudaat.',
    c:false,
    ex:'NIET WAAR. Hartfalen geeft een transsudaat: hydrostatische drukverhoging → eiwitarm vocht. Light-criteria voor exsudaat: vocht/serum-eiwit >0.5, of LDH-ratio >0.6, of LDH >2/3 van upper limit normaal. Hartfalen voldoet aan geen van deze criteria.',
    wiki:{
          kern: 'Pleuravocht classificatie met Light-criteria: exsudaat als vocht/serum-eiwit >0,5, LDH-ratio >0,6, of LDH >2/3 bovengrens normaal. Hartfalen geeft een transsudaat — voldoet niet aan Light-criteria.',
          mechanisme: [
            { title: 'Transsudaat-mechanisme', desc: 'Hartfalen → verhoogde pulmonale capillairdruk → eiwitarm vocht lekt in pleuraholte. Lage eiwitconcentratie → Light-criteria negatief.' },
            { title: 'Pseudo-exsudaat', desc: 'Na diuretica voor hartfalen: vocht wordt geconcentreerd → Light-criteria kunnen positief worden (pseudo-exsudaat). Gebruik albumine-gradiënt: serum-pleura albumine >1,2 g/dL → toch hartfalen.' },
            { title: 'Exsudaat-oorzaken', desc: 'Pneumonie, maligniteit, tuberculose, longembolie (verhoogde vasculaire permeabiliteit).' },
          ],
          onderscheid: [
            { label: 'Hartfalen (transsudaat)', desc: 'Light-criteria negatief, bilateraal, reageert op diuretica. Cave pseudo-exsudaat.', type: 'ok' },
            { label: 'Tuberculose (exsudaat)', desc: 'Lymfocytose, hoog ADA (>40 U/L), eenzijdig, jonge patiënt. ADA-test is snel en goedkoop.', type: 'warn' },
            { label: 'Maligniteit (exsudaat)', desc: 'Bloederig, cytologie positief, hoog LDH. Eenzijdig, gewichtsverlies, roken.', type: 'danger' },
            { label: 'Chylothorax', desc: 'Triglycerides >1,24 mmol/L in pleuravocht — chijleuze ductus beschadigd (trauma, lymfoom).', type: 'warn' },
          ],
          therapie: {
            urgent: 'Grote effusie met dyspneu: therapeutische thoracentese (drainage 1-1,5 L max per sessie).',
            stappen: [
              { naam: 'Hartfalen', detail: 'Diuretica (furosemide). Hartfalen optimaliseren — effusie verdwijnt als hartfalen herstelt.' },
              { naam: 'Parapneumonisch', detail: 'Antibiotica voor pneumonie. Bij gelocaliseerd exsudaat met laag pH (<7.20): drainage via thoraxdrain.' },
              { naam: 'Maligne effusie', detail: 'Herhaalde thoracentese of pleurodese (talcpoeder) voor palliatieve drainage.' },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'pulmo', dl:'Pulmonologie',
    q:'Longcarcinoom is wereldwijd de meest voorkomende oorzaak van kankersterfte bij zowel mannen als vrouwen.',
    c:true,
    ex:'WAAR. Longcarcinoom is de voornaamste oorzaak van kankersterfte wereldwijd bij mannen én vrouwen. De 5-jaarsoverleving is <20% door laattijdige diagnose: 75% presenteert zich met gevorderd stadium.',
    wiki:{
          kern: 'Longcarcinoom: NSCLC (85%) versus SCLC (15%). NSCLC: adenocarcinoom (ook niet-rokers, EGFR-mutaties), plaveiselcel (rokers, centraal). SCLC: bijna uitsluitend rokers, snel groeiend, vroeg metastaserend, paraneoplastische syndromen.',
          mechanisme: [
            { title: 'Adenocarcinoom', desc: 'Perifeer, ook bij niet-rokers (Aziatische vrouwen: EGFR-mutaties bij 40-60%). Gerichte therapie: erlotinib, gefitinib, osimertinib.' },
            { title: 'Plaveiselcelcarcinoom', desc: 'Centraal, sterk gerelateerd aan roken, hemoptoë. Cavitaties mogelijk. Squamous cell carcinoma marker.' },
            { title: 'SCLC', desc: 'Snel groeiend, vroeg metastaserend. Paraneoplastische syndromen: SIADH, ectopisch ACTH (Cushing), Eaton-Lambert.' },
          ],
          onderscheid: [
            { label: 'NSCLC (adenocarcinoom)', desc: 'Perifeer, vroeg stadium chirurgie. EGFR-mutatie: TKI. PD-L1 positief: immunotherapie (pembrolizumab).', type: 'ok' },
            { label: 'SCLC', desc: 'Chemotherapie + radiotherapie. Chirurgie zelden mogelijk. Snel recidief. Paraneoplastische syndromen.', type: 'danger' },
            { label: 'Metastasen', desc: 'Longmetastasen van andere primaire tumor (borst, colon, nieren) — CT/PET ter onderscheid.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Hemoptyse bij longcarcinoom: CT-angiografie, eventueel bronchiale arterieëmbolisatie.',
            stappen: [
              { naam: 'Stadium I-II NSCLC', detail: 'Chirurgische resectie (lobectomie) — curatief. Adjuvante chemotherapie bij positieve klieren.' },
              { naam: 'Stadium III-IV NSCLC', detail: 'Mutatie-testen: EGFR, ALK, ROS1, PD-L1. Gerichte therapie of immunotherapie + chemotherapie.' },
              { naam: 'Screening', detail: 'Lage-dosis CT bij rokers >20 pakjaar en leeftijd 50-80j — vermindert mortaliteit 20% (NLST-studie).' },
            ],
          },
        } },

  { type:'diagnose', d:5, domain:'pulmo', dl:'Pulmonologie', subtype:'test',
    q:'Bij welke patiënt is spirometrie het meest geëigende eerstelijns diagnostische onderzoek?',
    a:['55-jarige roker met progressieve dyspneu bij inspanning en hoest','22-jarige met acute pleuritische pijn en dyspneu','Patiënt met hoge koorts, productieve hoest en lobair infiltraat','Patiënt met hemodynamische instabiliteit en tachycardie 120/min'], c:0,
    ex:'Spirometrie is het diagnostisch instrument voor chronische luchtwegziekten (COPD, astma) bij patiënten met chronische klachten. Bij acute presentaties (pneumothorax, longembolie, pneumonie) zijn andere onderzoeken prioritair. Spirometrie is niet nuttig in de acute setting.',
    wiki:{
          kern: 'Spirometrie is het diagnostische instrument voor chronische luchtwegobstructie. COPD-diagnose vereist postbronchodilatator FEV1/FVC <0,70. Astma: reversibiliteitstest >12% én >200 mL. Niet nuttig in acute setting.',
          mechanisme: [
            { title: 'Obstructief patroon', desc: 'FEV1/FVC <0,70 postbronchodilatator = COPD. FEV1 verlaagd, FVC normaal of licht verlaagd.' },
            { title: 'Restrictief patroon', desc: 'FVC verlaagd, FEV1/FVC normaal of verhoogd. Oorzaken: pulmonale fibrose, obesitas, pleuravocht, neuromusculaire aandoening.' },
            { title: 'COPD GOLD-stadiëring', desc: 'Gebaseerd op FEV1 na bronchodilatator: GOLD 1 FEV1 ≥80%, GOLD 2 50-80%, GOLD 3 30-50%, GOLD 4 <30%.' },
          ],
          onderscheid: [
            { label: 'Spirometrie', desc: 'Chronische klachten, vermoeden COPD/astma, preoperatief. Niet voor acute ziektebeelden.', type: 'ok' },
            { label: 'X-thorax', desc: 'Acute presentatie, structuurafwijkingen, cardiomegalie. Eerste stap bij acuut.', type: 'warn' },
            { label: 'CT-PA', desc: 'Verdenking longembolie, emfyseem-evaluatie, maligniteit.', type: 'warn' },
            { label: 'Bloedgas', desc: 'Acuut zuur-base-probleem, oxygenatie, CO2-retentie. Aanvullend op spirometrie bij ernstige COPD.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Spirometrie is diagnostisch — geen directe therapeutische implicatie anders dan diagnose stellen.',
            stappen: [
              { naam: 'Na COPD-diagnose', detail: 'Start LAMA of LABA monotherapie. Stoppen met roken als prioriteit. Longrevalidatie.' },
              { naam: 'Na astma-diagnose', detail: 'ICS als onderhoudstherapie. Reversibiliteitstest herhalen na 4-6 weken behandeling.' },
              { naam: 'Preoperatief', detail: 'FEV1 <1L: verhoogd perioperatief risico. FEV1 <0,8L: hoog risico → anesthesiologisch overleg.' },
            ],
          },
        } },


  // ── GASTRO-ENTEROLOGIE ──
  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 55 jaar, 4 weken melena, gebruik van ibuprofen al 2 maanden. Hemoglobine 7.4 g/dL. Meest waarschijnlijke oorzaak?',
    a:['NSAID-geïnduceerd maagulcus','Colorectaal carcinoom','Oesofagusvarices','Diverticulose colon'], c:0,
    ex:'NSAID-gebruik is de meest frequente iatrogene oorzaak van bovenste GI-bloedingen. NSAIDs remmen COX-1 → verminderde prostaglandinesynthese → verzwakte maagslijmvliesbarrière → ulcusvorming. Melena = bloed uit bovenste GI-tractus.',
    wiki:{
          kern: "Melena (zwarte teerachtige ontlasting) ontstaat door oxidatie van hemoglobine in de darm, wat aangeeft dat de bloedingsbron zich boven het colon transversum bevindt. Maagulcera en duodenumulcera zijn samen de meest voorkomende oorzaak van bovenste GI-bloeding.",
          mechanisme: [
            { title: "Stap 1", desc: "NSAIDs: remming COX-1." },
            { title: "Stap 2", desc: "prostaglandin E2-synthese daalt." },
            { title: "Stap 3", desc: "maagslijmvlies wordt niet beschermd (minder mucus en bicarbonaat, verminderde doorbloeding). Risicofactoren voor NSAID-ulcus: leeftijd >65j, H. pylori co-infectie, hoge NSAID-dosis, gelijktijdig corticosteroïdgebruik." },
          ],
          onderscheid: [
            { label: "Colorectaal carcinoom", desc: "eerder rood bloed bij de ontlasting of occult bloedverlies + gewichtsverlies.", type: 'ok' },
            { label: "Oesofagusvarices", desc: "bij levercirrose, plotse hematemese.", type: 'warn' },
            { label: "Diverticulose", desc: "lager GI, eerder helder rood bloed, geen melena.", type: 'danger' },
          ],
          therapie: {
            urgent: "Stop NSAID.",
            stappen: [
              { naam: "Stap 1", detail: "PPI IV (esomeprazol of pantoprazol)." },
              { naam: "Stap 2", detail: "Spoed-endoscopie binnen 24u." },
              { naam: "Bij actieve bloeding", detail: "endoscopische hemostase (clips, coagulatie)." },
              { naam: "Stap 4", detail: "H. pylori-eradicatie indien aangetoond." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Vrouw van 28 jaar, bloederige diarree >6 weken, buikkrampen, gewichtsverlies. Colonoscopie: continue ontsteking van rectum proximaal uitbreidend, geen skip-lesions. Diagnose?',
    a:['Colitis ulcerosa','Ziekte van Crohn','Infectieuze colitis','Ischemische colitis'], c:0,
    ex:'Colitis ulcerosa: continue ontsteking starting in het rectum, proximaal uitbreidend, geen skip-lesions, alleen mucosa aangedaan. Crohn: discontinue ontsteking (skip-lesions), transmurale ontsteking, kan overal in de darm voorkomen.',
    wiki:{
          kern: "IBD: chronische immuungemedieerde darmontstekingen. CU beperkt zich tot de mucosa van het colon, altijd met rectumbetrokkenheid.",
          mechanisme: [
            { title: "CU", desc: "mucosal ulceraties, cryptabcessen, pseudopoliepen." },
            { title: "Stap 2", desc: "Risico op colorectaal carcinoom na 8-10 jaar actieve CU → surveillance colonoscopie." },
            { title: "Crohn", desc: "slijmvliesafwijkingen, fistels, stenosen, perianale ziekte." },
          ],
          onderscheid: [
            { label: "Infectieuze colitis", desc: "acuut beloop, kweek positief (Campylobacter, Salmonella, C. diff).", type: 'ok' },
            { label: "Ischemische colitis", desc: "ouderen, vasculaire risicofactoren, splenic flexure-verdeling.", type: 'warn' },
            { label: "Microscopische colitis", desc: "waterige diarree, normaal colonoscopiebeeld.", type: 'danger' },
          ],
          therapie: {
            urgent: "CU remissie-inductie: 5-ASA (mesalazine) voor milde/matige ziekte; corticosteroïden bij matig/ernstig beloop.",
            stappen: [
              { naam: "Onderhoud", detail: "5-ASA." },
              { naam: "Stap 2", detail: "Biologicals (infliximab, vedolizumab) bij therapieresistentie." },
              { naam: "Stap 3", detail: "Chirurgie (colectomie) bij ernstige of therapieresistente CU." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 45 jaar, acute epigastrische pijn uitstralend naar de rug, misselijkheid, braken. Amylase 850 U/L (normaal <100). Meest waarschijnlijke oorzaak?',
    a:['Acute pancreatitis door galstenen of alcohol','Maagperforatie','Mesenteriale ischemie','Aortadissectie'], c:0,
    ex:'Acute pancreatitis: verhoogd amylase >3× normaal bij epigastrische pijn uitstralend naar de rug. Meest voorkomende oorzaken: galstenen (45%) en alcohol (35%). Diagnose bij ≥2 van de 3 criteria: typische pijn, amylase/lipase >3×normaal, beeldvorming.',
    wiki:{
          kern: "Amylase en lipase stijgen bij pancreatitis. Lipase is specifieker (amylase ook verhoogd bij nierinsufficiëntie, speekselklierafwijkingen, darmischemie).",
          mechanisme: [
            { title: "Stap 1", desc: "Vroegtijdige activatie van trypsine." },
            { title: "Stap 2", desc: "auto-digestie van het pancreas." },
            { title: "Stap 3", desc: "lokale en systemische inflammatie. Galsteenpancreatitis: steen blokkeert ductus pancreaticus." },
            { title: "Stap 4", desc: "obstructie. Alcoholpancreatitis: directe toxiciteit op acinaire cellen." },
          ],
          onderscheid: [
            { label: "Maagperforatie", desc: "rigide buik, pneumoperitoneum op X-thorax.", type: 'ok' },
            { label: "Mesenteriale ischemie", desc: "ouder, vasculaire risicofactoren, pijn erger dan bevindingen.", type: 'warn' },
            { label: "Aortadissectie", desc: "scheurende pijn, bloeddrukasymmetrie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Conservatief: niets per os initieel, agressieve IV vochtsuppletie (Ringer-lactaat geprefereerd), pijnstilling.",
            stappen: [
              { naam: "Galsteenpancreatitis", detail: "ERCP bij biliaire obstructie + cholecystectomie tijdens zelfde opname." },
              { naam: "Geïnfecteerde necrose", detail: "antibiotica + drainage." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 62 jaar, geleidelijk toegenomen geelzucht, gewichtsverlies, pijnloos. Echo abdomen: verwijde galwegen, hypoechogene massa in caput pancreatis. Meest waarschijnlijke diagnose?',
    a:['Pancreascarcinoom','Choledocholithiasis','Primaire scleroserende cholangitis','Hepatocellulair carcinoom'], c:0,
    ex:'Pijnloze obstructieve icterus + massa in pancreaskop is klassiek voor pancreascarcinoom. Courvoisier-teken: palpabele, niet-pijnlijke galblaas bij geelzucht wijst op maligne obstructie (niet op galstenen, die geven een gecontraheerde galblaas).',
    wiki:{
          kern: "Pancreascarcinoom: 5-jaarsoverleving <10% door laattijdige diagnose. Adenocarcinoom van het ductale epitheel (95%).",
          mechanisme: [
            { title: "Stap 1", desc: "Obstructie van de ductus choledochus." },
            { title: "Stap 2", desc: "gal kan niet naar darm." },
            { title: "Stap 3", desc: "geconjugeerd bilirubine stijgt in bloed." },
            { title: "Stap 4", desc: "icterus, donkere urine, ontkleurde ontlasting. Verwijding van galwegen en galblaas door obstructie (Courvoisier)." },
          ],
          onderscheid: [
            { label: "Choledocholithiasis", desc: "pijnlijke icterus, koorts (Charcot-trias), galstenen op echo.", type: 'ok' },
            { label: "PSC", desc: "galgangsvernauwingen en -verwijd, geassocieerd met colitis ulcerosa.", type: 'warn' },
            { label: "HCC", desc: "bij levercirrose, AFP verhoogd.", type: 'danger' },
          ],
          therapie: {
            urgent: "Resectabel: Whipple-procedure (pancreaticoduodenectomie).",
            stappen: [
              { naam: "Palliatief", detail: "galwegdrainage via ERCP (stent), chemotherapie (FOLFIRINOX of gemcitabine+nab-paclitaxel)." },
              { naam: "Stap 2", detail: "Prognose slecht bij gemetastaseerde ziekte." },
            ],
          },
        } },

  { type:'pharma', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Via welk mechanisme verlagen protonpompremmers (PPI\'s) de maagzuurproductie?',
    a:['Irreversibele blokkade van H+/K+-ATPase in parietaalcellen','Blokkade van H2-receptoren op parietaalcellen','Neutralisatie van maagzuur door basische verbindingen','Remming van gastrine-afgifte door G-cellen'], c:0,
    ex:'PPI\'s (omeprazol, pantoprazol) blokkeren irreversibel de H+/K+-ATPase (protonpomp) in de parietaalcellen → meest effectieve remming van maagzuurproductie. H2-blokkers (ranitidine) blokkeren H2-receptoren maar zijn minder effectief.',
    wiki:{
          kern: "PPI's zijn prodrugs die geactiveerd worden in het zure milieu van de parietaalcel. Na activatie binden ze covalent aan de H+/K+-ATPase → irreversibele remming tot nieuwe pomp gesynthetiseerd is (24-48u). Meest effectieve zuurremming.",
          mechanisme: [
            { title: 'H+/K+-ATPase blokkade', desc: 'PPI wordt geactiveerd bij pH <2 → covalente binding aan cysteïne van de protonpomp → irreversibele remming. Dagelijks ingenomen voor maaltijd (pomp is dan actief).' },
            { title: 'H2-blokkers (cimetidine)', desc: "Remmen histamine-gestimuleerde zuurproductie — minder effectief dan PPI's. Sneller effect maar kortere duur." },
            { title: 'Langdurig gebruik', desc: 'Hypomagnesiëmie, vitamine B12-tekort, verhoogd Clostridioides difficile-risico, osteoporose. Minimale effectieve dosis gebruiken.' },
          ],
          onderscheid: [
            { label: 'PPI indicaties', desc: 'GERD, maagulcus, H. pylori-eradicatie (tripeltherapie), NSAID-gastroprotectie bij risicopatiënten, Zollinger-Ellison.', type: 'ok' },
            { label: 'H2-blokkers', desc: 'Minder effectief dan PPI — bruikbaar bij milde GERD of als aanvulling (nachtelijke zuurbreuk).', type: 'warn' },
            { label: 'Antacida', desc: 'Symptomatische verlichting snel maar kortdurend (1-2u). Geen healing van ulcera of oesofagitis.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Hoge-risico GI-bloeding: IV PPI (pantoprazol) continue infusie vóór endoscopie — vermindert actief bloedende Forrest Ia laesies.',
            stappen: [
              { naam: 'GERD', detail: 'Omeprazol/pantoprazol 20-40 mg 1×/dag, 30 min voor ontbijt. 4-8 weken, daarna probeer af te bouwen.' },
              { naam: 'Ulcus duodeni', detail: 'PPI + H. pylori-eradicatie (amoxicilline + clarithromycine + PPI 7-14 dagen). Na eradicatie: PPI 4 weken.' },
              { naam: 'Langdurig gebruik', detail: 'Laagst effectieve dosis. Jaarlijkse herevaluatie of PPI nog nodig.' },
            ],
          },
        } },


  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Vrouw van 52 jaar, pijn rechter bovenbuik na vette maaltijden, misselijkheid. Echo abdomen: galstenen zichtbaar, galblaas normaal groot. Diagnose?',
    a:['Symptomatische cholecystolithiasis','Acute cholecystitis','Choledocholithiasis','Hepatitis A'], c:0,
    ex:'Symptomatische cholecystolithiasis (galsteenkolieken): pijn rechter bovenbuik na maaltijden, misselijkheid, galblaas normaal groot op echo. Bij acute cholecystitis is de galblaas vergroot, wandverdikt, met positief Murphy-teken.',
    wiki:{
          kern: "Galstenen aanwezig bij 10-15% van de westerse bevolking. Meeste asymptomatisch.",
          mechanisme: [
            { title: "Murphy-teken", desc: "palpatie van de rechter bovenbuik tijdens inspiratie → pijn door druk op ontstoken galblaas." },
            { title: "Stap 2", desc: "Positief bij acute cholecystitis." },
            { title: "Stap 3", desc: "Charcot-trias (pijn + koorts + icterus) = cholangitis door steen in ductus choledochus." },
          ],
          onderscheid: [
            { label: "Acute cholecystitis", desc: "koorts, leukocytose, verdikt galblaaswan op echo, positief Murphy.", type: 'ok' },
            { label: "Choledocholithiasis", desc: "icterus, verhoogd bilirubine en alkalisch fosfatase.", type: 'warn' },
            { label: "Hepatitis A", desc: "ook rechter bovenbuikpijn maar icterus, verhoogd ALAT/ASAT.", type: 'danger' },
          ],
          therapie: {
            urgent: "Cholecystectomie (laparoscopisch): bij symptomatische cholecystolithiasis de enige curatieve behandeling.",
            stappen: [
              { naam: "Acuut cholecystitis", detail: "eerst antibiotica + pijnstilling, cholecystectomie binnen 72u of na 6 weken." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 38 jaar, recidiverende episoden van abdominale pijn, opgeblazen gevoel, afwisselend diarree en obstipatie, al jaren. Geen gewichtsverlies, bloed bij ontlasting negatief. Colonoscopie normaal. Diagnose?',
    a:['Prikkelbare darmsyndroom (IBS)','Colitis ulcerosa','Ziekte van Crohn','Colorectaal carcinoom'], c:0,
    ex:'IBS: functionele darmaandoening zonder organische pathologie. Rome IV-criteria: recidiverende buikpijn ≥1 dag/week de afgelopen 3 maanden, geassocieerd met defecatieverandering en/of consistentiewijziging van de ontlasting. Uitsluiting organische pathologie is essentieel.',
    wiki:{
          kern: "IBS treft 10-15% van de bevolking. Subtypes: IBS-D (diarree-dominant), IBS-C (obstipatie-dominant), IBS-M (gemengd).",
          mechanisme: [
            { title: "Stap 1", desc: "Viscerale hypersensitiviteit, gestoorde darm-hersenas communicatie, microbioomveranderingen." },
            { title: "Mogelijke triggers", desc: "stress, voeding (FODMAP), infectie (post-infectieus IBS)." },
            { title: "Stap 3", desc: "Geen structurele afwijkingen op beeldvorming of biopsie." },
          ],
          onderscheid: [
            { label: "IBD (CU/Crohn)", desc: "bloederige diarree, gewichtsverlies, afwijkingen op colonoscopie en biopsie, verhoogde CRP/calprotectine.", type: 'ok' },
            { label: "Alarm signs (\"red flags\") bij IBS", desc: "bloed in ontlasting, gewichtsverlies, nachtelijke klachten, positieve familieanamnese colorectaal carcinoom → aanvullend onderzoek.", type: 'warn' },
          ],
          therapie: {
            urgent: "Leefstijladviezen: low-FODMAP dieet, stressmanagement.",
            stappen: [
              { naam: "Farmacologisch", detail: "spasmolytica (mebeverine), loperamide bij IBS-D, laxantia bij IBS-C." },
              { naam: "Stap 2", detail: "Psychologische therapie effectief bij ernstige klachten." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 50 jaar, verhoogd ALAT (5×ULN), vermoeidheid, rechter bovenbuikongemak. Hij drinkt geen alcohol. Echo: verhoogde echogeniciteit lever. BMI 34, diabetes type 2. Meest waarschijnlijke diagnose?',
    a:['Non-alcoholische leververvetting (NAFLD/NASH)','Alcoholische hepatitis','Virale hepatitis B','Primaire biliaire cholangitis'], c:0,
    ex:'NAFLD/NASH: leversteatos bij afwezigheid van significante alcoholconsumptie. Sterk geassocieerd met obesitas, diabetes type 2 en metabool syndroom. NASH (non-alcoholische steatohepatitis) kan progresseren naar cirrose.',
    wiki:{
          kern: "NAFLD = spectrum van leveraandoeningen: eenvoudige steatose (NAFL) tot steatohepatitis (NASH) tot cirrose. Prevalentie 25% in de westerse bevolking, stijgend door de obesitasepidemie.",
          mechanisme: [
            { title: "Stap 1", desc: "Insulineresistentie." },
            { title: "Stap 2", desc: "lipide-accumulatie in hepatocyten." },
            { title: "Stap 3", desc: "oxidatieve stress." },
            { title: "Stap 4", desc: "ontsteking." },
            { title: "Stap 5", desc: "fibrose. Tweede stap: mitochondriaal disfunctioneren, intestinale dysbiose, adipokinedebalans." },
          ],
          onderscheid: [
            { label: "Alcoholische hepatitis", desc: "alcohol-anamnese, ASAT/ALAT-ratio >2:1.", type: 'ok' },
            { label: "Virale hepatitis B/C", desc: "serologie positief.", type: 'warn' },
            { label: "PBC", desc: "vrouwen middelbaren leeftijd, AMA positief, pruritus, cholestasepatroon.", type: 'danger' },
          ],
          therapie: {
            urgent: "Gewichtsreductie (10% gewichtsverlies verbetert histologie significant).",
            stappen: [
              { naam: "Stap 1", detail: "Behandeling metabole risicofactoren (diabetes, hypertensie, dyslipidemie)." },
              { naam: "Stap 2", detail: "Vitamine E bij NASH zonder diabetes." },
              { naam: "Stap 3", detail: "Geen specifieke farmacologische therapie bewezen effectief; nieuwe middelen in onderzoek." },
            ],
          },
        } },

  { type:'diagnose', d:5, domain:'gastro', dl:'Gastro-enterologie', subtype:'diff',
    q:'Welk symptoom onderscheidt de ziekte van Crohn het meest van colitis ulcerosa?',
    a:['Perianale fistels en abcessen','Bloederige diarree','Buikkrampen','Verhoogd CRP bij opvlamming'], c:0,
    ex:'Perianale fistels zijn karakteristiek voor de ziekte van Crohn door de transmurale, discontinue ontsteking die fistels kan veroorzaken. Bij colitis ulcerosa (mucosale ontsteking, alleen colon) komen perianale fistels niet voor. Bloederige diarree, buikkrampen en verhoogd CRP kunnen bij beide voorkomen.',
    wiki:{
          kern: 'Crohn vs CU: Crohn is transmuraal (skip-lesions, perianale fistels, kan ileum en mondholte treffen). CU is mucosaal en continu, altijd rectum betrokken, nooit peranale fistels.',
          mechanisme: [
            { title: 'Transmuraal (Crohn)', desc: 'Alle lagen darmwand aangedaan → fistelvorming (perianaal, enterovesicaal), stenosen, perforatie, abcessen.' },
            { title: 'Mucosaal (CU)', desc: 'Alleen mucosa en submucosa aangedaan — continu vanaf rectum proximaal. Geen skip-lesions, geen perianale fistels.' },
            { title: 'Serologie', desc: 'ASCA (anti-Saccharomyces cerevisiae) positief bij Crohn (60%). pANCA positief bij CU (65%). Niet diagnostisch — adjuvant.' },
          ],
          onderscheid: [
            { label: 'Crohn', desc: 'Skip-lesions, transmuraal, perianale fistels, ileumbetrokkenheid, granulomen op biopsie. ASCA positief.', type: 'ok' },
            { label: 'Colitis ulcerosa', desc: 'Continu rectum → proximaal, alleen colon, mucosaal, geen fistels, PSC als extraïntestinale manifestatie. pANCA positief.', type: 'warn' },
            { label: 'Infectieuze colitis', desc: 'Acuut begin, koorts, positieve kweek (Campylobacter, Salmonella, C. difficile). Biopsie: geen chronische veranderingen.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Ernstige opvlamming: prednisolon 40 mg/dag oraal of IV methylprednisolon. Biologicals bij steroïdrefractair.',
            stappen: [
              { naam: 'Milde Crohn', detail: 'Budesonide (ileocolische Crohn). Azathioprine/6-MP als onderhoud.' },
              { naam: 'Matig-ernstige Crohn', detail: 'Anti-TNF (infliximab, adalimumab) of vedolizumab/ustekinumab bij falen.' },
              { naam: 'CU', detail: 'Mesalazine (5-ASA) oraal + rectaal bij milde CU. Sterke opvlamming: IV steroïden → biologicals.' },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Vrouw van 35 jaar, zuurbranden na maaltijden, regurgitatie, nachtelijke hoest. Klachten verbeteren bij het hoofd hoog leggen. Welke diagnose is het meest waarschijnlijk?',
    a:['Gastro-oesofageale refluxziekte (GERD)','Maagulcus','Achalasie','Eosinofiele oesofagitis'], c:0,
    ex:'GERD: klassiek zuurbranden + regurgitatie, verergering liggend of na maaltijden, verbetering bij antacida/PPI en hoofd hoog leggen. Nachtelijke hoest en heesheid zijn atypische manifestaties van GERD door laryngeale irritatie.',
    wiki:{
          kern: "GERD: maaginhoud stroomt terug in de slokdarm door insufficiënte lagere oesofageale sfincter. Prevalentie 10-20% in de westerse wereld.",
          mechanisme: [
            { title: "Barrett-oesofagus", desc: "metaplasie van plaveiselcelpitheel naar cilindrisch darmepitheel door chronische blootstelling aan maagzuur." },
            { title: "Stap 2", desc: "Risicofactor voor oesofagusadenocarcinoom (30-40× verhoogd risico)." },
            { title: "Stap 3", desc: "Surveillance endoscopie elke 3-5 jaar." },
          ],
          onderscheid: [
            { label: "Achalasie", desc: "dysfagie voor vaste én vloeibare voeding, regurgitatie ongericht, manometrie: verhoogde LOS-druk.", type: 'ok' },
            { label: "Eosinofiele oesofagitis", desc: "dysfagie jongeren, bolus-impactie, eosinofilie op biopsie.", type: 'warn' },
            { label: "Maagulcus", desc: "epigastrische pijn, afhankelijk van maaltijd.", type: 'danger' },
          ],
          therapie: {
            urgent: "Leefstijl: gewichtsreductie, hoofd hoog slapen, vermijden van triggers (alcohol, koffie, chocola, vet).",
            stappen: [
              { naam: "Stap 1", detail: "PPI 4-8 weken." },
              { naam: "Stap 2", detail: "Onderhoudstherapie bij recidief." },
              { naam: "Stap 3", detail: "Fundoplicatie (chirurgie) bij therapieresistentie." },
            ],
          },
        } },


  { type:'truefalse', d:2, domain:'gastro', dl:'Gastro-enterologie',
    q:'Helicobacter pylori-infectie is een risicofactor voor zowel maagulcus als maagcarcinoom.',
    c:true,
    ex:'WAAR. H. pylori is aanwezig bij >90% van de duodenumulcera en ~70% van de maagulcera. Het is ook geclassificeerd als IARC groep 1 carcinogeen voor maagcarcinoom. Eradicatie vermindert ulcusrecidief en het carcinoomrisico.',
    wiki:{
          kern: 'H. pylori koloniseert de maagmucosa en veroorzaakt chronische gastritis. Risicofactor voor duodenumulcus (>90%), maagulcus (~70%), MALT-lymfoom en maagcarcinoom. Eradicatie vermindert ulcusrecidief en carcinoomrisico.',
          mechanisme: [
            { title: 'Virulentiefactoren', desc: 'CagA (oncoproteïne) en VacA (vacuoliserende cytotoxine) → mucosale inflammatie → atrofische gastritis → intestinale metaplasie → maagcarcinoom.' },
            { title: 'Ulcusmechanisme', desc: 'H. pylori vermindert mucosale afweer en verhoogt gastrineproductie → zuurhypersecretie → ulcus.' },
            { title: 'MALT-lymfoom', desc: 'Mucosa-associated lymphoid tissue lymfoom — bij 70-80% genezing na H. pylori-eradicatie alleen.' },
          ],
          onderscheid: [
            { label: 'Ureumademtest (UBT)', desc: 'Gouden standaard voor non-invasieve diagnose én verificatie eradicatie. Stop PPI 2 weken voor test.', type: 'ok' },
            { label: 'Fecesantigeen', desc: 'Alternatief voor UBT — stop PPI 2 weken. Goedkoop en betrouwbaar.', type: 'warn' },
            { label: 'Biopsie (CLO-test/histologie)', desc: 'Bij gastroscopie — direct tijdens endoscopie. Nodig bij alarm-symptomen of therapiefalen.', type: 'warn' },
            { label: 'Serologie', desc: 'Bewijst blootstelling, niet actieve infectie — niet geschikt voor eradicatiecontrole.', type: 'danger' },
          ],
          therapie: {
            urgent: 'Tripeltherapie 7-14 dagen: PPI + amoxicilline + clarithromycine (claritromax). Of quadrupaltherapie bij resistentie.',
            stappen: [
              { naam: 'Tripeltherapie', detail: 'PPI 2×/dag + amoxicilline 1g 2×/dag + clarithromycine 500 mg 2×/dag × 7-14 dagen.' },
              { naam: 'Bij penicillineallergie', detail: 'PPI + metronidazol + clarithromycine (of bismut-quadrupaltherapie).' },
              { naam: 'Eradicatiecontrole', detail: 'Ureumademtest 4-6 weken na einde antibiotica (PPI 2 weken gestopt). Eradicatie in >95% bij adequate therapie.' },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'gastro', dl:'Gastro-enterologie',
    q:'Bij verdenking op een bovenste GI-bloeding moet altijd eerst een CT-scan van het abdomen worden verricht vóór endoscopie.',
    c:false,
    ex:'NIET WAAR. Spoed-endoscopie (gastroscopie) binnen 24 uur is de eerste keus bij een bovenste GI-bloeding. Endoscopie is zowel diagnostisch als therapeutisch (hemostase mogelijk). CT-angiografie wordt pas overwogen als endoscopie mislukt of als bron onduidelijk blijft.',
    wiki:{
          kern: 'Bovenste GI-bloeding: resusciteer eerst, daarna endoscopie binnen 24u (of <12u bij hemodynamische instabiliteit). CT-scan heeft geen diagnostische voorrang boven endoscopie — endoscopie is ook therapeutisch.',
          mechanisme: [
            { title: 'Forrest-classificatie', desc: 'Ia: actief sproeiend (directe hemostase). IIa/IIb: zichtbaar vat/klonter (interventie). IIc/III: haematine/clean base (conservatief).' },
            { title: 'Pre-endoscopische PPI', desc: 'IV pantoprazol voor endoscopie → vermindert hoog-risico stigmata → minder interventies nodig.' },
            { title: 'Hemostase methoden', desc: 'Epinefrine-injectie, hemostaseclips, thermische coagulatie, argonplasmacoagulatie.' },
          ],
          onderscheid: [
            { label: 'Gastroscopie (eerste keus)', desc: 'Diagnostisch én therapeutisch. Binnen 24u (stabiel) of <12u (instabiel). Forrest-classificatie bepaalt beleid.', type: 'ok' },
            { label: 'CT-angiografie', desc: 'Bij massieve bloeding of als bron onduidelijk na endoscopie. Kan embolisatie voorbereiden.', type: 'warn' },
            { label: 'Colonoscopie', desc: 'Bij lage GI-bloeding (helder rood bloed per anum) — na stabilisatie en voorbereiding.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Resuscitatie: IV toegang ×2, kristalloïden, bloedproducten bij Hb <8 g/dL. PPI IV direct.',
            stappen: [
              { naam: 'Pre-endoscopie', detail: 'Pantoprazol 80 mg bolus IV → 8 mg/u continu. Overweeg erytromycine IV als prokineticm (leegt maag).' },
              { naam: 'Endoscopische hemostase', detail: 'Forrest Ia/IIa: clip + injectie. Succes >90%. Recidief: herhaal endoscopie of angiografie.' },
              { naam: 'Na hemostase', detail: 'Orale PPI 2×/dag 72u, daarna dagelijks. H. pylori testen en eradiceren als aanwezig.' },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'gastro', dl:'Gastro-enterologie',
    q:'Een acuut abdomen met pneumoperitoneum op de thoraxfoto is een absolute indicatie voor spoedslaparotomie.',
    c:true,
    ex:'WAAR. Vrij lucht onder het diafragma (pneumoperitoneum) wijst op een geperforeerd hol orgaan (maag, duodenum, colon). Dit is een chirurgische spoedindicatie. De meest frequente oorzaak is een perforatie van een maag- of duodenumulcus.',
    wiki:{
          kern: 'Pneumoperitoneum = vrije lucht onder het diafragma op staande thoraxfoto → geperforeerd hol orgaan tot bewijs van het tegendeel. Chirurgische spoed. Meest frequente oorzaak: maag- of duodenumulcusperforatie.',
          mechanisme: [
            { title: 'Perforatie-cascade', desc: 'Perforatie → lucht + maaginhoud/darminhoud lekken in buikholte → chemische peritonitis → bacteriële peritonitis → sepsis.' },
            { title: 'Klinisch beeld', desc: 'Rigide buik ("plankbuik"), diffuse drukpijn, loslaatpijn, tachycardie. Patiënt ligt stil (beweging pijnlijk).' },
            { title: 'CT-abdomen', desc: 'Gevoeliger dan thoraxfoto voor kleine hoeveelheid vrij gas — altijd bij twijfel. Toont ook de bron.' },
          ],
          onderscheid: [
            { label: 'Echte perforatie', desc: 'Plotse buikpijn, plankbuik, koorts, pneumoperitoneum op thoraxfoto/CT. Chirurgische spoed.', type: 'ok' },
            { label: 'Pseudopneumoperitoneum', desc: 'Chilaiditi-syndroom (colon tussen lever en diafragma) — geen symptomen, geen chirurgie nodig. Klinische correlatie essentieel.', type: 'warn' },
            { label: 'Ischemische colitis', desc: 'Buikpijn + hematochezie maar geen pneumoperitoneum initieel. CT: colonwandverdikking.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Spoedslaparotomie of -laparoscopie — geen uitstel. Peroraal niets.',
            stappen: [
              { naam: 'Preoperatief', detail: 'IV toegang, vloeistofresuscitatie, antibiotica (piperacilline/tazobactam of cefuroxim + metronidazol), maagslang.' },
              { naam: 'Chirurgie', detail: 'Maagperforatie: primaire sluiting + omentumpatch (Graham-techniek). Colonperforatie: Hartmann-procedure of primaire anastomose.' },
              { naam: 'Postoperatief', detail: 'IC-bewaking, PPI, H. pylori-eradicatie als ulcus de oorzaak was.' },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'gastro', dl:'Gastro-enterologie',
    q:'Colonoscopie is de screeningsmethode van eerste keus voor colorectaal carcinoom bij een 50-jarige zonder bijzondere risicofactoren.',
    c:true,
    ex:'WAAR. Colonoscopie is de gouden standaard voor colorectaal carcinoomscreening: detectie én directe verwijdering van poliepen. In Nederland wordt echter fecaal immunochemisch testen (FIT) gebruikt als populatiescreen, met colonoscopie bij positieve FIT.',
    wiki:{
          kern: 'Colorectaal carcinoom: 3e meest voorkomende kanker, 2e oorzaak van kankersterfte. Adenom-carcinoomsequentie duurt 10-15 jaar — het venster voor succesvolle screening en preventie. Colonoscopie is goudstandaard: diagnostisch én therapeutisch.',
          mechanisme: [
            { title: 'Adenom-carcinoomsequentie', desc: 'Adenoom → APC-mutatie → K-ras mutatie → p53-verlies → invasief carcinoom. 10-15 jaar tijdvenster voor preventieve polypectomie.' },
            { title: 'Risicofactoren', desc: 'Leeftijd >50j, IBD, familiaire belasting CRC, FAP (APC-mutatie), Lynch-syndroom (HNPCC, MMR-genen).' },
            { title: 'CEA', desc: 'Niet geschikt voor screening — te weinig specifiek. Wel bruikbaar voor recidief-monitoring na curatieve resectie.' },
          ],
          onderscheid: [
            { label: 'Colonoscopie', desc: 'Goudstandaard: diagnostisch + therapeutisch (polypectomie). Eens per 10 jaar bij normaal resultaat.', type: 'ok' },
            { label: 'FIT (fecaal immunochemisch testen)', desc: 'Nederlands bevolkingsonderzoek: niet-invasief, jaarlijks of tweejaarlijks. Positief → colonoscopie.', type: 'warn' },
            { label: 'CT-colonografie', desc: 'Niet-invasief alternatief maar geen therapeutische mogelijkheid (polyepen verwijderen onmogelijk).', type: 'warn' },
          ],
          therapie: {
            urgent: 'Obstructie door CRC: spoed-colonoscopie of CT-colonografie → stentplaatsing of Hartmann-procedure.',
            stappen: [
              { naam: 'Stadium I-II', detail: 'Chirurgische resectie curatief. Adjuvante chemotherapie bij stadium III (FOLFOX).' },
              { naam: 'Stadium IV (metastasen)', detail: 'Chemotherapie (FOLFOX of FOLFIRI) ± bevacizumab/cetuximab afhankelijk van RAS-mutatiestatus.' },
              { naam: 'Lynch-syndroom', detail: 'Genetisch onderzoek familieleden. Intensievere surveillance. Immunotherapie (pembrolizumab) effectief bij MSI-H CRC.' },
            ],
          },
        } },

  { type:'diagnose', d:5, domain:'gastro', dl:'Gastro-enterologie', subtype:'test',
    q:'Een 70-jarige patiënt met vermoeden van bovenste GI-bloeding (hematemese, hemodynamisch stabiel). Welk onderzoek heeft de hoogste prioriteit?',
    a:['Gastroscopie binnen 24 uur','CT-abdomen met contrast','Arteriële angiografie','X-abdomen staand'], c:0,
    ex:'Gastroscopie is zowel diagnostisch als therapeutisch (hemostase). Bij stabiele patiënt: binnen 24u. Bij hemodynamisch instabiele patiënt: resusciteer eerst, daarna zo snel mogelijk gastroscopie (<12u). CT heeft geen therapeutisch voordeel in eerste instantie.',
    wiki:{
          kern: 'Gastroscopie is de eerste stap bij bovenste GI-bloeding — diagnostisch én therapeutisch. Glasgow-Blatchford Score bepaalt urgentie. Pre-endoscopische IV PPI vermindert hoog-risico stigmata.',
          mechanisme: [
            { title: 'Glasgow-Blatchford Score', desc: 'Score 0: poliklinisch veilig. Score hoog (>6): spoed-endoscopie. Bepaalt op basis van Hb, ureum, systolische BD, hartfrequentie, comorbiditeit.' },
            { title: 'Endoscopische hemostase', desc: 'Epinefrine-injectie, hemostaseclips, thermische coagulatie, APC. Succes >90% bij actieve bloeding.' },
            { title: 'Recidiefbloeding', desc: 'Herhaal endoscopie → bij falen: angiografie met embolisatie → chirurgie als laatste redmiddel.' },
          ],
          onderscheid: [
            { label: 'Gastroscopie (eerste keus)', desc: 'Diagnostisch + therapeutisch. Stabiel: binnen 24u. Instabiel: na resuscitatie <12u.', type: 'ok' },
            { label: 'Angiografie/embolisatie', desc: 'Bij recidief na endoscopie of als bron endoscopisch onbereikbaar.', type: 'warn' },
            { label: 'X-abdomen staand', desc: 'Geen rol bij GI-bloeding — wél bij verdenking perforatie (vrij gas onder diafragma).', type: 'danger' },
          ],
          therapie: {
            urgent: 'IV pantoprazol 80 mg bolus → 8 mg/u continu. Gastroscopie zo snel mogelijk.',
            stappen: [
              { naam: 'Bloedtransfusie', detail: 'Restrictief beleid: transfusie bij Hb <8 g/dL (cirrosepatiënten: <7 g/dL — over-transfusie verhoogt portale druk).' },
              { naam: 'Varicesbloeding', detail: 'Terlipressine + antibiotica (norfloxacine) + endoscopische ligatie — direct variceuze bloeding behandelen anders dan peptische ulcusbloeding.' },
              { naam: 'Na hemostase', detail: 'H. pylori testen/eradiceren. NSAID stoppen. Onderhouds-PPI bij risicopatiënten.' },
            ],
          },
        } },


  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 68 jaar, acuut ernstige buikpijn, koorts 39°C, linker onderbuikpijn, défense musculaire links. CT-abdomen: verdikking sigmacolon, pericolisch vet ontstoken. Diagnose?',
    a:['Acute diverticulitis','Coloncarcinoom sigmoïd','Ischemische colitis','Hernia inguinalis incarcerata'], c:0,
    ex:'Acute diverticulitis: acute ontsteking van een divertikel (uitstulping van de colonwand). Klassiek: linker onderbuikpijn (sigmacolon meest aangedaan), koorts, leukocytose. CT-abdomen is diagnostisch: pericolisch vet, verdikking colonwand.',
    wiki:{
          kern: "Diverticulose (aanwezigheid divertikels) bij >50% van de westerse bevolking >70 jaar. Complicaties: diverticulitis (20%), bloeding, fistel, abces, perforatie.",
          mechanisme: [
            { title: "Stap 1", desc: "Diverticulitis ontstaat bij obstructie van een divertikelhals." },
            { title: "Stap 2", desc: "bacteriële proliferatie." },
            { title: "Stap 3", desc: "micro- of macroperforatie. Hinchey-classificatie van ernst (I-IV): I = pericolisch abces, IV = fecale peritonitis." },
          ],
          onderscheid: [
            { label: "Coloncarcinoom", desc: "langzamer beloop, gewichtsverlies, veranderd defecatiepatroon, bloedverlies.", type: 'ok' },
            { label: "Ischemische colitis", desc: "acuut, links, hematochezie, ouder, vasculaire risicofactoren.", type: 'warn' },
            { label: "Appendicitis", desc: "rechts onderbuik, McBurney.", type: 'danger' },
          ],
          therapie: {
            urgent: "Ongecompliceerd: antibiotica (ciprofloxacine + metronidazol of amoxicilline-clavulanaat), rustdieet.",
            stappen: [
              { naam: "Gecompliceerd (abces)", detail: "CT-geleide drainage." },
              { naam: "Perforatie", detail: "spoedslaparotomie (Hartmann-procedure)." },
              { naam: "Stap 3", detail: "Electieve sigmoïdresectie na ≥2 gecompliceerde episoden." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Vrouw van 42 jaar met levercirrose (Child-Pugh B). Acute hematemese, bloeddruk 90/60 mmHg. Meest waarschijnlijke bloedingsbron?',
    a:['Oesofagusvarices','Maagulcus','Mallory-Weiss scheur','Angiodysplasie'], c:0,
    ex:'Bij een cirrosepatiënt met hematemese zijn oesofagusvarices de meest waarschijnlijke oorzaak (portale hypertensie → varices). Mortaliteit per bloedingsepisode 15-25%. Directe behandeling: terlipressine + somatostatine-analoog + antibiotica + endoscopie.',
    wiki:{
          kern: "Portale hypertensie (portale druk >10 mmHg) bij cirrose → vorming van varices in oesofagus en fundus maag → risico op ruptuur. Variceuze bloeding treedt op bij 25-35% van de cirrosepatïënten.",
          mechanisme: [
            { title: "Acuut management", desc: "resuscitatie (voorzichtig met vocht!), terlipressine (of somatostatine/octreotide) IV vermindert portale druk, antibiotica (norfloxacine → infectieprofylaxe), endoscopie met ligatie of sclerotherapie." },
            { title: "Stap 2", desc: "TIPS bij refractaire bloeding." },
          ],
          onderscheid: [
            { label: "Maagulcus", desc: "ook bij cirrose maar minder acute shock.", type: 'ok' },
            { label: "Mallory-Weiss", desc: "scheur bij cardio-oesofageale junctie na braken, minder ernstig.", type: 'warn' },
            { label: "Portale gastropathie", desc: "diffuse mukosale bloeding, ook bij cirrose.", type: 'danger' },
          ],
          therapie: {
            urgent: "Ballon-tamponade (Sengstaken-Blakemore): temporair bij massieve bloeding.",
            stappen: [
              { naam: "Stap 1", detail: "TIPS (transjugulaire intrahepatische portosystemische shunt): refractaire varicesbloeding." },
              { naam: "Secundaire profylaxe", detail: "bètalokker + endoscopische varicesligatie." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 25 jaar, progressieve dysfagie voor vaste en vloeibare voeding, regurgitatie van niet-verteerd voedsel. Manometrie: verhoogde onderste oesofageale sfincterdruk, aperistaltiek. Diagnose?',
    a:['Achalasie','Gastro-oesofageale reflux','Oesofaguscarcinoom','Eosinofiele oesofagitis'], c:0,
    ex:'Achalasie: neuromusculaire aandoening van de oesofagus met verlies van nitrinerge inhibitoire neuronen → onvolledige relaxatie van de onderste oesofageale sfincter + aperistaltiek. Dysfagie voor vaste én vloeibare voeding is kenmerkend (onderscheid van carcinoom).',
    wiki:{
          kern: "Achalasie: afwezigheid van inhibitoire nitrinerge plexus myentericus neuronen → LOS relaxeert onvoldoende bij slikken → oesofageale retentie → regurgitatie. Barium-slikfoto: \"bird-beak\" vernauwing.",
          mechanisme: [
            { title: "Stap 1", desc: "Oorzaak onbekend (idiopathisch); secundaire achalasie: Chagas-ziekte (Trypanosoma cruzi), pseudoachalasie door tumor bij cardia." },
            { title: "Manometrie is gouden standaard", desc: "verhoogd basale LOS-druk en incomplete LOS-relaxatie." },
          ],
          onderscheid: [
            { label: "Oesofaguscarcinoom", desc: "ouder, gewichtsverlies, roken/alcohol, progressieve dysfagie eerder voor vast dan vloeistof.", type: 'ok' },
            { label: "GERD", desc: "zuurbranden, geen dysfagie als hoofdklacht.", type: 'warn' },
            { label: "Eosinofiele oesofagitis", desc: "jongeren, atopie, voedselallergie, bolus-impactie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Endoscopische pneumatische dilatatie van de LOS.",
            stappen: [
              { naam: "Stap 1", detail: "Laparoscopische Heller-myotomie (+ Dor-fundoplicatie)." },
              { naam: "POEM (Per Oral Endoscopic Myotomy)", detail: "minimaal invasief." },
              { naam: "Botoxtinjectie", detail: "tijdelijk, voor patiënten die niet operabel zijn." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Wat is de meest voorkomende oorzaak van levercirrose in de westerse wereld?',
    a:['Alcoholisch leverlijden','Virale hepatitis C','NAFLD/NASH','Primaire biliaire cholangitis'], c:0,
    ex:'Alcoholisch leverlijden is de meest voorkomende oorzaak van cirrose in westerse landen, gevolgd door virale hepatitis C en NAFLD/NASH (toenemend door obesitas-epidemie). Wereldwijd is virale hepatitis B de meest frequente oorzaak.',
    wiki:{
          kern: 'Alcoholisch leverlijden is de meest voorkomende oorzaak van cirrose in westerse landen. Cirrose = eindstadium: fibrose + portale hypertensie → ascites, varices, encefalopathie, SBP, HCC.',
          mechanisme: [
            { title: 'Alcoholische hepatitis', desc: 'Directe hepatotoxiciteit + acetaldehyde-schade + oxidatieve stress → steatohepatitis → fibrose → cirrose.' },
            { title: 'Child-Pugh-score', desc: 'A/B/C op basis van bilirubine, albumine, protrombinetijd, ascites, encefalopathie. Child C = slechte prognose.' },
            { title: 'MELD-score', desc: 'Bepaalt prioriteit levertransplantatielijst (creatinine, bilirubine, INR). Score >15 = overweeg transplantatie.' },
          ],
          onderscheid: [
            { label: 'Alcoholische cirrose', desc: 'Alcohol-anamnese, ASAT/ALAT >2:1 bij actief drinken, MCV hoog. Abstinentie vertraagt progressie.', type: 'ok' },
            { label: 'HCV-cirrose', desc: 'Anti-HCV positief, HCV-PCR positief. Curatieve DAA-therapie (>95% SVR). Cirroseregressie mogelijk.', type: 'warn' },
            { label: 'NAFLD/NASH', desc: 'Toenemend door obesitas-epidemie. Geen alcohol. Metabool syndroom. Gewichtsreductie als therapie.', type: 'warn' },
            { label: 'Hemochromatose', desc: 'Hoog ferritine + transferrinesaturatie >45%. Genetisch (HFE-mutatie). Aderlating als therapie.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Hepatische encefalopathie: lactulose 3×/dag, rifaximine. Ascites: spironolacton ± furosemide. Varicesbloeding: terlipressine + endoscopie.',
            stappen: [
              { naam: 'Abstinentie alcohol', detail: 'Enige interventie die progressie vertraagt en soms cirroseregressie induceert. Multidisciplinaire ondersteuning.' },
              { naam: 'SBP-profylaxe', detail: 'Norfloxacine of ciprofloxacine oraal bij ascites-TP <15 g/L of na eerste SBP-episode.' },
              { naam: 'HCC-screening', detail: 'Echo lever + AFP elke 6 maanden — cirrosepatiënten hebben verhoogd HCC-risico.' },
            ],
          },
        } },

  { type:'lab', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Patiënt met vermoeden acute pancreatitis. Welk enzym heeft de HOOGSTE specificiteit voor pancreatitis?',
    a:['Lipase','Amylase','ASAT','Gamma-GT'], c:0,
    ex:'Lipase is specifieker voor pancreatitis dan amylase. Amylase stijgt ook bij nierinsufficiëntie, speekselklierafwijkingen, darmischemie en andere abdominale aandoeningen. Lipase blijft langer verhoogd (3-5 dagen vs. 1-2 dagen voor amylase).',
    wiki:{
          kern: 'Lipase is specifieker voor pancreatitis dan amylase — amylase stijgt ook bij nierinsufficiëntie, speekselklierafwijkingen en darmischemie. Lipase blijft langer verhoogd (3-5 dagen vs 1-2 dagen).',
          mechanisme: [
            { title: 'Lipase specificiteit', desc: 'Vrijwel uitsluitend pancreassspecifiek. Stijgt 3-6u na aanvang, piek bij 24u, normaal na 3-5 dagen.' },
            { title: 'Amylase lage specificiteit', desc: 'Aanwezig in speekselklieren, darm, gonaden, nieren → verhoogd bij veel andere oorzaken. Sneller genormaliseerd dan lipase.' },
            { title: 'Diagnose-criteria', desc: '≥2 van 3: (1) typische epigastrische pijn, (2) lipase/amylase >3×ULN, (3) CT-beelden passend bij pancreatitis.' },
          ],
          onderscheid: [
            { label: 'Galsteenpancreatitis', desc: 'ALAT >3×ULN pleit sterk voor galsteenpancreatitis als oorzaak. ERCP + sfincter­otomie bij galwegobstructie.', type: 'ok' },
            { label: 'Alcoholpancreatitis', desc: 'Recidiverende episodes bij alcoholgebruik. Risico op chronische pancreatitis.', type: 'warn' },
            { label: 'Ernstige pancreatitis', desc: 'CRP >150 na 48u, APACHE II score, CT-severity index — necrosevorming bij 20%. Mortaliteit 30-40%.', type: 'danger' },
          ],
          therapie: {
            urgent: 'Agressieve IV vochtresuscitatie (Lactated Ringer 250-500 mL/u eerste uren) — pijler van behandeling.',
            stappen: [
              { naam: 'Voeding', detail: 'Vroeg enterale voeding (<48u) via neussonde bij ernstige pancreatitis — vermindert complicaties. Geen TPN tenzij enterale voeding onmogelijk.' },
              { naam: 'Antibiotica', detail: 'Profylactisch niet aanbevolen bij pancreatitis. Wel bij geïnfecteerde necrose (FNA-geleide kweek, carbapenems).' },
              { naam: 'ERCP', detail: 'Bij galsteenpancreatitis met cholangitis of persistent galwegobstructie: ERCP + sfinsterotomie <24-72u.' },
            ],
          },
        } },


  // ── ENDOCRINOLOGIE ──
  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Man van 48 jaar, toegenomen dorst en urineproductie, vermoeid, nuchtere bloedglucose 8.4 mmol/L en 9.1 mmol/L bij herhaling. HbA1c 62 mmol/mol. Diagnose?',
    a:['Diabetes mellitus type 2','Diabetes mellitus type 1','Nefrogeen diabetes insipidus','Primaire hyperaldosteronisme'], c:0,
    ex:'DM type 2 diagnose: ≥2 nuchtere glucosewaarden ≥7.0 mmol/L, of HbA1c ≥53 mmol/mol, of random glucose ≥11.1 mmol/L + symptomen. Type 2 treedt op bij volwassenen met risicofactoren (overgewicht, familiaire belasting).',
    wiki:{
          kern: "DM type 2: relatieve insulinedeficiëntie door insulineresistentie + progressief b-celverlies. Prevalentie 400 miljoen wereldwijd.",
          mechanisme: [
            { title: "HbA1c", desc: "geglyceerd hemoglobine, weerspiegelt gemiddeld bloedglucose over 2-3 maanden." },
            { title: "Diagnostisch", desc: "≥53 mmol/mol (7%)." },
            { title: "OGTT (orale glucosetolerantietest)", desc: "2u waarde ≥11.1 mmol/L bij 75 g glucose = DM." },
            { title: "Prediabetes", desc: "nuchter 6.1-6.9 of HbA1c 42-52." },
          ],
          onderscheid: [
            { label: "DM type 1", desc: "jongere leeftijd, slank, auto-antistoffen (GAD65, IA-2, ZnT8), C-peptide laag.", type: 'ok' },
            { label: "LADA", desc: "langzaam progressief auto-immuun, volwassenen.", type: 'warn' },
            { label: "DI", desc: "polydipsie maar normaal glucose; diagnostisch met wateronthoudingstest.", type: 'danger' },
          ],
          therapie: {
            urgent: "DM2 stap 1: metformine + leefstijl.",
            stappen: [
              { naam: "Stap 2", detail: "toevoegen SGLT2-remmer (bij HVZ/nierziekte) of GLP-1 agonist (bij obesitas)." },
              { naam: "Stap 2", detail: "Insuline bij HbA1c persistend hoog." },
              { naam: "Stap 3", detail: "Behandeldoel HbA1c <53 mmol/mol (individualiseren)." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Vrouw van 35 jaar, hartkloppingen, gewichtsverlies, warmte-intolerantie, tremor, ooguitpuiling (exophthalmus). TSH <0.01 mIE/L, vrij T4 verhoogd. Diagnose?',
    a:['Ziekte van Graves','Toxisch multinodulair struma','Hashimoto-thyroïditis','Subacute thyroïditis'], c:0,
    ex:'Ziekte van Graves: de meest voorkomende oorzaak van hyperthyreoïdie bij jongere vrouwen. Kenmerkend: hyperthyreoïdie + exophthalmus (Graves-ophthalmopathie) + soms pretibiale myxoedeem. TSI (thyrotropine-stimulerende immunoglobulinen) zijn pathognomonisch.',
    wiki:{
          kern: "Hyperthyreoïdie: overproductie van schildklierhormoon. Graves is auto-immuun (TSI stimuleren TSH-receptor).",
          mechanisme: [
            { title: "Symptomen", desc: "tachycardie, atriumfibrilleren, gewichtsverlies, warmte-intolerantie, zweten, tremor, diarree, menstruatiestoornissen." },
            { title: "Stap 2", desc: "TSH is de meest gevoelige screeningstest." },
            { title: "Behandeling", desc: "thionamiden (thiamazol, propylthiouracil), radioactief jodium, chirurgie." },
          ],
          onderscheid: [
            { label: "Hashimoto", desc: "auto-immuun hypothyreoïdie (TPO-Ab+), aanvankelijk tijdelijke hyperthyreoïdie (hashitoxicose).", type: 'ok' },
            { label: "Subacute (De Quervain)", desc: "pijnlijke schildklier, zelflimiterend.", type: 'warn' },
            { label: "Toxisch adenom", desc: "solitair heet noduul op scintigrafie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Graves: thiamazol 1-2 jaar → 50% recidief → dan radioactief jodium of thyroïdectomie.",
            stappen: [
              { naam: "Stap 1", detail: "Propranolol voor symptoomcontrole." },
              { naam: "Graves-ophthalmopathie", detail: "snel remitterende hyperthyreoïdie, selenium, corticosteroïden bij ernstige exophthalmus." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Man van 55 jaar, moe, koud, traag, obstipatie, bradycardie, droge huid, verhoogd TSH (28 mIE/L), laag vrij T4. Diagnose?',
    a:['Primaire hypothyreoïdie','Secundaire hypothyreoïdie','Ziekte van Cushing','Primaire hyperaldosteronisme'], c:0,
    ex:'Primaire hypothyreoïdie: hoog TSH (hypofyse compenseert) + laag vrij T4. De meest voorkomende oorzaak in westerse landen is Hashimoto-thyroïditis (auto-immuun, TPO-antistoffen positief). Secundaire hypothyreoïdie: laag TSH + laag T4 (hypofysair probleem).',
    wiki:{
          kern: "Hypothyreoïdie: onvoldoende schildklierhormoonsynthese. Symptomen: moeheid, koude-intolerantie, gewichtstoename, obstipatie, bradycardie, trage reflexen, droge huid, haarverlies, cognitieve vertraging.",
          mechanisme: [
            { title: "TSH", desc: "negatieve feedback met T4." },
            { title: "Bij primaire hypothyreoïdie", desc: "T4 laag → TSH stijgt (compensatoir)." },
            { title: "Hashimoto", desc: "TPO-antistoffen vernietigen folliculaire cellen." },
            { title: "Behandeling", desc: "levothyroxine (L-T4) oraal, doseertitrage op basis van TSH." },
          ],
          onderscheid: [
            { label: "Secundaire hypothyreoïdie (hypofysair)", desc: "TSH laag/normaal + T4 laag → MRI hypofyse.", type: 'ok' },
            { label: "Derde-orde", desc: "TRH-deficiëntie (hypothalamisch).", type: 'warn' },
            { label: "Sick euthyroid syndrome", desc: "T3 laag bij ernstige ziekte maar TSH normaal.", type: 'danger' },
          ],
          therapie: {
            urgent: "Levothyroxine (L-T4): starten laag en opbouwen, doel TSH 0.5-2.5 mIE/L.",
            stappen: [
              { naam: "Bij cardiale comorbiditeit", detail: "traag opbouwen." },
              { naam: "Myxoedeem-coma", detail: "IV L-T4 + hydrocortison + intensieve zorg." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Vrouw van 42 jaar, maandlange vermoeidheid, huidpigmentatie (inclusief slijmvliezen), gewichtsverlies, hypotensie, hyponatriëmie, hyperkaliëmie. Diagnose?',
    a:['Primaire bijnierschorsinsufficiëntie (ziekte van Addison)','Secundaire bijnierschorsinsufficiëntie','Hypothyreoïdie','SIADH'], c:0,
    ex:'Ziekte van Addison: auto-immuun destructie van de bijnierschors → tekort aan cortisol én aldosteron. Hyperpigmentatie (door ACTH-stijging) is kenmerkend voor primaire bijnierschorsinsufficiëntie en ontbreekt bij secundaire. Hyponatriëmie + hyperkaliëmie = aldosterontekort.',
    wiki:{
          kern: "Primaire bijnierschorsinsufficiëntie (Addison): tekort aan glucocorticoid (cortisol) + mineralocorticoid (aldosteron). Oorzaak: auto-immuun (70%), tuberculose, adrenale bloeding (Waterhouse-Friderichsen bij meningokokkensepsis).",
          mechanisme: [
            { title: "Stap 1", desc: "Cortisoltekort." },
            { title: "Stap 2", desc: "ACTH-stijging (negatieve feedback weggevallen)." },
            { title: "Stap 3", desc: "MSH-bijproduct." },
            { title: "Stap 4", desc: "hyperpigmentatie. Aldosterontekort." },
            { title: "Stap 5", desc: "natrium verlies + kalium retentie + volume depletie." },
          ],
          onderscheid: [
            { label: "Optie 1", desc: "Secundaire bijnierschorsinsufficiëntie (hypofysair ACTH-tekort): geen hyperpigmentatie (ACTH laag), geen aldosterontekort (RAAS intact).", type: 'ok' },
            { label: "SIADH", desc: "hyponatriëmie maar geen kaliumbedieningsafwijking of hypotensie.", type: 'warn' },
            { label: "Hypothyreoïdie", desc: "ook vermoeidheid maar geen hyperpigmentatie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Hydrocortison 2-3× daags (mimiceert fysiologisch patroon).",
            stappen: [
              { naam: "Stap 1", detail: "Fludrocortison voor mineralocorticoïdvervanging." },
              { naam: "Addison-crisis", detail: "IV hydrocortison 100 mg bolus + 200 mg/24u + NaCl 0.9% resuscitatie." },
              { naam: "Stap 3", detail: "Altijd SOS-injectie meegeven." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Man van 38 jaar, ernstige hypertensie, hypokaliëmie, metabole alkalose. Aldosteron hoog, renine laag. Diagnose?',
    a:['Primaire hyperaldosteronisme (syndroom van Conn)','Renovasculaire hypertensie','Cushing-syndroom','Feochromocytoom'], c:0,
    ex:'Primaire hyperaldosteronisme: autonome aldosteronproductie onafhankelijk van renine-angiotensine systeem. Klassiek: hypertensie + hypokaliëmie + metabole alkalose + hoog aldosteron + laag renine. Oorzaak: aldosteron-producerend adenoom (Conn) of bilaterale bijnierhyperplasie.',
    wiki:{
          kern: "Primaire hyperaldosteronisme is de meest voorkomende oorzaak van secundaire hypertensie (5-10% van hypertensieve patiënten). Aldosteron → Na-retentie + K-verlies → hypertensie + hypokaliëmie.",
          mechanisme: [
            { title: "Stap 1", desc: "Aldosteron stimuleert ENaC (epitheliaal natriumkanaal) in distale nier." },
            { title: "Stap 2", desc: "Na resorptie + K/H uitscheiding." },
            { title: "Stap 3", desc: "hypokaliëmie + metabole alkalose. Hypokaliëmie: spierzwakte, polyurie (nefrogeen DI door hypokaliëmie)." },
          ],
          onderscheid: [
            { label: "Renovasculaire hypertensie", desc: "ook secundaire hypertensie maar hoog renine + hoog aldosteron.", type: 'ok' },
            { label: "Cushing", desc: "hoge cortisol, buffalo hump, striae.", type: 'warn' },
            { label: "Feochromocytoom", desc: "episodisch, catecholaminen verhoogd.", type: 'danger' },
          ],
          therapie: {
            urgent: "Aldosteron-producerend adenoom: laparoscopische adrenalectomie.",
            stappen: [
              { naam: "Bilaterale hyperplasie", detail: "mineralocorticoïd-antagonist (spironolacton of eplerenon)." },
              { naam: "Stap 2", detail: "Kaliumsuppletie tijdelijk." },
              { naam: "Stap 3", detail: "Bloeddrukcontrole." },
            ],
          },
        } },


  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Vrouw van 30 jaar, obese, hoge bloeddruk, paarse striae op de buik, buffalo hump, maanvormig gelaat, spieratrofie. 24-uurs urinevrij cortisol verhoogd. Diagnose?',
    a:['Cushing-syndroom','Primaire hyperaldosteronisme','Hypothyreoïdie','Polycysteus ovariumsyndroom'], c:0,
    ex:'Cushing-syndroom: chronische blootstelling aan glucocorticoïden (endogeen of exogeen). Kenmerkend: centrale obesitas, paarse striae, buffalo hump, maanvormig gelaat, hypertensie, spieratrofie. Meest voorkomende oorzaak: exogeen corticosteroïdgebruik.',
    wiki:{
          kern: "Endogeen Cushing: (1) Cushing-ziekte (ACTH-producerend hypofyse-adenoom, 70%), (2) ectopische ACTH-productie (longcarcinoom), (3) primair bijnierschorsadenoom/-carcinoom. Diagnose-algoritme: screeningen (24u UFC, late-night speekselcortisol, overnight dexamethason-suppressietest) → oorzaakbepaling (ACTH, MRI/CT, CRH-test).",
          mechanisme: [
            { title: "Cortisol", desc: "proteïnekatabolisme (spieratrofie, striae), vetredistributie (centraal), gluconeogenese (hyperglykemie), immunosuppressie, mineralocorticoïd-effect (hypertensie, hypokaliëmie)." },
            { title: "Paarse striae", desc: "gespannen huid + catabolisme." },
          ],
          onderscheid: [
            { label: "Metabool syndroom", desc: "obesitas maar geen striae/spieratrofie, normaal cortisol.", type: 'ok' },
            { label: "Pseudo-Cushing", desc: "depressie/alcoholisme verhoogt cortisol maar dexamethason suppressietest normaal.", type: 'warn' },
            { label: "PCOS", desc: "ook androgene verschijnselen en cyclusstoornissen maar geen echte Cushing-kenmerken.", type: 'danger' },
          ],
          therapie: {
            urgent: "Cushing-ziekte: transsfenoïdale hypofyse-adenoomresectie.",
            stappen: [
              { naam: "Bijnieradenoom", detail: "adrenalectomie." },
              { naam: "Ectopisch", detail: "behandel primaire tumor." },
              { naam: "Medicamenteus overbrugging", detail: "metyrapone, ketoconazol." },
            ],
          },
        } },

  { type:'pharma', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Via welk mechanisme verlaagt metformine de bloedglucose bij diabetes type 2?',
    a:['Remming van hepatische gluconeogenese via AMPK-activatie','Stimulatie van insulinesecretie door b-cellen','Remming van intestinale glucoseresorptie via SGLT2','Verhoogde insulinegevoeligheid via PPARγ-activatie'], c:0,
    ex:'Metformine activeert AMPK (AMP-geactiveerd proteinkinase) → remming van hepatische gluconeogenese → glucose-output lever daalt. Metformine stimuleert de insulinesecretie niet en veroorzaakt daardoor geen hypoglykemie als monotherapie.',
    wiki:{
          kern: 'Metformine activeert AMPK → remt hepatische gluconeogenese → minder glucose-output lever. Geen hypoglykemierisico als monotherapie. Eerste keus bij DM type 2 (UKPDS: cardiovasculair voordeel aangetoond).',
          mechanisme: [
            { title: 'AMPK-activatie', desc: 'Remming van mitochondriaal complex I → minder ATP → AMPK actief → remt hepatische gluconeogenese. Vermindert insulineresistentie in spier en lever.' },
            { title: 'Geen insulinesecretie', desc: 'Metformine stimuleert geen insuline — daardoor geen hypoglykemie als monotherapie en geen gewichtstoename.' },
            { title: 'Lactaatacidose', desc: 'Zeldzame maar ernstige bijwerking bij nierinsufficiëntie (eGFR <30) — metformine accumulatie → lactaatproductie. Stop bij eGFR <30 of contrast-nefropathierisico.' },
          ],
          onderscheid: [
            { label: 'Metformine (eerste keus)', desc: 'Geen hypoglykemie, gewichtsneutraal, goedkoop, cardiovasculair voordeel. Stop bij eGFR <30.', type: 'ok' },
            { label: 'SGLT2-remmers', desc: 'Cardioprotectief (HFrEF), nefroprotectief. Toevoegen bij DM2 + hartfalen of nierziekte.', type: 'warn' },
            { label: 'GLP-1 agonisten (semaglutide)', desc: 'Gewichtsverlies + cardiovasculair voordeel. Toevoegen bij DM2 + obesitas of atherosclerose.', type: 'warn' },
            { label: 'Sulfonylureumderivaten', desc: 'Stimuleren insulinesecretie → hypoglykemierisico + gewichtstoename. Minder voorkeur.', type: 'danger' },
          ],
          therapie: {
            urgent: 'DKA bij DM2: IV insuline + vocht + elektrolytcorrectie (K+ bewaken).',
            stappen: [
              { naam: 'Start metformine', detail: '500 mg bij de avondmaaltijd, ophogen naar 1000 mg 2×/dag over 4 weken (GI-bijwerkingen verminderen bij langzame titratie).' },
              { naam: 'Stap 2 (bij HbA1c >53)', detail: 'SGLT2-remmer (empagliflozine/dapagliflozine) bij HVZ/HF/nierziekte, of GLP-1 agonist bij obesitas.' },
              { naam: 'Insuline', detail: 'Toevoegen bij persisterende hyperglykemie ondanks 2-3 orale middelen. Basale insuline (glargine) 1×/dag 10E als startdosis.' },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Man van 52 jaar, brede handen en voeten, vergroot hoofd, ruimere pasvorm schoenen. Hoge IGF-1 spiegel. Diagnose?',
    a:['Acromegalie','Gigantisme','Hyperthyreoïdie','Primaire hyperparathyreoïdie'], c:0,
    ex:'Acromegalie: overproductie van groeihormoon (GH) door een hypofyse-adenoom na de groeischijfsluiting → vergoring van handen, voeten en schedel (niet de lengte). Verhoogd IGF-1 is de beste screeningstest. Gigantisme treedt op vóór sluiting van de groeischijven.',
    wiki:{
          kern: "Acromegalie: insidieuse onset, diagnose vaak 10+ jaar na begin. Symptomen: vergoring handen/voeten, prognathisme, diastema, carpaaltunnelsyndroom, slaapapneu, DM, colonpoliepen, cardiomegalie.",
          mechanisme: [
            { title: "Stap 1", desc: "GH-adenoom." },
            { title: "Stap 2", desc: "GH stimuleert levercellen om IGF-1 te produceren." },
            { title: "Stap 3", desc: "IGF-1 stimuleert weefsels. Bevestiging: GH suppressie na OGTT (normaal <1 μg/L; bij acromegalie: geen suppressie). MRI hypofyse: macroadenoom of microadenoom." },
          ],
          onderscheid: [
            { label: "Gigantisme", desc: "acromegalie vóór puberteit → excessieve lengtegroei.", type: 'ok' },
            { label: "Hyperthyreoïdie", desc: "hypermetabolisme maar geen skeletveranderingen.", type: 'warn' },
            { label: "Hemimegalie", desc: "unilateraal.", type: 'danger' },
            { label: "Pachydermoperiostose", desc: "benigne.", type: 'warn' },
          ],
          therapie: {
            urgent: "Transsfenoïdale adenoomresectie (eerstekeus).",
            stappen: [
              { naam: "Medicamenteus bij residuele ziekte", detail: "somatostatine-analogen (octreotide, lanreotide), pegvisomant (GH-receptorantagonist)." },
              { naam: "Stap 2", detail: "Radiochirurgie als aanvulling." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'endo', dl:'Endocrinologie',
    q:'Bij diabetes mellitus type 1 is insulinetherapie optioneel; met dieet en orale antidiabetica kan de bloedsuiker ook goed worden geregeld.',
    c:false,
    ex:'NIET WAAR. Bij DM type 1 is er een absoluut insulinetekort door auto-immuun b-celdestructie. Insuline is levensnoodzakelijk — zonder insuline treedt diabetische ketoacidose op. Orale antidiabetica zijn niet effectief bij afwezige b-celfunctie.',
    wiki:{
          kern: 'Bij DM type 1 is er een absoluut insulinetekort door auto-immuun b-celdestructie. Insuline is levensnoodzakelijk — zonder insuline treedt DKA op. Orale antidiabetica zijn ineffectief zonder functionele b-cellen.',
          mechanisme: [
            { title: 'Auto-immuun b-celdestructie', desc: 'Antilichamen (GAD65, IA-2, ZnT8) + cytotoxische T-cellen vernietigen b-cellen → geen insulineproductie.' },
            { title: 'DKA-mechanisme', desc: 'Insulinetekort → glucagon dominant → lipolyse → vrije vetzuren naar lever → ketonvorming (beta-hydroxybutyraat, acetoacetaat) → acidose.' },
            { title: 'HHS bij DM2', desc: 'Hyperosmolair hyperglykemisch syndroom bij DM type 2 — geen ketose (nog enige insuline), maar ernstige hyperglykemie + dehydratie.' },
          ],
          onderscheid: [
            { label: 'DM type 1', desc: 'Jong, slank, acuut begin (DKA), GAD-antistoffen positief, C-peptide laag. Levenslange insuline.', type: 'ok' },
            { label: 'LADA', desc: 'Volwassene, geleidelijk begin, aanvankelijk lijkt op DM2, GAD-antistoffen positief. Insuline-afhankelijk binnen jaren.', type: 'warn' },
            { label: 'DM type 2', desc: 'Ouder, overgewicht, familiair, auto-antistoffen negatief, C-peptide normaal/hoog. Orale middelen initieel.', type: 'warn' },
          ],
          therapie: {
            urgent: 'DKA: insuline IV + NaCl 0,9% 1L/u initieel + K+-correctie (K+ >3,5 voor insuline start). Stop insuline NIET.',
            stappen: [
              { naam: 'Basaal-bolus schema', detail: 'Lange insuline (glargine/degludec) 1×/dag + korte insuline (aspart/lispro) voor elke maaltijd. Carbohydraat-telling voor bolus-berekening.' },
              { naam: 'Insulinepomp (CSII)', detail: 'Continue subcutane insuline-infusie + Flash-glukosemonitoring (FGM/CGM). Betere HbA1c bij gemotiveerde patiënten.' },
              { naam: 'Hypoglykemie', detail: 'Licht: suiker/glucosetabletten. Ernstig: glucagon IM of dextrose 50% IV. Patiënt + familie educatie verplicht.' },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'endo', dl:'Endocrinologie',
    q:'Een verhoogd TSH bij een zwangere vrouw in het eerste trimester is normaal en vereist geen behandeling.',
    c:false,
    ex:'NIET WAAR. Een verhoogd TSH bij een zwangere vrouw kan wijzen op hypothyreoïdie, wat geassocieerd is met miskraam, zwangerschapscomplicaties en verminderde neurocognitieve ontwikkeling van het kind. Behandeling met levothyroxine is geïndiceerd. (NB: TSH-referentiewaarden dalen in het eerste trimester door hCG-effect.).',
    wiki:{
          kern: 'Schildklierhormon is cruciaal voor neuronale migratie van de foetus in het eerste trimester. TSH daalt fysiologisch (hCG-effect), maar een verhoogd TSH is abnormaal en vereist behandeling om foetale hersenschade te voorkomen.',
          mechanisme: [
            { title: 'Fysiologische TSH-daling', desc: 'hCG heeft structurele gelijkenis met TSH → stimuleert TSH-receptor → T4-stijging → TSH-daling. Normaal: TSH <2,5 mIE/L in trimester 1.' },
            { title: 'Foetale afhankelijkheid', desc: 'Foetus maakt pas eigen schildklierhormon na 12 weken — daarvoor volledig afhankelijk van moeder. Hypothyreoïdie → gestaard neurologisch deficit.' },
            { title: 'Verhoogd TSH in trimester 1', desc: 'Geeft verhoogd risico op miskraam, vroeggeboorte, lagere IQ kind. Behandeling: levothyroxine direct starten.' },
          ],
          onderscheid: [
            { label: 'Hypothyreoïdie in zwangerschap', desc: 'TSH verhoogd, vrij T4 laag of normaal. Levothyroxine direct. Dosis-eis stijgt in zwangerschap.', type: 'ok' },
            { label: 'Hyperthyreoïdie (Graves)', desc: 'TSH laag, T4 hoog, TRAb positief. PTU in trimester 1 (thiamazol teratogeen), daarna switch naar thiamazol.', type: 'warn' },
            { label: 'Zwangerschapshyperthyreoïdie', desc: 'Door hCG-stimulatie eerste trimester — fysiologisch. TSH iets verlaagd maar T4 normaal. Geen behandeling nodig.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Start levothyroxine direct bij TSH >2,5 mIE/L in trimester 1 — niet wachten.',
            stappen: [
              { naam: 'Levothyroxine dosis', detail: 'Start 50-100 mcg/dag. Controleer TSH elke 4 weken in eerste helft zwangerschap. Dosis stijgt gemiddeld 25-50% in zwangerschap.' },
              { naam: 'Doel', detail: 'TSH <2,5 mIE/L (trimester 1) of <3 mIE/L (trimester 2-3). Vrij T4 normaal.' },
              { naam: 'Postpartum', detail: 'Na bevalling dosis terugbrengen naar pre-zwangerschapsdosis. TSH controleren na 6 weken.' },
            ],
          },
        } },


  { type:'truefalse', d:2, domain:'endo', dl:'Endocrinologie',
    q:'Hypercalciëmie bij een patiënt met maligniteit berust vrijwel altijd op botmetastasen.',
    c:false,
    ex:'NIET WAAR. Hypercalciëmie bij maligniteit kan ook ontstaan door humorale hypercalciëmie van maligniteit (HHM): tumorproductie van PTHrP (PTH-related protein), dat dezelfde receptor activeert als PTH. HHM is verantwoordelijk voor 80% van de maligne hypercalciëmie, botmetastasen voor ~20%.',
    wiki:{
          kern: 'Hypercalciëmie bij maligniteit is in 80% te wijten aan PTHrP (humorale hypercalciëmie), niet aan botmetastasen (20%). PTHrP bindt PTH-receptor → botresorptie + renale calciumretentie → hypercalciëmie terwijl PTH zelf laag is.',
          mechanisme: [
            { title: 'PTHrP-mechanisme', desc: 'Tumor produceert PTH-related protein → bindt PTH-receptor → botresorptie via osteoclasten + renale Ca-resorptie → hypercalciëmie. PTH zelf laag (negatieve feedback).' },
            { title: 'Oorzaken hypercalciëmie', desc: '(1) Primaire HPT: PTH hoog (poliklinisch). (2) Maligniteit: PTHrP of metastasen (ziekenhuis). (3) Sarcoidose/vitD-toxiciteit: 1,25-OHD hoog. (4) FHH: familiaire hypocalciurische hypercalciëmie.' },
            { title: 'Symptomen', desc: '"Bones, stones, groans, psychic moans": botpijn, nierstenen, obstipatie/misselijkheid, depressie/psychose/verwardheid. Bij Ca >3,5: nierinsufficiëntie, hartaritmieën.' },
          ],
          onderscheid: [
            { label: 'Maligniteit (PTHrP)', desc: 'PTH laag, PTHrP hoog, snelle onset, ernstige hypercalciëmie. Plaveiselcelca, RCC, borstca, myeloom.', type: 'ok' },
            { label: 'Primaire hyperparathyreoïdie', desc: 'PTH hoog (ondanks hoog calcium), asymptomatisch of nierstenen. Adenoom 80%. Operatie bij symptomen.', type: 'warn' },
            { label: 'Sarcoidose', desc: '1,25-OHD hoog (macrofagen activeren vitamine D), verhoogd ACE, lymfadenopathie.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Ernstige hypercalciëmie (Ca >3,0): IV NaCl 0,9% 200-300 mL/u + furosemide na vochtresuscitatie.',
            stappen: [
              { naam: 'Bisfosfonaten', detail: 'Zoledronaat 4 mg IV eenmalig — remt osteoclasten, effect na 2-4 dagen, werkt 3-4 weken. Eerste keus bij maligne hypercalciëmie.' },
              { naam: 'Denosumab', detail: 'Anti-RANK-L antilichaam — effectief bij bisfosfonaat-refractaire hypercalciëmie of nierinsufficiëntie.' },
              { naam: 'Behandeling oorzaak', detail: 'Bij maligniteit: behandel tumor. Bij primaire HPT: parathyroïdectomie curatief.' },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'endo', dl:'Endocrinologie',
    q:'SGLT2-remmers (gliflozines) zijn gecontra-indiceerd bij patiënten met diabetes type 2 en chronische nierziekte omdat ze de nierfunctie verslechteren.',
    c:false,
    ex:'NIET WAAR. SGLT2-remmers (empagliflozine, dapagliflozine) zijn juist nefroprotectief bij DM type 2 + chronische nierziekte: ze verminderen glomerulaire hyperfiltratie en verlagen het risico op progressie van nierziekte. Ze zijn gecontra-indiceerd bij eGFR <20-30 (onvoldoende glucosurie-effect).',
    wiki:{
          kern: 'SGLT2-remmers zijn juist nefroprotectief bij DM2 + chronische nierziekte. Ze verminderen glomerulaire hyperfiltratie via tubuloglomerulair feedback. Ze zijn gecontraïndiceerd bij eGFR <20-30 (glucosurie-effect onvoldoende).',
          mechanisme: [
            { title: 'SGLT2-blokkade', desc: 'Minder natriumresorptie proximale tubulus → meer natrium bij macula densa → tubuloglomerulair feedback → afferent arteriol constrictie → verlaagde glomerulaire druk → nefroprotectie.' },
            { title: 'Cardiobescherming', desc: 'EMPA-REG/DECLARE: empagliflozine/dapagliflozine verminderen hartfalen-hospitalisaties bij DM2 + HVZ. Effect deels glucosonafhankelijk (preload-verlaging, ketonen als energiebron).' },
            { title: 'Bijwerkingen', desc: 'Urogenitale infecties (glucosurie creëert suikerrijke urine). Euglykemische DKA (zeldzaam, cave perioperatief). Stop 3-4 dagen voor ingreep.' },
          ],
          onderscheid: [
            { label: 'SGLT2-remmers (nefroprotectief)', desc: 'Stop bij eGFR <20-30. Cardioprotectief bij HFrEF (ook zonder diabetes). Glucosurie-effect verdwijnt bij lage eGFR.', type: 'ok' },
            { label: 'GLP-1 agonisten', desc: 'Gewichtsverlies + cardiovasculair voordeel bij atherosclerose. Geen direct niereffect. Subcutane injectie.', type: 'warn' },
            { label: 'ACE-remmers/ARB', desc: 'Ook nefroprotectief via reductie intraglomerulaire druk — combineer met SGLT2-remmer bij DM2-nefropathie.', type: 'warn' },
          ],
          therapie: {
            urgent: 'Perioperatief: stop SGLT2-remmer 3-4 dagen voor ingreep (euglykemische DKA-preventie).',
            stappen: [
              { naam: 'DM2 + chronische nierziekte', detail: 'Empagliflozine/dapagliflozine eerste keus (naast metformine) bij eGFR ≥20 — vertragen nierfalen progressie (DAPA-CKD, EMPA-KIDNEY).' },
              { naam: 'DM2 + hartfalen (HFrEF)', detail: 'Dapagliflozine vermindert hospitalisaties en mortaliteit. Indicatie onafhankelijk van DM-diagnose (DAPA-HF studie).' },
              { naam: 'Monitoring', detail: 'Controleer eGFR voor start en periodiek. Stop bij eGFR <20. Alert op urogenitale infecties.' },
            ],
          },
        } },

  { type:'diagnose', d:5, domain:'endo', dl:'Endocrinologie', subtype:'diff',
    q:'Welk kenmerk onderscheidt primaire van secundaire bijnierschorsinsufficiëntie?',
    a:['Hyperpigmentatie van huid en slijmvliezen','Hypotensie','Hyponatriëmie','Vermoeidheid en zwakte'], c:0,
    ex:'Hyperpigmentatie is specifiek voor primaire bijnierschorsinsufficiëntie (Addison). Daarbij stijgt ACTH compensatoir → MSH (melanocyte-stimulating hormone) als bijproduct → melaninestimulatie. Bij secundaire insufficiëntie is ACTH laag → geen pigmentatie. Hypotensie, hyponatriëmie en moeheid komen bij beide voor.',
    wiki:{
          kern: 'Hyperpigmentatie is pathognomonisch voor primaire bijnierschorsinsufficiëntie (Addison). Hoge ACTH stimuleert MSH-receptoren op melanocyten. Bij secundaire insufficiëntie is ACTH laag — geen pigmentatie.',
          mechanisme: [
            { title: 'ACTH-MSH-axis', desc: 'POMC (ACTH-precursor) gesplitst in ACTH + MSH. MSH bindt MC1R op melanocyten → melanine. Locaties: zon-exposed huid, handpalmen, littekens, tandvlees, wangmucosa.' },
            { title: 'Primaire insufficiëntie', desc: 'Bijnier beschadigd (autoimmuun in 70%, tuberculose, bloeding) → cortisol + aldosteron tekort → hyponatriëmie + hyperkaliëmie + hypotensie. ACTH hoog als compensatie.' },
            { title: 'Secundaire insufficiëntie', desc: 'Hypofyse/hypothalamus probleem → ACTH laag → cortisol tekort maar aldosteron normaal (renine-angiotensine intact). Geen pigmentatie, geen hyperkaliëmie.' },
          ],
          onderscheid: [
            { label: 'Primair (Addison)', desc: 'ACTH hoog, cortisol laag, aldosteron laag, hyperpigmentatie, hyponatriëmie + hyperkaliëmie. Auto-antistoffen (21-OH-Ab).', type: 'ok' },
            { label: 'Secundair (hypofyse)', desc: 'ACTH laag, cortisol laag, aldosteron normaal, geen pigmentatie, geen hyperkaliëmie. Oorzaak: tumor, bestraling, Sheehan.', type: 'warn' },
            { label: 'Iatrogeen (steroïd-onttrekking)', desc: 'Na plotse stop langdurige corticosteroïden — secundair type (HPA-as gesupprimeerd). Nooit abrupt stoppen na >3 weken gebruik.', type: 'danger' },
          ],
          therapie: {
            urgent: 'Addisoncrisis: hydrocortison 100 mg IV bolus → 200 mg/24u continu IV + NaCl 0,9% 1L over 30-60 min.',
            stappen: [
              { naam: 'Onderhoudstherapie', detail: 'Hydrocortison 15-25 mg/dag (ochtend hogere dosis imiteren circadiaan ritme) + fludrocortison 0,05-0,2 mg/dag (mineraalcorticoïd).' },
              { naam: 'Ziektedag-regel', detail: 'Bij koorts/infectie: hydrocortison 2-3× verhogen. Bij braken: parenterale toediening. Patiënt krijgt spuitinstructie voor noodgeval.' },
              { naam: 'ACTH-stimulatietest', detail: 'Cortisol na 250 mcg ACTH <550 nmol/L na 30 min = bijnierschorsinsufficiëntie.' },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Patiënte van 28 jaar, oligomenorroe, acne, hirsutisme, overgewicht, polycysteuze ovaria op echo. LH/FSH-ratio verhoogd. Diagnose?',
    a:['Polycysteus ovariumsyndroom (PCOS)','Congenitale bijnierhyperplasie','Hyperprolactinemie','Primaire ovariuminsufficiëntie'], c:0,
    ex:'PCOS is de meest voorkomende endocriene aandoening bij vrouwen in de vruchtbare leeftijd (5-10%). Rotterdam-criteria (≥2 van 3): oligo-/anovulatie, hyperandrogenisme (klinisch of biochemisch), polycysteuze ovaria op echo.',
    wiki:{
          kern: "PCOS: chronische anovulatie + hyperandrogenisme. Insulineresistentie speelt een centrale rol (ook bij slanke PCOS-patiënten).",
          mechanisme: [
            { title: "Stap 1", desc: "LH/FSH-ratio >2.5 bij PCOS: verhoogde LH-pulsatie." },
            { title: "Stap 2", desc: "meer androgeenstimulatie van theca-cellen." },
            { title: "Stap 3", desc: "testosteron/DHEAS stijgt." },
            { title: "Stap 4", desc: "perifere aromatisering naar oestrogeen. Overgewicht verergert insulineresistentie." },
            { title: "Stap 5", desc: "hyperandrogenisme." },
          ],
          onderscheid: [
            { label: "Congenitale bijnierhyperplasie (laat-onset)", desc: "17-OHP verhoogd na ACTH-stimulatie.", type: 'ok' },
            { label: "Hyperprolactinemie", desc: "galactorroe, prolactine hoog, MRI hypofyse.", type: 'warn' },
            { label: "POI (premature ovarian insufficiency)", desc: "FSH hoog, oestradiol laag, <40 jaar.", type: 'danger' },
          ],
          therapie: {
            urgent: "Infertiliteitswens: ovulatie-inductie (clomifen, letrozol), metformine.",
            stappen: [
              { naam: "Geen zwangerschapswens", detail: "combinatiepil (androgeen-antagonistisch: cyproteronacetaat)." },
              { naam: "Leefstijl", detail: "gewichtsreductie verbetert cyclus en insulinegevoeligheid." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Man van 60 jaar, nierstenen, osteoporose, mild hypercalciëmie. PTH verhoogd. Calcium en PTH verhoogd bij herhaalde bepaling. Diagnose?',
    a:['Primaire hyperparathyreoïdie','Maligne hypercalciëmie','Sarcoidose','Vitamine D-toxiciteit'], c:0,
    ex:'Primaire hyperparathyreoïdie: autonome overproductie van PTH door een bijschildklieradenoom (85%) of hyperplasie. Kenmerkend: hoog PTH + hoog calcium (normaal: negatieve feedback onderdrukt PTH bij hypercalciëmie). Meest voorkomende oorzaak van hypercalciëmie in de polikliniek.',
    wiki:{
          kern: "Primaire hyperparathyreoïdie: PTH stimuleert botresorptie + renale calciumresorptie + 1-α-hydroxylase (meer actief vitamine D) → hypercalciëmie + hyperfosfaturie (laag fosfaat). Nierstenen (calciumoxalaat/-fosfaat), fibrocystische botafwijkingen, osteoporose.",
          mechanisme: [
            { title: "Stap 1", desc: "Sestamibi-scintigrafie of echo hals: lokalisatie bijschildklieradenoom." },
            { title: "Laboratorium", desc: "hoog PTH, hoog calcium, laag fosfaat, hoog urine-calcium." },
            { title: "Stap 3", desc: "Differentiatie van maligne hypercalciëmie: PTH laag bij maligniteit (PTHrP niet detecteerbaar in PTH-assay, maar separate assay beschikbaar)." },
          ],
          onderscheid: [
            { label: "Familiale hypocalciurische hypercalciëmie (FHH)", desc: "hoog calcium, hoog PTH, maar laag urine-calcium (calcium/creatinine-ratio <0.01) → geen chirurgie nodig.", type: 'ok' },
            { label: "Secundaire HPT", desc: "bij nierinsufficiëntie of vit.", type: 'warn' },
            { label: "Optie 3", desc: "D-tekort → hoog PTH maar laag/normaal calcium.", type: 'danger' },
          ],
          therapie: {
            urgent: "Asymptomatisch mild: follow-up (calcium, eGFR, botdichtheid).",
            stappen: [
              { naam: "Operatie-indicaties", detail: "calcium >2.85 mmol/L, eGFR <60, osteoporose (T-score <-2.5), leeftijd <50j." },
              { naam: "Chirurgie", detail: "parathyreoïdectomie (curatief bij adenoom >95%)." },
            ],
          },
        } },


  // ── NEFROLOGIE ──
  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Man van 70 jaar, oligurie 2 dagen na hartoperatie. Creatinine gestegen van 90 naar 310 μmol/L. Urine-natriumconcentratie 12 mmol/L, urine-osmolaliteit 580 mOsm/kg. Meest waarschijnlijke oorzaak?',
    a:['Prerenaal acuut nierfalen','Renaal acuut nierfalen (ATN)','Postrenaal acuut nierfalen','Contrastnefropathie'], c:0,
    ex:'Prerenaal nierfalen: lage urine-Na (<20) + hoge osmolaliteit (>500) = intact tubulussysteem dat reageert op volumedepletie. ATN: urine-Na >40 + lage osmolaliteit.',
    wiki:{
          kern: "Acute nierinsufficiëntie (AKI): prerenaal (60%, verminderde perfusie), renaal (35%, acute tubulusnecrose (ATN) meest frequent), postrenaal (5%, obstructie). KDIGO: creatinine stijging ≥1,5× binnen 7 dagen of oligurie <0,5 mL/kg/u >6 uur.",
          redflag: "NSAID's + ACE-remmers bij volumedepletie → snelle progressie naar oligurie en dialyseplichtig nierfalen. Stop beide direct bij acuut nierfalen.",
          mechanisme: [
            { title: "Fractionele natriumexcretie (FENa)", desc: "FENa = (urine-Na × serum-Cr) / (serum-Na × urine-Cr) × 100%. FENa <1% = prerenaal; FENa >2% = renaal (ATN)." },
            { title: "Beperking FENa", desc: "Onbetrouwbaar bij gebruik van diuretica, contrastnefropathie of rhabdomyolyse." },
          ],
          onderscheid: [
            { label: "Prerenaal AKI", desc: "Herstelt snel na volumecorrectie — geen tubulaire schade. Urine-Na laag, osmolaliteit hoog.", type: 'ok' },
            { label: "ATN (renaal)", desc: "Tubuli beschadigd → granulaire ('muddy brown') casts in urinesediment. Herstel in 1-3 weken.", type: 'warn' },
            { label: "Interstitiële nefritis", desc: "Na medicatie (NSAID's, antibiotica): eosinofilie, huiduitslag, eosinofilurie — stop causalagent.", type: 'danger' },
          ],
          therapie: {
            urgent: "Prerenaal: vloeistofsuppletie + staken nefrotoxica (NSAID's, ACE-remmers, contrast).",
            stappen: [
              { naam: "ATN", detail: "Ondersteunend — handhaven diurese, elektrolytcontrole, voeding." },
              { naam: "Dialyse-indicaties", detail: "Refractaire hyperkaliëmie, uremische encefalopathie/pericarditis, acidose (pH <7,1), vochtoverbelasting." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Vrouw van 25 jaar, oedeem gehele lichaam, proteïnurie 6 g/24u, hypoalbuminemie (20 g/L), hypercholesterolemie. Bloeddruk normaal. Diagnose?',
    a:['Nefrotisch syndroom','Nefritisch syndroom','Hartfalen','Levercirrose'], c:0,
    ex:'Nefrotisch syndroom: proteïnurie >3,5 g/24u + hypoalbuminemie + oedeem + hypercholesterolemie — zonder hematurie.',
    wiki:{
          kern: "Nefrotisch syndroom: podocytschade → verlies van glomerulaire barrière → massale eiwitexcretie. Oorzaken: minimale veranderingsziekte (kinderen, 90%), membraneuze nefropathie (volwassenen), diabetische nefropathie.",
          redflag: "Nierveentrombose bij nefrotisch syndroom: verlies van antitrombine III via urine → hypercoagulabel. Denk aan flankpijn + acute GFR-daling — direct beeldvorming.",
          mechanisme: [
            { title: "Cascade", desc: "Podocytbeschadiging → basaalmembraan permeabel → massale proteïnurie → hypoalbuminemie → oncotische druk daalt → oedeem. Lever compenseert met lipoproteïneproductie → hypercholesterolemie." },
            { title: "Tromboserisico", desc: "Verlies van antitrombine III, proteïne C en S → verhoogd risico op diep veneuze trombose, longembolie en nierveentrombose." },
          ],
          onderscheid: [
            { label: "Hartfalen", desc: "Oedeem + verhoogde centraalveneuze druk + dyspneu — proteïnurie mild.", type: 'ok' },
            { label: "Levercirrose", desc: "Ascites dominant, splenomegalie, leverenzymen afwijkend — albumine daalt door leverfalen.", type: 'warn' },
            { label: "Nefritisch syndroom", desc: "Hematurie + RBC-casts + hypertensie — proteïnurie minder extreem.", type: 'danger' },
          ],
          therapie: {
            urgent: "Minimale veranderingsziekte: prednisolon 1 mg/kg/dag — remissie in 90%.",
            stappen: [
              { naam: "Membraneuze nefropathie", detail: "Afwachtend of immunosuppressie (cyclofosfamide of rituximab) — afhankelijk van PLA2R-antilichamen en progressie." },
              { naam: "ACE-remmer", detail: "Antiproteinurisch effect + bloeddrukcontrole." },
              { naam: "Anticoagulatie", detail: "Overwegen bij serumalbumine <20 g/L of nierveentrombose." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Man van 65 jaar, nierfalen, diabetes 15 jaar, retinopathie. Urineanalyse: microalbuminurie (280 mg/g creatinine). eGFR 35 mL/min/1.73m². Meest waarschijnlijke diagnose?',
    a:['Diabetische nefropathie','IgA-nefropathie','Hypertensieve nefrosclerose','FSGS'], c:0,
    ex:'Diabetische nefropathie: microalbuminurie → macroalbuminurie → GFR-daling. Gelijktijdige retinopathie bevestigt microvasculaire betrokkenheid.',
    wiki:{
          kern: "Diabetische nefropathie: meest voorkomende oorzaak van eindstadium nierziekte (ESRD) wereldwijd. Stadia: normoalbuminurie → microalbuminurie (30-300 mg/g) → macroalbuminurie (>300 mg/g) → GFR-daling.",
          redflag: "Proteïnurie bij diabetes zónder retinopathie: overweeg alternatieve diagnose (IgA, hypertensieve nefrosclerose) — biopsie indien twijfel.",
          mechanisme: [
            { title: "Hyperglykemie-cascade", desc: "Chronische hyperglykemie → advanced glycation end-products (AGE), PKC-activatie, TGF-β-upregulatie → mesangiumexpansie → Kimmelstiel-Wilson noduli (pathognomonisch op biopsie) → glomerulosclerose." },
            { title: "RAAS-overactivatie", desc: "Verhoogde intraglomerulaire druk via efferente arteriole constrictie → versnelt progressie. ACE-remmer/ARB verlaagt deze druk en proteïnurie." },
          ],
          onderscheid: [
            { label: "IgA-nefropathie", desc: "Hematurie + proteïnurie, vaak na infectie, IgA-deposities op immunofluorescentie.", type: 'ok' },
            { label: "Hypertensieve nefrosclerose", desc: "Lang bestaande hypertensie, milde proteïnurie, geen retinopathie.", type: 'warn' },
            { label: "Focaal segmentale glomerulosclerose (FSGS)", desc: "Ernstige proteïnurie, biopsie nodig voor diagnose — kan veroorzaakt worden door obesitas of HIV.", type: 'danger' },
          ],
          therapie: {
            urgent: "ACE-remmer of angiotensinereceptorblokker (ARB): antiproteinurisch + nefroprotectief — eerste keus.",
            stappen: [
              { naam: "Glucosecontrole", detail: "HbA1c <53 mmol/mol (7%)." },
              { naam: "SGLT2-remmer", detail: "Nefroprotectief ongeacht bloedglucose (CREDENCE, DAPA-CKD) — tweede keus naast ACE-remmer." },
              { naam: "Finerenon", detail: "Niet-steroid mineralocorticoïdreceptorantagonist (MRA) — additionele nefroprotectie bij DM2 + CKD." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Man van 45 jaar, hypertensie, hematurie, nierpijn. Echo: bilateraal vergrote nieren met multipele cysten. Vader had hetzelfde. Diagnose?',
    a:['Autosomaal dominante polycysteuze nierziekte (ADPKD)','Multipele niercarcinomen','Medulaire sponsnieren','Von Hippel-Lindau syndroom'], c:0,
    ex:'ADPKD: bilateraal vergrote cysteuze nieren + familieanamnese. PKD1 (85%) of PKD2 (15%) — meest voorkomende erfelijke nierziekte.',
    wiki:{
          kern: "Autosomaal dominante polycysteuze nierziekte (ADPKD): progressieve cystengroei → compressie nierparenchym → nierfalen bij 50% voor 60e jaar. Extrarenaal: levercysten (90%), intracraniale aneurysma's (10%), mitralisklepinsufficiëntie.",
          redflag: "Intracraniale aneurysma's bij 10% van ADPKD-patiënten — ruptur = subarachnoïdale bloeding. Screening met MRA-cerebrum bij positieve familieanamnese voor hersenbloeding.",
          mechanisme: [
            { title: "Pathogenese", desc: "PKD1/PKD2-mutaties verstoren ciliaire signaaloverdracht in tubulusepitheel → mTOR-overactivatie → abnormale celproliferatie en cystevorming." },
            { title: "Progressie", desc: "Totaal niervolume (TKV) op MRI is biomarker voor progressiesnelheid — basis voor indicatiestelling tolvaptan." },
          ],
          onderscheid: [
            { label: "ARPKD (autosomaal recessief)", desc: "Presentatie bij kinderen, leverfibrose + portale hypertensie.", type: 'ok' },
            { label: "Verworven cysteuze nieraandoening", desc: "Na langdurige dialyse — geen familieanamnese.", type: 'warn' },
            { label: "Von Hippel-Lindau (VHL)", desc: "Cysten + hemangioblastomen + niercelcarcinoom — VHL-genmutatie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Bloeddrukcontrole: ACE-remmer (streefwaarde <110/75 mmHg bij jongere patiënten).",
            stappen: [
              { naam: "Tolvaptan", detail: "Vasopressine-2-receptorantagonist — vertraagt cystengroei bij snelgroeiend ADPKD (TKV >750 mL). Let op levertoxiciteit." },
              { naam: "Aneurysma-screening", detail: "MRA-cerebrum bij familieanamnese subarachnoïdale bloeding of symptomen (hoofdpijn)." },
            ],
          },
        } },

  { type:'lab', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Patiënt met chronische nierinsufficiëntie (eGFR 18 mL/min). Lab: K+ 6.2 mmol/L, pH 7.28, HCO3- 14 mmol/L, ECG: piekende T-toppen. Welke behandeling heeft de hoogste prioriteit?',
    a:['Calcium gluconaat intraveneus','Kaliumbeperkt dieet','Natriumwaterstofcarbonaat oraal','Furosemide intraveneus'], c:0,
    ex:'Hyperkaliëmie + ECG-veranderingen (piekende T-toppen) = levensbedreiging. Eerste stap: calcium gluconaat IV voor myocardstabilisatie.',
    wiki:{
          kern: "ECG-progressie bij hyperkaliëmie: piekende T-toppen → PR-verlenging, breed QRS → sinusoïdaal patroon → ventrikelfibrilleren. Behandeling in drie stappen: (1) myocardstabilisatie, (2) K+ intracellulair, (3) K+ verwijderen.",
          redflag: "K+ >6,5 mmol/L of sinusoïdaal ECG-patroon = imminent ventrikelfibrilleren. Direct calcium gluconaat IV — wacht niet op laboratoriumbevestiging als ECG-veranderingen aanwezig zijn.",
          mechanisme: [
            { title: "Myocardstabilisatie", desc: "Calcium gluconaat 10% 10 mL IV over 2-3 min — verhoogt actiepotentiaal-drempel. Werkt binnen 5 min maar effect duurt slechts 30-60 min." },
            { title: "K+ intracellulair", desc: "Insuline 10 E + glucose 50 mL 50% IV → Na/K-ATPase-activatie → K+ daalt 0,5-1 mmol/L binnen 30 min. Duur 4-6 uur." },
            { title: "K+ verwijderen", desc: "Kayexalaat of patiromer (oraal), furosemide IV bij resterende diurese, hemodialyse bij dialyseplichtige nierinsufficiëntie." },
          ],
          onderscheid: [
            { label: "K+ 5.5-6.0 zonder ECG-veranderingen", desc: "Dieet (kaliumbeperking), medicatieherziening (stop ACE-remmer, kaliumsparend diureticum), kayexalaat.", type: 'ok' },
            { label: "Pseudo-hyperkaliëmie", desc: "Hemolyse bij bloedafname — controleer met nieuw monster voor behandeling.", type: 'warn' },
          ],
          therapie: {
            urgent: "ECG-veranderingen: calcium gluconaat 10% 10 mL IV over 2-3 min → herhaal na 5 min indien nodig.",
            stappen: [
              { naam: "K+ intracellulair drijven", detail: "Insuline 10 E + glucose 50% 50 mL IV. Salbutamol 10-20 mg vernevelend als aanvulling." },
              { naam: "K+ verwijderen", detail: "Kayexalaat of patiromer, furosemide IV bij diurese, hemodialyse bij refractaire hyperkaliëmie." },
              { naam: "Monitoring", detail: "Continu ECG + K+-controle elk uur tot K+ <5,5 mmol/L." },
            ],
          },
        } },


  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Vrouw van 22 jaar, pijn bij het plassen, frequente aandrang, troebele urine, koorts 37.8°C. Urineanalyse: leukocyturie, nitriet positief. Geen flankpijn. Diagnose?',
    a:['Ongecompliceerde urineweginfectie (cystitis)','Pyelonefritis','Urethritis door Chlamydia','Interstitiële cystitis'], c:0,
    ex:'Cystitis: dysurie + pollakisurie + nitriet positief — zonder koorts of flankpijn. Verwekker: E. coli (85%). Behandeling: nitrofurantoïne of trimethoprim.',
    wiki:{
          kern: "Urineweginfectie (UWI): ongecompliceerd (vrouwen, geen anatomische afwijking) vs. gecompliceerd (mannen, zwangerschap, obstructie, katheter, diabetes). Verwekkers: E. coli, Staphylococcus saprophyticus (jonge vrouwen).",
          redflag: "UWI bij mannen of kinderen altijd aanleiding voor uitgebreider onderzoek — anatomische afwijkingen (hydronefrose, vesico-ureterale reflux) moeten worden uitgesloten.",
          mechanisme: [
            { title: "Ascensie", desc: "Bacteriën koloniseren de periurethrale regio → ascenderen via de urethra naar de blaas → cystitis. Bij verdere ascensie naar nierparenchym → pyelonefritis." },
            { title: "Nitriettest", desc: "Gram-negatieve bacteriën reduceren nitraat → nitriet. Combinatie nitriet + leukocyten-esterase = hoge voorspellende waarde." },
          ],
          onderscheid: [
            { label: "Pyelonefritis", desc: "Flankpijn + koorts >38°C + misselijkheid — nierparenchym aangedaan, IV antibiotica overwegen.", type: 'ok' },
            { label: "Urethritis (Chlamydia/gonorroe)", desc: "Geen nitriet, atypisch sediment, seksueel actief, cave meldingsplicht.", type: 'warn' },
            { label: "Interstitiële cystitis", desc: "Chronisch, steriel urinesediment — blaas-biopsiediagnose.", type: 'danger' },
          ],
          therapie: {
            urgent: "Ongecompliceerde cystitis: nitrofurantoïne 100 mg 2×/dag 5 dagen of trimethoprim 200 mg 2×/dag 7 dagen.",
            stappen: [
              { naam: "Resistentie", detail: "Fluoroquinolonen (ciprofloxacine) niet als eerste keus — bewaar voor pyelonefritis en gecompliceerde UWI." },
              { naam: "Recidief (≥3/jaar)", detail: "Lage-dosisprofylaxe of post-coïtale profylaxe. Cranberry beperkt bewijs." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Jongen van 8 jaar, 2 weken na keelinfectie: hematurie, oedeem, hypertensie, oligurie. Complement C3 verlaagd. Meest waarschijnlijke diagnose?',
    a:['Post-streptokokken glomerulonefritis','IgA-nefropathie','Minimale veranderingsziekte','HUS (hemolytisch-uremisch syndroom)'], c:0,
    ex:'Post-streptokokken GN: 1-3 weken na keelinfectie (S. pyogenes) + hematurie + hypertensie + laag C3. Zelflimiterend bij kinderen.',
    wiki:{
          kern: "Post-streptokokken glomerulonefritis: immuuncomplexdepositie (IgG + C3) → complementactivatie → diffuse proliferatieve GN. Biopsie: subepitheliale deposits ('humps'). ASLO-titer bevestigt recente streptokokkeninfectie.",
          redflag: "Snel progressieve glomerulonefritis (RPGN): acuut nierfalen + hematurie + >50% crescents op biopsie → spoed immunosuppressie (methylprednisolon-pulsen ± cyclofosfamide). Uren tellen — irreversibel nierfalen bij vertraging.",
          mechanisme: [
            { title: "Immuuncomplex-cascade", desc: "Anti-streptokokken-antistoffen reageren kruisreactief met glomerulaire antigenen → immuuncomplexen → complementactivatie → ROS en prostaglandinen → GFR-daling." },
            { title: "Onderscheid met IgA-nefropathie", desc: "IgA-nefropathie geeft hematurie binnen 24-48 uur tijdens de infectie (synfaryngitisch); post-streptokokken GN na 1-3 weken. C3 is laag bij post-strep GN, normaal bij IgA." },
          ],
          onderscheid: [
            { label: "IgA-nefropathie", desc: "Hematurie tijdens (niet ná) infectie, C3 normaal, IgA-deposities op immunofluorescentie.", type: 'ok' },
            { label: "HUS", desc: "Microangiopathische hemolytische anemie + trombocytopenie + AKI na E. coli O157:H7-infectie.", type: 'warn' },
            { label: "Membranoproliferatieve GN", desc: "Aanhoudend laag C3 — onderscheid met post-streptokokken GN (C3 herstelt binnen 6-8 weken).", type: 'danger' },
          ],
          therapie: {
            urgent: "Ondersteunend: vochtrestrictie, antihypertensiva, diureticum. Antibiotica voor actieve streptokokkeninfectie.",
            stappen: [
              { naam: "Prognose kinderen", detail: "Volledig herstel in >95% — C3 normaliseert binnen 6-8 weken." },
              { naam: "Volwassenen", detail: "Hogere kans op chronische nierziekte — follow-up nierfunctie en bloeddruk aanbevolen." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'nephro', dl:'Nefrologie',
    q:'ACE-remmers zijn gecontra-indiceerd bij alle patiënten met chronische nierziekte vanwege het risico op verdere nierschade.',
    c:false,
    ex:'NIET WAAR: ACE-remmers zijn juist nefroprotectief bij chronische nierziekte — verlagen intraglomerulaire druk en proteïnurie.',
    wiki:{
          kern: "ACE-remmers (en angiotensinereceptorblokkers, ARBs): verlagen efferente arteriole tonus → intraglomerulaire druk daalt → minder podocytstress → minder proteïnurie → vertraagde progressie nierziekte.",
          redflag: "Bilaterale nierslagaderstenose: ACE-remmer blokkeert efferente arteriole vaatverwijding → perfusiedruk nieren daalt → acuut ischemisch nierfalen. Absoluut gecontra-indiceerd.",
          mechanisme: [
            { title: "Hemodynamisch effect bij start", desc: "Creatinine stijging <30% na start ACE-remmer is acceptabel — hemodynamische aanpassing, geen echte nierschade." },
            { title: "Stop-criteria", desc: "Creatinine-stijging >30%, K+ >5,5 mmol/L of bilaterale nierslagaderstenose — stop direct." },
          ],
          onderscheid: [
            { label: "Absoluut gecontra-indiceerd", desc: "Bilaterale nierslagaderstenose (ischemisch nierfalen), zwangerschap (teratogeen — ACE-remmer-embryopathie).", type: 'ok' },
            { label: "Voorzichtigheid bij eGFR <30", desc: "Lagere baten-risicoverhouding, maar niet absoluut gecontra-indiceerd — intensieve monitoring vereist.", type: 'warn' },
          ],
          therapie: {
            urgent: "Start ACE-remmer bij CKD met proteïnurie >300 mg/dag — tenzij contra-indicatie.",
            stappen: [
              { naam: "Monitoring", detail: "Creatinine en K+ na 1-2 weken — stijging creatinine <30% acceptabel, K+ <5,5 mmol/L." },
              { naam: "Streefwaarden", detail: "Bloeddruk <130/80 mmHg, proteïnurie zo laag mogelijk (<300 mg/24u indien haalbaar)." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'nephro', dl:'Nefrologie',
    q:'Een patiënt met een eGFR van 15 mL/min heeft per definitie hemodialyse nodig.',
    c:false,
    ex:'NIET WAAR: dialyse-beslissing op basis van uremische symptomen — niet alleen op eGFR. Sommige patiënten met eGFR <15 zijn symptoomarm.',
    wiki:{
          kern: "Nierfunctievervangende therapie (RRT): hemodialyse (HD), peritoneale dialyse (PD) of niertransplantatie. ESRD = eGFR <15 per definitie — maar dit is niet de drempel voor dialyse.",
          redflag: "Uremische pericarditis en uremische encefalopathie zijn absolute indicaties voor acute dialyse — uitstel verhoogt risico op pericardtamponade en coma.",
          mechanisme: [
            { title: "Voorbereiding bij eGFR 10-15", desc: "AV-fistel aanleggen (minstens 6 maanden voor HD-start) of evaluatie voor niertransplantatie — plan vroeg." },
            { title: "Dialyse-indicaties", desc: "Uremische symptomen (pruritus, pericarditis, encefalopathie), vochtoverbelasting refractair voor diuretica, refractaire hyperkaliëmie, metabole acidose (pH <7,1)." },
          ],
          onderscheid: [
            { label: "Niertransplantatie", desc: "Superieur aan dialyse qua overleving en kwaliteit van leven — altijd eerste keus bij geschikte kandidaat.", type: 'ok' },
            { label: "Pre-emptieve transplantatie", desc: "Vóór start dialyse bij geschikte levende donor — optimaal resultaat.", type: 'warn' },
            { label: "Peritoneale dialyse (CAPD)", desc: "Thuis, continue behandeling — geschikt voor zelfstandige patiënten, minder cardiovasculaire belasting dan HD.", type: 'danger' },
          ],
          therapie: {
            urgent: "Start RRT bij uremische symptomen of refractaire complicaties — niet puur op eGFR-drempel.",
            stappen: [
              { naam: "Voorbereiding (eGFR 10-15)", detail: "AV-fistel (minimaal 6 maanden voor HD) of transplantatie-evaluatie opstarten." },
              { naam: "Modaliteitskeuze", detail: "HD 3× per week in centrum of CAPD thuis — beslissing met patiënt op basis van voorkeur, comorbiditeit en resterende nierfunctie." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'nephro', dl:'Nefrologie',
    q:'Hyponatriëmie (Na+ <135 mmol/L) is altijd een teken van een tekort aan natrium in het lichaam.',
    c:false,
    ex:'NIET WAAR: hyponatriëmie is een spiegel-stoornis — zegt niets over totale natriumhoeveelheid. Oorzaak bepaalt behandeling (SIADH, hartfalen, volumetekort).',
    wiki:{
          kern: "Hyponatriëmie (Na+ <135): (1) Hypervolemisch — hartfalen, levercirrose, nefrotisch. (2) Euvolemisch — SIADH, hypothyreoïdie, bijnierschorsinsufficiëntie. (3) Hypovolemisch — braken, diarree, diuretica.",
          redflag: "Te snelle correctie van hyponatriëmie (>10-12 mmol/L per 24u): osmotisch demyelinisatiesyndroom (centrale pontiene myelinolyse) → dysarthrie, dysfagie, paraplegié — onomkeerbaar.",
          mechanisme: [
            { title: "SIADH", desc: "Syndrome of Inappropriate ADH: ADH verhoogd ondanks lage osmolaliteit → waterretentie → hyponatriëmie. Oorzaken: longcarcinoom (paraneoplastisch), meningitis, medicatie (carbamazepine, thiaziden, SSRI)." },
            { title: "Diagnose SIADH", desc: "Urine-osmolaliteit >100 mOsm/kg + urine-natrium >30 mmol/L bij hyponatriëmie met euvolemie." },
          ],
          onderscheid: [
            { label: "Pseudohyponatriëmie", desc: "Bij hypertriglyceridemie of hyperproteïnemie — laboratoriumartefact, geen echte hyponatriëmie.", type: 'ok' },
            { label: "SIADH", desc: "Euvolemisch, urine-Na hoog, osmolaliteit hoog — behandeling: vochtrestrictie.", type: 'warn' },
            { label: "Hartfalen/cirrose", desc: "Hypervolemisch, oedeem aanwezig — behandeling: vochtrestrictie + diuretica, onderliggende oorzaak.", type: 'danger' },
          ],
          therapie: {
            urgent: "Correctie NOOIT sneller dan 8-10 mmol/L per 24 uur — gebruik hypertoon NaCl 3% alleen bij ernstige symptomen (aanval, coma).",
            stappen: [
              { naam: "Hypovolemisch", detail: "NaCl 0,9% IV — herstel volume verlaagt ADH → Na+ corrigeert spontaan." },
              { naam: "SIADH", detail: "Vochtrestrictie 500-1000 mL/dag. Tolvaptan (V2-antagonist) bij refractair SIADH." },
              { naam: "Hypervolemisch", detail: "Vochtrestrictie + furosemide. Behandeling onderliggende hartfalen of cirrose." },
            ],
          },
        } },


  { type:'diagnose', d:5, domain:'nephro', dl:'Nefrologie', subtype:'diff',
    q:'Welk urineanalyse-kenmerk onderscheidt nefritisch van nefrotisch syndroom?',
    a:['Erytrocytencasten in het urinesediment','Proteïnurie >3.5 g/24u','Oedeem en hypoalbuminemie','Hypercholesterolemie'], c:0,
    ex:'RBC-casts in urinesediment = pathognomonisch voor nefritisch syndroom (glomerulaire hematurie).',
    wiki:{
          kern: "Urinesediment: RBC-casts = glomerulonefritis (nefritisch). Granulaire casts ('muddy brown') = acute tubulusnecrose (ATN). Vette casts + ovaal vetvlichamen = nefrotisch syndroom.",
          redflag: "Crescentaire glomerulonefritis (RPGN): acuut nierfalen + hematurie + RBC-casts + >50% crescents op biopsie → spoed immunosuppressie (methylprednisolon-pulsen). Uren tellen — irreversibel nierfalen bij vertraging.",
          mechanisme: [
            { title: "Nefritisch syndroom", desc: "Glomerulaire hematurie → dysmorfische erytrocyten (acanthocyten) + RBC-casts + matige proteïnurie + hypertensie + oligurie + AKI." },
            { title: "Nefrotisch syndroom", desc: "Podocytdysfunctie → selectief eiwitverlies → hypoalbuminemie → oedeem, hyperlipidemie, trombosegevoeligheid. Sediment normaal of vette casts." },
          ],
          onderscheid: [
            { label: "IgA-nefropathie", desc: "Nefritisch + RBC-casts, recidiverende episoden na bovenstevoortractusinfectie.", type: 'ok' },
            { label: "Minimale veranderingsziekte (MCNS)", desc: "Nefrotisch — urinesediment normaal (geen casts).", type: 'warn' },
            { label: "Lupus-nefritis", desc: "Kan zowel nefritisch als nefrotisch beeld geven — 'full house' immunofluorescentie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Nefritisch syndroom met AKI of oligurie: direct nefrologie-consult voor biopsie en immunosuppressie.",
            stappen: [
              { naam: "Minimale veranderingsziekte", detail: "Prednisolon 1 mg/kg/dag — remissie in >80% binnen 4 weken." },
              { naam: "IgA-nefropathie", detail: "ACE-remmer + SGLT2-remmer. Bij progressie: methylprednisolon-kuur." },
              { naam: "Lupus-nefritis klasse III/IV", detail: "Mycofenolaat mofetil + hoge dosis corticosteroïden." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Man van 55 jaar, recidiverende nierstenen. CT toont röntgendichte stenen (calciumoxalaat). 24-uurs urineonderzoek: hypercalciurie. Welke aandoening moet als onderliggende oorzaak worden uitgesloten?',
    a:['Primaire hyperparathyreoïdie','Gicht (hyperurikemie)','Cystinurie','Struviet-infectiestenen'], c:0,
    ex:'Hypercalciurie + calciumoxalaatstenen: altijd primaire hyperparathyreoïdie (verhoogd parathyroïdhormoon) uitsluiten via PTH-bepaling — behandelbaar en niet te missen.',
    wiki:{
          kern: "Nierstenentypen: calciumoxalaat/fosfaat (70%, röntgendicht), urinezuurstenen (15%, röntgennegatief), struviet/infectiestenen (10%, röntgendicht, herthoornvormig), cystine (1%, erfelijk). CT-abdomen zonder contrast: gouden standaard.",
          redflag: "Koorts + obstructieve ureter/niersteen = geïnfecteerde obstructie met urosepsis-risico → spoedoperatie (drainage via dubbel-J-stent of nefrostomie) + IV antibiotica.",
          mechanisme: [
            { title: "Calciumoxalaatstenen", desc: "Hypercalciurie (idiopathisch, primaire hyperparathyreoïdie (HPT), immobilisatie), hyperoxalurie (Crohn, malabsorptie), lage citraatuitscheiding (metabole acidose)." },
            { title: "Urinezuurstenen", desc: "Hyperurikemie + zure urine (pH <5,5) — behandelbaar met urinealkalisatie en allopurinol." },
            { title: "Struviet-infectiestenen", desc: "Urease-producerende bacteriën (Proteus mirabilis, Klebsiella) — herthoornvormig, vult nierbekken." },
          ],
          onderscheid: [
            { label: "Urinezuurstenen", desc: "behandelbaar met urinealkalisatie (natriumbicarbonaat, allopurinol).", type: 'ok' },
            { label: "Struviet", desc: "antibiotica + chirurgische verwijdering.", type: 'warn' },
            { label: "Cystine", desc: "D-penicillamine, ruime vochtintake.", type: 'danger' },
          ],
          therapie: {
            urgent: "Acuut: pijnstilling (NSAID of morfine), hydratatie, alphablokker (tamsulosine) voor passage-bevordering.",
            stappen: [
              { naam: "Electief", detail: "extracorporele schokgolflitotripsie (ESWL) of ureteroscopie." },
              { naam: "Preventie", detail: ">2 L diurese/dag." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Vrouw van 35 jaar, recidiverende urineweginfecties na de menopauze, nu tevens flankpijn en koorts 39°C. Meest waarschijnlijke diagnose?',
    a:['Acute pyelonefritis','Ongecompliceerde cystitis','Nefrolithiasis','Renaal abces'], c:0,
    ex:'Pyelonefritis = cystitis-klachten + flankpijn (slagpijn nierloges) + koorts ≥38°C. Behandeling: ciprofloxacine 7 dagen of IV bij ernstig beloop.',
    wiki:{
          kern: "Pyelonefritis: ascensie van E. coli (80%), Klebsiella of andere gramnegatieve bacteriën naar het nierparenchym. Diagnose: kliniek + leukocyturie + nitriet + urinekweek.",
          redflag: "Obstructie + pyelonefritis = urosepsis — spoedbeeldvorming (echo/CT), drainage (dubbel-J-stent of nefrostomie) en IV antibiotica zijn urgent. Urosepsis mortaliteit 20-40%.",
          mechanisme: [
            { title: "Urosepsis-mechanisme", desc: "Obstructie belemmert drainageweg → bacteriën en lipopolysacharide (LPS) komen in de bloedbaan → cytokinestorm → SIRS → orgaandisfunctie." },
            { title: "ESBL-problematiek", desc: "ESBL-producerende E. coli toenemend — bij risicofactoren (reizen, ziekenhuisopname) meropenem of fosfomycine IV overwegen." },
          ],
          onderscheid: [
            { label: "Nefrolithiasis", desc: "koliekpijn (niet perkussiegevoelig of juist wel), geen koorts initieel.", type: 'ok' },
            { label: "Renaal abces", desc: "persisterende koorts na antibiotica, CT-diagnose, drainage nodig.", type: 'warn' },
            { label: "Cystitis", desc: "geen flankpijn of koorts.", type: 'danger' },
          ],
          therapie: {
            urgent: "Pyelonefritis ambulant: ciprofloxacine 500 mg 2× daags 7 dagen (of co-trimoxazol indien gevoelig).",
            stappen: [
              { naam: "Ziekenhuisopname bij", detail: "braken (orale therapie niet mogelijk), sepsis, zwangerschap, obstructie, immuunsuppressie." },
              { naam: "IV antibiotica", detail: "Ceftriaxon 2 g 1× daags of piperacilline-tazobactam bij ESBL-risico; switch naar oraal na klinische verbetering." },
              { naam: "Beeldvorming", detail: "Echo/CT bij persisterende koorts na 72u: obstructie of abces uitsluiten." },
            ],
          },
        } },


  // ── PSYCHIATRIE ──
  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Vrouw van 32 jaar, al 3 weken depressief, slaapproblemen, gewichtsverlies, concentratieproblemen, schuldgevoelens, geen suïcidale gedachten. DSM-5 diagnose?',
    a:['Depressieve stoornis (major depressive disorder)','Dysthymie (persisterende depressieve stoornis)','Bipolaire stoornis type II','Rouwreactie'], c:0,
    ex:'MDD: ≥5 van de 9 DSM-5 criteria gedurende minimaal 2 weken, inclusief depressieve stemming of anhedonie. Dysthymie: mildere maar chronische depressie (≥2 jaar). Bipolair type II: depressieve episodes + hypomane (niet manische) episodes.',
    wiki:{
          kern: "DSM-5 criteria MDD (≥5 aanwezig ≥2 weken): depressieve stemming, anhedonie, gewichtsverandering, slaapstoornis, psychomotore agitatie/remming, vermoeidheid, waardeloosheidsgevoel/schuld, concentratieproblemen, suïcidale gedachten. Minimaal depressieve stemming OF anhedonie.",
          mechanisme: [
            { title: "Monoamine-deficiëntiehypothese", desc: "verminderde serotonine, noradrenaline en dopamine." },
            { title: "Stap 2", desc: "SSRI\\'s (selectieve serotonine-heropnameremmers) zijn eerste keus: fluoxetine, sertraline, paroxetine." },
            { title: "Stap 3", desc: "Effect na 4-6 weken." },
            { title: "Stap 4", desc: "Combinatie met cognitieve gedragstherapie (CGT) is superieur." },
          ],
          onderscheid: [
            { label: "Bipolair", desc: "manische of hypomane episode ≥1× eerder.", type: 'ok' },
            { label: "Rouwreactie", desc: "normaal na verlies, minder ernstig, geen schuldgevoelens over zichzelf.", type: 'warn' },
            { label: "Hypothyreoïdie", desc: "ook depressieve kenmerken, TSH bepalen bij elke nieuwe depressie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Licht-matig: CGT of SSRI (gelijkwaardig).",
            stappen: [
              { naam: "Ernstig", detail: "SSRI + CGT of farmaco + psychiatrisch consult." },
              { naam: "Behandelingsduur", detail: "≥6 maanden na remissie (recidiefpreventie)." },
              { naam: "Stap 3", detail: "ECT bij therapieresistente of ernstige depressie." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Man van 25 jaar, afgelopen week grandioos zelfgevoel, nauwelijks slapen maar vol energie, overmatig praten, vluchtige ideeën, impulsief geld uitgespen. Geen drugs. Diagnose?',
    a:['Manische episode (bipolaire stoornis type I)','Hypomane episode (bipolaire stoornis type II)','Schizofrenie','Borderline persoonlijkheidsstoornis'], c:0,
    ex:'Manische episode: verhoogde stemming + ≥3 B-criteria (grandiositeit, slaapbehoefte laag, vluchtige ideeën, drukke spraak, doelgericht gedrag, impulsiviteit) ≥7 dagen of ziekenhuisopname vereist. Hypomaan: zelfde maar ≤4 dagen en geen opname/ernstige gevolgen.',
    wiki:{
          kern: "Bipolaire stoornis type I: minimaal één manische episode (met of zonder depressie). Type II: hypomane episodes + depressieve episodes (nooit manisch).",
          mechanisme: [
            { title: "Stap 1", desc: "Lithium is hoeksteen van onderhoudsbehandeling: stemmingsstabilisator." },
            { title: "Stap 2", desc: "Werkt via remming inositolmonofosfa­tase en GSK-3β." },
            { title: "Stap 3", desc: "Smal therapeutisch venster (0.6-1.2 mEq/L)." },
            { title: "Alternatieven", desc: "valproaat, lamotrigine (depressie-preventie), quetiapine." },
          ],
          onderscheid: [
            { label: "Borderline", desc: "instabiele stemmingen maar kortdurend (uren), gerelated aan interpersonele stress.", type: 'ok' },
            { label: "Schizofrenie", desc: "wanen/hallucinaties op voorgrond, geen manische stemmingsverhoging.", type: 'warn' },
            { label: "Drugsintoxicatie (cocaïne, amfetamine)", desc: "anamnese.", type: 'danger' },
          ],
          therapie: {
            urgent: "Acute manie: antipsychoticum (olanzapine, risperidon, quetiapine) + stemmingsstabilisator.",
            stappen: [
              { naam: "Lithium", detail: "onderhoud." },
              { naam: "Valproaat", detail: "snelle keuze bij acute manie." },
              { naam: "ECT", detail: "bij ernstige therapieresistente manie." },
              { naam: "Stap 4", detail: "Psychoeducatie over medicatieontrouw (groot risico)." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Vrouw van 28 jaar, terugkerende, onverwachte paniekaanvallen met hartkloppingen, transpiratie, benauwdheid, angst om dood te gaan. Ze vermijdt nu publieke plekken. Diagnose?',
    a:['Paniekstoornis met agorafobie','Sociale angststoornis','Gegeneraliseerde angststoornis','Specifieke fobie'], c:0,
    ex:'Paniekstoornis: recidiverende onverwachte paniekaanvallen + aanhoudende bezorgdheid over nieuwe aanvallen of gedragsverandering. Agorafobie: vermijden van situaties waaruit ontsnapping moeilijk zou zijn. De combinatie is frequent.',
    wiki:{
          kern: "Paniekaanval: plotse intensieve angst met ≥4 lichamelijke/cognitieve symptomen (palpitaties, transpireren, trillen, dyspneu, thoraxpijn, misselijkheid, duizeligheid, derealisatie, angst de controle te verliezen/dood te gaan). Piek binnen 10 minuten.",
          mechanisme: [
            { title: "Stap 1", desc: "Neurobiologie: hypersensitiviteit amygdala, locus coeruleus hyperactiviteit (noradrenaline), overreactie van het fight-or-flight systeem. Hyperventilatie." },
            { title: "Stap 2", desc: "CO2-daling." },
            { title: "Stap 3", desc: "respiratoire alkalose." },
            { title: "Stap 4", desc: "paraesthesieën." },
          ],
          onderscheid: [
            { label: "Gegeneraliseerde angststoornis (GAS)", desc: "chronische, diffuse, moeilijk beheersbare bezorgdheid (niet episodisch).", type: 'ok' },
            { label: "Sociale angst", desc: "angst voor sociale beoordeling.", type: 'warn' },
            { label: "PTSS", desc: "angst na trauma.", type: 'danger' },
            { label: "Somatische aandoeningen uitsluiten", desc: "feochromocytoom, hyperthyreoïdie, aritmie.", type: 'warn' },
          ],
          therapie: {
            urgent: "CGT (exposuretechnieken): bewezen meest effectief.",
            stappen: [
              { naam: "SSRI (sertraline, paroxetine)", detail: "farmacologisch eerste keus." },
              { naam: "Benzodiazepinen", detail: "kortdurend voor acute aanvallen, niet als onderhoudsbehandeling (afhankelijkheidsrisico)." },
              { naam: "Stap 3", detail: "Combinatie CGT + SSRI superieur." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Man van 70 jaar, snel ontstaan over enkele dagen: desoriëntatie in tijd en plaats, wisselend bewustzijn, hallucinaties (ziet spinnen), agitatie \'s nachts. Vorige week nog helder. Diagnose?',
    a:['Delier','Dementie','Psychose','Alcoholonttrekking'], c:0,
    ex:'Delier: acuut (<48u) ontstane bewustzijnsstoornis met aandachtsproblemen, desoriëntatie en wisselend beloop. Kenmerkend: acuut begin + fluctuerend beloop + aandachtsstoornis + organische oorzaak. Dementie: chronisch, progressief, geen acuut begin.',
    wiki:{
          kern: "Delier (CAM-criteria): acuut begin + wisselend beloop + aandachtsstoornis + desorganiseerd denken of bewustzijnsstoornis. Meest voorkomende psychiatrische stoornis in het ziekenhuis (15-30% van opnames).",
          mechanisme: [
            { title: "Neurobiologie", desc: "cholinerg deficit (acetylcholinesteraseremmers kunnen helpen), dopamineoverschot, GABA-dysbalans bij alcoholonttrekking." },
            { title: "Predisponerende factoren", desc: "leeftijd, dementie, polyfarmacie." },
            { title: "Uitlokkende factoren", desc: "infectie (UWI, pneumonie), medicatie (anticholinergica, opiaten, benzodiazepinen), dehydratie, pijn, retentie." },
          ],
          onderscheid: [
            { label: "Dementie", desc: "chronisch, geen acuut begin, bewustzijn normaal initieel.", type: 'ok' },
            { label: "Delier op dementie", desc: "gemengd en frequent.", type: 'warn' },
            { label: "Psychose (schizofrenie)", desc: "chronisch, bewustzijn niet gestoord.", type: 'danger' },
            { label: "Alcoholonttrekking", desc: "anamnese, tremor, delirium tremens na 48-72u abstinentie.", type: 'warn' },
          ],
          therapie: {
            urgent: "Behandel onderliggende oorzaak.",
            stappen: [
              { naam: "Niet-farmacologisch", detail: "oriëntatie, slaapcyclus normaliseren, mobilisatie, geen onnodige katheters." },
              { naam: "Farmacologisch bij ernstige agitatie", detail: "lage dosis haloperidol." },
              { naam: "Alcoholonttrekking", detail: "benzodiazepinen." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Man van 22 jaar, sociale terugtrekking, bizarre overtuiging dat de buren hem bespieden via de tv, stemmen horen die commentaar geven, vlak affect. Klachten >6 maanden. Diagnose?',
    a:['Schizofrenie','Schizoaffectieve stoornis','Bipolaire stoornis met psychotische kenmerken','Waanstoornis'], c:0,
    ex:'Schizofrenie DSM-5: ≥2 kernsymptomen ≥1 maand (wanen, hallucinaties, desorganisatie, negatieve symptomen, catatonie) + sociaal/beroepsmatig disfunctioneren + duur ≥6 maanden. Schizoaffectieve stoornis: psychose + prominente stemmingsepisodes gelijktijdig.',
    wiki:{
          kern: "Positieve symptomen (wanen, hallucinaties): overactiviteit dopaminerg systeem (mesolimbisch pad). Negatieve symptomen (vlak affect, alogie, avolontie, anhedonie): hypoactiviteit prefrontale cortex.",
          mechanisme: [
            { title: "Antipsychotica", desc: "blokkade D2-receptoren (mesolimbisch/mesocorticaal)." },
            { title: "Typisch (haloperidol)", desc: "effectief maar extrapiramidale bijwerkingen (parkinsonisme, tardieve dyskinesie)." },
            { title: "Stap 3", desc: "Atypisch (clozapine, quetiapine, risperidon): minder EPM, meer metabole bijwerkingen." },
            { title: "Clozapine", desc: "meest effectief bij therapieresistentie maar agranulocytose-risico." },
          ],
          onderscheid: [
            { label: "Schizoaffectieve stoornis", desc: "psychotische symptomen óók buiten stemmingsepisodes.", type: 'ok' },
            { label: "Bipolair met psychose", desc: "psychose alleen tijdens stemming.", type: 'warn' },
            { label: "Waanstoornis", desc: "geïsoleerde niet-bizarre waan, geen hallucinaties of desorganisatie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Antipsychoticum (atypisch eerste keus).",
            stappen: [
              { naam: "Psychosociale begeleiding", detail: "psychoeducatie, arbeidsintegratie, familieinterventie." },
              { naam: "Stap 2", detail: "Behandeling ≥2 jaar na eerste episode." },
              { naam: "Stap 3", detail: "Clozapine bij therapieresistentie (2 antipsychotica onvoldoende)." },
              { naam: "Stap 4", detail: "Psychosociale rehabilitatie." },
            ],
          },
        } },


  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Vrouw van 45 jaar, terugkerende opdringerige gedachten over besmetting, die ze niet kan stoppen. Ze wast haar handen >50× per dag om angst te verminderen, wat tijdelijk helpt. Diagnose?',
    a:['Obsessief-compulsieve stoornis (OCS)','Gegeneraliseerde angststoornis','Somatische symptoomstoornis','Specifieke fobie'], c:0,
    ex:'OCS: obsessies (opdringerige, egodystone gedachten → angst) + compulsies (rituelen om angst te verminderen). De compulsies geven tijdelijk verlichting maar versterken op termijn de obsessies. Egodystoon = de patiënt ervaart de gedachten als vreemd/ongewenst.',
    wiki:{
          kern: "OCS prevalentie: 2-3%. Neurobiologie: hyperactiviteit orbito-frontale cortex + caudate nucleus.",
          mechanisme: [
            { title: "Serotonine-deficiëntiehypothese", desc: "SSRI in hogere dosis dan depressie (bijv. fluoxetine 60-80 mg)." },
            { title: "Stap 2", desc: "CGT met exposure en respons­preventie (ERP): eerste keus behandeling." },
            { title: "Stap 3", desc: "Neurochirurgie (DBS) bij ernstige therapieresistentie." },
          ],
          onderscheid: [
            { label: "GAS", desc: "bezorgdheid over reële problemen (werk, gezondheid), niet egodystoon.", type: 'ok' },
            { label: "Prikkelbare-darmsyndroom-OCS overlap", desc: "somatische focus.", type: 'warn' },
            { label: "ADHD", desc: "impulsief gedrag maar geen rituelen.", type: 'danger' },
            { label: "Psychose", desc: "wanen maar niet als egodystoon ervaren.", type: 'warn' },
          ],
          therapie: {
            urgent: "Eerste keus: CGT-ERP (hoogste remissie).",
            stappen: [
              { naam: "Farmacologisch", detail: "SSRI (hogere dosering dan depressie, 12+ weken)." },
              { naam: "Clomipramine (TCA)", detail: "effectief maar meer bijwerkingen." },
              { naam: "Combinatie CGT + SSRI", detail: "superieur bij matige/ernstige OCS." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Soldaat van 28 jaar, 6 maanden geleden teruggekeerd uit oorlogsgebied. Herbelevingen, nachtmerries, vermijdt prikkels die herinneren aan het trauma, hyperwaakzaamheid, emotionele gevoelloosheid. Diagnose?',
    a:['Posttraumatische stressstoornis (PTSS)','Acute stressstoornis','Aanpassingsstoornis','Depressieve stoornis'], c:0,
    ex:'PTSS: na blootstelling aan traumatische gebeurtenis → ≥1 maand: herbelevingssymptomen (flashbacks, nachtmerries) + vermijding + negatieve cognitieve/stemmingssymptomen + hyperarousal. Acute stressstoornis: <1 maand na trauma.',
    wiki:{
          kern: "PTSS: prevalentie levenslang 8% in de algemene bevolking, 20-30% bij oorlogsveteranen. Neurobiologie: amygdala-hyperactiviteit, prefrontale cortex-hypoactiviteit (extinctielearning verstoord), hippocampus-atrofie (negatief geheugen).",
          mechanisme: [
            { title: "Stap 1", desc: "Traumatisch geheugen wordt niet geïntegreerd → intrusieven." },
            { title: "Behandeling", desc: "trauma-focused CGT (EMDR, prolonged exposure)." },
            { title: "Stap 3", desc: "EMDR (eye movement desensitization and reprocessing): bewezen effectief." },
            { title: "SSRI (paroxetine, sertraline)", desc: "farmacologische eerste keus." },
          ],
          onderscheid: [
            { label: "Aanpassingsstoornis", desc: "minder ernstig trauma, kortdurend (<6 maanden), geen herbelevingen.", type: 'ok' },
            { label: "Depressie", desc: "kan comorbide zijn.", type: 'warn' },
            { label: "Borderline", desc: "chronische instabiliteit, interpersoneel patroon.", type: 'danger' },
            { label: "Acute stressstoornis", desc: "<1 maand, soms dissociatief.", type: 'warn' },
          ],
          therapie: {
            urgent: "Trauma-focused CGT of EMDR: eerste keus.",
            stappen: [
              { naam: "SSRI", detail: "paroxetine of sertraline." },
              { naam: "Prazosin (alfablokker)", detail: "bij nachtmerries effectief." },
              { naam: "Stap 3", detail: "Geen benzodiazepinen (verhogen vermijding)." },
              { naam: "Stap 4", detail: "Groepstherapie en lotgenotencontact als aanvulling." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'psych', dl:'Psychiatrie',
    q:'Bij een acute psychose is het altijd veilig te starten met een hoge dosis antipsychotica om de symptomen sneller onder controle te krijgen.',
    c:false,
    ex:'NIET WAAR. Hoge doses antipsychotica geven meer bijwerkingen (extrapiramidale symptomen, sedatie, orthostatische hypotensie) zonder snellere werkzaamheid. Startdosis laag, opbouwen op geleide van effect en tolerantie. De antipsychotische werking treedt pas na 2-6 weken volledig op.',
    wiki:{
          kern: "Antipsychotica: D2-receptorblokkade in het mesolimbisch systeem. Parkinsonsymptomen: D2-blokkade in het nigrostriatale systeem.",
          mechanisme: [
            { title: "Neuroleptica equivalenten", desc: "alle middelen worden uitgedrukt als chlorpromazine-equivalent." },
            { title: "Stap 2", desc: "Atypische antipsychotica (quetiapine, olanzapine, clozapine): ook serotonine-antagonisme → minder EPM, meer metabole bijwerkingen (gewichtstoename, diabetes)." },
          ],
          onderscheid: [
            { label: "Optie 1", desc: "Serotoninesyndroom vs. neuroleptica maligne syndroom (NMS): NMS = dopamineantagonist → hoge koorts + rigiditeit + autonome instabiliteit + bewustzijns­daling.", type: 'ok' },
            { label: "Behandeling NMS", desc: "stop antipsychoticum, dantroleen, bromocriptine.", type: 'warn' },
          ],
        } },

  { type:'truefalse', d:2, domain:'psych', dl:'Psychiatrie',
    q:'Lithium is veilig te gebruiken bij patiënten met verminderde nierfunctie zonder dosisaanpassing.',
    c:false,
    ex:'NIET WAAR. Lithium wordt uitsluitend renaal uitgescheiden en heeft een smal therapeutisch venster (0.6-1.2 mEq/L). Bij nierfunctiestoornissen accumuleert lithium → toxiciteit (tremor, cognitieve stoornissen, convulsies, renale schade). Altijd dosisaanpassing en nauwgezette spiegelbewaking.',
    wiki:{
          kern: "Lithiumtoxiciteit: spiegels >1.5 mEq/L → nausea, diarree, grove tremor. >2.0: lethargie, verwardheid, ataxie. >3.0: convulsies, coma, irreversibele renale/neurologische schade. Dehydratie (ook door NSAID, thiazide) verhoogt lithiumspiegel → altijd waarschuwen.",
          mechanisme: [
            { title: "Stap 1", desc: "Lithium en natrium worden competitief gereabsorbeerd in de proximale tubulus. Bij natriumtekort (dehydratie, lage zoutinname)." },
            { title: "Stap 2", desc: "meer lithiumreabsorptie." },
            { title: "Stap 3", desc: "spiegel stijgt. Kwartaals controleren: lithiumspiegel, nierfunctie, TSH (lithium veroorzaakt hypothyreoïdie bij langdurig gebruik)." },
          ],
          onderscheid: [
            { label: "Valproaat", desc: "renale klaring minder afhankelijk, maar leverfunctie bewaken.", type: 'ok' },
            { label: "Lamotrigine", desc: "bijzonder veilig bij nieraandoeningen, geen spiegelbewaking nodig.", type: 'warn' },
            { label: "Carbamazepine", desc: "ook renale uitscheiding, maar minder smal venster.", type: 'danger' },
          ],
        } },

  { type:'truefalse', d:2, domain:'psych', dl:'Psychiatrie',
    q:'Suïcidaliteit bij een depressieve patiënt is een absolute contra-indicatie voor SSRI-behandeling.',
    c:false,
    ex:'NIET WAAR. SSRI\'s zijn eerste keus bij depressie, ook bij suïcidaliteit. In de eerste weken kan activering optreden (meer energie terwijl stemming nog laag is) → korte termijn iets verhoogd risico in eerste 2 weken → nauwe follow-up. Het niet behandelen van depressie is een groter risico.',
    wiki:{
          kern: "FDA black box warning: verhoogd suïciderisico bij jongeren <25j in de eerste weken van SSRI-behandeling. Bij volwassenen en ouderen: SSRI verlaagt op lange termijn suïciderisico.",
          mechanisme: [
            { title: "Activeringseffect", desc: "energieniveau herstelt sneller dan stemming → \"dangerous window\"." },
            { title: "Stap 2", desc: "Benzodiazepinen kortdurend overbruggen bij ernstige agitatie/angst." },
            { title: "Altijd veiligheidsevaluatie", desc: "intentie, plan, middelen, beschermende factoren." },
          ],
          onderscheid: [
            { label: "Risicofactoren suïcide", desc: "eerder poging, mannelijk geslacht, alleenstaand, toegang tot middelen, middelenmisbruik, chronische pijn.", type: 'ok' },
            { label: "Beschermende factoren", desc: "sociaal netwerk, kinderen, geloofsgemeenschap, behandelingsbereidheid.", type: 'warn' },
          ],
        } },

  { type:'diagnose', d:5, domain:'psych', dl:'Psychiatrie', subtype:'diff',
    q:'Welk kenmerk onderscheidt een depressieve episode bij bipolaire stoornis van een unipolaire depressie bij de behandelkeuze?',
    a:['SSRI-monotherapie kan een manische episode uitlokken bij bipolaire depressie','Bipolaire depressie reageert sneller op CGT','Bipolaire depressie heeft altijd suïcidaliteit','Bij unipolaire depressie zijn lithium contra-indicaties hoger'], c:0,
    ex:'SSRI-monotherapie bij bipolaire depressie kan een manische switch of cyclische versnelling uitlokken. Daarom wordt bij bipolaire depressie een stemmingsstabilisator (lithium, quetiapine, lamotrigine) als basis gegeven, en SSRI\'s slechts voorzichtig en altijd in combinatie met een stabilisator.',
    wiki:{
          kern: "Bipolaire depressie behandeling verschilt fundamenteel van unipolaire: (1) Altijd stemmingsstabilisator als basis. (2) SSRI alleen in combinatie, niet als monotherapie. (3) Quetiapine is aangetoond effectief voor bipolaire depressie en heeft FDA-goedkeuring.",
          mechanisme: [
            { title: "Manische switch", desc: "bipolaire patiënt wordt door antidepressivum acuut manisch." },
            { title: "Risico", desc: "hoger bij TCA (tricyclisch) dan bij SSRI, laagst bij lamotrigine." },
            { title: "Lamotrigine", desc: "bewezen voor bipolaire depressie-preventie, niet voor acute manie." },
          ],
          onderscheid: [
            { label: "Unipolaire depressie", desc: "SSRI-monotherapie of CGT-monotherapie zijn eerste keus.", type: 'ok' },
            { label: "Optie 2", desc: "Bipolair I vs.", type: 'warn' },
            { label: "II", desc: "beide riskant bij SSRI-monotherapie.", type: 'danger' },
            { label: "Postpartum psychose", desc: "vaker geassocieerd met bipolaire stoornis.", type: 'warn' },
          ],
        } },


  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Jongeman van 16 jaar, extreem weinig eten (BMI 15.5), gestoord lichaamsbeeld ("ik ben te dik"), amenorroe, ontkenning van ziekte. Diagnose?',
    a:['Anorexia nervosa (restrictief type)','Boulimia nervosa','Binge-eating stoornis','Vermijdend-restrictieve voedselinnamestoornis (ARFID)'], c:0,
    ex:'Anorexia nervosa: BMI <17.5 + intense angst voor gewichtstoename + gestoord lichaamsschema + ontkenning van ernst. Meest voorkomend bij adolescente vrouwen. Hoogste mortaliteit van alle psychiatrische stoornissen (sterfte door medische complicaties + suïcide).',
    wiki:{
          kern: "Medische complicaties anorexia: bradycardie, hypotensie, hyponatriëmie, hypokaliëmie, metabole alkalose (bij purgeergedrag), osteoporose, lanugo, oedeem bij hervoeding. Refeeding syndroom: gevaar bij snelle hervoeding (fosfaat, K+, Mg daalt).",
          mechanisme: [
            { title: "Restrictief type", desc: "alleen calorierestrictie." },
            { title: "Binge-purge type", desc: "ook eetbuien + compensatiegedrag (braken, laxantia)." },
            { title: "Behandeling", desc: "multidisciplinair (psychiatrie, diëtistiek, somatiek)." },
            { title: "Stap 4", desc: "FBT (family-based treatment) meest effectief bij adolescenten." },
          ],
          onderscheid: [
            { label: "Boulimia", desc: "normaal gewicht, eetbuien + compensatie, geen gestoord lichaamsschema als bij AN.", type: 'ok' },
            { label: "Binge-eating", desc: "eetbuien zonder compensatie, overgewicht.", type: 'warn' },
            { label: "ARFID", desc: "geen gewichtsfobíe, selectief eten door sensorische aversie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Ambulant als mogelijk.",
            stappen: [
              { naam: "Stap 1", detail: "Opname bij BMI <13 of medische complicaties." },
              { naam: "Stap 2", detail: "Hervoeding langzaam (refeeding syndroom)." },
              { naam: "Psychotherapie", detail: "CGT (bulimie effectief), FBT (adolescenten)." },
              { naam: "Farmacologisch", detail: "geen bewezen middel voor AN; fluoxetine voor boulimia (FDA-goedgekeurd)." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Man van 40 jaar, al jarenlang diep wantrouwen tegenover anderen, interpreteert neutrale opmerkingen als bedreigend, houdt vast aan rancune, dicht anderen slechte intenties toe. Geen psychose. Diagnose?',
    a:['Paranoïde persoonlijkheidsstoornis','Schizofrenie paranoïde type','Schizoïde persoonlijkheidsstoornis','Waanstoornis'], c:0,
    ex:'Paranoïde persoonlijkheidsstoornis (cluster A): pervasief wantrouwen en achterdocht, veronderstelt dat anderen hem schade willen berokkenen, maar geen psychose (wanen, hallucinaties). Chronisch, ego-syntoon (de patiënt ervaart zijn denken als normaal).',
    wiki:{
          kern: "Persoonlijkheidsstoornissen: cluster A (schizoïd, schizotypisch, paranoïde), cluster B (antisociaal, borderline, theatraal, narcistisch), cluster C (vermijdend, afhankelijk, obsessief-compulsief). Kenmerken: pervasief, inflexibel, egosyntoon, vroeg begin.",
          mechanisme: [
            { title: "Stap 1", desc: "Persoonlijkheidsstoornissen zijn moeilijk te behandelen: ego-syntoon → beperkte behandelmotivatie." },
            { title: "Stap 2", desc: "Psychotherapie (dialectische gedragstherapie bij borderline) is effectiever dan farmacotherapie." },
            { title: "Medicatie", desc: "symptomatisch (antipsychotica bij paranoïdie, SSRI bij impulsiviteit)." },
          ],
          onderscheid: [
            { label: "Schizofrenie", desc: "psychotische symptomen (echte wanen, hallucinaties).", type: 'ok' },
            { label: "Waanstoornis", desc: "geïsoleerde waan, functioneren overigens intact.", type: 'warn' },
            { label: "Schizoïd", desc: "sociaal teruggetrokken maar geen achterdocht.", type: 'danger' },
            { label: "Schizotypisch", desc: "magisch denken, vreemd gedrag.", type: 'warn' },
          ],
          therapie: {
            urgent: "Psychotherapie: cognitieve therapie helpt bij paranoïde denken.",
            stappen: [
              { naam: "Stap 1", detail: "Therapeutische relatie is moeilijk door wantrouwen." },
              { naam: "Farmacotherapie", detail: "geen bewezen effect, soms lage dosis antipsychoticum bij ernstige symptomen." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Vrouw van 38 jaar, instabiele relaties, chronische leegte, impulsiviteit (automutilatie, risicovol gedrag), intense stemmingswisselingen gerelateerd aan interpersoonlijke stressoren. Diagnose?',
    a:['Borderline persoonlijkheidsstoornis','Bipolaire stoornis type II','Cyclothymie','Depressieve stoornis met impulsiviteit'], c:0,
    ex:'Borderline PS (cluster B): instabiele relaties + zelfbeeld + affecten + impulsiviteit. Stemmingswisselingen duren uren (niet dagen zoals bij bipolair) en zijn interpersoonlijk getriggerd. Automutilatie en suïcidepogingen zijn frequent maar meest para-suïcidaal.',
    wiki:{
          kern: "BPS neurobiologie: verhoogde amygdala-reactiviteit + prefrontale hypoactiviteit → emotiedysregulatie. Hoge comorbiditeit met depressie, PTSS, verslavingsproblematiek.",
          mechanisme: [
            { title: "Stap 1", desc: "DBT (dialectische gedragstherapie, Linehan): gold standard behandeling BPS." },
            { title: "Modules", desc: "mindfulness, emotieregulatie, interpersoonlijke effectiviteit, distress-tolerantie." },
            { title: "Stap 3", desc: "MBT (mentalization-based treatment): alternatief." },
            { title: "Farmacotherapie", desc: "symptomatisch." },
          ],
          onderscheid: [
            { label: "Bipolaire stoornis", desc: "stemmingswisselingen duren dagen tot weken, autonoom (niet interpersoonlijk getriggerd), slaapbehoefte veranderd.", type: 'ok' },
            { label: "BPS", desc: "uren, interpersoonlijk, slaapcyclus relatief intact.", type: 'warn' },
          ],
          therapie: {
            urgent: "DBT ambulant (2 jaar).",
            stappen: [
              { naam: "Stap 1", detail: "Systeemtherapie als aanvulling." },
              { naam: "Stap 2", detail: "Hospitalisatie vermijden tenzij acute veiligheid." },
              { naam: "Farmacologisch", detail: "lage dosis antipsychoticum bij dissociatie/paranoia, SSRI bij depressie/impulsiviteit." },
              { naam: "Stap 4", detail: "Stemmingsstabilisator bij affectieve instabiliteit." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Man van 60 jaar, progressief geheugenverval over 3 jaar, vergeet afspraken, raakt thuis de weg kwijt, apraxie, verminderd oordeel. MRI: bitemporaal/parietaal atrofie. Diagnose?',
    a:['Ziekte van Alzheimer','Vasculaire dementie','Lewy-body dementie','Frontotemporale dementie'], c:0,
    ex:'Alzheimer: meest voorkomende dementie (60-70%). Insidieuse onset, progressief, anterograad geheugenverlies dominant, bitemporaal/parietaal atrofie op MRI. Lewy-body: ook parkinsonisme + fluctuerende cognitie + visuele hallucinaties.',
    wiki:{
          kern: "Dementie classificatie: Alzheimer (60%), vasculair (15%), Lewy-body (15%), FTD (5-10%), gemengd. Alzheimer-biomarkers: amyloïd-β (verlaagd in CSF, positief op PET), tau en phospho-tau (verhoogd in CSF).",
          mechanisme: [
            { title: "Stap 1", desc: "Amyloïd cascade hypothese: APP." },
            { title: "Stap 2", desc: "amyloïd-β aggregatie." },
            { title: "Stap 3", desc: "seniele plaques." },
            { title: "Stap 4", desc: "tau-tangle vorming." },
            { title: "Stap 5", desc: "neuronaal verlies. Cholinerg deficit." },
          ],
          onderscheid: [
            { label: "Vasculaire dementie", desc: "stapsgewijs beloop, cerebrovasculaire pathologie op MRI (lacunaire infarcten), executieve disfunctie.", type: 'ok' },
            { label: "FTD", desc: "persoonlijkheids- en gedragsverandering, taalstoornis, frontale atrofie.", type: 'warn' },
            { label: "Lewy-body", desc: "REM-slaapgedragsstoornis, parkinsonisme, DLB-triade.", type: 'danger' },
          ],
          therapie: {
            urgent: "Acetylcholinesteraseremmers: donepezil, rivastigmine, galantamine.",
            stappen: [
              { naam: "Memantine (NMDA-antagonist)", detail: "bij matige/ernstige Alzheimer." },
              { naam: "Nieuwe middelen", detail: "lecanemab (anti-amyloïd mAb) vertraagt progressie (FDA 2023)." },
              { naam: "Non-farmacologisch", detail: "dagstructuur, omgevingsaanpassing." },
            ],
          },
        } },

  { type:'lab', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Welk laboratoriumonderzoek is bij een nieuwe depressieve episode altijd geïndiceerd om een somatische oorzaak uit te sluiten?',
    a:['TSH (thyroïdstimulerend hormoon)','Cortisol ochtend','Prolactine','Lithiumspiegel'], c:0,
    ex:'TSH is standaard bij elke nieuwe depressie: hypothyreoïdie presenteert zich vaak met depressieve symptomen en is eenvoudig behandelbaar. Overige basis: bloedbeeld, elektrolyten, glucose, nierfunctie, leverenzymen. Cortisol bij verdenking Cushing/Addison, prolactine bij galactorroe.',
    wiki:{
          kern: "Somatische screening bij psychiatrische presentaties: TSH (hypothyreoïdie/hyperthyreoïdie), bloedglucose (hypoglykemie → angst/delirium), Ca2+ (hypercalciëmie → psychose/depressie), vitamine B12/foliumzuur (deficiëntie → depressie/dementie), CRP/BSE (ontsteking), alcohol/drugsscreen.",
          mechanisme: [
            { title: "Hypothyreoïdie nabootsen", desc: "moeheid, gewichtstoename, depressie, cognitieve verlangzaming, koude-intolerantie." },
            { title: "Hyperthyreoïdie", desc: "angst, agitatie, slapeloosheid." },
            { title: "Stap 3", desc: "Beide kunnen psychiatrische diagnose nabootsen." },
            { title: "Stap 4", desc: "TSH heeft de hoogste sensitiviteit." },
          ],
          onderscheid: [
            { label: "Bij psychose of delirium", desc: "ook bloedgas (CO2-retentie), ammonia (hepatische encefalopathie), MRI hersenen (structureel), LP (meningitis/encefalitis).", type: 'ok' },
            { label: "Bij eerste psychose <25j", desc: "uitgebreide somatische screening verplicht.", type: 'warn' },
          ],
        } },


  // ── DERMATOLOGIE ──
  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Kind van 7 jaar, jeukende rode vlekken met blaasjes, eerst hoofd dan romp en extremiteiten, koorts 38°C. Gezinscontact vorige week ziek. Diagnose?',
    a:['Varicella (waterpokken)','Hand-mond-voetziekte','Mazelen','Roodvonk'], c:0,
    ex:'Polymorf exantheem in alle stadia tegelijk = kenmerk van waterpokken (varicella-zostervirus (VZV) primo-infectie).',
    wiki:{
          kern: "Varicella-zostervirus (VZV): primo-infectie = waterpokken. Reactivatie later in het leven = gordelroos (herpes zoster).",
          redflag: "Immuungecompromitteerde patiënten, zwangeren en neonaten: ernstig beloop mogelijk — start aciclovir direct.",
          mechanisme: [
            { title: "Polymorf exantheem", desc: "Lesies in alle stadia (macule → papel → vesikel → korst) gelijktijdig aanwezig — onderscheidend kenmerk." },
            { title: "Mucosale betrokkenheid", desc: "Blaasjes ook in mondholte mogelijk." },
            { title: "Besmettelijkheid", desc: "Luchtweg- en contactoverdracht. Besmettelijk vanaf 1-2 dagen vóór uitslag tot alle laesies gekorst zijn." },
          ],
          onderscheid: [
            { label: "Hand-mond-voetziekte (Coxsackievirus)", desc: "Blaasjes handpalmen + voetzolen + mond, mildere koorts.", type: 'ok' },
            { label: "Mazelen", desc: "Hoge koorts, Koplik-vlekken, morbiliforme rash — geen blaasjes.", type: 'warn' },
            { label: "Roodvonk", desc: "Streptokokkentoxine, fijne puntjes-exantheem, 'aardbeitong'.", type: 'danger' },
          ],
          therapie: {
            urgent: "Gezond kind: symptomatisch (antihistaminica, paracetamol). Vermijd aspirine (Reye-syndroom).",
            stappen: [
              { naam: "Aciclovir", detail: "Immuungesupprimeerden, zwangeren, neonaten, volwassenen — start zo vroeg mogelijk." },
              { naam: "Vaccinatie", detail: "Levend verzwakt vaccin (Varivax) — 2 doses." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Man van 55 jaar, jarenlang zilverschilferige plaques op knieën, ellebogen en scalp, duidelijk begrensd. Nagelafwijkingen (pitting). Diagnose?',
    a:['Psoriasis vulgaris','Seborroïsche dermatitis','Lichen planus','Nummulair eczeem'], c:0,
    ex:'Psoriasis: scherp begrensde zilverschilferige plaques op extensorzijden (knieën/ellebogen/scalp). Nagelafwijkingen (pitting, onycholyse) in 50%.',
    wiki:{
          kern: "Psoriasis: T-cel-gemedieerde auto-immuunziekte met versnelde keratinocytproliferatie (turnover 3-4 dagen vs. normaal 28). Prevalentie 2-3%, genetische component (HLA-Cw6).",
          redflag: "Erythrodermische psoriasis (>90% huidoppervlak): risico op hypothermie, hartfalen en infectie — spoedopname.",
          mechanisme: [
            { title: "Ontsteking via Th17", desc: "IL-17, IL-23 en TNF-α activeren keratinocyten → versnelde celdeling → zilverwitte schilfers." },
            { title: "Koebner-fenomeen", desc: "Nieuwe laesies ontstaan op plaatsen van huidtrauma (kras, operatielitteken)." },
            { title: "Triggers", desc: "Infectie (streptokokken), stress, alcohol, medicatie (lithium, bètablokkers, NSAID's)." },
          ],
          onderscheid: [
            { label: "Seborroïsche dermatitis", desc: "Ook scalp, maar vette gele schilfering, minder scherp begrensd, niet op extensoren.", type: 'ok' },
            { label: "Eczeem", desc: "Jeuk op voorgrond, flexuurlokalisatie, minder scherpe begrenzing.", type: 'warn' },
            { label: "Lichen planus", desc: "Paarse polygonale papels, Wickham-striae, voorkeur polsen — kan lijken op psoriasis.", type: 'danger' },
          ],
          therapie: {
            urgent: "Lokaal: corticosteroïden + vitamine D-analogen (calcipotriol).",
            stappen: [
              { naam: "Matig", detail: "UVB-fototherapie, teerpreparaten (scalp)." },
              { naam: "Ernstig", detail: "Methotrexaat (MTX), ciclosporine, acitretine." },
              { naam: "Biologicals", detail: "Anti-TNF (adalimumab), anti-IL-17 (secukinumab), anti-IL-23 (guselkumab) bij onvoldoende respons." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Kind van 4 jaar, jeukend eczeem in knieholten en elleboogplooien, droge huid, seizoensgebonden verergering. Moeder heeft hooikoorts. Diagnose?',
    a:['Atopische dermatitis','Contactallergisch eczeem','Psoriasis inversus','Seborroïsche dermatitis'], c:0,
    ex:'Atopisch eczeem: jeuk + flexuurlokalisatie (knieholten/elleboogplooien) + droge huid. Familiaire atopie (eczeem + astma + rinitis = atopische triade).',
    wiki:{
          kern: "Atopische dermatitis: filaggrine-mutaties → defect in de huidbarrière → droge huid en allergene penetratie → Th2-gemedieerde ontsteking (IL-4, IL-13) met IgE-overproductie.",
          redflag: "Eczema herpeticum: herpes simplex superinfectie op geïnfecteerd eczeem — gegeneraliseerde pijnlijke vesikels, koorts, ernstig ziek → direct aciclovir IV.",
          mechanisme: [
            { title: "Huidbarrièredefect", desc: "Filaggrine-mutaties verminderen transepidermaal waterretentie → droge, kwetsbare huid die allergenen doorlaat." },
            { title: "Th2-inflammatie", desc: "IL-4 en IL-13 activeren IgE-productie en verergeren de barrièrestoornis — basis voor dupilumab (IL-4Rα-antagonist)." },
            { title: "Prurigo nodularis", desc: "Chronisch krabben leidt tot gehyperpigmenteerde, verheven noduli — uiterste vorm van chronisch eczeem." },
          ],
          onderscheid: [
            { label: "Contactallergisch eczeem", desc: "Patroon volgt blootstelling (riem, horloge), patch-test positief.", type: 'ok' },
            { label: "Psoriasis inversus", desc: "In lichaamsplooien, scherp begrensd, nauwelijks jeukend.", type: 'warn' },
            { label: "Scabiës", desc: "Intense nachtjeuk, interdigitaal + polsen, groepsuitbraken — sluit uit bij verergering eczeem.", type: 'danger' },
          ],
          therapie: {
            urgent: "Emolliënten intensief (meerdere keren per dag) + topicale corticosteroïden.",
            stappen: [
              { naam: "Matig", detail: "Tacrolimus of pimecrolimus (calcineurine-remmers) — vooral gezicht/plooien." },
              { naam: "Ernstig", detail: "Dupilumab (IL-4/IL-13-blokker) of tralokinumab; cyclosporine als overbrugging." },
              { naam: "Fototherapie", detail: "UVB-smalspectrum bij uitgebreide eczeem." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Vrouw van 65 jaar, asymmetrisch gepigmenteerde laesie op de rug, onregelmatige randen, meerdere kleuren (bruin, zwart, rood). Groeit de afgelopen maanden. Diagnose uitsluiten?',
    a:['Melanoom','Seborroïsche keratose','Blauwe naevus','Dermatofibroom'], c:0,
    ex:'ABCDE bij pigmentlaesie: Asymmetrie, onregelmatige Begrenzing, meerdere kleuren (Color), Diameter >6 mm, Evolutie. Altijd excisiebiopsie — nooit shave-biopsie.',
    wiki:{
          kern: "Melanoom: agressief huidcarcinoom van melanocyten. Prognose bepaald door Breslow-dikte (invasiediepte in mm) en aanwezigheid van lymfekliermetastasen.",
          redflag: "Amelanotisch melanoom (niet-gepigmenteerd) mist alle ABCDE-kenmerken — wordt vaak gemist als 'gewoon pukkeltje'. Hoog sterftecijfer door late diagnose.",
          mechanisme: [
            { title: "BRAF-V600E-mutatie", desc: "Aanwezig in ~50% van melanomen → gerichte therapie met BRAF-remmers (vemurafenib) + MEK-remmers (trametinib)." },
            { title: "Immunotherapie", desc: "Anti-PD-1 (nivolumab, pembrolizumab) en anti-CTLA-4 (ipilimumab) hebben de overleving bij gemetastaseerd melanoom revolutionair verbeterd." },
          ],
          onderscheid: [
            { label: "Seborroïsche keratose", desc: "'Vastgeplakt' uiterlijk, mat oppervlak, geen melanocyten — benigne.", type: 'ok' },
            { label: "Blauwe naevus", desc: "Uniform blauwgrijs, benigne.", type: 'warn' },
            { label: "Spitz-naevus", desc: "Bij kinderen, rood of roze — histologisch moeilijk te onderscheiden van melanoom → excisie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Excisie met vrije marge (0,5-2 cm afhankelijk van Breslow-dikte) — zo snel mogelijk.",
            stappen: [
              { naam: "Schildwachtklierbiopsie", detail: "Bij Breslow-dikte ≥0,8 mm om lymfekliermetastasen op te sporen." },
              { naam: "Stadium III/IV", detail: "Immunotherapie (anti-PD-1 ± anti-CTLA-4) en/of BRAF/MEK-remmers bij BRAF-mutatie." },
              { naam: "Adjuvante therapie", detail: "Nivolumab of pembrolizumab bij hoog-risico gereseceerd melanoom." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Vrouw van 30 jaar, ernstige acné op gelaat en borst, niet reagerend op topicale behandeling en antibiotica. Ze wil graag zwanger worden. Welke behandeling is nu NIET geïndiceerd?',
    a:['Isotretinoïne (Roaccutane)','Azelaïnezuur topisch','Clindamycine topisch','Doxycycline oraal'], c:0,
    ex:'Isotretinoïne is sterk teratogeen — absoluut gecontra-indiceerd bij zwangerschap of zwangerschapswens zonder streng anticonceptieprotocol.',
    wiki:{
          kern: "Isotretinoïne (13-cis-retinoïnezuur): meest effectieve acnébehandeling — werkt op alle vier pathomechanismen (talgklierhypertrofie, comedonen, Cutibacterium acnes, ontsteking).",
          redflag: "Isotretinoïne + zwangerschap = ernstige aangeboren afwijkingen (schedel, hart, centraal zenuwstelsel). Altijd twee vormen anticonceptie verplicht — ook bij twijfel.",
          mechanisme: [
            { title: "Bijwerkingen", desc: "Droge lippen, huid en slijmvliezen (vrijwel iedereen), hypertriglyceridemie, leverfunctiestoornissen." },
            { title: "Combinatiegevaar", desc: "Isotretinoïne + tetracycline → verhoogd risico op pseudotumor cerebri (verhoogde hersendruk) — combinatie verboden." },
            { title: "Psychiatrie", desc: "FDA black box voor suïcidaliteit, maar causale relatie niet bewezen — wel monitoren." },
          ],
          onderscheid: [
            { label: "Doxycycline oraal", desc: "Matig-ernstige acné, maximaal 3 maanden (resistentierisico).", type: 'ok' },
            { label: "Hormonale anticonceptiva", desc: "Cyproteronacetaat/ethinylestradiol: anti-androgeen effect, effectief bij vrouwen.", type: 'warn' },
            { label: "Benzoylperoxide", desc: "Bactericid, resistentievrij — veilig tijdens zwangerschap.", type: 'ok' },
          ],
          therapie: {
            urgent: "Mild: topische retinoïden + benzoylperoxide.",
            stappen: [
              { naam: "Matig", detail: "Toevoegen topisch of oraal antibioticum (max 3 maanden)." },
              { naam: "Ernstig/refractair", detail: "Isotretinoïne — verplicht met anticonceptie en maandelijkse monitoring (lever, lipiden, zwangerschapstest)." },
            ],
          },
        } },


  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Man van 72 jaar, sinistere huidlaesie op de onderlip, verheven ulcererende rand, langzaam groeiend over maanden. Roker, veel buiten gewerkt. Meest waarschijnlijke diagnose?',
    a:['Plaveiselcelcarcinoom (SCC)','Basaalcelcarcinoom','Melanoom','Keratoacanthoom'], c:0,
    ex:'Plaveiselcelcarcinoom (PCC): ulcererende laesie met verheven rand bij ouderen met zonschade. Metastatisch risico 2-5% — hoger op lip en oor.',
    wiki:{
          kern: "Niet-melanoom huidcarcinomen: basaalcelcarcinoom (BCC, 75%) en plaveiselcelcarcinoom (PCC, 20%). BCC metastaseert zelden maar is lokaal destructief; PCC kan regionale lymfekliermetastasen geven.",
          redflag: "PCC op lip, oor of bij immuungecompromitteerde patiënten: metastatisch risico tot 15-20% — altijd lymfeklieren palperen en laagdrempelig beeldvormend onderzoek.",
          mechanisme: [
            { title: "BCC-kenmerken", desc: "Parelranden, teleangiëctasieën, centrale ulceratie ('rodent ulcer') — voorkeur neus, wangen, oogleden." },
            { title: "PCC-kenmerken", desc: "Keratotisch ulcus met ondermijnde rand, op achtergrond van actinische keratose (voorstadium)." },
          ],
          onderscheid: [
            { label: "Keratoacanthoom", desc: "Snel groeiend (weken), crateervormig met hoornprop — histologisch moeilijk van PCC te onderscheiden → altijd excisie.", type: 'ok' },
            { label: "Melanoom", desc: "Gepigmenteerd, ABCDE-criteria.", type: 'warn' },
            { label: "Merkelcelcarcinoom", desc: "Zeldzaam, agressief neuro-endocrien carcinoom — hoog metastatisch risico, snel groeiend.", type: 'danger' },
          ],
          therapie: {
            urgent: "PCC: excisie met vrije marge (>5 mm). Controleer lymfeklierstations.",
            stappen: [
              { naam: "Mohs-chirurgie", detail: "Bij PCC hoofd-hals of recidief — weefselbesparend, laagste recidiefkans." },
              { naam: "Actinische keratosen (voorstadium)", detail: "Topicaal 5-fluorouracil (5-FU), imiquimod of cryotherapie." },
              { naam: "Gemetastaseerd PCC", detail: "Cemiplimab (anti-PD-1 immunotherapie)." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Man van 35 jaar, vesiculeuze laesies langs de flank links, pijn die al 3 dagen bestond vóór de huiduitslag, branderig gevoel. Recent stress. Diagnose?',
    a:['Herpes zoster (gordelroos)','Herpes simplex','Varicella (primo-infectie)','Contactallergisch eczeem'], c:0,
    ex:'Herpes zoster: VZV-reactivatie met prodromale pijn 2-3 dagen vóór huiduitslag. Unilateraal, dermatomaal, nooit over de middellijn.',
    wiki:{
          kern: "Gordelroos = reactivatie van varicella-zostervirus (VZV) bij verminderde cellulaire immuniteit (ouderdom, stress, immuunsuppressie, hiv). VZV blijft latent in dorsale ganglia.",
          redflag: "Zoster ophthalmicus (V1-tak nervus trigeminus, neuspuntblaasjes = Hutchinson-teken): kans op cornea-ulceratie en visusschade — direct oogheelkunde consult.",
          mechanisme: [
            { title: "Postherpetische neuralgie (PHN)", desc: "Brandende, aanhoudende pijn ≥3 maanden na huidgenezing — vaker bij ouderen en bij ernstige initiële pijn." },
            { title: "Risicofactoren PHN", desc: "Leeftijd >60 jaar, ernstige prodromale pijn, immuunsuppressie." },
            { title: "Behandeling PHN", desc: "Gabapentine of pregabaline, tricyclisch antidepressivum (amitriptyline), capsaïcine-patch of opioïden." },
          ],
          onderscheid: [
            { label: "Herpes simplex", desc: "Labialis of genitalis, kleinere vesikels, recidief op dezelfde plek, niet dermatomaal.", type: 'ok' },
            { label: "Varicella primo-infectie", desc: "Verspreide blaasjes over heel lichaam, niet dermatomaal, vooral kinderen.", type: 'warn' },
            { label: "Contactallergisch eczeem", desc: "Ook unilateraal mogelijk maar jeuk op voorgrond, geen prodromale pijn.", type: 'danger' },
          ],
          therapie: {
            urgent: "Aciclovir 800 mg 5×/dag 7 dagen, of valaciclovir 1000 mg 3×/dag — start binnen 72 uur na uitslag.",
            stappen: [
              { naam: "Pijnstilling", detail: "NSAID + paracetamol; bij ernstige pijn opiaten toevoegen." },
              { naam: "Vaccinatie preventie", detail: "Shingrix (niet-levend, 2 doses, effectiever) — ook bij immuungecompromitteerden." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'derm', dl:'Dermatologie',
    q:'Basaalcelcarcinoom is het meest voorkomende huidcarcinoom en heeft een hoog risico op metastasen.',
    c:false,
    ex:'NIET WAAR: BCC is het meest voorkomende huidcarcinoom (75%), maar metastaseert uiterst zelden (<0,1%). Wél lokaal destructief.',
    wiki:{
          kern: "Huidcarcinoomfrequentie: basaalcelcarcinoom (BCC) > plaveiselcelcarcinoom (PCC) > melanoom. BCC-subtypen: nodulair (meest frequent), oppervlakkig, pigmented en morfeeform (infiltratief).",
          redflag: "Morfeeform BCC: vlak, hard, slecht begrensd — kans op onvolledige excisie hoog. Bij botinvasie of perineurale groei: Mohs-chirurgie en eventueel radiotherapie.",
          mechanisme: [
            { title: "PTCH1-mutatie", desc: "Sonic Hedgehog-signaalweg verstoord → ongeremde basaalcelproliferatie. UV-straling is de voornaamste mutagene factor." },
            { title: "Gorlin-syndroom", desc: "Erfelijke PTCH1-mutatie → multipele BCC's al op jonge leeftijd + skeletafwijkingen + medulloblastoom." },
          ],
          onderscheid: [
            { label: "Nodulair BCC", desc: "Paarlmoerkleur, teleangiëctasieën, centraal ulcus — meest voorkomende subtype.", type: 'ok' },
            { label: "Morfeeform BCC", desc: "Vlak, hard, slecht afgrensbaar — hogere kans op recidief na excisie.", type: 'warn' },
            { label: "PCC", desc: "Keratotisch ulcus, verheven rand — heeft wél metastatisch risico.", type: 'danger' },
          ],
          therapie: {
            urgent: "Excisie met vrije marge (3-5 mm). Mohs-chirurgie bij hoog-risico lokalisatie (gelaat, H-zone).",
            stappen: [
              { naam: "Oppervlakkig BCC", detail: "Imiquimod crème, 5-fluorouracil (5-FU) of fotodynamische therapie (PDT) als alternatief voor excisie." },
              { naam: "Irresectabel BCC", detail: "Vismodegib (Sonic Hedgehog-remmer) of radiotherapie." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'derm', dl:'Dermatologie',
    q:'Een positieve VDRL/RPR-test is bewijzend voor actieve syfilis.',
    c:false,
    ex:'NIET WAAR: VDRL/RPR is een screentest met lage specificiteit — bevestig altijd met treptonemale test (TPHA of FTA-ABS).',
    wiki:{
          kern: "Syfilis-diagnostiek: (1) Screentest: VDRL of RPR (niet-treptonemaal, wordt negatief na behandeling, titer = activiteitsgraadmeter). (2) Bevestigingstest: TPHA of FTA-ABS (treptonemaal, blijft levenslang positief).",
          redflag: "Neurosyfilis kan optreden in elk stadium — denk aan veranderd gedrag, psychiatrische symptomen of meningismus bij syfilis. Vereist lumbaalpunctie en penicilline IV (niet IM).",
          mechanisme: [
            { title: "Syfilis-stadia", desc: "Primair: pijnloos ulcus durum. Secundair: roos handpalmen/voetzolen, condylomata lata, gegeneraliseerde lymfadenopathie. Latent: geen symptomen. Tertiair: gumma, cardiovasculaire syfilis, neurosyfilis." },
            { title: "Transmissie", desc: "Seksueel contact of verticaal (moeder-kind → congenitale syfilis)." },
          ],
          onderscheid: [
            { label: "Chancroid (Haemophilus ducreyi)", desc: "Pijnlijk genitaal ulcus — in tegenstelling tot syfilis (pijnloos).", type: 'ok' },
            { label: "Herpes genitalis", desc: "Pijnlijke vesikels, recidiverend.", type: 'warn' },
            { label: "Lymphogranuloma venereum (LGV)", desc: "Chlamydia trachomatis L1-3, inguinale klieren, proctitis.", type: 'danger' },
          ],
          therapie: {
            urgent: "Primair/secundair/latent <1 jaar: benzylpenicilline 2,4 miljoen IE IM eenmalig.",
            stappen: [
              { naam: "Tertiair/neurosyfilis/latent >1 jaar", detail: "Benzylpenicilline IV gedurende 10-14 dagen." },
              { naam: "Penicillineallergie", detail: "Doxycycline (niet bij neurosyfilis — slechte penetratie liquor)." },
              { naam: "Congenitale syfilis", detail: "Benzylpenicilline neonataal." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'derm', dl:'Dermatologie',
    q:'Scabiës wordt veroorzaakt door een schimmel en is behandelbaar met een topisch antischimmelcrème.',
    c:false,
    ex:'NIET WAAR: Scabiës = mijt (Sarcoptes scabiei), geen schimmel. Behandeling: permetrine 5% crème of ivermectine oraal — antischimmelcrème heeft geen effect.',
    wiki:{
          kern: "Scabiës: intense nachtjeuk door hypersensitiviteit voor de mijt Sarcoptes scabiei en haar uitwerpselen. Voorkeurslokalisaties: interdigitale ruimten, polsen, tepelareola, geslachtsorganen.",
          redflag: "Noors (gekortst) scabiës bij immuungecompromitteerden: miljoenen mijten, hyperkeratotische plaques, extreem besmettelijk — isolatie en ivermectine verplicht.",
          mechanisme: [
            { title: "Pathogenese", desc: "Sarcoptes scabiei graaft gangetjes in de oppervlakkige huid om eitjes te leggen → hypersensitiviteitsreactie op mijt en uitwerpselen → intense nachtjeuk." },
            { title: "Overdracht", desc: "Direct langdurig huidcontact (seksueel, huishoudelijk). Alle huisgenoten en nauwe contacten tegelijk behandelen." },
            { title: "Beddengoed", desc: "Wassen op ≥60°C of 72 uur in plastic zak (mijten overleven max. 2-3 dagen zonder gastheer)." },
          ],
          onderscheid: [
            { label: "Eczeem", desc: "Ook jeuk, maar geen gangetjes en niet typisch interdigitaal of nachtgebonden.", type: 'ok' },
            { label: "Urticaria", desc: "Vluchtige wheals, niet dermatomaal.", type: 'warn' },
            { label: "Tinea pedis", desc: "Schimmel interdigitaal — witte maceratie, geen nachtjeuk.", type: 'danger' },
          ],
          therapie: {
            urgent: "Permetrine 5% crème: eerste keus — gehele lichaam (hals t/m voeten), 8-12 uur, herhalen na 1 week.",
            stappen: [
              { naam: "Ivermectine 200 μg/kg oraal", detail: "Alternatief of bij noors scabiës — twee doses met 2 weken interval." },
              { naam: "Jeuk", detail: "Antihistaminica — jeuk kan weken aanhouden door dode mijtresten (geen teken van falen behandeling)." },
            ],
          },
        } },

  { type:'diagnose', d:5, domain:'derm', dl:'Dermatologie', subtype:'diff',
    q:'Welk kenmerk onderscheidt urticaria (netelroos) van angio-oedeem bij een allergische reactie?',
    a:['Urticaria: oppervlakkige jeukende wheals in de dermis; angio-oedeem: diepe zwelling in de subcutis zonder jeuk','Urticaria geeft altijd benauwdheid, angio-oedeem nooit','Urticaria is IgE-gemedieerd, angio-oedeem is altijd C1q-remmertekort','Angio-oedeem geeft rode laesies, urticaria geeft bleke laesies'], c:0,
    ex:'Urticaria = jeukende dermale wheals (<24u per laesie). Angio-oedeem = diepere subcutane zwelling, minder jeukend — gevaarlijk bij larynxbetrokkenheid.',
    wiki:{
          kern: "Anafylaxie = systemische IgE-gemedieerde reactie: urticaria + angio-oedeem + bronchospasme + hypotensie. Behandeling: adrenaline 0,3-0,5 mg IM (buitenzijde dij) + O2 + liggen met benen omhoog.",
          redflag: "Angio-oedeem van de larynx: stridor, heesheid, kwijlen → levensbedreigende luchtwegobstructie. Direct adrenaline IM — wacht niet op antihistaminica.",
          mechanisme: [
            { title: "IgE-gemedieerd (type I)", desc: "Allergeen → IgE op mestcellen → histamine-vrijstelling → vasodilatatie en verhoogde permeabiliteit → wheals (dermis) of zwelling (subcutis)." },
            { title: "Hereditair angio-oedeem (HAE)", desc: "C1-remmerdeficiëntie → bradykinine-overschot → zwelling zonder jeuk en zonder urticaria. Reageert NIET op antihistaminica of adrenaline." },
          ],
          onderscheid: [
            { label: "Hereditair angio-oedeem (HAE)", desc: "Geen jeuk, geen urticaria, recidiverend, familiegeschiedenis, niet reagerend op antihistaminica.", type: 'ok' },
            { label: "Chronische spontane urticaria", desc: ">6 weken, oorzaak onduidelijk — dagelijks antihistaminicum, bij onvoldoende respons omalizumab.", type: 'warn' },
            { label: "ACE-remmer-angio-oedeem", desc: "Bradykinine-gemedieerd (niet IgE) — ook niet reagerend op antihistaminica. Stop ACE-remmer direct.", type: 'danger' },
          ],
          therapie: {
            urgent: "Anafylaxie: adrenaline 0,3-0,5 mg IM buitenzijde dij — herhaal na 5 min indien nodig.",
            stappen: [
              { naam: "Antihistaminica + corticosteroïden", detail: "Aanvullend na adrenaline — vertragen late-fase reactie maar zijn géén primaire behandeling bij anafylaxie." },
              { naam: "HAE-behandeling", detail: "Icatibant (bradykinine B2-antagonist), C1-remmerconcentraat; profylaxe: lanadelumab." },
            ],
          },
        } },


  // ── REUMATOLOGIE ──
  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Vrouw van 45 jaar, symmetrische pijn en zwelling van de MCP- en PIP-gewrichten, ochtendstijfheid >1 uur, vermoeidheid, RF en anti-CCP positief. Diagnose?',
    a:['Reumatoïde artritis','Artrose','Systemische lupus erythematosus','Reactieve artritis'], c:0,
    ex:'RA: symmetrische gewrichtsontsteking MCP/PIP/polsen, ochtendstijfheid >1u, RF en anti-CCP positief. DIP-gewrichten worden bij RA gespaard (in tegenstelling tot artrose). Anti-CCP is specifieker (95%) dan RF (70-80%) voor RA.',
    wiki:{
          kern: "RA: auto-immuun synovitis door T- en B-cel-activatie → TNF-α/IL-6/IL-1 productie → synoviaal pannus → kraakbeenerosie → botdestructie. Prevalentie 1%, vrouwen 3×.",
          mechanisme: [
            { title: "Stap 1", desc: "Anti-CCP (anti-citrullineerde proteïne-antistoffen): pathologisch → aanwezig jaren vóór symptomen, voorspelt erosief beloop." },
            { title: "RF", desc: "niet-specifiek (ook bij SjS, SLE, hepatitis C)." },
            { title: "Erosies op röntgen", desc: "marginal erosions bij de \"bare area\" van het gewricht." },
          ],
          onderscheid: [
            { label: "Artrose", desc: "niet-inflammatoir, DIP>PIP, ochtendstijfheid <30 min, geen RF/CCP, Heberden-knobbels.", type: 'ok' },
            { label: "SLE", desc: "vlindervlekken, lichtgevoeligheid, ANA+, multipele orgaanbetrokkenheid.", type: 'warn' },
            { label: "Reactieve artritis", desc: "na infectie (STD of darminfectie), asymmetrisch, HLA-B27+.", type: 'danger' },
          ],
          therapie: {
            urgent: "Treat-to-target: remissie als doel.",
            stappen: [
              { naam: "Methotrexaat (MTX)", detail: "hoeksteen (wekelijks + foliumzuur)." },
              { naam: "Stap 2", detail: "MTX + biologicals (anti-TNF: etanercept, adalimumab; IL-6-remmer: tocilizumab)." },
              { naam: "JAK-remmers", detail: "baricitinib, tofacitinib." },
              { naam: "Stap 4", detail: "NSAIDs + corticosteroïden overbruggen." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Man van 35 jaar, plotse, hevige pijn en roodheid van de grote teen (MTP-1 gewricht), nacht. Serum urinezuur 0.58 mmol/L, leukocytose. Diagnose?',
    a:['Jicht (gout)','Septische artritis','Pseudojicht (CPPD)','Reactieve artritis'], c:0,
    ex:'Jicht: kristalarthropathie door monosodium uraat-kristallen. Klassiek: plotse artritis MTP-1 (podagra) \'s nachts, rood, warm, heftig pijnlijk. Hyperurikemie is predisponerend maar de aanval zelf kan optreden bij normale urinezuurspiegels.',
    wiki:{
          kern: "Jichtaanval: uraatkristallen → activatie NLRP3 inflammasome → IL-1β-productie → acute ontsteking. Risicofactoren: hyperurikemie (purine-rijke voeding, alcohol, diuretica, nierinsufficiëntie).",
          mechanisme: [
            { title: "Diagnose jichtaanval", desc: "synoviaalvochtkristalanalyse (naaldscintiging, negatief birefringent onder polarisatielicht)." },
            { title: "Stap 2", desc: "Serum urinezuur kan normaal zijn tijdens aanval." },
            { title: "Stap 3", desc: "Colchicine (vroeg starten), NSAID of corticosteroïd voor aanvalbehandeling." },
          ],
          onderscheid: [
            { label: "Septische artritis", desc: "ook monoartritis met rood/warm gewricht maar koorts + ziek + leuko hoog → direct aspiratie! Pseudojicht (CPPD): calcium pyrofosfaat kristallen, positief birefringent, ouder, knie/pols.", type: 'ok' },
            { label: "Reactieve artritis", desc: "na infectie, HLA-B27, Reiter\\'s triade (artritis+urethritis+conjunctivitis).", type: 'warn' },
          ],
          therapie: {
            urgent: "Aanval: colchicine 0.5 mg 3×/dag of NSAID of pred 30 mg.",
            stappen: [
              { naam: "Preventie recidief", detail: "allopurinol (XO-remmer) of febuxostat." },
              { naam: "Stap 2", detail: "Doelwaarde urinezuur <0.36 mmol/L." },
              { naam: "Leefstijl", detail: "minder purine (rood vlees, orgaanvlees), geen alcohol (bier+sterke drank), ruim drinken." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Vrouw van 28 jaar, vlindervormig exantheem op wangen, fotosensitviteit, gewrichtspijn, proteïnurie, ANA positief (titer 1:640), anti-dsDNA positief. Diagnose?',
    a:['Systemische lupus erythematosus (SLE)','Reumatoïde artritis','Dermatomyositis','Sjögren-syndroom'], c:0,
    ex:'SLE: auto-immuunziekte met multipele orgaanbetrokkenheid. ACR/EULAR-criteria: vlindervlekken, lichtgevoeligheid, serositis, nierziekte, neurologisch, hematoloog, immunologisch (anti-dsDNA, anti-Sm, complementverlaag). ANA positief in >95% van SLE.',
    wiki:{
          kern: "SLE: vnl. vrouwen in de vruchtbare leeftijd (9:1 vrouw:man), hoger bij Afrikaans-Amerikaanse en Aziatische bevolking. Antinucleaire antistoffen (ANA): zeer gevoelig (>95%) maar niet specifiek.",
          mechanisme: [
            { title: "Stap 1", desc: "Lupus nefritis: immuuncomplexdepositie in glomeruli." },
            { title: "Stap 2", desc: "complementactivatie." },
            { title: "Stap 3", desc: "ontsteking. Klasse III/IV: ernstigste vorm, behandeling: hydroxychloroquine + MMF (mycofenolzuur) of cyclofosfamide + steroïden. Biopsie voor classificatie." },
          ],
          onderscheid: [
            { label: "RA", desc: "gewrichten dominant, anti-CCP+, geen vlindervlekken.", type: 'ok' },
            { label: "Dermatomyositis", desc: "huiduitslag + spierzwakte, heliotrope rash, CK verhoogd.", type: 'warn' },
            { label: "SjS", desc: "droge ogen/mond, anti-SSA/SSB+, mildere systemische betrokkenheid.", type: 'danger' },
          ],
          therapie: {
            urgent: "Hydroxychloroquine: basis voor alle SLE-patiënten (vermindert schubs, cardiovasculair beschermend).",
            stappen: [
              { naam: "Schubs", detail: "corticosteroïden." },
              { naam: "Orgaanbedreigende ziekte", detail: "MMF, cyclofos­famide, belimumab (anti-BAFF)." },
              { naam: "Stap 3", detail: "Zon-vermijding." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Man van 30 jaar, rugpijn >3 maanden, verbetert bij bewegen en niet bij rust, ochtendstijfheid >1 uur, HLA-B27 positief. MRI sacroïliaca-gewrichten: oedeem. Diagnose?',
    a:['Axiale spondylartritis (ankyloserende spondylitis)','Lumbale hernia nuclei pulposi','Reumatoïde artritis','Fibromyalgie'], c:0,
    ex:'Axiale spondylartritis: inflammatoire rugpijn (beter bij beweging, niet bij rust), ochtendstijfheid >1u, onset <45j, HLA-B27+ (90%), sacroiliitis op MRI (oedeem = actieve ontsteking). Ankyloserende spondylitis is de radiografische variant (HNP geeft mechanische pijn, erger bij bewegen).',
    wiki:{
          kern: "SpA-groep: axiale SpA (AS), perifere SpA, PsA (psoriasisartritis), reactieve artritis, artritis bij IBD. Kenmerkend: HLA-B27-associatie, enthesitis (bij aanhechting pees/ligament), asymmetrische perifere artritis, oogbetrokkenheid (uveïtis anterior).",
          mechanisme: [
            { title: "Enthesitis", desc: "ontsteking op osseo-tendineuze juncties (hielpezen, zit-been)." },
            { title: "Stap 2", desc: "IL-17 dominant in spondylartritis." },
            { title: "Stap 3", desc: "IL-17-remmers (secukinumab, ixekizumab) effectief bij axiale SpA." },
            { title: "Stap 4", desc: "Anti-TNF (etanercept, adalimumab) ook eerste biologische keus." },
          ],
          onderscheid: [
            { label: "HNP", desc: "mechanische pijn, erger bij bewegen en buigen, betert bij rust, uitstralende pijn dermatomaal.", type: 'ok' },
            { label: "Fibromyalgie", desc: "diffuse pijn, geen inflammatoire markers, MRI normaal, normaal HLA.", type: 'warn' },
            { label: "RA", desc: "symmetrisch perifeer, anti-CCP+, sacroilitis niet typisch.", type: 'danger' },
          ],
          therapie: {
            urgent: "Stap 1: NSAID maximale dosis (diagnostisch en therapeutisch).",
            stappen: [
              { naam: "Stap 2", detail: "biologic (anti-TNF of anti-IL-17)." },
              { naam: "Stap 2", detail: "Geen DMARDs (MTX) bij puur axiale ziekte (niet bewezen effectief)." },
              { naam: "Fysiotherapie", detail: "essentieel (houdingsverbetering)." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Man van 70 jaar, pijn en stijfheid in schouders en heupen, BSE 85 mm/u, CRP verhoogd. Geen spierkrachtverlies. Snelle respons op lage dosis prednisolon. Diagnose?',
    a:['Polymyalgia rheumatica (PMR)','Reumatoïde artritis','Fibromyalgie','Polymyositis'], c:0,
    ex:'PMR: ouder dan 50 jaar (gemiddeld 70), pijn en stijfheid schouders/heupen bilateraal, hoge BSE/CRP, geen spierzwakte (onderscheid van polymyositis), dramatische respons op lage dosis prednisolon (15-20 mg). Geassocieerd met temporalis-arteriitis (GCA).',
    wiki:{
          kern: "PMR is geassocieerd met GCA (reuscelarteriitis) bij 10-15% van de patiënten. Altijd temporalis-arteriitis uitsluiten: hoofdpijn, kaakclaudicatie, gezichtsveranderingen, blindheid (AION).",
          mechanisme: [
            { title: "PMR-pathologie", desc: "synovitis van schouderbursae en tenosynovitis van de heuppeesstructuren." },
            { title: "PET-CT", desc: "toegenomen opname in bursae en tenosynoviaal weefsel bij PMR." },
            { title: "Stap 3", desc: "IL-6 verhoogd (tocilizumab effectief bij GCA)." },
          ],
          onderscheid: [
            { label: "Polymyositis", desc: "proximale spierzwakte (op trap lopen, armen omhoogbrengen), verhoogd CK, myopathische EMG.", type: 'ok' },
            { label: "RA", desc: "distale gewrichten, RF/CCP positief.", type: 'warn' },
            { label: "Fibromyalgie", desc: "normale laboratoriumwaarden.", type: 'danger' },
            { label: "Hypothyreoïdie", desc: "ook stijfheid maar normaal BSE, verhoogd TSH.", type: 'warn' },
          ],
          therapie: {
            urgent: "Prednisolon 15-20 mg/dag → snelle symptoomverlichting (diagnostisch).",
            stappen: [
              { naam: "Stap 1", detail: "Afbouwen over 1-2 jaar." },
              { naam: "GCA", detail: "prednisolon 60 mg." },
              { naam: "Recidief bij afbouwen", detail: "terug naar vorige dosis." },
              { naam: "Stap 4", detail: "Methotrexaat als steroïdsparend bij recidief." },
              { naam: "Tocilizumab", detail: "bij GCA (IL-6 remmer)." },
            ],
          },
        } },


  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Vrouw van 50 jaar, droge ogen en mond al jaren, pijnlijke gewrichten, anti-SSA (Ro) en anti-SSB (La) antistoffen positief. Diagnose?',
    a:['Primair Sjögren-syndroom','SLE','Reumatoïde artritis','Sarcoidose'], c:0,
    ex:'Primair Sjögren: droge ogen (xeroftalmie, Schirmer-test <5 mm/5 min) + droge mond (xerostomie) + anti-SSA/SSB positief. Secundair Sjögren: geassocieerd met RA of SLE. Complicaties: lymfoom (B-cel, 5× verhoogd risico), interstitiële longziekte, perifere neuropathie.',
    wiki:{
          kern: "Sjögren: auto-immuun exocrine klierontsteking → droge ogen, mond, huid, vaginale mucosa. ANA positief (>90%), anti-SSA/SSB (specifiek).",
          mechanisme: [
            { title: "Lymfoomrisico", desc: "parotiszwelling, lage C4, cryoglobulinemia, huid vasculitis verhogen risico." },
            { title: "Monitoring", desc: "jaarlijks parotiszwelling, lymfadenopathie." },
            { title: "Stap 3", desc: "B-cel lymfomen, met name MALT-type." },
          ],
          onderscheid: [
            { label: "SLE", desc: "multipele orgaanbetrokkenheid, anti-dsDNA+, vlindervlekken.", type: 'ok' },
            { label: "RA", desc: "erosieve artritis, anti-CCP+, maar SjS-overlap frequent.", type: 'warn' },
            { label: "Sarcoidose", desc: "ook droge ogen/mond maar ACE verhoogd, bilaterale hilaire lymfadenopathie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Ogen: kunsttranen, cyclosporine oogdruppels, punctaocclusie.",
            stappen: [
              { naam: "Mond", detail: "stimulatie speekselvloed (kauwgom, pilocarpine), goede mondverzorging (cariesprofylaxe)." },
              { naam: "Systemisch", detail: "hydroxychloroquine, NSAID." },
              { naam: "Ernstige orgaanziekte", detail: "steroïden, rituximab." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Man van 25 jaar, artritis knie, urethrale afscheiding 2 weken eerder, conjunctivitis, huidlaesies op handpalmen en voetzolen. HLA-B27 positief. Diagnose?',
    a:['Reactieve artritis (Reiter-syndroom)','Septische artritis','Jicht','Reumatoïde artritis'], c:0,
    ex:'Reactieve artritis (Reiter-syndroom): artritis + urethritis + conjunctivitis na seksuele infectie (Chlamydia) of gastro-intestinale infectie (Salmonella, Yersinia). HLA-B27 sterk geassocieerd. Keratoderma blennorrhagicum = huidlaesies op handpalmen/voetzolen.',
    wiki:{
          kern: "Reactieve artritis: perifere asymmetrische oligo-artritis na infectie 1-4 weken eerder. Infectie zelf al voorbij.",
          mechanisme: [
            { title: "HLA-B27", desc: "risico-allel voor SpA-groep." },
            { title: "Stap 2", desc: "Moleculaire mimicry of foutieve antigeen­presentatie door HLA-B27 als pathomechanisme." },
            { title: "Stap 3", desc: "Artritis is auto-immuun, geen directe infectie van het gewricht." },
          ],
          onderscheid: [
            { label: "Septische artritis", desc: "altijd bacterieel, direct gewrichtsinfectie, koorts + leuko hoog.", type: 'ok' },
            { label: "Jicht", desc: "MTP-1, nacht, serum urinezuur hoog.", type: 'warn' },
            { label: "Gonokokkenartritis", desc: "STD, septisch, gramkleuring gewrichtsaspiraat.", type: 'danger' },
          ],
          therapie: {
            urgent: "NSAID voor artritis (symptomatisch).",
            stappen: [
              { naam: "Stap 1", detail: "Antibiotica als nog actieve infectie." },
              { naam: "Stap 2", detail: "Meeste episodes zelflimiterend (3-6 maanden)." },
              { naam: "HLA-B27+", detail: "20-30% kans op chronisch beloop of axiale SpA." },
              { naam: "Stap 4", detail: "Sulfasalazine bij chronisch recidiverende gevallen." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'rheum', dl:'Reumatologie',
    q:'Methotrexaat bij reumatoïde artritis moet altijd worden gecombineerd met foliumzuur-suppletie.',
    c:true,
    ex:'WAAR. Methotrexaat remt dihydrofolaatreductase → foliumzuurdeficiëntie als bijwerking (stomatitis, misselijkheid, hepatotoxiciteit, macrocytose). Foliumzuur 5 mg 1×/week (dag na MTX) of dagelijks 1 mg vermindert bijwerkingen significant zonder de werkzaamheid te verminderen.',
    wiki:{
          kern: "MTX mechanisme bij RA: polyglutaminaten remmen ATIC (AICAR-transformylase) → adenosine-accumulatie → anti-inflammatoir effect. Tevens foliumzuurantagonist → bijwerkingen.",
          mechanisme: [
            { title: "Absolute contra-indicaties MTX", desc: "zwangerschap (teratogeen, abortief), nierinsufficiëntie eGFR <30, leverziekte (levercirrose), alcoholisme, uitgebreide longziekte." },
            { title: "Relatieve contra-indicaties", desc: "COPD, obesitas, diabetes." },
          ],
          onderscheid: [
            { label: "Leflunomide", desc: "ook DMARD, foliumzuurantagonist maar via een ander enzym (DHODH).", type: 'ok' },
            { label: "Sulfasalazine", desc: "minder bijwerkingen, minder effectief dan MTX.", type: 'warn' },
            { label: "Hydroxychloroquine", desc: "mildste DMARD, geen levermonitoring nodig, veilig in zwangerschap.", type: 'danger' },
          ],
        } },

  { type:'truefalse', d:2, domain:'rheum', dl:'Reumatologie',
    q:'Bij verdenking op septische artritis moet eerst röntgenfoto van het gewricht worden gemaakt voordat een gewrichtspunctie plaatsvindt.',
    c:false,
    ex:'NIET WAAR. Bij verdenking septische artritis is directe gewrichtspunctie (arthrocentesis) de prioriteit: voor diagnose (gramkleuring en kweek) én therapeutisch (drukvermindering). Röntgenfoto toont geen septische artritis in vroeg stadium en mag de punctie niet vertragen.',
    wiki:{
          kern: "Septische artritis: medische noodsituatie. Bacteriën vernietigen kraakbeen binnen 24-48u door bacteriële enzymen en inflammatoire respons.",
          mechanisme: [
            { title: "Meest frequente verwekkers", desc: "S. aureus (50%), streptokokken, gonokokken (jongere seksueel actieve patiënten)." },
            { title: "Stap 2", desc: "Hematogeen (vanuit bloedstroom) of direct inoculatie (na punctie, chirurgie)." },
            { title: "Laboratorium gewrichtsvocht", desc: "leuko\\'s >50.000/μL, PMN >90%, glucose laag." },
          ],
          onderscheid: [
            { label: "Jicht", desc: "kristalarthropathie, ook rood/heet maar geen bacteriën in gewrichtsvocht.", type: 'ok' },
            { label: "Reactieve artritis", desc: "steriel gewrichtsvocht, trigger-infectie elders.", type: 'warn' },
            { label: "Hemartros", desc: "bloed in gewricht na trauma.", type: 'danger' },
          ],
          therapie: {
            urgent: "IV antibiotica (S. aureus: flucloxacilline; MRSA: vancomycine).",
            stappen: [
              { naam: "Drainage", detail: "herhaalde aspiraties of chirurgische arthrotomie bij heup/schouder." },
              { naam: "Duur AB", detail: "4-6 weken." },
              { naam: "Stap 3", detail: "Fysiotherapie na infectie behandeld." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'rheum', dl:'Reumatologie',
    q:'Artrose (osteoartritis) is een zuiver degeneratieve slijtageziekte zonder inflammatoire component.',
    c:false,
    ex:'NIET WAAR. Artrose heeft wel degelijk een inflammatoire component: synoviitis, activering van kraakbeencellen (chondrocyten) en subchondraal bot treedt op. De ziekte is echter niet auto-immuun van aard zoals RA. "Low-grade" inflammatie speelt een belangrijke rol in progressie.',
    wiki:{
          kern: "Artrose: meest voorkomende gewrichtsaandoening. Prevalentie stijgt sterk met leeftijd.",
          mechanisme: [
            { title: "Stap 1", desc: "Kraakbeen heeft geen bloedvaten." },
            { title: "Stap 2", desc: "beperkt herstelcapaciteit. Chondrocyten produceren MMPs (matrixmetalloproteasen)." },
            { title: "Stap 3", desc: "extracellulaire matrixafbraak. Subchondrale botsclerose: verhoogde stijfheid." },
            { title: "Stap 4", desc: "shockabsorptie verminderd." },
            { title: "Stap 5", desc: "verdere kraakbeenbelasting." },
          ],
          onderscheid: [
            { label: "RA", desc: "symmetrisch, MCP/PIP, inflammatoire markers hoog, RF/CCP positief.", type: 'ok' },
            { label: "Artrose", desc: "asymmetrisch, gewichtsdragende gewrichten (knie, heup, DIP-Heberden), BSE/CRP normaal of licht verhoogd.", type: 'warn' },
            { label: "Jicht", desc: "acute aanvallen, uraatkristallen.", type: 'danger' },
            { label: "Pseudojicht", desc: "CPPD-kristallen, knie.", type: 'warn' },
          ],
          therapie: {
            urgent: "Conservatief: gewichtsreductie, fysiotherapie, analgesi­ca (paracetamol, NSAIDs).",
            stappen: [
              { naam: "Stap 1", detail: "Intra-articulaire corticosteroïdinjecties bij matig/ernstig." },
              { naam: "Stap 2", detail: "Gewrichtsvervanging (prothese) bij eindstadium (knie- en heupprothese effectief)." },
              { naam: "Stap 3", detail: "Geen DMARDs effectief." },
            ],
          },
        } },

  { type:'diagnose', d:5, domain:'rheum', dl:'Reumatologie', subtype:'diff',
    q:'Welk laboratoriumkenmerk onderscheidt polymyositis van polymyalgia rheumatica (PMR)?',
    a:['Verhoogd creatinekinase (CK) bij polymyositis, normaal bij PMR','Verhoogd BSE bij polymyositis, normaal bij PMR','Positieve ANA bij polymyositis, negatief bij PMR','Anti-CCP positief bij polymyositis'], c:0,
    ex:'CK is het sleutelcriterium: polymyositis = auto-immuun spierontsteking → hoog CK (soms >10× ULN). PMR = synovitis/tenosynovitis zonder myositis → CK normaal. Beide hebben hoog BSE/CRP, maar spierzwakte én hoog CK = polymyositis.',
    wiki:{
          kern: "Inflammatoire myopathieën: polymyositis (PM), dermatomyositis (DM), necrotiserende myopathie, anti-synthetase syndroom. PM: proximale spierzwakte (op trap, armen omhoogbrengen), normaal CK.",
          mechanisme: [
            { title: "Mechanisme", desc: "Myositis-specifieke antistoffen: anti-Jo-1 (anti-synthetase syndroom, associatie met interstitiële longziekte), anti-Mi-2 (DM, gunstige prognose), anti-MDA5 (DM zonder myositis, snel progressieve ILD), anti-SRP (necrotiserende myopathie)." },
          ],
          onderscheid: [
            { label: "PMR", desc: "geen spierzwakte (alleen stijfheid en pijn), normaal CK, ouder dan 50j, snelle respons op 15-20 mg prednisolon.", type: 'ok' },
            { label: "Hypothyreoïdie", desc: "ook spierzwakte en CK verhoogd maar TSH hoog.", type: 'warn' },
            { label: "Statine-geïnduceerde myopathie", desc: "CK hoog, statineanamnese.", type: 'danger' },
          ],
          therapie: {
            urgent: "PM/DM: prednisolon 1 mg/kg/dag → afbouwen + MTX of azathioprine als steroïdsparend.",
            stappen: [
              { naam: "Stap 1", detail: "IVIg bij ernstige of therapieresistente ziekte." },
              { naam: "Stap 2", detail: "Rituximab bij anti-Jo-1 of anti-MDA5." },
              { naam: "Stap 3", detail: "Maligniteitsscreening (DM-associatie met kanker)." },
            ],
          },
        } },


  // ── REPRODUCTIEVE GENEESKUNDE ──
  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Vrouw van 27 jaar, 8 weken amenorroe, positieve zwangerschapstest, plotse hevige buikpijn rechts en vaginaal bloedverlies. Hemodynamisch instabiel. Diagnose?',
    a:['Ruptuur ectopische graviditeit','Miskraam (abortus incompletus)','Appendicitis','Ruptuur ovariumcyste'], c:0,
    ex:'Ectopische graviditeit: positieve zwangerschapstest + plotse buikpijn + shock = spoedoperatie. Meest voorkomend in de eileider.',
    wiki:{
          kern: "Buitenbaarmoederlijke zwangerschap: innesteling buiten de baarmoeder, in 97% in de eileider. Risicofactoren: doorgemaakte bekkenontsteking, eerdere ectopische graviditeit, tubachirurgie.",
          redflag: "Ruptuur kan optreden vóór de vrouw weet dat ze zwanger is — buikpijn + shock bij vrouw in vruchtbare leeftijd: altijd eerst zwangerschapstest.",
          mechanisme: [
            { title: "Abnormale innesteling", desc: "Beschadigde eileider (door infectie of operatie) verhindert de bevruchte eicel de baarmoeder te bereiken → innesteling in de eileiderwand." },
            { title: "Bèta-HCG (zwangerschapshormoon) patroon", desc: "Bij normale zwangerschap verdubbelt bèta-HCG elke 48 uur. Bij ectopische graviditeit: suboptimale stijging of plateau." },
            { title: "Transvaginale echo", desc: "Bij bèta-HCG >1500 IE/L verwacht je een zwangerschapszak in de baarmoeder. Geen zak zichtbaar = sterke verdenking ectopische graviditeit." },
          ],
          onderscheid: [
            { label: "Miskraam", desc: "Ook bloedverlies en krampen, maar hemodynamisch stabiel en zwangerschapszak zichtbaar in baarmoeder op echo.", type: 'ok' },
            { label: "Ovariumcysteruptuur", desc: "Hevige buikpijn, maar zwangerschapstest negatief.", type: 'warn' },
            { label: "Appendicitis", desc: "Pijn rechtsonder, koorts, zwangerschapstest negatief — beide kunnen tegelijk voorkomen.", type: 'warn' },
          ],
          therapie: {
            urgent: "Ruptuur + instabiel: spoedoperatie (kijkoperatie of open buik) + verwijdering eileider.",
            stappen: [
              { naam: "Ongeruptureerd + stabiel", detail: "Methotrexaat (injectie die celgroei remt) als alternatief voor operatie bij bèta-HCG <5000 IE/L en geen foetale hartactie." },
              { naam: "Follow-up", detail: "Bèta-HCG wekelijks meten tot negatief." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Vrouw van 32 jaar, 30 weken zwanger, bloeddruk 162/105 mmHg, proteïnurie 2+ op dipstick, hoofdpijn, visuele stoornissen. Diagnose?',
    a:['Pre-eclampsie','Chronische hypertensie','Zwangerschapshypertensie','HELLP-syndroom'], c:0,
    ex:'Pre-eclampsie: bloeddruk ≥140/90 na 20 weken + proteïnurie. Bevallen is de enige genezing.',
    wiki:{
          kern: "Pre-eclampsie treft 2-8% van de zwangerschappen. Oorzaak: onvoldoende ingroei van de placenta → zuurstoftekort → vaatvernauwing door het hele lichaam.",
          redflag: "HELLP-syndroom (hemolytische bloedarmoede + leverenzymstijging + lage bloedplaatjes) en eclampsie (epileptische aanval) zijn levensbedreigende complicaties.",
          mechanisme: [
            { title: "Onvoldoende placentaingroei", desc: "Onvoldoende ingroei van placentacellen in de baarmoederwand → placenta-ischemie → vrijlating van vaatvernauwende stoffen." },
            { title: "Systemische vaatschade", desc: "Vaatvernauwing door het hele lichaam → hypertensie, eiwitverlies via nieren (proteïnurie), vochtophoping (oedeem), leverenzymstijging." },
            { title: "Complicaties: HELLP en eclampsie", desc: "HELLP = hemolytische bloedarmoede + leverenzymstijging + lage bloedplaatjes. Eclampsie = epileptische aanval. Magnesiumsulfaat voorkomt convulsies." },
          ],
          onderscheid: [
            { label: "Chronische hypertensie", desc: "Al aanwezig vóór 20 weken zwangerschap of langer dan 12 weken postpartum aanwezig.", type: 'ok' },
            { label: "Zwangerschapshypertensie", desc: "Bloeddruk hoog na 20 weken maar geen proteïnurie — minder ernstig.", type: 'warn' },
            { label: "HELLP-syndroom", desc: "Ernstige variant: trombocytopenie + leverenzymen hoog + hemolyse — kan ook optreden zonder ernstige hypertensie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Bloeddruk ≥160/110: labetalol of nifedipine intraveneus. Magnesiumsulfaat bij ernstige pre-eclampsie (aanvalsprofylaxe).",
            stappen: [
              { naam: "Bevallen <34 weken", detail: "Afwegen: vroeggeboorterisico vs. gevaar voor moeder en kind. Longrijping met corticosteroïden." },
              { naam: "Bevallen ≥37 weken", detail: "Actief inleiden — bevallen is de enige genezing." },
              { naam: "Magnesiumsulfaat", detail: "24 uur na bevalling voortzetten ter voorkoming van eclampsie." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Vrouw van 24 jaar, toenemende dysmenorroe (menstruatiepijn die buiten de menstruatie aanhoudt), dyspareunie, onvruchtbaarheid. Laparoscopie: blauwzwarte laesies op het peritoneum. Diagnose?',
    a:['Endometriose','Primaire dysmenorroe','PID (pelvic inflammatory disease)','Myoma uteri'], c:0,
    ex:'Endometriose: baarmoederslijmvlies buiten de baarmoeder → toenemende menstruatiepijn + pijn bij vrijen + onvruchtbaarheid.',
    wiki:{
          kern: "Endometriose treft 10% van vrouwen in de vruchtbare leeftijd en 30-50% van vrouwen met onvruchtbaarheid. Baarmoederslijmvlies (endometrium) groeit buiten de baarmoeder op buikvlies, eierstokken of darmen.",
          redflag: "Endometriomen (chocoladecysten in de eierstokken) kunnen scheuren en een acute buik geven. Diagnose wordt gemiddeld 7-10 jaar vertraagd gesteld.",
          mechanisme: [
            { title: "Retrograde menstruatie", desc: "Menstruatiebloed stroomt terug via de eileiders naar de buikholte — slijmvliescellen nestelen zich op het buikvlies, de eierstokken of de darmen." },
            { title: "Lokale oestrogeenproductie + ontsteking", desc: "Ectopisch slijmvlies produceert zelf oestrogeen → groeit buiten de cyclus → chronische ontsteking → littekenvorming en verklevingen." },
            { title: "Gevolgen voor vruchtbaarheid", desc: "Verklevingen blokkeren de eileiders, chocoladecysten beschadigen de eierstokken. Bij 30-50% van vrouwen met onvruchtbaarheid is endometriose de oorzaak." },
          ],
          onderscheid: [
            { label: "Primaire dysmenorroe", desc: "Menstruatiepijn zonder organische oorzaak — reageert goed op pijnstillers (NSAID's) en de pil, geen pijn buiten de menstruatie.", type: 'ok' },
            { label: "Bekkenontsteking (PID)", desc: "Acute koorts, etterige afscheiding, verhoogde ontstekingswaarden — géén chronisch patroon.", type: 'warn' },
            { label: "Vleesboom (myoom)", desc: "Heftig bloedverlies en drukgevoel — geen specifieke menstruatiepijn of pijn bij vrijen.", type: 'warn' },
          ],
          therapie: {
            urgent: "Pijnbehandeling: ontstekingsremmers (NSAID's) of gecombineerde anticonceptiepil continu (zonder stopweek).",
            stappen: [
              { naam: "Hormonale onderdrukking", detail: "GnRH-agonisten (leuprorelide), progestagenen (norethisteron), hormoonspiraal (levonorgestrel-IUD)." },
              { naam: "Kijkoperatie (laparoscopie)", detail: "Verwijdering van endometriosehaarden en verklevingen — zowel diagnostisch als therapeutisch." },
              { naam: "Onvruchtbaarheid", detail: "Reageerbuisbevruchting (IVF) is eerste keus bij ernstige endometriose met infertiliteit." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Man van 40 jaar, pijnloze testeszwelling rechts. Echo: solide inhomogene massa. AFP en bèta-hCG verhoogd. Diagnose?',
    a:['Testiscarcinoom (kiemceltumor)','Epididymo-orchitis','Hydrocele','Varicocele'], c:0,
    ex:'Pijnloze testiszwelling bij man 15-40 jaar = kiemceltumor tot bewijs van het tegendeel. Echo + AFP + bèta-HCG.',
    wiki:{
          kern: "Testiscarcinoom is de meest voorkomende solide tumor bij mannen van 15-40 jaar. Twee hoofdtypen: seminoom (50%, traag groeiend, stralengevoelig) en niet-seminoom (AFP en/of bèta-HCG verhoogd, sneller groeiend).",
          redflag: "Elke pijnloze testiszwelling bij een jongvolwassene is een kiemceltumor totdat het tegendeel bewezen is — nooit afwachten.",
          mechanisme: [
            { title: "Tumormarkers", desc: "Alfafoetoproteïne (AFP): verhoogd bij niet-seminomen. Bèta-HCG (zwangerschapshormoon): verhoogd bij choriocarcinoom-component of seminoom. LDH (lactaatdehydrogenase): maat voor tumorvolume." },
            { title: "Markerverval na operatie", desc: "Halfwaardetijd AFP 5-7 dagen, bèta-HCG 1-3 dagen. Langzaam dalen = resterende tumor of metastasen." },
            { title: "Altijd via de lies opereren", desc: "Orchidectomie via een liesinsnede (inguïnaal), nooit via het scrotum — scrotale insnede verstoort de lymfedrainage en kan verspreiding veroorzaken." },
          ],
          onderscheid: [
            { label: "Bijbalontsteking (epididymo-orchitis)", desc: "Pijnlijk gezwollen teelballen, koorts, verhoogde witte bloedcellen — reageert op antibiotica.", type: 'ok' },
            { label: "Hydrocele (vochtzak)", desc: "Vochtvulling rondom testikel, doorschijnend bij verlichten, echo toont geen vaste massa.", type: 'warn' },
            { label: "Varicocele (spatadervarices)", desc: "Wormachtig gevoel in de balzak, verdwijnt bij platliggen — geen vaste massa op echo.", type: 'warn' },
          ],
          therapie: {
            urgent: "Altijd eerst inguïnale orchidectomie (verwijdering testikel via lies) voor diagnose en behandeling.",
            stappen: [
              { naam: "Seminoom stadium I", detail: "Bestraling retroperitoneale lymfeklieren of carboplatin kuur — genezing >99%." },
              { naam: "Niet-seminoom / gevorderd stadium", detail: "BEP-chemokuur (bleomycine + etoposide + cisplatine) — genezing >95% bij gelokaliseerde ziekte." },
              { naam: "Zaadcelpreservatie", detail: "Vóór chemotherapie of bestraling zaadcellen invriezen aanbieden." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Vrouw van 52 jaar, onregelmatige menstruaties de laatste 2 jaar, opvliegers, nachtzweten, slaapproblemen, vaginale droogheid. FSH 45 IE/L, LH verhoogd, oestradiol laag. Diagnose?',
    a:['Menopauze/climacterium','PCOS','Hyperprolactinemie','Premature ovariuminsufficiëntie'], c:0,
    ex:'Menopauze: 12 maanden zonder menstruatie ≥45 jaar. FSH stijgt, oestradiol daalt. Gemiddelde leeftijd 51 jaar.',
    wiki:{
          kern: "Menopauze = laatste menstruatie, bevestigd na 12 maanden amenorroe. Oorzaak: eierstokken raken uitgeput, oestrogeenproductie stopt. Gemiddeld op 51 jaar.",
          redflag: "Menopauze vóór 40 jaar heet premature ovariuminsufficiëntie (POI) — extra risico op botontkalking en hart- en vaatziekten. Behandeling met hormoontherapie is dan sterk aanbevolen.",
          mechanisme: [
            { title: "Eierstokuitputting", desc: "Afnemend aantal eicellen → oestrogeenproductie daalt → hypothalamus en hypofyse reageren met meer follikelstimulerend hormoon (FSH) en luteïniserend hormoon (LH)." },
            { title: "Opvliegers en nachtzweten", desc: "Plotse oestrogeendaling verstoort de thermoregulatie in de hypothalamus → plotse warmtegevoel + transpireren. Treft 75% van de vrouwen." },
            { title: "Urogenitale atrofie", desc: "Minder oestrogeen → slijmvliezen van vagina en plasbuis worden dunner en droger → pijn bij vrijen, vaker plasonsteking." },
          ],
          onderscheid: [
            { label: "Polycysteus-ovariumsyndroom (PCOS)", desc: "Jongere vrouw, onregelmatige menstruatie, maar FSH normaal of laag — niet verhoogd.", type: 'ok' },
            { label: "Verhoogde prolactinewaarden (hyperprolactinemie)", desc: "Ook uitblijven menstruatie + soms melkafscheiding — prolactine verhoogd, FSH juist laag.", type: 'warn' },
            { label: "Premature ovariuminsufficiëntie (POI)", desc: "Zelfde beeld als menopauze maar vóór 40 jaar — auto-immuun of chromosomale oorzaak uitsluiten.", type: 'danger' },
          ],
          therapie: {
            urgent: "Ernstige klachten: menopauzale hormoontherapie (MHT) — oestrogeen + progestageen (bij vrouwen met baarmoeder).",
            stappen: [
              { naam: "Indicaties MHT", detail: "Ernstige opvliegers, slaapklachten, urogenitale atrofie en botbescherming bij vroegtijdige menopauze." },
              { naam: "Risico's MHT", detail: "Licht verhoogd risico op borstkanker bij gebruik langer dan 5 jaar, verhoogd tromboserisico (bij orale toediening)." },
              { naam: "Alternatieven", detail: "SSRI's of SNRI's (antidepressiva) verminderen opvliegers bij vrouwen die geen hormonen mogen gebruiken." },
            ],
          },
        } },


  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Vrouw van 19 jaar, purulente cervicale afscheiding, buikpijn, koorts, drukpijn in adnex-gebied, pijn bij bewegen van de cervix. Diagnose?',
    a:['Pelvic inflammatory disease (PID)','Ectopische graviditeit','Appendicitis','Endometriose'], c:0,
    ex:'Bekkenontsteking (PID): Chlamydia of gonorroe stijgt op naar eileiders. Cervixbewegingspijn is het sleutelkenmerk.',
    wiki:{
          kern: "Bekkenontsteking (pelvic inflammatory disease, PID): opstijgende geslachtsziekte bij seksueel actieve vrouwen. Verwekkers: Chlamydia trachomatis en Neisseria gonorrhoeae.",
          redflag: "Onbehandelde PID leidt tot littekenvorming in de eileiders → infertiliteit en verhoogd risico op buitenbaarmoederlijke zwangerschap (ectopische graviditeit).",
          mechanisme: [
            { title: "Opstijgende infectie", desc: "Bacteriën stijgen op van baarmoederhals → baarmoeder (endometritis) → eileiders (salpingitis) → eierstokken (oöforitis) → buikvlies (peritonitis)." },
            { title: "Tubo-ovarisch abces (TOA)", desc: "Ernstige complicatie: etteropstapeling in eileiders en eierstokken. Diagnose via echografie of CT-scan. Behandeling: antibiotica intraveneus + eventueel drainage." },
            { title: "Fitz-Hugh-Curtis-syndroom", desc: "Ontsteking van het levervlies door PID → pijn rechter bovenbuik, verklevingen (violinstrengen) zichtbaar bij kijkoperatie." },
          ],
          onderscheid: [
            { label: "Buitenbaarmoederlijke zwangerschap", desc: "Ook adnexpijn, maar zwangerschapstest positief.", type: 'ok' },
            { label: "Blindedarmontsteking (appendicitis)", desc: "Pijn rechtsonder, koorts, verhoogde witte bloedcellen — geen cervixafscheiding.", type: 'warn' },
            { label: "Endometriose", desc: "Chronisch, cyclisch patroon, geen koorts of purulente afscheiding.", type: 'warn' },
          ],
          therapie: {
            urgent: "Ambulant (milde PID): ceftriaxon 500 mg intramusculair eenmalig + doxycycline 100 mg tweemaal daags 14 dagen + metronidazol.",
            stappen: [
              { naam: "Opname bij ernstig beloop of tubo-ovarisch abces", detail: "Antibiotica intraveneus: cefotaxim + metronidazol + doxycycline." },
              { naam: "Seksuele partners", detail: "Altijd ook de partner(s) testen en behandelen." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'De combinatiepil (oestrogeen + progestageen) is de meest effectieve vorm van anticonceptie die beschikbaar is.',
    c:false,
    ex:'NIET WAAR. Het spiraal (koper of hormoon) is effectiever dan de combinatiepil — minder dan 0.1% kans op zwangerschap per jaar.',
    wiki:{
          kern: "Pearl-index: zwangerschappen per 100 vrouwjaren gebruik. Spiraal (koper of hormoon), implantaat en sterilisatie scoren onder 0.5 — effectiever dan de pil.",
          redflag: "Combinatiepil is relatief gecontra-indiceerd bij migraine met aura, roken boven 35 jaar, trombose in de voorgeschiedenis en ernstige hypertensie.",
          mechanisme: [
            { title: "Hoe werkt de combinatiepil?", desc: "Oestrogeen + progestageen remmen de FSH- en LH-piek (hormonen van de hypofyse) → geen eisprong. Bijkomend: slijmverdikking baarmoederhals en verandering baarmoederslijmvlies." },
            { title: "Typisch gebruik vs. perfect gebruik", desc: "Bij perfect gebruik (elke dag op zelfde tijd): 0.3% kans per jaar. Bij typisch gebruik (zoals de meeste mensen): 7-9% kans per jaar." },
            { title: "Noodanticonceptie", desc: "Levonorgestrel (hormoonpil) binnen 72 uur, ulipristalacetaat binnen 120 uur, of koperspiraal binnen 5 dagen — koperspiraal is het meest effectief." },
          ],
          onderscheid: [
            { label: "Minipil (progestageen only)", desc: "Geschikt bij tromboserisico, borstvoeding of contra-indicatie voor oestrogeen.", type: 'ok' },
            { label: "Subcutaan implantaat (etonogestrel)", desc: "3 jaar effectief, meest effectieve reversibele methode — Pearl-index 0.05.", type: 'warn' },
            { label: "Koperspiraal", desc: "Niet-hormonaal, 10 jaar effectief, ook noodanticonceptie binnen 5 dagen — Pearl-index 0.6.", type: 'warn' },
          ],
          therapie: {
            urgent: "Anticonceptie starten: combinatiepil eerste dag menstruatie (direct effectief) of QuickStart (direct maar eerste 7 dagen condoom).",
            stappen: [
              { naam: "Spiraalinbreng", detail: "Door arts of verloskundige — tijdens of vlak na menstruatie voor eenvoudigere inbreng." },
              { naam: "Implantaat", detail: "Subcutaan in bovenarm — 3 jaar, direct effectief." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Foliumzuur-suppletie is alleen noodzakelijk bij vrouwen met een voorgeschiedenis van een neuraalbuisdefect.',
    c:false,
    ex:'NIET WAAR. Foliumzuur 0.4 mg/dag is voor álle vrouwen met een zwangerschapswens — de neuraalbuissluiting is al op dag 28.',
    wiki:{
          kern: "Foliumzuur (vitamine B11) is essentieel voor de aanmaak van het zenuwstelsel van de embryo. Tekort in de eerste weken van de zwangerschap → neuraalbuisdefecten (ruggengraatsspleet of anencefalie).",
          redflag: "De neurale buis sluit zich op dag 22-28 na de bevruchting — de meeste vrouwen weten dan nog niet dat ze zwanger zijn. Starten ná de positieve test is te laat.",
          mechanisme: [
            { title: "Neuraalbuissluiting op dag 28", desc: "De neurale buis (voorloper van hersenen en ruggengraat) sluit zich 22-28 dagen na de bevruchting, wat overeenkomt met week 4-6 van de zwangerschap." },
            { title: "Voeding is onvoldoende", desc: "Groene groente, peulvruchten en volkoren bevatten foliumzuur, maar de hoeveelheid is niet voldoende voor bescherming — suppletie is noodzakelijk." },
            { title: "Hoog risico: 5 mg/dag", desc: "Vrouwen met epilepsie (die valproaat of carbamazepine gebruiken), diabetes, obesitas of eerdere neuraalbuisdefect-zwangerschap: 5 mg/dag (tienmaal de standaarddosis)." },
          ],
          onderscheid: [
            { label: "Standaard advies", desc: "0.4 mg/dag voor álle vrouwen met zwangerschapswens, te starten minimaal 4 weken vóór de beoogde conceptie.", type: 'ok' },
            { label: "Hoog risico", desc: "Voorgeschiedenis neuraalbuisdefect, anti-epileptica, diabetes, obesitas (BMI >35): 5 mg/dag.", type: 'warn' },
            { label: "Anti-epileptica en zwangerschap", desc: "Valproaat is het meest teratogeen — bij zwangerschapswens altijd overleg met neuroloog over medicatieswitch.", type: 'danger' },
          ],
          therapie: {
            urgent: "Start foliumzuur 0.4 mg/dag zodra een vrouw zwanger wil worden — niet wachten op de positieve test.",
            stappen: [
              { naam: "Doorgaan tot week 10", detail: "Foliumzuur suppletie tot en met 10 weken zwangerschap." },
              { naam: "Hoog risico", detail: "5 mg/dag gedurende dezelfde periode." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Cervixcarcinoom wordt vrijwel altijd veroorzaakt door een HPV-infectie.',
    c:true,
    ex:'WAAR. Meer dan 99% van baarmoederhalskanker is veroorzaakt door het humaan papillomavirus (HPV) type 16 en 18.',
    wiki:{
          kern: "Baarmoederhalskanker (cervixcarcinoom): bijna altijd veroorzaakt door het humaan papillomavirus (HPV). Hoog-risicotypen 16 en 18 zijn samen verantwoordelijk voor meer dan 70% van alle gevallen.",
          redflag: "HPV-infectie zelf veroorzaakt geen klachten — zonder het bevolkingsonderzoek (uitstrijkje) worden voorstadia (CIN) structureel gemist totdat de kanker symptomen geeft.",
          mechanisme: [
            { title: "HPV schakelt tumorsupressoren uit", desc: "HPV-eiwit E6 remt p53 (beschermt normaal tegen kankercellen) → beschadigde cellen overleven. HPV-eiwit E7 remt pRb → celdelingen worden ongecontroleerd." },
            { title: "Van infectie naar kanker (jaren)", desc: "HPV-infectie → voorstadium (CIN 1-3, cervicale intra-epitheliale neoplasie) → carcinoom in situ → invasief carcinoom. Dit proces duurt 10-15 jaar." },
            { title: "Vaccinatie stopt de keten", desc: "Nonavalent vaccin (Gardasil 9) beschermt tegen HPV-type 6, 11, 16, 18, 31, 33, 45, 52 en 58 — aanbevolen voor meisjes én jongens van 12-13 jaar." },
          ],
          onderscheid: [
            { label: "Bevolkingsonderzoek (screening)", desc: "Uitstrijkje + HPV-DNA-test op 30, 35, 40, 45, 50, 55 en 60 jaar. Bij afwijkend resultaat: kijkonderzoek baarmoederhals (colposcopie) + biopsie.", type: 'ok' },
            { label: "CIN I-II (licht voorstadium)", desc: "Afwachten en hercontroleren — de meeste gevallen genezen spontaan.", type: 'warn' },
            { label: "CIN III (ernstig voorstadium)", desc: "Verwijdering via elektrolus (LEEP) of conisatie — voorkomt invasief carcinoom.", type: 'danger' },
          ],
          therapie: {
            urgent: "CIN I-II: afwachten en hercontroleren — spontane genezing is gebruikelijk.",
            stappen: [
              { naam: "CIN III", detail: "Verwijdering via elektrolus (large loop excision of the transformation zone, LEEP) of conisatie." },
              { naam: "Invasief carcinoom stadium I", detail: "Conisatie (fertiliteitsbesparend bij jonge vrouwen) of radicale baarmoederverwijdering (hysterectomie) + verwijdering lymfeklieren." },
              { naam: "Stadium II-IV", detail: "Gelijktijdige chemo-radiotherapie (cisplatine + bestaling)." },
            ],
          },
        } },

  { type:'diagnose', d:5, domain:'repro', dl:'Reproductieve geneeskunde', subtype:'diff',
    q:'Welk kenmerk onderscheidt een miskraam (abortus incompletus) van een ectopische graviditeit bij een vrouw van 8 weken met vaginaal bloedverlies?',
    a:['Intra-uteriene zwangerschapszak op echo bij miskraam, geen intra-uteriene zwangerschap bij EG','Heviger bloedverlies bij EG dan bij miskraam','Sterkere buikpijn bij miskraam dan bij EG','Hogere bèta-hCG bij EG dan bij miskraam'], c:0,
    ex:'Transvaginale echo beslist: miskraam heeft een zwangerschapszak ín de baarmoeder, ectopische graviditeit niet.',
    wiki:{
          kern: "Vroeg zwangerschapsbloedverlies: altijd twee vragen beantwoorden — (1) zwangerschapstest positief? (2) Zit de zwangerschapszak in de baarmoeder op echo? Zo nee: ectopische graviditeit uitsluiten.",
          redflag: "Bloedverlies en pijnhevigheid zijn NIET betrouwbaar onderscheidend — altijd echo + bèta-HCG (zwangerschapshormoon) bij vroeg zwangerschapsbloedverlies.",
          mechanisme: [
            { title: "Bèta-HCG als gids", desc: "Bij bèta-HCG >1500-2000 IE/L verwacht je een zwangerschapszak in de baarmoeder op transvaginale echo. Geen zak zichtbaar = verdenking ectopische graviditeit." },
            { title: "Seriële metingen", desc: "Normale intrauteriene zwangerschap: bèta-HCG verdubbelt elke 48 uur. Suboptimale stijging of plateau: verdenking miskraam of ectopische graviditeit." },
            { title: "Soorten miskraam", desc: "Bedreigd (levende foetus + bloedverlies), onvolledig (gedeeltelijke uitstoting), volledig (volledige uitstoting), stille miskraam (foetus gestorven zonder bloedverlies)." },
          ],
          onderscheid: [
            { label: "Bedreigde miskraam", desc: "Levende foetus op echo + bloedverlies — afwachten, 50-80% goede afloop.", type: 'ok' },
            { label: "Stille miskraam (missed abortion)", desc: "Foetus zonder hartactie op echo, asymptomatisch — medicamenteus (misoprostol) of curettage.", type: 'warn' },
            { label: "Ectopische graviditeit", desc: "Geen zwangerschapszak in baarmoeder, eventueel massa naast eierstok — kan levensbedreigend zijn bij ruptuur.", type: 'danger' },
          ],
          therapie: {
            urgent: "Ectopische graviditeit uitsluiten bij elk vroeg zwangerschapsbloedverlies — echo + bèta-HCG.",
            stappen: [
              { naam: "Miskraam afwachten", detail: "Expectatief beleid: spontane uitstoting afwachten (meest succesvol bij volledig)." },
              { naam: "Medicamenteus", detail: "Misoprostol (prostaglandine) stimuleert de baarmoeder om de miskraam te voltooien." },
              { naam: "Chirurgisch", detail: "Curettage (uithollen baarmoeder) bij onvolledige miskraam of infectie." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Vrouw van 38 jaar, postcoïtaal bloedverlies, onregelmatig bloedverlies buiten menstruatie, cervix ziet er afwijkend uit bij speculumonderzoek. Diagnose uitsluiten?',
    a:['Cervixcarcinoom','Cervicitis','Cervixpoliep','Ectropion cervicis'], c:0,
    ex:'Postcoïtaal bloedverlies = alarmsignaal voor baarmoederhalskanker. Altijd kijkonderzoek (colposcopie) + biopsie.',
    wiki:{
          kern: "Alarmsignalen voor baarmoederhalskanker: bloedverlies na seks, bloedverlies buiten de menstruatie, vieze afscheiding. Vroeg stadium is symptoomloos — bevolkingsonderzoek is essentieel.",
          redflag: "Een afwijkende baarmoederhals bij speculumonderzoek (onregelmatig, bloemkoolstructuur, makkelijk bloedend) is hoogverdacht voor carcinoom — direct verwijzen.",
          mechanisme: [
            { title: "Groeipatroon", desc: "Baarmoederhalskanker begint in de transformatiezone (overgang tussen twee soorten slijmvlies) en groeit van binnenkant naar buiten." },
            { title: "Vroeg stadium: geen klachten", desc: "Vroeg baarmoederhalskanker geeft meestal geen klachten — het bevolkingsonderzoek is ontworpen om dit stadium te vangen." },
            { title: "Lokaal gevorderd", desc: "Bloedverlies na seks of buiten menstruatie, vieze afscheiding, pijn bij vrijen. Verspreiding naar blaas, darmen of lymfeklieren bij gevorderde stadia." },
          ],
          onderscheid: [
            { label: "Baarmoederhalsontsteking (cervicitis)", desc: "Etterige afscheiding, gonorroe of Chlamydia positief — geen macroscopische laesie op de baarmoederhals.", type: 'ok' },
            { label: "Baarmoederhalspoliep", desc: "Goedaardige gestielde uitstulping — kan ook bloedverlies geven maar ziet er anders uit.", type: 'warn' },
            { label: "Ectropion", desc: "Cilinderepitheel zichtbaar op de buitenkant van de baarmoederhals — goedaardig, bloedt makkelijk maar geen kankerrisico.", type: 'warn' },
          ],
          therapie: {
            urgent: "Verdachte laesie: direct verwijzen voor kijkonderzoek (colposcopie) + biopsie.",
            stappen: [
              { naam: "Stadium I (begrensd tot baarmoederhals)", detail: "Chirurgie: conisatie (fertiliteitsbesparend) of radicale baarmoederverwijdering + lymfeklierverwijdering." },
              { naam: "Stadium II-IV", detail: "Gelijktijdige chemo-radiotherapie (cisplatine + bestraling)." },
            ],
          },
        } },

  // ── ECG-vragen met SVG ──
  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man van 68 jaar, palpitaties en licht onpasselijk. Zijn ECG is afgebeeld.\n\nWat is de meest waarschijnlijke diagnose?',
    fig:{ type:'ecg', alt:'ECG afleiding II met onregelmatig ritme', credit:null,
      src:`<svg viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><line x1="0" y1="55" x2="320" y2="55" stroke="#e8e0d0" stroke-width="0.5"/><text x="8" y="14" font-size="9" fill="#aaa" font-family="DM Sans,sans-serif">Afleiding II</text><polyline points="0,55 2,53 4,57 6,53 8,57 10,53 12,57 14,53 16,57 18,53 20,57 22,53 24,57 26,53 28,57 30,53 32,12 34,72 37,55 38,53 40,57 42,53 44,57 46,53 48,57 50,53 52,57 54,53 56,57 58,53 60,57 62,53 64,57 66,53 68,57 70,53 72,57 74,53 76,57 78,53 80,12 82,72 85,55 86,53 88,57 90,53 92,57 94,53 96,57 98,53 100,57 102,53 104,57 106,53 108,57 110,53 112,57 114,53 116,57 118,53 120,57 122,12 124,72 127,55 128,53 130,57 132,53 134,57 136,53 138,57 140,53 142,57 144,53 146,57 148,53 150,57 152,53 154,57 156,53 158,57 160,53 162,57 164,53 166,57 168,53 170,57 172,53 174,57 176,53 178,57 180,53 182,57 184,53 186,57 188,53 190,57 192,12 194,72 197,55 198,53 200,57 202,53 204,57 206,53 208,57 210,53 212,57 214,53 216,57 218,53 220,57 222,53 224,57 226,53 228,57 230,53 232,57 234,53 236,57 238,53 240,57 242,53 244,57 246,53 248,57 250,53 252,57 254,53 256,57 258,53 260,12 262,72 265,55 266,53 268,57 270,53 272,57 274,53 276,57 278,53 280,57 282,53 284,57 286,53 288,57 290,53 292,57 294,53 296,57 298,53 300,57 302,53 304,57 306,53 308,57 310,53 312,57 314,53 316,57 318,53 320,55" fill="none" stroke="#E8410A" stroke-width="1.5"/></svg>` },
    a:['Atriumfibrillatie','Sinustachycardie','Supraventriculaire tachycardie','Atriumflutter'],
    c:0,
    ex:'Atriumfibrillatie: geen duidelijke P-toppen, chaotische fijne basislijn (fibrillatiegolven), en volledig onregelmatige RR-intervallen ("irregularly irregular"). SVT heeft een regulier ritme; atriumflutter toont zaagvormige F-golven (~300/min) met regelmatige overleiding.',
    wiki:{
          kern: "AF is de meest voorkomende hartritmestoornis (prevalentie ~1-2%). Pathofysiologie: chaotische elektrische activiteit atria → AV-knoop filtert willekeurig → onregelmatig ventrikelritme.",
          mechanisme: [
            { title: "Ectopische triggers", desc: "Ectopische foci in de longvenen (pulmonaalvenen) vuren snelle prikkels → initiëren AF. Ablatie van deze foci is de basis van curatieve katheterablatie." },
            { title: "Chaotische re-entry circuits", desc: "Meerdere gelijktijdige micro re-entry circuits in het atriummyocard → atriale frequentie 350-600/min → geen gecoördineerde contractie mogelijk." },
            { title: "AV-knoop als filter", desc: "AV-knoop geleidt willekeurig enkele prikkels door → absoluut irregulair ventrikelritme. Ongecontroleerde frequentie: 100-160/min." },
            { title: "Tachycardie-cardiomyopathie", desc: "Langdurig ongecontroleerde snelle ventrikelrespons → 'tachycardie-geïnduceerde cardiomyopathie' met dalende EF — reversibel na frequentiecontrole." },
            { title: "Tromboserisico", desc: "Stilstaand bloed in het linker hartoor (geen atriale contractie) → trombus → embolisatie → CVA. CHA₂DS₂-VASc bepaalt anticoagulatie-indicatie." },
          ],
          onderscheid: [
            { label: 'Atriumfibrillatie (AF)', desc: 'Absoluut irregulair smalcomplex ritme, geen P-toppen, chaotische fibrillatiegolven. Frequentie 100-160/min ongecontroleerd.', type: 'ok' },
            { label: 'Atriumflutter', desc: 'Regelmatig ~150/min, zaagvormige F-golven in II/III/aVF — carotismassage onthult de flutter-golven.', type: 'warn' },
            { label: 'AVNRT / SVT', desc: 'Regelmatig smalcomplex, plotse start/stop — P verborgen in QRS.', type: 'warn' },
            { label: 'AF met bundeltakblok', desc: 'Irregulier maar breed QRS — kan op VT lijken. Polymorf VT bij QTc-verlenging.', type: 'danger' },
          ],
          therapie: {
            urgent: "Acuut hemodynamisch instabiel: elektrische cardioversie.",
            stappen: [
              { naam: "Stabiel", detail: "rate control (metoprolol, diltiazem, digoxine) of rhythm control (flecaïnide, amiodaron)." },
              { naam: "Antistolling", detail: "DOAC op basis van CHA₂DS₂-VASc ≥2 (mannen) of ≥3 (vrouwen)." },
            ],
          },
        } },

  { type:'diagnose', d:4, domain:'cardio', dl:'Cardiologie',
    q:'Vrouw van 62 jaar, acute hevige drukpijn op de borst met uitstraling naar de linkerarm. Ambulance-ECG afgebeeld.\n\nWat is de meest urgente diagnose?',
    fig:{ type:'ecg', alt:'ECG met ST-elevatie en hyperacute T-toppen', credit:null,
      src:`<svg viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><line x1="0" y1="55" x2="320" y2="55" stroke="#e8e0d0" stroke-width="0.5"/><text x="8" y="14" font-size="9" fill="#aaa" font-family="DM Sans,sans-serif">Afleiding II — ST-elevatie</text><polyline points="0,55 10,55 17,47 24,55 34,55 36,60 38,13 40,68 44,45 75,45 85,36 100,55 120,55 127,47 134,55 144,55 146,60 148,13 150,68 154,45 185,45 195,36 210,55 240,55 247,47 254,55 264,55 266,60 268,13 270,68 274,45 310,45 320,37" fill="none" stroke="#E8410A" stroke-width="1.5"/></svg>` },
    a:['ST-elevatie myocardinfarct (STEMI)','Instabiele angina pectoris','Longembolie','Pericarditis'],
    c:0,
    ex:'STEMI: ST-elevatie ≥1mm in ≥2 aangrenzende afleidingen. Op dit ECG ziet men persisterende ST-elevatie met hyperacute T-toppen — het klassieke beeld. Directe PCI binnen 90 min is de behandeling van keuze. Pericarditis geeft saddle-shaped elevatie in alle afleidingen; longembolie geeft S1Q3T3-patroon.',
    wiki:{
          kern: "STEMI-diagnose: ST-elevatie ≥1mm (≥2mm in V1-V3) in ≥2 contiguë afleidingen, of nieuw LBTB. Lokalisatie: inferior (II/III/aVF = RCA), anterior (V1-V4 = LAD), lateraal (I/aVL/V5-V6 = LCx).",
          mechanisme: [
            { title: "Plaque ruptuur en trombus", desc: "Kwetsbare atherosclerotische plaque in een coronairarterie scheurt → subendotheliaal collageen blootgesteld → plaatjesaggregatie + fibrinetrombus → volledige occlusie." },
            { title: "Transmuraal infarct", desc: "Volledige dikte van het myocardium wordt ischemisch → cel-ionengradiënten verstoord → ST-elevatie op ECG, troponine lekt na 1-3 uur in het bloed." },
            { title: "Hyperacute T-toppen", desc: "Allereerste ECG-teken: hyperacute (hoge, brede) T-toppen door hyperkaliëmie in ischemische cellen. Daarna ST-elevatie, dan T-inversie, dan Q-golven." },
            { title: "ECG-lokalisatie", desc: "Inferieur (II/III/aVF = RCA), anterieur (V1-V4 = LAD), lateraal (I/aVL/V5-V6 = LCx). Reciproke depressies in tegenoverlegen afleidingen bevestigen transmuraal infarct." },
            { title: "Tijdsverloop", desc: "ST-elevatie (minuten) → Q-golf (uren) → T-inversie (uren-dagen) → Q blijft permanent. 'Time is muscle': elke 30 min vertraging = ~7,5% méér myocardverlies." },
          ],
          onderscheid: [
            { label: 'STEMI', desc: 'ST-elevatie ≥1 mm in ≥2 contiguë afleidingen (≥2 mm in V1-V3), hyperacute T-toppen in vroeg stadium. Directe PCI <90 minuten.', type: 'ok' },
            { label: 'Pericarditis', desc: 'Diffuse saddle-shape ST-elevatie + PR-depressie in álle afleidingen — geen regionale verdeling, geen reciproke depressies.', type: 'warn' },
            { label: 'NSTEMI', desc: 'Geen ST-elevatie maar troponine stijgt wél. ST-depressie en T-inversie als ECG-tekenen.', type: 'warn' },
            { label: 'Vroege repolarisatie', desc: 'Concave ST-elevatie bij jonge patiënten zonder klachten — benigne bevinding.', type: 'danger' },
          ],
          therapie: {
            urgent: "Primaire PCI: gouden standaard <12u na symptomen.",
            stappen: [
              { naam: "Trombolyse als alternatief", detail: "Lyse (alteplase) als PCI niet beschikbaar binnen 120 min na eerste medisch contact — deur-tot-naald <30 min." },
              { naam: "Anti-aggregatie", detail: "aspirine + ticagrelor/prasugrel." },
              { naam: "Anticoagulatie", detail: "heparine periprocedureel." },
            ],
          },
        } },

  { type:'diagnose', d:4, domain:'cardio', dl:'Cardiologie',
    q:'Man van 72 jaar, dyspnoe bij inspanning en pre-syncope. ECG-patroon afgebeeld.\n\nWelk geleidingspatroon is zichtbaar?',
    fig:{ type:'ecg', alt:'ECG met breed genofd QRS-complex en geïnverteerde T-toppen', credit:null,
      src:`<svg viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><line x1="0" y1="55" x2="320" y2="55" stroke="#e8e0d0" stroke-width="0.5"/><text x="8" y="14" font-size="9" fill="#aaa" font-family="DM Sans,sans-serif">Afleiding I — breed genofd QRS</text><polyline points="0,55 10,55 17,47 24,55 34,55 40,35 44,42 50,15 65,62 72,55 82,60 100,55 130,55 137,47 144,55 154,55 160,35 164,42 170,15 185,62 192,55 202,60 220,55 250,55 257,47 264,55 274,55 280,35 284,42 290,15 305,62 312,55 320,60" fill="none" stroke="#E8410A" stroke-width="1.5"/></svg>` },
    a:['Linker bundeltakblok (LBTB)','Rechter bundeltakblok (RBTB)','WPW-syndroom','Ventriculaire tachycardie'],
    c:0,
    ex:'Linker bundeltakblok: breed QRS (>120ms), geen initiële Q-golf in I/V6, genofd (M-vormig) R-complex in laterale afleidingen, discordante ST-T-veranderingen. RBTB geeft rSR\'-patroon in V1 (konijnenoren). WPW heeft een delta-golf en kort PR-interval.',
    wiki:{
          kern: "LBTB-criteria: QRS >120ms, geen Q in I/V5/V6, breed genofd R in I/aVL/V5/V6, rS of QS in V1. Discordante ST-T = ST-T tegengesteld aan QRS-uitslag.",
          mechanisme: [
            { title: "Normale geleiding", desc: "Impuls loopt via His-bundel → linker en rechter bundeltakken → simultane LV- en RV-activatie → smal QRS (<120 ms)." },
            { title: "LBTB: vertraagde LV-activatie", desc: "Linker bundeltakbeen geblokkeerd → impuls bereikt LV via het rechterbundeltakbeen en transseptaal → trage, asynchrone LV-depolarisatie → QRS breed (>120 ms)." },
            { title: "Breed genofd QRS-patroon", desc: "Trage transseptale activatie van de LV veroorzaakt het karakteristieke 'M'-genofd QRS in I/aVL/V5-V6. Geen initiële septale Q-golf in I/V6 (verdwenen door reversed septumdepolarisatie)." },
            { title: "Discordante ST-T-veranderingen", desc: "ST-segment en T-golf zijn altijd tegengesteld aan de QRS-uitslag (discordant). Dit is normaal bij LBTB — maar maakt STEMI-diagnose moeilijk (Sgarbossa-criteria helpen)." },
          ],
          onderscheid: [
            { label: 'LBTB (linker bundeltakblok)', desc: 'QRS >120 ms, breed genofd M-patroon in I/aVL/V5-V6, geen initiële Q in I/V6, rS of QS in V1. Discordante ST-T-veranderingen.', type: 'ok' },
            { label: 'RBTB (rechter bundeltakblok)', desc: 'rSR\'-patroon in V1 ("konijnenoren"), breed S in I/V6. Incomplete RBTB: QRS 110-120 ms.', type: 'warn' },
            { label: 'WPW', desc: 'Delta-golf (preëxcitatie begin QRS), kort PR <120 ms — gevaar bij AF (razendsnelle geleiding).', type: 'danger' },
            { label: 'Ventriculaire hypertrofie', desc: 'Breed QRS niet aanwezig — wel amplitude-criteria en repolarisatieafwijkingen.', type: 'warn' },
          ],
          therapie: {
            urgent: "LBTB op zichzelf geen behandeling nodig.",
            stappen: [
              { naam: "Nieuw LBTB bij ACS", detail: "Nieuw LBTB bij pijn op de borst = STEMI-equivalent → directe PCI, ook al is ST-elevatie niet klassiek zichtbaar (Sgarbossa-criteria)." },
              { naam: "Hartfalen + LBTB + EF <35%", detail: "CRT (cardiale resynchronisatietherapie) overwegen." },
            ],
          },
        } },

  { type:'diagnose', d:5, domain:'cardio', dl:'Cardiologie',
    q:'Man van 78 jaar, syncope, polsfrequentie 36/min. ECG: P-golven (blauw) en QRS-complexen (rood) volledig onafhankelijk van elkaar.\n\nWat is het ritme?',
    fig:{ type:'ecg', alt:'ECG met complete AV-dissociatie: P-golven en QRS onafhankelijk', credit:null,
      src:`<svg viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><line x1="0" y1="55" x2="320" y2="55" stroke="#e8e0d0" stroke-width="0.5"/><text x="8" y="14" font-size="9" fill="#aaa" font-family="DM Sans,sans-serif">Afleiding II — AV-dissociatie</text><polyline points="10,55 15,47 20,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="30,55 35,47 40,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="50,55 55,47 60,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="70,55 75,47 80,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="90,55 95,47 100,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="110,55 115,47 120,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="130,55 135,47 140,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="150,55 155,47 160,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="170,55 175,47 180,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="190,55 195,47 200,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="210,55 215,47 220,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="230,55 235,47 240,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="250,55 255,47 260,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="270,55 275,47 280,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="290,55 295,47 300,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="310,55 315,47 320,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="27,55 30,20 33,70 38,55 48,52 56,55" fill="none" stroke="#E8410A" stroke-width="1.5"/><polyline points="79,55 82,20 85,70 90,55 100,52 108,55" fill="none" stroke="#E8410A" stroke-width="1.5"/><polyline points="131,55 134,20 137,70 142,55 152,52 160,55" fill="none" stroke="#E8410A" stroke-width="1.5"/><polyline points="183,55 186,20 189,70 194,55 204,52 212,55" fill="none" stroke="#E8410A" stroke-width="1.5"/><polyline points="235,55 238,20 241,70 246,55 256,52 264,55" fill="none" stroke="#E8410A" stroke-width="1.5"/><polyline points="287,55 290,20 293,70 298,55 308,52 316,55" fill="none" stroke="#E8410A" stroke-width="1.5"/></svg>` },
    a:['Totaal AV-blok (3e graads)','2e graads AV-blok Mobitz II','Sinusbradycardie','Junctioneel ritme'],
    c:0,
    ex:'Totaal AV-blok: P-golven (~75/min) en QRS-escapritme (~36/min) zijn volledig onafhankelijk — atrioventriculaire dissociatie. Behandeling: urgente pacemaker. Oorzaken: inferior STEMI, digitalis, myocarditis, idiopathisch (Lenegre). Junctioneel ritme heeft een vast PR-interval; sinusbradycardie heeft normale P-QRS-relatie.',
    wiki:{
          kern: "AV-blokken: 1e graads (lang PR, elke P→QRS), 2e graads Mobitz I (progressief langer PR → uitval QRS), 2e graads Mobitz II (constant PR → plotse uitval QRS), 3e graads = complete dissociatie.",
          mechanisme: [
            { title: "Compleet blok AV-knoop of His-bundel", desc: "Geen enkele atriale prikkel geleidt naar de ventrikels — complete AV-dissociatie. Atria slaan op sinusritme (~75/min), ventrikels via eigen escape-pacemaker." },
            { title: "Escape-pacemaker", desc: "Junctionaal escape (AV-knoop-niveau): 40-60/min, smal QRS, hemodynamisch beter. Ventriculair escape (His-Purkinje): 20-40/min, breed QRS, instabiel." },
            { title: "ECG-diagnose", desc: "P-golven en QRS-complexen volledig ontkoppeld: atria sneller dan ventrikels. PR-interval is variabel — een P kan 'voor', 'in' of 'na' een QRS vallen zonder vaste relatie." },
            { title: "Hemodynamische gevolgen", desc: "Laag slagvolume door trage ventrikelfrequentie + verlies atriale bijdrage aan vulling ('atrial kick') → lage cardiac output → presyncope/syncope/hemodynamische collaps." },
          ],
          onderscheid: [
            { label: 'Totaal (derdegraads) AV-blok', desc: 'P-golven en QRS volledig ontkoppeld. Atria sneller dan ventrikels. Ventriculair escape-ritme 20-40/min (breed QRS) of junctionaal 40-60/min (smal QRS).', type: 'ok' },
            { label: 'Sinusbradycardie', desc: 'Traag maar P en QRS altijd gekoppeld met constant PR-interval.', type: 'warn' },
            { label: 'Wenckebach (Mobitz I)', desc: 'Sommige P-golven geblokkeerd maar geleidde P-golven hebben een vaste P-QRS-relatie (progressief verlengend PR).', type: 'warn' },
            { label: 'Junctioneel escape-ritme', desc: 'Ventrikelritme 40-60/min met smal QRS — bij totaal blok op AV-knoop-niveau. Ventriculair escape (breed QRS) bij lager blok.', type: 'danger' },
          ],
          therapie: {
            urgent: "Acuut: transcutane pacemaker of isoprenaline infuus als overbrugging.",
            stappen: [
              { naam: "Definitief", detail: "permanente pacemaker (PPM)." },
              { naam: "Bij inferior STEMI-gerelateerd", detail: "soms reversibel." },
            ],
          },
        } },

  // ── Spirometrie-vragen met SVG ──
  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Man van 64 jaar, roker, hoest en dyspnoe. Flow-volume curve van zijn spirometrie is afgebeeld.\n\nWelk patroon is dit?',
    fig:{ type:'graph', alt:'Concave flow-volume curve passend bij obstructief longpatroon', credit:null,
      src:`<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><text x="8" y="16" font-size="10" fill="#888" font-family="DM Sans,sans-serif">Flow-volume curve</text><line x1="30" y1="130" x2="200" y2="130" stroke="#ccc" stroke-width="1"/><line x1="30" y1="20" x2="30" y2="130" stroke="#ccc" stroke-width="1"/><text x="32" y="138" font-size="8" fill="#aaa" font-family="DM Sans,sans-serif">Volume →</text><text x="2" y="80" font-size="8" fill="#aaa" font-family="DM Sans,sans-serif" transform="rotate(-90,14,80)">Flow</text><polyline points="30,130 40,58 55,72 75,88 100,102 130,113 165,122 195,130" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6,3"/><polyline points="30,130 38,42 48,48 65,60 90,78 120,96 158,116 195,130" fill="none" stroke="#E8410A" stroke-width="2"/><text x="110" y="50" font-size="9" fill="#3b82f6" font-family="DM Sans,sans-serif">Normaal</text><text x="115" y="100" font-size="9" fill="#E8410A" font-family="DM Sans,sans-serif">Patiënt</text></svg>` },
    a:['Obstructief patroon (bijv. COPD)','Restrictief patroon (bijv. longfibrose)','Gemengd obstructief-restrictief patroon','Normaal patroon'],
    c:0,
    ex:'Obstructief patroon: de uitademcurve (rood) is concaaf (hol naar binnen) vergeleken met normaal (blauw gestippeld), met een verlaagde piekflow en vertraagde uitademing. FEV1/FVC <0.70 na bronchodilatatie bevestigt obstructie (GOLD-criteria voor COPD).',
    wiki:{
          kern: "Spirometrie: FVC (geforceerde vitale capaciteit), FEV1 (volume in eerste seconde), FEV1/FVC-ratio. Obstructief patroon: FEV1/FVC <0.70 ná bronchodilatatie (GOLD-criterium).",
          mechanisme: [
            { title: "Verhoogde luchtwegweerstand", desc: "Bronchospasmen, slijm, slijmvliesontsteking of alveolaire collaps (emfyseem) → moeizame uitademing → FEV1 daalt sterker dan FVC." },
            { title: "Concave uitademcurve", desc: "FEV1/FVC <0.70 → concave (holle) curve op de flow-volume grafiek door progressieve luchtwegcollaps bij hogere longvolumes." },
            { title: "Air trapping", desc: "Lucht blijft achter in de longen → TLC normaal of verhoogd, RV verhoogd. Typisch bij emfyseem (barrel chest)." },
          ],
          onderscheid: [
            { label: "COPD", desc: "onomkeerbare obstructie (na bronchodilatator).", type: 'ok' },
            { label: "Astma", desc: "(deels) reversibele obstructie → bronchodilatatortest: FEV1 stijging ≥12% + ≥200ml = significante reversibiliteit.", type: 'warn' },
          ],
          therapie: {
            urgent: "COPD: stoppen met roken (meest effectief), SABA/LABA, LAMA, ICS bij frequente exacerbaties, longrevalidatie, O2 bij pO2 <7.3 kPa.",
            stappen: [
              { naam: "Behandeling", detail: "" },
            ],
          },
        } },

  { type:'diagnose', d:4, domain:'pulmo', dl:'Pulmonologie',
    q:'Vrouw van 58 jaar, progressieve dyspnoe, niet-roker. Spirometrie: FEV1/FVC 0.82 (normaal), FVC 62% van voorspeld. Flow-volume curve afgebeeld.\n\nWelk patroon is dit?',
    fig:{ type:'graph', alt:'Verkleinde maar normaal gevormde flow-volume curve passend bij restrictief patroon', credit:null,
      src:`<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><text x="8" y="16" font-size="10" fill="#888" font-family="DM Sans,sans-serif">Flow-volume curve</text><line x1="30" y1="130" x2="200" y2="130" stroke="#ccc" stroke-width="1"/><line x1="30" y1="20" x2="30" y2="130" stroke="#ccc" stroke-width="1"/><text x="32" y="138" font-size="8" fill="#aaa" font-family="DM Sans,sans-serif">Volume →</text><polyline points="30,130 38,42 48,48 65,60 90,78 120,96 158,116 195,130" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6,3"/><polyline points="60,130 66,62 74,68 88,82 108,100 130,116 155,130" fill="none" stroke="#E8410A" stroke-width="2"/><text x="110" y="50" font-size="9" fill="#3b82f6" font-family="DM Sans,sans-serif">Normaal</text><text x="80" y="75" font-size="9" fill="#E8410A" font-family="DM Sans,sans-serif">Patiënt</text></svg>` },
    a:['Restrictief patroon (bijv. longfibrose, pleuraverdikking)','Obstructief patroon (bijv. COPD)','Gemengd patroon','Normaal patroon'],
    c:0,
    ex:'Restrictief patroon: de flow-volume curve (rood) heeft dezelfde normale convexe vorm als normaal maar is kleiner (naar rechts verschoven, minder volume). FEV1/FVC blijft normaal (≥0.70) of zelfs verhoogd, omdat zowel FEV1 als FVC evenredig afnemen. Oorzaken: longfibrose (IPF), sarcoïdose, pleura-aandoening, kyfoscoliose.',
    wiki:{
          kern: "Restrictieve longaandoening: verlaagde TLC (<80% van voorspeld). FVC verlaagd, maar FEV1/FVC normaal of verhoogd — de curve is kleiner maar normaal van vorm. Oorzaken: IPF, sarcoïdose, kyfoscoliose, neuromusculair.",
          mechanisme: [
            { title: "Verlaagde compliance", desc: "Longweefsel of thoraxwand stijf/beschadigd → longen kunnen niet volledig uitzetten → kleiner volume bij dezelfde ademdruk." },
            { title: "FVC + TLC verlaagd", desc: "FVC daalt evenredig met FEV1 → FEV1/FVC normaal of zelfs verhoogd. TLC <80% van voorspeld bevestigt restrictie (bodybox of He-verdunning)." },
            { title: "DLCO", desc: "Verlaagd bij parenchymale fibrose (minder gaswisselend oppervlak). DLCO normaal bij extraparenchymale restrictie (neuromusculair, pleuraal) — onderscheidend kenmerk." },
          ],
          onderscheid: [
            { label: "Restrictief patroon", desc: "FVC verlaagd, FEV1/FVC normaal/verhoogd, TLC <80%. Curve kleiner maar normaal van vorm. Oorzaken: IPF, sarcoïdose, kyfoscoliose, spierzwakte.", type: 'ok' },
            { label: "Obstructief patroon", desc: "FEV1/FVC <0.70 na bronchodilatatie. Concave curve. Air trapping (hoog RV/TLC). Oorzaken: COPD, astma.", type: 'warn' },
            { label: "Gemengd patroon", desc: "Verlaagd FEV1/FVC én verlaagd TLC — combinatie van obstructie en restrictie.", type: 'warn' },
          ],
          therapie: {
            urgent: "IPF: nintedanib of pirfenidon (antifibrotisch).",
            stappen: [
              { naam: "Sarcoïdose", detail: "corticosteroïden bij orgaanbedreiging." },
              { naam: "Neuromusculair", detail: "NIV (niet-invasieve ventilatie)." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'pulmo', dl:'Pulmonologie',
    q:'Een normaal FEV1/FVC-getal na bronchodilatatie sluit COPD uit.',
    c:true,
    ex:'WAAR. Per GOLD-criteria: COPD wordt gedefinieerd als een postbronchodilatator FEV1/FVC <0.70. Als de ratio na bronchodilatatie normaal is (≥0.70), is COPD uitgesloten — ook al zijn er klachten. Een normale ratio kan wel samengaan met andere longziekten (astma, restrictie).',
    wiki:{
          kern: "GOLD-definitie COPD: persisterende luchtwegobstructie (FEV1/FVC <0.70 na bronchodilatatie) + relevante blootstelling (rook, stof, gassen) + klachten. GOLD-stadia I (≥80%), II (50-79%), III (30-49%), IV (<30%) op basis van FEV1%.",
          mechanisme: [
            { title: "Emfyseem", desc: "Destructie van alveolaire wanden → verlies van elasticiteit → verhoogde compliance → luchtwegcollaps bij expiratie." },
            { title: "Chronische bronchitis", desc: "Slijmbekercelhyperplasie door chronische irritatie (rook) → overmatig slijm, verkleining luchtwegen, gestoorde mucociliaire klaring." },
            { title: "Air trapping", desc: "Beide componenten geven expiratorische flow-beperking → lucht blijft achter (hoog RV + TLC) → barrel chest + hyperinflatie op X-thorax." },
          ],
          onderscheid: [
            { label: "COPD", desc: "Irreversibele obstructie na bronchodilatatie. Roker, >40j, geleidelijk progressief. GOLD-stadia op basis van FEV1%.", type: 'ok' },
            { label: "Astma", desc: "(Deels) reversibele obstructie — bronchodilatatortest: FEV1-stijging ≥12% én ≥200 ml. Jong, atopisch, variabel beloop.", type: 'warn' },
            { label: "ACO (Asthma-COPD Overlap)", desc: "Kenmerken van beide: obstructie met significante reversibiliteit bij een roker >40j. Behandeling: LABA + ICS.", type: 'warn' },
          ],
          therapie: {
            urgent: "Richtlijnen NHG/GOLD: stap 1 SABA (salbutamol), stap 2 LAMA (tiotropium) of LABA, stap 3 combinatie LABA+LAMA, stap 4 LABA+LAMA+ICS bij recidiverende exacerbaties.",
            stappen: [
              { naam: "Behandeling", detail: "" },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie', subtype:'test',
    q:'Man van 55 jaar, hoest met hemoptoë, gewichtsverlies 5 kg in 3 maanden, roker (30 pakjaren). Welk onderzoek geeft het meeste diagnostische informatie?',
    a:['CT-thorax met contrast','Standaard thoraxfoto','Bronchoscopie met BAL','Sputumkweek'],
    c:0,
    ex:'Bij verdenking longcarcinoom is een CT-thorax met contrast de eerste stap: het toont de locatie, grootte, relatie tot mediastinum en eventuele metastasen beter dan een thoraxfoto. Bronchoscopie volgt voor histologie bij centrale tumoren; CT-geleide biopsie bij perifere tumoren. Thoraxfoto mist tot 25% van longtumoren.',
    wiki:{
          kern: "Alarmsignalen longcarcinoom: hemoptoë, gewichtsverlies, persisterende hoest, heesheid, dysfagie, Claude Bernard-Horner syndroom, Pancoast-tumor. Incidentele longmodule: Fleischner-criteria voor follow-up/biopsie op basis van grootte en risico.",
          mechanisme: [
            { title: "Longcarcinoom", desc: "NSCLC (80%: adenocarcinoom meest voorkomend, squameuzelcel, grootcellig) en SCLC (20%, agressief, centrale locatie, paraneoplastisch)." },
            { title: "NSCLC", desc: "driversmutaties (EGFR, ALK, ROS1, KRAS) → targettherapie." },
          ],
          onderscheid: [
            { label: "PET-CT", desc: "stagering (mediastinale klieren, metastasen).", type: 'ok' },
            { label: "EBUS", desc: "endobronchiale echografie + biopsie lymfeklieren.", type: 'warn' },
            { label: "Mediastinoscopie", desc: "chirurgische stagering.", type: 'danger' },
            { label: "MRI-hersenen", desc: "hersenuitzaaiingen bij NSCLC-stadium III-IV.", type: 'warn' },
          ],
          therapie: {
            urgent: "NSCLC I-II: chirurgie (lobectomie).",
            stappen: [
              { naam: "III", detail: "chemoradiatie ± immunotherapie." },
              { naam: "IV", detail: "mutatie-geleide therapie (TKI) of immunotherapie (pembrolizumab als PD-L1 ≥50%)." },
            ],
          },
        } },

  // ── Lab/diagnostiek-vragen ──
  { type:'lab', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man van 60 jaar, pijn op de borst vanaf 6 uur geleden. Troponinecurve afgebeeld.\n\nWelke uitspraak is correct?',
    fig:{ type:'graph', alt:'Troponine tijdcurve na myocardinfarct: stijgt na 1-3u, piek bij 12-24u, normaliseert na 5-14 dagen', credit:null,
      src:`<svg viewBox="0 0 240 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><text x="8" y="15" font-size="10" fill="#888" font-family="DM Sans,sans-serif">Troponine na STEMI</text><line x1="35" y1="120" x2="220" y2="120" stroke="#ccc" stroke-width="1"/><line x1="35" y1="20" x2="35" y2="120" stroke="#ccc" stroke-width="1"/><text x="36" y="130" font-size="7" fill="#aaa" font-family="DM Sans,sans-serif">0   3   6   12  24     72h</text><text x="2" y="75" font-size="7" fill="#aaa" font-family="DM Sans,sans-serif" transform="rotate(-90,14,75)">Troponine</text><line x1="35" y1="112" x2="220" y2="112" stroke="#f87171" stroke-width="1" stroke-dasharray="4,2"/><text x="170" y="110" font-size="7" fill="#f87171" font-family="DM Sans,sans-serif">URL</text><polyline points="35,118 55,116 70,108 85,72 100,38 115,30 145,42 170,68 195,95 220,112" fill="none" stroke="#E8410A" stroke-width="2"/><circle cx="115" cy="30" r="3" fill="#E8410A"/><text x="118" y="28" font-size="8" fill="#E8410A" font-family="DM Sans,sans-serif">Piek</text></svg>` },
    a:['Een normaal troponine na 1 uur symptomen sluit NSTEMI nog NIET uit','Troponine is al verhoogd direct bij het begin van het infarct','De troponinepiek treedt op binnen 2 uur na het infarct','CK-MB is gevoeliger dan hs-troponine voor vroege detectie'],
    c:0,
    ex:'Hs-troponine stijgt pas 1-3 uur na het begin van het infarct. Een vroeg (0-uur) negatief troponine sluit MI nog niet uit — seriële metingen op 0 en 1-2 uur zijn nodig. De piek is bij 12-24 uur. CK-MB is minder gevoelig dan hs-troponine en wordt minder gebruikt.',
    wiki:{
          kern: "Hoog-sensitief troponine (hs-cTnI of hs-cTnT): stijgt na 1-3u, piek 12-24u, normaliseert 5-14 dagen (hs-cTnT langer). Afkapwaarde: 99e percentiel van gezonde referentiepopulatie (URL = upper reference limit).",
          mechanisme: [
            { title: "Troponine-vrijgave", desc: "Troponine T en I zijn regulatoire eiwitten van het contractiele apparaat. Bij myocardschade lekken ze de bloedbaan in — al na 1-3 uur meetbaar." },
            { title: "Hs-assay voordeel", desc: "Hoog-sensitieve assay heeft een detectiegrens 10× lager dan conventioneel → eerder positief, betere uitsluiting (NPV >99% na 3u)." },
            { title: "Serieel meten", desc: "Eén meting is nooit voldoende. Serieel protocol (0+1u of 0+3u): significante stijging of daling (delta-troponine) = rule-in ACS." },
          ],
          onderscheid: [
            { label: 'Tijdsverloop hs-troponine', desc: 'Stijgt na 1-3u, piek bij 12-24u, normaliseert na 5-14 dagen. Seriële meting (0/1h of 0/3h protocol) is essentieel voor de diagnose.', type: 'ok' },
            { label: 'Andere oorzaken verhoogd troponine', desc: 'LE, myocarditis, hartfalen, sepsis, nierfalen, cardioversie — troponine is cardiospecifiek maar niet ACS-specifiek.', type: 'warn' },
            { label: 'HEART-score', desc: 'History + ECG + Age + Risk factors + Troponin — risicostratificatie op SEH: score ≤3 laag risico, ≥7 hoog risico.', type: 'warn' },
            { label: 'CK-MB', desc: 'Minder sensitief en specifiek dan hs-troponine — niet meer standaard bij ACS-diagnostiek.', type: 'danger' },
          ],
          therapie: {
            urgent: "Positief hs-troponine + klachten: rule-in ACS.",
            stappen: [
              { naam: "Strategie", detail: "invasief (coronairangiografie) bij hoog risico (GRACE-score >140), conservatief bij laag risico." },
            ],
          },
        } },

  { type:'lab', d:4, domain:'cardio', dl:'Cardiologie',
    q:'Man van 45 jaar, chronisch gebruik van lisdiuretica. ECG-bevindingen afgebeeld.\n\nWat is de meest waarschijnlijke elektrolytstoornis?',
    fig:{ type:'ecg', alt:'ECG met afgeplatte T-toppen en prominente U-golven na T-golven passend bij hypokaliëmie', credit:null,
      src:`<svg viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><line x1="0" y1="55" x2="320" y2="55" stroke="#e8e0d0" stroke-width="0.5"/><text x="8" y="14" font-size="9" fill="#aaa" font-family="DM Sans,sans-serif">Afleiding V3 — afgeplatte T + U-golf</text><polyline points="0,55 10,55 17,47 24,55 34,55 36,60 38,13 40,68 44,55 60,52 70,55 78,51 90,55 110,55 117,47 124,55 134,55 136,60 138,13 140,68 144,55 160,52 170,55 178,51 190,55 210,55 217,47 224,55 234,55 236,60 238,13 240,68 244,55 260,52 270,55 278,51 290,55 310,55 317,47 320,55" fill="none" stroke="#E8410A" stroke-width="1.5"/></svg>` },
    a:['Hypokaliëmie','Hyperkaliëmie','Hypocalciëmie','Hyponatriëmie'],
    c:0,
    ex:'Hypokaliëmie op ECG: afgeplatte/geïnverteerde T-golven + prominente U-golven (positieve deflectie na T-golf, best zichtbaar in V2-V3). Hyperkaliëmie geeft juist hoge piekende T-golven ("tent-shaped"), breed QRS en verlengd PR. Lisdiuretica → kaliëmverlies → hypokaliëmie.',
    wiki:{
          kern: "ECG-veranderingen bij elektrolytstoornissen. Hypokaliëmie (K+ <3.5 mmol/L): afgeplatte T, prominente U-golf, QT-verlenging (risico torsades de pointes).",
          mechanisme: [
            { title: "Hyperpolarisatie", desc: "Hypokaliëmie maakt de rustmembraanpotentiaal meer negatief → cel is moeilijker te depolariseren, maar repolarisatie verloopt trager." },
            { title: "Verlengde repolarisatie → U-golf", desc: "Trager repolariserende M-cellen in het myocard veroorzaken de prominente U-golf (positieve deflectie ná de T-golf, best zichtbaar in V2-V3)." },
            { title: "Aritmierisico", desc: "QTc-verlenging + disperse repolarisatie → risico op vroege nadepolarisaties → torsades de pointes. Lisdiuretica zijn een klassieke oorzaak van hypokaliëmie." },
          ],
          onderscheid: [
            { label: 'Hypokaliëmie', desc: 'Afgeplatte/geïnverteerde T-golven + prominente U-golven (>T-golf in V2-V3), QTc verlengd → risico torsades de pointes.', type: 'ok' },
            { label: 'Hyperkaliëmie', desc: 'Hoge piekende T-golven (tent-shaped), breed QRS, verlengd PR, sinusgolf-patroon bij K⁺ >7 mmol/L.', type: 'danger' },
            { label: 'Hypocalciëmie', desc: 'QTc-verlenging (verlengd ST-segment, geen T-golfverandering) → aritmierisico bij QTc >500 ms.', type: 'warn' },
            { label: 'Digoxine-effect', desc: '"Reversed tick" ST-depressie, afgeplatte T, prominente U-golf — plus bradycardie en AV-geleidingsverlenging.', type: 'warn' },
          ],
          therapie: {
            urgent: "Oraal kalium (KCl retard) bij milde hypokaliëmie zonder ECG-afwijkingen.",
            stappen: [
              { naam: "Ernstige stoornis/aritmie", detail: "IV KCl (max 20 mmol/u perifeer, 40 mmol/u centraal) onder continue ECG-bewaking." },
              { naam: "ECG-monitoring", detail: "Monitor tot K⁺ >3,5 mmol/L en ECG-normalisatie." },
              { naam: "Magnesium", detail: "Altijd magnesium suppleren bij hypokaliëmie — Mg-tekort veroorzaakt refractaire K-depletie." },
            ],
          },
        } },

  { type:'diagnose', d:4, domain:'neuro', dl:'Neurologie', subtype:'diff',
    q:'Man van 52 jaar, recent herseninfarct rechter occipitaalkwab. Welk visueel velddefect is te verwachten?',
    a:['Linker homonieme hemianopsie','Rechter homonieme hemianopsie','Bitemporale hemianopsie','Linker monoculaire blindheid'],
    c:0,
    ex:'Rechter occipitaalkwab verwerkt visuele informatie van de LINKER gezichtshelft (beide ogen). Beschadiging → linker homonieme hemianopsie (beide ogen missen de linker gezichtshelft). Bitemporale hemianopsie = chiasmaletsel (hypofysetumor). Monoculaire blindheid = ipsilateraal nervus opticus letsel.',
    wiki:{
          kern: "Visuele baan: retina → nervus opticus → chiasma (nasale vezels kruisen) → tractus opticus → corpus geniculatum laterale → radiatio optica → primaire visuele schors (V1, occipitaalkwab). Laesie NA chiasma → homonieme hemianopsie (zelfde kant uitval in beide ogen).",
          mechanisme: [
            { title: "Kruising in chiasma", desc: "Nasale vezels van beide retinae kruisen in het chiasma opticum → elk hemisphere verwerkt de contralaterale gezichtshelft van beide ogen." },
            { title: "Occipitaalkwab-lokalisatie", desc: "Rechter occipitale cortex (V1) verwerkt de linker gezichtshelft → letsel rechts → linker homonieme hemianopsie (zelfde kant uitval in beide ogen)." },
            { title: "Radiatio optica-splits", desc: "Pars superior (parietaal) → inferieure kwadranten. Pars inferior (temporaal, Meyer-lus) → superieure kwadranten. Partieel letsel geeft kwadrant-hemianopsie." },
          ],
          onderscheid: [
            { label: "Occipitaalkwab-letsel", desc: "Homonieme hemianopsie contralateraal. Macular sparing mogelijk (dubbele bloedvoorziening fovea). CVA meest voorkomende oorzaak.", type: 'ok' },
            { label: "Chiasma-letsel", desc: "Bitemporale hemianopsie — nasale vezels die kruisen → temporale velduitval bilateraal. Klassiek bij hypofysetumor.", type: 'warn' },
            { label: "Radiatio optica-letsel", desc: "Homonieme kwadrant-hemianopsie (superieur of inferieur). Meyer-lus: superieure hemianopsie ('pie in the sky').", type: 'warn' },
            { label: "Nervus opticus-letsel", desc: "Monoculaire blindheid of scotoom — ipsilateraal. Oorzaken: ischemie, neuritis optica (MS), tumor.", type: 'danger' },
          ],
          therapie: {
            urgent: "Visuele revalidatie bij homonieme hemianopsie: oogbewegingstraining, prismabril.",
            stappen: [
              { naam: "Rijbevoegdheid", detail: "uitgesloten bij homonieme hemianopsie (ook na herstel)." },
            ],
          },
        } },

  { type:'lab', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Man van 50 jaar, diabetes type 1, ziek en brakend. Arterieel bloedgas: pH 7.18, pCO2 2.8 kPa, HCO3 10 mmol/L, anion gap 28 mmol/L.\n\nWat is de meest waarschijnlijke diagnose?',
    a:['Metabole acidose met verhoogde anion gap (diabetische ketoacidose)','Respiratoire acidose met compensatie','Metabole alkalose','Metabole acidose met normale anion gap (hyperchloremisch)'],
    c:0,
    ex:'Metabole acidose + verhoogde anion gap bij DM1 + braken = diabetische ketoacidose (DKA). MUDPILES = differentialen bij hoge-AG acidose.',
    wiki:{
          kern: "Anion gap (AG) = Na+ − (Cl− + HCO3−). Normaal 8-12 mmol/L. Verhoogde AG-acidose (MUDPILES): Methanol, Uremia, DKA, Propyleenglycol, INH (isoniazide), Lactaatacidose, Ethyleenglycol, Salicylaten.",
          redflag: "Hypokaliëmie vóór insuline bij DKA: insuline drijft K+ intracellulair → levensbedreigende hypokaliëmie. Corrigeer K+ naar >3,5 mmol/L vóór insuline te starten.",
          mechanisme: [
            { title: "DKA-cascade", desc: "Insulinetekort → verhoogde lipolyse → vrije vetzuren → ketogenese (β-hydroxybutyraat + acetoacetaat + aceton) → anion gap stijgt." },
            { title: "Compensatie", desc: "Kussmaul-ademhaling: diepe regelmatige hyperventilatie als respiratoire compensatie op metabole acidose." },
          ],
          onderscheid: [
            { label: "DKA", desc: "pH <7,3, HCO3 <18, verhoogde anion gap, ketonen positief, glucose matig verhoogd. Vooral DM type 1.", type: 'ok' },
            { label: "Hyperosmolair hyperglykemisch syndroom (HHS)", desc: "pH normaal, glucose >33 mmol/L, osmolaliteit >320 mOsm/kg, geen of minimale ketose. Vooral DM type 2, ouderen.", type: 'warn' },
          ],
          therapie: {
            urgent: "DKA: rehydratie (NaCl 0.9%), insuline IV (na K+ correctie), kaliumsuppletie, bicarbonaat zelden (pH <6.9).",
            stappen: [
              { naam: "Monitor", detail: "glucose, K+, pH, ketonen." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie', subtype:'diff',
    q:'Man van 28 jaar, scherp begrensde, schilferende, erythemateuze plaques op de ellebogen, knieën en hoofdhuid. Nagelveranderingen aanwezig.\n\nMeest waarschijnlijke diagnose?',
    fig:{ type:'derm', src:null, alt:'Erythemateuze schilferende plaques op ellebogen bij psoriasis', credit:null },
    a:['Psoriasis vulgaris','Eczeem (atopische dermatitis)','Pityriasis rosea','Tinea corporis'],
    c:0,
    ex:'Psoriasis: scherp begrensde zilverschilferige plaques op extensorzijden (knieën/ellebogen/scalp). Nagelafwijkingen (pitting, onycholyse) in 50%.',
    wiki:{
          kern: "Psoriasis: chronisch inflammatoire huidziekte (prevalentie 2-3%). Pathofysiologie: Th17-gemedieerde inflammatie (IL-17, IL-23, TNF-α) → versnelde keratinocytenproliferatie (turnover 3-4 dagen, normaal 28).",
          redflag: "Psoriasisartritis bij 20-30% van psoriasispatiënten — gewrichtserosies mogelijk. Vroeg herkennen en behandelen voorkomt blijvende schade.",
          mechanisme: [
            { title: "Koebner-fenomeen", desc: "Nieuwe laesies ontstaan op plaatsen van huidtrauma — verklaring voor psoriasis op typische trauma-locaties (ellebogen, knieën)." },
            { title: "Triggers", desc: "Infectie (streptokokken), stress, alcohol, medicatie (lithium, bètablokkers, NSAID's)." },
          ],
          onderscheid: [
            { label: "Eczeem", desc: "Jeuk op voorgrond, flexuurlokalisatie (elleboogplooi, knieholte), vochtige laesies, minder scherp begrensd.", type: 'ok' },
            { label: "Pityriasis rosea", desc: "Herald patch + kerststakpatroon langs ribben, spontane remissie na 6-8 weken.", type: 'warn' },
            { label: "Tinea corporis", desc: "Centrale opheldering (ringvormig), positieve kaliloogpreparaat (KOH), reageert op antischimmel.", type: 'danger' },
          ],
          therapie: {
            urgent: "Licht: emolliënten, topicale corticosteroïden + calcipotriol, UVB-smalspectrum fototherapie.",
            stappen: [
              { naam: "Matig-ernstig", detail: "Methotrexaat (MTX), ciclosporine, acitretine." },
              { naam: "Ernstig/artritis", detail: "Biologicals: anti-TNF (adalimumab, etanercept), anti-IL-17 (secukinumab), anti-IL-23 (guselkumab)." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie',
    q:'Sepsis kan aanwezig zijn bij een patiënt met een normale temperatuur.',
    c:true,
    ex:'WAAR. Sepsis-3 definitie (2016): levensbedreigende orgaandisfunctie door een ontregelde gastheerrespons op infectie. Temperatuur is NIET meer verplicht in de definitie. Ouderen, immuungecompromitteerden en patiënten met sepsis door gram-negatieve staven kunnen hypotherm zijn (<36°C). SOFA-score ≥2 = sepsis.',
    wiki:{
          kern: "Sepsis-3 criteria: vermoede/bewezen infectie + SOFA-score stijging ≥2 punten. SOFA: PaO2/FiO2, GCS, MAP, bilirubine, creatinine, trombocyten. qSOFA (bedside): HF >22/min, veranderd bewustzijn, RR <100 mmHg → 2 van 3 = hoog risico.",
          mechanisme: [
            { title: "Ontregelde immuunrespons", desc: "Infectie triggert een dysreguleerde gastheerrespons: massale vrijgave van IL-1, IL-6 en TNF → pro-inflammatoire cascade." },
            { title: "Endotheelschade", desc: "Cytokinestorm beschadigt het vasculaire endotheel → vaatlekkage, microtromben (DIC), vasodilatie → distributieve shock." },
            { title: "Orgaandisfunctie", desc: "Mismatch tussen zuurstofaanvoer en -verbruik → SOFA-score stijging ≥2 = sepsis. Meest getroffen: nier, long, lever, coagulatie, brein." },
          ],
          onderscheid: [
            { label: "Sepsis (Sepsis-3)", desc: "Vermoede/bewezen infectie + SOFA-stijging ≥2. Temperatuur NIET verplicht — ook hypothermie (<36°C) is een sepsisuiting.", type: 'ok' },
            { label: "SIRS", desc: "Verouderd begrip, te aspecifiek (ook niet-infectieus). Sepsis-3 verving SIRS als definitie in 2016.", type: 'warn' },
            { label: "Septische shock", desc: "Sepsis + vasopressoren nodig voor MAP ≥65 mmHg én lactaat >2 mmol/L ondanks adequate vulling. Mortaliteit 40-50%.", type: 'danger' },
          ],
          therapie: {
            urgent: "Hour-1 bundle: bloedkweken → breed antibioticum → lactaat → vulling (30 mL/kg kristalloïd bij lactaat >4 of hypotensie) → noradrenaline bij MAP <65.",
            stappen: [
              { naam: "Antibiotica binnen 1 uur", detail: "Elke 30 minuten vertraging bij septische shock verhoogt mortaliteit. Breed-spectrum, later ontsmallen op kweekuitslag." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie', subtype:'diff',
    q:'Man van 48 jaar, epigastrische pijn uitstralend naar de rug, misselijkheid, braken. Amylase 1200 U/L, lipase 3400 U/L. Geen galstenen op echo.\n\nMeest waarschijnlijke oorzaak?',
    a:['Alcoholische pancreatitis','Galsteenpancreatitis','Geneesmiddelen-geïnduceerde pancreatitis','Auto-immuun pancreatitis'],
    c:0,
    ex:'Alcoholische pancreatitis en galsteenpancreatitis zijn samen verantwoordelijk voor ~80% van alle gevallen. Zonder galstenen op echo bij een man van 48 jaar is overmatig alcoholgebruik de meest waarschijnlijke oorzaak. Amylase >3× normaal + lipase >3× normaal bevestigt pancreatitis.',
    wiki:{
          kern: "Pancreatitis-diagnose: ≥2 van 3 criteria: (1) typische pijn, (2) amylase/lipase ≥3× normaal, (3) beeldvormend bewijs. Oorzaken: galstenen (40%), alcohol (30%), idiopathisch (20%), overig (geneesmiddelen, hypertriglyceridemie, ERCP, trauma, auto-immuun).",
          mechanisme: [
            { title: "Voortijdige trypsine-activatie", desc: "Pancreatische protheazen (trypsinogeen) worden voortijdig geactiveerd binnen het pancreas zelf → auto-digestie van pancreasweefsel." },
            { title: "Lokale inflammatie", desc: "Inflammatoire cascade → oedeem, hemorragie, necrose. Complicaties: pseudocyst (>4w), geïnfecteerde necrose, abces." },
            { title: "Systemische gevolgen", desc: "Bij ernstige pancreatitis: SIRS → ARDS, acute nierinsufficiëntie, MOF. Revised Atlanta: mild/matig/ernstig op basis van orgaanfalen en complicaties." },
          ],
          onderscheid: [
            { label: "Alcoholische pancreatitis", desc: "Meest waarschijnlijk bij man 48j zonder galstenen op echo. Amylase/lipase ≥3× normaal + typische pijn = diagnose.", type: 'ok' },
            { label: "Galsteenpancreatitis", desc: "Meest voorkomende oorzaak overall (40%) — galstenen op echo, geelzucht, verhoogd bilirubine. ERCP bij cholangitis.", type: 'warn' },
            { label: "Geneesmiddelen", desc: "Cave: azathioprine, valproaat, GLP-1-agonisten, thiaziden. Tijdsverband met medicatiestart cruciaal.", type: 'warn' },
            { label: "Hypertriglyceridemie", desc: "TG >11 mmol/L kan pancreatitis veroorzaken — ook zonder galstenen/alcohol. Check nuchter lipidenprofiel.", type: 'danger' },
          ],
          therapie: {
            urgent: "Agressieve IV-vochtresuscitatie (Ringer-lactaat), pijnstilling (opioïden), vroeg enteraal voeden (>24u).",
            stappen: [
              { naam: "Antibiotica", detail: "Alleen bij geïnfecteerde necrose (FNA-bewijs of klinische verslechtering) — niet profylactisch." },
              { naam: "ERCP", detail: "Bij biliaire pancreatitis met cholestase of cholangitis binnen 24-72u." },
            ],
          },
        } },

  { type:'pharma', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Vrouw van 34 jaar, Graves\' disease, hyperthyreoïdie. Welk medicament blokkeert de synthese van schildklierhormoon?',
    a:['Thiamazol (methimazol)','Propranolol','Lugolse oplossing (kaliumjodide)','Levothyroxine'],
    c:0,
    ex:'Thiamazol (en propylthiouracil) blokkeert thyroïdperoxidase → remt synthese van T3/T4. Propranolol verlicht symptomen (tremor, tachycardie) maar beïnvloedt de aanmaak niet. Lugolse oplossing blokkeert tijdelijk vrijgave (Wolff-Chaikoff-effect), gebruikt pre-operatief. Levothyroxine is een schildklierhormoon-substituut.',
    wiki:{
          kern: "Graves\\' disease: auto-immuunhyperthyreoïdie door TSH-receptor-stimulerende antilichamen (TRAb). Kenmerken: hyperthyreoïdie + struma + exofthalmus + pretibiale myxoedeem (niet altijd aanwezig).",
          mechanisme: [
            { title: "Thyroïdperoxidase-remming", desc: "Thiamazol blokkeert thyroïdperoxidase → geen jodisering van tyrosine → geen T3/T4-synthese." },
            { title: "Vertraagd effect", desc: "Werkt pas na 2-6 weken — de al bestaande T4-voorraad in de schildklier moet eerst uitgeput raken." },
            { title: "PTU bij crisis", desc: "Propylthiouracil (PTU) remt ook de perifere conversie van T4 naar T3 → sneller werkzaam bij thyreotoxische crisis. Eerste keuze in zwangerschap (1e trimester)." },
          ],
          onderscheid: [
            { label: "Thiamazol (thionamide)", desc: "Remt T3/T4-synthese. Startdosis 20-40 mg/dag, afbouwen op geleide TSH. Bijwerking: agranulolcytose (zeldzaam maar ernstig).", type: 'ok' },
            { label: "Radiojodium (I-131)", desc: "Definitieve behandeling — destrueert schildklierweefsel. Cave: hypothyreoïdie nadien (levenslange suppletie). Niet bij zwangerschap.", type: 'warn' },
            { label: "Chirurgie (totale thyroïdectomie)", desc: "Indicaties: groot struma, compressie, maligniteitsverdenking, patiëntvoorkeur. Cave: hypocalciëmie + nervus recurrens-letsel.", type: 'warn' },
          ],
          therapie: {
            urgent: "Thiamazol 20-40 mg/dag starten, propranolol voor symptoomcontrole (tremor, tachycardie).",
            stappen: [
              { naam: "TSH-normalisatie", detail: "Dosis afbouwen op geleide van TSH en FT4 — streef euthyreoïdie na 6-12 weken." },
              { naam: "TRAb na 12-18 maanden", detail: "Negatief TRAb → kans op remissie hoog → stoppen thiamazol overwegen." },
              { naam: "Recidief", detail: "Definitieve therapie: radiojodium of chirurgie." },
            ],
          },
        } },

  { type:'diagnose', d:4, domain:'rheum', dl:'Reumatologie', subtype:'diff',
    q:'Vrouw van 42 jaar, ochtendstijfheid >1 uur, symmetrische zwelling MCP- en PIP-gewrichten handen, positieve reumafactor en anti-CCP antilichamen.\n\nMeest waarschijnlijke diagnose?',
    a:['Reumatoïde artritis','Artrose','Systemische lupus erythematodes (SLE)','Reactieve artritis'],
    c:0,
    ex:'Reumatoïde artritis: symmetrische polyartritis van kleine gewrichten (MCP, PIP), ochtendstijfheid >1 uur, positieve RF en anti-CCP (specificiteit anti-CCP ~95%). Artrose: DIP-gewrichten, geen ochtendstijfheid >30 min, RF negatief. SLE: multi-orgaan, ANA positief. Reactieve artritis: asymmetrisch, na infectie.',
    wiki:{
          kern: "ACR/EULAR 2010-criteria RA: score ≥6: gewrichten (0-5), serologie RF/anti-CCP (0-3), acutfasereactanten CRP/BSE (0-1), duur >6 weken (0-1). Anti-CCP: sensitiviteit 70%, specificiteit 95% — waardevoller dan RF bij vroege diagnose.",
          mechanisme: [
            { title: "Stap 1", desc: "Auto-immuun synovitis: Th17 + macrofagen." },
            { title: "Stap 2", desc: "IL-6, TNF-α, IL-1." },
            { title: "Stap 3", desc: "synoviaal pannus." },
            { title: "Stap 4", desc: "kraakbeen- en botdestructie. Systeemmanifestaties: reumanoduli, vasculitis, longen (ILD), hart (pericarditis), ogen (scleritis)." },
          ],
          onderscheid: [
            { label: "RA", desc: "MCP/PIP symmetrisch, RF/anti-CCP positief.", type: 'ok' },
            { label: "Artrose", desc: "DIP/CMC, Heberden/Bouchard knobbels, RF negatief.", type: 'warn' },
            { label: "Psoriasisartritis", desc: "DIP, huid/nagels, RF negatief.", type: 'danger' },
            { label: "Jicht", desc: "MTP-1, acute aanvallen, urinezuur verhoogd.", type: 'warn' },
          ],
          therapie: {
            urgent: "Treat-to-target: streef lage ziekteactiviteit (DAS28 <3.2) of remissie.",
            stappen: [
              { naam: "MTX (anker-DMARD)", detail: "Methotrexaat eerste keus — foliumzuursuppletie altijd erbij. Respons na 6-12 weken." },
              { naam: "Combi of biological", detail: "Bij onvoldoende respons: combi-DMARDs of biological toevoegen (anti-TNF: adalimumab/etanercept; anti-IL-6: tocilizumab; anti-CD20: rituximab; JAK-i: baricitinib)." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie', subtype:'diff',
    q:'Man van 26 jaar, sinds 6 maanden afgevlakt affect, sociaal terugtrekken, bizarre overtuigingen dat buren hem bespioneren via tv. Geen middelengebruik. Geen depressie.\n\nMeest waarschijnlijke diagnose?',
    a:['Schizofrenie','Bipolaire stoornis met psychotische kenmerken','Waanstoornis','Korte psychotische stoornis'],
    c:0,
    ex:'Schizofrenie: positieve symptomen (wanen, hallucinaties) + negatieve symptomen (afgevlakt affect, sociaal terugtrekken) ≥6 maanden. Bipolair: stemmingsepisodes + psychose. Waanstoornis: alleen wanen zonder andere psychotische symptomen, functioneren grotendeels intact. Korte psychotische stoornis: <1 maand.',
    wiki:{
          kern: "DSM-5 criteria schizofrenie: ≥2 van 5 (wanen, hallucinaties, gedesorganiseerd spreken, gedesorganiseerd gedrag, negatieve symptomen) ≥1 maand actief, totale duur ≥6 maanden inclusief prodromaal. Minimaal 1 van de eerste 3 symptomen aanwezig.",
          mechanisme: [
            { title: "Dopamine-overschot (mesolimbisch)", desc: "Overactiviteit mesolimbisch D2-systeem → positieve symptomen (wanen, hallucinaties). Verklaart werking D2-antagonisten." },
            { title: "Dopamine-tekort (mesocorticaal)", desc: "Hypoactiviteit prefrontale D1-receptoren → negatieve symptomen (afgevlakt affect, motivatieverlies, sociaal terugtrekken). Moeilijker te behandelen." },
            { title: "Glutamaat & neurobiologie", desc: "NMDA-receptor-hypoactiviteit (glutamaat) versterkt het beeld — ketamine kan psychose nabootsen. Grijzestofverlies frontaal/temporaal bij chronisch beloop." },
          ],
          onderscheid: [
            { label: "Schizofrenie", desc: "Positieve + negatieve symptomen ≥6 maanden. Psychose domineert. DSM-5: ≥2 van 5 criteria ≥1 maand actief.", type: 'ok' },
            { label: "Bipolaire stoornis met psychose", desc: "Psychose TIJDENS stemmingsepisode (manie of depressie). Euthymisch: geen psychose.", type: 'warn' },
            { label: "Schizoaffectief", desc: "Psychotische én stemmingsepisoden tegelijkertijd én zelfstandig — tussendiagnose.", type: 'warn' },
            { label: "Waanstoornis", desc: "Alleen wanen, geen hallucinaties, functioneren grotendeels intact, duur ≥1 maand.", type: 'danger' },
          ],
          therapie: {
            urgent: "Atypische antipsychotica (D2-antagonisten): risperidon, olanzapine, quetiapine — minder EPS dan klassieke middelen.",
            stappen: [
              { naam: "Clozapine", detail: "Bij behandelresistentie (≥2 antipsychotica gefaald). Cave: agranulocytose (wekelijks bloedbeeld!), myocarditis." },
              { naam: "Psychosociale interventies", detail: "cognitieve gedragstherapie, familieondersteuning, arbeidsbegeleiding." },
            ],
          },
        } },

  { type:'lab', d:4, domain:'lab', dl:'Laboratorium',
    q:'Vrouw van 35 jaar, moe, bleke slijmvliezen. Lab: Hb 6.2 g/dL, MCV 70 fL, ferritine 5 µg/L, transferrinesaturatie 8%.\n\nWat is de diagnose en behandeling van eerste keuze?',
    a:['IJzergebreksanemie — oraal ijzersuppletie','IJzergebreksanemie — bloedtransfusie','Thalassemie — geen behandeling nodig','Anemie door chronische ziekte — behandel onderliggende oorzaak'],
    c:0,
    ex:'Microcytaire anemie (MCV laag) + laag ferritine + lage transferrinesaturatie = ijzergebreksanemie. Eerste keuze behandeling: oraal ijzersuppletie (ferrofumaraat/ferrosulfaat 200 mg/dag, 3-6 maanden). Bloedtransfusie alleen bij hemodynamische instabiliteit of Hb <5 g/dL met symptomen. Zoek altijd de oorzaak (bloedverlies: GI-tract, menorrhagie).',
    wiki:{
          kern: "Anemie-classificatie op MCV: microcytair (MCV <80): IJzergebrek, thalassemie, ACD, sideroblastisch. Normocytair (MCV 80-100): ACD, acuut bloedverlies, aplastisch.",
          mechanisme: [
            { title: "IJzergebrek stadia", desc: "(1) Depletie ijzervoorraden (ferritine daalt). (2) Transport-ijzergebrek (transferrinesaturatie daalt, TIBC stijgt). (3) Anemie (Hb daalt, MCV daalt)." },
            { title: "Ferritine als vroege marker", desc: "Ferritine <30 µg/L = ijzergebrek ook als Hb nog normaal. Vroegste laboratoriummarker van ijzerdepletie." },
            { title: "Inflammatie-effect", desc: "Ferritine is ook een acutefasereactant — bij inflammatie kan ferritine normaal of verhoogd zijn ondanks ijzergebrek. Dan ook transferrinesaturatie meten." },
          ],
          onderscheid: [
            { label: "IJzergebreksanemie", desc: "Ferritine laag (<30), transferrinesaturatie laag (<20%), TIBC hoog. MCV laag. Oorzaak zoeken: menorrhagie, GI-bloeding.", type: 'ok' },
            { label: "ACD (anemie chronische ziekte)", desc: "Ferritine normaal/verhoogd, transferrinesaturatie laag, TIBC laag — ijzer vastzit in macrofagen.", type: 'warn' },
            { label: "Thalassemie", desc: "Familiale microcytaire anemie, MCV extreem laag (MCV/RBC <13 = Mentzer-index), normaal ferritine, Hb-elektroforese afwijkend.", type: 'warn' },
          ],
          therapie: {
            urgent: "Oraal ijzer: liefst nuchter, vitamine C verhoogt absorptie, antacida verlagen absorptie.",
            stappen: [
              { naam: "IV ijzer (ferric carboxymaltose)", detail: "bij intolerantie oraal, malabsorptie, ernstige anemie, chronische nierziekte." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Een normaal D-dimeer sluit longembolie uit bij patiënten met een hoge klinische waarschijnlijkheid (Wells-score >6).',
    c:false,
    ex:'NIET WAAR. D-dimeer is alleen bruikbaar bij LAGE klinische waarschijnlijkheid (Wells ≤4). Bij hoge klinische waarschijnlijkheid (Wells >6) directe beeldvorming (CT-pulmonalisangiografie) zonder D-dimeer testen — de negatief-voorspellende waarde van D-dimeer is bij hoog risico onvoldoende om PE uit te sluiten.',
    wiki:{
          kern: "Wells-score longembolie: ≤4 laag, 4-6 matig, >6 hoog. Strategie: laag risico → D-dimeer (ELISA).",
          mechanisme: [
            { title: "D-dimeer: wat het is", desc: "Afbraakproduct van gekruislinkt fibrine. Verhoogd bij trombose maar ook bij infectie, trauma, postoperatief, zwangerschap, kanker, leeftijd >50j → veel vals-positieven." },
            { title: "Hoge sens, lage spec", desc: "Sensitiviteit >99% — een negatief D-dimeer sluit PE uit bij lage klinische waarschijnlijkheid. Specificiteit slechts ~40% → nutteloos bij hoge pre-testkans." },
            { title: "YEARS-algoritme", desc: "leeftijdsafhankelijke afkap (leeftijd × 10 bij >50j als klinische criteria afwezig)." },
          ],
          onderscheid: [
            { label: "CT-PA", desc: "gouden standaard voor PE-diagnose.", type: 'ok' },
            { label: "V/Q-scan", desc: "alternatief bij contrastallergie/nierfunctie.", type: 'warn' },
            { label: "Echocardiografie", desc: "rechterventrikelbelasting bij grote PE, maar geen diagnose.", type: 'danger' },
            { label: "D-dimeer", desc: "uitsluitingstest, geen bevestigingstest.", type: 'warn' },
          ],
          therapie: {
            urgent: "PE bevestigd: DOAC (rivaroxaban, apixaban) eerste keus.",
            stappen: [
              { naam: "Massieve PE", detail: "Hemodynamische instabiliteit: trombolyse (alteplase) of chirurgische trombectomie." },
              { naam: "Duur therapie", detail: "uitgelokt 3 maanden, niet-uitgelokt 6 maanden-levenslang (op basis van recidiefrisico)." },
            ],
          },
        } },

  // ── Ronde 2 van 20 nieuwe vragen ──
  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie', subtype:'diff',
    q:'Man van 55 jaar, plotse hevige hoofdpijn ("ergste pijn van zijn leven"), nekstijfheid, fotofobiefobie. CT-hersenen normaal.\n\nWat is de volgende stap?',
    a:['Lumbaalpunctie voor xanthochromie','MRI-hersenen met gadolinium','Antibiotica starten voor bacteriële meningitis','Bloedkweken en wachten op uitslag'],
    c:0,
    ex:'Thunderclap headache + normale CT = subarachnoïdale bloeding (SAB) NIET uitgesloten. LP is verplicht: xanthochromie (gele verkleuring) of verhoogd bilirubine in liquor = SAB bevestigd, ook als CT normaal. CT mist 2-5% van SAB (vooral na 6-12u). MRI is minder sensitief dan LP voor vroege SAB.',
    wiki:{
          kern: "SAB-triade: plotse hevige hoofdpijn + nekstijfheid + verminderd bewustzijn. Oorzaak: ruptuur intracraniale aneurysma (80%), AVM, idiopathisch.",
          mechanisme: [
            { title: "Meningeale prikkeling", desc: "Bloed in de subarachnoïdale ruimte irriteert de hersenvliezen → plotse hevige hoofdpijn (thunderclap) + nekstijfheid + fotofobiefobie." },
            { title: "Xanthochromie", desc: "Hemoglobine breekt af tot bilirubine in de liquor — dit ontstaat pas na 2-4 uur en is aanwezig tot 2 weken. Spectrofotometrie is goudstandaard, visuele beoordeling onvoldoende." },
            { title: "CT vs LP", desc: "CT mist 2-5% van SAB (sensitiever in eerste 6u, minder betrouwbaar daarna). Normale CT na thunderclap = altijd LP verplicht na ≥2u." },
          ],
          onderscheid: [
            { label: "Subarachnoïdale bloeding (SAB)", desc: "Thunderclap hoofdpijn. CT normaal sluit NIET uit — LP verplicht na ≥2u. Xanthochromie positief = bevestigd.", type: 'ok' },
            { label: "Bacteriële meningitis", desc: "Koorts prominenter, langzamer begin (uren), PMN-pleocytose, laag glucose — antibiotica direct zonder LP te wachten.", type: 'danger' },
            { label: "Thunderclap migraine", desc: "Diagnose per exclusionem — SAB en andere secundaire oorzaken moeten eerst uitgesloten zijn via CT + LP.", type: 'warn' },
            { label: "Cerebraal veneus sinus-trombose", desc: "Subacute headache, hypercoagulabiliteit, papilloedeem, MRV diagnostisch.", type: 'warn' },
          ],
          therapie: {
            urgent: "SAB: neurovasculaire IC, nimodipine (vasospasme), coiling/clipping aneurysma.",
            stappen: [
              { naam: "Herhaling-preventie", detail: "clip (open) of coil (endovasculair) op basis van lokalisatie en anatomie." },
            ],
          },
        } },

  { type:'diagnose', d:4, domain:'infectio', dl:'Infectiologie', subtype:'diff',
    q:'Vrouw van 28 jaar, terugkeer uit Sub-Sahara Afrika, koorts sinds 4 dagen, koude rillingen, hoofdpijn, splenomegalie. Bloeduitstrijkje afgebeeld.\n\nMeest urgente diagnose?',
    fig:{ type:'histo', src:null, alt:'Bloeduitstrijkje met intracellulair parasieten in erytrocyten', credit:null },
    a:['Malaria (Plasmodium falciparum)','Dengue','Tyfus (Salmonella typhi)','Leptospirose'],
    c:0,
    ex:'Malaria is altijd de eerste diagnose bij koorts na verblijf in malaria-endemisch gebied tot het tegendeel bewezen — het is levensbedreigende noodsituatie. Dikke druppel + dunne uitstrijkje voor parasietidentificatie. P. falciparum = meest gevaarlijk (cerebrale malaria, fataal zonder behandeling).',
    wiki:{
          kern: "Malaria: triade koorts + koude rillingen + zweten (tertiaan = P. vivax/ovale, quartiaan = P. malariae, irregulier = P. falciparum). P. falciparum complicaties: cerebrale malaria, ARDS, acuut nierfalen, hypoglykemie, uitgesproken anemie.",
          mechanisme: [
            { title: "Mugbeet → leverfase", desc: "Anopheles-mug injecteert sporozoïeten → replicatie in hepatocyten (1-2 weken, asymptomatisch). P. vivax/ovale: hypnozoïeten blijven slapend in lever." },
            { title: "Erythrocytaire fase", desc: "Merozieten infecteren rode bloedcellen → gesynchroniseerde ruptuur → koortspiek (tertiaan 48u, quartiaan 72u, P. falciparum irregulier)." },
            { title: "P. falciparum-specifiek", desc: "Geïnfecteerde erytrocyten kleven aan vaatwand (cytoadherentie) → microtromben → cerebrale malaria, ARDS, acuut nierfalen. Dodelijkste species." },
          ],
          onderscheid: [
            { label: "Malaria (P. falciparum)", desc: "Koorts + koude rillingen + zweten na tropenreis. Dik-druppelpreparaat + RDT. Altijd urgentie tot P. falciparum uitgesloten.", type: 'ok' },
            { label: "Dengue", desc: "Hevige myalgie/artralgie ('breakbone fever'), huiduitslag, trombopenie, geen cyclisch patroon. NS1-antigeen/PCR diagnostisch.", type: 'warn' },
            { label: "Typhoid (S. typhi)", desc: "Aanhoudende koorts, relatieve bradycardie, buikpijn. Bloedkweek is goudstandaard.", type: 'warn' },
            { label: "Leptospirose", desc: "Watercontact, conjunctivale hyperemie, icterus + nierinsufficiëntie (Weil) — serologie diagnostisch.", type: 'danger' },
          ],
          therapie: {
            urgent: "P. falciparum niet-gecompliceerd: artemisininecombinatietherapie (ACT: artemether-lumefantrine).",
            stappen: [
              { naam: "Gecompliceerd", detail: "IV artesunaat." },
              { naam: "P. vivax/ovale", detail: "chloroquine + primaquine (hypnozoïeten lever)." },
            ],
          },
        } },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Man van 72 jaar, hartfalen, EF 30%, ritme AF. Welk medicament heeft bewezen de mortaliteit te verlagen bij hartfalen met verminderde ejectie (HFrEF)?',
    a:['Sacubitril/valsartan (ARNI)','Digoxine','Amiodaron','Diltiazem'],
    c:0,
    ex:'HFrEF mortaliteitsreducerende middelen (SGLT2i/ARNI/BB/MRA = "fantastic four"): ACE-i/ARB of sacubitril-valsartan (ARNI), bètablokker, mineralocorticoïdreceptorantagonist (spironolacton/eplerenon), SGLT2-inhibitor (dapagliflozine/empagliflozine). Digoxine reduceert ziekenhuisopnames maar NIET mortaliteit. Diltiazem is gecontra-indiceerd bij HFrEF.',
    wiki:{
          kern: "HFrEF = EF <40%. Vier pijlers farmacotherapie (NEJM-trials): (1) ACE-i/ARB of ARNI (PARADIGM-HF: sacubitril-valsartan > enalapril). (2) Bètablokker (carvedilol, bisoprolol, metoprolol-succinate). (3) MRA (RALES-trial: spironolacton). (4) SGLT2-inhibitor (DAPA-HF, EMPEROR-Reduced).",
          mechanisme: [
            { title: "Neprilysine-remming (sacubitril)", desc: "Remt de afbraak van natriuretische peptiden (BNP, ANP) → BNP stijgt → vasodilatatie, natriurese, diurese, antifibrotisch." },
            { title: "AT1-blokkade (valsartan)", desc: "ARB-component blokkeert de AT1-receptor → minder angiotensine-II-effect. Combinatie superieur aan ACE-remmer alleen (PARADIGM-HF)." },
            { title: "Cave combinatie", desc: "ARNI nooit combineren met ACE-remmer (36u washout vereist) — risico op angioedeem." },
          ],
          onderscheid: [
            { label: "HFrEF (EF <40%)", desc: "Vier pijlers: ARNI (of ACE-i/ARB) + bètablokker + MRA + SGLT2-inhibitor. PARADIGM-HF: sacubitril-valsartan > enalapril.", type: 'ok' },
            { label: "HFpEF (EF ≥50%)", desc: "SGLT2-inhibitoren (EMPEROR-Preserved, DELIVER) zijn de enige middelen met bewezen mortaliteitsvoordeel. ARNI/BB/MRA minder bewezen.", type: 'warn' },
            { label: "Diltiazem/verapamil bij HFrEF", desc: "Negatief inotroop en chronotroop — absoluut gecontraïndiceerd bij HFrEF (EF <40%).", type: 'danger' },
          ],
          therapie: {
            urgent: "Startdoses en titratie: enalapril 2.5→10 mg bid, bisoprolol 1.25→10 mg/dag, spironolacton 25-50 mg/dag, dapagliflozine 10 mg/dag.",
            stappen: [
              { naam: "Diuretica", detail: "symptoomverlichting, geen mortaliteitsreductie." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'psych', dl:'Psychiatrie',
    q:'Lithium heeft een smalle therapeutische breedte en vereist regelmatige serumspiegelcontrole.',
    c:true,
    ex:'WAAR. Lithium therapeutische spiegel: 0.6-1.0 mmol/L (onderhoud), 0.8-1.2 mmol/L (acute manie). Toxiciteit begint al rond 1.5 mmol/L: tremor, diarree, polyurie/polydipsie, cognitieve stoornissen. Ernstige toxiciteit (>2.0): ataxie, verwardheid, convulsies, coma. Triggers toxiciteit: dehydratie, NSAID\'s, ACE-remmers, diuretica.',
    wiki:{
          kern: "Lithium indicaties: bipolaire stoornis (acute manie + onderhoudstherapie), profylaxe recidiverende depressie, suïcidaliteitsreductie (meta-analyses). Bijwerkingen lange termijn: nierinsufficiëntie (tubulointerstitiële nefritis), hypothyreoïdie, hyperparathyreoïdie.",
          mechanisme: [
            { title: "Werkingsmechanisme", desc: "Niet volledig begrepen. Hypothesen: remming inositolfosfatase (second messenger-remming), remming GSK-3β (neuroprotectief), modulatie serotonerge transmissie." },
            { title: "Renale klaring & toxiciteit", desc: "Lithium wordt renaal geklaard in competitie met natrium. Bij natriumdepletie (dehydratie, diuretica, NSAID) → lithiumretentie → snelle spiegeldaling → toxiciteit." },
            { title: "Toxiciteitssymptomen", desc: "Spiegel 1.5-2.0: grove tremor, diarree, polyurie, cognitie. >2.0: ataxie, verwardheid, convulsies, coma. Behandeling: IV NaCl, bij ernstige toxiciteit hemodialyse." },
          ],
          onderscheid: [
            { label: "Lithium", desc: "Smal therapeutisch venster (0.6-1.0 mmol/L). Uniek bewezen anti-suïcidaal effect. Cave: nierfunctie + TSH halfjaarlijks controleren.", type: 'ok' },
            { label: "Valproaat", desc: "Acute manie, snelle cyclers. Cave: teratogeen (neurale-buisdefecten) — NOOIT bij vrouwen in reproductieve leeftijd zonder afdoende anticonceptie.", type: 'warn' },
            { label: "Lamotrigine", desc: "Bipolaire depressie, preventie depressieve episodes. Langzame ophoging verplicht (Stevens-Johnson bij snelle titratie).", type: 'warn' },
          ],
          therapie: {
            urgent: "Controle serumspiegel: stabiele patiënt 3-6 maandelijks.",
            stappen: [
              { naam: "Nierfunctie + TSH", detail: "halfjaarlijks." },
              { naam: "Zwangerschap", detail: "Ebstein-anomalie risico laag maar verhoogd; alternatieven overwegen." },
              { naam: "Overdosering", detail: "IV NaCl, ernstig: hemodialyse." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie', subtype:'diff',
    q:'Vrouw van 55 jaar, rectaal bloedverlies, verandering defecatiepatroon, gewichtsverlies 4 kg. Kolonoscopie toont een massa in de sigmoïd.\n\nWelk onderzoek is de volgende stap voor stagering?',
    a:['CT-thorax/abdomen/pelvis met contrast','PET-scan','MRI-colon','Colonoscopie herhalen'],
    c:0,
    ex:'Coloncarcinoom stagering: CT-thorax/abdomen/pelvis met contrast = standaard voor detectie van afstandsmetastasen (lever, long). MRI-pelvis aanvullend voor rectumcarcinoom (mesorectale fascia, T-stadium). PET-CT bij twijfel over metastasen of recidief. TNM-stagering is bepalend voor behandeling.',
    wiki:{
          kern: "Colorectaal carcinoom: 3e meest voorkomende maligniteit wereldwijd. Risicofactoren: leeftijd >50, familiaire belasting (FAP, Lynch), inflammatoire darmziekte (CU/CD), obesitas, rood/bewerkt vlees.",
          mechanisme: [
            { title: "T-stadium (diepte ingroei)", desc: "T1: submucosa. T2: muscularis propria. T3: pericolon vetweefsel. T4: peritoneum of naburig orgaan — bepalend voor resectabiliteit." },
            { title: "N-stadium (klieren)", desc: "N0: geen lymfekliermetastasen. N1: 1-3 positieve klieren. N2: ≥4 positieve klieren — indicatie voor adjuvante chemotherapie." },
            { title: "M-stadium (afstand)", desc: "M0: geen afstandsmetastasen. M1: lever (50%), long, peritoneum. Resectabele levermetastasen: potentieel curatief met chirurgie + chemotherapie." },
          ],
          onderscheid: [
            { label: "Coloncarcinoom", desc: "Stagering via CT-thorax/abdomen/pelvis met contrast. Hemicolectomie + adjuvante CAPOX/FOLFOX bij stadium III.", type: 'ok' },
            { label: "Rectumcarcinoom (≤15 cm ab ano)", desc: "MRI-bekken verplicht voor CRM-beoordeling. Neoadjuvante chemoradiatie bij cT3/T4 of N+.", type: 'warn' },
            { label: "Lynch-syndroom (HNPCC)", desc: "MSI-hoog/MMR-deficiëntie — erfelijke belasting, jongere leeftijd, recht colon, betere prognose, indicatie immunotherapie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Stadium I-II: chirurgie (hemicolectomie).",
            stappen: [
              { naam: "Stadium III", detail: "chirurgie + adjuvante chemotherapie (CAPOX of FOLFOX)." },
              { naam: "Stadium IV resectabele levermetastasen", detail: "leverchirurgie + chemo." },
              { naam: "Stadium IV niet-resectabel", detail: "palliatieve chemo ± targeted (bevacizumab, cetuximab afhankelijk van RAS-mutatiestatus)." },
            ],
          },
        } },

  { type:'lab', d:4, domain:'nephro', dl:'Nefrologie',
    q:'Man van 65 jaar, hypertensie, DM2. Lab: creatinine 185 µmol/L (eGFR 32 mL/min/1.73m²), kalium 5.8 mmol/L, natrium 138 mmol/L, pH 7.31, HCO3 18 mmol/L.\n\nWelke bevinding is het meest acuut levensbedreigend?',
    a:['Hyperkaliëmie (K+ 5.8 mmol/L)','Metabole acidose (pH 7.31)','Verhoogd creatinine (eGFR 32)','Hoge bloeddruk'],
    c:0,
    ex:'Hyperkaliëmie met ECG-veranderingen (piekende T-toppen) = direct calcium gluconaat IV — meest acute bedreiging bij deze patiënt.',
    wiki:{
          kern: "Hyperkaliëmie bij chronische nierziekte (CKD): verlaagde renale kaliumexcretie. ECG-gradatie: K+ 5,5-6,0: piekende T-golven. 6,0-6,5: PR-verlenging, breed QRS. >6,5: sinusoïdaal patroon → VF-risico.",
          redflag: "K+ >6,5 mmol/L of sinusoïdaal ECG = imminente ventrikelfibrilleren. Calcium gluconaat IV onmiddellijk — bereid dialyse voor bij refractaire hyperkaliëmie.",
          mechanisme: [
            { title: "Verminderde renale excretie", desc: "CKD: verlaagd aldosteron-effect + minder functionerende distale tubuli → K⁺-excretie daalt. Risicofactoren: ACE-remmers/ARBs, kaliumsparende diuretica, bijnierinsufficiëntie." },
            { title: "Acidose-effect", desc: "Metabole acidose (bij CKD) → H⁺ wisselt intracellulair met K⁺ → K⁺ shift naar extracellulaire ruimte. Per 0,1 pH-daling: K⁺ stijgt ~0,5 mmol/L." },
            { title: "ECG-progressie", desc: "K⁺ 5,5-6,0: piekende T-golven. 6,0-6,5: PR-verlenging, breed QRS. >6,5: sinusoïdaal patroon → VF-risico." },
          ],
          onderscheid: [
            { label: "Hyperkaliëmie bij CKD", desc: "Meest voorkomende oorzaak. K⁺ 5,8 + ECG-afwijkingen = directe behandeling. Calcium gluconaat = eerste stap.", type: 'ok' },
            { label: "Pseudo-hyperkaliëmie", desc: "Hemolyse bij bloedafname, trombocytose, leukocytose — ECG normaal. Altijd herhalen voor behandeling bij twijfel.", type: 'warn' },
            { label: "Acuut vs chronisch", desc: "Chronische hyperkaliëmie beter verdragen door renale adaptatie — maar ECG bepaalt urgentie, niet de absolute K⁺-waarde.", type: 'warn' },
          ],
          therapie: {
            urgent: "K+ >6,0 of ECG-veranderingen: calcium gluconaat 10% 10 mL IV over 2-3 min → insuline 10 E + glucose 50% 50 mL → salbutamol 10-20 mg vernevelend → kayexalate/patiromer → hemodialyse indien refractair.",
            stappen: [
              { naam: "Chronisch management", detail: "Kaliumbeperkt dieet, medicatieherziening (stop ACE-remmer/kaliumsparend diureticum), patiromer als langetermijnsuppletie." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie', subtype:'diff',
    q:'Man van 40 jaar, hoofdpijn, zweten, hartkloppingen, hypertensie die moeilijk medicamenteus te controleren is. 24-uurs urine: verhoogde metanefrinen.\n\nMeest waarschijnlijke diagnose?',
    a:['Feochromocytoom','Primair hyperaldosteronisme (Conn)','Renovasculaire hypertensie','Essentiële hypertensie'],
    c:0,
    ex:'Triade: hoofdpijn + zweten + hartkloppingen + moeilijk te behandelen hypertensie = feochromocytoom tot bewezen tegendeel. Verhoogde urine-metanefrinen (catecholaminemetabolieten) bevestigt biochemisch. Conn: hypokaliëmie, aldosteron/renine verhoogd. Renovasculair: vaatgeruis, jonge patiënt.',
    wiki:{
          kern: "Feochromocytoom: chromaffiene tumorcellen (bijnier 90%, extra-adrenaal = paraganglioom 10%) die catecholaminen produceren. Prevalentie hypertensie: 0.2-0.6%. 10%-regel: 10% maligne, 10% bilateraal, 10% extra-adrenaal, 10% bij kinderen, 10% familiair (MEN2, VHL, NF1, SDH-mutaties).",
          mechanisme: [
            { title: "Catecholamine-afgifte", desc: "Chromaffiene tumorcellen scheiden episodisch of continu adrenaline + noradrenaline af → α1 (vasoconstrictie, hypertensie) + β1 (tachycardie, hoog HMV)." },
            { title: "Uitlokkende factoren", desc: "Hypertensieve crisissen bij stress, anesthesie, glucagon, tricyclische antidepressiva, metoclopramide — klassieke 'triggers'." },
          ],
          onderscheid: [
            { label: "Feochromocytoom", desc: "Triade: hoofdpijn + zweten + hartkloppingen. Biochemisch: plasma-metanefrinen (sensitief 99%) of 24u urine-metanefrinen. Lokalisatie: MRI bijnier.", type: 'ok' },
            { label: "Primair hyperaldosteronisme (Conn)", desc: "Hypokaliëmie + verhoogde aldosteron/renine-ratio. Hypertensie zonder paroxismaal karakter.", type: 'warn' },
            { label: "Renovasculaire hypertensie", desc: "Vaatgeruis over de nierarterie, jonge patiënt, renineafhankelijke hypertensie — MR-angiografie diagnostisch.", type: 'warn' },
            { label: "I-123-MIBG / DOTATATE-PET", desc: "Aanvullende nucleaire beeldvorming bij extra-adrenale lokalisatie (paraganglioom) of metastatische ziekte.", type: 'danger' },
          ],
          therapie: {
            urgent: "Pre-operatief: α-blokkade (fenoxybenzamine of doxazosine) minimaal 10-14 dagen → daarna β-blokkade (nooit β VOOR α!).",
            stappen: [
              { naam: "Chirurgie", detail: "laparoscopische adrenalectomie." },
              { naam: "Onresectabel", detail: "MIBG-therapie, sunitinib." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde', subtype:'diff',
    q:'Vrouw van 30 jaar, zwangerschap 34 weken, bloeddruk 158/105 mmHg, proteïnurie 3+ op dipstick, oedeem. Geen voorgeschiedenis hypertensie.\n\nDiagnose?',
    a:['Pre-eclampsie','Chronische hypertensie met superimposed pre-eclampsie','Zwangerschapshypertensie zonder proteïnurie','HELLP-syndroom'],
    c:0,
    ex:'Pre-eclampsie: bloeddruk ≥140/90 na 20 weken + proteïnurie of orgaanschade. HELLP is de gevaarlijkste complicatie.',
    wiki:{
          kern: "Pre-eclampsie treft 2-8% van de zwangerschappen. Oorzaak: onvoldoende ingroei van de placenta → zuurstoftekort → vaatvernauwing door het hele lichaam → orgaanschade.",
          redflag: "HELLP-syndroom kan ook optreden zonder duidelijke hypertensie of proteïnurie — denk eraan bij misselijkheid, rechterbovenbuikpijn en malaise in de tweede helft van de zwangerschap.",
          mechanisme: [
            { title: "Onvoldoende placentaingroei", desc: "Placentacellen (trofoblasten) dringen onvoldoende in de baarmoederwand in → placenta-ischemie → vrijlating van vaatvernauwende stoffen in de bloedsomloop." },
            { title: "Systemische vaatschade", desc: "Vaatvernauwing → hypertensie, eiwitverlies via nieren (proteïnurie), vochtophoping (oedeem), leverenzymstijging, trombocytopenie." },
            { title: "HELLP en eclampsie", desc: "HELLP = hemolytische bloedarmoede + leverenzymstijging + lage bloedplaatjes. Eclampsie = epileptische aanval bij pre-eclampsie — magnesiumsulfaat is preventie én behandeling." },
          ],
          onderscheid: [
            { label: "Pre-eclampsie", desc: "Bloeddruk ≥140/90 na 20 weken + proteïnurie ≥300 mg/24u of orgaanschade. Enige genezing: bevallen.", type: 'ok' },
            { label: "HELLP-syndroom", desc: "Ernstige variant: hemolytische bloedarmoede + leverenzymstijging + bloedplaatjes <100 × 10⁹/L. Kan ook zonder ernstige hypertensie optreden.", type: 'warn' },
            { label: "Eclampsie", desc: "Pre-eclampsie + epileptische aanval. Magnesiumsulfaat is de behandeling én de preventie.", type: 'danger' },
          ],
          therapie: {
            urgent: "Opname. Bloeddruk ≥160/110: labetalol of nifedipine intraveneus. Magnesiumsulfaat bij ernstige pre-eclampsie.",
            stappen: [
              { naam: "Longrijping", detail: "Betamethason of dexamethason (bijnierschorshormonen) voor foetale longrijping bij dreigende vroeggeboorte vóór 34 weken." },
              { naam: "Bevallen = enige genezing", detail: "Geïndiceerd bij ≥37 weken, of eerder bij ernstige pre-eclampsie, HELLP of foetale nood." },
              { naam: "Magnesiumsulfaat", detail: "24 uur na bevalling continueren ter voorkoming van eclampsie." },
            ],
          },
        } },

  { type:'diagnose', d:4, domain:'cardio', dl:'Cardiologie', subtype:'diff',
    q:'Man van 35 jaar, plotse hartstilstand tijdens sporten, gereanimeerd. Echocardiografie: asymmetrische hypertrofie septum >15 mm, systolische anterior motion mitralisklep (SAM).\n\nDiagnose?',
    a:['Hypertrofische obstructieve cardiomyopathie (HOCM)','Dilaterende cardiomyopathie (DCM)','Aortaklepstenose','Hypertensief hartziekte'],
    c:0,
    ex:'HOCM: asymmetrische septumhypertrofie + SAM van de mitralisklep (mitraalblad beweegt naar septum tijdens systole → dynamische LVOT-obstructie). Klassiek: plotse hartdood bij jonge atleten. Gradiënt over LVOT is dynamisch: toeneemt bij inspanning/Valsalva, afneemt in liggende positie.',
    wiki:{
          kern: "HOCM: meest voorkomende erfelijke hartziekte (1:500), autosomaal dominant, sarcomeer-eiwitgenmutaties (MYH7, MYBPC3). Morfologie: asymmetrische septumhypertrofie (ASH), soms apicale hypertrofie.",
          mechanisme: [
            { title: "SAM (systolic anterior motion)", desc: "Venturi-effect trekt het mitraalblad naar het hypertrofe septum tijdens systole → dynamische LVOT-obstructie." },
            { title: "Dynamische gradiënt", desc: "Drukgradiënt over LVOT stijgt bij inspanning, Valsalva, opstaan (lagere preload). Daalt bij hurken, handdruk-test. Gradiënt ≥30 mmHg = significante obstructie." },
            { title: "Plotse hartdood-risico", desc: "Meest voorkomende oorzaak van plotse hartdood bij jonge atleten. Risicostratificatie: ICD-indicaties (syncope, familiaire PHD, hypertrofie ≥30 mm, NSVT)." },
          ],
          onderscheid: [
            { label: "HOCM", desc: "Asymmetrische septumhypertrofie + SAM. Geruis dat TOENEEMT bij Valsalva/opstaan. Plotse hartdood bij atleten. Sarcomeer-mutaties.", type: 'ok' },
            { label: "Aortaklepstenose", desc: "Vaste klep-obstructie. Geruis dat AFNEEMT bij Valsalva. Oudere patiënt. Calcificatie op echo.", type: 'warn' },
            { label: "DCM (dilaterende cardiomyopathie)", desc: "Verwijde LV, EF verlaagd, geen hypertrofie. Geruis door functionele mitralisinsufficiëntie.", type: 'warn' },
            { label: "Hypertensief hart", desc: "Concentrische hypertrofie, geen SAM, hypertensie als oorzaak — relatief normale EF.", type: 'danger' },
          ],
          therapie: {
            urgent: "Symptomatisch: bètablokkers (eerstekeus), disopyramide, verapamil.",
            stappen: [
              { naam: "Obstructie refractair", detail: "septale alcoholablatie of chirurgische myectomie." },
              { naam: "Plotse hartdoodpreventie", detail: "ICD (indicaties: VF/VT-voorgeschiedenis, syncope, familiaire plotse hartdood, hypertrofie ≥30mm)." },
            ],
          },
        } },

  { type:'truefalse', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Bij endocarditis op een natieve klep veroorzaakt door Staphylococcus aureus is de behandelingsduur minimaal 6 weken.',
    c:true,
    ex:'WAAR. Endocarditis door Staphylococcus aureus op een natieve klep: minimaal 6 weken bactericide antibiotica (flucloxacilline IV bij MSSA, vancomycine bij MRSA). Streptokokken-endocarditis: 4 weken (eenvoudig geval 2 weken met aminoglycoside combinatie). Profylactische klep: altijd ≥6 weken, chirurgie vrijwel altijd indicatie.',
    wiki:{
          kern: "Endocarditis-diagnose: Duke-criteria (major: 2 positieve bloedkweken + echocardiografie (vegetatie/abces/nieuw klepgebrek). Minor: predispositie, koorts, vasculaire fenomenen, immunologische tekenen, microbiologie).",
          mechanisme: [
            { title: "Bacteriëmie & hechting", desc: "Bacteriëmie (tandingreep, IV-katheter, huidinfectie) → hechting aan beschadigd endotheel of klepweefsel via fibrine-platelet thrombus." },
            { title: "Vegetatievorming", desc: "Bacteriën worden ingekapseld in een fibrine-trombocytenmatrix → vegetaties die emboliseren kunnen (CVA, seplische embolieën)." },
            { title: "Pathogeen-karakter", desc: "S. aureus: virulent, ook op intacte kleppen, snel destructief. Viridans streptokokken: subacuut, predispositie nodig (klepgebrek, bicuspide aortaklep)." },
          ],
          onderscheid: [
            { label: "S. aureus endocarditis", desc: "Virulent, snel klepdestructie. MSSA: flucloxacilline 12g/dag IV 6 weken. MRSA: vancomycine ± rifampicine.", type: 'ok' },
            { label: "MRSA of penicilline-allergie", desc: "vancomycine ± rifampicine.", type: 'warn' },
            { label: "Enterococcus", desc: "ampicilline + gentamicine of ampicilline + ceftriaxon.", type: 'danger' },
            { label: "Chirurgie-indicaties", desc: "hartfalen, ongecontroleerde infectie, embolie-preventie (vegetatie >10mm + hoog-risico pathogeen).", type: 'warn' },
          ],
          therapie: {
            urgent: "European Society of Cardiology (ESC) endocarditis-richtlijn 2023: multidisciplinair endocarditis-team (endocarditis team).",
            stappen: [
              { naam: "Profylaxe tandheelkundige ingreep", detail: "amoxicilline 2g PO alleen bij hoog-risico patiënten (kunstklep, eerdere endocarditis, congenitaal hartgebrek)." },
            ],
          },
        } },

  { type:'diagnose', d:4, domain:'neuro', dl:'Neurologie', subtype:'test',
    q:'Man van 60 jaar, progressieve asymmetrische tremor rechterhand in rust, bradykinesie, rigiditeit (tandradrigiditeit). Geen dementie.\n\nWat is het meest informatieve aanvullende onderzoek?',
    a:['Dopamine transporter scan (DaTscan)','MRI-hersenen met contrast','EEG','SPECT-scan schildklier'],
    c:0,
    ex:'De ziekte van Parkinson is een klinische diagnose. DaTscan (dopamine transporter SPECT) visualiseert presynaptische dopaminerge neuronen in het striatum — verlaagd bij idiopathische PD en andere parkinsonismen maar normaal bij essentiële tremor en medicatie-geïnduceerd parkinsonisme. MRI-hersenen kan atypische parkinsonismen ondersteunen.',
    wiki:{
          kern: "Parkinson-diagnose: ≥2 van 3 kardinale tekenen (rusttremor 4-6 Hz, bradykinesie, rigiditeit) + asymmetrische presentatie + goede levodopa-respons. Ondersteunend: anosmie, REM-slaapgedragsstoornis, constipatie (autonome prodromale tekenen).",
          mechanisme: [
            { title: "Dopaminerg neuronenverlies", desc: "Degeneratie dopaminerge neuronen in de substantia nigra pars compacta → dopaminetekort in het striatum. Lewy-lichaampjes (α-synucleïne aggregaten) zijn het neuropathologisch kenmerk." },
            { title: "Basale ganglia-disregulatie", desc: "Dopaminetekort → disinhibitie indirect ganglia-circuit → overactiviteit globus pallidus internus → excessieve remming van thalamus → armoede van beweging (bradykinesie)." },
            { title: "80%-drempel", desc: "Symptomen ontstaan pas als >80% van dopaminerge neuronen verloren zijn — de prodromale fase (anosmie, constipatie, REM-slaapstoornis) duurt 5-20 jaar." },
          ],
          onderscheid: [
            { label: "Ziekte van Parkinson", desc: "Asymmetrisch, rusttremor 4-6 Hz, goede levodopa-respons. DaTscan: verlaagd putamen-signaal. Lewy-lichaampjes neuropathologisch.", type: 'ok' },
            { label: "Atypisch parkinsonisme (MSA, PSP, CBD)", desc: "MSA: autonome disfunctie + cerebellum. PSP: vertical gaze palsy + vallen achterwaarts. CBD: apraxie + 'alien limb'. Slechte levodopa-respons.", type: 'warn' },
            { label: "Essentiële tremor", desc: "Actietremor (niet in rust), bilateraal, familiale belasting. DaTscan normaal — onderscheidt van PD.", type: 'warn' },
          ],
          therapie: {
            urgent: "Levodopa (met carbidopa/benserazide): meest effectief, goudstandaard.",
            stappen: [
              { naam: "Dopamine-agonisten", detail: "Pramipexol, ropinirol bij jonge patiënten (minder levodopa-geïnduceerde dyskinesie)." },
              { naam: "MAO-B-remmers", detail: "Rasagiline, selegiline — mild symptomatisch effect en mogelijk neuroprotectief." },
              { naam: "Deep brain stimulation (DBS)", detail: "bij gevorderd PD met motorische fluctuaties." },
            ],
          },
        } },

  { type:'lab', d:3, domain:'lab', dl:'Laboratorium',
    q:'Vrouw van 25 jaar, moe, bleek, icterisch. Lab: Hb 7.8 g/dL, reticulocyten 12%, LDH 680 U/L, haptoglobine <0.1 g/L, directe Coombs positief.\n\nWat is de diagnose?',
    a:['Auto-immuun hemolytische anemie (AIHA)','IJzergebreksanemie','Megaloblastaire anemie (B12-gebrek)','Erfelijke sferocytose'],
    c:0,
    ex:'Auto-immuun hemolytische anemie: hemolytische anemie (Hb laag + LDH hoog + haptoglobine laag + reticulocytose) + directe Coombs test positief (antilichamen op erytrocyten). Erfelijke sferocytose: Coombs negatief. IJzergebrek: reticulocyten laag. B12-gebrek: macrocytair, geen hemolyseparameters.',
    wiki:{
          kern: "Hemolytische anemie kenmerken: Hb ↓ + reticulocytose (beenmerg compensatie) + LDH ↑ (uit erytrocyten) + haptoglobine ↓ (gebonden aan vrijgekomen Hb) + bilirubine ↑ indirect. Intravasculaire hemolysis extra: hemoglobinurie, hemoglobinemie.",
          mechanisme: [
            { title: "Warm-type AIHA (70%)", desc: "IgG-antilichamen binden aan erytrocyten op 37°C → herkenning door miltmacrofagen → extravasculaire hemolysis. Oorzaken: idiopathisch, SLE, CLL, medicatie (methyldopa, penicilline)." },
            { title: "Koud-type AIHA (30%)", desc: "IgM-antilichamen + complement (C3b) bij lage temperaturen → intravasculaire hemolysis. Oorzaken: Mycoplasma-infectie, EBV, lymfoom. Acrocyanose bij kou." },
            { title: "Directe Coombs test", desc: "Detecteert antilichamen of complement op de erytrocyten. Positief bij AIHA, negatief bij erfelijke sferocytose en G6PD-deficiëntie." },
          ],
          onderscheid: [
            { label: "Directe Coombs (DAT)", desc: "positief = antilichamen/complement op RBC = immuungemedieerde hemolysis.", type: 'ok' },
            { label: "Indirecte Coombs", desc: "kruisproef bij bloedgroepbepaling.", type: 'warn' },
            { label: "Erfelijke sferocytose", desc: "osmotische fragiliteitstest, EMA-binding, spectrin-mutaties.", type: 'danger' },
          ],
          therapie: {
            urgent: "Warm AIHA: prednisolon 1 mg/kg/dag → tapering.",
            stappen: [
              { naam: "Refractair", detail: "rituximab (anti-CD20), splenectomie." },
              { naam: "Koud AIHA", detail: "warmte (koude vermijden), rituximab." },
              { naam: "Stap 3", detail: "Bloedtransfusie bij levensbedreigende anemie (kruis-matching complex)." },
            ],
          },
        } },

  { type:'pharma', d:4, domain:'pharma', dl:'Farmacologie',
    q:'Welk antibioticum is NIET geschikt als eerste keus voor een ongecompliceerde urineweginfectie (cystitis) bij een vrouwen zonder risicofactoren?',
    a:['Amoxicilline 500 mg 3dd','Nitrofurantoïne 100 mg 2dd','Fosfomycine 3g éénmalig','Trimethoprim 200 mg 2dd'],
    c:0,
    ex:'Amoxicilline is NIET eerste keus voor UWI vanwege hoge resistentiepercentages van E. coli (>30-40%). NHG-standaard cystitis: nitrofurantoïne 100 mg 2dd 5 dagen (eerste keus), fosfomycine 3g éénmalig (alternatief), trimethoprim 200 mg 2dd 5 dagen (tweede keus bij resistentie nitrofurantoïne). Amoxicilline/ampicilline: slechte dekking E. coli.',
    wiki:{
          kern: "Verwekkers ongecompliceerde UWI: E. coli 80%, Staphylococcus saprophyticus (jonge vrouwen), Klebsiella, Proteus. Resistentiepatronen lokaal bepalen empirische keuze.",
          mechanisme: [
            { title: "Nitrofurantoïne", desc: "bactericide, werkt via DNA-schade in bacteriën, concentreert in urine." },
            { title: "Stap 2", desc: "Niet voor pyelonefritis (onvoldoende weefselconcentraties)." },
            { title: "Fosfomycine", desc: "remt eerste stap peptidoglycaansynthese, éénmalig hoge urinespiegels." },
            { title: "Trimethoprim", desc: "dihydrofolaatreductase-remmer." },
          ],
          onderscheid: [
            { label: "Optie 1", desc: "Gecompliceerde UWI (man, zwangerschap, immunocompromis, katheter, obstructie, pyelonefritis): breder spectrum nodig, ciprofloxacine of co-amoxiclav.", type: 'ok' },
            { label: "Pyelonefritis", desc: "ciprofloxacine 500 mg 2dd 7 dagen (uncomplicated) of ziekenhuisopname + IV bij ernstig.", type: 'warn' },
          ],
          therapie: {
            urgent: "NHG 2022: nitrofurantoïne eerste keus.",
            stappen: [
              { naam: "Zwangerschap", detail: "nitrofurantoïne (vermijd >36 weken), cefalexine." },
              { naam: "Recidiverende UWI (≥3/jaar)", detail: "lage-dosisprofylaxe of zelfbehandeling, cranberrypreparaten beperkt effect." },
            ],
          },
        } },

  { type:'diagnose', d:4, domain:'derm', dl:'Dermatologie', subtype:'diff',
    q:'Man van 60 jaar, jarenlange dermatitisproblematiek. Nieuwe laesie: keratotische plaque met ulceratie op de onderlip, niet genezend in 6 weken, vaste palpabele preauriculaire lymfeklier.\n\nMeest urgente diagnose?',
    a:['Plaveiselcelcarcinoom van de lip','Basaalcelcarcinoom','Keratoacanthoom','Actinische keratose'],
    c:0,
    ex:'Ulcererende laesie lip + palpabele lymfeklier = plaveiselcelcarcinoom (PCC) tot bewezen tegendeel. PCC lip: metastatisch risico 15-20%.',
    wiki:{
          kern: "Plaveiselcelcarcinoom (PCC) van de lip: hoog-risico lokalisatie (metastatisch risico 15-20% vs. 2-5% elders). Risicofactoren: chronische UV-blootstelling, roken, immuunsuppressie, humaan papillomavirus (HPV).",
          redflag: "Palpabele regionale lymfeklier bij PCC van de lip of oor wijst op metastasering — direct beeldvorming (CT hals) en schildwachtklierbiopsie of klierdissectie.",
          mechanisme: [
            { title: "Progressie", desc: "Actinische keratose (precursor) → carcinoma in situ (ziekte van Bowen) → invasief PCC → lymfekliermetastasen via regionale klieren." },
            { title: "Hoog-risicofactoren", desc: "Lokalisatie lip/oor/manus/penis, dikte >2 mm, perineurale groei, slecht gedifferentieerd — verhogen kans op metastase." },
          ],
          onderscheid: [
            { label: "Actinische keratose", desc: "Ruw schilferend vlak, <1% kans op PCC per laesie — behandeling: cryotherapie, 5-FU of imiquimod.", type: 'ok' },
            { label: "Keratoacanthoom", desc: "Snel groeiend (weken), crateervorm met hoornprop — spontane regressie mogelijk maar histologisch moeilijk van PCC te onderscheiden.", type: 'warn' },
            { label: "Basaalcelcarcinoom", desc: "Parelranden, teleangiëctasieën — zelden metastatisch, maar moet worden uitgesloten.", type: 'danger' },
          ],
          therapie: {
            urgent: "Excisie met vrije marge (≥4-6 mm voor hoog-risico PCC). Controleer lymfeklierstations.",
            stappen: [
              { naam: "Mohs microchirurgie", detail: "Bij H-zone, recidief of slecht begrensde tumor — laagste recidiefkans, weefselbesparend." },
              { naam: "Adjuvante radiotherapie", detail: "Bij perineurale groei, positieve marges of irresectabiliteit." },
              { naam: "Metastatisch/irresectabel", detail: "Cemiplimab (anti-PD-1 immunotherapie)." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie', subtype:'diff',
    q:'Man van 45 jaar, rectale pijn, bloedverlies per anum, incomplete defecatiesensatie. Proctoscopie: mucosale hyperemie, korrelig patroon, continu van rectum tot splenic flexure. Biopsie: cryptitis, geen granulomen.\n\nDiagnose?',
    a:['Colitis ulcerosa','Ziekte van Crohn','Infectieuze colitis','Microscopische colitis'],
    c:0,
    ex:'Colitis ulcerosa: continu mucosaal patroon vanaf rectum, geen skip-laesies, geen granulomen op biopsie, cryptitis + cryptabcessen. Ziekte van Crohn: segmentaire/skip-laesies, granulomen (40%), kan transmuraal, ileumbetrokkenheid. Infectieuze colitis: acuut, kweekpositief, zelfslimitend.',
    wiki:{
          kern: "IBD-prevalentie: stijgend wereldwijd. CU: colitis beperkt tot mucosa/submucosa, altijd rectumbetrokkenheid (proctitis bij 30%, linkszijdig bij 40%, pancolitis bij 30%).",
          mechanisme: [
            { title: "IBD pathofysiologie", desc: "dysreguleerde immuunrespons op intestinale microbiota bij genetisch predispositie (NOD2 bij Crohn, HLA bij CU)." },
            { title: "Stap 2", desc: "Th1/Th17-mediatie bij Crohn, Th2 bij CU." },
            { title: "Stap 3", desc: "Mucosal barrier disfunctie." },
          ],
          onderscheid: [
            { label: "Endoscopie + biopsie", desc: "goud standaard.", type: 'ok' },
            { label: "CU", desc: "continu, mucosaal, pseudopoliepen.", type: 'warn' },
            { label: "Crohn", desc: "skip-laesies, diepere ulcera (cobblestoning), fistels, granulomen.", type: 'danger' },
            { label: "Fecale calprotectine", desc: "screening op actieve inflammatie IBD vs IBS.", type: 'warn' },
          ],
          therapie: {
            urgent: "CU mild-matig: 5-ASA (mesalazine, rectaal of oraal).",
            stappen: [
              { naam: "Matig-ernstig", detail: "systemische corticosteroïden → budesonide." },
              { naam: "Refractair", detail: "immunosuppressiva (azathioprine/6-MP), biologicals (infliximab, vedolizumab)." },
              { naam: "Stap 3", detail: "Colectomie bij refractair/dysplasie/carcinoom." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie',
    q:'Statines worden primair aanbevolen voor patiënten met een hoog LDL-cholesterol, ongeacht hun cardiovasculaire risicocategorie.',
    c:false,
    ex:'NIET WAAR. Statines worden aanbevolen op basis van totaal cardiovasculair risico, niet alleen LDL-waarden. Richtlijnen (ESC/ACC): risicocategorie bepaalt streefwaarde LDL (zeer hoog risico: <1.4 mmol/L, hoog: <1.8 mmol/L). Lage absolute risico bij laag LDL? Mogelijk geen statine geïndiceerd. NNT hangt van absolutericorisico af.',
    wiki:{
          kern: "ESC 2021 cardiovasculaire risicocategorie: zeer hoog (bewezen HVZ, DM + orgaanschade, eGFR <30, SCORE2 ≥10%), hoog (SCORE2 5-9%, DM zonder orgaanschade), matig (SCORE2 2.5-4%), laag (<2.5%). Statinebehandeling: alle patiënten met bewezen HVZ (secundaire preventie), bij primaire preventie afhankelijk van risicocategorie + LDL.",
          mechanisme: [
            { title: "HMG-CoA-reductase remming", desc: "Statines blokkeren het sleutelenzym in de endogene cholesterolsynthese van de lever → minder intracellulair cholesterol → lever maakt meer LDL-receptoren." },
            { title: "LDL-klaring verhoogd", desc: "Meer LDL-receptoren op hepatocyten → meer LDL-opname uit het bloed → LDL-daling 30-55% afhankelijk van statine en dosis. Atorvastatine/rosuvastatine = hoog-intensief (>50% LDL-daling)." },
            { title: "Pleiotrope effecten", desc: "Naast LDL-verlaging ook: plaques stabiliseren (minder oxidatief LDL), anti-inflammatoir (CRP ↓), endothelfunctie verbetering. Dit verklaart het cardiovasculaire voordeel ook bij normaal LDL na MI." },
          ],
          onderscheid: [
            { label: "Risico-gebaseerde indicatie", desc: "Statines worden gegeven op basis van totaal cardiovasculair risico, niet alleen LDL. Secundaire preventie (na MI/CVA): altijd statine. Primaire preventie: afhankelijk van SCORE2-risicoscore + LDL.", type: 'ok' },
            { label: "Bijwerkingen statines", desc: "Myopathie (spierpijn + CK-stijging), rhabdomyolyse (zeldzaam). Stop bij CK >10× normaal. Levertoxiciteit zeldzaam. Controleer leverenzymen bij symptomen.", type: 'warn' },
            { label: "Contra-indicaties", desc: "Zwangerschap, ernstige leveraandoening. Interacties: gemfibrozil + statine = myopathie-risico; ciclosporine verhoogt statinespiegel.", type: 'danger' },
            { label: "LDL-streefwaarden", desc: "Ezetimib toevoegen bij onvoldoende LDL-verlaging met maximale statinedosis. PCSK9-remmers bij zeer hoog risico (LDL-streefwaarde <1,4 mmol/L).", type: 'warn' },
          ],
          therapie: {
            urgent: "Hoog-intensiteit statines (atorvastatine 40-80 mg, rosuvastatine 20-40 mg): LDL-verlaging 50-55%.",
            stappen: [
              { naam: "Toevoegen ezetimib", detail: "extra 15-20% LDL-verlaging." },
              { naam: "PCSK9-remmers toevoegen", detail: "PCSK9-inhibitoren (alirocumab, evolocumab): 50-60% extra reductie, zeer hoog risico of statine-intolerantie." },
            ],
          },
        } },

  { type:'diagnose', d:4, domain:'nephro', dl:'Nefrologie', subtype:'diff',
    q:'Vrouw van 22 jaar, hematurie, proteïnurie 3g/24u, oedeem, hypertensie. Nierbiopsiebevinding: "diffuse mesangiale IgA-deposities" op immunofluorescentie.\n\nDiagnose?',
    a:['IgA-nefropathie (Berger\'s disease)','Henoch-Schönlein purpura nefritis','Lupus nefritis klasse III','Membranoproliferatieve GN'],
    c:0,
    ex:'IgA-nefropathie: mesangiale IgA-deposities op immunofluorescentie + hematurie tijdens (synfaryngitisch) of kort na infectie.',
    wiki:{
          kern: "IgA-nefropathie: meest voorkomende primaire glomerulonefritis (GN) wereldwijd. Presentatie: macroscopische/microscopische hematurie, proteïnurie, hypertensie. 30-40% progressie naar eindstadium nierziekte na 20 jaar.",
          redflag: "IgA-nefropathie met proteïnurie >1 g/24u + hypertensie: hoog risico op progressie naar eindstadium nierziekte. Vroeg starten met ACE-remmer + SGLT2-remmer vertraagt progressie aantoonbaar.",
          mechanisme: [
            { title: "Pathogenese (vier-hit-hypothese)", desc: "Galactose-deficiënt IgA1 (Gd-IgA1) → auto-antilichamen (IgG/IgA tegen Gd-IgA1) → immuuncomplexen → mesangiumdepositie → mesangiumproliferatie en inflammatie." },
            { title: "Synfaryngitische hematurie", desc: "Macroscopische hematurie treedt op tijdens (niet 1-3 weken ná) de infectie — onderscheidend van post-streptokokken GN." },
          ],
          onderscheid: [
            { label: "IgA-vasculitis (Henoch-Schönlein purpura)", desc: "IgA-deposities + palpabele purpura benen + artritis + abdominale pijn — extrarenaale manifestaties.", type: 'ok' },
            { label: "SLE-nefritis", desc: "ANA/anti-dsDNA positief, verlaagd complement (C3/C4), 'full house' immunofluorescentie.", type: 'warn' },
            { label: "Membranoproliferatieve GN", desc: "Aanhoudend verlaagd C3, hypocomplementemie — biopsie nodig voor onderscheid.", type: 'danger' },
          ],
          therapie: {
            urgent: "RAS-blokkade (ACE-remmer of ARB) bij proteïnurie >0,5 g/24u + bloeddrukcontrole.",
            stappen: [
              { naam: "SGLT2-remmer", detail: "Nefroprotectief bij IgA-nefropathie ongeacht diabetes (DAPA-CKD, EMPA-KIDNEY)." },
              { naam: "Corticosteroïden", detail: "Bij matige proteïnurie + progressie ondanks optimale ondersteunende therapie (TESTING-studie)." },
              { naam: "Sparsentan", detail: "Endotheline-1 en angiotensinereceptorantagonist — FDA-goedgekeurd 2023 voor IgA-nefropathie." },
            ],
          },
        } },

  { type:'pharma', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man van 35 jaar, epilepsie, recente diagnose zwangerschap bij zijn partner. Zijn huidige medicament heeft een hoog teratogeen risico. Welk anti-epilepticum heeft het HOOGSTE risico op neuraalbuisdefecten bij blootstelling in de eerste trimester?',
    a:['Valproaat (natriumvalproaat)','Lamotrigine','Levetiracetam','Oxcarbazepine'],
    c:0,
    ex:'Valproaat heeft het hoogste teratogene risico van alle anti-epileptica: neuraalbuisdefecten (1-2%, 10-20× verhoogd vs populatie), hartafwijkingen, gespleten gehemelte, cognitieve stoornissen (verlaagd IQ kind). Lamotrigine en levetiracetam: relatief veiliger maar niet risico-vrij. Valproaat is gecontra-indiceerd bij zwangerschap tenzij geen alternatief.',
    wiki:{
          kern: "Teratogeniciteit anti-epileptica (van hoog naar laag risico): valproaat > carbamazepine/fenytoïne/fenobarbital > lamotrigine ≈ levetiracetam. Valproaat: EURAP-register toont major congenitale malformaties 10.3% bij monotherapie.",
          mechanisme: [
            { title: "Stap 1", desc: "Valproaat: natriumkanaalremmer + GABA-verhoging + NMDA-blokkade. Teratogeniciteit: remming histondeacetylase (epigenetisch)." },
            { title: "Stap 2", desc: "verstoorde gennexpressie embryo." },
            { title: "Stap 3", desc: "NTD (foliumzuur-afhankelijk maar niet volledig beschermd door hoge dosis foliumzuur bij valproaat)." },
          ],
          onderscheid: [
            { label: "EMA/MHRA-beperkingen 2018", desc: "valproaat bij vrouwen in vruchtbare leeftijd: ONLY if geen alternatieven, met pregnancy prevention programme, geïnformeerde toestemming.", type: 'ok' },
            { label: "Overgang naar lamotrigine/levetiracetam", desc: "monitoreer doses (klaring verandert in zwangerschap).", type: 'warn' },
          ],
          therapie: {
            urgent: "Pre-conceptueel: zo mogelijk omzetten naar veiliger alternatief.",
            stappen: [
              { naam: "Stap 1", detail: "Hoge dosis foliumzuur (5 mg/dag) preconceptioneel bij alle vrouwen met AED." },
              { naam: "Stap 2", detail: "Lamotrigine-klaring stijgt sterk in zwangerschap: dosis monitoren (spiegels)." },
              { naam: "Stap 3", detail: "Seizoenvrijheid = hoogste prioriteit (SUDEP-risico)." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie', subtype:'diff',
    q:'Man van 38 jaar, HIV-positief (onbehandeld, CD4+ 45 cellen/µL). Koorts, hoest, dyspnoe. Sputum: PCP-pneumonie (Pneumocystis jirovecii). Saturatie 88%.\n\nEerste behandelingskeuze?',
    a:['Trimetoprim-sulfamethoxazol (TMP-SMX) + prednison','Pentamidine inhalatie','Atovaquon + azithromycine','Fluconazol + amfotericine B'],
    c:0,
    ex:'PCP-pneumonie: eerste keus TMP-SMX (hoge dosis, 15-20 mg/kg TMP per dag, 21 dagen). Bij matige-ernstige PCP (PaO2 <70 mmHg of A-a gradiënt >35): adjuncte prednison 40 mg 2dd gedurende 5 dagen → tapering (vermindert inflammatoire respons bij behandeling). HAART zo snel mogelijk starten (niet tegelijkertijd starten bij ernstig zieke patiënt).',
    wiki:{
          kern: "PCP (Pneumocystis jirovecii pneumonie): meest voorkomende AIDS-definiërende infectie bij CD4 <200. Presentatie: subacuut dyspnoe, droge hoest, koorts.",
          mechanisme: [
            { title: "Stap 1", desc: "Pneumocystis jirovecii: atypische schimmel, inficteert alveolaire epitheelcellen bij immuundeficiëntie." },
            { title: "Stap 2", desc: "alveolair exsudaat." },
            { title: "Stap 3", desc: "verminderde gaswisseling. Cell-mediated immunity (CD4 T-cellen) essentieel voor verdediging." },
          ],
          onderscheid: [
            { label: "Andere opportunistische infecties bij CD4 <200", desc: "toxoplasmose (hersenen, CD4 <100), CMV (retinitis, esofagitis, CD4 <50), MAC (Mycobacterium avium complex, CD4 <50), cryptococcale meningitis (CD4 <100).", type: 'ok' },
            { label: "PCP", desc: "longbeelden dominant.", type: 'warn' },
          ],
          therapie: {
            urgent: "Profylaxe PCP: TMP-SMX 480 mg/dag (1 tablet ds) wanneer CD4 <200.",
            stappen: [
              { naam: "Alternatief", detail: "dapson 100 mg/dag of atovaquon." },
              { naam: "Stap 2", detail: "Stopzetten profylaxe als CD4 >200 gedurende ≥3 maanden op HAART." },
            ],
          },
        } },

  { type:'truefalse', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Bij een acute jichtaanval is het veilig om tijdens de aanval te starten met allopurinol (urinezuurverlager).',
    c:false,
    ex:'NIET WAAR. Starten met allopurinol TIJDENS een acute jichtaanval verlengt en verergert de aanval door mobilisatie van urinezuurkristallen. Behandel eerst de aanval (NSAID\'s, colchicine of corticosteroïden), wacht 2-4 weken na volledige remissie, en start dan pas allopurinol. Als de patiënt al allopurinol gebruikte: NIET stoppen tijdens aanval.',
    wiki:{
          kern: "Jicht pathofysiologie: hyperurikemie → monosodiumulraatvkristallen (MSU) in gewrichten → fagocytose macrofagen/neutrofielen → IL-1β, IL-6, TNF → acute inflammatie. MTP-1 gewricht (grote teen) meest aangedaan.",
          mechanisme: [
            { title: "Stap 1", desc: "Allopurinol: xanthine-oxidase-remmer." },
            { title: "Stap 2", desc: "minder urinezuurproductie." },
            { title: "Stap 3", desc: "daling serumurinezuur. Bij acuut starten: snelle urinezuurdalig." },
            { title: "Stap 4", desc: "mobilisatie MSU-kristallen uit gewrichten." },
            { title: "Stap 5", desc: "aanval verergert (mobilisatieaanval). Febuxostat: alternatieve xanthine-oxidase-remmer." },
          ],
          onderscheid: [
            { label: "Acute jicht", desc: "NSAID\\'s (indometacine, naproxen) of colchicine 0.5 mg 2-3dd of corticosteroïden (bij contra-indicaties).", type: 'ok' },
            { label: "Optie 2", desc: "IL-1-antagonisten (anakinra, canakinumab) bij refractaire jicht.", type: 'warn' },
          ],
          therapie: {
            urgent: "Chronische jicht: allopurinol (100 mg opbouwen tot 200-300 mg/dag), streef serumurinezuur <360 µmol/L (<360 voor patiënten met tofus).",
            stappen: [
              { naam: "Levensstijl", detail: "dieet (minder vlees/alcohol/fructose), adequate hydratatie." },
              { naam: "Stap 2", detail: "Profylaxe aanvallen bij start allopurinol: colchicine 0.5 mg/dag gedurende 6 maanden." },
            ],
          },
        } },

  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie', subtype:'diff',
    q:'Man 42j met psoriasisplaques: plotse zwelling van de gehele 3e vinger rechts ("dakworstvinger"), pijn in de Achillespees, asymmetrische artritis. RF en anti-CCP negatief. Diagnose?',
    a:['Reumatoïde artritis','Jicht','Artritis psoriatica','Reactieve artritis'], c:2,
    ex:'Artritis psoriatica: dactylitis (dakworstvinger = zwelling volledige vinger/teen) + enthesitis (peesinserties) + psoriasis. RF/anti-CCP negatief = seronegatiever artropathie. Onderscheid van RA: asymmetrisch, DIP-gewrichten aangedaan, dactylitis. Behandeling: NSAID → MTX → biologicals (TNF-i of IL-17-i).',
    wiki:{
          kern: "Artritis psoriatica (PsA) treedt op bij 20-30% van patiënten met psoriasis. Vijf patronen: (1) asymmetrisch oligoarticulair (meest frequent), (2) RA-achtig symmetrisch, (3) DIP-artritis, (4) spondylitis/sacroiliitis, (5) arthritis mutilans.",
          mechanisme: [
            { title: "Stap 1", desc: "IL-17A en IL-23 zijn centrale mediatoren — verklaart werkzaamheid IL-17-remmers (secukinumab, ixekizumab)." },
            { title: "Enthesitis", desc: "ontsteking op pees-botverbinding (Achillespees, plantaire fascia)." },
            { title: "Stap 3", desc: "Huidziekteactiviteit correleert niet altijd met gewrichtsactiviteit — behandel beide afzonderlijk indien nodig." },
          ],
          onderscheid: [
            { label: "RA", desc: "symmetrisch, RF/anti-CCP positief, géén dactylitis, MCP/PIP > DIP.", type: 'ok' },
            { label: "Jicht", desc: "acuut monoarticulair, hyperurikemie, MSU-kristallen punctaat.", type: 'warn' },
            { label: "Reactieve artritis", desc: "na infectie (Chlamydia, darminfectie), urethritis + conjunctivitis + artritis.", type: 'danger' },
            { label: "AS", desc: "axiale betrokkenheid dominant, géén psoriasis.", type: 'warn' },
          ],
          therapie: {
            urgent: "Milde huid + gewrichten: NSAID + lokale psoriasistherapie.",
            stappen: [
              { naam: "Matig-ernstig gewricht", detail: "methotrexaat." },
              { naam: "Biologicals bij MTX-falen", detail: "TNF-remmers (adalimumab), IL-17-remmer (secukinumab), IL-12/23-remmer (ustekinumab), JAK-remmer (tofacitinib)." },
              { naam: "Stap 3", detail: "Geen hydroxychloroquine (kan psoriasis verergeren)." },
            ],
          },
        } },

  { type:'truefalse', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Bij verdenking op reuzencelarteritis (GCA) met acute visusdaling moet men wachten op de temporalisbiopsie vóór starten van corticosteroïden.',
    c:false,
    ex:'NIET WAAR. Acuut visusverlies bij GCA is irreversibel — geen minuut wachten! Direct prednisolon 60 mg/dag starten. De temporalisbiopsie blijft tot 2 weken na start prednisolon betrouwbaar positief. Ogen redden = absolute prioriteit. Kaakclaudicatie en hoofdpijn zijn aanwijzingen voor GCA.',
    wiki:{
          kern: "Reuzencelarteritis (GCA) is een granulomateuze vasculitis van middelgrote en grote vaten bij >50 jaar (piek 70-80j). Ernstigste complicatie: ischemische opticusneuropathie → permanente blindheid (10-20% onbehandeld).",
          mechanisme: [
            { title: "Stap 1", desc: "CD4+ T-cel- en macrofaag-gemedieerde granulomateuze ontsteking van de vaatwand." },
            { title: "Stap 2", desc: "reuzen­cellen." },
            { title: "Stap 3", desc: "intimahyperplasie." },
            { title: "Stap 4", desc: "vasculaire occlusie." },
            { title: "Stap 5", desc: "ischemie distaal. Aangedane vaten: arteria temporalis, arteria ophthalmica, aorta en takken. BSE en CRP sterk verhoogd (BSE >50, vaak >100 mm/u)." },
          ],
          onderscheid: [
            { label: "PMR zonder GCA", desc: "geen craniale symptomen, geen kaakclaudicatie, BSE verhoogd maar ook te zien bij PMR.", type: 'ok' },
            { label: "Migraine", desc: "BSE normaal, jongere leeftijd, pulserende pijn.", type: 'warn' },
            { label: "Hypertensieve hoofdpijn", desc: "bilateraal, BD verhoogd.", type: 'danger' },
            { label: "Trigeminusneuralgie", desc: "elektrische pijnaanvallen, kort.", type: 'warn' },
          ],
          therapie: {
            urgent: "Hoge dosis prednisolon direct: 40-60 mg/dag (60 mg bij dreigende visusverlies).",
            stappen: [
              { naam: "Stap 1", detail: "Biopsie plannen maar NIET afwachten." },
              { naam: "Bij florid visusverlies", detail: "IV methylprednisolon 1g/dag 3 dagen." },
              { naam: "Tocilizumab (anti-IL-6R)", detail: "aanbevolen bij recidiverende/refractaire GCA → minder prednisolon nodig." },
              { naam: "Stap 4", detail: "Afbouwen over 18-24 maanden." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'rheum', dl:'Reumatologie',
    q:'Anti-CCP-antistoffen zijn specifieker voor reumatoïde artritis dan reumafactor (RF).',
    c:true,
    ex:'WAAR. Anti-CCP heeft ~98% specificiteit voor RA vs ~80% voor RF. RF is ook positief bij Sjögren (75%), SLE, hepatitis C en bij 5-10% van gezonde ouderen. Anti-CCP is bovendien al aantoonbaar jaren vóór klinische ziekte — bruikbaar als vroegmarker.',
    wiki:{
          kern: "Anti-CCP (anti-citrullinated peptide antibodies) herkent citrulline-bevattende eiwitten. Specificiteit voor RA: ~98%.",
          mechanisme: [
            { title: "Stap 1", desc: "Reumafactor (RF) = IgM-autoantistof gericht tegen Fc-deel van IgG." },
            { title: "Specificiteit slechts ~80%", desc: "ook positief bij Sjögren (75-90%), SLE, bacteriële endocarditis, hepatitis C, en bij 5-10% gezonde ouderen (piek >70j)." },
            { title: "Combinatie RF + anti-CCP", desc: "specificiteit >99%." },
          ],
          onderscheid: [
            { label: "Seronegatieve RA", desc: "RF en anti-CCP negatief, diagnose op klinische criteria (2010 ACR/EULAR).", type: 'ok' },
            { label: "Optie 2", desc: "Kan toch erosief beloop hebben.", type: 'warn' },
            { label: "Andere oorzaken van positieve RF", desc: "subacuut bacteriële endocarditis, primair Sjögren, cryoglobulinemie, sarcoidose.", type: 'danger' },
          ],
          therapie: {
            urgent: "Anti-CCP-titer wordt niet routinematig herhaald voor behandelrespons — daarvoor gebruikt men DAS28, CDAI of SDAI (klinische activiteitsscores).",
            stappen: [
              { naam: "Stap 1", detail: "Hoog anti-CCP bij diagnose → agressievere behandelstrategie overwegen (direct combinatietherapie)." },
            ],
          },
        } },

  { type:'lab', d:4, domain:'rheum', dl:'Reumatologie', subtype:'test',
    q:'Vrouw 29j, polyarthritis + vlindervormige uitslag + proteïnurie 1.8 g/dag:\nANA 1:640 positief\nAnti-dsDNA sterk positief\nC3 0.45 g/L (↓)\nC4 0.07 g/L (↓)\nAnti-CCP negatief\n\nWelk mechanisme verklaart het verlaagde complement?',
    a:['Verminderde aanmaak in de lever door ontsteking','Verlies via de nier door proteïnurie','Verbruik door immuuncomplexdepositie','Genetisch complement­deficiëntie'], c:2,
    ex:'SLE: complement (C3/C4) daalt door VERBRUIK — immuuncomplexen activeren het klassieke complement­systeem → C3/C4 worden opgebruikt. Stijgend anti-dsDNA + dalend C3/C4 = dreigende flare of actieve lupusnefritis. Dit is de meest bruikbare combinatie-biomarker voor ziekteactiviteit bij SLE.',
    wiki:{
          kern: "Bij SLE worden anti-dsDNA-antilichamen gevormd → binden dsDNA → immuuncomplexen → neerslaan in glomeruli, huid, gewrichten → klassieke complementactivering (C1q → C4 → C3 → MAC) → weefselschade. C3 en C4 worden verbruikt → serumspiegels dalen.",
          mechanisme: [
            { title: "Stap 1", desc: "Klassieke route: C1q herkent immuuncomplexen." },
            { title: "Stap 2", desc: "C4 en C2 splitsing." },
            { title: "Stap 3", desc: "C3-convertase." },
            { title: "Stap 4", desc: "C3a + C3b." },
            { title: "Stap 5", desc: "C5-convertase." },
          ],
          onderscheid: [
            { label: "Verminderde aanmaak", desc: "leverziekte (cirrose) → alle factoren laag, maar acute-fasereactanten (CRP, fibrinogeen) ook laag.", type: 'ok' },
            { label: "Genetisch deficiëntie", desc: "zeldzaam, aanwezig van geboorte.", type: 'warn' },
            { label: "Verlies via nier", desc: "nefrotisch syndroom verliest grotere eiwitten (albumine, IgG) maar complement is kleiner en verlies is minder prominent.", type: 'danger' },
          ],
          therapie: {
            urgent: "Stijging anti-dsDNA + daling C3/C4 → anticipeer op flare.",
            stappen: [
              { naam: "Stap 1", detail: "Bij actieve lupusnefritis (klasse III/IV): mycofenolaatmofetil + prednisolon." },
              { naam: "Belimumab (anti-BLyS)", detail: "vermindert flares." },
              { naam: "Voclosporin of obinutuzumab", detail: "nieuwer bij nefritis." },
              { naam: "Hydroxychloroquine", detail: "altijd als basisbehandeling." },
            ],
          },
        } },

  // ── PSYCHIATRIE — aanvullende vragen ──
  { type:'diagnose', d:4, domain:'psych', dl:'Psychiatrie', subtype:'diff',
    q:'Man 77j: dementie + gedetailleerde visuele hallucinaties (kinderen die hij duidelijk ziet) + licht Parkinsonisme + bewustzijn wisselt sterk per dag. Diagnose?',
    a:['Alzheimer','Vasculaire dementie','Lewy Body dementie','Frontotemporale dementie'], c:2,
    ex:'Lewy Body dementie: dementie + ≥2 van: gedetailleerde visuele hallucinaties, Parkinsonisme, fluctuerend bewustzijn, REM-slaapgedragsstoornis. KRITIEK: antipsychotica zijn levensgevaarlijk bij DLB — "neuroleptic sensitivity" → ernstige rigiditeit en bewustzijnsdaling. Cholinesterase­remmers (rivastigmine) helpen wél.',
    wiki:{
          kern: "Lewy Body dementie (DLB) is de op-twee-na meest voorkomende dementie. Gekenmerkt door α-synucleïne-aggregaten in cortex én hersenstam.",
          mechanisme: [
            { title: "Stap 1", desc: "Onderscheid DLB vs Parkinson-dementie: bij DLB treedt dementie vóór of gelijktijdig met het motorische beeld op; bij Parkinson-dementie is het motorische beeld ≥1 jaar eerder. α-Synucleïne beschadigt cholinerge en dopaminerge neuronen → corticale + subcorticale disfunctie." },
            { title: "DaT-scan", desc: "verminderde dopaminetransporter-opname (ook bij Parkinson, niet bij Alzheimer)." },
          ],
          onderscheid: [
            { label: "Alzheimer", desc: "geheugenverlies dominant, geen vroege hallucinaties, geen Parkinsonisme, MRI: bitemporaal/hippocampaal atrofie.", type: 'ok' },
            { label: "Vasculaire dementie", desc: "stapsgewijze achteruitgang, HVS op MRI.", type: 'warn' },
            { label: "FTD", desc: "gedragsverandering + taal dominant, leeftijd <65.", type: 'danger' },
            { label: "Delier", desc: "acuut reversibel, onderliggend somatisch.", type: 'warn' },
          ],
          therapie: {
            urgent: "Rivastigmine (cholinesterase­remmer): verbetert cognitie én hallucinaties bij DLB.",
            stappen: [
              { naam: "CAVE antipsychotica", detail: "50% kans op ernstige neuroleptic sensitivity-reactie." },
              { naam: "Als toch nodig", detail: "quetiapine of clozapine in minimale dosis." },
              { naam: "L-dopa voor Parkinsonisme (voorzichtig", detail: "kan hallucinaties verergeren)." },
              { naam: "Stap 4", detail: "Clonazepam voor REM-slaap-gedragsstoornis." },
            ],
          },
        } },

  { type:'diagnose', d:4, domain:'psych', dl:'Psychiatrie',
    q:'Patiënt 36u na start haloperidol: koorts 39.8°C, gegeneraliseerde "lead pipe" spierstijfheid, wisselend bewustzijn, CK 14.000 IE/L. Diagnose?',
    a:['Serotoninesyndroom','Maligne hyperthermie','Neuroleptic Malignant Syndrome','Thyreotoxische crisis'], c:2,
    ex:'NMS: tetrade koorts + lead pipe rigiditeit + bewustzijnsschommeling + autonome instabiliteit na antipsychoticum. CK sterk verhoogd door spierischemie. Stop antipsychoticum direct. Dantroleen + bromocriptine + IC. Onderscheid van serotoninesyndroom: myoclonus/tremor i.p.v. rigiditeit, sneller begin (uren), na serotonerg middel.',
    wiki:{
          kern: "Neuroleptic Malignant Syndrome (NMS): levensbedreigende reactie op dopamineblokkerende middelen (antipsychotica, metoclopramide). Mortaliteit onbehandeld tot 20%.",
          mechanisme: [
            { title: "Stap 1", desc: "Abrupte D2-blokkade in striatum." },
            { title: "Stap 2", desc: "rigiditeit + hyperthermie. Hoge CK door ischemische spiernecrose bij rigiditeit. Myoglobinurie." },
            { title: "Stap 3", desc: "acuut nierfalen. Niet genetisch bepaald — onderscheidt van maligne hyperthermie (RYR1-mutatie bij inhalatieanesthetica)." },
          ],
          onderscheid: [
            { label: "Serotoninesyndroom", desc: "tremor/myoclonus (niet lead pipe), agitatie, pupildilatatie, diarree, sneller begin (uren na serotonerg middel zoals SSRI+MAOI, tramadol).", type: 'ok' },
            { label: "Maligne hyperthermie", desc: "bij inhalatieanesthetica (halothaan, succinylcholine).", type: 'warn' },
            { label: "Thyreotoxische crisis", desc: "geen rigiditeit, hoge FT4/lage TSH, schildklieranamnese.", type: 'danger' },
          ],
          therapie: {
            urgent: "Stop antipsychoticum direct.",
            stappen: [
              { naam: "Stap 1", detail: "Dantroleen IV (remt Ca²⁺-release uit sarcoplasmatisch reticulum → vermindert rigiditeit + hyperthermie)." },
              { naam: "Stap 2", detail: "Bromocriptine (dopamineagonist)." },
              { naam: "Stap 3", detail: "Actieve koeling." },
              { naam: "Stap 4", detail: "IV vloeistof ter preventie nierfalen." },
              { naam: "Stap 5", detail: "Herostart antipsychoticum pas na ≥2 weken, ander preparaat, laagste effectieve dosis." },
            ],
          },
        } },

  { type:'pharma', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Man 48j met bipolaire stoornis op lithiumonderhoud: tremor, ataxie, dysartrie, braken. Lithiumspiegel 2.6 mmol/L (therapeutisch: 0.6-1.0). Eerste stap?',
    a:['Lithiumdosis halveren en controleren','Lithium direct staken + agressieve IV-hydratatie','Dantroleen toedienen','Naloxon toedienen'], c:1,
    ex:'Lithiumtoxiciteit (spiegel >2 mmol/L = ernstig): stop lithium + IV NaCl 0.9% agressief (herstel Na-uitscheiding → verhoogt renale lithiumklaring). Hemodialyse bij spiegel >3.5 mmol/L of nierfalen. Valkuil: NSAID, diuretica en ACE-remmers verhogen lithiumspiegel — altijd medicatielijst controleren.',
    wiki:{
          kern: "Lithium heeft een smal therapeutisch venster: 0.6-1.0 mmol/L (onderhoud), 0.8-1.2 (acute manie). Toxiciteit: mild >1.5, matig-ernstig >2.0, levensbedreigend >2.5 mmol/L.",
          mechanisme: [
            { title: "Stap 1", desc: "Lithium wordt renaal uitgescheiden in competitie met natrium. Bij natriumdepletie (dehydratie, diuretica, NSAID, ACE-remmer)." },
            { title: "Stap 2", desc: "meer lithiumterugresorptie." },
            { title: "Stap 3", desc: "accumulatie. NSAID: verlagen GFR." },
            { title: "Stap 4", desc: "minder lithiumklaring. Thiaziden: proximale tubulus retentieparadox." },
          ],
          onderscheid: [
            { label: "NMS", desc: "na antipsychoticum, lead pipe rigiditeit, hoge CK, koorts.", type: 'ok' },
            { label: "Serotoninesyndroom", desc: "myoclonus, agitatie, diarree bij serotonerg middel.", type: 'warn' },
            { label: "Cerebellair infarct", desc: "acuut begin, MRI.", type: 'danger' },
            { label: "Wernicke-encefalopathie", desc: "thiaminedeficiëntie, ophtalmoplegie, ataxie, confusie.", type: 'warn' },
          ],
          therapie: {
            urgent: "Mild (<1.5): orale vloeistof + dosis aanpassen.",
            stappen: [
              { naam: "Matig (1.5-3.0)", detail: "stop lithium + IV NaCl 0.9% agressief." },
              { naam: "Ernstig (>3.0 of nierfalen)", detail: "hemodialyse." },
              { naam: "Preventie", detail: "NSAID vermijden, adequate hydratatie, regelmatige spiegelcontrole (elke 3-6 maanden), nierfunctie jaarlijks." },
            ],
          },
        } },

  { type:'truefalse', d:2, domain:'psych', dl:'Psychiatrie',
    q:'Een directe vraag over suïcidegedachten ("Denkt u aan zelfdoding?") verhoogt het risico op een suïcidepoging bij depressieve patiënten.',
    c:false,
    ex:'NIET WAAR. Hardnekkige mythe. Onderzoek toont consistent dat bevragen van suïcidegedachten het risico NIET verhoogt — en bij kwetsbare patiënten verlichting kan geven ("eindelijk iemand die het vraagt"). Niet bespreken = kans missen. Altijd rechtstreeks bevragen bij verdenking depressie of risicovolle situatie.' },

  { type:'truefalse', d:3, domain:'psych', dl:'Psychiatrie',
    q:'SSRI-monotherapie (zonder stemmingsstabilisator) is een veilige behandeling voor een depressieve episode bij bipolaire stoornis type I.',
    c:false,
    ex:'NIET WAAR. SSRI-monotherapie bij bipolaire stoornis kan een manische switch uitlokken — risico 20-40% bij type I. Eerste keuze bipolaire depressie: quetiapine, lithium of lamotrigine. Als SSRI wordt toegevoegd: altijd gecombineerd met een stemmingsstabilisator.',
    wiki:{
          kern: "Bipolaire depressie is de meest voorkomende fase en de moeilijkst te behandelen. Fout: behandelen als unipolaire depressie → antidepressivum-geïnduceerde switch naar manie.",
          mechanisme: [
            { title: "Stap 1", desc: "Antidepressiva verhogen monoaminerge transmissie → verlagen drempel voor manie (via dopamine/noradrenaline)." },
            { title: "Stap 2", desc: "Lamotrigine (glutamaatremmer via Na-kanaalstabilisatie)." },
            { title: "Stap 3", desc: "Valproaat en lithium werkzaam voor alle fasen." },
            { title: "Switch-risico", desc: "hoger bij type I dan type II, hoger bij tri­cyclische antidepressiva dan SSRI." },
          ],
          onderscheid: [
            { label: "Unipolaire depressie", desc: "SSRI is eerste keuze, geen manische switch.", type: 'ok' },
            { label: "Bipolair type II", desc: "lager switch-risico dan type I maar toch terughoudend.", type: 'warn' },
            { label: "Cyclothymie", desc: "SSRI kan destabiliseren.", type: 'danger' },
            { label: "Psychotische depressie", desc: "antidepressivum + antipsychoticum of ECT.", type: 'warn' },
          ],
          therapie: {
            urgent: "Bipolaire depressie voorkeur: quetiapine 50-300 mg/nacht, lithium (suïcideprotectief!), lamotrigine (langzaam opbouwen, SJS-risico bij te snel ophogen).",
            stappen: [
              { naam: "Stap 1", detail: "Combineer SSRI altijd met stemmingsstabilisator." },
              { naam: "Stap 2", detail: "CGT als aanvulling." },
              { naam: "Stap 3", detail: "Psycho-educatie over switch-signalen." },
            ],
          },
        } },

];