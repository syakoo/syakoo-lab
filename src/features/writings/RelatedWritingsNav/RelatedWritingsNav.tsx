import { Col } from "@/design-system/layout";
import { H3 } from "@/design-system/ui";
import { WritingHead } from "@/features/writings/_models/types";

import { WritingLink } from "./WritingLink";

type RelatedWritingsNavProps = {
  heads: WritingHead[];
};
/**
 * 関連文書表示コンポーネント
 */
export const RelatedWritingsNav: React.FC<RelatedWritingsNavProps> = ({
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
