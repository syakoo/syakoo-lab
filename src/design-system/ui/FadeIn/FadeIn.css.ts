import { keyframes, style } from "@vanilla-extract/css";

const fadeInAnimation = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(10px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const fadeInStyle = style({
  opacity: 0,
  animation: `${fadeInAnimation} forwards cubic-bezier(0.25, 0.1, 0.05, 1.01)`,
});
