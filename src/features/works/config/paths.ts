const workBase = "/works";

/**
 * work のパス一覧
 *
 * クエリなどの追加情報はその場所で定義する
 */
export const workPaths = {
  list: () => `${workBase}` as const,
};
