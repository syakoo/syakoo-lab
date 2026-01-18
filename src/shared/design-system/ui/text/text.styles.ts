import { cva, type VariantProps } from "class-variance-authority";

export const textStyle = cva("leading-normal", {
  variants: {
    color: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      tertiary: "text-text-tertiary",
      currentColor: "text-current",
    },
    size: {
      "50": "text-50",
      "75": "text-75",
      "100": "text-100",
      "200": "text-200",
      "300": "text-300",
      "400": "text-400",
      "500": "text-500",
      "600": "text-600",
      "700": "text-700",
      "800": "text-800",
    },
    weight: {
      bold: "font-bold",
      normal: "font-normal",
    },
  },
});

export type TextStyleVariants = VariantProps<typeof textStyle>;
