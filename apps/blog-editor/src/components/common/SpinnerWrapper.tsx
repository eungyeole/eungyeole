import { FC, ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styled, { keyframes } from "styled-components";
import { Flex, Icon } from "ui";

interface SpinnerWrapperProps {
  isLoading: boolean;
  children?: ReactNode;
}

const SpinnerWrapper: FC<SpinnerWrapperProps> = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <Container align="center" justify="center">
          <CustomIcon color="gray700">
            <AiOutlineLoading3Quarters size={36} />
          </CustomIcon>
        </Container>
      ) : (
        children
      )}
    </>
  );
};

export default SpinnerWrapper;

const Container = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const CustomIcon = styled(Icon)`
  animation: ${spin} 1s linear infinite;
`;
