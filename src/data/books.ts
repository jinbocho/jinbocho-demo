import type { BibliographicRecord, OwnedBook } from "./types";

export const RECORDS: BibliographicRecord[] = [
  // Narrativa italiana
  {
    id: "rec1",
    title: "L'amica geniale",
    main_author: "Elena Ferrante",
    isbn: "9788807884108",
    publisher: "E/O",
    publication_year: 2011,
    genre: "Narrativa italiana",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788807884108-M.jpg",
  },
  {
    id: "rec2",
    title: "Il nome della rosa",
    main_author: "Umberto Eco",
    isbn: "9788845268617",
    publisher: "Bompiani",
    publication_year: 1980,
    genre: "Narrativa italiana",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788845268617-M.jpg",
  },
  {
    id: "rec3",
    title: "Se una notte d'inverno un viaggiatore",
    main_author: "Italo Calvino",
    isbn: "9788806220044",
    publisher: "Einaudi",
    publication_year: 1979,
    genre: "Narrativa italiana",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788806220044-M.jpg",
  },
  {
    id: "rec4",
    title: "Il fu Mattia Pascal",
    main_author: "Luigi Pirandello",
    isbn: "9788817168991",
    publisher: "Mondadori",
    publication_year: 1904,
    genre: "Narrativa italiana",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788817168991-M.jpg",
  },
  {
    id: "rec5",
    title: "I Malavoglia",
    main_author: "Giovanni Verga",
    isbn: "9788817173568",
    publisher: "Mondadori",
    publication_year: 1881,
    genre: "Narrativa italiana",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788817173568-M.jpg",
  },
  {
    id: "rec6",
    title: "La luna e i falò",
    main_author: "Cesare Pavese",
    isbn: "9788806218089",
    publisher: "Einaudi",
    publication_year: 1950,
    genre: "Narrativa italiana",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788806218089-M.jpg",
  },
  {
    id: "rec7",
    title: "Il gattopardo",
    main_author: "Giuseppe Tomasi di Lampedusa",
    isbn: "9788845276958",
    publisher: "Feltrinelli",
    publication_year: 1958,
    genre: "Narrativa italiana",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788845276958-M.jpg",
  },
  // Narrativa straniera
  {
    id: "rec8",
    title: "1984",
    main_author: "George Orwell",
    isbn: "9788804668237",
    publisher: "Mondadori",
    publication_year: 1949,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788804668237-M.jpg",
  },
  {
    id: "rec9",
    title: "Cent'anni di solitudine",
    main_author: "Gabriel García Márquez",
    isbn: "9788804474029",
    publisher: "Mondadori",
    publication_year: 1967,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788804474029-M.jpg",
  },
  {
    id: "rec10",
    title: "Delitto e castigo",
    main_author: "Fëdor Dostoevsky",
    isbn: "9788817173247",
    publisher: "Mondadori",
    publication_year: 1866,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788817173247-M.jpg",
  },
  {
    id: "rec11",
    title: "Anna Karenina",
    main_author: "Lev Tolstoy",
    isbn: "9788817273190",
    publisher: "Mondadori",
    publication_year: 1877,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788817273190-M.jpg",
  },
  {
    id: "rec12",
    title: "Il grande Gatsby",
    main_author: "Francis Scott Fitzgerald",
    isbn: "9788804749509",
    publisher: "Mondadori",
    publication_year: 1925,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788804749509-M.jpg",
  },
  {
    id: "rec13",
    title: "Orgoglio e pregiudizio",
    main_author: "Jane Austen",
    isbn: "9788817273022",
    publisher: "Mondadori",
    publication_year: 1813,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788817273022-M.jpg",
  },
  {
    id: "rec14",
    title: "Cime tempestose",
    main_author: "Emily Brontë",
    isbn: "9788817010153",
    publisher: "Mondadori",
    publication_year: 1847,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788817010153-M.jpg",
  },
  {
    id: "rec15",
    title: "Jane Eyre",
    main_author: "Charlotte Brontë",
    isbn: "9788817173346",
    publisher: "Mondadori",
    publication_year: 1847,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788817173346-M.jpg",
  },
  {
    id: "rec16",
    title: "Don Chisciotte",
    main_author: "Miguel de Cervantes",
    isbn: "9788811690085",
    publisher: "Garzanti",
    publication_year: 1605,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788811690085-M.jpg",
  },
  {
    id: "rec17",
    title: "I miserabili",
    main_author: "Victor Hugo",
    isbn: "9788842925224",
    publisher: "Biblioteca Universale Rizzoli",
    publication_year: 1862,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788842925224-M.jpg",
  },
  {
    id: "rec18",
    title: "Il conte di Montecristo",
    main_author: "Alexandre Dumas",
    isbn: "9788842925248",
    publisher: "Biblioteca Universale Rizzoli",
    publication_year: 1844,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788842925248-M.jpg",
  },
  {
    id: "rec19",
    title: "Lo straniero",
    main_author: "Albert Camus",
    isbn: "9788806185275",
    publisher: "Bompiani",
    publication_year: 1942,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788806185275-M.jpg",
  },
  {
    id: "rec20",
    title: "Siddharta",
    main_author: "Hermann Hesse",
    isbn: "9788807900600",
    publisher: "Mondadori",
    publication_year: 1922,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788807900600-M.jpg",
  },
  {
    id: "rec21",
    title: "Il piccolo principe",
    main_author: "Antoine de Saint-Exupéry",
    isbn: "9788817168977",
    publisher: "Mondadori",
    publication_year: 1943,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788817168977-M.jpg",
  },
  // Fantasy / Sci-fi
  {
    id: "rec22",
    title: "Il signore degli anelli",
    main_author: "J.R.R. Tolkien",
    isbn: "9788845298004",
    publisher: "Bompiani",
    publication_year: 1954,
    genre: "Fantasy",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788845298004-M.jpg",
  },
  {
    id: "rec23",
    title: "Dune",
    main_author: "Frank Herbert",
    isbn: "9788804666615",
    publisher: "Mondadori",
    publication_year: 1965,
    genre: "Fantascienza",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788804666615-M.jpg",
  },
  {
    id: "rec24",
    title: "Foundation",
    main_author: "Isaac Asimov",
    isbn: "9788835714521",
    publisher: "Mondadori",
    publication_year: 1951,
    genre: "Fantascienza",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788835714521-M.jpg",
  },
  {
    id: "rec25",
    title: "Harry Potter e la pietra filosofale",
    main_author: "J.K. Rowling",
    isbn: "9788877827029",
    publisher: "Salani",
    publication_year: 1997,
    genre: "Fantasy",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788877827029-M.jpg",
  },
  {
    id: "rec26",
    title: "La storia infinita",
    main_author: "Michael Ende",
    isbn: "9788846209801",
    publisher: "Longanesi",
    publication_year: 1979,
    genre: "Fantasy",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788846209801-M.jpg",
  },
  // Saggistica
  {
    id: "rec27",
    title: "Sapiens",
    main_author: "Yuval Noah Harari",
    isbn: "9788858118658",
    publisher: "Bompiani",
    publication_year: 2011,
    genre: "Saggistica",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788858118658-M.jpg",
  },
  {
    id: "rec28",
    title: "Breve storia del tempo",
    main_author: "Stephen Hawking",
    isbn: "9788817143653",
    publisher: "Rizzoli",
    publication_year: 1988,
    genre: "Saggistica",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788817143653-M.jpg",
  },
  {
    id: "rec29",
    title: "Il mondo di Sofia",
    main_author: "Jostein Gaarder",
    isbn: "9788808036889",
    publisher: "Longanesi",
    publication_year: 1991,
    genre: "Saggistica",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788808036889-M.jpg",
  },
  {
    id: "rec30",
    title: "La coscienza di Zeno",
    main_author: "Italo Svevo",
    isbn: "9788817173254",
    publisher: "Mondadori",
    publication_year: 1923,
    genre: "Narrativa italiana",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788817173254-M.jpg",
  },
  {
    id: "rec31",
    title: "Le città invisibili",
    main_author: "Italo Calvino",
    isbn: "9788806219260",
    publisher: "Einaudi",
    publication_year: 1972,
    genre: "Narrativa italiana",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788806219260-M.jpg",
  },
  // Altro
  {
    id: "rec32",
    title: "L'isola del tesoro",
    main_author: "Robert Louis Stevenson",
    isbn: null,
    publisher: "Salani",
    publication_year: 1883,
    genre: "Avventura",
    cover_url: "https://placehold.co/300x450/8b4513/d4af37?text=L'isola+del+tesoro",
  },
  {
    id: "rec33",
    title: "Moby Dick",
    main_author: "Herman Melville",
    isbn: null,
    publisher: "Einaudi",
    publication_year: 1851,
    genre: "Narrativa straniera",
    cover_url: "https://placehold.co/300x450/1b3a5c/87ceeb?text=Moby+Dick",
  },
  {
    id: "rec34",
    title: "Il processo",
    main_author: "Franz Kafka",
    isbn: "9788817173223",
    publisher: "Mondadori",
    publication_year: 1925,
    genre: "Narrativa straniera",
    cover_url: "https://covers.openlibrary.org/b/isbn/9788817173223-M.jpg",
  },
  {
    id: "rec35",
    title: "Gita al faro",
    main_author: "Virginia Woolf",
    isbn: null,
    publisher: "Feltrinelli",
    publication_year: 1927,
    genre: "Narrativa straniera",
    cover_url: "https://placehold.co/300x450/2d5a3d/a8d5ba?text=Gita+al+faro",
  },
];

