"use client";
import { FC, HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { Colors } from "../tokens";

type ColorToken = keyof Colors | (string & {});
export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  color?: ColorToken;
  children?: ReactNode;
  size?: number;
  rotate?: number;
}

export const Icon: FC<IconProps> = ({
  children,
  color = "currentColor",
  size,
  ...restProps
}) => {
  return (
    <IconWrapper size={size} color={color} {...restProps}>
      {children}
    </IconWrapper>
  );
};

const IconWrapper = styled.div<{
  color: ColorToken;
  size?: number;
  rotate?: number;
}>`
  display: inherit;

  & > svg {
    ${({ size }) => size && `width: ${size}px; height: ${size}px;`};
    ${({ rotate }) => rotate && `transform: rotate(${rotate}deg);`};
    transition: all 0.2s;
    fill: ${({ theme, color }) =>
      color
        ? theme.colors[color as keyof Colors] ?? color
        : theme.colors.gray800};
    stroke: ${({ theme, color }) =>
      color
        ? theme.colors[color as keyof Colors] ?? color
        : theme.colors.gray800};
  }
`;
