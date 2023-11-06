import { withAPIBasePath, withAPIKeyHeader } from "@/api/_shared/config";

type IncrementArtFavRequestParams = {
  id: string;
};

type IncrementArtFavResponseBody = {
  fav: number;
};

/**
 * 対象の art のいいねを増やす API
 */
export const incrementArtFav = async (params: IncrementArtFavRequestParams) => {
  const res = await fetch(withAPIBasePath(`/fav/arts/${params.id}`), {
    method: "post",
    headers: withAPIKeyHeader({}),
  });

  return await (res.json() as Promise<IncrementArtFavResponseBody>);
};
