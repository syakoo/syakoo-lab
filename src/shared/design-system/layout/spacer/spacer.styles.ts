import { cva, type VariantProps } from "class-variance-authority";

export const spacerStyle = cva("", {
  variants: {
    x: {
      "25": "w-25",
      "50": "w-50",
      "100": "w-100",
      "200": "w-200",
      "300": "w-300",
      "400": "w-400",
      "500": "w-500",
    },
    y: {
      "25": "h-25",
      "50": "h-50",
      "100": "h-100",
      "200": "h-200",
      "300": "h-300",
      "400": "h-400",
      "500": "h-500",
    },
  },
});

export type SpacerStyleVariants = VariantProps<typeof spacerStyle>;
