"use client";
import { FC } from "react";
import styled from "styled-components";
import { device, Flex } from "ui";

import PostItem from "../../components/post-list/PostItem";
import Header from "../common/Header";
import { ResponsePost } from "../../dto/post";

interface PostListProps {
  posts: ResponsePost[];
}
const PostListPageView: FC<PostListProps> = ({ posts }) => {
  return (
    <>
      <Header />
      <MainContainer>
        <MainInnerContainer>
          <Flex gap={36} fullWidth>
            <Flex gap={48} direction="column" fullWidth>
              {posts?.map((post) => (
                <PostItem key={post.id} {...post} />
              ))}
            </Flex>
          </Flex>
        </MainInnerContainer>
      </MainContainer>
    </>
  );
};

export default PostListPageView;

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
