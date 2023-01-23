import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();
  const postId = ctx.params?.postId as string;

  try {
    await queryClient.fetchQuery(postQueryKeys.post(postId), async () =>
      getPostApi(postId)
    );

    return {
      props: {
        dehydrateState: dehydrate(queryClient),
      },
      revalidate: 60,
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
