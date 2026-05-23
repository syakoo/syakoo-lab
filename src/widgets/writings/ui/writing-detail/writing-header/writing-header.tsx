import type { WritingHead } from "../../../../entities";
import { getWritingTypeConfig } from "../../../../../entities/writing";
import { Icon } from "../../../../shared";
import { Row } from "../../../../shared";
import { Spacer } from "../../../../shared";
import { Link } from "../../../../shared";
import { H1, Span, Text } from "../../../../shared";

type WritingHeaderProps = {
  head: WritingHead;
};

export const WritingHeader: React.FC<WritingHeaderProps> = ({ head }) => {
  const { iconName, label } = getWritingTypeConfig(head.type);

  return (
    <header>
      <H1>{head.title}</H1>
      <Spacer y="100" />
      <Row gap="100">
        <Row align="center" gap="50">
          <Icon className="text-text-secondary" name={iconName} width="1em" />
          <Text color="secondary" size="75">
            {label}
          </Text>
        </Row>
        {head.tags.map((tag) => (
          <Text key={tag} color="secondary" size="75">
            #{tag}
          </Text>
        ))}
      </Row>
      <div>
        <Link href="/">
          <Span color="secondary" size="75">
            syakoo
          </Span>
        </Link>
        <Span color="secondary" size="75">
          ・<time dateTime={head.published}>{head.published}</time>
        </Span>
        {head.updated ? (
          <Span color="secondary" size="75">
            （{head.updated} 更新）
          </Span>
        ) : null}
      </div>
    </header>
  );
};
