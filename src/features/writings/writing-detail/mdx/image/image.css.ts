import { globalStyle, style } from "@vanilla-extract/css";

import { theme } from "@/design-system/theme.css";

export const imageStyles = {
  figure: style({
    marginBlock: theme.space[200],
    marginInline: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: theme.space[100],
  }),
  caption: style({
    color: theme.color.text.secondary,
    textAlign: "center",
  }),
  image: style({
    maxWidth: "100%",
    borderRadius: theme.radius[50],
    width: "auto",
    height: "auto",
    backgroundColor: theme.color.palette.gray[100],
  }),
};

globalStyle(`${imageStyles.figure} > *`, {
  marginBlock: "0 !important",
  marginInline: "auto",
});
