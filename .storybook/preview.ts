import type { Preview } from "@storybook/nextjs";
import { sb } from "storybook/test";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

// Self-hosted for Storybook/VRT. Keep beforeEach sync — async broke RSC mocks.
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/700.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "../src/shared/global-settings/global-settings";
import { tryEnableDeterministicRandomFromGlobal } from "../src/shared/test-utils/random/random.fixture";
import { storyTheme } from "./manager";

// NOTE: Node 利用のモジュールは Storybook で動かないので雑にモックする
// read-writing などの直接機能で利用しているモジュールで返却値を指定できるようにする
sb.mock(import("../src/contents/writings/reader.ts"));
sb.mock(import("../src/contents/arts/reader.ts"));
sb.mock(import("../src/contents/games/reader.ts"));
sb.mock(import("../src/contents/webapps/reader.ts"));
// sharp: webpack-aliased to .storybook/sharp-mock.ts (sb.mock breaks on sharp ≥0.35 exports)
sb.mock(import("jsdom"));
sb.mock(import("../src/features/writing/writing-mdx/models/read-writing.ts"), {
  spy: true,
});
sb.mock(
  import("../src/entities/creation/models/creation-reader/read-creation.ts"),
  {
    spy: true,
  },
);
sb.mock(
  import("../src/entities/writing/models/writing-reader/read-writing-heads.ts"),
  {
    spy: true,
  },
);

const preview: Preview = {
  beforeEach: () => {
    tryEnableDeterministicRandomFromGlobal();
  },
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
