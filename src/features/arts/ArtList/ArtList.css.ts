import { style } from "@vanilla-extract/css";

import { tokens } from "@/design-system/tokens";

export const artListStyles = {
  listContainer: style({
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spaces[200],

    "@media": {
      "screen and (max-width: 700px)": {
        gridTemplateColumns: "repeat(3, 1fr)",
      },
      "screen and (max-width: 400px)": {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
      "screen and (max-width: 300px)": {
        gridTemplateColumns: "repeat(1, 1fr)",
      },
    },
  }),
};