// OwnedBooks — consistent with locations hierarchy
// s1/sh1,sh2,sh3 → Narrativa italiana (bc1, r1)
// s2/sh4,sh5,sh6 → Narrativa straniera (bc1, r1)
// s3/sh7,sh8 → Saggistica (bc1, r1)
// s4/sh9,sh10,sh11 → Fantasy (bc2, r1)
// s5/sh12,sh13 → Tecnica (bc3, r2)
// s6/sh14,sh15 → Storia e Filosofia (bc3, r2)
// s7/sh16,sh17 → Letture correnti (bc4, r3)

export const OWNED_BOOKS: OwnedBook[] = [
  // === NARRATIVA ITALIANA (s1, bc1, r1) ===
  // sh1
  {
    id: "b1", record_id: "rec1", room_id: "r1", bookcase_id: "bc1", section_id: "s1", shelf_id: "sh1", shelf_position: 1,
    reading_status: "read", owner_id: "u1", current_reader_id: null, tags: ["romanzo", "napoli"], notes: null, purchase_year: 2015,
  },
  {
    id: "b2", record_id: "rec2", room_id: "r1", bookcase_id: "bc1", section_id: "s1", shelf_id: "sh1", shelf_position: 2,
    reading_status: "read", owner_id: "u1", current_reader_id: null, tags: ["classico", "medioevo"], notes: null, purchase_year: 2010,
  },
  {
    id: "b3", record_id: "rec3", room_id: "r1", bookcase_id: "bc1", section_id: "s1", shelf_id: "sh1", shelf_position: 3,
    reading_status: "read", owner_id: "u2", current_reader_id: null, tags: ["postmoderno"], notes: "Edizione con prefazione", purchase_year: 2012,
  },
  // sh2
  {
    id: "b4", record_id: "rec4", room_id: "r1", bookcase_id: "bc1", section_id: "s1", shelf_id: "sh2", shelf_position: 1,
    reading_status: "to_read", owner_id: "u1", current_reader_id: null, tags: ["classico"], notes: null, purchase_year: 2020,
  },
  {
    id: "b5", record_id: "rec5", room_id: "r1", bookcase_id: "bc1", section_id: "s1", shelf_id: "sh2", shelf_position: 2,
    reading_status: "read", owner_id: "u1", current_reader_id: null, tags: ["classico", "sicilia"], notes: null, purchase_year: 2018,
  },
  {
    id: "b6", record_id: "rec6", room_id: "r1", bookcase_id: "bc1", section_id: "s1", shelf_id: "sh2", shelf_position: 3,
    reading_status: "to_read", owner_id: "u2", current_reader_id: null, tags: ["piemonte"], notes: null, purchase_year: 2021,
  },
  // sh3
  {
    id: "b7", record_id: "rec7", room_id: "r1", bookcase_id: "bc1", section_id: "s1", shelf_id: "sh3", shelf_position: 1,
    reading_status: "read", owner_id: "u1", current_reader_id: null, tags: ["classico", "sicilia", "nobiltà"], notes: null, purchase_year: 2016,
  },
  {
    id: "b30", record_id: "rec30", room_id: "r1", bookcase_id: "bc1", section_id: "s1", shelf_id: "sh3", shelf_position: 2,
    reading_status: "read", owner_id: "u2", current_reader_id: null, tags: ["classico", "trieste"], notes: null, purchase_year: 2019,
  },
  {
    id: "b31", record_id: "rec31", room_id: "r1", bookcase_id: "bc1", section_id: "s1", shelf_id: "sh3", shelf_position: 3,
    reading_status: "to_read", owner_id: "u1", current_reader_id: null, tags: ["calvino"], notes: null, purchase_year: 2022,
  },

  // === NARRATIVA STRANIERA (s2, bc1, r1) ===
  // sh4
  {
    id: "b8", record_id: "rec8", room_id: "r1", bookcase_id: "bc1", section_id: "s2", shelf_id: "sh4", shelf_position: 1,
    reading_status: "read", owner_id: "u1", current_reader_id: null, tags: ["distopia", "politico"], notes: "Capolavoro assoluto", purchase_year: 2008,
  },
  {
    id: "b9", record_id: "rec9", room_id: "r1", bookcase_id: "bc1", section_id: "s2", shelf_id: "sh4", shelf_position: 2,
    reading_status: "read", owner_id: "u1", current_reader_id: null, tags: ["realismo magico", "colombia"], notes: null, purchase_year: 2014,
  },
  {
    id: "b10", record_id: "rec10", room_id: "r1", bookcase_id: "bc1", section_id: "s2", shelf_id: "sh4", shelf_position: 3,
    reading_status: "reading", owner_id: "u2", current_reader_id: "u2", tags: ["russia", "classico"], notes: null, purchase_year: 2020,
  },
  // sh5
  {
    id: "b11", record_id: "rec11", room_id: "r1", bookcase_id: "bc1", section_id: "s2", shelf_id: "sh5", shelf_position: 1,
    reading_status: "to_read", owner_id: "u1", current_reader_id: null, tags: ["russia", "romanzo"], notes: null, purchase_year: 2021,
  },
  {
    id: "b12", record_id: "rec12", room_id: "r1", bookcase_id: "bc1", section_id: "s2", shelf_id: "sh5", shelf_position: 2,
    reading_status: "read", owner_id: "u3", current_reader_id: null, tags: ["america", "anni20"], notes: null, purchase_year: 2017,
  },
  {
    id: "b13", record_id: "rec13", room_id: "r1", bookcase_id: "bc1", section_id: "s2", shelf_id: "sh5", shelf_position: 3,
    reading_status: "read", owner_id: "u2", current_reader_id: null, tags: ["classico", "inghilterra"], notes: null, purchase_year: 2013,
  },
  // sh6
  {
    id: "b14", record_id: "rec14", room_id: "r1", bookcase_id: "bc1", section_id: "s2", shelf_id: "sh6", shelf_position: 1,
    reading_status: "to_read", owner_id: "u2", current_reader_id: null, tags: ["gotico"], notes: null, purchase_year: 2022,
  },
  {
    id: "b15", record_id: "rec15", room_id: "r1", bookcase_id: "bc1", section_id: "s2", shelf_id: "sh6", shelf_position: 2,
    reading_status: "read", owner_id: "u1", current_reader_id: null, tags: ["classico", "ottocento"], notes: null, purchase_year: 2011,
  },
  {
    id: "b19", record_id: "rec19", room_id: "r1", bookcase_id: "bc1", section_id: "s2", shelf_id: "sh6", shelf_position: 3,
    reading_status: "read", owner_id: "u1", current_reader_id: null, tags: ["esistenzialismo", "french"], notes: null, purchase_year: 2009,
  },

  // === SAGGISTICA (s3, bc1, r1) ===
  // sh7
  {
    id: "b27", record_id: "rec27", room_id: "r1", bookcase_id: "bc1", section_id: "s3", shelf_id: "sh7", shelf_position: 1,
    reading_status: "read", owner_id: "u1", current_reader_id: null, tags: ["storia", "umanità"], notes: "Ottimo per farsi un'idea", purchase_year: 2016,
  },
  {
    id: "b28", record_id: "rec28", room_id: "r1", bookcase_id: "bc1", section_id: "s3", shelf_id: "sh7", shelf_position: 2,
    reading_status: "read", owner_id: "u2", current_reader_id: null, tags: ["fisica", "scienza"], notes: null, purchase_year: 2018,
  },
  {
    id: "b29", record_id: "rec29", room_id: "r1", bookcase_id: "bc1", section_id: "s3", shelf_id: "sh7", shelf_position: 3,
    reading_status: "to_read", owner_id: "u3", current_reader_id: null, tags: ["filosofia"], notes: null, purchase_year: 2023,
  },
  // sh8
  {
    id: "b32", record_id: "rec32", room_id: "r1", bookcase_id: "bc1", section_id: "s3", shelf_id: "sh8", shelf_position: 1,
    reading_status: "read", owner_id: "u3", current_reader_id: null, tags: ["avventura", "classico"], notes: null, purchase_year: 2015,
  },
  {
    id: "b33", record_id: "rec33", room_id: "r1", bookcase_id: "bc1", section_id: "s3", shelf_id: "sh8", shelf_position: 2,
    reading_status: "to_read", owner_id: "u1", current_reader_id: null, tags: ["mare", "classico"], notes: null, purchase_year: 2019,
  },

  // === FANTASY (s4, bc2, r1) ===
  // sh9
  {
    id: "b22", record_id: "rec22", room_id: "r1", bookcase_id: "bc2", section_id: "s4", shelf_id: "sh9", shelf_position: 1,
    reading_status: "read", owner_id: "u1", current_reader_id: null, tags: ["fantasy", "tolkien"], notes: "La trilogia completa", purchase_year: 2005,
  },
  {
    id: "b23", record_id: "rec23", room_id: "r1", bookcase_id: "bc2", section_id: "s4", shelf_id: "sh9", shelf_position: 2,
    reading_status: "reading", owner_id: "u1", current_reader_id: "u1", tags: ["fantascienza", "epico"], notes: "Rilettura", purchase_year: 2020,
  },
  // sh10
  {
    id: "b24", record_id: "rec24", room_id: "r1", bookcase_id: "bc2", section_id: "s4", shelf_id: "sh10", shelf_position: 1,
    reading_status: "read", owner_id: "u1", current_reader_id: null, tags: ["fantascienza", "asimov"], notes: null, purchase_year: 2012,
  },
  {
    id: "b25", record_id: "rec25", room_id: "r1", bookcase_id: "bc2", section_id: "s4", shelf_id: "sh10", shelf_position: 2,
    reading_status: "read", owner_id: "u2", current_reader_id: null, tags: ["fantasy", "magia"], notes: null, purchase_year: 2001,
  },
  // sh11
  {
    id: "b26", record_id: "rec26", room_id: "r1", bookcase_id: "bc2", section_id: "s4", shelf_id: "sh11", shelf_position: 1,
    reading_status: "to_read", owner_id: "u3", current_reader_id: null, tags: ["fantasy", "bambini"], notes: null, purchase_year: 2022,
  },
  {
    id: "b20", record_id: "rec20", room_id: "r1", bookcase_id: "bc2", section_id: "s4", shelf_id: "sh11", shelf_position: 2,
    reading_status: "read", owner_id: "u2", current_reader_id: null, tags: ["spiritualità", "india"], notes: null, purchase_year: 2016,
  },

  // === STUDIO - TECNICA (s5, bc3, r2) ===
  // sh12
  {
    id: "b16", record_id: "rec16", room_id: "r2", bookcase_id: "bc3", section_id: "s5", shelf_id: "sh12", shelf_position: 1,
    reading_status: "to_read", owner_id: "u1", current_reader_id: null, tags: ["spagnolo", "classico"], notes: null, purchase_year: 2023,
  },
  {
    id: "b21", record_id: "rec21", room_id: "r2", bookcase_id: "bc3", section_id: "s5", shelf_id: "sh12", shelf_position: 2,
    reading_status: "read", owner_id: "u3", current_reader_id: null, tags: ["bambini", "filosofia"], notes: null, purchase_year: 2010,
  },
  // sh13
  {
    id: "b34", record_id: "rec34", room_id: "r2", bookcase_id: "bc3", section_id: "s5", shelf_id: "sh13", shelf_position: 1,
    reading_status: "reading", owner_id: "u1", current_reader_id: "u1", tags: ["kafka", "assurdo"], notes: null, purchase_year: 2020,
  },
  {
    id: "b35", record_id: "rec35", room_id: "r2", bookcase_id: "bc3", section_id: "s5", shelf_id: "sh13", shelf_position: 2,
    reading_status: "to_read", owner_id: "u2", current_reader_id: null, tags: ["modernismo", "inghilterra"], notes: null, purchase_year: 2022,
  },

  // === STUDIO - STORIA E FILOSOFIA (s6, bc3, r2) ===
  // sh14
  {
    id: "b17", record_id: "rec17", room_id: "r2", bookcase_id: "bc3", section_id: "s6", shelf_id: "sh14", shelf_position: 1,
    reading_status: "to_read", owner_id: "u1", current_reader_id: null, tags: ["classico", "france"], notes: null, purchase_year: 2023,
  },
  {
    id: "b18", record_id: "rec18", room_id: "r2", bookcase_id: "bc3", section_id: "s6", shelf_id: "sh14", shelf_position: 2,
    reading_status: "reading", owner_id: "u2", current_reader_id: "u2", tags: ["avventura", "classico"], notes: "Edizione integrale", purchase_year: 2021,
  },
  // sh15
  {
    id: "b17b", record_id: "rec17", room_id: "r2", bookcase_id: "bc3", section_id: "s6", shelf_id: "sh15", shelf_position: 1,
    reading_status: "to_read", owner_id: "u3", current_reader_id: null, tags: ["storia"], notes: null, purchase_year: 2024,
  },
];
