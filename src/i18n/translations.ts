export interface Translations {
  locale: string;
  nav: {
    home: string;
    books: string;
    loans: string;
    locations: string;
    stats: string;
    bookDetail: string;
    users: string;
    settings: string;
  };
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    back: string;
    confirm: string;
    logout: string;
    email: string;
    password: string;
    familyName: string;
    fullName: string;
    name: string;
    description: string;
    you: string;
  };
  validation: {
    invalidEmail: string;
    passwordRequired: string;
    minChars8: string;
    familyNameRequired: string;
    titleRequired: string;
    passwordsMismatch: string;
    required: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    loginButton: string;
    demoHintTitle: string;
    demoHintBody: string;
    forgotPasswordLink: string;
    registerLink: string;
    invalidCredentials: string;
    inactiveAccount: string;
    genericError: string;
    registerTitle: string;
    registerSubtitle: string;
    registerButton: string;
    registerWipeHint: string;
    haveAccountLink: string;
    forgotTitle: string;
    forgotSubtitle: string;
    forgotButton: string;
    forgotSuccess: string;
    backToLoginLink: string;
    resetTitle: string;
    resetSubtitle: string;
    newPasswordLabel: string;
    confirmPasswordLabel: string;
    resetButton: string;
    resetSuccess: string;
    goToLoginButton: string;
  };
  enums: {
    role: { admin: string; editor: string; viewer: string };
    readingStatus: { to_read: string; reading: string; read: string };
    genre: Record<string, string>;
    condition: { new: string; good: string; fair: string; poor: string };
    source: { purchased: string; gift: string; borrowed: string; other: string };
  };
  placement: {
    room: string;
    bookcase: string;
    section: string;
    shelf: string;
    selectPlaceholder: string;
  };
  pagination: {
    prev: string;
    next: string;
    page: (n: number) => string;
  };
  export: {
    button: string;
    csv: string;
    json: string;
  };
  filters: {
    ownerLabel: string;
    allOwners: string;
    genreLabel: string;
    allGenres: string;
  };
  users: {
    title: string;
    description: (n: number) => string;
    inviteButton: string;
    createTitle: string;
    editTitle: string;
    roleLabel: string;
    activeLabel: string;
    inactiveBadge: string;
    inviteHint: string;
    cannotEditSelf: string;
    deleteConfirmTitle: string;
    deleteConfirmMessage: (name: string) => string;
  };
  settings: {
    title: string;
    familyTitle: string;
    familyAdminOnly: string;
    profileTitle: string;
    annualGoalLabel: string;
    annualGoalHint: string;
    appearanceTitle: string;
    themeLabel: string;
    modeLabel: string;
    modeLight: string;
    modeDark: string;
    modeSystem: string;
    languageTitle: string;
    backupTitle: string;
    exportLibraryLabel: string;
    fullBackupLabel: string;
    exportBackupButton: string;
    importBackupButton: string;
    importConfirmTitle: string;
    importConfirmMessage: (counts: string) => string;
    importWarning: string;
    importSuccess: string;
    importError: string;
    signOutTitle: string;
    signOutButton: string;
    dangerZoneTitle: string;
    deleteAccountButton: string;
    deleteAccountWarning: string;
    deleteAccountConfirmFamilyName: string;
    deleteAccountConfirmPassword: string;
    deleteAccountConfirmButton: string;
    deleteAccountMismatch: string;
    themeNames: { pergamena: string; akabeni: string; sumi: string };
  };
  sidebar: { subtitle: string };
  banner: { text: string; link: string };
  dashboard: {
    description: string;
    statTotal: string;
    statRead: string;
    statReading: string;
    statToRead: string;
    currentlyReading: string;
    noCurrentlyReading: string;
    untitled: string;
    onLoan: string;
    seeAll: string;
    allBooksHome: string;
    overdue: string;
    due: string;
    recentlyAdded: string;
    noRecentlyAdded: string;
    nextRead: string;
    another: string;
    noNextRead: string;
    unreadTitle: string;
    unreadDesc: (n: number) => string;
    familyFavorites: string;
    noFamilyFavorites: string;
    members: (n: number) => string;
    readingGoal: (year: number) => string;
    activityTitle: string;
    activityVerb: string;
  };
  catalog: {
    booksInLibrary: (n: number) => string;
    searchLabel: string;
    searchPlaceholder: string;
    roomLabel: string;
    allRooms: string;
    statusAll: string;
    statusToRead: string;
    statusReading: string;
    statusRead: string;
    results: (n: number) => string;
    resultsFor: string;
    noResults: string;
    noResultsHint: string;
    removeFilters: string;
  };
  books: {
    duplicateTitle: string;
    duplicateIsbnReason: string;
    duplicateTitleReason: string;
    duplicateConfirm: string;
    add: {
      pageTitle: string;
      typeTab: string;
      scanTab: string;
      isbnLabel: string;
      lookupButton: string;
      notFoundMessage: string;
      manualEntryButton: string;
      simulateScanButton: string;
      formTitle: string;
      titleLabel: string;
      authorLabel: string;
      isbnFieldLabel: string;
      publisherLabel: string;
      yearLabel: string;
      genreLabel: string;
      placementTitle: string;
      readingStatusLabel: string;
      ownerLabel: string;
      noOwner: string;
      submitButton: string;
      successToast: string;
    };
    shelfAdd: {
      pageTitle: string;
      setupHint: string;
      startButton: string;
      changePositionButton: string;
      doneButton: string;
      countLabel: (n: number) => string;
      addButton: string;
      editButton: string;
      skipButton: string;
      undoButton: string;
      sessionTitle: string;
      noSessionBooks: string;
    };
  };
  bookDetail: {
    notFound: string;
    recordNotFound: string;
    backToCatalog: string;
    fieldYear: string;
    fieldPublisher: string;
    fieldIsbn: string;
    fieldGenre: string;
    fieldPurchased: string;
    position: string;
    sectionLabel: (n: number) => string;
    shelfLabel: (n: number) => string;
    posLabel: string;
    owner: string;
    readingBy: string;
    loanStatus: string;
    loanedTo: string;
    loanedFrom: string;
    dueDate: string;
    notes: string;
    readBy: (n: number) => string;
    editButton: string;
    moveButton: string;
    deleteButton: string;
    deleteConfirmTitle: string;
    deleteConfirmMessage: string;
    editModalTitle: string;
    editRecordSection: string;
    editCopySection: string;
    moveModalTitle: string;
    conditionLabel: string;
    sourceLabel: string;
    tagsLabel: string;
    tagsHint: string;
    whoReadTitle: string;
    markRead: string;
    markUnread: string;
    lendTitle: string;
    borrowerLabel: string;
    dueDateLabel: string;
    lendButton: string;
    returnButton: string;
    loanHistoryTitle: string;
    noLoanHistory: string;
    presentationTitle: string;
    presentationEmpty: string;
    generateAiButton: string;
    generatingAi: string;
    editPresentationButton: string;
    sourceManual: string;
    sourceAi: string;
    sourceEditorial: string;
    historyTitle: string;
    noHistory: string;
  };
  loans: {
    title: string;
    subtitle: (active: number, returned: number) => string;
    activeLoans: string;
    noActiveLoans: string;
    colBook: string;
    colLoanedTo: string;
    colFrom: string;
    colDue: string;
    colStatus: string;
    returnedLoans: string;
    noReturnedLoans: string;
    colReturnedOn: string;
    statusOnLoan: string;
  };
  locations: {
    title: string;
    description: (rooms: number, bookcases: number, books: number) => string;
    booksCount: (n: number) => string;
    viewMap: string;
    sectionLabel: (n: number) => string;
    shelfLabel: (n: number) => string;
    addRoom: string;
    editRoom: string;
    deleteRoomConfirm: string;
    addBookcase: string;
    editBookcase: string;
    deleteBookcaseConfirm: string;
    addSection: string;
    editSection: string;
    deleteSectionConfirm: string;
    addShelf: string;
    editShelf: string;
    deleteShelfConfirm: string;
    nameLabel: string;
    labelLabel: string;
    notesLabel: string;
    emptyTitle: string;
  };
  bookcaseMap: {
    notFound: string;
    backToLocations: string;
    legend: string;
    emptyShelf: string;
    sectionLabel: (n: number) => string;
    shelfLabel: (n: number) => string;
  };
  stats: {
    title: string;
    description: string;
    totalBooks: string;
    registeredReads: string;
    distinctGenres: string;
    familyMembers: string;
    booksRead: string;
    booksOwned: string;
    genreDistribution: string;
    genreCount: (n: number, pct: number) => string;
    topAuthors: string;
    authorCount: (n: number) => string;
    byRoom: string;
    roomCount: (n: number, pct: number) => string;
    viewRead: string;
    viewOwned: string;
    bookListTitleUnread: string;
    bookListTitleRead: (name: string) => string;
    bookListTitleOwned: (name: string) => string;
    backToStats: string;
    noMatches: string;
  };
  badge: {
    read: string;
    reading: string;
    toRead: string;
    info: string;
    danger: string;
  };
}

