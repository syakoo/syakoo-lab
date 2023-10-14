import { writingTypeConfig } from "../../shared/writingType";
import type { WritingMeta } from "../../types";
import { writingHeaderStyles } from "./WritingHeader.css";
import { Center, Row, Spacer } from "@/design-system/layout";
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
    <Center as="header">
      <div className={writingHeaderStyles.iconWrapper}>
        <Icon name={iconName} width="100%" />
      </div>
      <Spacer y="100" />
      <H1>{meta.title}</H1>
      <Spacer y="100" />
      <div>
        <Text color="secondary" size="75">
          <Link href="/">syakoo</Link> posted on{" "}
          <time dateTime={meta.published}>{meta.published}</time>
        </Text>
        <Center>
          <Row gap="50">
            {meta.tags.map((tag) => (
              <Text key={tag} color="secondary" size="50">
                #{tag}
              </Text>
            ))}
          </Row>
        </Center>
      </div>
    </Center>
  );
};
