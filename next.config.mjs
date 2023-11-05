import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default createVanillaExtractPlugin()(nextConfig);
