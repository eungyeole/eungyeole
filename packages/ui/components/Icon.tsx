import { FC, HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { Colors } from "../tokens";

type ColorToken = keyof Colors | (string & {});
export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  color?: ColorToken;
  children?: ReactNode;
}

export const Icon: FC<IconProps> = ({
  children,
  color = "currentColor",
  ...restProps
}) => {
  return (
    <IconWrapper color={color} {...restProps}>
      {children}
    </IconWrapper>
  );
};

const IconWrapper = styled.div<{ color: ColorToken }>`
  display: inherit;
  & > svg {
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
