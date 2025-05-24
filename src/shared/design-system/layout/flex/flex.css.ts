import { styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "@/shared/design-system/theme.css";

const justifyProperties = {
  flexStart: "flex-start",
  center: "center",
  flexEnd: "flex-end",
  spaceBetween: "space-between",
  spaceAround: "space-around",
  spaceEvenly: "space-evenly",
};

const alignProperties = {
  flexStart: "flex-start",
  center: "center",
  flexEnd: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

export const flexStyle = recipe({
  base: {
    display: "flex",
  },

  variants: {
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
    },
    justify: styleVariants(justifyProperties, (value) => ({
      justifyContent: value,
    })),
    align: styleVariants(alignProperties, (value) => ({
      alignItems: value,
    })),
    gap: styleVariants(theme.space, (value) => ({
      gap: value,
    })),
    wrap: {
      true: {
        flexWrap: "wrap",
      },
    },
  },
});

export const flexItemStyle = recipe({
  base: {
    width: "unset",
  },

  variants: {
    shrink: {
      0: {
        flexShrink: 0,
      },
      1: {
        flexShrink: 1,
      },
    },
    grow: {
      0: {
        flexGrow: 0,
      },
      1: {
        flexGrow: 1,
      },
    },
    align: styleVariants(alignProperties, (value) => ({
      alignSelf: value,
    })),
  },
});
