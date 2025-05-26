export const random = {
  /**
   * 配列からランダムに指定個数の要素を重複なしで取得します
   */
  pick: <T>(arr: readonly T[], num: number): T[] => {
    if (num > arr.length) {
      throw new Error("Cannot pick more items than array length");
    }

    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  },

  /**
   * 配列からランダムに1つの要素を取得します
   */
  pickOne: <T>(arr: readonly T[]): T => {
    if (arr.length === 0) {
      throw new Error("Cannot pick from empty array");
    }

    return arr[Math.floor(Math.random() * arr.length)];
  },

  /**
   * min以上max以下のランダムな整数を生成します
   */
  integer: (min: number, max: number): number => {
    if (min > max) {
      throw new Error("Min cannot be greater than max");
    }

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
} as const;
