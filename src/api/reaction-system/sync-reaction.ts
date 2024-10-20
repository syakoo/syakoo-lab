import { env } from "env";

import { reactionSystemApiKey, reactionSystemUrl } from "./_shared/config";

export const reactionSystemSyncKey = env.REACTION_SYSTEM_SYNC_KEY;

export const syncReaction = async (ids: string[]) => {
  const response = await fetch(`${reactionSystemUrl}/sync-reaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": reactionSystemApiKey,
    },
    body: JSON.stringify({ data: ids, key: reactionSystemSyncKey }),
  });

  if (!response.ok) {
    throw new Error("Failed to sync reaction");
  }
};
