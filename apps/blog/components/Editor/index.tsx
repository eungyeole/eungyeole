import { Post } from "database";
import { SerializedEditorState } from "lexical";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { Button, device, Flex, Text } from "ui";
import Editor from "../common/Editor/Editor";
import EditorHeader from "./EditorHeader";
import { BsPlusCircle } from "react-icons/bs";
import dayjs from "dayjs";

const EditorView = () => {
  const { register, control, handleSubmit, formState } = useForm<
    Omit<Post, "id" | "createdAt">
  >({
    defaultValues: {
      title: "",
      description: "",
      content: {},
      thumbnailUrl: "",
      categories: [],
    },
  });

  const onWrite = () => {};

  return (
    <>
      <EditorHeader
        renderWriteButton={
          <Button
            disabled={!formState.isValid}
            variant="primary"
            size="small"
            onClick={onWrite}
          >
            새 글 쓰기
          </Button>
        }
      />
      <Container>
        <ContainerInner>
          <Flex direction="column" padding="80px 0 0" fullWidth gap={40}>
            <Flex gap={16} direction="column" align="center" fullWidth>
              <TitleInput
                {...register("title", {
                  required: true,
                })}
                placeholder="제목을 입력해 주세요."
              />
              <Text>{dayjs().format("YYYY.MM.DD")}</Text>
            </Flex>

            <Controller
              name="content"
              control={control}
              render={({ field: { onChange } }) => (
                <Editor onChange={(editor) => onChange(editor.toJSON())} />
              )}
            />
          </Flex>
        </ContainerInner>
      </Container>
    </>
  );
};

export default EditorView;

const Container = styled.div`
  width: 100%;
  max-width: 760px;

  margin: 0 auto;
`;

const ContainerInner = styled.div`
  padding: 0 24px;
`;

const TitleInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  text-align: center;

  font-size: ${({ theme }) => theme.fonts.sizes.xxxxlarge};
  color: ${({ theme }) => theme.colors.gray800};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }

  @media ${device.tablet} {
    font-size: ${({ theme }) => theme.fonts.sizes.xxxlarge};
  }
`;
