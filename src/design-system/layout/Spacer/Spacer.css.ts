import { styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@/design-system/tokens";

export const spacerStyle = recipe({
  variants: {
    x: styleVariants(tokens.spaces, (value) => ({
      width: value,
    })),
    y: styleVariants(tokens.spaces, (value) => ({
      height: value,
    })),
  },
});
