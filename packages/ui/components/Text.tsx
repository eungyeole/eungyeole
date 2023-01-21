import { FC, HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";
import { Colors } from "../tokens/colors";
import { TextSize } from "../tokens/fonts/size";
import { TextWeight } from "../tokens/fonts/weight";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: TextSize;
  color?: keyof Colors | (string & {});

  weight?: TextWeight;
  align?: "left" | "center" | "right" | "justify" | "initial" | "inherit";
  lineHeight?: string;
  letterSpacing?: string;
  textOverflow?: "ellipsis" | "clip" | "initial" | "inherit";
  whiteSpace?: "nowrap" | "normal" | "pre" | "pre-line" | "pre-wrap";
  overflow?: "hidden" | "visible" | "scroll" | "auto" | "initial" | "inherit";
  wordBreak?: "normal" | "break-all" | "keep-all" | "initial" | "inherit";
  wordWrap?: "normal" | "break-word" | "initial" | "inherit";
  margin?: string;
  padding?: string;
}

export const Text: FC<PropsWithChildren<TextProps>> = (props) => {
  const { children, ...rest } = props;
  return <StyledText {...rest}>{children}</StyledText>;
};

const StyledText = styled.p<TextProps>`
  font-size: ${({ size, theme }) => theme.fonts.sizes[size || "medium"]};
  color: ${({ theme, color }) =>
    color
      ? theme.colors[color as keyof Colors] ?? color
      : theme.colors.gray800};
  font-weight: ${({ theme, weight }) =>
    theme.fonts.weights[weight || "regular"]};

  text-align: ${(props) => props.align || "left"};
  line-height: ${(props) => props.lineHeight || "1.5"};
  letter-spacing: ${(props) => props.letterSpacing || "normal"};
  margin: ${(props) => props.margin || 0};
  padding: ${(props) => props.padding || 0};
  text-overflow: ${(props) => props.textOverflow || "clip"};
  white-space: ${(props) => props.whiteSpace || "normal"};
  overflow: ${(props) => props.overflow || "visible"};
  word-break: ${(props) => props.wordBreak || "normal"};
  word-wrap: ${(props) => props.wordWrap || "normal"};
`;
