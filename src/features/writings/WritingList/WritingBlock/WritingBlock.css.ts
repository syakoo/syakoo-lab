import { style } from "@vanilla-extract/css";

import { theme } from "@/design-system/theme.css";

export const writingBlockStyles = {
  iconWrapper: style({
    width: 36,
    height: 36,
    color: theme.color.text.primary,
    background: theme.color.background.secondary,
    padding: theme.space[100],
    borderRadius: theme.radius.swaying,
    display: "flex",
  }),
};
