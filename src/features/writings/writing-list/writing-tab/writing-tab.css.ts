import { recipe } from "@vanilla-extract/recipes";

import { theme } from "@/shared/design-system/theme.css";

export const writingTabStyle = {
  item: recipe({
    base: {
      padding: theme.space[100],
      textDecoration: "none",
    },

    variants: {
      active: {
        true: {
          borderBottom: "4px solid currentColor",
          color: theme.color.text.primary,
        },
        false: {
          color: theme.color.text.secondary,
        },
      },
    },
  }),
};
