import { style } from "@vanilla-extract/css";

import { theme } from "@/design-system/theme.css";

export const sectionTitleStyle = style({
  marginTop: theme.space[500],
  marginBottom: theme.space[200],
  paddingBlock: theme.space[200],
  fontSize: theme.fontSize[500],
  scrollMarginTop: theme.space[200],
  position: "relative",

  selectors: {
    "&:before": {
      position: "absolute",
      top: "0",
      left: `calc(-1 * ${theme.space[200]})`,
      display: "inline-block",
      width: "1em",
      height: "4px",
      content: "",
      background: `linear-gradient(to right bottom, ${theme.color.brand.primary}, ${theme.color.brand.secondary})`,
      borderTopRightRadius: theme.radius[100],
    },
  },
});

export const subsectionTitleStyle = style({
  marginTop: theme.space[400],
  marginBottom: theme.space[200],
  fontSize: theme.fontSize[300],
  scrollMarginTop: theme.space[200],
});
