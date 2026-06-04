import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { isLocale } from "@/utils/i18n/i18n";
import { detectLocale } from "@/utils/i18n/locale";

/**
 * 로케일 프리픽스가 없는 경로를 감지된 로케일로 리다이렉트한다.
 * (기존 Next.js proxy 미들웨어의 리다이렉트 로직)
 */
export const Route = createFileRoute("/$")({
  beforeLoad: async ({ params }) => {
    const splat = params._splat ?? "";
    const [first] = splat.split("/");

    // 이미 로케일 프리픽스가 있거나 정적 파일 경로(`.` 포함)라면
    // 존재하지 않는 페이지다.
    if (isLocale(first) || splat.split("/").at(-1)?.includes(".")) {
      throw notFound();
    }

    const locale = await detectLocale();

    throw redirect({ href: `/${locale}/${splat}` });
  },
  component: () => null,
});
