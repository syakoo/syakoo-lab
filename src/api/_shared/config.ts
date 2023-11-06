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

/**
 * 管理者用のパスを取得する関数
 *
 * NOTE: node でしか取得不可能
 */
export const getAPIAdminPass = () => {
  // NOTE: 本来であれば認証の仕組みを作った方が良いかもしれないが、
  // 自分一人だけだし API を今後増やす予定もないので簡易なもので実装する
  const key = process.env.API_ADMIN_PASS;

  if (!key) {
    throw new Error("API_ADMIN_PASS が未設定です");
  }

  return key;
};
