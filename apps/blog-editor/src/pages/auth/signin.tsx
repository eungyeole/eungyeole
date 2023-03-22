import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendVertificationCodeApi, signInApi } from "src/apis/users/apis";
import CommonFormTemplate from "src/components/common/templates/CommonFormTemplate";
import { COOKIE_KEYS } from "src/constants/cookies";
import { Button, Flex, Input, Text, useToast } from "ui";
import { isEmail } from "utils";

interface SigninProps {}

const Signin: NextPage<SigninProps> = () => {
  const router = useRouter();
  const { redirectPath } = router.query;

  const { addToast } = useToast();
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
      onError: () => {
        addToast({
          variant: "error",
          message: "Code is not valid.",
        });
      },
    }
  );

  return (
    <CommonFormTemplate
      title="Sign in for write"
      description="Publish your stories and connect with audiences."
    >
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
    </CommonFormTemplate>
  );
};

export default Signin;
