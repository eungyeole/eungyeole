import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  createWorkspacePostApi,
  updateWorkspacePostApi,
} from "src/apis/workspace/apis";
import { Post } from "src/apis/workspace/types";
import Editor from "src/components/common/editor/Editor";
import styled from "styled-components";
import { Flex, device, Button, useToast } from "ui";
import { useWorkspaceId } from "../../hooks/useWorkspaceId";
import Header from "./Header";

interface PostEditorProps {
  initialPost?: Post;
}

const PostEditor: FC<PostEditorProps> = ({ initialPost }) => {
  const { addToast } = useToast();
  const router = useRouter();

  const postId = Number(router.query.postId);

  const workspaceId = useWorkspaceId();

  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      title: initialPost?.title || "",
      content: initialPost?.content || "",
    },
  });

  const {
    mutate: createWorkspacePostMutate,
    isLoading: isCreateWorkspacePostLoading,
  } = useMutation(createWorkspacePostApi, {
    onSuccess: ({ data }) => {
      addToast({
        variant: "success",
        message: "Your post has been created successfully",
      });
      router.replace(`/workspaces/${workspaceId}/editors/posts?postId=${data}`);
    },
  });

  const {
    mutate: updateWorkspacePostMutate,
    isLoading: isUpdateWorkspacePostLoading,
  } = useMutation(updateWorkspacePostApi, {});

  return (
    <>
      <Header
        rightContent={
          <Button
            loading={
              isCreateWorkspacePostLoading || isUpdateWorkspacePostLoading
            }
            onClick={handleSubmit((data) => {
              if (isFinite(postId)) {
                updateWorkspacePostMutate({
                  postId,
                  ...data,
                });
              } else {
                createWorkspacePostMutate({
                  workspaceId,
                  ...data,
                });
              }
            })}
            size="small"
            disabled={!formState.isValid}
          >
            Save
          </Button>
        }
      />
      <Container>
        <Flex direction="column" gap={24}>
          <TitleInput
            {...register("title", {
              required: true,
            })}
            placeholder="Title"
          />
          <Controller
            name="content"
            control={control}
            render={({ field: { onChange } }) => (
              <Editor
                placeholder="Wirte your post here..."
                onChange={(editor) => onChange(editor.toJSON())}
              />
            )}
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
