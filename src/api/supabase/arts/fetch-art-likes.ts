import { client, supabaseServiceId } from "@/api/supabase/_shared/config";

import { convertArtIdToReactionId } from "./_shared/config";

export const fetchArtLikes = async (id: string) => {
  const { data, error } = await client
    .from("reaction")
    .select("likes")
    .eq("service_id", supabaseServiceId)
    .eq("id", convertArtIdToReactionId(id));

  if (error) {
    throw error;
  }

  return data[0];
};
