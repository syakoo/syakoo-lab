/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import { resolve } from "path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
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
