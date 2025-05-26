import { random } from "@/shared/test-utils/random/random";

import type {
  CreationBase,
  CreationGame,
  CreationIllust,
  CreationWebapp,
} from "./creation";

export const generateDummyCreationBase = (): CreationBase => {
  return {
    id: random.integer(1, 1000000).toString().padStart(6, "0"),
    title: "My Creation",
    thumbnailSrc: `https://picsum.photos/${random.integer(1, 9) * 100}/${random.integer(1, 9) * 100}`,
    published: "2021-01-01",
    updated: "2021-01-01",
    noindex: random.pickOne([true, false]),
  };
};
export const generateDummyCreationIllust = (): CreationIllust => {
  return {
    ...generateDummyCreationBase(),
    tags: random.pick(["tag1", "tag2", "tag3", "tag4"], 2),
    type: "illust",
    content: {
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
  };
};
export const generateDummyCreationGame = (): CreationGame => {
  return {
    ...generateDummyCreationBase(),
    tags: random.pick(["tag1", "tag2", "tag3", "tag4"], 2),
    type: "game",
    content: {
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
  };
};
export const generateDummyCreationWebapp = (): CreationWebapp => {
  return {
    ...generateDummyCreationBase(),
    tags: random.pick(["tag1", "tag2", "tag3", "tag4"], 2),
    type: "webapp",
    content: {
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
  };
};