export const it: Translations = {
  locale: "it-IT",
  nav: {
    home: "Home",
    books: "Libri",
    loans: "In prestito",
    locations: "Librerie",
    stats: "Statistiche",
    bookDetail: "Dettaglio libro",
    users: "Utenti",
    settings: "Impostazioni",
  },
  common: {
    save: "Salva",
    cancel: "Annulla",
    delete: "Elimina",
    edit: "Modifica",
    add: "Aggiungi",
    back: "← Indietro",
    confirm: "Confermi",
    logout: "Esci",
    email: "Email",
    password: "Password",
    familyName: "Nome famiglia",
    fullName: "Nome completo",
    name: "Nome",
    description: "Descrizione",
    you: "tu",
  },
  validation: {
    invalidEmail: "Indirizzo email non valido",
    passwordRequired: "La password è obbligatoria",
    minChars8: "Minimo 8 caratteri",
    familyNameRequired: "Il nome della famiglia è obbligatorio",
    titleRequired: "Il titolo è obbligatorio",
    passwordsMismatch: "Le password non coincidono",
    required: "Campo obbligatorio",
  },
  auth: {
    loginTitle: "Accedi",
    loginSubtitle: "La tua biblioteca di famiglia",
    loginButton: "Accedi",
    demoHintTitle: "Credenziali demo",
    demoHintBody: "carmelo@jinbocho.app (admin) · sara@jinbocho.app (editor) · luca@jinbocho.app (viewer) — qualsiasi password funziona.",
    forgotPasswordLink: "Password dimenticata?",
    registerLink: "Crea una famiglia →",
    invalidCredentials: "Credenziali non valide",
    inactiveAccount: "Account disattivato",
    genericError: "Qualcosa è andato storto, riprova",
    registerTitle: "Crea la tua famiglia",
    registerSubtitle: "Inizia la tua biblioteca",
    registerButton: "Crea famiglia",
    registerWipeHint: "In questa demo, la registrazione azzera i dati simulati e parte da una libreria vuota.",
    haveAccountLink: "Hai già un account? Accedi",
    forgotTitle: "Password dimenticata",
    forgotSubtitle: "Ti invieremo un link per reimpostarla",
    forgotButton: "Invia link",
    forgotSuccess: "Se l'email esiste, riceverai un link per reimpostare la password. (Demo: nessuna email viene realmente inviata)",
    backToLoginLink: "← Torna al login",
    resetTitle: "Reimposta password",
    resetSubtitle: "Scegli una nuova password",
    newPasswordLabel: "Nuova password",
    confirmPasswordLabel: "Conferma password",
    resetButton: "Reimposta password",
    resetSuccess: "Password reimpostata con successo.",
    goToLoginButton: "Vai al login",
  },
  enums: {
    role: { admin: "Admin", editor: "Editor", viewer: "Lettore" },
    readingStatus: { to_read: "Da leggere", reading: "In lettura", read: "Letto" },
    genre: {
      fiction: "Narrativa", fantasy: "Fantasy", science_fiction: "Fantascienza", mystery_thriller: "Giallo/Thriller",
      romance: "Romance", horror: "Horror", historical: "Storico", biography_memoir: "Biografia",
      history: "Storia", science: "Scienza", philosophy: "Filosofia", religion: "Religione",
      self_help: "Crescita personale", business: "Business", art: "Arte", poetry: "Poesia",
      drama: "Teatro", comics: "Fumetti", children: "Bambini", young_adult: "Young Adult",
      travel: "Viaggi", cooking: "Cucina", essay: "Saggistica", reference: "Consultazione", other: "Altro",
    },
    condition: { new: "Nuovo", good: "Buono", fair: "Discreto", poor: "Usurato" },
    source: { purchased: "Acquistato", gift: "Regalo", borrowed: "Prestato", other: "Altro" },
  },
  placement: {
    room: "Stanza",
    bookcase: "Libreria",
    section: "Sezione",
    shelf: "Ripiano",
    selectPlaceholder: "— Seleziona —",
  },
  pagination: {
    prev: "← Precedente",
    next: "Successiva →",
    page: (n) => `Pagina ${n}`,
  },
  export: {
    button: "Esporta",
    csv: "CSV",
    json: "JSON",
  },
  filters: {
    ownerLabel: "Proprietario",
    allOwners: "Tutti i proprietari",
    genreLabel: "Genere",
    allGenres: "Tutti i generi",
  },
  users: {
    title: "Utenti",
    description: (n) => `${n} membr${n === 1 ? "o" : "i"} della famiglia`,
    inviteButton: "Invita utente",
    createTitle: "Invita utente",
    editTitle: "Modifica utente",
    roleLabel: "Ruolo",
    activeLabel: "Attivo",
    inactiveBadge: "Disattivato",
    inviteHint: "In questa demo l'utente viene creato subito, senza invio email.",
    cannotEditSelf: "Non puoi modificare il tuo ruolo o stato",
    deleteConfirmTitle: "Rimuovi utente?",
    deleteConfirmMessage: (name) => `${name} verrà rimosso dalla famiglia.`,
  },
  settings: {
    title: "Impostazioni",
    familyTitle: "Famiglia",
    familyAdminOnly: "Solo gli admin possono modificare questi dati",
    profileTitle: "Profilo",
    annualGoalLabel: "Obiettivo di lettura annuale",
    annualGoalHint: "Numero di libri che vuoi leggere quest'anno",
    appearanceTitle: "Aspetto",
    themeLabel: "Tema",
    modeLabel: "Modalità",
    modeLight: "☀️ Chiaro",
    modeDark: "🌙 Scuro",
    modeSystem: "💻 Sistema",
    languageTitle: "Lingua",
    backupTitle: "Backup ed esportazione",
    exportLibraryLabel: "Esporta i libri (CSV/JSON)",
    fullBackupLabel: "Backup completo",
    exportBackupButton: "Esporta backup completo",
    importBackupButton: "Importa backup",
    importConfirmTitle: "Importa backup?",
    importConfirmMessage: (counts) => `Questo backup contiene: ${counts}.`,
    importWarning: "I dati verranno sostituiti con quelli del backup importato in questa sessione demo.",
    importSuccess: "Backup importato con successo",
    importError: "File di backup non valido",
    signOutTitle: "Esci",
    signOutButton: "Esci dall'account",
    dangerZoneTitle: "Zona pericolosa",
    deleteAccountButton: "Elimina famiglia",
    deleteAccountWarning: "Questa azione elimina la famiglia, tutti gli utenti e la libreria. In questa demo puoi sempre ricaricare la pagina per ripristinare i dati originali.",
    deleteAccountConfirmFamilyName: "Digita il nome della famiglia per confermare",
    deleteAccountConfirmPassword: "Password",
    deleteAccountConfirmButton: "Elimina definitivamente",
    deleteAccountMismatch: "Il nome della famiglia non corrisponde",
    themeNames: { pergamena: "Pergamena", akabeni: "Akabeni", sumi: "Sumi" },
  },
  sidebar: { subtitle: "Biblioteca di casa" },
  banner: {
    text: "⚠️ Demo interattiva — tutti i dati sono simulati.",
    link: "Scopri il progetto reale su GitHub →",
  },
  dashboard: {
    description: "Una panoramica della tua biblioteca di famiglia.",
    statTotal: "Totale libri",
    statRead: "Letti",
    statReading: "In lettura",
    statToRead: "Da leggere",
    currentlyReading: "In lettura",
    noCurrentlyReading: "Nessun libro in lettura",
    untitled: "Senza titolo",
    onLoan: "In prestito",
    seeAll: "Vedi tutti →",
    allBooksHome: "Tutti i libri sono in casa",
    overdue: "Scaduto",
    due: "Scade",
    recentlyAdded: "Aggiunti di recente",
    noRecentlyAdded: "Nessun libro ancora",
    nextRead: "Cosa leggere dopo?",
    another: "🎲 Un altro",
    noNextRead: "Nessun libro nella lista da leggere",
    unreadTitle: "Non letti da nessuno",
    unreadDesc: (n) => `${n === 1 ? "libro" : "libri"} che nessun membro ha ancora letto`,
    familyFavorites: "Preferiti di famiglia",
    noFamilyFavorites: "Nessun libro letto da più di un membro",
    members: (n) => `${n} membri`,
    readingGoal: (year) => `Obiettivo di lettura ${year}`,
    activityTitle: "Attività famiglia",
    activityVerb: "ha letto",
  },
  catalog: {
    booksInLibrary: (n) => `${n} libri in biblioteca`,
    searchLabel: "Cerca per titolo o autore",
    searchPlaceholder: "es. Calvino, 1984...",
    roomLabel: "Stanza",
    allRooms: "Tutte le stanze",
    statusAll: "Tutti",
    statusToRead: "Da leggere",
    statusReading: "In lettura",
    statusRead: "Letti",
    results: (n) => `${n} risultat${n === 1 ? "o" : "i"}`,
    resultsFor: "per",
    noResults: "Nessun libro trovato",
    noResultsHint: "Prova a modificare i filtri di ricerca",
    removeFilters: "Rimuovi filtri",
  },
  books: {
    duplicateTitle: "Possibile duplicato",
    duplicateIsbnReason: "Esiste già una scheda con lo stesso ISBN:",
    duplicateTitleReason: "Esiste già una scheda con titolo e autore identici:",
    duplicateConfirm: "Aggiungi comunque",
    add: {
      pageTitle: "Aggiungi libro",
      typeTab: "Digita ISBN",
      scanTab: "Scansiona",
      isbnLabel: "ISBN",
      lookupButton: "Cerca",
      notFoundMessage: "ISBN non trovato in questa demo. Inserisci i dati manualmente.",
      manualEntryButton: "Inserisci manualmente",
      simulateScanButton: "📷 Simula scansione",
      formTitle: "Dati del libro",
      titleLabel: "Titolo",
      authorLabel: "Autore",
      isbnFieldLabel: "ISBN",
      publisherLabel: "Editore",
      yearLabel: "Anno",
      genreLabel: "Genere",
      placementTitle: "Posizione",
      readingStatusLabel: "Stato di lettura",
      ownerLabel: "Proprietario",
      noOwner: "Nessuno",
      submitButton: "Aggiungi alla libreria",
      successToast: "Libro aggiunto alla libreria",
    },
    shelfAdd: {
      pageTitle: "Aggiungi più libri allo scaffale",
      setupHint: "Scegli la posizione e (opzionalmente) il proprietario: resteranno fissi per tutti i libri di questa sessione.",
      startButton: "Inizia",
      changePositionButton: "Cambia posizione",
      doneButton: "Fine",
      countLabel: (n) => `${n} libr${n === 1 ? "o aggiunto" : "i aggiunti"}`,
      addButton: "Aggiungi",
      editButton: "Modifica",
      skipButton: "Salta",
      undoButton: "Annulla",
      sessionTitle: "Libri aggiunti in questa sessione",
      noSessionBooks: "Nessun libro aggiunto ancora",
    },
  },
  bookDetail: {
    notFound: "Libro non trovato",
    recordNotFound: "Scheda bibliografica non trovata",
    backToCatalog: "← Torna al catalogo",
    fieldYear: "Anno",
    fieldPublisher: "Editore",
    fieldIsbn: "ISBN",
    fieldGenre: "Genere",
    fieldPurchased: "Acquistato",
    position: "Posizione",
    sectionLabel: (n) => `Sezione ${n}`,
    shelfLabel: (n) => `Ripiano ${n}`,
    posLabel: "Pos.",
    owner: "Proprietario",
    readingBy: "In lettura da",
    loanStatus: "In prestito",
    loanedTo: "Prestato a",
    loanedFrom: "dal",
    dueDate: "Scadenza:",
    notes: "Note",
    readBy: (n) => `Letto da (${n})`,
    editButton: "Modifica",
    moveButton: "Sposta",
    deleteButton: "Elimina",
    deleteConfirmTitle: "Elimina libro?",
    deleteConfirmMessage: "Questa copia verrà rimossa dalla libreria. L'azione non è reversibile in questa sessione demo.",
    editModalTitle: "Modifica libro",
    editRecordSection: "Scheda bibliografica (condivisa)",
    editCopySection: "Questa copia",
    moveModalTitle: "Sposta libro",
    conditionLabel: "Condizione",
    sourceLabel: "Provenienza",
    tagsLabel: "Tag",
    tagsHint: "Separati da virgola",
    whoReadTitle: "Chi l'ha letto",
    markRead: "Segna come letto",
    markUnread: "Segna come non letto",
    lendTitle: "Presta questo libro",
    borrowerLabel: "Nome di chi lo riceve",
    dueDateLabel: "Scadenza (opzionale)",
    lendButton: "Presta",
    returnButton: "Segna come restituito",
    loanHistoryTitle: "Storico prestiti",
    noLoanHistory: "Nessun prestito registrato",
    presentationTitle: "Presentazione",
    presentationEmpty: "Nessuna presentazione disponibile per questo libro.",
    generateAiButton: "✨ Genera con AI",
    generatingAi: "Generazione in corso...",
    editPresentationButton: "Modifica",
    sourceManual: "Manuale",
    sourceAi: "Generata con AI",
    sourceEditorial: "Editoriale",
    historyTitle: "Cronologia",
    noHistory: "Nessun evento registrato",
  },
  loans: {
    title: "In prestito",
    subtitle: (active, returned) =>
      `${active} attiv${active === 1 ? "o" : "i"} · ${returned} restituiti`,
    activeLoans: "Prestiti attivi",
    noActiveLoans: "Nessun prestito attivo",
    colBook: "Libro",
    colLoanedTo: "Prestato a",
    colFrom: "Dal",
    colDue: "Scadenza",
    colStatus: "Stato",
    returnedLoans: "Prestiti restituiti",
    noReturnedLoans: "Nessun prestito restituito",
    colReturnedOn: "Restituito il",
    statusOnLoan: "In prestito",
  },
  locations: {
    title: "Librerie",
    description: (rooms, bookcases, books) =>
      `${rooms} stanze · ${bookcases} librerie · ${books} libri`,
    booksCount: (n) => `${n} libri`,
    viewMap: "Vedi mappa",
    sectionLabel: (n) => `Sezione ${n}`,
    shelfLabel: (n) => `Ripiano ${n}`,
    addRoom: "Aggiungi stanza",
    editRoom: "Modifica stanza",
    deleteRoomConfirm: "La stanza e tutto il suo contenuto (librerie, sezioni, ripiani) verranno rimossi. I libri resteranno in libreria ma senza posizione.",
    addBookcase: "Aggiungi libreria",
    editBookcase: "Modifica libreria",
    deleteBookcaseConfirm: "La libreria e il suo contenuto (sezioni, ripiani) verranno rimossi. I libri resteranno in libreria ma senza posizione.",
    addSection: "Aggiungi sezione",
    editSection: "Rinomina sezione",
    deleteSectionConfirm: "La sezione e i suoi ripiani verranno rimossi.",
    addShelf: "Aggiungi ripiano",
    editShelf: "Modifica ripiano",
    deleteShelfConfirm: "Il ripiano verrà rimosso.",
    nameLabel: "Nome",
    labelLabel: "Etichetta (opzionale)",
    notesLabel: "Note (opzionale)",
    emptyTitle: "Nessuna stanza ancora",
  },
  bookcaseMap: {
    notFound: "Libreria non trovata",
    backToLocations: "← Torna alle librerie",
    legend: "Legenda:",
    emptyShelf: "Ripiano vuoto",
    sectionLabel: (n) => `Sezione ${n}`,
    shelfLabel: (n) => `Ripiano ${n}`,
  },
  stats: {
    title: "Statistiche",
    description: "Panoramica della biblioteca di famiglia",
    totalBooks: "Libri totali",
    registeredReads: "Letture registrate",
    distinctGenres: "Generi diversi",
    familyMembers: "Membri della famiglia",
    booksRead: "Libri letti",
    booksOwned: "Libri posseduti",
    genreDistribution: "Distribuzione per genere",
    genreCount: (n, pct) => `${n} libr${n === 1 ? "o" : "i"} · ${pct}%`,
    topAuthors: "Autori più presenti in biblioteca",
    authorCount: (n) => `${n} libr${n === 1 ? "o" : "i"}`,
    byRoom: "Distribuzione per stanza",
    roomCount: (n, pct) => `${n} libr${n === 1 ? "o" : "i"} · ${pct}%`,
    viewRead: "Vedi letti →",
    viewOwned: "Vedi posseduti →",
    bookListTitleUnread: "Libri non letti da nessuno",
    bookListTitleRead: (name) => `Libri letti da ${name}`,
    bookListTitleOwned: (name) => `Libri posseduti da ${name}`,
    backToStats: "← Torna alle statistiche",
    noMatches: "Nessun libro corrisponde",
  },
  badge: {
    read: "Letto",
    reading: "In lettura",
    toRead: "Da leggere",
    info: "Info",
    danger: "Attenzione",
  },
};

