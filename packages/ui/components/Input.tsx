import { FC, forwardRef, InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = "large", fullWidth, ...props }, ref) => {
    return (
      <StyledInput
        ref={ref}
        inputSize={size}
        fullWidth={fullWidth}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

const StyledInput = styled.input<{
  inputSize: "small" | "medium" | "large";
  fullWidth?: boolean;
}>`
  box-sizing: border-box;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  ${({ inputSize }) => {
    switch (inputSize) {
      case "small":
        return css`
          height: 32px;
          padding: 0 12px;
          font-size: ${({ theme }) => theme.fonts.sizes.small};
        `;
      case "medium":
        return css`
          height: 38px;
          padding: 0 12px;
          font-size: ${({ theme }) => theme.fonts.sizes.medium};
        `;
      default:
        return css`
          height: 46px;
          padding: 0 16px;
          font-size: ${({ theme }) => theme.fonts.sizes.medium};
        `;
    }
  }};
  transition: 0.15s ease-in-out;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  border-radius: 4px;
  outline: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray500};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.gray600};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;
