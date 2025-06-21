import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "@/shared/design-system/theme.css";

const icon = recipe({
  base: {
    transition: "transform 0.2s ease-in-out",
    display: "flex", // アイコンを中央寄せにするため
    alignItems: "center", // アイコンを中央寄せにするため
  },
  variants: {
    open: {
      true: {
        transform: "rotate(90deg)",
      },
    },
  },
});

export const styles = {
  root: style({}),

  summary: style({
    display: "flex",
    alignItems: "center",
    gap: theme.space[25],
    width: "100%",
    padding: theme.space[50],
    cursor: "pointer",
    color: theme.color.text.secondary,

    ":hover": {
      color: theme.color.text.primary,
    },
  }),

  content: style({
    border: `1px solid ${theme.color.palette.gray[200]}`,
    borderRadius: "4px",
    padding: theme.space[100],
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
  }),

  icon,
};
