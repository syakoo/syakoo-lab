import { compareDesc } from "date-fns";

import { readWritingContents } from "@/contents/writings/reader";
import { resolveWritingHead } from "@/features/writings/_models/head-resolver";
import { type WritingHead } from "@/features/writings/_models/types";

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
export const findRelatedWritingHeads = async (head: WritingHead) => {
  const score = writingRelatedScore(head.tags);

  return (
    (await readWritingContents())
      .map(({ frontMatter }) => resolveWritingHead(frontMatter))
      // NOTE: そいつ自身は抜かす
      .filter(({ id }) => id !== head.id)
      // NOTE: 同じスコアの時は日付順
      .sort((head1, head2) =>
        compareDesc(new Date(head1.published), new Date(head2.published)),
      )
      // NOTE: 降順にしてほしいため b - a
      .sort((head1, head2) => score(head2.tags) - score(head1.tags))
      .slice(0, 5)
  );
};
