import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendVertificationCodeApi, signInApi } from "src/apis/users/apis";
import { COOKIE_KEYS } from "src/constants/cookies";
import styled from "styled-components";
import { Button, Flex, Input, Text } from "ui";
import { isEmail } from "utils";

interface SigninProps {}

const Signin: NextPage<SigninProps> = () => {
  const router = useRouter();
  const { redirectPath } = router.query;

  const [step, setStep] = useState<"email" | "code">("email");

  const { register, handleSubmit, formState } = useForm<{
    code: string;
    email: string;
  }>({
    defaultValues: {
      email: "",
    },
  });

  const {
    mutate: sendVertificationCodeMutate,
    isLoading: isSendVertificationCodeLoading,
  } = useMutation(sendVertificationCodeApi, {
    onSuccess: () => {
      setStep("code");
    },
  });

  const { mutate: signInMutate, isLoading: isSignInLoading } = useMutation(
    signInApi,
    {
      onSuccess: ({ data }) => {
        setCookie(COOKIE_KEYS.ACCESS_TOKEN, data.accessToken, {
          expires: new Date(data.accessTokenExpireAt),
        });

        router.push(redirectPath ? String(redirectPath) : "/workspaces");
      },
    }
  );

  return (
    <Container gap={24} direction="column" justify="center">
      <Flex gap={24} direction="column" align="center">
        <Text size="xxxxlarge">🖋️</Text>
        <Flex gap={8} direction="column" align="center">
          <Text size="xxlarge" weight="bold">
            Sign in for write
          </Text>

          <Text
            whiteSpace="pre-wrap"
            size="small"
            color="gray600"
            align="center"
          >
            Publish your stories and connect with audiences.
          </Text>
        </Flex>
      </Flex>
      <Flex
        as="form"
        onSubmit={handleSubmit((value) => {
          if (step === "email") {
            sendVertificationCodeMutate({
              email: value.email,
            });
          } else {
            signInMutate({
              email: value.email,
              code: value.code,
            });
          }
        })}
        direction="column"
        fullWidth
        gap={24}
      >
        <Flex direction="column" gap={12}>
          <Input
            {...register("email", {
              required: true,
              validate: isEmail,
            })}
            placeholder="contact@eungyeole.xyz"
          />
          {step === "code" && (
            <>
              <Input
                {...register("code", {
                  required: true,
                })}
                placeholder="code"
              />
              <Text
                color="gray600"
                whiteSpace="pre"
                size="small"
                align="center"
              >
                {"임시 로그인 코드를 보냈습니다.\n메일함을 확인해 보세요."}
              </Text>
            </>
          )}
        </Flex>

        {step === "email" ? (
          <Button
            disabled={!formState.isValid}
            loading={isSendVertificationCodeLoading}
            variant="primary"
            size="large"
            fullWidth
          >
            Continue
          </Button>
        ) : (
          <Button
            disabled={!formState.isValid}
            loading={isSignInLoading}
            variant="primary"
            size="large"
            fullWidth
          >
            Sign in
          </Button>
        )}
      </Flex>
    </Container>
  );
};

export default Signin;

const Container = styled(Flex)`
  max-width: 380px;
  margin: 0 auto;
  margin-top: 50px;
`;
