import {
  getAPIAdminPass,
  withAPIBasePath,
  withAPIKeyHeader,
} from "@/api/_shared/config";

/**
 * art のいいねの項目を同期する API
 */
export const syncArtsFav = async () => {
  await fetch(withAPIBasePath(`/fav/arts?key=${getAPIAdminPass()}`), {
    method: "post",
    headers: withAPIKeyHeader({}),
  });
};
