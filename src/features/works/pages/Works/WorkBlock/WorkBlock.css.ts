import { style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const workBlockStyle = {
  body: style({
    backgroundColor: tokens.colors.background.secondary,
    borderRadius: tokens.radii[200],
    padding: tokens.spaces[200],
  }),
  image: style({
    width: 50,
    height: 50,
    objectFit: "contain",
  }),
};
