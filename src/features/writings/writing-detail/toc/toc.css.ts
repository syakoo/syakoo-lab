import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "@/shared/design-system/theme.css";

export const tocStyles = {
  list: style({
    marginTop: theme.space[50],
    maxWidth: theme.size[50],
    display: "flex",
    flexDirection: "column",
    gap: theme.space[25],
  }),
  item: recipe({
    base: {
      padding: theme.space[25],
      color: theme.color.text.secondary,
      fontSize: theme.fontSize[75],
    },

    variants: {
      active: {
        true: {
          color: theme.color.text.primary,
        },
      },
    },
  }),
};
