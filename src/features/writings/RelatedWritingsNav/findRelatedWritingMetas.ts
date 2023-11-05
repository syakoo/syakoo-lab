import { readWritingContents } from "@/contents/writings/reader";
import { Writing } from "@/features/writings/types";
import { resolveWritingMeta } from "@/features/writings/writingContentResolver";
import { isIntersect } from "@/utils/array/isIntersect";

/**
 * そのタグに関連する文章の一覧を取得する関数
 */
export const findRelatedWritingMetas = async (
  tags: Writing["meta"]["tags"],
) => {
  return (await readWritingContents())
    .map(({ frontMatter }) => resolveWritingMeta({ frontMatter }))
    .filter((meta) => isIntersect(meta.tags, tags))
    .slice(0, 5);
};
