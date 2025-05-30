import type { WritingHead } from "@/features/writings/_models/types";
import { writingTypeConfig } from "@/features/writings/_models/writing-type";
import { writingPaths } from "@/features/writings/config/paths";
import { Icon } from "@/shared/design-system/icons";
import { Col, Row } from "@/shared/design-system/layout";
import { Link } from "@/shared/design-system/ui";
import { H4, Span } from "@/shared/design-system/ui/text/text";

import { writingLinkStyles } from "./writing-link.css";

type WritingLinkProps = {
  head: WritingHead;
};

export const WritingLink: React.FC<WritingLinkProps> = ({ head }) => {
  const { iconName } = writingTypeConfig.find(
    ({ type }) => type === head.type,
  )!;

  return (
    <Row align="flexStart" as="article" gap="100">
      <div className={writingLinkStyles.iconWrapper}>
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
