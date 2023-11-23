import { markupMermaid } from "@/features/mdx/plugins/mermaid/mermaidPlugin";
import { serializeMDX } from "@/features/mdx/serializeMDX";
import { markupLinkCardPlugin } from "@/features/writings/WritingDetail/mdxParts/LinkCard/markupLinkCardPlugin";
import { markupSectionTitlePlugin } from "@/features/writings/WritingDetail/mdxParts/SectionTitle/markupSectionTitlePlugin";

import { WritingSerializedBody } from "./types";

/**
 * 文書の本文 MDX 文字列をシリアライズする関数
 */
export const serializeWritingBody = async (
  bodyContent: string,
): Promise<WritingSerializedBody> => {
  const serializedContent = await serializeMDX(bodyContent, {
    plugins: [markupLinkCardPlugin, markupMermaid, markupSectionTitlePlugin],
  });

  return {
    type: "serialized",
    data: serializedContent,
  };
};
