import { reactionSystemApiKey, reactionSystemUrl } from "./_shared/config";
import type { Reaction } from "./_shared/types";

export const postReactionIncrement = async (
  id: string,
  incrementReaction: Partial<Reaction>,
) => {
  const response = await fetch(
    `${reactionSystemUrl}/reaction/${id}/increment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": reactionSystemApiKey,
      },
      body: JSON.stringify(incrementReaction),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to post reaction");
  }
};
