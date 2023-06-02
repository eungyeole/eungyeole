import client from "database";
import PostView from "../../../components/posts";
import { ResponsePost } from "../../../dto/post";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

async function Page({ params }: PageProps) {
  const post = await getData(params.slug);

  return (
    <>
      <PostView post={post} />
    </>
  );
}

export default Page;

const getData = async (slug: string) => {
  try {
    const post = await client.post.findUniqueOrThrow({
      where: {
        slug,
      },
    });

    return new ResponsePost(post);
  } catch (error) {
    notFound();
  }
};
