const writingBase = "/writings";

/**
 * writing のパス一覧
 *
 * クエリなどの追加情報はその場所で定義する
 */
export const writingPaths = {
  list: () => `${writingBase}` as const,
  detail: (id: string) => `${writingBase}/${id}` as const,
};
