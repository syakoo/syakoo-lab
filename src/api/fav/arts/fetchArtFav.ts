import { withAPIBasePath, withAPIKeyHeader } from "@/api/_shared/config";

type FetchArtFavRequestParams = {
  id: string;
};

type FetchArtFavResponseBody = {
  fav: number;
};

/**
 * 対象の art のいいねを取得する API
 */
export const fetchArtFav = async (params: FetchArtFavRequestParams) => {
  const res = await fetch(withAPIBasePath(`/fav/arts/${params.id}`), {
    method: "get",
    headers: withAPIKeyHeader({}),
  });

  return await (res.json() as Promise<FetchArtFavResponseBody>);
};
