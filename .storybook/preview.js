import { theme } from "./manager";
import { tokens } from "../src/design-system/tokens";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import "ress";
import "../src/globalStyle.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "primary",
      values: [
        {
          name: "primary",
          value: tokens.colors.background.primary,
        },
        {
          name: "secondary",
          value: tokens.colors.background.secondary,
        },
      ],
    },
    docs: {
      theme,
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
};

export default preview;
