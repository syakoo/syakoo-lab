import { readWritingContents } from "../../../contents/writings/reader";
import {
  markupMermaid,
  serializeMDXContent,
} from "../../../shared/mdx/index.server";
import { mdxPlugins } from "../mdx-plugins/plugins";
import { resolveWritingHead } from "../model/head-resolver";
import type { SerializedWriting } from "../model/writing";
import { resolveWritingToc } from "../model/writing-toc/toc-resolver";

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
