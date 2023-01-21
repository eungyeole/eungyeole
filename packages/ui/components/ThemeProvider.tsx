import * as React from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { colors, fonts } from "../tokens";

export interface ThemeProviderProps {
  children?: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <StyledComponentsThemeProvider
      theme={{
        colors,
        fonts,
      }}
    >
      {children as string}
    </StyledComponentsThemeProvider>
  );
};
