export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

export type I18n<T> = { ru: T; en: T };

export function pick<T>(field: I18n<T>, lang: Locale): T {
  return field[lang];
}
