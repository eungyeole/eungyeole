import client from "database";
import PostView from "../../../components/posts";
import { ResponsePost } from "../../../dto/post";

interface PageProps {
  params: {
    postId: string;
  };
}

async function Page({ params }: PageProps) {
  const post = await getData(params.postId);

  return (
    <>
      <PostView post={post} />
    </>
  );
}

export default Page;

const getData = async (id: string) => {
  const post = await client.post.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return new ResponsePost(post);
};
