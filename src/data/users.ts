import type { User } from "./types";

export const USERS: User[] = [
  { id: "u1", name: "Carmelo", email: "carmelo@jinbocho.app", role: "admin", avatar_color: "#bc002d", annual_reading_goal: 20, is_active: true, joined_at: "2023-01-15T10:00:00Z" },
  { id: "u2", name: "Sara", email: "sara@jinbocho.app", role: "editor", avatar_color: "#2e7d32", annual_reading_goal: 12, is_active: true, joined_at: "2023-02-02T10:00:00Z" },
  { id: "u3", name: "Luca", email: "luca@jinbocho.app", role: "viewer", avatar_color: "#4a6fa5", annual_reading_goal: null, is_active: true, joined_at: "2023-06-20T10:00:00Z" },
  { id: "u4", name: "Mia", email: "mia@jinbocho.app", role: "child", avatar_color: "#b4790a", annual_reading_goal: null, is_active: true, joined_at: "2024-09-01T10:00:00Z" },
];

export const DEMO_PASSWORD_HINT = "Qualsiasi password funziona in questa demo.";
