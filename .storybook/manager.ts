import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

export const storyTheme = create({
  base: "dark",
  appBg: "#020D1F",
  barBg: "#132134",
  appContentBg: "#15212C",
});

addons.setConfig({
  theme: storyTheme,
});
