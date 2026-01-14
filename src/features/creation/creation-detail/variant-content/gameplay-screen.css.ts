import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";
import { tokens } from "@/shared/design-system/tokens/tokens";

export const styles = {
  screenContainer: style({
    display: "flex",
    "@media": {
      [`screen and (max-width: ${tokens.breakPoints.mobile})`]: {
        marginInline: `calc(-1 * ${theme.space[200]})`,
      },
    },
  }),

  screen: style({
    marginInline: "auto",
    width: "100%",
    height: "auto",
  }),

  fullscreenButtonContainer: style({
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: theme.space[50],
  }),

  fullscreenButton: style({
    display: "flex",
    width: 19,
    height: 19,
    padding: theme.space[25],
    borderRadius: "4px",
    cursor: "pointer",
    color: theme.color.text.primary,
    transition: "opacity 0.2s ease-in-out",
    ":hover": {
      opacity: 0.8,
    },
  }),
};
