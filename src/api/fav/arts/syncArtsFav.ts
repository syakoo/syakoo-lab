import {
  getAPIAdminPass,
  withAPIBasePath,
  withAPIKeyHeader,
} from "@/api/_shared/config";

export const syncArtsFavPath = () => withAPIBasePath("/fav/arts");

/**
 * art のいいねの項目を同期する API
 */
export const syncArtsFav = async () => {
  const pathWithQuery = `${syncArtsFavPath()}?key=${getAPIAdminPass()}`;
  await fetch(pathWithQuery, {
    method: "post",
    headers: withAPIKeyHeader({}),
  });
};
