import type { HttpHandler } from "msw";
import { HttpResponse, delay, http } from "msw";

import { reactionSystemUrl } from "./_shared/config";

export const handleAPIGetReaction: HttpHandler = http.get(
  `${reactionSystemUrl}/reaction/:id`,
  async () => {
    await delay(1000);
    return HttpResponse.json({
      likes: 10,
      claps: 10,
    });
  },
);
