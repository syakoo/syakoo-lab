import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

export default createVanillaExtractPlugin()(nextConfig);
