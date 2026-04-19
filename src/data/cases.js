// MedDuel — Dossier patiëntencasussen
// Structuur: { id, patient, diagnosis, clues[], options[], correct, explanation }
// clues: [{ label, text }] — worden één voor één onthuld
// correct: index in options array

const DOSSIER_CASES = [
  {
    id: 'c1',
    patient: 'Patiënt A — Man, 67 jaar',
    diagnosis: 'Longembolie',
    clues: [
      { label: 'Reden van komst',       text: 'Acute kortademigheid en thoraxpijn, begonnen 2 uur geleden.' },
      { label: 'Voorgeschiedenis',       text: 'Knieoperatie 10 dagen geleden, sindsdien bedrust. Rookt 20 jaar.' },
      { label: 'Vitale functies',        text: 'SpO₂ 88%, HF 118/min, BD 105/70 mmHg, AF 26/min, T 37.8°C.' },
      { label: 'Lichamelijk onderzoek',  text: 'Rechter onderbeen gezwollen en warm. Homan-teken positief.' },
      { label: 'Lab & ECG',              text: 'D-dimeer sterk verhoogd. ECG: S1Q3T3-patroon, sinustachycardie.' },
      { label: 'Beeldvorming',           text: 'CT-pulmonalisangiografie: bilaterale vullingsdefecten in de longarteriën.' },
    ],
    options: ['STEMI', 'Longembolie', 'Pneumonie', 'Aortadissectie'],
    correct: 1,
    explanation: 'De drie pijlers van Virchow verklaren waarom deze patiënt DVT en longembolie ontwikkelde: stase (10 dagen bedrust na operatie), hypercoagulabiliteit (postoperatief) en endotheelschade. Het gezwollen warme onderbeen met positief Homan-teken is de DVT-bron. Pleuritische pijn + hypoxie + tachycardie + S1Q3T3 op ECG (teken van acute rechterhartbelasting) vormen samen het klassieke longembolie-beeld. De sterk verhoogde D-dimeer en CT-PA bevestigen het definitief.\n\nWaarom niet de anderen? STEMI: geen ST-elevatie. Pneumonie: geen koorts/productieve hoest. Aortadissectie: geen scheurende interscapulaire pijn of bloeddrukasymmetrie.',
  },
  {
    id: 'c2',
    patient: 'Patiënt B — Vrouw, 34 jaar',
    diagnosis: 'DKA bij DM type 1',
    clues: [
      { label: 'Reden van komst',       text: 'Misselijkheid, braken en verwardheid, progressief over 2 dagen.' },
      { label: 'Voorgeschiedenis',       text: 'Bekend met DM type 1. Insuline vergeten de afgelopen 3 dagen.' },
      { label: 'Vitale functies',        text: 'BD 95/60 mmHg, HF 128/min, AF 28/min (diep en snel), T 37.1°C.' },
      { label: 'Lichamelijk onderzoek',  text: 'Gedroogde slijmvliezen, turgor verminderd. Fruitige ademlucht. Verward.' },
      { label: 'Lab',                    text: 'Glucose 32 mmol/L. pH 7.12, bicarbonaat 8. Ketonurie +++. K⁺ 5.8.' },
      { label: 'Conclusie',             text: 'Anion gap verhoogd (24). Insulinedeficiëntie met lipolyse en ketonvorming.' },
    ],
    options: ['HHS (hyperosmolair)', 'Alcoholketoacidose', 'DKA bij DM type 1', 'Lactaatacidose'],
    correct: 2,
    explanation: 'Insulinedeficiëntie → geen glucoseopname door cellen → hyperglykemie. Tegelijk: lipolyse → vrije vetzuren → ketonlichamen (aceton, acetoacetaat, β-hydroxybutyraat) → hoge anion gap metabole acidose (AG = Na − (Cl + HCO₃) = 24, normaal <12).\n\nDe Kussmaul-ademhaling (diep en snel) is compensatoir: door CO₂ uit te blazen probeert het lichaam de pH te corrigeren. De fruitige ademlucht is door aceton. Het hoge kalium is misleidend — totaallichaamskalium is juist verlaagd (kaliumverlies via urine), maar acidose drijft K⁺ de cel uit.\n\nWaarom niet de anderen? HHS: geen acidose, nauwelijks ketonurie, glucose nog hoger. Alcoholketoacidose: glucose normaal/laag, geen bekende DM type 1. Lactaatacidose: geen verhoogd lactaat, wél ketonurie.',
  },
  {
    id: 'c3',
    patient: 'Patiënt C — Man, 55 jaar',
    diagnosis: 'Bacteriële endocarditis',
    clues: [
      { label: 'Reden van komst',       text: 'Koorts en algehele malaise al 3 weken, nu ook gewrichtspijn.' },
      { label: 'Voorgeschiedenis',       text: 'Iv-drugsgebruiker. Tandheelkundige ingreep 6 weken geleden.' },
      { label: 'Vitale functies',        text: 'T 38.9°C, HF 104/min, BD 130/80 mmHg.' },
      { label: 'Lichamelijk onderzoek',  text: 'Nieuw souffle holosystolisch. Splinterbloedingen onder nagels. Janeway-laesies.' },
      { label: 'Lab & Echo',             text: 'CRP 180, leukocyten 16. Bloedkweken: S. aureus 3/3. Echo: vegetatie mitralisklep.' },
      { label: 'Criteria',              text: 'Voldoet aan 2 major Duke-criteria: positieve kweken + echocardiografisch bewijs.' },
    ],
    options: ['Reumatoïde artritis', 'Bacteriële endocarditis', 'Sepsis zonder focus', 'Systemische lupus'],
    correct: 1,
    explanation: 'Endocarditis vereist een ingangspoort (iv-drugsgebruik, tandheelkundige ingreep) en een beschadigde of turbulente hartklep. De bacteriëmie hecht zich vast en vormt vegetaties.\n\nDe Duke-criteria maken de diagnose: 2 major criteria zijn voldoende. (1) Positieve bloedkweken met typisch micro-organisme (S. aureus uit 3/3 flesjes = persisterende bacteriëmie). (2) Echocardiografisch bewijs: vegetatie op de mitralisklep.\n\nDe perifere tekenen zijn door embolisatie van vegetatiefragmenten: splinterbloedingen (micro-embolieën in nagelbedcapillairen) en Janeway-laesies (septische embolieën naar de huid van handpalmen). Het nieuwe souffle duidt op klepbeschadiging door de vegetatie.\n\nWaarom niet de anderen? RA: geen koorts van 3 weken, geen positieve bloedkweken. SLE: geen butterfly-rash, geen ANA. Sepsis zonder focus: er IS een focus (de hartklep).',
  },
  {
    id: 'c4',
    patient: 'Patiënt D — Vrouw, 28 jaar',
    diagnosis: 'Ectopische zwangerschap',
    clues: [
      { label: 'Reden van komst',       text: 'Acute hevige pijn linker onderbuik, begonnen 1 uur geleden.' },
      { label: 'Voorgeschiedenis',       text: 'LMP 7 weken geleden. Eerder doorgemaakte chlamydia-infectie.' },
      { label: 'Vitale functies',        text: 'BD 88/55 mmHg, HF 135/min, bleek en klam. Pijn 9/10.' },
      { label: 'Lichamelijk onderzoek',  text: 'Peritoneale prikkeling links. Slingerpijn bij vaginaal toucher. Adnexmassa palpabel.' },
      { label: 'Lab',                    text: 'β-HCG 4500 IU/L (positief). Hb gedaald naar 6.2. Bloedgroep O-negatief.' },
      { label: 'Echo',                   text: 'Geen intruteriene zwangerschap. Vrij vocht in de buik. Massa in linker adnex.' },
    ],
    options: ['Appendicitis', 'Ruptuur ovariumcyste', 'Ectopische zwangerschap', 'PID'],
    correct: 2,
    explanation: 'Gouden regel: bij iedere vrouw in de vruchtbare leeftijd met acute buikpijn is een ectopische zwangerschap een spoeddiagnose totdat het uitgesloten is. Controleer altijd β-HCG.\n\nDe risicofactor hier is doorgemaakte chlamydia-infectie: dit veroorzaakt tubabeschadiging en verhoogt het risico op ectopische innesteling 6-10-voudig. De amenorroe van 7 weken bevestigt zwangerschap.\n\nHet klassieke drieluik van ruptuur: (1) Hemodynamische instabiliteit (BD 88/55, HF 135 = hemorrhagische shock). (2) Positieve β-HCG zonder intruteriene zwangerschap op echo. (3) Vrij vocht in de buik (hemoperitoneum) + adnexmassa.\n\nWaarom niet de anderen? Appendicitis: rechts gelokaliseerd, geen HCG. Ovariumcysteruptuur: HCG negatief. PID: HCG negatief, geen schok door acute bloeding.',
  },
  {
    id: 'c5',
    patient: 'Patiënt E — Man, 72 jaar',
    diagnosis: 'Subduraal hematoom',
    clues: [
      { label: 'Reden van komst',       text: 'Progressieve verwardheid en hoofdpijn over 2 weken, nu ook zwakte rechterarm.' },
      { label: 'Voorgeschiedenis',       text: 'Acenocoumarol (INR 3.8). Val 3 weken geleden, "klein bultje op hoofd".' },
      { label: 'Vitale functies',        text: 'BD 162/94 mmHg, HF 68/min, GCS 13/15.' },
      { label: 'Lichamelijk onderzoek',  text: 'Verward, dysartrie. Krachtsvermindering rechterarm 3/5. Hyperreflexie rechts.' },
      { label: 'Lab',                    text: 'INR 3.8. Trombocyten normaal.' },
      { label: 'Beeldvorming',           text: 'CT: crescent-vormige hypodense massa links parietaal met midlijnverschuiving 6 mm.' },
    ],
    options: ['Ischemisch CVA', 'Subduraal hematoom', 'Hersentumor', 'Epiduraal hematoom'],
    correct: 1,
    explanation: 'Een chronisch subduraal hematoom is een sluipende diagnose: door de langzame veneuze bloeding (bridging veins) bouwt de druk weken op voor er symptomen zijn — het klassieke "lucide interval" na het trauma.\n\nDe combinatie van anticoagulantia (INR 3.8!) en val 3 weken geleden verklaart alles: zelfs een gering trauma kan bij supratherapeutische INR leiden tot een niet-stoppende veneuze bloeding. De progressieve deterioratie (cognitief → focale uitval → midlijnverschuiving) volgt de toenemende herniadruk.\n\nCT-kenmerken: crescent-vormig (volgt de hersenvorm), hypodense massa bij chronisch beloop (>3 weken: bloed wordt afgebroken). Dit onderscheidt het van epiduraal hematoom (biconvex/lensvorming, arterieel, acuut) en ischemisch CVA (plotseling begin, geen bloeding, geen trauma-anamnese).\n\nBeleid: INR corrigeren (vitamine K + PCC), neurochirurgisch consult voor drainageoverweging.',
  },
];
