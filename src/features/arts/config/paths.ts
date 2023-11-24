const artBase = "/arts";

/**
 * art のパス一覧
 *
 * クエリなどの追加情報はその場所で定義する
 */
export const artPaths = {
  list: () => `${artBase}` as const,
  detail: (id: string) => `${artBase}/${id}` as const,
};
