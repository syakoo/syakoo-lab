import { reactionSystemApiKey, reactionSystemUrl } from "./_shared/config";
import type { Reaction } from "./_shared/types";

export const getReaction = async (id: string): Promise<Reaction> => {
  const response = await fetch(`${reactionSystemUrl}/reaction/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": reactionSystemApiKey,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reaction");
  }

  return (await response.json()) as Reaction;
};
