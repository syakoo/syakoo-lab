import { styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { paddingVariantsCollection } from "@/shared/design-system/style-variants/padding.css";
import { theme } from "@/shared/design-system/theme.css";

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
