import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Code2 } from "lucide-react";
import { getSandboxComponent, getSandboxMetadata, resolveSandboxText } from "@/utils/sandbox";

export const Route = createFileRoute("/$lang/sandbox/$")({
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
  const backLabel = lang === "en" ? "Back to Sandbox" : "Sandbox로 돌아가기";
  const kindLabel = {
    project: "Project",
    experiment: "Experiment",
    note: "Note",
  }[metadata.kind];
  const visitLabel = lang === "en" ? "Visit project" : "프로젝트 보기";
  const sourceLabel = lang === "en" ? "View source" : "소스 보기";

  if (!Content) {
    return null;
  }

  return (
    <article className="mx-auto w-full max-w-2xl">
      <nav aria-label={backLabel} className="mb-10">
        <Link
          to="/$lang/sandbox"
          params={{ lang }}
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          {backLabel}
        </Link>
      </nav>

      <header className="mb-10 border-b border-border pb-9">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">
          <span>{kindLabel}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={metadata.createdAt}>{metadata.createdAt}</time>
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">{title}</h1>
        <p className="mt-4 text-base leading-7 text-muted">{description}</p>

        {metadata.tags?.length ? (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tags">
            {metadata.tags.map((tag) => (
              <li className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        {metadata.href || metadata.source ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {metadata.href ? (
              <a
                href={metadata.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[12px] font-semibold text-accent-foreground outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent"
              >
                {visitLabel}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            ) : null}
            {metadata.source && metadata.source !== metadata.href ? (
              <a
                href={metadata.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[12px] font-semibold text-muted outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Code2 aria-hidden="true" className="size-3.5" />
                {sourceLabel}
              </a>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="article-prose [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_li]:my-1 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6">
        <Content />
      </div>
    </article>
  );
}
