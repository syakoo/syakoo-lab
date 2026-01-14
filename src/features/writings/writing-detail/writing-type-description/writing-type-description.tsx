import type { WritingType } from "@/entities/writing/models/writing";
import { writingTypeConfig } from "@/entities/writing/writing-type/writing-type";
import { Icon } from "@/shared/design-system/icons/icon";
import { Col, Row } from "@/shared/design-system/layout/flex/flex";
import { P, Text } from "@/shared/design-system/ui/text/text";

type WritingTypeDescriptionProps = {
  type: WritingType;
};

export const WritingTypeDescription: React.FC<WritingTypeDescriptionProps> = ({
  type,
}) => {
  const { iconName, label, description } = writingTypeConfig.find(
    (config) => config.type === type,
  )!;

  return (
    <Col as="section" gap="50">
      <Row align="center" gap="50">
        <Icon name={iconName} width="1em" />
        <Text weight="bold">{label}</Text>
      </Row>
      <div>
        <P color="secondary" size="75">
          {description}
        </P>
      </div>
    </Col>
  );
};
