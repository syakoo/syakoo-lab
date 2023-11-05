import { withAPIBasePath, withAPIKeyHeader } from "@/api/_shared/config";

type SyncArtsFavRequestParams = {
  id: string;
};

type SyncArtsFavResponseBody = {
  fav: number;
};

export const syncArtsFav = async (params: SyncArtsFavRequestParams) => {
  const res = await fetch(withAPIBasePath(`/fav/arts/${params.id}`), {
    method: "post",
    headers: withAPIKeyHeader({}),
  });

  return await (res.json() as Promise<SyncArtsFavResponseBody>);
};
