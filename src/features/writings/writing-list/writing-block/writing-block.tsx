import type { WritingHead } from "../../../../entities/writing/models/writing";
import { writingPaths } from "../../../../entities/writing/paths/writing-paths";
import { getWritingTypeConfig } from "../../../../entities/writing/writing-type/writing-type";
import { Icon } from "../../../../shared/design-system/icons/icon";
import { Row } from "../../../../shared/design-system/layout/flex/flex";
import { Link } from "../../../../shared/design-system/ui/link/link";
import { H3, Text } from "../../../../shared/design-system/ui/text/text";

type WritingBlockProps = {
  head: WritingHead;
};

export const WritingBlock: React.FC<WritingBlockProps> = ({ head }) => {
  const { iconName } = getWritingTypeConfig(head.type);

  return (
    <Row align="center" as="article" gap="200">
      <div className="flex size-[36px] rounded-swaying bg-background-secondary p-100 text-text-primary">
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
