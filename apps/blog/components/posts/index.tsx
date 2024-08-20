"use client";
import dayjs from "dayjs";
import styled from "styled-components";
import { device, Flex, Text } from "ui";
import Header from "../common/header";
import { ResponsePost } from "../../dto/post";

import PostRender from "../common/post-render";
import Image from "next/image";

interface PostViewProps {
  post: ResponsePost;
}

const PostView = ({ post }: PostViewProps) => {
  const { title, content, thumbnailUrl, createdAt } = post!;

  return (
    <>
      <Header />
      <PostContainer>
        <PostContainerInner>
          <Flex direction="column" padding="80px 0 0" fullWidth gap={40}>
            <Flex gap={16} direction="column" align="center" fullWidth>
              <Text
                align="center"
                className="title"
                size="xxxlarge"
                weight="medium"
              >
                {title}
              </Text>
              <Text color="gray600">
                작성일: {dayjs(createdAt).format("YYYY.MM.DD")}
              </Text>
            </Flex>
            {thumbnailUrl && (
              <PostThumbnail>
                <Image src={thumbnailUrl} fill alt={`${title}-img`} />
              </PostThumbnail>
            )}

            <PostRender content={content} />
          </Flex>
        </PostContainerInner>
      </PostContainer>
    </>
  );
};

export default PostView;

const PostContainer = styled.div`
  max-width: 760px;
  width: 100%;
  margin: 0 auto;
`;

const PostContainerInner = styled.div`
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;

  @media ${device.tablet} {
    & .title {
      font-size: ${({ theme }) => theme.fonts.sizes.xxxlarge};
    }
  }
`;

const PostThumbnail = styled.div`
  position: relative;

  width: 100%;
  padding-bottom: 66%;

  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 16px;
  overflow: hidden;

  & img {
    object-fit: cover;
  }
`;
