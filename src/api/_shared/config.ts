/**
 * API ベースパスをくっつける関数
 */
export const withAPIBasePath = (path: string) => {
  const basePath = process.env.NEXT_PUBLIC_API_BASE_PATH;

  if (!basePath) {
    throw new Error("API ベースパスが未設定です");
  }

  return `${basePath}${path}`;
};

/**
 * API キーをくっつける関数
 */
export const withAPIKeyHeader = (headers: Record<string, string>) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey) {
    throw new Error("API キーが未設定です");
  }

  return { ...headers, "X-Api-Key": apiKey };
};
