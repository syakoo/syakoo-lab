import { compareDesc } from "date-fns";

import { readWritingContents } from "@/contents/writings/reader";
import type {
  WritingHead,
  SerializedWriting,
} from "@/entities/writing/models/writing";
import { markupMermaid } from "@/features/mdx/plugins/mermaid/mermaid-plugin";
import { serializeMDXContent } from "@/features/mdx/serializer";
import { mdxPlugins } from "@/features/writings/writing-detail/mdx/plugins";

import { resolveWritingHead } from "./head-resolver";

export const readWritingById = async (
  id: string,
): Promise<SerializedWriting | null> => {
  const targetContent = (await readWritingContents()).find(
    ({ frontMatter }) => frontMatter.id === id,
  );

  if (!targetContent) {
    return null;
  }

  return {
    head: resolveWritingHead(targetContent.frontMatter),
    body: await serializeMDXContent(targetContent.body, {
      plugins: [markupMermaid, ...mdxPlugins],
    }),
  };
};

export const readWritingHeads = async (): Promise<WritingHead[]> => {
  const contents = await readWritingContents();

  return contents
    .map(({ frontMatter }) => resolveWritingHead(frontMatter))
    .sort((left, right) =>
      compareDesc(new Date(left.published), new Date(right.published)),
    );
};
