import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getWorkspacesApi } from "src/apis/workspace/apis";
import { workspaceQueryKeys } from "src/apis/workspace/queryKeys";
import SpinnerWrapper from "src/components/common/SpinnerWrapper";
import { NextPageWithAuth } from "src/types";

const EmptyWorkspace: NextPageWithAuth = () => {
  const router = useRouter();
  useQuery(workspaceQueryKeys.getWorkspaces(), () => getWorkspacesApi(), {
    onSuccess: ({ data }) => {
      if (data.workspaces.length > 0) {
        router.push(`/workspaces/${data.workspaces[0].id}`);
      }
    },
    onError: () => {
      router.push("/workspaces/create");
    },
  });
  return <SpinnerWrapper isLoading />;
};

export default EmptyWorkspace;

EmptyWorkspace.requireAuth = true;
