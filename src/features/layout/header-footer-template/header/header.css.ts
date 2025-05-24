import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const headerHeightPx = 74;
export const headerStyle = style({
  background: `color-mix(in srgb, ${theme.color.background.primary} 80%, transparent)`,
  height: `${headerHeightPx}px`,
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  alignItems: "center",
  gap: theme.space[100],
  backdropFilter: "blur(10px)",
  paddingInline: theme.space[200],
});
