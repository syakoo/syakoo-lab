import { withAPIBasePath, withAPIKeyHeader } from "@/api/_shared/config";

type IncrementArtFavRequestParams = {
  id: string;
};

type IncrementArtFavResponseBody = {
  fav: number;
};

export const incrementArtFavPath = (id: string) =>
  withAPIBasePath(`/fav/arts/${id}`);

/**
 * 対象の art のいいねを増やす API
 */
export const incrementArtFav = async (params: IncrementArtFavRequestParams) => {
  const res = await fetch(incrementArtFavPath(params.id), {
    method: "post",
    headers: withAPIKeyHeader({}),
  });

  return await (res.json() as Promise<IncrementArtFavResponseBody>);
};
