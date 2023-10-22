import { exampleMDXComponent } from "@/features/mdx/__mocks__/fixtureMDXComponent";

// NOTE: `@mdx-js/mdx` の esm がうまく解決できなかったためまとめてモック化
// これが原因でおかしくなっていたらごめんなさい
jest.mock("@mdx-js/mdx", () => {
  return {
    runSync: jest
      .fn()
      .mockImplementation(() => ({ default: exampleMDXComponent })),
  };
});
