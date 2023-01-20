import client, { Post } from "database";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import { Flex, Text } from "ui";
import Header from "../../components/Header";

interface PostPageProps {
  post: Post;
}
const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const { title, thumbnailUrl, createdAt } = post;
  return (
    <>
      <Header />
      <PostContainer>
        <PostContainerInner>
          <Flex direction="column" padding="80px 0 0" fullWidth gap={40}>
            <Flex gap={16} direction="column" align="center" fullWidth>
              <Text size="xxxxlarge" color="#444" weight="medium">
                {title}
              </Text>
              <Text>{createdAt}</Text>
            </Flex>
            {thumbnailUrl && (
              <PostThumbnail>
                <Image src={thumbnailUrl} fill alt={`${title}-img`} />
              </PostThumbnail>
            )}
          </Flex>
        </PostContainerInner>
      </PostContainer>
      {/* {post.title} */}
    </>
  );
};

export default PostPage;

const PostContainer = styled.div`
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
`;

const PostContainerInner = styled.div`
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
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
      post,
    },
  };
};
