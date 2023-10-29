import { glob } from "glob";
import matter from "gray-matter";
import type { ArtContent, ArtContentFrontMatter } from "./types";

/**
 * Art contents を取得する関数
 *
 * NOTE: node で実行すること
 */
export const readArtContents = async (): Promise<ArtContent[]> => {
  const mdxFilePaths = await glob("**/contents/arts/**/index.mdx");

  return mdxFilePaths
    .map((path) => matter.read(path))
    .map((matterFile) => ({
      frontMatter: matterFile.data as ArtContentFrontMatter,
      body: matterFile.content,
    }));
};
