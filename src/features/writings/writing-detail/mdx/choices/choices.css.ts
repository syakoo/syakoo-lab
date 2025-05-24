import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "@/shared/design-system/theme.css";

export const choicesStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.space[200],
  marginBlock: theme.space[200],
});

export const choiceStyle = recipe({
  base: {
    display: "block",
    width: "100%",
    minHeight: "16px",
    padding: "4px 12px",
    color: "CurrentColor",
    backgroundColor: theme.color.background.primary,
    border: `1px solid ${theme.color.background.secondary}`,
    borderRadius: theme.radius[300],
    selectors: {
      "&:hover:not(:disabled)": {
        cursor: "pointer",
        backgroundColor: theme.color.background.secondary,
        border: `1px solid ${theme.color.brand.primary}`,
      },
    },
  },

  variants: {
    variant: {
      CORRECT: {
        border: `1px solid ${theme.color.accent.success.foreground}`,
        background: theme.color.accent.success.background,
      },
      INCORRECT: {
        border: `1px solid ${theme.color.accent.error.foreground}`,
        background: theme.color.accent.error.background,
      },
      UNSELECTED: {
        border: `1px solid ${theme.color.background.secondary}`,
      },
    },
  },
});

globalStyle(`${choiceStyle.classNames.base} p`, {
  margin: "0 !important",
});
