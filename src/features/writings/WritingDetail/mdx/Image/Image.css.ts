import { globalStyle, style } from "@vanilla-extract/css";

import { tokens } from "@/design-system/tokens";

export const imageStyles = {
  figure: style({
    marginBlock: tokens.spaces[200],
    marginInline: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: tokens.spaces[100],
  }),
  caption: style({
    color: tokens.colors.text.secondary,
    textAlign: "center",
  }),
  image: style({
    maxWidth: "100%",
    borderRadius: tokens.radii[50],
    width: "auto",
    height: "auto",
    backgroundColor: tokens.colors.palette.gray[100],
  }),
};

globalStyle(`${imageStyles.figure} > *`, {
  marginBlock: "0 !important",
  marginInline: "auto",
});