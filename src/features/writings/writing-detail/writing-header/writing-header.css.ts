import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const writingHeaderStyles = {
  iconWrapper: style({
    width: 48,
    height: 48,
    color: theme.color.text.primary,
    padding: 12,
    display: "flex",
  }),
};
