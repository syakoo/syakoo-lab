import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

export const storyTheme = create({
  base: "light",
  appBg: "#EEF2F7",
  barBg: "#FFFFFF",
  appContentBg: "#FBFCFE",
});

addons.setConfig({
  theme: storyTheme,
});
