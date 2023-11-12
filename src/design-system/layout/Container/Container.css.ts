import { styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { paddingVariantsCollection } from "@/design-system/styleVariants/padding.css";
import { tokens } from "@/design-system/tokens";

export const containerStyle = recipe({
  base: {
    width: "100%",
  },
  variants: {
    size: styleVariants(tokens.sizes, (value) => ({
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
