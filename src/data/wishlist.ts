import type { WishlistItem } from "./types";

export const WISHLIST: WishlistItem[] = [
  {
    id: "w1", user_id: "u1", priority: 1, notes: "Consigliato da Sara, sembra bellissimo.",
    created_at: "2024-05-02T09:00:00Z",
    record: { title: "Norwegian Wood", main_author: "Haruki Murakami", isbn: "9788845925290", publisher: "Einaudi", publication_year: 1987, genre: "fiction", cover_url: null },
  },
  {
    id: "w2", user_id: "u2", priority: 2, notes: null,
    created_at: "2024-04-18T14:20:00Z",
    record: { title: "Fahrenheit 451", main_author: "Ray Bradbury", isbn: "9788807881985", publisher: "Mondadori", publication_year: 1953, genre: "science_fiction", cover_url: null },
  },
  {
    id: "w3", user_id: "u1", priority: 3, notes: "Da leggere in vacanza.",
    created_at: "2024-03-30T11:10:00Z",
    record: { title: "Il barone rampante", main_author: "Italo Calvino", isbn: "9788806168521", publisher: "Einaudi", publication_year: 1957, genre: "fiction", cover_url: null },
  },
  {
    id: "w4", user_id: "u3", priority: null, notes: null,
    created_at: "2024-02-14T08:45:00Z",
    record: { title: "La metamorfosi", main_author: "Franz Kafka", isbn: "9788807900037", publisher: "Einaudi", publication_year: 1915, genre: "fiction", cover_url: null },
  },
];
