import type { HttpHandler } from "msw";
import { HttpResponse, delay, http } from "msw";

import { syncArtsFavPath } from "./syncArtsFav";

export const handleAPISyncArtsFav: HttpHandler = http.post(
  syncArtsFavPath(),
  async () => {
    await delay(1000);
    return new HttpResponse();
  },
);
