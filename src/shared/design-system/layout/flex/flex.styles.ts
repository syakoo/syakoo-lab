import { cva, type VariantProps } from "class-variance-authority";

export const flexStyle = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    justify: {
      flexStart: "justify-start",
      center: "justify-center",
      flexEnd: "justify-end",
      spaceBetween: "justify-between",
      spaceAround: "justify-around",
      spaceEvenly: "justify-evenly",
    },
    align: {
      flexStart: "items-start",
      center: "items-center",
      flexEnd: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    gap: {
      "25": "gap-25",
      "50": "gap-50",
      "100": "gap-100",
      "200": "gap-200",
      "300": "gap-300",
      "400": "gap-400",
      "500": "gap-500",
    },
    wrap: {
      true: "flex-wrap",
      false: "",
    },
  },
});

export const flexItemStyle = cva("w-auto", {
  variants: {
    shrink: {
      0: "shrink-0",
      1: "shrink",
    },
    grow: {
      0: "grow-0",
      1: "grow",
    },
    align: {
      flexStart: "self-start",
      center: "self-center",
      flexEnd: "self-end",
      stretch: "self-stretch",
      baseline: "self-baseline",
    },
  },
});

export type FlexStyleVariants = VariantProps<typeof flexStyle>;
export type FlexItemStyleVariants = VariantProps<typeof flexItemStyle>;
