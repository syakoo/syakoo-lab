import type { RequestHandler } from "msw";
import { setupServer } from "msw/node";

/**
 * jest 用のモックサーバー起動関数
 */
export function setupJestMockServer(...handlers: RequestHandler[]) {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
}
