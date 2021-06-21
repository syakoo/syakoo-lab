export const API_ROOT_PATH =
  'https://9ism4mkurb.execute-api.ap-northeast-1.amazonaws.com/prod'

// ___________
//
export function withAPIRoot(path: string) {
  return API_ROOT_PATH + path
}

export function withAPIKeyHeader(obj: { [k: string]: string }) {
  const { API_KEY } = process.env
  return {
    'X-Api-Key': API_KEY || '',
    ...obj,
  }
}
