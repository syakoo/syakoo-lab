import { client, supabaseServiceId } from "@/api/supabase/_shared/config";

import { convertArtIdToReactionId } from "./_shared/config";

export const incrementArtLikes = async (id: string) => {
  const { data, error } = await client.rpc("increment_likes", {
    service_id: supabaseServiceId,
    id: convertArtIdToReactionId(id),
    count: 1,
  });

  if (error) {
    throw error;
  }

  return data;
};
