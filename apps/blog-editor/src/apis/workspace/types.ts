export type WorkspaceRole = "OWNER" | "MEMBER";

export interface Workspace {
  id: string;
  name: string;
  profileImage: string;
  createdAt: string;
}

export interface Member {
  userId: string;
  memberId: string;
  name: string;
  profileImage: string;
  role: WorkspaceRole;
}

export interface InviteMember {
  email: string;
  role: WorkspaceRole;
}

export interface Post {
  id: number;
  status: "DRAFT" | "PUBLISHED";
  title: string;
  content: any;
  createdAt: string;
  updatedAt: string;
  writerName: string;
  writerProfileImage: string;
}
