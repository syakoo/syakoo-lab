import { WritingMeta } from "../types";
import { WritingLink } from "./WritingLink";
import { Col } from "@/design-system/layout";
import { H3 } from "@/design-system/ui";

type RelatedWritingsNavProps = {
  metas: WritingMeta[];
};
/**
 * 関連文書表示コンポーネント
 */
export const RelatedWritingsNav: React.FC<RelatedWritingsNavProps> = ({
  metas,
}) => {
  return (
    <Col as="nav" gap="200">
      <H3>Related Writings</H3>
      <Col as="ul">
        {metas.map((meta) => (
          <li key={meta.id}>
            <WritingLink meta={meta} />
          </li>
        ))}
      </Col>
    </Col>
  );
};
