"use client";

import { getYear } from "date-fns";

import type { WritingHead } from "../../../../entities/writing";
import { writingTypeConfig } from "../../../../entities/writing";
import { Col } from "../../../../shared/design-system/layout/flex/flex";
import { FadeIn } from "../../../../shared/design-system/ui/fade-in/fade-in";
import { H2, H3, Text } from "../../../../shared/design-system/ui/text/text";

import { useGetWritingListType } from "./_shared/writing-list-type";
import { WritingBlock } from "./writing-block/writing-block";
import { WritingTab } from "./writing-tab/writing-tab";

const groupByYear = (
  heads: WritingHead[],
): { year: string; heads: WritingHead[] }[] => {
  const map = new Map<string, WritingHead[]>();
  for (const head of heads) {
    const year = String(getYear(new Date(head.published)));
    const group = map.get(year) ?? [];
    group.push(head);
    map.set(year, group);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year, heads: items }));
};

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

  const yearGroups = groupByYear(filteredHeads);

  return (
    <section>
      <Col gap="300">
        <Col gap="100">
          <H2>Writings</H2>
          <WritingTab selectedType={type} />
          {description ? <Text>{description}</Text> : null}
        </Col>
        <Col key={type} gap="300">
          {yearGroups.map(({ year, heads: yearHeads }) => (
            <Col key={year} gap="200">
              <H3 color="secondary">{year}</H3>
              <Col as="ul" gap="200">
                {yearHeads.map((head, i) => (
                  <FadeIn key={head.id} as="li" delaySec={0.05 * i}>
                    <WritingBlock head={head} />
                  </FadeIn>
                ))}
              </Col>
            </Col>
          ))}
        </Col>
      </Col>
    </section>
  );
};
