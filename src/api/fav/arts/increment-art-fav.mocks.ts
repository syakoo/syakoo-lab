import type { HttpHandler } from "msw";
import { HttpResponse, delay, http } from "msw";

import type { FetchArtFavResponseBody } from "./fetch-art-fav";
import { incrementArtFavPath } from "./increment-art-fav";

export const handleAPIIncrementArtFav: HttpHandler = http.post(
  incrementArtFavPath(":id"),
  async () => {
    await delay(1000);
    return HttpResponse.json<FetchArtFavResponseBody>({ fav: 11 });
  },
);
