import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { Card, CardCaption } from "@/components/sandbox/card";
import { getAllSandboxMetadata, getSandboxPreview, resolveSandboxText, type SandboxKind } from "@/utils/sandbox";

const copy = {
  en: {
    title: "Sandbox",
    intro: "A home for finished products, tools in progress, interface experiments, and short technical notes.",
    kinds: { project: "Project", experiment: "Experiment", note: "Note" },
    openExternal: "Open external link",
  },
  ko: {
    title: "Sandbox",
    intro: "완성한 제품, 만드는 중인 도구, 인터페이스 실험과 짧은 기술 메모를 한곳에 모았습니다.",
    kinds: { project: "Project", experiment: "Experiment", note: "Note" },
    openExternal: "외부 링크 열기",
  },
} as const;

export const Route = createFileRoute("/$lang/sandbox/")({
  loader: () => getAllSandboxMetadata(),
  head: ({ params }) => {
    const isEnglish = params.lang === "en";
    const description = isEnglish
      ? "Products, interface experiments, and technical notes by Eungyeol An."
      : "안은결의 제품, 인터페이스 실험과 기술 메모를 모은 공간입니다.";

    return {
      meta: [
        { title: `Sandbox — ${isEnglish ? "Eungyeol An" : "안은결"}` },
        { name: "description", content: description },
      ],
    };
  },
  component: Sandbox,
});

function Sandbox() {
  const { lang } = Route.useParams();
  const entries = Route.useLoaderData();
  const content = lang === "en" ? copy.en : copy.ko;

  return (
    <div>
      <header className="max-w-xl">
        <h1 className="text-lg font-medium">{content.title}</h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">{content.intro}</p>
        <p className="mt-2 text-xs text-gray-400">{formatCollectionCount(entries, lang)}</p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {entries.map((entry) => {
          const Preview = getSandboxPreview(entry.slug);
          const title = resolveSandboxText(entry.title, lang);
          const description = resolveSandboxText(entry.description, lang);

          return (
            <Card
              id={entry.slug}
              className={entry.layout === "wide" ? "scroll-mt-8 sm:col-span-2" : "scroll-mt-8"}
              key={entry.slug}
              preview={Preview ? <Preview /> : <GenericPreview kind={entry.kind} />}
              previewClassName="p-0"
            >
              <CardCaption
                eyebrow={`${content.kinds[entry.kind]} · ${entry.createdAt.slice(0, 4)}`}
                description={description}
                link={
                  <span className="flex items-center justify-between gap-3">
                    <Link
                      to="/$lang/sandbox/$"
                      params={{ lang, _splat: entry.slug }}
                      className="group/title inline-flex min-w-0 items-center gap-2 outline-none transition-colors hover:text-accent focus-visible:text-accent"
                    >
                      <span className="truncate">{title}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 shrink-0 transition-transform duration-200 group-hover/title:translate-x-0.5"
                      />
                    </Link>
                    {entry.href ? (
                      <a
                        aria-label={`${title}: ${content.openExternal}`}
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-md p-1 text-subtle outline-none transition-colors hover:text-accent focus-visible:text-accent"
                      >
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </a>
                    ) : null}
                  </span>
                }
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function formatCollectionCount(entries: ReturnType<typeof getAllSandboxMetadata>, lang: string) {
  const counts: Record<SandboxKind, number> = { project: 0, experiment: 0, note: 0 };

  for (const entry of entries) {
    counts[entry.kind] += 1;
  }

  if (lang === "en") {
    const withPlural = (count: number, singular: string) => `${count} ${singular}${count === 1 ? "" : "s"}`;

    return [
      withPlural(counts.project, "project"),
      withPlural(counts.experiment, "experiment"),
      withPlural(counts.note, "note"),
    ].join(" · ");
  }

  return `프로젝트 ${counts.project} · 실험 ${counts.experiment} · 기술 메모 ${counts.note}`;
}

function GenericPreview({ kind }: { kind: SandboxKind }) {
  return (
    <div className="flex min-h-60 w-full items-center justify-center bg-accent-soft p-6">
      <div className="flex w-full max-w-xs items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-muted text-muted">
          <FileText aria-hidden="true" className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-subtle">{kind}</p>
          <div className="mt-2 space-y-2" aria-hidden="true">
            <span className="block h-2 w-2/3 rounded-full bg-foreground/20" />
            <span className="block h-2 w-full rounded-full bg-foreground/10" />
            <span className="block h-2 w-4/5 rounded-full bg-foreground/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
