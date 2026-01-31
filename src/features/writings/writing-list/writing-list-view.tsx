"use client";

import type { WritingHead } from "../../../entities/writing/models/writing";
import { writingTypeConfig } from "../../../entities/writing/writing-type/writing-type";
import { Col } from "../../../shared/design-system/layout/flex/flex";
import { FadeIn } from "../../../shared/design-system/ui/fade-in/fade-in";
import { H2, Text } from "../../../shared/design-system/ui/text/text";

import { useGetWritingListType } from "./_shared/writing-list-type";
import { WritingBlock } from "./writing-block/writing-block";
import { WritingTab } from "./writing-tab/writing-tab";

export const WritingListView: React.FC<{ heads: WritingHead[] }> = ({
  heads,
}) => {
  const type = useGetWritingListType();

  const filteredHeads = heads.filter((head) => {
    if (type === "all") return true;
    return type === head.type;
  });

  const description = (() => {
    if (type === "all") return null;
    const typeConfig = writingTypeConfig.find((config) => config.type === type);

    return typeConfig?.description ?? null;
  })();

  return (
    <section>
      <Col gap="300">
        <Col gap="100">
          <H2>Writings</H2>
          <WritingTab selectedType={type} />
          {description ? <Text>{description}</Text> : null}
        </Col>
        <Col key={type} as="ul" gap="200">
          {filteredHeads.map((head, i) => (
            <FadeIn key={head.id} as="li" delaySec={0.05 * i}>
              <WritingBlock head={head} />
            </FadeIn>
          ))}
        </Col>
      </Col>
    </section>
  );
};
