import { WritingTab } from "./WritingTab";
import { WritingTypeDescription } from "./WritingTypeDescription";
import type { WritingListType } from "./shared/writingListType";
import { Col, Container } from "@/design-system/layout";
import { H2 } from "@/design-system/ui";
import { HeaderFooterTemplate } from "@/features/common/components/HeaderFooterTemplate";

type WritingListProps = {
  type: WritingListType;
};

export const WritingList: React.FC<WritingListProps> = ({ type }) => {
  return (
    <HeaderFooterTemplate>
      <main>
        <Container
          as="section"
          center
          paddingBottom="400"
          paddingX="200"
          size="100"
        >
          <Col gap="200">
            <H2>Writings</H2>
            <WritingTab selectedType={type} />
            <WritingTypeDescription type={type} />
          </Col>
        </Container>
      </main>
    </HeaderFooterTemplate>
  );
};
