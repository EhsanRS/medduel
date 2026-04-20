// MedDuel — Trivia vragenbank
// Structuur: { type, domain, dl (display label), q, a (answers), c (correct index), ex (explanation) }
// Types: 'diagnose' | 'truefalse' | 'pharma' | 'lab'
// Domains: 'cardio' | 'neuro' | 'pharma' | 'infectio' | 'lab'

const QUESTIONS = [
  // ── CARDIOLOGIE ──
  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man van 55 jaar: drukkende thoraxpijn uitstralend naar de linkerarm, zweten, misselijkheid. Meest waarschijnlijke diagnose?',
    a:['STEMI','Longembolie','Aortadissectie','Pancreatitis'], c:0,
    ex:'Klassieke STEMI-presentatie: drukkende pijn, uitstraling, vegetatieve verschijnselen. Directe PCI binnen 90 min!',
    wiki:{ kern:'STEMI (ST-elevatie myocardinfarct) is een acuut hartinfarct door complete afsluiting van een coronairarterie. Elke minuut vertraging = meer myocardschade. Het hart heeft slechts 20-40 minuten voordat irreversibele necrose begint.', mechanisme:'Atherosclerotische plaque ruptureert → bloedplaatjes aggregeren → trombus sluit coronairarterie volledig af → transmuraal infarct (volle dikte van hartspier). ST-elevatie op ECG = transmuraal letsel. Vrijkomen troponine/CK-MB bevestigt necrose.', onderscheid:'NSTEMI: geen ST-elevatie, partiële occlusie, troponine verhoogd. Pericarditis: diffuse saddle-shape ST, pleuritische pijn. Longembolie: rechterbelastingspatroon (S1Q3T3), geen regionale ST-elevatie. Aortadissectie: verscheurende pijn, bloeddrukasymmetrie — trombolyse is dan fataal!', therapie:'"MONA": Morfine (pijn), Zuurstof (bij SpO₂<94%), Nitro (bij stabiele BD), Aspirine 300 mg + P2Y12-remmer (ticagrelor). Urgente PCI binnen 90 min. Heparine bridging. Bij PCI niet beschikbaar: trombolyse <30 min na deur. Daarna: statine, bètablokker, ACE-remmer.' } },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'ECG: geen P-toppen, irregulair ritme met "zagtand" baseline. Frequentie 150/min. Diagnose?',
    a:['Atriumfibrilleren','Atriumflutter','Ventriculaire tachycardie','WPW-syndroom'], c:1,
    ex:'Atriumflutter: F-golven (zagtand), typisch regulier 2:1-blok → 150/min. AF is juist irregulair zonder F-golven.',
    wiki:{ kern:'Atriumflutter is een snel maar georganiseerd atriumritme (~300/min) door een re-entry circuit in het rechter atrium (typisch round the tricuspidalisklep). De AV-knoop geleidt niet elke prikkel door — typisch 2:1 blokkering → ventrikelfrequentie ~150/min, regelmatig.', mechanisme:'Grote re-entry lus in het rechteratrium (isthmusdependente flutter). In tegenstelling tot AF zijn er herkenbare F-golven (zagtand) in afleidingen II, III, aVF en V1. Omdat het ritme regulier is, is het soms moeilijker te onderscheiden van sinustachycardie of AVNRT zonder carotismassage/adenosine.', onderscheid:'AF: absoluut irregulaire respons, geen F-golven. Sinustachycardie: regelmatig, P-toppen aanwezig vóór elk QRS. AVNRT: plotse start/stop, P-toppen verborgen in of achter QRS. Volledig AV-blok met junctionaal escape: langzaam regulier ritme, P-toppen los van QRS.', therapie:'Frequentiecontrole: bètablokker of calciumantagonist. Cardioversie: elektrisch (lage energie effectief bij flutter) of farmacologisch. Catheterablatie: bij recidieven hoog succes (>95%) — curatief door onderbreken isthmus. Anticoagulatie: zelfde als bij AF (tromboserisico).' } },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Vrouw van 68j: kortademig bij inspanning, bilateraal enkelloedeem, verhoogde CVD, crepitaties basaal. Diagnose?',
    a:['Longembolie','Decompensatio cordis','COPD-exacerbatie','Nefrotisch syndroom'], c:1,
    ex:'Decompensatio cordis: stuwing links (crepitaties) én rechts (oedeem, verhoogde CVD). Klassieke presentatie.',
    wiki:{ kern:'Acuut hartfalen (decompensatio cordis) is het plotse onvermogen van het hart om voldoende bloed rond te pompen. Linksdecompensatie stuft vocht in de longen (orthopneu, nachtelijke dyspneu, crepitaties). Rechtsdecompensatie stuwt vocht in de venen (enkels, buik, verhoogde CVD).', mechanisme:'Het falende hart activeert compensatiemechanismen: RAAS-activatie houdt water vast (meer vulling → meer pompkracht), sympathicus verhoogt hartfrequentie. Deze compensatie werkt tijdelijk maar overbelast het hart. Bij acute decompensatie treedt overstromingsoedeem op.', onderscheid:'Longembolie: ook plotse dyspneu maar géén crepitaties, wél pleuritische pijn en D-dimeer verhoogd. Pneumonie: koorts, purulent sputum, eenzijdige infiltraten. Tamponade: stuwing maar juist stille longen en gedempte harttonen.', therapie:'Acuut: rechtopzitten, zuurstof, furosemide IV (50-80 mg), nitraten bij normotensie. Monitor: diurese, saturatie, bloeddruk. Onderhoudsbehandeling zoals HFrEF of HFpEF (zie aldaar).' } },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man 45j: plotse "scheurende" interscapulaire pijn, bloeddrukasymmetrie > 20 mmHg. Urgente diagnose?',
    a:['STEMI','Aortadissectie','Longembolie','Pericard­tamponade'], c:1,
    ex:'Aortadissectie: scheurend karakter, interscapulair, bloeddrukasymmetrie. CT-angio is diagnostisch. Levensbedreiging!',
    wiki:{ kern:'Aortadissectie ontstaat wanneer de binnenste laag van de aortawand (intima) scheurt en bloed tussen de wandlagen dringt. Het is een van de meest levensbedreigende spoedgevallen — mortaliteit stijgt 1-2% per uur zonder behandeling.', mechanisme:'Langdurige hypertensie verzwakt de aortawand (cystische medianecrose). Bij de scheur dringt bloed in de valse lumen → kompressie van echte lumen en zijarteries → uitval van organen of ledematen. Type A: opstijgende aorta (60%) → risico op tamponade, MI, CVA. Type B: dalende aorta.', onderscheid:'STEMI: pijn uitstralend naar kaak/arm, geen bloeddrukasymmetrie, ECG-veranderingen. Longembolie: pleuritische pijn, geen asymmetrie, D-dimeer hoog. Aorta-aneurysma: chronisch aanwezig, pijn pas bij expansie/ruptuur. Pericarditis: houdingsafhankelijk, saddle-shape ECG.', therapie:'Type A: spoedindicatie voor chirurgie (vervanging opstijgende aorta). Type B: bloeddrukcontrole met IV bètablokker (labetalol/esmolol), doelRR <120 systolisch. Endovasculaire stentplaatsing (TEVAR) bij complicaties. CT-angio bevestigt diagnose.' } },

  { type:'truefalse', domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Digoxine verhoogt de hartfrequentie en is geïndiceerd bij tachycardieën om het hart sneller te laten pompen.',
    c:false, ex:'NIET WAAR. Digoxine verlaagt de HF (negatief chronotroop) via vagale stimulatie. Gebruikt bij AF met snelle ventrikelrespons.' },

  { type:'truefalse', domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Een normaal ECG sluit een acuut myocardinfarct volledig uit.',
    c:false, ex:'NIET WAAR. Bij een NSTEMI of posterieur infarct kan het ECG initieel normaal zijn. Troponines zijn essentieel!' },

  // ── NEUROLOGIE ──
  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 72j: plotse uitval rechterarm/-been en spraak. Na 45 minuten volledig hersteld. Diagnose?',
    a:['Herseninfarct','TIA','Epileptisch insult','Migraine met aura'], c:1,
    ex:'TIA herstelt per definitie binnen 24u. Hoog recidiefrisico: ABCD2-score bepalen en direct behandelen!',
    wiki:{ kern:'Een TIA (transient ischaemic attack) is een korte episode van focale neurologische uitval door tijdelijke ischemie, volledig herstellend binnen 24u (meestal <1u). Het is een ernstig waarschuwingssignaal: 10-15% krijgt binnen 3 maanden een CVA, risico is hoogst in de eerste 48u.', mechanisme:'Oorzaken zijn gelijk aan herseninfarct: cardiale embolieën (AF, kunstkleppen), atherosclerose van grote vaten (carotis), lacunaire infarcten bij hypertensie. MRI-DWI toont bij 30-50% van "TIA"-patiënten toch een klein diffusie-positief infarctje.', onderscheid:'CVA: zelfde presentatie maar geen herstel binnen 24u, DWI-positief op MRI. Epileptisch insult: motorische Jacksonian march, post-ictale fase, positief. Migraine-aura: langzamer opbouw (20-30 min), visuele fenomenen, geen negatieve uitval. Hypoglykemie: altijd uitsluiten met glucosemeting.', therapie:'Spoed: aspirine 300 mg direct. ABCD²-score ≥4: opname voor monitoring en onderzoek (ECG/Holter, echocardiografie, carotisecho). Anticoagulatie bij AF. Carotisendarterectomie bij >70% stenose. Bloeddruk, statine, antidiabeticum optimaliseren.' } },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Vrouw 45j: nekstijfheid, fotofobie, koorts 39.5°C, positief teken van Kernig. Urgentie?',
    a:['Migraine','Subarachnoïdale bloeding','Bacteriële meningitis','Encefalitis'], c:2,
    ex:'Meningeale prikkeling + koorts = bacteriële meningitis tot tegendeel bewezen. Directe antibiotica, geen LP afwachten!',
    wiki:{ kern:'Bacteriële meningitis is een ontsteking van de hersenvliezen door bacteriën. Het klassieke trio: koorts + nekstijfheid + fotofobie/fono­fobie. Mortaliteit is 20-30% — elke minuut vertraging in antibiotica vergroot het risico op overlijden of ernstige restverschijnselen (doofheid, cognitieve schade).', mechanisme:'Bacteriën bereiken de liquorruimte via hematogene spreiding of directe inokula­tie. In de subarachnoidale ruimte is het immuunsysteem zwak → bacteriën repliceren ongestoord → massiève ontsteking → verhoogde hersendruk → infarct en hersenletsel. S. pneumoniae (volwassenen) en N. meningitidis (jongeren).', onderscheid:'Virale meningitis: milder beloop, lymfocytaire pleocytose, normaal glucose, geen/lage koorts. SAB: thunderclap hoofdpijn maar geen koorts. Encefalitis: bewustzijnsdaling + gedragsverandering (=hersenparenchym aangedaan). Herpes-encefalitis: temporale MRI-afwijkingen, aciclovir direct.', therapie:'Cefotaxim/ceftriaxon + dexamethason (15-30 min vóór of gelijktijdig met AB — vermindert hersenletsel). Bloedkweken afnemen maar NIET wachten op LP of CT als er tekenen zijn van druk. LP na stabilisatie. Isolatie eerste 24u. Profylaxe contacten bij meningokokken.' } },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 58j: rusttremor, bradykinesie, hypomimie, kleine passen. Diagnose?',
    a:['Essentiële tremor','Huntington','Parkinson','MS'], c:2,
    ex:'Parkinson: de 4 kardinale symptomen zijn rusttremor, rigiditeit, bradykinesie en posturale instabiliteit. Hypomimie is typisch.' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Vrouw 28j: visuele stoornissen, daarna zwakte been, maanden later tintelingen arm. MRI: lesies verspreid in tijd en ruimte.',
    a:['ALS','Multiple Sclerose','Guillain-Barré','Myasthenia Gravis'], c:1,
    ex:'MS: demyeliniserende aandoening, lesies verspreid in tijd én ruimte. Typisch bij jonge vrouwen (F:M = 3:1).',
    wiki:{ kern:'Multiple sclerose (MS) is een chronische auto-immuun demyeliniserende aandoening van het centraal zenuwstelsel. Auto-reactieve T-cellen beschadigen myeline → vertraagde of geblokkeerde zenuwgeleiding. Kenmerk: lesies "gescheiden in tijd en plaats" — episodes van verschillende neurologische uitval die opklaren maar terugkomen.', mechanisme:'Oligodendrocyten (myelineproduce­rende cellen in de hersenen) worden aangevallen. Na demyelinisatie: gedeeltelijk herstel door remyelinisatie, maar ook axonale schade. Bij schubs: actieve inflammatie. Progressieve fase: chronische neurodestructie zonder actieve ontsteking. Uitlokkers schub: infecties, koorts, stress.', onderscheid:'NMO (neuromyelitis optica): ernstigere aanvallen, myelitis + opticus neuritis tegelijk, anti-AQP4 antilichamen positief. ADEM: eenmalige episode na infectie/vaccinatie, kinderen, behandeling met steroïden. ALS: geen remissies, geen sensibiliteit, motorisch alleen. Vasculaire WS-afwijkingen: geen aanvallen, ouderen.', therapie:'Schub: methylprednisolon IV 3-5 dagen (verkort duur, niet effect op lange termijn). Ziektemodificerende therapie (DMT): interferon-beta, glatirameracetat (milde MS) of natalizumab, ocrelizumab (actieve/ernstige MS). Symptoombehandeling: baclofen (spasticiteit), amantadine (vermoeidheid), SSRI (depressie).' } },

  { type:'truefalse', domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Bij een CVA moet altijd een CT-scan gemaakt worden vóór trombolyse om een bloeding uit te sluiten.',
    c:true, ex:'WAAR. Trombolyse bij hemorrhagisch CVA is fataal. Altijd CT eerst. "Time is brain" — maar veiligheid gaat voor.' },

  // ── NEUROLOGIE — moeilijker ──
  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 34j, 2 weken na gastro-enteritis: progressieve ascending spierzwakte, areflexie. Liquor: eiwit 2.8 g/L, cellen 3/µL. Diagnose?',
    a:['Multiple Sclerose','ALS','Guillain-Barré syndroom','Myasthenia Gravis'], c:2,
    ex:'GBS: stijgende motorische uitval + areflexie na infectie + albuminocytologische dissociatie (hoog eiwit, nauwelijks cellen). Respiratoir monitoring essentieel — 30% heeft beademing nodig. Behandeling: IVIG of plasmaferese.',
    wiki:{ kern:'Guillain-Barré syndroom is een auto-immuun demyeliniserende aandoening van de perifere zenuwen, klassiek optredend 2-4 weken na een infectie (Campylobacter, CMV, EBV). Kenmerk: ascending paralysis — begint in de benen en trekt omhoog. Areflexie is universeel.', mechanisme:'Moleculaire mimicry: antilichamen gericht tegen bacteriële/virale structuren kruisreageren met gangliosiden op het myeline van perifere zenuwen. Demyelinisatie vertraagt of blokkeert zenuwgeleiding. Bij ernstige vormen: axonale schade (AMAN-variant) → langzamer herstel.', onderscheid:'MG: ook spierzwakte maar geen areflexie, vermoeidbaarheids­patroon, sensibiliteit intact. Dwarsmyelitis: spinale level, sensibiliteitslevel aanwezig. Botulisme: dalende verlamming (dalend!), pupilreacties gestoord, geen koorts. Hypokaliëmie: geen areflexie, geen voorgeschiedenis infectie.', therapie:'IVIG 2 g/kg over 5 dagen OF plasmaferese (gelijkwaardig). Corticosteroïden zijn NIET effectief bij GBS. Intensieve monitoring van vitale capaciteit (FVC) — bij <20 ml/kg of snelle achteruitgang: intubatie. 80% volledig herstel na 6-12 maanden.' } },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Vrouw 70j: geheugenverlies, urge-incontinentie, breed-based gang. CT: ventrikelvergroting zonder corticale atrofie. Diagnose?',
    a:['Alzheimer','Normaaldrukhydrocephalus (NPH)','Lewy body dementie','Vasculaire dementie'], c:1,
    ex:'NPH triade van Hakim: dementie + incontinentie + gangstoornis ("wacky, wet, wobbly"). CT: grote ventrikels, weinig corticale atrofie. Lumbaalpunctie als diagnostische/therapeutische test — verbetering na liquordrainage bevestigt diagnose.' },

  { type:'truefalse', domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Bij een epiduraal hematoom is er typisch een lucide interval van uren tussen het initiële trauma en bewustzijnsdaling.',
    c:true, ex:'WAAR. Epiduraal hematoom (arteria meningea media): kort bewustzijnsverlies → lucide interval (arteriële bloeding bouwt langzaam druk op) → snelle deterioratie. Neurochirurgische spoedinterventie levensreddend!' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Vrouw 38j: plotse "donderslag-hoofdpijn", maximale intensiteit bereikt in seconden, nekstijfheid, geen koorts. CT hersenen negatief. Volgende stap?',
    a:['MRI hersenen met gadolinium','Lumbaalpunctie na 6-12 uur','Geruststellen — waarschijnlijk migraine','Arteria temporalis biopsie'], c:1,
    ex:'Thunderclap + negatieve CT: subarachnoïdale bloeding uitsluiten! CT mist 5% van SAB in eerste uren. LP na ≥6u detecteert xanthochromie. "Worst headache of life" = SAB tot bewijs van het tegendeel. LP altijd verplicht!',
    wiki:{ kern:'Subarachnoïdale bloeding (SAB) is bloeding in de ruimte tussen hersenvliezen, meestal door ruptuur van een cerebraal aneurysma. De "donderslaghoofdpijn" — maximale intensiteit in seconden — is het klassieke alarmteken. SAB zonder behandeling heeft 50% mortaliteit binnen weken.', mechanisme:'80% veroorzaakt door ruptuur van een sacculair (bes-)aneurysma op bifurcaties van de circulus van Willis. Bloed in de subarachnoïdale ruimte irriteert hersenvliezen (nekstijfheid), verhoogt intracraniële druk (hoofdpijn, bewustzijnsdaling) en veroorzaakt vasospasmen (ischemie dag 4-14).', onderscheid:'Migraine: geen thunderclap, geleidelijke opbouw, eerder episoden. Meningitis: koorts prominenter, langzamer begin. Epiduraal hematoom: trauma, lucide interval. Spanningshoofdpijn: nooit "ergste ooit", geen nekstijfheid. Benigne thunderclap: diagnose per exclusionem na negatieve CT + LP.', therapie:'CT hersenen direct (sensitief eerste 6u: 98%). Negatieve CT → LP na ≥6u voor xanthochromie. Bij SAB: neurochirurgie of neuroradiologie (endovasculair coilen) zo snel mogelijk. Nimodipine (calciumantagonist) voorkomt vasospasmen. Bloeddrukcontrole en hersendrukbewaking.' } },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 55j: progressieve dysfagie, dysartrie, tongfasciculaties én spasticiteit met hyperreflexie benen, geen sensibiliteitsstoornissen. Diagnose?',
    a:['Myasthenia Gravis','ALS (amyotrofische lateraalsclerose)','Brainsteminfarct','Guillain-Barré syndroom'], c:1,
    ex:'ALS: gelijktijdig UMN (hyperreflexie, spasticiteit) ÉN LMN-uitval (atrofie, fasciculaties). Bulbaire variant: dysfagie/dysartrie als startpunt. Geen sensorische uitval — dat onderscheidt ALS van GBS en MS.',
    wiki:{ kern:'Amyotrofische lateraalsclerose (ALS) is een progressieve neurodegeneratieve ziekte waarbij zowel bovenste (UMN) als onderste (LMN) motorische neuronen afsterven. Mediane overleving is 3-5 jaar. Sensibiliteit, ogen en continentie blijven gespaard — het bewustzijn ook (bij de meeste patiënten).', mechanisme:'Exact mechanisme onbekend. SOD1-mutaties (familiaire ALS), TDP-43 aggregaten en RNA-metabolisme-stoornissen spelen een rol. Mitochondriale disfunctie en glutamaat-toxiciteit beschadigen motorische neuronen irreversibel. 90% sporadisch, 10% familiair.', onderscheid:'GBS: perifeer, sensorisch ook aangedaan, reversibel, areflexie. MS: demyelinisatie, sensibiliteit aangedaan, schubsgewijs beloop, jongere patiënten. Myasthenia gravis: vermoeibare zwakte, geen atrofie, geen fasciculaties. Kennedy-ziekte: X-gebonden bulbo-spinale atrofie, gynecomastie.', therapie:'Riluzol (glutamaat-remmer) verlengt overleving met ~3 maanden. Edaravone vermindert functionele achteruitgang in selecte patiënten. Symptomatisch: PEG-sonde bij dysfagie, NIV-beademing bij ademhalings­insufficiëntie, communicatiehulpmiddelen. Multidisciplinaire zorg essentieel.' } },

  { type:'truefalse', domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Carbamazepine is gecontraïndiceerd bij dragers van het HLA-B*1502-allel vanwege een sterk verhoogd risico op Stevens-Johnson syndroom.',
    c:true, ex:'WAAR. HLA-B*1502 (prevalent in Zuidoost-Aziatische populaties) is sterk geassocieerd met carbamazepine-geïnduceerd SJS/TEN. Genetische screening vóór start wordt aanbevolen. Alternatief: levetiracetam of lamotrigine.' },

  // ── FARMACOLOGIE ──
  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Dit middel blokkeert de H⁺/K⁺-ATPase op de pariëtaalcel en remt zuurproductie. Gebruikt bij GERD en peptische ulcera.',
    a:['Omeprazol','Metoclopramide','Famotidine','Sucralfaat'], c:0,
    ex:'Omeprazol is een protonpompremmer (PPI). Famotidine is een H2-blokker — minder effectief, ander aanknopingspunt.',
    wiki:{ kern:'Protonpompremmers (PPIs) zijn de krachtigste maagzuurremmers beschikbaar. Ze blokkeren irreversibel de H⁺/K⁺-ATPase (protonpomp) op de pariëtaalcel van de maag → zuurproductie daalt met >90%. Effect: pH stijgt naar boven de 4, wat nodig is voor genezing van ulcera en refluxschade.', mechanisme:'PPIs zijn prodrugs die geactiveerd worden in het zure milieu van de pariëtaalcel. Ze binden covalent aan de protonpomp — effect duurt 24-48u ondanks korte halfwaardetijd in bloed. Nieuwe pompen worden continu aangemaakt → dagelijkse inname nodig. Beste effect: 30 min voor ontbijt.', onderscheid:'H2-blokkers (famotidine, ranitidine): minder effectief, snel tachyfylaxie, bruikbaar bij nachtelijke klachten of als PPI niet beschikbaar. Antacida (aluminiumhydroxide): directe maar kortdurende zuurverwijdering, geen genezing. Sucralfaat: beschermende laag over ulcus, geen maagzuurremming.', therapie:'Indicaties: GERD, peptisch ulcus, H. pylori-eradicatie (triple therapy), NSAID-bescherming bij hoog risico, Zollinger-Ellison. Bijwerkingen langdurig gebruik: verhoogd risico op C. diff, fracturen (verminderde Ca-absorptie), magnesiumbrek, vitamine B12-deficiëntie, interstitiële nefritis.' } },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Bèta-1-selectief middel, verlaagt HF en BD, gebruikt bij hypertensie en hartfalen. Bekende cave: astma.',
    a:['Amlodipine','Metoprolol','Spironolacton','Hydralazine'], c:1,
    ex:'Metoprolol is een cardioselectieve bèta-1-blokker. Bèta-2-blokkade veroorzaakt bronchospasme — gevaarlijk bij astma.',
    wiki:{ kern:'Bètablokkers blokkeren bèta-adrenerge receptoren. Bèta-1 (hart): lagere hartfrequentie en contractiliteit. Bèta-2 (longen/vaten): bronchoconstrictie en vaatvernauwing. Cardioselectieve bètablokkers (metoprolol, bisoprolol, atenolol) hebben voorkeur voor bèta-1 maar zijn bij hoge dosis niet volledig selectief.', mechanisme:'Door blokkade van bèta-1 receptoren: verlaging hartfrequentie (negatief chronotroop) + contractiekracht (negatief inotroop) + geleidingssnelheid AV-knoop (negatief dromotroop). Dit vermindert myocardiaal zuurstofverbruik. Bij hartfalen: initieel voorzichtig opstarten (kan acuut verslechteren).', onderscheid:'Calciumantagonisten: ook negatief chronotroop (verapamil, diltiazem) maar via ander mechanisme. Amlodipine is dihydropyridine — alleen vaatverwijdend, geen hartfrequentie-effect. Ivabradin: enkel sinusknoop, zonder negatief inotropie — bruikbaar bij bètablokker-intolerantie.', therapie:'Indicaties: hypertensie, angina, hartfalen (HFrEF), AF-frequentiecontrole, na MI. Contra-indicaties: ernstig astma, symptomatisch bradycardie, AV-blok °II-III, acute decompensatio cordis. Nooit abrupt stoppen — rebound-effect (angina, hypertensie).' } },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Dit middel remt ACE, verlaagt angiotensine II en aldosteron. Bekende bijwerking: droge hoest.',
    a:['Losartan','Lisinopril','Verapamil','Furosemide'], c:1,
    ex:'Lisinopril = ACE-remmer. Losartan is een ARB (angiotensine-II-receptorblokker) — géén hoest als bijwerking.',
    wiki:{ kern:'ACE-remmers (lisinopril, enalapril, ramipril) blokkeren het angiotensine-converterend enzym → minder angiotensine II → vaatverwijding + minder aldosteron → bloeddrukdaling + minder zout/waterretentie. Ze beschermen ook de nieren bij diabetes en verminderen mortaliteit bij hartfalen.', mechanisme:'ACE zet angiotensine I om in angiotensine II én breekt bradykinine af. Remming → bradykinine-accumulatie → prostaglandine-productie → droge hoest bij 10-15% (via bradykinine in de keel). ARBs blokkeren de AT1-receptor direct — zelfde bloeddrukeffect zonder bradykinine-ophoping → geen hoest.', onderscheid:'ARB (losartan, valsartan): zelfde indicaties, geen hoest. ARNI (sacubitril/valsartan): ARB + neprilysineremmer, superieur aan ACE-remmer bij HFrEF. Bètablokker: ook mortaliteitsvoordeel HFrEF maar via ander mechanisme. Calciumantagonist: geen nefroprotectie, geen mortaliteitsvoordeel HF.', therapie:'Indicaties: hypertensie, hartfalen (HFrEF), nefroprotectie bij diabetes nefropathie, post-MI. Contra-indicaties: zwangerschap (teratogeen!), bilaterale nierarteriestenose, hyperkaliëmie, angio-oedeem bij ACE-remmer (→ overstap op ARB). Starten met lage dosis, ophogen.' } },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Antibioticum dat DNA-gyrase remt, werkzaam tegen gramnegatieve bacteriën. Cave: peesontstekingen.',
    a:['Amoxicilline','Doxycycline','Ciprofloxacine','Metronidazol'], c:2,
    ex:'Ciprofloxacine is een fluorochinolon. Bijwerkingen: tendinitis, QTc-verlenging. Cave bij ouderen + corticosteroïden.' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Welk antistollingsmiddel remt vitamine K-afhankelijke stollingsfactoren II, VII, IX en X?',
    a:['Heparine','Warfarine','Rivaroxaban','Dabigatran'], c:1,
    ex:'Warfarine/acenocoumarol remmen de vitamine K-cyclus → verminderde aanmaak stollingsfactoren. INR monitoren!',
    wiki:{ kern:'Vitamine K-antagonisten (VKA) zoals warfarine en acenocoumarol remmen de vitamine K-afhankelijke stollingsfactoren II (protrombine), VII, IX en X, en de anticoagulante eiwitten C en S. Werking treedt pas na 3-5 dagen volledig op (bestaande factoren moeten afgebroken worden).', mechanisme:'Vitamine K is nodig voor gamma-carboxylering van stollingsfactoren. VKA blokkeren de vitamine K-epoxide-reductase (VKOR) → geoxideerde vorm van vitamine K kan niet geregenereerd worden → inactieve stollingsfactoren. INR meet de vertraging in de extrinsieke stollingsroute.', onderscheid:'Heparine: directe werking via antitrombine III, parenteraal, effect direct — voor overbrugging. DOACs (rivaroxaban, apixaban, dabigatran): direct werkend, geen INR-monitoring, minder interacties, maar niet voor alle indicaties. VKA: goedkoop, omkeerbaar met vitamine K, keuze bij kunstkleppen.', therapie:'Therapeutische INR: 2-3 (meeste indicaties), 2,5-3,5 (kunstklepp). Te hoog INR: vitamine K po/IV. Ernstige bloeding: 4-factoren protrombinecomplex-concentraat (PCC) + vitamine K. Vele CYP2C9-interacties — altijd controleren bij nieuwe medicatie.' } },

  { type:'truefalse', domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Metformine is gecontraïndiceerd bij eGFR < 30 ml/min vanwege het risico op lactaatacidose.',
    c:true, ex:'WAAR. Metformine accumuleert bij nierinsufficiëntie. eGFR 30–45: halveer dosis. eGFR < 30: stop definitief.' },

  { type:'truefalse', domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Heparine heeft een direct anticoagulerend effect en kan oraal worden toegediend.',
    c:false, ex:'NIET WAAR. Heparine werkt alleen iv of sc (te grote molecule voor orale absorptie). Effect is direct via antitrombine III.' },

  // ── FARMACOLOGIE — moeilijker ──
  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Patiënt met epilepsie én bipolaire stoornis. Welk antiepilepticum heeft ook een bewezen stemmingsstabiliserende indicatie?',
    a:['Levetiracetam','Valproaat (natriumvalproaat)','Gabapentine','Fenobarbital'], c:1,
    ex:'Valproaat: breed-spectrum antiepilepticum én stemmingsstabilisator bij bipolaire stoornis. CAVE: ernstige teratogeniciteit (neurale-buisdefecten, cognitieve effecten kind) — absoluut gecontraïndiceerd bij zwangerschapswens zonder adequate anticonceptie!' },

  { type:'truefalse', domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Statines verlagen uitsluitend LDL-cholesterol en hebben geen effect op triglyceriden of HDL.',
    c:false, ex:'NIET WAAR. Statines verlagen ook matig de triglyceriden (10-30%) en verhogen licht HDL (5-10%). Primair effect is LDL-verlaging (20-60% afhankelijk van statin en dosis), maar het volledige lipidenprofiel verbetert.' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'HIV-patiënt start tenofovir/emtricitabine + efavirenz. Na 3 weken: levendige dromen, depressieve stemming, concentratiestoornissen. Meest waarschijnlijke oorzaak?',
    a:['Tenofovir-nefrotoxiciteit','Efavirenz CNS-bijwerkingen','Immuunreconstitutiesyndroom (IRIS)','HIV-encefalopathie'], c:1,
    ex:'Efavirenz (NNRTI): bekende CNS-bijwerkingen eerste weken — levendige dromen, nachtmerries, depressie, duizeligheid. Innemen voor het slapengaan vermindert hinder. Spontane verbetering na 2-4 weken bij de meeste patiënten.' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Welk mechanisme verklaart de werkzaamheid van methotrexaat bij reumatoïde artritis?',
    a:['COX-2-remming','TNF-α blokkade','DHFR-inhibitie → anti-inflammatoir via adenosine','IL-6 receptorblokkade'], c:2,
    ex:'Methotrexaat remt DHFR (dihydrofolaatreductase) → verminderde purinesynthese → adenosine-accumulatie → anti-inflammatoir effect. Foliumzuursuppletie verlaagt bijwerkingen (mucositis, myelosuppressie) zonder werkzaamheidsverlies.' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Aminoglycosiden (bijv. gentamicine) werken concentratie-afhankelijk bactericide. Welk doseringsschema benut dit optimaal?',
    a:['Continu infuus voor stabiele spiegel','Eenmaal daags hoge dosis (once-daily)','Vier keer daags lage dosis','Oraal toedienen voor betere resorptie'], c:1,
    ex:'Once-daily aminoglycosiden: hoge Cmax/MIC-ratio → maximale bactericide activiteit + post-antibiotisch effect. Lagere nefroto­xiciteit door recuperatietijd (tubuluscellen). Orale resorptie van aminoglycosiden is verwaarloosbaar.' },

  { type:'truefalse', domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Protonpompremmers (PPI\'s) verhogen significant het risico op Clostridioides difficile-infectie.',
    c:true, ex:'WAAR. PPI\'s verhogen de maag-pH → verminderde zuurbarrière → kolonisatie door C. difficile. Meta-analyses: OR ~1.7 voor CDI bij PPI-gebruik. Bijkomende risico\'s langdurig gebruik: hypomagnesemie, pneumonie, osteoporose.' },

  // ── INFECTIOLOGIE ──
  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Jongeman 22j: koorts, extreme vermoeidheid, pharyngitis, cervicale lymfadenopathie, splenomegalie. Monospot positief.',
    a:['Streptokokken-angina','CMV-infectie','EBV-mononucleose','HIV primo-infectie'], c:2,
    ex:'EBV = ziekte van Pfeiffer. Monospot detecteert heterofiele antistoffen. Cave: geen contactsporten bij splenomegalie!' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Terugkerende van Azië: cyclische koorts elke 48 uur, rillingen, zweetstuipen. Dik-druppelpreparaat positief.',
    a:['Tyfus','Malaria','Dengue','Leishmaniasis'], c:1,
    ex:'Malaria: cyclische koorts + reizigerhistorie + positief dik-druppelpreparaat. P. vivax: 48u cyclus.',
    wiki:{ kern:'Malaria wordt veroorzaakt door Plasmodium-parasieten, overgebracht via de Anopheles-mug. Vijf species: P. falciparum (meest dodelijk), P. vivax, P. ovale, P. malariae, P. knowlesi. De cyclische koorts ontstaat door synchrone lysis van geïnfecteerde rode bloedcellen.', mechanisme:'Parasiet injecteert sporozoïeten → lever (asymptomatisch, 1-2 weken) → merozieten vrijgekomen in bloed → infectie rode bloedcellen → cyclische ruptuur. P. falciparum maakt geïnfecteerde cellen kleverig → vaatblokkade → cerebrale malaria, ARDS, nierfalen.', onderscheid:'Dengue: ook reiziger + koorts maar hevige spier/gewrichtspijn, huiduitslag, geen cyclisch patroon, lage trombocyten. Typhoid: aanhoudende koorts, buikpijn, bradycardie. Leptospirose: watercontact, conjunctivale hyperemie. Rickettsiae: tekenbeet, huiduitslag.', therapie:'P. falciparum: artemisinine-combinatietherapie (bijv. artemether-lumefantrine). Ernstige malaria: IV artesunaat. P. vivax/ovale: chloroquine (+ primaquine om levervormen te elimineren, cave G6PD-deficiëntie). Profylaxe afhankelijk van bestemming en resistentiepatroon.' } },

  { type:'truefalse', domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Amoxicilline is de eerste keuze bij een ongecompliceerde urineweginfectie bij een jonge vrouw in Nederland.',
    c:false, ex:'NIET WAAR. Nitrofurantoïne of fosfomycine zijn eerste keuze vanwege hoge resistentie tegen amoxicilline bij E. coli.' },

  // ── CARDIOLOGIE — moeilijker ──
  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man 72j, 2u na succesvolle PCI voor inferieur STEMI: plots bradycardie 38/min, hypotensie 80/50, verhoogde CVD, heldere longen. Meest waarschijnlijke oorzaak?',
    a:['Cardiogene shock','Rechterventrikeli­nfarct','Papillairspierruptuur','Ventrikelseptumruptuur'], c:1,
    ex:'RV-infarct bij inferieur MI (RCA-occlusie): triade hypotensie + hoge CVD + heldere longen. CAVE: nitraten en diuretica zijn gecontraïndiceerd — preload is essentieel! Volumebelasting is eerste stap.',
    wiki:{ kern:'Rechterventrikelinfarct (RVI) treedt op bij 30-50% van inferieure MI\'s (RCA-occlusie proximaal). Het RV faalt als pomp → terugstuwing → hoge CVD (gestuwd halsvenen) maar géén longoedeem (lege longen, heldere longen). Dit is een klassieke valkuil.', mechanisme:'De RCA voedt het RV-myocard. Bij proximale occlusie: RV-contractiliteit daalt → onvoldoende vulling van het LV (preload afhankelijkheid) → lage cardiac output → hypotensie. Het RV is uniek: het heeft een lage werkdruk en is extreem gevoelig voor preloadreductie.', onderscheid:'LV-infarct met cardiogene shock: longoedeem aanwezig, crepitaties, niet heldere longen. Pericardtamponnade: ook lage bloeddruk + gestuwd CVD maar geen MI-ECG, echocardiografie bewijzend. Longembolie: ook hoge CVD maar pleuritische pijn, D-dimeer hoog.', therapie:'CAVE: nitraten en diuretica zijn ABSOLUUT gecontraïndiceerd bij RVI (verminderen preload → shock verergert). Behandeling: volumebelasting (NaCl 0,9% IV), urgente PCI van de RCA, noradrenaline bij refractaire shock. ECG: ST-elevatie in V4R (rechter precordiale afleidingen).' } },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 55j, exertionele dyspneu, ECHO: EF 65%, verhoogde vullingsdrukken, geen klepafwijkingen. Diagnose?',
    a:['Hartfalen met gereduceerde EF (HFrEF)','Hartfalen met behouden EF (HFpEF)','Pulmonale hypertensie','Hypertrofische cardiomyopathie'], c:1,
    ex:'HFpEF: EF ≥50% maar diastolische dysfunctie → verhoogde vullingsdrukken. Behandeling richt zich op symptomen en risicofactoren. Geen EF-verbeterende medicatie (ACE-remmer, bèta-blokker) bewezen effectief zoals bij HFrEF.' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man 26j, atleet: syncope tijdens inspanning, positieve familiegeschiedenis plotse hartdood. ECHO: asymmetrische septumhypertrofie 22mm, SAM van mitraalklep. Diagnose?',
    a:['Aortaklepstenose','Hypertrofische obstructieve cardiomyopathie (HOCM)','Dilatatieve cardiomyopathie','Longembolie'], c:1,
    ex:'HOCM: septumhypertrofie + SAM (systolic anterior motion) mitraalklep → dynamische LVOT-obstructie. Belangrijkste oorzaak van plotse hartdood bij jonge atleten. ICD-indicatie bij hoog-risico profiel. Sportontheffing verplicht!',
    wiki:{ kern:'Hypertrofische (obstructieve) cardiomyopathie (HOCM/HCM) is een genetische hartspierziekte (autosomaaldominant, sarcomeer-mutaties) gekenmerkt door asymmetrische hypertrofie van het interventriculaire septum. Het is de meest voorkomende oorzaak van plotse hartdood bij jongeren en atleten.', mechanisme:'Het verdikt septum kan tijdens de systole de uitstroombaan van het LV (LVOT) obstrueren. De mitraalklep beweegt mee naar voren (SAM) → verergert de obstructie + mitralisinsufficiëntie. Obstructie neemt toe bij afnemende preload (staan, Valsalva, dehydratie) en vermindert bij toenemende preload (hurken, liggen).', onderscheid:'Aortastenose: ook systolisch geruis maar afneemt bij Valsalva (vaste obstructie). Dilatatieve CMP: grote LV, lage EF, wijde QRS. WPW-syndroom: ook syncope bij jongeren maar ECG met delta-golf en korte PR. Myocarditis: acuut begin na infectie, troponine hoog.', therapie:'Symptomatisch: bètablokker of niet-dihydropyridine calciumantagonist (verapamil) — verlagen hartfrequentie → meer vultijd → minder obstructie. ICD bij hoog risico (familielid plotse hartdood, onverklaard syncope, NSVT). Sportontheffing. Septumreductie (chirurgie of alcohol-ablatie) bij refractaire LVOT-obstructie.' } },

  { type:'truefalse', domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Hypokaliëmie (K⁺ < 3.5) is een onafhankelijke risicofactor voor ventrikelfibrilleren bij een acuut myocardinfarct.',
    c:true, ex:'WAAR. Hypokaliëmie verlaagt de drempelwaarde voor ventriculaire aritmieën, met name bij ischemie. Target K⁺ ≥ 4.0 mmol/L bij ACS is aanbevolen. Actieve suppletie is onderdeel van standaardzorg op de CCU.' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Patiënt met hartfalen EF 30%, intolerantie voor ACE-remmer wegens angiooedeem. Beste alternatief?',
    a:['Verapamil','ARB (bijv. valsartan)','Amlodipine hoge dosis','Diltiazem'], c:1,
    ex:'ARB veroorzaakt geen angiooedeem — bradykinine-pathway niet betrokken. Verapamil en diltiazem zijn negatief inotroop en gecontraïndiceerd bij lage EF. Hydralazine + nitraat is tweede keuze bij ARB-intolerantie.' },

  { type:'truefalse', domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Een eerstegraads AV-blok (PR-interval > 200ms) bij een asymptomatische patiënt vereist altijd een pacemaker.',
    c:false, ex:'NIET WAAR. Eerstegraads AV-blok bij asymptomatische patiënt: geen behandeling nodig, alleen observatie. Pacemaker is geïndiceerd bij symptomatisch tweedegraads Mobitz II of derdegraads AV-blok.' },

  // ── INFECTIOLOGIE — moeilijker ──
  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'HIV-patiënt, CD4 45/µL: koorts, droge hoest, dyspneu bij inspanning, LDH 520 U/L, bilaterale interstitiële infiltraten. Meest waarschijnlijke verwekker?',
    a:['Mycobacterium tuberculosis','Pneumocystis jirovecii (PCP)','CMV-pneumonitis','Aspergillus fumigatus'], c:1,
    ex:'PCP bij CD4 <200/µL: insidieuze presentatie, droge hoest, hoog LDH, bilaterale "ground glass" infiltraten. Behandeling: TMP-SMX hoge dosis (3 weken). Profylaxe verplicht bij CD4 <200. Corticosteroïden toevoegen bij ernstige hypoxemie!' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Patiënt: HBsAg positief, anti-HBc IgM positief, anti-HBs negatief, HBeAg positief. Interpretatie?',
    a:['Chronische HBV-infectie','Acuut hepatitis B, hoog infectieus','Herstel van HBV (immuniteit)','Vaccinatie-immuniteit'], c:1,
    ex:'Acuut HBV: HBsAg+ en anti-HBc IgM+ (verse infectie). HBeAg+ duidt op actieve virusreplicatie, hoog infectieus. Anti-HBs positief = herstel of vaccinatie. Chronisch HBV: HBsAg >6 maanden, IgM anti-HBc negatief.' },

  { type:'truefalse', domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'MRSA-resistentie berust op het mecA-gen, dat codeert voor PBP2a — een transpeptidase met lage affiniteit voor alle bèta-lactam-antibiotica.',
    c:true, ex:'WAAR. PBP2a bindt bèta-lactams niet effectief → celwandsynthese gaat gewoon door → resistentie. Behandeling: vancomycine, linezolid of daptomycine. MRSA-diagnostiek via PCR (mecA) of fenotypische gevoeligheidstesten.' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Man 40j, sub-Saharaans Afrika: malaria ondanks chloroquine-profylaxe. Meest resistente Plasmodium-species?',
    a:['P. vivax','P. falciparum','P. ovale','P. malariae'], c:1,
    ex:'P. falciparum: verantwoordelijk voor >90% van malaria-mortaliteit. Wijdverspreide chloroquineresistentie in sub-Saharaans Afrika. Correcte profylaxe: atovaquon-proguanil of mefloquine. Falciparum kan cerebrale malaria geven — snel behandelen!' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Na 7 dagen amoxicilline-clavulaanzuur: waterige diarree 8×/dag, koorts, buikkrampen, leukocyten in feces. Toxinetest positief. Diagnose?',
    a:['Salmonella-enteritis','Clostridioides difficile-infectie (CDI)','Virale gastro-enteritis','Campylobacter jejuni'], c:1,
    ex:'CDI: typisch na (brede-spectrum) antibiotica. Toxine A/B diagnostisch. Eerste episode: orale vancomycine of fidaxomicine (niet meer metronidazol als eerste keuze). CAVE: geen loperamide — risico toxisch megacolon!',
    wiki:{ kern:'Clostridioides difficile (C. diff) is een sporevormende bacterie die de dikke darm koloniseert wanneer de normale darmflora verstoord is — klassiek na antibiotica. Toxinen A en B beschadigen het colonepitheel → pseudomembraneuze colitis met waterige diarree, krampen, koorts.', mechanisme:'Antibiotica (met name clindamycine, cefalosporines, fluorochinolonen) ruimen commensale flora op. C. diff-sporen overleven en kiemen → vegetatieve vormen produceren toxinen → epitheel­beschadiging → diarree. Sporen zijn resistent tegen alcohol-handenreiniger — zeep en water verplicht!', onderscheid:'Andere antibiotica-gerelateerde diarree (non-CDI): geen toxinen, minder ernstig, stopt bij stoppen AB. IBD-exacerbatie: geen duidelijke AB-anamnese, chronisch beloop. Ischemische colitis: ouderen, plots begin, bloed in feces. Infectieuze colitis (Campylobacter, Salmonella): geen AB-anamnese, feceskweek positief.', therapie:'Stop het triggerende antibioticum. Eerste episode mild: vancomycine 125 mg 4x/dag PO 10 dagen OF fidaxomicine. Geen metronidazol meer als eerste keuze. Geen loperamide (risico toxisch megacolon). Recidief: verlengd fidaxomicine-schema of fecestransplantatie (FMT) bij multipele recidieven.' } },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Tiener met mononucleose-achtig beeld krijgt amoxicilline. Volgende dag: uitgebreid maculopapuleus exantheem over het hele lichaam. Betekenis?',
    a:['Bewezen penicilline-allergie','Amoxicilline-exantheem bij EBV — geen echte allergie','Serum-ziekte','Stevens-Johnson syndroom'], c:1,
    ex:'Amoxicilline bij actieve EBV: ~80% kans op gegeneraliseerd exantheem — immuungemedieerd, GEEN IgE-allergie. Patiënt hoeft penicilline in de toekomst niet te vermijden. Documenteer correct zodat onterechte allergie-label vermeden wordt!' },

  { type:'truefalse', domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Rifampicine is een krachtige CYP3A4-inductor en kan de werkzaamheid van orale anticonceptiva significant verminderen.',
    c:true, ex:'WAAR. Rifampicine induceert sterk CYP3A4 → versneld metabolisme van ethinylestradiol → verminderde anticonceptieve bescherming. Extra anticonceptiemethode verplicht tijdens én minimaal 4 weken na het stoppen van rifampicine.' },

  // ── LABORATORIUM ──
  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Na⁺ 128, lage osmolaliteit plasma, hoog urinesodium, geen oedeem. Welk syndroom?',
    a:['Diabetes insipidus','SIADH','Nefrotisch syndroom','Addisoncrisis'], c:1,
    ex:'SIADH: hyponatriëmie, lage plasmaosmolaliteit, hoog urinenatrium. Geen oedeem — dat onderscheidt het van hartfalen/cirrose.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'K⁺ 6.8, ECG: piekende T-toppen, verlengd PR. Eerste behandelstap?',
    a:['Furosemide iv','Calcium gluconaat iv','Kayexalaat oraal','Hemodialyse'], c:1,
    ex:'Bij ernstige hyperkaliëmie met ECG-veranderingen: eerst calcium gluconaat voor cardioprotectie. Daarna K⁺ actief verlagen.',
    wiki:{ kern:'Hyperkaliëmie (K⁺ >5,5 mmol/L) verstoort de rustmembraanpotentiaal van hartcellen → verhoogd risico op levensbedreigende aritmieën. ECG-progressie: puntige T-toppen → verbreed PR → breed QRS → sinusgolf → ventrikelfibrilleren.', mechanisme:'Oorzaken: nierinsufficiëntie (meest voorkomend), ACE-remmers/ARBs, kaliumsparende diuretica, bijnierinsufficiëntie, weefselafbraak (rabdomyolyse, TLS). Acidose verschuift K⁺ van intracellulaire naar extracellulaire ruimte (per 0,1 pH-daling: K⁺ stijgt ~0,5 mmol/L).', onderscheid:'Pseudohyperkaliëmie: hemolyse in het buisje (foutief hoge meting). Altijd herhalen bij twijfel. Hyperkaliëmie zonder ECG-veranderingen is minder acuut maar vraagt wel behandeling en monitoring.', therapie:'Stap 1: calcium gluconaat IV (membraanstabilisatie, werkt in 1-3 min). Stap 2: glucose + insuline IV (K⁺ cellen in, werkt in 15-30 min). Stap 3: salbutamol vernevelaar. Stap 4: natriumbicarbonaat bij acidose. Definitief: resonium, kayexalaat of dialyse voor verwijdering.' } },

  // ── LABORATORIUM — moeilijker ──
  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'ABG: pH 7.49, pCO₂ 30 mmHg, HCO₃⁻ 22 mmol/L, pO₂ 98 mmHg. Juiste interpretatie?',
    a:['Metabole alkalose met respiratoire compensatie','Respiratoire alkalose met renale compensatie','Gemengde alkalose','Metabole acidose met overcompensatie'], c:1,
    ex:'pH hoog + laag pCO₂ = respiratoire alkalose. HCO₃ licht gedaald = renale compensatie (verwacht: 24 − 0.5×ΔpCO₂ acuut). Oorzaken: hyperventilatie, sepsis (vroeg), zwangerschap, longembolie, salicylaatintoxicatie.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Microcytaire anemie: ferritine 6 µg/L, transferrinesaturatie 5%, serum-ijzer 5 µmol/L, reticulocyten laag. Diagnose?',
    a:['β-thalassemie minor','Anemie van chronische ziekte','IJzergebreksanemie','Sideroblastische anemie'], c:2,
    ex:'IJzergebreksanemie: ferritine laag (<12), transferrinesaturatie <16%, serum-ijzer laag. Ferritine is acuut-fase-eiwit — bij ontsteking kan het vals-normaal zijn. Onderscheid van chronische anemie: bij chronische anemie is ferritine normaal/hoog.',
    wiki:{ kern:'IJzergebreksanemie is de meest voorkomende anemie wereldwijd. IJzer is nodig voor hemoglobiinesynthese. Tekort leidt tot kleine (microcytaire), bleke (hypochrome) rode bloedcellen en klachten als vermoeidheid, duizeligheid, hoofdpijn, bleekheid en eventueel pica (eetlust naar ijs, aarde).', mechanisme:'IJzer wordt opgenomen in de dunne darm (als Fe²⁺, bevorderd door vitamine C). Oorzaken tekort: te weinig inname (veganisten, ondervoeding), malabsorptie (coeliakie, IBD, gastrectomie), verhoogd verlies (menstruatie, GI-bloeding). Ferritine is de opslagvorm — als eerst uitgeput.', onderscheid:'Anemie van chronische ziekte (ACD): ferritine normaal/hoog, serum-ijzer laag, transferrine laag — ijzer opgesloten in macrofagen door ontsteking. Thalassemie: microcytair maar ferritine/serum-ijzer normaal, Hb-elektroforese afwijkend. Sideroblastische anemie: ringed sideroblasts op beenmerg.', therapie:'Oorzaak behandelen (GI-bloeding? coeliakie?). Ferrosulfaat oraal 200 mg/dag (of ferrofumaraat) — 3-6 maanden voor vullen van ijzervoorraden. IV ijzer (ferric carboxymaltose) bij malabsorptie, onverdraagzaamheid of spoedsituatie. Reticulocyten stijgen na 5-7 dagen als eerste teken van respons.' } },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Patient op acenocoumarol: INR 3.8, APTT normaal. Welke stollingsfactor is NIET aangetast?',
    a:['Factor II (protrombine)','Factor VII','Factor VIII','Factor X'], c:2,
    ex:'Vitamine K-antagonisten remmen factoren II, VII, IX en X (vitamine K-afhankelijk). Factor VIII is vitamine K-onafhankelijk. PT/INR reflecteert factor VII (kortste halfwaardetijd). APTT normaal bevestigt: intrinsieke route intact.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Na chemotherapie: K⁺ 6.4, fosfaat 3.2, uraat 870 µmol/L, calcium 1.6, LDH 2900. Diagnose?',
    a:['Tumorlysissyndroom (TLS)','Nefrotisch syndroom','Addison-crisis','Rhabdomyolyse'], c:0,
    ex:'TLS: massale celdood → vrijkomen celinhoud → hyperkaliëmie, hyperfosfatemie, hyperurikemie, hypocalciëmie (fosfaat bindt Ca²⁺). Risico: nierfalen en levensbedreigende aritmieën. Preventie: hyperhydratie + rasburicase/allopurinol.' },

  { type:'truefalse', domain:'lab', dl:'Laboratorium — Waar of Niet?',
    q:'Een normaal serum-B12-spiegel sluit functioneel vitamine B12-tekort volledig uit.',
    c:false, ex:'NIET WAAR. Serum-B12 reflecteert totaal (actief + inactief transcobalamine). Methylmalonzuur en homocysteïne zijn functionele markers — verhoogd bij intracellulair B12-tekort ondanks normale serumspiegel. MMA is specifiek voor B12-deficiëntie.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Serum creatinine 188 µmol/L acuut gestegen. Urine-Na 9 mmol/L, urine-osmolaliteit 680 mosm/kg. Meest waarschijnlijke oorzaak?',
    a:['Acute tubulusnecrose (ATN)','Prerenaal nierfalen','Post-renale obstructie','Acute glomerulonefritis'], c:1,
    ex:'Prerenaal: tubulus functioneert nog → maximale Na-terugresorptie (urine-Na <20) + water-terugresorptie (osmolaliteit >500). ATN: tubuli beschadigd → urine-Na >40, osmolaliteit <350. Behandeling prerenaal: vochtresuscitatie.' },

  { type:'truefalse', domain:'lab', dl:'Laboratorium — Waar of Niet?',
    q:'Een verlengde APTT met normale PT zonder bloedingsklachten kan wijzen op een lupus anticoagulans.',
    c:true, ex:'WAAR. Lupus anticoagulans verlengde APTT in vitro (remt fosfolipide-afhankelijke reacties) — maar paradoxaal thrombotisch risico in vivo. Mengproef: geen correctie (= remmer aanwezig). Bevestiging: dRVVT-test. Behandeling: anticoagulatie.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Vrouw 28j: anemie, indirect bilirubine verhoogd, LDH 880, haptoglobine ondetecteerbaar, bloeduitstrijk: schistocyten. Diagnose?',
    a:['IJzergebreksanemie','Microangiopathische hemolytische anemie (MAHA)','Thalassemie','G6PD-deficiëntie'], c:1,
    ex:'MAHA: schistocyten (fragmenten van beschadigde rode bloedcellen) + hemolyseparameters (hoog LDH, indirect bili, laag haptoglobine). Oorzaken: TTP, HUS, DIC, HELLP. Urgente diagnose — TTP-behandeling is plasmaferese!',
    wiki:{ kern:'Microangiopathische hemolytische anemie (MAHA) is een patroon waarbij rode bloedcellen mechanisch kapot worden gescheurd in kleine bloedvaten (trombotische microangiopathie). Schistocyten op de bloeduitstrijk zijn het pathognomonische teken — dit is altijd abnormaal.', mechanisme:'Trombotische occlusies in kleine vaten (TTP: ADAMTS13-deficiëntie → von Willebrand-multimeren accumuleren; HUS: shiga-toxine beschadigt endotheel; DIC: systemische stollingsactivatie). RBC worden hierdoor letterlijk doorgesneden → schistocyten, hemoglobine vrijgegeven → hoog LDH, laag haptoglobine.', onderscheid:'TTP: pentade = MAHA + trombocytopenie + neurologische uitval + nierfalen + koorts. HUS (typisch): kind na Campylobacter/EHEC O157, overheersend nierfalen. HELLP: zwangerschap, leverstoornissen, hypertensie. DIC: onderliggende oorzaak (sepsis, maligniteit), stollingstesten afwijkend (PT/APTT verlengd).', therapie:'TTP: plasmaferese SPOEDMATIG (verwijdert Von Willebrand-multimeren + suppleer ADAMTS13). Caplacizumab als adjuvans. HUS atypisch: eculizumab. HELLP: bevalling is definitieve behandeling. DIC: onderliggende oorzaak behandelen + stollingsfactoren suppleren.' } },

  // ── Cardiologie (nieuw) ──
  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man 68j komt met hartkloppingen. ECG: geen P-toppen, onregelmatig QRS-ritme met freq 110/min. Wat is de diagnose?',
    a:['Atriumflutter','Atriumfibrilleren','Ventriculaire tachycardie','AV-nodale re-entry tachycardie'], c:1,
    ex:'Atriumfibrilleren: chaotische atriumactiviteit → geen P-toppen, absoluut onregelmatig QRS. Risico: trombus in linker hartoor → embolie/beroerte. Behandeling: frequentiecontrole (bètablokker/digoxine) + anticoagulatie indien CHA₂DS₂-VASc ≥2.',
    wiki: {
      kern: 'Atriumfibrilleren (AF) is het meest voorkomende hartritmestoornis. De atriums vuren chaotisch (400-600/min) in plaats van gecoördineerd — daardoor geen P-toppen op het ECG en een volledig onregelmatig QRS-ritme.',
      mechanisme: 'Meerdere kleine elektrische golfjes cirkelen door de atriums (re-entry). Dit voorkomt een geordende samentrekking. Het gevolg: de atriums bewegen niet echt meer — bloed blijft stilstaan in het linker hartoor en kan stolsels vormen.',
      onderscheid: 'Atriumflutter: wél regelmatig, zaagvormige flutter-golven (~300/min), vaak 2:1 geleiding → HR ~150. Ventriculaire tachycardie: breed QRS, levensbedreigend. AVNRT: plots begin/eind, normaal QRS, jonge patiënten.',
      therapie: 'Twee doelen: (1) Frequentiecontrole met bètablokker of digoxine. (2) Anticoagulatie bij CHA₂DS₂-VASc ≥2 (man) of ≥3 (vrouw) — DOAC (bijv. apixaban) boven warfarine. Rytmecontrole (cardioversie) bij symptomatische patiënten.',
    } },

  { type:'truefalse', domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Bij atriumfibrilleren met een CHA₂DS₂-VASc score van 0 bij een man is anticoagulatie geïndiceerd.',
    c:false, ex:'NIET WAAR. CHA₂DS₂-VASc 0 (man) = laag risico → geen anticoagulatie aanbevolen. Score telt: hartfalen, hypertensie, leeftijd ≥75 (2 punten), diabetes, beroerte/TIA (2 punten), vaatziekte, leeftijd 65-74, vrouwelijk geslacht.' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 55j met kortademigheid bij inspanning, orthopneu en dikke enkels. Echo: EF 35%, vergrote LV. Wat is de eersterangbehandeling?',
    a:['Alleen diuretica','ACE-remmer + bètablokker','Digoxine monotherapie','Calciumantagonist'], c:1,
    ex:'Hartfalen met verminderde EF (HFrEF): ACE-remmer (of ARB/ARNI) + bètablokker verminderen mortaliteit. Diuretica verlichten symptomen. Digoxine alleen bij symptoomcontrole. Spironolacton toevoegen bij aanhoudende klachten.',
    wiki: {
      kern: 'Hartfalen met verminderde ejectiefractie (HFrEF, EF <40%) betekent dat het hart niet genoeg kracht heeft om bloed rond te pompen. Gevolg: vocht hoopt op in de longen (orthopneu, nachtelijk hoesten) en de benen (oedeem).',
      mechanisme: 'Het hart compenseert via het RAAS-systeem (meer zout/water vasthouden) en adrenaline (sneller kloppen). Op korte termijn helpt dit, maar op lange termijn beschadigt het het hart verder — een vicieuze cirkel. ACE-remmers en bètablokkers doorbreken deze cirkel.',
      onderscheid: 'HFpEF (EF behouden, ≥50%): hart pompt wel krachtig maar is te stijf — vult slecht. Ander mechanisme, minder bewezen medicatie. Acuut longoedeem: levensbedreigende vorm van HFrEF, behandel met zuurstof + furosemide IV + nitroglycerine.',
      therapie: 'Vierpijlertherapie: (1) ACE-remmer/ARNI, (2) bètablokker, (3) MRA (spironolacton), (4) SGLT2-remmer (bijv. dapagliflozine). Elk van de vier vermindert mortaliteit. Diuretica verlichten klachten maar verlengen leven niet.',
    } },

  { type:'truefalse', domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Bij een STEMI moet PCI (dotterbehandeling) idealiter binnen 90 minuten na eerste medisch contact plaatsvinden.',
    c:true, ex:'WAAR. "Door-to-balloon time" <90 min is de richtlijn. Hoe sneller, hoe meer myocard gered. Alternatief: trombolyse binnen 30 min als PCI niet tijdig beschikbaar is (deur-tot-naald <30 min).' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man 35j na griep: scherpe precordiale pijn, erger liggend, beter voorovergebogen. ECG: saddle-shape ST-elevatie in meerdere afleidingen. Diagnose?',
    a:['STEMI','Pericarditis','Longembolie','Aortadissectie'], c:1,
    ex:'Pericarditis: pleuritische pijn (scherp, houdingsafhankelijk), pericardiaal wrijfgeruis, diffuse saddle-shape ST-elevatie. Oorzaak vaak viraal. Behandeling: ibuprofen + colchicine. Complicatie: pericarditamp.',
    wiki: {
      kern: 'Pericarditis is een ontsteking van het hartzakje (pericard). De typische pijn is scherp en pleuritisch: erger bij inademen en platliggen, beter voorovergebogen zitten (vermindert druk op het pericard). Oorzaak is in 80-90% viraal (Coxsackie, EBV, CMV).',
      mechanisme: 'Ontsteking van het pericard → ruwheid van de gladde perikardiale lagen → wrijfgeruis bij auscultatie (kenmerkend!). Als er vocht accumuleert wordt het geruis zachter maar neemt het risico op tamponnade toe. ECG: saddle-shape ST-elevatie diffuus (niet gelokaliseerd zoals STEMI) + PR-depressie.',
      onderscheid: 'STEMI: ST-elevatie gelokaliseerd per coronairgebied, reciproke afwijkingen, ernstige pijn met uitstraling, geen houdinssafhankelijkheid. Longembolie: pleuritische pijn + dyspneu, normale of S1Q3T3 op ECG. Myocarditis: ook post-viraal maar troponine sterk verhoogd, pijn minder uitgesproken.',
      therapie: 'Ibuprofen 600 mg 3x/dag + colchicine 0,5 mg 2x/dag gedurende 3 maanden (voorkomt recidieven). Rust bij actieve pericarditis. Recidief: corticosteroïden als NSAID faalt. Cave: tamponnade → pericardiocentese spoedmatig. Bij bacteriële oorzaak: antibiotica + drainage.',
    } },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Patiënt met bekende pericarditis: acuut in shock, halsvenen gestuwd, gedempte harttonen. Wat is de diagnose?',
    a:['Pneumothorax','Longembolie','Harttamponnade','Hartfalen'], c:2,
    ex:'Harttamponnade: Beck\'s triade = hypotensie + gestuwd halsvenen + gedempte harttonen. Vocht in pericardzak comprimeert het hart. Echo: echo-vrije ruimte + diastolische collaps rechterventrikels. Behandeling: pericardiocentese spoedmatig.' },

  { type:'truefalse', domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'ACE-remmers zijn gecontra-indiceerd bij hartfalen met verminderde ejectiefractie (HFrEF).',
    c:false, ex:'NIET WAAR. ACE-remmers zijn juist eerstekeusmiddelen bij HFrEF — ze verminderen mortaliteit. Contra-indicaties zijn: bilaterale nierslagadervernauwing, zwangerschap, en overgevoeligheid (bijv. angio-oedeem).' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 72j: systolisch geruis graad 4/6 rechts parasternaal, uitstralend naar hals, syncope bij inspanning, kortademigheid. Echo: AV-oppervlak 0.7 cm². Diagnose?',
    a:['Mitralisinsufficiëntie','Hypertrofische cardiomyopathie','Ernstige aortastenose','Tricuspidalisinsufficiëntie'], c:2,
    ex:'Ernstige aortastenose: AV-oppervlak <1.0 cm², klassieke triade = angina + syncope + kortademigheid. Systolisch uitdrijvingsgeruis rechts parasternaal. Behandeling: TAVI of chirurgische klepvervanging.' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'ECG: PR-interval steeds langer wordend tot een QRS uitvalt, daarna reset. Welk geleidingsstoornis?',
    a:['Eerstegraads AV-blok','Wenckebach (tweedegraads type I)','Mobitz type II AV-blok','Derdegraads AV-blok'], c:1,
    ex:'Wenckebach (Mobitz type I): PR progressief verlengd → QRS uitval → reset. Meestal benigne, vaak bij inferiorwandinfarct. Mobitz II: plotse QRS-uitval zonder PR-verlenging — gevaarlijker, kan leiden tot totaal blok.' },

  { type:'truefalse', domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Statines verlagen LDL-cholesterol door HMG-CoA-reductase te remmen.',
    c:true, ex:'WAAR. HMG-CoA-reductase is het sleutelenzym in cholesterolsynthese in de lever. Remming → minder intracellulair cholesterol → meer LDL-receptoren → meer LDL-opname uit bloed. Bijwerking: myopathie (check CK bij spierpijn).' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Jongeman 22j valt flauw op het sportveld. Vader overleed plotseling op 38j. Systolisch geruis dat toeneemt bij Valsalva. Diagnose?',
    a:['Aortastenose','Hypertrofische cardiomyopathie (HCM)','Mitralisklepprolaps','Wolff-Parkinson-White'], c:1,
    ex:'HCM: asymmetrische septumhypertrofie, autosomaaldominant. Geruis neemt toe bij Valsalva (minder vulling → meer obstructie). Risico plotse hartdood bij jongeren. Behandeling: bètablokker, ICD bij hoog risico, sport verboden.' },

  { type:'lab', domain:'cardio', dl:'Cardiologie',
    q:'Man 52j: pijn op de borst 3 uur geleden. Eerste troponine normaal. Wat is het juiste beleid?',
    a:['Ontslaan: eerste troponine normaal','Herhaal troponine na 3-6 uur','Direct PCI starten','Alleen ECG herhalen'], c:1,
    ex:'Troponine stijgt pas 3-6 uur na infarct. Eén normale waarde sluit NSTEMI niet uit. Herhaal na 3-6 uur (of 1-2 uur met hoog-sensitief troponine). Combineer met ECG en kliniek. Laat de patiënt nooit te vroeg gaan!' },

  { type:'lab', domain:'cardio', dl:'Cardiologie',
    q:'Welke biomarker is het meest specifiek verhoogd bij acuut myocardinfarct?',
    a:['CK-MB','Myoglobine','Troponine I of T','LDH'], c:2,
    ex:'Troponine I en T zijn hartspecifiek en de gouden standaard voor AMI. CK-MB is minder specifiek (ook in skeletspier). Myoglobine stijgt vroeg maar is niet cardiospecifiek. Hoog-sensitief troponine detecteert zelfs kleine infarcten.' },

  { type:'truefalse', domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Een droge hoest is een bekende bijwerking van ACE-remmers.',
    c:true, ex:'WAAR. ACE-remmers remmen ook de afbraak van bradykinine → accumulatie → prikkeling van de hoestreflex. Komt voor bij 10-15% van patiënten. Oplossing: overstappen op ARB (bijv. valsartan), die bradykinine niet ophopen.' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man 62j: pijn in de kuit bij lopen, verdwijnt in rust, rookt 30 jaar. ABI (enkel-arm-index) = 0.65. Diagnose?',
    a:['Diepe veneuze trombose','Perifeer arterieel vaatlijden','Spataderen','Diabetische neuropathie'], c:1,
    ex:'PAV: claudicatio intermittens. ABI <0.9 = PAV, <0.4 = kritisch. Oorzaak: atherosclerose. Risicofactoren: roken, diabetes, hypertensie. Behandeling: stoppen met roken, looptraining, plaatjesremmer, statine.' },

  { type:'pharma', domain:'cardio', dl:'Cardiologie',
    q:'Wat is het werkingsmechanisme van aspirine als bloedplaatjesremmer?',
    a:['Blokkeert ADP-receptor P2Y12','Remt COX-1 irreversibel → minder tromboxaan A2','Blokkeert glycoproteïne IIb/IIIa','Activeert plasminogeen'], c:1,
    ex:'Aspirine acetyleert COX-1 irreversibel → geen TXA2-synthese → bloedplaatjes aggregeren minder. Effect duurt levenslang van het plaatje (7-10 dagen). Hoge dosis = anti-inflammatoir. Lage dosis (80-100mg) = antithrombotisch.' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man 60j met hypertensie: plotse verscheurende pijn tussen schouderbladen, RR rechts 160/90, links 120/80. CT: dubbelloop aorta. Diagnose?',
    a:['STEMI','Longembolie','Aortadissectie','Aorta-aneurysma ruptuur'], c:2,
    ex:'Aortadissectie: intima scheurt → bloed in aortawand. Klassiek: plotse verscheurende pijn + bloeddruksverschil tussen armen. Type A (opstijgend): chirurgie spoedmatig. Type B (dalend): medisch met bètablokker + bloeddrukcontrole.' },

  { type:'truefalse', domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Amiodaron kan zowel hypo- als hyperthyreoïdie veroorzaken.',
    c:true, ex:'WAAR. Amiodaron bevat 37% jodium. Kan hypothyreoïdie veroorzaken (jodium remt schildklierhormoonproductie, Wolff-Chaikoff-effect) maar ook hyperthyreoïdie (jodiumoverload triggert autonome productie). Monitor TSH regelmatig.' },

  // ── Neurologie (nieuw) ──
  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 70j: plotse uitval van rechterarm en -been, dysartrie, na 45 minuten volledig hersteld. Diagnose?',
    a:['Insulte (CVA)','TIA','Epileptische aanval','Migraine met aura'], c:1,
    ex:'TIA: focale neurologische uitval <24 uur (meestal <1 uur) door tijdelijke ischemie. MRI-DWI kan toch kleine infarcten tonen. Hoog risico op CVA in komende 48 uur — ABCD²-score voor risicostratificatie. Spoed behandeling: aspirine + statine + bloeddrukcontrole.' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Vrouw 45j: ergste hoofdpijn van haar leven, plotseling ontstaan, nekstijfheid, lichtschuw. CT hoofd normaal. Wat nu?',
    a:['Toedienen paracetamol en afwachten','Lumbaalpunctie uitvoeren','MRI hersenen aanvragen','Direct antibiotica starten zonder verder onderzoek'], c:1,
    ex:'Thunderclap hoofdpijn + nekenrigiditeit → altijd subarachnoïdale bloeding uitsluiten. CT mist 2-5% SAB in eerste uren. Lumbaalpunctie: xanthochromie (geel vocht) of verhoogde erytrocyten na 12 uur bevestigt SAB. Oorzaak: aneurysmaruptuur.' },

  { type:'truefalse', domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Bij een ischemisch CVA mag trombolyse met alteplase gegeven worden tot 4,5 uur na begin van de klachten.',
    c:true, ex:'WAAR. Alteplase trombolyse mag tot 4,5 uur na symptoomonset (mits geen contra-indicaties). Eerder = beter: "time is brain". Contra-indicaties: recent chirurgie, bloedingsdiathese, bloeddruk >185/110, bloedglucose <2.7 of >22.' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 25j: tonisch-clonische aanval 3 minuten, daarna verward en slaperig. Geen koorts. Eerste aanval. Meest waarschijnlijke diagnose?',
    a:['Meningitis','Epilepsie','Hypoglykemie','Psychogene aanval'], c:1,
    ex:'Epilepsie: tonisch-clonische aanval + postictale fase (verwardheid, vermoeidheid). Eerste aanval: EEG en MRI voor structurele oorzaak. Antiepilepticum bij twee aanvallen of verhoogd recidiefrisico. Rijverbod geldt tot 1 jaar aanvalsvrij.' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Vrouw 30j: episodisch dubbelzijdige armen en benen zwak, ooghangend (ptosis), erger aan einde van dag. Verbetering na ijs op oog. Diagnose?',
    a:['Multiple sclerose','Myasthenia gravis','Amyotrofische lateraalsclerose','Guillain-Barré'], c:1,
    ex:'MG: auto-antilichamen tegen acetylcholinereceptor → neuromusculaire transmissie gestoord. Klassiek: vermoeibare zwakte, ptosis, wisselend beloop. IJstest: kou verbetert transmissie tijdelijk. Behandeling: pyridostigmine, immunosuppressie, thymectomie.',
    wiki: {
      kern: 'Myasthenia gravis is een auto-immuunziekte waarbij antilichamen de verbinding tussen zenuw en spier blokkeren. Het kenmerk: spierzwakte die verergert bij gebruik en verbetert na rust. Dit verklaart de typische "einde van de dag"-verslechtering.',
      mechanisme: 'Antilichamen binden de acetylcholinereceptor (AChR) op de spier → minder receptoren beschikbaar → spiervezels reageren steeds minder op signalen. Bij de ijstest verbetert de AChR-functie tijdelijk omdat kou de antilichaamwerking remt.',
      onderscheid: 'MS: centraal zenuwstelsel, demyelinisatie, sensibiliteit ook aangedaan. Lambert-Eaton (LEMS): ook neuromusculair, maar zwakte verbetert juist bij herhaald gebruik — vaak paraneoplastisch bij longkanker. ALS: ook motorisch, maar irreversibel en met fasciculaties.',
      therapie: 'Stap 1: pyridostigmine (anticholinesterase — meer ACh beschikbaar). Stap 2: immunosuppressie (prednisolon, azathioprine). Thymectomie bij thymoom of jonge patiënten. Bij crisis: IVIG of plasmaferese. Vermijd bepaalde antibiotica (aminoglycosiden — verergeren MG).',
    } },

  { type:'truefalse', domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Multiple sclerose tast zowel het centraal als het perifeer zenuwstelsel aan.',
    c:false, ex:'NIET WAAR. MS is een demyeliniserende ziekte van het centraal zenuwstelsel (hersenen + ruggenmerg). Het perifeer zenuwstelsel wordt gespaard. Kenmerk: laesies gescheiden in tijd en plaats. Diagnose: MRI + klinisch beeld + liquoronderzoek.' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 65j: progressief geheugenverlies, persoonlijkheidsverandering, 3 jaar klachten. MRI: diffuse corticale atrofie temporopariëtaal. Diagnose?',
    a:['Vasculaire dementie','Alzheimer','Lewy-body dementie','Frontotemporale dementie'], c:1,
    ex:'Alzheimer: meest voorkomende dementievorm (60-70%). Pathologie: amyloïd-plaques + tau-neurofibrillaire klitten. Temporopariëtale atrofie op MRI. Vroeg: geheugenproblemen. Later: apraxie, agnosie. Behandeling: cholinesteraseremmers (symptomatisch).',
    wiki: {
      kern: 'Alzheimer is de meest voorkomende oorzaak van dementie (60-70%). Het begint sluipend met vergeetachtigheid voor recente gebeurtenissen en verloopt progressief over jaren. De hersenen krimpen zichtbaar, vooral in het geheugen- en oriëntatiegebied (temporopariëtaal).',
      mechanisme: 'Twee eiwitten slaan mis: (1) bèta-amyloïd hoopt op als plaques tussen zenuwcellen en verstoort communicatie, (2) tau-eiwit klontert binnen neuronen als neurofibrillaire klitten. Samen leiden ze tot neuronsterfte. De acetylcholine-aanmaak daalt sterk — vandaar de behandeling.',
      onderscheid: 'Vasculaire dementie: plots begin of trapsgewijs verloop, cardiovasculaire risicofactoren, witte stof afwijkingen op MRI. Lewy-body dementie: visuele hallucinaties, parkinsonisme, slaap-REM-stoornissen — extreem gevoelig voor antipsychotica. Frontotemporale dementie: jong begin (<65j), persoonlijkheidsverandering vóór geheugenklachten, taaluitval.',
      therapie: 'Cholinesteraseremmers (donepezil, rivastigmine) verhogen acetylcholine — symptoomverlichting, geen genezing. Memantine (NMDA-remmer) bij matige-ernstige Alzheimer. Nieuw: lecanemab/donanemab (anti-amyloïd antilichamen) vertraagt ziekte bij vroege Alzheimer.',
    } },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Vrouw 35j: plotse eenzijdige visusdaling, pijn bij oogbewegingen, kleur ziet minder helder. MRI: witte stof afwijking in nervus opticus. Diagnose?',
    a:['Glaucoom','Retina-ablatio','Neuritis optica','Migraine met aura'], c:2,
    ex:'Neuritis optica: inflammatie van de oogzenuw, vaak eerste uiting van MS. Pijn bij oogbewegingen + unilateraal visusverliess + verminderde kleurwaarneming. Behandeling: IV methylprednisolon versnelt herstel. MRI-hersenen verplicht.' },

  { type:'pharma', domain:'neuro', dl:'Neurologie',
    q:'Welk medicijn is eerstekeus bij gegeneraliseerde tonisch-clonische epilepsie?',
    a:['Carbamazepine','Natriumvalproaat','Fenytoïne','Gabapentine'], c:1,
    ex:'Valproaat is breed-spectrum antiepilepticum: werkt bij gegeneraliseerde én partiële aanvallen. Remt Na-kanalen en verhoogt GABA. Cave: teratogeen — absoluut vermijden bij vrouwen in vruchtbare leeftijd zonder adequate anticonceptie. Alternatief: levetiracetam.' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 55j: progressieve zwakte benen, later armen, fasciculaties, geen sensibiliteitsstoornissen, hyperreflexie. Diagnose?',
    a:['Guillain-Barré syndroom','Multiple sclerose','Amyotrofische lateraalsclerose (ALS)','Myasthenia gravis'], c:2,
    ex:'ALS: degeneratie van centrale én perifere motorische neuronen. Combinatie UMN (hyperreflexie, spasticiteit) + LMN (fasciculaties, atrofie) zónder sensibiliteitsverlies. Progressief, fataal gemiddeld 3-5 jaar. Riluzol verlengt overleving licht.' },

  { type:'truefalse', domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Guillain-Barré syndroom begint typisch in de armen en verspreidt zich naar de benen.',
    c:false, ex:'NIET WAAR. GBS begint typisch in de benen (ascending paralysis) en verspreidt zich omhoog. Oorzaak: auto-immuun demyelinisatie perifere zenuwen, vaak na infectie (Campylobacter, CMV). Behandeling: IVIG of plasmaferese. Let op ademhaling!' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 72j: rusttremor rechterhand, stijfheid, traagheid, kleine pasjes. Diagnose?',
    a:['Essentiële tremor','Parkinson','Multisystematrofie','Huntington'], c:1,
    ex:'Parkinson: verlies dopaminerge neuronen in substantia nigra. Klassieke triade: rusttremor (pil-draaibewegingen) + rigiditeit + bradykinesie. Asymmetrisch begin. Behandeling: levodopa (meest effectief). Niet-motorische sympt: depressie, reukstoornissen.',
    wiki: {
      kern: 'Parkinson ontstaat door het progressief afsterven van dopamine-producerende neuronen in de substantia nigra (middenhersenen). Dopamine is nodig voor vloeiende, gecoördineerde bewegingen. Als 70-80% verloren is, verschijnen de symptomen.',
      mechanisme: 'Alfa-synucleine-eiwit klontert samen in Lewy-bodies in de resterende neuronen — dit versnelt de celdood. Waarom dit begint is onduidelijk (genetisch + omgevingsfactoren). De ziekte sluipt: reukproblemen en slaapstoornissen gaan jaren vooraf aan de motorische klachten.',
      onderscheid: 'Essentiële tremor: tremor bij bewegen (niet in rust), geen rigiditeit/bradykinesie, verbetert met alcohol, familiegeschiedennis. MSA/PSP: Parkinson-plus syndromen, reageren slecht op levodopa, vallen vroeg in het beloop. DLB (Lewy-body dementie): parkinsonisme + dementie + hallucinaties tegelijk.',
      therapie: 'Levodopa + carbidopa is het meest effectief (converteert naar dopamine in hersenen). Dopamine-agonisten (pramipexol) als alternatief bij jongeren. Later: diepe hersenstimulatie (DBS) bij therapieresistente tremor. Niet-motorisch: antidepressiva, slaapbegeleiding, fysiotherapie.',
    } },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Vrouw 40j: migraine-aanvallen, nu ook zwakte linkerarm tijdens aanval. Wat is de term hiervoor?',
    a:['Aura zonder hoofdpijn','Hemiplegische migraine','Basilaire migraine','TIA'], c:1,
    ex:'Hemiplegische migraine: zeldzame vorm waarbij motorische uitval optreedt als aurasymptoom. Belangrijk: eerst TIA/CVA uitsluiten! Familiaire vorm: CACNA1A-genmutatie. Triptanen en ergotaminen gecontra-indiceerd bij hemiplegische migraine.' },

  { type:'lab', domain:'neuro', dl:'Neurologie',
    q:'Liquor: verhoogd eiwit, normaal glucose, lymfocytose, oligoklonale banden aanwezig. Meest waarschijnlijke diagnose?',
    a:['Bacteriële meningitis','Multiple sclerose','Virale meningitis','Subarachnoïdale bloeding'], c:1,
    ex:'Oligoklonale banden in liquor (niet in serum) zijn kenmerkend voor MS — aanwezig bij >95%. Virale meningitis: lymfocytose + normaal eiwit + normaal/licht verlaagd glucose. Bacterieel: neutrofiele pleiocytose + sterk verhoogd eiwit + laag glucose.' },

  { type:'truefalse', domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Bij bacteriële meningitis moet lumbaalpunctie altijd worden uitgesteld tot na CT-scan.',
    c:false, ex:'NIET WAAR. Antibiotica mogen NIET worden uitgesteld voor CT. Start direct antibiotica als er tekenen van verhoogde hersendruk zijn (papiloedeem, bewustzijnsdaling) en doe dan CT. Anders: LP eerst. Uitstel antibiotica verhoogt mortaliteit significant.' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Kind 8j: plotse bewusteloosheid, starende blik 10 seconden, daarna normaal. Geen tonisch-clonische bewegingen. EEG: 3Hz spike-wave. Diagnose?',
    a:['Grote aanval (tonisch-clonisch)','Absence-epilepsie','Focale epilepsie','Syncope'], c:1,
    ex:'Absence-epilepsie: korte bewustzijnsonderbreking, geen postictale fase, typisch 3Hz generalized spike-wave op EEG. Begint op kinderleeftijd, vaak spontane remissie. Behandeling: ethosuximide of valproaat. Geen rijverbod tot 1 jaar vrij.' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 50j: acuut eenzijdige aangezichtsverlamming, ook voorhoofd aangedaan, geen andere uitval. Diagnose?',
    a:['Centraal CVA','Bells palsy (perifere facialisparese)','TIA','Hersentumor'], c:1,
    ex:'Bells palsy: perifere n.facialis-parese → ook voorhoofd aangedaan (centraal CVA: voorhoofd gespaard door bilaterale innervatie). Oorzaak: vaak HSV-reactivatie. Behandeling: prednisolon binnen 72 uur + aciclovir. Prognose: 80% volledig herstel.' },

  { type:'truefalse', domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Dopamine kan de bloed-hersenbarrière passeren en wordt daarom direct als medicijn gegeven bij Parkinson.',
    c:false, ex:'NIET WAAR. Dopamine passeert de bloed-hersenbarrière NIET. Daarom geeft men levodopa (precursor), dat wel passeert en in het brein omgezet wordt. Levodopa wordt gecombineerd met carbidopa/benserazide (perifere decarboxylaseremmer) om bijwerkingen te verminderen.' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
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
  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Welk antibioticum werkt door de celwandsynthese van bacteriën te remmen?',
    a:['Amoxicilline','Ciprofloxacine','Doxycycline','Azithromycine'], c:0,
    ex:'Bètalactam-antibiotica (penicillines, cefalosporines) remmen de transpeptidases (PBPs) die peptidoglycaan crosslinks vormen in de bacteriële celwand. Bacteriën zwellen op en lyseren. Resistentie: bètalactamase-productie of PBP-mutaties.' },

  { type:'truefalse', domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Metformine is gecontra-indiceerd bij nierfunctiestoornissen vanwege het risico op lactaatacidose.',
    c:true, ex:'WAAR. Metformine remt mitochondriaal complex I → verhoogde lactaatproductie. Bij nierfalen stapelt metformine op → toxisch. Stop bij eGFR <30, wees voorzichtig bij <45. Tijdelijk stoppen bij jodiumhoudend contrast of ernstige ziekte.' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Welk medicijn geef je bij een opiaat-overdosis met bewusteloosheid en ademdepressie?',
    a:['Flumazenil','Naloxon','Atropine','Physostigmine'], c:1,
    ex:'Naloxon: competitieve opiaat-antagonist op μ-receptor. Keert ademdepressie snel om. Werkt korter dan opiaten → herhaling of infuus nodig. Flumazenil is antidotum voor benzodiazepinen. Cave: bij opiaat-afhankelijkheid → acute onttrekking.' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Patiënt gebruikt warfarine en start met fluconazol (schimmelinfectie). Wat verwacht je?',
    a:['Warfarine-effect vermindert','Warfarine-effect neemt toe → bloedingsrisico','Geen interactie','Fluconazol werkt niet meer'], c:1,
    ex:'Fluconazol remt CYP2C9, het enzym dat warfarine afbreekt → warfarine stapelt op → INR stijgt → bloedingsrisico. Altijd INR controleren bij toevoegen of stoppen van CYP-remmers/-inductoren. Andere CYP2C9-remmers: amiodaron, metronidazol.' },

  { type:'truefalse', domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Paracetamol-overdosis veroorzaakt leverschade door accumulatie van het toxisch metaboliet NAPQI.',
    c:true, ex:'WAAR. Normaal: NAPQI snel geneutraliseerd door glutathion. Overdosis: glutathion uitgeput → NAPQI bindt levercellen → necrose. Antidotum: N-acetylcysteïne (NAC) herstelt glutathion. Begin symptomen pas na 24-72u — geef NAC niet te laat!' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Welk diureticum remt het Na/K/2Cl-cotransporter in de lis van Henle?',
    a:['Hydrochloorthiazide','Furosemide','Spironolacton','Amiloride'], c:1,
    ex:'Lisdiuretica (furosemide): remmen NKCC2 in de opgaande lis → krachtige natriurese en diurese. Bijwerkingen: hypokaliëmie, hyponatriëmie, hypomagnesemie, ototoxiciteit (hoge dosis). Indicaties: acuut longoedeem, hartfalen, hypercalciëmie.' },

  { type:'diagnose', domain:'pharma', dl:'Farmacologie',
    q:'Man neemt teveel van zijn slaapmiddel (benzodiazepine). Hij is slaperig maar ademt goed. Welk antidotum is beschikbaar?',
    a:['Naloxon','Flumazenil','N-acetylcysteïne','Atropine'], c:1,
    ex:'Flumazenil: competitieve GABA-A-antagonist → keert benzodiazepine-effecten om. Korte werking (30-60 min) → herhaling nodig. Cave: bij chronisch gebruik → onttrekkingsconvulsies. Naloxon is het antidotum voor opiaten, niet benzodiazepinen.' },

  { type:'truefalse', domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Bèta-1-selectieve bètablokkers (bijv. metoprolol) zijn volledig veilig bij astma.',
    c:false, ex:'NIET WAAR. Bèta-1-selectiviteit is relatief en dosisafhankelijk. Bij hogere dosis ook bèta-2-blokkade → bronchospasme mogelijk. Bij ernstig astma: vermijd bètablokkers. Bij COPD of milde astma: voorzichtig gebruik kan wel, maar monitor nauwkeurig.' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Welk medicijn verhoogt het risico op rhabdomyolyse als het gecombineerd wordt met een statine?',
    a:['Amoxicilline','Omeprazol','Ciclosporine','Metformine'], c:2,
    ex:'Ciclosporine remt CYP3A4 en OATP1B1 transporters → statineconcentraties stijgen → spiercel-toxiciteit (rhabdomyolyse). Andere interacties: fibraten + statine = verhoogd rhabdomyolysericico. Symptomen: spierpijn, zwakte, bruine urine, hoog CK.' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Welk mechanisme heeft morfine bij pijnbestrijding?',
    a:['Remt COX-1 en COX-2','Bindt aan μ-opiaat receptor en vermindert pijnprikkelgeleiding','Blokkeert NMDA-receptor','Verhoogt serotonine in synaps'], c:1,
    ex:'Morfine bindt μ-(mu-)opiaatreceptoren in ruggenmerg en hersenen → verminderde pijnprikkelgeleiding + pijnbeleving. Bijwerkingen: obstipatie, misselijkheid, ademdepressie, sedatie. Tolerantie en afhankelijkheid bij langdurig gebruik.' },

  { type:'truefalse', domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Tetracyclines (doxycycline) zijn veilig bij kinderen jonger dan 8 jaar.',
    c:false, ex:'NIET WAAR. Tetracyclines binden aan calciumionen in bot en tanden → verkleuring en tandglazuur-defecten bij kinderen <8 jaar. Uitzondering: ernstige indicaties zoals rickettsia-infecties. Vermijd ook in zwangerschap (nadelen voor foetale botvorming).' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Welke protonpompremmer (PPI) heeft de meeste klinisch relevante CYP2C19-interacties?',
    a:['Pantoprazol','Rabeprazol','Omeprazol','Esomeprazol'], c:2,
    ex:'Omeprazol is de sterkste CYP2C19-remmer onder de PPIs → kan effect van clopidogrel verminderen (clopidogrel is prodrug die CYP2C19 nodig heeft voor activering). Pantoprazol heeft minimale CYP-interacties — voorkeur bij clopidogrel-gebruik.' },

  { type:'truefalse', domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Heparine werkt direct als antistollingsmiddel; vitamine K-antagonisten (warfarine) hebben een vertraagd effect.',
    c:true, ex:'WAAR. Heparine activeert antitrombine III → onmiddellijke remming van trombine en factor Xa. Warfarine remt vitamine K-afhankelijke factoren (II, VII, IX, X) — maar bestaande factoren moeten eerst afgebroken worden → effect pas na 3-5 dagen volledig.' },

  { type:'diagnose', domain:'pharma', dl:'Farmacologie',
    q:'Patiënt met jicht krijgt een acute aanval. Welk medicijn is eerstekeus voor de acute aanval?',
    a:['Allopurinol','Colchicine of NSAID','Probenecide','Furosemide'], c:1,
    ex:'Acute jicht: NSAID (naproxen/indomethacine) of colchicine voor pijnstilling en ontstekingsremming. Allopurinol (xanthine-oxidaseremmer) voor PREVENTIE van aanvallen — nooit starten tijdens acute aanval, verergert acute episode. Corticosteroïden als alternatief.' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Welk antibioticum mag NIET gecombineerd worden met alcohol vanwege een ernstige disulfiram-achtige reactie?',
    a:['Amoxicilline','Metronidazol','Doxycycline','Azithromycine'], c:1,
    ex:'Metronidazol remt aldehydedehydrogenase → bij alcoholgebruik: ophoping acetaldehyde → flushing, misselijkheid, tachycardie, hypotensie. Zelfde reactie met tinidazol. Waarschuw patiënt: geen alcohol tijdens en 48 uur na kuur.' },

  { type:'truefalse', domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'SSRIs (selectieve serotonineheropnameremmers) werken onmiddellijk: verbetering van depressie binnen 1-3 dagen.',
    c:false, ex:'NIET WAAR. SSRIs verbeteren depressieve klachten pas na 2-4 weken. De synaptische serotonineverhoging is direct, maar het therapeutische effect vereist neuroplastische aanpassingen. Bijwerkingen (misselijkheid, angst) kunnen eerder optreden. Doorzetten is belangrijk!' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Een patiënt met een convulsie in de ambulance. Welk medicijn geef je IV als eerste stap?',
    a:['Fenytoïne','Valproaat','Lorazepam of diazepam','Levetiracetam'], c:2,
    ex:'Status epilepticus: benzodiazepinen (lorazepam IV, of diazepam rectaal) zijn eerste stap — snel werkend, versterken GABA-signaal. Als aanval niet stopt na 5 min: tweede middel (levetiracetam, valproaat, fenytoïne). Na 30 min: anesthesie overwegen.' },

  // ── Infectiologie (nieuw) ──
  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Vrouw 24j: pijn bij plassen, frequentie, geen koorts. Urine: leukocyturie, nitriet positief. Diagnose?',
    a:['Pyelonefritis','Ongecompliceerde urineweginfectie','Chlamydia-infectie','Interstitiële cystitis'], c:1,
    ex:'Ongecompliceerde UWI (cystitis): dysurie + frequentie + leukocyturie + nitriet (gramnegatieve bacteriën). Geen koorts/flankpijn → geen pyelonefritis. Behandeling: nitrofurantoïne 5d of fosfomycine 1d. Niet: onnodig ciprofloxacine (resistentie!). ' },

  { type:'truefalse', domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'MRSA staat voor methicilline-resistente Staphylococcus aureus en is resistent tegen alle bètalactam-antibiotica.',
    c:true, ex:'WAAR. MRSA bezit het mecA-gen → gewijzigd PBP2a → bètalactams binden niet meer. Dus resistent tegen penicillines, cefalosporines én carbapenems. Behandeling: vancomycine of linezolid. Isolatiemaatregelen vereist in ziekenhuis.' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Man 35j na tandartsbehandeling: koorts 39°C, nieuw hartgeruis, hematurie. Echo hart: vegetatie op mitralisklep. Diagnose?',
    a:['Reumatische koorts','Infectieuze endocarditis','Myocarditis','Pericard­itis'], c:1,
    ex:'Endocarditis: bacteriële vegetaties op hartkleppen. Duke-criteria: koorts + vegetatie op echo + bacteriëmie. Oorzaken: Streptococcus viridans (tandartsbehandeling), Staphylococcus aureus (IV-drugsgebruikers). Behandeling: langdurig IV antibiotica, soms chirurgie.' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Kind 5j: keelpijn, koorts, rode keel met exsudaat, pijnlijke halslymfklieren. Snelle streptokokkentest positief. Behandeling?',
    a:['Afwachten, verdwijnt vanzelf','Amoxicilline 10 dagen','Ciprofloxacine 5 dagen','Azithromycine 1 dag'], c:1,
    ex:'Groep A Streptokokkenfaryngitis: amoxicilline 10 dagen (penicilline V alternatief). Doel: voorkomen reumatische koorts (hart/gewrichtscomplicatie). Bij penicillineallergie: erythromycine/azithromycine. Niet: antibiotica bij virale keelontsteking (50-80%).' },

  { type:'truefalse', domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Influenza wordt veroorzaakt door een DNA-virus.',
    c:false, ex:'NIET WAAR. Influenza is een RNA-virus (orthomyxovirus). Hoge mutatiegraad door RNA-polymerase zonder proofreading → antigene drift (kleine mutaties jaarlijks) en shift (hersortering segmenten → pandemie). Vaccin jaarlijks bijgewerkt.' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Patiënt met HIV, CD4 50 cellen/μL: hoest, koorts, nachtelijk zweten. Röntgen thorax: bilaterale perihilaire infiltraten. Diagnose?',
    a:['Bacteriële pneumonie','Pneumocystis jirovecii pneumonie (PCP)','Tuberculose','Longkanker'], c:1,
    ex:'PCP: meest voorkomende opportunistische infectie bij HIV met CD4 <200. Kenmerk: bilaterale interstitiële infiltraten, hoge LDH, subacuut beloop. Behandeling: cotrimoxazol hoge dosis. Profylaxe bij CD4 <200. LDH-verhoging is kenmerkend.',
    wiki: {
      kern: 'Pneumocystis jirovecii is een schimmel die bij gezonde mensen geen enkel probleem geeft — het immuunsysteem ruimt het op. Maar bij ernstige immuunsuppressie (HIV met CD4 <200, transplantatiepatiënten, hoge-dosis steroïden) kan het een levensbedreigende longontsteking veroorzaken.',
      mechanisme: 'P. jirovecii hecht zich aan longblaasjes (alveoli) en veroorzaakt een interstitiële ontsteking — de ruimte tússen de cellen raakt ontstoken en vult zich met slijm. Dit geeft een diffuus patroon op CT (ground-glass opacities) en een hoog LDH (weefselschade). O₂-saturatie daalt ernstig bij inspanning.',
      onderscheid: 'Bacteriële pneumonie: acuut begin, productieve hoest, lobaire infiltraten. CMV-pneumonie: ook bij CD4 <50, maar andere CT-kenmerken en diagnose via BAL. TBC: apicale cavitaties, lymfadenopathie, langzamer beloop. KS-longbetrokkenheid: Kaposi — huidlaesies aanwezig.',
      therapie: 'Hoge-dosis cotrimoxazol (TMP-SMX) IV gedurende 21 dagen. Bij matige-ernstige PCP (pO₂ <70 mmHg): voeg prednison toe (vermindert inflammatie en mortaliteit). Profylaxe: cotrimoxazol laag-dosis als CD4 <200 — ook bij andere immuunsuppressie.',
    } },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Man 52j terugkomend uit Afrika: koorts met perioden van rillingen, milt vergroot. Bloeduitstrijk: intraerytrocytaire parasiet. Diagnose?',
    a:['Dengue','Malaria','Typhoid','Leptospirose'], c:1,
    ex:'Malaria: Plasmodium-infectie overgedragen door Anopheles-mug. Bloeduitstrijk is gouden standaard. P. falciparum = meest gevaarlijk (hersenmalaria). Behandeling: artemisinine-combinatietherapie. Profylaxe: afhankelijk van bestemming (atovaquon/proguanil, mefloquine).' },

  { type:'truefalse', domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Vancomycine is het middel van keuze bij ernstige Clostridioides difficile-infectie.',
    c:false, ex:'NIET WAAR. Fidaxomicine is nu eerstekeus bij ernstige/recidiverende C. difficile. Orale vancomycine is een alternatief voor ernstige gevallen. Metronidazol alleen bij milde infectie als fidaxomicine/vancomycine niet beschikbaar. GEEN IV metronidazol meer als mono.' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Verpleeghuis: 3 patiënten met plotse waterige diarree na antibioticakuur. Feces-toxinetest positief. Diagnose?',
    a:['Norovirus uitbraak','Clostridioides difficile infectie','Salmonellose','EHEC-infectie'], c:1,
    ex:'C. difficile: na antibiotica (clindamycine, cefalosporines, chinolonen) dysbiose → C.diff overgroei → toxinen A+B → colonschade. Diagnostiek: toxinetest of PCR. Isolatie, contactvoorzorgen, stopzetten triggerende antibiotica.' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Vrouw 28j: koorts, nekstijfheid, fotofobie, positieve Kernig. LP: troebel vocht, PMN-pleocytose, glucose 1.8 mmol/L, eiwit 3.5 g/L. Oorzaak?',
    a:['Virale meningitis','Bacteriële meningitis','Cryptococcus-meningitis','Tuberculeuze meningitis'], c:1,
    ex:'Bacteriële meningitis: PMN-pleocytose + laag glucose (<2.5 of glucose-ratio <0.5) + hoog eiwit + troebel vocht. Oorzaken: N.meningitidis (jongeren), S.pneumoniae (ouderen). SPOED: cefotaxim/ceftriaxon + dexamethason. Elk uur vertraging = meer schade.' },

  { type:'truefalse', domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Het humaan papillomavirus (HPV) vaccin beschermt ook al bestaande HPV-infecties.',
    c:false, ex:'NIET WAAR. HPV-vaccin is profylactisch — het voorkomt nieuwe infecties maar behandelt geen bestaande infecties of pre-cancereuze laesies. Daarom: zo vroeg mogelijk vaccineren (voor seksuele activiteit). Biedt bescherming tegen HPV 16, 18 (en 6, 11 bij 9-valent).' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Man 42j: aanhoudende hoest >3 weken, nachtzweten, gewichtsverlies, hemoptoe. Immuuncompetent. Röntgen: apicale cavitaties. Diagnose?',
    a:['Longkanker','Tuberculose','Sarcoidose','Longabces door aspiratie'], c:1,
    ex:'TBC: Mycobacterium tuberculosis. Klassiek: langdurige hoest, nachtzweten, gewichtsverlies, hemoptoe, apicale cavitaties. Diagnose: sputumkweek (Ziehl-Neelsen), GeneXpert. Isolatie vereist. Behandeling: RIPE (rifampicine + isoniazide + pyrazinamide + ethambutol) 6 maanden.',
    wiki: {
      kern: 'Tuberculose wordt veroorzaakt door Mycobacterium tuberculosis, overgedragen via druppelinfectie. Bij 90% van de besmettingen blijft de infectie latent (immuunsysteem houd het in bedwang). Actieve TBC ontstaat bij immuunsuppressie, ondervoeding of hoge bacteriële belasting.',
      mechanisme: 'De bacterie overleeft in macrofagen door de fagosoom-lysosoom-fusie te blokkeren. Het immuunsysteem vormt granulomen (kleine knobbeljes) om de bacteriën in te kapselen. Bij reactivatie breken granulomen open → longweefsel wordt vernietigd → cavitaties (holten) zichtbaar op röntgen.',
      onderscheid: 'Longkanker: ook gewichtsverlies/hemoptoe maar doorgaans geen koorts/nachtelijk zweten; ouder, roker. Sarcoidose: ook granulomen, maar geen infectie — bilaterale hilus-vergroting, jongere patiënten, positieve ACE. NTM (niet-tuberculeuze mycobacteriën): vergelijkbaar beeld bij immuungecompromitteerden, ander behandelprotocol.',
      therapie: 'RIPE-schema 6 maanden: Rifampicine + Isoniazide + Pyrazinamide + Ethambutol (2 maanden) → daarna alleen RI (4 maanden). Isolatie bij open TBC (aerosol-voorzorgsmaatregelen). Latente TBC: isoniazide profylaxe 6 maanden. Resistente TBC (MDR-TBC): tweede-lijns middelen, minstens 18 maanden.',
    } },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Vrouw na vaginale partus: koorts dag 2, baarmoeder drukpijnlijk, foetor. Diagnose?',
    a:['Urineweginfectie postpartum','Endometritis','Mastitis','Wondinfectie'], c:1,
    ex:'Endometritis: uterusinfectie na bevalling, C-sectie of ingreep. Koorts + drukpijnlijke uterus + foetiede lochia. Verwekkers: gemengd (E.coli, Streptococcen, anaeroben). Behandeling: breedspectrumantibiotica (amoxicilline-clavulaanzuur of clindamycine + gentamicine).' },

  { type:'truefalse', domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Lyme-borreliose wordt overgedragen door de Ixodes-teek en presenteert zich vaak met een erythema migrans.',
    c:true, ex:'WAAR. Borrelia burgdorferi overgedragen door Ixodes ricinus (schapenteek). Erythema migrans: ringvormige uitbreiding rond tekenbeet, >5cm, kenmerkend voor vroege Lyme. Behandeling: doxycycline 10-21d. Late Lyme: artritis, neuro-borreliose.' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Soa-poli: man 25j, pijnloze ulcus op de glans penis, regionale lymfadenopathie. Geen pus. Diagnose?',
    a:['Herpes genitalis','Syfilis (primaire syfilis)','Gonorroe','Chlamydia'], c:1,
    ex:'Primaire syfilis: pijnloos hard ulcus (chancre) door Treponema pallidum. Secundaire syfilis: huiduitslag inclusief handpalmen/voetzolen. TPHA/VDRL voor diagnostiek. Behandeling: benzylpenicilline IM eenmalig. Partnerwaarschuwing verplicht.' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Immuungecompromitteerde patiënt (post-transplantatie): koorts, droge hoest, CT: "halo-teken" rond noduli. Diagnose?',
    a:['PCP','Invasieve aspergillose','CMV-pneumonie','Nocardiose'], c:1,
    ex:'Invasieve aspergillose: Aspergillus fumigatus infecteert longen bij ernstig immuungecompromitteerde patiënten (neutropenie, steroïden). CT: halo-teken (bloeding rondom nodulus). Diagnostiek: galactomannan serum/BAL, CT, biopt. Behandeling: voriconazol.' },

  { type:'truefalse', domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Bij sepsis is het starten van antibiotica de hoogste prioriteit — dit mag nooit wachten op bloedkweken.',
    c:false, ex:'NIET WAAR. Bloedkweken moeten worden afgenomen VOOR antibioticastart (2 sets uit 2 plaatsen) — maar dit mag maximaal enkele minuten duren. Antibiotica moet binnen 1 uur bij septische shock. Prioriteit: bloedkweken snel afnemen, daarna DIRECT antibiotica.' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Patiënt 70j, verpleeghuis: koorts, verwardheid, hematurie. Urine: pyurie, gramnegatieve staven op kweek. Diagnose?',
    a:['Ongecompliceerde cystitis','Urosepsis','Prostatitis','Vaginitis'], c:1,
    ex:'Urosepsis: UWI met systemische tekenen (koorts, tachycardie, hypotensie, verwardheid). Ouderen presenteren atypisch (verwardheid zonder koorts). Verwekker: E. coli (80%). Behandeling: IV breedspectrum antibiotica (cefuroxim, piperacilline-tazobactam), bloedkweken eerst.' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Tiener 16j: keelpijn, moeheid, vergrote lymfklieren, vergrote milt. Atypische lymfocyten op bloeduitstrijk. Diagnose?',
    a:['Streptokokkenfaryngitis','Infectious mononucleosis (EBV)','Leukemie','CMV-infectie'], c:1,
    ex:'Ziekte van Pfeiffer (mononucleosis): EBV-infectie. Klassiek: koorts + keelpijn + lymfadenopathie + splenomegalie. Atypische lymfocyten, positieve monospot-test. Geef GEEN amoxicilline → exantheem! Rustig aan, vermijd contact­sport (miltruptuurrisico).' },

  { type:'truefalse', domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Antiretrovirale therapie (ART) bij HIV zorgt voor volledige genezing van de infectie.',
    c:false, ex:'NIET WAAR. ART onderdrukt het HIV-virus tot ondetecteerbaar niveau maar geneest de infectie niet — het virus blijft latent in reservoir-cellen. Voordelen: normale levensverwachting, draagt niet meer over bij virale suppressie (U=U). Levenslang gebruik nodig.' },

  // ── Laboratorium (nieuw) ──
  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Man 55j: Na 128 mmol/L, osmolaliteit laag, urine-Na >20. Geen oedeem. TSH en cortisol normaal. Diagnose?',
    a:['Psychogeen polydipsie','SIADH','Bijnierinsufficiëntie','Hypothyreoïdie'], c:1,
    ex:'SIADH: inadequate ADH-secretie → waterretentie → dilutie-hyponatriëmie. Kenmerk: euvoleem + lage osmolaliteit + urine-Na >20 + urine osmolaliteit >serum osmolaliteit. Oorzaken: maligniteit (kleincellig longcarcinoom!), SSRIs, carbamazepine. Behandeling: vochtbeperking.',
    wiki: {
      kern: 'SIADH betekent dat het lichaam te veel ADH aanmaakt (of ectopisch produceert), waardoor het te veel water vasthoudt. Het bloed wordt als het ware verdund → natrium daalt. Kenmerkend: de patiënt is niet oedemateus (euvoleem) — er is geen zout-tekort, alleen wateroverschot.',
      mechanisme: 'ADH (vasopressine) geeft normaal het signaal aan de nieren om water terug te nemen bij uitdroging. Bij SIADH gebeurt dit ongepast — ook zonder dat het lichaam uitgedroogd is. Oorzaken: longtumoren (kleincellig longcarcinoom produceert zelf ADH), hersenpathologie, SSRIs, carbamazepine.',
      onderscheid: 'Bijnierinsufficiëntie: ook hyponatriëmie maar met lage bloeddruk, hyperkaliëmie en laag cortisol. Hypothyreoïdie: ook hyponatriëmie, maar TSH hoog. Psychogeen polydipsie: zeer laag urine-natrium en urine-osmolaliteit (sterk verdunde urine) — urine-Na <20. Hartfalen/cirrose: hypovoleem of oedemateus, niet euvoleem.',
      therapie: 'Mild: vochtbeperking (800-1000 ml/dag). Acuut symptomatisch (convulsies, bewustzijnsdaling): hypertoon NaCl 3% voorzichtig — maximaal 8-10 mmol/dag stijging om osmotische demyelinisatie te voorkomen. Chronisch: tolvaptan (V2-receptorantagonist) bij refractaire SIADH.',
    } },

  { type:'truefalse', domain:'lab', dl:'Laboratorium — Waar of Niet?',
    q:'Een verhoogd D-dimeer bewijst dat er een longembolie aanwezig is.',
    c:false, ex:'NIET WAAR. D-dimeer is gevoelig maar niet specifiek — verhoogd bij elke toestand met fibrineafbraak (infectie, trauma, zwangerschap, maligniteit). Een normaal D-dimeer bij lage klinische kans sluit LE uit. Positief D-dimeer: altijd CT-angiografie nodig.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Patiënt: K+ 6.8 mmol/L, ECG-veranderingen (tenttoppen T-golven, verbreed QRS). Meest urgente behandeling?',
    a:['Calciumgluconaat IV','Insuline + glucose IV','Natriumbicarbanaat IV','Furosemide IV'], c:0,
    ex:'Levensbedreigende hyperkaliëmie met ECG-veranderingen: EERST calciumgluconaat IV → stabiliseert myocardmembraan (werkt in 1-3 min). Daarna: insuline+glucose (K+ cellen in), salbutamol, bicarbonaat, kayexalaat/dialyse voor definitieve K+-verlaging.' },

  { type:'diagnose', domain:'lab', dl:'Laboratorium',
    q:'Vrouw 35j: Ca 3.1 mmol/L, PTH verhoogd, fosfaat laag, nierstenen. Diagnose?',
    a:['Maligniteit-geassocieerde hypercalciëmie','Primaire hyperparathyreoïdie','Vitamine D-intoxicatie','Sarcoïdose'], c:1,
    ex:'Primaire hyperparathyreoïdie: autonome PTH-secretie (adenoom 80%). PTH ↑ + Ca ↑ = primaire HPT. Bij maligniteit: PTH laag of normaal. Symptomen: nierstenen, botpijn, obstipatie, depressie ("stones, bones, groans, psychic moans"). Behandeling: parathyroïdectomie.' },

  { type:'truefalse', domain:'lab', dl:'Laboratorium — Waar of Niet?',
    q:'Een laag MCV (microcytair) bij anemie wijst altijd op ijzergebrek.',
    c:false, ex:'NIET WAAR. Microcytaire anemie: ijzergebrek (meest voorkomend), thalassemie, anemie bij chronische ziekte (soms), sideroblastische anemie. Onderscheid: ferritine (laag bij Fe-gebrek, hoog bij chronische ziekte), bloeduitstrijk, Hb-elektroforese bij thalassemie-vermoeden.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Man 48j: glucosewaarde nuchter 7.2 mmol/L twee keer gemeten. Diagnose?',
    a:['Normale bloedsuiker','Gestoorde nuchtere glykemie','Diabetes mellitus type 2','Pre-diabetes borderline'], c:2,
    ex:'DM2-diagnose: nuchter glucose ≥7.0 mmol/L op 2 aparte momenten, OF HbA1c ≥48 mmol/mol (6.5%), OF glucosetolerantietest 2u ≥11.1, OF willekeurig glucose ≥11.1 + symptomen. Hier: 7.2 ≥ 7.0 = diabetes.',
    wiki: {
      kern: 'Diabetes mellitus type 2 is een combinatie van insulineresistentie (cellen reageren minder op insuline) en relatief tekort aan insulineproductie. Het glucose blijft hoog in het bloed omdat het niet de cellen in kan. Begint sluipend, vaak jaren onopgemerkt.',
      mechanisme: 'Overgewicht → vetcellen produceren ontstekingsstoffen → insulinereceptoren worden minder gevoelig → alvleesklier compenseert met meer insuline → uitputting van bètacellen → insulinedeficiëntie. Chronisch hoog glucose beschadigt bloedvaten en zenuwen (microangiopathie).',
      onderscheid: 'DM1: auto-immuun, destrucctie bètacellen, jong begin, snel keton-acidose, altijd insuline nodig. MODY: monogene aandoening, familiair, jong begin zonder overgewicht. LADA: langzaam progressief auto-immuun (late-onset DM1), foutief gediagnosticeerd als DM2.',
      therapie: 'Stap 1: leefstijl (afvallen, beweging) + metformine. Stap 2: toevoegen SGLT2-remmer (cardiovasculair voordeel) of GLP-1 agonist. Stap 3: insuline. Streef HbA1c <53 mmol/mol (7%). Metformine stoppen bij eGFR <30 (lactaatacidoserisico).',
    } },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Welke bloedwaarde is de beste maat voor langdurige glucoseregulatie bij diabetes?',
    a:['Nuchter glucose','HbA1c','Postprandiale glucose','Fructosamine'], c:1,
    ex:'HbA1c: geglyceerd hemoglobine weerspiegelt gemiddelde glucoseconcentratie over afgelopen 2-3 maanden (levensduur erytrocyten). Streefwaarde DM: <53 mmol/mol (7%). Fructosamine reflecteert 2-3 weken (bruikbaar bij hemoglobinopathieën of zwangerschap).' },

  { type:'truefalse', domain:'lab', dl:'Laboratorium — Waar of Niet?',
    q:'Troponine kan ook verhoogd zijn bij nierfalen zonder hartinfarct.',
    c:true, ex:'WAAR. Verhoogd troponine bij nierinsufficiëntie: verminderde klaring + chronische myocardstress. Maar: bij acute stijging (>20% over 3-6 uur) moet AMI actief worden uitgesloten. Context is alles: nierfunctie + klinisch beeld + ECG.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Man 30j: jarenlang alcoholmisbruik. Bloedbeeld: MCV 110 fL, Hb laag, normoblastair beenmerg. Diagnose?',
    a:['IJzergebreksanemie','Megaloblastaire anemie door foliumzuur-/B12-gebrek','Hemolytische anemie','Aplastische anemie'], c:1,
    ex:'Megaloblastaire anemie: macrocyten (MCV >100) door tekort aan B12 of foliumzuur → gestoorde DNA-synthese. Alcohol: malnutritie → foliumzuurgebrek. B12-gebrek: atrofische gastritis, veganisten, malabsorptie. Behandeling: foliumzuur/B12-suppletie.' },

  { type:'diagnose', domain:'lab', dl:'Laboratorium',
    q:'LP-uitslag: heldere liquor, lymfocytose 80 cellen, eiwit licht verhoogd 0.7 g/L, glucose normaal. Meest waarschijnlijk?',
    a:['Bacteriële meningitis','Virale meningitis','SAB','TBC-meningitis'], c:1,
    ex:'Virale (aseptische) meningitis: helder/opalescent vocht, lymfocytaire pleocytose, normaal glucose, licht verhoogd eiwit. Verwekkers: enterovirus, HSV, EBV. Meist self-limiting. HSV-encefalitis: liquor + MRI temporaalkwab afwijking → aciclovir direct!' },

  { type:'truefalse', domain:'lab', dl:'Laboratorium — Waar of Niet?',
    q:'TSH is de meest gevoelige test om schildklierziekte op te sporen, ook bij subklinische gevallen.',
    c:true, ex:'WAAR. TSH heeft een logaritmische relatie met vrij T4 → kleine veranderingen in T4 → grote TSH-verandering. Subklinische hypothyreoïdie: TSH verhoogd, vrij T4 normaal. TSH is de eerste-lijntest; vrij T4 en T3 ter bevestiging/typering.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Welke combinatie past bij een intravasale hemolyse?',
    a:['Laag LDH, hoog haptoglobine','Hoog LDH, laag haptoglobine, hoog indirect bilirubine','Hoog ferritine, laag transferrine','Laag reticulocytenaantal'], c:1,
    ex:'Intravasale hemolyse: rode bloedcellen kapot in bloedbaan → Hb vrijgelaten → LDH hoog (uit erytrocyten), haptoglobine daalt (bindt vrij Hb), indirect bilirubine stijgt (afbraakproduct). Reticulocyten verhoogd (compensatoire aanmaak). Hemoglobinurie: bruine urine.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Vrouw 62j: alkalf fosfatase 3× verhoogd, GGT 4× verhoogd, ALAT normaal. Echo: galstenen, geen galwegdilatatie. Diagnose?',
    a:['Hepatitis','Cholestatisch patroon, waarschijnlijk primaire biliaire cholangitis','Spierziekte','Alcoholische hepatitis'], c:1,
    ex:'Cholestatisch patroon: ALP + GGT verhoogd (biliaire oorzaak), transaminasen relatief normaal. Bij vrouw >40j + positieve AMA (anti-mitocondriale antilichamen) = primaire biliaire cholangitis. Behandeling: ursodeoxycholzuur. Fibrose en cirrose mogelijk.' },

  { type:'truefalse', domain:'lab', dl:'Laboratorium — Waar of Niet?',
    q:'Een internationale genormaliseerde ratio (INR) van 3.5 bij een patiënt op warfarine zonder bloeding vereist altijd directe ziekenhuisopname.',
    c:false, ex:'NIET WAAR. Asymptomatisch verhoogde INR: afhankelijk van hoogte en context. INR 3.5-4.9 zonder bloeding: tijdelijk stoppen warfarine, hercontrole. Bij INR >5 of bloedingssymptomen: vitamine K toedienen. Acuut: protrombinencomplex-concentraat. Opname bij actieve bloeding of zeer hoge INR.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Man 55j: kreatinine stijgt van 90 naar 280 μmol/L in 48 uur na contrast-CT. Urine: granulair cylinders. Diagnose?',
    a:['Prerenaal nierfalen','Contrast-geïnduceerde nefropathie (acute tubulaire necrose)','Postrenaal nierfalen','Glomerulonefritis'], c:1,
    ex:'Contrastnefropathie: acute tubuluscel-necrose door osmotische stress + vasoconstrictie. Granulair cylinders = tubulusschilfering. Preventie: IV hydratatie voor+na, minimale contrasthoeveelheid, stop metformine. Herstel treedt meestal op binnen 1-2 weken.' },

  { type:'diagnose', domain:'lab', dl:'Laboratorium',
    q:'Vrouw 25j: chronische vermoeidheid, gewichtsverlies, hyperpigmentatie, lage bloeddruk. Na 128, K 5.6, nuchter glucose 3.2. Diagnose?',
    a:['Hyperthyreoïdie','Primaire bijnierinsufficiëntie (ziekte van Addison)','SIADH','Anorexia nervosa'], c:1,
    ex:'Addison: destructie bijnierschors → tekort cortisol en aldosteron. Triade: hyponatriëmie + hyperkaliëmie + hypoglykemie. Hyperpigmentatie: hoge ACTH stimuleert melanocyten. Addison-crisis: hemodynamisch instabiel → direct hydrocortison IV + NaCl IV.' },

  { type:'truefalse', domain:'lab', dl:'Laboratorium — Waar of Niet?',
    q:'Een verhoogd PSA (prostaat-specifiek antigeen) bewijst prostaatkanker.',
    c:false, ex:'NIET WAAR. PSA is orgaanspecifiek, niet kankerspecifiek. Verhoogd bij: prostaatkanker, benigne prostaathyperplasie, prostatitis, kathetrisatie. PSA is een screeningsmiddel — diagnose vereist weefselbiopsie. PSA-ratio (vrij/totaal) verbetert specificiteit.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Man 38j: gewrichtspijn, uraat 560 μmol/L, nierstenen. Wat is de eerste behandelstap om uraat te verlagen?',
    a:['NSAID voor de pijn','Allopurinol (xanthine-oxidaseremmer)','Probenecide','Colchicine'], c:1,
    ex:'Allopurinol remt xanthine-oxidase → minder uuraatproductie. Eerstekeus voor jichtprofylaxe en uraatnefropathie. Start pas na acute aanval is gezakt (anders risico op aanval triggeren). Febuxostat als alternatief. Hydrateer goed, beperk rood vlees en alcohol.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Bloedgas: pH 7.28, PaCO2 32 mmHg, HCO3 15 mmol/L, AG 22. Welke stoornis?',
    a:['Respiratoire acidose','Metabole alkalose','Metabole acidose met verhoogd anion gap','Respiratoire alkalose'], c:2,
    ex:'Metabole acidose + hoog anion gap (normaal 8-12): AG = Na - (Cl + HCO3) = 22 → elevatie. Oorzaken MUDPILES: Methanol, Ureum, DKA, Propyleenglycol, INH/Ijzer, Lactaat, Ethanol/Ethyleenglycol, Salicylaten. PaCO2 laag = compensatoire respiratoire alkalose.' },
];
