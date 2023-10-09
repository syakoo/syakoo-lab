import type { WritingType } from "@/features/writings/types";

type WritingTypeConfigItem = { type: WritingType; label: string };
export const WRITING_TYPES = [
  { type: "article", label: "Article" },
  { type: "note", label: "Note" },
  { type: "diary", label: "Diary" },
] as const satisfies readonly WritingTypeConfigItem[];
