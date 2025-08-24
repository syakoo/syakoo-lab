import { random } from "@/shared/test-utils/random/random";

import type { WritingHead, WritingType, SerializedWriting } from "./writing";

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

export const generateDummySerializedWriting = (
  overrides?: Partial<SerializedWriting>,
): SerializedWriting => {
  return {
    head: generateDummyWritingHead(),
    body: {
      type: "serialized" as const,
      data: `/*@jsxRuntime automatic @jsxImportSource react*/
      const {Fragment: _Fragment, jsx: _jsx} = arguments[0];
      function _createMdxContent(props) {
        return _jsx(_Fragment, {
          children: _jsx("p", {
            children: "Sample writing content"
          })
        });
      }
      function MDXContent(props = {}) {
        return _createMdxContent(props);
      }
      return { default: MDXContent };`,
    },
    ...overrides,
  };
};
