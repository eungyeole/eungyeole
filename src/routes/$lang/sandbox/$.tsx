import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { ExternalLink, Github } from "lucide-react";
import { getSandboxComponent, getSandboxMetadata, resolveSandboxText } from "@/utils/sandbox";

export const Route = createFileRoute("/$lang/sandbox/$")({
  beforeLoad: ({ params }) => {
    if (params._splat === "penguin-gaze") {
      throw redirect({
        to: "/$lang/sandbox/$",
        params: { lang: params.lang, _splat: "mona-lisa-effect" },
        replace: true,
      });
    }
  },
  loader: ({ params }) => {
    const metadata = getSandboxMetadata(params._splat ?? "");

    if (!metadata) {
      throw notFound();
    }

    return metadata;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [] };

    const title = resolveSandboxText(loaderData.title, params.lang);
    const description = resolveSandboxText(loaderData.description, params.lang);

    return {
      meta: [
        { title: `${title} — Sandbox` },
        { name: "description", content: description },
        { property: "og:type", content: loaderData.kind === "note" ? "article" : "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: SandboxDetail,
});

function SandboxDetail() {
  const { lang } = Route.useParams();
  const metadata = Route.useLoaderData();
  const Content = getSandboxComponent(metadata.slug);
  const title = resolveSandboxText(metadata.title, lang);
  const description = resolveSandboxText(metadata.description, lang);
  const visitLabel = lang === "en" ? "Visit project" : "프로젝트 보기";
  const sourceLabel = lang === "en" ? "View source" : "소스 보기";

  if (!Content) {
    return null;
  }

  return (
    <article aria-labelledby="content-title" className="w-full">
      <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h1 id="content-title" className="text-lg font-medium">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">{description}</p>
        </div>

        {metadata.href || metadata.source ? (
          <div className="flex items-center gap-1">
            {metadata.href ? (
              <a
                href={metadata.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={visitLabel}
                title={visitLabel}
                className="grid size-7 place-items-center rounded-full text-gray-500 transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                <ExternalLink aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </a>
            ) : null}
            {metadata.source && metadata.source !== metadata.href ? (
              <a
                href={metadata.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={sourceLabel}
                title={sourceLabel}
                className="grid size-7 place-items-center rounded-full text-gray-500 transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                <Github aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="article-prose [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_li]:my-1 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6">
        <Content />
      </div>
    </article>
  );
}
