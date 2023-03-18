import { useRouter } from "next/router";

export const useWorkspaceId = () => {
  const router = useRouter();
  const { workspaceId } = router.query;

  return workspaceId as string;
};
