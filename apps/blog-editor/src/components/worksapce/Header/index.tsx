import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { BiPlus } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { getWorkspaceApi } from "src/apis/workspace/apis";
import { workspaceQueryKeys } from "src/apis/workspace/queryKeys";
import styled, { css } from "styled-components";
import { Avatar, Button, Divider, Dropdown, Flex, Icon, Text } from "ui";
import { useWorkspaceId } from "../hooks/useWorkspaceId";
import { SelectWorkspacePopup } from "./SelectWorkspacePopup";

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
    type: "dropdown",
    label: "Categories",
    path: "categories",
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
    <>
      <Container>
        <Flex align="center" fullHeight>
          <SelectWorkspacePopup
            selectedWorkspace={data}
            trigger={
              <WorkspaceContainer gap={8} flex="1" align="center">
                <Avatar
                  src={data?.profileImage}
                  name={data?.name}
                  size="small"
                />
                <Text color="gray800" size="large" weight="bold">
                  {data?.name}
                </Text>
              </WorkspaceContainer>
            }
          />
          <Divider
            direction="vertical"
            style={{
              boxSizing: "border-box",
              height: "32px",
              margin: "0 12px 0 0",
            }}
          />
          <Flex gap={8}>
            {tabs.map((tab) => (
              <Link
                key={tab.label}
                href={`/workspaces/${workspaceId}/${tab.path}`}
              >
                <CustomButton
                  variant="quiet"
                  size="small"
                  selected={
                    !!asPath.startsWith(
                      `/workspaces/${workspaceId}/${tab.path}`
                    )
                  }
                >
                  {tab.label}
                </CustomButton>
              </Link>
            ))}
          </Flex>
        </Flex>

        <Flex gap={8}>
          <Dropdown
            trigger={
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
            }
            render={({ hide }) => (
              <Dropdown.Menu position="right">
                <Dropdown.Item danger>Sign out</Dropdown.Item>
                <Dropdown.Item onClick={hide} danger>
                  Sign out
                </Dropdown.Item>
              </Dropdown.Menu>
            )}
          />
        </Flex>
      </Container>
      <Blank />
    </>
  );
};

export default Header;

const Container = styled.header`
  position: fixed;
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  padding-right: 12px;

  background-color: ${({ theme }) => theme.colors.white};

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const Blank = styled.div`
  height: 55px;
  width: 100%;
`;

const WorkspaceContainer = styled(Flex)`
  height: 100%;
  padding: 0 24px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
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
