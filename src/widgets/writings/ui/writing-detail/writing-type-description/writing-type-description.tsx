import type { WritingType } from "../../../../entities";
import { getWritingTypeConfig } from "../../../../../entities/writing";
import { Icon } from "../../../../shared";
import { Col, Row } from "../../../../shared";
import { P, Text } from "../../../../shared";

type WritingTypeDescriptionProps = {
  type: WritingType;
};

export const WritingTypeDescription: React.FC<WritingTypeDescriptionProps> = ({
  type,
}) => {
  const { iconName, label, description } = getWritingTypeConfig(type);

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
