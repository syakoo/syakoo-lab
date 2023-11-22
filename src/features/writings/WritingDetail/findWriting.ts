import { readWritingContents } from "@/contents/writings/reader";
import { markupLinkCard } from "@/features/mdx/plugins/linkCardPlugin";
import { markupMermaid } from "@/features/mdx/plugins/mermaid/mermaidPlugin";
import { serializeMDX } from "@/features/mdx/serializeMDX";
import { Writing } from "@/features/writings/types";
import { resolveWritingMeta } from "@/features/writings/writingContentResolver";

import { markupSectionTitlePlugin } from "./mdxParts/SectionTitle/markupSectionTitlePlugin";

/**
 * 書き物を取得する関数
 */
export const findWriting = async (id: string): Promise<Writing> => {
  const writingContent = (await readWritingContents()).find(
    ({ frontMatter }) => frontMatter.id === id,
  );

  if (!writingContent) {
    throw new Error(`id=${id} の記事が見つかりませんでした。`);
  }

  const writing: Writing = {
    meta: resolveWritingMeta({ frontMatter: writingContent.frontMatter }),
    serializedBody: await serializeMDX(writingContent.body, {
      plugins: [markupLinkCard, markupMermaid, markupSectionTitlePlugin],
    }),
  };

  return writing;
};
