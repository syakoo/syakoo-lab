import type { Creation } from "../../../entities/creation/models/creation";

/**
 * 関連度を計算するために必要な Creation の属性
 */
type RelatedCreationFields = Pick<
  Creation,
  "id" | "type" | "tags" | "published" | "updated"
>;

/**
 * 関連創作物を取得する
 * - 最大10件まで表示
 * - ソート順：関連度（高い順）→日付順
 * - 関連度：(タグ一致数)*2 + (創作物タイプ一致)*1
 */
export const getRelatedCreations = <T extends RelatedCreationFields>(
  currentCreation: T,
  creations: T[],
): T[] => {
  const getRelevanceScore = (creation: T) => {
    const matchingTags = creation.tags.filter((tag) =>
      currentCreation.tags.includes(tag),
    ).length;
    const typeMatches = creation.type === currentCreation.type ? 1 : 0;
    return matchingTags * 2 + typeMatches;
  };

  return creations
    .filter((creation) => creation.id !== currentCreation.id)
    .sort((a, b) => {
      const aScore = getRelevanceScore(a);
      const bScore = getRelevanceScore(b);

      // 関連度が同じ場合は日付で降順ソート
      if (bScore === aScore) {
        return (
          new Date(b.published).getTime() - new Date(a.published).getTime()
        );
      }
      return bScore - aScore;
    })
    .slice(0, 10);
};
