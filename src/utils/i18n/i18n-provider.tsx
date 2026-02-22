"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
};

/**
 * @see https://lingui.dev/tutorials/react-rsc#setup-with-server-components
 */
export function I18nClientProvider({ children, locale, messages }: Props) {
  const [i18n] = useState(() => {
    return setupI18n({
      locale,
      messages: { [locale]: messages },
    });
  });
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
