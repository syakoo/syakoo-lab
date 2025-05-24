import { globalStyle, style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const scrapStyles = {
  root: style({
    padding: theme.space[100],
    overflow: "hidden",
    backgroundColor: theme.color.background.secondary,
    borderRadius: theme.radius[100],

    selectors: {
      "& + &": {
        marginTop: theme.space[300],
      },
    },
  }),

  dateWrapper: style({
    display: "flex",
    gap: theme.space[50],
    alignItems: "center",
    fontSize: theme.fontSize[50],
    color: theme.color.text.secondary,
  }),

  body: style({}),
};

globalStyle(`${scrapStyles.body} > *:first-child`, {
  paddingTop: 0,
  marginTop: theme.space[50],
});

globalStyle(`${scrapStyles.body} > *:last-child`, {
  marginBottom: 0,
});
