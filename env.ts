import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
  clientPrefix: "WAKU_PUBLIC_",
  client: {
    WAKU_PUBLIC_GOOGLE_ANALYTICS_ID: z.string(),
  },
  runtimeEnv: import.meta.env,
});
