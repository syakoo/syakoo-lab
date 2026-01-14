import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";
import { tokens } from "@/shared/design-system/tokens/tokens";

export const styles = {
  container: style({
    display: "flex",
    "@media": {
      [`screen and (max-width: ${tokens.breakPoints.mobile})`]: {
        marginInline: `calc(-1 * ${theme.space[200]})`,
      },
    },
  }),

  image: style({
    marginInline: "auto",
    maxWidth: "100%",
    height: "auto",
  }),
};
