/// <reference types="vitest" />

import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { staticImage } from "./vite-plugins/static-image";

export default defineConfig({
  envPrefix: ["VITE_", "WAKU_PUBLIC_"],
  plugins: [staticImage(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/shared/test-utils/vitest-setup.ts"],
    globals: true,
    css: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
