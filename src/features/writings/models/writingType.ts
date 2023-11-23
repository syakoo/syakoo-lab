import type { IconName } from "@/design-system/icons";

import type { WritingType } from "./types";

type WritingTypeConfigItem = {
  type: WritingType;
  label: string;
  iconName: IconName;
};
export const writingTypeConfig = [
  { type: "article", label: "Article", iconName: "document" },
  { type: "note", label: "Note", iconName: "note" },
  { type: "diary", label: "Diary", iconName: "book" },
] as const satisfies readonly WritingTypeConfigItem[];
