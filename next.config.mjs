import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  eslint: {
    dirs: ["src", ".storybook"],
  },
};

export default createVanillaExtractPlugin()(nextConfig);
