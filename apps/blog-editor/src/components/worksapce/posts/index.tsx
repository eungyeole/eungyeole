import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import { getWorkspacePostsApi } from "src/apis/workspace/apis";
import { workspaceQueryKeys } from "src/apis/workspace/queryKeys";
import styled from "styled-components";
import { Avatar, Button, Flex, Icon, Text } from "ui";
import dayjs from "dayjs";

import Header from "../Header";
import { useWorkspaceId } from "../hooks/useWorkspaceId";

const Posts = () => {
  const workspaceId = useWorkspaceId();

  const { data } = useQuery(
    workspaceQueryKeys.getWorkspacePosts(workspaceId),
    () =>
      getWorkspacePostsApi({
        workspaceId,
      }),
    {
      select: ({ data }) => data,
      cacheTime: 0,
    }
  );

  return (
    <Flex direction="column" fullHeight fullWidth>
      <Header />
      <Container>
        <ContentContainer direction="column" gap={24}>
          <Flex align="center" fullWidth justify="space-between">
            <Text size="xxxlarge" weight="bold">
              Posts
            </Text>
            <Link href={`/workspaces/${workspaceId}/editors/posts`}>
              <Button
                leadingIcon={
                  <Icon>
                    <BiPlus />
                  </Icon>
                }
              >
                New
              </Button>
            </Link>
          </Flex>
          <Flex direction="column">
            {data?.posts?.map((post) => (
              <Link
                key={post.id}
                href={`/workspaces/${workspaceId}/editors/posts?postId=${post.id}`}
              >
                <PostItemContainer
                  fullWidth
                  justify="space-between"
                  align="center"
                >
                  <Flex direction="column" gap={2}>
                    <Text weight="medium">{post.title}</Text>
                    <Flex gap={4}>
                      <Text size="small">{post.status} |</Text>
                      <Text size="small" color="gray600">
                        {dayjs(post.createdAt).format("YYYY-MM-DD")}
                      </Text>
                    </Flex>
                  </Flex>
                  <Avatar
                    variant="circle"
                    size="small"
                    name={post.writerName}
                  />
                </PostItemContainer>
              </Link>
            ))}
          </Flex>
        </ContentContainer>
      </Container>
    </Flex>
  );
};

export default Posts;

const Container = styled(Flex)`
  height: calc(100vh - 55px);
`;

const SideBar = styled.div`
  width: 260px;
  min-width: 260px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const ContentContainer = styled(Flex)`
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 24px;
`;

const PostItemContainer = styled(Flex)`
  box-sizing: border-box;
  padding: 16px 8px;

  border-top: 1px solid ${({ theme }) => theme.colors.gray200};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;
