import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

import { staticImage } from "../vite-plugins/static-image";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-vite",
  features: {
    experimentalRSC: true,
  },
  viteFinal: (viteConfig) => {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), staticImage()];
    const wakuStub = resolve(import.meta.dirname, "waku-stub.tsx");
    const merged = mergeConfig(viteConfig, {
      resolve: {
        alias: [
          { find: /^waku$/, replacement: wakuStub },
          { find: /^waku\/router\/server$/, replacement: wakuStub },
        ],
      },
    });
    merged.envPrefix = ["VITE_", "WAKU_PUBLIC_"];
    return merged;
  },
};

export default config;
