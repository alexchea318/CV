export type Locale = "ru" | "en";

export const LOCALES: Locale[] = ["ru", "en"];

export type I18n<T = string> = { ru: T; en: T };

export function isLocale(x: string): x is Locale {
  return x === "ru" || x === "en";
}

/** Pull the value for a locale out of an I18n bag. */
export function pick<T>(bag: I18n<T>, locale: Locale): T {
  return bag[locale];
}
