import { cva, type VariantProps } from "class-variance-authority";

export const linkStyle = cva("no-underline transition-transform duration-200", {
  variants: {
    colored: {
      true: "text-accent-info-foreground",
      false: "text-current",
    },
    underlined: {
      true: "hover:underline",
      false: "hover:no-underline",
    },
    noHovered: {
      true: "hover:translate-y-0",
      false: "hover:-translate-y-px",
    },
    display: {
      block: "block",
      inlineBlock: "inline-block",
    },
    noTransparent: {
      true: "",
      false: "hover:opacity-80",
    },
  },
  defaultVariants: {
    display: "inlineBlock",
  },
});

export type LinkStyleVariants = VariantProps<typeof linkStyle>;
