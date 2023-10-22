import { style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const writingHeaderStyles = {
  iconWrapper: style({
    width: 48,
    height: 48,
    color: tokens.colors.text.primary,
    background: tokens.colors.background.secondary,
    padding: 8,
    borderRadius: tokens.radii[200],
    display: "flex",
  }),
};
