import { styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "@/shared/design-system/theme.css";

export const spacerStyle = recipe({
  variants: {
    x: styleVariants(theme.space, (value) => ({
      width: value,
    })),
    y: styleVariants(theme.space, (value) => ({
      height: value,
    })),
  },
});
