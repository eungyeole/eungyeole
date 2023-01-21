import "styled-components";
import { Fonts, Colors } from "./tokens";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors;
    fonts: Fonts;
  }
}
