import type { BookRead } from "./types";

export const READS: BookRead[] = [
  { id: "r1", book_id: "b1", user_id: "u1", read_at: "2015-03-12" },
  { id: "r2", book_id: "b2", user_id: "u1", read_at: "2010-07-22" },
  { id: "r3", book_id: "b3", user_id: "u2", read_at: "2012-09-05" },
  { id: "r4", book_id: "b5", user_id: "u1", read_at: "2018-01-18" },
  { id: "r5", book_id: "b7", user_id: "u1", read_at: "2016-05-30" },
  { id: "r6", book_id: "b8", user_id: "u1", read_at: "2008-11-14" },
  { id: "r7", book_id: "b9", user_id: "u1", read_at: "2014-04-02" },
  { id: "r8", book_id: "b12", user_id: "u3", read_at: "2017-08-20" },
  { id: "r9", book_id: "b13", user_id: "u2", read_at: "2013-02-28" },
  { id: "r10", book_id: "b15", user_id: "u1", read_at: "2011-06-15" },
  { id: "r11", book_id: "b19", user_id: "u1", read_at: "2009-12-01" },
  { id: "r12", book_id: "b20", user_id: "u2", read_at: "2016-10-08" },
  { id: "r13", book_id: "b21", user_id: "u3", read_at: "2010-03-25" },
  { id: "r14", book_id: "b22", user_id: "u1", read_at: "2005-07-10" },
  { id: "r15", book_id: "b24", user_id: "u1", read_at: "2012-11-19" },
  { id: "r16", book_id: "b25", user_id: "u2", read_at: "2001-12-24" },
  { id: "r17", book_id: "b27", user_id: "u1", read_at: "2016-04-15" },
  { id: "r18", book_id: "b28", user_id: "u2", read_at: "2018-09-30" },
  { id: "r19", book_id: "b30", user_id: "u2", read_at: "2019-02-14" },
  { id: "r20", book_id: "b32", user_id: "u3", read_at: "2015-08-05" },
  // Re-reads
  { id: "r21", book_id: "b1", user_id: "u2", read_at: "2020-01-10" },
  { id: "r22", book_id: "b8", user_id: "u2", read_at: "2021-06-20" },
];
