import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getWorkspacePostApi } from "src/apis/workspace/apis";
import { workspaceQueryKeys } from "src/apis/workspace/queryKeys";
import SpinnerWrapper from "src/components/common/SpinnerWrapper";
import PostEditor from "src/components/worksapce/editors/posts";
import { NextPageWithAuth } from "src/types";

const PostEditorPage: NextPageWithAuth = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data, isLoading } = useQuery(
    workspaceQueryKeys.getWorkspacePost(Number(postId)),
    () =>
      getWorkspacePostApi({
        postId: Number(postId),
      }),
    {
      enabled: !!postId,
    }
  );

  return (
    <SpinnerWrapper isLoading={isLoading && !!postId}>
      <PostEditor initialPost={data} />
    </SpinnerWrapper>
  );
};

PostEditorPage.requireAuth = true;

export default PostEditorPage;
