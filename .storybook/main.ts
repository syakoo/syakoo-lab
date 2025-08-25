import type { StorybookConfig } from "@storybook/nextjs";
import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";

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

  webpackFinal: (config) => {
    config.plugins = [...(config.plugins ?? []), new VanillaExtractPlugin()];

    return config;
  },
};

export default config;
