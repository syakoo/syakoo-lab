import type { WritingType } from "@/features/writings/models/types";

export type WritingListType = WritingType | "all";

type WritingListTypeConfigItem = {
  type: WritingListType;
  label: string;
  url: string;
};
// TODO: ここで url の定義をしているのが気になる
export const writingListTypeConfig = [
  {
    type: "all",
    label: "All",
    url: "/writings",
  },
  {
    type: "article",
    label: "Article",
    url: "/writings?type=article",
  },
  {
    type: "note",
    label: "Note",
    url: "/writings?type=note",
  },
  {
    type: "diary",
    label: "Diary",
    url: "/writings?type=diary",
  },
] as const satisfies readonly WritingListTypeConfigItem[];
