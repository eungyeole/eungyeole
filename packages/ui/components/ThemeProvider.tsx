import * as React from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { colors } from "../colors";

export interface ThemeProviderProps {
  children?: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <StyledComponentsThemeProvider
      theme={{
        colors,
      }}
    >
      {children as string}
    </StyledComponentsThemeProvider>
  );
};
