import Link from "next/link";
import { lang } from "next/root-params";
import { getAllArticlesMetadata } from "@/utils/article";

export default async function Article() {
  const resolveLang = await lang();
  const articles = await getAllArticlesMetadata();

  return (
    <div className="flex flex-col gap-4">
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/${resolveLang}/article/${article.slug}`}
          className="flex flex-col gap-0.5 w-full rounded-md p-3 -mx-3 hover:bg-neutral-200"
        >
          {article.title}
          <span className="text-sm text-gray-500">{article.description}</span>
        </Link>
      ))}
    </div>
  );
}
