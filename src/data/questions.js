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

  // ── NEUROLOGIE — moeilijker ──
  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 34j, 2 weken na gastro-enteritis: progressieve ascending spierzwakte, areflexie. Liquor: eiwit 2.8 g/L, cellen 3/µL. Diagnose?',
    a:['Multiple Sclerose','ALS','Guillain-Barré syndroom','Myasthenia Gravis'], c:2,
    ex:'GBS: stijgende motorische uitval + areflexie na infectie + albuminocytologische dissociatie (hoog eiwit, nauwelijks cellen). Respiratoir monitoring essentieel — 30% heeft beademing nodig. Behandeling: IVIG of plasmaferese.' },

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
    ex:'Thunderclap + negatieve CT: subarachnoïdale bloeding uitsluiten! CT mist 5% van SAB in eerste uren. LP na ≥6u detecteert xanthochromie. "Worst headache of life" = SAB tot bewijs van het tegendeel. LP altijd verplicht!' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 55j: progressieve dysfagie, dysartrie, tongfasciculaties én spasticiteit met hyperreflexie benen, geen sensibiliteitsstoornissen. Diagnose?',
    a:['Myasthenia Gravis','ALS (amyotrofische lateraalsclerose)','Brainsteminfarct','Guillain-Barré syndroom'], c:1,
    ex:'ALS: gelijktijdig UMN (hyperreflexie, spasticiteit) ÉN LMN-uitval (atrofie, fasciculaties). Bulbaire variant: dysfagie/dysartrie als startpunt. Geen sensorische uitval — dat onderscheidt ALS van GBS en MS.' },

  { type:'truefalse', domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Carbamazepine is gecontraïndiceerd bij dragers van het HLA-B*1502-allel vanwege een sterk verhoogd risico op Stevens-Johnson syndroom.',
    c:true, ex:'WAAR. HLA-B*1502 (prevalent in Zuidoost-Aziatische populaties) is sterk geassocieerd met carbamazepine-geïnduceerd SJS/TEN. Genetische screening vóór start wordt aanbevolen. Alternatief: levetiracetam of lamotrigine.' },

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
    ex:'Malaria: cyclische koorts + reizigerhistorie + positief dik-druppelpreparaat. P. vivax: 48u cyclus.' },

  { type:'truefalse', domain:'infectio', dl:'Infectiologie — Waar of Niet?',
    q:'Amoxicilline is de eerste keuze bij een ongecompliceerde urineweginfectie bij een jonge vrouw in Nederland.',
    c:false, ex:'NIET WAAR. Nitrofurantoïne of fosfomycine zijn eerste keuze vanwege hoge resistentie tegen amoxicilline bij E. coli.' },

  // ── CARDIOLOGIE — moeilijker ──
  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man 72j, 2u na succesvolle PCI voor inferieur STEMI: plots bradycardie 38/min, hypotensie 80/50, verhoogde CVD, heldere longen. Meest waarschijnlijke oorzaak?',
    a:['Cardiogene shock','Rechterventrikeli­nfarct','Papillairspierruptuur','Ventrikelseptumruptuur'], c:1,
    ex:'RV-infarct bij inferieur MI (RCA-occlusie): triade hypotensie + hoge CVD + heldere longen. CAVE: nitraten en diuretica zijn gecontraïndiceerd — preload is essentieel! Volumebelasting is eerste stap.' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 55j, exertionele dyspneu, ECHO: EF 65%, verhoogde vullingsdrukken, geen klepafwijkingen. Diagnose?',
    a:['Hartfalen met gereduceerde EF (HFrEF)','Hartfalen met behouden EF (HFpEF)','Pulmonale hypertensie','Hypertrofische cardiomyopathie'], c:1,
    ex:'HFpEF: EF ≥50% maar diastolische dysfunctie → verhoogde vullingsdrukken. Behandeling richt zich op symptomen en risicofactoren. Geen EF-verbeterende medicatie (ACE-remmer, bèta-blokker) bewezen effectief zoals bij HFrEF.' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man 26j, atleet: syncope tijdens inspanning, positieve familiegeschiedenis plotse hartdood. ECHO: asymmetrische septumhypertrofie 22mm, SAM van mitraalklep. Diagnose?',
    a:['Aortaklepstenose','Hypertrofische obstructieve cardiomyopathie (HOCM)','Dilatatieve cardiomyopathie','Longembolie'], c:1,
    ex:'HOCM: septumhypertrofie + SAM (systolic anterior motion) mitraalklep → dynamische LVOT-obstructie. Belangrijkste oorzaak van plotse hartdood bij jonge atleten. ICD-indicatie bij hoog-risico profiel. Sportontheffing verplicht!' },

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
    ex:'CDI: typisch na (brede-spectrum) antibiotica. Toxine A/B diagnostisch. Eerste episode: orale vancomycine of fidaxomicine (niet meer metronidazol als eerste keuze). CAVE: geen loperamide — risico toxisch megacolon!' },

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
    ex:'Bij ernstige hyperkaliëmie met ECG-veranderingen: eerst calcium gluconaat voor cardioprotectie. Daarna K⁺ actief verlagen.' },

  // ── LABORATORIUM — moeilijker ──
  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'ABG: pH 7.49, pCO₂ 30 mmHg, HCO₃⁻ 22 mmol/L, pO₂ 98 mmHg. Juiste interpretatie?',
    a:['Metabole alkalose met respiratoire compensatie','Respiratoire alkalose met renale compensatie','Gemengde alkalose','Metabole acidose met overcompensatie'], c:1,
    ex:'pH hoog + laag pCO₂ = respiratoire alkalose. HCO₃ licht gedaald = renale compensatie (verwacht: 24 − 0.5×ΔpCO₂ acuut). Oorzaken: hyperventilatie, sepsis (vroeg), zwangerschap, longembolie, salicylaatintoxicatie.' },

  { type:'lab', domain:'lab', dl:'Laboratorium',
    q:'Microcytaire anemie: ferritine 6 µg/L, transferrinesaturatie 5%, serum-ijzer 5 µmol/L, reticulocyten laag. Diagnose?',
    a:['β-thalassemie minor','Anemie van chronische ziekte','IJzergebreksanemie','Sideroblastische anemie'], c:2,
    ex:'IJzergebreksanemie: ferritine laag (<12), transferrinesaturatie <16%, serum-ijzer laag. Ferritine is acuut-fase-eiwit — bij ontsteking kan het vals-normaal zijn. Onderscheid van chronische anemie: bij chronische anemie is ferritine normaal/hoog.' },

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
    ex:'MAHA: schistocyten (fragmenten van beschadigde rode bloedcellen) + hemolyseparameters (hoog LDH, indirect bili, laag haptoglobine). Oorzaken: TTP, HUS, DIC, HELLP. Urgente diagnose — TTP-behandeling is plasmaferese!' },

  // ── Cardiologie (nieuw) ──
  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man 68j komt met hartkloppingen. ECG: geen P-toppen, onregelmatig QRS-ritme met freq 110/min. Wat is de diagnose?',
    a:['Atriumflutter','Atriumfibrilleren','Ventriculaire tachycardie','AV-nodale re-entry tachycardie'], c:1,
    ex:'Atriumfibrilleren: chaotische atriumactiviteit → geen P-toppen, absoluut onregelmatig QRS. Risico: trombus in linker hartoor → embolie/beroerte. Behandeling: frequentiecontrole (bètablokker/digoxine) + anticoagulatie indien CHA₂DS₂-VASc ≥2.' },

  { type:'truefalse', domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Bij atriumfibrilleren met een CHA₂DS₂-VASc score van 0 bij een man is anticoagulatie geïndiceerd.',
    c:false, ex:'NIET WAAR. CHA₂DS₂-VASc 0 (man) = laag risico → geen anticoagulatie aanbevolen. Score telt: hartfalen, hypertensie, leeftijd ≥75 (2 punten), diabetes, beroerte/TIA (2 punten), vaatziekte, leeftijd 65-74, vrouwelijk geslacht.' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Vrouw 55j met kortademigheid bij inspanning, orthopneu en dikke enkels. Echo: EF 35%, vergrote LV. Wat is de eersterangbehandeling?',
    a:['Alleen diuretica','ACE-remmer + bètablokker','Digoxine monotherapie','Calciumantagonist'], c:1,
    ex:'Hartfalen met verminderde EF (HFrEF): ACE-remmer (of ARB/ARNI) + bètablokker verminderen mortaliteit. Diuretica verlichten symptomen. Digoxine alleen bij symptoomcontrole. Spironolacton toevoegen bij aanhoudende klachten.' },

  { type:'truefalse', domain:'cardio', dl:'Cardiologie — Waar of Niet?',
    q:'Bij een STEMI moet PCI (dotterbehandeling) idealiter binnen 90 minuten na eerste medisch contact plaatsvinden.',
    c:true, ex:'WAAR. "Door-to-balloon time" <90 min is de richtlijn. Hoe sneller, hoe meer myocard gered. Alternatief: trombolyse binnen 30 min als PCI niet tijdig beschikbaar is (deur-tot-naald <30 min).' },

  { type:'diagnose', domain:'cardio', dl:'Cardiologie',
    q:'Man 35j na griep: scherpe precordiale pijn, erger liggend, beter voorovergebogen. ECG: saddle-shape ST-elevatie in meerdere afleidingen. Diagnose?',
    a:['STEMI','Pericarditis','Longembolie','Aortadissectie'], c:1,
    ex:'Pericarditis: pleuritische pijn (scherp, houdingsafhankelijk), pericardiaal wrijfgeruis, diffuse saddle-shape ST-elevatie. Oorzaak vaak viraal. Behandeling: ibuprofen + colchicine. Complicatie: pericarditamp.' },

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
    ex:'MG: auto-antilichamen tegen acetylcholinereceptor → neuromusculaire transmissie gestoord. Klassiek: vermoeibare zwakte, ptosis, wisselend beloop. IJstest: kou verbetert transmissie tijdelijk. Behandeling: pyridostigmine, immunosuppressie, thymectomie.' },

  { type:'truefalse', domain:'neuro', dl:'Neurologie — Waar of Niet?',
    q:'Multiple sclerose tast zowel het centraal als het perifeer zenuwstelsel aan.',
    c:false, ex:'NIET WAAR. MS is een demyeliniserende ziekte van het centraal zenuwstelsel (hersenen + ruggenmerg). Het perifeer zenuwstelsel wordt gespaard. Kenmerk: laesies gescheiden in tijd en plaats. Diagnose: MRI + klinisch beeld + liquoronderzoek.' },

  { type:'diagnose', domain:'neuro', dl:'Neurologie',
    q:'Man 65j: progressief geheugenverlies, persoonlijkheidsverandering, 3 jaar klachten. MRI: diffuse corticale atrofie temporopariëtaal. Diagnose?',
    a:['Vasculaire dementie','Alzheimer','Lewy-body dementie','Frontotemporale dementie'], c:1,
    ex:'Alzheimer: meest voorkomende dementievorm (60-70%). Pathologie: amyloïd-plaques + tau-neurofibrillaire klitten. Temporopariëtale atrofie op MRI. Vroeg: geheugenproblemen. Later: apraxie, agnosie. Behandeling: cholinesteraseremmers (symptomatisch).' },

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
    ex:'Parkinson: verlies dopaminerge neuronen in substantia nigra. Klassieke triade: rusttremor (pil-draaibewegingen) + rigiditeit + bradykinesie. Asymmetrisch begin. Behandeling: levodopa (meest effectief). Niet-motorische sympt: depressie, reukstoornissen.' },

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
    ex:'Meningokokkenziekte: meningitis + sepsis door Neisseria meningitidis. Petechiën/purpura = vasculitis → dreigend sepsis. SPOED: IV benzylpenicilline of cefotaxim DIRECT. Elke minuut telt. Isolatie en profylaxe contactpersonen.' },

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
    ex:'PCP: meest voorkomende opportunistische infectie bij HIV met CD4 <200. Kenmerk: bilaterale interstitiële infiltraten, hoge LDH, subacuut beloop. Behandeling: cotrimoxazol hoge dosis. Profylaxe bij CD4 <200. LDH-verhoging is kenmerkend.' },

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
    ex:'TBC: Mycobacterium tuberculosis. Klassiek: langdurige hoest, nachtzweten, gewichtsverlies, hemoptoe, apicale cavitaties. Diagnose: sputumkweek (Ziehl-Neelsen), GeneXpert. Isolatie vereist. Behandeling: RIPE (rifampicine + isoniazide + pyrazinamide + ethambutol) 6 maanden.' },

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
];
