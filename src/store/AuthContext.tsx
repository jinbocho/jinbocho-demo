import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { User, UserRole } from "../data/types";
import { useData } from "./DataContext";

export type SessionStatus = "unauthenticated" | "authenticated";

export class AuthError extends Error {}

interface AuthContextValue {
  status: SessionStatus;
  currentUser: User | null;
  login: (email: string, password: string) => void;
  register: (familyName: string, adminFullName: string, adminEmail: string, password: string) => void;
  logout: () => void;
  forgotPassword: (email: string) => void;
  resetPassword: (newPassword: string, confirmPassword: string) => void;
  hasRole: (...roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthProvider({ children }: { children: ReactNode }) {
  const { users, wipeFamily } = useData();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const value = useMemo<AuthContextValue>(() => {
    const currentUser = users.find((u) => u.id === currentUserId) ?? null;
    return {
      status: currentUser ? "authenticated" : "unauthenticated",
      currentUser,

      login(email, password) {
        if (!EMAIL_RE.test(email)) throw new AuthError("invalid_email");
        if (!password) throw new AuthError("password_required");
        const match = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
        if (!match) throw new AuthError("invalid_credentials");
        if (!match.is_active) throw new AuthError("inactive_account");
        setCurrentUserId(match.id);
      },

      register(familyName, adminFullName, adminEmail, password) {
        if (!familyName.trim()) throw new AuthError("family_name_required");
        if (!adminFullName.trim()) throw new AuthError("full_name_required");
        if (!EMAIL_RE.test(adminEmail)) throw new AuthError("invalid_email");
        if (password.length < 8) throw new AuthError("password_too_short");
        const admin = wipeFamily(familyName.trim(), { name: adminFullName.trim(), email: adminEmail.trim() });
        setCurrentUserId(admin.id);
      },

      logout() {
        setCurrentUserId(null);
      },

      forgotPassword(email) {
        if (!EMAIL_RE.test(email)) throw new AuthError("invalid_email");
      },

      resetPassword(newPassword, confirmPassword) {
        if (newPassword.length < 8) throw new AuthError("password_too_short");
        if (newPassword !== confirmPassword) throw new AuthError("passwords_mismatch");
      },

      hasRole(...roles) {
        return !!currentUser && roles.includes(currentUser.role);
      },
    };
  }, [users, currentUserId, wipeFamily]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
