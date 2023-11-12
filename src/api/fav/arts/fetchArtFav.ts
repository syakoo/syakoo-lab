import { withAPIBasePath, withAPIKeyHeader } from "@/api/_shared/config";

type FetchArtFavRequestParams = {
  id: string;
};

export type FetchArtFavResponseBody = {
  fav: number;
};

export const fetchArtFavPath = (id: string) =>
  withAPIBasePath(`/fav/arts/${id}`);

/**
 * 対象の art のいいねを取得する API
 */
export const fetchArtFav = async (params: FetchArtFavRequestParams) => {
  const res = await fetch(fetchArtFavPath(params.id), {
    method: "get",
    headers: withAPIKeyHeader({}),
  });

  return await (res.json() as Promise<FetchArtFavResponseBody>);
};
