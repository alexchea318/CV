import type {Locale} from "@/lib/i18n";

/** Current calendar year. Evaluated at render time — build time during the
 *  static export, runtime in the browser — so the footer never goes stale. */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/** "август 2026" / "August 2026" — the sheet's freshness stamp.
 *  ru-RU appends "г." to a month+year pattern; the sheet reads better without it. */
export function monthYear(lang: Locale, date: Date = new Date()): string {
  const formatted = new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
  return formatted.replace(/\s*г\.$/, "");
}
