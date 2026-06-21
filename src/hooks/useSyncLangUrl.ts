"use client";
import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/** Keep <html lang> and the shareable URL in sync with the active locale,
 *  without a reload, so deep links (/en/) and the toggle stay bookmarkable. */
export function useSyncLangUrl(lang: Locale): void {
  useEffect(() => {
    document.documentElement.lang = lang;
    const path = lang === "en" ? "/en/" : "/";
    if (window.location.pathname !== path) {
      window.history.replaceState(null, "", path + window.location.hash);
    }
  }, [lang]);
}
