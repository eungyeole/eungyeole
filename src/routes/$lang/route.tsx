import { I18nProvider } from "@lingui/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { DynamicHeader } from "@/components/header/dynamic-header";
import { getI18n, isLocale } from "@/utils/i18n/i18n";
import { detectLocale, persistLocale } from "@/utils/i18n/locale";

export const Route = createFileRoute("/$lang")({
  beforeLoad: async ({ params, location }) => {
    // 로케일이 아닌 첫 세그먼트(`/article` 등)는 감지된 로케일을 붙여 리다이렉트한다.
    if (!isLocale(params.lang)) {
      const locale = await detectLocale();

      throw redirect({ href: `/${locale}${location.pathname}` });
    }

    await persistLocale({ data: params.lang });
  },
  component: LangLayout,
});

function LangLayout() {
  const { lang } = Route.useParams();
  const i18n = getI18n(lang);

  return (
    <I18nProvider i18n={i18n}>
      <DynamicHeader lang={lang} />
      <main className="mt-8">
        <Outlet />
      </main>
      <Footer />
    </I18nProvider>
  );
}
