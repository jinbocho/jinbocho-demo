import type { FamilyChallenge, JournalEntry, QuizAttempt, QuizQuestion, ReadingPath, ReadingSession } from "./types";

const CHILD_ID = "u4"; // Mia

// b21 = Il piccolo principe, b22 = Il signore degli anelli,
// b25 = Harry Potter e la pietra filosofale, b26 = La storia infinita.

export const READING_SESSIONS: ReadingSession[] = [
  { id: "rs1", child_id: CHILD_ID, book_id: "b25", logged_by_parent: false, created_at: "2026-07-14T20:00:00Z" },
  { id: "rs2", child_id: CHILD_ID, book_id: "b25", logged_by_parent: false, created_at: "2026-07-15T20:00:00Z" },
  { id: "rs3", child_id: CHILD_ID, book_id: "b25", logged_by_parent: false, created_at: "2026-07-16T20:00:00Z" },
  { id: "rs4", child_id: CHILD_ID, book_id: "b21", logged_by_parent: true, created_at: "2026-07-10T20:30:00Z" },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "qq1",
    book_id: "b21",
    prompt: "Cosa chiede il piccolo principe al narratore, appena si incontrano?",
    choices: ["Di disegnargli una pecora", "Di ripararle l'aereo", "Di portarlo sulla sua stella", "Di dargli dell'acqua"],
    correct_index: 0,
  },
  {
    id: "qq2",
    book_id: "b21",
    prompt: "Cosa dice la volpe al piccolo principe sull'amicizia?",
    choices: [
      "Che è invisibile agli occhi",
      "Che si vede solo col cuore",
      "Che dura solo un giorno",
      "Che serve solo agli adulti",
    ],
    correct_index: 1,
  },
];

export const QUIZ_ATTEMPTS: QuizAttempt[] = [
  { id: "qa1", child_id: CHILD_ID, book_id: "b21", score: 2, total: 2, created_at: "2026-07-11T18:00:00Z" },
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  { id: "je1", child_id: CHILD_ID, book_id: "b21", emoji: "🦊", created_at: "2026-07-10T21:00:00Z" },
  { id: "je2", child_id: CHILD_ID, book_id: "b25", emoji: null, created_at: "2026-07-16T20:45:00Z" },
];

export const READING_PATHS: ReadingPath[] = [
  { id: "rp1", book_ids: ["b21", "b22", "b25", "b26"] },
];

export const FAMILY_CHALLENGES: FamilyChallenge[] = [
  { id: "fc1", goal_minutes: 1000, progress_minutes: 340 },
];
