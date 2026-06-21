import type { Locale } from "@/lib/i18n";

/** Production career started in February 2022. The "4.5 years" figure is
 *  derived from this date so it stays current on every render/build. */
export const TENURE_START = new Date(2022, 1, 1); // month is 0-indexed → February

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/** Whole years since the start, rounded to the nearest half. */
export function tenureYears(now: Date = new Date()): number {
  const years = (now.getTime() - TENURE_START.getTime()) / MS_PER_YEAR;
  return Math.max(0, Math.round(years * 2) / 2);
}

/** Evaluated at module load: build time on the server, runtime in the browser. */
export const TENURE = tenureYears();

/** Russian plural of "год" for the given count. */
function ruYearWord(n: number): string {
  if (!Number.isInteger(n)) return "года"; // decimals take genitive singular
  const d10 = n % 10;
  const d100 = n % 100;
  if (d10 === 1 && d100 !== 11) return "год";
  if (d10 >= 2 && d10 <= 4 && (d100 < 12 || d100 > 14)) return "года";
  return "лет";
}

/** Number formatted for the locale: comma decimals in RU, no trailing ".0". */
export function formatTenureNumber(n: number, lang: Locale): string {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(1);
  return lang === "ru" ? s.replace(".", ",") : s;
}

/** Number + unit, e.g. "4,5 года" / "4.5 years". */
export function tenurePhrase(lang: Locale, n: number = TENURE): string {
  const num = formatTenureNumber(n, lang);
  return lang === "ru" ? `${num} ${ruYearWord(n)}` : `${num} years`;
}

/** Just the unit word, e.g. "года" / "years". */
export function tenureUnit(lang: Locale, n: number = TENURE): string {
  return lang === "ru" ? ruYearWord(n) : "years";
}
