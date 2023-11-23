import { readWritingContents } from "@/contents/writings/reader";
import { markupMermaid } from "@/features/mdx/plugins/mermaid/mermaidPlugin";
import { serializeMDXContent } from "@/features/mdx/serializer";
import { resolveWritingHead } from "@/features/writings/_models/headResolver";
import { SerializedWriting } from "@/features/writings/_models/types";

import { markupLinkCardPlugin } from "./mdxParts/LinkCard/markupLinkCardPlugin";
import { markupSectionTitlePlugin } from "./mdxParts/SectionTitle/markupSectionTitlePlugin";

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
      plugins: [markupLinkCardPlugin, markupMermaid, markupSectionTitlePlugin],
    }),
  };

  return writing;
};
