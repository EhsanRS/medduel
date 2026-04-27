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
    investigations: [
      {
        id: 'vitals',
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
          note: 'Koorts en tachycardie aanwezig — past bij infectie of systemische aandoening.'
        }
      },
      {
        id: 'prodroom',
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
          note: 'Klassiek rabiës-prodroom: griepklachten gevolgd door gedragsverandering en angst.'
        }
      },
      {
        id: 'familie',
        label: 'Heeft iemand anders in de omgeving soortgelijke klachten?',
        category: 'history',
        icon: '👨‍👩‍👦',
        useful: false,
        points: -5,
        result: {
          type: 'quote',
          text: '"Nee, niemand anders in zijn omgeving is ziek. Het is echt alleen hij."',
          badge: 'not',
          summary: 'Geen clusterbesmetting',
          note: 'Geen aanwijzing voor een contactbesmettelijke oorzaak.'
        }
      },
      {
        id: 'drugs',
        label: 'Gebruikt patiënt medicatie of drugs?',
        category: 'history',
        icon: '💊',
        useful: false,
        points: -5,
        result: {
          type: 'quote',
          text: '"Nee. Hij gebruikt niets — geen medicijnen, geen recreatieve middelen. Altijd een gezonde man geweest."',
          badge: 'not',
          summary: 'Geen medicatie of drugs',
          note: 'Geen farmacologische verklaring voor de symptomen.'
        }
      },
      {
        id: 'reis',
        label: 'Bent u de afgelopen maanden in het buitenland geweest?',
        category: 'history',
        icon: '✈️',
        useful: true,
        points: 20,
        result: {
          type: 'quote',
          text: '"Ja, ik ben zo\'n zes weken geleden teruggekomen. We hebben drie weken doorgebracht in India, voornamelijk in de buurt van Kolkata — ook een paar dagen in afgelegen dorpjes op het platteland."',
          badge: 'useful',
          summary: 'Reis naar India (6 weken geleden)',
          note: 'India is hyperendemisch voor rabiës. Plattelandsverblijf verhoogt blootstelling aanzienlijk.'
        }
      },
      {
        id: 'dieren',
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
          note: 'Potentiële rabiësblootstelling. Straathonden in India zijn frequent drager van het lyssavirus.'
        }
      },
      {
        id: 'wond',
        label: 'Is er wondverzorging gegeven na het diercontact?',
        category: 'history',
        icon: '🩹',
        useful: true,
        points: 15,
        result: {
          type: 'quote',
          text: '"We hebben het even afgespoeld maar verder niets gedaan. We zijn niet naar een dokter gegaan — dachten niet dat het nodig was."',
          badge: 'useful',
          summary: 'Geen wondverzorging · geen PEP',
          note: 'Geen post-expositieprofylaxe ontvangen. Vaccin + HRIG hadden rabiës kunnen voorkomen.'
        }
      },
      {
        id: 'lab',
        label: 'Bloed afnemen: bloedbeeld, elektrolyten, CRP',
        category: 'lab',
        icon: '🔬',
        useful: true,
        points: 10,
        result: {
          type: 'labs',
          summary: 'Milde ontstekingsreactie',
          badge: 'useful',
          note: 'Lichte leukocytose en CRP-stijging. Niet specifiek — past bij diverse infecties.',
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
        label: 'ECG aanvragen',
        category: 'imaging',
        icon: '📈',
        useful: false,
        points: -5,
        result: {
          type: 'imaging',
          summary: 'ECG zonder afwijkingen',
          badge: 'not',
          note: 'Geen cardiale pathologie. Verliest u kostbare tijd?',
          text: 'Sinusritme 110/min. Geen ST-segment afwijkingen, geen geleidingsstoornissen. Normaal ECG.',
          img: 'ecg_sinus_tachy.jpg'
        }
      },
      {
        id: 'mri',
        label: 'MRI hersenen aanvragen',
        category: 'imaging',
        icon: '🧠',
        useful: true,
        points: 10,
        result: {
          type: 'imaging',
          summary: 'Subtiele hersenstam-afwijking',
          badge: 'useful',
          note: 'Past bij virale encefalitis, maar niet pathognomonisch voor rabiës specifiek.',
          text: 'T2/FLAIR-hyperintensiteit in de hersenstam en basale ganglia, bilateraal. Subtiel maar aanwezig. Past bij virale encefalitis.',
          img: 'mri_rabies_brainstem.jpg'
        }
      },
      {
        id: 'lp',
        label: 'Lumbaalpunctie uitvoeren',
        category: 'lab',
        icon: '💉',
        useful: true,
        points: 15,
        result: {
          type: 'labs',
          summary: 'Virale encefalitis-patroon op LP',
          badge: 'useful',
          note: 'Lymfocytaire pleiocytose: past bij virale encefalitis (rabiës, HSV, enterovirus).',
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
        label: 'Bied patiënt een glas water aan',
        category: 'physical',
        icon: '💧',
        useful: true,
        points: 30,
        result: {
          type: 'eureka',
          summary: 'Hydrofobia geconfirmeerd',
          badge: 'eureka',
          note: 'Hydrofobia (onwillekeurige laryngospasme bij water) is pathognomonisch voor rabiës.',
          text: 'Bij het aanreiken van het glas water reageert de patiënt met plotselinge hevige angst. Zijn keel trekt samen. Hij hyperventileert, gooit het glas weg en deinst achteruit, trillend. "Ik... ik kan niet. Doe het weg. Alsjeblieft." Zijn ogen staan groot.'
        }
      }
    ],
    diagnosis: {
      prompt: 'Wat is uw diagnose?',
      options: ['Tetanus', 'Rabies', 'HSV-encefalitis', 'Cryptococcen-meningitis'],
      correct: 1,
      explanation: 'Rabiës is een vrijwel altijd fatale virale encefalitis veroorzaakt door het lyssavirus, overgedragen via beet of liksels van een geïnfecteerd dier. Sleutelbevindingen: reis naar endemisch gebied, contact met straathond zonder PEP, prodromale fase, en de karakteristieke hydrofobia. Zonder tijdige post-expositieprofylaxe is er na symptoomonset geen effectieve behandeling.',
      wiki: 'Rabiës (lyssavirus) verspreidt zich via perifere zenuwen retrograad naar de hersenen en salivaire klieren. Incubatietijd: gemiddeld 1–3 maanden (range: 1 week – 1 jaar), afhankelijk van locatie en ernst beet. Prodromaal stadium: koorts, malaise, paresthesieën ter plaatse van de beet. Encefalitische fase: hydrofobia (80%), aerofobia, agitatie, hallucinaties, autonome ontregeling. Terminale fase: coma → overlijden. PEP (uitgebreide wondreiniging + rabiësvaccin + rabiësimmunoglobuline) is effectief als gegeven vóór symptoomonset. Jaarlijks ~59.000 doden wereldwijd, voornamelijk in Azië en Afrika.'
    },

    // Prompts for ChatGPT — use these to generate the images
    imagePrompts: {
      'mri_rabies_brainstem.jpg': 'Generate a realistic brain MRI axial slice (T2/FLAIR sequence) showing subtle bilateral T2-hyperintensity in the brainstem and basal ganglia, consistent with viral encephalitis (rabies encephalitis pattern). Medical education quality, standard greyscale MRI appearance, no text labels on the image. The abnormality should be subtle but visible.',
      'ecg_sinus_tachy.jpg': 'Generate a realistic 12-lead ECG printout showing sinus tachycardia at 110 bpm with no other abnormalities: normal QRS axis, no ST-segment changes, no conduction defects, normal P-waves before every QRS. Standard ECG paper with light pink grid lines, professional hospital quality, realistic ECG waveform.'
    }
  }
];
