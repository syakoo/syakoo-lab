import path from "path";

import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// NOTE: 動的にすることで読むタイミングを遅らせる
const { runServer } = await import("@/api/_mocks/msw");
runServer();
