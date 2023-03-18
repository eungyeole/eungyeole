import { FC, ImgHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { Flex } from "./Flex";

export interface BaseAvatarProps {
  name?: string;
  variant?: "square" | "circle";
  size?: "xsmall" | "small" | "medium" | "large";
}

export type AvatarProps = BaseAvatarProps & ImgHTMLAttributes<HTMLImageElement>;

export const Avatar: FC<AvatarProps> = ({
  src,
  name,
  size,
  variant,
  ...props
}) => {
  return (
    <AvatarContainer size={size} variant={variant}>
      {src ? (
        <AvatarImage src={src} {...props} />
      ) : (
        <EmptyAvatarContainer align="center" justify="center">
          {name?.charAt(0).toUpperCase()}
        </EmptyAvatarContainer>
      )}
    </AvatarContainer>
  );
};

const AvatarContainer = styled.div<BaseAvatarProps>`
  overflow: hidden;
  border-radius: ${({ variant = "square" }) => {
    switch (variant) {
      case "square":
        return "4px";
      default:
        return "50%";
    }
  }};

  ${({ size = "medium" }) => {
    switch (size) {
      case "xsmall":
        return css`
          width: 24px;
          height: 24px;
        `;
      case "small":
        return css`
          width: 32px;
          height: 32px;
        `;
      case "large":
        return css`
          width: 46px;
          height: 46px;
        `;
      default:
        return css`
          width: 38px;
          height: 38px;
        `;
    }
  }}
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EmptyAvatarContainer = styled(Flex)`
  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};

  font-size: ${({ theme }) => theme.fonts.sizes.xsmall};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;
