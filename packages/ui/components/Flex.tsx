"use client";
import { HTMLAttributes } from "react";
import styled from "styled-components";
import { PropsToTransientProps } from "../types";

interface BaseFlexProps {
  direction?: "row" | "column";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  flex?: string;
  grow?: number;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  shrink?: number;
  basis?: string;
  order?: number;
  alignSelf?: "auto" | "flex-start" | "flex-end" | "center" | "baseline";
  padding?: string | number;
  margin?: string | number;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export interface FlexProps
  extends HTMLAttributes<HTMLDivElement>,
    BaseFlexProps {}

export const Flex = ({
  children,
  direction,
  justify,
  align,
  wrap,
  flex,
  grow,
  gap,
  rowGap,
  columnGap,
  shrink,
  basis,
  order,
  alignSelf,
  padding,
  margin,
  fullWidth,
  fullHeight,
  ...props
}: FlexProps) => {
  return (
    <FlexStyled
      $align={align}
      $direction={direction}
      $rowGap={rowGap}
      $justify={justify}
      $wrap={wrap}
      $flex={flex}
      $grow={grow}
      $gap={gap}
      $columnGap={columnGap}
      $shrink={shrink}
      $basis={basis}
      $order={order}
      $alignSelf={alignSelf}
      $padding={padding}
      $margin={margin}
      $fullWidth={fullWidth}
      $fullHeight={fullHeight}
      {...props}
    >
      {children}
    </FlexStyled>
  );
};

export const FlexStyled = styled.div<PropsToTransientProps<BaseFlexProps>>`
  display: flex;

  flex-direction: ${(props) => props.$direction || "row"};
  justify-content: ${(props) => props.$justify || "flex-start"};
  align-items: ${(props) => props.$align || "stretch"};
  flex-wrap: ${(props) => props.$wrap || "nowrap"};
  flex: ${(props) => props.$flex || "none"};
  flex-grow: ${(props) => props.$grow || 0};
  flex-shrink: ${(props) => props.$shrink || 1};
  gap: ${(props) => props.$gap || 0}px;
  row-gap: ${(props) => (props.$gap ? `${props.$rowGap}px` : "unset")};
  column-gap: ${(props) => (props.$gap ? `${props.$columnGap}px` : "unset")};

  flex-basis: ${(props) => props.$basis || "auto"};
  order: ${(props) => props.$order || 0};
  align-self: ${(props) => props.$alignSelf || "auto"};
  padding: ${(props) => props.$padding || 0};
  margin: ${(props) => props.$margin || 0};

  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  height: ${(props) => (props.$fullHeight ? "100%" : "auto")};
`;
