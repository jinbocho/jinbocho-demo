export interface Translations {
  locale: string;
  nav: {
    home: string;
    books: string;
    loans: string;
    locations: string;
    stats: string;
    bookDetail: string;
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
  },
  badge: {
    read: "Read",
    reading: "Reading",
    toRead: "To read",
    info: "Info",
    danger: "Warning",
  },
};
