import { dehydrate, QueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import styled from "styled-components";
import { device, Flex } from "ui";
import { getPostListApi } from "../apis/post/apis";
import { usePostListInfiniteQuery } from "../apis/post/hooks";
import { postQueryKeys } from "../apis/post/queryKeys";
import Header from "../components/common/Header/MainHeader";
import PostItem from "../components/post-list/PostItem";

interface PostListProps {}
const PostList: NextPage<PostListProps> = () => {
  const { data } = usePostListInfiniteQuery({});

  const posts = data?.pages.flatMap((page) => page.datas);

  return (
    <>
      <Header />
      <MainContainer>
        <MainInnerContainer>
          <Flex gap={36} fullWidth>
            <Flex gap={48} direction="column" fullWidth>
              {posts?.map((post, index) => (
                <PostItem key={index} {...post} />
              ))}
            </Flex>
          </Flex>
        </MainInnerContainer>
      </MainContainer>
    </>
  );
};

export default PostList;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    postQueryKeys.postList(10, 0),
    ({ pageParam = 0 }) =>
      getPostListApi({
        limit: 10,
        page: pageParam,
      })
  );

  return {
    props: {
      dehydrateState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const Container = styled.div``;

const MainContainer = styled.main`
  max-width: 780px;
  margin: 0 auto;
`;

const MainInnerContainer = styled.div`
  padding: 40px;

  @media ${device.tablet} {
    padding: 20px;
  }
`;

const CategoryContainer = styled.div`
  width: 480px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 4px;
  height: 90vh;
  position: sticky;
  top: 70px;

  @media ${device.tablet} {
    display: none;
  }
`;
