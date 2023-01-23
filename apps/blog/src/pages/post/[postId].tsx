import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { getPostApi } from "../../apis/post/apis";
import { postQueryKeys } from "../../apis/post/queryKeys";
import PostView from "../../components/post";

interface PostPageProps {}
const PostPage: NextPage<PostPageProps> = () => {
  return (
    <>
      <PostView />
    </>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const postId = ctx.query.postId as string;

  try {
    await queryClient.fetchQuery(postQueryKeys.post(postId), async () =>
      getPostApi(postId)
    );

    return {
      props: {
        dehydrateState: dehydrate(queryClient),
      },
    };
  } catch (e) {
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };
  }
};
