import { style } from "@vanilla-extract/css";

import { tokens } from "@/design-system/tokens";

export const errorCodeStyles = style({
  fontFamily: "arial black",
  fontSize: tokens.fontSizes[800],
  fontWeight: "bold",
  color: tokens.colors.brand.primary,
});
