import { setProjectAnnotations } from "@storybook/react";
import globalStorybookConfig from "../../.storybook/preview";
import { exampleMDXComponent } from "@/features/mdx/__mocks__/fixtureMDXComponent";

setProjectAnnotations(globalStorybookConfig);

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
