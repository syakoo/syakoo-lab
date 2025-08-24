import type { Preview } from "@storybook/nextjs";
import { sb } from "storybook/test";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

import { theme } from "@/shared/design-system/theme.css";

import "@/shared/global-settings/global-settings";
import { storyTheme } from "./manager";

sb.mock(import("@/contents/writings/reader"));
sb.mock(import("sharp"));
sb.mock(import("jsdom"));
sb.mock(import("@/features/writings/writing-detail/find-writing"), {
  spy: true,
});

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
