import { style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const workBlockStyle = {
  body: style({
    borderRadius: tokens.radii[200],
    padding: tokens.spaces[200],
  }),
  imageWrapper: style({
    backgroundColor: tokens.colors.palette.gray[600],
    borderRadius: tokens.radii[200],
    padding: tokens.spaces[50],
  }),
  image: style({
    width: 40,
    height: 40,
    objectFit: "contain",
  }),
};
