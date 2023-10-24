import { useEffect } from "react";
import mermaid from "mermaid";
import { tokens } from "@/design-system/tokens";

mermaid.initialize({
  // NOTE: このタイミングでは描画できないためフックで行うようにする
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: tokens.colors.background.secondary,
    primaryTextColor: tokens.colors.text.primary,
    primaryBorderColor: tokens.colors.palette.gray[100],
    lineColor: tokens.colors.palette.gray[500],
    secondaryColor: tokens.colors.palette.gray[100],
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
  useEffect(() => {
    mermaid.run();
  }, []);
};
