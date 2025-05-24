import { styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "@/shared/design-system/theme.css";

const colors = {
  ...theme.color.text,
  currentColor: "currentColor",
} as const;

export const textStyle = recipe({
  base: {
    lineHeight: 1.5,
  },

  variants: {
    // TODO: 詳細はパス
    color: styleVariants(colors, (color) => ({
      color,
    })),
    size: styleVariants(theme.fontSize, (size) => ({
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
