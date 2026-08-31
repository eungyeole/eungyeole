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
    <div className="pb-16 sm:pb-24">
      <section className="max-w-2xl space-y-5 py-4 sm:py-8">
        {content.intro.map((paragraph) => (
          <p
            key={paragraph}
            className="text-xl leading-[1.65] font-medium tracking-[-0.018em] text-foreground sm:text-2xl"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-14 border-t border-border sm:mt-20">
        <div className="grid gap-3 border-b border-border py-5 sm:grid-cols-[8rem_1fr] sm:items-center">
          <h2 className="text-xs font-medium tracking-[0.12em] text-subtle uppercase">{content.currently}</h2>
          <a
            href="https://www.greetinghr.com"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>
              <span className="block text-sm font-medium text-foreground">{content.role}</span>
              <span className="mt-0.5 block text-sm text-muted">{content.company}</span>
            </span>
            <span
              aria-hidden="true"
              className="text-sm text-subtle transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            >
              ↗
            </span>
          </a>
        </div>
      </section>

      <section className="mt-16 sm:mt-24" aria-labelledby="selected-work">
        <div className="mb-5 flex items-end justify-between gap-6">
          <div>
            <h2 id="selected-work" className="text-sm font-semibold tracking-[-0.01em] text-foreground">
              {content.selected}
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted">{content.selectedDescription}</p>
          </div>
          <span className="hidden font-mono text-[11px] text-subtle sm:block">
            01—{String(selectedEntries.length).padStart(2, "0")}
          </span>
        </div>

        <div className="border-t border-border">
          {selectedEntries.map((entry, index) => (
            <Link
              key={entry.slug}
              to="/$lang/sandbox/$"
              params={{ lang, _splat: entry.slug }}
              className="group -mx-3 grid gap-2 border-b border-border px-3 py-5 outline-none transition-colors duration-200 hover:bg-surface-muted focus-visible:bg-surface-muted sm:grid-cols-[2rem_11rem_1fr_auto] sm:items-baseline sm:gap-4"
            >
              <span className="hidden font-mono text-[11px] tabular-nums text-subtle sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium text-foreground">{resolveSandboxText(entry.title, lang)}</span>
              <span className="text-sm leading-6 text-muted">{resolveSandboxText(entry.description, lang)}</span>
              <span
                aria-hidden="true"
                className="self-center text-sm text-subtle transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-accent"
              >
                →
              </span>
            </Link>
          ))}
        </div>

        <Link
          to="/$lang/sandbox"
          params={{ lang }}
          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted outline-none transition-colors hover:text-accent focus-visible:text-accent"
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
