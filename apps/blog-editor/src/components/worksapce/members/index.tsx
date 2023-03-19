import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Avatar, Button, Flex, Icon, Text } from "ui";

import {
  getWorkspaceInvitedMembersApi,
  getWorkspaceMembersApi,
  revokeInvitationApi,
} from "src/apis/workspace/apis";

import Header from "../Header";
import { useWorkspaceId } from "../hooks/useWorkspaceId";
import styled from "styled-components";
import { BiPlus } from "react-icons/bi";
import { workspaceQueryKeys } from "src/apis/workspace/queryKeys";
import InviteMembersModal from "./InviteMembersModal";
import { BsX } from "react-icons/bs";

const Members: FC = () => {
  const [state, setState] = useState(false);
  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { data: activeMembersData } = useQuery(
    workspaceQueryKeys.getWorkspaceMembers(workspaceId),
    () => getWorkspaceMembersApi({ workspaceId }),
    {
      select: ({ data }) => data,
    }
  );

  const { data: invitedMembersData } = useQuery(
    workspaceQueryKeys.getWorkspaceInvitedMembers(workspaceId),
    () => getWorkspaceInvitedMembersApi({ workspaceId }),
    {
      select: ({ data }) => data,
    }
  );

  const { mutate: revokeInvitationMutate } = useMutation(revokeInvitationApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        workspaceQueryKeys.getWorkspaceInvitedMembers(workspaceId)
      );
    },
  });

  return (
    <Flex direction="column">
      {state && <InviteMembersModal onClose={() => setState(false)} />}
      <Header />
      <ContentContainer gap={48} direction="column">
        <Flex justify="space-between" align="center">
          <Text size="xxxlarge" weight="bold">
            Members
          </Text>
          <Button
            onClick={() => setState(true)}
            size="medium"
            leadingIcon={
              <Icon>
                <BiPlus />
              </Icon>
            }
          >
            Invite
          </Button>
        </Flex>
        <Flex gap={64} direction="column">
          {(invitedMembersData?.invitations.length ?? 0) > 0 && (
            <Flex gap={8} direction="column">
              <Text size="xsmall">Invited Members</Text>
              <Flex gap={12} direction="column" fullWidth>
                {invitedMembersData?.invitations.map((user) => (
                  <Flex
                    key={user.invitationId}
                    align="center"
                    justify="space-between"
                    fullWidth
                  >
                    <Flex align="center" gap={12}>
                      <Avatar variant="circle" name={user.email} />
                      <Text weight="medium">{user.email}</Text>
                    </Flex>
                    <Flex align="center" gap={8}>
                      <Tag>{user.role?.toLowerCase()}</Tag>
                      <Button
                        variant="quiet"
                        size="xsmall"
                        onClick={() =>
                          revokeInvitationMutate({
                            invitationId: user.invitationId,
                          })
                        }
                        iconOnly={
                          <Icon>
                            <BsX size={24} />
                          </Icon>
                        }
                      />
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          )}
          <Flex gap={8} direction="column">
            <Text size="xsmall">Active Members</Text>
            <Flex gap={12} direction="column" fullWidth>
              {activeMembersData?.users.map((user) => (
                <Flex
                  key={user.memberId}
                  align="center"
                  justify="space-between"
                  fullWidth
                >
                  <Flex align="center" gap={12}>
                    <Avatar
                      src={user.profileImage}
                      variant="circle"
                      name={user.name}
                    />
                    <Text weight="medium">{user.name}</Text>
                  </Flex>
                  <Tag>{user.role.toLowerCase()}</Tag>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </ContentContainer>
    </Flex>
  );
};

export default Members;

const ContentContainer = styled(Flex)`
  margin: 0 auto;
  padding: 24px;
  max-width: 800px;

  box-sizing: border-box;
  width: 100%;
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  color: ${({ theme }) => theme.colors.green500};
  font-size: ${({ theme }) => theme.fonts.sizes.xsmall};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  padding: 4px 8px;
  border-radius: 12px;
`;
