import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
  server: {
    GITHUB_PERSONAL_ACCESS_TOKEN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    GITHUB_PERSONAL_ACCESS_TOKEN: undefined,
  },
});
