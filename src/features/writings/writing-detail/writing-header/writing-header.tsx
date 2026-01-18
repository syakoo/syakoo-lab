import type { WritingHead } from "@/entities/writing/models/writing";
import { getWritingTypeConfig } from "@/entities/writing/writing-type/writing-type";
import { Icon } from "@/shared/design-system/icons/icon";
import { Row } from "@/shared/design-system/layout/flex/flex";
import { Spacer } from "@/shared/design-system/layout/spacer/spacer";
import { Link } from "@/shared/design-system/ui/link/link";
import { H1, Span, Text } from "@/shared/design-system/ui/text/text";

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
