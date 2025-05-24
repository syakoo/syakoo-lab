import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const linkStyle = style({
  backgroundColor: theme.color.palette.gray[700],
  padding: theme.space[25],
  display: "flex",
  borderRadius: theme.radius[50],
});

export const linkImageStyle = style({
  width: 16,
  height: 16,
  objectFit: "contain",
});
