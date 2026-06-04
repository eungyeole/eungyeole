import type { ComponentType } from "react";

interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
}

interface ArticleModule {
  default: ComponentType<Record<string, unknown>>;
  metadata?: Omit<ArticleMetadata, "slug">;
}

const modules = import.meta.glob<ArticleModule>("../articles/**/*.mdx", {
  eager: true,
});

const articles = new Map(
  Object.entries(modules).map(([path, module]) => {
    const slug = path.replace("../articles/", "").replace(/\.mdx$/, "");

    return [
      slug,
      {
        component: module.default,
        metadata: { slug, ...module.metadata },
      },
    ];
  }),
);

export const getArticleMetadata = (slug: string): ArticleMetadata | null => {
  const article = articles.get(slug);

  if (!article?.metadata.title) {
    return null;
  }

  return article.metadata as ArticleMetadata;
};

export const getArticleComponent = (slug: string) => articles.get(slug)?.component ?? null;

export const getAllArticlesMetadata = (): ArticleMetadata[] =>
  [...articles.keys()]
    .map((slug) => getArticleMetadata(slug))
    .filter((metadata): metadata is ArticleMetadata => metadata !== null);
