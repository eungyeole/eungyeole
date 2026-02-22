import { Trans } from "@lingui/react/macro";
import { lang } from "next/root-params";
import { i18n } from "@/utils/i18n/i18n";

export default async function Home() {
  i18n.use(await lang());

  return (
    <div>
      <div className="h-[1200px] text-base">
        <div>
          <div>
            <h1 className="text-lg font-medium mb-8">🚧 공사중 🚧</h1>
            <Trans>
              <a
                className="border-dashed border-b border-gray-500"
                href="https://www.greetinghr.com"
                target="_blank"
                rel="noopener"
              >
                두들린 (그리팅)
              </a>
              에서 프론트엔드 엔지니어로, 사용자가 한눈에 이해하고 만족할 수
              있는 경험을 설계합니다. 기능을 넘어, ‘쓰는 순간 좋은 느낌’을
              만드는 데 집중하고 있습니다.
            </Trans>
          </div>
        </div>
      </div>
    </div>
  );
}
