import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS のクラス名を結合するユーティリティ関数
 *
 * clsx でクラス名を結合し、tailwind-merge で重複を解決する
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
