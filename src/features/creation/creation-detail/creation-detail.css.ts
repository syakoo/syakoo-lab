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
const contentWrapperClassName = styles.contentWrapper();

globalStyle(`${contentWrapperClassName} p`, {
  lineHeight: 2.1,
});
globalStyle(`${contentWrapperClassName} p + p`, {
  marginTop: theme.space[100],
});

// ul
globalStyle(`${contentWrapperClassName} ul`, {
  listStyleType: "disc",
  marginLeft: "1em",
  marginBlock: theme.space[100],
});
globalStyle(`${contentWrapperClassName} ul li::marker`, {
  color: theme.color.text.tertiary,
});
// ol
globalStyle(`${contentWrapperClassName} ol`, {
  marginLeft: theme.space[300],
  marginBlock: theme.space[100],
});
globalStyle(`${contentWrapperClassName} ol li::marker`, {
  color: theme.color.text.secondary,
});

// h2
globalStyle(`${contentWrapperClassName} h2`, {
  marginTop: theme.space[300],
});

// h3
globalStyle(`${contentWrapperClassName} h3`, {
  marginTop: theme.space[200],
});
