import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "@/shared/design-system/theme.css";

export const linkCardStyles = {
  root: style({
    display: "flex",
    gap: theme.space[50],
    justifyContent: "space-between",
    marginBlock: theme.space[200],
    backgroundColor: theme.color.background.primary,
    border: `1px solid ${theme.color.background.secondary}`,
    borderRadius: theme.radius[100],
    overflow: "hidden",
  }),
  body: style({
    display: "flex",
    flexDirection: "column",
    gap: theme.space[50],
    paddingBlock: theme.space[200],
    paddingInline: theme.space[100],
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
