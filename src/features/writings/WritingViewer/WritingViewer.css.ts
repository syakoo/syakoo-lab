import { style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const writingViewerStyles = {
  root: style({
    display: "grid",
    gridTemplateColumns: `1fr minmax(${tokens.sizes[50]}, ${tokens.sizes[100]}) minmax(${tokens.sizes[50]}, 1fr)`,
    gridTemplateRows: "auto auto",
    gridTemplateAreas: `"l header r"
    "l content aside"`,
  }),
  headerWrapper: style({
    gridArea: "header",
    padding: tokens.spaces[200],
    paddingBlock: tokens.spaces[300],
  }),
  contentWrapper: style({
    gridArea: "content",
    padding: tokens.spaces[200],
  }),
  asideWrapper: style({
    gridArea: "aside",
    padding: tokens.spaces[200],
  }),
};
