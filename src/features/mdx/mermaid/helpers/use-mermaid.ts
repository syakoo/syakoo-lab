import mermaid from "mermaid";

import { useMount } from "../../../../shared/utils/use-mount/use-mount";

// Mermaid は CSS 変数を受け付けないため、直接色の値を指定
const colors = {
  brand: {
    primary: "#3063d4",
    secondary: "#294e80",
  },
  text: {
    primary: "#1c2733",
  },
  background: {
    secondary: "#eef2f7",
  },
  palette: {
    gray300: "#717980",
    gray400: "#899096",
    gray500: "#a2a7ad",
    gray800: "#ebecef",
  },
} as const;

mermaid.initialize({
  // NOTE: このタイミングでは描画できないためフックで行うようにする
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: colors.background.secondary,
    primaryTextColor: colors.text.primary,
    primaryBorderColor: colors.palette.gray400,
    lineColor: colors.palette.gray300,
    secondaryColor: colors.palette.gray800,
    tertiaryColor: colors.palette.gray800,
    git0: colors.palette.gray400,
    git1: colors.brand.primary,
    git2: colors.brand.secondary,
    git3: colors.palette.gray500,
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
