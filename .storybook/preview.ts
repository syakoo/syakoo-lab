import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { Preview } from "@storybook/react";

import { theme } from "@/shared/design-system/theme.css";

import "@/shared/global-settings/global-settings";
import { storyTheme } from "./manager";

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
  },
};

export default preview;
