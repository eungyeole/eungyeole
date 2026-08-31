import { createRootRoute, HeadContent, Scripts, useParams } from "@tanstack/react-router";
import { IconEungyeole } from "@/components/assets/icon-eungyeole";
// 렌더 블로킹 CSS 요청(1 RTT)을 없애기 위해 인라인으로 포함한다.
import globalsCss from "@/styles/globals.css?inline";
import { DEFAULT_LOCALE, isLocale } from "@/utils/i18n/i18n";

const SITE_URL = "https://www.eungyeole.com";
const SITE_TITLE = "안은결 — Frontend Engineer";
const SITE_DESCRIPTION = "프론트엔드 엔지니어 안은결의 제품, 인터페이스 실험과 기술 메모를 모은 포트폴리오입니다.";
const SITE_IMAGE = `${SITE_URL}/eungyeole.png`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_TITLE },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: SITE_IMAGE },
      { property: "og:image:width", content: "1024" },
      { property: "og:image:height", content: "1024" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: SITE_IMAGE },
    ],
    styles: [{ children: globalsCss }],
    links: [{ rel: "icon", href: "/favicon.ico" }],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  const { lang } = useParams({ strict: false });

  return (
    <html lang={isLocale(lang) ? lang : DEFAULT_LOCALE}>
      <head>
        <HeadContent />
      </head>
      <body className="relative mx-auto min-h-screen max-w-[800px] px-5 py-8 antialiased sm:px-8 sm:py-14">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <div className="z-50 fixed inset-0 bg-background text-base flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <IconEungyeole width={50} height={50} />
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">404 Not Found</h1>
          <p className="text-sm text-gray-500">The page you are looking for does not exist.</p>
        </div>
      </div>
    </div>
  );
}
