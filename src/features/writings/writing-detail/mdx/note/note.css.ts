import { globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "@/shared/design-system/theme.css";

export const noteStyles = {
  root: recipe({
    base: {
      display: "flex",
      gap: theme.space[100],
      padding: theme.space[100],
      marginBlock: theme.space[200],
      marginInline: 0,
      borderRadius: theme.radius[50],
      alignItems: "flex-start",
    },
    variants: {
      variant: {
        note: {
          backgroundColor: theme.color.accent.success.background,
        },
        warn: {
          backgroundColor: theme.color.accent.warn.background,
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
          color: theme.color.accent.success.foreground,
        },
        warn: {
          color: theme.color.accent.warn.foreground,
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
  marginTop: theme.space[50],
});
