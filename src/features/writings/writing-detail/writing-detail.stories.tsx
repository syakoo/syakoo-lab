import type { Meta, StoryObj } from "@storybook/nextjs";
import { clearAllMocks, mocked } from "storybook/test";

import { findWriting } from "./find-writing";
import { WritingDetail } from "./writing-detail";

const meta: Meta<typeof WritingDetail> = {
  component: WritingDetail,
  parameters: {
    testLevel: "snapshot" as const,
  },
  afterEach: () => {
    clearAllMocks();
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    id: "sample-writing-id",
  },
  beforeEach: () => {
    mocked(findWriting).mockResolvedValue({
      head: {
        id: "sample-writing-id",
        title: `ダミー記事: sample-writing-id`,
        type: "article" as const,
        tags: ["ダミー", "Storybook"],
        published: "2023-12-01",
      },
      body: {
        type: "serialized" as const,
        data: `/*@jsxRuntime automatic @jsxImportSource react*/
      const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
      function _createMdxContent(props) {
        const _components = Object.assign({
          h1: "h1",
          p: "p",
          code: "code",
          strong: "strong",
        }, props.components);
        return _jsxs(_Fragment, {
          children: [_jsx(_components.h1, {
            children: "モックファイルによる軽量実装"
          }), "\\n", _jsx(_components.p, {
            children: ["これは ", _jsx(_components.code, {
              children: "find-writing.mock.ts"
            }), " で実装されたモックです。"]
          }), "\\n", _jsx(_components.p, {
            children: ["記事ID: ", _jsx(_components.strong, {
              children: "sample-writing-id"
            }), " のモックデータを表示しています。"]
          }), "\\n", _jsx(_components.p, {
          })]
        });
      }
      function MDXContent(props = {}) {
        return _createMdxContent(props);
      }
      return { default: MDXContent };
    `,
      },
    });
  },
};
