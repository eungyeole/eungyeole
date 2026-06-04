import { createFileRoute, redirect } from "@tanstack/react-router";
import { detectLocale } from "@/utils/i18n/locale";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const locale = await detectLocale();

    throw redirect({ to: "/$lang", params: { lang: locale } });
  },
});
