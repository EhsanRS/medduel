// MedDuel — Speurdokter Cases

const DETECTIVE_CASES = [
  {
    id: 'sd-01',
    date: '2026-04-27',
    title: 'De Man Die Geen Water Wilde',
    difficulty: 4,
    domain: 'infectio',
    patient: 'Man, 38 jaar',
    intro: "Een 38-jarige man wordt door zijn partner naar de Spoedeisende Hulp gebracht. Ze maakt zich zorgen — al zo'n drie dagen is hij 'anders': nauwelijks slaap, onrust, angst voor dingen die hij normaal niet eng vindt. Vanavond weigerde hij plotseling zijn glas water op te pakken. Ze begrijpt er niets van.",

    urgency: 'high',

    vitals_baseline: {
      hr: 118, bp_sys: 132, bp_dia: 84, temp: 38.9, spo2: 98, gcs: 13, status: 'unstable',
    },

    vitals_decay: {
      per_action: { hr: 3, bp_sys: 2, temp: 0.15, gcs: -1 },
      triggers: [
        { field: 'hr',  above: true,  threshold: 136, message: '⚠ Verpleegkundige: "Hartslag loopt hard op — patiënt raakt steeds meer geagiteerd."' },
        { field: 'gcs', above: false, threshold: 10,  message: '🚨 GCS gedaald onder 10 — bewustzijn snel achteruitgaand.' },
      ],
      too_late_after: 120,
    },

    investigations: [
      {
        id: 'vitals',
        phase: 1, time_cost: 5,
        label: 'Vitale functies meten',
        category: 'physical',
        icon: '🩺',
        useful: true,
        points: 10,
        result: {
          type: 'text',
          text: 'T 38.9°C · HR 118/min · RR 20/min · SpO₂ 98% · BD 132/84 mmHg',
          badge: 'useful',
          summary: 'Koorts · tachycardie',
          note: 'Koorts en tachycardie wijzen op een actief systemisch ziekteproces.',
          findings: [
            'Patiënt is angstig en hyperalert op omgevingsprikkels',
            'Fijne tremor zichtbaar aan de handen',
            'Hypersalivatie subtiel aanwezig',
          ]
        }
      },
      {
        id: 'prodroom',
        phase: 2, time_cost: 8,
        label: 'Hoe zijn de klachten begonnen?',
        category: 'history',
        icon: '📋',
        useful: true,
        points: 10,
        result: {
          type: 'quote',
          text: '"Eerst leek het gewoon griep: koorts, pijn in zijn armen, moe. Dat was een dag of tien geleden. Daarna werd hij anders. Onrustig. Angstig voor van alles."',
          badge: 'useful',
          summary: 'Prodroom: griepachtig',
          note: 'Een griepachtig begin gevolgd door gedragsverandering — dat tweefasige patroon verdient aandacht.'
        }
      },
      {
        id: 'familie',
        phase: 2, time_cost: 8,
        label: 'Heeft iemand anders in de omgeving soortgelijke klachten?',
        category: 'history',
        icon: '👨‍👩‍👦',
        useful: false,
        points: -8,
        result: {
          type: 'quote',
          text: '"Nee, niemand anders in zijn omgeving is ziek. Het is echt alleen hij."',
          badge: 'not',
          summary: 'Geen clusterbesmetting',
          note: 'Geen aanwijzing voor overdracht via nauw contact.'
        }
      },
      {
        id: 'drugs',
        phase: 2, time_cost: 8,
        label: 'Gebruikt patiënt medicatie of drugs?',
        category: 'history',
        icon: '💊',
        useful: false,
        points: -8,
        result: {
          type: 'quote',
          text: '"Nee. Hij gebruikt niets — geen medicijnen, geen recreatieve middelen. Altijd een gezonde man geweest."',
          badge: 'not',
          summary: 'Geen medicatie of drugs',
          note: 'Farmacologische of toxische oorzaak minder waarschijnlijk.'
        }
      },
      {
        id: 'reis',
        phase: 2, time_cost: 10,
        label: 'Bent u de afgelopen maanden in het buitenland geweest?',
        category: 'history',
        icon: '✈️',
        useful: true,
        points: 20,
        result: {
          type: 'quote',
          text: '"Ja, ik ben zo\'n zes weken geleden teruggekomen. We hebben drie weken doorgebracht in India, voornamelijk in de buurt van Kolkata — ook een paar dagen in afgelegen dorpjes op het platteland."',
          badge: 'useful',
          summary: 'Recente reis naar India',
          note: 'Reisgeneeskunde is relevant. Bepaalde gebieden kennen specifieke infectieziekten die in Nederland niet endemisch zijn.'
        }
      },
      {
        id: 'dieren',
        phase: 2, time_cost: 10,
        requires: ['reis'],
        label: 'Heeft u contact gehad met dieren tijdens de reis?',
        category: 'history',
        icon: '🐾',
        useful: true,
        points: 25,
        result: {
          type: 'quote',
          text: '"Er was een straathond bij een dorpje... die speelde met mijn hand. Die heeft me gelikt, en misschien een beetje gebeten. Maar dat stelde toch niets voor, dacht ik."',
          badge: 'key',
          summary: 'Contact met straathond — mogelijk gebeten',
          note: 'Diercontact in bepaalde regio\'s kan klinisch zeer relevant zijn, ook weken na de blootstelling.'
        }
      },
      {
        id: 'wond',
        phase: 2, time_cost: 10,
        requires: ['reis'],
        label: 'Heeft u tijdens of na uw verblijf in het buitenland medische hulp gezocht?',
        category: 'history',
        icon: '🩹',
        useful: true,
        points: 15,
        result: {
          type: 'quote',
          text: '"Nee. Er was wel een klein incident op een van de laatste dagen — iets met een dier. We hebben het afgespoeld en er niet verder bij stilgestaan. We zagen geen reden om naar een dokter te gaan."',
          badge: 'useful',
          summary: 'Geen medische zorg gezocht na incident',
          note: 'Het nalaten van medische nazorg na een incident in een risicogebied is een relevante anamnestische bevinding.'
        }
      },
      {
        id: 'lab',
        phase: 4, time_cost: 20,
        label: 'Bloed afnemen: bloedbeeld, elektrolyten, CRP',
        category: 'lab',
        icon: '🔬',
        useful: true,
        points: 10,
        result: {
          type: 'labs',
          summary: 'Milde ontstekingsreactie',
          badge: 'useful',
          note: 'Milde ontstekingsreactie aanwezig. Niet specifiek genoeg om de diagnose te stellen.',
          labs: [
            { name: 'Leukocyten',  value: 13.8, unit: '×10⁹/L', status: 'high', ref: '4.0–10.0' },
            { name: 'CRP',         value: 28,   unit: 'mg/L',   status: 'high', ref: '<5' },
            { name: 'Hemoglobine', value: 8.9,  unit: 'mmol/L', status: 'ok',   ref: '8.5–11.0' },
            { name: 'Natrium',     value: 138,  unit: 'mmol/L', status: 'ok',   ref: '135–145' },
            { name: 'Creatinine',  value: 82,   unit: 'µmol/L', status: 'ok',   ref: '60–110' }
          ]
        }
      },
      {
        id: 'ecg',
        phase: 4, time_cost: 15,
        label: 'ECG aanvragen',
        category: 'imaging',
        icon: '📈',
        useful: false,
        points: -12,
        result: {
          type: 'imaging',
          summary: 'ECG zonder afwijkingen',
          badge: 'not',
          note: 'Geen cardiale pathologie. Niet bijdragend aan het klinische beeld.',
          text: 'Sinusritme 110/min. Geen ST-segment afwijkingen, geen geleidingsstoornissen.',
          img: 'ecg_sinus_tachy.png'
        }
      },
      {
        id: 'mri',
        phase: 4, time_cost: 60,
        label: 'MRI hersenen aanvragen',
        category: 'imaging',
        icon: '🧠',
        useful: true,
        points: 10,
        result: {
          type: 'imaging',
          summary: 'MRI: afwijkend signaal meerdere regio\'s',
          badge: 'useful',
          note: 'Beeldvorming toont afwijkingen op meerdere plekken. Klinische correlatie is essentieel — beeldvorming alleen stelt geen diagnose.',
          text: 'T2/FLAIR-hyperintensiteit in de hersenstam en basale ganglia, bilateraal. Subtiel maar aanwezig.',
          img: 'mri_rabies_brainste.png',
          findings: [
            'Hersenstam: bilateraal T2-signaal verhoogd',
            'Basale ganglia: subtiele betrokkenheid',
            'Geen massa, geen bloeding, geen oedeem',
          ]
        }
      },
      {
        id: 'lp',
        phase: 4, time_cost: 30,
        label: 'Lumbaalpunctie uitvoeren',
        category: 'lab',
        icon: '💉',
        useful: true,
        points: 15,
        result: {
          type: 'labs',
          summary: 'Ontsteking in liquor aangetoond',
          badge: 'useful',
          note: 'Ontsteking in het liquor aangetoond. Weeg de indicatie altijd zorgvuldig — een lumbaalpunctie is een invasieve ingreep met risico\'s.',
          labs: [
            { name: 'Opening pressure',  value: 22,   unit: 'cmH₂O', status: 'high', ref: '7–18' },
            { name: 'Leukocyten (liq.)', value: 120,  unit: '/µL',    status: 'high', ref: '<5' },
            { name: 'Proteïne (liq.)',   value: 0.82, unit: 'g/L',    status: 'high', ref: '<0.45' },
            { name: 'Glucose (liq.)',    value: 3.9,  unit: 'mmol/L', status: 'ok',   ref: '>2/3 serum' }
          ]
        }
      },
      {
        id: 'water',
        phase: 3, time_cost: 3,
        label: 'Bied patiënt een glas water aan',
        category: 'physical',
        icon: '💧',
        useful: true,
        points: 35,
        result: {
          type: 'eureka',
          summary: 'Ongewone reactie op water',
          badge: 'eureka',
          note: 'Een klinisch teken dat zelden optreedt, maar wanneer aanwezig sterk richtinggevend is.',
          text: 'Bij het aanreiken van het glas water reageert de patiënt met plotselinge hevige angst. Zijn keel trekt samen. Hij hyperventileert, gooit het glas weg en deinst achteruit, trillend. "Ik... ik kan niet. Doe het weg. Alsjeblieft." Zijn ogen staan groot.',
          findings: [
            'Faryngospasme bij zicht op water',
            'Profuus zweten tijdens de reactie',
            'Hypersalivatie duidelijk verergerd',
          ]
        }
      },
      {
        id: 'ct',
        phase: 4, time_cost: 45,
        label: 'CT hoofd aanvragen',
        category: 'imaging',
        icon: '🖥️',
        useful: false,
        points: -15,
        result: {
          type: 'text',
          text: 'Geen intracraniële bloeding. Geen massa of compressie. Subtiel sulcaal effacement beiderzijds als enige bevinding.',
          badge: 'not',
          summary: 'CT hoofd: geen acute afwijking',
          note: 'Geen relevante bevinding. Blootstelling aan ioniserende straling voor een niet-bijdragend resultaat.'
        }
      },
      {
        id: 'bloedkweken',
        phase: 4, time_cost: 15,
        label: 'Bloedkweken afnemen',
        category: 'lab',
        icon: '🧫',
        useful: false,
        points: -10,
        result: {
          type: 'text',
          text: 'Geen bacteriële groei na 48 uur incubatie.',
          badge: 'not',
          summary: 'Bloedkweken: negatief',
          note: 'Geen bacteriëmie aangetoond. Geen bijdrage aan het klinische beeld.'
        }
      },
      {
        id: 'toxicologie',
        phase: 4, time_cost: 30,
        label: 'Toxicologisch bloedonderzoek',
        category: 'lab',
        icon: '⚗️',
        useful: false,
        points: -12,
        result: {
          type: 'text',
          text: 'Geen toxische stoffen aantoonbaar in het serum. Paracetamol, benzodiazepinen, opiaten: alle negatief.',
          badge: 'not',
          summary: 'Toxicologie: negatief',
          note: 'Intoxicatie uitgesloten. Aanvraag was een dure omweg.'
        }
      },
    ],
    diagnosis: {
      prompt: 'Wat is uw diagnose?',
      options: ['Tetanus', 'Rabies', 'HSV-encefalitis', 'Cryptococcen-meningitis'],
      correct: 1,
      explanation: 'Rabiës is een vrijwel altijd fatale virale encefalitis veroorzaakt door het lyssavirus, overgedragen via beet of liksels van een geïnfecteerd dier. Sleutelbevindingen: reis naar endemisch gebied, diercontact zonder profylaxe, tweefasig beloop, en de karakteristieke reactie op water. Zonder tijdige post-expositieprofylaxe is er na symptoomonset geen effectieve behandeling.',
      wiki: 'Rabiës (lyssavirus) verspreidt zich via perifere zenuwen retrograad naar de hersenen. Incubatietijd: gemiddeld 1–3 maanden. Prodromaal stadium: koorts, malaise, paresthesieën bij de beet. Encefalitische fase: reactie op water (80%), aerofobia, agitatie, hallucinaties, autonome ontregeling. Terminale fase: coma → overlijden. Post-expositieprofylaxe (wondreiniging + vaccin + immunoglobuline) is effectief vóór symptoomonset. Jaarlijks ~59.000 doden wereldwijd, voornamelijk in Azië en Afrika.'
    },

    treatment: {
      prompt: 'De diagnose is gesteld. Wat is nu de meest passende aanpak?',
      options: [
        { label: 'Palliatieve zorg: symptoombestrijding en isolatie',         outcome: 'saved' },
        { label: 'Post-expositieprofylaxe starten (vaccin + immunoglobuline)', outcome: 'wrong_treatment' },
        { label: 'Antivirale therapie met ribavirin starten',                  outcome: 'wrong_treatment' },
        { label: 'Milwaukee protocol: farmacologisch coma induceren',          outcome: 'patient_harmed' },
      ],
      correct: 0,
      explanation: 'Na symptoomonset bestaat er geen bewezen curatieve behandeling. Post-expositieprofylaxe (vaccin + immunoglobuline) is levensreddend vóór de symptomen, maar niet meer daarna. Het Milwaukee protocol (geïnduceerd coma) is experimenteel en heeft bij slechts een handvol patiënten ooit resultaat gehad. Palliatieve zorg met strikte isolatie — speeksel is besmettelijk — is de standaard.',
    },

    outcomes: {
      saved: {
        title: 'Correcte beslissing',
        story: 'U herkende rabiës tijdig en startte palliatieve zorg. Na vijf dagen overlijdt de man omringd door zijn familie. Er was geen remedie — maar u maakte de juiste keuze op het juiste moment. Zijn partner bedankt u persoonlijk.',
        lesson: 'Palliatieve zorg is de enige ethisch verantwoorde keuze na symptoomonset. Vroegtijdig herkennen voorkomt onnodige en pijnlijke behandelingen.',
      },
      wrong_diagnosis: {
        title: 'Diagnose gemist',
        story: 'De werkelijke diagnose bleef onopgemerkt. Behandeling gericht op een andere aandoening had geen effect. De toestand van de patiënt verslechterde snel — een preventabele tragedie.',
        lesson: 'Hydrofobia na diercontact in een endemisch gebied is vrijwel pathognomonisch voor rabiës. Vergeet dit nooit.',
      },
      wrong_treatment: {
        title: 'Verkeerde behandeling',
        story: 'Post-expositieprofylaxe werd gestart — maar dit werkt alleen vóór symptoomonset. De patiënt onderging pijnlijke injecties zonder enig voordeel. Een dure en pijnlijke vergissing.',
        lesson: 'Timing is alles bij rabiës. PEP is effectief vóór de symptomen, niet erna.',
      },
      patient_harmed: {
        title: 'Behandelingsfout',
        story: 'Het Milwaukee protocol werd ingezet: farmacologisch coma, antivirale middelen, intensieve monitoring. Slechts 3 mensen wereldwijd overleefden dit. Uw patiënt niet.',
        lesson: 'Het Milwaukee protocol is niet standaard en heeft een slagingspercentage van <5%. Palliatieve zorg is de bewezen, humane keuze.',
      },
      too_late: {
        title: 'Te laat',
        story: 'Terwijl het onderzoek voortduurde, ontwikkelden zich convulsies. Het bewustzijn daalde. Tegen de tijd dat de diagnose gesteld werd, was elke interventie zinloos.',
        lesson: 'Bij een encefalitisch beeld met snelle verslechtering telt elke minuut. Diagnostische efficiëntie redt levens.',
      },
    },

    memory: [
      'Hydrofobia (heftige angst voor water bij aanbieden) is vrijwel pathognomonisch voor rabiës — één blik is genoeg om de diagnose te overwegen.',
      'Reisgeneeskunde: elk diercontact in een endemisch gebied (Azië, Afrika) vereist post-expositieprofylaxe, ook bij een "kleine" bijtwond of lik.',
      'Tweefasig beloop is kenmerkend: griepachtig prodroom → gedragsverandering & encefalitis — het is nooit "gewoon griep" als de patiënt daarna anders wordt.',
      'Na symptoomonset is rabiës vrijwel altijd fataal. Tijdige wondreiniging + vaccin + immunoglobuline is de enige kans op overleven.',
    ],

    imagePrompts: {
      'mri_rabies_brainste.png': 'Generate a realistic brain MRI axial slice (T2/FLAIR sequence) showing subtle bilateral T2-hyperintensity in the brainstem and basal ganglia, consistent with viral encephalitis. Medical education quality, standard greyscale MRI appearance, no text labels on the image.',
      'ecg_sinus_tachy.png': 'Generate a realistic 12-lead ECG printout showing sinus tachycardia at 110 bpm with no other abnormalities. Standard ECG paper with light pink grid lines, professional hospital quality.'
    }
  }
];
