"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DICT, LANGS, type Dict, type Lang } from "@/lib/i18n";

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "fr", t: DICT.fr, setLang: () => {} });

const KEY = "arcadia-lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    // Français par défaut ; l'arabe est proposé si le navigateur est en arabe
    const initial = (saved ?? (navigator.language.startsWith("ar") ? "ar" : "fr")) as Lang;
    if (initial in DICT && initial !== "fr") setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  return <LangContext.Provider value={{ lang, t: DICT[lang], setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

export function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="langs" role="group" aria-label={t.nav.lang}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          aria-pressed={lang === l.code}
          aria-label={l.name}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
