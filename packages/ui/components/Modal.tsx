import { FC, ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import { Flex } from "./Flex";
import { Text } from "./Text";

export interface ModalProps {
  title?: string;
  description?: string;
  width?: number;
  zIndex?: number;
  children?: ReactNode;
  onClose?: () => void;
  buttons?: ReactNode[];
}

export const Modal: FC<ModalProps> = ({
  title,
  description,
  width = 460,
  zIndex = 1,
  children,
  onClose,
  buttons,
}) => {
  return (
    <ModalContainer zIndex={zIndex}>
      <ModalOverlay onClick={onClose} />
      <ModalContentContainer width={width}>
        <Content>
          <ContentHeader direction="column" gap={2}>
            {title && (
              <Text weight="bold" size="xlarge">
                {title}
              </Text>
            )}
            {description && (
              <Text size="small" color="gray600">
                {description}
              </Text>
            )}
          </ContentHeader>
          {children}
        </Content>
        {buttons && (
          <ContentFooter gap={8}>
            {buttons.map((button, index) => {
              return <div key={index}>{button}</div>;
            })}
          </ContentFooter>
        )}
      </ModalContentContainer>
    </ModalContainer>
  );
};

const ModalContainer = styled.div<{
  zIndex: number;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: ${({ zIndex }) => zIndex};
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const popupKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -10%) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const ModalContentContainer = styled.div<{ width: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;

  width: ${({ width }) => width}px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;

  animation-delay: 0s;
  animation-play-state: running;
  animation-iteration-count: 1;
  animation-duration: 0.3s;
  animation-name: ${popupKeyframes};
`;

const Content = styled.div`
  width: 100%;
  padding: 20px 24px;
  box-sizing: border-box;
`;

const ContentHeader = styled(Flex)`
  margin-bottom: 16px;
`;

const ContentFooter = styled(Flex)`
  justify-content: flex-end;
  height: 56px;
  padding: 0 24px;
  /* border-top: 1px solid ${({ theme }) => theme.colors.gray200}; */
`;
