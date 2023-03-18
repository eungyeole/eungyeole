import { FC } from "react";
import styled from "styled-components";
import { Flex, Text } from "ui";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  IoPersonOutline,
  IoNewspaperOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import { Icon } from "ui";
import { useQuery } from "@tanstack/react-query";

import { useWorkspaceId } from "./hooks/useWorkspaceId";
import { getWorkspaceApi } from "src/apis/workspace/apis";
import { workspaceQueryKeys } from "src/apis/workspace/queryKeys";
import Link from "next/link";

interface SideBarProps {}

const SideBar: FC<SideBarProps> = () => {
  const workspaceId = useWorkspaceId();

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
    <SideBarContainer>
      <WorkspaceContainer gap={8} align="center" justify="space-between">
        <Flex gap={8} flex="1" align="center">
          <Avatar src="https://blog.greetinghr.com/content/images/size/w256h256/2021/11/Greeting-Logo.png" />
          <Text color="gray800" size="large" weight="bold">
            {data?.name}
          </Text>
        </Flex>
        <Icon color="gray700">
          <IoMdArrowDropdown size={24} />
        </Icon>
      </WorkspaceContainer>
      <MenuItemContainer align="center" gap={12}>
        <Icon color="gray700">
          <IoNewspaperOutline size={18} />
        </Icon>
        <Text size="small" color="gray700" weight="medium">
          Posts
        </Text>
      </MenuItemContainer>
      <Link href={`/workspaces/${workspaceId}/members`}>
        <MenuItemContainer align="center" gap={12}>
          <Icon color="gray700">
            <IoPersonOutline size={18} />
          </Icon>

          <Text size="small" color="gray700">
            Members
          </Text>
        </MenuItemContainer>
      </Link>
      <MenuItemContainer align="center" gap={12}>
        <Icon color="gray700">
          <IoSettingsOutline size={18} />
        </Icon>
        <Text size="small" color="gray700">
          Settings
        </Text>
      </MenuItemContainer>
    </SideBarContainer>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  width: 300px;
  height: 100vh;
  border-right: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const WorkspaceContainer = styled(Flex)`
  height: 80px;
  padding: 0 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray150};
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
`;

const MenuItemContainer = styled(Flex)`
  width: 100%;
  height: 36px;
  cursor: pointer;
  padding: 0 20px;
  box-sizing: border-box;
  transition: 100ms ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray150};
  }
`;
