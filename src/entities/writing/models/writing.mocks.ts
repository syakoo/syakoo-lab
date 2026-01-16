import { random } from "@/shared/test-utils/random/random";

import type { SerializedWriting, WritingHead, WritingType } from "./writing";

export const generateDummyWritingHead = (
  overrides?: Partial<WritingHead>,
): WritingHead => {
  return {
    id: random.integer(1, 1000000).toString().padStart(6, "0"),
    title: "Sample Writing",
    type: random.pickOne<WritingType>(["article", "note", "diary"]),
    tags: ["sample", "test"],
    published: "2021-01-01",
    updated: "2021-01-01",
    noindex: random.pickOne([true, false]),
    ...overrides,
  };
};

const sampleMdxContent = `/*@jsxRuntime automatic @jsxImportSource react*/
  const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
  function _createMdxContent(props) {
    const _components = Object.assign({
      h2: "h2",
      p: "p",
      ul: "ul",
      li: "li",
      strong: "strong",
      em: "em"
    }, props.components);
    return _jsxs(_Fragment, {
      children: [
        _jsx(_components.h2, { children: "サンプル記事" }),
        _jsx(_components.p, { children: "これはテスト用のサンプルコンテンツです。" }),
        _jsx(_components.p, {
          children: [
            "このコンテンツには",
            _jsx(_components.strong, { children: "太字" }),
            "や",
            _jsx(_components.em, { children: "斜体" }),
            "などの基本的な装飾が含まれています。"
          ]
        }),
        _jsx(_components.ul, {
          children: [
            _jsx(_components.li, { children: "React" }),
            _jsx(_components.li, { children: "TypeScript" }),
            _jsx(_components.li, { children: "Vitest" })
          ]
        })
      ]
    });
  }
  function MDXContent(props = {}) {
    return _createMdxContent(props);
  }
  return { default: MDXContent };`;

export const generateDummySerializedWriting = (
  overrides?: Partial<SerializedWriting>,
): SerializedWriting => {
  return {
    head: generateDummyWritingHead(),
    body: {
      type: "serialized" as const,
      data: sampleMdxContent,
    },
    ...overrides,
  };
};
