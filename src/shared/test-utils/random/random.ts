import { getNextFloat } from "./random-source";

export const random = {
  /**
   * 配列からランダムに指定個数の要素を重複なしで取得します
   */
  pick: <T>(arr: readonly T[], num: number): T[] => {
    if (num > arr.length) {
      throw new Error("Cannot pick more items than array length");
    }

    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(getNextFloat() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, num);
  },

  /**
   * 配列からランダムに1つの要素を取得します
   */
  pickOne: <T>(arr: readonly T[]): T => {
    if (arr.length === 0) {
      throw new Error("Cannot pick from empty array");
    }

    return arr[Math.floor(getNextFloat() * arr.length)];
  },

  /**
   * min以上max以下のランダムな整数を生成します
   */
  integer: (min: number, max: number): number => {
    if (min > max) {
      throw new Error("Min cannot be greater than max");
    }

    const lo = Math.ceil(min);
    const hi = Math.floor(max);
    return Math.floor(getNextFloat() * (hi - lo + 1)) + lo;
  },
} as const;
