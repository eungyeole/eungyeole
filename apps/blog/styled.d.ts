import "styled-components";
import { Colors } from "ui";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors;
  }
}
