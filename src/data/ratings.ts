import type { BookRating } from "./types";

export const RATINGS: BookRating[] = [
  { id: "rt1", book_id: "b1", user_id: "u1", rating: 5, review: "Un capolavoro assoluto, da rileggere ogni tanto.", created_at: "2024-02-10T18:30:00Z" },
  { id: "rt2", book_id: "b1", user_id: "u2", rating: 4, review: "Bellissimo, un po' lento nella parte centrale.", created_at: "2024-03-02T10:15:00Z" },
  { id: "rt3", book_id: "b3", user_id: "u2", rating: 5, review: null, created_at: "2024-01-20T09:00:00Z" },
  { id: "rt4", book_id: "b5", user_id: "u1", rating: 4, review: "Uno dei classici siciliani più belli.", created_at: "2023-11-05T21:45:00Z" },
  { id: "rt5", book_id: "b7", user_id: "u1", rating: 5, review: "Il Gattopardo non delude mai.", created_at: "2023-09-14T16:20:00Z" },
  { id: "rt6", book_id: "b7", user_id: "u3", rating: 3, review: "Interessante ma non fa per me.", created_at: "2023-10-01T12:00:00Z" },
  { id: "rt7", book_id: "b8", user_id: "u1", rating: 5, review: "Distopia geniale, attualissima.", created_at: "2022-06-18T08:30:00Z" },
  // Ratings from the "Cent'anni di solitudine" book club cycle (bc1, archived).
  { id: "rt8", book_id: "b9", user_id: "u1", rating: 5, review: "Il libro del circolo di maggio, indimenticabile.", created_at: "2026-05-30T10:00:00Z" },
  { id: "rt9", book_id: "b9", user_id: "u2", rating: 4, review: null, created_at: "2026-05-31T09:00:00Z" },
];
