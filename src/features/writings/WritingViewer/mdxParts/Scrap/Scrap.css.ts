import { globalStyle, style } from "@vanilla-extract/css";

import { tokens } from "@/design-system/tokens";

export const scrapStyles = {
  root: style({
    padding: tokens.spaces[100],
    overflow: "hidden",
    backgroundColor: tokens.colors.background.secondary,
    borderRadius: tokens.radii[100],

    selectors: {
      "& + &": {
        marginTop: tokens.spaces[300],
      },
    },
  }),

  dateWrapper: style({
    display: "flex",
    gap: tokens.spaces[50],
    alignItems: "center",
    fontSize: tokens.fontSizes[50],
    color: tokens.colors.text.secondary,
  }),

  body: style({}),
};

globalStyle(`${scrapStyles.body} > *:first-child`, {
  paddingTop: 0,
  marginTop: tokens.spaces[50],
});

globalStyle(`${scrapStyles.body} > *:last-child`, {
  marginBottom: 0,
});
