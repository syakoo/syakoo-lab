import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { tokens } from "@/design-system/tokens";

export const linkCardStyles = {
  root: style({
    display: "flex",
    gap: tokens.spaces[50],
    justifyContent: "space-between",
    marginBlock: tokens.spaces[200],
    backgroundColor: tokens.colors.background.primary,
    border: `1px solid ${tokens.colors.background.secondary}`,
    borderRadius: tokens.radii[100],
    overflow: "hidden",
  }),
  body: style({
    display: "flex",
    flexDirection: "column",
    gap: tokens.spaces[50],
    paddingBlock: tokens.spaces[200],
    paddingInline: tokens.spaces[100],
  }),
  textContainer: recipe({
    base: {
      display: "-webkit-box",
      overflow: "hidden",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
    },
    variants: {
      lines: {
        2: {
          WebkitLineClamp: 2,
        },
        1: {
          WebkitLineClamp: 1,
        },
      },
    },
  }),
  thumbnailWrapper: style({
    maxWidth: "300px",
    minWidth: "100px",
  }),
  thumbnail: style({
    flexShrink: 0,
    width: "100%",
    maxHeight: "128px",
    height: "100%",
    objectFit: "cover",
    margin: 0,
  }),
};
