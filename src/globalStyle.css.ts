import { globalStyle } from "@vanilla-extract/css";
import { tokens } from "./design-system/tokens";

globalStyle("html, body", {
  backgroundColor: tokens.colors.background.primary,
  color: tokens.colors.text.primary,
  fontFamily: tokens.fontFamilies.primary,
  fontSize: tokens.fontSizes[100],
});

globalStyle("img, svg", {
  verticalAlign: "middle",
});

globalStyle("ul", {
  listStyleType: "none",
});
