import type { HttpHandler } from "msw";

declare module "@storybook/react" {
  /* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
  type Parameters = {
    // NOTE: msw-storybook-addon に依存する型定義
    msw?: { handlers: HttpHandler[] };
    // NOTE: storybook/nextjs に依存する型定義
    nextjs?: {
      appDirectory?: boolean;
      navigation?: {
        query?: Record<string, string>;
      };
    };
  };
}
