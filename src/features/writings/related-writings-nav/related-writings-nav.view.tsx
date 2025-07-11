import type { WritingHead } from "@/features/writings/_models/types";
import { Col } from "@/shared/design-system/layout";
import { H3 } from "@/shared/design-system/ui";

import { WritingLink } from "./writing-link";

type RelatedWritingsNavViewProps = {
  heads: WritingHead[];
};

/**
 * 関連文書表示コンポーネント (View)
 */
export const RelatedWritingsNavView: React.FC<RelatedWritingsNavViewProps> = ({
  heads,
}) => {
  return (
    <Col as="nav" gap="200">
      <H3>Related Writings</H3>
      <Col as="ul">
        {heads.map((head) => (
          <li key={head.id}>
            <WritingLink head={head} />
          </li>
        ))}
      </Col>
    </Col>
  );
};
