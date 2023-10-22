import { globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@/design-system/tokens";

export const noteStyles = {
  root: recipe({
    base: {
      display: "flex",
      gap: tokens.spaces[100],
      padding: tokens.spaces[100],
      marginBlock: tokens.spaces[200],
      marginInline: 0,
      borderRadius: tokens.radii[50],
      alignItems: "start",
    },
    variants: {
      variant: {
        note: {
          backgroundColor: tokens.colors.accent.success.background,
        },
        warn: {
          backgroundColor: tokens.colors.accent.warn.background,
        },
      },
    },
  }),
  iconWrapper: recipe({
    base: {
      display: "flex",
      flexShrink: 0,
      width: "1.4rem",
    },

    variants: {
      variant: {
        note: {
          color: tokens.colors.accent.success.foreground,
        },
        warn: {
          color: tokens.colors.accent.warn.foreground,
        },
      },
    },
  }),
};

globalStyle(
  `${noteStyles.root.classNames.base} p, ${noteStyles.root.classNames.base} ul, ${noteStyles.root.classNames.base} pre`,
  {
    lineHeight: 1.6,
  },
);

globalStyle(`${noteStyles.root.classNames.base} p + p`, {
  marginTop: tokens.spaces[50],
});
