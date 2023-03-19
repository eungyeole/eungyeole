import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC, useState, useEffect } from "react";
import { updateWorkspacePostApi } from "src/apis/workspace/apis";
import { workspaceQueryKeys } from "src/apis/workspace/queryKeys";
import { Post } from "src/apis/workspace/types";
import Editor from "src/components/common/editor/Editor";
import styled from "styled-components";
import { Flex, device, Button, useToast } from "ui";
import Header from "./Header";

interface PostEditorProps {
  initialPost?: Post;
}

const PostEditor: FC<PostEditorProps> = ({ initialPost }) => {
  const { addToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    title: initialPost?.title || "",
    content: initialPost?.content || "",
  });

  const postId = Number(router.query.postId);

  const {
    mutate: updateWorkspacePostMutate,
    isLoading: isUpdateWorkspacePostLoading,
  } = useMutation(updateWorkspacePostApi, {
    onMutate: (variable) => {
      const queryKey = workspaceQueryKeys.getWorkspacePost(postId);
      const prev = queryClient.getQueryData<Post>(queryKey);

      queryClient.setQueryData(queryKey, {
        ...prev,
        ...variable,
      });
    },
  });

  // auto save with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isFinite(postId)) {
        updateWorkspacePostMutate({
          postId,
          status: initialPost?.status || "DRAFT",
          ...state,
        });
      }
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initialPost?.status,
    postId,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(state),
    updateWorkspacePostMutate,
  ]);

  return (
    <>
      <Header
        rightContent={
          <Button
            variant={initialPost?.status === "PUBLISHED" ? "ghost" : "primary"}
            loading={isUpdateWorkspacePostLoading}
            onClick={() => {
              if (isFinite(postId)) {
                updateWorkspacePostMutate({
                  postId,
                  status:
                    initialPost?.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
                  ...state,
                });
              }
            }}
            size="small"
          >
            {initialPost?.status === "PUBLISHED" ? "Unpublish" : "Publish"}
          </Button>
        }
      />
      <Container>
        <Flex direction="column" gap={24}>
          <TitleInput
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            placeholder="Title"
          />
          <Editor
            placeholder="Wirte your post here..."
            onChange={(editor) =>
              setState({ ...state, content: editor.toJSON() })
            }
            defaultValue={state.content}
          />
        </Flex>
      </Container>
    </>
  );
};

export default PostEditor;

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 10vw 16px;

  @media ${device.tablet} {
    padding: 80px 16px;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  padding: 0 16px;

  font-size: ${({ theme }) => theme.fonts.sizes.xxxlarge};
  color: ${({ theme }) => theme.colors.gray800};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
