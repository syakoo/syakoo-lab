import { style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const artSectionStyles = {
  root: style({
    paddingBlock: tokens.spaces[400],
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
    marginTop: tokens.spaces[400],
    paddingInline: tokens.spaces[200],
    width: "100%",
  }),
};
