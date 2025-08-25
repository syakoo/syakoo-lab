import type { WritingHead } from "@/entities/writing/models/writing";
import { writingTypeConfig } from "@/entities/writing/writing-type";
import { Icon } from "@/shared/design-system/icons";
import { Row, Spacer } from "@/shared/design-system/layout";
import { theme } from "@/shared/design-system/theme.css";
import { H1, Link, Span, Text } from "@/shared/design-system/ui";

type WritingHeaderProps = {
  head: WritingHead;
};

export const WritingHeader: React.FC<WritingHeaderProps> = ({ head }) => {
  const { iconName, label } = writingTypeConfig.find(
    ({ type }) => type === head.type,
  )!;

  return (
    <header>
      <H1>{head.title}</H1>
      <Spacer y="100" />
      <Row gap="100">
        <Row align="center" gap="50">
          <Icon
            name={iconName}
            stroke={theme.color.text.secondary}
            width="1em"
          />
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
