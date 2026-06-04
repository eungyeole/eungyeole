import { createFileRoute, notFound } from "@tanstack/react-router";
import { getArticleComponent, getArticleMetadata } from "@/utils/article";

export const Route = createFileRoute("/$lang/article/$")({
  loader: ({ params }) => {
    const metadata = getArticleMetadata(params._splat ?? "");

    if (!metadata) {
      throw notFound();
    }

    return metadata;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }, { name: "description", content: loaderData.description }] : [],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const metadata = Route.useLoaderData();
  const Article = getArticleComponent(metadata.slug);

  return (
    <>
      <h1>{metadata.title}</h1>
      <span className="text-sm text-gray-500">{metadata.createdAt}</span>
      {Article && <Article />}
    </>
  );
}
