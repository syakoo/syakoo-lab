import { style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const workBlockArticleStyle = style({
  padding: tokens.spaces[200],
  backgroundColor: tokens.colors.background.secondary,
  borderRadius: tokens.radii[200],
});

export const workBlockImageStyle = style({
  width: 50,
  height: 50,
  objectFit: "contain",
});
