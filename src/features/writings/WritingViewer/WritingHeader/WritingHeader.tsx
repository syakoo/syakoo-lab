import { writingTypeConfig } from "../../_shared/writingType";
import type { WritingMeta } from "../../types";
import { writingHeaderStyles } from "./WritingHeader.css";
import { Center, Col, Row, Spacer } from "@/design-system/layout";
import { H1, Link, Text } from "@/design-system/ui";
import { Icon } from "@/features/icons";

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
        <Row gap="50" justify="center">
          {meta.tags.map((tag) => (
            <Text key={tag} color="secondary" size="50">
              #{tag}
            </Text>
          ))}
        </Row>
        <Center>
          <Text color="secondary" size="75">
            <Link href="/">syakoo</Link> posted on{" "}
            <time dateTime={meta.published}>{meta.published}</time>
          </Text>
        </Center>
      </Col>
    </header>
  );
};
