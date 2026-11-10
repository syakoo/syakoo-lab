const writingBase = "/writings";

/**
 * writing のパス一覧
 *
 * クエリなどの追加情報はその場所で定義する
 * 静的出力が `<path>/index.html` になるため末尾スラッシュ付きを正規 URL とする
 */
export const writingPaths = {
  list: () => `${writingBase}/` as const,
  detail: (id: string) => `${writingBase}/${id}/` as const,
};
