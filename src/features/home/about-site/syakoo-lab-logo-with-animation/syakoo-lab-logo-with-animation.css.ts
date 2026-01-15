import { type CSSProperties, keyframes, style } from "@vanilla-extract/css";

const scaleUp = keyframes({
  "0%": {
    r: "0",
  } as CSSProperties,
  "100%": {
    r: "140",
  } as CSSProperties,
});
export const scaleUpCircleStyle = style({
  animation: `${scaleUp} 0.2s 0.3s forwards ease-out`,
  r: "0",
} as CSSProperties);

const offsetIn = keyframes({
  "0%": {
    strokeDasharray: "0px 227px",
  },
  "100%": {
    strokeDasharray: "227px 0px",
  },
});
export const bGBorderStyle = style({
  animation: `${offsetIn} 0.2s forwards ease-out`,
});

const fadeInOpacity = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});
export const literalSStyle = style({
  animation: `${fadeInOpacity} 0.3s 0.75s forwards ease-out`,
  opacity: 0,
});

const fadeInAndBounce = keyframes({
  "0%": {
    opacity: 0,
    transform: "translate(0px, -50%)",
  },
  "25%": {
    opacity: 1,
    transform: "translate(0px, 0px) scale(1, 1)",
  },
  "40%": {
    transformOrigin: "calc(100% - 26px) bottom",
    transform: "rotate(7deg)",
  },
  "65%": {
    transform: "translate(0px, 0px)",
  },
  "80%": {
    transformOrigin: "bottom left",
    transform: "rotate(-2deg)",
  },
  "100%": {
    opacity: 1,
  },
});
export const cupStyle = style({
  animation: `${fadeInAndBounce} 0.5s 0.2s forwards cubic-bezier(1, 0.02, 1, 0.68)`,
  transformOrigin: "center",
  opacity: 0,
});

const goAround = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "40%": {
    transform: "rotate(0deg)",
  },
  "65%": {
    transform: "rotate(2deg)",
  },
  "75%": {
    transform: "rotate(1deg)",
  },
  "80%": {
    transform: "translate(-2px, 2px) rotate(-1deg)",
  },
  "85%": {
    transform: "translate(-1px, 2px) rotate(-1deg)",
  },
  "100%": {
    transform: "translate(0px, 0px) rotate(0deg)",
  },
});
export const cupSpoonPath = style({
  transformOrigin: "center bottom",
  animation: `${goAround} 0.5s 0.2s forwards ease-out`,
});
