import type {
  BookClubCycle, BookClubMeeting, BookClubParticipant, BookClubPost, BookClubProposal, BookClubVote,
} from "./types";

// bc1 = "Cent'anni di solitudine" (rec9/b9), archived — a finished round with
// a discussion thread and two ratings (see ratings.ts). bc2 = "Dune"
// (rec23/b23), currently in the Discussing phase.

export const BOOK_CLUB_CYCLES: BookClubCycle[] = [
  {
    id: "bc1", record_id: "rec9", title: "Realismo magico",
    status: "archived", reading_start: "2026-05-01", reading_end: "2026-05-31",
    created_by: "u1", created_at: "2026-04-28T09:00:00Z",
  },
  {
    id: "bc2", record_id: "rec23", title: "Fantascienza d'estate",
    status: "discussing", reading_start: "2026-07-01", reading_end: "2026-07-31",
    created_by: "u1", created_at: "2026-06-28T09:00:00Z",
  },
];

export const BOOK_CLUB_POSTS: BookClubPost[] = [
  { id: "bcp1", cycle_id: "bc1", user_id: "u1", body: "Il realismo magico di Márquez mi ha spiazzato fin dalle prime pagine.", parent_post_id: null, is_spoiler: false, created_at: "2026-05-10T20:00:00Z" },
  { id: "bcp2", cycle_id: "bc1", user_id: "u2", body: "Concordo, la famiglia Buendía è indimenticabile.", parent_post_id: "bcp1", is_spoiler: false, created_at: "2026-05-11T21:15:00Z" },
  { id: "bcp3", cycle_id: "bc2", user_id: "u1", body: "L'ecologia di Arrakis è descritta in modo incredibile.", parent_post_id: null, is_spoiler: false, created_at: "2026-07-05T19:30:00Z" },
  { id: "bcp4", cycle_id: "bc2", user_id: "u3", body: "Il finale del primo libro mi ha sorpreso parecchio!", parent_post_id: null, is_spoiler: true, created_at: "2026-07-12T18:45:00Z" },
];

export const BOOK_CLUB_PROPOSALS: BookClubProposal[] = [
  { id: "bcpr1", record_id: "rec8", proposed_by: "u2", note: "Non l'ho mai letto e mi hanno detto che è attualissimo.", created_at: "2026-07-14T08:00:00Z" },
  { id: "bcpr2", record_id: "rec20", proposed_by: "u3", note: null, created_at: "2026-07-15T08:00:00Z" },
];

export const BOOK_CLUB_VOTES: BookClubVote[] = [
  { id: "bcv1", proposal_id: "bcpr1", user_id: "u1" },
  { id: "bcv2", proposal_id: "bcpr1", user_id: "u3" },
  { id: "bcv3", proposal_id: "bcpr2", user_id: "u2" },
];

export const BOOK_CLUB_PARTICIPANTS: BookClubParticipant[] = [
  { id: "bcpt1", cycle_id: "bc1", user_id: "u1", status: "finished" },
  { id: "bcpt2", cycle_id: "bc1", user_id: "u2", status: "finished" },
  { id: "bcpt3", cycle_id: "bc2", user_id: "u1", status: "joined" },
  { id: "bcpt4", cycle_id: "bc2", user_id: "u3", status: "joined" },
];

export const BOOK_CLUB_MEETINGS: BookClubMeeting[] = [
  { id: "bcm1", cycle_id: "bc2", scheduled_at: "2026-07-28T19:00:00Z", note: "Videochiamata — link nel gruppo di famiglia", created_by: "u1" },
];
