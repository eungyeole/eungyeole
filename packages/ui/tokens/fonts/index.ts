import { fontSize } from "./size";
import { fontWeight } from "./weight";

export const fonts = {
  weights: fontWeight,
  sizes: fontSize,
};

export type Fonts = typeof fonts;
