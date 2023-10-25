import { WritingBlock } from "./WritingBlock";
import { WritingTab } from "./WritingTab";
import { WritingTypeDescription } from "./WritingTypeDescription";
import type { WritingListType } from "./_shared/writingListType";
import { Col } from "@/design-system/layout";
import { H2 } from "@/design-system/ui";
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
    <section>
      <Col gap="300">
        <Col gap="100">
          <H2>Writings</H2>
          <WritingTab selectedType={type} />
          <WritingTypeDescription type={type} />
        </Col>
        <Col gap="200">
          {filteredMetas.map((meta) => (
            <WritingBlock key={meta.id} meta={meta} />
          ))}
        </Col>
      </Col>
    </section>
  );
};
