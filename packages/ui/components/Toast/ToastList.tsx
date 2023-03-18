import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useIsMounted } from "utils";
import { Flex } from "../Flex";
import { Toast, ToastItem } from "./Toast";

interface ToastListProps {
  toasts: Toast[];
}
const ToastList: FC<ToastListProps> = ({ toasts }) => {
  const isMounted = useIsMounted();

  return isMounted ? (
    createPortal(
      <Container direction="column" gap={12}>
        {toasts.map((toast) => (
          <ToastItem {...toast} />
        ))}
      </Container>,
      document.body
    )
  ) : (
    <></>
  );
};

export default ToastList;

const Container = styled(Flex)`
  position: fixed;

  bottom: 5%;
  left: 50%;

  transform: translateX(-50%);

  z-index: 1000;
`;
