import type { HttpHandler } from "msw";

declare module "@storybook/react" {
  type Parameters = {
    // NOTE: msw-storybook-addon に依存する型定義
    msw?: { handlers: HttpHandler[] };
    // NOTE: .storybook/waku-stub.tsx に依存する型定義
    router?: {
      path?: string;
      query?: string;
    };
  };
}
