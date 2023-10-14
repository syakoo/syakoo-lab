import { style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const writingHeaderStyles = {
  iconWrapper: style({
    width: 56,
    height: 56,
    color: tokens.colors.text.primary,
    background: tokens.colors.background.secondary,
    padding: 12,
    borderRadius: tokens.radii.swaying,
    display: "flex",
  }),
};
