import { style } from "@vanilla-extract/css";

import { tokens } from "@/design-system/tokens";

export const writingHeaderStyles = {
  iconWrapper: style({
    width: 48,
    height: 48,
    color: tokens.colors.text.primary,
    background: tokens.colors.background.secondary,
    padding: 12,
    borderRadius: tokens.radii.swaying,
    display: "flex",
    marginInline: "auto",
  }),
  titleWrapper: style({
    textAlign: "center",
  }),
};
