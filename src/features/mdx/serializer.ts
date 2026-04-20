import { compile } from "@mdx-js/mdx";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";

import type { SerializedMDXContent } from "../../entities/mdx-content/models/mdx-content";
import type { MDXCustomTextPlugin } from "./types";

/**
 * MDX 本文をシリアライズする関数
 *
 * NOTE: node で実行する必要がある
 */
export const serializeMDXContent = async (
  mdxContent: string,
  option?: { plugins: MDXCustomTextPlugin[] },
): Promise<SerializedMDXContent> => {
  const plugins = option?.plugins ?? [];
  const resolvedCustomPlugins = await plugins.reduce(
    (promise, plugin) => promise.then(plugin),
    Promise.resolve(mdxContent),
  );

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

  return {
    type: "serialized",
    data: compiledContent,
  };
};
