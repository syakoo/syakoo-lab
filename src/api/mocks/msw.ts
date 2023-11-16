import { handleAPIFetchArtFav } from "@/api/fav/arts/fetchArtFav.mocks";
import { handleAPIIncrementArtFav } from "@/api/fav/arts/incrementArtFav.mocks";
import { handleAPISyncArtsFav } from "@/api/fav/arts/syncArtsFav.mocks";

export const defaultHandlers = [
  handleAPIFetchArtFav,
  handleAPIIncrementArtFav,
  handleAPISyncArtsFav,
];
