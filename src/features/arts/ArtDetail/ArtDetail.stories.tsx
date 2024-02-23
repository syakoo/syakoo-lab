import type { Meta, StoryObj } from "@storybook/react";

import { ArtDetail } from ".";

const meta = {
  component: ArtDetail,
  parameters: {
    layout: "fullscreen",
    testLevel: "snapshot",
  },
} satisfies Meta<typeof ArtDetail>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    art: {
      head: {
        id: "sample-art-id",
        title: "Art Title",
        published: "2023-10-31",
        imgUrl: "https://placehold.jp/3063D4/ffffff/2000x1500.png",
        size: { width: 2500, height: 1500 },
        tags: ["雑記", "Sample"],
      },
      body: {
        type: "serialized",
        data:
          "/*@jsxRuntime automatic @jsxImportSource react*/\n" +
          "const {jsx: _jsx} = arguments[0];\n" +
          "function _createMdxContent(props) {\n" +
          "  const _components = Object.assign({\n" +
          '    p: "p"\n' +
          "  }, props.components);\n" +
          "  return _jsx(_components.p, {\n" +
          '    children: "志希Pです"\n' +
          "  });\n" +
          "}\n" +
          "function MDXContent(props = {}) {\n" +
          "  const {wrapper: MDXLayout} = props.components || ({});\n" +
          "  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {\n" +
          "    children: _jsx(_createMdxContent, props)\n" +
          "  })) : _createMdxContent(props);\n" +
          "}\n" +
          "return {\n" +
          "  default: MDXContent\n" +
          "};\n",
      },
    },
  },
};
