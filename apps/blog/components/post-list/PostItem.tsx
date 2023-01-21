import { Post } from "database";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";
import { Flex, Text } from "ui";

interface PostItemProps extends Post {}

const PostItem: FC<PostItemProps> = ({
  id,
  thumbnailUrl,
  title,
  description,
  categories,
  createdAt,
}) => (
  <Link href={`/post/${id}`}>
    <PostContainer gap={20} fullWidth direction="column">
      {thumbnailUrl && (
        <ThumbnailWrapper>
          <Image fill src={thumbnailUrl} alt={`${title}-썸네일`} />
        </ThumbnailWrapper>
      )}
      <Flex gap={10} direction="column" fullWidth>
        {categories.length > 0 && (
          <Text size="xsmall">{categories.join(", ")}</Text>
        )}
        <Text color="currentColor" size="xxlarge" weight="medium">
          {title}
        </Text>
        {description && <Text size="medium">{description}</Text>}
        <Text size="small">{dayjs(createdAt).format("YYYY.MM.DD")}</Text>
      </Flex>
    </PostContainer>
  </Link>
);

export default PostItem;

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 7px;
  transition: 0.2s;
  position: relative;

  & img {
    object-fit: cover;
  }
`;

const PostContainer = styled(Flex)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray900};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};

    & ${ThumbnailWrapper} {
      transform: translateY(-10px);
      box-shadow: 0 30px 30px rgba(0, 0, 0, 0.1);
    }
  }
`;
