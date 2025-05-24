import type { WritingHead } from "@/features/writings/_models/types";
import { writingTypeConfig } from "@/features/writings/_models/writing-type";
import { writingPaths } from "@/features/writings/config/paths";
import { Icon } from "@/shared/design-system/icons";
import { Row } from "@/shared/design-system/layout";
import { H3, Link, Text } from "@/shared/design-system/ui";

import { writingBlockStyles } from "./writing-block.css";

type WritingBlockProps = {
  head: WritingHead;
};

export const WritingBlock: React.FC<WritingBlockProps> = ({ head }) => {
  const { iconName } = writingTypeConfig.find(
    ({ type }) => type === head.type,
  )!;

  return (
    <Row align="center" as="article" gap="200">
      <div className={writingBlockStyles.iconWrapper}>
        <Icon name={iconName} />
      </div>
      <div>
        <Link href={writingPaths.detail(head.id)}>
          <H3 size="200">{head.title}</H3>
        </Link>
        <Text color="secondary" size="50">
          {head.published}
        </Text>
        <Row gap="50">
          {head.tags.map((tag) => (
            <Text key={tag} color="secondary" size="50">
              #{tag}
            </Text>
          ))}
        </Row>
      </div>
    </Row>
  );
};
