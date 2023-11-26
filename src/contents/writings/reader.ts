import { glob } from "glob";
import matter from "gray-matter";

import type { WritingContent, WritingContentFrontMatter } from "./types";

/**
 * writing contents を取得する関数
 *
 * この時点で archive はフィルタリングされる.
 * @note node で実行すること
 */
export const readWritingContents = async (): Promise<WritingContent[]> => {
  const mdxFilePaths = await glob("**/contents/writings/**/index.mdx");

  return mdxFilePaths
    .map((path) => matter.read(path))
    .map((matterFile) => ({
      frontMatter: matterFile.data as WritingContentFrontMatter,
      body: matterFile.content,
    }))
    .filter((d) => !d.frontMatter.archived);
};
