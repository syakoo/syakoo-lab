/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */

if (
  typeof globalThis.TextEncoder === "undefined" ||
  typeof globalThis.TextDecoder === "undefined"
) {
  const utils = require("util");
  globalThis.TextEncoder = utils.TextEncoder;
  globalThis.TextDecoder = utils.TextDecoder;
  // TextEncoder references a Uint8Array constructor different than the global
  // one used by users in tests. The following enforces the same constructor to
  // be referenced by both.
  // FIXME: currently this doesn't work, and must be set in a custom environment.
  globalThis.Uint8Array = Uint8Array;
}

// FIXME This is a temporary workaround for https://github.com/jsdom/jsdom/issues/1724#issuecomment-720727999
// The following fetch APIs are missing in JSDom
if (
  typeof globalThis.Response === "undefined" ||
  typeof globalThis.Request === "undefined" ||
  typeof globalThis.Headers === "undefined" ||
  typeof globalThis.fetch === "undefined"
) {
  const undici = require("undici");
  globalThis.Response = undici.Response;
  globalThis.Request = undici.Request;
  globalThis.Headers = undici.Headers;
  globalThis.fetch = undici.fetch;
}
