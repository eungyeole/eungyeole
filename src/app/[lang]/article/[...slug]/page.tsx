import { getAllArticlesMetadata, getArticleMetadata } from "@/utils/article";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const paramsToSlug = async (params: Promise<{ slug: string | string[] }>) => {
  const { slug } = await params;

  return Array.isArray(slug) ? slug.join("/") : slug;
};

const getArticleMetadataWithNotFound = async (slug: string) => {
  try {
    const metadata = await getArticleMetadata(slug);
    return metadata;
  } catch (error) {
    notFound();
  }
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const slug = await paramsToSlug(params);

  const metadata = await getArticleMetadataWithNotFound(slug);

  const Article = dynamic(() => import(`@/articles/${slug}.mdx`));

  return (
    <>
      <h1>{metadata.title}</h1>
      <span className="text-sm text-gray-500">{metadata.createdAt}</span>
      <Article />
    </>
  );
}
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) => {
  const slug = await paramsToSlug(params);

  const metadata = await getArticleMetadataWithNotFound(slug);

  return {
    title: metadata.title,
    description: metadata.description,
  };
};

export const generateStaticParams = async () => {
  const articles = await getAllArticlesMetadata();

  console.log(articles.map((article) => article.slug));
  return articles.map((article) => {
    const slug = article.slug.split("/");

    return slug.map((s) => ({
      slug: s,
    }));
  });
};
