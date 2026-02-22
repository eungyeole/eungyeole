import { readdir } from "fs/promises";
import path from "path";

interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
}

export const getArticleMetadata = async (
  slug: string
): Promise<ArticleMetadata> => {
  "use cache";
  const article = await import(`@/articles/${slug}.mdx`);

  if (!article?.metadata) {
    throw new Error(`Article ${slug} not found`);
  }

  return {
    slug,
    ...article.metadata,
  };
};

export const getAllArticlesMetadata = async () => {
  "use cache";
  const dir = path.join(process.cwd(), "src/articles");
  const files = await readdir(dir, { recursive: true });

  const slugs = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));

  const articles = await Promise.all(
    slugs.map(async (slug) => {
      return await getArticleMetadata(slug);
    })
  );

  return articles;
};
