import BuilderDevTools from "@builder.io/dev-tools/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = BuilderDevTools()({
  /* config options here */
  images:{
    domains:['i.pravatar.cc','images.unsplash.com','www.google.com','img.freepik.com','images.unsplash.com']
  }
});

export default nextConfig;
