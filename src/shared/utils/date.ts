import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

/**
 * 日付文字列をフォーマットします
 * @param dateStr YYYY-MM-DD形式の日付文字列
 * @returns YYYY年MM月DD日形式の日付文字列
 */
export const formatDate = (dateStr: string): string => {
  const date = parseISO(dateStr);
  return format(date, "yyyy年MM月dd日", { locale: ja });
};
