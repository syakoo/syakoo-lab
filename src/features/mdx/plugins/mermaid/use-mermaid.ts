import mermaid from "mermaid";

import { useMount } from "@/shared/utils/use-mount/use-mount";

// Mermaid は CSS 変数を受け付けないため、直接色の値を指定
const colors = {
  brand: {
    primary: "#3063d4",
    secondary: "#294e80",
  },
  text: {
    primary: "#babec3ee",
  },
  background: {
    secondary: "#28394e",
  },
  palette: {
    gray100: "#404a54",
    gray200: "#59616a",
    gray500: "#a2a7ad",
  },
} as const;

mermaid.initialize({
  // NOTE: このタイミングでは描画できないためフックで行うようにする
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: colors.background.secondary,
    primaryTextColor: colors.text.primary,
    primaryBorderColor: colors.palette.gray100,
    lineColor: colors.palette.gray500,
    secondaryColor: colors.palette.gray100,
    tertiaryColor: colors.palette.gray100,
    git0: colors.palette.gray100,
    git1: colors.brand.primary,
    git2: colors.brand.secondary,
    git3: colors.palette.gray200,
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
