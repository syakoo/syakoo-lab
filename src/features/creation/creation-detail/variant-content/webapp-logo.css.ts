import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const styles = {
  logo: style({
    width: 64,
    maxWidth: "100%",
    height: "auto",
    borderRadius: theme.radius[100],
  }),
};
