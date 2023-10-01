import { style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const linkStyle = style({
  backgroundColor: tokens.colors.palette.gray[700],
  padding: tokens.spaces[25],
  display: "flex",
  borderRadius: tokens.radii[50],
});

export const linkImageStyle = style({
  width: 16,
  height: 16,
  objectFit: "contain",
});
