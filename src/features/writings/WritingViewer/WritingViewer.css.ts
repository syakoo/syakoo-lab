import { globalStyle, style } from "@vanilla-extract/css";
import { tokens } from "@/design-system/tokens";

export const writingViewerStyles = {
  root: style({
    display: "grid",
    gridTemplateColumns: `1fr minmax(${tokens.sizes[50]}, ${tokens.sizes[100]}) minmax(${tokens.sizes[50]}, 1fr)`,
    gridTemplateRows: "auto auto",
    gridTemplateAreas: `"l header r"
    "l content aside"`,
  }),
  headerWrapper: style({
    gridArea: "header",
    padding: tokens.spaces[200],
    paddingBlock: tokens.spaces[300],
  }),
  contentWrapper: style({
    gridArea: "content",
    padding: tokens.spaces[200],
  }),
  asideWrapper: style({
    gridArea: "aside",
    padding: tokens.spaces[200],
  }),
};

// 以下 MDX のスタイル
/**
 * MDX コンテナのクラス名
 */
const cn = writingViewerStyles.contentWrapper;

// p
globalStyle(`${cn} p`, {
  lineHeight: 1.88,
});
globalStyle(`${cn} p + p`, {
  marginTop: tokens.spaces[200],
});

// ul
globalStyle(`${cn} ul`, {
  listStyleType: "disc",
  marginLeft: tokens.spaces[300],
  marginBlock: tokens.spaces[200],
});
globalStyle(`${cn} ul li::marker`, {
  color: tokens.colors.text.tertiary,
});
// ol
globalStyle(`${cn} ol`, {
  marginLeft: tokens.spaces[300],
  marginBlock: tokens.spaces[200],
});
globalStyle(`${cn} ol li::marker`, {
  color: tokens.colors.text.secondary,
});

// code
globalStyle(`${cn} pre`, {
  display: "flex",
  marginBlock: tokens.spaces[200],
  marginInline: `-${tokens.spaces[200]}`,
  overflowX: "auto",
  color: tokens.colors.code.text,
  backgroundColor: tokens.colors.code.background,
  borderRadius: tokens.radii[100],
});
globalStyle(`${cn} pre code`, {
  display: "block",
  padding: tokens.spaces[200],
  fontSize: tokens.fontSizes[75],
  lineHeight: 1.5,
});
// インラインの code
globalStyle(`${cn} code`, {
  color: tokens.colors.code.text,
  backgroundColor: tokens.colors.code.background,
  fontSize: tokens.fontSizes[75],
  padding: "0.3em",
  borderRadius: tokens.radii[50],
});

// blockquote
globalStyle(`${cn} blockquote`, {
  padding: `0 ${tokens.spaces[100]}`,
  margin: `${tokens.spaces[300]} 0`,
  color: tokens.colors.text.secondary,
  borderLeft: `5px solid ${tokens.colors.text.tertiary}`,
});

// katex
globalStyle(`${cn} .katex-display`, {
  marginBlock: tokens.spaces[200],
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
