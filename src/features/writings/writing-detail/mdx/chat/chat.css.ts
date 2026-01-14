import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { tokens } from "@/shared/design-system/tokens/tokens";

export const chatStyles = {
  container: recipe({
    base: {
      display: "flex",
      gap: tokens.spaces[100],
      maxWidth: "calc(90% - 46px)",
      marginBlock: tokens.spaces[200],
    },
    variants: {
      right: {
        true: {
          flexDirection: "row-reverse",
          marginLeft: "auto",
        },
      },
    },
  }),
  avatarImage: style({
    width: "42px",
    height: "42px",
    borderRadius: tokens.radii[1000],
  }),
  messageContainer: recipe({
    base: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: tokens.spaces[100],
    },
    variants: {
      right: {
        true: {
          alignItems: "flex-end",
        },
      },
    },
  }),
  message: style({
    padding: tokens.spaces[100],
    backgroundColor: tokens.colors.background.secondary,
    borderRadius: tokens.radii[200],
  }),
};

globalStyle(`${chatStyles.message} > p`, {
  lineHeight: "1.5 !important",
});
