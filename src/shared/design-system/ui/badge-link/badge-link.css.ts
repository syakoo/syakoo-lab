import { style } from "@vanilla-extract/css";

import { theme } from "@/shared/design-system/theme.css";

export const styles = {
  container: style({
    // NOTE: ボーダーの幅を考慮して、paddingを調整する
    paddingBlock: `calc(${theme.space[50]} - 1px)`,
    paddingRight: `calc(${theme.space[100]} - 1px)`,
    paddingLeft: `calc(${theme.space[50]} - 1px)`,
    borderRadius: theme.radius[300],
    border: `1px solid ${theme.color.text.tertiary}`,

    ":hover": {
      backgroundColor: theme.color.background.secondary,
      borderColor: theme.color.text.secondary,
    },
  }),

  iconWrapper: style({
    width: theme.fontSize[400],
    height: theme.fontSize[400],
    padding: theme.space[50],
    borderRadius: theme.radius[1000],
    display: "flex",
  }),
  image: style({
    borderRadius: "100px",
    objectFit: "cover",
  }),
};
