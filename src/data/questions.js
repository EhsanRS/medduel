// MedDuel — Trivia vragenbank
// Structuur: { type, domain, dl (display label), q, a (answers), c (correct index), ex (explanation) }
// Types: 'diagnose' | 'truefalse' | 'pharma' | 'lab'
// Domains: 'cardio' | 'neuro' | 'pharma' | 'infectio' | 'lab'

const QUESTIONS = [
  // ── CARDIOLOGIE ──
  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man van 55 jaar: drukkende thoraxpijn uitstralend naar de linkerarm, zweten, misselijkheid. Meest waarschijnlijke diagnose?',
    a:['STEMI','Longembolie','Aortadissectie','Pancreatitis'], c:0,
    ex:'Klassieke STEMI-presentatie: drukkende pijn, uitstraling, vegetatieve verschijnselen. Directe PCI binnen 90 min!',
    wiki:{ kern:'STEMI (ST-elevatie myocardinfarct) is een acuut hartinfarct door complete afsluiting van een coronairarterie. Elke minuut vertraging = meer myocardschade. Het hart heeft slechts 20-40 minuten voordat irreversibele necrose begint.', mechanisme:'Atherosclerotische plaque ruptureert → bloedplaatjes aggregeren → trombus sluit coronairarterie volledig af → transmuraal infarct (volle dikte van hartspier). ST-elevatie op ECG = transmuraal letsel. Vrijkomen troponine/CK-MB bevestigt necrose.', onderscheid:'NSTEMI: geen ST-elevatie, partiële occlusie, troponine verhoogd. Pericarditis: diffuse saddle-shape ST, pleuritische pijn. Longembolie: rechterbelastingspatroon (S1Q3T3), geen regionale ST-elevatie. Aortadissectie: verscheurende pijn, bloeddrukasymmetrie — trombolyse is dan fataal!', therapie:'"MONA": Morfine (pijn), Zuurstof (bij SpO₂<94%), Nitro (bij stabiele BD), Aspirine 300 mg + P2Y12-remmer (ticagrelor). Urgente PCI binnen 90 min. Heparine bridging. Bij PCI niet beschikbaar: trombolyse <30 min na deur. Daarna: statine, bètablokker, ACE-remmer.' } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'ECG: geen P-toppen, irregulair ritme met "zagtand" baseline. Frequentie 150/min. Diagnose?',
    a:['Atriumfibrilleren','Atriumflutter','Ventriculaire tachycardie','WPW-syndroom'], c:1,
    ex:'Atriumflutter: F-golven (zagtand), typisch regulier 2:1-blok → 150/min. AF is juist irregulair zonder F-golven.',
    wiki:{ kern:'Atriumflutter is een snel maar georganiseerd atriumritme (~300/min) door een re-entry circuit in het rechter atrium (typisch round the tricuspidalisklep). De AV-knoop geleidt niet elke prikkel door — typisch 2:1 blokkering → ventrikelfrequentie ~150/min, regelmatig.', mechanisme:'Grote re-entry lus in het rechteratrium (isthmusdependente flutter). In tegenstelling tot AF zijn er herkenbare F-golven (zagtand) in afleidingen II, III, aVF en V1. Omdat het ritme regulier is, is het soms moeilijker te onderscheiden van sinustachycardie of AVNRT zonder carotismassage/adenosine.', onderscheid:'AF: absoluut irregulaire respons, geen F-golven. Sinustachycardie: regelmatig, P-toppen aanwezig vóór elk QRS. AVNRT: plotse start/stop, P-toppen verborgen in of achter QRS. Volledig AV-blok met junctionaal escape: langzaam regulier ritme, P-toppen los van QRS.', therapie:'Frequentiecontrole: bètablokker of calciumantagonist. Cardioversie: elektrisch (lage energie effectief bij flutter) of farmacologisch. Catheterablatie: bij recidieven hoog succes (>95%) — curatief door onderbreken isthmus. Anticoagulatie: zelfde als bij AF (tromboserisico).' } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Vrouw van 68j: kortademig bij inspanning, bilateraal enkelloedeem, verhoogde CVD, crepitaties basaal. Diagnose?',
    a:['Longembolie','Decompensatio cordis','COPD-exacerbatie','Nefrotisch syndroom'], c:1,
    ex:'Decompensatio cordis: stuwing links (crepitaties) én rechts (oedeem, verhoogde CVD). Klassieke presentatie.',
    wiki:{ kern:'Acuut hartfalen (decompensatio cordis) is het plotse onvermogen van het hart om voldoende bloed rond te pompen. Linksdecompensatie stuft vocht in de longen (orthopneu, nachtelijke dyspneu, crepitaties). Rechtsdecompensatie stuwt vocht in de venen (enkels, buik, verhoogde CVD).', mechanisme:'Het falende hart activeert compensatiemechanismen: RAAS-activatie houdt water vast (meer vulling → meer pompkracht), sympathicus verhoogt hartfrequentie. Deze compensatie werkt tijdelijk maar overbelast het hart. Bij acute decompensatie treedt overstromingsoedeem op.', onderscheid:'Longembolie: ook plotse dyspneu maar géén crepitaties, wél pleuritische pijn en D-dimeer verhoogd. Pneumonie: koorts, purulent sputum, eenzijdige infiltraten. Tamponade: stuwing maar juist stille longen en gedempte harttonen.', therapie:'Acuut: rechtopzitten, zuurstof, furosemide IV (50-80 mg), nitraten bij normotensie. Monitor: diurese, saturatie, bloeddruk. Onderhoudsbehandeling zoals HFrEF of HFpEF (zie aldaar).' } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 45j: plotse "scheurende" interscapulaire pijn, bloeddrukasymmetrie > 20 mmHg. Urgente diagnose?',
    a:['STEMI','Aortadissectie','Longembolie','Pericard­tamponade'], c:1,
    ex:'Aortadissectie: scheurend karakter, interscapulair, bloeddrukasymmetrie. CT-angio is diagnostisch. Levensbedreiging!',
    wiki:{ kern:'Aortadissectie ontstaat wanneer de binnenste laag van de aortawand (intima) scheurt en bloed tussen de wandlagen dringt. Het is een van de meest levensbedreigende spoedgevallen — mortaliteit stijgt 1-2% per uur zonder behandeling.', mechanisme:'Langdurige hypertensie verzwakt de aortawand (cystische medianecrose). Bij de scheur dringt bloed in de valse lumen → kompressie van echte lumen en zijarteries → uitval van organen of ledematen. Type A: opstijgende aorta (60%) → risico op tamponade, MI, CVA. Type B: dalende aorta.', onderscheid:'STEMI: pijn uitstralend naar kaak/arm, geen bloeddrukasymmetrie, ECG-veranderingen. Longembolie: pleuritische pijn, geen asymmetrie, D-dimeer hoog. Aorta-aneurysma: chronisch aanwezig, pijn pas bij expansie/ruptuur. Pericarditis: houdingsafhankelijk, saddle-shape ECG.', therapie:'Type A: spoedindicatie voor chirurgie (vervanging opstijgende aorta). Type B: bloeddrukcontrole met IV bètablokker (labetalol/esmolol), doelRR <120 systolisch. Endovasculaire stentplaatsing (TEVAR) bij complicaties. CT-angio bevestigt diagnose.' } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Digoxine verhoogt de hartfrequentie en is geïndiceerd bij tachycardieën om het hart sneller te laten pompen.',
    c:false, ex:'NIET WAAR. Digoxine verlaagt de HF (negatief chronotroop) via vagale stimulatie. Gebruikt bij AF met snelle ventrikelrespons.',
    wiki:{ kern:'Digoxine remt Na⁺/K⁺-ATPase → intracellulair Na⁺ stijgt → Ca²⁺ hoopt op → sterkere contractie (positief inotroop). Tegelijk stimuleert het de nervus vagus → tragere AV-knoopgeleiding → lagere ventrikelrespons bij AF.', mechanisme:'Smal therapeutisch venster: toxisch al boven 2 ng/ml. Hypokaliëmie verhoogt toxiciteit (K⁺ en digoxine concurreren om Na⁺/K⁺-ATPase) — altijd kalium corrigeren bij digoxinegebruik!', onderscheid:'Bètablokkers en verapamil/diltiazem verlagen ook de ventrikelrespons bij AF — méér effectief en veiliger als eerstekeus. Digoxine heeft voordeel bij hartfalen met lage EF: naast frequentiecontrole ook inotroop effect.' } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Een normaal ECG sluit een acuut myocardinfarct volledig uit.',
    c:false, ex:'NIET WAAR. Bij een NSTEMI of posterieur infarct kan het ECG initieel normaal zijn. Troponines zijn essentieel!' },

  // ── NEUROLOGIE ──
  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 72j: plotse uitval rechterarm/-been en spraak. Na 45 minuten volledig hersteld. Diagnose?',
    a:['Herseninfarct','TIA','Epileptisch insult','Migraine met aura'], c:1,
    ex:'TIA herstelt per definitie binnen 24u. Hoog recidiefrisico: ABCD2-score bepalen en direct behandelen!',
    wiki:{ kern:'Een TIA (transient ischaemic attack) is een korte episode van focale neurologische uitval door tijdelijke ischemie, volledig herstellend binnen 24u (meestal <1u). Het is een ernstig waarschuwingssignaal: 10-15% krijgt binnen 3 maanden een CVA, risico is hoogst in de eerste 48u.', mechanisme:'Oorzaken zijn gelijk aan herseninfarct: cardiale embolieën (AF, kunstkleppen), atherosclerose van grote vaten (carotis), lacunaire infarcten bij hypertensie. MRI-DWI toont bij 30-50% van "TIA"-patiënten toch een klein diffusie-positief infarctje.', onderscheid:'CVA: zelfde presentatie maar geen herstel binnen 24u, DWI-positief op MRI. Epileptisch insult: motorische Jacksonian march, post-ictale fase, positief. Migraine-aura: langzamer opbouw (20-30 min), visuele fenomenen, geen negatieve uitval. Hypoglykemie: altijd uitsluiten met glucosemeting.', therapie:'Spoed: aspirine 300 mg direct. ABCD²-score ≥4: opname voor monitoring en onderzoek (ECG/Holter, echocardiografie, carotisecho). Anticoagulatie bij AF. Carotisendarterectomie bij >70% stenose. Bloeddruk, statine, antidiabeticum optimaliseren.' } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 45j: nekstijfheid, fotofobie, koorts 39.5°C, positief teken van Kernig. Urgentie?',
    a:['Migraine','Subarachnoïdale bloeding','Bacteriële meningitis','Encefalitis'], c:2,
    ex:'Meningeale prikkeling + koorts = bacteriële meningitis tot tegendeel bewezen. Directe antibiotica, geen LP afwachten!',
    wiki:{ kern:'Bacteriële meningitis is een ontsteking van de hersenvliezen door bacteriën. Het klassieke trio: koorts + nekstijfheid + fotofobie/fono­fobie. Mortaliteit is 20-30% — elke minuut vertraging in antibiotica vergroot het risico op overlijden of ernstige restverschijnselen (doofheid, cognitieve schade).', mechanisme:'Bacteriën bereiken de liquorruimte via hematogene spreiding of directe inokula­tie. In de subarachnoidale ruimte is het immuunsysteem zwak → bacteriën repliceren ongestoord → massiève ontsteking → verhoogde hersendruk → infarct en hersenletsel. S. pneumoniae (volwassenen) en N. meningitidis (jongeren).', onderscheid:'Virale meningitis: milder beloop, lymfocytaire pleocytose, normaal glucose, geen/lage koorts. SAB: thunderclap hoofdpijn maar geen koorts. Encefalitis: bewustzijnsdaling + gedragsverandering (=hersenparenchym aangedaan). Herpes-encefalitis: temporale MRI-afwijkingen, aciclovir direct.', therapie:'Cefotaxim/ceftriaxon + dexamethason (15-30 min vóór of gelijktijdig met AB — vermindert hersenletsel). Bloedkweken afnemen maar NIET wachten op LP of CT als er tekenen zijn van druk. LP na stabilisatie. Isolatie eerste 24u. Profylaxe contacten bij meningokokken.' } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 58j: rusttremor, bradykinesie, hypomimie, kleine passen. Diagnose?',
    a:['Essentiële tremor','Huntington','Parkinson','MS'], c:2,
    ex:'Parkinson: de 4 kardinale symptomen zijn rusttremor, rigiditeit, bradykinesie en posturale instabiliteit. Hypomimie is typisch.',
    wiki:{ kern:'Parkinson ontstaat door verlies van dopaminerge neuronen in de substantia nigra. Pas als ~80% verloren is, worden klachten merkbaar. Dopamine faciliteert vloeiende beweging — tekort eraan laat de remmende circuits overheersen → traagheid, rigiditeit, tremor.', mechanisme:'Lewy-lichaampjes (alfa-synuclein aggregaten) zijn het pathologische kenmerk. L-DOPA (dopamineprecursor) is de meest effectieve behandeling, maar verliest na jaren effectiviteit (wearing off) en kan dyskinesieën geven bij langdurig gebruik.', onderscheid:'Essentiële tremor: houdingstremor (niet in rust), geen bradykinesie/rigiditeit, familair, reageert op propranolol. Parkinson-plus syndromen (MSA, PSP): parkinsonisme + extra verschijnselen (vallen, autonome uitval, oogbewegingsstoornissen). Geneesmiddelgeïnduceerd parkinsonisme (antipsychotica, metoclopramide): reversibel bij staken.' } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 28j: visuele stoornissen, daarna zwakte been, maanden later tintelingen arm. MRI: lesies verspreid in tijd en ruimte.',
    a:['ALS','Multiple Sclerose','Guillain-Barré','Myasthenia Gravis'], c:1,
    ex:'MS: demyeliniserende aandoening, lesies verspreid in tijd én ruimte. Typisch bij jonge vrouwen (F:M = 3:1).',
    wiki:{ kern:'Multiple sclerose (MS) is een chronische auto-immuun demyeliniserende aandoening van het centraal zenuwstelsel. Auto-reactieve T-cellen beschadigen myeline → vertraagde of geblokkeerde zenuwgeleiding. Kenmerk: lesies "gescheiden in tijd en plaats" — episodes van verschillende neurologische uitval die opklaren maar terugkomen.', mechanisme:'Oligodendrocyten (myelineproduce­rende cellen in de hersenen) worden aangevallen. Na demyelinisatie: gedeeltelijk herstel door remyelinisatie, maar ook axonale schade. Bij schubs: actieve inflammatie. Progressieve fase: chronische neurodestructie zonder actieve ontsteking. Uitlokkers schub: infecties, koorts, stress.', onderscheid:'NMO (neuromyelitis optica): ernstigere aanvallen, myelitis + opticus neuritis tegelijk, anti-AQP4 antilichamen positief. ADEM: eenmalige episode na infectie/vaccinatie, kinderen, behandeling met steroïden. ALS: geen remissies, geen sensibiliteit, motorisch alleen. Vasculaire WS-afwijkingen: geen aanvallen, ouderen.', therapie:'Schub: methylprednisolon IV 3-5 dagen (verkort duur, niet effect op lange termijn). Ziektemodificerende therapie (DMT): interferon-beta, glatirameracetat (milde MS) of natalizumab, ocrelizumab (actieve/ernstige MS). Symptoombehandeling: baclofen (spasticiteit), amantadine (vermoeidheid), SSRI (depressie).' } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Bij een CVA moet altijd een CT-scan gemaakt worden vóór trombolyse om een bloeding uit te sluiten.',
    c:true, ex:'WAAR. Trombolyse bij hemorrhagisch CVA is fataal. Altijd CT eerst. "Time is brain" — maar veiligheid gaat voor.' },

  // ── NEUROLOGIE — moeilijker ──
  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 34j, 2 weken na gastro-enteritis:\nProgressieve ascending spierzwakte, areflexie\nLiquor: eiwit 2.8 g/L, cellen 3/µL\nDiagnose?',
    a:['Multiple Sclerose','ALS','Guillain-Barré syndroom','Myasthenia Gravis'], c:2,
    ex:'GBS: stijgende motorische uitval + areflexie na infectie + albuminocytologische dissociatie (hoog eiwit, nauwelijks cellen). Respiratoir monitoring essentieel — 30% heeft beademing nodig. Behandeling: IVIG of plasmaferese.',
    wiki:{ kern:'Guillain-Barré syndroom is een auto-immuun demyeliniserende aandoening van de perifere zenuwen, klassiek optredend 2-4 weken na een infectie (Campylobacter, CMV, EBV). Kenmerk: ascending paralysis — begint in de benen en trekt omhoog. Areflexie is universeel.', mechanisme:'Moleculaire mimicry: antilichamen gericht tegen bacteriële/virale structuren kruisreageren met gangliosiden op het myeline van perifere zenuwen. Demyelinisatie vertraagt of blokkeert zenuwgeleiding. Bij ernstige vormen: axonale schade (AMAN-variant) → langzamer herstel.', onderscheid:'MG: ook spierzwakte maar geen areflexie, vermoeidbaarheids­patroon, sensibiliteit intact. Dwarsmyelitis: spinale level, sensibiliteitslevel aanwezig. Botulisme: dalende verlamming (dalend!), pupilreacties gestoord, geen koorts. Hypokaliëmie: geen areflexie, geen voorgeschiedenis infectie.', therapie:'IVIG 2 g/kg over 5 dagen OF plasmaferese (gelijkwaardig). Corticosteroïden zijn NIET effectief bij GBS. Intensieve monitoring van vitale capaciteit (FVC) — bij <20 ml/kg of snelle achteruitgang: intubatie. 80% volledig herstel na 6-12 maanden.' } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 70j: geheugenverlies, urge-incontinentie, breed-based gang. CT: ventrikelvergroting zonder corticale atrofie. Diagnose?',
    a:['Alzheimer','Normaaldrukhydrocephalus (NPH)','Lewy body dementie','Vasculaire dementie'], c:1,
    ex:'NPH triade van Hakim: dementie + incontinentie + gangstoornis ("wacky, wet, wobbly"). CT: grote ventrikels, weinig corticale atrofie. Lumbaalpunctie als diagnostische/therapeutische test — verbetering na liquordrainage bevestigt diagnose.' },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Bij een epiduraal hematoom is er typisch een lucide interval van uren tussen het initiële trauma en bewustzijnsdaling.',
    c:true, ex:'WAAR. Epiduraal hematoom (arteria meningea media): kort bewustzijnsverlies → lucide interval (arteriële bloeding bouwt langzaam druk op) → snelle deterioratie. Neurochirurgische spoedinterventie levensreddend!',
    wiki:{ kern:'Epiduraal hematoom = bloeding tussen schedel en dura, vrijwel altijd arterieel (arteria meningea media bij temporale schedelfractuur). Arteriële druk stuwt het hematoom snel op → tentoriumincarcinatie → ipsilaterale pupildilatatie, contralaterale hemiparese, bewustzijnsdaling.', mechanisme:'Het lucide interval is het klassieke kenmerk: schedeltrauma → kort bewustzijnsverlies → herstel ("gaat goed") → uren later plotse deterioratie. Dit interval bestaat omdat de arteriële bloeding tijd nodig heeft om kritische druk op te bouwen.', onderscheid:'Subduraal hematoom: veneus, ouderen/antistolling, trager beloop, halvemaanvorm op CT. Subarachnoïdaal: geen trauma nodig, donderslaghoofdpijn, geen lucide interval. Diffuus axonaal letsel: coma direct na trauma, geen focale uitval, CT vaak normaal.' } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 38j: plotse "donderslag-hoofdpijn", maximale intensiteit bereikt in seconden, nekstijfheid, geen koorts. CT hersenen negatief. Volgende stap?',
    a:['MRI hersenen met gadolinium','Lumbaalpunctie na 6-12 uur','Geruststellen — waarschijnlijk migraine','Arteria temporalis biopsie'], c:1,
    ex:'Thunderclap + negatieve CT: subarachnoïdale bloeding uitsluiten! CT mist 5% van SAB in eerste uren. LP na ≥6u detecteert xanthochromie. "Worst headache of life" = SAB tot bewijs van het tegendeel. LP altijd verplicht!',
    wiki:{ kern:'Subarachnoïdale bloeding (SAB) is bloeding in de ruimte tussen hersenvliezen, meestal door ruptuur van een cerebraal aneurysma. De "donderslaghoofdpijn" — maximale intensiteit in seconden — is het klassieke alarmteken. SAB zonder behandeling heeft 50% mortaliteit binnen weken.', mechanisme:'80% veroorzaakt door ruptuur van een sacculair (bes-)aneurysma op bifurcaties van de circulus van Willis. Bloed in de subarachnoïdale ruimte irriteert hersenvliezen (nekstijfheid), verhoogt intracraniële druk (hoofdpijn, bewustzijnsdaling) en veroorzaakt vasospasmen (ischemie dag 4-14).', onderscheid:'Migraine: geen thunderclap, geleidelijke opbouw, eerder episoden. Meningitis: koorts prominenter, langzamer begin. Epiduraal hematoom: trauma, lucide interval. Spanningshoofdpijn: nooit "ergste ooit", geen nekstijfheid. Benigne thunderclap: diagnose per exclusionem na negatieve CT + LP.', therapie:'CT hersenen direct (sensitief eerste 6u: 98%). Negatieve CT → LP na ≥6u voor xanthochromie. Bij SAB: neurochirurgie of neuroradiologie (endovasculair coilen) zo snel mogelijk. Nimodipine (calciumantagonist) voorkomt vasospasmen. Bloeddrukcontrole en hersendrukbewaking.' } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 55j: progressieve dysfagie, dysartrie, tongfasciculaties én spasticiteit met hyperreflexie benen, geen sensibiliteitsstoornissen. Diagnose?',
    a:['Myasthenia Gravis','ALS (amyotrofische lateraalsclerose)','Brainsteminfarct','Guillain-Barré syndroom'], c:1,
    ex:'ALS: gelijktijdig UMN (hyperreflexie, spasticiteit) ÉN LMN-uitval (atrofie, fasciculaties). Bulbaire variant: dysfagie/dysartrie als startpunt. Geen sensorische uitval — dat onderscheidt ALS van GBS en MS.',
    wiki:{ kern:'Amyotrofische lateraalsclerose (ALS) is een progressieve neurodegeneratieve ziekte waarbij zowel bovenste (UMN) als onderste (LMN) motorische neuronen afsterven. Mediane overleving is 3-5 jaar. Sensibiliteit, ogen en continentie blijven gespaard — het bewustzijn ook (bij de meeste patiënten).', mechanisme:'Exact mechanisme onbekend. SOD1-mutaties (familiaire ALS), TDP-43 aggregaten en RNA-metabolisme-stoornissen spelen een rol. Mitochondriale disfunctie en glutamaat-toxiciteit beschadigen motorische neuronen irreversibel. 90% sporadisch, 10% familiair.', onderscheid:'GBS: perifeer, sensorisch ook aangedaan, reversibel, areflexie. MS: demyelinisatie, sensibiliteit aangedaan, schubsgewijs beloop, jongere patiënten. Myasthenia gravis: vermoeibare zwakte, geen atrofie, geen fasciculaties. Kennedy-ziekte: X-gebonden bulbo-spinale atrofie, gynecomastie.', therapie:'Riluzol (glutamaat-remmer) verlengt overleving met ~3 maanden. Edaravone vermindert functionele achteruitgang in selecte patiënten. Symptomatisch: PEG-sonde bij dysfagie, NIV-beademing bij ademhalings­insufficiëntie, communicatiehulpmiddelen. Multidisciplinaire zorg essentieel.' } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Carbamazepine is gecontraïndiceerd bij dragers van het HLA-B*1502-allel vanwege een sterk verhoogd risico op Stevens-Johnson syndroom.',
    c:true, ex:'WAAR. HLA-B*1502 (prevalent in Zuidoost-Aziatische populaties) is sterk geassocieerd met carbamazepine-geïnduceerd SJS/TEN. Genetische screening vóór start wordt aanbevolen. Alternatief: levetiracetam of lamotrigine.' },

  // ── FARMACOLOGIE ──
  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Dit middel blokkeert de H⁺/K⁺-ATPase op de pariëtaalcel en remt zuurproductie. Gebruikt bij GERD en peptische ulcera.',
    a:['Omeprazol','Metoclopramide','Famotidine','Sucralfaat'], c:0,
    ex:'Omeprazol is een protonpompremmer (PPI). Famotidine is een H2-blokker — minder effectief, ander aanknopingspunt.',
    wiki:{ kern:'Protonpompremmers (PPIs) zijn de krachtigste maagzuurremmers beschikbaar. Ze blokkeren irreversibel de H⁺/K⁺-ATPase (protonpomp) op de pariëtaalcel van de maag → zuurproductie daalt met >90%. Effect: pH stijgt naar boven de 4, wat nodig is voor genezing van ulcera en refluxschade.', mechanisme:'PPIs zijn prodrugs die geactiveerd worden in het zure milieu van de pariëtaalcel. Ze binden covalent aan de protonpomp — effect duurt 24-48u ondanks korte halfwaardetijd in bloed. Nieuwe pompen worden continu aangemaakt → dagelijkse inname nodig. Beste effect: 30 min voor ontbijt.', onderscheid:'H2-blokkers (famotidine, ranitidine): minder effectief, snel tachyfylaxie, bruikbaar bij nachtelijke klachten of als PPI niet beschikbaar. Antacida (aluminiumhydroxide): directe maar kortdurende zuurverwijdering, geen genezing. Sucralfaat: beschermende laag over ulcus, geen maagzuurremming.', therapie:'Indicaties: GERD, peptisch ulcus, H. pylori-eradicatie (triple therapy), NSAID-bescherming bij hoog risico, Zollinger-Ellison. Bijwerkingen langdurig gebruik: verhoogd risico op C. diff, fracturen (verminderde Ca-absorptie), magnesiumbrek, vitamine B12-deficiëntie, interstitiële nefritis.' } },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Bèta-1-selectief middel, verlaagt HF en BD, gebruikt bij hypertensie en hartfalen. Bekende cave: astma.',
    a:['Amlodipine','Metoprolol','Spironolacton','Hydralazine'], c:1,
    ex:'Metoprolol is een cardioselectieve bèta-1-blokker. Bèta-2-blokkade veroorzaakt bronchospasme — gevaarlijk bij astma.',
    wiki:{ kern:'Bètablokkers blokkeren bèta-adrenerge receptoren. Bèta-1 (hart): lagere hartfrequentie en contractiliteit. Bèta-2 (longen/vaten): bronchoconstrictie en vaatvernauwing. Cardioselectieve bètablokkers (metoprolol, bisoprolol, atenolol) hebben voorkeur voor bèta-1 maar zijn bij hoge dosis niet volledig selectief.', mechanisme:'Door blokkade van bèta-1 receptoren: verlaging hartfrequentie (negatief chronotroop) + contractiekracht (negatief inotroop) + geleidingssnelheid AV-knoop (negatief dromotroop). Dit vermindert myocardiaal zuurstofverbruik. Bij hartfalen: initieel voorzichtig opstarten (kan acuut verslechteren).', onderscheid:'Calciumantagonisten: ook negatief chronotroop (verapamil, diltiazem) maar via ander mechanisme. Amlodipine is dihydropyridine — alleen vaatverwijdend, geen hartfrequentie-effect. Ivabradin: enkel sinusknoop, zonder negatief inotropie — bruikbaar bij bètablokker-intolerantie.', therapie:'Indicaties: hypertensie, angina, hartfalen (HFrEF), AF-frequentiecontrole, na MI. Contra-indicaties: ernstig astma, symptomatisch bradycardie, AV-blok °II-III, acute decompensatio cordis. Nooit abrupt stoppen — rebound-effect (angina, hypertensie).' } },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Dit middel remt ACE, verlaagt angiotensine II en aldosteron. Bekende bijwerking: droge hoest.',
    a:['Losartan','Lisinopril','Verapamil','Furosemide'], c:1,
    ex:'Lisinopril = ACE-remmer. Losartan is een ARB (angiotensine-II-receptorblokker) — géén hoest als bijwerking.',
    wiki:{ kern:'ACE-remmers (lisinopril, enalapril, ramipril) blokkeren het angiotensine-converterend enzym → minder angiotensine II → vaatverwijding + minder aldosteron → bloeddrukdaling + minder zout/waterretentie. Ze beschermen ook de nieren bij diabetes en verminderen mortaliteit bij hartfalen.', mechanisme:'ACE zet angiotensine I om in angiotensine II én breekt bradykinine af. Remming → bradykinine-accumulatie → prostaglandine-productie → droge hoest bij 10-15% (via bradykinine in de keel). ARBs blokkeren de AT1-receptor direct — zelfde bloeddrukeffect zonder bradykinine-ophoping → geen hoest.', onderscheid:'ARB (losartan, valsartan): zelfde indicaties, geen hoest. ARNI (sacubitril/valsartan): ARB + neprilysineremmer, superieur aan ACE-remmer bij HFrEF. Bètablokker: ook mortaliteitsvoordeel HFrEF maar via ander mechanisme. Calciumantagonist: geen nefroprotectie, geen mortaliteitsvoordeel HF.', therapie:'Indicaties: hypertensie, hartfalen (HFrEF), nefroprotectie bij diabetes nefropathie, post-MI. Contra-indicaties: zwangerschap (teratogeen!), bilaterale nierarteriestenose, hyperkaliëmie, angio-oedeem bij ACE-remmer (→ overstap op ARB). Starten met lage dosis, ophogen.' } },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Antibioticum dat DNA-gyrase remt, werkzaam tegen gramnegatieve bacteriën. Cave: peesontstekingen.',
    a:['Amoxicilline','Doxycycline','Ciprofloxacine','Metronidazol'], c:2,
    ex:'Ciprofloxacine is een fluorochinolon. Bijwerkingen: tendinitis, QTc-verlenging. Cave bij ouderen + corticosteroïden.',
    wiki:{ kern:'Fluorochinolonen (ciprofloxacine, levofloxacine) remmen DNA-gyrase (gramnegatief) en topoisomerase IV (grampositief) — enzymen die DNA ontspiraliseren voor replicatie. Bactericide. Breed spectrum inclusief Pseudomonas (ciprofloxacine).', mechanisme:'Tendinitis/peesruptuur: verstoring collageensynthese in peesweefsel, m.n. achillespees. Risico verhoogd bij ouderen, corticosteroïden en nierinsufficiëntie. QTc-verlenging via hERG-kanaalremming → torsade de pointes risico bij combinatie met andere QTc-verlengende middelen (antipsychotica, antiarritmica).', onderscheid:'Bètalactams: celwandremming, geen DNA-schade, geen tendinitis. Doxycycline: ribosoomremmer (30S), ook atypisch, geen fluorochinolon-bijwerkingen. Trimethoprim: folaatremmering, specifiek voor UWI, geen systemisch spectrum.' } },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welk antistollingsmiddel remt vitamine K-afhankelijke stollingsfactoren II, VII, IX en X?',
    a:['Heparine','Warfarine','Rivaroxaban','Dabigatran'], c:1,
    ex:'Warfarine/acenocoumarol remmen de vitamine K-cyclus → verminderde aanmaak stollingsfactoren. INR monitoren!',
    wiki:{ kern:'Vitamine K-antagonisten (VKA) zoals warfarine en acenocoumarol remmen de vitamine K-afhankelijke stollingsfactoren II (protrombine), VII, IX en X, en de anticoagulante eiwitten C en S. Werking treedt pas na 3-5 dagen volledig op (bestaande factoren moeten afgebroken worden).', mechanisme:'Vitamine K is nodig voor gamma-carboxylering van stollingsfactoren. VKA blokkeren de vitamine K-epoxide-reductase (VKOR) → geoxideerde vorm van vitamine K kan niet geregenereerd worden → inactieve stollingsfactoren. INR meet de vertraging in de extrinsieke stollingsroute.', onderscheid:'Heparine: directe werking via antitrombine III, parenteraal, effect direct — voor overbrugging. DOACs (rivaroxaban, apixaban, dabigatran): direct werkend, geen INR-monitoring, minder interacties, maar niet voor alle indicaties. VKA: goedkoop, omkeerbaar met vitamine K, keuze bij kunstkleppen.', therapie:'Therapeutische INR: 2-3 (meeste indicaties), 2,5-3,5 (kunstklepp). Te hoog INR: vitamine K po/IV. Ernstige bloeding: 4-factoren protrombinecomplex-concentraat (PCC) + vitamine K. Vele CYP2C9-interacties — altijd controleren bij nieuwe medicatie.' } },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Metformine is gecontraïndiceerd bij eGFR < 30 ml/min vanwege het risico op lactaatacidose.',
    c:true, ex:'WAAR. Metformine accumuleert bij nierinsufficiëntie. eGFR 30–45: halveer dosis. eGFR < 30: stop definitief.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Heparine heeft een direct anticoagulerend effect en kan oraal worden toegediend.',
    c:false, ex:'NIET WAAR. Heparine werkt alleen iv of sc (te grote molecule voor orale absorptie). Effect is direct via antitrombine III.' },

  // ── FARMACOLOGIE — moeilijker ──
  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Patiënt met epilepsie én bipolaire stoornis. Welk antiepilepticum heeft ook een bewezen stemmingsstabiliserende indicatie?',
    a:['Levetiracetam','Valproaat (natriumvalproaat)','Gabapentine','Fenobarbital'], c:1,
    ex:'Valproaat: breed-spectrum antiepilepticum én stemmingsstabilisator bij bipolaire stoornis. CAVE: ernstige teratogeniciteit (neurale-buisdefecten, cognitieve effecten kind) — absoluut gecontraïndiceerd bij zwangerschapswens zonder adequate anticonceptie!' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
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
    wiki:{ kern:'Bij RA werkt methotrexaat NIET via de folaatroute (zoals bij kanker). Bij lage dosis remt adenosine-opstapeling T-celactivatie en cytokineproductie. Dit verklaart waarom foliumzuursuppletie bijwerkingen (mucositis, beenmergdepressie) vermindert zónder het anti-inflammatoire effect weg te nemen.', mechanisme:'Hoge dosis (oncologie): DHFR-remming → geen DNA-synthese → celgroei gestopt. Lage dosis (RA): adenosine-accumulatie via AICAR → A2A-receptoractivatie → anti-inflammatoir. Het mechanisme verschilt per dosis — dat is klinisch relevant.', onderscheid:'TNF-α-blokkers (adalimumab, etanercept): sneller effectief, biologicals — tweede lijn na MTX-falen. IL-6-remmer (tocilizumab): ook effectief bij MTX-falen. Hydroxychloroquine: milde RA, minder toxisch maar ook minder krachtig. MTX is de hoeksteen van RA-behandeling — de meeste biologicals worden eraan toegevoegd, niet als vervanging.' } },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Aminoglycosiden (bijv. gentamicine) werken concentratie-afhankelijk bactericide. Welk doseringsschema benut dit optimaal?',
    a:['Continu infuus voor stabiele spiegel','Eenmaal daags hoge dosis (once-daily)','Vier keer daags lage dosis','Oraal toedienen voor betere resorptie'], c:1,
    ex:'Once-daily aminoglycosiden: hoge Cmax/MIC-ratio → maximale bactericide activiteit + post-antibiotisch effect. Lagere nefroto­xiciteit door recuperatietijd (tubuluscellen). Orale resorptie van aminoglycosiden is verwaarloosbaar.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Protonpompremmers (PPI\'s) verhogen significant het risico op Clostridioides difficile-infectie.',
    c:true, ex:'WAAR. PPI\'s verhogen de maag-pH → verminderde zuurbarrière → kolonisatie door C. difficile. Meta-analyses: OR ~1.7 voor CDI bij PPI-gebruik. Bijkomende risico\'s langdurig gebruik: hypomagnesemie, pneumonie, osteoporose.' },

  // ── INFECTIOLOGIE ──
  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Jongeman 22j: koorts, extreme vermoeidheid, pharyngitis, cervicale lymfadenopathie, splenomegalie. Monospot positief.',
    a:['Streptokokken-angina','CMV-infectie','EBV-mononucleose','HIV primo-infectie'], c:2,
    ex:'EBV = ziekte van Pfeiffer. Monospot detecteert heterofiele antistoffen. Cave: geen contactsporten bij splenomegalie!',
    wiki:{ kern:'EBV infecteert B-lymfocyten via de CD21-receptor. De klachten (koorts, extreme moeheid, pharyngitis, lymfadenopathie) worden NIET door het virus zelf veroorzaakt maar door de massieve CD8+ T-celrespons die de geïnfecteerde B-cellen probeert te elimineren. De "tonsillitis" is eigenlijk een immunologische storm.', mechanisme:'Splenomegalie door lymfocytaire infiltratie → ruptureerrisico bij contactsporten of trauma (2-4 weken). Monospot detecteert heterofiele IgM-antistoffen (kruisreactie met schaapseritrocyten). Cave: amoxicilline bij actieve EBV geeft bij ~80% een gegeneraliseerde huiduitslag — geen echte allergie!', onderscheid:'CMV-mononucleose: monospot negatief, mildere keelklachten, meer leverstoornissen. HIV primo-infectie: ook mononucleose-achtig + huiduitslag, hoog viraal HIV RNA, monospot negatief. Streptokokkenangina: geen splenomegalie, monospot negatief, GABHS-kweek positief.' } },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Terugkerende van Azië: cyclische koorts elke 48 uur, rillingen, zweetstuipen. Dik-druppelpreparaat positief.',
    a:['Tyfus','Malaria','Dengue','Leishmaniasis'], c:1,
    ex:'Malaria: cyclische koorts + reizigerhistorie + positief dik-druppelpreparaat. P. vivax: 48u cyclus.',
    wiki:{ kern:'Malaria wordt veroorzaakt door Plasmodium-parasieten, overgebracht via de Anopheles-mug. Vijf species: P. falciparum (meest dodelijk), P. vivax, P. ovale, P. malariae, P. knowlesi. De cyclische koorts ontstaat door synchrone lysis van geïnfecteerde rode bloedcellen.', mechanisme:'Parasiet injecteert sporozoïeten → lever (asymptomatisch, 1-2 weken) → merozieten vrijgekomen in bloed → infectie rode bloedcellen → cyclische ruptuur. P. falciparum maakt geïnfecteerde cellen kleverig → vaatblokkade → cerebrale malaria, ARDS, nierfalen.', onderscheid:'Dengue: ook reiziger + koorts maar hevige spier/gewrichtspijn, huiduitslag, geen cyclisch patroon, lage trombocyten. Typhoid: aanhoudende koorts, buikpijn, bradycardie. Leptospirose: watercontact, conjunctivale hyperemie. Rickettsiae: tekenbeet, huiduitslag.', therapie:'P. falciparum: artemisinine-combinatietherapie (bijv. artemether-lumefantrine). Ernstige malaria: IV artesunaat. P. vivax/ovale: chloroquine (+ primaquine om levervormen te elimineren, cave G6PD-deficiëntie). Profylaxe afhankelijk van bestemming en resistentiepatroon.' } },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Amoxicilline is de eerste keuze bij een ongecompliceerde urineweginfectie bij een jonge vrouw in Nederland.',
    c:false, ex:'NIET WAAR. Nitrofurantoïne of fosfomycine zijn eerste keuze vanwege hoge resistentie tegen amoxicilline bij E. coli.' },

  // ── CARDIOLOGIE — moeilijker ──
  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 72j, 2u na succesvolle PCI voor inferieur STEMI: plots bradycardie 38/min, hypotensie 80/50, verhoogde CVD, heldere longen. Meest waarschijnlijke oorzaak?',
    a:['Cardiogene shock','Rechterventrikeli­nfarct','Papillairspierruptuur','Ventrikelseptumruptuur'], c:1,
    ex:'RV-infarct bij inferieur MI (RCA-occlusie): triade hypotensie + hoge CVD + heldere longen. CAVE: nitraten en diuretica zijn gecontraïndiceerd — preload is essentieel! Volumebelasting is eerste stap.',
    wiki:{ kern:'Rechterventrikelinfarct (RVI) treedt op bij 30-50% van inferieure MI\'s (RCA-occlusie proximaal). Het RV faalt als pomp → terugstuwing → hoge CVD (gestuwd halsvenen) maar géén longoedeem (lege longen, heldere longen). Dit is een klassieke valkuil.', mechanisme:'De RCA voedt het RV-myocard. Bij proximale occlusie: RV-contractiliteit daalt → onvoldoende vulling van het LV (preload afhankelijkheid) → lage cardiac output → hypotensie. Het RV is uniek: het heeft een lage werkdruk en is extreem gevoelig voor preloadreductie.', onderscheid:'LV-infarct met cardiogene shock: longoedeem aanwezig, crepitaties, niet heldere longen. Pericardtamponnade: ook lage bloeddruk + gestuwd CVD maar geen MI-ECG, echocardiografie bewijzend. Longembolie: ook hoge CVD maar pleuritische pijn, D-dimeer hoog.', therapie:'CAVE: nitraten en diuretica zijn ABSOLUUT gecontraïndiceerd bij RVI (verminderen preload → shock verergert). Behandeling: volumebelasting (NaCl 0,9% IV), urgente PCI van de RCA, noradrenaline bij refractaire shock. ECG: ST-elevatie in V4R (rechter precordiale afleidingen).' } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 55j, exertionele dyspneu, ECHO: EF 65%, verhoogde vullingsdrukken, geen klepafwijkingen. Diagnose?',
    a:['Hartfalen met gereduceerde EF (HFrEF)','Hartfalen met behouden EF (HFpEF)','Pulmonale hypertensie','Hypertrofische cardiomyopathie'], c:1,
    ex:'HFpEF: EF ≥50% maar diastolische dysfunctie → verhoogde vullingsdrukken. Behandeling richt zich op symptomen en risicofactoren. Geen EF-verbeterende medicatie (ACE-remmer, bèta-blokker) bewezen effectief zoals bij HFrEF.',
    wiki:{ kern:'Hartfalen met behouden EF (HFpEF) heeft normale pompkracht maar een stijve LV — het hart vult te langzaam en bij te hoge druk. Risicofactoren: ouderdom, hypertensie, DM, obesitas. Diastolische dysfunctie = het hart kan niet ontspannen, niet pompen.', mechanisme:'Chronische drukoverbelasting (hypertensie) → LV-hypertrofie + verlies van elasticiteit → hoge vullingsdrukken → stuwing in de longen. Het EF is bewaard omdat de contractie zelf intact is — het probleem zit in de relaxatiefase.', onderscheid:'HFrEF (EF <40%): systolische dysfunctie — bewezen mortaliteitsreductie met ACE-remmer + bètablokker + MRA + SGLT2i. HFpEF: tot voor kort geen bewezen medicatie; SGLT2-remmers (dapagliflozine) tonen recent voordeel. Klinisch gelijk: oedeem, orthopneu — onderscheid alleen via echocardiografie.' } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 26j, atleet: syncope tijdens inspanning, positieve familiegeschiedenis plotse hartdood. ECHO: asymmetrische septumhypertrofie 22mm, SAM van mitraalklep. Diagnose?',
    a:['Aortaklepstenose','Hypertrofische obstructieve cardiomyopathie (HOCM)','Dilatatieve cardiomyopathie','Longembolie'], c:1,
    ex:'HOCM: septumhypertrofie + SAM (systolic anterior motion) mitraalklep → dynamische LVOT-obstructie. Belangrijkste oorzaak van plotse hartdood bij jonge atleten. ICD-indicatie bij hoog-risico profiel. Sportontheffing verplicht!',
    wiki:{ kern:'Hypertrofische (obstructieve) cardiomyopathie (HOCM/HCM) is een genetische hartspierziekte (autosomaaldominant, sarcomeer-mutaties) gekenmerkt door asymmetrische hypertrofie van het interventriculaire septum. Het is de meest voorkomende oorzaak van plotse hartdood bij jongeren en atleten.', mechanisme:'Het verdikt septum kan tijdens de systole de uitstroombaan van het LV (LVOT) obstrueren. De mitraalklep beweegt mee naar voren (SAM) → verergert de obstructie + mitralisinsufficiëntie. Obstructie neemt toe bij afnemende preload (staan, Valsalva, dehydratie) en vermindert bij toenemende preload (hurken, liggen).', onderscheid:'Aortastenose: ook systolisch geruis maar afneemt bij Valsalva (vaste obstructie). Dilatatieve CMP: grote LV, lage EF, wijde QRS. WPW-syndroom: ook syncope bij jongeren maar ECG met delta-golf en korte PR. Myocarditis: acuut begin na infectie, troponine hoog.', therapie:'Symptomatisch: bètablokker of niet-dihydropyridine calciumantagonist (verapamil) — verlagen hartfrequentie → meer vultijd → minder obstructie. ICD bij hoog risico (familielid plotse hartdood, onverklaard syncope, NSVT). Sportontheffing. Septumreductie (chirurgie of alcohol-ablatie) bij refractaire LVOT-obstructie.' } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Hypokaliëmie (K⁺ < 3.5) is een onafhankelijke risicofactor voor ventrikelfibrilleren bij een acuut myocardinfarct.',
    c:true, ex:'WAAR. Hypokaliëmie verlaagt de drempelwaarde voor ventriculaire aritmieën, met name bij ischemie. Target K⁺ ≥ 4.0 mmol/L bij ACS is aanbevolen. Actieve suppletie is onderdeel van standaardzorg op de CCU.' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Patiënt met hartfalen EF 30%, intolerantie voor ACE-remmer wegens angiooedeem. Beste alternatief?',
    a:['Verapamil','ARB (bijv. valsartan)','Amlodipine hoge dosis','Diltiazem'], c:1,
    ex:'ARB veroorzaakt geen angiooedeem — bradykinine-pathway niet betrokken. Verapamil en diltiazem zijn negatief inotroop en gecontraïndiceerd bij lage EF. Hydralazine + nitraat is tweede keuze bij ARB-intolerantie.' },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Een eerstegraads AV-blok (PR-interval > 200ms) bij een asymptomatische patiënt vereist altijd een pacemaker.',
    c:false, ex:'NIET WAAR. Eerstegraads AV-blok bij asymptomatische patiënt: geen behandeling nodig, alleen observatie. Pacemaker is geïndiceerd bij symptomatisch tweedegraads Mobitz II of derdegraads AV-blok.' },

  // ── INFECTIOLOGIE — moeilijker ──
  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'HIV-patiënt, CD4 45/µL:\nKoorts, droge hoest, dyspneu bij inspanning\nLDH 520 U/L\nBilaterale interstitiële infiltraten\nMeest waarschijnlijke verwekker?',
    a:['Mycobacterium tuberculosis','Pneumocystis jirovecii (PCP)','CMV-pneumonitis','Aspergillus fumigatus'], c:1,
    ex:'PCP bij CD4 <200/µL: insidieuze presentatie, droge hoest, hoog LDH, bilaterale "ground glass" infiltraten. Behandeling: TMP-SMX hoge dosis (3 weken). Profylaxe verplicht bij CD4 <200. Corticosteroïden toevoegen bij ernstige hypoxemie!' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Patiënt: HBsAg positief, anti-HBc IgM positief, anti-HBs negatief, HBeAg positief. Interpretatie?',
    a:['Chronische HBV-infectie','Acuut hepatitis B, hoog infectieus','Herstel van HBV (immuniteit)','Vaccinatie-immuniteit'], c:1,
    ex:'Acuut HBV: HBsAg+ en anti-HBc IgM+ (verse infectie). HBeAg+ duidt op actieve virusreplicatie, hoog infectieus. Anti-HBs positief = herstel of vaccinatie. Chronisch HBV: HBsAg >6 maanden, IgM anti-HBc negatief.',
    wiki:{ kern:'HBV-serologie lezen: HBsAg = virus aanwezig. Anti-HBc IgM = verse infectie. Anti-HBs = immuniteit (door herstel of vaccinatie). HBeAg = actieve replicatie, hoog besmettelijk. Elk patroon vertelt een fase van de infectie.', mechanisme:'Na besmetting: HBsAg verschijnt eerst (2-10w) → IgM anti-HBc → na herstel: HBsAg verdwijnt, anti-HBs verschijnt (window-periode: beiden negatief). Vaccinatie: ALLEEN anti-HBs positief, GEEN anti-HBc (nooit blootgesteld aan het virus zelf).', onderscheid:'Chronische drager: HBsAg >6 maanden + anti-HBc IgG (geen IgM). Immunotolerant: hoog HBV-DNA, normaal ALAT → nog geen behandeling. Actieve chronische hepatitis: verhoogd ALAT + hoog HBV-DNA → antivirale therapie. Window-periode (acuut herstel): alleen anti-HBc positief, HBsAg/anti-HBs beiden negatief.' } },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'MRSA-resistentie berust op het mecA-gen, dat codeert voor PBP2a — een transpeptidase met lage affiniteit voor alle bèta-lactam-antibiotica.',
    c:true, ex:'WAAR. PBP2a bindt bèta-lactams niet effectief → celwandsynthese gaat gewoon door → resistentie. Behandeling: vancomycine, linezolid of daptomycine. MRSA-diagnostiek via PCR (mecA) of fenotypische gevoeligheidstesten.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Man 40j, sub-Saharaans Afrika: malaria ondanks chloroquine-profylaxe. Meest resistente Plasmodium-species?',
    a:['P. vivax','P. falciparum','P. ovale','P. malariae'], c:1,
    ex:'P. falciparum: verantwoordelijk voor >90% van malaria-mortaliteit. Wijdverspreide chloroquineresistentie in sub-Saharaans Afrika. Correcte profylaxe: atovaquon-proguanil of mefloquine. Falciparum kan cerebrale malaria geven — snel behandelen!' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Na 7 dagen amoxicilline-clavulaanzuur: waterige diarree 8×/dag, koorts, buikkrampen, leukocyten in feces. Toxinetest positief. Diagnose?',
    a:['Salmonella-enteritis','Clostridioides difficile-infectie (CDI)','Virale gastro-enteritis','Campylobacter jejuni'], c:1,
    ex:'CDI: typisch na (brede-spectrum) antibiotica. Toxine A/B diagnostisch. Eerste episode: orale vancomycine of fidaxomicine (niet meer metronidazol als eerste keuze). CAVE: geen loperamide — risico toxisch megacolon!',
    wiki:{ kern:'Clostridioides difficile (C. diff) is een sporevormende bacterie die de dikke darm koloniseert wanneer de normale darmflora verstoord is — klassiek na antibiotica. Toxinen A en B beschadigen het colonepitheel → pseudomembraneuze colitis met waterige diarree, krampen, koorts.', mechanisme:'Antibiotica (met name clindamycine, cefalosporines, fluorochinolonen) ruimen commensale flora op. C. diff-sporen overleven en kiemen → vegetatieve vormen produceren toxinen → epitheel­beschadiging → diarree. Sporen zijn resistent tegen alcohol-handenreiniger — zeep en water verplicht!', onderscheid:'Andere antibiotica-gerelateerde diarree (non-CDI): geen toxinen, minder ernstig, stopt bij stoppen AB. IBD-exacerbatie: geen duidelijke AB-anamnese, chronisch beloop. Ischemische colitis: ouderen, plots begin, bloed in feces. Infectieuze colitis (Campylobacter, Salmonella): geen AB-anamnese, feceskweek positief.', therapie:'Stop het triggerende antibioticum. Eerste episode mild: vancomycine 125 mg 4x/dag PO 10 dagen OF fidaxomicine. Geen metronidazol meer als eerste keuze. Geen loperamide (risico toxisch megacolon). Recidief: verlengd fidaxomicine-schema of fecestransplantatie (FMT) bij multipele recidieven.' } },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Tiener met mononucleose-achtig beeld krijgt amoxicilline. Volgende dag: uitgebreid maculopapuleus exantheem over het hele lichaam. Betekenis?',
    a:['Bewezen penicilline-allergie','Amoxicilline-exantheem bij EBV — geen echte allergie','Serum-ziekte','Stevens-Johnson syndroom'], c:1,
    ex:'Amoxicilline bij actieve EBV: ~80% kans op gegeneraliseerd exantheem — immuungemedieerd, GEEN IgE-allergie. Patiënt hoeft penicilline in de toekomst niet te vermijden. Documenteer correct zodat onterechte allergie-label vermeden wordt!' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Rifampicine is een krachtige CYP3A4-inductor en kan de werkzaamheid van orale anticonceptiva significant verminderen.',
    c:true, ex:'WAAR. Rifampicine induceert sterk CYP3A4 → versneld metabolisme van ethinylestradiol → verminderde anticonceptieve bescherming. Extra anticonceptiemethode verplicht tijdens én minimaal 4 weken na het stoppen van rifampicine.' },

  // ── LABORATORIUM ──
  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Na⁺ 128, lage osmolaliteit plasma, hoog urinesodium, geen oedeem. Welk syndroom?',
    a:['Diabetes insipidus','SIADH','Nefrotisch syndroom','Addisoncrisis'], c:1,
    ex:'SIADH: hyponatriëmie, lage plasmaosmolaliteit, hoog urinenatrium. Geen oedeem — dat onderscheidt het van hartfalen/cirrose.',
    wiki:{ kern:'SIADH is de meest voorkomende oorzaak van hyponatriëmie in het ziekenhuis. ADH wordt aangemaakt zonder osmotische prikkel → nieren houden water vast → verdunningshyponatriëmie. Oorzaken: kleincellig longcarcinoom, pneumonie, CNS-aandoeningen, carbamazepine, SSRI.', mechanisme:'ADH bindt V2-receptoren → aquaporine-2 inbouw → water-terugresorptie → geconcentreerde urine (osmolaliteit >100). Urine-Na hoog (>40) omdat Na-handling normaal is. Geen oedeem want geen zoutretentie — de totale natriumhoeveelheid is normaal, alleen het water is teveel.', onderscheid:'Hartfalen/cirrose/nefrotisch: ook hyponatriëmie maar MÉT oedeem + lage urine-Na (<20) door RAAS-activatie. Hypovolemische hyponatriëmie: dehydratie, droge slijmvliezen, hoge pols. Hypothyreoïdie/bijnierinsufficiëntie: "SIADH-like" → altijd TSH en cortisol bepalen voordat je de diagnose SIADH stelt!' } },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'K⁺ 6.8, ECG: piekende T-toppen, verlengd PR. Eerste behandelstap?',
    a:['Furosemide iv','Calcium gluconaat iv','Kayexalaat oraal','Hemodialyse'], c:1,
    ex:'Bij ernstige hyperkaliëmie met ECG-veranderingen: eerst calcium gluconaat voor cardioprotectie. Daarna K⁺ actief verlagen.',
    wiki:{ kern:'Hyperkaliëmie (K⁺ >5,5 mmol/L) verstoort de rustmembraanpotentiaal van hartcellen → verhoogd risico op levensbedreigende aritmieën. ECG-progressie: puntige T-toppen → verbreed PR → breed QRS → sinusgolf → ventrikelfibrilleren.', mechanisme:'Oorzaken: nierinsufficiëntie (meest voorkomend), ACE-remmers/ARBs, kaliumsparende diuretica, bijnierinsufficiëntie, weefselafbraak (rabdomyolyse, TLS). Acidose verschuift K⁺ van intracellulaire naar extracellulaire ruimte (per 0,1 pH-daling: K⁺ stijgt ~0,5 mmol/L).', onderscheid:'Pseudohyperkaliëmie: hemolyse in het buisje (foutief hoge meting). Altijd herhalen bij twijfel. Hyperkaliëmie zonder ECG-veranderingen is minder acuut maar vraagt wel behandeling en monitoring.', therapie:'Stap 1: calcium gluconaat IV (membraanstabilisatie, werkt in 1-3 min). Stap 2: glucose + insuline IV (K⁺ cellen in, werkt in 15-30 min). Stap 3: salbutamol vernevelaar. Stap 4: natriumbicarbonaat bij acidose. Definitief: resonium, kayexalaat of dialyse voor verwijdering.' } },

  // ── LABORATORIUM — moeilijker ──
  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'ABG:\npH 7.49\npCO₂ 30 mmHg\nHCO₃⁻ 22 mmol/L\npO₂ 98 mmHg\nJuiste interpretatie?',
    a:['Metabole alkalose met respiratoire compensatie','Respiratoire alkalose met renale compensatie','Gemengde alkalose','Metabole acidose met overcompensatie'], c:1,
    ex:'pH hoog + laag pCO₂ = respiratoire alkalose. HCO₃ licht gedaald = renale compensatie (verwacht: 24 − 0.5×ΔpCO₂ acuut). Oorzaken: hyperventilatie, sepsis (vroeg), zwangerschap, longembolie, salicylaatintoxicatie.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Microcytaire anemie:\nFerritine 6 µg/L\nTransferrinesaturatie 5%\nSerum-ijzer 5 µmol/L\nReticulocyten laag\nDiagnose?',
    a:['β-thalassemie minor','Anemie van chronische ziekte','IJzergebreksanemie','Sideroblastische anemie'], c:2,
    ex:'IJzergebreksanemie: ferritine laag (<12), transferrinesaturatie <16%, serum-ijzer laag. Ferritine is acuut-fase-eiwit — bij ontsteking kan het vals-normaal zijn. Onderscheid van chronische anemie: bij chronische anemie is ferritine normaal/hoog.',
    wiki:{ kern:'IJzergebreksanemie is de meest voorkomende anemie wereldwijd. IJzer is nodig voor hemoglobiinesynthese. Tekort leidt tot kleine (microcytaire), bleke (hypochrome) rode bloedcellen en klachten als vermoeidheid, duizeligheid, hoofdpijn, bleekheid en eventueel pica (eetlust naar ijs, aarde).', mechanisme:'IJzer wordt opgenomen in de dunne darm (als Fe²⁺, bevorderd door vitamine C). Oorzaken tekort: te weinig inname (veganisten, ondervoeding), malabsorptie (coeliakie, IBD, gastrectomie), verhoogd verlies (menstruatie, GI-bloeding). Ferritine is de opslagvorm — als eerst uitgeput.', onderscheid:'Anemie van chronische ziekte (ACD): ferritine normaal/hoog, serum-ijzer laag, transferrine laag — ijzer opgesloten in macrofagen door ontsteking. Thalassemie: microcytair maar ferritine/serum-ijzer normaal, Hb-elektroforese afwijkend. Sideroblastische anemie: ringed sideroblasts op beenmerg.', therapie:'Oorzaak behandelen (GI-bloeding? coeliakie?). Ferrosulfaat oraal 200 mg/dag (of ferrofumaraat) — 3-6 maanden voor vullen van ijzervoorraden. IV ijzer (ferric carboxymaltose) bij malabsorptie, onverdraagzaamheid of spoedsituatie. Reticulocyten stijgen na 5-7 dagen als eerste teken van respons.' } },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Patient op acenocoumarol: INR 3.8, APTT normaal. Welke stollingsfactor is NIET aangetast?',
    a:['Factor II (protrombine)','Factor VII','Factor VIII','Factor X'], c:2,
    ex:'Vitamine K-antagonisten remmen factoren II, VII, IX en X (vitamine K-afhankelijk). Factor VIII is vitamine K-onafhankelijk. PT/INR reflecteert factor VII (kortste halfwaardetijd). APTT normaal bevestigt: intrinsieke route intact.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Na chemotherapie:\nK⁺ 6.4 mmol/L\nFosfaat 3.2 mmol/L\nUraat 870 µmol/L\nCalcium 1.6 mmol/L\nLDH 2900 U/L\nDiagnose?',
    a:['Tumorlysissyndroom (TLS)','Nefrotisch syndroom','Addison-crisis','Rhabdomyolyse'], c:0,
    ex:'TLS: massale celdood → vrijkomen celinhoud → hyperkaliëmie, hyperfosfatemie, hyperurikemie, hypocalciëmie (fosfaat bindt Ca²⁺). Risico: nierfalen en levensbedreigende aritmieën. Preventie: hyperhydratie + rasburicase/allopurinol.' },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium — Waar of Niet?',
    q:'Een normaal serum-B12-spiegel sluit functioneel vitamine B12-tekort volledig uit.',
    c:false, ex:'NIET WAAR. Serum-B12 reflecteert totaal (actief + inactief transcobalamine). Methylmalonzuur en homocysteïne zijn functionele markers — verhoogd bij intracellulair B12-tekort ondanks normale serumspiegel. MMA is specifiek voor B12-deficiëntie.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Creatinine acuut gestegen: 188 µmol/L\nUrine-Na 9 mmol/L\nUrine-osmolaliteit 680 mosm/kg\nMeest waarschijnlijke oorzaak?',
    a:['Acute tubulusnecrose (ATN)','Prerenaal nierfalen','Post-renale obstructie','Acute glomerulonefritis'], c:1,
    ex:'Prerenaal: tubulus functioneert nog → maximale Na-terugresorptie (urine-Na <20) + water-terugresorptie (osmolaliteit >500). ATN: tubuli beschadigd → urine-Na >40, osmolaliteit <350. Behandeling prerenaal: vochtresuscitatie.',
    wiki:{ kern:'Prerenaal nierfalen is functioneel: de tubuli werken normaal maar er is te weinig doorstroom. De nieren reageren correct: maximaal Na en water vasthouden. Herstel bij vochttoediening. ATN (acute tubulusnecrose) is structureel: tubuli zijn beschadigd door ischemie of toxines → kunnen niet meer reabsorberen.', mechanisme:'Prerenaal: lage renale perfusie → RAAS + ADH → urine-Na <20, osmolaliteit >500, FENa <1%. ATN: tubuli dood → urine-Na >40, osmolaliteit <350, FENa >2%. FENa = (urine-Na × plasma-creatinine) / (plasma-Na × urine-creatinine) × 100 — corriger voor diureticagebruik!', onderscheid:'Post-renale obstructie: echo toont hydronefrose. Glomerulonefritis: proteïnurie, hematurie, rode-bloedcel-cylinders. Contrast-nefropathie: stijging creatinine 24-48u na contrast, ATN-patroon. Hepatorenaal syndroom: bij cirrose, functioneel (FENa laag) maar reageert NIET op vochtsuppletie.' } },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium — Waar of Niet?',
    q:'Een verlengde APTT met normale PT zonder bloedingsklachten kan wijzen op een lupus anticoagulans.',
    c:true, ex:'WAAR. Lupus anticoagulans verlengde APTT in vitro (remt fosfolipide-afhankelijke reacties) — maar paradoxaal thrombotisch risico in vivo. Mengproef: geen correctie (= remmer aanwezig). Bevestiging: dRVVT-test. Behandeling: anticoagulatie.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Vrouw 28j: anemie, indirect bilirubine verhoogd, LDH 880, haptoglobine ondetecteerbaar, bloeduitstrijk: schistocyten. Diagnose?',
    a:['IJzergebreksanemie','Microangiopathische hemolytische anemie (MAHA)','Thalassemie','G6PD-deficiëntie'], c:1,
    ex:'MAHA: schistocyten (fragmenten van beschadigde rode bloedcellen) + hemolyseparameters (hoog LDH, indirect bili, laag haptoglobine). Oorzaken: TTP, HUS, DIC, HELLP. Urgente diagnose — TTP-behandeling is plasmaferese!',
    wiki:{ kern:'Microangiopathische hemolytische anemie (MAHA) is een patroon waarbij rode bloedcellen mechanisch kapot worden gescheurd in kleine bloedvaten (trombotische microangiopathie). Schistocyten op de bloeduitstrijk zijn het pathognomonische teken — dit is altijd abnormaal.', mechanisme:'Trombotische occlusies in kleine vaten (TTP: ADAMTS13-deficiëntie → von Willebrand-multimeren accumuleren; HUS: shiga-toxine beschadigt endotheel; DIC: systemische stollingsactivatie). RBC worden hierdoor letterlijk doorgesneden → schistocyten, hemoglobine vrijgegeven → hoog LDH, laag haptoglobine.', onderscheid:'TTP: pentade = MAHA + trombocytopenie + neurologische uitval + nierfalen + koorts. HUS (typisch): kind na Campylobacter/EHEC O157, overheersend nierfalen. HELLP: zwangerschap, leverstoornissen, hypertensie. DIC: onderliggende oorzaak (sepsis, maligniteit), stollingstesten afwijkend (PT/APTT verlengd).', therapie:'TTP: plasmaferese SPOEDMATIG (verwijdert Von Willebrand-multimeren + suppleer ADAMTS13). Caplacizumab als adjuvans. HUS atypisch: eculizumab. HELLP: bevalling is definitieve behandeling. DIC: onderliggende oorzaak behandelen + stollingsfactoren suppleren.' } },

  // ── Cardiologie (nieuw) ──
  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 68j komt met hartkloppingen. ECG: geen P-toppen, onregelmatig QRS-ritme met freq 110/min. Wat is de diagnose?',
    a:['Atriumflutter','Atriumfibrilleren','Ventriculaire tachycardie','AV-nodale re-entry tachycardie'], c:1,
    ex:'Atriumfibrilleren: chaotische atriumactiviteit → geen P-toppen, absoluut onregelmatig QRS. Risico: trombus in linker hartoor → embolie/beroerte. Behandeling: frequentiecontrole (bètablokker/digoxine) + anticoagulatie indien CHA₂DS₂-VASc ≥2.',
    wiki: {
      kern: 'Atriumfibrilleren (AF) is het meest voorkomende hartritmestoornis. De atriums vuren chaotisch (400-600/min) in plaats van gecoördineerd — daardoor geen P-toppen op het ECG en een volledig onregelmatig QRS-ritme.',
      mechanisme: 'Meerdere kleine elektrische golfjes cirkelen door de atriums (re-entry). Dit voorkomt een geordende samentrekking. Het gevolg: de atriums bewegen niet echt meer — bloed blijft stilstaan in het linker hartoor en kan stolsels vormen.',
      onderscheid: 'Atriumflutter: wél regelmatig, zaagvormige flutter-golven (~300/min), vaak 2:1 geleiding → HR ~150. Ventriculaire tachycardie: breed QRS, levensbedreigend. AVNRT: plots begin/eind, normaal QRS, jonge patiënten.',
      therapie: 'Twee doelen: (1) Frequentiecontrole met bètablokker of digoxine. (2) Anticoagulatie bij CHA₂DS₂-VASc ≥2 (man) of ≥3 (vrouw) — DOAC (bijv. apixaban) boven warfarine. Rytmecontrole (cardioversie) bij symptomatische patiënten.',
    } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Bij atriumfibrilleren met een CHA₂DS₂-VASc score van 0 bij een man is anticoagulatie geïndiceerd.',
    c:false, ex:'NIET WAAR. CHA₂DS₂-VASc 0 (man) = laag risico → geen anticoagulatie aanbevolen. Score telt: hartfalen, hypertensie, leeftijd ≥75 (2 punten), diabetes, beroerte/TIA (2 punten), vaatziekte, leeftijd 65-74, vrouwelijk geslacht.' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 55j met kortademigheid bij inspanning, orthopneu en dikke enkels. Echo: EF 35%, vergrote LV. Wat is de eersterangbehandeling?',
    a:['Alleen diuretica','ACE-remmer + bètablokker','Digoxine monotherapie','Calciumantagonist'], c:1,
    ex:'Hartfalen met verminderde EF (HFrEF): ACE-remmer (of ARB/ARNI) + bètablokker verminderen mortaliteit. Diuretica verlichten symptomen. Digoxine alleen bij symptoomcontrole. Spironolacton toevoegen bij aanhoudende klachten.',
    wiki: {
      kern: 'Hartfalen met verminderde ejectiefractie (HFrEF, EF <40%) betekent dat het hart niet genoeg kracht heeft om bloed rond te pompen. Gevolg: vocht hoopt op in de longen (orthopneu, nachtelijk hoesten) en de benen (oedeem).',
      mechanisme: 'Het hart compenseert via het RAAS-systeem (meer zout/water vasthouden) en adrenaline (sneller kloppen). Op korte termijn helpt dit, maar op lange termijn beschadigt het het hart verder — een vicieuze cirkel. ACE-remmers en bètablokkers doorbreken deze cirkel.',
      onderscheid: 'HFpEF (EF behouden, ≥50%): hart pompt wel krachtig maar is te stijf — vult slecht. Ander mechanisme, minder bewezen medicatie. Acuut longoedeem: levensbedreigende vorm van HFrEF, behandel met zuurstof + furosemide IV + nitroglycerine.',
      therapie: 'Vierpijlertherapie: (1) ACE-remmer/ARNI, (2) bètablokker, (3) MRA (spironolacton), (4) SGLT2-remmer (bijv. dapagliflozine). Elk van de vier vermindert mortaliteit. Diuretica verlichten klachten maar verlengen leven niet.',
    } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Bij een STEMI moet PCI (dotterbehandeling) idealiter binnen 90 minuten na eerste medisch contact plaatsvinden.',
    c:true, ex:'WAAR. "Door-to-balloon time" <90 min is de richtlijn. Hoe sneller, hoe meer myocard gered. Alternatief: trombolyse binnen 30 min als PCI niet tijdig beschikbaar is (deur-tot-naald <30 min).' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 35j na griep: scherpe precordiale pijn, erger liggend, beter voorovergebogen. ECG: saddle-shape ST-elevatie in meerdere afleidingen. Diagnose?',
    a:['STEMI','Pericarditis','Longembolie','Aortadissectie'], c:1,
    ex:'Pericarditis: pleuritische pijn (scherp, houdingsafhankelijk), pericardiaal wrijfgeruis, diffuse saddle-shape ST-elevatie. Oorzaak vaak viraal. Behandeling: ibuprofen + colchicine. Complicatie: pericarditamp.',
    wiki: {
      kern: 'Pericarditis is een ontsteking van het hartzakje (pericard). De typische pijn is scherp en pleuritisch: erger bij inademen en platliggen, beter voorovergebogen zitten (vermindert druk op het pericard). Oorzaak is in 80-90% viraal (Coxsackie, EBV, CMV).',
      mechanisme: 'Ontsteking van het pericard → ruwheid van de gladde perikardiale lagen → wrijfgeruis bij auscultatie (kenmerkend!). Als er vocht accumuleert wordt het geruis zachter maar neemt het risico op tamponnade toe. ECG: saddle-shape ST-elevatie diffuus (niet gelokaliseerd zoals STEMI) + PR-depressie.',
      onderscheid: 'STEMI: ST-elevatie gelokaliseerd per coronairgebied, reciproke afwijkingen, ernstige pijn met uitstraling, geen houdinssafhankelijkheid. Longembolie: pleuritische pijn + dyspneu, normale of S1Q3T3 op ECG. Myocarditis: ook post-viraal maar troponine sterk verhoogd, pijn minder uitgesproken.',
      therapie: 'Ibuprofen 600 mg 3x/dag + colchicine 0,5 mg 2x/dag gedurende 3 maanden (voorkomt recidieven). Rust bij actieve pericarditis. Recidief: corticosteroïden als NSAID faalt. Cave: tamponnade → pericardiocentese spoedmatig. Bij bacteriële oorzaak: antibiotica + drainage.',
    } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Patiënt met bekende pericarditis: acuut in shock, halsvenen gestuwd, gedempte harttonen. Wat is de diagnose?',
    a:['Pneumothorax','Longembolie','Harttamponnade','Hartfalen'], c:2,
    ex:'Harttamponnade: Beck\'s triade = hypotensie + gestuwd halsvenen + gedempte harttonen. Vocht in pericardzak comprimeert het hart. Echo: echo-vrije ruimte + diastolische collaps rechterventrikels. Behandeling: pericardiocentese spoedmatig.',
    wiki:{ kern:'Harttamponnade ontstaat wanneer vocht (bloed, exsudaat) in de pericardruimte snel genoeg ophoopt om de diastolische vulling van het hart te belemmeren. Al 200 ml snel ophopend vocht kan fataal zijn; 1 liter chronisch kan goed verdragen worden.', mechanisme:'Toenemende druk in het pericard comprimeert het RV tijdens diastole → minder vulling → minder cardiac output → compensatoire tachycardie en perifere vasoconstrictie. Kenmerkend: pulsus paradoxus (BD-daling >10 mmHg tijdens inspiratie) door wedijvering LV/RV om vulling.', onderscheid:'RV-infarct: ook lage BD + hoge CVD maar géén gedempte harttonen, ECG-afwijkingen. Spanningspneumothorax: ook gedaalde BD + gestuwd CVD maar eenzijdig verminderd ademgeruis, trachea-deviatie. Hartfalen: geen plotse deterioratie, wél longoedeem.', therapie:'Pericardiocentese spoedmatig: naald subxifoidaal, echo-geleide drainage. Bij hemopericard (trauma): chirurgische drainage. Na drainage: onderzoek oorzaak (maligniteit, TBC, virale pericarditis, uraemie). Kleine veilige drainage-hoeveelheid geeft snel klinisch herstel.' } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'ACE-remmers zijn gecontra-indiceerd bij hartfalen met verminderde ejectiefractie (HFrEF).',
    c:false, ex:'NIET WAAR. ACE-remmers zijn juist eerstekeusmiddelen bij HFrEF — ze verminderen mortaliteit. Contra-indicaties zijn: bilaterale nierslagadervernauwing, zwangerschap, en overgevoeligheid (bijv. angio-oedeem).' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 72j: systolisch geruis graad 4/6 rechts parasternaal, uitstralend naar hals, syncope bij inspanning, kortademigheid. Echo: AV-oppervlak 0.7 cm². Diagnose?',
    a:['Mitralisinsufficiëntie','Hypertrofische cardiomyopathie','Ernstige aortastenose','Tricuspidalisinsufficiëntie'], c:2,
    ex:'Ernstige aortastenose: AV-oppervlak <1.0 cm², klassieke triade = angina + syncope + kortademigheid. Systolisch uitdrijvingsgeruis rechts parasternaal. Behandeling: TAVI of chirurgische klepvervanging.',
    wiki:{ kern:'Aortaklepstenose is de meest voorkomende klepafwijking bij ouderen. De aortaklep wordt door calcificatie steeds stijver en nauwer → het hart moet steeds harder pompen → LV-hypertrofie → uiteindelijk hartfalen. Eenmaal symptomen optreden verslechtert de prognose snel (gemiddelde overleving zonder behandeling: 2-3 jaar na syncope, 1-2 jaar na hartfalen).', mechanisme:'Calcificerende aortastenose begint als inflammatoire schade aan het klepblad (vergelijkbaar met atherosclerose). Risicofactoren: ouderdom, bicuspide aortaklep (congenitaal), nierinsufficiëntie. Het LV moet de verhoogde afterload overwinnen → concentrische hypertrofie → diastolische dysfunctie.', onderscheid:'HOCM: ook systolisch geruis + syncope bij jongeren maar geruis neemt tóé bij Valsalva (anders dan aortastenose). Mitralisinsufficiëntie: geruis holosystolisch, uitstralend naar oksel. Hypertensieve cardiomyopathie: geen geruis, echte klepafwijking ontbreekt.', therapie:'Aortaklepvervanging (chirurgisch of TAVI) is de enige curatieve behandeling. TAVI (transcatheter) voor ouderen en hoog-risicochirurgische patiënten. Conservatief: geen bewezen farmacologische therapie. Cave: nitraten en diuretica kunnen gevaarlijk hypotensie veroorzaken (preload-afhankelijk hart).' } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'ECG: PR-interval steeds langer wordend tot een QRS uitvalt, daarna reset. Welk geleidingsstoornis?',
    a:['Eerstegraads AV-blok','Wenckebach (tweedegraads type I)','Mobitz type II AV-blok','Derdegraads AV-blok'], c:1,
    ex:'Wenckebach (Mobitz type I): PR progressief verlengd → QRS uitval → reset. Meestal benigne, vaak bij inferiorwandinfarct. Mobitz II: plotse QRS-uitval zonder PR-verlenging — gevaarlijker, kan leiden tot totaal blok.',
    wiki:{ kern:'AV-blokken worden geclassificeerd naar ernst. Eerstegraads: verlengd PR, altijd geleiding. Tweedegraads type I (Wenckebach): progressieve PR-verlenging tot een slag uitvalt — benigne. Tweedegraads type II (Mobitz II): plotse uitval zonder waarschuwing — gevaarlijk, risico op asystolie. Derdegraads: P en QRS volledig ontkoppeld, levensbedreiging.', mechanisme:'Wenckebach: AV-knoopmoeheid na elke slag → langzamere geleiding → uitval → recuperatie. Mobitz II: structurele schade aan His-bundel of bundeltakken (hieronder AV-knoop) → plotse blokkering. Derdegraads: geen enkele prikkel door → junctionaal of ventriculair escape-ritme (~40 of ~30/min).', onderscheid:'Eerstegraads: geen klinisch gevolg, vaak atleten of slaap. Wenckebach: benigne, typisch bij inferieur MI (RCA). Mobitz II: meer kans op progressie naar totaal blok → pacemaker-indicatie. Derdegraads bij inferieur MI: tijdelijk, junctionaal escape. Derdegraads bij anterieur MI: venticulair escape, slecht teken — urgent pacemaker.', therapie:'Eerstegraads: geen. Wenckebach: observatie, behandel onderliggende oorzaak (ischaemie, medicatie). Mobitz II: tijdelijke pacemaker, daarna permanent. Derdegraads: transveneuze tijdelijke pacemaker spoedmatig, daarna permanent.' } },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Statines verlagen LDL-cholesterol door HMG-CoA-reductase te remmen.',
    c:true, ex:'WAAR. HMG-CoA-reductase is het sleutelenzym in cholesterolsynthese in de lever. Remming → minder intracellulair cholesterol → meer LDL-receptoren → meer LDL-opname uit bloed. Bijwerking: myopathie (check CK bij spierpijn).' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Jongeman 22j valt flauw op het sportveld. Vader overleed plotseling op 38j. Systolisch geruis dat toeneemt bij Valsalva. Diagnose?',
    a:['Aortastenose','Hypertrofische cardiomyopathie (HCM)','Mitralisklepprolaps','Wolff-Parkinson-White'], c:1,
    ex:'HCM: asymmetrische septumhypertrofie, autosomaaldominant. Geruis neemt toe bij Valsalva (minder vulling → meer obstructie). Risico plotse hartdood bij jongeren. Behandeling: bètablokker, ICD bij hoog risico, sport verboden.' },

  { type:'lab', d:5, domain:'cardio', dl:'Cardiologie',
    q:'Man 52j: pijn op de borst 3 uur geleden. Eerste troponine normaal. Wat is het juiste beleid?',
    a:['Ontslaan: eerste troponine normaal','Herhaal troponine na 3-6 uur','Direct PCI starten','Alleen ECG herhalen'], c:1,
    ex:'Troponine stijgt pas 3-6 uur na infarct. Eén normale waarde sluit NSTEMI niet uit. Herhaal na 3-6 uur (of 1-2 uur met hoog-sensitief troponine). Combineer met ECG en kliniek. Laat de patiënt nooit te vroeg gaan!' },

  { type:'lab', d:5, domain:'cardio', dl:'Cardiologie',
    q:'Welke biomarker is het meest specifiek verhoogd bij acuut myocardinfarct?',
    a:['CK-MB','Myoglobine','Troponine I of T','LDH'], c:2,
    ex:'Troponine I en T zijn hartspecifiek en de gouden standaard voor AMI. CK-MB is minder specifiek (ook in skeletspier). Myoglobine stijgt vroeg maar is niet cardiospecifiek. Hoog-sensitief troponine detecteert zelfs kleine infarcten.' },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Een droge hoest is een bekende bijwerking van ACE-remmers.',
    c:true, ex:'WAAR. ACE-remmers remmen ook de afbraak van bradykinine → accumulatie → prikkeling van de hoestreflex. Komt voor bij 10-15% van patiënten. Oplossing: overstappen op ARB (bijv. valsartan), die bradykinine niet ophopen.' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 62j: pijn in de kuit bij lopen, verdwijnt in rust, rookt 30 jaar. ABI (enkel-arm-index) = 0.65. Diagnose?',
    a:['Diepe veneuze trombose','Perifeer arterieel vaatlijden','Spataderen','Diabetische neuropathie'], c:1,
    ex:'PAV: claudicatio intermittens. ABI <0.9 = PAV, <0.4 = kritisch. Oorzaak: atherosclerose. Risicofactoren: roken, diabetes, hypertensie. Behandeling: stoppen met roken, looptraining, plaatjesremmer, statine.' },

  { type:'pharma', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Wat is het werkingsmechanisme van aspirine als bloedplaatjesremmer?',
    a:['Blokkeert ADP-receptor P2Y12','Remt COX-1 irreversibel → minder tromboxaan A2','Blokkeert glycoproteïne IIb/IIIa','Activeert plasminogeen'], c:1,
    ex:'Aspirine acetyleert COX-1 irreversibel → geen TXA2-synthese → bloedplaatjes aggregeren minder. Effect duurt levenslang van het plaatje (7-10 dagen). Hoge dosis = anti-inflammatoir. Lage dosis (80-100mg) = antithrombotisch.' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 60j met hypertensie: plotse verscheurende pijn tussen schouderbladen, RR rechts 160/90, links 120/80. CT: dubbelloop aorta. Diagnose?',
    a:['STEMI','Longembolie','Aortadissectie','Aorta-aneurysma ruptuur'], c:2,
    ex:'Aortadissectie: intima scheurt → bloed in aortawand. Klassiek: plotse verscheurende pijn + bloeddruksverschil tussen armen. Type A (opstijgend): chirurgie spoedmatig. Type B (dalend): medisch met bètablokker + bloeddrukcontrole.' },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Amiodaron kan zowel hypo- als hyperthyreoïdie veroorzaken.',
    c:true, ex:'WAAR. Amiodaron bevat 37% jodium. Kan hypothyreoïdie veroorzaken (jodium remt schildklierhormoonproductie, Wolff-Chaikoff-effect) maar ook hyperthyreoïdie (jodiumoverload triggert autonome productie). Monitor TSH regelmatig.' },

  // ── Neurologie (nieuw) ──
  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 70j: plotse uitval van rechterarm en -been, dysartrie, na 45 minuten volledig hersteld. Diagnose?',
    a:['Insulte (CVA)','TIA','Epileptische aanval','Migraine met aura'], c:1,
    ex:'TIA: focale neurologische uitval <24 uur (meestal <1 uur) door tijdelijke ischemie. MRI-DWI kan toch kleine infarcten tonen. Hoog risico op CVA in komende 48 uur — ABCD²-score voor risicostratificatie. Spoed behandeling: aspirine + statine + bloeddrukcontrole.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 45j: ergste hoofdpijn van haar leven, plotseling ontstaan, nekstijfheid, lichtschuw. CT hoofd normaal. Wat nu?',
    a:['Toedienen paracetamol en afwachten','Lumbaalpunctie uitvoeren','MRI hersenen aanvragen','Direct antibiotica starten zonder verder onderzoek'], c:1,
    ex:'Thunderclap hoofdpijn + nekenrigiditeit → altijd subarachnoïdale bloeding uitsluiten. CT mist 2-5% SAB in eerste uren. Lumbaalpunctie: xanthochromie (geel vocht) of verhoogde erytrocyten na 12 uur bevestigt SAB. Oorzaak: aneurysmaruptuur.' },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Bij een ischemisch CVA mag trombolyse met alteplase gegeven worden tot 4,5 uur na begin van de klachten.',
    c:true, ex:'WAAR. Alteplase trombolyse mag tot 4,5 uur na symptoomonset (mits geen contra-indicaties). Eerder = beter: "time is brain". Contra-indicaties: recent chirurgie, bloedingsdiathese, bloeddruk >185/110, bloedglucose <2.7 of >22.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 25j: tonisch-clonische aanval 3 minuten, daarna verward en slaperig. Geen koorts. Eerste aanval. Meest waarschijnlijke diagnose?',
    a:['Meningitis','Epilepsie','Hypoglykemie','Psychogene aanval'], c:1,
    ex:'Epilepsie: tonisch-clonische aanval + postictale fase (verwardheid, vermoeidheid). Eerste aanval: EEG en MRI voor structurele oorzaak. Antiepilepticum bij twee aanvallen of verhoogd recidiefrisico. Rijverbod geldt tot 1 jaar aanvalsvrij.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 30j: episodisch dubbelzijdige armen en benen zwak, ooghangend (ptosis), erger aan einde van dag. Verbetering na ijs op oog. Diagnose?',
    a:['Multiple sclerose','Myasthenia gravis','Amyotrofische lateraalsclerose','Guillain-Barré'], c:1,
    ex:'MG: auto-antilichamen tegen acetylcholinereceptor → neuromusculaire transmissie gestoord. Klassiek: vermoeibare zwakte, ptosis, wisselend beloop. IJstest: kou verbetert transmissie tijdelijk. Behandeling: pyridostigmine, immunosuppressie, thymectomie.',
    wiki: {
      kern: 'Myasthenia gravis is een auto-immuunziekte waarbij antilichamen de verbinding tussen zenuw en spier blokkeren. Het kenmerk: spierzwakte die verergert bij gebruik en verbetert na rust. Dit verklaart de typische "einde van de dag"-verslechtering.',
      mechanisme: 'Antilichamen binden de acetylcholinereceptor (AChR) op de spier → minder receptoren beschikbaar → spiervezels reageren steeds minder op signalen. Bij de ijstest verbetert de AChR-functie tijdelijk omdat kou de antilichaamwerking remt.',
      onderscheid: 'MS: centraal zenuwstelsel, demyelinisatie, sensibiliteit ook aangedaan. Lambert-Eaton (LEMS): ook neuromusculair, maar zwakte verbetert juist bij herhaald gebruik — vaak paraneoplastisch bij longkanker. ALS: ook motorisch, maar irreversibel en met fasciculaties.',
      therapie: 'Stap 1: pyridostigmine (anticholinesterase — meer ACh beschikbaar). Stap 2: immunosuppressie (prednisolon, azathioprine). Thymectomie bij thymoom of jonge patiënten. Bij crisis: IVIG of plasmaferese. Vermijd bepaalde antibiotica (aminoglycosiden — verergeren MG).',
    } },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Multiple sclerose tast zowel het centraal als het perifeer zenuwstelsel aan.',
    c:false, ex:'NIET WAAR. MS is een demyeliniserende ziekte van het centraal zenuwstelsel (hersenen + ruggenmerg). Het perifeer zenuwstelsel wordt gespaard. Kenmerk: laesies gescheiden in tijd en plaats. Diagnose: MRI + klinisch beeld + liquoronderzoek.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 65j: progressief geheugenverlies, persoonlijkheidsverandering, 3 jaar klachten. MRI: diffuse corticale atrofie temporopariëtaal. Diagnose?',
    a:['Vasculaire dementie','Alzheimer','Lewy-body dementie','Frontotemporale dementie'], c:1,
    ex:'Alzheimer: meest voorkomende dementievorm (60-70%). Pathologie: amyloïd-plaques + tau-neurofibrillaire klitten. Temporopariëtale atrofie op MRI. Vroeg: geheugenproblemen. Later: apraxie, agnosie. Behandeling: cholinesteraseremmers (symptomatisch).',
    wiki: {
      kern: 'Alzheimer is de meest voorkomende oorzaak van dementie (60-70%). Het begint sluipend met vergeetachtigheid voor recente gebeurtenissen en verloopt progressief over jaren. De hersenen krimpen zichtbaar, vooral in het geheugen- en oriëntatiegebied (temporopariëtaal).',
      mechanisme: 'Twee eiwitten slaan mis: (1) bèta-amyloïd hoopt op als plaques tussen zenuwcellen en verstoort communicatie, (2) tau-eiwit klontert binnen neuronen als neurofibrillaire klitten. Samen leiden ze tot neuronsterfte. De acetylcholine-aanmaak daalt sterk — vandaar de behandeling.',
      onderscheid: 'Vasculaire dementie: plots begin of trapsgewijs verloop, cardiovasculaire risicofactoren, witte stof afwijkingen op MRI. Lewy-body dementie: visuele hallucinaties, parkinsonisme, slaap-REM-stoornissen — extreem gevoelig voor antipsychotica. Frontotemporale dementie: jong begin (<65j), persoonlijkheidsverandering vóór geheugenklachten, taaluitval.',
      therapie: 'Cholinesteraseremmers (donepezil, rivastigmine) verhogen acetylcholine — symptoomverlichting, geen genezing. Memantine (NMDA-remmer) bij matige-ernstige Alzheimer. Nieuw: lecanemab/donanemab (anti-amyloïd antilichamen) vertraagt ziekte bij vroege Alzheimer.',
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 35j: plotse eenzijdige visusdaling, pijn bij oogbewegingen, kleur ziet minder helder. MRI: witte stof afwijking in nervus opticus. Diagnose?',
    a:['Glaucoom','Retina-ablatio','Neuritis optica','Migraine met aura'], c:2,
    ex:'Neuritis optica: inflammatie van de oogzenuw, vaak eerste uiting van MS. Pijn bij oogbewegingen + unilateraal visusverliess + verminderde kleurwaarneming. Behandeling: IV methylprednisolon versnelt herstel. MRI-hersenen verplicht.' },

  { type:'pharma', d:3, domain:'neuro', dl:'Neurologie',
    q:'Welk medicijn is eerstekeus bij gegeneraliseerde tonisch-clonische epilepsie?',
    a:['Carbamazepine','Natriumvalproaat','Fenytoïne','Gabapentine'], c:1,
    ex:'Valproaat is breed-spectrum antiepilepticum: werkt bij gegeneraliseerde én partiële aanvallen. Remt Na-kanalen en verhoogt GABA. Cave: teratogeen — absoluut vermijden bij vrouwen in vruchtbare leeftijd zonder adequate anticonceptie. Alternatief: levetiracetam.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 55j: progressieve zwakte benen, later armen, fasciculaties, geen sensibiliteitsstoornissen, hyperreflexie. Diagnose?',
    a:['Guillain-Barré syndroom','Multiple sclerose','Amyotrofische lateraalsclerose (ALS)','Myasthenia gravis'], c:2,
    ex:'ALS: degeneratie van centrale én perifere motorische neuronen. Combinatie UMN (hyperreflexie, spasticiteit) + LMN (fasciculaties, atrofie) zónder sensibiliteitsverlies. Progressief, fataal gemiddeld 3-5 jaar. Riluzol verlengt overleving licht.' },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Guillain-Barré syndroom begint typisch in de armen en verspreidt zich naar de benen.',
    c:false, ex:'NIET WAAR. GBS begint typisch in de benen (ascending paralysis) en verspreidt zich omhoog. Oorzaak: auto-immuun demyelinisatie perifere zenuwen, vaak na infectie (Campylobacter, CMV). Behandeling: IVIG of plasmaferese. Let op ademhaling!' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 72j: rusttremor rechterhand, stijfheid, traagheid, kleine pasjes. Diagnose?',
    a:['Essentiële tremor','Parkinson','Multisystematrofie','Huntington'], c:1,
    ex:'Parkinson: verlies dopaminerge neuronen in substantia nigra. Klassieke triade: rusttremor (pil-draaibewegingen) + rigiditeit + bradykinesie. Asymmetrisch begin. Behandeling: levodopa (meest effectief). Niet-motorische sympt: depressie, reukstoornissen.',
    wiki: {
      kern: 'Parkinson ontstaat door het progressief afsterven van dopamine-producerende neuronen in de substantia nigra (middenhersenen). Dopamine is nodig voor vloeiende, gecoördineerde bewegingen. Als 70-80% verloren is, verschijnen de symptomen.',
      mechanisme: 'Alfa-synucleine-eiwit klontert samen in Lewy-bodies in de resterende neuronen — dit versnelt de celdood. Waarom dit begint is onduidelijk (genetisch + omgevingsfactoren). De ziekte sluipt: reukproblemen en slaapstoornissen gaan jaren vooraf aan de motorische klachten.',
      onderscheid: 'Essentiële tremor: tremor bij bewegen (niet in rust), geen rigiditeit/bradykinesie, verbetert met alcohol, familiegeschiedennis. MSA/PSP: Parkinson-plus syndromen, reageren slecht op levodopa, vallen vroeg in het beloop. DLB (Lewy-body dementie): parkinsonisme + dementie + hallucinaties tegelijk.',
      therapie: 'Levodopa + carbidopa is het meest effectief (converteert naar dopamine in hersenen). Dopamine-agonisten (pramipexol) als alternatief bij jongeren. Later: diepe hersenstimulatie (DBS) bij therapieresistente tremor. Niet-motorisch: antidepressiva, slaapbegeleiding, fysiotherapie.',
    } },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 40j: migraine-aanvallen, nu ook zwakte linkerarm tijdens aanval. Wat is de term hiervoor?',
    a:['Aura zonder hoofdpijn','Hemiplegische migraine','Basilaire migraine','TIA'], c:1,
    ex:'Hemiplegische migraine: zeldzame vorm waarbij motorische uitval optreedt als aurasymptoom. Belangrijk: eerst TIA/CVA uitsluiten! Familiaire vorm: CACNA1A-genmutatie. Triptanen en ergotaminen gecontra-indiceerd bij hemiplegische migraine.' },

  { type:'lab', d:5, domain:'neuro', dl:'Neurologie',
    q:'Liquor: verhoogd eiwit, normaal glucose, lymfocytose, oligoklonale banden aanwezig. Meest waarschijnlijke diagnose?',
    a:['Bacteriële meningitis','Multiple sclerose','Virale meningitis','Subarachnoïdale bloeding'], c:1,
    ex:'Oligoklonale banden in liquor (niet in serum) zijn kenmerkend voor MS — aanwezig bij >95%. Virale meningitis: lymfocytose + normaal eiwit + normaal/licht verlaagd glucose. Bacterieel: neutrofiele pleiocytose + sterk verhoogd eiwit + laag glucose.' },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Bij bacteriële meningitis moet lumbaalpunctie altijd worden uitgesteld tot na CT-scan.',
    c:false, ex:'NIET WAAR. Antibiotica mogen NIET worden uitgesteld voor CT. Start direct antibiotica als er tekenen van verhoogde hersendruk zijn (papiloedeem, bewustzijnsdaling) en doe dan CT. Anders: LP eerst. Uitstel antibiotica verhoogt mortaliteit significant.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Kind 8j: plotse bewusteloosheid, starende blik 10 seconden, daarna normaal. Geen tonisch-clonische bewegingen. EEG: 3Hz spike-wave. Diagnose?',
    a:['Grote aanval (tonisch-clonisch)','Absence-epilepsie','Focale epilepsie','Syncope'], c:1,
    ex:'Absence-epilepsie: korte bewustzijnsonderbreking, geen postictale fase, typisch 3Hz generalized spike-wave op EEG. Begint op kinderleeftijd, vaak spontane remissie. Behandeling: ethosuximide of valproaat. Geen rijverbod tot 1 jaar vrij.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 50j: acuut eenzijdige aangezichtsverlamming, ook voorhoofd aangedaan, geen andere uitval. Diagnose?',
    a:['Centraal CVA','Bells palsy (perifere facialisparese)','TIA','Hersentumor'], c:1,
    ex:'Bells palsy: perifere n.facialis-parese → ook voorhoofd aangedaan (centraal CVA: voorhoofd gespaard door bilaterale innervatie). Oorzaak: vaak HSV-reactivatie. Behandeling: prednisolon binnen 72 uur + aciclovir. Prognose: 80% volledig herstel.' },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Dopamine kan de bloed-hersenbarrière passeren en wordt daarom direct als medicijn gegeven bij Parkinson.',
    c:false, ex:'NIET WAAR. Dopamine passeert de bloed-hersenbarrière NIET. Daarom geeft men levodopa (precursor), dat wel passeert en in het brein omgezet wordt. Levodopa wordt gecombineerd met carbidopa/benserazide (perifere decarboxylaseremmer) om bijwerkingen te verminderen.' },

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

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Metformine is gecontra-indiceerd bij nierfunctiestoornissen vanwege het risico op lactaatacidose.',
    c:true, ex:'WAAR. Metformine remt mitochondriaal complex I → verhoogde lactaatproductie. Bij nierfalen stapelt metformine op → toxisch. Stop bij eGFR <30, wees voorzichtig bij <45. Tijdelijk stoppen bij jodiumhoudend contrast of ernstige ziekte.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welk medicijn geef je bij een opiaat-overdosis met bewusteloosheid en ademdepressie?',
    a:['Flumazenil','Naloxon','Atropine','Physostigmine'], c:1,
    ex:'Naloxon: competitieve opiaat-antagonist op μ-receptor. Keert ademdepressie snel om. Werkt korter dan opiaten → herhaling of infuus nodig. Flumazenil is antidotum voor benzodiazepinen. Cave: bij opiaat-afhankelijkheid → acute onttrekking.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Patiënt gebruikt warfarine en start met fluconazol (schimmelinfectie). Wat verwacht je?',
    a:['Warfarine-effect vermindert','Warfarine-effect neemt toe → bloedingsrisico','Geen interactie','Fluconazol werkt niet meer'], c:1,
    ex:'Fluconazol remt CYP2C9, het enzym dat warfarine afbreekt → warfarine stapelt op → INR stijgt → bloedingsrisico. Altijd INR controleren bij toevoegen of stoppen van CYP-remmers/-inductoren. Andere CYP2C9-remmers: amiodaron, metronidazol.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Paracetamol-overdosis veroorzaakt leverschade door accumulatie van het toxisch metaboliet NAPQI.',
    c:true, ex:'WAAR. Normaal: NAPQI snel geneutraliseerd door glutathion. Overdosis: glutathion uitgeput → NAPQI bindt levercellen → necrose. Antidotum: N-acetylcysteïne (NAC) herstelt glutathion. Begin symptomen pas na 24-72u — geef NAC niet te laat!' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welk diureticum remt het Na/K/2Cl-cotransporter in de lis van Henle?',
    a:['Hydrochloorthiazide','Furosemide','Spironolacton','Amiloride'], c:1,
    ex:'Lisdiuretica (furosemide): remmen NKCC2 in de opgaande lis → krachtige natriurese en diurese. Bijwerkingen: hypokaliëmie, hyponatriëmie, hypomagnesemie, ototoxiciteit (hoge dosis). Indicaties: acuut longoedeem, hartfalen, hypercalciëmie.' },

  { type:'diagnose', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Man neemt teveel van zijn slaapmiddel (benzodiazepine). Hij is slaperig maar ademt goed. Welk antidotum is beschikbaar?',
    a:['Naloxon','Flumazenil','N-acetylcysteïne','Atropine'], c:1,
    ex:'Flumazenil: competitieve GABA-A-antagonist → keert benzodiazepine-effecten om. Korte werking (30-60 min) → herhaling nodig. Cave: bij chronisch gebruik → onttrekkingsconvulsies. Naloxon is het antidotum voor opiaten, niet benzodiazepinen.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
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

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Tetracyclines (doxycycline) zijn veilig bij kinderen jonger dan 8 jaar.',
    c:false, ex:'NIET WAAR. Tetracyclines binden aan calciumionen in bot en tanden → verkleuring en tandglazuur-defecten bij kinderen <8 jaar. Uitzondering: ernstige indicaties zoals rickettsia-infecties. Vermijd ook in zwangerschap (nadelen voor foetale botvorming).' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Welke protonpompremmer (PPI) heeft de meeste klinisch relevante CYP2C19-interacties?',
    a:['Pantoprazol','Rabeprazol','Omeprazol','Esomeprazol'], c:2,
    ex:'Omeprazol is de sterkste CYP2C19-remmer onder de PPIs → kan effect van clopidogrel verminderen (clopidogrel is prodrug die CYP2C19 nodig heeft voor activering). Pantoprazol heeft minimale CYP-interacties — voorkeur bij clopidogrel-gebruik.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
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

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'SSRIs (selectieve serotonineheropnameremmers) werken onmiddellijk: verbetering van depressie binnen 1-3 dagen.',
    c:false, ex:'NIET WAAR. SSRIs verbeteren depressieve klachten pas na 2-4 weken. De synaptische serotonineverhoging is direct, maar het therapeutische effect vereist neuroplastische aanpassingen. Bijwerkingen (misselijkheid, angst) kunnen eerder optreden. Doorzetten is belangrijk!' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Een patiënt met een convulsie in de ambulance. Welk medicijn geef je IV als eerste stap?',
    a:['Fenytoïne','Valproaat','Lorazepam of diazepam','Levetiracetam'], c:2,
    ex:'Status epilepticus: benzodiazepinen (lorazepam IV, of diazepam rectaal) zijn eerste stap — snel werkend, versterken GABA-signaal. Als aanval niet stopt na 5 min: tweede middel (levetiracetam, valproaat, fenytoïne). Na 30 min: anesthesie overwegen.' },

  // ── Infectiologie (nieuw) ──
  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Vrouw 24j: pijn bij plassen, frequentie, geen koorts. Urine: leukocyturie, nitriet positief. Diagnose?',
    a:['Pyelonefritis','Ongecompliceerde urineweginfectie','Chlamydia-infectie','Interstitiële cystitis'], c:1,
    ex:'Ongecompliceerde UWI (cystitis): dysurie + frequentie + leukocyturie + nitriet (gramnegatieve bacteriën). Geen koorts/flankpijn → geen pyelonefritis. Behandeling: nitrofurantoïne 5d of fosfomycine 1d. Niet: onnodig ciprofloxacine (resistentie!). ' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'MRSA staat voor methicilline-resistente Staphylococcus aureus en is resistent tegen alle bètalactam-antibiotica.',
    c:true, ex:'WAAR. MRSA bezit het mecA-gen → gewijzigd PBP2a → bètalactams binden niet meer. Dus resistent tegen penicillines, cefalosporines én carbapenems. Behandeling: vancomycine of linezolid. Isolatiemaatregelen vereist in ziekenhuis.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Man 35j na tandartsbehandeling: koorts 39°C, nieuw hartgeruis, hematurie. Echo hart: vegetatie op mitralisklep. Diagnose?',
    a:['Reumatische koorts','Infectieuze endocarditis','Myocarditis','Pericard­itis'], c:1,
    ex:'Endocarditis: bacteriële vegetaties op hartkleppen. Duke-criteria: koorts + vegetatie op echo + bacteriëmie. Oorzaken: Streptococcus viridans (tandartsbehandeling), Staphylococcus aureus (IV-drugsgebruikers). Behandeling: langdurig IV antibiotica, soms chirurgie.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Kind 5j: keelpijn, koorts, rode keel met exsudaat, pijnlijke halslymfklieren. Snelle streptokokkentest positief. Behandeling?',
    a:['Afwachten, verdwijnt vanzelf','Amoxicilline 10 dagen','Ciprofloxacine 5 dagen','Azithromycine 1 dag'], c:1,
    ex:'Groep A Streptokokkenfaryngitis: amoxicilline 10 dagen (penicilline V alternatief). Doel: voorkomen reumatische koorts (hart/gewrichtscomplicatie). Bij penicillineallergie: erythromycine/azithromycine. Niet: antibiotica bij virale keelontsteking (50-80%).' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
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
    ex:'Malaria: Plasmodium-infectie overgedragen door Anopheles-mug. Bloeduitstrijk is gouden standaard. P. falciparum = meest gevaarlijk (hersenmalaria). Behandeling: artemisinine-combinatietherapie. Profylaxe: afhankelijk van bestemming (atovaquon/proguanil, mefloquine).' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
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

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
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

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
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

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Bij sepsis is het starten van antibiotica de hoogste prioriteit — dit mag nooit wachten op bloedkweken.',
    c:false, ex:'NIET WAAR. Bloedkweken moeten worden afgenomen VOOR antibioticastart (2 sets uit 2 plaatsen) — maar dit mag maximaal enkele minuten duren. Antibiotica moet binnen 1 uur bij septische shock. Prioriteit: bloedkweken snel afnemen, daarna DIRECT antibiotica.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Patiënt 70j, verpleeghuis: koorts, verwardheid, hematurie. Urine: pyurie, gramnegatieve staven op kweek. Diagnose?',
    a:['Ongecompliceerde cystitis','Urosepsis','Prostatitis','Vaginitis'], c:1,
    ex:'Urosepsis: UWI met systemische tekenen (koorts, tachycardie, hypotensie, verwardheid). Ouderen presenteren atypisch (verwardheid zonder koorts). Verwekker: E. coli (80%). Behandeling: IV breedspectrum antibiotica (cefuroxim, piperacilline-tazobactam), bloedkweken eerst.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Tiener 16j: keelpijn, moeheid, vergrote lymfklieren, vergrote milt. Atypische lymfocyten op bloeduitstrijk. Diagnose?',
    a:['Streptokokkenfaryngitis','Infectious mononucleosis (EBV)','Leukemie','CMV-infectie'], c:1,
    ex:'Ziekte van Pfeiffer (mononucleosis): EBV-infectie. Klassiek: koorts + keelpijn + lymfadenopathie + splenomegalie. Atypische lymfocyten, positieve monospot-test. Geef GEEN amoxicilline → exantheem! Rustig aan, vermijd contact­sport (miltruptuurrisico).' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
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

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium — Waar of Niet?',
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

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium — Waar of Niet?',
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

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium — Waar of Niet?',
    q:'Troponine kan ook verhoogd zijn bij nierfalen zonder hartinfarct.',
    c:true, ex:'WAAR. Verhoogd troponine bij nierinsufficiëntie: verminderde klaring + chronische myocardstress. Maar: bij acute stijging (>20% over 3-6 uur) moet AMI actief worden uitgesloten. Context is alles: nierfunctie + klinisch beeld + ECG.' },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'Man 30j: jarenlang alcoholmisbruik. Bloedbeeld: MCV 110 fL, Hb laag, normoblastair beenmerg. Diagnose?',
    a:['IJzergebreksanemie','Megaloblastaire anemie door foliumzuur-/B12-gebrek','Hemolytische anemie','Aplastische anemie'], c:1,
    ex:'Megaloblastaire anemie: macrocyten (MCV >100) door tekort aan B12 of foliumzuur → gestoorde DNA-synthese. Alcohol: malnutritie → foliumzuurgebrek. B12-gebrek: atrofische gastritis, veganisten, malabsorptie. Behandeling: foliumzuur/B12-suppletie.' },

  { type:'diagnose', d:3, domain:'lab', dl:'Laboratorium',
    q:'LP-uitslag:\nHeldere liquor\nLymfocytose 80 cellen\nEiwit 0.7 g/L (licht verhoogd)\nGlucose normaal\nMeest waarschijnlijk?',
    a:['Bacteriële meningitis','Virale meningitis','SAB','TBC-meningitis'], c:1,
    ex:'Virale (aseptische) meningitis: helder/opalescent vocht, lymfocytaire pleocytose, normaal glucose, licht verhoogd eiwit. Verwekkers: enterovirus, HSV, EBV. Meist self-limiting. HSV-encefalitis: liquor + MRI temporaalkwab afwijking → aciclovir direct!' },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium — Waar of Niet?',
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

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium — Waar of Niet?',
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

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium — Waar of Niet?',
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
    ex:'Hepatocellulair patroon: ALAT en ASAT sterk verhoogd, ALP relatief normaal. ALAT is leverbspecifieker dan ASAT. Oorzaken: virale hepatitis, alcoholische hepatitis, auto-immuun hepatitis, geneesmiddelenschade. Bij ASAT/ALAT-ratio >2: denk aan alcohol.' },

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium — Waar of Niet?',
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

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium — Waar of Niet?',
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

  { type:'truefalse', d:2, domain:'lab', dl:'Laboratorium — Waar of Niet?',
    q:'Een verhoogd CK (creatinekinase) is specifiek voor hartschade.',
    c:false, ex:'NIET WAAR. CK is aanwezig in skeletspier, hartspier en hersenen. CK stijgt bij elke spierziekte: rhabdomyolyse, myositis, trauma, intensief sporten, myocardinfarct. Voor hartschade is troponine I/T veel specifieker. CK-MB is iets specifieker voor hart maar ook minder dan troponine.' },

  // ── Infectiologie (nieuw batch 2) ──
  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Vrouw 22j: pijnloze vaginale afscheiding, pijn bij plassen. Kweek: gramnegatieve diplokok. Meest waarschijnlijke diagnose?',
    a:['Chlamydia','Gonorroe','Trichomonas','Bacteriële vaginose'], c:1,
    ex:'Gonorroe (Neisseria gonorrhoeae): gramnegatieve diplokok, seksueel overdraagbaar. Vaak asymptomatisch bij vrouwen. Behandeling: ceftriaxon 500 mg IM eenmalig. Altijd testen op chlamydia erbij (co-infectie 20-40%). Partnerwaarschuwing verplicht.' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Chlamydia trachomatis-infectie verloopt bij de meeste vrouwen zonder klachten (asymptomatisch).',
    c:true, ex:'WAAR. Chlamydia is de meest voorkomende seksueel overdraagbare infectie in Nederland. Tot 70% van de vrouwen heeft geen klachten. Onbehandeld risico op PID (bekkenontstekingsziekte), eileiderletsel en verminderde vruchtbaarheid. Behandeling: azithromycine 1g eenmalig of doxycycline 7 dagen.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Vrouw 28j: koorts 39°C, flankpijn rechts, pijn bij plassen, misselijkheid. Urinekweek: E. coli. Diagnose?',
    a:['Ongecompliceerde cystitis','Pyelonefritis','Appendicitis','Niersteen'], c:1,
    ex:'Pyelonefritis: UWI met systemische tekenen (koorts, flankpijn, misselijkheid) = bovenste urineweginfectie. Behandeling: ciprofloxacine of cotrimoxazol oraal 7-14 dagen. Bij braken of ernstige ziekte: ziekenhuis­opname met IV antibiotica.' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Norovirus (buikgriep) verspreidt zich voornamelijk via de lucht (aerogene transmissie).',
    c:false, ex:'NIET WAAR. Norovirus verspreidt zich primair fecaal-oraal: besmet voedsel/water of oppervlakken. Ook via braaksel­deeltjes (bij overgeven kunnen aerosoldeeltjes vrijkomen). Alcohol-handenreiniger is NIET effectief — zeep en water nodig. Besmettelijkheid al bij 18 virusdeeltjes.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Patiënt komt terug uit Zuidoost-Azië: hoge koorts, ernstige hoofd-/spierpijn, huiduitslag, trombocyten 68 × 10⁹/L. Geen malaria op bloeduitstrijk. Diagnose?',
    a:['Malaria','Dengue','Typhoid','Leptospirose'], c:1,
    ex:'Dengue: flavivirus overgedragen door Aedes-mug. Kenmerken: hoge koorts, hevige spier-/gewrichtspijn ("breakbone fever"), maculopapuleuze uitslag, lage trombocyten. Geen specifieke behandeling — symptomatisch. Geen aspirine of ibuprofen (bloedingsrisico bij lage trombocyten).' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Immuungecompromitteerde patiënt (na niertransplantatie): koorts, witte plekken in de mond die loslaten. Diagnose?',
    a:['Herpes simplex','Orofaryngeale candidiasis (spruw)','Aphteuze stomatitis','Streptokokkenfaryngitis'], c:1,
    ex:'Orofaryngeale candidiasis: Candida albicans overgroei bij immuun­suppressie, antibiotica­gebruik, corticosteroïden of droge mond. Witte beslag dat loskomt bij wrijven, pijnlijk. Behandeling: fluconazol oraal of nystatin suspensie lokaal.' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Hepatitis B kan worden overgedragen via besmette bloedtransfusies, seksueel contact én van moeder op kind bij de bevalling.',
    c:true, ex:'WAAR. HBV is 50-100× besmettelijker dan HIV via bloed. Transmissieroutes: bloed (prikongeval, transfusie), seksueel, verticaal (moeder→kind). Preventie: vaccinatie + HBIG bij pasgeborenen van HBsAg-positieve moeders. HBV-vaccin is effectief en onderdeel van het rijksvaccinatieprogramma.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Patiënt na tandheelkundige ingreep: koorts, nieuwe hartgeruis, positieve bloedkweken met Streptococcus viridans. Diagnose?',
    a:['Reumatische koorts','Infectieuze endocarditis','Myocarditis','Pericarditis'], c:1,
    ex:'Infectieuze endocarditis (IE): vegetaties op hartkleppen. Duke-criteria: positieve bloedkweken + echocardiografisch bewijs van vegetatie. Streptococcus viridans: klassiek na tandheelkundige ingreep. Behandeling: langdurig IV antibiotica (4-6 weken). Cave embolieën.' },

  { type:'truefalse', d:2, domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Bij een tetanusvaccinatie-naïeve patiënt met een diepe wond moet alleen het vaccin gegeven worden.',
    c:false, ex:'NIET WAAR. Bij een niet-gevaccineerde patiënt met tetanusrisico: zowel het tetanus-toxoïdvaccin (actieve immunisatie) ALS tetanus-immuunglobuline (TIG, passieve immunisatie) geven. Het vaccin bouwt bescherming op voor de toekomst; TIG biedt directe bescherming nu.' },

  { type:'diagnose', d:3, domain:'infectio', dl:'Infectiologie',
    q:'Varicella (waterpokken) bij een volwassene van 35 jaar: welke ernstige complicatie moet actief worden uitgesloten?',
    a:['Otitis media','Varicella-pneumonie','Meningitis','Glomerulonefritis'], c:1,
    ex:'Varicella-pneumonie: bij volwassenen en immuungecompromitteerden veel ernstiger dan bij kinderen. Presenteert met hoest, dyspneu en koorts tijdens of vlak na de huiduitslag. Behandeling: aciclovir IV. Zwangere vrouwen extra kwetsbaar → directe behandeling.' },

  // ── Farmacologie (nieuw batch 2) ──
  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
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
    ex:'Digoxinetoxiciteit: smal therapeutisch venster. Symptomen: misselijkheid, gele/groene visie, bradycardie, AV-blokken. Risicofactoren: nierfalen (verminderde klaring), hypokaliëmie (sensitiseert hart), hoge leeftijd. Behandeling: stop digoxine, digoxine-Fab-fragmenten bij ernstige toxiciteit.' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Patiënten met een penicilline-allergie mogen nooit cefalosporines krijgen vanwege een hoge kans op kruisreactie.',
    c:false, ex:'NIET WAAR. De kruisreactierate tussen penicillines en cefalosporines is slechts 1-2%, veel lager dan vroeger gedacht. Bij een lichte penicilline-reactie (huiduitslag, geen anafylaxie) kunnen cefalosporines veilig worden gebruikt. Alleen bij anafylaxie is extra voorzichtigheid geboden.' },

  { type:'pharma', d:3, domain:'pharma', dl:'Farmacologie',
    q:'Waarom worden benzodiazepinen als slaapmiddel afgeraden bij ouderen boven de 65 jaar?',
    a:['Ze werken niet bij ouderen','Verhoogd risico op vallen, verwardheid en cognitieve achteruitgang','Ze veroorzaken afhankelijkheid alleen bij jongeren','Ze zijn te duur voor ouderen'], c:1,
    ex:'Benzodiazepinen bij ouderen: tragere afbraak → ophoping → overdag nog sederend → valrisico + heupfractuur + verwarring + cognitieve achteruitgang. Alternatief: slaaphygiëne, melatonine of kortdurende lage-dosis Z-drug. Staat op de Beers-lijst (vermijden bij ouderen).' },

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
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

  { type:'truefalse', d:2, domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Paracetamol is veilig in elke dosis en heeft geen leverschadelijk effect.',
    c:false, ex:'NIET WAAR. Paracetamol is veilig binnen de aanbevolen dosis (max 4g/dag, max 3g/dag bij leverziekte/alcoholmisbruik). Bij overdosis: toxisch metaboliet NAPQI ophoping → levernecrose. Antidotum: N-acetylcysteïne (NAC). Paracetamol-overdosis is een van de meest voorkomende oorzaken van acuut leverfalen.' },

  // ── Neurologie (nieuw batch 2) ──
  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 45j na auto-ongeluk: rugpijn, zwakte in beide benen, verlies van blaascontrole. Urgente diagnose?',
    a:['Lumbale hernia','Cauda equina syndroom','Perifere neuropathie','Wervelmetastase'], c:1,
    ex:'Cauda equina syndroom: druk op de zenuwbundel onderaan het ruggenmerg → zwakte benen + blaas-/darmstoornissen + zadel­anesthesie. Neurochirurgische urgentie: MRI direct en decompressie binnen 24-48u voor beste herstel.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 68j: draaiduizeligheid die seconden duurt, uitgelokt door omdraaien in bed, geen gehoorverlies. Diagnose?',
    a:['Cerebellair CVA','Ziekte van Ménière','BPPV (goedaardige paroxysmale positieveranderingsduizeligheid)','Vestibulair neuritis'], c:2,
    ex:'BPPV: kortdurende duizeligheid uitgelokt door hoofdbewegingen, veroorzaakt door losgeraakt otolietje in halfcirkelvormig kanaal. Diagnose: Dix-Hallpike-manoeuvre. Behandeling: Epley-manoeuvre. Geen medicatie nodig.' },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Een epileptische aanval die langer dan 5 minuten duurt, wordt beschouwd als status epilepticus en vereist directe behandeling.',
    c:true, ex:'WAAR. Status epilepticus: aanval >5 minuten of twee aanvallen zonder bewustzijnsherstel tussendoor. Behandeling: lorazepam of diazepam IV/rectaal direct. Bij uitblijven reactie: levetiracetam of valproaat IV. Na 30 min zonder respons: anesthesie.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 40j: progressieve choreiforme (kronkelende) bewegingen, gedragsverandering, familielid ook aangedaan. Diagnose?',
    a:['Parkinson','Huntington','Wilson','Tardieve dyskinesie'], c:1,
    ex:'Huntington: autosomaal dominante aandoening door CAG-herhaling in het HTT-gen. Triade: chorea + gedragsverandering + dementie. Begint typisch 35-50 jaar. Genetische test bevestigt diagnose. Geen curatieve behandeling.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 32j: koorts, verwardheid, temporaalkwab-afwijkingen op MRI, afwijkende liquor. Meest waarschijnlijke verwekker?',
    a:['Neisseria meningitidis','Herpes simplex virus type 1 (HSV-1)','Cryptococcus','Listeria'], c:1,
    ex:'HSV-encefalitis: temporale lokalisatie op MRI is kenmerkend. Presenteert met koorts, verwardheid en soms epilepsie. Behandeling: aciclovir IV zo snel mogelijk starten — zelfs vóór bevestiging via LP-PCR.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 35j: aanvallen van kloppende eenzijdige hoofdpijn met misselijkheid, lichtschuwheid, duren 4-72 uur. Diagnose?',
    a:['Spanningshoofdpijn','Clusterhoofdpijn','Migraine','Sinusitis'], c:2,
    ex:'Migraine: eenzijdige, kloppende hoofdpijn 4-72u + misselijkheid/braken + licht- en geluidsschuwheid. Aura bij 30%. Acute behandeling: triptan + NSAID. Profylaxe bij ≥4 aanvallen/maand: propranolol, topiramaat of amitriptyline.' },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Een subduraal hematoom ontstaat door ruptuur van de arteria meningea media en presenteert zich met een lucide interval.',
    c:false, ex:'NIET WAAR. Dat is een epiduraal hematoom (arterieel). Een subduraal hematoom ontstaat door ruptuur van brugvenen (veneus) en heeft een langzamer beloop — soms pas dagen tot weken na trauma. Komt vaker voor bij ouderen en mensen die bloedverdunners gebruiken.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Man 60j met prostaatkanker: acute rugpijn, zwakte benen, gestoord gevoel onder de knieën. MRI: massa op hoogte T8. Diagnose?',
    a:['Lumbale hernia','Metastatische ruggenmergcompressie','Aortadissectie','Perifere neuropathie'], c:1,
    ex:'Metastatische ruggenmergcompressie: oncologische urgentie! Direct dexamethason (16 mg IV) om zwelling te verminderen, gevolgd door radiotherapie of chirurgie. Hoe sneller behandeld, hoe meer loopfunctie behouden blijft.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie',
    q:'Vrouw 55j met DM2: branderig gevoel en tintelingen in beide voeten, symmetrisch, erger \'s nachts. Diagnose?',
    a:['Perifeer arterieel vaatlijden','Distale symmetrische polyneuropathie','Ruggenmergcompressie','Restless legs syndroom'], c:1,
    ex:'Diabetische polyneuropathie: meest voorkomende complicatie van DM, begint distaal symmetrisch (kousen-/handschoenpatroon). Oorzaak: chronisch hoge glucose beschadigt kleine bloedvaten van zenuwen. Behandeling: glucosecontrole, amitriptyline of duloxetine voor pijn.' },

  { type:'truefalse', d:2, domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Clusterhoofdpijn komt vaker voor bij vrouwen dan bij mannen.',
    c:false, ex:'NIET WAAR. Clusterhoofdpijn is juist een van de weinige hoofdpijnsoorten die vaker bij mannen voorkomt (M:V ≈ 3:1). Presentatie: extreem hevige eenzijdige pijn rond het oog, met traan- en neusloop, conjunctivale injectie, duur 15-180 minuten.' },

  // ── Cardiologie (nieuw batch 2) ──
  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 42j: plotse kortademigheid, pleuritische pijn, been gezwollen na lange vlucht. Meest waarschijnlijke diagnose?',
    a:['Pneumonie','Longembolie','Pleuritis','Pneumothorax'], c:1,
    ex:'Longembolie: klassieke risicofactoren zijn immobilisatie (lange vlucht), been-DVT, en plotse pleuritische pijn met dyspneu. D-dimeer bij lage klinische kans; CT-angiografie bij hoge kans of positief D-dimeer.' },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Een normaal D-dimeer bij een patiënt met hoge klinische kans op longembolie sluit longembolie uit.',
    c:false, ex:'NIET WAAR. D-dimeer is alleen bruikbaar bij lage klinische kans (Wells ≤4). Bij hoge klinische kans altijd CT-angiografie, ongeacht D-dimeer. Een negatief D-dimeer bij hoge kans kan vals-negatief zijn.' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Patiënt na grote operatie: bloeddruk 75/50, hartfrequentie 120, koude extremiteiten, oligurie. Diagnose?',
    a:['Septische shock','Cardiogene shock','Hypovolemische shock','Neurogene shock'], c:1,
    ex:'Cardiogene shock: lage cardiac output → koude, klamme extremiteiten, lage bloeddruk, oligurie. Oorzaak: acuut MI, ernstig hartfalen. Behandeling: dobutamine (inotroop), noradrenaline bij refractaire hypotensie, overweeg IABP of Impella.' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 65j na inferieur MI: holosystolisch geruis aan de apex, uitstralend naar de oksel, nieuw ontstaan. Diagnose?',
    a:['Aortastenose','Mitralisinsufficiëntie door papillairspierruptuur','Ventrikel­septumruptuur','Pericardwrijfgeruis'], c:1,
    ex:'Acuute mitralisinsufficiëntie na MI: papillairspier­ruptuur → holosystolisch geruis → acute pulmonale stuwing. Medische noodtoestand. Onderscheid van VSD: bij VSD is het geruis ook holosystolisch maar parasternaal, met een thrill.' },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Nitraten (bijv. nitroglycerine) zijn absoluut gecontraïndiceerd bij gebruik van sildenafil (Viagra).',
    c:true, ex:'WAAR. Beide middelen verwijden bloedvaten via cGMP. Combinatie → ernstige, levensbedreigende bloeddrukdaling. Wacht minimaal 24 uur na sildenafil (48u na tadalafil) voor nitraten. Vraag hier altijd naar bij een patiënt met pijn op de borst!' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 58j na doorgemaakte longembolie: wordt behandeld met apixaban. Na hoeveel maanden mag je stoppen bij een eerste uitgelokte embolie (bijv. na operatie)?',
    a:['1 maand','3 maanden','6 maanden','Levenslang'], c:1,
    ex:'Eerste uitgelokte longembolie (tijdelijke risicofactor zoals operatie of gips): 3 maanden antistolling volstaat. Bij idiopatische embolie of recidief: 6 maanden tot levenslang afhankelijk van risicoprofiel.' },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Na een hartinfarct verlaagt een statine het risico op een nieuw cardiovasculair event, ook als het LDL al normaal is.',
    c:true, ex:'WAAR. Statines hebben naast LDL-verlaging ook ontstekingsremmende (pleiotrope) effecten op de vaatwand. Richtlijn: elke patiënt na MI krijgt een hoogintensieve statine, ongeacht de uitgangswaarde van LDL.' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 70j: ECG toont een brede QRS-tachycardie (130/min) zonder duidelijke P-toppen. Meest gevaarlijke diagnose om als eerste uit te sluiten?',
    a:['AVNRT','Sinustachycardie met bundeltakblok','Ventriculaire tachycardie','Atriumflutter met aberrante geleiding'], c:2,
    ex:'Brede QRS-tachycardie = ventriculaire tachycardie (VT) tot het tegendeel bewezen. VT is levensbedreigend. Nooit zomaar adenosine geven bij brede QRS — kan VT verergeren. Bij instabiliteit: directe cardioversie.' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Man 50j: ECG toont ST-elevatie in II, III en aVF. Welke coronairarterie is waarschijnlijk afgesloten?',
    a:['Linker voorste dalende tak (LAD)','Rechter coronairarterie (RCA)','Linker circumflexarterie (LCx)','Hoofdstam (LMCA)'], c:1,
    ex:'Inferieur MI (II, III, aVF) = RCA-occlusie in 80% van de gevallen. De RCA voedt ook het rechterventrikel → altijd rechter ECG-afleidingen (V3R/V4R) maken om RV-infarct uit te sluiten.' },

  { type:'truefalse', d:2, domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Bij een longembolie met hemodynamische instabiliteit is systemische trombolyse de behandeling van keuze.',
    c:true, ex:'WAAR. Massieve longembolie met shock of hartstilstand: trombolyse (alteplase) of chirurgische embolectomie. Bij stabiele patiënten: anticoagulatie (LMWH of DOAC). Trombolyse bij stabiele patiënten geeft te veel bloedingsrisico.' },

  // ── DIFFERENTIAALDIAGNOSTIEK ──

  { type:'diagnose', d:5, domain:'cardio', dl:'Cardiologie', subtype:'diff',
    q:'Man 60j: hevige thoraxpijn bij binnenkomst.\nUitstraling naar rug/interscapulair\nBloeddrukasymmetrie 28 mmHg\nECG normaal, troponine borderline\nACS of aortadissectie — wat pleit voor dissectie?',
    a:['ST-elevatie met reciproke afwijkingen','Scheurende pijn + bloeddrukasymmetrie + normaal ECG','Troponine sterk verhoogd','Uitstraling naar linkerarm + zweten'],
    c:1, ex:'Aortadissectie: plotse maximale pijn, scheurend karakter, uitstraling interscapulair, bloeddrukasymmetrie >20 mmHg, normaal ECG en troponine. ACS: drukkende pijn, uitstraling arm/kaak, ST-veranderingen, troponine verhoogd. Bloeddrukasymmetrie + normaal ECG = dissectie tot tegendeel bewezen.' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie', subtype:'diff',
    q:'Vrouw 72j: acuut dyspneu, orthopneu, bilateraal crepitaties basaal, enkelloedeem. Hartfalen of COPD-exacerbatie — welk kenmerk is het meest specifiek voor hartfalen?',
    a:['Verlengd expirium met diffuus piepen','Verhoogde CVD + S3-gallopritme','Hyperinflatie op X-thorax','Piekstroom verminderd'],
    c:1, ex:'Hartfalen: verhoogde CVD (jugulaire stuwing), S3-gallopritme, basale crepitaties, orthopneu, snel verbeterend op diuretica. COPD: verlengd expirium, piepen, hyperinflatie, lage piekstroom. S3 + verhoogde CVD is vrijwel pathognomonisch voor decompensatio cordis.' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie', subtype:'diff',
    q:'Jongeman 25j: pleuritische precordiale pijn, erger bij liggen, beter bij vooroverbuigen. ECG: diffuse concave ST-elevatie, PR-depressie. Pericarditis of ACS?',
    a:['ACS: focale ST-elevatie in twee afleidingen, troponine sterk verhoogd','Pericarditis: diffuse concave ST-elevatie + PR-depressie + houdingsafhankelijke pijn','Myocarditis: diffuus + jonge patient','Aortadissectie: scheurende pijn naar rug'],
    c:1, ex:'Pericarditis: diffuse concave ST-elevatie, PR-depressie (pathognomonisch), pijn beter bij vooroverbuigen/erger bij liggen, vaak na virale infectie. ACS: focale ST-elevatie (twee aangrenzende afleidingen), geen PR-depressie, troponine verhoogd, geen houdingseffect op pijn.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie', subtype:'diff',
    q:'Man 68j: tremor van rechterhand in rust, verbetert bij bewegen, kleine handschrift. Parkinson of essentiële tremor — wat past bij Parkinson?',
    a:['Bilaterale houdingstremor, verbetert met alcohol','Rusttremor + bradykinesie + hypomimie + micrografie','Intentietremor + dysartrie + nystagmus','Tremor alleen bij emotionele stress'],
    c:1, ex:'Parkinson: rusttremor (pill-rolling, 4-6 Hz), bradykinesie, rigiditeit, houdingsinstabiliteit, hypomimie, micrografie. Essentiële tremor: houdingstremor/actietremor, bilateraal, verbetert met alcohol, geen bradykinesie/rigiditeit. Rusttremor die verbetert bij bewegen is kenmerkend voor Parkinson.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie', subtype:'diff',
    q:'Vrouw 34j: 30 min visueel flikkerend scotoom, daarna bonzende hemikranie en misselijkheid. TIA of migraine met aura — wat pleit voor migraine?',
    a:['Plotse maximale pijn gelijktijdig met aura','Geleidelijk uitbreidende aura >5 min, gevolgd door typische hoofdpijn','Motorische uitval, leeftijd >60j, hypertensie','Aura duurt >60 min zonder naderende hoofdpijn'],
    c:1, ex:'Migraine met aura: aura breidt geleidelijk uit (cortical spreading depression), duurt 20-60 min, gevolgd door ipsilaterale hoofdpijn. TIA: plotse uitval zonder verspreiding, geen nakomende hoofdpijn, risicofactoren voor vaatlijden. Gradual march + volgende hoofdpijn = migraine.' },

  { type:'diagnose', d:5, domain:'neuro', dl:'Neurologie', subtype:'diff',
    q:'Vrouw 30j: twee episodes neurologische uitval (1x arm, 1x visus), MRI witte-stof periventriculair. MS of NMO — wat onderscheidt MS van NMO?',
    a:['MS: longitudinaal extensieve myelitis >3 wervels','NMO: AQP4-antilichamen negatief','MS: korte MRI-laesies periventriculair, AQP4-negatief','NMO: hetzelfde patroon als MS maar ernstiger'],
    c:2, ex:'MS: periventriculaire/juxtacorticale laesies (kort, <3 wervels myelitis), AQP4-antilichamen negatief, relapsing-remitting. NMO: longitudinale myelitis >3 wervels, area postrema-laesies, AQP4-positief (80%), ernstiger dan MS. Onderscheid is cruciaal: NMO reageert slecht op MS-DMTs.' },

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

  { type:'diagnose', d:5, domain:'lab', dl:'Lab', subtype:'diff',
    q:'Acuut nierfalen, creatinine gestegen:\nUrine-Na 7 mmol/L\nUrine-osmolaliteit 680 mosm/kg\nFractionele Na-excretie 0.6%\nPrerenaal of renaal (ATN)?',
    a:['Renaal (ATN): tubulus kan Na niet reabsorberen, FeNa >2%','Prerenaal: intact tubulus, maximale Na-reabsorptie en urineconcentratie','Postrenaal: hydronefrose + verhoogde blaasdruk','ATN: Urine-Na >40, isostenurie (osmolaliteit ~300)'],
    c:1, ex:'Prerenaal: intact tubulus → maximale Na-reabsorptie (Urine-Na <20, FeNa <1%) en urineconcentratie (osmolaliteit >500). ATN (renaal): tubulaire schade → Urine-Na >40, FeNa >2%, osmolaliteit ~300, granulaircilinders. FeNa 0.6% + osmolaliteit 680 = prerenaal → vochtresuscitatie.' },

  { type:'diagnose', d:5, domain:'lab', dl:'Lab', subtype:'diff',
    q:'Microcytaire anemie, MCV 70 fL:\nFerritine 165 µg/L\nTransferrinesaturatie 9%\nTIBC laag\nIJzergebreksanemie of anemie van chronische ziekte (ACD)?',
    a:['IJzergebrek: ferritine altijd laag, TIBC hoog','ACD: ferritine normaal/hoog (acutefase-eiwit), lage saturatie, laag TIBC','Thalassemie: normaal ferritine en saturatie, geen anemie van ziekte','Sideroblastaire anemie: ringed sideroblasts op beenmergbiopt'],
    c:1, ex:'IJzergebrek: ferritine LAAG (<30), transferrinesaturatie laag, TIBC HOOG. ACD: ferritine NORMAAL/HOOG (is acutefase-eiwit bij infectie/maligniteit/RA), saturatie laag, TIBC LAAG. Ferritine 165 + lage saturatie + laag TIBC = ACD. Zoek onderliggende oorzaak (maligniteit, chronische infectie, inflammatoire ziekte).' },


  // ── DIAGNOSTISCHE TEST-KEUZE ──

  { type:'diagnose', d:5, domain:'neuro', dl:'Neurologie', subtype:'test',
    q:'Vrouw 42j: plotse "donderslag-hoofdpijn", maximale intensiteit in seconden, nekstijfheid, CT hersenen negatief. Welke test is nu essentieel?',
    a:['MRI hersenen met gadolinium','Lumbaalpunctie (LP) — bloedige/xanthochrome liquor bij SAB','EEG bij verdenking epileptische aanval','Doppler a. carotis'],
    c:1, ex:'CT mist 2-5% van SAB, met name vroeg (<6u) of kleine bloedingen. Bij negatieve CT + sterke verdenking SAB (donderslag-hoofdpijn) is LP verplicht: xanthochromie (geel verkleurd door afbraak hemoglobine) bewijst SAB. MRI is minder sensitief voor acuut bloed dan CT.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie', subtype:'test',
    q:'Man 28j: twee aparte demyeliniserende episodes, klachten >24u, MRI witte-stof periventriculair. Verdenking MS — welke test voegt diagnostisch het meest toe?',
    a:['EEG: slow-wave activiteit bij MS','LP: oligoklonale banden in liquor bevestigen intrathecale immunoglobulineproductie','PET-scan: metabolisme witte stof','EMG: neurogene patronen bij demyelinisatie'],
    c:1, ex:'MRI is eerste keus bij MS (McDonald-criteria). LP met oligoklonale banden (aanwezig in >95% MS, niet in serum) bevestigt intrathecale ontsteking als MRI niet volledig diagnostisch is. Visueel-evoked potentials (VEP) kunnen ook bijdragen bij opticus-betrokkenheid. EEG heeft geen rol bij MS.' },

  { type:'diagnose', d:3, domain:'neuro', dl:'Neurologie', subtype:'test',
    q:'Jongeman 22j: aanval met bewustzijnsverlies, tongbeet, incontinentie, 2 minuten. Epilepsie of syncope — welke test onderscheidt het best?',
    a:['CT hersenen: altijd eerste stap','EEG na aanval voor interictale afwijkingen + tilttest/Holter voor syncope','Bloedsuiker tijdens aanval','Slaaponderzoek: slaapapneu als oorzaak'],
    c:1, ex:'Epilepsie vs syncope: EEG (interictale epileptiforme activiteit, sensitief 50-60%) + anamnese (tongbeet/incontinentie wijst naar epilepsie). Syncope: tilttest (orthostatisch/vasovagaal), Holter (cardiaal). Tongbeet + incontinentie + postictale verwardheid = epilepsie waarschijnlijk. MRI daarna voor structurele oorzaak.' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie', subtype:'test',
    q:'Man 58j: drukkende thoraxpijn 20 min, uitstraling linkerarm, zweten. Verdenking ACS — wat doe je als eerste diagnostische stap?',
    a:['CT-coronair angiografie: anatomie coronairen','ECG binnen 10 minuten + hoogsensitief troponine (0u en 1u/3u)','Stress-echo: ischemie provoceren','Holter: ritmestoornis uitsluiten'],
    c:1, ex:'Richtlijn: ECG binnen 10 minuten na binnenkomst (STEMI = direct katheterslab). Hoogsensitief troponine bij aankomst + 1u of 3u later (0/1h-protocol of 0/3h). Dit algoritme sluit >99% van NSTEMI/ACS uit of bevestigt het. CT-coronair bij stabiele patiënt met lagere verdenking.' },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie', subtype:'test',
    q:'Vrouw 68j: dyspneu, enkelloedeem, verhoogde CVD. Verdenking hartfalen — BNP/NT-proBNP of echocardiografie als eerste test?',
    a:['Echocardiografie altijd eerst: definitieve diagnose','BNP/NT-proBNP eerst: snel, hoge negatieve predictieve waarde — normaal sluit hartfalen vrijwel uit','X-thorax: vochtige longen = bewijs hartfalen','24u urinecortisol: bijnierinsufficiëntie uitsluiten'],
    c:1, ex:'BNP/NT-proBNP: hoge negatieve predictieve waarde. Normaal BNP (<35 pg/mL) maakt hartfalen onwaarschijnlijk → geen echo nodig. Verhoogd BNP → echo voor bevestiging (systolisch/diastolisch) en behandelgeleiding. Hartfalen + normaal BNP = denk aan andere oorzaak dyspneu.' },

  { type:'diagnose', d:5, domain:'cardio', dl:'Cardiologie', subtype:'test',
    q:'Patient met koorts, nieuw hartgeruis en positieve bloedkweken (S. aureus). Verdenking endocarditis — TTE of TEE?',
    a:['TTE altijd voldoende: goede beeldkwaliteit bij alle patiënten','TEE: hogere sensitiviteit (>90%) voor vegetaties en complicaties, altijd bij hoog-risico of negatieve TTE','CT-thorax: perifere embolieën opsporen','Alleen bloedkweken voldoende voor diagnose'],
    c:1, ex:'TTE (transthoracaal): eerste keus, non-invasief, sensitiviteit 60-75%. TEE (transoesofageaal): sensitiviteit >90%, indicatie bij: negatieve TTE maar hoge klinische verdenking, prostetische kleppen, S. aureus-bacteriemie, aortaklep-betrokkenheid, complicaties zoeken. Duke-criteria: twee major (bloedkweken + echo) = definitief.' },

  { type:'diagnose', d:2, domain:'lab', dl:'Lab', subtype:'test',
    q:'Patient met moeheid, gewichtstoename, kouwelijkheid. Schildklierfunctie evalueren — welke test is de beste eerste stap?',
    a:['Vrij T4 (fT4): direct spiegelmeting schildklier','TSH: meest sensitieve marker voor schildklierfunctie, verhoogd bij hypothyreoïdie','Anti-TPO antilichamen: auto-immuun oorzaak','T3: alleen verhoogd bij T3-toxicose'],
    c:1, ex:'TSH is de beste screeningstest: de hypofyse is extreem gevoelig voor kleine veranderingen in schildklierhormoonstatus. Verhoogd TSH = hypothyreoïdie (ook subklinisch). Normaal TSH = schildklier vrijwel zeker intact. Alleen bij afwijkend TSH dan vrij T4 en evt. vrij T3 meten.' },

  { type:'diagnose', d:3, domain:'lab', dl:'Lab', subtype:'test',
    q:'Patient met geelzucht, donkere urine, clay-coloured ontlasting, ALAT 420 U/L. Cholestatisch vs. hepatocellulair — welke test maakt het onderscheid het best?',
    a:['Leverbiopsie: altijd eerste stap bij geelzucht','Echo abdomen: biliaire obstructie vs. parenchymale leverziekte','PET-scan: maligniteit uitsluiten','Galzuurmeting: primaire biliaire cholangitis'],
    c:1, ex:'Echo abdomen is eerste stap bij geelzucht: verwijde galwegen = extrahepatische obstructie (steen, maligniteit) → ERCP. Geen verwijding = intrahepatische oorzaak (hepatitis, cirrose). Leverbiopsie pas na uitsluiten obstructie. Bloedonderzoek (ALAT/AF-ratio) geeft richting maar echo is anatomisch beslissend.' },

  { type:'diagnose', d:5, domain:'lab', dl:'Lab', subtype:'test',
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
    ex:'Absoluut irregulair QRS-ritme zonder P-toppen = atriumfibrilleren. Let op de onregelmatige RR-intervallen en de chaotische fibrillatiebasisline. Bij atriumflutter zijn er zaagvormige F-golven met een regulier ritme (~150/min). Risico op trombus in linker hartoor → anticoagulatie!',
    wiki:{ kern:'Atriumfibrilleren (AF) is het meest voorkomende hartritmestoornis. Meerdere chaotische re-entry circuits in de atria (400-600/min) maken gecoördineerde contractie onmogelijk. Geen P-toppen op ECG, volledig onregelmatig QRS.', mechanisme:'Stilstand van atriale contractie → bloed blijft stilstaan in linker hartoor → trombusvorming → embolisatie naar hersenen of andere organen. Dit verklaard waarom anticoagulatie de hoeksteen is van de behandeling.', onderscheid:'Atriumflutter: regelmatig ritme ~150/min, zaagvormige F-golven in II/III/aVF. Sinustachycardie: regelmatig, duidelijke P-top voor elk QRS. AVNRT: paroxysmaal, regelmatig, plotse start/stop, P verborgen in QRS.' } },

  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie',
    q:'Patiënt van 58 jaar met 40 minuten drukkende retrosternale pijn. Welke diagnose toont dit ECG-fragment?',
    fig:'<svg viewBox="0 0 220 70" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="50" x2="220" y2="50" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/><line x1="43" y1="35" x2="85" y2="35" stroke="rgba(232,65,10,0.3)" stroke-width="1" stroke-dasharray="2,3"/><polyline points="5,50 20,50 23,44 27,50 31,50 33,52 36,8 39,57 43,35 63,35 72,27 83,35 91,50 108,50 111,44 115,50 119,50 121,52 124,8 127,57 131,35 151,35 160,27 170,35 178,50 205,50" stroke="#E8410A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="188" y="37" font-size="9" fill="#E8410A" font-family="DM Sans,sans-serif" font-weight="600">ST↑</text><text x="5" y="67" font-size="9" fill="#aaa" font-family="DM Sans,sans-serif">Lead II (inferieur) — 25mm/s</text></svg>',
    a:['Pericarditis','Inferieur STEMI','NSTEMI','Normaal ECG'], c:1,
    ex:'Gelokaliseerde ST-elevatie in de inferieure afleidingen (II, III, aVF) past bij een inferieur STEMI door RCA-occlusie. Direct PCI binnen 90 minuten! De dashed lijn toont de basislijn — het ST-segment ligt er duidelijk boven. Pericarditis geeft diffuse saddle-shape ST-elevatie in ALLE afleidingen.',
    wiki:{ kern:'Inferieur STEMI (leads II, III, aVF) wordt veroorzaakt door afsluiting van de rechter coronairarterie (RCA). ST-elevatie toont transmuraal infarct — elke minuut vertraging = meer myocardschade. Cave: ~30% heeft ook rechterventrikelinfarct (RVI) bij proximale RCA-occlusie.', mechanisme:'Plaque ruptuur → trombusvorming → complete afsluiting → transmuraal ischemie → ST-elevatie. Reciproke depressie in de voorwandafleidingen (I, aVL) bevestigt de localiteit. Na occlussie: ischemie (minuten) → infarct (20-40 min) → necrose en troponine-lekkage.', onderscheid:'Pericarditis: saddle-shape ST-elevatie in alle afleidingen, PR-depressie, pleuritische pijn. NSTEMI: geen ST-elevatie, troponine stijgt wel. Vroege repolarisatie: ook ST-elevatie maar concaaf (schotelvormig), geen klachten, jonge patiënten.' } },

  { type:'diagnose', d:5, domain:'cardio', dl:'Cardiologie',
    q:'Welk geleidingsstoornispatroon toont dit ECG? Let op de PR-intervallen.',
    fig:'<svg viewBox="0 0 280 72" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="45" x2="280" y2="45" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/><polyline points="5,45 13,45 15,39 17,45 25,45 26,47 28,13 31,55 34,45 40,45 44,38 51,45 62,45 82,45 84,39 86,45 98,45 99,47 101,13 104,55 107,45 113,45 117,38 124,45 133,45 148,45 150,39 152,45 172,45 173,47 175,13 178,55 181,45 187,45 191,38 198,45 207,45 225,45 227,39 229,45 280,45" stroke="#E8410A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="10" y="70" font-size="8" fill="#888" font-family="DM Sans,sans-serif">PR kort</text><text x="78" y="70" font-size="8" fill="#888" font-family="DM Sans,sans-serif">PR langer</text><text x="143" y="70" font-size="8" fill="#888" font-family="DM Sans,sans-serif">PR lang</text><text x="218" y="36" font-size="8" fill="#E8410A" font-family="DM Sans,sans-serif">P↑ geen QRS</text></svg>',
    a:['Eerstegraads AV-blok','Wenckebach (Mobitz type I)','Mobitz type II AV-blok','Derdegraads AV-blok'], c:1,
    ex:'Wenckebach (Mobitz I): PR-interval wordt iedere slag langer totdat één QRS uitvalt — dan reset. Herkenbaar door de progressieve PR-verlenging en de periodiek uitvallende QRS. Benigne, typisch bij inferiorwandinfarct of verhoogde vagustonus. Mobitz II: plotse QRS-uitval zónder PR-verlenging — gevaarlijker.',
    wiki:{ kern:'Wenckebach is een tweedegraads AV-blok waarbij de AV-knoop na elke geleide slag "vermoeid" raakt → steeds langere PR → uiteindelijk een prikkel die niet geleid wordt. Daarna recupereert de AV-knoop en begint de cyclus opnieuw.', mechanisme:'AV-knooppathologie (ischemie inferieure wand, verhoogde vagustonus, digoxine-toxiciteit) vertraagt de geleiding progressief. De perioden zijn: P-PR-QRS (P geleid), P-lang PR-QRS (geleid), P-alleen (niet geleid) = 3:2 blok. Verhouding beschrijft hoeveel P/QRS per periode.', onderscheid:'Mobitz II: constant PR tot plotse uitval — schade aan de His-bundel, ernstiger, kan plots totaal blok geven → pacemaker-indicatie. Derdegraads: alle P-toppen worden geblokkeerd, P en QRS volledig ontkoppeld. Eerstegraads: verlengd PR maar altijd geleiding.' } },

  { type:'diagnose', d:5, domain:'cardio', dl:'Cardiologie',
    q:'Patiënt van 72 jaar met presyncope en een polsfrequentie van 35/min. Welk ritme toont deze ritmestrook?',
    fig:'<svg viewBox="0 0 280 70" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="44" x2="280" y2="44" stroke="#e8e0d4" stroke-width="0.8" stroke-dasharray="3,3"/><polyline points="5,44 8,44 10,37 12,44 30,44 32,47 34,11 37,57 40,44 44,44 46,34 47,29 49,38 52,44 82,44 84,37 86,44 115,44 117,47 119,11 122,57 125,44 129,44 131,34 133,39 136,44 156,44 158,37 160,44 193,44 195,37 197,44 202,47 204,11 207,57 210,44 214,44 216,34 218,39 221,44 230,44 232,37 234,44 280,44" stroke="#E8410A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="31" r="2.5" fill="#4a8fd4"/><circle cx="47" cy="23" r="2.5" fill="#4a8fd4"/><circle cx="84" cy="31" r="2.5" fill="#4a8fd4"/><circle cx="158" cy="31" r="2.5" fill="#4a8fd4"/><circle cx="195" cy="31" r="2.5" fill="#4a8fd4"/><circle cx="232" cy="31" r="2.5" fill="#4a8fd4"/><text x="5" y="10" font-size="8" fill="#4a8fd4" font-family="DM Sans,sans-serif">● P-golf (75/min)</text><text x="5" y="67" font-size="8" fill="#E8410A" font-family="DM Sans,sans-serif">QRS (35/min) — geen relatie met P</text></svg>',
    a:['Wenckebach (Mobitz I)','Mobitz type II AV-blok','Totaal (derdegraads) AV-blok','Sick Sinus Syndroom'], c:2,
    ex:'Totaal AV-blok: P-toppen (blauw, 75/min) en QRS-complexen (35/min) zijn volledig ontkoppeld — geen enkel signaal uit de atria bereikt de ventrikels. De ventrikels slaan op eigen ritme via een escape-pacemaker in het His-Purkinje systeem. Levensbedreiging — urgente tijdelijke pacemaker.',
    wiki:{ kern:'Bij een derdegraads (totaal) AV-blok geleidt geen enkele atriale prikkel naar de ventrikels. De atria en ventrikels slaan onafhankelijk van elkaar: atria ~75/min, ventrikels ~35/min via junctionaal of ventriculair escape-ritme.', mechanisme:'Oorzaken: inferieur MI (tijdelijk, junctionaal escape ~50/min), anterieur MI (His-schade, ventriculair escape ~30/min, slecht teken), degeneratieve fibrose (bij ouderen). Het escape-ritme is laag en onbetrouwbaar → synkope, hemodynamische collaps.', onderscheid:'Wenckebach: sommige P-golven geleid, PR progressief verlengd. Mobitz II: sommige P-golven geblokkeerd maar constante PR. Sinusbradycardie: langzaam maar P en QRS altijd gekoppeld. AV-dissociatie: overkoepelende term voor iedere toestand waarbij P en QRS niet gekoppeld zijn (incl. derdegraads blok).' } },

  { type:'lab', d:5, domain:'lab', dl:'Laboratorium',
    q:'De oranje curve toont het spirogram van een 65-jarige roker. Welke interpretatie past het best?',
    fig:'<svg viewBox="0 0 256 140" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="10" x2="22" y2="125" stroke="#ccc" stroke-width="1"/><line x1="22" y1="70" x2="245" y2="70" stroke="#ccc" stroke-width="1"/><text x="130" y="138" font-size="9" fill="#aaa" text-anchor="middle" font-family="DM Sans,sans-serif">Volume (L) →</text><text x="5" y="22" font-size="8" fill="#aaa" font-family="DM Sans,sans-serif">Exp</text><text x="5" y="118" font-size="8" fill="#aaa" font-family="DM Sans,sans-serif">Insp</text><path d="M 22,70 C 30,20 68,14 90,28 C 140,52 185,66 228,70 C 205,108 158,116 110,114 C 68,112 30,98 22,70" stroke="#bbb" stroke-width="2" fill="rgba(180,180,180,0.08)" stroke-linecap="round"/><path d="M 22,70 C 28,42 60,36 76,50 C 115,63 148,69 176,70 C 156,100 122,108 92,107 C 60,105 28,94 22,70" stroke="#E8410A" stroke-width="2.5" fill="rgba(232,65,10,0.06)" stroke-linecap="round"/><line x1="26" y1="128" x2="42" y2="128" stroke="#bbb" stroke-width="2"/><text x="46" y="131" font-size="8" fill="#aaa" font-family="DM Sans,sans-serif">Normaal</text><line x1="110" y1="128" x2="126" y2="128" stroke="#E8410A" stroke-width="2.5"/><text x="130" y="131" font-size="8" fill="#E8410A" font-family="DM Sans,sans-serif">Obstructief</text></svg>',
    a:['Normaal spirogram','Restrictief patroon (FVC verlaagd, FEV1/FVC normaal)','Obstructief patroon (FEV1/FVC verlaagd)','Gemengd patroon'], c:2,
    ex:'Obstructief patroon: de oranje curve heeft een lagere piekstroom en een concave (naar binnen gebogen) expiratoire limb — kenmerk van flow-limitatie bij COPD of astma. FEV1/FVC-ratio <0.70 bevestigt obstructie. Restrictief patroon: smaller loop, lagere FVC, maar normaal gevormde curve.',
    wiki:{ kern:'De stroom-volumecurve toont de expiratoire flow (Y-as) uitgezet tegen het volume (X-as). Bij COPD: dynamische luchtwegcompressie tijdens expiratie → lagere piekstroom, concave curve. Bij restrictief longlijden: de loop is kleiner maar normaal van vorm.', mechanisme:'COPD: alveolaire destructie (emfyseem) + luchtwegontsteking → elastische terugkeer ↓ + luchtwegweerstand ↑ → air trapping (RV vergroot) + flow-limitatie. De concave curve ontstaat doordat de flow vroeg afneemt omdat de kleine luchtwegen al instorten.', onderscheid:'Astma: ook obstructief maar reversibel na bronchodilatator (>12% FEV1-stijging). COPD: overwegend irreversibel. Restrictief (fibrose, obesitas, scoliose): FVC laag, FEV1/FVC normaal of hoog. Gemengd: kenmerken van beide (bijv. obesitas + COPD).' } },


  // ── PULMONOLOGIE ──
  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Man van 65 jaar, 40 pakjaren roken. Progressieve dyspneu bij inspanning, hoest met sputum. Spirometrie na bronchodilatator: FEV1/FVC 0.62, FEV1 58% predicted. Meest waarschijnlijke diagnose?',
    a:['COPD','Astma','Idiopathische pulmonale fibrose','Bronchiëctasieën'], c:0,
    ex:'COPD: postbronchodilatator FEV1/FVC <0.70 bij een roker met passende klachten. Bij astma is er significante reversibiliteit (>12% FEV1-stijging). IPF geeft een restrictief patroon (FVC laag, FEV1/FVC normaal of verhoogd).',
    wiki:{ kern:'COPD is een chronische, progressieve luchtwegziekte met niet-volledig reversibele obstructie. Twee pathomechanismen: chronische bronchitis (hypersecretie) en emfyseem (alveolaire destructie). Roken is de oorzaak in >85% van de gevallen.', mechanisme:'Tabaksrook → ontsteking in kleine luchtwegen → fibrose en vernauwing + alveolaire destructie → verminderde elastische terugkeer → air trapping. FEV1/FVC-ratio daalt. GOLD-stadium I-IV op basis van FEV1% predicted.', onderscheid:'Astma: jongere leeftijd, atopie, variabiliteit, reversibel. IPF: restrictief patroon, bibasale crepitaties, trommelstokvingers, honingraatpatroon op HRCT. Bronchiëctasieën: dagelijkse purulente sputumproductie, recidiverende infecties.', therapie:'Stap 1: SABA (salbutamol) bij klachten. Stap 2: LAMA (tiotropium). Stap 3: LAMA+LABA of LABA+ICS. Bij exacerbaties: prednisolon + antibiotica. Stoppen met roken vertraagt het FEV1-verval.' } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Vrouw van 34 jaar, plotse dyspneu en pleuritische thoraxpijn rechts, polsslag 108/min. D-dimeer 2.1 mg/L, Wells-score 5 punten. Welk onderzoek is nu als eerste geïndiceerd?',
    a:['CT-pulmonalisangiografie','Thoraxfoto','V/Q-scintigrafie','Echo hart'], c:0,
    ex:'Bij hoge klinische verdenking (Wells ≥5) is directe CT-PA geïndiceerd. D-dimeer heeft bij hoge pre-test kans geen meerwaarde als uitsluitingstest. CT-PA is de gouden standaard voor de diagnose longembolie.',
    wiki:{ kern:'Longembolie (LE): trombus in de pulmonale circulatie, doorgaans afkomstig uit diepe veneuze trombose. De Wells-score schat de klinische verdenking in. D-dimeer is alleen bruikbaar als uitsluitingstest bij lage of intermediaire verdenking.', mechanisme:'Trombus → verhoogde pulmonale vaatweerstand → acuut rechtsventrikeloverbelasting. Kleine emboli: pleuritische pijn door perifeer infarct. Grote emboli: hypotensie, syncope, cardiogene shock.', onderscheid:'Pneumothorax: ook plotse dyspneu maar hypersonore percussie en afwezig ademgeruis. Pneumonie: koorts, productief hoesten, infiltraat op X-thorax. Pericarditis: houdingsafhankelijke pijn, wrijfgeruis.', therapie:'Anticoagulatie direct: LMWH, daarna DOAC (rivaroxaban of apixaban). Massieve LE met shock: overweeg trombolyse. Minimaal 3 maanden anticoagulatie.' } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Man van 22 jaar, acuut ontstane dyspneu en pleuritische pijn links. Percussie: hypersonoor links. Ademgeruis links afwezig. Meest waarschijnlijke diagnose?',
    a:['Spontane pneumothorax','Longembolie','Pleuravochtstapeling','Pneumonie'], c:0,
    ex:'Spontane pneumothorax: hypersonore percussie + afwezig ademgeruis ipsilateraal = lucht in de pleurale ruimte. Typisch bij lange, magere jongemannen door ruptuur van subpleurale bullae. Pleuravocht geeft juist demping bij percussie.',
    wiki:{ kern:'Primaire spontane pneumothorax bij jonge magere mannen door ruptuur van subpleurale bullae aan de longapex. Risico op recidief: 30-50% na eerste episode. Secundaire pneumothorax bij onderliggende longziekte (COPD, CF, Marfan).', mechanisme:'Ruptuur bulla → lucht in pleurale ruimte → long collabiert. Gespannen pneumothorax: ventielwerking → mediastinum verschuift contralateraal → compressie grote vaten → hemodynamisch compromis (spoedindicatie!).', onderscheid:'Pleuravocht: demping bij percussie, verminderd ademgeruis. Atelectase: demping, trachea devieert ipsilateraal. Pneumonie: koorts, bronchiaal ademen, crepitaties.', therapie:'Klein en stabiel: observatie + zuurstof (versnelt resorptie). Symptomatisch: aspiratie of drainslang. Gespannen pneumothorax: directe naalddécompressie 2e ICS midclaviculaire lijn zonder wachten op X-thorax.' } },

  { type:'pharma', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Welk mechanisme verklaart de bronchodilaterende werking van tiotropium bij COPD?',
    a:['Blokkade van de M3-muscarinereceptor in de bronchiaalwand','Beta-2-receptoragonisme in gladde bronchiaalspiercellen','Remming van fosfodiësterase-4 → cAMP-stijging','Remming van leukotrieensynthese via 5-lipoxygenase'], c:0,
    ex:'Tiotropium is een LAMA (Long-Acting Muscarinic Antagonist). Het blokkeert de M3-receptor → relaxatie gladde bronchiaalspiercellen → bronchodilatatie. Eenmalige dosering per dag, werking 24 uur.',
    wiki:{ kern:'Acetylcholine via de M3-receptor veroorzaakt bronchoconstrictie en mucusproductie. LAMA\'s blokkeren dit → bronchodilatatie en minder secretie. Tiotropium is eerste keus bij COPD-onderhoud, naast of in combinatie met LABA.', mechanisme:'LAMA verbetert FEV1, vermindert hyperinflatie, verlaagt exacerbatiefrequentie en verbetert inspanningstolerantie. Bijwerkingen: droge mond, urineretentie (cave: prostaatproblematiek), constipatie, smalle-kamerhoekglaucoom.', onderscheid:'SABA (salbutamol): Beta-2 agonist, snel werkend, rescue. LABA (salmeterol/formoterol): Beta-2 agonist, langwerkend, onderhoud. ICS: remt luchtwegontsteking, geen directe bronchodilatatie.' } },

  { type:'pharma', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Welk antibioticum is eerste keus bij een ambulante community-acquired pneumonie (CAP) zonder comorbiditeiten bij een volwassene?',
    a:['Amoxicilline oraal','Ciprofloxacine oraal','Azitromycine monotherapie','Ceftriaxon intraveneus'], c:0,
    ex:'Ambulante CAP zonder comorbiditeiten: amoxicilline 500 mg 3×/dag. Streptococcus pneumoniae is de meest frequente verwekker en is goed gevoelig voor amoxicilline. Ciprofloxacine dekt S. pneumoniae slecht en is geen standaard keus voor CAP.',
    wiki:{ kern:'S. pneumoniae veroorzaakt 30-40% van alle CAP-gevallen. Amoxicilline heeft uitstekende pneumokokkendekking. Bij atypische verwekkers (Mycoplasma, Legionella) of ontbreken van respons na 48-72u: macrolide toevoegen of overschakelen.', mechanisme:'CURB-65 bepaalt ernst en opnamebeleid: Confusion, Ureum >7 mmol/L, Respiratory rate ≥30, Blood pressure <90 mmHg systolisch, leeftijd ≥65. Score 0-1: ambulant amoxicilline. Score ≥3: ziekenhuisopname + IV antibiotica.', onderscheid:'Ciprofloxacine: slecht werkzaam tegen S. pneumoniae, niet als monotherapie voor CAP. Co-amoxiclav: bredere dekking, niet nodig als eerste keus ambulant. Levofloxacine: effectief maar hogere bijwerkingendrempel (peesruptuur, QT-verlenging).' } },


  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Vrouw van 58 jaar, nooit gerookt. Maandenlange droge hoest en progressieve dyspneu. Bibasale eind-inspiratoire crepitaties en trommelstokvingers. HRCT: honingraatpatroon bibasaal. Diagnose?',
    a:['Idiopathische pulmonale fibrose','COPD','Sarcoidose','Extrinsische allergische alveolitis'], c:0,
    ex:'IPF: progressieve fibrosering bij ouderen (nooit gerookt), bibasale crepitaties, trommelstokvingers en honingraatpatroon (UIP-patroon) op HRCT. Sarcoidose geeft eerder hilaire lymfadenopathie bij jongere patiënten.',
    wiki:{ kern:'IPF is een chronisch fibroserende interstitiële longziekte met slechte prognose (mediane overleving 3-5 jaar). UIP-patroon op HRCT (honingraat + traktionsbronchiëctasieën bibasaal) is bewijzend zonder biopt bij klassieke presentatie.', mechanisme:'Herhaald micro-trauma aan het alveolair epitheel → abnormale wondheling → fibroblasten activatie → collageen depositie → verlies van gaswisselend oppervlak. Restrictief longfunctiepatroon: FVC verlaagd, FEV1/FVC normaal, DLCO verlaagd.', onderscheid:'EAA (extrinsische allergische alveolitis): anamnese antigene blootstelling (vogels, schimmels), jonger, deels reversibel. Sarcoidose: bilaterale hilaire lymfadenopathie, granulomen. NSIP: jongere vrouwen, minder honingraat, betere prognose.', therapie:'Pirfenidon en nintedanib vertragen FVC-achteruitgang. Geen corticosteroïden bij IPF. Longtransplantatie bij geschikte patiënten. Vroegtijdige palliatieve zorg en zuurstof bij hypoxemie.' } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Jonge man van 28 jaar. Bilaterale hilaire lymfadenopathie op thoraxfoto, erythema nodosum aan de benen, gewrichtspijn. Geen koorts. Diagnose?',
    a:['Sarcoidose (Löfgren-syndroom)','Tuberculose','Non-Hodgkin lymfoom','Mycoplasma-pneumonie'], c:0,
    ex:'Löfgren-syndroom: de klassieke triade van bilaterale hilaire lymfadenopathie + erythema nodosum + gewrichtspijnen is pathognomonisch voor acute sarcoidose. Prognose uitstekend: >80% spontane remissie.',
    wiki:{ kern:'Sarcoidose is een multisysteemziekte met niet-verkazende granulomen. Löfgren-syndroom is de acute presentatievorm, typisch bij vrouwen in de vruchtbare leeftijd en Noord-Europese mannen. Longen en intrathoracale lymfeklieren zijn aangedaan in >90%.', mechanisme:'Onbekende trigger → CD4+ T-helper cel activatie → granulooomvorming. Verhoogd serum-ACE en hypercalciëmie (door 1,25-OH-vitamine D-productie in granulomen) zijn suggestief maar niet specifiek.', onderscheid:'Tuberculose: ook hilaire klieren maar asymmetrisch, koorts, nachtzweten, gewichtsverlies, positieve Quantiferon. Lymfoom: asymmetrisch, B-symptomen. Berylliose: beroepsblootstelling beryllium.', therapie:'Löfgren: NSAID voor gewrichtsklachten, expectatief beleid gezien goede prognose. Ernstige of persisterende sarcoidose: prednison. Chronisch: methotrexaat of hydroxychloroquine als steroïdsparend middel.' } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Patiënt met HIV (CD4+ 55 cellen/μL), koorts, droge hoest en progressieve dyspneu over 2 weken. Saturatie 88%. X-thorax: bilaterale vlindervormige infiltraten. Meest waarschijnlijke diagnose?',
    a:['Pneumocystis jirovecii pneumonie (PCP)','Bacteriële pneumonie','Tuberculose','CMV-pneumonitis'], c:0,
    ex:'PCP treedt op bij ernstige immunosuppressie (CD4+ <200/μL). Klassiek: subacuut beloop, droge hoest, progressieve dyspneu, lage saturatie, bilaterale vlindervormige infiltraten. LDH verhoogd. Behandeling: cotrimoxazol (TMP-SMX).',
    wiki:{ kern:'Pneumocystis jirovecii is een schimmel die bij immuuncompetente personen latent aanwezig is. Bij CD4+ <200/μL: risico op ernstige pneumonie. Profylaxe met cotrimoxazol bij CD4+ <200/μL. BAL met GMS-kleuring of immunofluorescentie is diagnostisch.', mechanisme:'P. jirovecii infecteert alveoli → trofozoïten vullen alveolaire ruimte → belemmerde gaswisseling → hypoxemie. Verhoogd LDH is een marker van longparenchymschade.', onderscheid:'TB bij HIV: koorts, nachtelijk zweten, gewichtsverlies, cavernes of miliaire afwijkingen. CMV-pneumonitis: ook bij ernstige HIV. Bacteriële pneumonie: acuter, lobair, productief hoesten.', therapie:'TMP-SMX (cotrimoxazol) 21 dagen. Bij matige/ernstige PCP (PaO2 <70 mmHg): prednisolon toevoegen vermindert mortaliteit. ART starten na stabilisatie.' } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Man van 62 jaar, ernstige pneumonie die niet reageert op amoxicilline. Bilaterale infiltraten op X-thorax. Legionella-urine-antigeen positief. Welk antibioticum is nu eerste keus?',
    a:['Levofloxacine intraveneus','Amoxicilline intraveneus','Benzylpenicilline intraveneus','Cotrimoxazol intraveneus'], c:0,
    ex:'Legionella pneumophila is een intracellulaire bacterie. Bètalactam-antibiotica (amoxicilline, penicilline) zijn ineffectief omdat zij de cel niet binnendringen. Eerste keus: fluoroquinolon (levofloxacine) of macrolide (azitromycine), bij voorkeur fluoroquinolon bij ernstige presentatie.',
    wiki:{ kern:'Legionella overleeft in alveolaire macrofagen → standaard bètalactams bereiken de intracellulaire locatie niet. Bron: besmet water (koeltorens, douchesystemen). Niet van mens op mens overdraagbaar. Urine-antigeen: snelle test, hoge sensitiviteit voor serogroep 1.', mechanisme:'Klassieke trias: hoge koorts, relatieve bradycardie, hyponatriëmie. Verhoogd LDH, leverenzymafwijkingen en nierinsufficiëntie. Bilateral pneumonie, soms snel progressief.', onderscheid:'Mycoplasma: jongere patiënt, mildere loop, koude agglutininen, macrolide gevoelig. S. pneumoniae: penicillinegevoelig. Chlamydia psittaci: vogelcontact.' } },

  { type:'lab', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Arterieel bloedgas bij COPD-exacerbatie: pH 7.28, pCO2 72 mmHg, pO2 50 mmHg, HCO3- 32 mmol/L. Welke interpretatie is correct?',
    a:['Respiratoire acidose met metabole compensatie','Respiratoire alkalose met metabole compensatie','Gemengde metabole en respiratoire acidose','Metabole alkalose met respiratoire compensatie'], c:0,
    ex:'pH verlaagd (7.28) + pCO2 verhoogd (72) = respiratoire acidose als primaire stoornis. HCO3- verhoogd (32) = chronische renale compensatie. Dit is het klassieke acuut-op-chronisch CO2-retentiepatroon bij COPD.',
    wiki:{ kern:'Stap-voor-stap zuur-base-analyse: (1) pH laag = acidose. (2) pCO2 hoog = respiratoire oorzaak. (3) HCO3- hoog = chronische renale compensatie. Verwacht HCO3 bij chronische respiratoire acidose: stijgt ±3.5 mmol per 10 mmHg pCO2-stijging.', mechanisme:'Alveolaire hypoventilatie → CO2 accumuleert → H2CO3 → pH daalt. Nieren compenseren chronisch door HCO3-retentie. Acuut: HCO3 stijgt slechts ±1 mmol per 10 mmHg pCO2.', onderscheid:'Metabole acidose: pH laag, HCO3- laag, pCO2 daalt compensatoir. Respiratoire alkalose: pH hoog, pCO2 laag (bijv. hyperventilatie). Metabole alkalose: pH hoog, HCO3- hoog (bijv. braken, diuretica).' } },


  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Vrouw van 45 jaar, recidiverende luchtweginfecties, dagelijks purulente sputumproductie, chronische hoest. CT-thorax: cilindrisch verwijde luchtwegen bibasaal. Diagnose?',
    a:['Bronchiëctasieën','COPD','Astma','Longfibrose'], c:0,
    ex:'Bronchiëctasieën: irreversibele verwijding van de luchtwegen zichtbaar op CT als "signet ring sign" (luchtweg groter dan begeleidend vat) en tram-track lijnen. Kenmerk: dagelijkse purulente sputumproductie en recidiverende infecties.',
    wiki:{ kern:'Bronchiëctasieën ontstaan door destructie van de luchtwegwand door chronische infectie en ontsteking → irreversibele verwijding → secretiestase → verdere infectie (vicieuze cirkel). Meest frequente verwekkers: H. influenzae, P. aeruginosa (gevorderd stadium).', mechanisme:'HRCT is de gouden standaard. Oorzaken zoeken: CF (sweat chloride test), primaire ciliaire dyskinesie (PCD), immunodeficiëntie (Ig-spiegels), post-tuberculose, post-infectieus. In 50% idiopathisch.', onderscheid:'COPD: emfyseem + obstructie maar geen cilindrische verwijding op CT. Astma: reversibel, geen structurele CT-afwijkingen. CF: ook bronchiëctasieën maar met pancreasinsufficiëntie en verhoogd zweet-chloride.', therapie:'Airway clearance (PEP, autogene drainage). Exacerbaties: amoxicilline/co-amoxiclav; P. aeruginosa: ciprofloxacine. Chronisch macrolide (azitromycine 3×/week) bij frequente exacerbaties.' } },

  { type:'diagnose', d:5, domain:'pulmo', dl:'Pulmonologie', subtype:'diff',
    q:'Welk klinisch kenmerk onderscheidt astma het meest betrouwbaar van COPD bij een patiënt met luchtwegobstructie?',
    a:['Significante reversibiliteit na bronchodilatator (FEV1-stijging >12% én >200 mL)','Piepende ademhaling bij auscultatie','Leeftijd onder de 40 jaar','Nachtelijke symptomen en hoest'], c:0,
    ex:'Reversibiliteit is het fysiologische sleutelcriterium: bij astma normaliseert of verbetert de FEV1 significant na salbutamol (>12% én >200 mL). Bij COPD is de obstructie per definitie niet volledig reversibel. Piepende ademhaling en nachtelijke klachten kunnen bij beide voorkomen.',
    wiki:{ kern:'Astma en COPD overlappen klinisch. Reversibiliteitstesting na bronchodilatator is de objectieve maatstaf. Volledige normalisatie van spirometrie na bronchodilatator wijst sterk op astma. Bij rokers met astma kan irreversibele component ontstaan door remodelling.', mechanisme:'Astma: eosinofiele ontsteking, IgE-gemedieerd of niet-atopisch, intermitterend. COPD: neutrofiele ontsteking, tabaksrook, persistent progressief. ACOS (Asthma-COPD Overlap Syndrome): kenmerken van beide.', onderscheid:'FeNO (fractie exhaleerbaar stikstofoxide) verhoogd bij eosinofiele ontsteking → pleit voor astma. Sputumeosinofilie idem. Bloedallergiepanel, huidpriktest.' } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie',
    q:'Wat is de meest frequente oorzaak van chronisch hoesten (>8 weken) bij een niet-rokende volwassene zonder afwijkingen op X-thorax?',
    a:['Postnasal drip (upper airway cough syndrome)','COPD','Longcarcinoom','Bronchiëctasieën'], c:0,
    ex:'De "big three" oorzaken van chronisch hoesten: (1) postnasal drip/UACS (~40%), (2) cough-variant astma (~25%), (3) GERD (~20%). Postnasal drip is de meest frequente oorzaak. Altijd ook ACE-remmer als iatrogene oorzaak uitsluiten.',
    wiki:{ kern:'ACE-remmers veroorzaken bij 5-20% van de gebruikers een droge hoest door bradykinine-accumulatie → hoestreflex. Stop ACE-remmer → hoest verdwijnt in 4-8 weken. Vervang door ARB (losartan) die geen bradykinine-effect heeft.', mechanisme:'Postnasal drip: neussecretie druppelt naar keelholte → prikkeling hoestreflex. Behandel onderliggende rhinitis/sinusitis (antihistaminica, nasale steroïden). Cough-variant astma: hoest als enige symptoom, bevestig met bronchoprovocatietest.', onderscheid:'Longcarcinoom: roker, ouder, haemoptoë, gewichtsverlies. COPD: roker, obstructief spirogram. Bronchiëctasieën: purulent sputum. Sarcoidose: ook droge hoest maar met andere afwijkingen.' } },

  { type:'truefalse', d:2, domain:'pulmo', dl:'Pulmonologie — Waar of Niet?',
    q:'Bij een COPD-patiënt met chronische CO2-retentie moet bij een exacerbatie altijd 100% zuurstof worden gegeven om de saturatie zo snel mogelijk te normaliseren.',
    c:false,
    ex:'NIET WAAR. COPD-patiënten met chronische hypercapnie rijden deels op hypoxische ademhalingsaandrijving. Hoge zuurstofconcentraties kunnen de ademprikkel verminderen → CO2-retentie verergert. Target SpO2: 88-92% (Venturi-masker 24-28%).',
    wiki:{ kern:'Bij chronische hypercapnie raken de centrale chemoceptoren gedesensibiliseerd voor CO2. De perifere (carotis) chemoceptoren reageren dan relatief meer op hypoxie. Gecontroleerde O2-therapie is essentieel. Na 30-60 min arterieel bloedgas controleren.', mechanisme:'Hoog FiO2 → hypoxische drive vermindert → alveolaire hypoventilatie → pCO2 stijgt verder (ook Haldane-effect: zuurstof verdringt CO2 van hemoglobine). Doel: SpO2 88-92%, niet 99-100%.', onderscheid:'Bij pneumonie, LE of andere aandoeningen zonder chronische hypercapnie: saturatie normaliseren (>94%). Alleen bij verdenking chronische hypercapnie voorzichtig doseren.' } },

  { type:'truefalse', d:2, domain:'pulmo', dl:'Pulmonologie — Waar of Niet?',
    q:'Een negatieve D-dimeer sluit een longembolie uit bij een patiënt met een hoge klinische verdenking (Wells-score ≥7).',
    c:false,
    ex:'NIET WAAR. D-dimeer is een uitsluitingstest die alleen bruikbaar is bij lage of intermediaire klinische verdenking. Bij hoge verdenking (Wells ≥7) is de prevalentie van LE hoog — direct CT-pulmonalisangiografie uitvoeren, D-dimeer niet afnemen.',
    wiki:{ kern:'D-dimeer: splijtingsproduct van fibrine, verhoogd bij trombose maar ook bij infectie, trauma, kanker en zwangerschap (lage specificiteit). Negatieve predictieve waarde >99% bij lage verdenking → kan LE uitsluiten. Bij hoge verdenking: te veel fout-negatieven.', mechanisme:'Bayesiaanse redenering: bij hoge pre-test kans is een test met matige sensitiviteit onvoldoende om de diagnose uit te sluiten. Wells-score <2 + D-dimeer negatief: LE praktisch uitgesloten (PERC-regel). Wells 2-6: D-dimeer. Wells ≥7: direct CT-PA.', onderscheid:'CT-PA: gouden standaard, toont lokalisatie en uitgebreidheid. V/Q-scintigrafie: alternatief bij contrastovergevoeligheid of nierfalen. Echo onderste extremiteiten: aanvullend als DVT gezocht wordt.' } },


  { type:'truefalse', d:2, domain:'pulmo', dl:'Pulmonologie — Waar of Niet?',
    q:'Astma wordt gekenmerkt door irreversibele luchtwegobstructie die niet reageert op bronchodilatatoren.',
    c:false,
    ex:'NIET WAAR. Astma is per definitie een reversibele luchtwegobstructie. Een FEV1-stijging >12% én >200 mL na bronchodilatator is kenmerkend. Irreversibele obstructie is het onderscheidende kenmerk van COPD.',
    wiki:{ kern:'Astma: chronische eosinofiele luchtwegontsteking → luchtwegoverreactiviteit → episodische reversibele obstructie. Reversibiliteitstesting met salbutamol en dagelijkse PEF-variabiliteit (>20%) zijn diagnostische criteria.', mechanisme:'Na salbutamol-inhalatie: FEV1 stijgt >12% én >200 mL bij astma → obstructie reversibel. Langdurig niet-behandeld astma kan door remodelling gedeeltelijk irreversibel worden (cave bij rokers).', onderscheid:'COPD: postbronchodilatator FEV1/FVC <0.70 persistent → niet reversibel. ACOS: overlap bij rokers met atopie, kenmerken van beide. Vocal cord dysfunction: functionele obstructie, variabel, geen spirometrische reversibiliteit.' } },

  { type:'truefalse', d:2, domain:'pulmo', dl:'Pulmonologie — Waar of Niet?',
    q:'Pleuravocht bij een patiënt met hartfalen voldoet aan de Light-criteria voor een exsudaat.',
    c:false,
    ex:'NIET WAAR. Hartfalen geeft een transsudaat: hydrostatische drukverhoging → eiwitarm vocht. Light-criteria voor exsudaat: vocht/serum-eiwit >0.5, of LDH-ratio >0.6, of LDH >2/3 van upper limit normaal. Hartfalen voldoet aan geen van deze criteria.',
    wiki:{ kern:'Transsudaat (hydrostatisch/oncotisch): hartfalen, levercirrose, nefrotisch syndroom. Exsudaat (verhoogde permeabiliteit): pneumonie, maligniteit, tuberculose, longembolie. Light-criteria: sensitiviteit 98% voor exsudaat.', mechanisme:'Hartfalen → verhoogde pulmonale capillairdruk → eiwitarm vocht lekt in pleuraholte. Cave: diuretische behandeling van hartfalen kan transsudaat omzetten naar pseudo-exsudaat (Light-criteria positief) → serum albumine-gradient >1.2 g/dL pleit dan toch voor hartfalen.', onderscheid:'Tuberculeus pleuravocht: exsudaat met lymfocytose, hoog ADA (adenosine deaminase). Malignen pleura-effusie: exsudaat, cytologie positief. Chylothorax: triglycerides >1.24 mmol/L.' } },

  { type:'truefalse', d:2, domain:'pulmo', dl:'Pulmonologie — Waar of Niet?',
    q:'Longcarcinoom is wereldwijd de meest voorkomende oorzaak van kankersterfte bij zowel mannen als vrouwen.',
    c:true,
    ex:'WAAR. Longcarcinoom is de voornaamste oorzaak van kankersterfte wereldwijd bij mannen én vrouwen. De 5-jaarsoverleving is <20% door laattijdige diagnose: 75% presenteert zich met gevorderd stadium.',
    wiki:{ kern:'Twee hoofdgroepen: NSCLC (85%): adenocarcinoom (ook bij niet-rokers, meest frequent), plaveiselcelcarcinoom (sterk gerelateerd aan roken), grootcellig. SCLC (15%): bijna uitsluitend rokers, snel groeiend, vroeg metastaserend.', mechanisme:'Adenocarcinoom bij niet-rokers: EGFR-mutaties (Aziatische vrouwen) → gerichte therapie (gefitinib, erlotinib). Plaveiselcelcarcinoom: centraal, hemoptoë. SCLC: paraneoplastische syndromen (SIADH, Cushing, Eaton-Lambert).', onderscheid:'Screening: lage-dosis CT bij hoog-risico rokers (>20 pakjaar, leeftijd 50-80j) vermindert longcarcinoommortaliteit met 20% (NLST-studie).' } },

  { type:'diagnose', d:5, domain:'pulmo', dl:'Pulmonologie', subtype:'test',
    q:'Bij welke patiënt is spirometrie het meest geëigende eerstelijns diagnostische onderzoek?',
    a:['55-jarige roker met progressieve dyspneu bij inspanning en hoest','22-jarige met acute pleuritische pijn en dyspneu','Patiënt met hoge koorts, productieve hoest en lobair infiltraat','Patiënt met hemodynamische instabiliteit en tachycardie 120/min'], c:0,
    ex:'Spirometrie is het diagnostisch instrument voor chronische luchtwegziekten (COPD, astma) bij patiënten met chronische klachten. Bij acute presentaties (pneumothorax, longembolie, pneumonie) zijn andere onderzoeken prioritair. Spirometrie is niet nuttig in de acute setting.',
    wiki:{ kern:'Indicaties spirometrie: vermoeden COPD of astma, bepalen ernst obstructie, preoperatieve evaluatie, follow-up. Altijd postbronchodilatator meten voor COPD-diagnose. Reversibiliteitstesting (15-20 min na salbutamol) voor onderscheid astma/COPD.', mechanisme:'FEV1/FVC <0.70 postbronchodilatator = obstructie (COPD). FVC verlaagd met normaal FEV1/FVC = restrictie (fibrosis, obesitas). Stroom-volumecurve: concave expiratoire limb bij COPD, kleinere loop bij restrictief.', onderscheid:'X-thorax: acute ziektebeelden, structuurafwijkingen. CT-thorax: parenchym, lymfeklieren, emboli (CT-PA). Bloedgas: zuur-base, oxygenatie. Bronchoscopie: endobronchiale afwijkingen, BAL.' } },


  // ── GASTRO-ENTEROLOGIE ──
  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 55 jaar, 4 weken melena, gebruik van ibuprofen al 2 maanden. Hemoglobine 7.4 g/dL. Meest waarschijnlijke oorzaak?',
    a:['NSAID-geïnduceerd maagulcus','Colorectaal carcinoom','Oesofagusvarices','Diverticulose colon'], c:0,
    ex:'NSAID-gebruik is de meest frequente iatrogene oorzaak van bovenste GI-bloedingen. NSAIDs remmen COX-1 → verminderde prostaglandinesynthese → verzwakte maagslijmvliesbarrière → ulcusvorming. Melena = bloed uit bovenste GI-tractus.',
    wiki:{ kern:'Melena (zwarte teerachtige ontlasting) ontstaat door oxidatie van hemoglobine in de darm, wat aangeeft dat de bloedingsbron zich boven het colon transversum bevindt. Maagulcera en duodenumulcera zijn samen de meest voorkomende oorzaak van bovenste GI-bloeding.', mechanisme:'NSAIDs: remming COX-1 → prostaglandin E2-synthese daalt → maagslijmvlies wordt niet beschermd (minder mucus en bicarbonaat, verminderde doorbloeding). Risicofactoren voor NSAID-ulcus: leeftijd >65j, H. pylori co-infectie, hoge NSAID-dosis, gelijktijdig corticosteroïdgebruik.', onderscheid:'Colorectaal carcinoom: eerder rood bloed bij de ontlasting of occult bloedverlies + gewichtsverlies. Oesofagusvarices: bij levercirrose, plotse hematemese. Diverticulose: lager GI, eerder helder rood bloed, geen melena.', therapie:'Stop NSAID. PPI IV (esomeprazol of pantoprazol). Spoed-endoscopie binnen 24u. Bij actieve bloeding: endoscopische hemostase (clips, coagulatie). H. pylori-eradicatie indien aangetoond.' } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Vrouw van 28 jaar, bloederige diarree >6 weken, buikkrampen, gewichtsverlies. Colonoscopie: continue ontsteking van rectum proximaal uitbreidend, geen skip-lesions. Diagnose?',
    a:['Colitis ulcerosa','Ziekte van Crohn','Infectieuze colitis','Ischemische colitis'], c:0,
    ex:'Colitis ulcerosa: continue ontsteking starting in het rectum, proximaal uitbreidend, geen skip-lesions, alleen mucosa aangedaan. Crohn: discontinue ontsteking (skip-lesions), transmurale ontsteking, kan overal in de darm voorkomen.',
    wiki:{ kern:'IBD: chronische immuungemedieerde darmontstekingen. CU beperkt zich tot de mucosa van het colon, altijd met rectumbetrokkenheid. Crohn kan heel het GI-tractus treffen (mond tot anus), transmuraal, met skip-lesions en granulooomvorming.', mechanisme:'CU: mucosal ulceraties, cryptabcessen, pseudopoliepen. Risico op colorectaal carcinoom na 8-10 jaar actieve CU → surveillance colonoscopie. Crohn: slijmvliesafwijkingen, fistels, stenosen, perianale ziekte.', onderscheid:'Infectieuze colitis: acuut beloop, kweek positief (Campylobacter, Salmonella, C. diff). Ischemische colitis: ouderen, vasculaire risicofactoren, splenic flexure-verdeling. Microscopische colitis: waterige diarree, normaal colonoscopiebeeld.', therapie:'CU remissie-inductie: 5-ASA (mesalazine) voor milde/matige ziekte; corticosteroïden bij matig/ernstig beloop. Onderhoud: 5-ASA. Biologicals (infliximab, vedolizumab) bij therapieresistentie. Chirurgie (colectomie) bij ernstige of therapieresistente CU.' } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 45 jaar, acute epigastrische pijn uitstralend naar de rug, misselijkheid, braken. Amylase 850 U/L (normaal <100). Meest waarschijnlijke oorzaak?',
    a:['Acute pancreatitis door galstenen of alcohol','Maagperforatie','Mesenteriale ischemie','Aortadissectie'], c:0,
    ex:'Acute pancreatitis: verhoogd amylase >3× normaal bij epigastrische pijn uitstralend naar de rug. Meest voorkomende oorzaken: galstenen (45%) en alcohol (35%). Diagnose bij ≥2 van de 3 criteria: typische pijn, amylase/lipase >3×normaal, beeldvorming.',
    wiki:{ kern:'Amylase en lipase stijgen bij pancreatitis. Lipase is specifieker (amylase ook verhoogd bij nierinsufficiëntie, speekselklierafwijkingen, darmischemie). De ernst wordt bepaald met de Modified Glasgow Score of BISAP. CT-abdomen met contrast is gouden standaard voor necrose.', mechanisme:'Vroegtijdige activatie van trypsine → auto-digestie van het pancreas → lokale en systemische inflammatie. Galsteenpancreatitis: steen blokkeert ductus pancreaticus → obstructie. Alcoholpancreatitis: directe toxiciteit op acinaire cellen.', onderscheid:'Maagperforatie: rigide buik, pneumoperitoneum op X-thorax. Mesenteriale ischemie: ouder, vasculaire risicofactoren, pijn erger dan bevindingen. Aortadissectie: scheurende pijn, bloeddrukasymmetrie.', therapie:'Conservatief: niets per os initieel, agressieve IV vochtsuppletie (Ringer-lactaat geprefereerd), pijnstilling. Galsteenpancreatitis: ERCP bij biliaire obstructie + cholecystectomie tijdens zelfde opname. Geïnfecteerde necrose: antibiotica + drainage.' } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 62 jaar, geleidelijk toegenomen geelzucht, gewichtsverlies, pijnloos. Echo abdomen: verwijde galwegen, hypoechogene massa in caput pancreatis. Meest waarschijnlijke diagnose?',
    a:['Pancreascarcinoom','Choledocholithiasis','Primaire scleroserende cholangitis','Hepatocellulair carcinoom'], c:0,
    ex:'Pijnloze obstructieve icterus + massa in pancreaskop is klassiek voor pancreascarcinoom. Courvoisier-teken: palpabele, niet-pijnlijke galblaas bij geelzucht wijst op maligne obstructie (niet op galstenen, die geven een gecontraheerde galblaas).',
    wiki:{ kern:'Pancreascarcinoom: 5-jaarsoverleving <10% door laattijdige diagnose. Adenocarcinoom van het ductale epitheel (95%). Lokalisatie: 70% in de kop. CA 19-9 is tumormarker maar niet geschikt voor screening (lage specificiteit).', mechanisme:'Obstructie van de ductus choledochus → gal kan niet naar darm → geconjugeerd bilirubine stijgt in bloed → icterus, donkere urine, ontkleurde ontlasting. Verwijding van galwegen en galblaas door obstructie (Courvoisier).', onderscheid:'Choledocholithiasis: pijnlijke icterus, koorts (Charcot-trias), galstenen op echo. PSC: galgangsvernauwingen en -verwijd, geassocieerd met colitis ulcerosa. HCC: bij levercirrose, AFP verhoogd.', therapie:'Resectabel: Whipple-procedure (pancreaticoduodenectomie). Palliatief: galwegdrainage via ERCP (stent), chemotherapie (FOLFIRINOX of gemcitabine+nab-paclitaxel). Prognose slecht bij gemetastaseerde ziekte.' } },

  { type:'pharma', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Via welk mechanisme verlagen protonpompremmers (PPI\'s) de maagzuurproductie?',
    a:['Irreversibele blokkade van H+/K+-ATPase in parietaalcellen','Blokkade van H2-receptoren op parietaalcellen','Neutralisatie van maagzuur door basische verbindingen','Remming van gastrine-afgifte door G-cellen'], c:0,
    ex:'PPI\'s (omeprazol, pantoprazol) blokkeren irreversibel de H+/K+-ATPase (protonpomp) in de parietaalcellen → meest effectieve remming van maagzuurproductie. H2-blokkers (ranitidine) blokkeren H2-receptoren maar zijn minder effectief.',
    wiki:{ kern:'PPI\'s zijn prodrugs die geactiveerd worden in het zure milieu van de parietaalcel. Na activatie binden ze covalent aan de protonpomp → irreversibele remming tot nieuwe pomp wordt gesynthetiseerd (24-48u). Maximaal effect na 3-5 dagen.', mechanisme:'H2-blokkers (cimetidine, ranitidine): remmen histamine-gestimuleerde zuurproductie, minder effectief dan PPI\'s. Antacida (magnesiumhydroxide, aluminiumhydroxide): neutraliseren maagzuur, snel effect maar kortdurend. Sucralfaat: beschermend laagje op ulcus.', onderscheid:'PPI indicaties: GERD, maagulcus, H. pylori-eradicatie (PPI+AB), NSAID-gastroprotectie bij risicopatiënten, Zollinger-Ellison. Bijwerkingen langdurig PPI: hypomagnesiëmie, vitamine B12-tekort, verhoogd Clostridium difficile-risico, osteoporose.' } },


  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Vrouw van 52 jaar, pijn rechter bovenbuik na vette maaltijden, misselijkheid. Echo abdomen: galstenen zichtbaar, galblaas normaal groot. Diagnose?',
    a:['Symptomatische cholecystolithiasis','Acute cholecystitis','Choledocholithiasis','Hepatitis A'], c:0,
    ex:'Symptomatische cholecystolithiasis (galsteenkolieken): pijn rechter bovenbuik na maaltijden, misselijkheid, galblaas normaal groot op echo. Bij acute cholecystitis is de galblaas vergroot, wandverdikt, met positief Murphy-teken.',
    wiki:{ kern:'Galstenen aanwezig bij 10-15% van de westerse bevolking. Meeste asymptomatisch. Symptomatisch: galsteenkolieken door passagère inklemmling van een steen in de ductus cysticus. Behandeling: laparoscopische cholecystectomie.', mechanisme:'Murphy-teken: palpatie van de rechter bovenbuik tijdens inspiratie → pijn door druk op ontstoken galblaas. Positief bij acute cholecystitis. Charcot-trias (pijn + koorts + icterus) = cholangitis door steen in ductus choledochus.', onderscheid:'Acute cholecystitis: koorts, leukocytose, verdikt galblaaswan op echo, positief Murphy. Choledocholithiasis: icterus, verhoogd bilirubine en alkalisch fosfatase. Hepatitis A: ook rechter bovenbuikpijn maar icterus, verhoogd ALAT/ASAT.', therapie:'Cholecystectomie (laparoscopisch): bij symptomatische cholecystolithiasis de enige curatieve behandeling. Acuut cholecystitis: eerst antibiotica + pijnstilling, cholecystectomie binnen 72u of na 6 weken.' } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 38 jaar, recidiverende episoden van abdominale pijn, opgeblazen gevoel, afwisselend diarree en obstipatie, al jaren. Geen gewichtsverlies, bloed bij ontlasting negatief. Colonoscopie normaal. Diagnose?',
    a:['Prikkelbare darmsyndroom (IBS)','Colitis ulcerosa','Ziekte van Crohn','Colorectaal carcinoom'], c:0,
    ex:'IBS: functionele darmaandoening zonder organische pathologie. Rome IV-criteria: recidiverende buikpijn ≥1 dag/week de afgelopen 3 maanden, geassocieerd met defecatieverandering en/of consistentiewijziging van de ontlasting. Uitsluiting organische pathologie is essentieel.',
    wiki:{ kern:'IBS treft 10-15% van de bevolking. Subtypes: IBS-D (diarree-dominant), IBS-C (obstipatie-dominant), IBS-M (gemengd). Geen organische marker — diagnose door symptomen en uitsluiting. Geen maligne ontaarding.', mechanisme:'Viscerale hypersensitiviteit, gestoorde darm-hersenas communicatie, microbioomveranderingen. Mogelijke triggers: stress, voeding (FODMAP), infectie (post-infectieus IBS). Geen structurele afwijkingen op beeldvorming of biopsie.', onderscheid:'IBD (CU/Crohn): bloederige diarree, gewichtsverlies, afwijkingen op colonoscopie en biopsie, verhoogde CRP/calprotectine. Alarm signs ("red flags") bij IBS: bloed in ontlasting, gewichtsverlies, nachtelijke klachten, positieve familieanamnese colorectaal carcinoom → aanvullend onderzoek.', therapie:'Leefstijladviezen: low-FODMAP dieet, stressmanagement. Farmacologisch: spasmolytica (mebeverine), loperamide bij IBS-D, laxantia bij IBS-C. Psychologische therapie effectief bij ernstige klachten.' } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 50 jaar, verhoogd ALAT (5×ULN), vermoeidheid, rechter bovenbuikongemak. Hij drinkt geen alcohol. Echo: verhoogde echogeniciteit lever. BMI 34, diabetes type 2. Meest waarschijnlijke diagnose?',
    a:['Non-alcoholische leververvetting (NAFLD/NASH)','Alcoholische hepatitis','Virale hepatitis B','Primaire biliaire cholangitis'], c:0,
    ex:'NAFLD/NASH: leversteatos bij afwezigheid van significante alcoholconsumptie. Sterk geassocieerd met obesitas, diabetes type 2 en metabool syndroom. NASH (non-alcoholische steatohepatitis) kan progresseren naar cirrose.',
    wiki:{ kern:'NAFLD = spectrum van leveraandoeningen: eenvoudige steatose (NAFL) tot steatohepatitis (NASH) tot cirrose. Prevalentie 25% in de westerse bevolking, stijgend door de obesitasepidemie. NASH: steatose + ontsteking + hepatocytschade (ballooning) op biopsie.', mechanisme:'Insulineresistentie → lipide-accumulatie in hepatocyten → oxidatieve stress → ontsteking → fibrose. Tweede stap: mitochondriaal disfunctioneren, intestinale dysbiose, adipokinedebalans.', onderscheid:'Alcoholische hepatitis: alcohol-anamnese, ASAT/ALAT-ratio >2:1. Virale hepatitis B/C: serologie positief. PBC: vrouwen middelbaren leeftijd, AMA positief, pruritus, cholestasepatroon.', therapie:'Gewichtsreductie (10% gewichtsverlies verbetert histologie significant). Behandeling metabole risicofactoren (diabetes, hypertensie, dyslipidemie). Vitamine E bij NASH zonder diabetes. Geen specifieke farmacologische therapie bewezen effectief; nieuwe middelen in onderzoek.' } },

  { type:'diagnose', d:5, domain:'gastro', dl:'Gastro-enterologie', subtype:'diff',
    q:'Welk symptoom onderscheidt de ziekte van Crohn het meest van colitis ulcerosa?',
    a:['Perianale fistels en abcessen','Bloederige diarree','Buikkrampen','Verhoogd CRP bij opvlamming'], c:0,
    ex:'Perianale fistels zijn karakteristiek voor de ziekte van Crohn door de transmurale, discontinue ontsteking die fistels kan veroorzaken. Bij colitis ulcerosa (mucosale ontsteking, alleen colon) komen perianale fistels niet voor. Bloederige diarree, buikkrampen en verhoogd CRP kunnen bij beide voorkomen.',
    wiki:{ kern:'Crohn vs. CU onderscheidende kenmerken: Crohn: skip-lesions, transmuraal, perianale ziekte, kan ileum/mondholte treffen, geen bloederige diarree altijd. CU: continue, mucosaal, altijd rectum betrokken, geen skip-lesions, bloederige diarree klassiek.', mechanisme:'Transmuraal = alle lagen van de darmwand aangedaan → fistelvorming, stenosen, perforatie. Perianale ziekte bij Crohn: fistels van rectum/anuskanaal naar omgeving (huid, vagina, blaas). Behandeling: biologicals (infliximab), chirurgie bij resistentie.', onderscheid:'Scleroserende cholangitis: vaker bij CU. Ileitis terminalis: Crohn specifiek. Pyoderma gangrenosum en erythema nodosum: extraïntestinale manifestaties van beide. ASCA positief bij Crohn, pANCA bij CU (niet 100% specifiek).' } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Vrouw van 35 jaar, zuurbranden na maaltijden, regurgitatie, nachtelijke hoest. Klachten verbeteren bij het hoofd hoog leggen. Welke diagnose is het meest waarschijnlijk?',
    a:['Gastro-oesofageale refluxziekte (GERD)','Maagulcus','Achalasie','Eosinofiele oesofagitis'], c:0,
    ex:'GERD: klassiek zuurbranden + regurgitatie, verergering liggend of na maaltijden, verbetering bij antacida/PPI en hoofd hoog leggen. Nachtelijke hoest en heesheid zijn atypische manifestaties van GERD door laryngeale irritatie.',
    wiki:{ kern:'GERD: maaginhoud stroomt terug in de slokdarm door insufficiënte lagere oesofageale sfincter. Prevalentie 10-20% in de westerse wereld. Complicaties bij langdurige GERD: oesofagitis, Barrett-oesofagus, adenocarcinoom.', mechanisme:'Barrett-oesofagus: metaplasie van plaveiselcelpitheel naar cilindrisch darmepitheel door chronische blootstelling aan maagzuur. Risicofactor voor oesofagusadenocarcinoom (30-40× verhoogd risico). Surveillance endoscopie elke 3-5 jaar.', onderscheid:'Achalasie: dysfagie voor vaste én vloeibare voeding, regurgitatie ongericht, manometrie: verhoogde LOS-druk. Eosinofiele oesofagitis: dysfagie jongeren, bolus-impactie, eosinofilie op biopsie. Maagulcus: epigastrische pijn, afhankelijk van maaltijd.', therapie:'Leefstijl: gewichtsreductie, hoofd hoog slapen, vermijden van triggers (alcohol, koffie, chocola, vet). PPI 4-8 weken. Onderhoudstherapie bij recidief. Fundoplicatie (chirurgie) bij therapieresistentie.' } },


  { type:'truefalse', d:2, domain:'gastro', dl:'Gastro-enterologie — Waar of Niet?',
    q:'Helicobacter pylori-infectie is een risicofactor voor zowel maagulcus als maagcarcinoom.',
    c:true,
    ex:'WAAR. H. pylori is aanwezig bij >90% van de duodenumulcera en ~70% van de maagulcera. Het is ook geclassificeerd als IARC groep 1 carcinogeen voor maagcarcinoom. Eradicatie vermindert ulcusrecidief en het carcinoomrisico.',
    wiki:{ kern:'H. pylori is een gramnegative spiraalvormige bacterie die de maagmucosa koloniseert en chronische gastritis veroorzaakt. Prevalentie hoger in ontwikkelingslanden (50-80%) dan westerse landen (20-30%). Overdracht: fecaal-oraal.', mechanisme:'H. pylori → CagA en VacA virulentiefactoren → mucosale ontsteking → maagulcus of MALT-lymfoom. Langdurige infectie → atrofische gastritis → metaplasie → dysplasie → carcinoom (Correa-cascade). Eradicatie: PPI + claritromycine + amoxicilline of metronidazol, 7-14 dagen.', onderscheid:'Ureumademtest: goud standaard voor non-invasieve diagnose en verificatie eradicatie. Fecesantigeen: alternatief. Biopsie (CLO-test/histologie) bij gastroscopie. Serologie: bewijst blootstelling, niet actieve infectie.' } },

  { type:'truefalse', d:2, domain:'gastro', dl:'Gastro-enterologie — Waar of Niet?',
    q:'Bij verdenking op een bovenste GI-bloeding moet altijd eerst een CT-scan van het abdomen worden verricht vóór endoscopie.',
    c:false,
    ex:'NIET WAAR. Spoed-endoscopie (gastroscopie) binnen 24 uur is de eerste keus bij een bovenste GI-bloeding. Endoscopie is zowel diagnostisch als therapeutisch (hemostase mogelijk). CT-angiografie wordt pas overwogen als endoscopie mislukt of als bron onduidelijk blijft.',
    wiki:{ kern:'Bovenste GI-bloeding (hematemese/melena): directe resuscitatie (IV toegang, kristalloïden, bloedgroepbepaling), daarna endoscopie binnen 24u (of <12u bij hemodynamische instabiliteit). PPI IV geeft voor endoscopie al vermindering van hoog-risico stigmata.', mechanisme:'Endoscopische Forrest-classificatie bepaalt bloedingsrisico: Forrest Ia (actief sproeiend bloeden) → directe hemostase. Forrest IIa/IIb (zichtbaar vat/klonter) → interventie. Forrest IIc/III (vlak haematine/clean base) → conservatief.', onderscheid:'Lage GI-bloeding (helder rood bloed per anum): kolonoscopie na voorbereiding. CT-angiografie: bij massieve bloeding of als bron onduidelijk. Nuclear scan (technetium-RBC): detectie van langzame bloedingen.' } },

  { type:'truefalse', d:2, domain:'gastro', dl:'Gastro-enterologie — Waar of Niet?',
    q:'Een acuut abdomen met pneumoperitoneum op de thoraxfoto is een absolute indicatie voor spoedslaparotomie.',
    c:true,
    ex:'WAAR. Vrij lucht onder het diafragma (pneumoperitoneum) wijst op een geperforeerd hol orgaan (maag, duodenum, colon). Dit is een chirurgische spoedindicatie. De meest frequente oorzaak is een perforatie van een maag- of duodenumulcus.',
    wiki:{ kern:'Pneumoperitoneum: best zichtbaar op staande thoraxfoto of linker-decubitus buikoverzicht. CT-abdomen is gevoeliger. Oorzaken: ulcusperforatie, darmperfora­tie bij diverticulitis, coloncarcinoom, ischemische darm. Conservatief beleid soms bij stabiele patiënten met gedekte perforatie.', mechanisme:'Perforatie → lucht en maaginhoud/darminhoud lekken in buikholte → chemische peritonitis → bacteriële peritonitis → sepsis. Rigide buik ("plankbuik"), diffuse drukpijn en loslaatpijn.', onderscheid:'Pseudopneumoperitoneum: Chilaiditi-syndroom (colon tussen lever en diafragma), perforatie van een holle vene. Altijd klinische correlatie.' } },

  { type:'truefalse', d:2, domain:'gastro', dl:'Gastro-enterologie — Waar of Niet?',
    q:'Colonoscopie is de screeningsmethode van eerste keus voor colorectaal carcinoom bij een 50-jarige zonder bijzondere risicofactoren.',
    c:true,
    ex:'WAAR. Colonoscopie is de gouden standaard voor colorectaal carcinoomscreening: detectie én directe verwijdering van poliepen. In Nederland wordt echter fecaal immunochemisch testen (FIT) gebruikt als populatiescreen, met colonoscopie bij positieve FIT.',
    wiki:{ kern:'Colorectaal carcinoom: 3e meest voorkomende kanker en 2e oorzaak van kankersterfte wereldwijd. Adenom-carcinoom sequentie: 10-15 jaar van adenoom naar carcinoom. Verwijdering van adenomen (poliepectomie) voorkomt carcinoom.', mechanisme:'Risicofactoren: leeftijd >50j, IBD, familiegeschiedenis CRC, familiaire polyposis (FAP), Lynch-syndroom (HNPCC). CEA (carcinoembryonaal antigeen): niet geschikt voor screening, wel voor follow-up na resectie.', onderscheid:'FIT (fecaal immunochemisch testen): niet-invasief, jaarlijks of tweejaarlijks, positief bij occulte bloeding → colonoscopie. Sigmoidoscopie: ziet distale colon. CT-colonografie: niet-invasief alternatief maar geen therapiemogelijkheid.' } },

  { type:'diagnose', d:5, domain:'gastro', dl:'Gastro-enterologie', subtype:'test',
    q:'Een 70-jarige patiënt met vermoeden van bovenste GI-bloeding (hematemese, hemodynamisch stabiel). Welk onderzoek heeft de hoogste prioriteit?',
    a:['Gastroscopie binnen 24 uur','CT-abdomen met contrast','Arteriële angiografie','X-abdomen staand'], c:0,
    ex:'Gastroscopie is zowel diagnostisch als therapeutisch (hemostase). Bij stabiele patiënt: binnen 24u. Bij hemodynamisch instabiele patiënt: resusciteer eerst, daarna zo snel mogelijk gastroscopie (<12u). CT heeft geen therapeutisch voordeel in eerste instantie.',
    wiki:{ kern:'Risicostratificatie: Glasgow-Blatchford Score bepaalt urgentie (nul: poliklinisch, hoog: spoed-endoscopie). Pre-endoscopische PPI vermindert stigmata van recente bloeding en kan het aantal interventies verminderen.', mechanisme:'Endoscopische hemostase: epinefrine-injectie, heater probe, clips (hemostaseclips), argonplasmacoagulatie. Succes >90% bij actieve bloeding. Recidiefbloeding: repeat endoscopie of interventieradiologie.', onderscheid:'Angiografie/embolisatie: bij recidief na endoscopie of als endoscopie niet mogelijk. Chirurgie: als laatste redmiddel. X-abdomen: waardeloos bij GI-bloeding, wél bij verdenking perforatie.' } },


  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 68 jaar, acuut ernstige buikpijn, koorts 39°C, linker onderbuikpijn, défense musculaire links. CT-abdomen: verdikking sigmacolon, pericolisch vet ontstoken. Diagnose?',
    a:['Acute diverticulitis','Coloncarcinoom sigmoïd','Ischemische colitis','Hernia inguinalis incarcerata'], c:0,
    ex:'Acute diverticulitis: acute ontsteking van een divertikel (uitstulping van de colonwand). Klassiek: linker onderbuikpijn (sigmacolon meest aangedaan), koorts, leukocytose. CT-abdomen is diagnostisch: pericolisch vet, verdikking colonwand.',
    wiki:{ kern:'Diverticulose (aanwezigheid divertikels) bij >50% van de westerse bevolking >70 jaar. Complicaties: diverticulitis (20%), bloeding, fistel, abces, perforatie. Meest aangedaan: sigmacolon (westerse dieet, weinig vezel).', mechanisme:'Diverticulitis ontstaat bij obstructie van een divertikelhals → bacteriële proliferatie → micro- of macroperforatie. Hinchey-classificatie van ernst (I-IV): I = pericolisch abces, IV = fecale peritonitis.', onderscheid:'Coloncarcinoom: langzamer beloop, gewichtsverlies, veranderd defecatiepatroon, bloedverlies. Ischemische colitis: acuut, links, hematochezie, ouder, vasculaire risicofactoren. Appendicitis: rechts onderbuik, McBurney.', therapie:'Ongecompliceerd: antibiotica (ciprofloxacine + metronidazol of amoxicilline-clavulanaat), rustdieet. Gecompliceerd (abces): CT-geleide drainage. Perforatie: spoedslaparotomie (Hartmann-procedure). Electieve sigmoïdresectie na ≥2 gecompliceerde episoden.' } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Vrouw van 42 jaar met levercirrose (Child-Pugh B). Acute hematemese, bloeddruk 90/60 mmHg. Meest waarschijnlijke bloedingsbron?',
    a:['Oesofagusvarices','Maagulcus','Mallory-Weiss scheur','Angiodysplasie'], c:0,
    ex:'Bij een cirrosepatiënt met hematemese zijn oesofagusvarices de meest waarschijnlijke oorzaak (portale hypertensie → varices). Mortaliteit per bloedingsepisode 15-25%. Directe behandeling: terlipressine + somatostatine-analoog + antibiotica + endoscopie.',
    wiki:{ kern:'Portale hypertensie (portale druk >10 mmHg) bij cirrose → vorming van varices in oesofagus en fundus maag → risico op ruptuur. Variceuze bloeding treedt op bij 25-35% van de cirrosepatïënten. Primaire profylaxe: niet-selectieve bètalokkers (propranolol).', mechanisme:'Acuut management: resuscitatie (voorzichtig met vocht!), terlipressine (of somatostatine/octreotide) IV vermindert portale druk, antibiotica (norfloxacine → infectieprofylaxe), endoscopie met ligatie of sclerotherapie. TIPS bij refractaire bloeding.', onderscheid:'Maagulcus: ook bij cirrose maar minder acute shock. Mallory-Weiss: scheur bij cardio-oesofageale junctie na braken, minder ernstig. Portale gastropathie: diffuse mukosale bloeding, ook bij cirrose.', therapie:'Ballon-tamponade (Sengstaken-Blakemore): temporair bij massieve bloeding. TIPS (transjugulaire intrahepatische portosystemische shunt): refractaire varicesbloeding. Secundaire profylaxe: bètalokker + endoscopische varicesligatie.' } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Man van 25 jaar, progressieve dysfagie voor vaste en vloeibare voeding, regurgitatie van niet-verteerd voedsel. Manometrie: verhoogde onderste oesofageale sfincterdruk, aperistaltiek. Diagnose?',
    a:['Achalasie','Gastro-oesofageale reflux','Oesofaguscarcinoom','Eosinofiele oesofagitis'], c:0,
    ex:'Achalasie: neuromusculaire aandoening van de oesofagus met verlies van nitrinerge inhibitoire neuronen → onvolledige relaxatie van de onderste oesofageale sfincter + aperistaltiek. Dysfagie voor vaste én vloeibare voeding is kenmerkend (onderscheid van carcinoom).',
    wiki:{ kern:'Achalasie: afwezigheid van inhibitoire nitrinerge plexus myentericus neuronen → LOS relaxeert onvoldoende bij slikken → oesofageale retentie → regurgitatie. Barium-slikfoto: "bird-beak" vernauwing. Endoscopie: dilatatietekens, maar biopsie negatief.', mechanisme:'Oorzaak onbekend (idiopathisch); secundaire achalasie: Chagas-ziekte (Trypanosoma cruzi), pseudoachalasie door tumor bij cardia. Manometrie is gouden standaard: verhoogd basale LOS-druk en incomplete LOS-relaxatie.', onderscheid:'Oesofaguscarcinoom: ouder, gewichtsverlies, roken/alcohol, progressieve dysfagie eerder voor vast dan vloeistof. GERD: zuurbranden, geen dysfagie als hoofdklacht. Eosinofiele oesofagitis: jongeren, atopie, voedselallergie, bolus-impactie.', therapie:'Endoscopische pneumatische dilatatie van de LOS. Laparoscopische Heller-myotomie (+ Dor-fundoplicatie). POEM (Per Oral Endoscopic Myotomy): minimaal invasief. Botoxtinjectie: tijdelijk, voor patiënten die niet operabel zijn.' } },

  { type:'diagnose', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Wat is de meest voorkomende oorzaak van levercirrose in de westerse wereld?',
    a:['Alcoholisch leverlijden','Virale hepatitis C','NAFLD/NASH','Primaire biliaire cholangitis'], c:0,
    ex:'Alcoholisch leverlijden is de meest voorkomende oorzaak van cirrose in westerse landen, gevolgd door virale hepatitis C en NAFLD/NASH (toenemend door obesitas-epidemie). Wereldwijd is virale hepatitis B de meest frequente oorzaak.',
    wiki:{ kern:'Cirrose: eindstadium van chronische leverziekte → fibrose vervangt hepatocyten → verlies van leverfunctie + portale hypertensie. Complicaties: ascites, hepatische encefalopathie, oesofagusvarices, hepatocellulair carcinoom, spontane bacteriële peritonitis.', mechanisme:'Alcohol: directe hepatotoxiciteit + acetaldehyde-schade + oxidatieve stress → steatohepatitis → fibrose. Per week: >14 E vrouwen of >21 E mannen = schadelijk. Child-Pugh/MELD-score bepaalt ernst en prognose.', onderscheid:'HBV-cirrose: HBsAg positief, tenofovir/entecavir. HCV-cirrose: anti-HCV positief, curatieve DAA-therapie (>95% genezing). PBC: AMA positief, vrouwen, pruritus, UDCA. Hemochromatose: hoog ferritine + transferrinesaturatie, leverbiopsie, aderlating.' } },

  { type:'lab', d:3, domain:'gastro', dl:'Gastro-enterologie',
    q:'Patiënt met vermoeden acute pancreatitis. Welk enzym heeft de HOOGSTE specificiteit voor pancreatitis?',
    a:['Lipase','Amylase','ASAT','Gamma-GT'], c:0,
    ex:'Lipase is specifieker voor pancreatitis dan amylase. Amylase stijgt ook bij nierinsufficiëntie, speekselklierafwijkingen, darmischemie en andere abdominale aandoeningen. Lipase blijft langer verhoogd (3-5 dagen vs. 1-2 dagen voor amylase).',
    wiki:{ kern:'Diagnostiek acute pancreatitis: ≥2 van de 3 criteria: (1) typische epigastrische pijn, (2) amylase of lipase >3× ULN, (3) beeldvorming passend bij pancreatitis. CT-abdomen met contrast: gouden standaard voor necrose-beoordeling (na 48-72u).', mechanisme:'Amylase: ook in speekselklieren, darm, gonaden, nieren → lage specificiteit. Lipase: vrijwel uitsluitend pancreasspecifiek. Bij nierinsufficiëntie: beide enzymen kunnen verhoogd zijn (verminderde klaring). Norm voor diagnose: >3× upper limit of normal.', onderscheid:'Verhoging leverenzymen (ASAT/ALAT/gamma-GT/alkalisch fosfatase) bij galsteenpancreatitis (obstructieve component) of alcoholisch leverlijden. CRP >150 na 48u wijst op ernstige pancreatitis (necrosevorming).' } },


  // ── ENDOCRINOLOGIE ──
  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Man van 48 jaar, toegenomen dorst en urineproductie, vermoeid, nuchtere bloedglucose 8.4 mmol/L en 9.1 mmol/L bij herhaling. HbA1c 62 mmol/mol. Diagnose?',
    a:['Diabetes mellitus type 2','Diabetes mellitus type 1','Nefrogeen diabetes insipidus','Primaire hyperaldosteronisme'], c:0,
    ex:'DM type 2 diagnose: ≥2 nuchtere glucosewaarden ≥7.0 mmol/L, of HbA1c ≥53 mmol/mol, of random glucose ≥11.1 mmol/L + symptomen. Type 2 treedt op bij volwassenen met risicofactoren (overgewicht, familiaire belasting).',
    wiki:{ kern:'DM type 2: relatieve insulinedeficiëntie door insulineresistentie + progressief b-celverlies. Prevalentie 400 miljoen wereldwijd. Risicofactoren: obesitas, sedentair, leeftijd >45j, familiaire belasting, etniciteit. DM type 1: auto-immuun b-celdestructie, absolut insulinetekort, ketose-gevoelig.', mechanisme:'HbA1c: geglyceerd hemoglobine, weerspiegelt gemiddeld bloedglucose over 2-3 maanden. Diagnostisch: ≥53 mmol/mol (7%). OGTT (orale glucosetolerantietest): 2u waarde ≥11.1 mmol/L bij 75 g glucose = DM. Prediabetes: nuchter 6.1-6.9 of HbA1c 42-52.', onderscheid:'DM type 1: jongere leeftijd, slank, auto-antistoffen (GAD65, IA-2, ZnT8), C-peptide laag. LADA: langzaam progressief auto-immuun, volwassenen. DI: polydipsie maar normaal glucose; diagnostisch met wateronthoudingstest.', therapie:'DM2 stap 1: metformine + leefstijl. Stap 2: toevoegen SGLT2-remmer (bij HVZ/nierziekte) of GLP-1 agonist (bij obesitas). Insuline bij HbA1c persistend hoog. Behandeldoel HbA1c <53 mmol/mol (individualiseren).' } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Vrouw van 35 jaar, hartkloppingen, gewichtsverlies, warmte-intolerantie, tremor, ooguitpuiling (exophthalmus). TSH <0.01 mIE/L, vrij T4 verhoogd. Diagnose?',
    a:['Ziekte van Graves','Toxisch multinodulair struma','Hashimoto-thyroïditis','Subacute thyroïditis'], c:0,
    ex:'Ziekte van Graves: de meest voorkomende oorzaak van hyperthyreoïdie bij jongere vrouwen. Kenmerkend: hyperthyreoïdie + exophthalmus (Graves-ophthalmopathie) + soms pretibiale myxoedeem. TSI (thyrotropine-stimulerende immunoglobulinen) zijn pathognomonisch.',
    wiki:{ kern:'Hyperthyreoïdie: overproductie van schildklierhormoon. Graves is auto-immuun (TSI stimuleren TSH-receptor). Toxisch adenom of multinodulair struma: autonome hormoonproductie. Subacute thyroïditis: voorbijgaande thyreotoxicose door ontsteking.', mechanisme:'Symptomen: tachycardie, atriumfibrilleren, gewichtsverlies, warmte-intolerantie, zweten, tremor, diarree, menstruatiestoornissen. TSH is de meest gevoelige screeningstest. Behandeling: thionamiden (thiamazol, propylthiouracil), radioactief jodium, chirurgie.', onderscheid:'Hashimoto: auto-immuun hypothyreoïdie (TPO-Ab+), aanvankelijk tijdelijke hyperthyreoïdie (hashitoxicose). Subacute (De Quervain): pijnlijke schildklier, zelflimiterend. Toxisch adenom: solitair heet noduul op scintigrafie.', therapie:'Graves: thiamazol 1-2 jaar → 50% recidief → dan radioactief jodium of thyroïdectomie. Propranolol voor symptoomcontrole. Graves-ophthalmopathie: snel remitterende hyperthyreoïdie, selenium, corticosteroïden bij ernstige exophthalmus.' } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Man van 55 jaar, moe, koud, traag, obstipatie, bradycardie, droge huid, verhoogd TSH (28 mIE/L), laag vrij T4. Diagnose?',
    a:['Primaire hypothyreoïdie','Secundaire hypothyreoïdie','Ziekte van Cushing','Primaire hyperaldosteronisme'], c:0,
    ex:'Primaire hypothyreoïdie: hoog TSH (hypofyse compenseert) + laag vrij T4. De meest voorkomende oorzaak in westerse landen is Hashimoto-thyroïditis (auto-immuun, TPO-antistoffen positief). Secundaire hypothyreoïdie: laag TSH + laag T4 (hypofysair probleem).',
    wiki:{ kern:'Hypothyreoïdie: onvoldoende schildklierhormoonsynthese. Symptomen: moeheid, koude-intolerantie, gewichtstoename, obstipatie, bradycardie, trage reflexen, droge huid, haarverlies, cognitieve vertraging. Ernstig: myxoedeem-coma (levensbedreiging).', mechanisme:'TSH: negatieve feedback met T4. Bij primaire hypothyreoïdie: T4 laag → TSH stijgt (compensatoir). Hashimoto: TPO-antistoffen vernietigen folliculaire cellen. Behandeling: levothyroxine (L-T4) oraal, doseertitrage op basis van TSH.', onderscheid:'Secundaire hypothyreoïdie (hypofysair): TSH laag/normaal + T4 laag → MRI hypofyse. Derde-orde: TRH-deficiëntie (hypothalamisch). Sick euthyroid syndrome: T3 laag bij ernstige ziekte maar TSH normaal.', therapie:'Levothyroxine (L-T4): starten laag en opbouwen, doel TSH 0.5-2.5 mIE/L. Bij cardiale comorbiditeit: traag opbouwen. Myxoedeem-coma: IV L-T4 + hydrocortison + intensieve zorg.' } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Vrouw van 42 jaar, maandlange vermoeidheid, huidpigmentatie (inclusief slijmvliezen), gewichtsverlies, hypotensie, hyponatriëmie, hyperkaliëmie. Diagnose?',
    a:['Primaire bijnierschorsinsufficiëntie (ziekte van Addison)','Secundaire bijnierschorsinsufficiëntie','Hypothyreoïdie','SIADH'], c:0,
    ex:'Ziekte van Addison: auto-immuun destructie van de bijnierschors → tekort aan cortisol én aldosteron. Hyperpigmentatie (door ACTH-stijging) is kenmerkend voor primaire bijnierschorsinsufficiëntie en ontbreekt bij secundaire. Hyponatriëmie + hyperkaliëmie = aldosterontekort.',
    wiki:{ kern:'Primaire bijnierschorsinsufficiëntie (Addison): tekort aan glucocorticoid (cortisol) + mineralocorticoid (aldosteron). Oorzaak: auto-immuun (70%), tuberculose, adrenale bloeding (Waterhouse-Friderichsen bij meningokokkensepsis). Diagnose: cortisolbepaling + ACTH-stimulatietest.', mechanisme:'Cortisoltekort → ACTH-stijging (negatieve feedback weggevallen) → MSH-bijproduct → hyperpigmentatie. Aldosterontekort → natrium verlies + kalium retentie + volume depletie → hypotensie. Addison-crisis: extreme stress, trauma, infectie → decompensatie.', onderscheid:'Secundaire bijnierschorsinsufficiëntie (hypofysair ACTH-tekort): geen hyperpigmentatie (ACTH laag), geen aldosterontekort (RAAS intact). SIADH: hyponatriëmie maar geen kaliumbedieningsafwijking of hypotensie. Hypothyreoïdie: ook vermoeidheid maar geen hyperpigmentatie.', therapie:'Hydrocortison 2-3× daags (mimiceert fysiologisch patroon). Fludrocortison voor mineralocorticoïdvervanging. Addison-crisis: IV hydrocortison 100 mg bolus + 200 mg/24u + NaCl 0.9% resuscitatie. Altijd SOS-injectie meegeven.' } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Man van 38 jaar, ernstige hypertensie, hypokaliëmie, metabole alkalose. Aldosteron hoog, renine laag. Diagnose?',
    a:['Primaire hyperaldosteronisme (syndroom van Conn)','Renovasculaire hypertensie','Cushing-syndroom','Feochromocytoom'], c:0,
    ex:'Primaire hyperaldosteronisme: autonome aldosteronproductie onafhankelijk van renine-angiotensine systeem. Klassiek: hypertensie + hypokaliëmie + metabole alkalose + hoog aldosteron + laag renine. Oorzaak: aldosteron-producerend adenoom (Conn) of bilaterale bijnierhyperplasie.',
    wiki:{ kern:'Primaire hyperaldosteronisme is de meest voorkomende oorzaak van secundaire hypertensie (5-10% van hypertensieve patiënten). Aldosteron → Na-retentie + K-verlies → hypertensie + hypokaliëmie. Aldosteron/renine-ratio (ARR) >30: screeningstest.', mechanisme:'Aldosteron stimuleert ENaC (epitheliaal natriumkanaal) in distale nier → Na resorptie + K/H uitscheiding → hypokaliëmie + metabole alkalose. Hypokaliëmie: spierzwakte, polyurie (nefrogeen DI door hypokaliëmie).', onderscheid:'Renovasculaire hypertensie: ook secundaire hypertensie maar hoog renine + hoog aldosteron. Cushing: hoge cortisol, buffalo hump, striae. Feochromocytoom: episodisch, catecholaminen verhoogd.', therapie:'Aldosteron-producerend adenoom: laparoscopische adrenalectomie. Bilaterale hyperplasie: mineralocorticoïd-antagonist (spironolacton of eplerenon). Kaliumsuppletie tijdelijk. Bloeddrukcontrole.' } },


  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Vrouw van 30 jaar, obese, hoge bloeddruk, paarse striae op de buik, buffalo hump, maanvormig gelaat, spieratrofie. 24-uurs urinevrij cortisol verhoogd. Diagnose?',
    a:['Cushing-syndroom','Primaire hyperaldosteronisme','Hypothyreoïdie','Polycysteus ovariumsyndroom'], c:0,
    ex:'Cushing-syndroom: chronische blootstelling aan glucocorticoïden (endogeen of exogeen). Kenmerkend: centrale obesitas, paarse striae, buffalo hump, maanvormig gelaat, hypertensie, spieratrofie. Meest voorkomende oorzaak: exogeen corticosteroïdgebruik.',
    wiki:{ kern:'Endogeen Cushing: (1) Cushing-ziekte (ACTH-producerend hypofyse-adenoom, 70%), (2) ectopische ACTH-productie (longcarcinoom), (3) primair bijnierschorsadenoom/-carcinoom. Diagnose-algoritme: screeningen (24u UFC, late-night speekselcortisol, overnight dexamethason-suppressietest) → oorzaakbepaling (ACTH, MRI/CT, CRH-test).', mechanisme:'Cortisol: proteïnekatabolisme (spieratrofie, striae), vetredistributie (centraal), gluconeogenese (hyperglykemie), immunosuppressie, mineralocorticoïd-effect (hypertensie, hypokaliëmie). Paarse striae: gespannen huid + catabolisme.', onderscheid:'Metabool syndroom: obesitas maar geen striae/spieratrofie, normaal cortisol. Pseudo-Cushing: depressie/alcoholisme verhoogt cortisol maar dexamethason suppressietest normaal. PCOS: ook androgene verschijnselen en cyclusstoornissen maar geen echte Cushing-kenmerken.', therapie:'Cushing-ziekte: transsfenoïdale hypofyse-adenoomresectie. Bijnieradenoom: adrenalectomie. Ectopisch: behandel primaire tumor. Medicamenteus overbrugging: metyrapone, ketoconazol.' } },

  { type:'pharma', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Via welk mechanisme verlaagt metformine de bloedglucose bij diabetes type 2?',
    a:['Remming van hepatische gluconeogenese via AMPK-activatie','Stimulatie van insulinesecretie door b-cellen','Remming van intestinale glucoseresorptie via SGLT2','Verhoogde insulinegevoeligheid via PPARγ-activatie'], c:0,
    ex:'Metformine activeert AMPK (AMP-geactiveerd proteinkinase) → remming van hepatische gluconeogenese → glucose-output lever daalt. Metformine stimuleert de insulinesecretie niet en veroorzaakt daardoor geen hypoglykemie als monotherapie.',
    wiki:{ kern:'Metformine is eerste keus bij DM type 2 (UKPDS, ADVANCE): verlaagt cardiovasculaire mortaliteit, goedkoop, geen gewichtstoename, geen hypoglykemierisico als monotherapie. Bijwerkingen: GI-klachten (misselijkheid, diarree), zeldzaam: lactaatacidose bij nierinsufficiëntie (eGFR <30 stoppen).', mechanisme:'Naast AMPK: ook remming van mitochondriaal complex I → minder ATP → AMPK actief → minder malonyl-CoA → minder vetzuursynthese → betere insulinegevoeligheid. Geen hypoglykemierisico want insulinesecretie onveranderd.', onderscheid:'Sulfonylureumderivaten (glibenclamide): stimuleren insulinesecretie → hypoglykemierisico + gewichtstoename. SGLT2-remmers (empagliflozine): glucosurie, cardio- en nefroprotectief. GLP-1 agonisten (semaglutide): incretine-effect, gewichtsverlies. Thiazolidinedionen (pioglitazon): PPARγ, insulinegevoeligheid, vochtretentie.' } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Man van 52 jaar, brede handen en voeten, vergroot hoofd, ruimere pasvorm schoenen. Hoge IGF-1 spiegel. Diagnose?',
    a:['Acromegalie','Gigantisme','Hyperthyreoïdie','Primaire hyperparathyreoïdie'], c:0,
    ex:'Acromegalie: overproductie van groeihormoon (GH) door een hypofyse-adenoom na de groeischijfsluiting → vergoring van handen, voeten en schedel (niet de lengte). Verhoogd IGF-1 is de beste screeningstest. Gigantisme treedt op vóór sluiting van de groeischijven.',
    wiki:{ kern:'Acromegalie: insidieuse onset, diagnose vaak 10+ jaar na begin. Symptomen: vergoring handen/voeten, prognathisme, diastema, carpaaltunnelsyndroom, slaapapneu, DM, colonpoliepen, cardiomegalie. IGF-1: gecorrigeerd voor leeftijd en geslacht, beste screeningstest.', mechanisme:'GH-adenoom → GH stimuleert levercellen om IGF-1 te produceren → IGF-1 stimuleert weefsels. Bevestiging: GH suppressie na OGTT (normaal <1 μg/L; bij acromegalie: geen suppressie). MRI hypofyse: macroadenoom of microadenoom.', onderscheid:'Gigantisme: acromegalie vóór puberteit → excessieve lengtegroei. Hyperthyreoïdie: hypermetabolisme maar geen skeletveranderingen. Hemimegalie: unilateraal. Pachydermoperiostose: benigne.', therapie:'Transsfenoïdale adenoomresectie (eerstekeus). Medicamenteus bij residuele ziekte: somatostatine-analogen (octreotide, lanreotide), pegvisomant (GH-receptorantagonist). Radiochirurgie als aanvulling.' } },

  { type:'truefalse', d:2, domain:'endo', dl:'Endocrinologie — Waar of Niet?',
    q:'Bij diabetes mellitus type 1 is insulinetherapie optioneel; met dieet en orale antidiabetica kan de bloedsuiker ook goed worden geregeld.',
    c:false,
    ex:'NIET WAAR. Bij DM type 1 is er een absoluut insulinetekort door auto-immuun b-celdestructie. Insuline is levensnoodzakelijk — zonder insuline treedt diabetische ketoacidose op. Orale antidiabetica zijn niet effectief bij afwezige b-celfunctie.',
    wiki:{ kern:'DM type 1: auto-immuun vernietiging van b-cellen → absoluut insulinetekort → ketogenese → DKA als insuline wegvalt. Insulineregimes: basaal-bolus (lange + korte insuline) of insulinepomp (CSII). DAFNE-principe: zelfmanagement door koolhydraatratio.', mechanisme:'DKA (diabetische ketoacidose): insulinetekort → glucagon dominant → lipolyse → ketonvorming → acidose. Behandeling: insuline IV + vocht + elektrolyetcorrectie (K+ bewaken!). HHS (hyperosmolair hyperglykemisch syndroom): bij DM type 2, geen ketose.', onderscheid:'DM type 2: relatieve insulinedeficiëntie, orale middelen effectief (metformine, SGLT2-remmers). LADA (Latent Autoimmune Diabetes in Adults): geleidelijk progressief, GAD-antistoffen, begint lijkend op type 2.' } },

  { type:'truefalse', d:2, domain:'endo', dl:'Endocrinologie — Waar of Niet?',
    q:'Een verhoogd TSH bij een zwangere vrouw in het eerste trimester is normaal en vereist geen behandeling.',
    c:false,
    ex:'NIET WAAR. Een verhoogd TSH bij een zwangere vrouw kan wijzen op hypothyreoïdie, wat geassocieerd is met miskraam, zwangerschapscomplicaties en verminderde neurocognitieve ontwikkeling van het kind. Behandeling met levothyroxine is geïndiceerd. (NB: TSH-referentiewaarden dalen in het eerste trimester door hCG-effect.)',
    wiki:{ kern:'Schildklierhormon is cruciaal voor neuronale migratie en myelinisatie van de foetale hersenen, met name in het eerste trimester (foetus maakt nog geen eigen hormoon). Subklinische hypothyreoïdie (verhoogd TSH + normaal T4) bij zwangerschap: behandeldrempel lager dan buiten zwangerschap.', mechanisme:'HCG stimuleert de TSH-receptor (structurele gelijkenis met TSH) → T4-productie stijgt → TSH daalt fysiologisch in het eerste trimester. Zwangerschapsspecifieke referentiewaarden: TSH normaalgrens <2.5 mIE/L in trimester 1. Verhoogd TSH in trimester 1 = niet normaal.', onderscheid:'Hyperthyreoïdie in zwangerschap (ziekte van Graves): foetale gevolgen (neonatale thyreotoxicose), thionamiden met voorzichtigheid (propylthiouracil in trimester 1, daarna thiamazol).' } },


  { type:'truefalse', d:2, domain:'endo', dl:'Endocrinologie — Waar of Niet?',
    q:'Hypercalciëmie bij een patiënt met maligniteit berust vrijwel altijd op botmetastasen.',
    c:false,
    ex:'NIET WAAR. Hypercalciëmie bij maligniteit kan ook ontstaan door humorale hypercalciëmie van maligniteit (HHM): tumorproductie van PTHrP (PTH-related protein), dat dezelfde receptor activeert als PTH. HHM is verantwoordelijk voor 80% van de maligne hypercalciëmie, botmetastasen voor ~20%.',
    wiki:{ kern:'Oorzaken hypercalciëmie: (1) primaire hyperparathyreoïdie (PTH verhoogd, meest frequent in de polikliniek), (2) maligniteit (PTHrP of metastasen, meest frequent in het ziekenhuis), (3) sarcoidose/vitamineD-toxiciteit (1,25-OHD verhoogd), (4) familiale hypocalciurische hypercalciëmie.', mechanisme:'PTHrP bindt PTH-receptor → botresorptie + renale calcistresorptie → hypercalciëmie. PTH zelf is laag (negatieve feedback). Symptomen hypercalciëmie: "bones, stones, groans, psychic moans" (botpijn, nierstenen, obstipatie/misselijkheid, psychose/depressie).', onderscheid:'Primaire hyperparathyreoïdie: PTH hoog, asymptomatisch of nierstenen. Sarcoidose: 1,25-OHD hoog, verhoogd ACE. Vitamine D-toxiciteit: suppletie-anamnese. Immobilisatie: ook hypercalciëmie bij jonge patiënten.' } },

  { type:'truefalse', d:2, domain:'endo', dl:'Endocrinologie — Waar of Niet?',
    q:'SGLT2-remmers (gliflozines) zijn gecontra-indiceerd bij patiënten met diabetes type 2 en chronische nierziekte omdat ze de nierfunctie verslechteren.',
    c:false,
    ex:'NIET WAAR. SGLT2-remmers (empagliflozine, dapagliflozine) zijn juist nefroprotectief bij DM type 2 + chronische nierziekte: ze verminderen glomerulaire hyperfiltratie en verlagen het risico op progressie van nierziekte. Ze zijn gecontra-indiceerd bij eGFR <20-30 (onvoldoende glucosurie-effect).',
    wiki:{ kern:'SGLT2-remmers blokkeren de natriumglucosecotransporter 2 in de proximale tubulus → glucosurie + gewichtsverlies + bloeddrukdaling. Cardioprotecy: vermindering hartfalen-hospitalisaties (EMPA-REG, DECLARE-TIMI). Nefroprotectie: CREDENCE-trial: 30% reductie van renaal eindpunt.', mechanisme:'Mechanisme nefroprotectie: SGLT2-blokkade → minder natriumresorptie proximale tubulus → meer natrium bij macula densa → tubuloglomerulair feedback → afferent arteriol constrictie → vermindering glomerulaire hyperfiltratie → minder mechanische schade aan glomerulus.', onderscheid:'Bijwerkingen SGLT2-remmers: urogenitale infecties (glucosurie), euglykemische DKA (zeldzaam maar ernstig, cave perioperatief). Stop 3-4 dagen voor ingrepen. Niet bij DM type 1 routinematig.' } },

  { type:'diagnose', d:5, domain:'endo', dl:'Endocrinologie', subtype:'diff',
    q:'Welk kenmerk onderscheidt primaire van secundaire bijnierschorsinsufficiëntie?',
    a:['Hyperpigmentatie van huid en slijmvliezen','Hypotensie','Hyponatriëmie','Vermoeidheid en zwakte'], c:0,
    ex:'Hyperpigmentatie is specifiek voor primaire bijnierschorsinsufficiëntie (Addison). Daarbij stijgt ACTH compensatoir → MSH (melanocyte-stimulating hormone) als bijproduct → melaninestimulatie. Bij secundaire insufficiëntie is ACTH laag → geen pigmentatie. Hypotensie, hyponatriëmie en moeheid komen bij beide voor.',
    wiki:{ kern:'Primair (bijnier): ACTH hoog (hypofyse compenseert) → pigmentatie. Cortisol + aldosteron tekort → Na-verlies + K-stijging. Secundair (hypofyse): ACTH laag → geen pigmentatie. Cortisol tekort maar aldosteron normaal (RAAS intact → geen hyperkaliëmie).', mechanisme:'ACTH-precursor (POMC) wordt gesplitst in ACTH + MSH (melanocort). MSH bindt MC1R op melanocyten → melanine. Locaties hyperpigmentatie: zon-exposed huid, handpalmen, littekes, tandvlees, wangmucosa.', onderscheid:'Hemochromatose: ook hyperpigmentatie (bronzed diabetes) maar door ijzer + DM + levercirrose. ACTH-ectopisch (paraneoplastisch): hyperpigmentatie + hoog ACTH + maligne ziekte. Nelson-syndroom: na bilaterale adrenalectomie voor Cushing, ACTH-adenoom hypofyse.' } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Patiënte van 28 jaar, oligomenorroe, acne, hirsutisme, overgewicht, polycysteuze ovaria op echo. LH/FSH-ratio verhoogd. Diagnose?',
    a:['Polycysteus ovariumsyndroom (PCOS)','Congenitale bijnierhyperplasie','Hyperprolactinemie','Primaire ovariuminsufficiëntie'], c:0,
    ex:'PCOS is de meest voorkomende endocriene aandoening bij vrouwen in de vruchtbare leeftijd (5-10%). Rotterdam-criteria (≥2 van 3): oligo-/anovulatie, hyperandrogenisme (klinisch of biochemisch), polycysteuze ovaria op echo.',
    wiki:{ kern:'PCOS: chronische anovulatie + hyperandrogenisme. Insulineresistentie speelt een centrale rol (ook bij slanke PCOS-patiënten). Complicaties: infertiliteit, DM type 2, metabool syndroom, endometriumcarcinoom (door anovulatie → ongeopponneerd oestrogeen).', mechanisme:'LH/FSH-ratio >2.5 bij PCOS: verhoogde LH-pulsatie → meer androgeenstimulatie van theca-cellen → testosteron/DHEAS stijgt → perifere aromatisering naar oestrogeen. Overgewicht verergert insulineresistentie → hyperandrogenisme.', onderscheid:'Congenitale bijnierhyperplasie (laat-onset): 17-OHP verhoogd na ACTH-stimulatie. Hyperprolactinemie: galactorroe, prolactine hoog, MRI hypofyse. POI (premature ovarian insufficiency): FSH hoog, oestradiol laag, <40 jaar.', therapie:'Infertiliteitswens: ovulatie-inductie (clomifen, letrozol), metformine. Geen zwangerschapswens: combinatiepil (androgeen-antagonistisch: cyproteronacetaat). Leefstijl: gewichtsreductie verbetert cyclus en insulinegevoeligheid.' } },

  { type:'diagnose', d:3, domain:'endo', dl:'Endocrinologie',
    q:'Man van 60 jaar, nierstenen, osteoporose, mild hypercalciëmie. PTH verhoogd. Calcium en PTH verhoogd bij herhaalde bepaling. Diagnose?',
    a:['Primaire hyperparathyreoïdie','Maligne hypercalciëmie','Sarcoidose','Vitamine D-toxiciteit'], c:0,
    ex:'Primaire hyperparathyreoïdie: autonome overproductie van PTH door een bijschildklieradenoom (85%) of hyperplasie. Kenmerkend: hoog PTH + hoog calcium (normaal: negatieve feedback onderdrukt PTH bij hypercalciëmie). Meest voorkomende oorzaak van hypercalciëmie in de polikliniek.',
    wiki:{ kern:'Primaire hyperparathyreoïdie: PTH stimuleert botresorptie + renale calciumresorptie + 1-α-hydroxylase (meer actief vitamine D) → hypercalciëmie + hyperfosfaturie (laag fosfaat). Nierstenen (calciumoxalaat/-fosfaat), fibrocystische botafwijkingen, osteoporose.', mechanisme:'Sestamibi-scintigrafie of echo hals: lokalisatie bijschildklieradenoom. Laboratorium: hoog PTH, hoog calcium, laag fosfaat, hoog urine-calcium. Differentiatie van maligne hypercalciëmie: PTH laag bij maligniteit (PTHrP niet detecteerbaar in PTH-assay, maar separate assay beschikbaar).', onderscheid:'Familiale hypocalciurische hypercalciëmie (FHH): hoog calcium, hoog PTH, maar laag urine-calcium (calcium/creatinine-ratio <0.01) → geen chirurgie nodig. Secundaire HPT: bij nierinsufficiëntie of vit. D-tekort → hoog PTH maar laag/normaal calcium.', therapie:'Asymptomatisch mild: follow-up (calcium, eGFR, botdichtheid). Operatie-indicaties: calcium >2.85 mmol/L, eGFR <60, osteoporose (T-score <-2.5), leeftijd <50j. Chirurgie: parathyreoïdectomie (curatief bij adenoom >95%).' } },


  // ── NEFROLOGIE ──
  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Man van 70 jaar, oligurie 2 dagen na hartoperatie. Creatinine gestegen van 90 naar 310 μmol/L. Urine-natriumconcentratie 12 mmol/L, urine-osmolaliteit 580 mOsm/kg. Meest waarschijnlijke oorzaak?',
    a:['Prerenaal acuut nierfalen','Renaal acuut nierfalen (ATN)','Postrenaal acuut nierfalen','Contrastnefropathie'], c:0,
    ex:'Prerenaal nierfalen: lage urine-natrium (<20 mmol/L) en hoge urine-osmolaliteit (>500) wijzen op intacte tubulusfunctie die reageert op volumedepletie (nier concentreert maximaal). ATN: tubuli beschadigd → natrium niet gereabsorbeerd → urine-natrium hoog (>40) + lage osmolaliteit.',
    wiki:{ kern:'AKI-oorzaken: prerenaal (60%, verminderde nierperfusie), renaal (35%, ATN meest frequent), postrenaal (5%, obstructie). RIFLE/KDIGO-criteria: stijging creatinine ≥1.5× baseline in 7 dagen of ≥26.5 μmol/L in 48u, of oligurie <0.5 mL/kg/u >6u.', mechanisme:'Fractional excretion of sodium (FENa) = (urine-Na × serum-Cr) / (serum-Na × urine-Cr) × 100%. FENa <1%: prerenaal. FENa >2%: renaal (ATN). Cave: FENa onbetrouwbaar bij diuretische behandeling, contrastnefropathie.', onderscheid:'ATN na contrast: creatinine stijgt 24-48u na blootstelling, piek 3-5d, herstel 7-14d. Prerenale AKI herstelt snel na volumecorrectie. Postrenaal: echo nieren (hydronefrosis). Interstitiële nefritis: eosinofilie, rash, na medicatie (NSAIDs, AB).', therapie:'Prerenaal: vloeistofsuppletie, staken nefrotoxica (NSAIDs, ACE-remmers, contrast). ATN: ondersteunend (diurese handhaven, elektrolyten). Dialyse-indicaties: refractaire hyperkaliëmie, uremie, acidose, vochtoverbelasting.' } },

  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Vrouw van 25 jaar, oedeem gehele lichaam, proteïnurie 6 g/24u, hypoalbuminemie (20 g/L), hypercholesterolemie. Bloeddruk normaal. Diagnose?',
    a:['Nefrotisch syndroom','Nefritisch syndroom','Hartfalen','Levercirrose'], c:0,
    ex:'Nefrotisch syndroom: de vier klassieke kenmerken: massive proteïnurie (>3.5 g/24u), hypoalbuminemie, oedeem en hypercholesterolemie. Oorzaken: minimal change disease (kinderen), membraneuze nefropathie (volwassenen), diabetische nefropathie.',
    wiki:{ kern:'Nefrotisch vs. nefritisch syndroom: Nefrotisch: proteïnurie dominant, oedeem, geen of mild hematurie, normotensief. Nefritisch: hematurie, hypertensie, proteïnurie minder extreem, acute presentatie (complementverbruik).', mechanisme:'Podocytbeschadiging → basaalmembraan permeabel voor eiwitten → massive proteïnurie → albumine daalt → oncotische druk daalt → oedeem. Lever compenseert: meer lipoproteïnen → hypercholesterolemie. Trombose-risico: verlies antitrombines.', onderscheid:'Hartfalen: oedeem + verhoogde CVD + dyspneu, proteïnurie mild. Levercirrose: ascites dominant, splenomegalie, leverenzymen afwijkend. Nefritisch (IgA, post-strep GN): hematurie + RBC-cylinders in urinesediment.', therapie:'Minimale veranderingsziekte: prednisolon (90% remissie). Membraneuze nefropathie: afwachtend of immunosuppressie (cyclofosfamide, rituximab). Bloeddrukcontrole (ACE-remmer): ook antiproteinurisch effect. Statine bij hypercholesterolemie.' } },

  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Man van 65 jaar, nierfalen, diabetes 15 jaar, retinopathie. Urineanalyse: microalbuminurie (280 mg/g creatinine). eGFR 35 mL/min/1.73m². Meest waarschijnlijke diagnose?',
    a:['Diabetische nefropathie','IgA-nefropathie','Hypertensieve nefrosclerose','FSGS'], c:0,
    ex:'Diabetische nefropathie: progressieve nierziekte bij diabetes, gekenmerkt door microalbuminurie → macroalbuminurie → afname eGFR. Gelijktijdige retinopathie maakt diabetische nefropathie de meest waarschijnlijke diagnose (microvasculaire complicaties parallel).',
    wiki:{ kern:'Diabetische nefropathie: de meest voorkomende oorzaak van eindstadium nierziekte (ESRD) wereldwijd. Stadia: normoalbuminurie → microalbuminurie (30-300 mg/g) → macroalbuminurie (>300 mg/g) → GFR-daling. Glomerulaire hyperfiltratie in vroeg stadium.', mechanisme:'Hyperglykemie → mesangiumexpansie → Kimmelstiel-Wilson noduli (pathognomonisch op biopsie) → glomerulosclerose. AGE-vorming, PKC-activatie, TGF-β-upregulatie → fibrose. RAAS-overactivatie verergert glomerulaire druk.', onderscheid:'IgA-nefropathie: hematurie + proteïnurie, vaak na infectie, IgA op immunofluorescentie. Hypertensieve nefrosclerose: lang bestaande hypertensie, mild proteïnurie. FSGS: focaal segmentale glomerulosclerose, ernstige proteïnurie, biopsie nodig voor diagnose.', therapie:'Bloeddrukcontrole met ACE-remmer of ARB (antiproteinurisch + nefroprotectief). HbA1c <53 mmol/mol. SGLT2-remmer (nefroprotectief, CREDENCE). Finerenon (MRA): additionele nefroprotectie. Dieet: eiwitbeperking bij ernstig nierlijden.' } },

  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Man van 45 jaar, hypertensie, hematurie, nierpijn. Echo: bilateraal vergrote nieren met multipele cysten. Vader had hetzelfde. Diagnose?',
    a:['Autosomaal dominante polycysteuze nierziekte (ADPKD)','Multipele niercarcinomen','Medulaire sponsnieren','Von Hippel-Lindau syndroom'], c:0,
    ex:'ADPKD: bilateraal vergrote nieren met talrijke cysten + familieanamnese = klassieke presentatie. Meest voorkomende erfelijke nierziekte. Veroorzaakt door mutaties in PKD1 (85%) of PKD2 (15%). Leidt bij 50% tot ESRD voor het 60e levensjaar.',
    wiki:{ kern:'ADPKD: progressieve cystengroei → druk op nierparenchym → nierfalen. Extrarenale manifestaties: intracraniale aneurysma\'s (10%, berry aneurysm), levercy­sten (90%), mitralisklepinsufficiëntie. Screening familieleden > 18 jaar.', mechanisme:'PKD1 (polycystine-1) en PKD2 (polycystine-2) coderen voor membraanproteïnen in cilia van tubulusepitheel → verlies van ciliaire mechanosensing → abnormale proliferatie → cystevorming. mTOR-pathway overactief.', onderscheid:'ARPKD (autosomaal recessief): kinderen, leveribrose + portale hypertensie. Erworven cysteuze nieraandoening: bij langdurige dialyse. Von Hippel-Lindau: cysten + hemangioblastomen + niercelcarcinoom.', therapie:'Tolvaptan (V2-receptorantagonist): vertraagt cystengroei bij snelgroeiend ADPKD (TKV >750 mL). Bloeddrukcontrole (ACE-remmer). Intracraniale aneurysma: screening bij familieanamnese hersenaneurysma.' } },

  { type:'lab', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Patiënt met chronische nierinsufficiëntie (eGFR 18 mL/min). Lab: K+ 6.2 mmol/L, pH 7.28, HCO3- 14 mmol/L, ECG: piekende T-toppen. Welke behandeling heeft de hoogste prioriteit?',
    a:['Calcium gluconaat intraveneus','Kaliumbeperkt dieet','Natriumwaterstofcarbonaat oraal','Furosemide intraveneus'], c:0,
    ex:'Hyperkaliëmie met ECG-veranderingen (piekende T-toppen) = levensbedreigende ritmestoornis dreigt. Calcium gluconaat IV stabiliseert het myocard membraan direct (werking in minuten) maar verlaagt het kalium niet. Daarna: maatregelen om kalium te verlagen (insuline+glucose, kayexalaat, dialyse).',
    wiki:{ kern:'ECG-veranderingen hyperkaliëmie: piekende T-toppen → verbreding QRS → sine wave → ventrikelfibrilleren. Behandeling hyperkaliëmie stap voor stap: (1) Myocardstabilisatie: Ca-gluconaat IV. (2) K+ de cel in: insuline 10E + glucose 20%. (3) K+ verwijderen: kayexalaat, furosemide, dialyse.', mechanisme:'Calcium gluconaat: verhoogt drempelwaarde van hartspier → minder irritabel. Werkt snel (<5 min) maar tijdelijk (30-60 min). Insuline + glucose: stimuleert Na/K-ATPase → K+ de cel in (duur: 4-6u). Natriumbicarbonaat: bij ernstige acidose, K+ ook naar intracellulair.', onderscheid:'Zonder ECG-veranderingen (K <6.5): dieet, medicatieherziening (ACE-remmer, K-sparend diureticum stoppen), kayexalaat. Met ECG-veranderingen: acute spoed.' } },


  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Vrouw van 22 jaar, pijn bij het plassen, frequente aandrang, troebele urine, koorts 37.8°C. Urineanalyse: leukocyturie, nitriet positief. Geen flankpijn. Diagnose?',
    a:['Ongecompliceerde urineweginfectie (cystitis)','Pyelonefritis','Urethritis door Chlamydia','Interstitiële cystitis'], c:0,
    ex:'Ongecompliceerde cystitis: dysurie + pollakisurie + troebele urine, geen koorts >38°C, geen flankpijn (= geen bovenste UWI). Meest frequente verwekker: E. coli (85%). Behandeling: nitrofurantoïne of trimethoprim 5-7 dagen.',
    wiki:{ kern:'UWI indeling: ongecompliceerd (vrouwen, geen anatomische afwijkingen, geen comorbiditeit) vs. gecompliceerd (mannen, zwangerschap, obstructie, katheter, diabetes). Meest frequente verwekkers: E. coli, Staphylococcus saprophyticus (jonge vrouwen).', mechanisme:'Bacteriën koloniseren periurethraal → ascenderen naar blaas → cystitis. Flankpijn + koorts = nierparenchym bereikt = pyelonefritis → IV antibiotica. Nitriettest: gram-negatieve bacteriën reduceren nitraat → nitriet. Leukocyturie: >10 leuko\'s per hpf.', onderscheid:'Pyelonefritis: flankpijn, koorts >38°C, misselijkheid/braken, koude rillingen. Chlamydia: geen nitriet, atypisch urinesediment, seksueel actief. Interstitiële cystitis: chronisch, steriel urinesediment.', therapie:'Ongecompliceerde cystitis: nitrofurantoïne 5 dagen of trimethoprim 7 dagen. Cave: fluoroquinolonen (ciprofloxacine) niet als eerste keus door resistentiedruk. Pyelonefritis: ciprofloxacine 7 dagen of cefotaxim IV bij ernstig beloop.' } },

  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Jongen van 8 jaar, 2 weken na keelinfectie: hematurie, oedeem, hypertensie, oligurie. Complement C3 verlaagd. Meest waarschijnlijke diagnose?',
    a:['Post-streptokokken glomerulonefritis','IgA-nefropathie','Minimale veranderingsziekte','HUS (hemolytisch-uremisch syndroom)'], c:0,
    ex:'Post-streptokokken GN: klassiek 1-3 weken na keelinfectie (of huidinfectie) met S. pyogenes. Kenmerken: hematurie, hypertensie, oedeem, oligurie, laag C3 (complementactivatie). Zelflimiterend bij kinderen.',
    wiki:{ kern:'Post-streptokokken GN: immuuncomplexdepositie (IgG + C3) in glomeruli → activatie complementsysteem → ontsteking. Biopsie: diffuse proliferatieve GN met subepitheliale deposits ("humps"). C3 normaal na 8 weken, IgG na 6 maanden.', mechanisme:'Anti-streptokokken antistoffen reageren kruisreactief met glomerulair antigeen → immuuncomplexen → complementactivatie → ROS + prostaglandinen → GFR-daling. ASLO (antistreptolysine O) titer verhoogd bevestigt recente streptokokkeninfectie.', onderscheid:'IgA-nefropathie: hematurie binnen 24-48u na bovenstevoortractusinfectie (synfaryngitische hematurie), C3 normaal, IgA deposits. HUS: microangiopathische hemolytische anemie + trombocytopenie + AKI (na E. coli O157:H7). Membranoproliferatieve GN: laag C3 aanhoudend.', therapie:'Post-streptokokken GN: ondersteunend (vochtrestrictie, antihypertensiva, diureticum). Antibiotica voor infectie behandelen/voorkomen. Volledig herstel bij kinderen in >95%. Volwassenen: meer kans op chronische nierziekte.' } },

  { type:'truefalse', d:2, domain:'nephro', dl:'Nefrologie — Waar of Niet?',
    q:'ACE-remmers zijn gecontra-indiceerd bij alle patiënten met chronische nierziekte vanwege het risico op verdere nierschade.',
    c:false,
    ex:'NIET WAAR. ACE-remmers zijn juist nefroprotectief bij chronische nierziekte, met name bij diabetes en proteïnurie. Ze verlagen de intraglomerulaire druk door vaatverwijding van de efferente arteriole. Wel voorzichtigheid bij bilaterale nierslagaderstenose of ernstig nierfalen (eGFR <30).',
    wiki:{ kern:'ACE-remmers (en ARBs): verlagen efferente arteriole tonus → intraglomerulaire druk daalt → minder mechanische stres op podocyten → minder proteïnurie → vertraging progressie van nierziekte. Bewijsmateriaal: RENAAL, ADVANCE, ONTARGET-trials.', mechanisme:'Initiële creatinine-stijging (<30%) na start ACE-remmer is acceptabel (hemodynamisch effect, geen nierschade). Controleer K+ en creatinine 1-2 weken na start. Stop bij: creatinine-stijging >30%, hyperkaliëmie, bilaterale stenose.', onderscheid:'Gecontra-indiceerd bij: bilaterale nierslagaderstenose (ischemisch nierfalen door bloeddrukdaling efferente arteriole), zwangerschap (teratogeen). Voorzichtigheid bij eGFR <30 en hyperkaliëmie.' } },

  { type:'truefalse', d:2, domain:'nephro', dl:'Nefrologie — Waar of Niet?',
    q:'Een patiënt met een eGFR van 15 mL/min heeft per definitie hemodialyse nodig.',
    c:false,
    ex:'NIET WAAR. De beslissing om dialyse te starten is gebaseerd op symptomen (uremie, vochtoverbelasting, therapieresistente hyperkaliëmie, acidose) en niet uitsluitend op een grenswaarde van eGFR. Sommige patiënten met eGFR <15 zijn symptoomarm en kunnen langer worden gevolgd.',
    wiki:{ kern:'Nierfunctievervangende therapie (RRT): hemodialyse, peritoneale dialyse of niertransplantatie. Indicaties voor start dialyse: uremische symptomen (pruritus, pericarditis, encefalopathie), vochtoverbelasting refractair voor diuretica, hyperkaliëmie, ernstige metabole acidose.', mechanisme:'eGFR 10-15: tijdstip van voorbereiding voor RRT (fisteloperatie, evaluatie transplantatie). eGFR-drempel voor starten dialyse: variabel, gemiddeld 5-10 mL/min tenzij eerder symptomatisch. ESRD (end-stage renal disease) = eGFR <15 per definitie.', onderscheid:'Niertransplantatie: superieur aan dialyse qua overleving en kwaliteit van leven. Pre-emptieve transplantatie (voor start dialyse) bij geschikte donor is optimaal. Peritoneale dialyse: thuis, continue ambulante variant (CAPD).' } },

  { type:'truefalse', d:2, domain:'nephro', dl:'Nefrologie — Waar of Niet?',
    q:'Hyponatriëmie (Na+ <135 mmol/L) is altijd een teken van een tekort aan natrium in het lichaam.',
    c:false,
    ex:'NIET WAAR. Hyponatriëmie is een serumspiegel-stoornis die niets zegt over de totale hoeveelheid natrium in het lichaam. Het kan optreden bij volumeoverschot (hartfalen, cirrose), normovolemie (SIADH) of volumetekort (braken, diarree). Behandeling verschilt per oorzaak.',
    wiki:{ kern:'Hyponatriëmie classificatie: (1) Hypervolemisch: Na+ verdund door water-overschot → hartfalen, cirrose, nefrotisch. (2) Euvolemisch: SIADH, hypothyreoïdie, bijnierschorsinsufficiëntie, psychogene polydipsie. (3) Hypovolemisch: Na- en waterverlies maar water>Na verlies → braken, diarree, diuretica.', mechanisme:'SIADH (Syndrome of Inappropriate ADH): ADH verhoogd ondanks laag osmolaliteit → waterretentie → hyponatriëmie. Oorzaken: longcarcinoom (paraneoplastisch), meningitis/SAB, medicatie (carbamazepine, thiaziden, SSRI). Diagnose: urine-osmolaliteit >100 + urine-natrium >30 bij hyponatriëmie.', onderscheid:'Te snelle correctie hyponatriëmie: osmotisch demyelinisatiesyndroom (centrale pontiene myelinolyse) → max. 8-10 mmol/L/24u corrigeren. Pseudohyponatriëmie: bij hypertriglyceridemie of hyperproteïnemie (artefact).' } },


  { type:'diagnose', d:5, domain:'nephro', dl:'Nefrologie', subtype:'diff',
    q:'Welk urineanalyse-kenmerk onderscheidt nefritisch van nefrotisch syndroom?',
    a:['Erytrocytencasten in het urinesediment','Proteïnurie >3.5 g/24u','Oedeem en hypoalbuminemie','Hypercholesterolemie'], c:0,
    ex:'Erytrocytencasten (RBC-casts) zijn pathognomonisch voor glomerulaire hematurie (nefritisch syndroom). Ze ontstaan wanneer erytrocyten de tubulaire lumen passeren en ingeklemd raken in Tamm-Horsfall eiwit. Nefrotisch: massive proteïnurie, hypoalbuminemie, oedeem, hypercholesterolemie.',
    wiki:{ kern:'Urinesedimentanalyse: RBC-casts = glomerulonefritis. Granulaire casts ("muddy brown") = ATN. Leukocytencasten = pyelonefritis of interstitiële nefritis. Vetdruppelende cellen + lipidcasts = nefrotisch syndroom. Hyaliene casts = normaal of geconcentreerde urine.', mechanisme:'Nefritisch syndroom: glomerulaire hematurie + dysmorfische erytrocyten (acanthocyten) + RBC-casts + proteïnurie (matig) + hypertensie + oligurie + AKI. Nefrotisch: podocytdysfunctie → selectief eiwitverlies → cascade van hypoalbuminemie, oedeem, hyperlipidemie, trombosegevoeligheid.', onderscheid:'IgA-nefropathie: nefritisch + RBC-casts, recidiverende episoden na infectie. MCNS (minimal change): nefrotisch maar sediment normaal. Lupus-nefritis: kan beide beelden geven. MPGN: laag C3, gemengd beeld.' } },

  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Man van 55 jaar, recidiverende nierstenen. CT toont röntgendichte stenen (calciumoxalaat). 24-uurs urineonderzoek: hypercalciurie. Welke aandoening moet als onderliggende oorzaak worden uitgesloten?',
    a:['Primaire hyperparathyreoïdie','Gicht (hyperurikemie)','Cystinurie','Struviet-infectiestenen'], c:0,
    ex:'Hypercalciurie bij calciumoxalaatstenen: altijd primaire hyperparathyreoïdie (verhoogd PTH → botresorptie → calciumexcretie) uitsluiten via PTH- en calciumbepaling. Idiopathische hypercalciurie is de meest frequente oorzaak, maar HPT is behandelbaar en dient niet gemist te worden.',
    wiki:{ kern:'Nierstenentypen: calciumoxalaat/fosfaat (70%, röntgendicht), urinezuurstenen (15%, röntgennegatief), struviet/infectiestenen (10%, röntgendicht, hert­hoornvormig), cystine (1%, erfelijk). CT-abdomen zonder contrast: gouden standaard detectie.', mechanisme:'Calciumoxalaatstenen: hypercalciurie (idiopathisch, HPT, immobilisatie), hyperoxalurie (Crohn, malabsorptie), lage citraat­uitscheiding (metabole acidose). Urinezuurstenen: hyperurikemie + zure urine (pH <5.5). Struviet: Proteus mirabilis, Klebsiella.', onderscheid:'Urinezuurstenen: behandelbaar met urinealkalisatie (natriumbicarbonaat, allopurinol). Struviet: antibiotica + chirurgische verwijdering. Cystine: D-penicillamine, ruime vochtintake.', therapie:'Acuut: pijnstilling (NSAID of morfine), hydratatie, alphablokker (tamsulosine) voor passage-bevordering. Electief: extracorporele schokgolflitotripsie (ESWL) of ureteroscopie. Preventie: >2 L diurese/dag.' } },

  { type:'diagnose', d:3, domain:'nephro', dl:'Nefrologie',
    q:'Vrouw van 35 jaar, recidiverende urineweginfecties na de menopauze, nu tevens flankpijn en koorts 39°C. Meest waarschijnlijke diagnose?',
    a:['Acute pyelonefritis','Ongecompliceerde cystitis','Nefrolithiasis','Renaal abces'], c:0,
    ex:'Pyelonefritis: UWI + flankpijn (slagpijn nierloges) + koorts ≥38°C wijst op infectie van het nierparenchym. Behandeling: fluoroquinolon 7 dagen of IV antibiotica bij ernstig beloop. Echo of CT om obstructie/abces uit te sluiten.',
    wiki:{ kern:'Pyelonefritis: E. coli (80%), S. saprophyticus, Klebsiella. Diagnose: klinisch ± urineanalyse (leukocyturie, nitriet, bacteriurie) ± urinekweek. Bloed­kweek bij koorts/sepsis. Echo nieren: bij verdenking obstructie, abces of onvoldoende respons na 48-72u antibiotica.', mechanisme:'Obstructie + infectie = urosepsis-risico. Gram-negatieve sepsis: lipopolysaccharide → cytokinenstorm → SIRS → orgaandisfunctie. ESBL-producerende E. coli: toenemend probleem, coverage met meropenem of fosfomycine IV.', onderscheid:'Nefrolithiasis: koliekpijn (niet perkussiegevoelig of juist wel), geen koorts initieel. Renaal abces: persisterende koorts na antibiotica, CT-diagnose, drainage nodig. Cystitis: geen flankpijn of koorts.' } },


  // ── PSYCHIATRIE ──
  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Vrouw van 32 jaar, al 3 weken depressief, slaapproblemen, gewichtsverlies, concentratieproblemen, schuldgevoelens, geen suïcidale gedachten. DSM-5 diagnose?',
    a:['Depressieve stoornis (major depressive disorder)','Dysthymie (persisterende depressieve stoornis)','Bipolaire stoornis type II','Rouwreactie'], c:0,
    ex:'MDD: ≥5 van de 9 DSM-5 criteria gedurende minimaal 2 weken, inclusief depressieve stemming of anhedonie. Dysthymie: mildere maar chronische depressie (≥2 jaar). Bipolair type II: depressieve episodes + hypomane (niet manische) episodes.',
    wiki:{ kern:'DSM-5 criteria MDD (≥5 aanwezig ≥2 weken): depressieve stemming, anhedonie, gewichtsverandering, slaapstoornis, psychomotore agitatie/remming, vermoeidheid, waardeloosheidsgevoel/schuld, concentratieproblemen, suïcidale gedachten. Minimaal depressieve stemming OF anhedonie.', mechanisme:'Monoamine-deficiëntiehypothese: verminderde serotonine, noradrenaline en dopamine. SSRI\'s (selectieve serotonine-heropnameremmers) zijn eerste keus: fluoxetine, sertraline, paroxetine. Effect na 4-6 weken. Combinatie met cognitieve gedragstherapie (CGT) is superieur.', onderscheid:'Bipolair: manische of hypomane episode ≥1× eerder. Rouwreactie: normaal na verlies, minder ernstig, geen schuldgevoelens over zichzelf. Hypothyreoïdie: ook depressieve kenmerken, TSH bepalen bij elke nieuwe depressie.', therapie:'Licht-matig: CGT of SSRI (gelijkwaardig). Ernstig: SSRI + CGT of farmaco + psychiatrisch consult. Behandelingsduur: ≥6 maanden na remissie (recidiefpreventie). ECT bij therapieresistente of ernstige depressie.' } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Man van 25 jaar, afgelopen week grandioos zelfgevoel, nauwelijks slapen maar vol energie, overmatig praten, vluchtige ideeën, impulsief geld uitgespen. Geen drugs. Diagnose?',
    a:['Manische episode (bipolaire stoornis type I)','Hypomane episode (bipolaire stoornis type II)','Schizofrenie','Borderline persoonlijkheidsstoornis'], c:0,
    ex:'Manische episode: verhoogde stemming + ≥3 B-criteria (grandiositeit, slaapbehoefte laag, vluchtige ideeën, drukke spraak, doelgericht gedrag, impulsiviteit) ≥7 dagen of ziekenhuisopname vereist. Hypomaan: zelfde maar ≤4 dagen en geen opname/ernstige gevolgen.',
    wiki:{ kern:'Bipolaire stoornis type I: minimaal één manische episode (met of zonder depressie). Type II: hypomane episodes + depressieve episodes (nooit manisch). Cyclothymie: milde wisselende stemmingen ≥2 jaar, nooit voldoend aan criteria voor MDD of manie.', mechanisme:'Lithium is hoeksteen van onderhoudsbehandeling: stemmingsstabilisator. Werkt via remming inositolmonofosfa­tase en GSK-3β. Smal therapeutisch venster (0.6-1.2 mEq/L). Alternatieven: valproaat, lamotrigine (depressie-preventie), quetiapine.', onderscheid:'Borderline: instabiele stemmingen maar kortdurend (uren), gerelated aan interpersonele stress. Schizofrenie: wanen/hallucinaties op voorgrond, geen manische stemmingsverhoging. Drugsintoxicatie (cocaïne, amfetamine): anamnese.', therapie:'Acute manie: antipsychoticum (olanzapine, risperidon, quetiapine) + stemmingsstabilisator. Lithium: onderhoud. Valproaat: snelle keuze bij acute manie. ECT: bij ernstige therapieresistente manie. Psychoeducatie over medicatieontrouw (groot risico).' } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Vrouw van 28 jaar, terugkerende, onverwachte paniekaanvallen met hartkloppingen, transpiratie, benauwdheid, angst om dood te gaan. Ze vermijdt nu publieke plekken. Diagnose?',
    a:['Paniekstoornis met agorafobie','Sociale angststoornis','Gegeneraliseerde angststoornis','Specifieke fobie'], c:0,
    ex:'Paniekstoornis: recidiverende onverwachte paniekaanvallen + aanhoudende bezorgdheid over nieuwe aanvallen of gedragsverandering. Agorafobie: vermijden van situaties waaruit ontsnapping moeilijk zou zijn. De combinatie is frequent.',
    wiki:{ kern:'Paniekaanval: plotse intensieve angst met ≥4 lichamelijke/cognitieve symptomen (palpitaties, transpireren, trillen, dyspneu, thoraxpijn, misselijkheid, duizeligheid, derealisatie, angst de controle te verliezen/dood te gaan). Piek binnen 10 minuten.', mechanisme:'Neurobiologie: hypersensitiviteit amygdala, locus coeruleus hyperactiviteit (noradrenaline), overreactie van het fight-or-flight systeem. Hyperventilatie → CO2-daling → respiratoire alkalose → paraesthesieën.', onderscheid:'Gegeneraliseerde angststoornis (GAS): chronische, diffuse, moeilijk beheersbare bezorgdheid (niet episodisch). Sociale angst: angst voor sociale beoordeling. PTSS: angst na trauma. Somatische aandoeningen uitsluiten: feochromocytoom, hyperthyreoïdie, aritmie.', therapie:'CGT (exposuretechnieken): bewezen meest effectief. SSRI (sertraline, paroxetine): farmacologisch eerste keus. Benzodiazepinen: kortdurend voor acute aanvallen, niet als onderhoudsbehandeling (afhankelijkheidsrisico). Combinatie CGT + SSRI superieur.' } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Man van 70 jaar, snel ontstaan over enkele dagen: desoriëntatie in tijd en plaats, wisselend bewustzijn, hallucinaties (ziet spinnen), agitatie \'s nachts. Vorige week nog helder. Diagnose?',
    a:['Delier','Dementie','Psychose','Alcoholonttrekking'], c:0,
    ex:'Delier: acuut (<48u) ontstane bewustzijnsstoornis met aandachtsproblemen, desoriëntatie en wisselend beloop. Kenmerkend: acuut begin + fluctuerend beloop + aandachtsstoornis + organische oorzaak. Dementie: chronisch, progressief, geen acuut begin.',
    wiki:{ kern:'Delier (CAM-criteria): acuut begin + wisselend beloop + aandachtsstoornis + desorganiseerd denken of bewustzijnsstoornis. Meest voorkomende psychiatrische stoornis in het ziekenhuis (15-30% van opnames). Verhoogde mortaliteit.', mechanisme:'Neurobiologie: cholinerg deficit (acetylcholinesteraseremmers kunnen helpen), dopamineoverschot, GABA-dysbalans bij alcoholonttrekking. Predisponerende factoren: leeftijd, dementie, polyfarmacie. Uitlokkende factoren: infectie (UWI, pneumonie), medicatie (anticholinergica, opiaten, benzodiazepinen), dehydratie, pijn, retentie.', onderscheid:'Dementie: chronisch, geen acuut begin, bewustzijn normaal initieel. Delier op dementie: gemengd en frequent. Psychose (schizofrenie): chronisch, bewustzijn niet gestoord. Alcoholonttrekking: anamnese, tremor, delirium tremens na 48-72u abstinentie.', therapie:'Behandel onderliggende oorzaak. Niet-farmacologisch: oriëntatie, slaapcyclus normaliseren, mobilisatie, geen onnodige katheters. Farmacologisch bij ernstige agitatie: lage dosis haloperidol. Alcoholonttrekking: benzodiazepinen.' } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Man van 22 jaar, sociale terugtrekking, bizarre overtuiging dat de buren hem bespieden via de tv, stemmen horen die commentaar geven, vlak affect. Klachten >6 maanden. Diagnose?',
    a:['Schizofrenie','Schizoaffectieve stoornis','Bipolaire stoornis met psychotische kenmerken','Waanstoornis'], c:0,
    ex:'Schizofrenie DSM-5: ≥2 kernsymptomen ≥1 maand (wanen, hallucinaties, desorganisatie, negatieve symptomen, catatonie) + sociaal/beroepsmatig disfunctioneren + duur ≥6 maanden. Schizoaffectieve stoornis: psychose + prominente stemmingsepisodes gelijktijdig.',
    wiki:{ kern:'Positieve symptomen (wanen, hallucinaties): overactiviteit dopaminerg systeem (mesolimbisch pad). Negatieve symptomen (vlak affect, alogie, avolontie, anhedonie): hypoactiviteit prefrontale cortex. Negatieve symptomen voorspellen slechter sociaal herstel.', mechanisme:'Antipsychotica: blokkade D2-receptoren (mesolimbisch/mesocorticaal). Typisch (haloperidol): effectief maar extrapiramidale bijwerkingen (parkinsonisme, tardieve dyskinesie). Atypisch (clozapine, quetiapine, risperidon): minder EPM, meer metabole bijwerkingen. Clozapine: meest effectief bij therapieresistentie maar agranulocytose-risico.', onderscheid:'Schizoaffectieve stoornis: psychotische symptomen óók buiten stemmingsepisodes. Bipolair met psychose: psychose alleen tijdens stemming. Waanstoornis: geïsoleerde niet-bizarre waan, geen hallucinaties of desorganisatie.', therapie:'Antipsychoticum (atypisch eerste keus). Psychosociale begeleiding: psychoeducatie, arbeidsintegratie, familieinterventie. Behandeling ≥2 jaar na eerste episode. Clozapine bij therapieresistentie (2 antipsychotica onvoldoende). Psychosociale rehabilitatie.' } },


  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Vrouw van 45 jaar, terugkerende opdringerige gedachten over besmetting, die ze niet kan stoppen. Ze wast haar handen >50× per dag om angst te verminderen, wat tijdelijk helpt. Diagnose?',
    a:['Obsessief-compulsieve stoornis (OCS)','Gegeneraliseerde angststoornis','Somatische symptoomstoornis','Specifieke fobie'], c:0,
    ex:'OCS: obsessies (opdringerige, egodystone gedachten → angst) + compulsies (rituelen om angst te verminderen). De compulsies geven tijdelijk verlichting maar versterken op termijn de obsessies. Egodystoon = de patiënt ervaart de gedachten als vreemd/ongewenst.',
    wiki:{ kern:'OCS prevalentie: 2-3%. Neurobiologie: hyperactiviteit orbito-frontale cortex + caudate nucleus. OCS-spectrum: trichotillomanie, body dysmorphic disorder, hoarding disorder. Yale-Brown OCS Scale (Y-BOCS): ernst meting.', mechanisme:'Serotonine-deficiëntiehypothese: SSRI in hogere dosis dan depressie (bijv. fluoxetine 60-80 mg). CGT met exposure en respons­preventie (ERP): eerste keus behandeling. Neurochirurgie (DBS) bij ernstige therapieresistentie.', onderscheid:'GAS: bezorgdheid over reële problemen (werk, gezondheid), niet egodystoon. Prikkelbare-darmsyndroom-OCS overlap: somatische focus. ADHD: impulsief gedrag maar geen rituelen. Psychose: wanen maar niet als egodystoon ervaren.', therapie:'Eerste keus: CGT-ERP (hoogste remissie). Farmacologisch: SSRI (hogere dosering dan depressie, 12+ weken). Clomipramine (TCA): effectief maar meer bijwerkingen. Combinatie CGT + SSRI: superieur bij matige/ernstige OCS.' } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Soldaat van 28 jaar, 6 maanden geleden teruggekeerd uit oorlogsgebied. Herbelevingen, nachtmerries, vermijdt prikkels die herinneren aan het trauma, hyperwaakzaamheid, emotionele gevoelloosheid. Diagnose?',
    a:['Posttraumatische stressstoornis (PTSS)','Acute stressstoornis','Aanpassingsstoornis','Depressieve stoornis'], c:0,
    ex:'PTSS: na blootstelling aan traumatische gebeurtenis → ≥1 maand: herbelevingssymptomen (flashbacks, nachtmerries) + vermijding + negatieve cognitieve/stemmingssymptomen + hyperarousal. Acute stressstoornis: <1 maand na trauma.',
    wiki:{ kern:'PTSS: prevalentie levenslang 8% in de algemene bevolking, 20-30% bij oorlogsveteranen. Neurobiologie: amygdala-hyperactiviteit, prefrontale cortex-hypoactiviteit (extinctielearning verstoord), hippocampus-atrofie (negatief geheugen). Cortisol-dysregulatie.', mechanisme:'Traumatisch geheugen wordt niet geïntegreerd → intrusieven. Behandeling: trauma-focused CGT (EMDR, prolonged exposure). EMDR (eye movement desensitization and reprocessing): bewezen effectief. SSRI (paroxetine, sertraline): farmacologische eerste keus.', onderscheid:'Aanpassingsstoornis: minder ernstig trauma, kortdurend (<6 maanden), geen herbelevingen. Depressie: kan comorbide zijn. Borderline: chronische instabiliteit, interpersoneel patroon. Acute stressstoornis: <1 maand, soms dissociatief.', therapie:'Trauma-focused CGT of EMDR: eerste keus. SSRI: paroxetine of sertraline. Prazosin (alfablokker): bij nachtmerries effectief. Geen benzodiazepinen (verhogen vermijding). Groepstherapie en lotgenotencontact als aanvulling.' } },

  { type:'truefalse', d:2, domain:'psych', dl:'Psychiatrie — Waar of Niet?',
    q:'Bij een acute psychose is het altijd veilig te starten met een hoge dosis antipsychotica om de symptomen sneller onder controle te krijgen.',
    c:false,
    ex:'NIET WAAR. Hoge doses antipsychotica geven meer bijwerkingen (extrapiramidale symptomen, sedatie, orthostatische hypotensie) zonder snellere werkzaamheid. Startdosis laag, opbouwen op geleide van effect en tolerantie. De antipsychotische werking treedt pas na 2-6 weken volledig op.',
    wiki:{ kern:'Antipsychotica: D2-receptorblokkade in het mesolimbisch systeem. Parkinsonsymptomen: D2-blokkade in het nigrostriatale systeem. Tardieve dyskinesie: langdurig gebruik → supersensitiviteit D2-receptoren → oncontroleerbare bewegingen.', mechanisme:'Neuroleptica equivalenten: alle middelen worden uitgedrukt als chlorpromazine-equivalent. Atypische antipsychotica (quetiapine, olanzapine, clozapine): ook serotonine-antagonisme → minder EPM, meer metabole bijwerkingen (gewichtstoename, diabetes).', onderscheid:'Serotoninesyndroom vs. neuroleptica maligne syndroom (NMS): NMS = dopamineantagonist → hoge koorts + rigiditeit + autonome instabiliteit + bewustzijns­daling. Behandeling NMS: stop antipsychoticum, dantroleen, bromocriptine.' } },

  { type:'truefalse', d:2, domain:'psych', dl:'Psychiatrie — Waar of Niet?',
    q:'Lithium is veilig te gebruiken bij patiënten met verminderde nierfunctie zonder dosisaanpassing.',
    c:false,
    ex:'NIET WAAR. Lithium wordt uitsluitend renaal uitgescheiden en heeft een smal therapeutisch venster (0.6-1.2 mEq/L). Bij nierfunctiestoornissen accumuleert lithium → toxiciteit (tremor, cognitieve stoornissen, convulsies, renale schade). Altijd dosisaanpassing en nauwgezette spiegelbewaking.',
    wiki:{ kern:'Lithiumtoxiciteit: spiegels >1.5 mEq/L → nausea, diarree, grove tremor. >2.0: lethargie, verwardheid, ataxie. >3.0: convulsies, coma, irreversibele renale/neurologische schade. Dehydratie (ook door NSAID, thiazide) verhoogt lithiumspiegel → altijd waarschuwen.', mechanisme:'Lithium en natrium worden competitief gereabsorbeerd in de proximale tubulus. Bij natriumtekort (dehydratie, lage zoutinname) → meer lithiumreabsorptie → spiegel stijgt. Kwartaals controleren: lithiumspiegel, nierfunctie, TSH (lithium veroorzaakt hypothyreoïdie bij langdurig gebruik).', onderscheid:'Valproaat: renale klaring minder afhankelijk, maar leverfunctie bewaken. Lamotrigine: bijzonder veilig bij nieraandoeningen, geen spiegelbewaking nodig. Carbamazepine: ook renale uitscheiding, maar minder smal venster.' } },

  { type:'truefalse', d:2, domain:'psych', dl:'Psychiatrie — Waar of Niet?',
    q:'Suïcidaliteit bij een depressieve patiënt is een absolute contra-indicatie voor SSRI-behandeling.',
    c:false,
    ex:'NIET WAAR. SSRI\'s zijn eerste keus bij depressie, ook bij suïcidaliteit. In de eerste weken kan activering optreden (meer energie terwijl stemming nog laag is) → korte termijn iets verhoogd risico in eerste 2 weken → nauwe follow-up. Het niet behandelen van depressie is een groter risico.',
    wiki:{ kern:'FDA black box warning: verhoogd suïciderisico bij jongeren <25j in de eerste weken van SSRI-behandeling. Bij volwassenen en ouderen: SSRI verlaagt op lange termijn suïciderisico. Aanbeveling: wekelijks contact in de eerste 4 weken.', mechanisme:'Activeringseffect: energieniveau herstelt sneller dan stemming → "dangerous window". Benzodiazepinen kortdurend overbruggen bij ernstige agitatie/angst. Altijd veiligheidsevaluatie: intentie, plan, middelen, beschermende factoren.', onderscheid:'Risicofactoren suïcide: eerder poging, mannelijk geslacht, alleenstaand, toegang tot middelen, middelenmisbruik, chronische pijn. Beschermende factoren: sociaal netwerk, kinderen, geloofsgemeenschap, behandelingsbereidheid.' } },

  { type:'diagnose', d:5, domain:'psych', dl:'Psychiatrie', subtype:'diff',
    q:'Welk kenmerk onderscheidt een depressieve episode bij bipolaire stoornis van een unipolaire depressie bij de behandelkeuze?',
    a:['SSRI-monotherapie kan een manische episode uitlokken bij bipolaire depressie','Bipolaire depressie reageert sneller op CGT','Bipolaire depressie heeft altijd suïcidaliteit','Bij unipolaire depressie zijn lithium contra-indicaties hoger'], c:0,
    ex:'SSRI-monotherapie bij bipolaire depressie kan een manische switch of cyclische versnelling uitlokken. Daarom wordt bij bipolaire depressie een stemmingsstabilisator (lithium, quetiapine, lamotrigine) als basis gegeven, en SSRI\'s slechts voorzichtig en altijd in combinatie met een stabilisator.',
    wiki:{ kern:'Bipolaire depressie behandeling verschilt fundamenteel van unipolaire: (1) Altijd stemmingsstabilisator als basis. (2) SSRI alleen in combinatie, niet als monotherapie. (3) Quetiapine is aangetoond effectief voor bipolaire depressie en heeft FDA-goedkeuring.', mechanisme:'Manische switch: bipolaire patiënt wordt door antidepressivum acuut manisch. Risico: hoger bij TCA (tricyclisch) dan bij SSRI, laagst bij lamotrigine. Lamotrigine: bewezen voor bipolaire depressie-preventie, niet voor acute manie.', onderscheid:'Unipolaire depressie: SSRI-monotherapie of CGT-monotherapie zijn eerste keus. Bipolair I vs. II: beide riskant bij SSRI-monotherapie. Postpartum psychose: vaker geassocieerd met bipolaire stoornis.' } },


  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Jongeman van 16 jaar, extreem weinig eten (BMI 15.5), gestoord lichaamsbeeld ("ik ben te dik"), amenorroe, ontkenning van ziekte. Diagnose?',
    a:['Anorexia nervosa (restrictief type)','Boulimia nervosa','Binge-eating stoornis','Vermijdend-restrictieve voedselinnamestoornis (ARFID)'], c:0,
    ex:'Anorexia nervosa: BMI <17.5 + intense angst voor gewichtstoename + gestoord lichaamsschema + ontkenning van ernst. Meest voorkomend bij adolescente vrouwen. Hoogste mortaliteit van alle psychiatrische stoornissen (sterfte door medische complicaties + suïcide).',
    wiki:{ kern:'Medische complicaties anorexia: bradycardie, hypotensie, hyponatriëmie, hypokaliëmie, metabole alkalose (bij purgeergedrag), osteoporose, lanugo, oedeem bij hervoeding. Refeeding syndroom: gevaar bij snelle hervoeding (fosfaat, K+, Mg daalt).', mechanisme:'Restrictief type: alleen calorierestrictie. Binge-purge type: ook eetbuien + compensatiegedrag (braken, laxantia). Behandeling: multidisciplinair (psychiatrie, diëtistiek, somatiek). FBT (family-based treatment) meest effectief bij adolescenten.', onderscheid:'Boulimia: normaal gewicht, eetbuien + compensatie, geen gestoord lichaamsschema als bij AN. Binge-eating: eetbuien zonder compensatie, overgewicht. ARFID: geen gewichtsfobíe, selectief eten door sensorische aversie.', therapie:'Ambulant als mogelijk. Opname bij BMI <13 of medische complicaties. Hervoeding langzaam (refeeding syndroom). Psychotherapie: CGT (bulimie effectief), FBT (adolescenten). Farmacologisch: geen bewezen middel voor AN; fluoxetine voor boulimia (FDA-goedgekeurd).' } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Man van 40 jaar, al jarenlang diep wantrouwen tegenover anderen, interpreteert neutrale opmerkingen als bedreigend, houdt vast aan rancune, dicht anderen slechte intenties toe. Geen psychose. Diagnose?',
    a:['Paranoïde persoonlijkheidsstoornis','Schizofrenie paranoïde type','Schizoïde persoonlijkheidsstoornis','Waanstoornis'], c:0,
    ex:'Paranoïde persoonlijkheidsstoornis (cluster A): pervasief wantrouwen en achterdocht, veronderstelt dat anderen hem schade willen berokkenen, maar geen psychose (wanen, hallucinaties). Chronisch, ego-syntoon (de patiënt ervaart zijn denken als normaal).',
    wiki:{ kern:'Persoonlijkheidsstoornissen: cluster A (schizoïd, schizotypisch, paranoïde), cluster B (antisociaal, borderline, theatraal, narcistisch), cluster C (vermijdend, afhankelijk, obsessief-compulsief). Kenmerken: pervasief, inflexibel, egosyntoon, vroeg begin.', mechanisme:'Persoonlijkheidsstoornissen zijn moeilijk te behandelen: ego-syntoon → beperkte behandelmotivatie. Psychotherapie (dialectische gedragstherapie bij borderline) is effectiever dan farmacotherapie. Medicatie: symptomatisch (antipsychotica bij paranoïdie, SSRI bij impulsiviteit).', onderscheid:'Schizofrenie: psychotische symptomen (echte wanen, hallucinaties). Waanstoornis: geïsoleerde waan, functioneren overigens intact. Schizoïd: sociaal teruggetrokken maar geen achterdocht. Schizotypisch: magisch denken, vreemd gedrag.', therapie:'Psychotherapie: cognitieve therapie helpt bij paranoïde denken. Therapeutische relatie is moeilijk door wantrouwen. Farmacotherapie: geen bewezen effect, soms lage dosis antipsychoticum bij ernstige symptomen.' } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Vrouw van 38 jaar, instabiele relaties, chronische leegte, impulsiviteit (automutilatie, risicovol gedrag), intense stemmingswisselingen gerelateerd aan interpersoonlijke stressoren. Diagnose?',
    a:['Borderline persoonlijkheidsstoornis','Bipolaire stoornis type II','Cyclothymie','Depressieve stoornis met impulsiviteit'], c:0,
    ex:'Borderline PS (cluster B): instabiele relaties + zelfbeeld + affecten + impulsiviteit. Stemmingswisselingen duren uren (niet dagen zoals bij bipolair) en zijn interpersoonlijk getriggerd. Automutilatie en suïcidepogingen zijn frequent maar meest para-suïcidaal.',
    wiki:{ kern:'BPS neurobiologie: verhoogde amygdala-reactiviteit + prefrontale hypoactiviteit → emotiedysregulatie. Hoge comorbiditeit met depressie, PTSS, verslavingsproblematiek. Prevalentie 1-2%, sterk overwegend vrouwen in klinische populaties.', mechanisme:'DBT (dialectische gedragstherapie, Linehan): gold standard behandeling BPS. Modules: mindfulness, emotieregulatie, interpersoonlijke effectiviteit, distress-tolerantie. MBT (mentalization-based treatment): alternatief. Farmacotherapie: symptomatisch.', onderscheid:'Bipolaire stoornis: stemmingswisselingen duren dagen tot weken, autonoom (niet interpersoonlijk getriggerd), slaapbehoefte veranderd. BPS: uren, interpersoonlijk, slaapcyclus relatief intact.', therapie:'DBT ambulant (2 jaar). Systeemtherapie als aanvulling. Hospitalisatie vermijden tenzij acute veiligheid. Farmacologisch: lage dosis antipsychoticum bij dissociatie/paranoia, SSRI bij depressie/impulsiviteit. Stemmingsstabilisator bij affectieve instabiliteit.' } },

  { type:'diagnose', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Man van 60 jaar, progressief geheugenverval over 3 jaar, vergeet afspraken, raakt thuis de weg kwijt, apraxie, verminderd oordeel. MRI: bitemporaal/parietaal atrofie. Diagnose?',
    a:['Ziekte van Alzheimer','Vasculaire dementie','Lewy-body dementie','Frontotemporale dementie'], c:0,
    ex:'Alzheimer: meest voorkomende dementie (60-70%). Insidieuse onset, progressief, anterograad geheugenverlies dominant, bitemporaal/parietaal atrofie op MRI. Lewy-body: ook parkinsonisme + fluctuerende cognitie + visuele hallucinaties.',
    wiki:{ kern:'Dementie classificatie: Alzheimer (60%), vasculair (15%), Lewy-body (15%), FTD (5-10%), gemengd. Alzheimer-biomarkers: amyloïd-β (verlaagd in CSF, positief op PET), tau en phospho-tau (verhoogd in CSF). Genetisch: APOE-ε4 verhoogt risico (3-4×), APOE-ε2 beschermt.', mechanisme:'Amyloïd cascade hypothese: APP → amyloïd-β aggregatie → seniele plaques → tau-tangle vorming → neuronaal verlies. Cholinerg deficit → geheugenklachten. Acetylcholinesteraseremmers (donepezil, rivastigmine): symptomatisch, geen ziektemodificatie.', onderscheid:'Vasculaire dementie: stapsgewijs beloop, cerebrovasculaire pathologie op MRI (lacunaire infarcten), executieve disfunctie. FTD: persoonlijkheids- en gedragsverandering, taalstoornis, frontale atrofie. Lewy-body: REM-slaapgedragsstoornis, parkinsonisme, DLB-triade.', therapie:'Acetylcholinesteraseremmers: donepezil, rivastigmine, galantamine. Memantine (NMDA-antagonist): bij matige/ernstige Alzheimer. Nieuwe middelen: lecanemab (anti-amyloïd mAb) vertraagt progressie (FDA 2023). Non-farmacologisch: dagstructuur, omgevingsaanpassing.' } },

  { type:'lab', d:3, domain:'psych', dl:'Psychiatrie',
    q:'Welk laboratoriumonderzoek is bij een nieuwe depressieve episode altijd geïndiceerd om een somatische oorzaak uit te sluiten?',
    a:['TSH (thyroïdstimulerend hormoon)','Cortisol ochtend','Prolactine','Lithiumspiegel'], c:0,
    ex:'TSH is standaard bij elke nieuwe depressie: hypothyreoïdie presenteert zich vaak met depressieve symptomen en is eenvoudig behandelbaar. Overige basis: bloedbeeld, elektrolyten, glucose, nierfunctie, leverenzymen. Cortisol bij verdenking Cushing/Addison, prolactine bij galactorroe.',
    wiki:{ kern:'Somatische screening bij psychiatrische presentaties: TSH (hypothyreoïdie/hyperthyreoïdie), bloedglucose (hypoglykemie → angst/delirium), Ca2+ (hypercalciëmie → psychose/depressie), vitamine B12/foliumzuur (deficiëntie → depressie/dementie), CRP/BSE (ontsteking), alcohol/drugsscreen.', mechanisme:'Hypothyreoïdie nabootsen: moeheid, gewichtstoename, depressie, cognitieve verlangzaming, koude-intolerantie. Hyperthyreoïdie: angst, agitatie, slapeloosheid. Beide kunnen psychiatrische diagnose nabootsen. TSH heeft de hoogste sensitiviteit.', onderscheid:'Bij psychose of delirium: ook bloedgas (CO2-retentie), ammonia (hepatische encefalopathie), MRI hersenen (structureel), LP (meningitis/encefalitis). Bij eerste psychose <25j: uitgebreide somatische screening verplicht.' } },


  // ── DERMATOLOGIE ──
  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Kind van 7 jaar, jeukende rode vlekken met blaasjes, eerst hoofd dan romp en extremiteiten, koorts 38°C. Gezinscontact vorige week ziek. Diagnose?',
    a:['Varicella (waterpokken)','Hand-mond-voetziekte','Mazelen','Roodvonk'], c:0,
    ex:'Varicella: centrifugale verspreiding (begint centraal, gaat naar perifeer), polymorf exantheem (macule → papel → vesikel → korst in verschillende stadia gelijktijdig). Overdracht: luchtweg + contact. Besmettelijk tot alle blaasjes gekorst zijn.',
    wiki:{ kern:'Varicella-zostervirus (VZV): primo-infectie = waterpokken. Reactivatie = gordelroos (herpes zoster). Incubatietijd 14-16 dagen. Complicaties: secundaire bacteriële huidinfectie (S. aureus, Strep), pneumonie (volwassenen), encefalitis, neonatale varicella (gevaarlijk).', mechanisme:'Polymorf exantheem = kenmerk: lesies in verschillende stadia (macule, papel, vesikel, korst) simultaan aanwezig op dezelfde huidplek. Mucosale lesies ook (mondholte). Antiviraal (aciclovir) bij risicogroepen (immuungecompromitteerd, volwassenen, zwangeren).', onderscheid:'Hand-mond-voetziekte (Coxsackievirus): blaasjes handpalmen + voetzolen + mond, mildere koorts. Mazelen: hoog koorts, Koplik-vlekken, morbiliforme rash (niet blaasjes). Roodvonk: streptokokkentoxine, fijn puntjes exantheem, "strawberry tongue".', therapie:'Gezond kind: symptomatisch (antihistaminica, paracetamol). Vermijd aspirine (Reye-syndroom). Aciclovir: immuungesupprimeerden, zwangeren, neonaten, volwassenen (minder effect bij immunocompetent kind als <24u gestart). Vaccinatie: levend verzwakt vaccin.' } },

  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Man van 55 jaar, jarenlang zilverschilferige plaques op knieën, ellebogen en scalp, duidelijk begrensd. Nagelafwijkingen (pitting). Diagnose?',
    a:['Psoriasis vulgaris','Seborroïsche dermatitis','Lichen planus','Nummulair eczeem'], c:0,
    ex:'Psoriasis vulgaris: scherp begrensde erythemateuze plaques met zilverwitte schilfering, voorkeur extensorzijden + scalp + nagelbed. Nagelafwijkingen (pitting, onycholyse) bij 50% van patiënten. Auspitz-teken: pinpointbloedingen bij verwijdering van de schilfers.',
    wiki:{ kern:'Psoriasis: T-cel-gemedieerde auto-immuun ziekte, genetische component (HLA-Cw6). Prevalentie 2-3%. Complicaties: psoriasisartritis (20-30%), cardiometabool verhoogd risico. Psoriasiform exantheem als bijwerking bètalokkers/lithium.', mechanisme:'Keratinocytproliferatie versneld (turnover 3-4 dagen vs. 28 normaal) door IL-17, IL-23, TNF-α ontsteking. Behandeling: licht (UVB-fototherapie), matig (methotrexaat, ciclosporine, acitretine), ernstig/refractair: biologicals (TNF-α: adalimumab; IL-17: secukinumab; IL-23: guselkumab).', onderscheid:'Seborroïsche dermatitis: ook scalp maar vette gele schilfering, minder scherp begrensd, niet op extensoren. Eczeem: polymorf, jeuk op voorgrond, vlexorzijden. Lichen planus: paarse, polygonale papels, Wickham-striae, voorkeur polsen.', therapie:'Lokaal: corticosteroïden + vitamine D-analogen (calcipotriol). Scalp: teerpreparaten of seroïden. Matig: UVB-fototherapie. Ernstig: MTX, ciclosporine, acitretine. Biologicals: bij matige/ernstige onvoldoende respons op conventioneel. JAK-remmers: deucravacitinib (oraal).' } },

  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Kind van 4 jaar, jeukend eczeem in knieholten en elleboogplooien, droge huid, seizoensgebonden verergering. Moeder heeft hooikoorts. Diagnose?',
    a:['Atopische dermatitis','Contactallergisch eczeem','Psoriasis inversus','Seborroïsche dermatitis'], c:0,
    ex:'Atopische dermatitis (constitutioneel eczeem): begint vaak in de eerste levensjaren, flexorlocalisatie (knieholten, elleboogplooien, nek), jeuk op de voorgrond, droge huid. Familiaire atopie (eczeem + astma + allergische rhinitis = atopische triade).',
    wiki:{ kern:'Atopische dermatitis: filaggrine-mutaties → defect in de huidbarrière → toegenomen transepidermaal waterverlies → droge huid + allergene penetratie. IgE-gemedieerde allergische reactie. Pruritus-krabcyclus verergert laesies.', mechanisme:'Th2-cytokinen (IL-4, IL-13) dominant in actieve atopische dermatitis → IgE-overproductie. Dupilumab (IL-4Rα-antagonist): biologische therapie voor matige/ernstige atopische dermatitis. Prurigo nodularis: chronisch krabben → gehyperpigmenteerde noduli.', onderscheid:'Contactallergisch eczeem: exact patroon (belts, horloge), patch test positief. Psoriasis inversus: in lichaamsplooien, niet jeukend, scherp begrensd. Scabiës: ook erg jeukend maar interdigitaal, polsen, nacht-jeuk, groepsuitbraken.', therapie:'Licht: emollliënten (intensief) + topicale corticosteroïden. Matig: tacrolimus/pimecrolimus (calcineurine-remmers). Ernstig: cyclosporine, dupilumab (IL-4/13-blokker), tralokinumab. UVB-fototherapie. Infectieprofylaxe (stafylokok).' } },

  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Vrouw van 65 jaar, asymmetrisch gepigmenteerde laesie op de rug, onregelmatige randen, meerdere kleuren (bruin, zwart, rood). Groeit de afgelopen maanden. Diagnose uitsluiten?',
    a:['Melanoom','Seborroïsche keratose','Blauwe naevus','Dermatofibroom'], c:0,
    ex:'ABCDE-criteria voor melanoom: Asymmetrie, Begrenzingsonregelmatigheid, Colour (meerdere kleuren), Diameter >6 mm, Evolutie (verandering). Bij verdenking: excisiebiopsie met minimale vrije marge. Nooit shave-biopsie (Breslow-dikte onmeetbaar).',
    wiki:{ kern:'Melanoom: agressief huidcarcinoom van melanocyten. Incidentie stijgend wereldwijd. Belangrijkste risicofactoren: UV-blootstelling (vooral zonnebranden in jeugd), bleke huid, familiegeschiedenis, >50 nevi, immunosuppressie.', mechanisme:'BRAF-V600E-mutatie (50% van melanomen): targeted therapie met BRAF-remmers (vemurafenib) + MEK-remmers. Immunotherapie (anti-PD-1: nivolumab, pembrolizumab; anti-CTLA-4: ipilimumab): heeft overleving bij gemetastaseerd melanoom revolutionair verbeterd.', onderscheid:'Seborroïsche keratose: ouder, "vastgeplakt" uiterlijk, stuck-on, matte oppervlak, geen melanocyten. Blauwe naevus: uniform blauwgrijs, benigne. Spitz-naevus: kinderen, rood, benigne maar moeilijk te onderscheiden. Basaalcelcarcinoom: parelranden, teleangiëctasieën.', therapie:'Primair: excisie met vrije marge (0.5-2 cm afhankelijk van Breslow-dikte). Schildwachtklierbiopsie bij dikte ≥0.8 mm. Stadium III/IV: immunotherapie ± BRAF-remmers. Adjuvant nivolumab/pembrolizumab bij hoog-risico resected melanoom.' } },

  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Vrouw van 30 jaar, ernstige acné op gelaat en borst, niet reagerend op topicale behandeling en antibiotica. Ze wil graag zwanger worden. Welke behandeling is nu NIET geïndiceerd?',
    a:['Isotretinoïne (Roaccutane)','Azelaïnezuur topisch','Clindamycine topisch','Doxycycline oraal'], c:0,
    ex:'Isotretinoïne is sterk teratogeen (misvorming schedel, hart, CNS). Absoluut gecontra-indiceerd bij zwangerschap en zwangerschapswens zonder strenge anticonceptieprotocol (iPLEDGE/Pregnancy Prevention Programme). Azelaïnezuur en topische antibiotica zijn veilig in de zwangerschap.',
    wiki:{ kern:'Isotretinoïne (13-cis-retinoïnezuur): meest effectieve behandeling voor ernstige acné (nodulocystisch, therapieresistent). Werkt op alle vier acné-pathomechanismen: talgklierhypertrofie, comedonen, P. acnes, ontsteking. Kuur 4-6 maanden, remissie >80%.', mechanisme:'Bijwerkingen isotretinoïne: droge lippen/huid/mucosae (vrijwel iedereen), hypertriglyceridemie, leverfunctiestoornissen, pseudo-tumor cerebri (+ tetracycline → contragedacht). Suïcidaliteit: FDA black box maar causale relatie niet bewezen.', onderscheid:'Doxycycline oraal: matig-ernstige acné, 3 maanden maximaal (resistentie). Hormonale anticonceptiva (cyproteronacetaat/ethinylestradiol): anti-androgeen, effectief bij vrouwen. Benzoylperoxide: bactericid, resistentievrij.', therapie:'Mild: topische retinoids + benzoylperoxide. Matig: toevoegen topisch of oraal antibioticum (max 3 maanden). Ernstig/refractair: isotretinoïne (met anticonceptie). Hormonale therapie bij vrouwen met anti-androgeen acné.' } },


  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Man van 72 jaar, sinistere huidlaesie op de onderlip, verheven ulcererende rand, langzaam groeiend over maanden. Roker, veel buiten gewerkt. Meest waarschijnlijke diagnose?',
    a:['Plaveiselcelcarcinoom (SCC)','Basaalcelcarcinoom','Melanoom','Keratoacanthoom'], c:0,
    ex:'SCC: op lips/oren/handen/genitalia bij ouderen met zonschade of roken. Ulcererende laesie met verheven rand. Metastaseringsrisico 2-5% (hoger op lip/oor). Basaalcelcarcinoom (BCC) is het frequentste huidcarcinoom maar metastaseert zelden en zit vaker op neus/wangen.',
    wiki:{ kern:'Niet-melanoom huidcarcinomen: BCC (75%) en SCC (20%). BCC: nooit-metastaseert bijna nooit, maar lokaal destructief. SCC: metastaserend risico afhankelijk van locatie en diepte. Risicofactoren: UV, roken, immunosuppressie, HPV (genitale SCC), chronische wonden.', mechanisme:'BCC-kenmerken: parelranden, teleangiëctasieën, ulceratie centrum ("rodent ulcer"), voorkeur neus/wangen/oogleden. SCC-kenmerken: keratotisch ulcus, ondermijnde rand, zonschade-achtergrond (actinitsche keratose als voorstadium).', onderscheid:'Keratoacanthoom: snel groeiend (weken), crateervormig met hoornprop, kan spontaan regresseren maar histologisch van SCC moeilijk te onderscheiden → excisie. Melanoom: gepigmenteerd, ABCDE-criteria. Merkelcelcarcinoom: zeldzaam, agressief neuro-endocrien.', therapie:'SCC: excisie met vrije marge (>5 mm). Mohs-chirurgie bij SCC hoofd-hals (weefselbesparend). Actinische keratosen (voorstadium): topicaal 5-FU, imiquimod, cryotherapie. Immuuntherapie (cemiplimab) bij gemetastaseerd SCC.' } },

  { type:'diagnose', d:3, domain:'derm', dl:'Dermatologie',
    q:'Man van 35 jaar, vesiculeuze laesies langs de flank links, pijn die al 3 dagen bestond vóór de huiduitslag, branderig gevoel. Recent stress. Diagnose?',
    a:['Herpes zoster (gordelroos)','Herpes simplex','Varicella (primo-infectie)','Contactallergisch eczeem'], c:0,
    ex:'Herpes zoster: reactivatie van latent VZV in het dorsale ganglion → dermatomale uitbreiding. Prodromale pijn 2-3 dagen vóór de uitslag is kenmerkend. Unilateraal, nooit middellijnoverschrijdend. Postherpetische neuralgie: pijn weken-maanden na genezing (ouderen).',
    wiki:{ kern:'Gordelroos treedt op bij reactivatie van VZV door verminderde cellulaire immuniteit (ouderdom, stress, immuunsuppressie, HIV). Zoster ophthalmicus (V1-tak n. trigeminus): oogbetrokkenheid → spoed ophtalmologie consult. Zoster oticus (Ramsay-Hunt): vestibulochochlaire zenuw.', mechanisme:'Postherpetische neuralgie (PHN): brandende pijn ≥3 maanden na huidgenezing. Risicofactor: leeftijd >60j, ernstige pijn prodromaal, immuunsuppressie. Behandeling PHN: gabapentine/pregabaline, TCA (amitriptyline), capsaïcine patch, opioïden.', onderscheid:'Herpes simplex: labialis of genitalis, kleinere vesikels, recidief op dezelfde plek, niet dermatomaal. Varicella primo-infectie: verspreide blaasjes over heel lichaam, niet dermatomaal, kinderen. Contact eczeem: ook unilateraal maar jeuk dominant, geen prodromale pijn.', therapie:'Aciclovir 800 mg 5×/dag 7 dagen (of valaciclovir 1000 mg 3×/dag). Start binnen 72u na uitslag (of eerder). Pijnstilling: NSAID + paracetamol, sterker opioïden. VZV-vaccin (levend verzwakt): Zostavax; dood vaccin: Shingrix (2 doses, effectiever, ook bij immunosuppressie).' } },

  { type:'truefalse', d:2, domain:'derm', dl:'Dermatologie — Waar of Niet?',
    q:'Basaalcelcarcinoom is het meest voorkomende huidcarcinoom en heeft een hoog risico op metastasen.',
    c:false,
    ex:'Gedeeltelijk NIET WAAR. BCC is inderdaad het meest voorkomende huidcarcinoom (75% van alle huidcarcinomen), maar het metastaseert uiterst zelden (<0.1%). BCC is lokaal destructief (kan bot en zenuwweefsel beschadigen) maar de prognose is uitstekend bij tijdige behandeling.',
    wiki:{ kern:'Huidcarcinoomfrequentie: BCC > SCC > melanoom. BCC: nodul-ulceratief (meest frequent), oppervlakkig type, pigmented BCC, morfeeform (infiltratief, recidiefrisico hoog). Behandeling: excisie, Mohs bij risicovol, imiquimod/5-FU bij oppervlakkig. Hedgehog-pathway remmers (vismodegib) bij lokaal gevorderd/gemetastaseerd BCC.', mechanisme:'PTCH1-mutatie (Sonic Hedgehog pathway) → ungeremde proliferatie van basaalcellen. UV-straling is de voornaamste mutagene factor. Gorlin-syndroom: erfelijke PTCH1-mutatie → multipele BCC\'s + andere tumoren + skeletskeletal anomalieën.', onderscheid:'Morfeeform BCC (fibrosing BCC): vlakke, harde, slechte begrenzing → hogere kans op onvolledige excisie. Nodulair BCC (meest frequent): paarlmoer kleur, teleangiëctasieën. Mohs-chirurgie geeft laagste recidiefkans bij hoog-risico BCC.' } },

  { type:'truefalse', d:2, domain:'derm', dl:'Dermatologie — Waar of Niet?',
    q:'Een positieve VDRL/RPR-test is bewijzend voor actieve syfilis.',
    c:false,
    ex:'NIET WAAR. VDRL/RPR zijn niet-treptonemale tests met lage specificiteit: vals-positief bij zwangerschap, auto-immuunziekten (SLE), virale infecties, drugsgebruik. Altijd bevestigen met een treptonemale test (TPHA, FTA-ABS). Titer correleert met ziekteactiviteit (behandelrespons).',
    wiki:{ kern:'Syfilis diagnostiek: (1) Screeningstest: VDRL of RPR (niet-treptonemaal, wordt negatief na behandeling). (2) Bevestigingstest: TPHA of FTA-ABS (treptonemaal, blijft levenslang positief). Combinatie nodig voor diagnose. In Nederland: Treponema pallidum-PCR op laesies in primair stadium.', mechanisme:'Syfilis stadia: primair (ulcus durum, pijnloos), secundair (roos op handpalmen/voetzolen, condylomata lata, gegeneraliseerde lymfadenopathie), latent (geen symptomen), tertiair (gumma, cardiovasculaire syfilis, neurosyfilis). Transmissie seksueel + moeder-kind.', onderscheid:'Chancroid (Haemophilus ducreyi): pijnlijk ulcus. LGV (Lymphogranuloma venereum): inguinale klieren. Herpes genitalis: pijnlijke vesikels. Syfilis: pijnloos ulcus, harde rand.', therapie:'Primair/secundair/latent <1j: benzylpenicilline 2.4M E IM eenmalig. Tertiair/neurosyfilis/langer dan 1j latent: benzylpenicilline IV 10-14 dagen. Penicillineallergie: doxycycline (niet neurosyfilis). Congenitale syfilis: penicilline neonataal.' } },

  { type:'truefalse', d:2, domain:'derm', dl:'Dermatologie — Waar of Niet?',
    q:'Scabiës wordt veroorzaakt door een schimmel en is behandelbaar met een topisch antischimmelcrème.',
    c:false,
    ex:'NIET WAAR. Scabiës wordt veroorzaakt door de mijt Sarcoptes scabiei (een arachnoïde), niet door een schimmel. Behandeling: permetrine 5% crème (gehele lichaam, 1 nacht, herhalen na 1 week) of ivermectine oraal. Schimmelcrème heeft geen effect.',
    wiki:{ kern:'Scabiës: intense nachtelijke jeuk door hypersensitiviteit voor de mijt en haar uitwerpselen. Voorkeurslokalisaties: interdigitale ruimten, polsen, ellebogen, tepelareola, geslachtsorganen. Gangen (tunnels) van de mijt zijn pathognomonisch.', mechanisme:'Sarcoptes scabiei graafd gangen in de oppervlakkige huid om eitjes te leggen. Overdracht door direct langdurig huidcontact. Alle huisgenoten en nauwe contacten behandelen gelijktijdig. Beddengoed wassen op 60°C. Noors (gekortst) scabiës: bij immuungecompromitteerden, extreem besmettelijk.', onderscheid:'Eczeem: ook jeuk maar geen gangen, niet interdigitaal specifiek. Urticaria: vluchtige wheals. Tinea pedis (atleet\'s voet): schimmel, interdigitaal maar wit maceratie, niet jeuk \'s nachts.', therapie:'Permetrine 5% crème: eerste keus (hoofd t/m voeten, 8-12u, herhaal week later). Ivermectine 200 μg/kg oraal: alternatief of bij noors scabiës. Antihistaminica voor jeuk (persisteert weken na behandeling door hypersensitiviteitsreactie). Omgeving ontsmetten.' } },

  { type:'diagnose', d:5, domain:'derm', dl:'Dermatologie', subtype:'diff',
    q:'Welk kenmerk onderscheidt urticaria (netelroos) van angio-oedeem bij een allergische reactie?',
    a:['Urticaria: oppervlakkige jeukende wheals in de dermis; angio-oedeem: diepe zwelling in de subcutis zonder jeuk','Urticaria geeft altijd benauwdheid, angio-oedeem nooit','Urticaria is IgE-gemedieerd, angio-oedeem is altijd C1q-remmertekort','Angio-oedeem geeft rode laesies, urticaria geeft bleke laesies'], c:0,
    ex:'Urticaria: superficiële huidswelling (dermis), hevig jeukend, voorbijgaand (<24u per laesie). Angio-oedeem: dieper (subcutis, submucosa), niet of minder jeukend, maar pijnlijk, voorkeur lippen/ogen/tong/keel → levensbedreiging als larynx aangedaan.',
    wiki:{ kern:'Anafylaxie = systemische allergische reactie (urticaria + angio-oedeem + bronchospasme + hypotensie). Behandeling: adrenaline 0.3-0.5 mg IM (middelste dij) + liggend met benen omhoog + O2. Antihistaminica en corticosteroïden zijn secundair, niet als eerste keus bij shock.', mechanisme:'IgE-gemedieerde (type I) allergische reactie: allergeen → IgE op mestcellen → histamine-vrijstelling → vasodilatatie + toegenomen permeabiliteit. Hereditair angio-oedeem (HAE): C1-remmerdeficiëntie → bradykinine-overschot → geen histamine-effect → antihistaminica werken niet.', onderscheid:'HAE: geen jeuk, geen urticaria, recidiverend, familiegeschiednis, niet reagerend op antihistaminica. Behandeling HAE: icatibant (bradykinine B2-antagonist), C1-remmerconcentraat, lanadelumab (profylaxe). Chronische spontane urticaria: >6 weken, oorzaak onduidelijk, anti-H1 dagelijks + omalizumab.' } },


  // ── REUMATOLOGIE ──
  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Vrouw van 45 jaar, symmetrische pijn en zwelling van de MCP- en PIP-gewrichten, ochtendstijfheid >1 uur, vermoeidheid, RF en anti-CCP positief. Diagnose?',
    a:['Reumatoïde artritis','Artrose','Systemische lupus erythematosus','Reactieve artritis'], c:0,
    ex:'RA: symmetrische gewrichtsontsteking MCP/PIP/polsen, ochtendstijfheid >1u, RF en anti-CCP positief. DIP-gewrichten worden bij RA gespaard (in tegenstelling tot artrose). Anti-CCP is specifieker (95%) dan RF (70-80%) voor RA.',
    wiki:{ kern:'RA: auto-immuun synovitis door T- en B-cel-activatie → TNF-α/IL-6/IL-1 productie → synoviaal pannus → kraakbeenerosie → botdestructie. Prevalentie 1%, vrouwen 3×. Extraarticulaire manifestaties: rheumatoïde noduli, pleuritis, vasculitis, scleritis.', mechanisme:'Anti-CCP (anti-citrullineerde proteïne-antistoffen): pathologisch → aanwezig jaren vóór symptomen, voorspelt erosief beloop. RF: niet-specifiek (ook bij SjS, SLE, hepatitis C). Erosies op röntgen: marginal erosions bij de "bare area" van het gewricht.', onderscheid:'Artrose: niet-inflammatoir, DIP>PIP, ochtendstijfheid <30 min, geen RF/CCP, Heberden-knobbels. SLE: vlindervlekken, lichtgevoeligheid, ANA+, multipele orgaanbetrokkenheid. Reactieve artritis: na infectie (STD of darminfectie), asymmetrisch, HLA-B27+.', therapie:'Treat-to-target: remissie als doel. Methotrexaat (MTX): hoeksteen (wekelijks + foliumzuur). Stap 2: MTX + biologicals (anti-TNF: etanercept, adalimumab; IL-6-remmer: tocilizumab). JAK-remmers: baricitinib, tofacitinib. NSAIDs + corticosteroïden overbruggen.' } },

  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Man van 35 jaar, plotse, hevige pijn en roodheid van de grote teen (MTP-1 gewricht), nacht. Serum urinezuur 0.58 mmol/L, leukocytose. Diagnose?',
    a:['Jicht (gout)','Septische artritis','Pseudojicht (CPPD)','Reactieve artritis'], c:0,
    ex:'Jicht: kristalarthropathie door monosodium uraat-kristallen. Klassiek: plotse artritis MTP-1 (podagra) \'s nachts, rood, warm, heftig pijnlijk. Hyperurikemie is predisponerend maar de aanval zelf kan optreden bij normale urinezuurspiegels.',
    wiki:{ kern:'Jichtaanval: uraatkristallen → activatie NLRP3 inflammasome → IL-1β-productie → acute ontsteking. Risicofactoren: hyperurikemie (purine-rijke voeding, alcohol, diuretica, nierinsufficiëntie). Vroege aanvallen: MTP-1. Chronisch: tophi, jichtartropathie, urinezuurstenen.', mechanisme:'Diagnose jichtaanval: synoviaalvochtkristalanalyse (naaldscintiging, negatief birefringent onder polarisatielicht). Serum urinezuur kan normaal zijn tijdens aanval. Colchicine (vroeg starten), NSAID of corticosteroïd voor aanvalbehandeling.', onderscheid:'Septische artritis: ook monoartritis met rood/warm gewricht maar koorts + ziek + leuko hoog → direct aspiratie! Pseudojicht (CPPD): calcium pyrofosfaat kristallen, positief birefringent, ouder, knie/pols. Reactieve artritis: na infectie, HLA-B27, Reiter\'s triade (artritis+urethritis+conjunctivitis).', therapie:'Aanval: colchicine 0.5 mg 3×/dag of NSAID of pred 30 mg. Preventie recidief: allopurinol (XO-remmer) of febuxostat. Doelwaarde urinezuur <0.36 mmol/L. Leefstijl: minder purine (rood vlees, orgaanvlees), geen alcohol (bier+sterke drank), ruim drinken.' } },

  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Vrouw van 28 jaar, vlindervormig exantheem op wangen, fotosensitviteit, gewrichtspijn, proteïnurie, ANA positief (titer 1:640), anti-dsDNA positief. Diagnose?',
    a:['Systemische lupus erythematosus (SLE)','Reumatoïde artritis','Dermatomyositis','Sjögren-syndroom'], c:0,
    ex:'SLE: auto-immuunziekte met multipele orgaanbetrokkenheid. ACR/EULAR-criteria: vlindervlekken, lichtgevoeligheid, serositis, nierziekte, neurologisch, hematoloog, immunologisch (anti-dsDNA, anti-Sm, complementverlaag). ANA positief in >95% van SLE.',
    wiki:{ kern:'SLE: vnl. vrouwen in de vruchtbare leeftijd (9:1 vrouw:man), hoger bij Afrikaans-Amerikaanse en Aziatische bevolking. Antinucleaire antistoffen (ANA): zeer gevoelig (>95%) maar niet specifiek. Anti-dsDNA: specifiek voor SLE (>98%), correleert met ziekteactiviteit (ook lupus nefritis).', mechanisme:'Lupus nefritis: immuuncomplexdepositie in glomeruli → complementactivatie → ontsteking. Klasse III/IV: ernstigste vorm, behandeling: hydroxychloroquine + MMF (mycofenolzuur) of cyclofosfamide + steroïden. Biopsie voor classificatie.', onderscheid:'RA: gewrichten dominant, anti-CCP+, geen vlindervlekken. Dermatomyositis: huiduitslag + spierzwakte, heliotrope rash, CK verhoogd. SjS: droge ogen/mond, anti-SSA/SSB+, mildere systemische betrokkenheid.', therapie:'Hydroxychloroquine: basis voor alle SLE-patiënten (vermindert schubs, cardiovasculair beschermend). Schubs: corticosteroïden. Orgaanbedreigende ziekte: MMF, cyclofos­famide, belimumab (anti-BAFF). Zon-vermijding.' } },

  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Man van 30 jaar, rugpijn >3 maanden, verbetert bij bewegen en niet bij rust, ochtendstijfheid >1 uur, HLA-B27 positief. MRI sacroïliaca-gewrichten: oedeem. Diagnose?',
    a:['Axiale spondylartritis (ankyloserende spondylitis)','Lumbale hernia nuclei pulposi','Reumatoïde artritis','Fibromyalgie'], c:0,
    ex:'Axiale spondylartritis: inflammatoire rugpijn (beter bij beweging, niet bij rust), ochtendstijfheid >1u, onset <45j, HLA-B27+ (90%), sacroiliitis op MRI (oedeem = actieve ontsteking). Ankyloserende spondylitis is de radiografische variant (HNP geeft mechanische pijn, erger bij bewegen).',
    wiki:{ kern:'SpA-groep: axiale SpA (AS), perifere SpA, PsA (psoriasisartritis), reactieve artritis, artritis bij IBD. Kenmerkend: HLA-B27-associatie, enthesitis (bij aanhechting pees/ligament), asymmetrische perifere artritis, oogbetrokkenheid (uveïtis anterior).', mechanisme:'Enthesitis: ontsteking op osseo-tendineuze juncties (hielpezen, zit-been). IL-17 dominant in spondylartritis. IL-17-remmers (secukinumab, ixekizumab) effectief bij axiale SpA. Anti-TNF (etanercept, adalimumab) ook eerste biologische keus.', onderscheid:'HNP: mechanische pijn, erger bij bewegen en buigen, betert bij rust, uitstralende pijn dermatomaal. Fibromyalgie: diffuse pijn, geen inflammatoire markers, MRI normaal, normaal HLA. RA: symmetrisch perifeer, anti-CCP+, sacroilitis niet typisch.', therapie:'Stap 1: NSAID maximale dosis (diagnostisch en therapeutisch). Stap 2: biologic (anti-TNF of anti-IL-17). Geen DMARDs (MTX) bij puur axiale ziekte (niet bewezen effectief). Fysiotherapie: essentieel (houdingsverbetering).' } },

  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Man van 70 jaar, pijn en stijfheid in schouders en heupen, BSE 85 mm/u, CRP verhoogd. Geen spierkrachtverlies. Snelle respons op lage dosis prednisolon. Diagnose?',
    a:['Polymyalgia rheumatica (PMR)','Reumatoïde artritis','Fibromyalgie','Polymyositis'], c:0,
    ex:'PMR: ouder dan 50 jaar (gemiddeld 70), pijn en stijfheid schouders/heupen bilateraal, hoge BSE/CRP, geen spierzwakte (onderscheid van polymyositis), dramatische respons op lage dosis prednisolon (15-20 mg). Geassocieerd met temporalis-arteriitis (GCA).',
    wiki:{ kern:'PMR is geassocieerd met GCA (reuscelarteriitis) bij 10-15% van de patiënten. Altijd temporalis-arteriitis uitsluiten: hoofdpijn, kaakclaudicatie, gezichtsveranderingen, blindheid (AION). BSE >50 mm/u en CRP >10 mg/L zijn typisch voor PMR/GCA.', mechanisme:'PMR-pathologie: synovitis van schouderbursae en tenosynovitis van de heuppeesstructuren. PET-CT: toegenomen opname in bursae en tenosynoviaal weefsel bij PMR. IL-6 verhoogd (tocilizumab effectief bij GCA).', onderscheid:'Polymyositis: proximale spierzwakte (op trap lopen, armen omhoogbrengen), verhoogd CK, myopathische EMG. RA: distale gewrichten, RF/CCP positief. Fibromyalgie: normale laboratoriumwaarden. Hypothyreoïdie: ook stijfheid maar normaal BSE, verhoogd TSH.', therapie:'Prednisolon 15-20 mg/dag → snelle symptoomverlichting (diagnostisch). Afbouwen over 1-2 jaar. GCA: prednisolon 60 mg. Recidief bij afbouwen: terug naar vorige dosis. Methotrexaat als steroïdsparend bij recidief. Tocilizumab: bij GCA (IL-6 remmer).' } },


  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Vrouw van 50 jaar, droge ogen en mond al jaren, pijnlijke gewrichten, anti-SSA (Ro) en anti-SSB (La) antistoffen positief. Diagnose?',
    a:['Primair Sjögren-syndroom','SLE','Reumatoïde artritis','Sarcoidose'], c:0,
    ex:'Primair Sjögren: droge ogen (xeroftalmie, Schirmer-test <5 mm/5 min) + droge mond (xerostomie) + anti-SSA/SSB positief. Secundair Sjögren: geassocieerd met RA of SLE. Complicaties: lymfoom (B-cel, 5× verhoogd risico), interstitiële longziekte, perifere neuropathie.',
    wiki:{ kern:'Sjögren: auto-immuun exocrine klierontsteking → droge ogen, mond, huid, vaginale mucosa. ANA positief (>90%), anti-SSA/SSB (specifiek). Sterk vrouwen dominant (9:1). Diagnose: biopsie lip (lymfocytaire infiltraten in speekselkliertjes = fokale lymfocytaire sialadenitis score ≥1).', mechanisme:'Lymfoomrisico: parotiszwelling, lage C4, cryoglobulinemia, huid vasculitis verhogen risico. Monitoring: jaarlijks parotiszwelling, lymfadenopathie. B-cel lymfomen, met name MALT-type.', onderscheid:'SLE: multipele orgaanbetrokkenheid, anti-dsDNA+, vlindervlekken. RA: erosieve artritis, anti-CCP+, maar SjS-overlap frequent. Sarcoidose: ook droge ogen/mond maar ACE verhoogd, bilaterale hilaire lymfadenopathie.', therapie:'Ogen: kunsttranen, cyclosporine oogdruppels, punctaocclusie. Mond: stimulatie speekselvloed (kauwgom, pilocarpine), goede mondverzorging (cariesprofylaxe). Systemisch: hydroxychloroquine, NSAID. Ernstige orgaanziekte: steroïden, rituximab.' } },

  { type:'diagnose', d:3, domain:'rheum', dl:'Reumatologie',
    q:'Man van 25 jaar, artritis knie, urethrale afscheiding 2 weken eerder, conjunctivitis, huidlaesies op handpalmen en voetzolen. HLA-B27 positief. Diagnose?',
    a:['Reactieve artritis (Reiter-syndroom)','Septische artritis','Jicht','Reumatoïde artritis'], c:0,
    ex:'Reactieve artritis (Reiter-syndroom): artritis + urethritis + conjunctivitis na seksuele infectie (Chlamydia) of gastro-intestinale infectie (Salmonella, Yersinia). HLA-B27 sterk geassocieerd. Keratoderma blennorrhagicum = huidlaesies op handpalmen/voetzolen.',
    wiki:{ kern:'Reactieve artritis: perifere asymmetrische oligo-artritis na infectie 1-4 weken eerder. Infectie zelf al voorbij. Chlamydia trachomatis (seksueel) of Campylobacter/Salmonella/Yersinia/Shigella (enteral). Behandel de trigger-infectie (doxycycline voor Chlamydia).', mechanisme:'HLA-B27: risico-allel voor SpA-groep. Moleculaire mimicry of foutieve antigeen­presentatie door HLA-B27 als pathomechanisme. Artritis is auto-immuun, geen directe infectie van het gewricht.', onderscheid:'Septische artritis: altijd bacterieel, direct gewrichtsinfectie, koorts + leuko hoog. Jicht: MTP-1, nacht, serum urinezuur hoog. Gonokokkenartritis: STD, septisch, gramkleuring gewrichtsaspiraat.', therapie:'NSAID voor artritis (symptomatisch). Antibiotica als nog actieve infectie. Meeste episodes zelflimiterend (3-6 maanden). HLA-B27+: 20-30% kans op chronisch beloop of axiale SpA. Sulfasalazine bij chronisch recidiverende gevallen.' } },

  { type:'truefalse', d:2, domain:'rheum', dl:'Reumatologie — Waar of Niet?',
    q:'Methotrexaat bij reumatoïde artritis moet altijd worden gecombineerd met foliumzuur-suppletie.',
    c:true,
    ex:'WAAR. Methotrexaat remt dihydrofolaatreductase → foliumzuurdeficiëntie als bijwerking (stomatitis, misselijkheid, hepatotoxiciteit, macrocytose). Foliumzuur 5 mg 1×/week (dag na MTX) of dagelijks 1 mg vermindert bijwerkingen significant zonder de werkzaamheid te verminderen.',
    wiki:{ kern:'MTX mechanisme bij RA: polyglutaminaten remmen ATIC (AICAR-transformylase) → adenosine-accumulatie → anti-inflammatoir effect. Tevens foliumzuurantagonist → bijwerkingen. Controle: maandelijks ALAT, creatinine, bloedbeeld in eerste 6 maanden.', mechanisme:'Absolute contra-indicaties MTX: zwangerschap (teratogeen, abortief), nierinsufficiëntie eGFR <30, leverziekte (levercirrose), alcoholisme, uitgebreide longziekte. Relatieve contra-indicaties: COPD, obesitas, diabetes.', onderscheid:'Leflunomide: ook DMARD, foliumzuurantagonist maar via een ander enzym (DHODH). Sulfasalazine: minder bijwerkingen, minder effectief dan MTX. Hydroxychloroquine: mildste DMARD, geen levermonitoring nodig, veilig in zwangerschap.' } },

  { type:'truefalse', d:2, domain:'rheum', dl:'Reumatologie — Waar of Niet?',
    q:'Bij verdenking op septische artritis moet eerst röntgenfoto van het gewricht worden gemaakt voordat een gewrichtspunctie plaatsvindt.',
    c:false,
    ex:'NIET WAAR. Bij verdenking septische artritis is directe gewrichtspunctie (arthrocentesis) de prioriteit: voor diagnose (gramkleuring en kweek) én therapeutisch (drukvermindering). Röntgenfoto toont geen septische artritis in vroeg stadium en mag de punctie niet vertragen.',
    wiki:{ kern:'Septische artritis: medische noodsituatie. Bacteriën vernietigen kraakbeen binnen 24-48u door bacteriële enzymen en inflammatoire respons. Snelle diagnose + drainage + IV antibiotica is essentieel. Mortaliteit: 5-15%.', mechanisme:'Meest frequente verwekkers: S. aureus (50%), streptokokken, gonokokken (jongere seksueel actieve patiënten). Hematogeen (vanuit bloedstroom) of direct inoculatie (na punctie, chirurgie). Laboratorium gewrichtsvocht: leuko\'s >50.000/μL, PMN >90%, glucose laag.', onderscheid:'Jicht: kristalarthropathie, ook rood/heet maar geen bacteriën in gewrichtsvocht. Reactieve artritis: steriel gewrichtsvocht, trigger-infectie elders. Hemartros: bloed in gewricht na trauma.', therapie:'IV antibiotica (S. aureus: flucloxacilline; MRSA: vancomycine). Drainage: herhaalde aspiraties of chirurgische arthrotomie bij heup/schouder. Duur AB: 4-6 weken. Fysiotherapie na infectie behandeld.' } },

  { type:'truefalse', d:2, domain:'rheum', dl:'Reumatologie — Waar of Niet?',
    q:'Artrose (osteoartritis) is een zuiver degeneratieve slijtageziekte zonder inflammatoire component.',
    c:false,
    ex:'NIET WAAR. Artrose heeft wel degelijk een inflammatoire component: synoviitis, activering van kraakbeencellen (chondrocyten) en subchondraal bot treedt op. De ziekte is echter niet auto-immuun van aard zoals RA. "Low-grade" inflammatie speelt een belangrijke rol in progressie.',
    wiki:{ kern:'Artrose: meest voorkomende gewrichtsaandoening. Prevalentie stijgt sterk met leeftijd. Kenmerken: kraakbeendegeneratie + subchondraal botverdikking (sclerose) + osteofyten + synoviitis (low-grade). Risicofactoren: overgewicht, trauma, hypermobiliteit, leeftijd.', mechanisme:'Kraakbeen heeft geen bloedvaten → beperkt herstelcapaciteit. Chondrocyten produceren MMPs (matrixmetalloproteasen) → extracellulaire matrixafbraak. Subchondrale botsclerose: verhoogde stijfheid → shockabsorptie verminderd → verdere kraakbeenbelasting.', onderscheid:'RA: symmetrisch, MCP/PIP, inflammatoire markers hoog, RF/CCP positief. Artrose: asymmetrisch, gewichtsdragende gewrichten (knie, heup, DIP-Heberden), BSE/CRP normaal of licht verhoogd. Jicht: acute aanvallen, uraatkristallen. Pseudojicht: CPPD-kristallen, knie.', therapie:'Conservatief: gewichtsreductie, fysiotherapie, analgesi­ca (paracetamol, NSAIDs). Intra-articulaire corticosteroïdinjecties bij matig/ernstig. Gewrichtsvervanging (prothese) bij eindstadium (knie- en heupprothese effectief). Geen DMARDs effectief.' } },

  { type:'diagnose', d:5, domain:'rheum', dl:'Reumatologie', subtype:'diff',
    q:'Welk laboratoriumkenmerk onderscheidt polymyositis van polymyalgia rheumatica (PMR)?',
    a:['Verhoogd creatinekinase (CK) bij polymyositis, normaal bij PMR','Verhoogd BSE bij polymyositis, normaal bij PMR','Positieve ANA bij polymyositis, negatief bij PMR','Anti-CCP positief bij polymyositis'], c:0,
    ex:'CK is het sleutelcriterium: polymyositis = auto-immuun spierontsteking → hoog CK (soms >10× ULN). PMR = synovitis/tenosynovitis zonder myositis → CK normaal. Beide hebben hoog BSE/CRP, maar spierzwakte én hoog CK = polymyositis.',
    wiki:{ kern:'Inflammatoire myopathieën: polymyositis (PM), dermatomyositis (DM), necrotiserende myopathie, anti-synthetase syndroom. PM: proximale spierzwakte (op trap, armen omhoogbrengen), normaal CK. DM: spierzwakte + huidafwijkingen (heliotrope rash, Gottron-papels).', mechanisme:'Myositis-specifieke antistoffen: anti-Jo-1 (anti-synthetase syndroom, associatie met interstitiële longziekte), anti-Mi-2 (DM, gunstige prognose), anti-MDA5 (DM zonder myositis, snel progressieve ILD), anti-SRP (necrotiserende myopathie).', onderscheid:'PMR: geen spierzwakte (alleen stijfheid en pijn), normaal CK, ouder dan 50j, snelle respons op 15-20 mg prednisolon. Hypothyreoïdie: ook spierzwakte en CK verhoogd maar TSH hoog. Statine-geïnduceerde myopathie: CK hoog, statineanamnese.', therapie:'PM/DM: prednisolon 1 mg/kg/dag → afbouwen + MTX of azathioprine als steroïdsparend. IVIg bij ernstige of therapieresistente ziekte. Rituximab bij anti-Jo-1 of anti-MDA5. Maligniteitsscreening (DM-associatie met kanker).' } },


  // ── REPRODUCTIEVE GENEESKUNDE ──
  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Vrouw van 27 jaar, 8 weken amenorroe, positieve zwangerschapstest, plotse hevige buikpijn rechts en vaginaal bloedverlies. Hemodynamisch instabiel. Diagnose?',
    a:['Ruptuur ectopische graviditeit','Miskraam (abortus incompletus)','Appendicitis','Ruptuur ovariumcyste'], c:0,
    ex:'Ruptuur ectopische graviditeit: positieve zwangerschapstest + hevige buikpijn + hemodynamisch instabiliteit = chirurgische spoedindicatie. Meest frequente locatie: tuba uterina. Risicofactoren: doorgemaakte PID, eerdere EG, tubachirurgie, IUD.',
    wiki:{ kern:'Ectopische graviditeit: implantatie buiten de uteriene holte (97%: tuba). Incidentie 1-2% van alle zwangerschappen. Kan ongeruptureerd (behandelen: methotrexaat of chirurgie) of geruptureerd (altijd chirurgie) zijn. Bèta-hCG en transvaginale echo zijn diagnostisch.', mechanisme:'hCG-patroon: normaal verdubbelt elke 48u in vroege intrauteriene zwangerschap. Suboptimale stijging (< ×1.66/48u) of plateau: verdenking EG of miskraam. Transvaginale echo: intra-uteriene zwangerschapszak verwacht bij bèta-hCG >1500-2000 IE/L.', onderscheid:'Miskraam: ook bloedverlies + krampen maar hemodynamisch stabiel, geen peritoneale prikkeling. Appendicitis: koorts, geen zwangerschapstest positief (of wél zwanger → dubbele diagnose). Ovariumcyste: hemato+- geen zwangerschapstest positief.', therapie:'Geruptureerd/instabiel: spoed laparoscopie of laparotomie + salpingectomie. Ongeruptureerd + stabiel: methotrexaat IM (succesrate >80% bij hCG <5000 IE/L + geen foetale hartactie). Follow-up bèta-hCG tot negatief.' } },

  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Vrouw van 32 jaar, 30 weken zwanger, bloeddruk 162/105 mmHg, proteïnurie 2+ op dipstick, hoofdpijn, visuele stoornissen. Diagnose?',
    a:['Pre-eclampsie','Chronische hypertensie','Zwangerschapshypertensie','HELLP-syndroom'], c:0,
    ex:'Pre-eclampsie: zwangerschapshypertensie (BD ≥140/90 na 20 weken) + proteïnurie (≥300 mg/24u of ≥2+ dipstick) + symptomen (hoofdpijn, visusklachten, epigastrische pijn). Ernstige pre-eclampsie bij BD ≥160/110 of orgaandysfunctie.',
    wiki:{ kern:'Pre-eclampsie: gestoorde placentatie → trofoblastinvasie inadequaat → endotheel­disfunctie → vasospasme → hypertensie + orgaandisfunctie. Risicofactoren: nullipariteit, vroegere pre-eclampsie, DM, chronische hypertensie, nierfalen, meerlingzwangerschap.', mechanisme:'HELLP-syndroom (ernstige complicatie pre-eclampsie): Hemolysis + Elevated Liver enzymes + Low Platelets. Behandeling pre-eclampsie: antihypertensiva (labetalol, nifedipine, hydralazine), magnesiumsulfaat (eclampsieprofylaxe), bevalling = enige genezing.', onderscheid:'Chronische hypertensie: al vóór 20 weken of langer dan 12 weken postpartum. Zwangerschapshypertensie: BD hoog na 20 weken maar geen proteïnurie. HELLP: trombocytopenie + leverenzymen hoog + hemolyse, kan optreden zonder ernstige hypertensie.', therapie:'Ernstige pre-eclampsie: magnesiumsulfaat IV (voorkomt convulsies), labetalol IV voor acute BD-verlaging. Bevalling <34 weken: wegen risico vroeggeboort vs. morbiditeit. Bevalling >37 weken: actief inleiden. Magnesium 24u postpartum continueren.' } },

  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Vrouw van 24 jaar, toenemende dysmenorroe (menstruatiepijn die buiten de menstruatie aanhoudt), dyspareunie, onvruchtbaarheid. Laparoscopie: blauwzwarte laesies op het peritoneum. Diagnose?',
    a:['Endometriose','Primaire dysmenorroe','PID (pelvic inflammatory disease)','Myoma uteri'], c:0,
    ex:'Endometriose: baarmoederslijmvlies (endometrium) buiten de uterus → chronische ontsteking, verklevingen, chocoladecysten (endometriomen) in de ovaria. Klassiek: progressieve dysmenorroe + dyspareunie + infertiliteit. Laparoscopie is de gouden standaard voor diagnose.',
    wiki:{ kern:'Endometriose treft 10% van vrouwen in de vruchtbare leeftijd, 30-50% van vrouwen met infertiliteit. Retrograde menstruatie (Sampson-theorie) als pathomechanisme. Endometriomen: "chocoladecysten" in ovarium, bruin-zwart vocht. CA-125: verhoogd maar aspecifiek.', mechanisme:'Lokale oestrogeenproductie in ectopisch weefsel → ontsteking → verklevingen → tubaokklusie → verminderde eierstokfunctie → infertiliteit. Symptomen hangen samen met menstruatiecyclus (cyclische verergering). Adenomyose: endometrium in myometrium.', onderscheid:'Primaire dysmenorroe: prostaglandine-gemedieerde krampen, geen organisch substraat, respondeert op NSAIDs/OAC, geen dyspareunie. PID: acute koorts, purulente afscheiding, CRP hoog. Myoom: menorragie, druk­gevoel, geen dysmenorroe specifiek.', therapie:'Pijnbehandeling: NSAIDs, OAC (gecombineerde pil continu). Hormonale suppressie: GnRH-agonisten, progestativa, levonorgestrel-IUD. Chirurgie: laparoscopische verwijdering laesies + adhesiolysis. Infertiliteit: IVF als eerstelijns behandeling bij ernstige endometriose.' } },

  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Man van 40 jaar, pijnloze testeszwelling rechts. Echo: solide inhomogene massa. AFP en bèta-hCG verhoogd. Diagnose?',
    a:['Testiscarcinoom (kiemceltumor)','Epididymo-orchitis','Hydrocele','Varicocele'], c:0,
    ex:'Testiscarcinoom: meest voorkomende solide tumor bij mannen 15-40 jaar. Pijnloze testeszwelling + verhoogde tumormarkers (AFP, bèta-hCG, LDH). Echo: solide massa. Altijd inguïnale orchidectomie (niet scrotaal om lymfedrainage te respecteren).',
    wiki:{ kern:'Kiemceltumoren: seminoom (50%, bèta-hCG licht verhoogd, AFP normaal, stralengevoelig) en niet-seminoom (AFP en/of bèta-hCG verhoogd, minder stralengevoelig, cisplatine-gevoelig). Risicofactoren: cryptorchidisme, familieanamnese, Klinefelter-syndroom.', mechanisme:'Tumormarkers: AFP (alfafoetoproteïne): eigenlijk bij niet-seminomen (yolk-sac tumor component). Bèta-hCG: bij choriocarcinoom-component of seminoom. LDH: niet-specifieke markeur voor tumorvolume. Markerdalingssnelheid na orchidectomie: halfwaardetijd AFP 5-7d, hCG 1-3d.', onderscheid:'Epididymo-orchitis: pijnlijk, koorts, leukocytose, goede respons op AB. Hydrocele: vochtvulling, transillumineerbaar, echo geen vaste massa. Varicocele: wormvormig gevoel in liggende positie, verdwijnt in rugligging.', therapie:'Seminoom: orchidectomie + bestraling of carboplatin (stadium I). Stadium II-III: BEP-chemotherapie (bleomycine, etoposide, cisplatine). Niet-seminoom: orchidectomie + RPLND of BEP. Genezing >95% bij gelokaliseerde ziekte.' } },

  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Vrouw van 52 jaar, onregelmatige menstruaties de laatste 2 jaar, opvliegers, nachtzweten, slaapproblemen, vaginale droogheid. FSH 45 IE/L, LH verhoogd, oestradiol laag. Diagnose?',
    a:['Menopauze/climacterium','PCOS','Hyperprolactinemie','Premature ovariuminsufficiëntie'], c:0,
    ex:'Menopauze: definitie = 12 maanden amenorroe na de laatste menstruatie bij een vrouw ≥45 jaar. FSH >25-30 IE/L + laag oestradiol bevestigt ovariële uitputting. Gemiddelde leeftijd: 51 jaar.',
    wiki:{ kern:'Climacterium: periode rondom de menopauze met hormonale veranderingen. Vroege menopauze (<45j) of premature ovariuminsufficiëntie (POI, <40j): FSH >25 IE/L op twee metingen met interval ≥4 weken bij amenorroe. POI: auto-immuun (50%), genetisch (Turner-mozaïek), iatrogeen (chemo/radiatie).', mechanisme:'Oestrogeendaling → hypothalamus desinhibitie → pulsatiele GnRH-afgifte → LH/FSH stijging. Vasomotore symptomen (opvliegers): plotse activatie thermoregulatie door gedaalde oestrogeenspiegel. Urogenitale atrofie: vaginale droogheid, dyspareunie, recidiverende UWI.', onderscheid:'PCOS: jongere vrouw, onregelmatige cyclus maar FSH normaal/laag. Hyperprolactinemie: ook amenorroe + galactorroe, prolactine verhoogd, FSH laag. POI vóór 40j: jong, auto-antistoffen ovariumweefsel soms positief.', therapie:'Menopauzale hormoontherapie (MHT): oestrogeen + progestageen (bij intacte uterus). Indicatie: ernstige klachten, BOT-bescherming bij POI. Risico: VTE, borstkanker bij langdurig gebruik (>5j). Alternatief: SSRI/SNRI voor opvliegers.' } },


  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Vrouw van 19 jaar, purulente cervicale afscheiding, buikpijn, koorts, drukpijn in adnex-gebied, pijn bij bewegen van de cervix. Diagnose?',
    a:['Pelvic inflammatory disease (PID)','Ectopische graviditeit','Appendicitis','Endometriose'], c:0,
    ex:'PID: opstijgende genitale infectie → endometritis, salpingitis, oöforitis, peritonitis. Meest voorkomende verwekkers: Chlamydia trachomatis en Neisseria gonorrhoeae. Cervixbewegingspijn ("chandelier sign") is pathognomonisch. Complicaties: infertiliteit, EG, chronische pijnklachten.',
    wiki:{ kern:'PID: treft seksueel actieve jonge vrouwen. Risicofactoren: meerdere partners, geen anticonceptie, doorgemaakte STD. Diagnose: klinisch (cervixbewegingspijn + adnexdrukpijn + abnormale afscheiding). Aanvullend: CRP, leukocyten, PCR Chlamydia/gonorroe (cervicaal of urine).', mechanisme:'Opstijgende infectie: cervix → endometrium → tubae → peritoneum. Tubo-ovarisch abces (TOA): ernstige complicatie, CT-diagnose, IV AB + eventueel drainage. Fitz-Hugh-Curtis-syndroom: perihepatitis door PID (pleuritische pijn rechter bovenbuik, violinstrengsverklevingen).', onderscheid:'EG: ook adnexpijn maar zwangerschapstest positief. Appendicitis: pijn rechts, geen cervixafscheiding, laboratoriumafwijkingen. Endometriose: chronisch, cyclisch, geen koorts.', therapie:'Ambulant (mild): ceftriaxon 500 mg IM eenmalig + doxycycline 100 mg 2×/dag 14d + metronidazol. Opname bij ernstig beloop/TOA: IV AB (cefotaxim + metronidazol + doxycycline). Seksuele partners behandelen.' } },

  { type:'truefalse', d:2, domain:'repro', dl:'Reproductieve geneeskunde — Waar of Niet?',
    q:'De combinatiepil (oestrogeen + progestageen) is de meest effectieve vorm van anticonceptie die beschikbaar is.',
    c:false,
    ex:'NIET WAAR. De meest effectieve anticonceptiemethoden zijn het koperspiraal of levonorgestrel-IUD (failure rate <0.1%) en sterilisatie. De combinatiepil heeft bij perfect use een failure rate van 0.3%, maar bij typical use 7-9% per jaar. IUD is ook reversibel.',
    wiki:{ kern:'Pearl Index: zwangerschappen per 100 vrouwjaren gebruik. Hoge effectiviteit (PI <0.5): IUD (koper/LNG), subcutaan implantaat, sterilisatie. Matige effectiviteit (PI 0.3-5 perfect use): pil, ring, pleister. Lagere effectiviteit (PI 2-20%): condoom, diafragma, periodieke onthouding.', mechanisme:'Combinatiepil: oestrogeen (ethinylestradiol) + progestageen → remming FSH/LH-piek → geen ovulatie. Ook: slijmverdikking cervix, verandering endometriumslijmvlies. Voordelen: regulering cyclus, dysmenorroe, acné. Nadelen: VTE-risico (2-4× verhoogd), contra-indicaties.', onderscheid:'Minipil (progestageen only): geschikt bij VTE-risico, borstvoeding. Subcutaan implantaat (etonogestrel): 3 jaar effectief, meest effectief reversibele methode. Emergency contraceptie: levonorgestrel (binnen 72u) of ulipristalacetaat (120u) of koperspiraal (5d).' } },

  { type:'truefalse', d:2, domain:'repro', dl:'Reproductieve geneeskunde — Waar of Niet?',
    q:'Foliumzuur-suppletie is alleen noodzakelijk bij vrouwen met een voorgeschiedenis van een neuraalbuisdefect.',
    c:false,
    ex:'NIET WAAR. Foliumzuur 0.4-0.5 mg/dag wordt aanbevolen voor ALLE vrouwen met een zwangerschapswens, minimaal 4-8 weken voor de conceptie en tot 10 weken zwangerschap. Neuraalbuissluiting vindt plaats in week 3-4 (vaak vóór bevestiging zwangerschap). Bij voorgeschiedenis NTD: 5 mg/dag.',
    wiki:{ kern:'Foliumzuur (vitamine B11): coënzym in de methylatiereacties voor DNA-synthese en aminozuurmetabolisme. Deficiëntie in vroege embryogenese → neuraalbuisdefecten (spina bifida, anencefalie). Primaire preventie: foliumzuur-suppletie pre-conceptioneel en periconceptioneel.', mechanisme:'Neuraalbuissluiting: dag 22-28 na conceptie = week 4-6 berekend van laatste menstruatie. Op het moment dat een vrouw de zwangerschap ontdekt, is het sluitingsmoment al voorbij. Daarom: preconceptioneel starten. Voeding: groene groente, volkoren, peulvruchten (niet voldoende alleen via dieet).', onderscheid:'Hoog risico NTD: voorgeschiedenis NTD, anti-epileptica (valproaat/carbamazepine interageren met foliumzuurstofwisseling), pre-existente diabetes, obesitas BMI>35 → foliumzuur 5 mg/dag. Anti-epileptica liefst switch voor zwangerschap overleggen met neuroloog.' } },

  { type:'truefalse', d:2, domain:'repro', dl:'Reproductieve geneeskunde — Waar of Niet?',
    q:'Cervixcarcinoom wordt vrijwel altijd veroorzaakt door een HPV-infectie.',
    c:true,
    ex:'WAAR. >99% van de cervixcarcinomen is HPV-gerelateerd, met name HPV-16 (plaveiselcelcarcinoom) en HPV-18 (adenocarcinoom). HPV-vaccinatie (bivalent/quadrivalent/nonavalent) is het meest effectieve middel voor primaire preventie van cervixcarcinoom.',
    wiki:{ kern:'Hoog-risico HPV-typen: 16, 18 (samen >70% cervixcarcinoom). HPV-16: plaveiselcelcarcinoom. HPV-18: adenocarcinoom (slechter screenbaar omdat de laesie hoger in het cervicale kanaal zit). Lage-risico typen: 6, 11 (genitale wratten/condylomata acuminata).', mechanisme:'HPV-E6 remt p53 (tumorsuppressor) → apoptose verminderd. HPV-E7 remt pRb → celcyclus ongecontroleerd → CIN (cervicale intra-epitheliale neoplasie) → carcinoom in situ → invasief carcinoom. Progressie CIN I → carcinoom: 10-20 jaar.', onderscheid:'Screening: uitstrijkje (cervicale cytologie) + HPV-DNA-test. Nederland: co-test 30, 35, 40, 45, 50, 55, 60 jaar. Colposcopie + biopsie bij afwijkend resultaat. Vaccinatie: nonavalent (Gardasil 9): meisjes én jongens 12-13 jaar.', therapie:'CIN I-II: wait-and-see. CIN III: LEEP (large loop excision of transformation zone) of conisatie. Invasief carcinoom stadium I: conisatie (fertiliteitsbesparend) of radicale hysterectomie + lymfeklierdissectie. Stadium II-IV: chemoradiotherapie (cisplatine + radiatie).' } },

  { type:'diagnose', d:5, domain:'repro', dl:'Reproductieve geneeskunde', subtype:'diff',
    q:'Welk kenmerk onderscheidt een miskraam (abortus incompletus) van een ectopische graviditeit bij een vrouw van 8 weken met vaginaal bloedverlies?',
    a:['Intra-uteriene zwangerschapszak op echo bij miskraam, geen intra-uteriene zwangerschap bij EG','Heviger bloedverlies bij EG dan bij miskraam','Sterkere buikpijn bij miskraam dan bij EG','Hogere bèta-hCG bij EG dan bij miskraam'], c:0,
    ex:'Transvaginale echo is het sleutelinstrument: bij een miskraam ziet men een intra-uteriene zwangerschapszak (vaak zonder foetale hartactie of met afwijkend groei-patroon). Bij een EG is er geen intra-uteriene zwangerschap zichtbaar — eventueel een adnexmassa. Bloedverlies en pijn zijn niet onderscheidend genoeg.',
    wiki:{ kern:'Diagnostisch algoritme bij vroege zwangerschap met bloedverlies: (1) bèta-hCG kwantitatief. (2) Transvaginale echo: intra-uteriene ZS zichtbaar bij hCG >1500-2000 IE/L? Ja = gerust. Nee = verdenking EG. (3) Seriële hCG-metingen: verdubbeling in 48u = normaal intrauterien. Plateau of daling = EG of miskraam.', mechanisme:'Miskraam (abortus spontanus): 15-20% van klinische zwangerschappen, 50% door chromosomale afwijkingen. Types: bedreigd (HB), onvolledig (incompletus), volledig (completus), missed abortion, septische abortus. Behandeling: expectatief, medicamenteus (misoprostol) of chirurgisch (curettage).', onderscheid:'Bedreigde miskraam: echo toont levende foetus + bloedverlies → watch. Missed abortion: foetus zonder hartactie op echo, asymptomatisch. EG: geen intra-uteriene ZS, adnexmassa, hCG-stijging suboptimaal.' } },

  { type:'diagnose', d:3, domain:'repro', dl:'Reproductieve geneeskunde',
    q:'Vrouw van 38 jaar, postcoïtaal bloedverlies, onregelmatig bloedverlies buiten menstruatie, cervix ziet er afwijkend uit bij speculumonderzoek. Diagnose uitsluiten?',
    a:['Cervixcarcinoom','Cervicitis','Cervixpoliep','Ectropion cervicis'], c:0,
    ex:'Postcoïtaal bloedverlies bij een vrouw >35 jaar is een red flag: altijd cervixcarcinoom uitsluiten via colposcopie + biopsie. Cervicitis en ectropion geven ook postcoïtaal bloedverlies maar zijn benigne. Abnormale cervix bij speculumonderzoek verhoogt de urgentie.',
    wiki:{ kern:'Alarmsymptomen (red flags) voor cervixcarcinoom: postcoïtaal bloedverlies, intermenstrueel bloedverlies, foetiede vaginale afscheiding, contactbloeding. Colposcopie: vergrotend onderzoek cervix + azijnzuur (witverkleuring) + jood (Schiller-test) → biopsie verdachte gebieden.', mechanisme:'Cervixcarcinoom groeit centraal vanuit de transformatiezone (squamocolumnaire junctie). Vroeg stadium: symptoomloos. Lokaal gevorderd: bloedverlies, afscheiding, pijn. Metastasen: lymfeklieren, blaas, rectum, distaal.', onderscheid:'Cervicitis: purulente afscheiding, gonorroe/Chlamydia positief, geen macroscopische laesie. Polyp: gestielde goedaardige uitstulping, laag risico. Ectropion: cylinderepitheel op de portio zichtbaar, bloeding bij aanraking, benigne.', therapie:'Zie eerdere vraag. FIGO-stagering: Ia (microscopisch) → Ib (macroscopisch, begrensd tot cervix) → II (parametrium) → III (bekkenswand) → IV (blaas/rectum of metastasen). Vroeg stadium: chirurgie. Gevorderd: chemoradiatie.' } },

  // ── ECG-vragen met SVG ──
  { type:'diagnose', d:3, domain:'cardio', dl:'Cardiologie — ECG',
    q:'Man van 68 jaar, palpitaties en licht onpasselijk. Zijn ECG is afgebeeld.\n\nWat is de meest waarschijnlijke diagnose?',
    fig:{ type:'ecg', alt:'ECG afleiding II met onregelmatig ritme', credit:null,
      src:`<svg viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><line x1="0" y1="55" x2="320" y2="55" stroke="#e8e0d0" stroke-width="0.5"/><text x="8" y="14" font-size="9" fill="#aaa" font-family="DM Sans,sans-serif">Afleiding II</text><polyline points="0,55 2,53 4,57 6,53 8,57 10,53 12,57 14,53 16,57 18,53 20,57 22,53 24,57 26,53 28,57 30,53 32,12 34,72 37,55 38,53 40,57 42,53 44,57 46,53 48,57 50,53 52,57 54,53 56,57 58,53 60,57 62,53 64,57 66,53 68,57 70,53 72,57 74,53 76,57 78,53 80,12 82,72 85,55 86,53 88,57 90,53 92,57 94,53 96,57 98,53 100,57 102,53 104,57 106,53 108,57 110,53 112,57 114,53 116,57 118,53 120,57 122,12 124,72 127,55 128,53 130,57 132,53 134,57 136,53 138,57 140,53 142,57 144,53 146,57 148,53 150,57 152,53 154,57 156,53 158,57 160,53 162,57 164,53 166,57 168,53 170,57 172,53 174,57 176,53 178,57 180,53 182,57 184,53 186,57 188,53 190,57 192,12 194,72 197,55 198,53 200,57 202,53 204,57 206,53 208,57 210,53 212,57 214,53 216,57 218,53 220,57 222,53 224,57 226,53 228,57 230,53 232,57 234,53 236,57 238,53 240,57 242,53 244,57 246,53 248,57 250,53 252,57 254,53 256,57 258,53 260,12 262,72 265,55 266,53 268,57 270,53 272,57 274,53 276,57 278,53 280,57 282,53 284,57 286,53 288,57 290,53 292,57 294,53 296,57 298,53 300,57 302,53 304,57 306,53 308,57 310,53 312,57 314,53 316,57 318,53 320,55" fill="none" stroke="#E8410A" stroke-width="1.5"/></svg>` },
    a:['Atriumfibrillatie','Sinustachycardie','Supraventriculaire tachycardie','Atriumflutter'],
    c:0,
    ex:'Atriumfibrillatie: geen duidelijke P-toppen, chaotische fijne basislijn (fibrillatiegolven), en volledig onregelmatige RR-intervallen ("irregularly irregular"). SVT heeft een regulier ritme; atriumflutter toont zaagvormige F-golven (~300/min) met regelmatige overleiding.',
    wiki:{ kern:'AF is de meest voorkomende hartritmestoornis (prevalentie ~1-2%). Pathofysiologie: chaotische elektrische activiteit atria → AV-knoop filtert willekeurig → onregelmatig ventrikelritme. Risico\'s: hartfalen, stroke (CHA₂DS₂-VASc score → antistolling).', mechanisme:'Triggers: ectopische foci in longvenen → re-entry circuits in atria → frequentie 350-600/min. AV-knoop geleidt variabel → ventrikelrespons 100-160/min (ongecontroleerd). Snelle ventrikelrespons → verlaagd HMV.', onderscheid:'Regulier smalcomplex-tachycardie = SVT/flutter. Regulier breecomplex = VT of SVT+bundeltakblok. Irregulier smalcomplex = AF (meest waarschijnlijk). Irregulier breecomplex = AF+bundeltakblok of polymorf VT.', therapie:'Acuut hemodynamisch instabiel: elektrische cardioversie. Stabiel: rate control (metoprolol, diltiazem, digoxine) of rhythm control (flecaïnide, amiodaron). Antistolling: DOAC op basis van CHA₂DS₂-VASc ≥2 (mannen) of ≥3 (vrouwen).' } },

  { type:'diagnose', d:4, domain:'cardio', dl:'Cardiologie — ECG',
    q:'Vrouw van 62 jaar, acute hevige drukpijn op de borst met uitstraling naar de linkerarm. Ambulance-ECG afgebeeld.\n\nWat is de meest urgente diagnose?',
    fig:{ type:'ecg', alt:'ECG met ST-elevatie en hyperacute T-toppen', credit:null,
      src:`<svg viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><line x1="0" y1="55" x2="320" y2="55" stroke="#e8e0d0" stroke-width="0.5"/><text x="8" y="14" font-size="9" fill="#aaa" font-family="DM Sans,sans-serif">Afleiding II — ST-elevatie</text><polyline points="0,55 10,55 17,47 24,55 34,55 36,60 38,13 40,68 44,45 75,45 85,36 100,55 120,55 127,47 134,55 144,55 146,60 148,13 150,68 154,45 185,45 195,36 210,55 240,55 247,47 254,55 264,55 266,60 268,13 270,68 274,45 310,45 320,37" fill="none" stroke="#E8410A" stroke-width="1.5"/></svg>` },
    a:['ST-elevatie myocardinfarct (STEMI)','Instabiele angina pectoris','Longembolie','Pericarditis'],
    c:0,
    ex:'STEMI: ST-elevatie ≥1mm in ≥2 aangrenzende afleidingen. Op dit ECG ziet men persisterende ST-elevatie met hyperacute T-toppen — het klassieke beeld. Directe PCI binnen 90 min is de behandeling van keuze. Pericarditis geeft saddle-shaped elevatie in alle afleidingen; longembolie geeft S1Q3T3-patroon.',
    wiki:{ kern:'STEMI-diagnose: ST-elevatie ≥1mm (≥2mm in V1-V3) in ≥2 contiguë afleidingen, of nieuw LBTB. Lokalisatie: inferior (II/III/aVF = RCA), anterior (V1-V4 = LAD), lateraal (I/aVL/V5-V6 = LCx). Reciproke depressie in tegenoverliggende afleidingen versterkt de diagnose.', mechanisme:'Plaque ruptuur → trombus → totale occlusie coronairarterie → transmuraal infarct. Tijdslijn: ST-elevatie (minuten) → Q-golf (uren) → T-inversie (dagen-weken). Enzymstijging: hs-troponine stijgt na 1-3u, piek 12-24u.', onderscheid:'NSTEMI: geen ST-elevatie, wel troponine positief. UA: geen troponinestijging. Vroeg STEMI vs pericarditis → pericarditis: diffuus, concaaf, geen Q-golf, PR-depressie.', therapie:'Primaire PCI: gouden standaard <12u na symptomen. Lyse als PCI niet beschikbaar binnen 120 min. Anti-aggregatie: aspirine + ticagrelor/prasugrel. Anticoagulatie: heparine periprocedureel.' } },

  { type:'diagnose', d:4, domain:'cardio', dl:'Cardiologie — ECG',
    q:'Man van 72 jaar, dyspnoe bij inspanning en pre-syncope. ECG-patroon afgebeeld.\n\nWelk geleidingspatroon is zichtbaar?',
    fig:{ type:'ecg', alt:'ECG met breed genofd QRS-complex en geïnverteerde T-toppen', credit:null,
      src:`<svg viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><line x1="0" y1="55" x2="320" y2="55" stroke="#e8e0d0" stroke-width="0.5"/><text x="8" y="14" font-size="9" fill="#aaa" font-family="DM Sans,sans-serif">Afleiding I — breed genofd QRS</text><polyline points="0,55 10,55 17,47 24,55 34,55 40,35 44,42 50,15 65,62 72,55 82,60 100,55 130,55 137,47 144,55 154,55 160,35 164,42 170,15 185,62 192,55 202,60 220,55 250,55 257,47 264,55 274,55 280,35 284,42 290,15 305,62 312,55 320,60" fill="none" stroke="#E8410A" stroke-width="1.5"/></svg>` },
    a:['Linker bundeltakblok (LBTB)','Rechter bundeltakblok (RBTB)','WPW-syndroom','Ventriculaire tachycardie'],
    c:0,
    ex:'Linker bundeltakblok: breed QRS (>120ms), geen initiële Q-golf in I/V6, genofd (M-vormig) R-complex in laterale afleidingen, discordante ST-T-veranderingen. RBTB geeft rSR\'-patroon in V1 (konijnenoren). WPW heeft een delta-golf en kort PR-interval.',
    wiki:{ kern:'LBTB-criteria: QRS >120ms, geen Q in I/V5/V6, breed genofd R in I/aVL/V5/V6, rS of QS in V1. Discordante ST-T = ST-T tegengesteld aan QRS-uitslag. Nieuw LBTB + pijn op de borst = STEMI tot het tegendeel bewezen (Sgarbossa-criteria).', mechanisme:'Normaal: impuls linker bundeltakbeen → simultane activatie linkerventrikel. Bij LBTB: impuls via rechterbundel en transseptaal (traag) → bredere vertraagde LV-activatie → breed genofd QRS in laterale afleidingen.', onderscheid:'RBTB: rSR\' in V1, breed S in I/V6. LBTB: geen Q in lateraal, M-patroon in I/V6, diepe S in V1. Incompleet: QRS 110-120ms. WPW: delta-golf (preëxcitatie), kort PR.', therapie:'LBTB op zichzelf geen behandeling nodig. Nieuw LBTB bij ACS = urgentie. Hartfalen + LBTB + EF <35%: CRT (cardiale resynchronisatietherapie) overwegen.' } },

  { type:'diagnose', d:5, domain:'cardio', dl:'Cardiologie — ECG',
    q:'Man van 78 jaar, syncope, polsfrequentie 36/min. ECG: P-golven (blauw) en QRS-complexen (rood) volledig onafhankelijk van elkaar.\n\nWat is het ritme?',
    fig:{ type:'ecg', alt:'ECG met complete AV-dissociatie: P-golven en QRS onafhankelijk', credit:null,
      src:`<svg viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><line x1="0" y1="55" x2="320" y2="55" stroke="#e8e0d0" stroke-width="0.5"/><text x="8" y="14" font-size="9" fill="#aaa" font-family="DM Sans,sans-serif">Afleiding II — AV-dissociatie</text><polyline points="10,55 15,47 20,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="30,55 35,47 40,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="50,55 55,47 60,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="70,55 75,47 80,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="90,55 95,47 100,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="110,55 115,47 120,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="130,55 135,47 140,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="150,55 155,47 160,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="170,55 175,47 180,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="190,55 195,47 200,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="210,55 215,47 220,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="230,55 235,47 240,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="250,55 255,47 260,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="270,55 275,47 280,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="290,55 295,47 300,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="310,55 315,47 320,55" fill="none" stroke="#3b82f6" stroke-width="1.2"/><polyline points="27,55 30,20 33,70 38,55 48,52 56,55" fill="none" stroke="#E8410A" stroke-width="1.5"/><polyline points="79,55 82,20 85,70 90,55 100,52 108,55" fill="none" stroke="#E8410A" stroke-width="1.5"/><polyline points="131,55 134,20 137,70 142,55 152,52 160,55" fill="none" stroke="#E8410A" stroke-width="1.5"/><polyline points="183,55 186,20 189,70 194,55 204,52 212,55" fill="none" stroke="#E8410A" stroke-width="1.5"/><polyline points="235,55 238,20 241,70 246,55 256,52 264,55" fill="none" stroke="#E8410A" stroke-width="1.5"/><polyline points="287,55 290,20 293,70 298,55 308,52 316,55" fill="none" stroke="#E8410A" stroke-width="1.5"/></svg>` },
    a:['Totaal AV-blok (3e graads)','2e graads AV-blok Mobitz II','Sinusbradycardie','Junctioneel ritme'],
    c:0,
    ex:'Totaal AV-blok: P-golven (~75/min) en QRS-escapritme (~36/min) zijn volledig onafhankelijk — atrioventriculaire dissociatie. Behandeling: urgente pacemaker. Oorzaken: inferior STEMI, digitalis, myocarditis, idiopathisch (Lenegre). Junctioneel ritme heeft een vast PR-interval; sinusbradycardie heeft normale P-QRS-relatie.',
    wiki:{ kern:'AV-blokken: 1e graads (lang PR, elke P→QRS), 2e graads Mobitz I (progressief langer PR → uitval QRS), 2e graads Mobitz II (constant PR → plotse uitval QRS), 3e graads = complete dissociatie.', mechanisme:'AV-knoop of His-bundel blok → geen geleiding atria→ventrikels → ventrikels via eigen escape-pacemaker. Junctioneel escape: 40-60/min, smal QRS. Ventriculair escape: 20-40/min, breed QRS. Hemodynamisch instabiel door laag HMV.', onderscheid:'AV-dissociatie ≠ altijd 3e graads AV-blok (ook bij VT of isorhythmische dissociatie). 3e graads: atria sneller dan ventrikels, volledig onafhankelijk. Sinusbradycardie: elke P gevolgd door QRS.', therapie:'Acuut: transcutane pacemaker of isoprenaline infuus als overbrugging. Definitief: permanente pacemaker (PPM). Bij inferior STEMI-gerelateerd: soms reversibel.' } },

  // ── Spirometrie-vragen met SVG ──
  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie — Spirometrie',
    q:'Man van 64 jaar, roker, hoest en dyspnoe. Flow-volume curve van zijn spirometrie is afgebeeld.\n\nWelk patroon is dit?',
    fig:{ type:'graph', alt:'Concave flow-volume curve passend bij obstructief longpatroon', credit:null,
      src:`<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><text x="8" y="16" font-size="10" fill="#888" font-family="DM Sans,sans-serif">Flow-volume curve</text><line x1="30" y1="130" x2="200" y2="130" stroke="#ccc" stroke-width="1"/><line x1="30" y1="20" x2="30" y2="130" stroke="#ccc" stroke-width="1"/><text x="32" y="138" font-size="8" fill="#aaa" font-family="DM Sans,sans-serif">Volume →</text><text x="2" y="80" font-size="8" fill="#aaa" font-family="DM Sans,sans-serif" transform="rotate(-90,14,80)">Flow</text><polyline points="30,130 40,58 55,72 75,88 100,102 130,113 165,122 195,130" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6,3"/><polyline points="30,130 38,42 48,48 65,60 90,78 120,96 158,116 195,130" fill="none" stroke="#E8410A" stroke-width="2"/><text x="110" y="50" font-size="9" fill="#3b82f6" font-family="DM Sans,sans-serif">Normaal</text><text x="115" y="100" font-size="9" fill="#E8410A" font-family="DM Sans,sans-serif">Patiënt</text></svg>` },
    a:['Obstructief patroon (bijv. COPD)','Restrictief patroon (bijv. longfibrose)','Gemengd obstructief-restrictief patroon','Normaal patroon'],
    c:0,
    ex:'Obstructief patroon: de uitademcurve (rood) is concaaf (hol naar binnen) vergeleken met normaal (blauw gestippeld), met een verlaagde piekflow en vertraagde uitademing. FEV1/FVC <0.70 na bronchodilatatie bevestigt obstructie (GOLD-criteria voor COPD).',
    wiki:{ kern:'Spirometrie: FVC (geforceerde vitale capaciteit), FEV1 (volume in eerste seconde), FEV1/FVC-ratio. Obstructief: FEV1/FVC <0.70. Restrictief: normale FEV1/FVC, verlaagde FVC (bevestig met TLC via bodybox <80%).', mechanisme:'Obstructie: luchtwegweerstand verhoogd door bronchospasmen, slijm, slijmvliesontsteking of alveolaire collaps (emfyseem). Luchtwegcollaps bij uitademing → flow-beperking → concave curve. TLC normaal of verhoogd (air trapping).', onderscheid:'COPD: onomkeerbare obstructie (na bronchodilatator). Astma: (deels) reversibele obstructie → bronchodilatatortest: FEV1 stijging ≥12% + ≥200ml = significante reversibiliteit.', therapie:'COPD: stoppen met roken (meest effectief), SABA/LABA, LAMA, ICS bij frequente exacerbaties, longrevalidatie, O2 bij pO2 <7.3 kPa.' } },

  { type:'diagnose', d:4, domain:'pulmo', dl:'Pulmonologie — Spirometrie',
    q:'Vrouw van 58 jaar, progressieve dyspnoe, niet-roker. Spirometrie: FEV1/FVC 0.82 (normaal), FVC 62% van voorspeld. Flow-volume curve afgebeeld.\n\nWelk patroon is dit?',
    fig:{ type:'graph', alt:'Verkleinde maar normaal gevormde flow-volume curve passend bij restrictief patroon', credit:null,
      src:`<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;background:#fffdf8;border-radius:8px"><text x="8" y="16" font-size="10" fill="#888" font-family="DM Sans,sans-serif">Flow-volume curve</text><line x1="30" y1="130" x2="200" y2="130" stroke="#ccc" stroke-width="1"/><line x1="30" y1="20" x2="30" y2="130" stroke="#ccc" stroke-width="1"/><text x="32" y="138" font-size="8" fill="#aaa" font-family="DM Sans,sans-serif">Volume →</text><polyline points="30,130 38,42 48,48 65,60 90,78 120,96 158,116 195,130" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6,3"/><polyline points="60,130 66,62 74,68 88,82 108,100 130,116 155,130" fill="none" stroke="#E8410A" stroke-width="2"/><text x="110" y="50" font-size="9" fill="#3b82f6" font-family="DM Sans,sans-serif">Normaal</text><text x="80" y="75" font-size="9" fill="#E8410A" font-family="DM Sans,sans-serif">Patiënt</text></svg>` },
    a:['Restrictief patroon (bijv. longfibrose, pleuraverdikking)','Obstructief patroon (bijv. COPD)','Gemengd patroon','Normaal patroon'],
    c:0,
    ex:'Restrictief patroon: de flow-volume curve (rood) heeft dezelfde normale convexe vorm als normaal maar is kleiner (naar rechts verschoven, minder volume). FEV1/FVC blijft normaal (≥0.70) of zelfs verhoogd, omdat zowel FEV1 als FVC evenredig afnemen. Oorzaken: longfibrose (IPF), sarcoïdose, pleura-aandoening, kyfoscoliose.',
    wiki:{ kern:'Restrictieve longaandoening: verlaagde TLC (<80% van voorspeld, gemeten via bodybox of heliumverdunning). FVC verlaagd, maar FEV1/FVC normaal of verhoogd. Oorzaken intraparenchymaal: IPF, sarcoïdose, hypersensitiviteitspneumonitis. Extraparenchymaal: pleuraverdikking, neuromusculair, obesitas.', mechanisme:'Verlaagde compliance → longen stijver → kleiner volume bij zelfde druk. Diffusiecapaciteit (DLCO) vaak ook verlaagd bij parenchymale fibrose. DLCO normaal bij extraparenchymale restrictie (bv. spierzwakte).', onderscheid:'Obstructief: FEV1/FVC <0.70, concave curve. Restrictief: FEV1/FVC ≥0.70, verkleinde maar normale vorm. Gemengd: verlaagd FEV1/FVC + verlaagd TLC.', therapie:'IPF: nintedanib of pirfenidon (antifibrotisch). Sarcoïdose: corticosteroïden bij orgaanbedreiging. Neuromusculair: NIV (niet-invasieve ventilatie).' } },

  { type:'truefalse', d:2, domain:'pulmo', dl:'Pulmonologie — Waar of Niet?',
    q:'Een normaal FEV1/FVC-getal na bronchodilatatie sluit COPD uit.',
    c:true,
    ex:'WAAR. Per GOLD-criteria: COPD wordt gedefinieerd als een postbronchodilatator FEV1/FVC <0.70. Als de ratio na bronchodilatatie normaal is (≥0.70), is COPD uitgesloten — ook al zijn er klachten. Een normale ratio kan wel samengaan met andere longziekten (astma, restrictie).',
    wiki:{ kern:'GOLD-definitie COPD: persisterende luchtwegobstructie (FEV1/FVC <0.70 na bronchodilatatie) + relevante blootstelling (rook, stof, gassen) + klachten. GOLD-stadia (op basis van FEV1 % voorspeld): I ≥80%, II 50-79%, III 30-49%, IV <30%.', mechanisme:'COPD omvat emfyseem (destructie alveoli → verlies elasticiteit → verhoogde compliance → luchtwegcollaps bij expiratie) en chronische bronchitis (slijmbekercelhyperplasie → overmatig slijm → chronisch hoest ≥3 maanden/jaar, ≥2 jaar).', onderscheid:'Astma vs COPD: astma (jong, atopisch, variabel, volledig reversibel), COPD (ouder, roker, irreversibel). Overlap ACO (Asthma-COPD Overlap): kenmerken van beide. Spirometrie na bronchodilatator is doorslaggevend.', therapie:'Richtlijnen NHG/GOLD: stap 1 SABA (salbutamol), stap 2 LAMA (tiotropium) of LABA, stap 3 combinatie LABA+LAMA, stap 4 LABA+LAMA+ICS bij recidiverende exacerbaties.' } },

  { type:'diagnose', d:3, domain:'pulmo', dl:'Pulmonologie', subtype:'test',
    q:'Man van 55 jaar, hoest met hemoptoë, gewichtsverlies 5 kg in 3 maanden, roker (30 pakjaren). Welk onderzoek geeft het meeste diagnostische informatie?',
    a:['CT-thorax met contrast','Standaard thoraxfoto','Bronchoscopie met BAL','Sputumkweek'],
    c:0,
    ex:'Bij verdenking longcarcinoom is een CT-thorax met contrast de eerste stap: het toont de locatie, grootte, relatie tot mediastinum en eventuele metastasen beter dan een thoraxfoto. Bronchoscopie volgt voor histologie bij centrale tumoren; CT-geleide biopsie bij perifere tumoren. Thoraxfoto mist tot 25% van longtumoren.',
    wiki:{ kern:'Alarmsignalen longcarcinoom: hemoptoë, gewichtsverlies, persisterende hoest, heesheid, dysfagie, Claude Bernard-Horner syndroom, Pancoast-tumor. Incidentele longmodule: Fleischner-criteria voor follow-up/biopsie op basis van grootte en risico.', mechanisme:'Longcarcinoom: NSCLC (80%: adenocarcinoom meest voorkomend, squameuzelcel, grootcellig) en SCLC (20%, agressief, centrale locatie, paraneoplastisch). NSCLC: driversmutaties (EGFR, ALK, ROS1, KRAS) → targettherapie.', onderscheid:'PET-CT: stagering (mediastinale klieren, metastasen). EBUS: endobronchiale echografie + biopsie lymfeklieren. Mediastinoscopie: chirurgische stagering. MRI-hersenen: hersenuitzaaiingen bij NSCLC-stadium III-IV.', therapie:'NSCLC I-II: chirurgie (lobectomie). III: chemoradiatie ± immunotherapie. IV: mutatie-geleide therapie (TKI) of immunotherapie (pembrolizumab als PD-L1 ≥50%).' } },

];