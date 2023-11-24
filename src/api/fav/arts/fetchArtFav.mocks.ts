import type { HttpHandler } from "msw";
import { HttpResponse, delay, http } from "msw";

import type { FetchArtFavResponseBody } from "./fetchArtFav";
import { fetchArtFavPath } from "./fetchArtFav";

export const handleAPIFetchArtFav: HttpHandler = http.get(
  fetchArtFavPath(":id"),
  async () => {
    await delay(1000);
    return HttpResponse.json<FetchArtFavResponseBody>({ fav: 10 });
  },
);
