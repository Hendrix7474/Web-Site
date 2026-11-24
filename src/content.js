export const C = {
  // Main menu. Each group: a top link (its own page) plus the dropdown items.
  menu: [
    { label: 'Programmi online', href: 'programmi.html', page: 'programmi', items: [
      { label: '[Programma 1]', href: 'programma-1.html' },
      { label: '[Programma 2]', href: 'programma-2.html' },
      { label: '[Programma 3]', href: 'programma-3.html' },
      { label: 'Tutti i programmi', href: 'programmi.html', all: true }
    ] },
    { label: 'Metodo', href: 'metodo.html', page: 'metodo', items: [
      { label: 'Il metodo OTS', href: 'metodo.html' },
      { label: 'Le quattro basi', href: 'metodo.html#basi' },
      { label: 'Trova il tuo programma', href: 'programmi.html#quiz' }
    ] },
    { label: 'Chi siamo', href: 'chi-siamo.html', page: 'chi-siamo', items: [
      { label: 'Il team', href: 'chi-siamo.html#team' },
      { label: 'Cosa dicono di noi', href: 'chi-siamo.html#testimonianze' }
    ] },
    { label: 'In arrivo', href: 'pro.html', page: 'pro' },
    { label: 'Domande', href: 'domande.html', page: 'domande' }
  ],
  loginHref: '#area-riservata',
  menuOpen: 'Menu',
  menuClose: 'Chiudi il menu',
  subOpen: 'Apri il sottomenu',
  home: 'Home',

  pages: {
    programmi: { slash: '/ Programmi online', title: 'Tutti i programmi', text: 'Percorsi completi da seguire dall’app, con il video di ogni esercizio. Filtra per obiettivo o fai il quiz.' },
    metodo: { slash: '/ Metodo', title: 'Il metodo OTS', text: 'Quattro basi che lavorano insieme, con carichi adatti all’età e progressioni pensate per anni.' },
    'chi-siamo': { slash: '/ Chi siamo', title: 'Chi ti allena', text: 'Preparatori che lavorano ogni giorno con atleti giovani, le loro famiglie e le società.' },
    pro: { slash: '/ In arrivo', title: 'Tecnica e pro', text: 'Nuovi percorsi per la parte tecnica e per gli atleti professionisti.' },
    domande: { slash: '/ Domande', title: 'Domande frequenti', text: 'Acquisto, app, età e attrezzatura. Se non trovi la risposta, scrivici.' }
  },

  filterAll: 'Tutti',
  filterLabel: 'Filtra per obiettivo',
  goals: ['Forza', 'Velocità', 'Prevenzione'],
  details: 'Scopri il programma',
  backAll: '← Tutti i programmi',
  includesTitle: 'Cosa trovi dentro',
  includes: ['Schede settimanali con serie, ripetizioni e recuperi', 'Video di ogni esercizio, spiegato passo per passo', 'App e area riservata, sempre con te', 'Progressione dei carichi pensata per l’età'],
  forWhoTitle: 'Per chi è',
  forWho: ['[Età e livello dell’atleta]', '[Sport praticati]', '[Attrezzatura necessaria]'],
  weeksTitle: 'Come è fatto',
  phases: [
    { name: 'Fase 1', weeks: '[Settimane 1–4]', text: '[Obiettivo della fase: tecnica e basi.]' },
    { name: 'Fase 2', weeks: '[Settimane 5–8]', text: '[Obiettivo della fase: carico e potenza.]' },
    { name: 'Fase 3', weeks: '[Settimane 9–12]', text: '[Obiettivo della fase: velocità e trasferimento in campo.]' }
  ],
  onetime: 'Pagamento unico, accesso subito',
  otherProgs: 'Altri programmi',
  contactTitle: 'Non hai trovato la risposta?',
  contactText: 'Scrivici e ti rispondiamo entro un giorno lavorativo.',
  contactMail: '[EMAIL]',
  homeProgTitle: 'Programmi online',
  homeProgText: 'Tre percorsi da seguire dall’app. Scegli quello giusto o confrontali tutti.',
  homeAll: 'Tutti i programmi',
  homeMethodLink: 'Scopri il metodo',
  homeTeamLink: 'Conosci il team',
  login: 'Area riservata',
  navCta: 'Trova il tuo programma',

  heroKicker: 'Preparazione atletica giovanile',
  heroSlash: '/ Allena oggi',
  heroWord: 'Atleti.',
  heroSide: 'Di domani',
  heroPhoto: '[Foto: giovane atleta in azione]',
  heroTitle: ['Allena oggi', 'l’atleta', 'di domani'],
  heroText: 'Programmi di forza, velocità e prevenzione degli infortuni pensati per chi sta ancora crescendo. Ogni settimana sai cosa fare, come farlo e perché.',
  heroCta: 'Scegli il programma',
  heroCta2: 'Fai il quiz in un minuto',

  app: {
    week: 'Settimana 3',
    day: 'Giorno 2 di 3',
    title: 'Forza e salti',
    rest: 'Recupero',
    items: [
      { name: 'Salti sul box', sets: '4 × 5' },
      { name: 'Squat con bilanciere', sets: '3 × 8' },
      { name: 'Sprint 10 m', sets: '6 ripetute' },
      { name: 'Plank laterale', sets: '3 × 30 s' }
    ],
    done: 'completata'
  },

  manifesto: 'Non alleniamo per una stagione. Costruiamo atleti più forti, più veloci e più resistenti agli infortuni, un anno dopo l’altro, con carichi adatti alla loro età.',
  photoBand: '[Foto: allenamento di gruppo]',
  marquee: ['Forza', 'Velocità', 'Prevenzione', 'Crescita', 'Metodo OTS'],

  methodTitle: 'Il metodo OTS',
  methodText: 'Quattro basi che lavorano insieme, in ogni programma e in ogni seduta dell’app.',
  methodHead: ['Dalla base', 'Al campo'],
  methodWords: ['Il', 'Metodo'],
  manifestoHot: ['forti,', 'veloci', 'infortuni,', 'età.'],
  pillars: [
    { name: 'Forza', color: 'red', text: 'Una base solida, costruita con la tecnica prima del carico. I pesi crescono solo quando il movimento è pulito.', detail: 'Squat, spinte, trazioni, salti' },
    { name: 'Velocità e agilità', color: 'blue', text: 'Scatto, frenata e cambi di direzione allenati con metodo, perché in partita la velocità serve in tutte le direzioni.', detail: 'Partenze, accelerazioni, cambi di direzione' },
    { name: 'Prevenzione', color: 'yellow', text: 'Mobilità e stabilità per ginocchia, caviglie e schiena. Meno stop durante l’anno vuol dire più allenamento che conta.', detail: 'Mobilità, equilibrio, core' },
    { name: 'Crescita nel tempo', color: 'green', text: 'Progressioni pensate per anni di sviluppo. Ogni fase prepara la successiva, senza bruciare le tappe.', detail: 'Piani per fasce d’età' }
  ],

  progTitle: 'Scegli il percorso',
  progText: 'Si acquista una volta e si segue dall’app e dall’area riservata, con il video di ogni esercizio.',
  featured: 'Il più scelto',
  buy: 'Acquista',
  progNote: 'Nomi, contenuti e prezzi sono segnaposto da sostituire con i vostri programmi.',
  programs: [
    { slug: 'programma-1', goal: 'Forza', weeks: '[12 settimane]', level: '[Fascia d’età]', name: '[Programma 1]', desc: '[Per chi è e che risultato porta, in una frase.]', features: ['[X] settimane, [Y] sedute a settimana', 'Video di ogni esercizio', 'App e area riservata'], price: '[€00]', featured: false },
    { slug: 'programma-2', goal: 'Velocità', weeks: '[12 settimane]', level: '[Fascia d’età]', name: '[Programma 2]', desc: '[Per chi è e che risultato porta, in una frase.]', features: ['[X] settimane, [Y] sedute a settimana', 'Video di ogni esercizio', 'App e area riservata'], price: '[€00]', featured: true },
    { slug: 'programma-3', goal: 'Prevenzione', weeks: '[8 settimane]', level: '[Fascia d’età]', name: '[Programma 3]', desc: '[Per chi è e che risultato porta, in una frase.]', features: ['[X] settimane, [Y] sedute a settimana', 'Video di ogni esercizio', 'App e area riservata'], price: '[€00]', featured: false }
  ],

  quizTitle: 'Non sai da dove partire?',
  quizText: 'Tre domande e ti indichiamo il programma più adatto.',
  quiz: [
    { q: 'Chi sta compilando?', options: ['Sono un genitore', 'Sono un atleta'] },
    { q: 'Quanti anni ha l’atleta?', options: ['Meno di 12', 'Da 12 a 15', '16 o più'] },
    { q: 'Cosa vuoi migliorare per primo?', options: ['Forza', 'Velocità e agilità', 'Prevenzione infortuni'] }
  ],
  quizStep: 'Domanda',
  quizOf: 'di',
  quizBack: 'Indietro',
  quizResult: 'Il programma per voi',
  quizPick: 'Ti consigliamo',
  quizRestart: 'Rifai il quiz',
  quizNote: 'Anteprima: le regole che abbinano risposte e programmi sono da definire insieme.',

  teamTitle: 'Chi ti allena',
  teamText: 'Preparatori che lavorano ogni giorno con atleti giovani.',
  photo: '[Foto]',
  team: [
    { name: '[Nome Cognome]', role: '[Ruolo e specializzazione]' },
    { name: '[Nome Cognome]', role: '[Ruolo e specializzazione]' },
    { name: '[Nome Cognome]', role: '[Ruolo e specializzazione]' }
  ],

  quotesTitle: 'Cosa dicono atleti e genitori',
  quotes: [
    { text: '[Testimonianza di un genitore, con un risultato concreto.]', who: '[Nome, genitore di un atleta U00]' },
    { text: '[Testimonianza di un atleta, con un risultato concreto.]', who: '[Nome, sport, età]' },
    { text: '[Testimonianza di un allenatore o di una società.]', who: '[Nome, società]' }
  ],

  proTag: 'In arrivo',
  proTitle: 'Tecnica e professionisti',
  proText: 'Stiamo preparando percorsi per la parte tecnica e per gli atleti professionisti. Lascia la tua email e ti avvisiamo appena aprono.',
  proLabel: 'La tua email',
  proBtn: 'Avvisami',
  proSent: 'Iscritto',
  proError: 'Inserisci un indirizzo email valido, per esempio nome@email.it.',
  proDone: 'Anteprima: il modulo verrà collegato al servizio email quando il sito sarà online.',

  faqTitle: 'Domande frequenti',
  faq: [
    { q: 'Come ricevo il programma dopo l’acquisto?', a: 'Subito dopo il pagamento ricevi l’accesso all’area riservata e all’app, dove trovi schede e video.' },
    { q: 'Per che età sono i programmi?', a: '[Da definire per ogni programma.]' },
    { q: 'Serve la palestra?', a: '[Da definire per ogni programma: attrezzatura necessaria.]' },
    { q: 'Posso chiedere il rimborso?', a: '[Inserire la politica di rimborso.]' }
  ],

  ctaTitle: 'Il prossimo passo lo fai oggi',
  ctaBtn: 'Scegli il programma',
  rights: 'Tutti i diritti riservati.',
  footLinks: ['Privacy', 'Termini e condizioni', 'Contatti'],
  footContact: '[EMAIL]  [INSTAGRAM]'
};
