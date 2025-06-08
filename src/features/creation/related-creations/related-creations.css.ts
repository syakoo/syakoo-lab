import { style } from "@vanilla-extract/css";

export const styles = {
  carousel: style({
    overflowX: "auto",
    // スクロールバーを隠す
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
  }),
} as const;
