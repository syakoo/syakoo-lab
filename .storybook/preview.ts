import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";

import { defaultHandlers } from "@/api/mocks/msw";
import { theme } from "@/design-system/theme.css";

import "@/config/global-settings";
import { storyTheme } from "./manager";

initialize({ onUnhandledRequest: "bypass" });

const preview: Preview = {
  parameters: {
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
          value: theme.color.background.primary,
        },
        {
          name: "secondary",
          value: theme.color.background.secondary,
        },
      ],
    },
    docs: {
      theme: storyTheme,
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
