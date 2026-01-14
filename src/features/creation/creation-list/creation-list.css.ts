import { style } from "@vanilla-extract/css";

import { tokens } from "@/shared/design-system/tokens/tokens";

export const creationListStyles = {
  listContainer: style({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: tokens.spaces[100],
  }),
};
