import { fetchArtLikes } from "./arts/fetch-art-likes";
import { incrementArtLikes } from "./arts/increment-art-likes";
import { syncArts } from "./arts/sync-arts";

/**
 * supabase API
 */
export const api = {
  fetchArtLikes,
  incrementArtLikes,
  syncArts,
};
