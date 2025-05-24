import { globalStyle, style } from "@vanilla-extract/css";

import { theme } from "@/design-system/theme.css";
import { headerHeightPx } from "@/features/layout/header-footer-template/header/header.css";

// 縦配置のメディア条件式
const columnLayoutScreen = `screen and (max-width: 800px)` as const;

export const writingDetailStyles = {
  root: style({
    display: "grid",
    maxWidth: 1500,
    margin: "auto",
    justifyContent: "center",
    gridTemplateColumns: `1fr minmax(${theme.size[50]}, ${theme.size[100]}) minmax(${theme.size[50]}, 1fr)`,
    gridTemplateRows: "auto auto",
    gridTemplateAreas: `"l header r"
                        "l content aside"`,

    "@media": {
      [columnLayoutScreen]: {
        gridTemplateColumns: "100%",
        gridTemplateRows: "auto auto",
        gridTemplateAreas: `"header"
                            "content"`,
      },
    },
  }),
  headerWrapper: style({
    gridArea: "header",
    padding: theme.space[200],
    paddingBlock: theme.space[400],
  }),
  contentWrapper: style({
    gridArea: "content",
    padding: theme.space[200],
  }),
  asideWrapper: style({
    gridArea: "aside",
    padding: theme.space[200],
    display: "flex",
    flexDirection: "column",
    gap: theme.space[200],
    height: "100%",

    "@media": {
      [columnLayoutScreen]: {
        display: "none",
      },
    },
  }),
  stickyContainer: style({
    position: "sticky",
    top: `calc(${theme.space[200]} + ${headerHeightPx}px)`,
  }),
};

// 以下 MDX のスタイル
/**
 * MDX コンテナのクラス名
 */
const cn = writingDetailStyles.contentWrapper;

// NOTE: 一つ目の要素は上の空白を消す
globalStyle(`${cn} > *:first-child`, {
  marginTop: "0 !important",
});

// p
globalStyle(`${cn} p`, {
  lineHeight: 2.1,
});
globalStyle(`${cn} p + p`, {
  marginTop: theme.space[300],
});

// ul
globalStyle(`${cn} ul`, {
  listStyleType: "disc",
  marginLeft: theme.space[300],
  marginBlock: theme.space[200],
});
globalStyle(`${cn} ul li::marker`, {
  color: theme.color.text.tertiary,
});
// ol
globalStyle(`${cn} ol`, {
  marginLeft: theme.space[300],
  marginBlock: theme.space[200],
});
globalStyle(`${cn} ol li::marker`, {
  color: theme.color.text.secondary,
});

// code
globalStyle(`${cn} pre`, {
  display: "flex",
  marginBlock: theme.space[200],
  marginInline: `calc(-1 * ${theme.space[200]})`,
  overflowX: "auto",
  color: theme.color.code.text,
  backgroundColor: theme.color.code.background,
  borderRadius: theme.radius[100],

  "@media": {
    [columnLayoutScreen]: {
      borderRadius: 0,
    },
  },
});
globalStyle(`${cn} pre code`, {
  display: "block",
  padding: theme.space[200],
  fontSize: theme.fontSize[75],
  lineHeight: 1.5,
});
// インラインの code
globalStyle(`${cn} code`, {
  color: theme.color.code.text,
  backgroundColor: theme.color.code.background,
  fontSize: theme.fontSize[75],
  padding: "0.3em",
  marginInline: theme.space[25],
  borderRadius: theme.radius[50],
  fontFamily: theme.fontFamily.code,
});

// blockquote
globalStyle(`${cn} blockquote`, {
  padding: `0 ${theme.space[100]}`,
  margin: `${theme.space[300]} 0`,
  color: theme.color.text.secondary,
  borderLeft: `5px solid ${theme.color.text.tertiary}`,
});

globalStyle(`${cn} hr`, {
  marginBlock: theme.space[100],
  borderColor: theme.color.palette.gray[200],
});

// strong
globalStyle(`${cn} strong`, {
  fontWeight: 700,
});

// katex
globalStyle(`${cn} .katex-display`, {
  marginBlock: theme.space[200],
  overflowX: "auto",
  overflowY: "hidden",
});
// mermaid
globalStyle(`${cn} .mermaid`, {
  display: "flex",
  justifyContent: "center",
});
// X (twitter)
globalStyle(`${cn} .twitter-tweet`, {
  marginInline: "auto",
});
