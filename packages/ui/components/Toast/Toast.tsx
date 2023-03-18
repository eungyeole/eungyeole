import { FC } from "react";
import styled, { keyframes } from "styled-components";
import { AiOutlineCheckCircle, AiOutlineInfoCircle } from "react-icons/ai";

import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { Text } from "../Text";

export interface Toast {
  id?: string;
  variant: "success" | "error";
  message: string;
  duration?: number;
}

export const ToastItem: FC<Toast> = ({ variant, message }) => {
  return (
    <Container align="center" gap={8}>
      <Icon color={variant === "success" ? "green500" : "red500"}>
        {variant === "success" ? (
          <AiOutlineCheckCircle size={18} />
        ) : (
          <AiOutlineInfoCircle size={18} />
        )}
      </Icon>
      <Text color="white" size="small">
        {message}
      </Text>
    </Container>
  );
};

const animation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(10px);
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled(Flex)`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};

  animation: ${animation} 0.3s ease-in-out;
`;
