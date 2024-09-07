import { supabaseServiceId } from "@/api/supabase/_shared/config";
import { getServiceRoleClient } from "@/api/supabase/_shared/server-config";

import { convertArtIdToReactionId } from "./_shared/config";

export const syncArts = async (ids: string[]) => {
  const serviceClient = getServiceRoleClient();
  const result = await Promise.all(
    ids.map((id) =>
      serviceClient.from("reaction").insert({
        id: convertArtIdToReactionId(id),
        service_id: supabaseServiceId,
      }),
    ),
  );

  const succeeded = result.filter((r) => r.error === null);
  if (succeeded.length > 0) {
    console.log(`${succeeded.length}件の同期に成功しました`);
  }
};
