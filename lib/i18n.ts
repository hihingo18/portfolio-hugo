import type en from "@/locales/en.json";

export type Dictionary = typeof en;

export const locales = ["en", "vn"] as const;
export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const dict = await import(`@/locales/${locale}.json`);
  return dict.default as Dictionary;
}
