import "styled-components";
import { Fonts, Colors } from "ui";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors;
    fonts: Fonts;
  }
}
