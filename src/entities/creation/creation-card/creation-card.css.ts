import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const root = style({
  position: "relative",
  width: "100%",
  minWidth: "150px",
});

export const imageContainer = style({
  position: "relative",
  aspectRatio: "1/1",
  width: "100%",
  overflow: "hidden",
  borderRadius: theme.radius[200],
});

export const image = style({
  objectFit: "cover",
  transition: "transform 0.3s",
});

export const typeContainer = style({
  position: "absolute",
  bottom: theme.space[50],
  right: theme.space[50],
  backgroundColor: "#15212C",
  padding: theme.space[50],
  borderRadius: theme.radius[100],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 26,
  height: 26,
});

export const typeIcon = style({
  color: theme.color.text.primary,
  width: "14px",
  height: "14px",
});