export const en: Translations = {
  locale: "en-US",
  nav: {
    home: "Home",
    books: "Books",
    loans: "On Loan",
    locations: "Bookcases",
    stats: "Statistics",
    bookDetail: "Book Detail",
    users: "Users",
    settings: "Settings",
  },
  common: {
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    back: "← Back",
    confirm: "Confirm",
    logout: "Sign out",
    email: "Email",
    password: "Password",
    familyName: "Family name",
    fullName: "Full name",
    name: "Name",
    description: "Description",
    you: "you",
  },
  validation: {
    invalidEmail: "Invalid email address",
    passwordRequired: "Password is required",
    minChars8: "Minimum 8 characters",
    familyNameRequired: "Family name is required",
    titleRequired: "Title is required",
    passwordsMismatch: "Passwords don't match",
    required: "This field is required",
  },
  auth: {
    loginTitle: "Sign in",
    loginSubtitle: "Your family library",
    loginButton: "Sign in",
    demoHintTitle: "Demo credentials",
    demoHintBody: "carmelo@jinbocho.app (admin) · sara@jinbocho.app (editor) · luca@jinbocho.app (viewer) — any password works.",
    forgotPasswordLink: "Forgot password?",
    registerLink: "Create a family →",
    invalidCredentials: "Invalid credentials",
    inactiveAccount: "Account disabled",
    genericError: "Something went wrong, please try again",
    registerTitle: "Create your family",
    registerSubtitle: "Start your library",
    registerButton: "Create family",
    registerWipeHint: "In this demo, registering resets the simulated data and starts from an empty library.",
    haveAccountLink: "Already have an account? Sign in",
    forgotTitle: "Forgot password",
    forgotSubtitle: "We'll send you a reset link",
    forgotButton: "Send link",
    forgotSuccess: "If that email exists, you'll receive a reset link. (Demo: no email is actually sent)",
    backToLoginLink: "← Back to sign in",
    resetTitle: "Reset password",
    resetSubtitle: "Choose a new password",
    newPasswordLabel: "New password",
    confirmPasswordLabel: "Confirm password",
    resetButton: "Reset password",
    resetSuccess: "Password reset successfully.",
    goToLoginButton: "Go to sign in",
  },
  enums: {
    role: { admin: "Admin", editor: "Editor", viewer: "Viewer" },
    readingStatus: { to_read: "To read", reading: "Reading", read: "Read" },
    genre: {
      fiction: "Fiction", fantasy: "Fantasy", science_fiction: "Science Fiction", mystery_thriller: "Mystery/Thriller",
      romance: "Romance", horror: "Horror", historical: "Historical", biography_memoir: "Biography",
      history: "History", science: "Science", philosophy: "Philosophy", religion: "Religion",
      self_help: "Self-help", business: "Business", art: "Art", poetry: "Poetry",
      drama: "Drama", comics: "Comics", children: "Children", young_adult: "Young Adult",
      travel: "Travel", cooking: "Cooking", essay: "Essay", reference: "Reference", other: "Other",
    },
    condition: { new: "New", good: "Good", fair: "Fair", poor: "Worn" },
    source: { purchased: "Purchased", gift: "Gift", borrowed: "Borrowed", other: "Other" },
  },
  placement: {
    room: "Room",
    bookcase: "Bookcase",
    section: "Section",
    shelf: "Shelf",
    selectPlaceholder: "— Select —",
  },
  pagination: {
    prev: "← Previous",
    next: "Next →",
    page: (n) => `Page ${n}`,
  },
  export: {
    button: "Export",
    csv: "CSV",
    json: "JSON",
  },
  filters: {
    ownerLabel: "Owner",
    allOwners: "All owners",
    genreLabel: "Genre",
    allGenres: "All genres",
  },
  users: {
    title: "Users",
    description: (n) => `${n} family member${n === 1 ? "" : "s"}`,
    inviteButton: "Invite user",
    createTitle: "Invite user",
    editTitle: "Edit user",
    roleLabel: "Role",
    activeLabel: "Active",
    inactiveBadge: "Disabled",
    inviteHint: "In this demo the user is created immediately, no email is sent.",
    cannotEditSelf: "You cannot change your own role or status",
    deleteConfirmTitle: "Remove user?",
    deleteConfirmMessage: (name) => `${name} will be removed from the family.`,
  },
  settings: {
    title: "Settings",
    familyTitle: "Family",
    familyAdminOnly: "Only admins can edit this",
    profileTitle: "Profile",
    annualGoalLabel: "Annual reading goal",
    annualGoalHint: "Number of books you want to read this year",
    appearanceTitle: "Appearance",
    themeLabel: "Theme",
    modeLabel: "Mode",
    modeLight: "☀️ Light",
    modeDark: "🌙 Dark",
    modeSystem: "💻 System",
    languageTitle: "Language",
    backupTitle: "Backup & export",
    exportLibraryLabel: "Export books (CSV/JSON)",
    fullBackupLabel: "Full backup",
    exportBackupButton: "Export full backup",
    importBackupButton: "Import backup",
    importConfirmTitle: "Import backup?",
    importConfirmMessage: (counts) => `This backup contains: ${counts}.`,
    importWarning: "Data will be replaced with the imported backup for this demo session.",
    importSuccess: "Backup imported successfully",
    importError: "Invalid backup file",
    signOutTitle: "Sign out",
    signOutButton: "Sign out of your account",
    dangerZoneTitle: "Danger zone",
    deleteAccountButton: "Delete family",
    deleteAccountWarning: "This deletes the family, all users, and the library. In this demo you can always reload the page to restore the original data.",
    deleteAccountConfirmFamilyName: "Type the family name to confirm",
    deleteAccountConfirmPassword: "Password",
    deleteAccountConfirmButton: "Permanently delete",
    deleteAccountMismatch: "Family name doesn't match",
    themeNames: { pergamena: "Pergamena", akabeni: "Akabeni", sumi: "Sumi" },
  },
  sidebar: { subtitle: "Home Library" },
  banner: {
    text: "⚠️ Interactive demo — all data is simulated.",
    link: "Discover the real project on GitHub →",
  },
  dashboard: {
    description: "An overview of your family library.",
    statTotal: "Total books",
    statRead: "Read",
    statReading: "Reading",
    statToRead: "To read",
    currentlyReading: "Currently reading",
    noCurrentlyReading: "No books being read",
    untitled: "Untitled",
    onLoan: "On loan",
    seeAll: "See all →",
    allBooksHome: "All books are at home",
    overdue: "Overdue",
    due: "Due",
    recentlyAdded: "Recently added",
    noRecentlyAdded: "No books yet",
    nextRead: "What to read next?",
    another: "🎲 Another one",
    noNextRead: "No books in the reading list",
    unreadTitle: "Unread by anyone",
    unreadDesc: (n) => `${n === 1 ? "book" : "books"} no member has read yet`,
    familyFavorites: "Family favourites",
    noFamilyFavorites: "No book read by more than one member",
    members: (n) => `${n} member${n === 1 ? "" : "s"}`,
    readingGoal: (year) => `${year} reading goal`,
    activityTitle: "Family activity",
    activityVerb: "read",
  },
  catalog: {
    booksInLibrary: (n) => `${n} book${n === 1 ? "" : "s"} in the library`,
    searchLabel: "Search by title or author",
    searchPlaceholder: "e.g. Tolkien, 1984...",
    roomLabel: "Room",
    allRooms: "All rooms",
    statusAll: "All",
    statusToRead: "To read",
    statusReading: "Reading",
    statusRead: "Read",
    results: (n) => `${n} result${n === 1 ? "" : "s"}`,
    resultsFor: "for",
    noResults: "No books found",
    noResultsHint: "Try adjusting your search filters",
    removeFilters: "Clear filters",
  },
  books: {
    duplicateTitle: "Possible duplicate",
    duplicateIsbnReason: "A record with the same ISBN already exists:",
    duplicateTitleReason: "A record with the same title and author already exists:",
    duplicateConfirm: "Add anyway",
    add: {
      pageTitle: "Add book",
      typeTab: "Type ISBN",
      scanTab: "Scan",
      isbnLabel: "ISBN",
      lookupButton: "Look up",
      notFoundMessage: "ISBN not found in this demo. Enter the details manually.",
      manualEntryButton: "Enter manually",
      simulateScanButton: "📷 Simulate scan",
      formTitle: "Book details",
      titleLabel: "Title",
      authorLabel: "Author",
      isbnFieldLabel: "ISBN",
      publisherLabel: "Publisher",
      yearLabel: "Year",
      genreLabel: "Genre",
      placementTitle: "Placement",
      readingStatusLabel: "Reading status",
      ownerLabel: "Owner",
      noOwner: "None",
      submitButton: "Add to library",
      successToast: "Book added to the library",
    },
    shelfAdd: {
      pageTitle: "Add multiple books to a shelf",
      setupHint: "Choose the location and (optionally) the owner: they'll stay fixed for every book in this session.",
      startButton: "Start",
      changePositionButton: "Change position",
      doneButton: "Done",
      countLabel: (n) => `${n} book${n === 1 ? "" : "s"} added`,
      addButton: "Add",
      editButton: "Edit",
      skipButton: "Skip",
      undoButton: "Undo",
      sessionTitle: "Books added in this session",
      noSessionBooks: "No books added yet",
    },
  },
  bookDetail: {
    notFound: "Book not found",
    recordNotFound: "Bibliographic record not found",
    backToCatalog: "← Back to catalogue",
    fieldYear: "Year",
    fieldPublisher: "Publisher",
    fieldIsbn: "ISBN",
    fieldGenre: "Genre",
    fieldPurchased: "Purchased",
    position: "Location",
    sectionLabel: (n) => `Section ${n}`,
    shelfLabel: (n) => `Shelf ${n}`,
    posLabel: "Pos.",
    owner: "Owner",
    readingBy: "Currently read by",
    loanStatus: "On loan",
    loanedTo: "Loaned to",
    loanedFrom: "since",
    dueDate: "Due date:",
    notes: "Notes",
    readBy: (n) => `Read by (${n})`,
    editButton: "Edit",
    moveButton: "Move",
    deleteButton: "Delete",
    deleteConfirmTitle: "Delete book?",
    deleteConfirmMessage: "This copy will be removed from the library. This action isn't reversible within this demo session.",
    editModalTitle: "Edit book",
    editRecordSection: "Bibliographic record (shared)",
    editCopySection: "This copy",
    moveModalTitle: "Move book",
    conditionLabel: "Condition",
    sourceLabel: "Source",
    tagsLabel: "Tags",
    tagsHint: "Comma-separated",
    whoReadTitle: "Who's read it",
    markRead: "Mark as read",
    markUnread: "Mark as unread",
    lendTitle: "Lend this book",
    borrowerLabel: "Borrower's name",
    dueDateLabel: "Due date (optional)",
    lendButton: "Lend",
    returnButton: "Mark as returned",
    loanHistoryTitle: "Loan history",
    noLoanHistory: "No loans recorded",
    presentationTitle: "Presentation",
    presentationEmpty: "No presentation available for this book.",
    generateAiButton: "✨ Generate with AI",
    generatingAi: "Generating...",
    editPresentationButton: "Edit",
    sourceManual: "Manual",
    sourceAi: "AI-generated",
    sourceEditorial: "Editorial",
    historyTitle: "History",
    noHistory: "No events recorded",
  },
  loans: {
    title: "On Loan",
    subtitle: (active, returned) => `${active} active · ${returned} returned`,
    activeLoans: "Active loans",
    noActiveLoans: "No active loans",
    colBook: "Book",
    colLoanedTo: "Loaned to",
    colFrom: "Since",
    colDue: "Due date",
    colStatus: "Status",
    returnedLoans: "Returned loans",
    noReturnedLoans: "No returned loans",
    colReturnedOn: "Returned on",
    statusOnLoan: "On loan",
  },
  locations: {
    title: "Bookcases",
    description: (rooms, bookcases, books) =>
      `${rooms} rooms · ${bookcases} bookcases · ${books} books`,
    booksCount: (n) => `${n} book${n === 1 ? "" : "s"}`,
    viewMap: "View map",
    sectionLabel: (n) => `Section ${n}`,
    shelfLabel: (n) => `Shelf ${n}`,
    addRoom: "Add room",
    editRoom: "Edit room",
    deleteRoomConfirm: "The room and everything in it (bookcases, sections, shelves) will be removed. Books will stay in the library without a location.",
    addBookcase: "Add bookcase",
    editBookcase: "Edit bookcase",
    deleteBookcaseConfirm: "The bookcase and its contents (sections, shelves) will be removed. Books will stay in the library without a location.",
    addSection: "Add section",
    editSection: "Rename section",
    deleteSectionConfirm: "The section and its shelves will be removed.",
    addShelf: "Add shelf",
    editShelf: "Edit shelf",
    deleteShelfConfirm: "The shelf will be removed.",
    nameLabel: "Name",
    labelLabel: "Label (optional)",
    notesLabel: "Notes (optional)",
    emptyTitle: "No rooms yet",
  },
  bookcaseMap: {
    notFound: "Bookcase not found",
    backToLocations: "← Back to bookcases",
    legend: "Legend:",
    emptyShelf: "Empty shelf",
    sectionLabel: (n) => `Section ${n}`,
    shelfLabel: (n) => `Shelf ${n}`,
  },
  stats: {
    title: "Statistics",
    description: "Family library overview",
    totalBooks: "Total books",
    registeredReads: "Registered reads",
    distinctGenres: "Distinct genres",
    familyMembers: "Family members",
    booksRead: "Books read",
    booksOwned: "Books owned",
    genreDistribution: "Genre distribution",
    genreCount: (n, pct) => `${n} book${n === 1 ? "" : "s"} · ${pct}%`,
    topAuthors: "Most represented authors",
    authorCount: (n) => `${n} book${n === 1 ? "" : "s"}`,
    byRoom: "By room",
    roomCount: (n, pct) => `${n} book${n === 1 ? "" : "s"} · ${pct}%`,
    viewRead: "View read →",
    viewOwned: "View owned →",
    bookListTitleUnread: "Unread by anyone",
    bookListTitleRead: (name) => `Read by ${name}`,
    bookListTitleOwned: (name) => `Owned by ${name}`,
    backToStats: "← Back to statistics",
    noMatches: "No books match",
  },
  badge: {
    read: "Read",
    reading: "Reading",
    toRead: "To read",
    info: "Info",
    danger: "Warning",
  },
};
