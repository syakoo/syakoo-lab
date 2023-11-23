import { Icon } from "@/design-system/icons";
import { Center, Col, Row, Spacer } from "@/design-system/layout";
import { H1, Link, Span, Text } from "@/design-system/ui";
import { WritingHead } from "@/features/writings/models/types";
import { writingTypeConfig } from "@/features/writings/models/writingType";

import { writingHeaderStyles } from "./WritingHeader.css";

type WritingHeaderProps = {
  head: WritingHead;
};

export const WritingHeader: React.FC<WritingHeaderProps> = ({ head }) => {
  const { iconName } = writingTypeConfig.find(
    ({ type }) => type === head.type,
  )!;

  return (
    <header>
      <div className={writingHeaderStyles.iconWrapper}>
        <Icon name={iconName} width="100%" />
      </div>
      <Spacer y="100" />
      <div className={writingHeaderStyles.titleWrapper}>
        <H1>{head.title}</H1>
      </div>
      <Spacer y="100" />
      <Col gap="25">
        <Center>
          <Link href="/">
            <Span color="secondary" size="75">
              syakoo
            </Span>
          </Link>
        </Center>
        <Row gap="50" justify="center">
          {head.tags.map((tag) => (
            <Text key={tag} color="secondary" size="75">
              #{tag}
            </Text>
          ))}
        </Row>
        <Center>
          <div>
            <Span color="secondary" size="75">
              投稿日 <time dateTime={head.published}>{head.published}</time>
            </Span>
            {head.updated ? (
              <Span color="secondary" size="75">
                ・最終更新日 {head.updated}
              </Span>
            ) : null}
          </div>
        </Center>
      </Col>
    </header>
  );
};
