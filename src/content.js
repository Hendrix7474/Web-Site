export const PALETTES = [
  { name: 'Carbone + Arancio', bg: '#111315', surface: '#1A1D20', fg: '#F2F1EC', muted: '#A9ADB0', accent: '#FF5A1F', accentFg: '#111315', line: '#2D3236' },
  { name: 'Navy + Giallo', bg: '#0C1A33', surface: '#12264A', fg: '#F3F5FA', muted: '#AEBBD3', accent: '#FFC21A', accentFg: '#0C1A33', line: '#27406B' },
  { name: 'Chiaro + Cobalto', bg: '#F3F4F1', surface: '#FFFFFF', fg: '#0F1115', muted: '#4B5059', accent: '#2340FF', accentFg: '#FFFFFF', line: '#D9DBD5' }
];

export const TEXT = {
  it: {
    previewLabel: 'Anteprima palette',
    navPrograms: 'Programmi', navMethod: 'Metodo', navTeam: 'Team', navLogin: 'Area riservata', navCta: 'Scegli il programma',
    heroEyebrow: 'Preparazione atletica giovanile',
    heroTitle: 'Allena oggi l’atleta che vuoi essere domani',
    heroText: 'Programmi di preparazione atletica costruiti per giovani atleti: forza, velocità e prevenzione degli infortuni, con un piano chiaro da seguire ogni settimana.',
    heroCta: 'Scegli il tuo programma', heroCta2: 'Fai il quiz',
    heroMedia: '[Foto o video di un allenamento]',
    appKicker: 'Area riservata', appTitle: 'Settimana 3 · Giorno 2', appEx1: 'Salti in alto', appEx2: 'Squat con bilanciere', appDone: 'Seduta completata al 42%',
    stats: [
      { n: '[00]+', label: '[Atleti seguiti]' },
      { n: '[00]', label: '[Programmi disponibili]' },
      { n: '[00]', label: '[Sport coperti]' },
      { n: '[00]', label: '[Anni di esperienza]' }
    ],
    ticker: ['Forza', 'Velocità', 'Agilità', 'Prevenzione infortuni', 'Mobilità', 'Crescita nel tempo'],
    progEyebrow: 'Programmi', progTitle: 'Scegli il percorso giusto',
    progText: 'Ogni programma si acquista una volta e si segue dall’area riservata e dall’app, con video degli esercizi e schede aggiornate.',
    featured: 'In evidenza', buy: 'Acquista',
    progNote: 'Nomi, contenuti e prezzi sono segnaposto da sostituire con i vostri programmi reali.',
    programs: [
      { level: '[Fascia d’età]', name: '[Programma 1]', desc: '[Una frase che spiega a chi è rivolto e che risultato porta.]', features: ['[X] settimane · [Y] sedute a settimana', 'Video dimostrativo di ogni esercizio', 'Accesso da app e area riservata'], price: '[€00]', featured: false },
      { level: '[Fascia d’età]', name: '[Programma 2]', desc: '[Una frase che spiega a chi è rivolto e che risultato porta.]', features: ['[X] settimane · [Y] sedute a settimana', 'Video dimostrativo di ogni esercizio', 'Accesso da app e area riservata'], price: '[€00]', featured: true },
      { level: '[Fascia d’età]', name: '[Programma 3]', desc: '[Una frase che spiega a chi è rivolto e che risultato porta.]', features: ['[X] settimane · [Y] sedute a settimana', 'Video dimostrativo di ogni esercizio', 'Accesso da app e area riservata'], price: '[€00]', featured: false }
    ],
    quizEyebrow: 'Non sai da dove partire?', quizTitle: 'Trova il programma giusto in un minuto',
    quizText: 'Poche domande su età, sport e obiettivi. Alla fine ti indichiamo il programma più adatto.',
    quizParent: 'Sono un genitore', quizAthlete: 'Sono un atleta',
    methEyebrow: 'Il metodo OTS', methTitle: 'Quattro basi per crescere bene',
    pillars: [
      { name: 'Forza', text: 'Una base solida, costruita con tecnica e carichi adatti all’età.' },
      { name: 'Velocità e agilità', text: 'Scatto, cambi di direzione e reattività, allenati con metodo.' },
      { name: 'Prevenzione infortuni', text: 'Mobilità e stabilità per allenarsi più a lungo e meglio.' },
      { name: 'Crescita nel tempo', text: 'Progressioni chiare, pensate per anni di sviluppo e non per una sola stagione.' }
    ],
    teamEyebrow: 'Chi siamo', teamTitle: 'Il team OTS', photo: '[Foto]',
    team: [
      { name: '[Nome Cognome]', role: '[Ruolo · specializzazione]' },
      { name: '[Nome Cognome]', role: '[Ruolo · specializzazione]' },
      { name: '[Nome Cognome]', role: '[Ruolo · specializzazione]' }
    ],
    testEyebrow: 'Risultati', testTitle: 'Cosa dicono atleti e genitori',
    quotes: [
      { text: '[Testimonianza di un genitore, con un risultato concreto.]', who: '[Nome · genitore di un atleta U00]' },
      { text: '[Testimonianza di un atleta, con un risultato concreto.]', who: '[Nome · sport · età]' },
      { text: '[Testimonianza di un allenatore o di una società.]', who: '[Nome · società]' }
    ],
    soon: 'In arrivo', proTitle: 'Tecnica e professionisti',
    proText: 'Stiamo preparando percorsi dedicati alla parte tecnica e agli atleti professionisti. Lascia la tua email per essere avvisato per primo.',
    proLabel: 'La tua email', proBtn: 'Avvisami', proSent: 'Fatto', proError: 'Inserisci un indirizzo email valido, per esempio nome@email.it.',
    proDone: 'Anteprima: il modulo sarà collegato al servizio email quando il sito sarà pubblicato.',
    faqTitle: 'Domande frequenti',
    faq: [
      { q: 'Come ricevo il programma dopo l’acquisto?', a: 'Subito dopo il pagamento ricevi l’accesso all’area riservata e all’app, dove trovi schede e video.' },
      { q: 'Per che età sono i programmi?', a: '[Da definire per ogni programma.]' },
      { q: 'Serve la palestra?', a: '[Da definire per ogni programma: attrezzatura necessaria.]' },
      { q: 'Posso chiedere il rimborso?', a: '[Inserire la politica di rimborso.]' }
    ],
    ctaTitle: 'Inizia oggi il percorso',
    rights: 'Tutti i diritti riservati.', terms: 'Termini e condizioni', contact: 'Contatti'
  },
  en: {
    previewLabel: 'Palette preview',
    navPrograms: 'Programs', navMethod: 'Method', navTeam: 'Team', navLogin: 'Member area', navCta: 'Choose a program',
    heroEyebrow: 'Youth athletic development',
    heroTitle: 'Train today for the athlete you want to be tomorrow',
    heroText: 'Athletic development programs built for young athletes: strength, speed and injury prevention, with a clear plan to follow every week.',
    heroCta: 'Choose your program', heroCta2: 'Take the quiz',
    heroMedia: '[Training photo or video]',
    appKicker: 'Member area', appTitle: 'Week 3 · Day 2', appEx1: 'Box jumps', appEx2: 'Barbell squat', appDone: 'Session 42% complete',
    stats: [
      { n: '[00]+', label: '[Athletes coached]' },
      { n: '[00]', label: '[Programs available]' },
      { n: '[00]', label: '[Sports covered]' },
      { n: '[00]', label: '[Years of experience]' }
    ],
    ticker: ['Strength', 'Speed', 'Agility', 'Injury prevention', 'Mobility', 'Long-term growth'],
    progEyebrow: 'Programs', progTitle: 'Pick the right path',
    progText: 'Buy a program once and follow it from the member area and the app, with exercise videos and updated plans.',
    featured: 'Featured', buy: 'Buy now',
    progNote: 'Names, contents and prices are placeholders to replace with your real programs.',
    programs: [
      { level: '[Age group]', name: '[Program 1]', desc: '[One sentence on who it is for and what result it delivers.]', features: ['[X] weeks · [Y] sessions per week', 'Demo video for every exercise', 'Access from app and member area'], price: '[€00]', featured: false },
      { level: '[Age group]', name: '[Program 2]', desc: '[One sentence on who it is for and what result it delivers.]', features: ['[X] weeks · [Y] sessions per week', 'Demo video for every exercise', 'Access from app and member area'], price: '[€00]', featured: true },
      { level: '[Age group]', name: '[Program 3]', desc: '[One sentence on who it is for and what result it delivers.]', features: ['[X] weeks · [Y] sessions per week', 'Demo video for every exercise', 'Access from app and member area'], price: '[€00]', featured: false }
    ],
    quizEyebrow: 'Not sure where to start?', quizTitle: 'Find the right program in a minute',
    quizText: 'A few questions about age, sport and goals. At the end we point you to the best fit.',
    quizParent: 'I am a parent', quizAthlete: 'I am an athlete',
    methEyebrow: 'The OTS method', methTitle: 'Four foundations for growing well',
    pillars: [
      { name: 'Strength', text: 'A solid base, built with technique and loads suited to age.' },
      { name: 'Speed and agility', text: 'Sprint, change of direction and reactivity, trained with method.' },
      { name: 'Injury prevention', text: 'Mobility and stability to train longer and better.' },
      { name: 'Long-term growth', text: 'Clear progressions designed for years of development, not a single season.' }
    ],
    teamEyebrow: 'About us', teamTitle: 'The OTS team', photo: '[Photo]',
    team: [
      { name: '[First Last]', role: '[Role · specialty]' },
      { name: '[First Last]', role: '[Role · specialty]' },
      { name: '[First Last]', role: '[Role · specialty]' }
    ],
    testEyebrow: 'Results', testTitle: 'What athletes and parents say',
    quotes: [
      { text: '[A parent testimonial with a concrete result.]', who: '[Name · parent of a U00 athlete]' },
      { text: '[An athlete testimonial with a concrete result.]', who: '[Name · sport · age]' },
      { text: '[A coach or club testimonial.]', who: '[Name · club]' }
    ],
    soon: 'Coming soon', proTitle: 'Technical and professionals',
    proText: 'We are preparing paths for technical development and professional athletes. Leave your email to be the first to know.',
    proLabel: 'Your email', proBtn: 'Notify me', proSent: 'Done', proError: 'Enter a valid email address, for example name@email.com.',
    proDone: 'Preview: the form will be connected to the email service when the site goes live.',
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'How do I receive the program after buying?', a: 'Right after payment you get access to the member area and the app, where you find plans and videos.' },
      { q: 'What ages are the programs for?', a: '[To be defined for each program.]' },
      { q: 'Do I need a gym?', a: '[To be defined for each program: equipment needed.]' },
      { q: 'Can I get a refund?', a: '[Insert refund policy.]' }
    ],
    ctaTitle: 'Start the journey today',
    rights: 'All rights reserved.', terms: 'Terms and conditions', contact: 'Contact'
  }
};
