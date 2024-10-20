import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
  server: {
    ENABLE_BUILD_CONTENTS: z.boolean(),
    REACTION_SYSTEM_SYNC_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string(),
    NEXT_PUBLIC_REACTION_SYSTEM_URL: z.string(),
    NEXT_PUBLIC_REACTION_SYSTEM_API_KEY: z.string(),
  },
  runtimeEnv: {
    ENABLE_BUILD_CONTENTS: process.env.ENABLE_BUILD_CONTENTS === "true",
    REACTION_SYSTEM_SYNC_KEY: process.env.REACTION_SYSTEM_SYNC_KEY,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_REACTION_SYSTEM_URL:
      process.env.NEXT_PUBLIC_REACTION_SYSTEM_URL,
    NEXT_PUBLIC_REACTION_SYSTEM_API_KEY:
      process.env.NEXT_PUBLIC_REACTION_SYSTEM_API_KEY,
  },
});
