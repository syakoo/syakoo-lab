import { compareDesc } from "date-fns";

import type { WritingHead } from "@/entities/writing/models/writing";
import { readWritingHeads } from "@/features/writings/writing-reader";

const writingRelatedScore =
  (originalTags: WritingHead["tags"]) => (targetTags: WritingHead["tags"]) => {
    return targetTags.reduce((prev, tag, i) => {
      const j = originalTags.findIndex((t) => t === tag);
      if (j === -1) return prev;
      // NOTE: 雑。10 もこれ以上タグは増えないだろうという決め打ちによるもの。
      return prev + (10 - i) * (10 - j);
    }, 0);
  };

/**
 * そのタグに関連する文章の一覧を取得する関数
 */
export const findRelatedWritingHeads = async (writingId: string) => {
  const allWritingHeads = await readWritingHeads();

  const targetHead = allWritingHeads.find(({ id }) => id === writingId);

  if (!targetHead) {
    return [];
  }

  const score = writingRelatedScore(targetHead.tags);

  return allWritingHeads
    .filter(({ id }) => id !== targetHead.id)
    .sort((head1, head2) =>
      compareDesc(new Date(head1.published), new Date(head2.published)),
    )
    .sort((head1, head2) => score(head2.tags) - score(head1.tags))
    .slice(0, 5);
};
