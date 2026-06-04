import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { messages as enMessages } from "@/locales/en.po";
import { messages as koMessages } from "@/locales/ko.po";

export const LOCALES = ["ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ko";
export const LOCALE_COOKIE = "LOCALE";

export const isLocale = (value: string | undefined): value is Locale => !!value && LOCALES.includes(value as Locale);

const catalogs: Record<Locale, Messages> = {
  ko: koMessages,
  en: enMessages,
};

const instances = LOCALES.reduce(
  (acc, locale) => {
    acc[locale] = setupI18n({
      locale,
      messages: { [locale]: catalogs[locale] },
    });
    return acc;
  },
  {} as Record<Locale, I18n>,
);

export const getI18n = (locale: string): I18n => {
  if (!isLocale(locale)) {
    console.warn(`No i18n instance found for locale "${locale}"`);
    return instances[DEFAULT_LOCALE];
  }

  return instances[locale];
};
