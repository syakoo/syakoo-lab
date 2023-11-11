import { Icon } from "@/design-system/icons";
import { Center, Col, Row, Spacer } from "@/design-system/layout";
import { H1, Link, Span, Text } from "@/design-system/ui";
import { writingTypeConfig } from "@/features/writings/_shared/writingType";
import type { WritingMeta } from "@/features/writings/types";

import { writingHeaderStyles } from "./WritingHeader.css";

type WritingHeaderProps = {
  meta: WritingMeta;
};

export const WritingHeader: React.FC<WritingHeaderProps> = ({ meta }) => {
  const { iconName } = writingTypeConfig.find(
    ({ type }) => type === meta.type,
  )!;

  return (
    <header>
      <div className={writingHeaderStyles.iconWrapper}>
        <Icon name={iconName} width="100%" />
      </div>
      <Spacer y="100" />
      <div className={writingHeaderStyles.titleWrapper}>
        <H1>{meta.title}</H1>
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
          {meta.tags.map((tag) => (
            <Text key={tag} color="secondary" size="75">
              #{tag}
            </Text>
          ))}
        </Row>
        <Center>
          <div>
            <Span color="secondary" size="75">
              投稿日 <time dateTime={meta.published}>{meta.published}</time>
            </Span>
            {meta.updated ? (
              <Span color="secondary" size="75">
                ・最終更新日 {meta.updated}
              </Span>
            ) : null}
          </div>
        </Center>
      </Col>
    </header>
  );
};
