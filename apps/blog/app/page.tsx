import { Button } from "ui";
import Header from "../components/common/Header";
import client from "database";
import { ResponsePostList } from "../dto/post";
import PostItem from "../components/post-list/PostItem";
import PostListPageView from "../components/post-list";

async function Page() {
  const { datas } = await getData();

  return (
    <>
      <PostListPageView posts={datas} />
    </>
  );
}

export default Page;

const getData = async (limit: number = 10, page: number = 0) => {
  const posts = await client.post.findMany({
    take: limit,
    skip: page,
  });

  return new ResponsePostList(1, limit, page, posts);
};
