import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export type MDXComponent = React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: Record<string, React.FC<any>>;
}>;

/**
 * MDX 本文を React コンポーネントに変換する関数
 *
 * NOTE: node で実行する必要がある
 */
export const resolveMDXAsComponent = async (
  mdxContent: string,
): Promise<MDXComponent> => {
  // MDX string -> JS string
  const compiledContent = await compile(mdxContent, {
    outputFormat: "function-body",
    development: false,
    remarkPlugins: [remarkMath],
    // バージョンによる型エラー
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rehypePlugins: [rehypeKatex],
  }).then(String);

  const MDXContent: MDXComponent = await run(compiledContent, {
    ...runtime,
  }).then((result) => result.default);

  return MDXContent;
};
