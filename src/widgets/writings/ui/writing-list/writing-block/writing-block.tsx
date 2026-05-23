import type { WritingHead } from "../../../../entities";
import { writingPaths } from "../../../../../entities/writing";
import { getWritingTypeConfig } from "../../../../../entities/writing";
import { Icon } from "../../../../shared";
import { Row } from "../../../../shared";
import { Link } from "../../../../shared";
import { H3, Text } from "../../../../shared";

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
