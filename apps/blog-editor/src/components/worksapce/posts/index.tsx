import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import { getWorkspacePostsApi } from "src/apis/workspace/apis";
import { workspaceQueryKeys } from "src/apis/workspace/queryKeys";
import styled from "styled-components";
import { Button, Flex, Icon, Text } from "ui";
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
    }
  );

  return (
    <Flex direction="column" fullHeight fullWidth>
      <Header />
      <Container>
        <ContentContainer>
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
          {data?.posts?.map((post) => (
            <Text key={post.id}>{post.title}</Text>
          ))}
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

const ContentContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 24px;
`;
