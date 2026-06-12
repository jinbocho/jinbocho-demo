import { createContext, useContext, useState } from "react";
import type { Translations } from "./translations";
import { it, en } from "./translations";

export type Language = "it" | "en";

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "it",
  setLang: () => {},
  t: it,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("jinbocho-lang");
      return stored === "en" ? "en" : "it";
    } catch {
      return "it";
    }
  });

  function handleSetLang(l: Language) {
    setLang(l);
    try {
      localStorage.setItem("jinbocho-lang", l);
    } catch {}
  }

  return (
    <LanguageContext.Provider
      value={{ lang, setLang: handleSetLang, t: lang === "en" ? en : it }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
