import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    domains: ["storage.c2.liara.space"],
  },
  webpack: (config) => {
    // رفع مشکل "~leaflet/dist/images/..."
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "~leaflet": path.resolve(__dirname, "node_modules/leaflet"),
    };

    // گاهی لازم است برای فایل‌های CSS با ~ مسیر را نادیده بگیریم
    config.module.rules.push({
      test: /leaflet-defaulticon-compatibility\.webpack\.css$/,
      loader: "string-replace-loader",
      options: {
        search: /~leaflet\/dist\/images\//g,
        replace: "leaflet/dist/images/",
      },
    });

    return config;
  },
};

export default nextConfig;
