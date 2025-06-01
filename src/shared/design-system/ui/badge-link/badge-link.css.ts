import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const styles = {
  container: style({
    paddingBlock: theme.space[50],
    paddingRight: theme.space[100],
    paddingLeft: theme.space[50],
    borderRadius: theme.radius[300],
    border: `1px solid ${theme.color.text.tertiary}`,

    ":hover": {
      backgroundColor: theme.color.background.secondary,
      borderColor: theme.color.text.secondary,
    },
  }),

  image: style({
    borderRadius: "100px",
    objectFit: "cover",
  }),
};
