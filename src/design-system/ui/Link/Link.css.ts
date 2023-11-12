import { recipe } from "@vanilla-extract/recipes";

import { tokens } from "@/design-system/tokens";

export const linkStyle = recipe({
  base: {
    display: "inline-block",
    textDecoration: "none",
    color: "currentColor",
    ":hover": {
      textDecoration: "none",
      opacity: 0.8,
      transition: "0.2s transform",
      transform: "translateY(-1px)",
    },
  },

  variants: {
    colored: {
      true: {
        color: tokens.colors.accent.info.foreground,
      },
    },
    underlined: {
      true: {
        ":hover": {
          textDecoration: "underline",
        },
      },
    },
    noHovered: {
      true: {
        ":hover": {
          transform: "none",
        },
      },
    },
    display: {
      block: {
        display: "block",
      },
    },
  },
});
