import {
  cloneElement,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from "react";
import styled, { css, keyframes } from "styled-components";
import { useOutsideClickEffect } from "utils";
import { Flex } from "./Flex";
import { Icon } from "./Icon";
import { Text } from "./Text";

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  render?: ({ hide }: { hide: () => void }) => ReactNode;
  trigger: ReactNode;
}

export const Dropdown = ({ trigger, render, ...props }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClickEffect([triggerRef, menuRef], () => {
    setIsOpen(false);
  });

  const triggerElement = cloneElement(trigger as any, {
    onClick: toggle,
    ref: triggerRef,
  });

  return (
    <DropdownContainer {...props}>
      {triggerElement}
      {isOpen && (
        <div ref={menuRef}>
          {render &&
            render({
              hide: () => setIsOpen(false),
            })}
        </div>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
`;

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;

  }
`;

interface DropdownMenuProps {
  offsetX?: number;
  offsetY?: number;
  width?: number;
  position?: "left" | "right";
}
const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;

  ${({ width = 100 }) => `width: ${width}px;`}

  top: ${({ offsetY = 0 }) => `calc(100% + ${offsetY}px)`};

  ${({ position, offsetX = 0 }) => {
    if (position === "right") {
      return css`
        right: ${offsetX}px;
      `;
    } else {
      return css`
        left: ${offsetX}px;
      `;
    }
  }}

  animation: ${appear} 0.2s ease-in-out;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 4px 0px;
`;

interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  danger?: boolean;
  leadingIcon?: ReactNode;
  tailingIcon?: ReactNode;
}

const DropdownItem = ({
  children,
  leadingIcon,
  tailingIcon,
  ...props
}: DropdownItemProps) => {
  return (
    <DropdownItemContainer {...props}>
      <Flex align="center" gap={4}>
        {leadingIcon && (
          <Icon size={18} color="currentColor">
            {leadingIcon}
          </Icon>
        )}
        <Text
          whiteSpace="nowrap"
          weight="medium"
          size="small"
          color="currentColor"
        >
          {children}
        </Text>
      </Flex>
    </DropdownItemContainer>
  );
};

const DropdownItemContainer = styled(Flex)<{
  danger?: boolean;
}>`
  padding: 4px 16px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  color: ${({ theme }) => theme.colors.gray700};
  ${({ theme, danger }) =>
    danger &&
    css`
      color: ${theme.colors.red500};
    `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray150};
  }
`;

Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
