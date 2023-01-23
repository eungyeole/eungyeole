import dayjs from "dayjs";
import { SerializedEditorState } from "lexical";
import Image from "next/image";
import styled from "styled-components";
import { device, Flex, Text } from "ui";
import { usePostQuery } from "../../apis/post/hooks";
import Editor from "../common/Editor/Editor";
import Header from "../common/Header/MainHeader";
import { usePostId } from "./hooks";

const PostView = () => {
  const postId = usePostId();

  const { data } = usePostQuery({
    id: postId,
  });

  const { title, content, thumbnailUrl, createdAt } = data!;

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
