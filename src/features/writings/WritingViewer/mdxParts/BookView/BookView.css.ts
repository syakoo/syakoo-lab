import { style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const bookViewStyles = {
  root: style({
    marginBlock: tokens.spaces[100],
  }),
  imageWrapper: style({
    flexShrink: 0,
    boxShadow: `0 0 5px 0px ${tokens.colors.text.secondary}`,
  }),
  description: style({
    wordBreak: "break-word",
  }),
};
