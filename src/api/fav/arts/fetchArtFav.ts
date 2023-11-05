import { withAPIBasePath, withAPIKeyHeader } from "@/api/_shared/config";

type FetchArtFavRequestParams = {
  id: string;
};

type FetchArtFavResponseBody = {
  fav: number;
};

export const fetchArtFav = async (params: FetchArtFavRequestParams) => {
  const res = await fetch(withAPIBasePath(`/fav/arts/${params.id}`), {
    method: "get",
    headers: withAPIKeyHeader({}),
  });

  return await (res.json() as Promise<FetchArtFavResponseBody>);
};
