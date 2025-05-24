import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const errorCodeStyles = style({
  fontFamily: "arial black",
  fontSize: theme.fontSize[800],
  fontWeight: "bold",
  color: theme.color.brand.primary,
});
