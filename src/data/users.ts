import type { User } from "./types";

export const USERS: User[] = [
  { id: "u1", name: "Carmelo", email: "carmelo@jinbocho.app", role: "admin", avatar_color: "#bc002d", annual_reading_goal: 20, is_active: true },
  { id: "u2", name: "Sara", email: "sara@jinbocho.app", role: "editor", avatar_color: "#2e7d32", annual_reading_goal: 12, is_active: true },
  { id: "u3", name: "Luca", email: "luca@jinbocho.app", role: "viewer", avatar_color: "#4a6fa5", annual_reading_goal: null, is_active: true },
];

export const DEMO_PASSWORD_HINT = "Qualsiasi password funziona in questa demo.";
