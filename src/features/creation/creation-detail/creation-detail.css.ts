import { globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "@/shared/design-system/theme.css";

export const styles = {
  contentWrapper: recipe({
    variants: {
      preWrap: {
        true: {
          whiteSpace: "pre-wrap",
        },
      },
    },
    defaultVariants: {
      preWrap: false,
    },
  }),
};

// 以下 MDX のスタイル
const cn = styles.contentWrapper();

globalStyle(`${cn} p`, {
  lineHeight: 2.1,
});
globalStyle(`${cn} p + p`, {
  marginTop: theme.space[100],
});

// ul
globalStyle(`${cn} ul`, {
  listStyleType: "disc",
  marginLeft: "1em",
  marginBlock: theme.space[100],
});
globalStyle(`${cn} ul li::marker`, {
  color: theme.color.text.tertiary,
});
// ol
globalStyle(`${cn} ol`, {
  marginLeft: theme.space[300],
  marginBlock: theme.space[100],
});
globalStyle(`${cn} ol li::marker`, {
  color: theme.color.text.secondary,
});

// h2
globalStyle(`${cn} h2`, {
  marginTop: theme.space[300],
});

// h3
globalStyle(`${cn} h3`, {
  marginTop: theme.space[200],
});
