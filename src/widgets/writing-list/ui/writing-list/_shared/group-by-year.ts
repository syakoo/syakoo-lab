import type { WritingHead } from "../../../../../entities/writing";

export type WritingGroup = {
  year: string;
  heads: WritingHead[];
};

export const groupByYear = (heads: WritingHead[]): WritingGroup[] => {
  const map = new Map<string, WritingHead[]>();

  for (const head of heads) {
    const year = head.published.slice(0, 4);
    const existing = map.get(year);
    if (existing) {
      existing.push(head);
    } else {
      map.set(year, [head]);
    }
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, groupHeads]) => ({ year, heads: groupHeads }));
};
