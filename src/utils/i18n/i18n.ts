import "server-only";

import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { setI18n } from "@lingui/react/server";
import linguiConfig from "../../../lingui.config";

const { locales } = linguiConfig;

async function initI18n() {
  async function loadCatalog(
    locale: string,
  ): Promise<{ [k: string]: Messages }> {
    const { messages } = await import(`@/locales/${locale}.po`);
    return {
      [locale]: messages,
    };
  }

  const catalogs = await Promise.all(locales.map(loadCatalog));

  const messages = catalogs.reduce((acc, oneCatalog) => {
    Object.assign(acc, oneCatalog);
    return acc;
  }, {});

  type AllI18nInstances = { [K in string]: I18n };

  const instances: AllI18nInstances = locales.reduce((acc, locale) => {
    const message = messages[locale] ?? {};
    const i18n = setupI18n({ locale, messages: { [locale]: message } });
    return { ...acc, [locale]: i18n };
  }, {});

  const get = (locale: string) => {
    if (!instances[locale]) {
      console.warn(`No i18n instance found for locale "${locale}"`);
    }

    return instances[locale!] ?? instances["ko"]!;
  };

  const use = (locale: string) => {
    const instance = get(locale);

    setI18n(instance);

    return instance;
  };

  return {
    get,
    use,
  };
}

export const i18n = await initI18n();
