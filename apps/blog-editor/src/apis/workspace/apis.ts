import { apiClient } from "../client";
import { Member, Workspace, InviteMember } from "./types";

export const getWorkspaceApi = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  return await apiClient.get<Workspace>(`/workspaces/${workspaceId}`);
};

export const getWorkspacesApi = async () => {
  return await apiClient.get<Workspace>("/workspaces");
};

export const getWorkspaceMembersApi = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  return await apiClient.get<{
    users: Member[];
  }>(`/workspaces/${workspaceId}/members`);
};

export const createWorkspaceApi = async (body: { workspaceName: string }) => {
  return await apiClient.post<{
    workspaceId: string;
  }>("/workspaces", body);
};

export const inviteMembers = async ({
  workspaceId,
  targets,
}: {
  workspaceId: string;
  targets: InviteMember[];
}) => {
  return await apiClient.post<unknown>(
    `/workspaces/${workspaceId}/invitations`,
    {
      targets,
    }
  );
};

export const getWorkspaceInvitedMembersApi = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  return await apiClient.get<{
    invitations: (InviteMember & {
      invitationId: number;
    })[];
  }>(`/workspaces/${workspaceId}/invitations`);
};

export const getWorkspacePostsApi = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  return await apiClient.get<{
    posts: {
      postId: number;
      title: string;
      content: any;
      createdAt: string;
      updatedAt: string;
    }[];
  }>(`/posts/workspaces/${workspaceId}`);
};
