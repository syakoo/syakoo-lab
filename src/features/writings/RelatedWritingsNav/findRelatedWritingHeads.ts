import { readWritingContents } from "@/contents/writings/reader";
import { resolveWritingHead } from "@/features/writings/_models/headResolver";
import { type WritingHead } from "@/features/writings/_models/types";
import { isIntersect } from "@/utils/array/isIntersect";

/**
 * そのタグに関連する文章の一覧を取得する関数
 */
export const findRelatedWritingHeads = async (tags: WritingHead["tags"]) => {
  return (await readWritingContents())
    .map(({ frontMatter }) => resolveWritingHead(frontMatter))
    .filter((head) => isIntersect(head.tags, tags))
    .slice(0, 5);
};
