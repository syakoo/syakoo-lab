import { compile } from "@mdx-js/mdx";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";

import { markupLinkCard } from "./plugins/linkCardPlugin";
import { markupMermaid } from "./plugins/mermaid/mermaidPlugin";
import type { SerializedMDX } from "./types";

/**
 * MDX 本文をシリアライズする関数
 *
 * NOTE: node で実行する必要がある
 */
export const serializeMDX = async (
  mdxContent: string,
): Promise<SerializedMDX> => {
  // NOTE: プラグインをわかりやすく見せるため
  const resolvedCustomPlugins = await new Promise<string>((resolve) =>
    resolve(mdxContent),
  )
    .then(markupLinkCard)
    .then(markupMermaid);

  // MDX string -> JS string
  const compiledContent = await compile(resolvedCustomPlugins, {
    outputFormat: "function-body",
    development: false,
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
      [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
    ],
  }).then(String);

  return compiledContent;
};
