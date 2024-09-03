import { style } from "@vanilla-extract/css";

import { theme } from "@/design-system/theme.css";

export const listStyles = {
  root: style({
    listStyleType: "disc",
    marginLeft: theme.space[300],
    marginBlock: theme.space[100],
    lineHeight: 1.8,
  }),
  item: style({
    "::marker": {
      color: theme.color.text.secondary,
    },
  }),
};
