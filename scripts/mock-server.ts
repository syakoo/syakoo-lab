import "./_shared/env";

// NOTE: 動的にすることで読むタイミングを遅らせる
const { runServer } = await import("@/api/_mocks/server");
runServer();
