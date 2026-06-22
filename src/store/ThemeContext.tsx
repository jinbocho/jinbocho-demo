import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ThemeMode, ThemeName } from "../data/types";

const THEME_NAME_KEY = "jinbocho-theme-name";
const THEME_MODE_KEY = "jinbocho-theme-mode";

interface ThemeContextValue {
  themeName: ThemeName;
  themeMode: ThemeMode;
  setThemeName: (name: ThemeName) => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStored<T extends string>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  return (window.localStorage.getItem(key) as T) || fallback;
}

function resolveDark(mode: ThemeMode): boolean {
  if (mode === "dark") return true;
  if (mode === "light") return false;
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>(() => readStored(THEME_NAME_KEY, "akabeni"));
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => readStored(THEME_MODE_KEY, "light"));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-pergamena", "theme-sumi");
    if (themeName === "pergamena") root.classList.add("theme-pergamena");
    if (themeName === "sumi") root.classList.add("theme-sumi");
    window.localStorage.setItem(THEME_NAME_KEY, themeName);
  }, [themeName]);

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => root.classList.toggle("dark", resolveDark(themeMode));
    apply();
    window.localStorage.setItem(THEME_MODE_KEY, themeMode);
    if (themeMode !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [themeMode]);

  const value = useMemo<ThemeContextValue>(() => ({ themeName, themeMode, setThemeName, setThemeMode }), [themeName, themeMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
