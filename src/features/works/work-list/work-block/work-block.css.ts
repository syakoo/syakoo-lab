import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const workBlockStyle = {
  body: style({
    borderRadius: theme.radius[200],
    paddingInline: theme.space[200],
  }),
  imageWrapper: style({
    backgroundColor: theme.color.palette.gray[600],
    borderRadius: theme.radius[200],
    padding: theme.space[50],
    marginTop: theme.space[100],
  }),
  image: style({
    width: 40,
    height: 40,
    objectFit: "contain",
  }),
};
