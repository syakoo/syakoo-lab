import { viteCustomImagePlugin } from "../src/libs/astro-image/viteCustomImagePlugin";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    config.plugins.push(viteCustomImagePlugin());
    config.plugins.push(vanillaExtractPlugin());
    config.plugins.push(tsconfigPaths());

    return config;
  },
};

export default config;
