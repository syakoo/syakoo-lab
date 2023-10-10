import { WritingBlock } from "./WritingBlock";
import { WritingTab } from "./WritingTab";
import { WritingTypeDescription } from "./WritingTypeDescription";
import type { WritingListType } from "./shared/writingListType";
import { Col, Container } from "@/design-system/layout";
import { H2 } from "@/design-system/ui";
import { HeaderFooterTemplate } from "@/features/common/components/HeaderFooterTemplate";
import type { WritingMeta } from "@/features/writings/types";

type WritingListProps = {
  type: WritingListType;
  metas: WritingMeta[];
};

export const WritingList: React.FC<WritingListProps> = ({ type, metas }) => {
  const filteredMetas = metas.filter((meta) => {
    if (type === "all") return true;
    return type === meta.type;
  });

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
          <Col gap="100">
            <H2>Writings</H2>
            <WritingTab selectedType={type} />
            <WritingTypeDescription type={type} />
            {/* TODO: 空白を入れたい */}
            <Col gap="200">
              {filteredMetas.map((meta) => (
                <WritingBlock key={meta.id} meta={meta} />
              ))}
            </Col>
          </Col>
        </Container>
      </main>
    </HeaderFooterTemplate>
  );
};
