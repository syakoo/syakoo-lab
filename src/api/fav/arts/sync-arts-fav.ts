import {
  getAPIAdminPass,
  withAPIBasePath,
  withAPIKeyHeader,
} from "@/api/_shared/config";

type SyncArtsFavRequestParams = {
  artIds: string[];
};

export const syncArtsFavPath = () => withAPIBasePath("/fav/arts");

/**
 * art のいいねの項目を同期する API
 */
export const syncArtsFav = async (params: SyncArtsFavRequestParams) => {
  const pathWithQuery = `${syncArtsFavPath()}?key=${getAPIAdminPass()}`;
  await fetch(pathWithQuery, {
    method: "post",
    body: JSON.stringify(params),
    headers: withAPIKeyHeader({}),
  });
};
