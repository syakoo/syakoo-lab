import { compile } from "@mdx-js/mdx";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import { markupLinkCard } from "./plugins/linkCardPlugin";
import type { SerializedMDX } from "./types";

/**
 * MDX 本文をシリアライズする関数
 *
 * NOTE: node で実行する必要がある
 */
export const serializeMDX = async (
  mdxContent: string,
): Promise<SerializedMDX> => {
  const resolvedCustomPlugins = await markupLinkCard(mdxContent);

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