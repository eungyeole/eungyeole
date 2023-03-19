import styled, { css } from "styled-components";

interface DividerProps {
  direction?: "horizontal" | "vertical";
}
export const Divider = styled.div<DividerProps>`
  background-color: ${({ theme }) => theme.colors.gray200};
  margin: 0 4px;
  ${({ direction = "horizontal" }) => {
    if (direction === "horizontal") {
      return css`
        height: 1px;
        width: 100%;
      `;
    } else {
      return css`
        width: 1px;
        height: 100%;
      `;
    }
  }}
`;
