import { WRITING_TYPES } from "../../shared/writingType";
import { writingBlockStyles } from "./WritingBlock.css";
import { Row } from "@/design-system/layout";
import { H3, Link, Text } from "@/design-system/ui";
import { Icon } from "@/features/icons";
import type { WritingMeta } from "@/features/writings/types";

type WritingBlockProps = {
  meta: WritingMeta;
};

export const WritingBlock: React.FC<WritingBlockProps> = ({ meta }) => {
  const { iconName } = WRITING_TYPES.find(({ type }) => type === meta.type)!;

  return (
    <Row align="center" as="article" gap="200">
      <div className={writingBlockStyles.iconWrapper}>
        <Icon name={iconName} />
      </div>
      <div>
        <Link href={meta.link}>
          <H3 size="200">{meta.title}</H3>
        </Link>
        <Text color="secondary" size="50">
          {meta.published}
        </Text>
        <Row gap="50">
          {meta.tags.map((tag) => (
            <Text key={tag} color="secondary" size="50">
              #{tag}
            </Text>
          ))}
        </Row>
      </div>
    </Row>
  );
};