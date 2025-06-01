import { exampleMDXComponent } from "@/features/mdx/mocks/fixture-mdxcomponent";

import { loadEnv } from "./nextjs/env";

// NOTE: `@mdx-js/mdx` の esm がうまく解決できなかったためまとめてモック化
// これが原因でおかしくなっていたらごめんなさい
jest.mock("@mdx-js/mdx", () => {
  return {
    runSync: jest
      .fn()
      .mockImplementation(() => ({ default: exampleMDXComponent })),
  };
});

// NOTE: `mermaid` の esm がうまく解決できなかったためまとめてモック化
// これが原因でおかしくなっていたらごめんなさい
jest.mock("mermaid", () => ({
  initialize: () => {
    return;
  },
  run: () => {
    return;
  },
}));

loadEnv();

jest.spyOn(Math, "random").mockImplementation(() => 0.5866245602626035);
