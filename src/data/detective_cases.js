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
          note: 'Koorts en tachycardie wijzen op een actief systemisch ziekteproces.'
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
          note: 'Een griepachtig begin gevolgd door gedragsverandering — dat tweefasige patroon verdient aandacht.'
        }
      },
      {
        id: 'familie',
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
        label: 'MRI hersenen aanvragen',
        category: 'imaging',
        icon: '🧠',
        useful: true,
        points: 10,
        result: {
          type: 'imaging',
          summary: 'Subtiele hersenstam-afwijking',
          badge: 'useful',
          note: 'Subtiele bevinding in het CZS. Klinische correlatie essentieel — beeldvorming alleen is onvoldoende.',
          text: 'T2/FLAIR-hyperintensiteit in de hersenstam en basale ganglia, bilateraal. Subtiel maar aanwezig.',
          img: 'mri_rabies_brainste.png'
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
          summary: 'Virale CZS-betrokkenheid op LP',
          badge: 'useful',
          note: 'Patroon past bij virale betrokkenheid van het centrale zenuwstelsel. De procedure is invasief en pijnlijk — weeg de indicatie zorgvuldig.',
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
        points: 35,
        result: {
          type: 'eureka',
          summary: 'Ongewone reactie op water',
          badge: 'eureka',
          note: 'Een klinisch teken dat zelden optreedt, maar — wanneer aanwezig — sterk richtinggevend is.',
          text: 'Bij het aanreiken van het glas water reageert de patiënt met plotselinge hevige angst. Zijn keel trekt samen. Hij hyperventileert, gooit het glas weg en deinst achteruit, trillend. "Ik... ik kan niet. Doe het weg. Alsjeblieft." Zijn ogen staan groot.'
        }
      },
      {
        id: 'ct',
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
          note: 'Geen bacteriëmie aangetoond. Dit onderzoek was niet gericht op de meest waarschijnlijke oorzaak.'
        }
      },
      {
        id: 'toxicologie',
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
