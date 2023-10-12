import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@/design-system/tokens";

export const writingTabStyle = {
  item: recipe({
    base: {
      padding: tokens.spaces[100],
      textDecoration: "none",
    },

    variants: {
      active: {
        true: {
          borderBottom: "4px solid currentColor",
          color: tokens.colors.text.primary,
        },
        false: {
          color: tokens.colors.text.secondary,
        },
      },
    },
  }),
};
