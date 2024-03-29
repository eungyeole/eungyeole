"use client";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";
import { device, Flex, Text } from "ui";
import { ResponsePost } from "../../dto/post";

interface PostItemProps extends ResponsePost {}

const PostItem: FC<PostItemProps> = ({
  slug,
  thumbnailUrl,
  title,
  description,
  categories,
  createdAt,
}) => (
  <Link href={`/posts/${slug}`}>
    <PostContainer gap={20} fullWidth direction="column">
      {thumbnailUrl && (
        <ThumbnailWrapper>
          <Image fill src={thumbnailUrl} alt={`${title}-썸네일`} />
        </ThumbnailWrapper>
      )}
      <TextWrapper gap={10} direction="column" fullWidth>
        {categories.length > 0 && (
          <Text color="gray600" size="xsmall">
            {categories.join(", ")}
          </Text>
        )}
        <Text
          className="title"
          color="currentColor"
          size="xxlarge"
          weight="medium"
        >
          {title}
        </Text>
        {description && (
          <Text className="description" color="gray700" size="medium">
            {description}
          </Text>
        )}
        <Text color="gray600" className="createdAt" size="small">
          {dayjs(createdAt).format("YYYY.MM.DD")}
        </Text>
      </TextWrapper>
    </PostContainer>
  </Link>
);

export default PostItem;

const ThumbnailWrapper = styled.div`
  width: 100%;
  padding-bottom: 66%;
  background-color: ${({ theme }) => theme.colors.gray100};
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
  color: ${({ theme }) => theme.colors.gray800};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};

    & ${ThumbnailWrapper} {
      transform: translate3D(0, -3%, 0);
      box-shadow: rgb(0 0 33 / 7%) 0px 16px 22.4px 4.8px,
        rgb(0 0 33 / 5%) 0px 3.2px 16px 0px, rgb(0 0 33 / 7%) 0px 0px 1px 0px;
    }
  }
`;

const TextWrapper = styled(Flex)`
  & .description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media ${device.tablet} {
    & .title {
      font-size: ${({ theme }) => theme.fonts.sizes.large};
    }

    & .createdAt {
      font-size: ${({ theme }) => theme.fonts.sizes.xsmall};
    }
  }
`;
