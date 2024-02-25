import { globalStyle, style } from "@vanilla-extract/css";

import { theme } from "@/design-system/theme.css";

export const figureStyle = style({
  marginBlock: theme.space[200],
  marginInline: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: theme.space[100],
});

export const figureCaptionStyle = style({
  color: theme.color.text.secondary,
  textAlign: "center",
});

globalStyle(`${figureStyle} > *`, {
  marginBlock: "0 !important",
  marginInline: "auto",
});
