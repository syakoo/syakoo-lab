"use client";

import { useSearchParams } from "next/navigation";

import { Col } from "@/design-system/layout";
import { H2, FadeIn, Text } from "@/design-system/ui";
import { WritingHead } from "@/features/writings/_models/types";
import { writingTypeConfig } from "@/features/writings/_models/writingType";

import { WritingBlock } from "./WritingBlock";
import { WritingTab } from "./WritingTab";
import type { WritingListType } from "./_shared/writingListType";

type WritingListProps = {
  heads: WritingHead[];
};

export const WritingList: React.FC<WritingListProps> = ({ heads }) => {
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") ?? "all") as WritingListType;

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
