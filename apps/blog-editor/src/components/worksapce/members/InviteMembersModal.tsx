import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { inviteMembers } from "src/apis/workspace/apis";
import { workspaceQueryKeys } from "src/apis/workspace/queryKeys";
import { InviteMember, WorkspaceRole } from "src/apis/workspace/types";
import styled from "styled-components";
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalProps,
  Text,
  useToast,
} from "ui";
import { isEmail } from "utils";
import { useWorkspaceId } from "../hooks/useWorkspaceId";

interface InviteMembersModalProps extends ModalProps {}

interface FormValues {
  members: InviteMember[];
}

const InviteMembersModal: FC<InviteMembersModalProps> = ({
  onClose,
  ...props
}) => {
  const workspaceId = useWorkspaceId();
  const form = useForm<FormValues>();
  const queryClient = useQueryClient();

  const { control, formState, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
    rules: {
      required: true,
    },
  });

  const { mutate, isLoading } = useMutation(inviteMembers, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        workspaceQueryKeys.getWorkspaceInvitedMembers(workspaceId)
      );
      onClose?.();
    },
  });

  return (
    <FormProvider {...form}>
      <Modal
        title="Invite Members"
        description="Invite a new member and select their role to determine their level of access."
        onClose={onClose}
        buttons={[
          <Button onClick={onClose} variant="quiet">
            Cancel
          </Button>,
          <Button
            onClick={handleSubmit((data) => {
              mutate({
                workspaceId,
                targets: data.members,
              });
            })}
            loading={isLoading}
            disabled={!formState.isValid}
          >
            Invite
          </Button>,
        ]}
        {...props}
      >
        <Flex direction="column" gap={24}>
          <InviteTextField append={append} />
          <MembersContainer direction="column" gap={18}>
            {fields.map((field, idx) => (
              <Flex key={field.email} justify="space-between" fullWidth>
                <Flex align="center" gap={12} fullWidth>
                  <Avatar size="small" name={field.email} variant="circle" />
                  <Text size="xsmall" weight="medium">
                    {field.email}
                  </Text>
                </Flex>
                <Button
                  size="small"
                  variant="quiet"
                  onClick={() => remove(idx)}
                  iconOnly={
                    <Icon>
                      <BsX size={24} />
                    </Icon>
                  }
                />
              </Flex>
            ))}
          </MembersContainer>
        </Flex>
      </Modal>
    </FormProvider>
  );
};

export default InviteMembersModal;

interface InviteTextFieldProps {
  append: (data: { email: string; role: WorkspaceRole }) => void;
}

const InviteTextField: FC<InviteTextFieldProps> = ({ append }) => {
  const { addToast } = useToast();
  const { getValues } = useFormContext<FormValues>();

  const { register, handleSubmit, reset, formState } = useForm<{
    email: string;
    role: WorkspaceRole;
  }>({
    defaultValues: {
      email: "",
      role: "MEMBER",
    },
  });

  return (
    <Flex gap={8}>
      <Input
        {...register("email", {
          required: true,
          validate: (value) => isEmail(value),
        })}
        placeholder="example@feltpen.site"
        size="medium"
        fullWidth
      />
      <Button
        disabled={!formState.isValid}
        onClick={handleSubmit((data) => {
          if (
            !getValues().members.find((member) => member.email === data.email)
          ) {
            reset();
            append(data);
          } else {
            addToast({
              variant: "error",
              message: "이미 추가된 이메일 입니다.",
            });
          }
        })}
        size="medium"
        iconOnly={
          <Icon>
            <BiPlus />
          </Icon>
        }
      />
    </Flex>
  );
};

const MembersContainer = styled(Flex)`
  height: 300px;
  max-height: 300px;
  overflow-y: auto;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};

  border-radius: 4px;
`;
