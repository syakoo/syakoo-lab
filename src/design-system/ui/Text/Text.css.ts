import { styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@/design-system/tokens";

export const textStyle = recipe({
  base: {
    margin: 0,
  },

  variants: {
    // TODO: 詳細はパス
    color: styleVariants(tokens.colors.text, (color) => ({
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
