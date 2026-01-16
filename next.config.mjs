import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
};

export default createVanillaExtractPlugin()(nextConfig);
