import { glob } from "glob";
import matter from "gray-matter";
import type { WritingContent, WritingContentFrontMatter } from "./types";

/**
 * writing contents を取得する関数
 *
 * NOTE: node で実行すること
 */
export const readWritingContents = async (): Promise<WritingContent[]> => {
  const mdxFilePaths = await glob("./**/index.mdx");

  return mdxFilePaths
    .map((path) => matter.read(path))
    .map((matterFile) => ({
      frontMatter: matterFile.data as WritingContentFrontMatter,
      body: matterFile.content,
    }));
};