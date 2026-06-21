"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { I18n, Locale } from "@/lib/i18n";
import { useSyncLangUrl } from "@/hooks/useSyncLangUrl";

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
  useSyncLangUrl(lang);
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
