import { writingLinkStyles } from "./WritingLink.css";
import { Icon } from "@/design-system/icons";
import { Col, Row } from "@/design-system/layout";
import { Link } from "@/design-system/ui";
import { H4, Span } from "@/design-system/ui/Text/Text";
import { writingTypeConfig } from "@/features/writings/_shared/writingType";
import { WritingMeta } from "@/features/writings/types";

type WritingLinkProps = {
  meta: WritingMeta;
};

export const WritingLink: React.FC<WritingLinkProps> = ({ meta }) => {
  const { iconName } = writingTypeConfig.find(
    ({ type }) => type === meta.type,
  )!;

  return (
    <Row align="flexStart" as="article" gap="100">
      <div className={writingLinkStyles.iconWrapper}>
        <Icon name={iconName} />
      </div>
      <Col gap="50">
        <Link href={meta.link}>
          <H4 size="100">{meta.title}</H4>
        </Link>
        <Span color="secondary" size="50">
          {meta.published}
        </Span>
      </Col>
    </Row>
  );
};
