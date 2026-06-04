import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllArticlesMetadata } from "@/utils/article";

export const Route = createFileRoute("/$lang/article/")({
  loader: () => getAllArticlesMetadata(),
  component: Article,
});

function Article() {
  const { lang } = Route.useParams();
  const articles = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      {articles.map((article) => (
        <Link
          key={article.slug}
          to="/$lang/article/$"
          params={{ lang, _splat: article.slug }}
          className="flex flex-col gap-0.5 w-full rounded-md p-3 -mx-3 hover:bg-neutral-200"
        >
          {article.title}
          <span className="text-sm text-gray-500">{article.description}</span>
        </Link>
      ))}
    </div>
  );
}
