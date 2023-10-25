import type { Meta, StoryObj } from "@storybook/react";
import { WritingViewer } from ".";

const meta = {
  component: WritingViewer,
} satisfies Meta<typeof WritingViewer>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sample: Story = {
  args: {
    writing: {
      meta: {
        id: "sample-writing-meta-id1",
        link: "/writing/post/20231009",
        title: "Sample Article",
        type: "article",
        tags: ["雑記", "Sample"],
        published: "2023-10-09",
      },
      serializedBody: `/*@jsxRuntime automatic @jsxImportSource react*/
const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
function _createMdxContent(props) {
  const _components = Object.assign({
    h2: "h2",
    p: "p",
    code: "code",
    h3: "h3",
    h4: "h4",
    ul: "ul",
    li: "li",
    ol: "ol",
    a: "a"
  }, props.components);
  return _jsxs(_Fragment, {
    children: [_jsx(_components.h2, {
      children: "見出し"
    }), "\\n", _jsxs(_components.p, {
      children: ["上のやつが見出し2 (", _jsx(_components.code, {
        children: "## xxx"
      }), ")"]
    }), "\\n", _jsx(_components.h3, {
      children: "見出し3"
    }), "\\n", _jsx(_components.h4, {
      children: "見出し4"
    }), "\\n", _jsx(_components.h2, {
      children: "リスト"
    }), "\\n", _jsxs(_components.ul, {
      children: ["\\n", _jsx(_components.li, {
        children: "項目 1"
      }), "\\n", _jsxs(_components.li, {
        children: ["項目 2", "\\n", _jsxs(_components.ul, {
          children: ["\\n", _jsxs(_components.li, {
            children: ["項目 2-1", "\\n", _jsxs(_components.ul, {
              children: ["\\n", _jsx(_components.li, {
                children: "項目 2-1-1"
              }), "\\n"]
            }), "\\n"]
          }), "\\n", _jsx(_components.li, {
            children: "項目 2-2"
          }), "\\n"]
        }), "\\n"]
      }), "\\n"]
    }), "\\n", _jsx(_components.h2, {
      children: "番号付きリスト"
    }), "\\n", _jsxs(_components.ol, {
      children: ["\\n", _jsx(_components.li, {
        children: "項目 1"
      }), "\\n", _jsx(_components.li, {
        children: "項目 2"
      }), "\\n"]
    }), "\\n", _jsx(_components.h2, {
      children: "テキストリンク"
    }), "\\n", _jsxs(_components.p, {
      children: ["普通の書き方でテキストリンクを貼れます。", _jsx(_components.a, {
        href: "https://syakoo-lab.com",
        children: "Syakoo Lab"
      })]
    }), "\\n", _jsx(_components.h2, {
      children: "その他"
    }), "\\n", _jsx(_components.p, {
      children: "疲れたので終わります"
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
    children: _jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
return {
  default: MDXContent
};
`,
    },
  },
};
