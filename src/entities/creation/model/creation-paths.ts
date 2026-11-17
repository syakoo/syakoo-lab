const creationBase = "/creations";

/**
 * creation のパス一覧
 *
 * 静的出力が `<path>/index.html` になるため末尾スラッシュ付きを正規 URL とする
 */
export const creationPaths = {
  list: () => `${creationBase}/` as const,
  detail: (id: string) => `${creationBase}/${id}/` as const,
};
