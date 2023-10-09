import type { IconName } from "@/features/icons/Icon";
import type { WritingType } from "@/features/writings/types";

type WritingTypeConfigItem = {
  type: WritingType;
  label: string;
  iconName: IconName;
};
export const WRITING_TYPES = [
  { type: "article", label: "Article", iconName: "document" },
  { type: "note", label: "Note", iconName: "note" },
  { type: "diary", label: "Diary", iconName: "book" },
] as const satisfies readonly WritingTypeConfigItem[];
