import { handleAPIFetchArtFav } from "@/api/fav/arts/fetch-art-fav.mocks";
import { handleAPIIncrementArtFav } from "@/api/fav/arts/increment-art-fav.mocks";
import { handleAPISyncArtsFav } from "@/api/fav/arts/sync-arts-fav.mocks";

export const defaultHandlers = [
  handleAPIFetchArtFav,
  handleAPIIncrementArtFav,
  handleAPISyncArtsFav,
];
