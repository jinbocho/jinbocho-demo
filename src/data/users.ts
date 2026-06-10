import type { User } from "./types";

export const USERS: User[] = [
  { id: "u1", name: "Carmelo", email: "carmelo@jinbocho.app", role: "admin", avatar_color: "#a85a38" },
  { id: "u2", name: "Sara", email: "sara@jinbocho.app", role: "editor", avatar_color: "#6e8e58" },
  { id: "u3", name: "Luca", email: "luca@jinbocho.app", role: "viewer", avatar_color: "#4a6fa5" },
];

export const CURRENT_USER = USERS[0];
