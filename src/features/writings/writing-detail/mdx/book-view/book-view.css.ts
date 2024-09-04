import { style } from "@vanilla-extract/css";

import { theme } from "@/design-system/theme.css";

export const bookViewStyles = {
  root: style({
    marginBlock: theme.space[100],
  }),
  imageWrapper: style({
    flexShrink: 0,
    boxShadow: `0 0 5px 0px ${theme.color.text.secondary}`,
  }),
  description: style({
    wordBreak: "break-word",
  }),
};
