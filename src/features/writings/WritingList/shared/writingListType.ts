import type { WritingType } from "@/features/writings/types";

export type WritingListType = WritingType | "all";

type WritingListTypeConfigItem = {
  type: WritingListType;
  label: string;
  url: string;
};
// TODO: ここで url の定義をしているのが気になる
export const WRITING_LIST_TYPES = [
  {
    type: "all",
    label: "All",
    url: "/writings",
  },
  {
    type: "article",
    label: "Article",
    url: "/writings/article",
  },
  {
    type: "note",
    label: "Note",
    url: "/writings/note",
  },
  {
    type: "diary",
    label: "Diary",
    url: "/writings/diary",
  },
] as const satisfies readonly WritingListTypeConfigItem[];
