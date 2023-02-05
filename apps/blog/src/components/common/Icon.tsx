import { FC, HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { Colors } from "ui";

type ColorToken = keyof Colors | (string & {});
interface IconProps extends HTMLAttributes<HTMLDivElement> {
  color?: ColorToken;
  children?: ReactNode;
}
const Icon: FC<IconProps> = ({
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

export default Icon;

const IconWrapper = styled.div<{ color: ColorToken }>`
  display: inherit;
  & > svg {
    fill: ${({ theme, color }) =>
      color
        ? theme.colors[color as keyof Colors] ?? color
        : theme.colors.gray800};
  }
`;
