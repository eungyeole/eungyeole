import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader, setCookie } from "@tanstack/react-start/server";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from "./i18n";

/**
 * 쿠키 → Accept-Language → 기본값 순서로 로케일을 결정한다.
 * (기존 Next.js proxy 미들웨어의 로케일 감지 로직)
 */
export const detectLocale = createServerFn().handler(async (): Promise<Locale> => {
  const cookieLocale = getCookie(LOCALE_COOKIE);
  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const headerLocale = getRequestHeader("accept-language")?.split(",")[0]?.split("-")[0];
  if (isLocale(headerLocale)) {
    return headerLocale;
  }

  return DEFAULT_LOCALE;
});

/**
 * 현재 방문 중인 로케일을 쿠키에 저장한다.
 */
export const persistLocale = createServerFn({ method: "POST" })
  .inputValidator((locale: string) => locale)
  .handler(async ({ data: locale }) => {
    if (!isLocale(locale)) return;

    if (getCookie(LOCALE_COOKIE) !== locale) {
      setCookie(LOCALE_COOKIE, locale, { sameSite: "strict" });
    }
  });
