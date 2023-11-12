import { style } from "@vanilla-extract/css";

import { tokens } from "@/design-system/tokens";

export const sectionTitleStyle = style({
  marginTop: tokens.spaces[500],
  marginBottom: tokens.spaces[200],
  paddingBlock: tokens.spaces[200],
  fontSize: tokens.fontSizes[500],
  scrollMarginTop: tokens.spaces[200],
  position: "relative",

  selectors: {
    "&:before": {
      position: "absolute",
      top: "0",
      left: `-${tokens.spaces[200]}`,
      display: "inline-block",
      width: "1em",
      height: "4px",
      content: "",
      background: `linear-gradient(to right bottom, ${tokens.colors.brand.primary}, ${tokens.colors.brand.secondary})`,
      borderTopRightRadius: tokens.radii[100],
    },
  },
});

export const subsectionTitleStyle = style({
  marginTop: tokens.spaces[400],
  marginBottom: tokens.spaces[200],
  fontSize: tokens.fontSizes[300],
  scrollMarginTop: tokens.spaces[200],
});
