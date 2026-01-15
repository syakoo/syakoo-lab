import { random } from "@/shared/test-utils/random/random";

import type {
  CreationBase,
  CreationGame,
  CreationGameSummary,
  CreationIllust,
  CreationIllustSummary,
  CreationSummary,
  CreationWebapp,
  CreationWebappSummary,
} from "./creation";

export const generateDummyCreationBase = (): CreationBase => {
  return {
    id: random.integer(1, 1000000).toString().padStart(6, "0"),
    title: "My Creation",
    published: "2021-01-01",
    updated: "2021-01-01",
    noindex: random.pickOne([true, false]),
    publicLinks: random.pick(
      [
        {
          title: "Syakoo Lab",
          href: "https://syakoo-lab.com",
          color: "rgb(48, 99, 212)",
        },
        {
          title: "GitHub",
          href: "https://github.com/syakoo",
          color: "rgb(24, 24, 24)",
        },
        {
          title: "X",
          href: "https://x.com/syakoo",
          color: "rgb(0, 0, 0)",
        },
      ],
      random.integer(0, 3),
    ),
  };
};
export const generateDummyCreationIllust = (): CreationIllust => {
  const width = random.integer(1, 9) * 100;
  const height = random.integer(1, 9) * 100;

  return {
    ...generateDummyCreationBase(),
    title: "My Illust",
    tags: random.pick(["tag1", "tag2", "tag3", "tag4"], 2),
    type: "illust",
    illust: {
      src: `https://placehold.jp/3063D4/ffffff/${width}x${height}.png`,
      width,
      height,
    },
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
        '    children: "Sample Illust"\n' +
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
  const logoSize = random.integer(1, 9) * 100;
  const gameplayScreenWidth = random.integer(1, 9) * 100;
  const gameplayScreenHeight = random.integer(1, 4) * 100;

  return {
    ...generateDummyCreationBase(),
    title: "My Game",
    tags: random.pick(["tag1", "tag2", "tag3", "tag4"], 2),
    type: "game",
    gameplayScreen: {
      src: `https://example.com/`,
      width: gameplayScreenWidth,
      height: gameplayScreenHeight,
    },
    logo: {
      src: `https://placehold.jp/3063D4/ffffff/${logoSize}x${logoSize}.png`,
      width: logoSize,
      height: logoSize,
    },
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
        '    children: "Sample Game"\n' +
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
  const logoSize = random.integer(1, 9) * 100;

  return {
    ...generateDummyCreationBase(),
    title: "My Webapp",
    tags: random.pick(["tag1", "tag2", "tag3", "tag4"], 2),
    type: "webapp",
    logo: {
      src: `https://placehold.jp/3063D4/ffffff/${logoSize}x${logoSize}.png`,
      width: logoSize,
      height: logoSize,
    },
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
        '    children: "Sample Webapp"\n' +
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

export const generateDummyCreationIllustSummary = (): CreationIllustSummary => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...summary } = generateDummyCreationIllust();
  return summary;
};

export const generateDummyCreationWebappSummary = (): CreationWebappSummary => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...summary } = generateDummyCreationWebapp();
  return summary;
};

export const generateDummyCreationGameSummary = (): CreationGameSummary => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...summary } = generateDummyCreationGame();
  return summary;
};

/**
 * CreationSummary のモックデータを生成する
 *
 * @example
 * ```ts
 * const summary = generateDummyCreationSummary();
 * const summaries = range(0, 5).map(() => generateDummyCreationSummary());
 * ```
 */
export const generateDummyCreationSummary = (): CreationSummary => {
  return random.pickOne([
    generateDummyCreationIllustSummary(),
    generateDummyCreationWebappSummary(),
    generateDummyCreationGameSummary(),
  ]);
};
