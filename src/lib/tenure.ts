import type { Locale } from "@/lib/i18n";

/** Production career started in February 2022. The "4+ years" figure is
 *  derived from this date so it stays current on every render/build. */
export const TENURE_START = new Date(2022, 1, 1); // month is 0-indexed → February

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/** Full years since the start: a CV says "4+ years", never "4.7". */
export function tenureYears(now: Date = new Date()): number {
  const years = (now.getTime() - TENURE_START.getTime()) / MS_PER_YEAR;
  return Math.max(0, Math.floor(years));
}

/** Evaluated at module load: build time on the server, runtime in the browser. */
export const TENURE = tenureYears();

/** Russian plural of "год" for the given count. */
function ruYearWord(n: number): string {
  const d10 = n % 10;
  const d100 = n % 100;
  if (d10 === 1 && d100 !== 11) return "год";
  if (d10 >= 2 && d10 <= 4 && (d100 < 12 || d100 > 14)) return "года";
  return "лет";
}

/** Number + unit, e.g. "4+ года" / "4+ years". */
export function tenurePhrase(lang: Locale, n: number = TENURE): string {
  return lang === "ru" ? `${n}+ ${ruYearWord(n)}` : `${n}+ years`;
}

/** Fills the {tenure} placeholder in copy, so the number is never typed by hand. */
export function withTenure(text: string, lang: Locale): string {
  return text.replace("{tenure}", tenurePhrase(lang));
}
