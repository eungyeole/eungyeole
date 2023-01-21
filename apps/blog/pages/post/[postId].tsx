import client, { Post } from "database";
import dayjs from "dayjs";
import { SerializedEditorState } from "lexical";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import { device, Flex, Text } from "ui";
import Editor from "../../components/common/Editor/Editor";
import Header from "../../components/common/Header/MainHeader";

interface PostPageProps {
  post: Post;
}
const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const { title, thumbnailUrl, createdAt, content } = post;
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
                size="xxxxlarge"
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
            <Editor
              defaultValue={content as unknown as SerializedEditorState}
              readOnly
            />
          </Flex>
        </PostContainerInner>
      </PostContainer>
    </>
  );
};

export default PostPage;

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postId = ctx.query.postId as string;

  const post = await client.post.findFirst({
    where: {
      id: postId,
    },
  });

  return {
    props: {
      post: {
        ...post,
        createdAt: dayjs(post?.createdAt).toISOString(),
      },
    },
  };
};
