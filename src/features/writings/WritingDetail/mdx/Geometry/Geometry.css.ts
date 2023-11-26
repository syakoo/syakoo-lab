import { globalStyle, style } from "@vanilla-extract/css";

export const geometrySVGstyle = style({
  textAlign: "start",
});

globalStyle(`${geometrySVGstyle} p`, {
  margin: 0,
  lineHeight: 1,
});
