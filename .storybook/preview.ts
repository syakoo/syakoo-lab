import type { Preview } from "@storybook/nextjs";
import { sb } from "storybook/test";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

import "../src/shared/global-settings/global-settings";
import { storyTheme } from "./manager";

// NOTE: Node 利用のモジュールは Storybook で動かないので雑にモックする
// read-writing などの直接機能で利用しているモジュールで返却値を指定できるようにする
sb.mock(import("../src/contents/writings/reader.ts"));
sb.mock(import("../src/contents/arts/reader.ts"));
sb.mock(import("../src/contents/games/reader.ts"));
sb.mock(import("../src/contents/webapps/reader.ts"));
sb.mock(import("sharp"));
sb.mock(import("jsdom"));
sb.mock(import("../src/features/writings/writing-reader/read-writing.ts"), {
  spy: true,
});
sb.mock(import("../src/features/creation/creation-reader/read-creation.ts"), {
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
          value: "#15212c", // background.primary
        },
        {
          name: "secondary",
          value: "#28394e", // background.secondary
        },
      ],
    },
    docs: {
      theme: storyTheme,
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
