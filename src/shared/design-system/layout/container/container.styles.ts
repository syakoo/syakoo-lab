import { cva, type VariantProps } from "class-variance-authority";

export const containerStyle = cva("w-full", {
  variants: {
    size: {
      "50": "max-w-container-50",
      "100": "max-w-container-100",
      "200": "max-w-container-200",
    },
    center: {
      true: "m-auto",
      false: "",
    },
    paddingLeft: {
      "25": "pl-25",
      "50": "pl-50",
      "100": "pl-100",
      "200": "pl-200",
      "300": "pl-300",
      "400": "pl-400",
      "500": "pl-500",
    },
    paddingRight: {
      "25": "pr-25",
      "50": "pr-50",
      "100": "pr-100",
      "200": "pr-200",
      "300": "pr-300",
      "400": "pr-400",
      "500": "pr-500",
    },
    paddingTop: {
      "25": "pt-25",
      "50": "pt-50",
      "100": "pt-100",
      "200": "pt-200",
      "300": "pt-300",
      "400": "pt-400",
      "500": "pt-500",
    },
    paddingBottom: {
      "25": "pb-25",
      "50": "pb-50",
      "100": "pb-100",
      "200": "pb-200",
      "300": "pb-300",
      "400": "pb-400",
      "500": "pb-500",
    },
    paddingX: {
      "25": "px-25",
      "50": "px-50",
      "100": "px-100",
      "200": "px-200",
      "300": "px-300",
      "400": "px-400",
      "500": "px-500",
    },
    paddingY: {
      "25": "py-25",
      "50": "py-50",
      "100": "py-100",
      "200": "py-200",
      "300": "py-300",
      "400": "py-400",
      "500": "py-500",
    },
    padding: {
      "25": "p-25",
      "50": "p-50",
      "100": "p-100",
      "200": "p-200",
      "300": "p-300",
      "400": "p-400",
      "500": "p-500",
    },
  },
});

export type ContainerStyleVariants = VariantProps<typeof containerStyle>;
