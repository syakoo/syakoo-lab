import { style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const writingBlockStyles = {
  iconWrapper: style({
    width: 36,
    height: 36,
    color: tokens.colors.text.primary,
    background: tokens.colors.background.secondary,
    padding: tokens.spaces[100],
    borderRadius: tokens.radii.swaying,
    display: "flex",
  }),
};
