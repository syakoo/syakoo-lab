import { vi } from "vitest";

import { exampleMDXComponent } from "../../features/mdx/mocks/fixture-mdxcomponent";

import { loadEnv } from "./nextjs/env";

// NOTE: Next.jsのImageコンポーネントをテスト用にモック
vi.mock("next/image", () => ({
  default: "img",
}));

// NOTE: `@mdx-js/mdx` の esm がうまく解決できなかったためまとめてモック化
// これが原因でおかしくなっていたらごめんなさい
vi.mock("@mdx-js/mdx", () => {
  return {
    runSync: vi
      .fn()
      .mockImplementation(() => ({ default: exampleMDXComponent })),
  };
});

// NOTE: `mermaid` の esm がうまく解決できなかったためまとめてモック化
// これが原因でおかしくなっていたらごめんなさい
vi.mock("mermaid", () => ({
  default: {
    initialize: () => {
      return;
    },
    run: () => {
      return;
    },
  },
  initialize: () => {
    return;
  },
  run: () => {
    return;
  },
}));

loadEnv();

vi.spyOn(Math, "random").mockImplementation(() => 0.5866245602626035);
