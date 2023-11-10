/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
// NOTE: 以下 msw の公式ドキュメントに記載されている jest 用の polyfill 定義
// ref: https://mswjs.io/docs/migrations/1.x-to-2.x/#requestresponsetextencoder-is-not-defined-jest
/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */
const { TextDecoder, TextEncoder } = require("node:util");

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
});

const { Blob } = require("node:buffer");
const { fetch, Headers, FormData, Request, Response } = require("undici");

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
});
