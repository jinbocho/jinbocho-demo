import type { BookLoan } from "./types";

export const LOANS: BookLoan[] = [
  // 2 attivi
  {
    id: "l1",
    book_id: "b2",
    borrower_name: "Marco Ricci",
    loaned_at: "2026-05-20",
    due_date: "2026-06-20",
    returned_at: null,
  },
  {
    id: "l2",
    book_id: "b9",
    borrower_name: "Giulia Ferraro",
    loaned_at: "2026-06-01",
    due_date: "2026-07-01",
    returned_at: null,
  },
  // 3 restituiti
  {
    id: "l3",
    book_id: "b8",
    borrower_name: "Antonio Bianchi",
    loaned_at: "2026-01-10",
    due_date: "2026-02-10",
    returned_at: "2026-02-08",
  },
  {
    id: "l4",
    book_id: "b27",
    borrower_name: "Federica Marino",
    loaned_at: "2025-11-01",
    due_date: "2025-12-01",
    returned_at: "2025-11-28",
  },
  {
    id: "l5",
    book_id: "b25",
    borrower_name: "Davide Costa",
    loaned_at: "2025-09-15",
    due_date: "2025-10-15",
    returned_at: "2025-10-12",
  },
];
