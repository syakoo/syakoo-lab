import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {
      appDirectory: true,
    },
  },

  features: {
    experimentalRSC: true,
  },

  webpackFinal: async (webpackConfig) => {
    webpackConfig.resolve ??= {};
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      // sharp ≥0.35 omits `./package.json` from exports; sb.mock cannot resolve it.
      sharp$: path.join(dirname, "mocks/sharp.ts"),
    };
    return webpackConfig;
  },
};

export default config;
