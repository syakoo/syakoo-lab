import { glob } from "glob";
import matter from "gray-matter";

import type { GameContent, GameContentFrontMatter } from "./types";

/**
 * Game contents を取得する関数
 *
 * NOTE: node で実行すること
 */
export const readGameContents = async (): Promise<GameContent[]> => {
  const mdxFilePaths = await glob("**/contents/games/**/index.mdx");

  return mdxFilePaths
    .map((path) => matter.read(path))
    .map((matterFile) => ({
      frontMatter: matterFile.data as GameContentFrontMatter,
      body: matterFile.content,
    }));
};
