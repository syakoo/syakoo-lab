import { findRelatedWritingHeads } from "./find-related-writing-heads";
import { RelatedWritingsNavView } from "./related-writings-nav.view";

type RelatedWritingsNavProps = {
  id: string;
};
/**
 * 関連文書表示コンポーネント
 */
export const RelatedWritingsNav = async ({ id }: RelatedWritingsNavProps) => {
  const heads = await findRelatedWritingHeads(id);

  if (heads.length === 0) {
    return null;
  }

  return <RelatedWritingsNavView heads={heads} />;
};
