import { type HttpHandler, http, delay, HttpResponse } from "msw";
import { FetchArtFavResponseBody, fetchArtFavPath } from "../fetchArtFav";
import { incrementArtFavPath } from "../incrementArtFav";
import { syncArtsFavPath } from "../syncArtsFav";

export const handleSyncArtsFav: HttpHandler = http.post(
  syncArtsFavPath(),
  async () => {
    await delay(1000);
    return new HttpResponse();
  },
);

export const handleFetchArtFav: HttpHandler = http.get(
  fetchArtFavPath(":id"),
  async () => {
    await delay(1000);
    return HttpResponse.json<FetchArtFavResponseBody>({ fav: 10 });
  },
);

export const handleIncrementArtFav: HttpHandler = http.post(
  incrementArtFavPath(":id"),
  async () => {
    await delay(1000);
    return HttpResponse.json<FetchArtFavResponseBody>({ fav: 11 });
  },
);

export const defaultHandlers: HttpHandler[] = [
  handleSyncArtsFav,
  handleFetchArtFav,
  handleIncrementArtFav,
];
