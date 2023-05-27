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

export const fontSize: Record<TextSize, string> = {
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
