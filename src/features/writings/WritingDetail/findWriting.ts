import { readWritingContents } from "@/contents/writings/reader";
import { markupMermaid } from "@/features/mdx/plugins/mermaid/mermaidPlugin";
import { serializeMDXContent } from "@/features/mdx/serializer";
import { resolveWritingHead } from "@/features/writings/_models/headResolver";
import type { SerializedWriting } from "@/features/writings/_models/types";

import { mdxPlugins } from "./mdx/plugins";

/**
 * 書き物を取得する関数
 */
export const findWriting = async (id: string): Promise<SerializedWriting> => {
  const writingContent = (await readWritingContents()).find(
    ({ frontMatter }) => frontMatter.id === id,
  );

  if (!writingContent) {
    throw new Error(`id=${id} の記事が見つかりませんでした。`);
  }

  const writing: SerializedWriting = {
    head: resolveWritingHead(writingContent.frontMatter),
    body: await serializeMDXContent(writingContent.body, {
      plugins: [markupMermaid, ...mdxPlugins],
    }),
  };

  return writing;
};
