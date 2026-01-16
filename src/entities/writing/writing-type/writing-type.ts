import type { WritingType } from "@/entities/writing/models/writing";
import type { IconName } from "@/shared/design-system/icons/icon";

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

/**
 * WritingType に対応する設定を取得する
 * @throws 不正な type が渡された場合
 */
export const getWritingTypeConfig = (
  type: WritingType,
): WritingTypeConfigItem => {
  const config = writingTypeConfig.find((c) => c.type === type);
  if (!config) {
    throw new Error(`Unknown writing type: ${type}`);
  }
  return config;
};
