import { FC, HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

export type TextSize =
  | "xxsmall"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge"
  | "xxxlarge"
  | "xxxxlarge";

export type TextWeight = "regular" | "medium" | "bold";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: TextSize;
  color?: string;

  weight?: TextWeight;
  align?: string;
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

const fontSize: Record<TextSize, string> = {
  xxsmall: "12px",
  xsmall: "14px",
  small: "15px",
  medium: "16px",
  large: "18px",
  xlarge: "21px",
  xxlarge: "24px",
  xxxlarge: "36px",
  xxxxlarge: "48px",
};

const fontWeight: Record<TextWeight, string> = {
  regular: "400",
  medium: "600",
  bold: "700",
};

export const Text: FC<PropsWithChildren<TextProps>> = (props) => {
  const { children, ...rest } = props;
  return <StyledText {...rest}>{children}</StyledText>;
};

const StyledText = styled.p<TextProps>`
  font-size: ${({ size }) => fontSize[size || "medium"]};
  color: ${(props) => props.color || "black"};
  font-weight: ${(props) => fontWeight[props.weight || "regular"]};

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
