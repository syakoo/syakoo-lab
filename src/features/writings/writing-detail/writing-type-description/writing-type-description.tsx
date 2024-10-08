import { Icon } from "@/design-system/icons";
import { Col, Row } from "@/design-system/layout";
import { P, Text } from "@/design-system/ui";
import type { WritingType } from "@/features/writings/_models/types";
import { writingTypeConfig } from "@/features/writings/_models/writing-type";

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
