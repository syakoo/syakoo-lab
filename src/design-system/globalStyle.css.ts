import { assignVars, globalStyle } from "@vanilla-extract/css";

import { theme } from "./theme.css";
import { tokens } from "./tokens";

globalStyle(":root", {
  vars: assignVars(theme, {
    fontSize: tokens.fontSizes,
    color: tokens.colors,
    fontFamily: tokens.fontFamilies,
    size: tokens.sizes,
    space: tokens.spaces,
    radius: tokens.radii,
  }),
});

globalStyle("html, body", {
  backgroundColor: theme.color.background.primary,
  color: theme.color.text.primary,
  fontFamily: theme.fontFamily.primary,
  fontSize: theme.fontSize[100],
});

globalStyle("img, svg", {
  verticalAlign: "middle",
});

globalStyle("ul", {
  listStyleType: "none",
});
