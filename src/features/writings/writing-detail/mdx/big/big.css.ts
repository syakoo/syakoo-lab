import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const bigStyles = style({
  marginBlock: theme.space[300],
  fontSize: theme.fontSize[400],
  fontWeight: "bold",
});
