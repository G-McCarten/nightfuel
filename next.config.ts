import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Legal copy lives in .mdx files that pages import as components.
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
