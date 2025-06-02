import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";
import { tokens } from "@/shared/design-system/tokens";

export const styles = {
  container: style({
    display: "flex",
    "@media": {
      [`screen and (max-width: ${tokens.breakPoints.mobile})`]: {
        marginInline: `calc(-1 * ${theme.space[200]})`,
      },
    },
  }),

  screen: style({
    marginInline: "auto",
    maxWidth: "100%",
    height: "auto",
  }),
};
