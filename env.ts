import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
  server: {
    // NOTE:
    // - MCP サーバ用の API Key
    // - .env に用意する必要がある
    FIGMA_API_KEY: z.string().optional(),
    GITHUB_PERSONAL_ACCESS_TOKEN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    FIGMA_API_KEY: undefined,
    GITHUB_PERSONAL_ACCESS_TOKEN: undefined,
  },
});
