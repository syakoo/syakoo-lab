import mermaid from "mermaid";

import { tokens } from "@/design-system/tokens";
import { useMount } from "@/utils/mount/use-mount";

mermaid.initialize({
  // NOTE: このタイミングでは描画できないためフックで行うようにする
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    // NOTE: CSS Variables を入れれないため直接指定
    primaryColor: tokens.colors.background.secondary,
    primaryTextColor: tokens.colors.text.primary,
    primaryBorderColor: tokens.colors.palette.gray[100],
    lineColor: tokens.colors.palette.gray[500],
    secondaryColor: tokens.colors.palette.gray[100],
    tertiaryColor: tokens.colors.palette.gray[100],
    git0: tokens.colors.palette.gray[100],
    git1: tokens.colors.brand.primary,
    git2: tokens.colors.brand.secondary,
    git3: tokens.colors.palette.gray[200],
  },
});

/**
 * mermaid の描画をするために必要なフック
 */
export const useMermaid = () => {
  useMount(() => {
    void mermaid.run();
  });
};
