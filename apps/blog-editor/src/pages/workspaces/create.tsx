import styled from "styled-components";
import { Button, Flex, Text, Input, useToast } from "ui";
import { BiPlus } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { NextPageWithAuth } from "src/types";
import { useMutation } from "@tanstack/react-query";
import { createWorkspaceApi } from "src/apis/workspace/apis";
import { useRouter } from "next/router";
import CommonFormTemplate from "src/components/common/templates/CommonFormTemplate";

interface CreateWorkspaceProps {}

const CreateWorkspace: NextPageWithAuth<CreateWorkspaceProps> = () => {
  const { addToast } = useToast();
  const router = useRouter();

  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      workspaceName: "",
    },
  });

  const { mutate, isLoading } = useMutation(createWorkspaceApi, {
    onSuccess: ({ data }) => {
      router.push(`/workspaces/${data.workspaceId}`);
    },
    onError: () => {
      addToast({
        variant: "error",
        message: "알수 없는 에러가 발생했습니다.",
      });
    },
  });

  return (
    <CommonFormTemplate
      title="Create a new workspace"
      description="A workspace is a collection of resources to help organize and track your work."
    >
      <Flex
        as="form"
        onSubmit={handleSubmit((data) => {
          mutate(data);
        })}
        direction="column"
        fullWidth
        gap={24}
      >
        <Input
          placeholder="ex) eungyeole"
          {...register("workspaceName", {
            required: true,
          })}
        />
        <Button
          variant="primary"
          disabled={!formState.isValid}
          size="large"
          fullWidth
          leadingIcon={<BiPlus size={18} />}
          loading={isLoading}
        >
          New workspace
        </Button>
      </Flex>
    </CommonFormTemplate>
  );
};

CreateWorkspace.requireAuth = true;

export default CreateWorkspace;

const CreateWorkspaceContainer = styled(Flex)`
  max-width: 380px;
  margin: 0 auto;
  margin-top: 50px;
`;
