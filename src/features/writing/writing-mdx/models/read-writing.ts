import { readWritingContents } from "../../../../contents/writings/reader";
import type { SerializedWriting } from "../../../../entities/writing";
import { resolveWritingHead } from "../../../../entities/writing";
import {
  markupMermaid,
  serializeMDXContent,
} from "../../../../shared/mdx/index.server";
import { mdxPlugins } from "../helpers/plugins";

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
