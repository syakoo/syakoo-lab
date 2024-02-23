import type { HttpHandler } from "msw";

declare module "@storybook/react" {
  /* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
  interface Parameters {
    // NOTE: msw-storybook-addon に依存する型定義
    msw?: { handlers: HttpHandler[] };
    // NOTE: storybook/nextjs に依存する型定義
    nextjs?: {
      appDirectory?: boolean;
      navigation?: {
        query?: Record<string, string>;
      };
    };

    /**
     * テストレベル
     * - `none`: スキップ
     * - `check`: Story の描画確認、 play があればインタラクションをします
     * - `snapshot`: check に加えてスナップショットを保存し確認します
     *
     * NOTE: Story からテストを行うための型定義。不要になったら削除すること。
     * @default "check"
     */
    testLevel?: "none" | "check" | "snapshot";
  }
}
