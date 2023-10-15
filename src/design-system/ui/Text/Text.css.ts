import { styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@/design-system/tokens";

const colors = {
  ...tokens.colors.text,
  currentColor: "currentColor",
} as const;

export const textStyle = recipe({
  variants: {
    // TODO: 詳細はパス
    color: styleVariants(colors, (color) => ({
      color,
    })),
    size: styleVariants(tokens.fontSizes, (size) => ({
      fontSize: size,
    })),
    weight: {
      bold: {
        fontWeight: "bold",
      },
      normal: {
        fontWeight: "normal",
      },
    },
  },
});
