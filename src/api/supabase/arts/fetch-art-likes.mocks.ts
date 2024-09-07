import type { HttpHandler } from "msw";
import { HttpResponse, delay, http } from "msw";

import { supabaseUrl } from "@/api/supabase/_shared/config";

// TODO: エンドポイントがテーブル単位で同じのため、エンドポイント単位ではなくテーブル単位でモックを作る
export const handleAPIFetchArtLikes: HttpHandler = http.get(
  `${supabaseUrl}/rest/v1/reaction`,
  async () => {
    await delay(1000);
    return HttpResponse.json([
      {
        likes: 10,
      },
    ]);
  },
);
