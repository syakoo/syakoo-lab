import { tokens } from "@design-system/tokens";
import { styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const textStyle = recipe({
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
