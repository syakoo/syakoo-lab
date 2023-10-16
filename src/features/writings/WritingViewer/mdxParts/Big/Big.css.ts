import { style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const bigStyles = style({
  marginBlock: tokens.spaces[300],
  fontSize: tokens.fontSizes[400],
  fontWeight: "bold",
});
