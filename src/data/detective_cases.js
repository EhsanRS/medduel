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
  },

  {
    id: 'sd-02',
    date: '2026-04-29',
    title: 'De Vrouw Die Dacht Dat Ze Gek Werd',
    difficulty: 4,
    domain: 'endo',
    patient: 'Vrouw, 41 jaar',
    urgency: 'high',

    vitals_baseline: {
      hr: 122, bp_sys: 178, bp_dia: 106, temp: 37.4, spo2: 98, gcs: 15, status: 'unstable',
    },

    vitals_decay: {
      per_action: { hr: 5, bp_sys: 8, temp: 0.1, gcs: 0 },
      triggers: [
        { field: 'hr',     above: true, threshold: 145, message: '⚠ Verpleegkundige: "Doctor, hartslag 148 — ze is erg onrustig en klam."' },
        { field: 'bp_sys', above: true, threshold: 220, message: '🚨 ALARM: bloeddruk kritisch hoog. Gevaar voor hypertensieve encefalopathie.' },
      ],
      too_late_after: 150,
    },

    intro: 'Een 41-jarige vrouw wordt door haar man naar de SEH gebracht. De afgelopen drie maanden heeft ze aanvallen van hevige angst — plotseling, zonder aanleiding. Hart dat tekeer gaat, zweten, ze ziet wit. Soms denkt ze dat ze doodgaat. Haar huisarts verwees haar naar de psychiater: paniekstoornis. De SSRI helpt niet. Vannacht had ze de ergste aanval tot nu toe — ze viel bijna flauw. Ze zit nu rechtop in bed, trillend. "Ik ben niet gek. Er is iets mis met mijn lichaam. Ik voel het."',

    diagnosis: {
      prompt: 'Wat is uw diagnose?',
      options: ['Paniekstoornis met somatisatie', 'Feochromocytoom', 'Primaire hypertensie met hypertensieve crises', 'Hyperthyreoïdie'],
      correct: 1,
      explanation: 'Feochromocytoom is een catecholamine-producerende tumor van de bijniermerg. De klassieke triade — episodische hoofdpijn, zweten en hartkloppingen bij hypertensie — is hier aanwezig. Sleutelaanwijzingen: paroxismaal karakter, plasma-metanefrinen 8-10× de bovengrens, CT-massa rechter bijnier 4.2 cm, en hyperglykemie door catecholamine-effect op insulinesecretie. Feochromocytoom wordt gemiddeld 3 jaar te laat gediagnosticeerd — dit is precies het patroon: jonge vrouw, aanvallen, verwezen naar psychiater.',
      wiki: 'Feochromocytoom: tumor van chromaffiene cellen bijniermerg. Produceert adrenaline en/of noradrenaline. 10%-regel: 10% maligne, 10% bilateraal, 10% extra-adrenaal, 10% bij kinderen. MEN2-syndroom: feochromocytoom + medullair schildkliercarcinoom + hyperparathyreoïdie. Behandeling: eerst alfablokker (fenoxybenzamine) minimaal 10-14 dagen, daarna bètablokker (NOOIT andersom!), dan laparoscopische adrenalectomie.',
    },

    treatment: {
      prompt: 'Feochromocytoom bevestigd. Bloeddruk nu 192/118. Welke behandeling start u?',
      options: [
        { label: 'Metoprolol IV — bètablokker voor de tachycardie',              outcome: 'patient_harmed' },
        { label: 'Fenoxybenzamine oraal starten, electieve chirurgie plannen',   outcome: 'saved'         },
        { label: 'Labetalol IV — alfa + bèta gecombineerd',                      outcome: 'wrong_treatment'},
        { label: 'Opnemen, bloeddruk observeren, morgen verder plannen',         outcome: 'too_late'      },
      ],
      correct: 1,
      explanation: 'Correct protocol: irreversibele alfablokker (fenoxybenzamine) gedurende 10-14 dagen vóór de operatie. Daarna pas bètablokker toevoegen. Bètablokker zonder voorafgaande alfablokkade is een absolute contra-indicatie bij feochromocytoom.',
    },

    outcomes: {
      saved: {
        title: 'Patiënt gered',
        story: 'U start fenoxybenzamine en legt de patiënt uit wat er aan de hand is. Voor het eerst in drie maanden begrijpt iemand wat ze doormaakt. Twaalf dagen later wordt de tumor laparoscopisch verwijderd zonder complicaties. De bloeddruk normaliseert binnen 48 uur. Drie weken later belt ze: "Ik heb geen aanval meer gehad. Ik dacht echt dat ik gek werd."',
        lesson: 'De klassieke valkuil: episodische hypertensie + angstklachten → psychiater. Maar catecholamine-aanvallen veroorzaken angst als symptoom, niet als oorzaak.',
      },
      wrong_diagnosis: {
        title: 'Diagnose gemist',
        story: 'U stuurt haar terug naar de psychiater met aanbeveling de SSRI op te hogen. Drie weken later: hypertensieve crisis, bloeddruk 240/150, hersenbloeding. In de operatiekamer wordt toevallig de bijniermassa gevonden — te laat.',
        lesson: 'Bij jonge patiënten met episodische hypertensie + de triade hoofdpijn-zweten-hartkloppingen altijd feochromocytoom uitsluiten. Plasma-metanefrinen: sensitiviteit >99%.',
      },
      wrong_treatment: {
        title: 'Juiste diagnose, onvoldoende alfablokkade',
        story: 'U geeft labetalol IV. De bloeddruk daalt initieel, maar bij het omdraaien van de patiënt schiet de bloeddruk naar 260/160. Bewustzijnsverlies. Na reanimatie overleeft ze — met blijvende nierschade.',
        lesson: 'Labetalol heeft onvoldoende alfa-selectiviteit bij feochromocytoom. In acute crisis: phentolamine IV of nicardipine IV. Nooit een bètablokker zonder adequate voorafgaande alfablokkade.',
      },
      patient_harmed: {
        title: 'Ernstige behandelingsfout',
        story: 'U geeft metoprolol IV. Binnen 90 seconden schiet de bloeddruk naar 280/170. De patiënt schreeuwt van de hoofdpijn, verliest dan het bewustzijn. CT: massieve intracerebrale bloeding. Ze overleeft de nacht niet.',
        lesson: 'Bètablokker ZONDER voorafgaande alfablokkade bij feochromocytoom = absolute contra-indicatie. Dit is een van de dodelijkste fouten in de endocrinologie. Alfa altijd eerst.',
      },
      too_late: {
        title: 'Te laat ingegrepen',
        story: 'U neemt haar op voor observatie. Om 03:14 uur gaat het alarm: bewusteloos, bloeddruk onmeetbaar, ECG toont ventrikelfibrilleren. Reanimatie mislukt. Obductie bevestigt het feochromocytoom én een verse myocardinfarct door coronairspasmen.',
        lesson: 'Feochromocytoom met actieve crises is een medische urgentie. Alfablokkade moet dezelfde dag worden gestart. Wachten kost levens.',
      },
    },

    memory: [
      'De klassieke triade van feochromocytoom: episodische hoofdpijn + zweten + hartkloppingen bij hypertensie. Denk eraan bij elke jonge patiënt met onverklaarde hypertensie.',
      'Alfa ALTIJD vóór beta. Bètablokker zonder alfablokkade = hypertensieve crisis door onafgeschermde vasoconstrictie.',
      'Plasma-metanefrinen zijn de screeningstest van keuze: sensitiviteit >99%. Een normaal resultaat sluit feochromocytoom vrijwel uit.',
      "SSRI's kunnen bij feochromocytoom gevaarlijk zijn — noradrenaline-potentiëring. Altijd medicatielijst checken.",
    ],

    imagePrompts: {
      'ecg_lvh_sinustachycardie.png': 'Realistic 12-lead ECG showing sinus tachycardia 122 bpm with LVH pattern: tall R waves V5-V6, deep S waves V1-V2, Sokolow-Lyon >35mm. No ST changes. Standard ECG paper, pink gridlines, no patient data.',
      'ct_bijnier_feo.png': 'Realistic axial CT abdomen with contrast: 4.2cm hypervascular mass right adrenal gland with central necrosis and peripheral enhancement. Left adrenal normal. Medical education quality, no labels.',
      'echo_lvh.png': 'Realistic parasternal long-axis echocardiogram: concentric LVH, thickened walls, EF 62%, no wall motion abnormalities, no pericardial effusion. Greyscale ultrasound, no patient data.',
    },

    investigations: [
      {
        id: 'vitals', phase: 1, time_cost: 5,
        label: 'Vitale functies meten', category: 'physical', icon: '🩺', useful: true, points: 15,
        result: { type: 'text', badge: 'useful', summary: 'Ernstige hypertensie · tachycardie',
          text: 'BD 178/106 mmHg · HR 122/min · T 37.4°C · SpO₂ 98% · RR 18/min',
          note: 'Een bloeddruk van 178/106 bij een 41-jarige vrouw zonder bekende hypertensie is alarmerend. Dit is geen paniekstoornis.',
          findings: ['Patiënt trillend en klam van het zweet', 'Ogen wijd opengesperd, hoog alarm', 'Handen voelbaar koud ondanks hypertensie'] }
      },
      {
        id: 'aanvallen', phase: 2, time_cost: 8,
        label: 'Beschrijf de aanvallen precies', category: 'history', icon: '📋', useful: true, points: 20,
        result: { type: 'quote', badge: 'key', summary: 'Episodische aanvallen: paroxismale hypertensie',
          text: '"Het begint altijd plotseling — ik hoef niks te doen. Soms word ik er wakker van. Mijn hart bonkt, ik zweet enorm, ik krijg vreselijke hoofdpijn en ik voel me misselijk. Na een kwartier is het over. Daarna ben ik uitgeput. Het wordt erger. Vroeger één keer per maand, nu bijna elke week."',
          note: 'Episodisch, plotseling, met hartkloppingen + hoofdpijn + zweten = de klassieke triade. Dit is geen angst. Dit is catecholamine-uitstoot.' }
      },
      {
        id: 'psychiatrie', phase: 2, time_cost: 10,
        label: 'Doorvragen over psychische klachten', category: 'history', icon: '🧠', useful: false, points: -10,
        result: { type: 'quote', badge: 'not', summary: 'Geen primaire psychiatrische oorzaak',
          text: '"Ik had nooit angstklachten vóór deze aanvallen. De psychiater zei dat het stress was. Maar ik weet dat het niet klopt — het angstgevoel KOMT met de aanval, het veroorzaakt hem niet."',
          note: 'Belangrijk onderscheid: angst als symptoom van een somatische aandoening versus primaire angststoornis. Maar dit kost kostbare tijd.' }
      },
      {
        id: 'familieanamnese', phase: 2, time_cost: 5,
        label: 'Familiegeschiedenis navragen', category: 'history', icon: '👨‍👩‍👦', useful: true, points: 15,
        result: { type: 'quote', badge: 'useful', summary: 'Familiegeschiedenis: plotse hartdood + endocrien',
          text: '"Mijn oom is op zijn 38e plotseling overleden — ze zeiden dat zijn hart het begaf. Mijn vader heeft schildklierproblemen. Meer weet ik niet."',
          note: 'Plotse hartdood bij jonge familieleden + endocriene aandoeningen. Denk aan MEN2 waarbij feochromocytoom erfelijk voorkomt.' }
      },
      {
        id: 'medicatie', phase: 2, time_cost: 3,
        label: 'Welke medicatie gebruikt ze?', category: 'history', icon: '💊', useful: true, points: 10,
        result: { type: 'quote', badge: 'useful', summary: 'SSRI-gebruik — potentieel gevaarlijk',
          text: '"Sertraline 50mg — dat is de SSRI van de psychiater. En af en toe paracetamol. Verder niets."',
          note: "SSRI's kunnen bij feochromocytoom een hypertensieve crisis uitlokken via noradrenaline-potentiëring. Relevant voor de behandeling." }
      },
      {
        id: 'lo_buik', phase: 3, time_cost: 8,
        label: 'Buikonderzoek verrichten', category: 'physical', icon: '🫃', useful: true, points: 20,
        result: { type: 'text', badge: 'key', summary: 'Vaag gevoel van weerstand rechts retroperitoneaal',
          text: 'Abdomen soepel. Bij diepe palpatie rechts paravertebraal een vaag gevoel van weerstand. Patiënt windt bij palpatie rechts boven.',
          note: 'Feochromocytoom zit op de bijnier — retroperitoneaal, moeilijk palpabel. De pijn bij palpatie is veelzeggend.',
          findings: ['Palpatiepijn rechts paravertebraal', 'Vage weerstand moeilijk te beoordelen door gespannen buikwand'] }
      },
      {
        id: 'bd_beide_armen', phase: 3, time_cost: 8,
        label: 'Bloeddruk beide armen meten', category: 'physical', icon: '💪', useful: false, points: -8,
        result: { type: 'text', badge: 'not', summary: 'Geen bloeddrukasymmetrie',
          text: 'Rechts: 176/104 mmHg. Links: 174/102 mmHg. Geen significante asymmetrie.',
          note: 'Nuttig om aortadissectie uit te sluiten, maar de presentatie wijst daar niet op. Tijdsverlies.' }
      },
      {
        id: 'ecg', phase: 4, time_cost: 5,
        label: 'ECG maken', category: 'imaging', icon: '📈', useful: true, points: 10,
        result: { type: 'imaging', badge: 'useful', summary: 'Sinustachycardie + LVH-kenmerken',
          text: 'Sinusritme 122/min. Voltage-criteria voor linkerventrikelHypertrofie (Sokolow-Lyon >35mm). Geen ST-afwijkingen. Geen bundeltakblok.',
          note: 'De LVH-kenmerken wijzen op chronische drukoverbelasting — deze hypertensie bestaat al langer dan de patiënt denkt.',
          img: 'ecg_lvh_sinustachycardie.png',
          findings: ['LVH: Sokolow-Lyon >35mm', 'Geen ischemie of ritmestoornis'] }
      },
      {
        id: 'lab_basis', phase: 4, time_cost: 20,
        label: 'Bloed: bloedbeeld, elektrolyten, glucose, nierfunctie', category: 'lab', icon: '🔬', useful: true, points: 15,
        result: { type: 'labs', badge: 'useful', summary: 'Hyperglykemie + milde afwijkingen',
          note: 'De verhoogde glucose is geen toeval — catecholaminen remmen insulinesecretie. Dit past bij feochromocytoom.',
          labs: [
            { name: 'Glucose',     value: 9.4,  unit: 'mmol/L',  status: 'high', ref: '4.0–6.0'  },
            { name: 'Kalium',      value: 3.3,  unit: 'mmol/L',  status: 'low',  ref: '3.5–5.0'  },
            { name: 'Natrium',     value: 141,  unit: 'mmol/L',  status: 'ok',   ref: '135–145'  },
            { name: 'Kreatinine',  value: 98,   unit: 'µmol/L',  status: 'ok',   ref: '60–110'   },
            { name: 'Leukocyten',  value: 11.2, unit: '×10⁹/L',  status: 'high', ref: '4.0–10.0' },
            { name: 'CRP',         value: 12,   unit: 'mg/L',    status: 'high', ref: '<5'        }
          ] }
      },
      {
        id: 'metanefrinen', phase: 4, time_cost: 25,
        label: 'Plasma-metanefrinen aanvragen', category: 'lab', icon: '⚗️', useful: true, points: 35,
        result: { type: 'labs', badge: 'eureka', summary: 'Sterk verhoogde metanefrinen',
          note: 'Dit is de diagnostische doorbraak. Plasma-metanefrinen zijn de meest sensitieve test voor feochromocytoom (sensitiviteit >99%). Deze waarden zijn 8-10× de bovengrens.',
          labs: [
            { name: 'Metanefrine',    value: 2840, unit: 'pmol/L', status: 'high', ref: '<500' },
            { name: 'Normetanefrine', value: 4120, unit: 'pmol/L', status: 'high', ref: '<900' }
          ] }
      },
      {
        id: 'ct_abdomen', phase: 4, time_cost: 40,
        label: 'CT abdomen met contrast aanvragen', category: 'imaging', icon: '🖥️', useful: true, points: 25,
        result: { type: 'imaging', badge: 'key', summary: 'Massa rechter bijnier 4.2 cm',
          text: 'Rechter bijnier: heterogene massa van 4.2 × 3.8 cm met centrale necrose en sterke randaankleuring na contrast. Geen lymfadenopathie. Linker bijnier normaal.',
          note: 'Bevestigt de lokalisatie. Geef eerst alfablokker om hypertensieve crisis tijdens CT te voorkomen.',
          img: 'ct_bijnier_feo.png',
          findings: ['Massa rechter bijnier 4.2 cm met centrale necrose', 'Sterk hypervasculair — typisch feochromocytoom'] }
      },
      {
        id: 'echo_hart', phase: 4, time_cost: 35,
        label: 'Echo hart aanvragen', category: 'imaging', icon: '❤️', useful: false, points: -12,
        result: { type: 'imaging', badge: 'not', summary: 'LVH bevestigd, geen acute afwijkingen',
          text: 'Concentrische LVH. EF 62%. Geen wandbewegingsstoornissen. Geen klepafwijkingen.',
          note: 'LVH past bij chronische hypertensie. Niet bijdragend voor de acute diagnose. 35 minuten verloren.',
          img: 'echo_lvh.png' }
      },
      {
        id: 'thyroid', phase: 4, time_cost: 20,
        label: 'TSH en schildklierfunctie bepalen', category: 'lab', icon: '🦋', useful: false, points: -8,
        result: { type: 'labs', badge: 'not', summary: 'Schildklierfunctie normaal',
          note: 'Hyperthyreoïdie kan een soortgelijk beeld geven, maar de episodische aard past daar niet bij. Tijdsverlies.',
          labs: [
            { name: 'TSH',     value: 1.8, unit: 'mU/L',  status: 'ok', ref: '0.4–4.0' },
            { name: 'Vrij T4', value: 14,  unit: 'pmol/L', status: 'ok', ref: '10–20'   }
          ] }
      },
    ],
  },
];
