import { styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { paddingVariantsCollection } from "@/design-system/style-variants/padding.css";
import { theme } from "@/design-system/theme.css";

export const containerStyle = recipe({
  base: {
    width: "100%",
  },
  variants: {
    size: styleVariants(theme.size, (value) => ({
      maxWidth: value,
    })),
    center: {
      true: {
        margin: "auto",
      },
    },
    ...paddingVariantsCollection,
  },
});
