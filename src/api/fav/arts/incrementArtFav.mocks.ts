import { HttpHandler, HttpResponse, delay, http } from "msw";

import { FetchArtFavResponseBody } from "./fetchArtFav";
import { incrementArtFavPath } from "./incrementArtFav";

export const handleAPIIncrementArtFav: HttpHandler = http.post(
  incrementArtFavPath(":id"),
  async () => {
    await delay(1000);
    return HttpResponse.json<FetchArtFavResponseBody>({ fav: 11 });
  },
);
