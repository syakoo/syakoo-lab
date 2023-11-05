"use client";

import { useSearchParams } from "next/navigation";
import { WritingBlock } from "./WritingBlock";
import { WritingTab } from "./WritingTab";
import { WritingTypeDescription } from "./WritingTypeDescription";
import type { WritingListType } from "./_shared/writingListType";
import { Col } from "@/design-system/layout";
import { H2, FadeIn } from "@/design-system/ui";
import type { WritingMeta } from "@/features/writings/types";

type WritingListProps = {
  metas: WritingMeta[];
};

export const WritingList: React.FC<WritingListProps> = ({ metas }) => {
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") ?? "all") as WritingListType;

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
        <Col key={type} as="ul" gap="200">
          {filteredMetas.map((meta, i) => (
            <FadeIn key={meta.id} as="li" delaySec={0.05 * i}>
              <WritingBlock meta={meta} />
            </FadeIn>
          ))}
        </Col>
      </Col>
    </section>
  );
};
