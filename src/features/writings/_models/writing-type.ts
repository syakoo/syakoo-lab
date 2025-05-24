import type { IconName } from "@/shared/design-system/icons";

import type { WritingType } from "./types";

type WritingTypeConfigItem = {
  type: WritingType;
  label: string;
  iconName: IconName;
  description: string;
};
export const writingTypeConfig = [
  {
    type: "article",
    label: "Article",
    iconName: "document",
    description: "Article は気合いの入った文書を残しています。",
  },
  {
    type: "note",
    label: "Note",
    iconName: "note",
    description:
      "Note は当時のアイデアやメモなどをアウトプットする目的として残しています。考えや意見は変化する可能性があります。",
  },
  {
    type: "diary",
    label: "Diary",
    iconName: "book",
    description:
      "Diary は著者の身の回りで起こったことや全く中身のない話を残しています。",
  },
] as const satisfies readonly WritingTypeConfigItem[];

export const writingTypes = writingTypeConfig.map(({ type }) => type);
