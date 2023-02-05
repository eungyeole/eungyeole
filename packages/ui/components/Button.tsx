import { forwardRef } from "react";
import styled from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "quiet" | "pale";
  size?: "xsmall" | "small" | "medium" | "large";
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  tailingIcon?: React.ReactNode;
  iconOnly?: React.ReactNode;
  children?: React.ReactNode;

  disabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      leadingIcon,
      tailingIcon,
      loading,
      iconOnly,
      children,
      disabled,
      size = "medium",
      ...props
    },
    ref
  ) => {
    return (
      <ButtonStyled
        ref={ref}
        size={size}
        {...props}
        disabled={disabled || loading}
      >
        {!loading && leadingIcon}
        {loading && <AiOutlineLoading3Quarters className="loading-spinner" />}
        {iconOnly ? iconOnly : children}
        {tailingIcon}
      </ButtonStyled>
    );
  }
);

Button.displayName = "Button";

export default Button;

const ButtonStyled = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  transition: 300ms;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  & .loading-spinner {
    animation: spin 1s linear infinite;
  }

  padding: ${(props) => {
    switch (props.size) {
      case "xsmall":
        return "0px 4px";
      case "small":
        return "0 8px";
      case "large":
        return "0 12px";
      default:
        return "0 16px";
    }
  }};

  font-size: ${({ size, theme }) => {
    switch (size) {
      case "xsmall":
        return theme.fonts.sizes.xsmall;
      case "small":
        return theme.fonts.sizes.xsmall;
      case "large":
        return theme.fonts.sizes.large;
      default:
        return theme.fonts.sizes.medium;
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case "xsmall":
        return "24px";
      case "small":
        return "32px";
      case "large":
        return "46px";
      default:
        return "38px";
    }
  }};

  border-radius: ${({ size }) => {
    switch (size) {
      case "xsmall":
        return "3px";
      case "small":
        return "4px";
      case "large":
        return "7px";
      default:
        return "7px";
    }
  }};

  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case "quiet":
        return "transparent";
      case "pale":
        return theme.colors.gray200;
      default:
        return theme.colors.primary;
    }
  }};

  color: ${({ theme, variant }) => {
    switch (variant) {
      case "quiet":
        return theme.colors.gray800;
      case "pale":
        return theme.colors.gray600;
      default:
        return theme.colors.white;
    }
  }};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme, variant }) => {
      switch (variant) {
        case "quiet":
          return theme.colors.gray200;
        case "pale":
          return theme.colors.gray300;
        default:
          return theme.colors.primary;
      }
    }};
  }

  &:disabled {
    cursor: not-allowed;

    background-color: ${({ theme, variant }) => {
      switch (variant) {
        case "quiet":
          return "transparent";
        case "pale":
          return theme.colors.gray200;
        default:
          return theme.colors.gray100;
      }
    }};

    color: ${({ theme, variant }) => {
      switch (variant) {
        case "quiet":
          return theme.colors.gray800;
        case "pale":
          return theme.colors.gray600;
        default:
          return theme.colors.gray500;
      }
    }};
  }
`;
