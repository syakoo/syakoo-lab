import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const figureStyle = style({
  marginBlock: tokens.spaces[200],
  marginInline: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: tokens.spaces[100],
});

export const figureCaptionStyle = style({
  color: tokens.colors.text.secondary,
  textAlign: "center",
});

globalStyle(`${figureStyle} > *`, {
  marginBlock: "0 !important",
  marginInline: "auto",
});
