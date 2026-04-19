// MedDuel — Trivia vragenbank
// Structuur: { type, domain, dl (display label), q, a (answers), c (correct index), ex (explanation) }
// Types: 'diagnose' | 'truefalse' | 'pharma' | 'lab'
// Domains: 'cardio' | 'neuro' | 'pharma' | 'infectio' | 'lab'

const QUESTIONS = [
  // ── CARDIOLOGIE ──
  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man van 55 jaar: drukkende thoraxpijn uitstralend naar de linkerarm, zweten, misselijkheid. Meest waarschijnlijke diagnose?',
    a:['STEMI','Longembolie','Aortadissectie','Pancreatitis'], c:0,
    ex:'Klassieke STEMI-presentatie: drukkende pijn, uitstraling, vegetatieve verschijnselen. Directe PCI binnen 90 min!' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'ECG: geen P-toppen, irregulair ritme met "zagtand" baseline. Frequentie 150/min. Diagnose?',
    a:['Atriumfibrilleren','Atriumflutter','Ventriculaire tachycardie','WPW-syndroom'], c:1,
    ex:'Atriumflutter: F-golven (zagtand), typisch regulier 2:1-blok → 150/min. AF is juist irregulair zonder F-golven.' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Vrouw van 68j: kortademig bij inspanning, bilateraal enkelloedeem, verhoogde CVD, crepitaties basaal. Diagnose?',
    a:['Longembolie','Decompensatio cordis','COPD-exacerbatie','Nefrotisch syndroom'], c:1,
    ex:'Decompensatio cordis: stuwing links (crepitaties) én rechts (oedeem, verhoogde CVD). Klassieke presentatie.' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man 45j: plotse "scheurende" interscapulaire pijn, bloeddrukasymmetrie > 20 mmHg. Urgente diagnose?',
    a:['STEMI','Aortadissectie','Longembolie','Pericard­tamponade'], c:1,
    ex:'Aortadissectie: scheurend karakter, interscapulair, bloeddrukasymmetrie. CT-angio is diagnostisch. Levensbedreiging!' },

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
    ex:'TIA herstelt per definitie binnen 24u. Hoog recidiefrisico: ABCD2-score bepalen en direct behandelen!' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Vrouw 45j: nekstijfheid, fotofobie, koorts 39.5°C, positief teken van Kernig. Urgentie?',
    a:['Migraine','Subarachnoïdale bloeding','Bacteriële meningitis','Encefalitis'], c:2,
    ex:'Meningeale prikkeling + koorts = bacteriële meningitis tot tegendeel bewezen. Directe antibiotica, geen LP afwachten!' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 58j: rusttremor, bradykinesie, hypomimie, kleine passen. Diagnose?',
    a:['Essentiële tremor','Huntington','Parkinson','MS'], c:2,
    ex:'Parkinson: de 4 kardinale symptomen zijn rusttremor, rigiditeit, bradykinesie en posturale instabiliteit. Hypomimie is typisch.' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Vrouw 28j: visuele stoornissen, daarna zwakte been, maanden later tintelingen arm. MRI: lesies verspreid in tijd en ruimte.',
    a:['ALS','Multiple Sclerose','Guillain-Barré','Myasthenia Gravis'], c:1,
    ex:'MS: demyeliniserende aandoening, lesies verspreid in tijd én ruimte. Typisch bij jonge vrouwen (F:M = 3:1).' },

  { type:'truefalse', domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Bij een CVA moet altijd een CT-scan gemaakt worden vóór trombolyse om een bloeding uit te sluiten.',
    c:true, ex:'WAAR. Trombolyse bij hemorrhagisch CVA is fataal. Altijd CT eerst. "Time is brain" — maar veiligheid gaat voor.' },

  // ── FARMACOLOGIE ──
  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Dit middel blokkeert de H⁺/K⁺-ATPase op de pariëtaalcel en remt zuurproductie. Gebruikt bij GERD en peptische ulcera.',
    a:['Omeprazol','Metoclopramide','Famotidine','Sucralfaat'], c:0,
    ex:'Omeprazol is een protonpompremmer (PPI). Famotidine is een H2-blokker — minder effectief, ander aanknopingspunt.' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Bèta-1-selectief middel, verlaagt HF en BD, gebruikt bij hypertensie en hartfalen. Bekende cave: astma.',
    a:['Amlodipine','Metoprolol','Spironolacton','Hydralazine'], c:1,
    ex:'Metoprolol is een cardioselectieve bèta-1-blokker. Bèta-2-blokkade veroorzaakt bronchospasme — gevaarlijk bij astma.' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Dit middel remt ACE, verlaagt angiotensine II en aldosteron. Bekende bijwerking: droge hoest.',
    a:['Losartan','Lisinopril','Verapamil','Furosemide'], c:1,
    ex:'Lisinopril = ACE-remmer. Losartan is een ARB (angiotensine-II-receptorblokker) — géén hoest als bijwerking.' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Antibioticum dat DNA-gyrase remt, werkzaam tegen gramnegatieve bacteriën. Cave: peesontstekingen.',
    a:['Amoxicilline','Doxycycline','Ciprofloxacine','Metronidazol'], c:2,
    ex:'Ciprofloxacine is een fluorochinolon. Bijwerkingen: tendinitis, QTc-verlenging. Cave bij ouderen + corticosteroïden.' },

  { type:'pharma', domain:'pharma', dl:'Farmacologie',
    q:'Welk antistollingsmiddel remt vitamine K-afhankelijke stollingsfactoren II, VII, IX en X?',
    a:['Heparine','Warfarine','Rivaroxaban','Dabigatran'], c:1,
    ex:'Warfarine/acenocoumarol remmen de vitamine K-cyclus → verminderde aanmaak stollingsfactoren. INR monitoren!' },

  { type:'truefalse', domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Metformine is gecontraïndiceerd bij eGFR < 30 ml/min vanwege het risico op lactaatacidose.',
    c:true, ex:'WAAR. Metformine accumuleert bij nierinsufficiëntie. eGFR 30–45: halveer dosis. eGFR < 30: stop definitief.' },

  { type:'truefalse', domain:'pharma', dl:'Farmacologie — Waar of Niet?',
    q:'Heparine heeft een direct anticoagulerend effect en kan oraal worden toegediend.',
    c:false, ex:'NIET WAAR. Heparine werkt alleen iv of sc (te grote molecule voor orale absorptie). Effect is direct via antitrombine III.' },

  // ── INFECTIOLOGIE ──
  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Jongeman 22j: koorts, extreme vermoeidheid, pharyngitis, cervicale lymfadenopathie, splenomegalie. Monospot positief.',
    a:['Streptokokken-angina','CMV-infectie','EBV-mononucleose','HIV primo-infectie'], c:2,
    ex:'EBV = ziekte van Pfeiffer. Monospot detecteert heterofiele antistoffen. Cave: geen contactsporten bij splenomegalie!' },

  { type:'diagnose', domain:'infectio', dl:'Infectiologie',
    q:'Terugkerende van Azië: cyclische koorts elke 48 uur, rillingen, zweetstuipen. Dik-druppelpreparaat positief.',
    a:['Tyfus','Malaria','Dengue','Leishmaniasis'], c:1,
    ex:'Malaria: cyclische koorts + reizigerhistorie + positief dik-druppelpreparaat. P. vivax: 48u cyclus.' },

  { type:'truefalse', domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Amoxicilline is de eerste keuze bij een ongecompliceerde urineweginfectie bij een jonge vrouw in Nederland.',
    c:false, ex:'NIET WAAR. Nitrofurantoïne of fosfomycine zijn eerste keuze vanwege hoge resistentie tegen amoxicilline bij E. coli.' },

  // ── LABORATORIUM ──
  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Na⁺ 128, lage osmolaliteit plasma, hoog urinesodium, geen oedeem. Welk syndroom?',
    a:['Diabetes insipidus','SIADH','Nefrotisch syndroom','Addisoncrisis'], c:1,
    ex:'SIADH: hyponatriëmie, lage plasmaosmolaliteit, hoog urinenatrium. Geen oedeem — dat onderscheidt het van hartfalen/cirrose.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'K⁺ 6.8, ECG: piekende T-toppen, verlengd PR. Eerste behandelstap?',
    a:['Furosemide iv','Calcium gluconaat iv','Kayexalaat oraal','Hemodialyse'], c:1,
    ex:'Bij ernstige hyperkaliëmie met ECG-veranderingen: eerst calcium gluconaat voor cardioprotectie. Daarna K⁺ actief verlagen.' },
];
