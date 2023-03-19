import { QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { getWorkspacesApi } from "src/apis/workspace/apis";
import { workspaceQueryKeys } from "src/apis/workspace/queryKeys";
import { NextPageWithAuth } from "src/types";

const EmptyWorkspace: NextPageWithAuth = () => {
  return <></>;
};

export default EmptyWorkspace;

EmptyWorkspace.requireAuth = true;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  const { data } = await queryClient.fetchQuery(
    workspaceQueryKeys.getWorkspaces(),
    () => getWorkspacesApi()
  );

  if (data.workspaces.length <= 0) {
    return {
      redirect: {
        destination: "/workspaces/create",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      statusCode: 301,
      destination: `/workspaces/${data.workspaces[0].id}`,
    },
  };
};
