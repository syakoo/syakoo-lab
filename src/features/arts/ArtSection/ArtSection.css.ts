import { style } from "@vanilla-extract/css";

import { tokens } from "@/design-system/tokens";

export const artSectionStyles = {
  root: style({
    paddingBlock: tokens.spaces[400],
  }),
  heartButtonWrapper: style({
    width: 36,
  }),
  imageWrapper: style({
    width: "100%",
    maxWidth: tokens.sizes[100],
    margin: "auto",
  }),
  image: style({
    width: "100%",
    height: "auto",
  }),
  body: style({
    maxWidth: "500px",
    margin: "auto",
    marginTop: tokens.spaces[300],
    paddingInline: tokens.spaces[200],
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spaces[100],
  }),
};
