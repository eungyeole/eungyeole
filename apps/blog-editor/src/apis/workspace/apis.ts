import { apiClient } from "../client";
import { Member, Workspace, InviteMember, Post, PostStatus } from "./types";

export const getWorkspaceApi = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  return await apiClient.get<Workspace>(`/workspaces/${workspaceId}`);
};

export const getWorkspacesApi = async () => {
  return await apiClient.get<{
    workspaces: Workspace[];
  }>("/workspaces/list");
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

export const revokeInvitationApi = async ({
  invitationId,
}: {
  invitationId: number;
}) => {
  return await apiClient.delete<unknown>(
    `/workspaces/invitations/${invitationId}`
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
    posts: Post[];
  }>(`/workspaces/${workspaceId}/posts`);
};

export const getWorkspacePostApi = async ({ postId }: { postId: number }) => {
  const { data } = await apiClient.get<Post>(`/workspaces/posts/${postId}`);

  return data;
};

export const createWorkspacePostApi = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  return await apiClient.post<number>(`/workspaces/${workspaceId}/posts`);
};

export const updateWorkspacePostApi = async ({
  postId,
  title,
  content,
  status,
}: {
  postId: number;
  title: string;
  content: any;
  status: PostStatus;
}) => {
  return await apiClient.put<{
    postId: number;
  }>(`/workspaces/posts/${postId}`, {
    title,
    content,
    status,
  });
};

export const joinWorkspaceApi = async ({
  workspaceId,
  code,
}: {
  workspaceId: string;
  code: string;
}) => {
  return await apiClient.post(`/workspaces/${workspaceId}/join`, { code });
};
