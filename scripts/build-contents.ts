import path from "path";

import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const { buildArtContents } = await import("@/features/arts/artContentBuilder");
await buildArtContents();

export {};
