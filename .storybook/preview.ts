import "ress";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import { tokens } from "../src/design-system/tokens";
import { theme } from "./manager";
import "../src/globalStyle.css";
import { defaultHandlers } from "@/api/_mocks/msw";

initialize({ onUnhandledRequest: "bypass" });

const preview: Preview = {
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
    nextjs: {
      appDirectory: true,
    },
    msw: {
      handlers: [...defaultHandlers],
    },
  },
  loaders: [mswLoader],
};

export default preview;
