import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { tokens } from "@/design-system/tokens";

export const tocStyles = {
  list: style({
    marginTop: tokens.spaces[100],
    maxWidth: tokens.sizes[50],
    display: "flex",
    flexDirection: "column",
    gap: tokens.spaces[50],
  }),
  item: recipe({
    base: {
      padding: tokens.spaces[25],
      color: tokens.colors.text.secondary,
      fontSize: tokens.fontSizes[75],
    },

    variants: {
      active: {
        true: {
          color: tokens.colors.text.primary,
        },
      },
    },
  }),
};
