import type { WritingHead } from "../../../../entities";
import { writingPaths } from "../../../../../entities/writing";
import { getWritingTypeConfig } from "../../../../../entities/writing";
import { Icon } from "../../../../shared";
import { Col, Row } from "../../../../shared";
import { Link } from "../../../../shared";
import { H4, Span } from "../../../../shared";

type WritingLinkProps = {
  head: WritingHead;
};

export const WritingLink: React.FC<WritingLinkProps> = ({ head }) => {
  const { iconName } = getWritingTypeConfig(head.type);

  return (
    <Row align="flexStart" as="article" gap="100">
      <div className="w-200 pt-50">
        <Icon name={iconName} />
      </div>
      <Col gap="50">
        <Link href={writingPaths.detail(head.id)}>
          <H4 size="100">{head.title}</H4>
        </Link>
        <Span color="secondary" size="50">
          {head.published}
        </Span>
      </Col>
    </Row>
  );
};
