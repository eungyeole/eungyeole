export const workspaceQueryKeys = {
  all: "workspace/all",
  getWorkspace: (workspaceId: string) => [workspaceQueryKeys.all, workspaceId],
  getWorkspaceMembers: (workspaceId: string) => [
    workspaceQueryKeys.all,
    workspaceId,
    "members",
  ],
  getWorkspaceInvitedMembers: (workspaceId: string) => [
    workspaceQueryKeys.all,
    workspaceId,
    "invites",
  ],
  getWorkspacePosts: (workspaceId: string) => [
    workspaceQueryKeys.all,
    workspaceId,
    "posts",
  ],
};
