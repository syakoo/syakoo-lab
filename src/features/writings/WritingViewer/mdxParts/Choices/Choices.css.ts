import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@/design-system/tokens";

export const choicesStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spaces[200],
  marginBlock: tokens.spaces[200],
});

export const choiceStyle = recipe({
  base: {
    display: "block",
    width: "100%",
    minHeight: "16px",
    padding: "4px 12px",
    color: "CurrentColor",
    backgroundColor: tokens.colors.background.primary,
    border: `1px solid ${tokens.colors.background.secondary}`,
    borderRadius: tokens.radii[300],
    selectors: {
      "&:hover:not(:disabled)": {
        cursor: "pointer",
        backgroundColor: tokens.colors.background.secondary,
        border: `1px solid ${tokens.colors.brand.primary}`,
      },
    },
  },

  variants: {
    variant: {
      CORRECT: {
        border: `1px solid ${tokens.colors.accent.success.foreground}`,
        background: tokens.colors.accent.success.background,
      },
      INCORRECT: {
        border: `1px solid ${tokens.colors.accent.error.foreground}`,
        background: tokens.colors.accent.error.background,
      },
      UNSELECTED: {
        border: `1px solid ${tokens.colors.background.secondary}`,
      },
    },
  },
});

globalStyle(`${choiceStyle.classNames.base} p`, {
  margin: "0 !important",
});
