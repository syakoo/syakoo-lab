import { readWritingContents } from "../../../../contents/writings/reader";
import {
  markupMermaid,
  serializeMDXContent,
} from "../../../../shared/mdx/index.server";
import { mdxPlugins } from "../../helpers/mdx-plugins/plugins";
import type { SerializedWriting } from "../writing";
import { resolveWritingToc } from "../writing-toc/toc-resolver";
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
    toc: await resolveWritingToc(targetContent.body),
    body: await serializeMDXContent(targetContent.body, {
      plugins: [markupMermaid, ...mdxPlugins],
    }),
  };
};
