export interface Translations {
  locale: string;
  nav: {
    home: string;
    books: string;
    loans: string;
    wishlist: string;
    locations: string;
    stats: string;
    bookDetail: string;
    users: string;
    kids: string;
    kidsMyReading: string;
    bookClub: string;
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
    appName: string;
    appSubtitle: string;
    menu: string;
    closeMenu: string;
    pageNotFound: string;
    pageNotFoundDesc: string;
    goHome: string;
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
    role: { admin: string; editor: string; viewer: string; child: string };
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
    goodreadsImportTitle: string;
    goodreadsImportButton: string;
    goodreads: {
      reviewTitle: string;
      reviewCount: (total: number, selected: number) => string;
      confirmButton: (count: number) => string;
      statusNew: string;
      statusAlreadyOwned: string;
      confirmed: (created: number) => string;
      nothingSelected: string;
      emptyFile: string;
    };
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
    aiPickTitle: string;
    aiPickBadge: string;
    aiPickPrompt: string;
    aiPickAskButton: string;
    aiPickLoading: string;
    aiPickEmpty: string;
    aiPickLike: string;
    aiPickDislike: string;
    aiPickFeedbackSaved: string;
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
    filtersToggle: string;
    locationFilterActive: (name: string) => string;
    clearLocationFilter: string;
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
      searchTab: string;
      isbnLabel: string;
      lookupButton: string;
      notFoundMessage: string;
      manualEntryButton: string;
      simulateScanButton: string;
      searchTitleLabel: string;
      searchTitlePlaceholder: string;
      searchAuthorLabel: string;
      searchAuthorPlaceholder: string;
      searchButton: string;
      searchMissingQuery: string;
      searchNoResults: string;
      searchResultsHint: string;
      searchSelect: string;
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
    shelfScan: {
      pageTitle: string;
      subtitle: string;
      selectShelf: string;
      simulateCaptureButton: string;
      reading: string;
      reviewSubtitle: string;
      retakeLink: string;
      reviewCount: (total: number, selected: number) => string;
      confirmButton: (count: number) => string;
      statusMatched: string;
      statusUncertain: string;
      confirmed: (created: number) => string;
      nothingSelected: string;
      setupHint: string;
    };
    shelfAudit: {
      pageTitle: string;
      subtitle: string;
      selectShelf: string;
      simulateCaptureButton: string;
      reading: string;
      retakeLink: string;
      allMatch: string;
      presentCount: (n: number) => string;
      missingTitle: (n: number) => string;
      missingHint: string;
      viewBook: string;
      unexpectedTitle: (n: number) => string;
      unexpectedHint: string;
      addHere: string;
      addedUnexpected: (title: string) => string;
      setupHint: string;
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
    suggestTagsButton: string;
    suggestingTags: string;
    suggestedTagsHint: string;
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
    ratings: {
      title: string;
      addReview: string;
      noRatings: string;
      noReviews: string;
      votes: (n: number) => string;
      ratingLabel: string;
      reviewLabel: string;
      reviewPlaceholder: string;
      cancel: string;
      save: string;
      update: string;
      edit: string;
      delete: string;
      formModalTitle: string;
      editModalTitle: string;
      selectStarError: string;
      updateSuccess: string;
      addSuccess: string;
      saveError: string;
      deleteSuccess: string;
      deleteError: string;
      familyMemberFallback: string;
    };
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
    searchPlaceholder: string;
    filtersToggle: string;
    filterStatus: string;
    statusOverdue: string;
    statusWarning: string;
    statusNormal: string;
    clearFilters: string;
    noSearchResults: string;
    overdueBadge: (n: number) => string;
    markReturnedAction: string;
    returnSuccess: string;
  };
  wishlist: {
    title: string;
    booksCount: (n: number) => string;
    addButton: string;
    emptyTitle: string;
    emptyDescription: string;
    searchPlaceholder: string;
    filtersToggle: string;
    filterPriority: string;
    filterMember: string;
    priorityHigh: string;
    priorityMedium: string;
    priorityLow: string;
    priorityNone: string;
    clearFilters: string;
    noSearchResults: string;
    wantedBy: string;
    remove: string;
    acquire: string;
    confirmRemoveTitle: string;
    confirmRemoveDescription: (title: string) => string;
    removeSuccess: string;
    removeFailed: string;
    backLink: string;
    addPageTitle: string;
    addPageSubtitle: string;
    authorLabel: string;
    wishlistDetails: string;
    priorityLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    addSuccess: string;
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
    viewBooksLink: string;
    booksWarning: (n: number) => string;
    sectionCountLabel: string;
    shelfCountLabel: string;
  };
  bookcaseMap: {
    notFound: string;
    backToLocations: string;
    legend: string;
    emptyShelf: string;
    sectionLabel: (n: number) => string;
    shelfLabel: (n: number) => string;
    scanLink: string;
    auditLink: string;
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
    favoriteGenreLabel: string;
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
    memberModal: {
      totalReads: string;
      recentlyRead: string;
      topAuthorsReadSection: string;
      topAuthorsOwnedSection: string;
      noReads: string;
      viewAll: string;
      goalsSection: string;
      goalBooksLabel: string;
      currentlyReadingSection: string;
      readingHistogramSection: string;
      readingHistogramNoReads: string;
      genreSection: string;
    };
  };
  memberProfile: {
    title: string;
    notFound: string;
    memberSince: string;
    changeAvatarHint: string;
  };
  badge: {
    read: string;
    reading: string;
    toRead: string;
    info: string;
    danger: string;
  };
  legal: {
    common: { draftNotice: (version: string) => string };
    privacy: {
      pageTitle: string;
      s1: { heading: string; before: string };
      s2: { heading: string; items: string[] };
      s3: { heading: string; body: string };
      s4: { heading: string; body: string };
      s5: { heading: string; intro: string; items: string[]; aiItem: string };
      s6: { heading: string; intro: string; items: string[] };
      s7: { heading: string; body: string };
      s8: { heading: string; items: string[] };
      s9: { heading: string };
    };
    terms: {
      pageTitle: string;
      s1: { heading: string; before: string };
      s2: { heading: string; body: string };
      s3: { heading: string; body: string };
      s4: { heading: string; body: string };
      s5: { heading: string; body: string };
      s6: { heading: string; body: string };
      s7: { heading: string; body: string };
      s8: { heading: string; body: string };
    };
  };
  kids: {
    navLabel: string;
    myReadingNavLabel: string;
    parentTitle: string;
    parentDescription: string;
    childTitle: string;
    childDescription: string;
    independentOfAiNote: string;
    sessionsTitle: string;
    sessionsEmpty: string;
    loggedByParent: string;
    loggedByChild: string;
    quizTitle: string;
    quizResult: (score: number, total: number) => string;
    quizEmpty: string;
    journalTitle: string;
    journalEmpty: string;
    pathTitle: string;
    pathBadge: (name: string) => string;
    pathProgress: (done: number, total: number) => string;
    challengeTitle: string;
    challengeProgress: (done: number, goal: number) => string;
    challengeNote: string;
    philosophyLink: string;
    journalText: Record<string, string>;
    pathText: Record<string, { title: string; badgeName: string }>;
    challengeText: Record<string, string>;
  };
  bookClub: {
    navLabel: string;
    title: string;
    subtitle: string;
    startCycleButton: string;
    startCycleHelp: string;
    currentReadLabel: string;
    activeLabel: string;
    alsoActiveLabel: string;
    historyLabel: string;
    historyHint: string;
    emptyTitle: string;
    emptyDescription: string;
    participantsCount: (n: number) => string;
    proposalsLink: string;
    cycleTitleLabel: string;
    pickBookLabel: string;
    searchPlaceholder: string;
    createSuccess: string;
    statusReading: string;
    statusDiscussing: string;
    statusArchived: string;
    moveToDiscussionButton: string;
    undoMoveToDiscussionButton: string;
    archiveButton: string;
    reopenButton: string;
    archivedNotice: string;
    archivedReopenHint: string;
    backLink: string;
    participantsTitle: string;
    noParticipants: string;
    joinButton: string;
    markFinishedButton: string;
    finishedLabel: string;
    aiPromptsTitle: string;
    showPromptsButton: string;
    promptsLoading: string;
    noPrompts: string;
    meetingsTitle: string;
    noMeetings: string;
    meetingWhenLabel: string;
    meetingNoteLabel: string;
    meetingNotePlaceholder: string;
    scheduleButton: string;
    discussionTitle: string;
    discussionLocked: string;
    discussionLockedArchived: string;
    writePlaceholder: string;
    spoilerLabel: string;
    spoilerBadge: string;
    revealSpoilerButton: string;
    postButton: string;
    noPosts: string;
    ratingLabel: (avg: number, total: number) => string;
    proposalsTitle: string;
    proposalsSubtitle: string;
    proposeBookButton: string;
    proposalNoteLabel: string;
    proposalNotePlaceholder: string;
    noProposals: string;
    noProposalsDescription: string;
    promoteButton: string;
    promoteSuccess: string;
    // Mock AI discussion prompts — "{title}" is replaced with the cycle's book title.
    aiPromptTemplates: string[];
  };
}

export const it: Translations = {
  locale: "it-IT",
  nav: {
    home: "Home",
    books: "Libri",
    loans: "In prestito",
    wishlist: "Desideri",
    locations: "Librerie",
    stats: "Statistiche",
    bookDetail: "Dettaglio libro",
    users: "Utenti",
    kids: "Kids",
    kidsMyReading: "La mia lettura",
    bookClub: "Circolo",
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
    appName: "Jinbocho",
    appSubtitle: "La tua biblioteca di casa",
    menu: "Menu",
    closeMenu: "Chiudi menu",
    pageNotFound: "Pagina non trovata",
    pageNotFoundDesc: "La pagina che cerchi non esiste o è stata spostata.",
    goHome: "Torna alla home",
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
    role: { admin: "Admin", editor: "Editor", viewer: "Lettore", child: "Bambino" },
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
    goodreadsImportTitle: "Importa da Goodreads",
    goodreadsImportButton: "Importa CSV Goodreads",
    goodreads: {
      reviewTitle: "Controlla i libri da importare",
      reviewCount: (total, selected) => `${selected} di ${total} righe selezionate`,
      confirmButton: (count) => `Importa ${count} libr${count === 1 ? "o" : "i"}`,
      statusNew: "Nuovo",
      statusAlreadyOwned: "Già in libreria",
      confirmed: (created) => `${created} libr${created === 1 ? "o importato" : "i importati"}.`,
      nothingSelected: "Seleziona almeno una riga.",
      emptyFile: "Nessuna riga trovata nel file.",
    },
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
    aiPickTitle: "Consigli per te",
    aiPickBadge: "AI",
    aiPickPrompt: "Chiedi all'AI qualche consiglio di lettura personalizzato in base ai tuoi gusti.",
    aiPickAskButton: "Chiedi consigli",
    aiPickLoading: "Analisi dei tuoi gusti in corso...",
    aiPickEmpty: "Nessun consiglio disponibile al momento.",
    aiPickLike: "Mi piace",
    aiPickDislike: "Non fa per me",
    aiPickFeedbackSaved: "Feedback salvato, grazie!",
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
    filtersToggle: "Filtri",
    locationFilterActive: (name) => `Stai vedendo i libri in: ${name}`,
    clearLocationFilter: "Rimuovi filtro posizione",
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
      searchTab: "Cerca per titolo/autore",
      isbnLabel: "ISBN",
      lookupButton: "Cerca",
      notFoundMessage: "ISBN non trovato in questa demo. Inserisci i dati manualmente.",
      manualEntryButton: "Inserisci manualmente",
      simulateScanButton: "📷 Simula scansione",
      searchTitleLabel: "Titolo",
      searchTitlePlaceholder: "es. Il nome della rosa",
      searchAuthorLabel: "Autore",
      searchAuthorPlaceholder: "es. Umberto Eco",
      searchButton: "Cerca",
      searchMissingQuery: "Inserisci almeno un titolo o un autore",
      searchNoResults: "Nessun risultato per questa ricerca",
      searchResultsHint: "Seleziona un risultato per precompilare la scheda",
      searchSelect: "Seleziona",
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
    shelfScan: {
      pageTitle: "Scansiona scaffale",
      subtitle: "Fotografa uno scaffale per catalogare più libri insieme.",
      selectShelf: "Seleziona il ripiano",
      simulateCaptureButton: "Simula scansione foto",
      reading: "Analisi dell'immagine in corso...",
      reviewSubtitle: "Controlla i libri riconosciuti prima di confermare.",
      retakeLink: "← Rifai la scansione",
      reviewCount: (total, selected) => `${selected} di ${total} libri selezionati`,
      confirmButton: (count) => `Aggiungi ${count} libr${count === 1 ? "o" : "i"}`,
      statusMatched: "Riconosciuto",
      statusUncertain: "Da verificare",
      confirmed: (created) => `${created} libr${created === 1 ? "o aggiunto" : "i aggiunti"} alla libreria.`,
      nothingSelected: "Seleziona almeno un libro.",
      setupHint: "Seleziona un ripiano per iniziare la scansione simulata.",
    },
    shelfAudit: {
      pageTitle: "Verifica scaffale",
      subtitle: "Fotografa uno scaffale per confrontarlo con il catalogo.",
      selectShelf: "Seleziona il ripiano",
      simulateCaptureButton: "Simula verifica foto",
      reading: "Confronto con il catalogo in corso...",
      retakeLink: "← Rifai la verifica",
      allMatch: "Tutto corrisponde! Nessuna discrepanza trovata.",
      presentCount: (n) => `${n} libr${n === 1 ? "o presente" : "i presenti"} sullo scaffale.`,
      missingTitle: (n) => `${n} libr${n === 1 ? "o mancante" : "i mancanti"}`,
      missingHint: "Questi libri sono catalogati qui ma non sono stati rilevati nella foto.",
      viewBook: "Vedi libro",
      unexpectedTitle: (n) => `${n} libr${n === 1 ? "o" : "i"} non catalogat${n === 1 ? "o" : "i"}`,
      unexpectedHint: "Questi libri sono sullo scaffale ma non risultano catalogati qui.",
      addHere: "Aggiungi qui",
      addedUnexpected: (title) => `"${title}" aggiunto alla libreria.`,
      setupHint: "Seleziona un ripiano per iniziare la verifica simulata.",
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
    suggestTagsButton: "✨ Suggerisci tag con AI",
    suggestingTags: "Generazione suggerimenti...",
    suggestedTagsHint: "Tocca un tag per aggiungerlo",
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
    ratings: {
      title: "Recensioni",
      addReview: "+ Aggiungi recensione",
      noRatings: "Nessuna recensione ancora.",
      noReviews: "Nessuna recensione disponibile.",
      votes: (n) => `${n} ${n === 1 ? "voto" : "voti"}`,
      ratingLabel: "Voto",
      reviewLabel: "Recensione (opzionale)",
      reviewPlaceholder: "Scrivi la tua recensione...",
      cancel: "Annulla",
      save: "Salva recensione",
      update: "Aggiorna",
      edit: "Modifica",
      delete: "Elimina",
      formModalTitle: "Scrivi una recensione",
      editModalTitle: "Modifica recensione",
      selectStarError: "Seleziona almeno una stella.",
      updateSuccess: "Recensione aggiornata.",
      addSuccess: "Recensione aggiunta.",
      saveError: "Errore nel salvataggio della recensione.",
      deleteSuccess: "Recensione eliminata.",
      deleteError: "Errore nell'eliminazione.",
      familyMemberFallback: "Membro famiglia",
    },
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
    searchPlaceholder: "Cerca per libro o nome...",
    filtersToggle: "Filtri",
    filterStatus: "Stato scadenza",
    statusOverdue: "In ritardo",
    statusWarning: "In scadenza",
    statusNormal: "Regolare",
    clearFilters: "Rimuovi filtri",
    noSearchResults: "Nessun prestito corrisponde alla ricerca",
    overdueBadge: (n) => `${n} in ritardo`,
    markReturnedAction: "Segna come restituito",
    returnSuccess: "Prestito segnato come restituito",
  },
  wishlist: {
    title: "Desideri",
    booksCount: (n) => `${n} libr${n === 1 ? "o desiderato" : "i desiderati"}`,
    addButton: "+ Aggiungi",
    emptyTitle: "Nessun desiderio in lista",
    emptyDescription: "Aggiungi i libri che vorresti acquistare per la biblioteca.",
    searchPlaceholder: "Cerca nella lista desideri...",
    filtersToggle: "Filtri",
    filterPriority: "Priorità",
    filterMember: "Membro",
    priorityHigh: "Alta",
    priorityMedium: "Media",
    priorityLow: "Bassa",
    priorityNone: "Nessuna",
    clearFilters: "Rimuovi filtri",
    noSearchResults: "Nessun desiderio corrisponde alla ricerca",
    wantedBy: "Desiderato da",
    remove: "Rimuovi",
    acquire: "Acquisisci",
    confirmRemoveTitle: "Rimuovere dalla lista desideri?",
    confirmRemoveDescription: (title) => `"${title}" verrà rimosso dalla lista desideri.`,
    removeSuccess: "Rimosso dalla lista desideri.",
    removeFailed: "Errore nella rimozione.",
    backLink: "← Torna alla lista desideri",
    addPageTitle: "Aggiungi alla lista desideri",
    addPageSubtitle: "Cerca un libro o inseriscilo manualmente.",
    authorLabel: "Autore",
    wishlistDetails: "Dettagli desiderio",
    priorityLabel: "Priorità",
    notesLabel: "Note (opzionale)",
    notesPlaceholder: "Perché lo vuoi, edizione preferita...",
    addSuccess: "Aggiunto alla lista desideri.",
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
    viewBooksLink: "Mostra libri qui",
    booksWarning: (n) => (n === 0 ? "" : ` ${n} libr${n === 1 ? "o" : "i"} qui dentro perderanno la posizione.`),
    sectionCountLabel: "Numero di sezioni",
    shelfCountLabel: "Numero di ripiani",
  },
  bookcaseMap: {
    notFound: "Libreria non trovata",
    backToLocations: "← Torna alle librerie",
    legend: "Legenda:",
    emptyShelf: "Ripiano vuoto",
    sectionLabel: (n) => `Sezione ${n}`,
    shelfLabel: (n) => `Ripiano ${n}`,
    scanLink: "Scansiona",
    auditLink: "Verifica",
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
    favoriteGenreLabel: "Genere preferito",
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
    memberModal: {
      totalReads: "letture totali",
      recentlyRead: "Letti di recente",
      topAuthorsReadSection: "Autori più letti",
      topAuthorsOwnedSection: "Autori più posseduti",
      noReads: "Nessuna lettura registrata.",
      viewAll: "Vedi tutti i libri letti",
      goalsSection: "Obiettivo annuale",
      goalBooksLabel: "Libri letti",
      currentlyReadingSection: "In lettura ora",
      readingHistogramSection: "Letture nel tempo",
      readingHistogramNoReads: "Nessuna lettura in questo anno.",
      genreSection: "Generi preferiti",
    },
  },
  memberProfile: {
    title: "Profilo membro",
    notFound: "Membro non trovato.",
    memberSince: "Membro da",
    changeAvatarHint: "L'avatar è generato automaticamente dal nome nella demo.",
  },
  badge: {
    read: "Letto",
    reading: "In lettura",
    toRead: "Da leggere",
    info: "Info",
    danger: "Attenzione",
  },
  legal: {
    common: { draftNotice: (version) => `⚠ Bozza — in attesa di revisione legale. Versione ${version}.` },
    privacy: {
      pageTitle: "Informativa sulla Privacy",
      s1: {
        heading: "1. Titolare del trattamento",
        before:
          "Il titolare del trattamento è Carmelo La Gamba, con sede in Italia. Poiché il titolare è stabilito nell'UE, non è necessario nominare un rappresentante UE ai sensi dell'Art. 27 GDPR. Contatto:",
      },
      s2: {
        heading: "2. Cosa raccogliamo",
        items: [
          "Dati dell'account: email, nome completo, password (con hash, mai salvata in chiaro).",
          "Dati della biblioteca: stanze, librerie, libri, prestiti (incluso il nome del prestatario se lo registri), valutazioni, recensioni, storico delle letture, note.",
          "Storico opzionale dei suggerimenti AI (richieste di tag/incipit/raccomandazioni), solo se questa installazione ha le funzioni AI abilitate.",
          "Dati tecnici necessari per mantenerti connesso: un token di accesso JWT e un refresh token.",
        ],
      },
      s3: {
        heading: "3. Perché li trattiamo e base giuridica",
        body: "Per fornirti il servizio di gestione biblioteca che hai richiesto (esecuzione del contratto, Art. 6(1)(b) GDPR), e per mantenere il servizio sicuro (legittimo interesse, Art. 6(1)(f)).",
      },
      s4: {
        heading: "4. Dove sono conservati i tuoi dati",
        body: "Le installazioni self-hosted conservano tutti i dati sul server su cui le distribuisci. Per la nostra installazione ospitata (Pro/SaaS), i dati del tuo account e della biblioteca sono conservati presso un fornitore di database gestito situato nell'UE/SEE (il fornitore specifico e la region esatta saranno indicati qui una volta definiti).",
      },
      s5: {
        heading: "5. Chi altro tratta i tuoi dati",
        intro: "A seconda della configurazione di questa installazione:",
        items: [
          "Un fornitore di database gestito (con sede UE/SEE, vedi §4).",
          "Un fornitore di hosting per l'applicazione web.",
        ],
        aiItem:
          "Solo se le funzioni AI sono abilitate: le tue richieste per generare tag, presentazioni dei libri o raccomandazioni vengono inviate a OpenRouter, Inc. (San Francisco, USA), che instrada la richiesta verso un modello linguistico Qwen. A differenza del resto della nostra infrastruttura, questo processor si trova intenzionalmente al di fuori dell'UE/SEE. Questo trasferimento si basa attualmente sui termini di servizio standard di OpenRouter; una garanzia formale ai sensi dell'Art. 46 GDPR (Clausole Contrattuali Standard) è in fase di valutazione prima che questa funzione venga offerta più ampiamente agli utenti UE. OpenRouter può a sua volta instradare l'elaborazione attraverso propri sub-processor per l'hosting dei modelli; un elenco aggiornato è disponibile sul sito di OpenRouter. Le funzioni AI possono essere disattivate a livello di installazione (sono disattivate salvo configurazione esplicita).",
      },
      s6: {
        heading: "6. Per quanto tempo li conserviamo",
        intro: "Conserviamo i tuoi dati finché il tuo account esiste. Nello specifico:",
        items: [
          "Dati degli ex membri rimossi (nome ed email, conservati per permetterti di ripristinare un ex membro da un backup): cancellati entro 12 mesi dalla rimozione.",
          "Storico dei suggerimenti AI: cancellato entro 12 mesi dalla generazione.",
          "Storico dei prestiti (incluso il nome di un eventuale prestatario che hai registrato): conservato finché il tuo account esiste — fa parte della storia della tua biblioteca, non di un account con un proprio orologio di conservazione. Viene eliminato solo se elimini il tuo account.",
          "Account inattivi: nessuna cancellazione automatica al momento — puoi eliminare il tuo account in qualsiasi momento dalle Impostazioni.",
        ],
      },
      s7: {
        heading: "7. Cookie e local storage",
        body: "Non utilizziamo cookie di tracciamento o pubblicitari. L'app conserva una piccola quantità di dati nel local storage del tuo browser esclusivamente per farla funzionare: la tua sessione di accesso e le tue preferenze di tema/lingua. Si tratta di dati strettamente funzionali che, ai sensi della Direttiva ePrivacy, non richiedono consenso — ma te lo comunichiamo comunque.",
      },
      s8: {
        heading: "8. I tuoi diritti",
        items: [
          "Accedere e scaricare una copia dei tuoi dati — Impostazioni → Dati della biblioteca → Scarica backup completo.",
          "Correggere dati inesatti — modificali direttamente nell'app.",
          "Eliminare il tuo account e tutti i dati associati — Impostazioni → Privacy → Elimina account.",
          "Contattarci per qualsiasi altra richiesta o reclamo — vedi sotto.",
          "Presentare un reclamo alla tua autorità di controllo per la protezione dei dati.",
        ],
      },
      s9: { heading: "9. Contatto" },
    },
    terms: {
      pageTitle: "Termini di Servizio",
      s1: {
        heading: "1. Chi gestisce questo servizio",
        before: "Questo servizio è gestito da Carmelo La Gamba, con sede in Italia. Contatto:",
      },
      s2: {
        heading: "2. Chi può usarlo",
        body: "L'amministratore che registra una biblioteca deve essere maggiorenne, ed è responsabile dell'account e di tutto ciò che vi viene inserito. I profili membro per i minori sono ammessi: se aggiungi un minore come membro (ad esempio per tenere traccia di cosa legge), tu, in qualità di adulto che effettua la registrazione, sei il genitore/tutore o comunque responsabile per lui, acconsenti per suo conto al trattamento dei dati di quel membro come descritto nell'Informativa sulla Privacy, e sei responsabile della rimozione dei suoi dati su richiesta. [Se ciò comporti l'applicazione dei requisiti di consenso diretto al minore previsti dall'Art. 8 GDPR, o se debba invece essere considerato come un genitore/tutore che gestisce un archivio familiare per conto del minore, è in attesa di conferma legale.]",
      },
      s3: {
        heading: "3. Il tuo account",
        body: "Sei responsabile della sicurezza della tua password. Il ruolo di amministratore può invitare/rimuovere membri, cambiare ruoli ed eliminare definitivamente l'intera biblioteca e l'account — questa operazione è irreversibile.",
      },
      s4: {
        heading: "4. Dati che inserisci su altre persone",
        body: "Se registri il nome di un prestatario per un prestito di un libro, stai inserendo dati personali di qualcuno che non è un utente registrato di questo servizio. Sei responsabile di avere una base giuridica per farlo (ad esempio, è ragionevole annotare a chi hai prestato un libro) e di rimuoverli se te lo chiede.",
      },
      s5: {
        heading: "5. Funzioni AI opzionali",
        body: "Se questa installazione ha le funzioni AI abilitate, le richieste di tag/incipit/raccomandazioni vengono inviate a OpenRouter, Inc. (un servizio con sede negli USA), che le instrada verso un modello linguistico Qwen — questo comporta un trasferimento di dati al di fuori dell'UE/SEE. Vedi l'Informativa sulla Privacy §5 per i dettagli. Queste funzioni sono disattivate per impostazione predefinita e possono essere disabilitate a livello di installazione.",
      },
      s6: {
        heading: "6. Cessazione",
        body: "Puoi eliminare il tuo account in qualsiasi momento dalle Impostazioni. Potremmo sospendere account che abusano del servizio.",
      },
      s7: {
        heading: "7. Responsabilità",
        body: 'Il servizio è fornito "così com\'è", senza garanzie oltre quanto richiesto dalla legge inderogabile. Nei limiti consentiti dalla legge italiana, non siamo responsabili per danni indiretti, incidentali o consequenziali, né per la perdita di dati che non hai esportato prima di eliminare il tuo account. Nulla di quanto qui previsto esclude la responsabilità che non può essere esclusa ai sensi di norme inderogabili (ad es. dolo, colpa grave o diritti inderogabili dei consumatori). [Un eventuale tetto massimo di responsabilità economica è in attesa di revisione legale.]',
      },
      s8: {
        heading: "8. Legge applicabile",
        body: "Questi termini sono regolati dalla legge italiana. Se sei un consumatore residente nell'UE, potrebbero applicarsi anche le norme inderogabili a tutela del consumatore del tuo paese di residenza e — ai sensi del Codice del Consumo, Art. 33 — il foro del tuo luogo di residenza è competente per qualsiasi controversia. Per le controversie non coperte dalla tutela inderogabile del consumatore, [foro competente in attesa di conferma].",
      },
    },
  },
  kids: {
    navLabel: "Kids",
    myReadingNavLabel: "La mia lettura",
    parentTitle: "Kids Mode",
    parentDescription: "Sessioni di lettura, quiz, diario e sfide di famiglia — pensati per far crescere lettori, non per metterli in competizione.",
    childTitle: "La mia lettura",
    childDescription: "Quello che stai leggendo, il tuo diario e i tuoi quiz.",
    independentOfAiNote: "Kids Mode funziona anche senza il modulo AI — qui sotto solo le funzionalità principali.",
    sessionsTitle: "Sessioni di lettura",
    sessionsEmpty: "Nessuna sessione registrata ancora.",
    loggedByParent: "letta insieme a un genitore",
    loggedByChild: "letta da te",
    quizTitle: "Quiz di comprensione",
    quizResult: (score: number, total: number) => `Hai risposto correttamente a ${score} domande su ${total}`,
    quizEmpty: "Nessun quiz ancora per questo libro.",
    journalTitle: "Diario di lettura",
    journalEmpty: "Nessuna voce nel diario ancora.",
    pathTitle: "Percorso di lettura",
    pathBadge: (name: string) => `Ricompensa: ${name}`,
    pathProgress: (done: number, total: number) => `${done} di ${total} libri letti`,
    challengeTitle: "Sfida di famiglia",
    challengeProgress: (done: number, goal: number) => `${done} / ${goal} minuti insieme`,
    challengeNote: "Un solo obiettivo condiviso, nessuna classifica tra fratelli — nemmeno nei dati.",
    philosophyLink: "Perché è fatto così →",
    journalText: {
      je1: "La volpe è la mia parte preferita!",
      je2: "Harry scopre di essere un mago e riceve la lettera da Hogwarts. Se fossi io avrei scelto la casa di Grifondoro, come lui.",
    },
    pathText: {
      rp1: { title: "Mondi fantastici", badgeName: "Esploratore di mondi" },
    },
    challengeText: {
      fc1: "1000 minuti insieme quest'estate",
    },
  },
  bookClub: {
    navLabel: "Circolo",
    title: "Circolo dei lettori",
    subtitle: "Scegliete un libro, leggetelo insieme e discutetene",
    startCycleButton: "Avvia un ciclo di lettura",
    startCycleHelp: "Un ciclo è una lettura condivisa: scegli un libro del catalogo, i membri lo leggono nello stesso periodo e ne discutono. Incluso gratis, anche in Community.",
    currentReadLabel: "In lettura ora",
    activeLabel: "In corso",
    alsoActiveLabel: "Altri cicli in corso",
    historyLabel: "Storico",
    historyHint: "Cicli conclusi: apri per rivedere discussione, partecipanti e voto.",
    emptyTitle: "Nessun ciclo di lettura",
    emptyDescription: "Avvia un ciclo per leggere un libro insieme agli altri membri.",
    participantsCount: (n) => `${n} partecipanti`,
    proposalsLink: "Proposte",
    cycleTitleLabel: "Titolo del ciclo",
    pickBookLabel: "Scegli un libro",
    searchPlaceholder: "Cerca tra i tuoi libri",
    createSuccess: "Ciclo avviato",
    statusReading: "In lettura",
    statusDiscussing: "In discussione",
    statusArchived: "Archiviato",
    moveToDiscussionButton: "Passa alla discussione",
    undoMoveToDiscussionButton: "Annulla, torna alla lettura",
    archiveButton: "Archivia",
    reopenButton: "Riapri il ciclo",
    archivedNotice: "Ciclo concluso e archiviato. Sola lettura.",
    archivedReopenHint: "Cliccato per sbaglio? Puoi riaprirlo.",
    backLink: "Circolo dei lettori",
    participantsTitle: "Partecipanti",
    noParticipants: "Ancora nessun partecipante",
    joinButton: "Partecipa",
    markFinishedButton: "Segna come finito",
    finishedLabel: "Finito",
    aiPromptsTitle: "Spunti di discussione",
    showPromptsButton: "Mostra spunti",
    promptsLoading: "Generazione in corso…",
    noPrompts: "Nessuno spunto disponibile",
    meetingsTitle: "Incontri",
    noMeetings: "Nessun incontro in programma",
    meetingWhenLabel: "Data e ora",
    meetingNoteLabel: "Luogo o link",
    meetingNotePlaceholder: "Biblioteca, sala 2 oppure link video",
    scheduleButton: "Programma",
    discussionTitle: "Discussione",
    discussionLocked: "La discussione si apre quando il ciclo passa alla discussione.",
    discussionLockedArchived: "Ciclo archiviato: la discussione è chiusa. Riapri il ciclo per continuare a scrivere.",
    writePlaceholder: "Scrivi un commento",
    spoilerLabel: "Contiene spoiler",
    spoilerBadge: "Spoiler",
    revealSpoilerButton: "Mostra spoiler",
    postButton: "Pubblica",
    noPosts: "Ancora nessun commento",
    ratingLabel: (avg, total) => `★ ${avg} (${total})`,
    proposalsTitle: "Proposte",
    proposalsSubtitle: "Proponi e vota il prossimo libro",
    proposeBookButton: "Proponi un libro",
    proposalNoteLabel: "Nota (facoltativa)",
    proposalNotePlaceholder: "Perché lo proponi",
    noProposals: "Nessuna proposta",
    noProposalsDescription: "Proponi un libro da votare per il prossimo ciclo.",
    promoteButton: "Promuovi",
    promoteSuccess: "Ciclo avviato dalla proposta",
    aiPromptTemplates: [
      "Cosa vi ha sorpreso di più leggendo «{title}»?",
      "C'è un personaggio di «{title}» in cui vi siete riconosciuti? Perché?",
      "Se poteste cambiare il finale di «{title}», come lo riscrivereste?",
      "Quale scena di «{title}» vi è rimasta più impressa, e perché?",
      "Consigliereste «{title}» a un amico? A chi in particolare?",
    ],
  },
};

export const en: Translations = {
  locale: "en-US",
  nav: {
    home: "Home",
    books: "Books",
    loans: "On Loan",
    wishlist: "Wishlist",
    locations: "Bookcases",
    stats: "Statistics",
    bookDetail: "Book Detail",
    users: "Users",
    kids: "Kids",
    kidsMyReading: "My Reading",
    bookClub: "Book Club",
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
    appName: "Jinbocho",
    appSubtitle: "Your home library",
    menu: "Menu",
    closeMenu: "Close menu",
    pageNotFound: "Page not found",
    pageNotFoundDesc: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go home",
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
    role: { admin: "Admin", editor: "Editor", viewer: "Viewer", child: "Child" },
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
    goodreadsImportTitle: "Import from Goodreads",
    goodreadsImportButton: "Import Goodreads CSV",
    goodreads: {
      reviewTitle: "Review the books to import",
      reviewCount: (total, selected) => `${selected} of ${total} rows selected`,
      confirmButton: (count) => `Import ${count} book${count === 1 ? "" : "s"}`,
      statusNew: "New",
      statusAlreadyOwned: "Already owned",
      confirmed: (created) => `${created} book${created === 1 ? "" : "s"} imported.`,
      nothingSelected: "Select at least one row.",
      emptyFile: "No rows found in the file.",
    },
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
    aiPickTitle: "Picks for you",
    aiPickBadge: "AI",
    aiPickPrompt: "Ask the AI for a few personalized reading suggestions based on your taste.",
    aiPickAskButton: "Ask for picks",
    aiPickLoading: "Analyzing your taste...",
    aiPickEmpty: "No picks available right now.",
    aiPickLike: "I like this",
    aiPickDislike: "Not for me",
    aiPickFeedbackSaved: "Feedback saved, thanks!",
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
    filtersToggle: "Filters",
    locationFilterActive: (name) => `Showing books in: ${name}`,
    clearLocationFilter: "Clear location filter",
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
      searchTab: "Search by title/author",
      isbnLabel: "ISBN",
      lookupButton: "Look up",
      notFoundMessage: "ISBN not found in this demo. Enter the details manually.",
      manualEntryButton: "Enter manually",
      simulateScanButton: "📷 Simulate scan",
      searchTitleLabel: "Title",
      searchTitlePlaceholder: "e.g. The Name of the Rose",
      searchAuthorLabel: "Author",
      searchAuthorPlaceholder: "e.g. Umberto Eco",
      searchButton: "Search",
      searchMissingQuery: "Enter a title or an author",
      searchNoResults: "No results for this search",
      searchResultsHint: "Select a result to prefill the form",
      searchSelect: "Select",
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
    shelfScan: {
      pageTitle: "Shelf scan",
      subtitle: "Photograph a shelf to catalog several books at once.",
      selectShelf: "Select the shelf",
      simulateCaptureButton: "Simulate photo scan",
      reading: "Analyzing the image...",
      reviewSubtitle: "Review the recognized books before confirming.",
      retakeLink: "← Retake the scan",
      reviewCount: (total, selected) => `${selected} of ${total} books selected`,
      confirmButton: (count) => `Add ${count} book${count === 1 ? "" : "s"}`,
      statusMatched: "Matched",
      statusUncertain: "Needs review",
      confirmed: (created) => `${created} book${created === 1 ? "" : "s"} added to the library.`,
      nothingSelected: "Select at least one book.",
      setupHint: "Select a shelf to start the simulated scan.",
    },
    shelfAudit: {
      pageTitle: "Shelf audit",
      subtitle: "Photograph a shelf to compare it against the catalog.",
      selectShelf: "Select the shelf",
      simulateCaptureButton: "Simulate photo audit",
      reading: "Comparing against the catalog...",
      retakeLink: "← Retake the audit",
      allMatch: "Everything matches! No discrepancies found.",
      presentCount: (n) => `${n} book${n === 1 ? "" : "s"} present on the shelf.`,
      missingTitle: (n) => `${n} missing book${n === 1 ? "" : "s"}`,
      missingHint: "These books are catalogued here but weren't detected in the photo.",
      viewBook: "View book",
      unexpectedTitle: (n) => `${n} uncatalogued book${n === 1 ? "" : "s"}`,
      unexpectedHint: "These books are on the shelf but aren't catalogued here.",
      addHere: "Add here",
      addedUnexpected: (title) => `"${title}" added to the library.`,
      setupHint: "Select a shelf to start the simulated audit.",
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
    suggestTagsButton: "✨ Suggest tags with AI",
    suggestingTags: "Generating suggestions...",
    suggestedTagsHint: "Tap a tag to add it",
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
    ratings: {
      title: "Ratings",
      addReview: "+ Add review",
      noRatings: "No ratings yet.",
      noReviews: "No reviews available.",
      votes: (n) => `${n} ${n === 1 ? "vote" : "votes"}`,
      ratingLabel: "Rating",
      reviewLabel: "Review (optional)",
      reviewPlaceholder: "Write your review...",
      cancel: "Cancel",
      save: "Save review",
      update: "Update",
      edit: "Edit",
      delete: "Delete",
      formModalTitle: "Write a review",
      editModalTitle: "Edit review",
      selectStarError: "Select at least one star.",
      updateSuccess: "Review updated.",
      addSuccess: "Review added.",
      saveError: "Error saving the review.",
      deleteSuccess: "Review deleted.",
      deleteError: "Error deleting the review.",
      familyMemberFallback: "Family member",
    },
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
    searchPlaceholder: "Search by book or name...",
    filtersToggle: "Filters",
    filterStatus: "Due status",
    statusOverdue: "Overdue",
    statusWarning: "Due soon",
    statusNormal: "On track",
    clearFilters: "Clear filters",
    noSearchResults: "No loans match your search",
    overdueBadge: (n) => `${n} overdue`,
    markReturnedAction: "Mark as returned",
    returnSuccess: "Loan marked as returned",
  },
  wishlist: {
    title: "Wishlist",
    booksCount: (n) => `${n} ${n === 1 ? "book" : "books"} wanted`,
    addButton: "+ Add",
    emptyTitle: "No wishlist items yet",
    emptyDescription: "Add the books you'd like to get for the library.",
    searchPlaceholder: "Search the wishlist...",
    filtersToggle: "Filters",
    filterPriority: "Priority",
    filterMember: "Member",
    priorityHigh: "High",
    priorityMedium: "Medium",
    priorityLow: "Low",
    priorityNone: "None",
    clearFilters: "Clear filters",
    noSearchResults: "No wishlist items match your search",
    wantedBy: "Wanted by",
    remove: "Remove",
    acquire: "Acquire",
    confirmRemoveTitle: "Remove from wishlist?",
    confirmRemoveDescription: (title) => `"${title}" will be removed from the wishlist.`,
    removeSuccess: "Removed from wishlist.",
    removeFailed: "Error removing the item.",
    backLink: "← Back to wishlist",
    addPageTitle: "Add to wishlist",
    addPageSubtitle: "Search for a book or enter it manually.",
    authorLabel: "Author",
    wishlistDetails: "Wishlist details",
    priorityLabel: "Priority",
    notesLabel: "Notes (optional)",
    notesPlaceholder: "Why you want it, preferred edition...",
    addSuccess: "Added to wishlist.",
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
    viewBooksLink: "Show books here",
    booksWarning: (n) => (n === 0 ? "" : ` ${n} book${n === 1 ? "" : "s"} here will lose their position.`),
    sectionCountLabel: "Number of sections",
    shelfCountLabel: "Number of shelves",
  },
  bookcaseMap: {
    notFound: "Bookcase not found",
    backToLocations: "← Back to bookcases",
    legend: "Legend:",
    emptyShelf: "Empty shelf",
    sectionLabel: (n) => `Section ${n}`,
    shelfLabel: (n) => `Shelf ${n}`,
    scanLink: "Scan",
    auditLink: "Audit",
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
    favoriteGenreLabel: "Favorite genre",
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
    memberModal: {
      totalReads: "total reads",
      recentlyRead: "Recently read",
      topAuthorsReadSection: "Most-read authors",
      topAuthorsOwnedSection: "Most-owned authors",
      noReads: "No reads recorded.",
      viewAll: "View all read books",
      goalsSection: "Annual goal",
      goalBooksLabel: "Books read",
      currentlyReadingSection: "Currently reading",
      readingHistogramSection: "Reading over time",
      readingHistogramNoReads: "No reads this year.",
      genreSection: "Favorite genres",
    },
  },
  memberProfile: {
    title: "Member profile",
    notFound: "Member not found.",
    memberSince: "Member since",
    changeAvatarHint: "The avatar is generated automatically from the name in this demo.",
  },
  badge: {
    read: "Read",
    reading: "Reading",
    toRead: "To read",
    info: "Info",
    danger: "Warning",
  },
  legal: {
    common: { draftNotice: (version) => `⚠ Draft — pending legal review. Version ${version}.` },
    privacy: {
      pageTitle: "Privacy Policy",
      s1: {
        heading: "1. Data controller",
        before:
          "The data controller is Carmelo La Gamba, based in Italy. As the controller is established in the EU, no separate Art. 27 GDPR EU representative is required. Contact:",
      },
      s2: {
        heading: "2. What we collect",
        items: [
          "Account data: email, full name, password (hashed, never stored in plain text).",
          "Library data: rooms, bookcases, books, loans (including a borrower's name if you record one), ratings, reviews, reading history, notes.",
          "Optional AI-suggestion history (tag/incipit/recommendation requests), only if this installation has AI features enabled.",
          "Technical data needed to keep you signed in: a JWT access token and refresh token.",
        ],
      },
      s3: {
        heading: "3. Why we process it and legal basis",
        body: "To provide the library-management service you asked for (contract performance, Art. 6(1)(b) GDPR), and to keep the service secure (legitimate interest, Art. 6(1)(f)).",
      },
      s4: {
        heading: "4. Where your data is stored",
        body: "Self-hosted installations keep all data on the server you deploy it to. For our hosted (Pro/SaaS) installation, your account and library data are stored with a managed database provider located in the EU/EEA (the specific provider and region will be named here once finalized).",
      },
      s5: {
        heading: "5. Who else processes your data",
        intro: "Depending on this installation's configuration:",
        items: [
          "A managed database provider (EU/EEA-based, see §4).",
          "A hosting provider for the web app.",
        ],
        aiItem:
          "Only if AI features are enabled: your requests to generate tags, book presentations, or recommendations are sent to OpenRouter, Inc. (San Francisco, USA), which routes the request to a Qwen language model. Unlike the rest of our infrastructure, this one processor is intentionally located outside the EU/EEA. This transfer currently relies on OpenRouter's standard terms of service; a formal Art. 46 GDPR safeguard (Standard Contractual Clauses) is being evaluated before this feature is offered broadly to EU users. OpenRouter may in turn route inference through its own model-hosting sub-processors; an up-to-date list is available on OpenRouter's website. AI features can be disabled at the installation level (they are off unless explicitly configured).",
      },
      s6: {
        heading: "6. How long we keep it",
        intro: "We keep your data for as long as your account exists. Specifically:",
        items: [
          "Removed-member records (name and email, kept to let you restore a former member from a backup): deleted within 12 months of removal.",
          "AI suggestion history: deleted within 12 months of being generated.",
          "Book loan history (including any borrower name you recorded): kept for as long as your account exists — it's part of your library's own history, not a separate account with its own retention clock. Deleted only if you delete your account.",
          "Inactive accounts: no automatic deletion at this time — you can delete your account at any time from Settings.",
        ],
      },
      s7: {
        heading: "7. Cookies and local storage",
        body: "We don't use tracking or advertising cookies. The app stores a small amount of data in your browser's local storage purely to make it work: your sign-in session, and your theme/language preference. This is strictly functional and, under the ePrivacy Directive, does not require consent — but we're telling you about it anyway.",
      },
      s8: {
        heading: "8. Your rights",
        items: [
          "Access and download a copy of your data — Settings → Library data → Download full backup.",
          "Correct inaccurate data — edit it directly in the app.",
          "Delete your account and all associated data — Settings → Privacy → Delete account.",
          "Contact us with any other request or complaint — see below.",
          "Lodge a complaint with your local data protection authority.",
        ],
      },
      s9: { heading: "9. Contact" },
    },
    terms: {
      pageTitle: "Terms of Service",
      s1: {
        heading: "1. Who runs this service",
        before: "This service is run by Carmelo La Gamba, based in Italy. Contact:",
      },
      s2: {
        heading: "2. Who can use it",
        body: "The admin who registers a library must be an adult, and is responsible for the account and everything entered in it. Member profiles for minors are allowed: if you add a child as a member (e.g. to track what they read), you as the registering adult are their parent/guardian or otherwise responsible for them, you consent on their behalf to that member's data being processed as described in the Privacy Policy, and you're responsible for removing their data if requested. [Whether this triggers Art. 8 GDPR's direct-to-child consent requirements, or is instead treated as a parent/guardian managing a household record on the child's behalf, is pending legal confirmation.]",
      },
      s3: {
        heading: "3. Your account",
        body: "You're responsible for keeping your password secure. The admin role can invite/remove members, change roles, and permanently delete the whole library and account — this is irreversible.",
      },
      s4: {
        heading: "4. Data you enter about others",
        body: "If you record a borrower's name for a book loan, you're entering personal data about someone who isn't a registered user of this service. You're responsible for having a lawful basis to do so (e.g. it's obviously reasonable to note who you lent a book to) and for removing it if they ask you to.",
      },
      s5: {
        heading: "5. Optional AI features",
        body: "If this installation has AI features enabled, tag/incipit/recommendation requests are sent to OpenRouter, Inc. (a US-based service), which routes them to a Qwen language model — this involves a transfer of data outside the EU/EEA. See the Privacy Policy §5 for details. These features are off by default and can be disabled at the installation level.",
      },
      s6: {
        heading: "6. Termination",
        body: "You can delete your account at any time from Settings. We may suspend accounts that abuse the service.",
      },
      s7: {
        heading: "7. Liability",
        body: 'The service is provided "as is", without warranties beyond what mandatory law requires. To the extent permitted by Italian law, we\'re not liable for indirect, incidental, or consequential damages, or for loss of data you failed to export before deleting your account. Nothing here excludes liability that cannot be excluded under mandatory law (e.g. wilful misconduct, gross negligence, or statutory consumer rights). [Amount-based liability cap, if any, pending legal review.]',
      },
      s8: {
        heading: "8. Governing law",
        body: "These terms are governed by Italian law. If you are a consumer resident in the EU, the mandatory consumer-protection rules of your own country of residence may also apply, and — per Italian consumer law (Codice del Consumo, Art. 33) — the court of your place of residence has jurisdiction over any dispute. For disputes not covered by mandatory consumer protection, [competent court/venue pending confirmation].",
      },
    },
  },
  kids: {
    navLabel: "Kids",
    myReadingNavLabel: "My Reading",
    parentTitle: "Kids Mode",
    parentDescription: "Reading sessions, quizzes, journal and family challenges — built to grow readers, not to put them in competition.",
    childTitle: "My Reading",
    childDescription: "What you're reading, your journal, and your quizzes.",
    independentOfAiNote: "Kids Mode works even without the AI module — only the core features are shown below.",
    sessionsTitle: "Reading Sessions",
    sessionsEmpty: "No sessions logged yet.",
    loggedByParent: "read together with a parent",
    loggedByChild: "read by you",
    quizTitle: "Comprehension Quiz",
    quizResult: (score: number, total: number) => `You answered ${score} out of ${total} questions correctly`,
    quizEmpty: "No quiz yet for this book.",
    journalTitle: "Reading Journal",
    journalEmpty: "No journal entries yet.",
    pathTitle: "Reading Path",
    pathBadge: (name: string) => `Reward: ${name}`,
    pathProgress: (done: number, total: number) => `${done} of ${total} books read`,
    challengeTitle: "Family Challenge",
    challengeProgress: (done: number, goal: number) => `${done} / ${goal} minutes together`,
    challengeNote: "One shared goal, no leaderboard between siblings — not even in the data.",
    philosophyLink: "Why it's built this way →",
    journalText: {
      je1: "The fox is my favourite part!",
      je2: "Harry finds out he's a wizard and gets his letter from Hogwarts. If it were me, I'd have chosen Gryffindor too, like him.",
    },
    pathText: {
      rp1: { title: "Fantastic Worlds", badgeName: "World Explorer" },
    },
    challengeText: {
      fc1: "1000 minutes together this summer",
    },
  },
  bookClub: {
    navLabel: "Book Club",
    title: "Book Club",
    subtitle: "Pick a book, read it together, talk about it",
    startCycleButton: "Start a reading cycle",
    startCycleHelp: "A cycle is a shared read: pick a book from the catalog, members read it over the same period and discuss it. Included free, even in Community.",
    currentReadLabel: "Reading now",
    activeLabel: "Active",
    alsoActiveLabel: "Other active cycles",
    historyLabel: "History",
    historyHint: "Finished cycles: open one to revisit its discussion, participants and rating.",
    emptyTitle: "No reading cycles yet",
    emptyDescription: "Start a cycle to read a book together with the other members.",
    participantsCount: (n) => `${n} participants`,
    proposalsLink: "Proposals",
    cycleTitleLabel: "Cycle title",
    pickBookLabel: "Pick a book",
    searchPlaceholder: "Search your books",
    createSuccess: "Cycle started",
    statusReading: "Reading",
    statusDiscussing: "Discussing",
    statusArchived: "Archived",
    moveToDiscussionButton: "Move to discussion",
    undoMoveToDiscussionButton: "Undo, back to reading",
    archiveButton: "Archive",
    reopenButton: "Reopen the cycle",
    archivedNotice: "Cycle finished and archived. Read-only.",
    archivedReopenHint: "Clicked by mistake? You can reopen it.",
    backLink: "Book Club",
    participantsTitle: "Participants",
    noParticipants: "No participants yet",
    joinButton: "Join",
    markFinishedButton: "Mark as finished",
    finishedLabel: "Finished",
    aiPromptsTitle: "Discussion prompts",
    showPromptsButton: "Show prompts",
    promptsLoading: "Generating…",
    noPrompts: "No prompts available",
    meetingsTitle: "Meetings",
    noMeetings: "No meetings scheduled",
    meetingWhenLabel: "Date and time",
    meetingNoteLabel: "Place or link",
    meetingNotePlaceholder: "Library, room 2 or a video link",
    scheduleButton: "Schedule",
    discussionTitle: "Discussion",
    discussionLocked: "Discussion opens once the cycle moves to discussion.",
    discussionLockedArchived: "Cycle archived: discussion is closed. Reopen the cycle to keep writing.",
    writePlaceholder: "Write a comment",
    spoilerLabel: "Contains spoilers",
    spoilerBadge: "Spoiler",
    revealSpoilerButton: "Reveal spoiler",
    postButton: "Post",
    noPosts: "No comments yet",
    ratingLabel: (avg, total) => `★ ${avg} (${total})`,
    proposalsTitle: "Proposals",
    proposalsSubtitle: "Propose and vote on the next book",
    proposeBookButton: "Propose a book",
    proposalNoteLabel: "Note (optional)",
    proposalNotePlaceholder: "Why you propose it",
    noProposals: "No proposals",
    noProposalsDescription: "Propose a book to vote on for the next cycle.",
    promoteButton: "Promote",
    promoteSuccess: "Cycle started from the proposal",
    aiPromptTemplates: [
      "What surprised you most about reading \"{title}\"?",
      "Is there a character in \"{title}\" you recognised yourself in? Why?",
      "If you could change the ending of \"{title}\", how would you rewrite it?",
      "Which scene from \"{title}\" stuck with you most, and why?",
      "Would you recommend \"{title}\" to a friend? Who specifically?",
    ],
  },
};

export const es: Translations = {
  locale: "es-ES",
  nav: {
    home: "Inicio",
    books: "Libros",
    loans: "En préstamo",
    wishlist: "Lista de deseos",
    locations: "Estanterías",
    stats: "Estadísticas",
    bookDetail: "Detalle del libro",
    users: "Usuarios",
    kids: "Kids",
    kidsMyReading: "Mi lectura",
    bookClub: "Club",
    settings: "Ajustes",
  },
  common: {
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    add: "Añadir",
    back: "← Atrás",
    confirm: "Confirmar",
    logout: "Cerrar sesión",
    email: "Correo electrónico",
    password: "Contraseña",
    familyName: "Nombre de la familia",
    fullName: "Nombre completo",
    name: "Nombre",
    description: "Descripción",
    you: "tú",
    appName: "Jinbocho",
    appSubtitle: "Tu biblioteca doméstica",
    menu: "Menú",
    closeMenu: "Cerrar menú",
    pageNotFound: "Página no encontrada",
    pageNotFoundDesc: "La página que buscas no existe o ha sido movida.",
    goHome: "Ir al inicio",
  },
  validation: {
    invalidEmail: "Dirección de correo no válida",
    passwordRequired: "La contraseña es obligatoria",
    minChars8: "Mínimo 8 caracteres",
    familyNameRequired: "El nombre de la familia es obligatorio",
    titleRequired: "El título es obligatorio",
    passwordsMismatch: "Las contraseñas no coinciden",
    required: "Este campo es obligatorio",
  },
  auth: {
    loginTitle: "Iniciar sesión",
    loginSubtitle: "Tu biblioteca familiar",
    loginButton: "Iniciar sesión",
    demoHintTitle: "Credenciales de la demo",
    demoHintBody: "carmelo@jinbocho.app (admin) · sara@jinbocho.app (editor) · luca@jinbocho.app (lector) — cualquier contraseña funciona.",
    forgotPasswordLink: "¿Olvidaste tu contraseña?",
    registerLink: "Crear una familia →",
    invalidCredentials: "Credenciales no válidas",
    inactiveAccount: "Cuenta desactivada",
    genericError: "Algo salió mal, inténtalo de nuevo",
    registerTitle: "Crea tu familia",
    registerSubtitle: "Empieza tu biblioteca",
    registerButton: "Crear familia",
    registerWipeHint: "En esta demo, registrarte reinicia los datos simulados y empieza con una biblioteca vacía.",
    haveAccountLink: "¿Ya tienes una cuenta? Inicia sesión",
    forgotTitle: "Contraseña olvidada",
    forgotSubtitle: "Te enviaremos un enlace para restablecerla",
    forgotButton: "Enviar enlace",
    forgotSuccess: "Si ese correo existe, recibirás un enlace para restablecer la contraseña. (Demo: no se envía ningún correo real)",
    backToLoginLink: "← Volver al inicio de sesión",
    resetTitle: "Restablecer contraseña",
    resetSubtitle: "Elige una nueva contraseña",
    newPasswordLabel: "Nueva contraseña",
    confirmPasswordLabel: "Confirmar contraseña",
    resetButton: "Restablecer contraseña",
    resetSuccess: "Contraseña restablecida correctamente.",
    goToLoginButton: "Ir a iniciar sesión",
  },
  enums: {
    role: { admin: "Admin", editor: "Editor", viewer: "Lector", child: "Niño/a" },
    readingStatus: { to_read: "Por leer", reading: "Leyendo", read: "Leído" },
    genre: {
      fiction: "Ficción", fantasy: "Fantasía", science_fiction: "Ciencia ficción", mystery_thriller: "Misterio/Thriller",
      romance: "Romance", horror: "Terror", historical: "Histórica", biography_memoir: "Biografía",
      history: "Historia", science: "Ciencia", philosophy: "Filosofía", religion: "Religión",
      self_help: "Autoayuda", business: "Negocios", art: "Arte", poetry: "Poesía",
      drama: "Teatro", comics: "Cómics", children: "Infantil", young_adult: "Juvenil",
      travel: "Viajes", cooking: "Cocina", essay: "Ensayo", reference: "Consulta", other: "Otro",
    },
    condition: { new: "Nuevo", good: "Bueno", fair: "Aceptable", poor: "Desgastado" },
    source: { purchased: "Comprado", gift: "Regalo", borrowed: "Prestado", other: "Otro" },
  },
  placement: {
    room: "Habitación",
    bookcase: "Estantería",
    section: "Sección",
    shelf: "Balda",
    selectPlaceholder: "— Selecciona —",
  },
  pagination: {
    prev: "← Anterior",
    next: "Siguiente →",
    page: (n) => `Página ${n}`,
  },
  export: {
    button: "Exportar",
    csv: "CSV",
    json: "JSON",
  },
  filters: {
    ownerLabel: "Propietario",
    allOwners: "Todos los propietarios",
    genreLabel: "Género",
    allGenres: "Todos los géneros",
  },
  users: {
    title: "Usuarios",
    description: (n) => `${n} miembro${n === 1 ? "" : "s"} de la familia`,
    inviteButton: "Invitar usuario",
    createTitle: "Invitar usuario",
    editTitle: "Editar usuario",
    roleLabel: "Rol",
    activeLabel: "Activo",
    inactiveBadge: "Desactivado",
    inviteHint: "En esta demo el usuario se crea al instante, sin enviar correo.",
    cannotEditSelf: "No puedes cambiar tu propio rol o estado",
    deleteConfirmTitle: "¿Eliminar usuario?",
    deleteConfirmMessage: (name) => `${name} será eliminado de la familia.`,
  },
  settings: {
    title: "Ajustes",
    familyTitle: "Familia",
    familyAdminOnly: "Solo los administradores pueden editar esto",
    profileTitle: "Perfil",
    annualGoalLabel: "Objetivo anual de lectura",
    annualGoalHint: "Número de libros que quieres leer este año",
    appearanceTitle: "Apariencia",
    themeLabel: "Tema",
    modeLabel: "Modo",
    modeLight: "☀️ Claro",
    modeDark: "🌙 Oscuro",
    modeSystem: "💻 Sistema",
    languageTitle: "Idioma",
    backupTitle: "Copia de seguridad y exportación",
    exportLibraryLabel: "Exportar libros (CSV/JSON)",
    fullBackupLabel: "Copia de seguridad completa",
    exportBackupButton: "Exportar copia completa",
    importBackupButton: "Importar copia de seguridad",
    importConfirmTitle: "¿Importar copia de seguridad?",
    importConfirmMessage: (counts) => `Esta copia de seguridad contiene: ${counts}.`,
    importWarning: "Los datos se sustituirán por los de la copia importada en esta sesión de demo.",
    importSuccess: "Copia de seguridad importada correctamente",
    importError: "Archivo de copia de seguridad no válido",
    signOutTitle: "Cerrar sesión",
    signOutButton: "Cerrar sesión de tu cuenta",
    dangerZoneTitle: "Zona de peligro",
    deleteAccountButton: "Eliminar familia",
    deleteAccountWarning: "Esta acción elimina la familia, todos los usuarios y la biblioteca. En esta demo siempre puedes recargar la página para restaurar los datos originales.",
    deleteAccountConfirmFamilyName: "Escribe el nombre de la familia para confirmar",
    deleteAccountConfirmPassword: "Contraseña",
    deleteAccountConfirmButton: "Eliminar definitivamente",
    deleteAccountMismatch: "El nombre de la familia no coincide",
    themeNames: { pergamena: "Pergamena", akabeni: "Akabeni", sumi: "Sumi" },
    goodreadsImportTitle: "Importar desde Goodreads",
    goodreadsImportButton: "Importar CSV de Goodreads",
    goodreads: {
      reviewTitle: "Revisa los libros a importar",
      reviewCount: (total, selected) => `${selected} de ${total} filas seleccionadas`,
      confirmButton: (count) => `Importar ${count} libro${count === 1 ? "" : "s"}`,
      statusNew: "Nuevo",
      statusAlreadyOwned: "Ya en la biblioteca",
      confirmed: (created) => `${created} libro${created === 1 ? "" : "s"} importado${created === 1 ? "" : "s"}.`,
      nothingSelected: "Selecciona al menos una fila.",
      emptyFile: "No se encontraron filas en el archivo.",
    },
  },
  sidebar: { subtitle: "Biblioteca doméstica" },
  banner: {
    text: "⚠️ Demo interactiva — todos los datos son simulados.",
    link: "Descubre el proyecto real en GitHub →",
  },
  dashboard: {
    description: "Un resumen de tu biblioteca familiar.",
    statTotal: "Total de libros",
    statRead: "Leídos",
    statReading: "Leyendo",
    statToRead: "Por leer",
    currentlyReading: "Leyendo actualmente",
    noCurrentlyReading: "No hay libros en lectura",
    untitled: "Sin título",
    onLoan: "En préstamo",
    seeAll: "Ver todos →",
    allBooksHome: "Todos los libros están en casa",
    overdue: "Vencido",
    due: "Vence",
    recentlyAdded: "Añadidos recientemente",
    noRecentlyAdded: "Todavía no hay libros",
    nextRead: "¿Qué leer después?",
    another: "🎲 Otro",
    noNextRead: "No hay libros en la lista de pendientes",
    unreadTitle: "No leídos por nadie",
    unreadDesc: (n) => `libro${n === 1 ? "" : "s"} que ningún miembro ha leído todavía`,
    familyFavorites: "Favoritos de la familia",
    noFamilyFavorites: "Ningún libro leído por más de un miembro",
    members: (n) => `${n} miembro${n === 1 ? "" : "s"}`,
    readingGoal: (year) => `Objetivo de lectura ${year}`,
    activityTitle: "Actividad familiar",
    activityVerb: "leyó",
    aiPickTitle: "Recomendaciones para ti",
    aiPickBadge: "IA",
    aiPickPrompt: "Pide a la IA algunas recomendaciones de lectura personalizadas según tus gustos.",
    aiPickAskButton: "Pedir recomendaciones",
    aiPickLoading: "Analizando tus gustos...",
    aiPickEmpty: "No hay recomendaciones disponibles por ahora.",
    aiPickLike: "Me gusta",
    aiPickDislike: "No es para mí",
    aiPickFeedbackSaved: "Comentario guardado, ¡gracias!",
  },
  catalog: {
    booksInLibrary: (n) => `${n} libro${n === 1 ? "" : "s"} en la biblioteca`,
    searchLabel: "Buscar por título o autor",
    searchPlaceholder: "ej. Cervantes, 1984...",
    roomLabel: "Habitación",
    allRooms: "Todas las habitaciones",
    statusAll: "Todos",
    statusToRead: "Por leer",
    statusReading: "Leyendo",
    statusRead: "Leídos",
    results: (n) => `${n} resultado${n === 1 ? "" : "s"}`,
    resultsFor: "para",
    noResults: "No se encontraron libros",
    noResultsHint: "Prueba a modificar los filtros de búsqueda",
    removeFilters: "Quitar filtros",
    filtersToggle: "Filtros",
    locationFilterActive: (name) => `Mostrando los libros en: ${name}`,
    clearLocationFilter: "Quitar filtro de ubicación",
  },
  books: {
    duplicateTitle: "Posible duplicado",
    duplicateIsbnReason: "Ya existe una ficha con el mismo ISBN:",
    duplicateTitleReason: "Ya existe una ficha con el mismo título y autor:",
    duplicateConfirm: "Añadir de todos modos",
    add: {
      pageTitle: "Añadir libro",
      typeTab: "Escribir ISBN",
      scanTab: "Escanear",
      searchTab: "Buscar por título/autor",
      isbnLabel: "ISBN",
      lookupButton: "Buscar",
      notFoundMessage: "ISBN no encontrado en esta demo. Introduce los datos manualmente.",
      manualEntryButton: "Introducir manualmente",
      simulateScanButton: "📷 Simular escaneo",
      searchTitleLabel: "Título",
      searchTitlePlaceholder: "ej. El nombre de la rosa",
      searchAuthorLabel: "Autor",
      searchAuthorPlaceholder: "ej. Umberto Eco",
      searchButton: "Buscar",
      searchMissingQuery: "Introduce al menos un título o un autor",
      searchNoResults: "No hay resultados para esta búsqueda",
      searchResultsHint: "Selecciona un resultado para rellenar la ficha",
      searchSelect: "Seleccionar",
      formTitle: "Datos del libro",
      titleLabel: "Título",
      authorLabel: "Autor",
      isbnFieldLabel: "ISBN",
      publisherLabel: "Editorial",
      yearLabel: "Año",
      genreLabel: "Género",
      placementTitle: "Ubicación",
      readingStatusLabel: "Estado de lectura",
      ownerLabel: "Propietario",
      noOwner: "Ninguno",
      submitButton: "Añadir a la biblioteca",
      successToast: "Libro añadido a la biblioteca",
    },
    shelfAdd: {
      pageTitle: "Añadir varios libros a una balda",
      setupHint: "Elige la ubicación y (opcionalmente) el propietario: se mantendrán fijos para todos los libros de esta sesión.",
      startButton: "Empezar",
      changePositionButton: "Cambiar posición",
      doneButton: "Terminar",
      countLabel: (n) => `${n} libro${n === 1 ? "" : "s"} añadido${n === 1 ? "" : "s"}`,
      addButton: "Añadir",
      editButton: "Editar",
      skipButton: "Saltar",
      undoButton: "Deshacer",
      sessionTitle: "Libros añadidos en esta sesión",
      noSessionBooks: "Todavía no se ha añadido ningún libro",
    },
    shelfScan: {
      pageTitle: "Escanear estantería",
      subtitle: "Fotografía una balda para catalogar varios libros a la vez.",
      selectShelf: "Selecciona la balda",
      simulateCaptureButton: "Simular escaneo de foto",
      reading: "Analizando la imagen...",
      reviewSubtitle: "Revisa los libros reconocidos antes de confirmar.",
      retakeLink: "← Repetir el escaneo",
      reviewCount: (total, selected) => `${selected} de ${total} libros seleccionados`,
      confirmButton: (count) => `Añadir ${count} libro${count === 1 ? "" : "s"}`,
      statusMatched: "Reconocido",
      statusUncertain: "Por revisar",
      confirmed: (created) => `${created} libro${created === 1 ? "" : "s"} añadido${created === 1 ? "" : "s"} a la biblioteca.`,
      nothingSelected: "Selecciona al menos un libro.",
      setupHint: "Selecciona una balda para iniciar el escaneo simulado.",
    },
    shelfAudit: {
      pageTitle: "Verificar estantería",
      subtitle: "Fotografía una balda para compararla con el catálogo.",
      selectShelf: "Selecciona la balda",
      simulateCaptureButton: "Simular verificación de foto",
      reading: "Comparando con el catálogo...",
      retakeLink: "← Repetir la verificación",
      allMatch: "¡Todo coincide! No se encontraron discrepancias.",
      presentCount: (n) => `${n} libro${n === 1 ? "" : "s"} presente${n === 1 ? "" : "s"} en la balda.`,
      missingTitle: (n) => `${n} libro${n === 1 ? "" : "s"} faltante${n === 1 ? "" : "s"}`,
      missingHint: "Estos libros están catalogados aquí pero no se detectaron en la foto.",
      viewBook: "Ver libro",
      unexpectedTitle: (n) => `${n} libro${n === 1 ? "" : "s"} sin catalogar`,
      unexpectedHint: "Estos libros están en la balda pero no aparecen catalogados aquí.",
      addHere: "Añadir aquí",
      addedUnexpected: (title) => `"${title}" añadido a la biblioteca.`,
      setupHint: "Selecciona una balda para iniciar la verificación simulada.",
    },
  },
  bookDetail: {
    notFound: "Libro no encontrado",
    recordNotFound: "Ficha bibliográfica no encontrada",
    backToCatalog: "← Volver al catálogo",
    fieldYear: "Año",
    fieldPublisher: "Editorial",
    fieldIsbn: "ISBN",
    fieldGenre: "Género",
    fieldPurchased: "Comprado",
    position: "Ubicación",
    sectionLabel: (n) => `Sección ${n}`,
    shelfLabel: (n) => `Balda ${n}`,
    posLabel: "Pos.",
    owner: "Propietario",
    readingBy: "Leyéndolo",
    loanStatus: "En préstamo",
    loanedTo: "Prestado a",
    loanedFrom: "desde",
    dueDate: "Vencimiento:",
    notes: "Notas",
    readBy: (n) => `Leído por (${n})`,
    editButton: "Editar",
    moveButton: "Mover",
    deleteButton: "Eliminar",
    deleteConfirmTitle: "¿Eliminar libro?",
    deleteConfirmMessage: "Esta copia se eliminará de la biblioteca. Esta acción no se puede deshacer en esta sesión de demo.",
    editModalTitle: "Editar libro",
    editRecordSection: "Ficha bibliográfica (compartida)",
    editCopySection: "Esta copia",
    moveModalTitle: "Mover libro",
    conditionLabel: "Estado",
    sourceLabel: "Procedencia",
    tagsLabel: "Etiquetas",
    tagsHint: "Separadas por comas",
    suggestTagsButton: "✨ Sugerir etiquetas con IA",
    suggestingTags: "Generando sugerencias...",
    suggestedTagsHint: "Toca una etiqueta para añadirla",
    whoReadTitle: "Quién lo ha leído",
    markRead: "Marcar como leído",
    markUnread: "Marcar como no leído",
    lendTitle: "Prestar este libro",
    borrowerLabel: "Nombre de quien lo recibe",
    dueDateLabel: "Vencimiento (opcional)",
    lendButton: "Prestar",
    returnButton: "Marcar como devuelto",
    loanHistoryTitle: "Historial de préstamos",
    noLoanHistory: "Ningún préstamo registrado",
    presentationTitle: "Presentación",
    presentationEmpty: "No hay presentación disponible para este libro.",
    generateAiButton: "✨ Generar con IA",
    generatingAi: "Generando...",
    editPresentationButton: "Editar",
    sourceManual: "Manual",
    sourceAi: "Generada con IA",
    sourceEditorial: "Editorial",
    historyTitle: "Historial",
    noHistory: "Ningún evento registrado",
    ratings: {
      title: "Reseñas",
      addReview: "+ Añadir reseña",
      noRatings: "Todavía no hay reseñas.",
      noReviews: "No hay reseñas disponibles.",
      votes: (n) => `${n} voto${n === 1 ? "" : "s"}`,
      ratingLabel: "Valoración",
      reviewLabel: "Reseña (opcional)",
      reviewPlaceholder: "Escribe tu reseña...",
      cancel: "Cancelar",
      save: "Guardar reseña",
      update: "Actualizar",
      edit: "Editar",
      delete: "Eliminar",
      formModalTitle: "Escribir una reseña",
      editModalTitle: "Editar reseña",
      selectStarError: "Selecciona al menos una estrella.",
      updateSuccess: "Reseña actualizada.",
      addSuccess: "Reseña añadida.",
      saveError: "Error al guardar la reseña.",
      deleteSuccess: "Reseña eliminada.",
      deleteError: "Error al eliminar la reseña.",
      familyMemberFallback: "Miembro de la familia",
    },
  },
  loans: {
    title: "En préstamo",
    subtitle: (active, returned) => `${active} activo${active === 1 ? "" : "s"} · ${returned} devuelto${returned === 1 ? "" : "s"}`,
    activeLoans: "Préstamos activos",
    noActiveLoans: "No hay préstamos activos",
    colBook: "Libro",
    colLoanedTo: "Prestado a",
    colFrom: "Desde",
    colDue: "Vencimiento",
    colStatus: "Estado",
    returnedLoans: "Préstamos devueltos",
    noReturnedLoans: "No hay préstamos devueltos",
    colReturnedOn: "Devuelto el",
    statusOnLoan: "En préstamo",
    searchPlaceholder: "Buscar por libro o nombre...",
    filtersToggle: "Filtros",
    filterStatus: "Estado de vencimiento",
    statusOverdue: "Atrasado",
    statusWarning: "Por vencer",
    statusNormal: "En regla",
    clearFilters: "Quitar filtros",
    noSearchResults: "Ningún préstamo coincide con la búsqueda",
    overdueBadge: (n) => `${n} atrasado${n === 1 ? "" : "s"}`,
    markReturnedAction: "Marcar como devuelto",
    returnSuccess: "Préstamo marcado como devuelto",
  },
  wishlist: {
    title: "Lista de deseos",
    booksCount: (n) => `${n} libro${n === 1 ? "" : "s"} deseado${n === 1 ? "" : "s"}`,
    addButton: "+ Añadir",
    emptyTitle: "Todavía no hay deseos en la lista",
    emptyDescription: "Añade los libros que te gustaría conseguir para la biblioteca.",
    searchPlaceholder: "Buscar en la lista de deseos...",
    filtersToggle: "Filtros",
    filterPriority: "Prioridad",
    filterMember: "Miembro",
    priorityHigh: "Alta",
    priorityMedium: "Media",
    priorityLow: "Baja",
    priorityNone: "Ninguna",
    clearFilters: "Quitar filtros",
    noSearchResults: "Ningún deseo coincide con la búsqueda",
    wantedBy: "Deseado por",
    remove: "Quitar",
    acquire: "Adquirir",
    confirmRemoveTitle: "¿Quitar de la lista de deseos?",
    confirmRemoveDescription: (title) => `"${title}" se quitará de la lista de deseos.`,
    removeSuccess: "Quitado de la lista de deseos.",
    removeFailed: "Error al quitarlo.",
    backLink: "← Volver a la lista de deseos",
    addPageTitle: "Añadir a la lista de deseos",
    addPageSubtitle: "Busca un libro o introdúcelo manualmente.",
    authorLabel: "Autor",
    wishlistDetails: "Detalles del deseo",
    priorityLabel: "Prioridad",
    notesLabel: "Notas (opcional)",
    notesPlaceholder: "Por qué lo quieres, edición preferida...",
    addSuccess: "Añadido a la lista de deseos.",
  },
  locations: {
    title: "Estanterías",
    description: (rooms, bookcases, books) =>
      `${rooms} habitaciones · ${bookcases} estanterías · ${books} libros`,
    booksCount: (n) => `${n} libro${n === 1 ? "" : "s"}`,
    viewMap: "Ver mapa",
    sectionLabel: (n) => `Sección ${n}`,
    shelfLabel: (n) => `Balda ${n}`,
    addRoom: "Añadir habitación",
    editRoom: "Editar habitación",
    deleteRoomConfirm: "La habitación y todo su contenido (estanterías, secciones, baldas) se eliminarán. Los libros permanecerán en la biblioteca sin ubicación.",
    addBookcase: "Añadir estantería",
    editBookcase: "Editar estantería",
    deleteBookcaseConfirm: "La estantería y su contenido (secciones, baldas) se eliminarán. Los libros permanecerán en la biblioteca sin ubicación.",
    addSection: "Añadir sección",
    editSection: "Renombrar sección",
    deleteSectionConfirm: "La sección y sus baldas se eliminarán.",
    addShelf: "Añadir balda",
    editShelf: "Editar balda",
    deleteShelfConfirm: "La balda se eliminará.",
    nameLabel: "Nombre",
    labelLabel: "Etiqueta (opcional)",
    notesLabel: "Notas (opcional)",
    emptyTitle: "Todavía no hay habitaciones",
    viewBooksLink: "Mostrar libros aquí",
    booksWarning: (n) => (n === 0 ? "" : ` ${n} libro${n === 1 ? "" : "s"} aquí dentro perderán su ubicación.`),
    sectionCountLabel: "Número de secciones",
    shelfCountLabel: "Número de baldas",
  },
  bookcaseMap: {
    notFound: "Estantería no encontrada",
    backToLocations: "← Volver a las estanterías",
    legend: "Leyenda:",
    emptyShelf: "Balda vacía",
    sectionLabel: (n) => `Sección ${n}`,
    shelfLabel: (n) => `Balda ${n}`,
    scanLink: "Escanear",
    auditLink: "Verificar",
  },
  stats: {
    title: "Estadísticas",
    description: "Resumen de la biblioteca familiar",
    totalBooks: "Total de libros",
    registeredReads: "Lecturas registradas",
    distinctGenres: "Géneros distintos",
    familyMembers: "Miembros de la familia",
    booksRead: "Libros leídos",
    booksOwned: "Libros en propiedad",
    favoriteGenreLabel: "Género favorito",
    genreDistribution: "Distribución por género",
    genreCount: (n, pct) => `${n} libro${n === 1 ? "" : "s"} · ${pct}%`,
    topAuthors: "Autores más presentes en la biblioteca",
    authorCount: (n) => `${n} libro${n === 1 ? "" : "s"}`,
    byRoom: "Distribución por habitación",
    roomCount: (n, pct) => `${n} libro${n === 1 ? "" : "s"} · ${pct}%`,
    viewRead: "Ver leídos →",
    viewOwned: "Ver en propiedad →",
    bookListTitleUnread: "Libros no leídos por nadie",
    bookListTitleRead: (name) => `Libros leídos por ${name}`,
    bookListTitleOwned: (name) => `Libros en propiedad de ${name}`,
    backToStats: "← Volver a estadísticas",
    noMatches: "Ningún libro coincide",
    memberModal: {
      totalReads: "lecturas totales",
      recentlyRead: "Leídos recientemente",
      topAuthorsReadSection: "Autores más leídos",
      topAuthorsOwnedSection: "Autores más poseídos",
      noReads: "Ninguna lectura registrada.",
      viewAll: "Ver todos los libros leídos",
      goalsSection: "Objetivo anual",
      goalBooksLabel: "Libros leídos",
      currentlyReadingSection: "Leyendo ahora",
      readingHistogramSection: "Lecturas a lo largo del tiempo",
      readingHistogramNoReads: "Ninguna lectura este año.",
      genreSection: "Géneros favoritos",
    },
  },
  memberProfile: {
    title: "Perfil del miembro",
    notFound: "Miembro no encontrado.",
    memberSince: "Miembro desde",
    changeAvatarHint: "El avatar se genera automáticamente a partir del nombre en esta demo.",
  },
  badge: {
    read: "Leído",
    reading: "Leyendo",
    toRead: "Por leer",
    info: "Info",
    danger: "Atención",
  },
  legal: {
    common: { draftNotice: (version) => `⚠ Borrador — pendiente de revisión legal. Versión ${version}.` },
    privacy: {
      pageTitle: "Política de Privacidad",
      s1: {
        heading: "1. Responsable del tratamiento",
        before:
          "El responsable del tratamiento es Carmelo La Gamba, con sede en Italia. Dado que el responsable está establecido en la UE, no es necesario nombrar un representante en la UE conforme al Art. 27 del RGPD. Contacto:",
      },
      s2: {
        heading: "2. Qué recopilamos",
        items: [
          "Datos de la cuenta: correo electrónico, nombre completo, contraseña (con hash, nunca almacenada en texto plano).",
          "Datos de la biblioteca: habitaciones, estanterías, libros, préstamos (incluido el nombre de quien recibe el préstamo si lo registras), valoraciones, reseñas, historial de lecturas, notas.",
          "Historial opcional de sugerencias de IA (solicitudes de etiquetas/incipit/recomendaciones), solo si esta instalación tiene las funciones de IA habilitadas.",
          "Datos técnicos necesarios para mantener tu sesión iniciada: un token de acceso JWT y un token de actualización.",
        ],
      },
      s3: {
        heading: "3. Por qué los tratamos y base jurídica",
        body: "Para prestarte el servicio de gestión de biblioteca que has solicitado (ejecución del contrato, Art. 6(1)(b) del RGPD), y para mantener el servicio seguro (interés legítimo, Art. 6(1)(f)).",
      },
      s4: {
        heading: "4. Dónde se almacenan tus datos",
        body: "Las instalaciones autoalojadas conservan todos los datos en el servidor donde las despliegas. Para nuestra instalación alojada (Pro/SaaS), los datos de tu cuenta y biblioteca se almacenan con un proveedor de base de datos gestionada ubicado en la UE/EEE (el proveedor específico y la región exacta se indicarán aquí una vez definidos).",
      },
      s5: {
        heading: "5. Quién más trata tus datos",
        intro: "Dependiendo de la configuración de esta instalación:",
        items: [
          "Un proveedor de base de datos gestionada (con sede en la UE/EEE, ver §4).",
          "Un proveedor de alojamiento para la aplicación web.",
        ],
        aiItem:
          "Solo si las funciones de IA están habilitadas: tus solicitudes para generar etiquetas, presentaciones de libros o recomendaciones se envían a OpenRouter, Inc. (San Francisco, EE. UU.), que dirige la solicitud a un modelo de lenguaje Qwen. A diferencia del resto de nuestra infraestructura, este procesador se encuentra intencionadamente fuera de la UE/EEE. Esta transferencia se basa actualmente en los términos de servicio estándar de OpenRouter; se está evaluando una garantía formal conforme al Art. 46 del RGPD (Cláusulas Contractuales Tipo) antes de ofrecer esta función más ampliamente a los usuarios de la UE. OpenRouter puede a su vez dirigir el procesamiento a través de sus propios subencargados de alojamiento de modelos; hay una lista actualizada disponible en el sitio web de OpenRouter. Las funciones de IA pueden desactivarse a nivel de instalación (están desactivadas salvo configuración explícita).",
      },
      s6: {
        heading: "6. Cuánto tiempo los conservamos",
        intro: "Conservamos tus datos mientras exista tu cuenta. En concreto:",
        items: [
          "Registros de exmiembros eliminados (nombre y correo, conservados para poder restaurar a un exmiembro desde una copia de seguridad): eliminados en un plazo de 12 meses desde la eliminación.",
          "Historial de sugerencias de IA: eliminado en un plazo de 12 meses desde su generación.",
          "Historial de préstamos de libros (incluido cualquier nombre de prestatario que hayas registrado): se conserva mientras exista tu cuenta — forma parte del propio historial de tu biblioteca, no de una cuenta separada con su propio plazo de conservación. Solo se elimina si eliminas tu cuenta.",
          "Cuentas inactivas: por ahora no hay eliminación automática — puedes eliminar tu cuenta en cualquier momento desde Ajustes.",
        ],
      },
      s7: {
        heading: "7. Cookies y almacenamiento local",
        body: "No utilizamos cookies de seguimiento ni publicitarias. La aplicación guarda una pequeña cantidad de datos en el almacenamiento local de tu navegador únicamente para que funcione: tu sesión de acceso y tus preferencias de tema/idioma. Se trata de datos estrictamente funcionales que, conforme a la Directiva ePrivacy, no requieren consentimiento — pero te lo comunicamos de todos modos.",
      },
      s8: {
        heading: "8. Tus derechos",
        items: [
          "Acceder y descargar una copia de tus datos — Ajustes → Datos de la biblioteca → Descargar copia de seguridad completa.",
          "Corregir datos inexactos — edítalos directamente en la aplicación.",
          "Eliminar tu cuenta y todos los datos asociados — Ajustes → Privacidad → Eliminar cuenta.",
          "Contactarnos para cualquier otra solicitud o reclamación — ver más abajo.",
          "Presentar una reclamación ante tu autoridad de protección de datos.",
        ],
      },
      s9: { heading: "9. Contacto" },
    },
    terms: {
      pageTitle: "Términos del Servicio",
      s1: {
        heading: "1. Quién gestiona este servicio",
        before: "Este servicio está gestionado por Carmelo La Gamba, con sede en Italia. Contacto:",
      },
      s2: {
        heading: "2. Quién puede usarlo",
        body: "El administrador que registra una biblioteca debe ser mayor de edad, y es responsable de la cuenta y de todo lo que se introduzca en ella. Se permiten perfiles de miembro para menores: si añades a un menor como miembro (por ejemplo, para hacer seguimiento de sus lecturas), tú, como adulto que realiza el registro, eres su padre/madre/tutor o de cualquier otro modo responsable de él, das tu consentimiento en su nombre para que se traten los datos de ese miembro según se describe en la Política de Privacidad, y eres responsable de eliminar sus datos si así se solicita. [Si esto activa los requisitos de consentimiento directo del menor del Art. 8 del RGPD, o si en cambio se considera que un padre/madre/tutor gestiona un registro familiar en nombre del menor, está pendiente de confirmación legal.]",
      },
      s3: {
        heading: "3. Tu cuenta",
        body: "Eres responsable de mantener segura tu contraseña. El rol de administrador puede invitar/eliminar miembros, cambiar roles y eliminar permanentemente toda la biblioteca y la cuenta — esta operación es irreversible.",
      },
      s4: {
        heading: "4. Datos que introduces sobre otras personas",
        body: "Si registras el nombre de un prestatario para el préstamo de un libro, estás introduciendo datos personales de alguien que no es un usuario registrado de este servicio. Eres responsable de tener una base jurídica para hacerlo (por ejemplo, es razonable anotar a quién le has prestado un libro) y de eliminarlos si te lo solicita.",
      },
      s5: {
        heading: "5. Funciones de IA opcionales",
        body: "Si esta instalación tiene las funciones de IA habilitadas, las solicitudes de etiquetas/incipit/recomendaciones se envían a OpenRouter, Inc. (un servicio con sede en EE. UU.), que las dirige a un modelo de lenguaje Qwen — esto implica una transferencia de datos fuera de la UE/EEE. Consulta la Política de Privacidad §5 para más detalles. Estas funciones están desactivadas de forma predeterminada y pueden desactivarse a nivel de instalación.",
      },
      s6: {
        heading: "6. Terminación",
        body: "Puedes eliminar tu cuenta en cualquier momento desde Ajustes. Podemos suspender cuentas que abusen del servicio.",
      },
      s7: {
        heading: "7. Responsabilidad",
        body: 'El servicio se proporciona "tal cual", sin garantías más allá de lo exigido por la ley imperativa. En la medida permitida por la ley italiana, no somos responsables de daños indirectos, incidentales o consecuentes, ni de la pérdida de datos que no hayas exportado antes de eliminar tu cuenta. Nada de lo aquí previsto excluye la responsabilidad que no pueda excluirse conforme a normas imperativas (por ejemplo, dolo, negligencia grave o derechos irrenunciables de los consumidores). [Un posible límite máximo de responsabilidad económica está pendiente de revisión legal.]',
      },
      s8: {
        heading: "8. Ley aplicable",
        body: "Estos términos se rigen por la ley italiana. Si eres un consumidor residente en la UE, también pueden aplicarse las normas imperativas de protección al consumidor de tu país de residencia y — conforme al Código de Consumo italiano, Art. 33 — el tribunal de tu lugar de residencia es competente para cualquier controversia. Para controversias no cubiertas por la protección imperativa del consumidor, [tribunal/jurisdicción competente pendiente de confirmación].",
      },
    },
  },
  kids: {
    navLabel: "Kids",
    myReadingNavLabel: "Mi lectura",
    parentTitle: "Kids Mode",
    parentDescription: "Sesiones de lectura, cuestionarios, diario y retos familiares — pensados para formar lectores, no para competir.",
    childTitle: "Mi lectura",
    childDescription: "Lo que estás leyendo, tu diario y tus cuestionarios.",
    independentOfAiNote: "Kids Mode funciona incluso sin el módulo de IA — abajo solo las funciones principales.",
    sessionsTitle: "Sesiones de lectura",
    sessionsEmpty: "Todavía no hay sesiones registradas.",
    loggedByParent: "leído junto a un adulto",
    loggedByChild: "leído por ti",
    quizTitle: "Cuestionario de comprensión",
    quizResult: (score: number, total: number) => `Respondiste correctamente ${score} de ${total} preguntas`,
    quizEmpty: "Todavía no hay cuestionario para este libro.",
    journalTitle: "Diario de lectura",
    journalEmpty: "Todavía no hay entradas en el diario.",
    pathTitle: "Ruta de lectura",
    pathBadge: (name: string) => `Recompensa: ${name}`,
    pathProgress: (done: number, total: number) => `${done} de ${total} libros leídos`,
    challengeTitle: "Reto familiar",
    challengeProgress: (done: number, goal: number) => `${done} / ${goal} minutos juntos`,
    challengeNote: "Un único objetivo compartido, sin clasificación entre hermanos — ni siquiera en los datos.",
    philosophyLink: "Por qué está hecho así →",
    journalText: {
      je1: "¡El zorro es mi parte favorita!",
      je2: "Harry descubre que es un mago y recibe su carta de Hogwarts. Si fuera yo, también habría elegido Gryffindor, como él.",
    },
    pathText: {
      rp1: { title: "Mundos fantásticos", badgeName: "Explorador de mundos" },
    },
    challengeText: {
      fc1: "1000 minutos juntos este verano",
    },
  },
  bookClub: {
    navLabel: "Club",
    title: "Club de lectura",
    subtitle: "Elegid un libro, leedlo juntos y comentadlo",
    startCycleButton: "Iniciar un ciclo de lectura",
    startCycleHelp: "Un ciclo es una lectura compartida: elige un libro del catálogo, los miembros lo leen en el mismo periodo y lo comentan. Incluido gratis, incluso en Community.",
    currentReadLabel: "Leyendo ahora",
    activeLabel: "En curso",
    alsoActiveLabel: "Otros ciclos en curso",
    historyLabel: "Historial",
    historyHint: "Ciclos terminados: abre uno para revisar su debate, participantes y valoración.",
    emptyTitle: "Aún no hay ciclos de lectura",
    emptyDescription: "Inicia un ciclo para leer un libro junto a los demás miembros.",
    participantsCount: (n) => `${n} participantes`,
    proposalsLink: "Propuestas",
    cycleTitleLabel: "Título del ciclo",
    pickBookLabel: "Elige un libro",
    searchPlaceholder: "Busca en tus libros",
    createSuccess: "Ciclo iniciado",
    statusReading: "En lectura",
    statusDiscussing: "En debate",
    statusArchived: "Archivado",
    moveToDiscussionButton: "Pasar al debate",
    undoMoveToDiscussionButton: "Deshacer, volver a la lectura",
    archiveButton: "Archivar",
    reopenButton: "Reabrir el ciclo",
    archivedNotice: "Ciclo terminado y archivado. Solo lectura.",
    archivedReopenHint: "¿Lo cerraste por error? Puedes reabrirlo.",
    backLink: "Club de lectura",
    participantsTitle: "Participantes",
    noParticipants: "Aún no hay participantes",
    joinButton: "Unirse",
    markFinishedButton: "Marcar como terminado",
    finishedLabel: "Terminado",
    aiPromptsTitle: "Preguntas para debatir",
    showPromptsButton: "Mostrar preguntas",
    promptsLoading: "Generando…",
    noPrompts: "No hay preguntas disponibles",
    meetingsTitle: "Encuentros",
    noMeetings: "Ningún encuentro programado",
    meetingWhenLabel: "Fecha y hora",
    meetingNoteLabel: "Lugar o enlace",
    meetingNotePlaceholder: "Biblioteca, sala 2 o enlace de vídeo",
    scheduleButton: "Programar",
    discussionTitle: "Debate",
    discussionLocked: "El debate se abre cuando el ciclo pasa al debate.",
    discussionLockedArchived: "Ciclo archivado: el debate está cerrado. Reabre el ciclo para seguir escribiendo.",
    writePlaceholder: "Escribe un comentario",
    spoilerLabel: "Contiene spoilers",
    spoilerBadge: "Spoiler",
    revealSpoilerButton: "Mostrar spoiler",
    postButton: "Publicar",
    noPosts: "Aún no hay comentarios",
    ratingLabel: (avg, total) => `★ ${avg} (${total})`,
    proposalsTitle: "Propuestas",
    proposalsSubtitle: "Propón y vota el próximo libro",
    proposeBookButton: "Proponer un libro",
    proposalNoteLabel: "Nota (opcional)",
    proposalNotePlaceholder: "Por qué lo propones",
    noProposals: "Sin propuestas",
    noProposalsDescription: "Propón un libro para votar en el próximo ciclo.",
    promoteButton: "Promover",
    promoteSuccess: "Ciclo iniciado desde la propuesta",
    aiPromptTemplates: [
      "¿Qué os sorprendió más al leer «{title}»?",
      "¿Hay algún personaje de «{title}» en el que os hayáis reconocido? ¿Por qué?",
      "Si pudierais cambiar el final de «{title}», ¿cómo lo reescribiríais?",
      "¿Qué escena de «{title}» os dejó más huella, y por qué?",
      "¿Recomendaríais «{title}» a un amigo? ¿A quién en concreto?",
    ],
  },
};

export const fr: Translations = {
  locale: "fr-FR",
  nav: {
    home: "Accueil",
    books: "Livres",
    loans: "Prêts en cours",
    wishlist: "Liste de souhaits",
    locations: "Bibliothèques",
    stats: "Statistiques",
    bookDetail: "Détail du livre",
    users: "Utilisateurs",
    kids: "Kids",
    kidsMyReading: "Ma lecture",
    bookClub: "Club",
    settings: "Paramètres",
  },
  common: {
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    add: "Ajouter",
    back: "← Retour",
    confirm: "Confirmer",
    logout: "Se déconnecter",
    email: "E-mail",
    password: "Mot de passe",
    familyName: "Nom de la famille",
    fullName: "Nom complet",
    name: "Nom",
    description: "Description",
    you: "toi",
    appName: "Jinbocho",
    appSubtitle: "Votre bibliothèque familiale",
    menu: "Menu",
    closeMenu: "Fermer le menu",
    pageNotFound: "Page introuvable",
    pageNotFoundDesc: "La page que vous cherchez n'existe pas ou a été déplacée.",
    goHome: "Retour à l'accueil",
  },
  validation: {
    invalidEmail: "Adresse e-mail invalide",
    passwordRequired: "Le mot de passe est obligatoire",
    minChars8: "8 caractères minimum",
    familyNameRequired: "Le nom de la famille est obligatoire",
    titleRequired: "Le titre est obligatoire",
    passwordsMismatch: "Les mots de passe ne correspondent pas",
    required: "Ce champ est obligatoire",
  },
  auth: {
    loginTitle: "Connexion",
    loginSubtitle: "Votre bibliothèque familiale",
    loginButton: "Se connecter",
    demoHintTitle: "Identifiants de démonstration",
    demoHintBody: "carmelo@jinbocho.app (admin) · sara@jinbocho.app (éditeur) · luca@jinbocho.app (lecteur) — n'importe quel mot de passe fonctionne.",
    forgotPasswordLink: "Mot de passe oublié ?",
    registerLink: "Créer une famille →",
    invalidCredentials: "Identifiants invalides",
    inactiveAccount: "Compte désactivé",
    genericError: "Une erreur est survenue, veuillez réessayer",
    registerTitle: "Créez votre famille",
    registerSubtitle: "Démarrez votre bibliothèque",
    registerButton: "Créer la famille",
    registerWipeHint: "Dans cette démo, l'inscription réinitialise les données simulées et repart d'une bibliothèque vide.",
    haveAccountLink: "Vous avez déjà un compte ? Connectez-vous",
    forgotTitle: "Mot de passe oublié",
    forgotSubtitle: "Nous vous enverrons un lien de réinitialisation",
    forgotButton: "Envoyer le lien",
    forgotSuccess: "Si cet e-mail existe, vous recevrez un lien de réinitialisation. (Démo : aucun e-mail n'est réellement envoyé)",
    backToLoginLink: "← Retour à la connexion",
    resetTitle: "Réinitialiser le mot de passe",
    resetSubtitle: "Choisissez un nouveau mot de passe",
    newPasswordLabel: "Nouveau mot de passe",
    confirmPasswordLabel: "Confirmer le mot de passe",
    resetButton: "Réinitialiser le mot de passe",
    resetSuccess: "Mot de passe réinitialisé avec succès.",
    goToLoginButton: "Aller à la connexion",
  },
  enums: {
    role: { admin: "Admin", editor: "Éditeur", viewer: "Lecteur", child: "Enfant" },
    readingStatus: { to_read: "À lire", reading: "En cours", read: "Lu" },
    genre: {
      fiction: "Fiction", fantasy: "Fantasy", science_fiction: "Science-fiction", mystery_thriller: "Policier/Thriller",
      romance: "Romance", horror: "Horreur", historical: "Historique", biography_memoir: "Biographie",
      history: "Histoire", science: "Science", philosophy: "Philosophie", religion: "Religion",
      self_help: "Développement personnel", business: "Business", art: "Art", poetry: "Poésie",
      drama: "Théâtre", comics: "BD", children: "Jeunesse", young_adult: "Young Adult",
      travel: "Voyage", cooking: "Cuisine", essay: "Essai", reference: "Référence", other: "Autre",
    },
    condition: { new: "Neuf", good: "Bon", fair: "Correct", poor: "Usé" },
    source: { purchased: "Acheté", gift: "Cadeau", borrowed: "Emprunté", other: "Autre" },
  },
  placement: {
    room: "Pièce",
    bookcase: "Bibliothèque",
    section: "Section",
    shelf: "Étagère",
    selectPlaceholder: "— Sélectionner —",
  },
  pagination: {
    prev: "← Précédent",
    next: "Suivant →",
    page: (n) => `Page ${n}`,
  },
  export: {
    button: "Exporter",
    csv: "CSV",
    json: "JSON",
  },
  filters: {
    ownerLabel: "Propriétaire",
    allOwners: "Tous les propriétaires",
    genreLabel: "Genre",
    allGenres: "Tous les genres",
  },
  users: {
    title: "Utilisateurs",
    description: (n) => `${n} membre${n === 1 ? "" : "s"} de la famille`,
    inviteButton: "Inviter un utilisateur",
    createTitle: "Inviter un utilisateur",
    editTitle: "Modifier l'utilisateur",
    roleLabel: "Rôle",
    activeLabel: "Actif",
    inactiveBadge: "Désactivé",
    inviteHint: "Dans cette démo, l'utilisateur est créé immédiatement, sans envoi d'e-mail.",
    cannotEditSelf: "Vous ne pouvez pas modifier votre propre rôle ou statut",
    deleteConfirmTitle: "Supprimer l'utilisateur ?",
    deleteConfirmMessage: (name) => `${name} sera retiré de la famille.`,
  },
  settings: {
    title: "Paramètres",
    familyTitle: "Famille",
    familyAdminOnly: "Seuls les administrateurs peuvent modifier ces données",
    profileTitle: "Profil",
    annualGoalLabel: "Objectif de lecture annuel",
    annualGoalHint: "Nombre de livres que vous souhaitez lire cette année",
    appearanceTitle: "Apparence",
    themeLabel: "Thème",
    modeLabel: "Mode",
    modeLight: "☀️ Clair",
    modeDark: "🌙 Sombre",
    modeSystem: "💻 Système",
    languageTitle: "Langue",
    backupTitle: "Sauvegarde et export",
    exportLibraryLabel: "Exporter les livres (CSV/JSON)",
    fullBackupLabel: "Sauvegarde complète",
    exportBackupButton: "Exporter la sauvegarde complète",
    importBackupButton: "Importer une sauvegarde",
    importConfirmTitle: "Importer la sauvegarde ?",
    importConfirmMessage: (counts) => `Cette sauvegarde contient : ${counts}.`,
    importWarning: "Les données seront remplacées par celles de la sauvegarde importée pour cette session de démo.",
    importSuccess: "Sauvegarde importée avec succès",
    importError: "Fichier de sauvegarde invalide",
    signOutTitle: "Déconnexion",
    signOutButton: "Se déconnecter de votre compte",
    dangerZoneTitle: "Zone de danger",
    deleteAccountButton: "Supprimer la famille",
    deleteAccountWarning: "Cette action supprime la famille, tous les utilisateurs et la bibliothèque. Dans cette démo, vous pouvez toujours recharger la page pour restaurer les données d'origine.",
    deleteAccountConfirmFamilyName: "Tapez le nom de la famille pour confirmer",
    deleteAccountConfirmPassword: "Mot de passe",
    deleteAccountConfirmButton: "Supprimer définitivement",
    deleteAccountMismatch: "Le nom de la famille ne correspond pas",
    themeNames: { pergamena: "Pergamena", akabeni: "Akabeni", sumi: "Sumi" },
    goodreadsImportTitle: "Importer depuis Goodreads",
    goodreadsImportButton: "Importer un CSV Goodreads",
    goodreads: {
      reviewTitle: "Vérifiez les livres à importer",
      reviewCount: (total, selected) => `${selected} sur ${total} lignes sélectionnées`,
      confirmButton: (count) => `Importer ${count} livre${count === 1 ? "" : "s"}`,
      statusNew: "Nouveau",
      statusAlreadyOwned: "Déjà dans la bibliothèque",
      confirmed: (created) => `${created} livre${created === 1 ? "" : "s"} importé${created === 1 ? "" : "s"}.`,
      nothingSelected: "Sélectionnez au moins une ligne.",
      emptyFile: "Aucune ligne trouvée dans le fichier.",
    },
  },
  sidebar: { subtitle: "Bibliothèque familiale" },
  banner: {
    text: "⚠️ Démo interactive — toutes les données sont simulées.",
    link: "Découvrez le vrai projet sur GitHub →",
  },
  dashboard: {
    description: "Un aperçu de votre bibliothèque familiale.",
    statTotal: "Total des livres",
    statRead: "Lus",
    statReading: "En cours",
    statToRead: "À lire",
    currentlyReading: "En cours de lecture",
    noCurrentlyReading: "Aucun livre en cours de lecture",
    untitled: "Sans titre",
    onLoan: "Prêté",
    seeAll: "Voir tout →",
    allBooksHome: "Tous les livres sont à la maison",
    overdue: "En retard",
    due: "Échéance",
    recentlyAdded: "Ajoutés récemment",
    noRecentlyAdded: "Aucun livre pour l'instant",
    nextRead: "Que lire ensuite ?",
    another: "🎲 Un autre",
    noNextRead: "Aucun livre dans la liste à lire",
    unreadTitle: "Non lus par personne",
    unreadDesc: (n) => `livre${n === 1 ? "" : "s"} qu'aucun membre n'a encore lu`,
    familyFavorites: "Coups de cœur de la famille",
    noFamilyFavorites: "Aucun livre lu par plus d'un membre",
    members: (n) => `${n} membre${n === 1 ? "" : "s"}`,
    readingGoal: (year) => `Objectif de lecture ${year}`,
    activityTitle: "Activité familiale",
    activityVerb: "a lu",
    aiPickTitle: "Suggestions pour vous",
    aiPickBadge: "IA",
    aiPickPrompt: "Demandez à l'IA quelques suggestions de lecture personnalisées selon vos goûts.",
    aiPickAskButton: "Demander des suggestions",
    aiPickLoading: "Analyse de vos goûts en cours...",
    aiPickEmpty: "Aucune suggestion disponible pour le moment.",
    aiPickLike: "J'aime",
    aiPickDislike: "Pas pour moi",
    aiPickFeedbackSaved: "Avis enregistré, merci !",
  },
  catalog: {
    booksInLibrary: (n) => `${n} livre${n === 1 ? "" : "s"} dans la bibliothèque`,
    searchLabel: "Rechercher par titre ou auteur",
    searchPlaceholder: "ex. Hugo, 1984...",
    roomLabel: "Pièce",
    allRooms: "Toutes les pièces",
    statusAll: "Tous",
    statusToRead: "À lire",
    statusReading: "En cours",
    statusRead: "Lus",
    results: (n) => `${n} résultat${n === 1 ? "" : "s"}`,
    resultsFor: "pour",
    noResults: "Aucun livre trouvé",
    noResultsHint: "Essayez de modifier les filtres de recherche",
    removeFilters: "Effacer les filtres",
    filtersToggle: "Filtres",
    locationFilterActive: (name) => `Livres affichés dans : ${name}`,
    clearLocationFilter: "Effacer le filtre de position",
  },
  books: {
    duplicateTitle: "Doublon possible",
    duplicateIsbnReason: "Une fiche avec le même ISBN existe déjà :",
    duplicateTitleReason: "Une fiche avec le même titre et auteur existe déjà :",
    duplicateConfirm: "Ajouter quand même",
    add: {
      pageTitle: "Ajouter un livre",
      typeTab: "Saisir l'ISBN",
      scanTab: "Scanner",
      searchTab: "Rechercher par titre/auteur",
      isbnLabel: "ISBN",
      lookupButton: "Rechercher",
      notFoundMessage: "ISBN introuvable dans cette démo. Saisissez les informations manuellement.",
      manualEntryButton: "Saisir manuellement",
      simulateScanButton: "📷 Simuler un scan",
      searchTitleLabel: "Titre",
      searchTitlePlaceholder: "ex. Le Nom de la rose",
      searchAuthorLabel: "Auteur",
      searchAuthorPlaceholder: "ex. Umberto Eco",
      searchButton: "Rechercher",
      searchMissingQuery: "Saisissez au moins un titre ou un auteur",
      searchNoResults: "Aucun résultat pour cette recherche",
      searchResultsHint: "Sélectionnez un résultat pour préremplir la fiche",
      searchSelect: "Sélectionner",
      formTitle: "Informations du livre",
      titleLabel: "Titre",
      authorLabel: "Auteur",
      isbnFieldLabel: "ISBN",
      publisherLabel: "Éditeur",
      yearLabel: "Année",
      genreLabel: "Genre",
      placementTitle: "Emplacement",
      readingStatusLabel: "Statut de lecture",
      ownerLabel: "Propriétaire",
      noOwner: "Aucun",
      submitButton: "Ajouter à la bibliothèque",
      successToast: "Livre ajouté à la bibliothèque",
    },
    shelfAdd: {
      pageTitle: "Ajouter plusieurs livres à une étagère",
      setupHint: "Choisissez l'emplacement et (facultativement) le propriétaire : ils resteront fixes pour tous les livres de cette session.",
      startButton: "Commencer",
      changePositionButton: "Changer d'emplacement",
      doneButton: "Terminer",
      countLabel: (n) => `${n} livre${n === 1 ? "" : "s"} ajouté${n === 1 ? "" : "s"}`,
      addButton: "Ajouter",
      editButton: "Modifier",
      skipButton: "Passer",
      undoButton: "Annuler",
      sessionTitle: "Livres ajoutés lors de cette session",
      noSessionBooks: "Aucun livre ajouté pour l'instant",
    },
    shelfScan: {
      pageTitle: "Scan d'étagère",
      subtitle: "Photographiez une étagère pour cataloguer plusieurs livres à la fois.",
      selectShelf: "Sélectionnez l'étagère",
      simulateCaptureButton: "Simuler un scan photo",
      reading: "Analyse de l'image en cours...",
      reviewSubtitle: "Vérifiez les livres reconnus avant de confirmer.",
      retakeLink: "← Refaire le scan",
      reviewCount: (total, selected) => `${selected} livre(s) sélectionné(s) sur ${total}`,
      confirmButton: (count) => `Ajouter ${count} livre${count === 1 ? "" : "s"}`,
      statusMatched: "Reconnu",
      statusUncertain: "À vérifier",
      confirmed: (created) => `${created} livre${created === 1 ? "" : "s"} ajouté${created === 1 ? "" : "s"} à la bibliothèque.`,
      nothingSelected: "Sélectionnez au moins un livre.",
      setupHint: "Sélectionnez une étagère pour démarrer le scan simulé.",
    },
    shelfAudit: {
      pageTitle: "Vérification d'étagère",
      subtitle: "Photographiez une étagère pour la comparer au catalogue.",
      selectShelf: "Sélectionnez l'étagère",
      simulateCaptureButton: "Simuler une vérification photo",
      reading: "Comparaison avec le catalogue en cours...",
      retakeLink: "← Refaire la vérification",
      allMatch: "Tout correspond ! Aucune anomalie trouvée.",
      presentCount: (n) => `${n} livre${n === 1 ? "" : "s"} présent${n === 1 ? "" : "s"} sur l'étagère.`,
      missingTitle: (n) => `${n} livre${n === 1 ? "" : "s"} manquant${n === 1 ? "" : "s"}`,
      missingHint: "Ces livres sont catalogués ici mais n'ont pas été détectés sur la photo.",
      viewBook: "Voir le livre",
      unexpectedTitle: (n) => `${n} livre${n === 1 ? "" : "s"} non catalogué${n === 1 ? "" : "s"}`,
      unexpectedHint: "Ces livres sont sur l'étagère mais ne sont pas catalogués ici.",
      addHere: "Ajouter ici",
      addedUnexpected: (title) => `« ${title} » ajouté à la bibliothèque.`,
      setupHint: "Sélectionnez une étagère pour démarrer la vérification simulée.",
    },
  },
  bookDetail: {
    notFound: "Livre introuvable",
    recordNotFound: "Fiche bibliographique introuvable",
    backToCatalog: "← Retour au catalogue",
    fieldYear: "Année",
    fieldPublisher: "Éditeur",
    fieldIsbn: "ISBN",
    fieldGenre: "Genre",
    fieldPurchased: "Acheté",
    position: "Emplacement",
    sectionLabel: (n) => `Section ${n}`,
    shelfLabel: (n) => `Étagère ${n}`,
    posLabel: "Pos.",
    owner: "Propriétaire",
    readingBy: "Lu actuellement par",
    loanStatus: "En prêt",
    loanedTo: "Prêté à",
    loanedFrom: "depuis",
    dueDate: "Échéance :",
    notes: "Notes",
    readBy: (n) => `Lu par (${n})`,
    editButton: "Modifier",
    moveButton: "Déplacer",
    deleteButton: "Supprimer",
    deleteConfirmTitle: "Supprimer le livre ?",
    deleteConfirmMessage: "Cet exemplaire sera retiré de la bibliothèque. Cette action est irréversible dans cette session de démo.",
    editModalTitle: "Modifier le livre",
    editRecordSection: "Fiche bibliographique (partagée)",
    editCopySection: "Cet exemplaire",
    moveModalTitle: "Déplacer le livre",
    conditionLabel: "État",
    sourceLabel: "Provenance",
    tagsLabel: "Étiquettes",
    tagsHint: "Séparées par des virgules",
    suggestTagsButton: "✨ Suggérer des étiquettes avec l'IA",
    suggestingTags: "Génération de suggestions...",
    suggestedTagsHint: "Touchez une étiquette pour l'ajouter",
    whoReadTitle: "Qui l'a lu",
    markRead: "Marquer comme lu",
    markUnread: "Marquer comme non lu",
    lendTitle: "Prêter ce livre",
    borrowerLabel: "Nom de l'emprunteur",
    dueDateLabel: "Échéance (facultatif)",
    lendButton: "Prêter",
    returnButton: "Marquer comme rendu",
    loanHistoryTitle: "Historique des prêts",
    noLoanHistory: "Aucun prêt enregistré",
    presentationTitle: "Présentation",
    presentationEmpty: "Aucune présentation disponible pour ce livre.",
    generateAiButton: "✨ Générer avec l'IA",
    generatingAi: "Génération en cours...",
    editPresentationButton: "Modifier",
    sourceManual: "Manuelle",
    sourceAi: "Générée par IA",
    sourceEditorial: "Éditoriale",
    historyTitle: "Historique",
    noHistory: "Aucun événement enregistré",
    ratings: {
      title: "Avis",
      addReview: "+ Ajouter un avis",
      noRatings: "Pas encore d'avis.",
      noReviews: "Aucun avis disponible.",
      votes: (n) => `${n} avis`,
      ratingLabel: "Note",
      reviewLabel: "Avis (facultatif)",
      reviewPlaceholder: "Écrivez votre avis...",
      cancel: "Annuler",
      save: "Enregistrer l'avis",
      update: "Mettre à jour",
      edit: "Modifier",
      delete: "Supprimer",
      formModalTitle: "Écrire un avis",
      editModalTitle: "Modifier l'avis",
      selectStarError: "Sélectionnez au moins une étoile.",
      updateSuccess: "Avis mis à jour.",
      addSuccess: "Avis ajouté.",
      saveError: "Erreur lors de l'enregistrement de l'avis.",
      deleteSuccess: "Avis supprimé.",
      deleteError: "Erreur lors de la suppression.",
      familyMemberFallback: "Membre de la famille",
    },
  },
  loans: {
    title: "Prêts en cours",
    subtitle: (active, returned) => `${active} actif${active === 1 ? "" : "s"} · ${returned} rendu${returned === 1 ? "" : "s"}`,
    activeLoans: "Prêts actifs",
    noActiveLoans: "Aucun prêt actif",
    colBook: "Livre",
    colLoanedTo: "Prêté à",
    colFrom: "Depuis",
    colDue: "Échéance",
    colStatus: "Statut",
    returnedLoans: "Prêts rendus",
    noReturnedLoans: "Aucun prêt rendu",
    colReturnedOn: "Rendu le",
    statusOnLoan: "En prêt",
    searchPlaceholder: "Rechercher par livre ou nom...",
    filtersToggle: "Filtres",
    filterStatus: "Statut d'échéance",
    statusOverdue: "En retard",
    statusWarning: "Bientôt dû",
    statusNormal: "Dans les temps",
    clearFilters: "Effacer les filtres",
    noSearchResults: "Aucun prêt ne correspond à la recherche",
    overdueBadge: (n) => `${n} en retard`,
    markReturnedAction: "Marquer comme rendu",
    returnSuccess: "Prêt marqué comme rendu",
  },
  wishlist: {
    title: "Liste de souhaits",
    booksCount: (n) => `${n} livre${n === 1 ? "" : "s"} souhaité${n === 1 ? "" : "s"}`,
    addButton: "+ Ajouter",
    emptyTitle: "Aucun souhait pour l'instant",
    emptyDescription: "Ajoutez les livres que vous aimeriez acquérir pour la bibliothèque.",
    searchPlaceholder: "Rechercher dans la liste de souhaits...",
    filtersToggle: "Filtres",
    filterPriority: "Priorité",
    filterMember: "Membre",
    priorityHigh: "Haute",
    priorityMedium: "Moyenne",
    priorityLow: "Basse",
    priorityNone: "Aucune",
    clearFilters: "Effacer les filtres",
    noSearchResults: "Aucun souhait ne correspond à la recherche",
    wantedBy: "Souhaité par",
    remove: "Retirer",
    acquire: "Acquérir",
    confirmRemoveTitle: "Retirer de la liste de souhaits ?",
    confirmRemoveDescription: (title) => `« ${title} » sera retiré de la liste de souhaits.`,
    removeSuccess: "Retiré de la liste de souhaits.",
    removeFailed: "Erreur lors du retrait.",
    backLink: "← Retour à la liste de souhaits",
    addPageTitle: "Ajouter à la liste de souhaits",
    addPageSubtitle: "Recherchez un livre ou saisissez-le manuellement.",
    authorLabel: "Auteur",
    wishlistDetails: "Détails du souhait",
    priorityLabel: "Priorité",
    notesLabel: "Notes (facultatif)",
    notesPlaceholder: "Pourquoi vous le voulez, édition préférée...",
    addSuccess: "Ajouté à la liste de souhaits.",
  },
  locations: {
    title: "Bibliothèques",
    description: (rooms, bookcases, books) =>
      `${rooms} pièces · ${bookcases} bibliothèques · ${books} livres`,
    booksCount: (n) => `${n} livre${n === 1 ? "" : "s"}`,
    viewMap: "Voir le plan",
    sectionLabel: (n) => `Section ${n}`,
    shelfLabel: (n) => `Étagère ${n}`,
    addRoom: "Ajouter une pièce",
    editRoom: "Modifier la pièce",
    deleteRoomConfirm: "La pièce et tout son contenu (bibliothèques, sections, étagères) seront supprimés. Les livres resteront dans la bibliothèque sans emplacement.",
    addBookcase: "Ajouter une bibliothèque",
    editBookcase: "Modifier la bibliothèque",
    deleteBookcaseConfirm: "La bibliothèque et son contenu (sections, étagères) seront supprimés. Les livres resteront dans la bibliothèque sans emplacement.",
    addSection: "Ajouter une section",
    editSection: "Renommer la section",
    deleteSectionConfirm: "La section et ses étagères seront supprimées.",
    addShelf: "Ajouter une étagère",
    editShelf: "Modifier l'étagère",
    deleteShelfConfirm: "L'étagère sera supprimée.",
    nameLabel: "Nom",
    labelLabel: "Étiquette (facultatif)",
    notesLabel: "Notes (facultatif)",
    emptyTitle: "Aucune pièce pour l'instant",
    viewBooksLink: "Afficher les livres ici",
    booksWarning: (n) => (n === 0 ? "" : ` ${n} livre${n === 1 ? "" : "s"} ici perdront leur emplacement.`),
    sectionCountLabel: "Nombre de sections",
    shelfCountLabel: "Nombre d'étagères",
  },
  bookcaseMap: {
    notFound: "Bibliothèque introuvable",
    backToLocations: "← Retour aux bibliothèques",
    legend: "Légende :",
    emptyShelf: "Étagère vide",
    sectionLabel: (n) => `Section ${n}`,
    shelfLabel: (n) => `Étagère ${n}`,
    scanLink: "Scanner",
    auditLink: "Vérifier",
  },
  stats: {
    title: "Statistiques",
    description: "Aperçu de la bibliothèque familiale",
    totalBooks: "Total des livres",
    registeredReads: "Lectures enregistrées",
    distinctGenres: "Genres distincts",
    familyMembers: "Membres de la famille",
    booksRead: "Livres lus",
    booksOwned: "Livres possédés",
    favoriteGenreLabel: "Genre préféré",
    genreDistribution: "Répartition par genre",
    genreCount: (n, pct) => `${n} livre${n === 1 ? "" : "s"} · ${pct}%`,
    topAuthors: "Auteurs les plus présents dans la bibliothèque",
    authorCount: (n) => `${n} livre${n === 1 ? "" : "s"}`,
    byRoom: "Répartition par pièce",
    roomCount: (n, pct) => `${n} livre${n === 1 ? "" : "s"} · ${pct}%`,
    viewRead: "Voir les lus →",
    viewOwned: "Voir les possédés →",
    bookListTitleUnread: "Livres non lus par personne",
    bookListTitleRead: (name) => `Livres lus par ${name}`,
    bookListTitleOwned: (name) => `Livres possédés par ${name}`,
    backToStats: "← Retour aux statistiques",
    noMatches: "Aucun livre ne correspond",
    memberModal: {
      totalReads: "lectures au total",
      recentlyRead: "Lus récemment",
      topAuthorsReadSection: "Auteurs les plus lus",
      topAuthorsOwnedSection: "Auteurs les plus possédés",
      noReads: "Aucune lecture enregistrée.",
      viewAll: "Voir tous les livres lus",
      goalsSection: "Objectif annuel",
      goalBooksLabel: "Livres lus",
      currentlyReadingSection: "En cours de lecture",
      readingHistogramSection: "Lectures dans le temps",
      readingHistogramNoReads: "Aucune lecture cette année.",
      genreSection: "Genres préférés",
    },
  },
  memberProfile: {
    title: "Profil du membre",
    notFound: "Membre introuvable.",
    memberSince: "Membre depuis",
    changeAvatarHint: "L'avatar est généré automatiquement à partir du nom dans cette démo.",
  },
  badge: {
    read: "Lu",
    reading: "En cours",
    toRead: "À lire",
    info: "Info",
    danger: "Attention",
  },
  legal: {
    common: { draftNotice: (version) => `⚠ Brouillon — en attente de révision juridique. Version ${version}.` },
    privacy: {
      pageTitle: "Politique de confidentialité",
      s1: {
        heading: "1. Responsable du traitement",
        before:
          "Le responsable du traitement est Carmelo La Gamba, basé en Italie. Le responsable étant établi dans l'UE, aucun représentant UE distinct au titre de l'Art. 27 du RGPD n'est requis. Contact :",
      },
      s2: {
        heading: "2. Ce que nous collectons",
        items: [
          "Données de compte : e-mail, nom complet, mot de passe (haché, jamais stocké en clair).",
          "Données de la bibliothèque : pièces, bibliothèques, livres, prêts (y compris le nom de l'emprunteur si vous le renseignez), notes, avis, historique de lecture, notes personnelles.",
          "Historique optionnel des suggestions IA (demandes d'étiquettes/incipit/recommandations), uniquement si cette installation a les fonctions IA activées.",
          "Données techniques nécessaires pour rester connecté : un jeton d'accès JWT et un jeton de rafraîchissement.",
        ],
      },
      s3: {
        heading: "3. Pourquoi nous les traitons et base juridique",
        body: "Pour vous fournir le service de gestion de bibliothèque que vous avez demandé (exécution du contrat, Art. 6(1)(b) du RGPD), et pour garantir la sécurité du service (intérêt légitime, Art. 6(1)(f)).",
      },
      s4: {
        heading: "4. Où vos données sont stockées",
        body: "Les installations autohébergées conservent toutes les données sur le serveur où vous les déployez. Pour notre installation hébergée (Pro/SaaS), les données de votre compte et de votre bibliothèque sont stockées chez un fournisseur de base de données gérée situé dans l'UE/EEE (le fournisseur précis et la région exacte seront indiqués ici une fois définis).",
      },
      s5: {
        heading: "5. Qui d'autre traite vos données",
        intro: "Selon la configuration de cette installation :",
        items: [
          "Un fournisseur de base de données gérée (basé dans l'UE/EEE, voir §4).",
          "Un fournisseur d'hébergement pour l'application web.",
        ],
        aiItem:
          "Uniquement si les fonctions IA sont activées : vos demandes de génération d'étiquettes, de présentations de livres ou de recommandations sont envoyées à OpenRouter, Inc. (San Francisco, États-Unis), qui achemine la demande vers un modèle de langage Qwen. Contrairement au reste de notre infrastructure, ce sous-traitant se trouve intentionnellement en dehors de l'UE/EEE. Ce transfert repose actuellement sur les conditions générales standard d'OpenRouter ; une garantie formelle au titre de l'Art. 46 du RGPD (clauses contractuelles types) est en cours d'évaluation avant que cette fonctionnalité ne soit proposée plus largement aux utilisateurs de l'UE. OpenRouter peut à son tour acheminer le traitement via ses propres sous-traitants d'hébergement de modèles ; une liste à jour est disponible sur le site d'OpenRouter. Les fonctions IA peuvent être désactivées au niveau de l'installation (elles sont désactivées sauf configuration explicite).",
      },
      s6: {
        heading: "6. Combien de temps nous les conservons",
        intro: "Nous conservons vos données tant que votre compte existe. Plus précisément :",
        items: [
          "Enregistrements des anciens membres supprimés (nom et e-mail, conservés pour permettre de restaurer un ancien membre depuis une sauvegarde) : supprimés dans les 12 mois suivant la suppression.",
          "Historique des suggestions IA : supprimé dans les 12 mois suivant sa génération.",
          "Historique des prêts de livres (y compris tout nom d'emprunteur que vous avez enregistré) : conservé tant que votre compte existe — cela fait partie de l'historique propre de votre bibliothèque, pas d'un compte séparé avec son propre délai de conservation. Supprimé uniquement si vous supprimez votre compte.",
          "Comptes inactifs : aucune suppression automatique pour l'instant — vous pouvez supprimer votre compte à tout moment depuis les Paramètres.",
        ],
      },
      s7: {
        heading: "7. Cookies et stockage local",
        body: "Nous n'utilisons pas de cookies de suivi ou publicitaires. L'application stocke une petite quantité de données dans le stockage local de votre navigateur uniquement pour la faire fonctionner : votre session de connexion et vos préférences de thème/langue. Il s'agit de données strictement fonctionnelles qui, au titre de la directive ePrivacy, ne nécessitent pas de consentement — mais nous vous en informons quand même.",
      },
      s8: {
        heading: "8. Vos droits",
        items: [
          "Accéder et télécharger une copie de vos données — Paramètres → Données de la bibliothèque → Télécharger la sauvegarde complète.",
          "Corriger des données inexactes — modifiez-les directement dans l'application.",
          "Supprimer votre compte et toutes les données associées — Paramètres → Confidentialité → Supprimer le compte.",
          "Nous contacter pour toute autre demande ou réclamation — voir ci-dessous.",
          "Déposer une plainte auprès de votre autorité de protection des données.",
        ],
      },
      s9: { heading: "9. Contact" },
    },
    terms: {
      pageTitle: "Conditions d'utilisation",
      s1: {
        heading: "1. Qui gère ce service",
        before: "Ce service est géré par Carmelo La Gamba, basé en Italie. Contact :",
      },
      s2: {
        heading: "2. Qui peut l'utiliser",
        body: "L'administrateur qui enregistre une bibliothèque doit être majeur, et est responsable du compte et de tout ce qui y est saisi. Les profils de membres pour les mineurs sont autorisés : si vous ajoutez un enfant en tant que membre (par exemple pour suivre ses lectures), vous, en tant qu'adulte procédant à l'inscription, êtes son parent/tuteur ou responsable de lui à un autre titre, vous consentez en son nom au traitement des données de ce membre tel que décrit dans la Politique de confidentialité, et vous êtes responsable de la suppression de ses données sur demande. [La question de savoir si cela déclenche les exigences de consentement direct de l'enfant de l'Art. 8 du RGPD, ou si cela est plutôt traité comme un parent/tuteur gérant un dossier familial pour le compte de l'enfant, est en attente de confirmation juridique.]",
      },
      s3: {
        heading: "3. Votre compte",
        body: "Vous êtes responsable de la sécurité de votre mot de passe. Le rôle d'administrateur permet d'inviter/retirer des membres, de changer les rôles et de supprimer définitivement toute la bibliothèque et le compte — cette opération est irréversible.",
      },
      s4: {
        heading: "4. Données que vous saisissez sur d'autres personnes",
        body: "Si vous enregistrez le nom d'un emprunteur pour le prêt d'un livre, vous saisissez des données personnelles concernant une personne qui n'est pas un utilisateur enregistré de ce service. Vous êtes responsable de disposer d'une base juridique pour le faire (par exemple, il est raisonnable de noter à qui vous avez prêté un livre) et de les supprimer si cette personne vous le demande.",
      },
      s5: {
        heading: "5. Fonctions IA optionnelles",
        body: "Si cette installation a les fonctions IA activées, les demandes d'étiquettes/incipit/recommandations sont envoyées à OpenRouter, Inc. (un service basé aux États-Unis), qui les achemine vers un modèle de langage Qwen — cela implique un transfert de données en dehors de l'UE/EEE. Voir la Politique de confidentialité §5 pour plus de détails. Ces fonctions sont désactivées par défaut et peuvent être désactivées au niveau de l'installation.",
      },
      s6: {
        heading: "6. Résiliation",
        body: "Vous pouvez supprimer votre compte à tout moment depuis les Paramètres. Nous pouvons suspendre les comptes qui abusent du service.",
      },
      s7: {
        heading: "7. Responsabilité",
        body: "Le service est fourni \"tel quel\", sans garanties au-delà de ce qu'exige la loi impérative. Dans la mesure permise par le droit italien, nous ne sommes pas responsables des dommages indirects, accessoires ou consécutifs, ni de la perte de données que vous n'avez pas exportées avant de supprimer votre compte. Rien dans les présentes n'exclut la responsabilité qui ne peut être exclue en vertu de règles impératives (par exemple, faute intentionnelle, négligence grave ou droits impératifs des consommateurs). [Un éventuel plafond de responsabilité financière est en attente de révision juridique.]",
      },
      s8: {
        heading: "8. Droit applicable",
        body: "Ces conditions sont régies par le droit italien. Si vous êtes un consommateur résidant dans l'UE, les règles impératives de protection des consommateurs de votre propre pays de résidence peuvent également s'appliquer, et — conformément au Code de la consommation italien, Art. 33 — le tribunal de votre lieu de résidence est compétent pour tout litige. Pour les litiges non couverts par la protection impérative des consommateurs, [tribunal/juridiction compétent en attente de confirmation].",
      },
    },
  },
  kids: {
    navLabel: "Kids",
    myReadingNavLabel: "Ma lecture",
    parentTitle: "Kids Mode",
    parentDescription: "Sessions de lecture, quiz, journal et défis familiaux — conçus pour faire grandir des lecteurs, pas pour les mettre en compétition.",
    childTitle: "Ma lecture",
    childDescription: "Ce que tu lis, ton journal et tes quiz.",
    independentOfAiNote: "Kids Mode fonctionne même sans le module IA — seules les fonctionnalités principales sont affichées ci-dessous.",
    sessionsTitle: "Sessions de lecture",
    sessionsEmpty: "Aucune session enregistrée pour l'instant.",
    loggedByParent: "lu avec un parent",
    loggedByChild: "lu par toi",
    quizTitle: "Quiz de compréhension",
    quizResult: (score: number, total: number) => `Tu as répondu correctement à ${score} questions sur ${total}`,
    quizEmpty: "Pas encore de quiz pour ce livre.",
    journalTitle: "Journal de lecture",
    journalEmpty: "Pas encore d'entrée dans le journal.",
    pathTitle: "Parcours de lecture",
    pathBadge: (name: string) => `Récompense : ${name}`,
    pathProgress: (done: number, total: number) => `${done} livres lus sur ${total}`,
    challengeTitle: "Défi familial",
    challengeProgress: (done: number, goal: number) => `${done} / ${goal} minutes ensemble`,
    challengeNote: "Un seul objectif partagé, aucun classement entre frères et sœurs — même pas dans les données.",
    philosophyLink: "Pourquoi c'est conçu ainsi →",
    journalText: {
      je1: "Le renard est ma partie préférée !",
      je2: "Harry découvre qu'il est un sorcier et reçoit sa lettre de Poudlard. Si c'était moi, j'aurais aussi choisi Gryffondor, comme lui.",
    },
    pathText: {
      rp1: { title: "Mondes fantastiques", badgeName: "Explorateur de mondes" },
    },
    challengeText: {
      fc1: "1000 minutes ensemble cet été",
    },
  },
  bookClub: {
    navLabel: "Club",
    title: "Club de lecture",
    subtitle: "Choisissez un livre, lisez-le ensemble et échangez",
    startCycleButton: "Lancer un cycle de lecture",
    startCycleHelp: "Un cycle est une lecture partagée : choisissez un livre du catalogue, les membres le lisent sur la même période et en discutent. Inclus gratuitement, même en Community.",
    currentReadLabel: "En lecture",
    activeLabel: "En cours",
    alsoActiveLabel: "Autres cycles en cours",
    historyLabel: "Historique",
    historyHint: "Cycles terminés : ouvrez-en un pour revoir sa discussion, ses participants et sa note.",
    emptyTitle: "Pas encore de cycle de lecture",
    emptyDescription: "Lancez un cycle pour lire un livre avec les autres membres.",
    participantsCount: (n) => `${n} participants`,
    proposalsLink: "Propositions",
    cycleTitleLabel: "Titre du cycle",
    pickBookLabel: "Choisir un livre",
    searchPlaceholder: "Rechercher dans vos livres",
    createSuccess: "Cycle lancé",
    statusReading: "En lecture",
    statusDiscussing: "En discussion",
    statusArchived: "Archivé",
    moveToDiscussionButton: "Passer à la discussion",
    undoMoveToDiscussionButton: "Annuler, revenir à la lecture",
    archiveButton: "Archiver",
    reopenButton: "Rouvrir le cycle",
    archivedNotice: "Cycle terminé et archivé. Lecture seule.",
    archivedReopenHint: "Cliqué par erreur ? Vous pouvez le rouvrir.",
    backLink: "Club de lecture",
    participantsTitle: "Participants",
    noParticipants: "Aucun participant pour l'instant",
    joinButton: "Participer",
    markFinishedButton: "Marquer comme terminé",
    finishedLabel: "Terminé",
    aiPromptsTitle: "Pistes de discussion",
    showPromptsButton: "Afficher les pistes",
    promptsLoading: "Génération en cours…",
    noPrompts: "Aucune piste disponible",
    meetingsTitle: "Rencontres",
    noMeetings: "Aucune rencontre prévue",
    meetingWhenLabel: "Date et heure",
    meetingNoteLabel: "Lieu ou lien",
    meetingNotePlaceholder: "Bibliothèque, salle 2 ou lien vidéo",
    scheduleButton: "Programmer",
    discussionTitle: "Discussion",
    discussionLocked: "La discussion s'ouvre une fois le cycle passé à la discussion.",
    discussionLockedArchived: "Cycle archivé : la discussion est fermée. Rouvrez le cycle pour continuer à écrire.",
    writePlaceholder: "Écrivez un commentaire",
    spoilerLabel: "Contient des spoilers",
    spoilerBadge: "Spoiler",
    revealSpoilerButton: "Afficher le spoiler",
    postButton: "Publier",
    noPosts: "Aucun commentaire pour l'instant",
    ratingLabel: (avg, total) => `★ ${avg} (${total})`,
    proposalsTitle: "Propositions",
    proposalsSubtitle: "Proposez et votez le prochain livre",
    proposeBookButton: "Proposer un livre",
    proposalNoteLabel: "Note (facultative)",
    proposalNotePlaceholder: "Pourquoi vous le proposez",
    noProposals: "Aucune proposition",
    noProposalsDescription: "Proposez un livre à voter pour le prochain cycle.",
    promoteButton: "Promouvoir",
    promoteSuccess: "Cycle lancé depuis la proposition",
    aiPromptTemplates: [
      "Qu'est-ce qui vous a le plus surpris en lisant « {title} » ?",
      "Y a-t-il un personnage de « {title} » dans lequel vous vous êtes reconnu ? Pourquoi ?",
      "Si vous pouviez changer la fin de « {title} », comment la réécririez-vous ?",
      "Quelle scène de « {title} » vous a le plus marqué, et pourquoi ?",
      "Recommanderiez-vous « {title} » à un ami ? À qui en particulier ?",
    ],
  },
};
