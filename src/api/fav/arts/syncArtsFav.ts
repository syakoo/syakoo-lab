import {
  getAPIAdminPass,
  withAPIBasePath,
  withAPIKeyHeader,
} from "@/api/_shared/config";

export const syncArtsFavPath = () =>
  withAPIBasePath(`/fav/arts?key=${getAPIAdminPass()}`);

/**
 * art のいいねの項目を同期する API
 */
export const syncArtsFav = async () => {
  await fetch(syncArtsFavPath(), {
    method: "post",
    headers: withAPIKeyHeader({}),
  });
};
