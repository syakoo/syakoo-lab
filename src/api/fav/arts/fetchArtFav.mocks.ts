import { HttpHandler, HttpResponse, delay, http } from "msw";

import { FetchArtFavResponseBody, fetchArtFavPath } from "./fetchArtFav";

export const handleAPIFetchArtFav: HttpHandler = http.get(
  fetchArtFavPath(":id"),
  async () => {
    await delay(1000);
    return HttpResponse.json<FetchArtFavResponseBody>({ fav: 10 });
  },
);
