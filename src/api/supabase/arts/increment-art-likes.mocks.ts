import type { HttpHandler } from "msw";
import { HttpResponse, delay, http } from "msw";

import { supabaseUrl } from "@/api/supabase/_shared/config";

import type { incrementArtLikes } from "./increment-art-likes";

export const handleAPIIncrementArtLikes: HttpHandler = http.post(
  `${supabaseUrl}/rest/v1/rpc/increment_likes`,
  async () => {
    await delay(1000);
    return HttpResponse.json<Awaited<ReturnType<typeof incrementArtLikes>>>();
  },
);
