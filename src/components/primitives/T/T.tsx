"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { I18n, Locale } from "@/lib/i18n";

type LangCtx = {
  lang: Locale;
  setLang: (l: Locale) => void;
};

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({
  initial,
  children,
}: {
  initial: Locale;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Locale>(initial);

  // Keep <html lang> and the shareable URL in sync without a reload, so a
  // deep link like /en/ opens in English and the toggle stays bookmarkable.
  useEffect(() => {
    document.documentElement.lang = lang;
    const path = lang === "en" ? "/en/" : "/";
    if (window.location.pathname !== path) {
      window.history.replaceState(null, "", path + window.location.hash);
    }
  }, [lang]);

  const setLang = useCallback((l: Locale) => setLangState(l), []);

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within <LangProvider>");
  return ctx;
}

/** Resolve a plain string or an I18n bag against the active locale. */
export type Localizable = string | I18n;

export function useT(): (v: Localizable) => string {
  const { lang } = useLang();
  return useCallback((v: Localizable) => (typeof v === "string" ? v : v[lang]), [lang]);
}

/** Inline localized text node. */
export function T({ v }: { v: Localizable }) {
  const t = useT();
  return <>{t(v)}</>;
}
