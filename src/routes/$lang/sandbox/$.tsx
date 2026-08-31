import { createFileRoute, Link, notFound } from "@tanstack/react-router";
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
  const visitLabel = lang === "en" ? "Visit project" : "프로젝트 보기";
  const sourceLabel = lang === "en" ? "View source" : "소스 보기";

  if (!Content) {
    return null;
  }

  return (
    <article className="w-full">
      <nav aria-label={backLabel} className="mb-8">
        <Link
          to="/$lang/sandbox"
          params={{ lang }}
          className="group inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700 dark:hover:text-gray-300"
        >
          <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          {backLabel}
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-lg font-medium">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">{description}</p>

        {metadata.href || metadata.source ? (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {metadata.href ? (
              <a
                href={metadata.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-dashed border-gray-500"
              >
                {visitLabel} ↗
              </a>
            ) : null}
            {metadata.source && metadata.source !== metadata.href ? (
              <a
                href={metadata.source}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-dashed border-gray-500"
              >
                {sourceLabel} ↗
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
