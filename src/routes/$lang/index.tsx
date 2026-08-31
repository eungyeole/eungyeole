import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllSandboxMetadata, resolveSandboxText } from "@/utils/sandbox";

export const Route = createFileRoute("/$lang/")({
  loader: () =>
    getAllSandboxMetadata()
      .filter((entry) => entry.featured)
      .slice(0, 3),
  component: Home,
});

const copy = {
  en: {
    intro: [
      "I’m Eungyeol An, a frontend engineer at Doodlin, working on Greeting.",
      "I design and build experiences that feel understandable at a glance and satisfying in use — with care for the small details that make software feel just right.",
    ],
    currently: "Currently",
    role: "Frontend Engineer",
    company: "Doodlin · Greeting",
    selected: "Selected",
    selectedDescription: "A few small explorations in interface and interaction.",
    allSandbox: "Explore the full sandbox",
  },
  ko: {
    intro: [
      "안은결입니다. 두들린에서 프론트엔드 엔지니어로 그리팅을 만들고 있습니다.",
      "사용자가 한눈에 이해하고 쓰는 순간 만족할 수 있는 경험을 설계합니다. 소프트웨어를 기분 좋게 만드는 작지만 중요한 디테일에 집중합니다.",
    ],
    currently: "현재",
    role: "프론트엔드 엔지니어",
    company: "두들린 · 그리팅",
    selected: "선택한 작업",
    selectedDescription: "인터페이스와 인터랙션에 관한 작은 탐구들입니다.",
    allSandbox: "샌드박스 전체 보기",
  },
} as const;

function Home() {
  const { lang } = Route.useParams();
  const selectedEntries = Route.useLoaderData();
  const content = lang === "en" ? copy.en : copy.ko;

  return (
    <div>
      <section className="max-w-xl space-y-4">
        {content.intro.map((paragraph) => (
          <p key={paragraph} className="text-base leading-7">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="mb-2 text-sm font-medium">{content.currently}</h2>
        <a
          href="https://www.greetinghr.com"
          target="_blank"
          rel="noreferrer"
          className="group -mx-3 flex items-center justify-between gap-4 rounded-md p-3 transition-colors hover:bg-neutral-200 focus-visible:bg-neutral-200 dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800"
        >
          <span>
            <span className="block text-sm font-medium">{content.role}</span>
            <span className="mt-0.5 block text-sm text-gray-500">{content.company}</span>
          </span>
          <span aria-hidden="true" className="text-sm text-gray-400 transition-transform group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </section>

      <section className="mt-10" aria-labelledby="selected-work">
        <div className="mb-2">
          <h2 id="selected-work" className="text-sm font-medium">
            {content.selected}
          </h2>
          <p className="mt-0.5 text-sm text-gray-500">{content.selectedDescription}</p>
        </div>

        <div className="flex flex-col gap-1">
          {selectedEntries.map((entry, index) => (
            <Link
              key={entry.slug}
              to="/$lang/sandbox/$"
              params={{ lang, _splat: entry.slug }}
              className="group -mx-3 flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-neutral-200 focus-visible:bg-neutral-200 dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800"
            >
              <span className="w-5 shrink-0 font-mono text-[11px] tabular-nums text-gray-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{resolveSandboxText(entry.title, lang)}</span>
                <span className="mt-0.5 block text-sm text-gray-500">
                  {resolveSandboxText(entry.description, lang)}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-sm text-gray-400 transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          ))}
        </div>

        <Link
          to="/$lang/sandbox"
          params={{ lang }}
          className="group mt-4 inline-flex items-center gap-2 border-b border-dashed border-gray-400 text-sm text-gray-500"
        >
          {content.allSandbox}
          <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-1">
            →
          </span>
        </Link>
      </section>
    </div>
  );
}
