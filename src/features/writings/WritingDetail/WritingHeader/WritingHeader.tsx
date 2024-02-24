import { Icon } from "@/design-system/icons";
import { Row, Spacer } from "@/design-system/layout";
import { theme } from "@/design-system/theme.css";
import { H1, Link, Span, Text } from "@/design-system/ui";
import type { WritingHead } from "@/features/writings/_models/types";
import { writingTypeConfig } from "@/features/writings/_models/writingType";

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
