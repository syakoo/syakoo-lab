import { createThemeContract } from "@vanilla-extract/css";

import { tokens } from "./tokens";
export const theme = createThemeContract({
  fontSize: tokens.fontSizes,
  color: tokens.colors,
  fontFamily: tokens.fontFamilies,
  size: tokens.sizes,
  space: tokens.spaces,
  radius: tokens.radii,
});
