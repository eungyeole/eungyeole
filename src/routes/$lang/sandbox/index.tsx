import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { Card, CardCaption } from "@/components/sandbox/card";
import { getAllSandboxMetadata, getSandboxPreview, resolveSandboxText } from "@/utils/sandbox";

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

  return (
    <div>
      <h1 className="sr-only">Sandbox</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {entries.map((entry) => {
          const Preview = getSandboxPreview(entry.slug);
          const title = resolveSandboxText(entry.title, lang);
          const description = resolveSandboxText(entry.description, lang);

          return (
            <Card
              id={entry.slug}
              className={entry.layout === "wide" ? "scroll-mt-8 sm:col-span-2" : "scroll-mt-8"}
              key={entry.slug}
              preview={Preview ? <Preview /> : <GenericPreview />}
              previewClassName="p-0"
            >
              <CardCaption
                description={description}
                link={
                  <Link
                    to="/$lang/sandbox/$"
                    params={{ lang, _splat: entry.slug }}
                    className="outline-none hover:underline focus-visible:underline"
                  >
                    {title}
                  </Link>
                }
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function GenericPreview() {
  return (
    <div className="flex min-h-60 w-full items-center justify-center bg-accent-soft p-6">
      <div className="flex w-full max-w-xs items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-muted text-muted">
          <FileText aria-hidden="true" className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
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
