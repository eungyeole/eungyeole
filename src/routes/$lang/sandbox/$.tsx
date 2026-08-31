import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
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
  const metadata = Route.useLoaderData();
  const Content = getSandboxComponent(metadata.slug);

  if (!Content) {
    return null;
  }

  return (
    <article aria-labelledby="content-title" className="w-full">
      <div className="article-prose [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_li]:my-1 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6">
        <Content />
      </div>
    </article>
  );
}
