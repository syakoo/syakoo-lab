import type { ComplexStyleRule } from "@vanilla-extract/css";
import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "@/shared/design-system/theme.css";
import { range } from "@/shared/utils/array/range";

const circleOption = {
  /**
   * アニメーション用の円の数
   */
  circleNum: 6,
};

const fadeIn = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0) rotate(0deg)",
  },
  "30%": {
    opacity: 0,
  },
  "60%": {
    opacity: 1,
  },
  "100%": {
    opacity: 1,
    transform: "scale(1.3) rotate(180deg)",
  },
});

const fadeOut = keyframes({
  "0%": {
    opacity: 1,
  },
  "100%": {
    opacity: 0,
  },
});

const bounce = keyframes({
  "0%": {
    transform: "scale(1)",
  },
  "33%": {
    transform: "scale(0.3)",
  },
  "66%": {
    transform: "scale(1.5)",
  },
  "90%": {
    transform: "scale(0.8)",
  },
  "95%": {
    transform: "scale(1.1)",
  },
  "100%": {
    transform: "scale(1)",
  },
});

export const heartButtonStyles = {
  root: style({
    position: "relative",
    display: "flex",
    width: "100%",
    padding: "5px 4px 3px 4px",
    color: theme.color.text.secondary,
    background: "transparent",
    border: "none",
    borderRadius: theme.radius[1000],

    ":disabled": {
      color: theme.color.accent.error.foreground,
    },
    selectors: {
      "&:not(:disabled):hover": {
        cursor: "pointer",
        background: theme.color.text.tertiary,
        transition: "0.4s",
      },
      "&:not(:disabled):active": {
        filter: "brightness(0.7)",
      },
    },
  }),
  iconWrapper: recipe({
    base: {
      display: "flex",
      width: "100%",
      aspectRatio: "1 / 1",
    },

    variants: {
      animationFired: {
        true: {
          animation: `${bounce} 0.8s ease-in-out`,
        },
      },
    },
  }),
  animationCircleContainer: style({
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    transformOrigin: "center",
    opacity: 0,
    animation: `${fadeIn} 0.6s 0.4s ease-in-out forwards, ${fadeOut} 0.2s 0.8s ease-in-out forwards`,
  }),
  animationCircle: recipe({
    base: {
      position: "absolute",

      minWidth: 4,
      width: "15%",
      aspectRatio: "1 / 1",
      borderRadius: theme.radius[1000],

      selectors: {
        "&:nth-child(4n)": {
          backgroundColor: theme.color.accent.error.foreground,
        },
        "&:nth-child(4n+1)": {
          backgroundColor: theme.color.accent.success.foreground,
        },
        "&:nth-child(4n+2)": {
          backgroundColor: theme.color.accent.info.foreground,
        },
        "&:nth-child(4n+3)": {
          backgroundColor: theme.color.accent.warn.foreground,
        },
      },
    },

    variants: {
      index: range(0, circleOption.circleNum).reduce<
        Record<number, ComplexStyleRule>
      >(
        (p, index) => ({
          ...p,
          [index]: {
            top: `calc(50% * ${Math.sin(
              (index / circleOption.circleNum) * Math.PI * 2,
            )} + 50%)`,
            left: `calc(50% * ${Math.cos(
              (index / circleOption.circleNum) * Math.PI * 2,
            )} + 50%)`,
            // NOTE: 小さい円の半径分戻す
            transform: "translate(-50%, -50%)",
          },
        }),
        {},
      ),
    },
  }),
};
