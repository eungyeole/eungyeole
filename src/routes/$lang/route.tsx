import { I18nProvider } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation/navigation";
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
      <header className="flex items-start justify-between gap-6">
        <Link to="/$lang" params={{ lang }} className="group flex min-w-0 flex-col gap-0.5">
          <span className="text-[15px] font-semibold tracking-[-0.01em] transition-colors group-hover:text-accent">
            <Trans>안은결</Trans>
          </span>
          <span className="text-[13px] font-medium text-muted">Frontend Engineer</span>
        </Link>
        <div className="shrink-0">
          <Navigation lang={lang} />
        </div>
      </header>
      <main className="mt-12 sm:mt-16">
        <Outlet />
      </main>
      <Footer />
    </I18nProvider>
  );
}
