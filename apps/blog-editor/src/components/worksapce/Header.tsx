import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { getWorkspaceApi } from "src/apis/workspace/apis";
import { workspaceQueryKeys } from "src/apis/workspace/queryKeys";
import styled, { css } from "styled-components";
import { Avatar, Button, Flex, Icon, Text } from "ui";
import { useWorkspaceId } from "./hooks/useWorkspaceId";

const tabs = [
  {
    label: "Posts",
    path: "posts",
  },
  {
    label: "Members",
    path: "members",
  },
  {
    label: "Settings",
    path: "settings",
  },
];

const Header: FC = () => {
  const workspaceId = useWorkspaceId();
  const { asPath } = useRouter();

  const { data } = useQuery(
    workspaceQueryKeys.getWorkspace(workspaceId),
    () =>
      getWorkspaceApi({
        workspaceId,
      }),
    {
      select: ({ data }) => data,
    }
  );

  return (
    <Container>
      <Flex gap={12} align="center">
        <WorkspaceContainer gap={8} flex="1" align="center">
          <Avatar src={data?.profileImage} name={data?.name} size="small" />
          <Text color="gray800" size="large" weight="bold">
            {data?.name}
          </Text>
        </WorkspaceContainer>
        <Flex gap={8}>
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={`/workspaces/${workspaceId}/${tab.path}`}
            >
              <CustomButton
                variant="quiet"
                size="small"
                selected={asPath.startsWith(
                  `/workspaces/${workspaceId}/${tab.path}`
                )}
              >
                {tab.label}
              </CustomButton>
            </Link>
          ))}
        </Flex>
      </Flex>

      <Flex gap={8}>
        <Button
          size="small"
          variant="quiet"
          tailingIcon={
            <Icon color="gray600">
              <IoMdArrowDropdown />
            </Icon>
          }
        >
          <Avatar variant="circle" name="eungyeole" size="xsmall" />
        </Button>
      </Flex>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  padding-right: 12px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const WorkspaceContainer = styled(Flex)`
  border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 0 24px;
`;

const CustomButton = styled(Button)<{
  selected?: boolean;
}>`
  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.colors.gray200};
    `}
`;
