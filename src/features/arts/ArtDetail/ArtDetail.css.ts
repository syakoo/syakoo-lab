import { style } from "@vanilla-extract/css";

import { theme } from "@/design-system/theme.css";

export const artDetailStyles = {
  root: style({
    paddingBlock: theme.space[400],
  }),
  heartButtonWrapper: style({
    width: 36,
  }),
  imageWrapper: style({
    width: "100%",
    maxWidth: theme.size[100],
    margin: "auto",
  }),
  image: style({
    width: "100%",
    height: "auto",
  }),
  body: style({
    maxWidth: "500px",
    margin: "auto",
    marginTop: theme.space[300],
    paddingInline: theme.space[200],
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.space[100],
  }),
};
