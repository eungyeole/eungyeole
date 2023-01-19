import * as React from "react";
import styled from "styled-components";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "quiet";
  size?: "small" | "medium" | "large";

  leadingIcon?: React.ReactNode;
  tailingIcon?: React.ReactNode;
  iconOnly?: boolean;

  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  leadingIcon,
  tailingIcon,
  iconOnly,
  children,
  size = "medium",
  ...props
}) => {
  return (
    <ButtonStyled size={size} {...props}>
      {leadingIcon}
      {iconOnly ? null : children}
      {tailingIcon}
    </ButtonStyled>
  );
};

export default Button;

const ButtonStyled = styled.button<ButtonProps>`
  display: flex;
  align-items: center;

  padding: ${(props) => {
    switch (props.size) {
      case "small":
        return "0.25rem 0.5rem";
      case "large":
        return "0.75rem 1rem";
      default:
        return "0.5rem 1rem";
    }
  }};

  font-size: ${(props) => {
    switch (props.size) {
      case "small":
        return "0.75rem";
      case "large":
        return "1.25rem";
      default:
        return "1rem";
    }
  }};
  border-radius: ${(props) => {
    switch (props.size) {
      case "small":
        return "0.25rem";
      case "large":
        return "0.75rem";
      default:
        return "0.5rem";
    }
  }};

  background-color: ${(props) => {
    switch (props.variant) {
      case "quiet":
        return "transparent";
      default:
        return "#5D5FEF";
    }
  }};

  color: ${(props) => {
    switch (props.variant) {
      case "quiet":
        return "black";
      default:
        return "white";
    }
  }};

  border: ${(props) => {
    switch (props.variant) {
      case "quiet":
        return "1px solid black";
      default:
        return "none";
    }
  }};

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
