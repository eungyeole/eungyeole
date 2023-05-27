import client from "database";
import { ResponsePostList } from "../dto/post";
import PostListPageView from "../components/post-list";
import { Metadata } from "next";

const title = "안은결 | Blog";
const description =
  "안녕하세요 Frontend 개발자 안은결입니다. 이 블로그는 개발하면서 겪었던 이슈들을 정리하고, 공유하기 위해 만들어졌습니다.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "안은결",
    "개발자",
    "Frontend",
    "Engineer",
    "Blog",
    "블로그",
    "프론트엔드",
    "eungyeole",
  ],
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
  other: {
    "naver-site-verification": "5e76f2696f98b6fb7b547a41a96f55bf56a4d1c6",
  },
};

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
