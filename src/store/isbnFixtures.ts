import type { Genre } from "../data/types";

export interface IsbnLookupResult {
  isbn: string;
  title: string;
  main_author: string | null;
  other_authors: string[];
  publisher: string | null;
  publication_year: number | null;
  language: string | null;
  genre: Genre | null;
  cover_url: string | null;
}

// Dataset fittizio per il lookup ISBN simulato (nessuna chiamata di rete).
// "9788804668237" coincide deliberatamente con l'ISBN di "1984" già in libreria,
// per poter dimostrare il flusso di rilevamento duplicati.
export const ISBN_FIXTURES: IsbnLookupResult[] = [
  {
    isbn: "9788806168521", title: "Il barone rampante", main_author: "Italo Calvino", other_authors: [],
    publisher: "Einaudi", publication_year: 1957, language: "it", genre: "fiction", cover_url: null,
  },
  {
    isbn: "9788845925290", title: "Norwegian Wood", main_author: "Haruki Murakami", other_authors: [],
    publisher: "Einaudi", publication_year: 1987, language: "it", genre: "fiction", cover_url: null,
  },
  {
    isbn: "9788807881985", title: "Fahrenheit 451", main_author: "Ray Bradbury", other_authors: [],
    publisher: "Mondadori", publication_year: 1953, language: "it", genre: "science_fiction", cover_url: null,
  },
  {
    isbn: "9788804668237", title: "1984", main_author: "George Orwell", other_authors: [],
    publisher: "Mondadori", publication_year: 1949, language: "it", genre: "science_fiction", cover_url: null,
  },
  {
    isbn: "9788807900037", title: "La metamorfosi", main_author: "Franz Kafka", other_authors: [],
    publisher: "Einaudi", publication_year: 1915, language: "it", genre: "fiction", cover_url: null,
  },
  {
    isbn: "9788817106900", title: "Le avventure di Pinocchio", main_author: "Carlo Collodi", other_authors: [],
    publisher: "Mondadori", publication_year: 1883, language: "it", genre: "children", cover_url: null,
  },
  {
    isbn: "9780141439556", title: "Frankenstein", main_author: "Mary Shelley", other_authors: [],
    publisher: "Penguin", publication_year: 1818, language: "en", genre: "horror", cover_url: null,
  },
  {
    isbn: "9788807900143", title: "Pastorale americana", main_author: "Philip Roth", other_authors: [],
    publisher: "Einaudi", publication_year: 1997, language: "it", genre: "fiction", cover_url: null,
  },
];

export function normalizeIsbn(raw: string): string {
  const cleaned = raw.replace(/[^0-9Xx]/g, "").toUpperCase();
  return cleaned;
}

export function isValidIsbn(isbn: string): boolean {
  return isbn.length === 10 || isbn.length === 13;
}

export function lookupIsbn(raw: string): IsbnLookupResult | null {
  const normalized = normalizeIsbn(raw);
  return ISBN_FIXTURES.find((entry) => entry.isbn === normalized) ?? null;
}

export function randomIsbnFixture(excludeIsbns: string[] = []): IsbnLookupResult {
  const pool = ISBN_FIXTURES.filter((entry) => !excludeIsbns.includes(entry.isbn));
  const list = pool.length > 0 ? pool : ISBN_FIXTURES;
  return list[Math.floor(Math.random() * list.length)];
}

// Simula la ricerca per titolo/autore offerta dal catalogo esterno (Open Library/Google Books)
// nel servizio reale: filtra lo stesso pool di fixture ISBN per sostanza demo-equivalente.
export function searchBooks(title?: string, author?: string): IsbnLookupResult[] {
  const t = title?.trim().toLowerCase() ?? "";
  const a = author?.trim().toLowerCase() ?? "";
  return ISBN_FIXTURES.filter((entry) => {
    if (t && !entry.title.toLowerCase().includes(t)) return false;
    if (a && !(entry.main_author ?? "").toLowerCase().includes(a)) return false;
    return true;
  });
}
