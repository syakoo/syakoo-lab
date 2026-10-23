import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

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
    viteConfig.resolve = {
      ...viteConfig.resolve,
      alias: [
        { find: /^waku$/, replacement: wakuStub },
        { find: /^waku\/router\/server$/, replacement: wakuStub },
        ...(Array.isArray(viteConfig.resolve?.alias)
          ? viteConfig.resolve.alias
          : Object.entries(viteConfig.resolve?.alias ?? {}).map(
              ([find, replacement]) => ({ find, replacement }),
            )),
      ],
    };
    viteConfig.envPrefix = ["VITE_", "WAKU_PUBLIC_"];
    return viteConfig;
  },
};

export default config;
