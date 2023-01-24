import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import PostListPageView from "src/components/post-list";
import { getPostListApi } from "../../apis/post/apis";
import { postQueryKeys } from "../../apis/post/queryKeys";

interface PostListProps {
  page: number;
}
const PostList: NextPage<PostListProps> = ({ page }) => {
  return <PostListPageView page={page} />;
};

export default PostList;

export const getServerSideProps: GetServerSideProps<PostListProps> = async (
  ctx
) => {
  const page = Number(ctx.query.page);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(postQueryKeys.postList(10, page), () =>
    getPostListApi({
      page,
      limit: 10,
    })
  );

  return {
    props: {
      dehydrateState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      page,
    },
  };
};
