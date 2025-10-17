// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "ko"] as const;
const DEFAULT_LOCALE = "ko";
const LOCALE_COOKIE = "NEXT_LOCALE";

export function proxy(request: NextRequest) {
  const { nextUrl, cookies, headers } = request;
  const { pathname } = nextUrl;

  if (hasLocalePrefix(pathname)) {
    const locale = pathname.split("/")[1];
    return addLocaleCookie(request, NextResponse.next(), locale);
  }

  const cookieLocale = cookies.get(LOCALE_COOKIE)?.value;
  const headerLocale = headers
    .get("Accept-Language")
    ?.split(",")[0]
    ?.split("-")[0];
  const locale =
    (cookieLocale && LOCALES.includes(cookieLocale as any) && cookieLocale) ||
    (headerLocale && LOCALES.includes(headerLocale as any) && headerLocale) ||
    DEFAULT_LOCALE;

  const url = nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(url);

  return addLocaleCookie(request, response, locale);
}

function hasLocalePrefix(pathname: string) {
  return LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

function addLocaleCookie(
  request: NextRequest,
  response: NextResponse,
  locale: string
) {
  if (request.cookies.get(LOCALE_COOKIE)?.value !== locale) {
    response.cookies.set(LOCALE_COOKIE, locale, { sameSite: "strict" });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
};
