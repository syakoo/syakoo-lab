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

// code
globalStyle(`${cn} pre`, {
  display: "flex",
  marginBlock: tokens.spaces[200],
  marginInline: `-${tokens.spaces[200]}`,
  overflowX: "auto",
  color: tokens.colors.code.text,
  backgroundColor: tokens.colors.code.background,
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

// katex
globalStyle(`${cn} .katex-display`, {
  marginBlock: tokens.spaces[200],
  overflowX: "auto",
  overflowY: "hidden",
});
