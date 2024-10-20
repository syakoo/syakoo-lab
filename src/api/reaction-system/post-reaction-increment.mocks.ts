import type { HttpHandler } from "msw";
import { HttpResponse, delay, http } from "msw";

import { reactionSystemUrl } from "./_shared/config";

export const handleAPIPostReactionIncrement: HttpHandler = http.post(
  `${reactionSystemUrl}/reaction/:id/increment`,
  async () => {
    await delay(1000);
    return new HttpResponse();
  },
);
