import { compareDesc } from "date-fns";

import { readWritingContents } from "../../../../contents/writings/reader";
import type {
  SerializedWriting,
  WritingHead,
} from "../../../../entities/writing";
import { markupMermaid } from "../../../mdx";
import { serializeMDXContent } from "../../../mdx";
import { mdxPlugins } from "../../ui/writing-detail/mdx/plugins";

import { resolveWritingHead } from "./head-resolver";
import { resolveWritingToc } from "./toc-resolver";

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
    toc: await resolveWritingToc(targetContent.body),
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
