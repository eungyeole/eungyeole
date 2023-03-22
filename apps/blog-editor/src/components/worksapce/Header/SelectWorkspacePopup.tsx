import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FC } from "react";
import { BiPlus } from "react-icons/bi";
import { getWorkspacesApi } from "src/apis/workspace/apis";
import { workspaceQueryKeys } from "src/apis/workspace/queryKeys";
import { Workspace } from "src/apis/workspace/types";
import styled from "styled-components";
import { Avatar, Dropdown, DropdownProps, Flex, Text } from "ui";

interface SelectWorkspacePopupProps extends Omit<DropdownProps, "render"> {
  selectedWorkspace?: Workspace;
}

export const SelectWorkspacePopup: FC<SelectWorkspacePopupProps> = ({
  selectedWorkspace,
  trigger,
  ...props
}) => {
  const { data } = useQuery(
    workspaceQueryKeys.getWorkspaces(),
    getWorkspacesApi,
    {
      select: ({ data }) => data,
    }
  );

  return (
    <Dropdown
      style={{
        width: "100%",
        height: "100%",
      }}
      trigger={trigger}
      render={({ hide }) => (
        <Dropdown.Menu width={300} offsetX={24} offsetY={-8}>
          <Flex gap={8} flex="1" align="center" padding="12px">
            <Avatar
              src={selectedWorkspace?.profileImage}
              name={selectedWorkspace?.name}
              size="small"
            />
            <Text color="gray800" size="large" weight="bold">
              {selectedWorkspace?.name}
            </Text>
          </Flex>
          {data && data.workspaces.length > 1 && (
            <WorkspaceListContainer direction="column">
              {data?.workspaces
                .filter((workspace) => workspace.id !== selectedWorkspace?.id)
                .map((workspace) => (
                  <Link href={`/workspaces/${workspace.id}`} key={workspace.id}>
                    <Dropdown.Item key={workspace.id} onClick={hide}>
                      {workspace.name}
                    </Dropdown.Item>
                  </Link>
                ))}
            </WorkspaceListContainer>
          )}
          <Link href="/workspaces/create">
            <Dropdown.Item leadingIcon={<BiPlus />} onClick={hide}>
              Create a new workspace
            </Dropdown.Item>
          </Link>
        </Dropdown.Menu>
      )}
      {...props}
    />
  );
};

const WorkspaceListContainer = styled(Flex)`
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};

  margin: 4px 0;
  padding: 4px 0;
`;
