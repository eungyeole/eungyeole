import { useMutation } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { joinWorkspaceApi } from "src/apis/workspace/apis";
import CommonFormTemplate from "src/components/common/templates/CommonFormTemplate";
import { useWorkspaceId } from "src/components/worksapce/hooks/useWorkspaceId";
import { NextPageWithAuth } from "src/types";
import { Button } from "ui";

interface WorkspaceJoinProps {
  code: string;
}
const WorkspaceJoin: NextPageWithAuth<WorkspaceJoinProps> = ({ code }) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const { mutate, isLoading } = useMutation(joinWorkspaceApi, {
    onSuccess: () => {
      router.push(`/workspaces/${workspaceId}`);
    },
  });

  return (
    <CommonFormTemplate
      title="Join a workspace"
      description="Publish your stories and connect with audiences."
    >
      <Button
        onClick={() => {
          mutate({
            workspaceId,
            code,
          });
        }}
        size="large"
        fullWidth
        loading={isLoading}
      >
        Join
      </Button>
    </CommonFormTemplate>
  );
};

export default WorkspaceJoin;

WorkspaceJoin.requireAuth = true;

export const getServerSideProps: GetServerSideProps<
  WorkspaceJoinProps
> = async (ctx) => {
  const { code } = ctx.query;

  if (!code) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      code: code as string,
    },
  };
};
